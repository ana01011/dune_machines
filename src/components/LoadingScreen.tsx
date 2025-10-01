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
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{
        background: '#000000'
      }}
    >
      {/* Animated Logo - No Effects */}
      <div ref={animationRef} className="mb-1">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto relative">
          <img 
            src="/dune animation.gif" 
            alt="DUNE MACHINES Animation" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Website Title - Cinematic Font */}
      <div ref={titleRef} className="mb-1">
        <h1 
          className="text-xs sm:text-sm md:text-base font-thin tracking-[0.1em] sm:tracking-[0.15em] text-center"
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: '100',
            color: '#ffffff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}
        >
          www.Dunemachines.com
        </h1>
      </div>

      {/* Selected AI Model - Cinematic Font */}
      <div ref={subtitleRef}>
        <p 
          className="text-sm sm:text-base md:text-lg font-thin tracking-[0.2em] sm:tracking-[0.25em] text-center"
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: '100',
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'
          }}
        >
          {selectedModel?.name || 'OMNIUS'}
        </p>
      </div>
    </div>
  );
};