type MessageHandler = (data: any) => void;

interface WebSocketMessage {
  type: 'mood_update' | 'response_chunk' | 'thinking' | 'token_update' | 'error' | 'connection' | 'complete';
  [key: string]: any;
}

interface WebSocketHandlers {
  onMoodUpdate?: (mood: any) => void;
  onResponseChunk?: (chunk: string) => void;
  onThinking?: (message: string) => void;
  onTokenUpdate?: (tokensRemaining: number) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
  onConnection?: (status: 'connected' | 'disconnected' | 'reconnecting') => void;
}

export class ChatWebSocket {
  private ws: WebSocket | null = null;
  private conversationId: string;
  private token: string;
  private handlers: WebSocketHandlers;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isIntentionallyClosed = false;

  constructor(conversationId: string, token: string, handlers: WebSocketHandlers) {
    this.conversationId = conversationId;
    this.token = token;
    this.handlers = handlers;
    this.connect();
  }

  private connect() {
    try {
      const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}/ws/chat/${this.conversationId}?token=${this.token}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.handlers.onConnection?.('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.handlers.onError?.('Connection error occurred');
      };

      this.ws.onclose = () => {
        if (!this.isIntentionallyClosed) {
          this.handlers.onConnection?.('disconnected');
          this.attemptReconnect();
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      this.handlers.onError?.('Failed to establish connection');
    }
  }

  private handleMessage(data: WebSocketMessage) {
    switch (data.type) {
      case 'mood_update':
        this.handlers.onMoodUpdate?.(data.mood);
        break;
      case 'response_chunk':
        this.handlers.onResponseChunk?.(data.chunk);
        break;
      case 'thinking':
        this.handlers.onThinking?.(data.message);
        break;
      case 'token_update':
        this.handlers.onTokenUpdate?.(data.tokens_remaining);
        break;
      case 'complete':
        this.handlers.onComplete?.();
        break;
      case 'error':
        this.handlers.onError?.(data.message);
        break;
      case 'connection':
        this.handlers.onConnection?.(data.status);
        break;
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.handlers.onConnection?.('reconnecting');

      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      this.handlers.onError?.('Failed to reconnect after multiple attempts');
    }
  }

  public send(message: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public close() {
    this.isIntentionallyClosed = true;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}
