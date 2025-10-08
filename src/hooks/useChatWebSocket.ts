import { useEffect, useRef, useState, useCallback } from 'react';
import { ChatWebSocket } from '../services/chatWebSocket';
import { Mood } from '../components/MoodIndicator';

interface UseChatWebSocketOptions {
  conversationId: string;
  token?: string;
  onResponseChunk?: (chunk: string) => void;
  onComplete?: () => void;
  enabled?: boolean;
}

interface UseChatWebSocketReturn {
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  currentMood: Mood | null;
  tokensRemaining: number;
  thinkingMessage: string | null;
  error: string | null;
  sendMessage: (message: any) => void;
  disconnect: () => void;
}

export const useChatWebSocket = ({
  conversationId,
  token = 'demo-token',
  onResponseChunk,
  onComplete,
  enabled = false
}: UseChatWebSocketOptions): UseChatWebSocketReturn => {
  const wsRef = useRef<ChatWebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [tokensRemaining, setTokensRemaining] = useState(10000);
  const [thinkingMessage, setThinkingMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMoodUpdate = useCallback((mood: Mood) => {
    setCurrentMood(mood);
  }, []);

  const handleResponseChunk = useCallback((chunk: string) => {
    onResponseChunk?.(chunk);
  }, [onResponseChunk]);

  const handleThinking = useCallback((message: string) => {
    setThinkingMessage(message);
  }, []);

  const handleTokenUpdate = useCallback((tokens: number) => {
    setTokensRemaining(tokens);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  }, []);

  const handleComplete = useCallback(() => {
    setThinkingMessage(null);
    onComplete?.();
  }, [onComplete]);

  const handleConnection = useCallback((status: 'connected' | 'disconnected' | 'reconnecting') => {
    setConnectionStatus(status);
    setIsConnected(status === 'connected');
  }, []);

  useEffect(() => {
    if (!enabled) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    wsRef.current = new ChatWebSocket(conversationId, token, {
      onMoodUpdate: handleMoodUpdate,
      onResponseChunk: handleResponseChunk,
      onThinking: handleThinking,
      onTokenUpdate: handleTokenUpdate,
      onError: handleError,
      onComplete: handleComplete,
      onConnection: handleConnection
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [
    conversationId,
    token,
    enabled,
    handleMoodUpdate,
    handleResponseChunk,
    handleThinking,
    handleTokenUpdate,
    handleError,
    handleComplete,
    handleConnection
  ]);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current) {
      wsRef.current.send(message);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
      setConnectionStatus('disconnected');
    }
  }, []);

  return {
    isConnected,
    connectionStatus,
    currentMood,
    tokensRemaining,
    thinkingMessage,
    error,
    sendMessage,
    disconnect
  };
};
