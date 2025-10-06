import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface StreamingMessageProps {
  content: string;
  aiAvatar?: string;
}

export const StreamingMessage: React.FC<StreamingMessageProps> = React.memo(({
  content,
  aiAvatar = "/duneicon.webp"
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

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

  return (
    <div
      ref={messageRef}
      className="flex justify-start mb-4 sm:mb-6"
    >
      <div className="flex items-start space-x-3 sm:space-x-4 md:space-x-4 max-w-[85%] sm:max-w-[80%] flex-row">

        <div className="flex-shrink-0">
          <img
            src={aiAvatar}
            alt="OMNIUS"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain animate-opacity-fluctuate"
          />
        </div>

        <div className="relative mr-2 sm:mr-4">
          <div className="space-y-2">
            <div className="text-sm sm:text-base font-light leading-relaxed text-white px-1">
              {content}
              <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

StreamingMessage.displayName = 'StreamingMessage';
