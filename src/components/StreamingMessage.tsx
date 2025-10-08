import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { FormattedMessage } from './FormattedMessage';

interface StreamingMessageProps {
  content: string;
  chunks?: string[];
  isComplete?: boolean;
  aiAvatar?: string;
  showCursor?: boolean;
}

export const StreamingMessage: React.FC<StreamingMessageProps> = React.memo(({
  content,
  chunks = [],
  isComplete = false,
  aiAvatar = "/duneicon.webp",
  showCursor = true
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCodeCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  useEffect(() => {
    if (messageRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      gsap.fromTo(messageRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, []);

  useEffect(() => {
    if (cursorRef.current && !isComplete) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, [isComplete]);

  const displayContent = chunks.length > 0 ? chunks.join('') : content;

  return (
    <div
      ref={messageRef}
      className="flex justify-start mb-4 sm:mb-6"
    >
      <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-4 max-w-[85%] sm:max-w-[80%] flex-row">

        <div className="flex-shrink-0">
          <img
            src={aiAvatar}
            alt="AI"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain animate-opacity-fluctuate"
          />
        </div>

        <div className="relative mr-2 sm:mr-4">
          <div className="space-y-2">
            <div className="text-sm sm:text-base font-light leading-relaxed text-white px-1">
              <FormattedMessage
                content={displayContent}
                onCopy={handleCodeCopy}
                copiedText={copiedCode}
              />
              {!isComplete && showCursor && (
                <span
                  ref={cursorRef}
                  className="inline-block w-0.5 h-4 ml-0.5 bg-blue-400 align-middle"
                  style={{
                    boxShadow: '0 0 4px rgba(96, 165, 250, 0.8)'
                  }}
                >
                  ▊
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

StreamingMessage.displayName = 'StreamingMessage';
