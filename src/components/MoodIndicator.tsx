import React from 'react';

export interface Mood {
  name: string;
  color: string;
  description: string;
  animation: 'pulse' | 'glow' | 'ripple' | 'breathe';
  hints?: string[];
}

interface MoodIndicatorProps {
  mood: Mood;
  className?: string;
}

export const MoodIndicator: React.FC<MoodIndicatorProps> = ({ mood, className = '' }) => {
  return (
    <div className={`flex items-center space-x-2 md:space-x-3 ${className}`}>
      <div className="relative flex-shrink-0">
        <div
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full animate-${mood.animation}`}
          style={{
            backgroundColor: mood.color,
            boxShadow: `0 0 10px ${mood.color}80, 0 0 20px ${mood.color}40`
          }}
        >
          {mood.animation === 'ripple' && (
            <>
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: mood.color,
                  opacity: 0.4
                }}
              />
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  backgroundColor: mood.color,
                  opacity: 0.2,
                  animationDelay: '0.5s'
                }}
              />
            </>
          )}
          {mood.animation === 'glow' && (
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                backgroundColor: mood.color,
                filter: 'blur(4px)',
                opacity: 0.6
              }}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-xs md:text-sm font-light text-white/90 tracking-wide">
          {mood.description}
        </span>
        {mood.hints && mood.hints.length > 0 && (
          <span className="text-[10px] md:text-xs text-white/50 italic truncate">
            {mood.hints[0]}
          </span>
        )}
      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.7;
          }
        }

        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
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
          animation: ripple 2s ease-out infinite;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const predefinedMoods: Record<string, Mood> = {
  curious: {
    name: 'curious',
    color: '#60A5FA',
    description: 'Curious',
    animation: 'ripple',
    hints: ['Exploring new ideas...']
  },
  analytical: {
    name: 'analytical',
    color: '#A78BFA',
    description: 'Analytical',
    animation: 'pulse',
    hints: ['Processing information...']
  },
  creative: {
    name: 'creative',
    color: '#F472B6',
    description: 'Creative',
    animation: 'glow',
    hints: ['Generating possibilities...']
  },
  contemplative: {
    name: 'contemplative',
    color: '#34D399',
    description: 'Contemplative',
    animation: 'breathe',
    hints: ['Deep in thought...']
  },
  focused: {
    name: 'focused',
    color: '#FBBF24',
    description: 'Focused',
    animation: 'pulse',
    hints: ['Concentrating...']
  },
  inspired: {
    name: 'inspired',
    color: '#FB923C',
    description: 'Inspired',
    animation: 'glow',
    hints: ['Experiencing breakthrough...']
  }
};
