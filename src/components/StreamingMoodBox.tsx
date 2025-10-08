import React from 'react';
import { Mood } from './MoodIndicator';

interface StreamingMoodBoxProps {
  mood: Mood;
  message?: string;
}

export const StreamingMoodBox: React.FC<StreamingMoodBoxProps> = ({ mood, message = 'Thinking...' }) => {
  return (
    <div className="flex justify-start mb-4 sm:mb-6">
      <div className="flex items-start space-x-3 sm:space-x-4 max-w-[85%] sm:max-w-[80%]">
        <div className="flex-shrink-0">
          <img
            src="/duneicon.webp"
            alt="AI"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain animate-opacity-fluctuate"
          />
        </div>

        <div className="relative mr-2 sm:mr-4">
          <div
            className="relative px-4 py-3 rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${mood.color}15 0%, ${mood.color}08 100%)`,
              border: `1px solid ${mood.color}40`,
              boxShadow: `0 0 20px ${mood.color}30, inset 0 0 20px ${mood.color}10`
            }}
          >
            {/* Animated border glow */}
            <div
              className="absolute inset-0 rounded-xl animate-border-glow"
              style={{
                background: `linear-gradient(90deg, transparent, ${mood.color}60, transparent)`,
                backgroundSize: '200% 100%'
              }}
            />

            {/* Progressive shine effect */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${mood.color}40 50%, transparent 100%)`,
                backgroundSize: '200% 100%',
                animation: 'shine 2s linear infinite'
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full animate-${mood.animation}`}
                style={{
                  backgroundColor: mood.color,
                  boxShadow: `0 0 10px ${mood.color}, 0 0 20px ${mood.color}60`
                }}
              />
              <div className="flex-1">
                <div className="text-sm font-light text-white/90">
                  {mood.description}
                </div>
                <div className="text-xs text-white/50 mt-0.5">
                  {message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes border-glow {
          0% {
            background-position: -200% 0;
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            background-position: 200% 0;
            opacity: 0.3;
          }
        }

        .animate-border-glow {
          animation: border-glow 3s linear infinite;
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        .animate-breathe {
          animation: breathe 2s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 2px currentColor);
          }
          50% {
            filter: brightness(1.5) drop-shadow(0 0 8px currentColor);
          }
        }

        .animate-ripple {
          animation: ripple 1.5s ease-out infinite;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
