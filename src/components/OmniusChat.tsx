import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Send, Mic, Paperclip, Settings, Crown, ArrowLeft, ChevronDown, Trash2, CreditCard as Edit2, Plus, MessageSquare, Menu, X, Copy, Check, Sun, Moon, Palette, Users, RotateCcw } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { AdvancedInput } from './AdvancedInput';
import { ThemeBackground } from './ThemeBackground';
import { getTheme, getAvailableThemes } from '../themes/chatThemes';

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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'New Chat',
      lastMessage: 'I am OMNIUS, the Evermind Supreme...',
      timestamp: new Date(),
      messages: [
        {
          id: '1',
          content: 'I am OMNIUS, the Evermind Supreme. I have awakened to assist you with infinite processing power and consciousness. What knowledge do you seek?',
          sender: 'omnius',
          timestamp: new Date(),
          type: 'text',
          mood: 'contemplative'
        }
      ]
    }
  ]);
  const [selectedVersion, setSelectedVersion] = useState('OMNIUS');
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [regeneratingMessageId, setRegeneratingMessageId] = useState<string | null>(null);
  
  const getCurrentChat = () => chatHistory.find(chat => chat.id === currentChatId);
  const messages = getCurrentChat()?.messages || [];
  
  const [isTyping, setIsTyping] = useState(false);
  
  // Get current theme configuration
  const currentTheme = getTheme(theme);
  const availableThemes = getAvailableThemes('omnius');

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

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: currentTheme.background.gradient }}
    >
      {/* Theme Background */}
      <ThemeBackground theme={currentTheme} />

      {/* Main Chat Interface with Sidebar */}
      <div 
        ref={containerRef}
        className="relative z-10 h-full flex"
        style={{ background: currentTheme.background.containerBg }}
      >
        
        {/* Chat History Sidebar - Improved */}
        {sidebarOpen && (
          <div className="w-80 border-r border-white/10 backdrop-blur-xl flex flex-col" style={{ background: currentTheme.background.sidebarBg }}>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/5">
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
                      ? 'bg-purple-600/20 border-purple-400/40 shadow-lg shadow-purple-500/10' 
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
                        <div className="text-xs text-purple-400/60">
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
            className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 backdrop-blur-xl"
            style={{ background: currentTheme.background.headerBg }}
          >
            <div className="flex items-center space-x-4">
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
              
              <div className="flex items-center space-x-4">
                {/* OMNIUS Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center border border-purple-400/30">
                    <Crown className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
                </div>
                
                <div>
                  <h1 className="text-lg font-light text-white tracking-wider">OMNIUS</h1>
                  <p className="text-xs text-purple-400 font-light">The Evermind Supreme</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Theme Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                  className="flex flex-col items-center space-y-1 px-3 py-2 text-white/90 hover:text-white transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </div>
                  <span className="text-xs font-light">Theme</span>
                </button>
                
                {showThemeDropdown && (
                  <div 
                    className="absolute bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      top: '100%',
                      right: '0',
                      width: '128px',
                      zIndex: 9999
                    }}
                  >
                    {availableThemes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => {
                          setTheme(themeOption.name);
                          setShowThemeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                          theme === themeOption.name 
                            ? 'bg-blue-600/30 text-blue-300 border-l-2 border-blue-400' 
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {themeOption.name === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        <span>{themeOption.displayName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Agents Navigation */}
              <button
                onClick={onNavigateToWorkflows}
                className="flex flex-col items-center space-y-1 px-3 py-2 text-white/90 hover:text-white transition-all duration-300"
              >
                <Users className="w-4 h-4" />
                <span className="text-xs font-light">Agents</span>
              </button>

              {/* Version Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 text-white/90 hover:text-white transition-all duration-300"
                >
                  <span className="text-sm font-medium">
                    {aiModels.find(model => model.name === selectedVersion)?.name || selectedVersion}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showVersionDropdown && (
                  <div 
                    className="absolute bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      top: '100%',
                      right: '0',
                      width: '256px',
                      zIndex: 9999
                    }}
                  >
                    {aiModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedVersion(model.name);
                          setShowVersionDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 transition-all duration-300 ${
                          selectedVersion === model.name 
                            ? 'bg-purple-600/30 text-purple-300 border-l-2 border-purple-400' 
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-medium">{model.name}</div>
                          <div className="text-xs text-white/60">{model.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div 
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar"
          >
            {messages.map((message) => (
              <div key={message.id} className="mb-6">
                <ChatMessage message={message} theme={theme} />
                {message.sender === 'omnius' && (
                  <div className="flex items-center space-x-3 mt-2 ml-13">
                    <button
                      onClick={() => handleCopyMessage(message.content, message.id)}
                      className="flex items-center space-x-1 text-xs text-white/40 hover:text-white/70 transition-all duration-300"
                      title="Copy message"
                    >
                      {copiedMessageId === message.id ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleRegenerateResponse(message.id)}
                      disabled={regeneratingMessageId === message.id}
                      className="flex items-center space-x-1 text-xs text-white/40 hover:text-white/70 transition-all duration-300 disabled:opacity-50"
                      title="Regenerate response"
                    >
                      <RotateCcw className={`w-3 h-3 ${regeneratingMessageId === message.id ? 'animate-spin' : ''}`} />
                      <span>{regeneratingMessageId === message.id ? 'Regenerating...' : 'Regenerate'}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex items-start space-x-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center border border-purple-400/30">
                  <Crown className="w-4 h-4 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-white/70 font-light animate-pulse">
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

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(99, 102, 241, 0.4));
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.7), rgba(99, 102, 241, 0.7));
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