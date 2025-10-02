import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  selectedAI: string;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ selectedAI, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const [canSkip, setCanSkip] = useState(false);

  const aiModels = [
    { id: 'omnius', name: 'OMNIUS', subtitle: 'The Evermind Supreme' },
    { id: 'erasmus', name: 'ERASMUS', subtitle: 'The Independent Mind' },
    { id: 'sarah', name: 'SARAH', subtitle: 'The Adaptive Intelligence' },
    { id: 'mentat', name: 'MENTAT', subtitle: 'The Human Computer' },
    { id: 'navigator', name: 'NAVIGATOR', subtitle: 'The Path Finder' },
    { id: 'oracle', name: 'ORACLE', subtitle: 'The Prescient Mind' }
  ];

  const selectedModel = aiModels.find(model => model.id === selectedAI);

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
    if (containerRef.current && animationRef.current && titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline();

      // Set initial states - everything hidden
      gsap.set([animationRef.current, titleRef.current, subtitleRef.current], {
        opacity: 0
      });

      // 1. Animation fades in slowly (2 seconds)
      tl.to(animationRef.current, {
        opacity: 1,
        duration: 2,
        ease: "power2.out"
      })
      
      // 2. Wait 3 seconds, then title appears (1.5 seconds fade)
      .to(titleRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "+=3")
      
      // 3. Wait 3 seconds, then subtitle appears (1.5 seconds fade)
      .to(subtitleRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => setCanSkip(true) // Enable clicking after subtitle appears
      }, "+=3")
      
      // 4. Hold everything for 5 seconds, then fade out entire screen slowly
      .to(containerRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.in",
        delay: 5,
        onComplete: onComplete
      });
    }
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-4"
      style={{
        background: '#000000',
        paddingTop: '20vh'
      }}
    >
      {/* Animated Logo - No Effects */}
      <div ref={animationRef} className="w-full flex justify-center mb-0">
        <div className="w-80 h-80 sm:w-[28rem] sm:h-[28rem] md:w-[32rem] md:h-[32rem] relative">
          <img 
            src="/dune animation.gif" 
            alt="DUNE MACHINES Animation" 
            className="w-full h-full object-contain animate-opacity-flicker"
          />
        </div>
      </div>

      {/* Website Title - Cinematic Font */}
      <div ref={titleRef} className="w-full text-center" style={{ marginTop: '0px' }}>
        <h1 
          className="font-thin tracking-[0.1em] sm:tracking-[0.15em] text-center"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '100',
            fontSize: 'clamp(0.75rem, 2vw, 1rem)',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            lineHeight: '1'
          }}
        >
          DUNE MACHINES
        </h1>
      </div>

      {/* Selected AI Model - Cinematic Font */}
      <div ref={subtitleRef} className="w-full text-center" style={{ marginTop: '0px' }}>
        <p 
          className="font-thin tracking-[0.2em] sm:tracking-[0.25em] text-center"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '50',
            fontSize: 'clamp(0.55rem, 2.5vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
            lineHeight: '1'
          }}
        >
          {selectedModel?.name || 'OMNIUS'}
        </p>
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