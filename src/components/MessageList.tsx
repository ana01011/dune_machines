import React from 'react';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'omnius';
  timestamp: Date;
  type: 'text' | 'code' | 'image' | 'voice';
  mood?: 'curious' | 'analytical' | 'creative' | 'contemplative';
}

interface MessageListProps {
  messages: Message[];
  theme: string;
  onCopy: (content: string, messageId: string) => void;
  onRegenerate: (messageId: string) => void;
  copiedMessageId: string | null;
  regeneratingMessageId: string | null;
}

const MessageListComponent: React.FC<MessageListProps> = ({
  messages,
  theme,
  onCopy,
  onRegenerate,
  copiedMessageId,
  regeneratingMessageId
}) => {
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <ChatMessage
            message={message}
            theme={theme as 'light' | 'dark'}
            onCopy={onCopy}
            onRegenerate={onRegenerate}
            copiedMessageId={copiedMessageId}
            regeneratingMessageId={regeneratingMessageId}
          />
        </div>
      ))}
    </>
  );
};

export const MessageList = React.memo(MessageListComponent, (prevProps, nextProps) => {
  return (
    prevProps.messages.length === nextProps.messages.length &&
    prevProps.messages.every((msg, idx) => msg.id === nextProps.messages[idx]?.id && msg.content === nextProps.messages[idx]?.content) &&
    prevProps.copiedMessageId === nextProps.copiedMessageId &&
    prevProps.regeneratingMessageId === nextProps.regeneratingMessageId &&
    prevProps.theme === nextProps.theme
  );
});

MessageList.displayName = 'MessageList';
