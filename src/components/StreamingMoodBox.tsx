import React from 'react';
import { Mood } from './MoodIndicator';

interface StreamingMoodBoxProps {
  mood: Mood;
  message?: string;
}

export const StreamingMoodBox: React.FC<StreamingMoodBoxProps> = ({ mood, message = 'Thinking...' }) => {
  return (
    <div className="flex justify-start mb-4 sm:mb-6">
      <div className="max-w-[85%] sm:max-w-[80%] ml-11 sm:ml-14 md:ml-16">
        <div className="relative">
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
    </div>
  );
};
