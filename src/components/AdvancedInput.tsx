import React, { useState, useRef } from 'react';
import { Send, Mic, Paperclip, Code, Image, Smile } from 'lucide-react';

interface AdvancedInputProps {
  onSendMessage: (content: string, type?: 'text' | 'code' | 'voice') => void;
}

export const AdvancedInput: React.FC<AdvancedInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'code'>('text');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), inputMode);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        
        {/* Input Mode Selector */}
        <div className="flex items-center space-x-2 mb-3">
          <button
            onClick={() => setInputMode('text')}
            className={`px-3 py-1.5 rounded-lg text-xs font-light transition-all duration-300 ${
              inputMode === 'text' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                : 'text-white/60 hover:text-white/90 hover:bg-white/5'
            }`}
          >
            Text Mode
          </button>
          <button
            onClick={() => setInputMode('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-light transition-all duration-300 flex items-center space-x-2 ${
              inputMode === 'code' 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                : 'text-white/60 hover:text-white/90 hover:bg-white/5'
            }`}
          >
            <Code className="w-3 h-3" />
            <span>Code Mode</span>
          </button>
        </div>

        {/* Main Input Area */}
        <div className="relative">
          <div className="flex items-end space-x-4">
            
            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder={inputMode === 'code' ? 'Enter your code or technical query...' : 'Ask OMNIUS anything...'}
                className={`w-full px-4 py-3 pr-12 rounded-2xl resize-none transition-all duration-300 font-light ${
                  inputMode === 'code' 
                    ? 'bg-slate-900/50 border border-cyan-400/30 text-cyan-100 placeholder-cyan-400/50 font-mono text-sm'
                    : 'bg-white/5 border border-white/20 text-white placeholder-white/50'
                } backdrop-blur-sm focus:outline-none focus:border-purple-400/50 focus:bg-white/10`}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px'
                }}
              />
              
              {/* Character Count */}
              <div className="absolute bottom-2 right-12 text-xs text-white/40">
                {message.length}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              
              {/* Attachment Button */}
              <button 
                onClick={() => console.log('Attachment clicked')}
                className="p-3 rounded-xl text-white/60 hover:text-white/90 hover:bg-white/10 transition-all duration-300"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Voice Button */}
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-500/20 text-red-400 border border-red-400/30 animate-pulse' 
                    : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  message.trim()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => console.log('Image clicked')}
                className="flex items-center space-x-2 px-2 py-1 rounded-lg text-xs text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-300"
              >
                <Image className="w-3 h-3" />
                <span>Image</span>
              </button>
              <button 
                onClick={() => console.log('Emoji clicked')}
                className="flex items-center space-x-2 px-2 py-1 rounded-lg text-xs text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-300"
              >
                <Smile className="w-3 h-3" />
                <span>Emoji</span>
              </button>
            </div>

            <div className="text-xs text-white/40 font-light">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};