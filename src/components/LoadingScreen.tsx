import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  selectedAI: string;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ selectedAI, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const [canSkip, setCanSkip] = useState(false);

  const handleSkip = () => {
    if (canSkip) {
      // Immediate fade out
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        onComplete: onComplete
      });
    }
  };

  useEffect(() => {
    if (containerRef.current && animationRef.current) {
      const tl = gsap.timeline();

      // Set initial state - animation hidden
      gsap.set(animationRef.current, {
        opacity: 0
      });

      // 1. Animation fades in slowly (2 seconds), then enable skip after 3 seconds
      tl.to(animationRef.current, {
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => setCanSkip(true), 3000); // Enable skip after 3 seconds
        }
      })
      
      // 2. Hold for 8 seconds, then fade out entire screen slowly
      .to(containerRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.in",
        delay: 8,
        onComplete: onComplete
      });
    }
  }, [onComplete]);

  return (
    <div  
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{
        background: '#000000'
      }}
    >
      {/* Animated Logo - No Effects */}
      <div ref={animationRef} className="flex justify-center">
        <div className="w-96 h-96 sm:w-[36rem] sm:h-[36rem] md:w-[40rem] md:h-[40rem] relative">
          <img 
            src="/dune animation.gif" 
            alt="DUNE MACHINES Animation" 
            className="w-full h-full object-contain animate-opacity-flicker"
          />
        </div>
      </div>

      {/* Custom Styles for GIF Flicker Effect */}
      <style jsx>{`
        @keyframes opacityFlicker {
          0% { 
            opacity: 0.7;
            filter: brightness(0.9);
          }
          25% { 
            opacity: 1;
            filter: brightness(1.1);
          }
          50% { 
            opacity: 0.8;
            filter: brightness(0.95);
          }
          75% { 
            opacity: 0.95;
            filter: brightness(1.05);
          }
          100% { 
            opacity: 0.85;
            filter: brightness(1);
          }
        }
        
        .animate-opacity-flicker {
          animation: opacityFlicker 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};