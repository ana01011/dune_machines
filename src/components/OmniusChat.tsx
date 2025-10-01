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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
              className="w-80 lg:w-80 md:w-72 sm:w-64 border-r border-white/5 backdrop-blur-xl flex flex-col fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto"
              style={{
                background: currentTheme === 'light' 
                  ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(1,4,9,0.85) 15%, rgba(2,6,23,0.85) 30%, rgba(10,15,28,0.85) 45%, rgba(15,23,42,0.85) 60%, rgba(2,6,23,0.85) 75%, rgba(1,4,9,0.85) 85%, rgba(0,0,0,0.85) 100%)'
                  : 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
              }}
            >
              {/* Sidebar Header */}
              <div className="p-3 sm:p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm sm:text-lg font-light text-white tracking-wider">CHAT HISTORY</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 sm:p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-400/30 text-white hover:from-purple-600/40 hover:to-indigo-600/40 hover:border-purple-400/50 transition-all duration-300 group"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-medium tracking-wide text-sm sm:text-base">NEW CHAT</span>
                </button>
              </div>
              
              {/* Chat History List */}
              <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 custom-scrollbar">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setCurrentChatId(chat.id)}
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
                          <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm font-medium text-white truncate mb-1">
                              {chat.title}
                            </h3>
                            <p className="text-xs text-white/60 line-clamp-2 leading-relaxed hidden sm:block">
                              {chat.lastMessage}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-white/40 font-light">
                            {chat.timestamp.toLocaleDateString()}
                          </div>
                          <div className="text-xs text-blue-400/60 hidden sm:block">
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
                        <Edit2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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
                        <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Overlay for Sidebar */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Chat Area */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : ''}`}>
          
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
                    className="p-1.5 sm:p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
                  >
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
                
                <button
                  onClick={onBack}
                  className="p-1.5 sm:p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <div className="flex items-center space-x-3">
                  {/* OMNIUS Icon - No Box */}
                  <div className="relative">
                    <img 
                      src="/duneicon.webp" 
                      alt="OMNIUS" 
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain animate-opacity-fluctuate"
                    />
                  </div>
                  
                  <div>
                    <h1 className="text-sm sm:text-base font-light text-white tracking-wider">OMNIUS</h1>
                    <p className="text-xs text-white/70 font-light hidden sm:block">The Evermind Supreme</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Theme Selector */}
                <div className="relative">
                  <button
                    ref={setThemeButtonRef}
                    onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                    className="relative flex flex-col items-center space-y-1 px-2 sm:px-3 py-1.5 sm:py-2 text-white/90 hover:text-white transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                      {currentTheme === 'light' ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </div>
                    <span className="text-xs font-light text-white hidden sm:block">Theme</span>
                  </button>
                </div>

                {/* Agents Navigation */}
                <button
                  onClick={onNavigateToWorkflows}
                  className="flex flex-col items-center space-y-1 px-2 sm:px-3 py-1.5 sm:py-2 text-white/90 hover:text-white transition-all duration-300"
                >
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs font-light text-white hidden sm:block">Agents</span>
                </button>

                {/* Version Selector */}
                <div className="relative">
                  <button
                    ref={setVersionButtonRef}
                    onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 text-white/90 hover:text-white transition-all duration-300"
                  >
                    <span className="text-xs sm:text-sm font-medium text-white hidden sm:block">
                      {aiModels.find(model => model.name === selectedVersion)?.name || selectedVersion}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white sm:hidden">
                      {(aiModels.find(model => model.name === selectedVersion)?.name || selectedVersion).slice(0, 3)}
                    </span>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
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
                <div className="flex flex-col items-center justify-center h-full text-center py-6 sm:py-8">
                  <div className="relative mb-8">
                    <img 
                      src="/duneicon.webp" 
                      alt="OMNIUS" 
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-30 animate-pulse-slow"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.4))'
                      }}
                    />
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-light text-white/60 mb-1 tracking-wider -mt-4 sm:-mt-6">
                    ASK OMNIUS ANYTHING
                  </h2>
                  <p className="text-xs sm:text-sm text-white/50 font-light tracking-wide max-w-xs sm:max-w-md px-4">
                    The Evermind Supreme awaits your queries with infinite processing power
                  </p>
                </div>
              )}
              
              {messages.map((message) => (
                <div key={message.id} className="mb-4 sm:mb-6">
                  <ChatMessage message={message} theme={currentTheme} />
                  {message.sender === 'omnius' && (
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-2 ml-10 sm:ml-13">
                      <button
                        onClick={() => handleCopyMessage(message.content, message.id)}
                        className="flex items-center space-x-1 text-xs text-white/50 hover:text-white/80 transition-all duration-300"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? (
                          <>
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                            <span className="text-green-400 hidden sm:inline">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleRegenerateResponse(message.id)}
                        disabled={regeneratingMessageId === message.id}
                        className="flex items-center space-x-1 text-xs text-white/50 hover:text-white/80 transition-all duration-300 disabled:opacity-50"
                        title="Regenerate response"
                      >
                        <RotateCcw className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${regeneratingMessageId === message.id ? 'animate-spin' : ''}`} />
                        <span className="hidden sm:inline">{regeneratingMessageId === message.id ? 'Regenerating...' : 'Regenerate'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex items-start space-x-3 mb-4 sm:mb-6">
                  <img 
                    src="/duneicon.webp" 
                    alt="OMNIUS" 
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain animate-opacity-fluctuate"
                  />
                  <div className="space-y-2">
                    <div className="text-xs sm:text-sm text-white/80 font-light animate-pulse">
                      thinking...
                    </div>
                  </div>
                </div>
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
          className="fixed backdrop-blur-2xl border border-blue-400/30 rounded-2xl overflow-hidden shadow-2xl z-[99999]"
          style={{
            top: `${themeButtonRef.getBoundingClientRect().bottom + 8}px`,
           left: `${themeButtonRef.getBoundingClientRect().left}px`,
           width: '160px',
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
              className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm font-light transition-all duration-300 flex items-center space-x-2 ${
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
          className="fixed backdrop-blur-2xl border border-blue-400/30 rounded-2xl overflow-hidden shadow-2xl z-[99999]"
          style={{
            top: `${versionButtonRef.getBoundingClientRect().bottom + 8}px`,
            left: `${Math.max(8, versionButtonRef.getBoundingClientRect().right - 280)}px`,
            width: '280px',
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
              className={`w-full text-left px-4 py-3 transition-all duration-300 hover:bg-blue-500/10 ${
                selectedVersion === model.name 
                  ? 'bg-blue-500/20 text-white border-l-3 border-blue-400' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400" />
                <div>
                  <div className="text-xs sm:text-sm font-light text-white tracking-wider">{model.name}</div>
                  <div className="text-xs text-white/60 font-light hidden sm:block">{model.subtitle}</div>
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