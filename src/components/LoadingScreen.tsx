import React, { useEffect, useRef } from 'react';
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

  const aiModels = [
    { id: 'omnius', name: 'OMNIUS', subtitle: 'The Evermind Supreme' },
    { id: 'erasmus', name: 'ERASMUS', subtitle: 'The Independent Mind' },
    { id: 'sarah', name: 'SARAH', subtitle: 'The Adaptive Intelligence' },
    { id: 'mentat', name: 'MENTAT', subtitle: 'The Human Computer' },
    { id: 'navigator', name: 'NAVIGATOR', subtitle: 'The Path Finder' },
    { id: 'oracle', name: 'ORACLE', subtitle: 'The Prescient Mind' }
  ];

  const selectedModel = aiModels.find(model => model.id === selectedAI);

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
        ease: "power2.out"
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
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{
        background: '#000000'
      }}
    >
      {/* Animated Logo - No Effects */}
      <div ref={animationRef} className="mb-8 sm:mb-12">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto relative">
          <img 
            src="/dune animation.gif" 
            alt="DUNE MACHINES Animation" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Website Title - Cinematic Font */}
      <div ref={titleRef} className="mb-4 sm:mb-6">
        <h1 
          className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.3em] sm:tracking-[0.4em] text-center"
          style={{
            fontFamily: 'Cinzel, serif',
            fontWeight: '300',
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
          className="text-base sm:text-lg md:text-xl font-light tracking-[0.2em] text-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'
          }}
        >
          {selectedModel?.name || 'OMNIUS'} - {selectedModel?.subtitle || 'The Evermind Supreme'}
        </p>
      </div>
    </div>
  );
};