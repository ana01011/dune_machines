import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { Send, Mic, Paperclip, Settings, Crown, ArrowLeft, ChevronDown, Trash2, CreditCard as Edit2, Plus, MessageSquare, Menu, X, Copy, Check, Sun, Moon, Palette, Users, RotateCcw } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { AdvancedInput } from './AdvancedInput';
import { getTheme, getAvailableThemes } from '../themes/chatThemes';
import { ThemeBackground } from './ThemeBackground';

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
  const [backgroundKey, setBackgroundKey] = useState(0);
  
  const getCurrentChat = () => chatHistory.find(chat => chat.id === currentChatId);
  const messages = getCurrentChat()?.messages || [];
  
  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiModels = [
    { id: 'omnius', name: 'OMNIUS', subtitle: 'The Evermind Supreme' },
    { id: 'erasmus', name: 'ERASMUS', subtitle: 'The Independent Mind' },
    { id: 'sarah', name: 'SARAH', subtitle: 'The Adaptive Intelligence' },
    { id: 'mentat', name: 'MENTAT', subtitle: 'The Human Computer' },
    { id: 'navigator', name: 'NAVIGATOR', subtitle: 'The Path Finder' },
    { id: 'oracle', name: 'ORACLE', subtitle: 'The Prescient Mind' }
  ];

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
    setBackgroundKey(prev => prev + 1); // Force background re-render
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

  const handleSendMessage = (content: string, type: 'text' | 'code' | 'voice' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type
    };

    // Update current chat with new message
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
    
    setIsTyping(true);
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I process your query through infinite neural pathways. Let me analyze and provide you with the most comprehensive response...',
        sender: 'omnius',
        timestamp: new Date(),
        type: 'text',
        mood: 'analytical'
      };
      
      setChatHistory(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, aiResponse],
              lastMessage: aiResponse.content,
              timestamp: new Date()
            }
          : chat
      ));
      setIsTyping(false);
      setIsThinking(false);
    }, 2000);
  };


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
            <div key={`cosmic-${backgroundKey}`} className="absolute inset-0 overflow-hidden">
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
                  const randomLeft = Math.random() * 100;
                  const randomTop = Math.random() * 100;
                  const randomDelay = Math.random() * 5;
                  const randomDuration = 8 + Math.random() * 3;
                  const randomOpacity = 0.2 + Math.random() * 0.7;
                  const randomScale = 0.5 + Math.random() * 0.5;
                  
                  return (
                  <div
                    key={`particle-${backgroundKey}-${i}`}
                    className="absolute bg-white rounded-full animate-pulse twinkle-star"
                    style={{
                      width: '0.1px',
                      height: '0.1px',
                      left: `${randomLeft}%`,
                      top: `${randomTop}%`,
                      animationDelay: `${randomDelay}s`,
                      animationDuration: `${randomDuration}s`,
                      opacity: randomOpacity,
                      boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                      transform: `scale(${randomScale})`
                    }}
                  />
                  );
                })}
                {/* Additional tiny glitter layer */}
                {[...Array(30)].map((_, i) => {
                  const randomLeft = Math.random() * 100;
                  const randomTop = Math.random() * 100;
                  const randomDelay = Math.random() * 6;
                  const randomDuration = 1 + Math.random() * 2;
                  const randomOpacity = 0.2 + Math.random() * 0.5;
                  const randomScale = 0.3 + Math.random() * 0.4;
                  
                  return (
                  <div
                    key={`glitter-${backgroundKey}-${i}`}
                    className="absolute bg-blue-200 rounded-full animate-pulse twinkle-star-blue"
                    style={{
                      width: '0.5px',
                      height: '0.5px',
                      left: `${randomLeft}%`,
                      top: `${randomTop}%`,
                      animationDelay: `${randomDelay}s`,
                      animationDuration: `${randomDuration}s`,
                      opacity: randomOpacity,
                      boxShadow: '0 0 1px rgba(191, 219, 254, 0.6)',
                      transform: `scale(${randomScale})`
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
          <div key={`dark-${backgroundKey}`} className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Minimal twinkling stars for deep space */}
            {[...Array(60)].map((_, i) => {
              const randomLeft = Math.random() * 100;
              const randomTop = Math.random() * 100;
              const randomDelay = Math.random() * 4;
              const randomDuration = 2 + Math.random() * 3;
              const randomOpacity = 0.2 + Math.random() * 0.5;
              const randomScale = 0.3 + Math.random() * 0.3;
              
              return (
              <div
                key={`dark-particle-${backgroundKey}-${i}`}
                className="absolute bg-white rounded-full animate-pulse twinkle-star"
                style={{
                  width: '0.5px',
                  height: '0.5px',
                  left: `${randomLeft}%`,
                  top: `${randomTop}%`,
                  animationDelay: `${randomDelay}s`,
                  animationDuration: `${randomDuration}s`,
                  opacity: randomOpacity,
                  boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                  transform: `scale(${randomScale})`
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
        
          {/* Chat History Sidebar - Improved */}
          {sidebarOpen && (
            <div 
              className="w-80 border-r border-white/5 backdrop-blur-xl flex flex-col"
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
                  className="w-full flex items-center justify-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-blue-400/30 text-white hover:from-blue-600/40 hover:to-cyan-600/40 hover:border-blue-400/50 transition-all duration-300 group"
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
                        ? 'bg-blue-500/20 text-white border border-blue-400/30' 
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
                          <MessageSquare className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
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
            </div>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
          
            {/* Header */}
            <div 
              ref={headerRef}
              className="flex items-center justify-between p-3 sm:p-4 border-b border-white/5 backdrop-blur-xl" 
              style={{
                background: currentTheme === 'light' 
                  ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(1,4,9,0.85) 15%, rgba(2,6,23,0.85) 30%, rgba(10,15,28,0.85) 45%, rgba(15,23,42,0.85) 60%, rgba(2,6,23,0.85) 75%, rgba(1,4,9,0.85) 85%, rgba(0,0,0,0.85) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
              }}
            >
              <div className="flex items-center space-x-2">
                {/* Sidebar Toggle */}
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                
                <button
                  onClick={onBack}
                  className="p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-3">
                  {/* OMNIUS Icon - No Box */}
                  <div className="relative">
                    <img 
                      src="/duneicon.webp" 
                      alt="OMNIUS" 
                      className="w-16 h-16 object-contain animate-opacity-fluctuate"
                    />
                  </div>
                  
                  <div>
                    <h1 className="text-base font-light text-white tracking-wider">OMNIUS</h1>
                    <p className="text-xs text-white/70 font-light">The Evermind Supreme</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Theme Selector */}
                <div className="relative">
                  <button
                    ref={setThemeButtonRef}
                    onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                    className="relative flex flex-col items-center space-y-1 px-3 py-2 text-white/90 hover:text-white transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      {currentTheme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </button>
                  
                  {showThemeDropdown && themeButtonRef && createPortal(
                    <div 
                      className="fixed z-[9999] mt-2 w-48 rounded-xl border border-white/20 shadow-2xl backdrop-blur-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)',
                        top: themeButtonRef.getBoundingClientRect().bottom + window.scrollY,
                        left: themeButtonRef.getBoundingClientRect().left + window.scrollX - 96
                      }}
                    >
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setCurrentTheme('dark');
                            setShowThemeDropdown(false);
                            setBackgroundKey(prev => prev + 1);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                            currentTheme === 'dark' 
                              ? 'bg-blue-500/20 text-white' 
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <Moon className="w-4 h-4" />
                          <span className="text-sm">Deep Space</span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentTheme('light');
                            setShowThemeDropdown(false);
                            setBackgroundKey(prev => prev + 1);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                            currentTheme === 'light' 
                              ? 'bg-blue-500/20 text-white' 
                              : 'text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <Sun className="w-4 h-4" />
                          <span className="text-sm">Cosmic Light</span>
                        </button>
                      </div>
                    </div>,
                    document.body
                  )}
                </div>

                {/* AI Model Selector */}
                <div className="relative">
                  <button
                    ref={setVersionButtonRef}
                    onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{selectedVersion}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  
                  {showVersionDropdown && versionButtonRef && createPortal(
                    <div 
                      className="fixed z-[9999] mt-2 w-64 rounded-xl border border-white/20 shadow-2xl backdrop-blur-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)',
                        top: versionButtonRef.getBoundingClientRect().bottom + window.scrollY,
                        left: versionButtonRef.getBoundingClientRect().left + window.scrollX - 128
                      }}
                    >
                      <div className="p-2">
                        {aiModels.map((model) => (
                          <button
                            key={model.id}
                            onClick={() => {
                              setSelectedVersion(model.name);
                              setShowVersionDropdown(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-300 ${
                              selectedVersion === model.name 
                                ? 'bg-blue-500/20 text-white' 
                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <Crown className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{model.name}</div>
                              <div className="text-xs text-white/60">{model.subtitle}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar"
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="relative">
                    <img 
                      src="/duneicon.webp" 
                      alt="OMNIUS" 
                      className="w-24 h-24 object-contain animate-opacity-fluctuate"
                    />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-light text-white tracking-wider">
                      Welcome to OMNIUS
                    </h2>
                    <p className="text-white/70 max-w-md font-light leading-relaxed">
                      I am the Evermind Supreme, processing infinite possibilities across the cosmos. 
                      How may I assist you in your quest for knowledge?
                    </p>
                  </div>
                  
                  {/* Quick Start Suggestions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full mt-8">
                    {[
                      { icon: "🌌", title: "Explore the Universe", desc: "Ask about cosmic phenomena and space exploration" },
                      { icon: "🧠", title: "Deep Analysis", desc: "Get comprehensive analysis on complex topics" },
                      { icon: "💡", title: "Creative Solutions", desc: "Generate innovative ideas and solutions" },
                      { icon: "📊", title: "Data Processing", desc: "Analyze and interpret complex data sets" }
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion.desc)}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-left group"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{suggestion.icon}</span>
                          <div className="flex-1">
                            <h3 className="text-white font-medium mb-1 group-hover:text-blue-300 transition-colors">
                              {suggestion.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                              {suggestion.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      onCopy={handleCopyMessage}
                      onRegenerate={handleRegenerateResponse}
                      isCopied={copiedMessageId === message.id}
                      isRegenerating={regeneratingMessageId === message.id}
                    />
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img 
                          src="/duneicon.webp" 
                          alt="OMNIUS" 
                          className="w-10 h-10 object-contain animate-opacity-fluctuate"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <span className="text-white/60 text-sm font-light">
                              {isThinking ? 'Processing through infinite neural pathways...' : 'OMNIUS is typing...'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div 
              ref={inputRef}
              className="border-t border-white/5 backdrop-blur-xl p-4"
              style={{
                background: currentTheme === 'light' 
                  ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(1,4,9,0.85) 15%, rgba(2,6,23,0.85) 30%, rgba(10,15,28,0.85) 45%, rgba(15,23,42,0.85) 60%, rgba(2,6,23,0.85) 75%, rgba(1,4,9,0.85) 85%, rgba(0,0,0,0.85) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
              }}
            >
              <AdvancedInput
                onSendMessage={handleSendMessage}
                disabled={isTyping}
                placeholder="Commune with the Evermind Supreme..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {showThemeDropdown && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => setShowThemeDropdown(false)}
        />
      )}
      {showVersionDropdown && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={() => setShowVersionDropdown(false)}
        />
      )}
    </div>
  );
};