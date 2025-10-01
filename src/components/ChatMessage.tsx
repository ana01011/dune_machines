import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Crown, User, Brain, Sparkles, Target, Eye } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'omnius';
  timestamp: Date;
  type: 'text' | 'code' | 'image' | 'voice';
  mood?: 'curious' | 'analytical' | 'creative' | 'contemplative';
}

interface ChatMessageProps {
  message: Message;
  theme?: 'light' | 'dark';
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme = 'light' }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      gsap.fromTo(messageRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, []);

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'curious': return <Eye className="w-4 h-4" />;
      case 'analytical': return <Brain className="w-4 h-4" />;
      case 'creative': return <Sparkles className="w-4 h-4" />;
      case 'contemplative': return <Target className="w-4 h-4" />;
      default: return <Crown className="w-4 h-4" />;
    }
  };

  const getMoodColor = (mood?: string) => {
    switch (mood) {
      case 'curious': return 'text-cyan-400';
      case 'analytical': return 'text-blue-400';
      case 'creative': return 'text-pink-400';
      case 'contemplative': return 'text-purple-400';
      default: return 'text-purple-400';
    }
  };

  const isOmnius = message.sender === 'omnius';

  return (
    <div
      ref={messageRef}
      className={`flex ${isOmnius ? 'justify-start' : 'justify-end'} mb-6`}
    >
      <div className={`flex items-start space-x-3 max-w-[80%] ${isOmnius ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0">
          {isOmnius ? (
            <img 
              src="/duneicon.webp" 
              alt="OMNIUS" 
              className="w-12 h-12 object-contain animate-opacity-fluctuate"
            />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-600/30 to-slate-700/30 border border-slate-400/30 flex items-center justify-center">
              <User className="w-5 h-5 text-slate-400" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className={`relative ${isOmnius ? 'mr-4' : 'ml-4'}`}>
          {isOmnius ? (
            /* OMNIUS messages without bubble - clean like GPT */
            <div className="space-y-2">
              {/* Message Text */}
              <div className="text-sm sm:text-base font-light leading-relaxed text-white/95">
                {message.content}
              </div>

              {/* Timestamp and Copy */}
              <div className="flex items-center space-x-3 text-xs text-white/40 font-light">
                <span>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ) : (
            /* User messages with bubble */
            <div 
              className="relative px-6 py-4 rounded-2xl backdrop-blur-sm border bg-blue-500/20 border-blue-400/30 text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)'
              }}
            >
              {/* Message Text */}
              <div className="text-sm sm:text-base font-light leading-relaxed">
                {message.content}
              </div>

              {/* Timestamp */}
              <div className="text-xs mt-3 text-blue-300/60 font-light">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>

              {/* Holographic Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};