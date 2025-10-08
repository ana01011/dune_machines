import React, { useState } from 'react';
import { Zap, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface TokenDisplayMobileProps {
  tokensRemaining: number;
  dailyLimit: number;
  className?: string;
}

export const TokenDisplayMobile: React.FC<TokenDisplayMobileProps> = ({
  tokensRemaining,
  dailyLimit,
  className = ''
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const percentage = Math.max(0, Math.min(100, (tokensRemaining / dailyLimit) * 100));

  const getStatusColor = () => {
    if (percentage >= 100) return '#2563EB';
    if (percentage > 60) return '#60A5FA';
    if (percentage > 30) return '#FB923C';
    return '#F87171';
  };

  const getStatusGlow = () => {
    if (percentage >= 100) return 'rgba(37, 99, 235, 0.4)';
    if (percentage > 60) return 'rgba(96, 165, 250, 0.3)';
    if (percentage > 30) return 'rgba(251, 146, 60, 0.3)';
    return 'rgba(248, 113, 113, 0.4)';
  };

  const statusColor = getStatusColor();
  const statusGlow = getStatusGlow();
  const shouldBlink = percentage <= 30;

  return (
    <>
      {/* Mobile Icon Button */}
      <button
        onClick={() => setShowPopup(true)}
        className={`flex flex-col items-center justify-center p-1.5 sm:p-2 ${className}`}
      >
        <Zap
          className={`w-4 h-4 sm:w-5 sm:h-5 ${shouldBlink ? 'animate-blink' : 'animate-pulse'}`}
          style={{ color: statusColor }}
        />
        <span className="text-[9px] sm:text-[10px] font-light text-white/60 mt-0.5">
          tokens
        </span>
      </button>

      {/* Popup Modal */}
      {showPopup && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative rounded-2xl p-6 max-w-sm w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: `0 0 40px ${statusGlow}, inset 0 0 40px rgba(255, 255, 255, 0.05)`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/60 hover:text-white/90 hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <Zap
                className="w-8 h-8"
                style={{ color: statusColor }}
              />
              <div>
                <h3 className="text-xl font-light text-white">Neural Tokens</h3>
                <p className="text-sm text-white/60">Daily Usage</p>
              </div>
            </div>

            {/* Token Count */}
            <div className="mb-6">
              <div className="flex items-baseline justify-center space-x-2 mb-2">
                <span className="text-4xl font-light text-white">
                  {tokensRemaining.toLocaleString()}
                </span>
                <span className="text-xl text-white/50">
                  / {dailyLimit.toLocaleString()}
                </span>
              </div>
              <div className="text-center text-sm text-white/60">
                {percentage.toFixed(1)}% remaining
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-black/40 rounded-full overflow-hidden border border-white/10 mb-4">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${percentage}%`,
                  background: `linear-gradient(90deg, ${statusColor}E6 0%, ${statusColor}B3 100%)`,
                  boxShadow: `0 0 15px ${statusGlow}, inset 0 1px 3px rgba(255, 255, 255, 0.2)`
                }}
              >
                <div
                  className="absolute inset-0 animate-shimmer"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    backgroundSize: '200% 100%'
                  }}
                />
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center">
              {percentage >= 100 && (
                <p className="text-sm text-blue-400">
                  ✨ Full capacity - unlimited creativity!
                </p>
              )}
              {percentage > 60 && percentage < 100 && (
                <p className="text-sm text-cyan-400">
                  ⚡ Plenty of tokens available
                </p>
              )}
              {percentage > 30 && percentage <= 60 && (
                <p className="text-sm text-orange-400">
                  ⚠️ Moderate usage - conserve wisely
                </p>
              )}
              {percentage <= 30 && (
                <p className="text-sm text-red-400">
                  🔴 Low tokens - replenishes daily
                </p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes blink {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0.3;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .animate-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};
