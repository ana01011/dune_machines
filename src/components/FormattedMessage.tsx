import React from 'react';
import { Copy, Check } from 'lucide-react';

interface FormattedMessageProps {
  content: string;
  onCopy?: (text: string) => void;
  copiedText?: string | null;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({
  content,
  onCopy,
  copiedText
}) => {
  const parseContent = (text: string) => {
    const parts: Array<{ type: 'text' | 'code' | 'math'; content: string; language?: string }> = [];

    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g;
    const mathBlockRegex = /\$\$([\s\S]*?)\$\$/g;
    const inlineMathRegex = /\$([^$]+)\$/g;

    let lastIndex = 0;
    const matches: Array<{ index: number; length: number; type: 'code' | 'math'; content: string; language?: string }> = [];

    let match;
    while ((match = codeBlockRegex.exec(text)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        type: 'code',
        content: match[2],
        language: match[1] || 'text'
      });
    }

    codeBlockRegex.lastIndex = 0;

    while ((match = inlineCodeRegex.exec(text)) !== null) {
      if (!matches.some(m => match.index >= m.index && match.index < m.index + m.length)) {
        matches.push({
          index: match.index,
          length: match[0].length,
          type: 'code',
          content: match[1],
          language: 'inline'
        });
      }
    }

    while ((match = mathBlockRegex.exec(text)) !== null) {
      if (!matches.some(m => match.index >= m.index && match.index < m.index + m.length)) {
        matches.push({
          index: match.index,
          length: match[0].length,
          type: 'math',
          content: match[1],
          language: 'block'
        });
      }
    }

    while ((match = inlineMathRegex.exec(text)) !== null) {
      if (!matches.some(m => match.index >= m.index && match.index < m.index + m.length)) {
        matches.push({
          index: match.index,
          length: match[0].length,
          type: 'math',
          content: match[1],
          language: 'inline'
        });
      }
    }

    matches.sort((a, b) => a.index - b.index);

    matches.forEach((m) => {
      if (m.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, m.index) });
      }
      parts.push({ type: m.type, content: m.content, language: m.language });
      lastIndex = m.index + m.length;
    });

    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text' as const, content: text }];
  };

  const parts = parseContent(content);

  return (
    <div className="space-y-3">
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return (
            <div key={index} className="whitespace-pre-wrap">
              {part.content}
            </div>
          );
        }

        if (part.type === 'code') {
          if (part.language === 'inline') {
            return (
              <code
                key={index}
                className="inline-block px-2 py-0.5 rounded-md text-sm font-mono"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  color: '#93C5FD'
                }}
              >
                {part.content}
              </code>
            );
          }

          return (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden my-3"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.1), inset 0 0 20px rgba(59, 130, 246, 0.05)'
              }}
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <span className="text-xs font-mono text-blue-300 uppercase tracking-wider">
                  {part.language}
                </span>
                <button
                  onClick={() => onCopy?.(part.content)}
                  className="flex items-center space-x-1 text-xs text-white/60 hover:text-white/90 transition-colors"
                  title="Copy code"
                >
                  {copiedText === part.content ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto custom-scrollbar">
                <code className="text-sm font-mono text-blue-100 leading-relaxed">
                  {part.content}
                </code>
              </pre>
            </div>
          );
        }

        if (part.type === 'math') {
          if (part.language === 'inline') {
            return (
              <span
                key={index}
                className="inline-block px-2 py-0.5 rounded-md text-sm font-serif italic"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  color: '#C4B5FD'
                }}
              >
                {part.content}
              </span>
            );
          }

          return (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden my-3 p-6 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(109, 40, 217, 0.2) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15), inset 0 0 20px rgba(168, 85, 247, 0.05)'
              }}
            >
              <div className="text-lg font-serif italic text-purple-200">
                {part.content}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
