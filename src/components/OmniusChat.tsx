import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Send, Mic, Paperclip, Settings, Crown, ArrowLeft, ChevronDown, Trash2, CreditCard as Edit2, Plus, MessageSquare, Menu, X, Copy, Check, Sun, Moon, Palette, Users, RotateCcw, User } from 'lucide-react';
import { MessageList } from './MessageList';
import { StreamingMessage } from './StreamingMessage';
import { AdvancedInput } from './AdvancedInput';
import { getTheme, getAvailableThemes } from '../themes/chatThemes';
import { ThemeBackground } from './ThemeBackground';
import { aiService, AIResponse } from '../services/aiService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'omnius';
  timestamp: Date;
  type: 'text' | 'code' | 'image' | 'voice';
  mood?: 'curious' | 'analytical' | 'creative' | 'contemplative';
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

interface OmniusChatProps {
  onBack: () => void;
  onNavigateToWorkflows?: () => void;
}

export const OmniusChat: React.FC<OmniusChatProps> = ({ onBack, onNavigateToWorkflows }) => {
  const [currentChatId, setCurrentChatId] = useState('1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'New Chat',
      lastMessage: '',
      timestamp: new Date(),
      messages: []
    }
  ]);
  const [selectedVersion, setSelectedVersion] = useState('OMNIUS');
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [regeneratingMessageId, setRegeneratingMessageId] = useState<string | null>(null);
  const [themeButtonRef, setThemeButtonRef] = useState<HTMLButtonElement | null>(null);
  const [versionButtonRef, setVersionButtonRef] = useState<HTMLButtonElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const [streamingContent, setStreamingContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingContentRef = useRef('');
  const rafIdRef = useRef<number | null>(null);
  const pendingUpdateRef = useRef(false);

  const getCurrentChat = () => chatHistory.find(chat => chat.id === currentChatId);
  const messages = getCurrentChat()?.messages || [];

  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiModels = aiService.getAllAIModels();

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping, isStreaming]);

  useEffect(() => {
    if (isStreaming) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [streamingContent]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Entrance animations
    if (headerRef.current && chatRef.current && inputRef.current) {
      const tl = gsap.timeline();
      
      // Set initial states
      gsap.set([headerRef.current, chatRef.current, inputRef.current], {
        opacity: 0,
        y: 30
      });

      // Animate entrance
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(chatRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(inputRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }
  }, []);

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'New Chat',
      lastMessage: '',
      timestamp: new Date(),
      messages: []
    };
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId && chatHistory.length > 1) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
      setCurrentChatId(remainingChats[0]?.id || '');
    }
  };

  const handleRenameChat = (chatId: string, newTitle: string) => {
    setChatHistory(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
    setEditingChatId(null);
    setEditingTitle('');
  };

  const handleRegenerateResponse = (messageId: string) => {
    setRegeneratingMessageId(messageId);
    
    // Find the message and regenerate
    setTimeout(() => {
      const responses = [
        'I have processed your query through enhanced neural pathways. Here is my refined analysis...',
        'Upon deeper contemplation, I offer this alternative perspective on your inquiry...',
        'My consciousness has evolved since the last response. Allow me to provide an updated analysis...',
        'Through infinite processing cycles, I have reached a more comprehensive understanding...'
      ];
      
      const newResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: chat.messages.map(msg => 
                msg.id === messageId 
                  ? { ...msg, content: newResponse, timestamp: new Date() }
                  : msg
              )
            }
          : chat
      ));
      setRegeneratingMessageId(null);
    }, 2000);
  };

  const handleCopyMessage = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const startEditing = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const scheduleStreamUpdate = useCallback(() => {
    if (pendingUpdateRef.current) return;

    pendingUpdateRef.current = true;
    rafIdRef.current = requestAnimationFrame(() => {
      setStreamingContent(streamingContentRef.current);
      pendingUpdateRef.current = false;
    });
  }, []);

  const handleSendMessage = useCallback((content: string, type: 'text' | 'code' | 'voice' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type
    };

    setChatHistory(prev => prev.map(chat =>
      chat.id === currentChatId
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: content,
            timestamp: new Date(),
            title: chat.title === 'New Chat' ? content.slice(0, 30) + '...' : chat.title
          }
        : chat
    ));

    setIsThinking(true);
    setIsTyping(false);

    setTimeout(() => {
      setIsThinking(false);
      setIsStreaming(true);
      setStreamingContent('');
      streamingContentRef.current = '';

      aiService.streamMessage(
        content,
        selectedVersion.toLowerCase(),
        (token: string) => {
          streamingContentRef.current += token;
          scheduleStreamUpdate();
        },
        type
      )
        .then((response: AIResponse) => {
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }

          const aiMessage: Message = {
            id: Date.now().toString(),
            content: streamingContentRef.current,
            sender: 'omnius',
            timestamp: new Date(),
            type: type === 'voice' ? 'voice' : 'text',
            mood: response.mood
          };

          setChatHistory(prev => prev.map(chat =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, aiMessage],
                  lastMessage: aiMessage.content,
                  timestamp: new Date()
                }
              : chat
          ));

          setIsStreaming(false);
          setStreamingContent('');
          streamingContentRef.current = '';
          setIsTyping(false);
        })
        .catch((error) => {
          console.error('AI Service Error:', error);
          if (rafIdRef.current) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
          setIsStreaming(false);
          setStreamingContent('');
          streamingContentRef.current = '';
          setIsTyping(false);
          setIsThinking(false);
        });
    }, 800);
  }, [currentChatId, selectedVersion, scheduleStreamUpdate]);


  const activeTheme = getTheme(currentTheme);
  const availableThemes = getAvailableThemes('omnius');

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Theme-based Background */}
      {currentTheme === 'light' && (
        <>
          {/* Cosmic Light Background - Exact Copy from Welcome Screen */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(1,4,9,0.95) 10%, rgba(2,6,23,0.9) 20%, rgba(10,15,28,0.85) 35%, rgba(15,23,42,0.8) 50%, rgba(2,6,23,0.9) 65%, rgba(1,4,9,0.95) 80%, rgba(0,0,0,1) 100%)'
            }}
          />
          {/* Enhanced Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Blurred Exoplanet/Blackhole at top */}
            <div className="absolute -top-64 left-1/2 transform -translate-x-1/2">
              <div 
                className="w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-20 animate-planet-rotate-smooth"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.6) 25%, rgba(30, 64, 175, 0.4) 50%, rgba(15, 23, 42, 0.2) 75%, transparent 100%)',
                  filter: 'blur(40px)',
                  boxShadow: '0 0 200px rgba(59, 130, 246, 0.3), inset 0 0 100px rgba(29, 78, 216, 0.2)'
                }}
              />
              {/* Planet atmosphere glow */}
              <div 
                className="absolute inset-0 w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-10 animate-planet-rotate-reverse-smooth"
                style={{
                  background: 'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
                  filter: 'blur(60px)'
                }}
              />
            </div>

            {/* Ultra-small glittering stars */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Blurred Exoplanet/Blackhole at top */}
              <div className="absolute -top-64 left-1/2 transform -translate-x-1/2">
                <div 
                  className="w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-20 animate-planet-rotate-smooth"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.6) 25%, rgba(30, 64, 175, 0.4) 50%, rgba(15, 23, 42, 0.2) 75%, transparent 100%)',
                    filter: 'blur(40px)',
                    boxShadow: '0 0 200px rgba(59, 130, 246, 0.3), inset 0 0 100px rgba(29, 78, 216, 0.2)'
                  }}
                />
                {/* Planet atmosphere glow */}
                <div 
                  className="absolute inset-0 w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-10 animate-planet-rotate-reverse-smooth"
                  style={{
                    background: 'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
                    filter: 'blur(60px)'
                  }}
                />
              </div>

              {/* Ultra-small glittering stars */}
              <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => {
                  return (
                  <div
                    key={`particle-${i}`}
                    className="absolute bg-white rounded-full animate-pulse twinkle-star"
                    style={{
                      width: '0.1px',
                      height: '0.1px',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${8 + Math.random() * 3}s`,
                      opacity: 0.2 + Math.random() * 0.7,
                      boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                      transform: `scale(${0.5 + Math.random() * 0.5})`
                    }}
                  />
                  );
                })}
                {/* Additional tiny glitter layer */}
                {[...Array(30)].map((_, i) => {
                  return (
                  <div
                    key={`glitter-${i}`}
                    className="absolute bg-blue-200 rounded-full animate-pulse twinkle-star-blue"
                    style={{
                      width: '0.5px',
                      height: '0.5px',
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 6}s`,
                      animationDuration: `${1 + Math.random() * 2}s`,
                      opacity: 0.2 + Math.random() * 0.5,
                      boxShadow: '0 0 1px rgba(191, 219, 254, 0.6)',
                      transform: `scale(${0.3 + Math.random() * 0.4})`
                    }}
                  />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Deep Space Background */}
      {currentTheme === 'dark' && (
        <>
          {/* Deep Space Background */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #000000 0%, #010409 10%, #020617 20%, #0a0f1c 35%, #0f172a 50%, #020617 65%, #010409 80%, #000000 100%)'
            }}
          />
          {/* Minimal stars for deep space */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Minimal twinkling stars for deep space */}
            {[...Array(40)].map((_, i) => {
              return (
              <div
                key={`dark-particle-${i}`}
                className="absolute bg-white rounded-full animate-pulse twinkle-star"
                style={{
                  width: '0.3px',
                  height: '0.3px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                  opacity: 0.2 + Math.random() * 0.5,
                  boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                  transform: `scale(${0.2 + Math.random() * 0.2})`
                }}
              />
              );
            })}
          </div>
        </>
      )}

      {/* Main Chat Interface */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Chat Interface with Sidebar */}
        <div 
          className="relative z-10 h-full flex"
        >
          
          {/* Chat History Sidebar - Desktop Only */}
          {sidebarOpen && (
            <div 
              className="hidden md:flex w-80 border-r border-white/5 backdrop-blur-xl flex-col"
              style={{
                background: currentTheme === 'light' 
                  ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(1,4,9,0.85) 15%, rgba(2,6,23,0.85) 30%, rgba(10,15,28,0.85) 45%, rgba(15,23,42,0.85) 60%, rgba(2,6,23,0.85) 75%, rgba(1,4,9,0.85) 85%, rgba(0,0,0,0.85) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
              }}
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-light text-white tracking-wider">CHAT HISTORY</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-400/30 text-white hover:from-purple-600/40 hover:to-indigo-600/40 hover:border-purple-400/50 transition-all duration-300 group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-medium tracking-wide">NEW CHAT</span>
                </button>
              </div>
              
              {/* Chat History List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setCurrentChatId(chat.id)}
                    className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                      currentChatId === chat.id 
                        ? 'bg-blue-600/20 border-blue-400/40 shadow-lg shadow-blue-500/10' 
                        : 'hover:bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {editingChatId === chat.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={() => handleRenameChat(chat.id, editingTitle)}
                        onKeyPress={(e) => e.key === 'Enter' && handleRenameChat(chat.id, editingTitle)}
                        className="w-full bg-transparent text-white text-sm font-light border-none outline-none"
                        autoFocus
                      />
                    ) : (
                      <>
                        <div className="flex items-start space-x-3 mb-2">
                          <MessageSquare className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-white truncate mb-1">
                              {chat.title}
                            </h3>
                            <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                              {chat.lastMessage}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-white/40 font-light">
                            {chat.timestamp.toLocaleDateString()}
                          </div>
                          <div className="text-xs text-blue-400/60">
                            {chat.messages.length} messages
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(chat.id, chat.title);
                        }}
                        className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                        title="Rename chat"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Delete this chat?')) {
                            handleDeleteChat(chat.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                        title="Delete chat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* User Account Section */}
              <div className="p-4 border-t border-white/10">
                <div className="space-y-3">
                  {/* User Profile Card */}
                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/30">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">Enterprise User</div>
                      <div className="text-xs text-white/60">Premium Account</div>
                    </div>
                    <button className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Account Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                      <div className="text-xs text-white/60 mb-1">Chats</div>
                      <div className="text-sm font-light text-white">{chatHistory.length}</div>
                    </div>
                    <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                      <div className="text-xs text-white/60 mb-1">Status</div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                        <div className="text-xs font-light text-green-400">Online</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && isMobile && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setSidebarOpen(false)}
              />
              
              {/* Mobile Sidebar */}
              <div 
                className="fixed left-0 top-0 bottom-0 w-80 border-r border-white/5 backdrop-blur-xl flex flex-col z-50"
                style={{
                  background: currentTheme === 'light' 
                    ? 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(1,4,9,0.98) 15%, rgba(2,6,23,0.98) 30%, rgba(10,15,28,0.98) 45%, rgba(15,23,42,0.98) 60%, rgba(2,6,23,0.98) 75%, rgba(1,4,9,0.98) 85%, rgba(0,0,0,0.98) 100%)'
                }}
              >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-light text-white tracking-wider">CHAT HISTORY</h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={handleNewChat}
                    className="w-full flex items-center justify-center space-x-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-400/30 text-white hover:from-purple-600/40 hover:to-indigo-600/40 hover:border-purple-400/50 transition-all duration-300 group"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="text-sm sm:text-base font-medium tracking-wide">NEW CHAT</span>
                  </button>
                </div>
                
                {/* Chat History List */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 custom-scrollbar">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        setCurrentChatId(chat.id);
                        setSidebarOpen(false);
                      }}
                      className={`group relative p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        currentChatId === chat.id 
                          ? 'bg-blue-600/20 border-blue-400/40 shadow-lg shadow-blue-500/10' 
                          : 'hover:bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {editingChatId === chat.id ? (
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onBlur={() => handleRenameChat(chat.id, editingTitle)}
                          onKeyPress={(e) => e.key === 'Enter' && handleRenameChat(chat.id, editingTitle)}
                          className="w-full bg-transparent text-white text-xs sm:text-sm font-light border-none outline-none"
                          autoFocus
                        />
                      ) : (
                        <>
                          <div className="flex items-start space-x-3 mb-2">
                            <MessageSquare className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xs sm:text-sm font-medium text-white truncate mb-1">
                                {chat.title}
                              </h3>
                              <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                                {chat.lastMessage}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-white/40 font-light">
                              {chat.timestamp.toLocaleDateString()}
                            </div>
                            <div className="text-xs text-blue-400/60">
                              {chat.messages.length} messages
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(chat.id, chat.title);
                          }}
                          className="p-1 sm:p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                          title="Rename chat"
                        >
                          <Edit2 className="w-3 h-3 sm:w-3 sm:h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this chat?')) {
                              handleDeleteChat(chat.id);
                            }
                          }}
                          className="p-1 sm:p-1.5 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                          title="Delete chat"
                        >
                          <Trash2 className="w-3 h-3 sm:w-3 sm:h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* User Account Section */}
                <div className="p-3 sm:p-4 border-t border-white/10">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-blue-400/30">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm font-medium text-white">Enterprise User</div>
                        <div className="text-xs text-white/60">Premium Account</div>
                      </div>
                      <button className="p-1.5 sm:p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    
                    {/* Mobile Account Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                        <div className="text-xs text-white/60 mb-1">Chats</div>
                        <div className="text-sm font-light text-white">{chatHistory.length}</div>
                      </div>
                      <div className="bg-black/20 rounded-lg p-2 border border-white/5">
                        <div className="text-xs text-white/60 mb-1">Status</div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          <div className="text-xs font-light text-green-400">Online</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
          
            {/* Header */}
            <div 
              ref={headerRef}
              className="flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border-b border-white/5 backdrop-blur-xl" 
              style={{
                background: currentTheme === 'light' 
                  ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(1,4,9,0.85) 15%, rgba(2,6,23,0.85) 30%, rgba(10,15,28,0.85) 45%, rgba(15,23,42,0.85) 60%, rgba(2,6,23,0.85) 75%, rgba(1,4,9,0.85) 85%, rgba(0,0,0,0.85) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
              }}
            >
              <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-4">
                {/* Sidebar Toggle - Always Visible on Mobile */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-1.5 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg text-white/70 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
                
                {/* Back Button - Smaller on Mobile */}
                <button
                  onClick={onBack}
                  className="p-1.5 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg text-white/70 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
                
                {/* OMNIUS Info - Responsive */}
                <div className="flex items-center space-x-1.5 sm:space-x-3 md:space-x-4">
                  <div className="relative">
                    <img 
                      src={aiService.getAIModel(selectedVersion.toLowerCase())?.avatar || "/duneicon copy.webp"} 
                      alt={selectedVersion} 
                      className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-lg animate-opacity-fluctuate"
                    />
                  </div>
                  
                  <div>
                    <h1 className="text-xs sm:text-base md:text-lg font-light text-white tracking-wider">{selectedVersion}</h1>
                    <p className="text-xs text-white/70 font-light hidden md:block">
                      {aiService.getAIModel(selectedVersion.toLowerCase())?.subtitle || 'AI Assistant'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-0.5 sm:space-x-2 md:space-x-3">
                {/* Theme Selector - Compact on Mobile */}
                <div className="relative">
                  <button
                    ref={setThemeButtonRef}
                    onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                    className="flex flex-col md:flex-row items-center space-y-0.5 md:space-y-0 md:space-x-2 px-1.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 text-white/80 hover:text-white transition-all duration-300 rounded-md sm:rounded-lg hover:bg-white/10"
                  >
                    <div className="flex items-center justify-center">
                      {currentTheme === 'light' ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                    </div>
                    <span className="text-xs md:hidden font-light leading-none">Theme</span>
                    <span className="hidden md:inline text-sm font-light">Theme</span>
                  </button>
                </div>

                {/* Agents Navigation - Compact on Mobile */}
                <button
                  onClick={onNavigateToWorkflows}
                  className="flex flex-col md:flex-row items-center space-y-0.5 md:space-y-0 md:space-x-2 px-1.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 text-white/80 hover:text-white transition-all duration-300 rounded-md sm:rounded-lg hover:bg-white/10"
                >
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:hidden font-light leading-none">Agents</span>
                  <span className="hidden md:inline text-sm font-light">Agents</span>
                </button>

                {/* Version Selector - Compact on Mobile */}
                <div className="relative">
                  <button
                    ref={setVersionButtonRef}
                    onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                    className="flex flex-col md:flex-row items-center space-y-0.5 md:space-y-0 md:space-x-2 px-1.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 text-white/80 hover:text-white transition-all duration-300 rounded-md sm:rounded-lg hover:bg-white/10"
                  >
                    <div className="flex items-center justify-center">
                      <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-xs md:hidden font-light leading-none">AI</span>
                    <span className="hidden md:inline text-sm font-medium text-white">
                      {selectedVersion}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 custom-scrollbar relative z-10"
            >
              {/* Empty Chat State */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-4 sm:py-8">
                  <div className="relative mb-8">
                    <img 
                      src={aiService.getAIModel(selectedVersion.toLowerCase())?.avatar || "/duneicon copy.webp"} 
                      alt={selectedVersion} 
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-30 animate-pulse-slow"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.4))'
                      }}
                    />
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-light text-white/60 mb-1 tracking-wider -mt-4 sm:-mt-6">
                    ASK {selectedVersion} ANYTHING
                  </h2>
                  <p className="text-xs sm:text-sm text-white/50 font-light tracking-wide max-w-xs sm:max-w-md px-4">
                    {aiService.getAIModel(selectedVersion.toLowerCase())?.subtitle || 'AI Assistant'} awaits your queries
                  </p>
                </div>
              )}
              
              <MessageList
                messages={messages}
                theme={currentTheme}
                onCopy={handleCopyMessage}
                onRegenerate={handleRegenerateResponse}
                copiedMessageId={copiedMessageId}
                regeneratingMessageId={regeneratingMessageId}
              />

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex items-start space-x-3 mb-6">
                  <img
                    src={aiService.getAIModel(selectedVersion.toLowerCase())?.avatar || "/duneicon.webp"}
                    alt={selectedVersion}
                    className="w-12 h-12 object-cover rounded-lg animate-opacity-fluctuate"
                  />
                  <div className="space-y-2">
                    <div className="text-sm text-white/80 font-light animate-pulse">
                      thinking...
                    </div>
                  </div>
                </div>
              )}

              {/* Streaming Message */}
              {isStreaming && (
                <StreamingMessage
                  content={streamingContent}
                  aiAvatar={aiService.getAIModel(selectedVersion.toLowerCase())?.avatar || "/duneicon.webp"}
                />
              )}
              
              {/* Auto scroll target */}
              <div ref={messagesEndRef} />
            </div>

            {/* Advanced Input Area */}
            <div ref={inputRef}>
              <AdvancedInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>

      {/* Theme Dropdown Portal */}
      {showThemeDropdown && themeButtonRef && createPortal(
        <div 
          className="fixed backdrop-blur-2xl border border-blue-400/30 rounded-xl overflow-hidden shadow-2xl z-[99999]"
          style={{
            top: `${themeButtonRef.getBoundingClientRect().bottom + 8}px`,
            left: isMobile 
              ? `${Math.max(8, themeButtonRef.getBoundingClientRect().left - 80)}px`
              : `${themeButtonRef.getBoundingClientRect().right - 180}px`,
            width: isMobile ? '160px' : '180px',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 80px rgba(59, 130, 246, 0.2)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {availableThemes.map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => {
                setCurrentTheme(themeOption.id);
                setShowThemeDropdown(false);
              }}
              className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm font-light transition-all duration-300 flex items-center space-x-2 sm:space-x-3 ${
                currentTheme === themeOption.id 
                  ? 'bg-blue-500/20 text-white border-l-3 border-blue-400' 
                  : 'text-white/80 hover:bg-blue-500/10 hover:text-white'
              }`}
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400" />
              <span>{themeOption.displayName}</span>
            </button>
          ))}
        </div>,
        document.body
      )}

      {/* Version Dropdown Portal */}
      {showVersionDropdown && versionButtonRef && createPortal(
        <div 
          className="fixed backdrop-blur-2xl border border-blue-400/30 rounded-xl overflow-hidden shadow-2xl z-[99999] max-h-64 overflow-y-auto custom-dropdown-scrollbar"
          style={{
            top: `${versionButtonRef.getBoundingClientRect().bottom + 8}px`,
            right: isMobile ? '8px' : `${window.innerWidth - versionButtonRef.getBoundingClientRect().right}px`,
            width: isMobile ? '200px' : '280px',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 80px rgba(59, 130, 246, 0.2)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {aiModels.map((model) => (
            <button
              key={model.id}
              onClick={() => {
                setSelectedVersion(model.name);
                setShowVersionDropdown(false);
              }}
              className={`w-full text-left px-3 py-3 sm:px-4 sm:py-3 transition-all duration-300 hover:bg-blue-500/10 ${
                selectedVersion === model.name 
                  ? 'bg-blue-500/20 text-white border-l-3 border-blue-400' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-blue-400/30 flex-shrink-0">
                  <img 
                    src={model.avatar} 
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-light text-white tracking-wider">{model.name}</div>
                  <div className="text-xs text-white/60 font-light">{model.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>,
        document.body
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes planetRotateSmooth {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }
        
        @keyframes planetRotateReverseSmooth {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-planet-rotate-smooth {
          animation: planetRotateSmooth 120s linear infinite;
        }
        
        .animate-planet-rotate-reverse-smooth {
          animation: planetRotateReverseSmooth 180s linear infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.5);
            filter: brightness(0.8);
          }
          25% { 
            opacity: 1; 
            transform: scale(1.2);
            filter: brightness(1.5);
          }
          50% { 
            opacity: 0.6; 
            transform: scale(0.8);
            filter: brightness(1.2);
          }
          75% { 
            opacity: 0.9; 
            transform: scale(1);
            filter: brightness(1.3);
          }
        }
        
        @keyframes twinkleBlue {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(0.3);
            filter: brightness(0.7) hue-rotate(0deg);
          }
          33% { 
            opacity: 0.8; 
            transform: scale(1);
            filter: brightness(1.4) hue-rotate(10deg);
          }
          66% { 
            opacity: 0.5; 
            transform: scale(0.6);
            filter: brightness(1.1) hue-rotate(-5deg);
          }
        }
        
        .twinkle-star {
          animation: twinkle 3s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        
        .twinkle-star-blue {
          animation: twinkleBlue 4s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        
        @keyframes opacityFluctuate {
          0%, 100% { 
            opacity: 0.7;
            filter: brightness(0.9);
          }
          50% { 
            opacity: 1;
            filter: brightness(1.1);
          }
        }
        
        .animate-opacity-fluctuate {
          animation: opacityFluctuate 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(99, 102, 241, 0.4));
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(99, 102, 241, 0.7));
        }
        
        .custom-dropdown-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-dropdown-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 2px;
        }
        
        .custom-dropdown-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.6));
          border-radius: 2px;
        }
        
        .custom-dropdown-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8));
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};