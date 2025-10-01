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

      // Set initial states
      gsap.set([animationRef.current, titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50,
        scale: 0.8
      });

      // Entrance animation sequence
      tl.to(animationRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.8")
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6");

      // Auto-complete after 4 seconds
      const timer = setTimeout(() => {
        // Exit animation
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.in",
          onComplete: onComplete
        });
      }, 4000);

      return () => clearTimeout(timer);
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
      {/* Animated Logo */}
      <div ref={animationRef} className="mb-8 sm:mb-12">
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto relative">
          <img 
            src="/dune animation.gif" 
            alt="DUNE MACHINES Animation" 
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.6))'
            }}
          />
        </div>
      </div>

      {/* Website Title */}
      <div ref={titleRef} className="mb-4 sm:mb-6">
        <h1 
          className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] sm:tracking-[0.25em] text-center"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)'
          }}
        >
          www.Dunemachines.com
        </h1>
      </div>

      {/* Selected AI Model */}
      <div ref={subtitleRef}>
        <p 
          className="text-base sm:text-lg md:text-xl font-light tracking-[0.15em] text-center"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.8)',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.6)'
          }}
        >
          {selectedModel?.name || 'OMNIUS'} - {selectedModel?.subtitle || 'The Evermind Supreme'}
        </p>
      </div>

      {/* Loading Progress Indicator */}
      <div className="absolute bottom-12 sm:bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
};