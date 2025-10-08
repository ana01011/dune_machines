import React from 'react';
import { Zap } from 'lucide-react';

interface TokenDisplayProps {
  tokensRemaining: number;
  dailyLimit: number;
  className?: string;
  showDetails?: boolean;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({
  tokensRemaining,
  dailyLimit,
  className = '',
  showDetails = true
}) => {
  const percentage = Math.max(0, Math.min(100, (tokensRemaining / dailyLimit) * 100));

  const getStatusColor = () => {
    if (percentage > 60) return '#34D399';
    if (percentage > 30) return '#FBBF24';
    return '#F87171';
  };

  const getStatusGlow = () => {
    if (percentage > 60) return 'rgba(52, 211, 153, 0.3)';
    if (percentage > 30) return 'rgba(251, 191, 36, 0.3)';
    return 'rgba(248, 113, 113, 0.3)';
  };

  const statusColor = getStatusColor();
  const statusGlow = getStatusGlow();

  return (
    <div className={`flex items-center space-x-2 md:space-x-3 ${className}`} style={{ minWidth: showDetails ? '180px' : '120px' }}>
      <div className="relative flex items-center space-x-2 flex-1">
        <div className="flex-shrink-0">
          <div className="relative">
            <Zap
              className="w-4 h-4 md:w-5 md:h-5 animate-pulse"
              style={{ color: statusColor }}
            />
            <div
              className="absolute inset-0 rounded-full blur-md animate-pulse"
              style={{
                backgroundColor: statusGlow,
                opacity: 0.6
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="relative h-2 md:h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                background: `linear-gradient(90deg, ${statusColor}E6 0%, ${statusColor}B3 100%)`,
                boxShadow: `0 0 10px ${statusGlow}, inset 0 1px 2px rgba(255, 255, 255, 0.2)`
              }}
            >
              <div
                className="absolute inset-0 animate-shimmer"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)`,
                  backgroundSize: '200% 100%'
                }}
              />
            </div>

            {percentage < 100 && (
              <div
                className="absolute inset-y-0 right-0 w-1 animate-pulse"
                style={{
                  background: `linear-gradient(180deg, ${statusColor} 0%, transparent 100%)`,
                  opacity: 0.5
                }}
              />
            )}
          </div>

          {showDetails && (
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] md:text-xs font-light text-white/70 tracking-wide">
                {tokensRemaining.toLocaleString()} / {dailyLimit.toLocaleString()}
              </span>
              <span className="text-[10px] md:text-xs font-light text-white/50">
                neural tokens
              </span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export const TokenDisplayCompact: React.FC<TokenDisplayProps> = ({
  tokensRemaining,
  dailyLimit,
  className = ''
}) => {
  const percentage = Math.max(0, Math.min(100, (tokensRemaining / dailyLimit) * 100));

  const getStatusColor = () => {
    if (percentage > 60) return '#34D399';
    if (percentage > 30) return '#FBBF24';
    return '#F87171';
  };

  return (
    <div className={`flex items-center space-x-1.5 ${className}`}>
      <Zap className="w-3 h-3 md:w-4 md:h-4" style={{ color: getStatusColor() }} />
      <span className="text-xs md:text-sm font-light text-white/70">
        {tokensRemaining.toLocaleString()}
      </span>
    </div>
  );
};
