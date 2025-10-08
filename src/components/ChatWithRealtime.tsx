import React, { useState } from 'react';
import { useChatWebSocket } from '../hooks/useChatWebSocket';
import { MoodIndicator, predefinedMoods } from './MoodIndicator';
import { TokenDisplay } from './TokenDisplay';
import { StreamingMessage } from './StreamingMessage';
import { WifiOff, Wifi } from 'lucide-react';

interface ChatWithRealtimeProps {
  conversationId: string;
  enableWebSocket?: boolean;
}

export const ChatWithRealtime: React.FC<ChatWithRealtimeProps> = ({
  conversationId,
  enableWebSocket = false
}) => {
  const [streamingChunks, setStreamingChunks] = useState<string[]>([]);

  const {
    isConnected,
    connectionStatus,
    currentMood,
    tokensRemaining,
    thinkingMessage,
    error,
    sendMessage
  } = useChatWebSocket({
    conversationId,
    enabled: enableWebSocket,
    onResponseChunk: (chunk) => {
      setStreamingChunks(prev => [...prev, chunk]);
    },
    onComplete: () => {
      setStreamingChunks([]);
    }
  });

  return (
    <div className="space-y-4">
      {/* Connection & Status Bar */}
      <div className="flex items-center justify-between p-3 md:p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
            <span className="text-xs md:text-sm text-white/70 capitalize">
              {connectionStatus}
            </span>
          </div>

          {/* Mood Indicator */}
          {enableWebSocket && currentMood && (
            <>
              <div className="w-px h-6 bg-white/10" />
              <MoodIndicator mood={currentMood} />
            </>
          )}
        </div>

        {/* Token Display */}
        {enableWebSocket && (
          <TokenDisplay
            tokensRemaining={tokensRemaining}
            dailyLimit={10000}
            showDetails={false}
          />
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Thinking Indicator */}
      {thinkingMessage && (
        <div className="flex items-center space-x-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-sm text-blue-400">{thinkingMessage}</p>
        </div>
      )}

      {/* Streaming Message */}
      {streamingChunks.length > 0 && (
        <StreamingMessage
          content=""
          chunks={streamingChunks}
          isComplete={false}
        />
      )}
    </div>
  );
};

export default ChatWithRealtime;
