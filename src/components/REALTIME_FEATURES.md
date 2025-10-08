# Real-Time Chat Features

This document explains how to use the real-time chat components with WebSocket support.

## Components Overview

### 1. ChatWebSocket Service
Located in `src/services/chatWebSocket.ts`

Handles WebSocket connections with automatic reconnection and message handling.

```typescript
import { ChatWebSocket } from '../services/chatWebSocket';

const ws = new ChatWebSocket(conversationId, token, {
  onMoodUpdate: (mood) => console.log('Mood:', mood),
  onResponseChunk: (chunk) => console.log('Chunk:', chunk),
  onThinking: (message) => console.log('Thinking:', message),
  onTokenUpdate: (tokens) => console.log('Tokens:', tokens),
  onError: (error) => console.error('Error:', error),
  onComplete: () => console.log('Complete'),
  onConnection: (status) => console.log('Status:', status)
});
```

### 2. MoodIndicator Component
Located in `src/components/MoodIndicator.tsx`

Displays AI's current mood with animated indicators.

```typescript
import { MoodIndicator, predefinedMoods } from './MoodIndicator';

<MoodIndicator mood={predefinedMoods.curious} />
```

**Available Moods:**
- `curious` - Blue, ripple animation
- `analytical` - Purple, pulse animation
- `creative` - Pink, glow animation
- `contemplative` - Green, breathe animation
- `focused` - Yellow, pulse animation
- `inspired` - Orange, glow animation

### 3. TokenDisplay Component
Located in `src/components/TokenDisplay.tsx`

Shows remaining neural tokens with visual progress bar.

```typescript
import { TokenDisplay, TokenDisplayCompact } from './TokenDisplay';

// Full display with details
<TokenDisplay
  tokensRemaining={7500}
  dailyLimit={10000}
  showDetails={true}
/>

// Compact display
<TokenDisplayCompact
  tokensRemaining={7500}
  dailyLimit={10000}
/>
```

### 4. StreamingMessage Component
Located in `src/components/StreamingMessage.tsx`

Enhanced to support chunked streaming with animated cursor.

```typescript
import { StreamingMessage } from './StreamingMessage';

<StreamingMessage
  content=""
  chunks={['Hello', ' ', 'World']}
  isComplete={false}
  showCursor={true}
/>
```

### 5. useChatWebSocket Hook
Located in `src/hooks/useChatWebSocket.ts`

React hook for easy WebSocket integration.

```typescript
import { useChatWebSocket } from '../hooks/useChatWebSocket';

const {
  isConnected,
  connectionStatus,
  currentMood,
  tokensRemaining,
  thinkingMessage,
  error,
  sendMessage,
  disconnect
} = useChatWebSocket({
  conversationId: 'chat-123',
  token: 'user-token',
  enabled: true,
  onResponseChunk: (chunk) => {
    // Handle chunk
  },
  onComplete: () => {
    // Handle completion
  }
});
```

## Integration Example

```typescript
import React, { useState } from 'react';
import { useChatWebSocket } from '../hooks/useChatWebSocket';
import { MoodIndicator } from './MoodIndicator';
import { TokenDisplay } from './TokenDisplay';
import { StreamingMessage } from './StreamingMessage';

const MyChat = () => {
  const [chunks, setChunks] = useState<string[]>([]);

  const {
    isConnected,
    currentMood,
    tokensRemaining,
    thinkingMessage
  } = useChatWebSocket({
    conversationId: 'my-chat',
    enabled: true,
    onResponseChunk: (chunk) => {
      setChunks(prev => [...prev, chunk]);
    },
    onComplete: () => {
      setChunks([]);
    }
  });

  return (
    <div>
      {/* Status Bar */}
      <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl">
        {currentMood && <MoodIndicator mood={currentMood} />}
        <TokenDisplay tokensRemaining={tokensRemaining} dailyLimit={10000} />
      </div>

      {/* Thinking Indicator */}
      {thinkingMessage && (
        <div className="p-3 text-blue-400">
          {thinkingMessage}
        </div>
      )}

      {/* Streaming Response */}
      {chunks.length > 0 && (
        <StreamingMessage
          content=""
          chunks={chunks}
          isComplete={false}
        />
      )}
    </div>
  );
};
```

## Environment Setup

Add to your `.env` file:

```bash
# WebSocket URL (optional - defaults to ws://localhost:8000)
VITE_WS_URL=ws://your-websocket-server.com
```

## Backend WebSocket Message Format

Your WebSocket server should send messages in this format:

```json
{
  "type": "mood_update",
  "mood": {
    "name": "curious",
    "color": "#60A5FA",
    "description": "Curious",
    "animation": "ripple",
    "hints": ["Exploring new ideas..."]
  }
}
```

```json
{
  "type": "response_chunk",
  "chunk": "Hello "
}
```

```json
{
  "type": "thinking",
  "message": "Processing your request..."
}
```

```json
{
  "type": "token_update",
  "tokens_remaining": 9500
}
```

```json
{
  "type": "complete"
}
```

```json
{
  "type": "error",
  "message": "Something went wrong"
}
```

## Features

- ✅ Automatic reconnection with exponential backoff
- ✅ Real-time mood updates with animated indicators
- ✅ Token usage tracking with visual feedback
- ✅ Chunked streaming with animated cursor
- ✅ Thinking/processing indicators
- ✅ Error handling and display
- ✅ Connection status monitoring
- ✅ Cosmic theme consistency
- ✅ Mobile responsive design
- ✅ TypeScript support

## Notes

- WebSocket is **optional** - components work without it
- All components maintain the cosmic theme
- Animations are GPU-accelerated for smooth performance
- Components use memoization to prevent unnecessary re-renders
- All visual elements are mobile-responsive
