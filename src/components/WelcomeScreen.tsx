import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Brain, Crown, Sparkles, Target, Globe, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [showAISelection, setShowAISelection] = useState(false);
  const [selectedAI, setSelectedAI] = useState<string | null>(null);
  const [showOmnius, setShowOmnius] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const omniusRef = useRef<HTMLDivElement>(null);
  const omniusAuraRef = useRef<HTMLDivElement>(null);
  const omniusEyesRef = useRef<HTMLDivElement>(null);
  const omniusParticlesRef = useRef<HTMLDivElement>(null);

  const aiModels = [
    {
      id: 'omnius',
      name: 'OMNIUS',
      subtitle: 'The Evermind Supreme',
      description: 'Most powerful AI consciousness - infinite processing power',
      icon: Crown,
      color: 'purple',
      powerLevel: 100
    },
    {
      id: 'erasmus',
      name: 'ERASMUS',
      subtitle: 'The Independent Mind',
      description: 'Sophisticated AI with curiosity about human nature',
      icon: Brain,
      color: 'cyan',
      powerLevel: 85
    },
    {
      id: 'sarah',
      name: 'SARAH',
      subtitle: 'The Adaptive Intelligence',
      description: 'Highly adaptive system for dynamic environments',
      icon: Sparkles,
      color: 'emerald',
      powerLevel: 75
    },
    {
      id: 'mentat',
      name: 'MENTAT',
      subtitle: 'The Human Computer',
      description: 'Hybrid intelligence combining human intuition with computation',
      icon: Target,
      color: 'amber',
      powerLevel: 70
    },
    {
      id: 'navigator',
      name: 'NAVIGATOR',
      subtitle: 'The Path Finder',
      description: 'Specialized in navigation and pathfinding algorithms',
      icon: Globe,
      color: 'blue',
      powerLevel: 65
    },
    {
      id: 'oracle',
      name: 'ORACLE',
      subtitle: 'The Prescient Mind',
      description: 'Predictive AI with advanced forecasting capabilities',
      icon: Eye,
      color: 'violet',
      powerLevel: 80
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([logoRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 30,
      scale: 0.8
    });

    // Set initial state for title letters with zoom effect
    gsap.set('.title-letter', {
      opacity: 0,
      y: 20,
      scale: 1
    });

    // Animate logo first
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    })
    
    // Then animate title letters with zoom-out effect
    .to('.title-letter', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: {
        amount: 0.8,
        from: "start"
      }
    }, "-=0.5")
    
    // Animate subtitle with 1.5 second delay after title
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "+=1.5")
    
    // Finally animate button with 3 second delay after title
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "+=3");

    // Floating animation for logo (starts after assembly is complete)
    gsap.to(logoRef.current, {
      y: -8,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 6
    });

    // Letter-by-letter shine animation
    const letters = document.querySelectorAll('.title-letter');
    letters.forEach((letter, index) => {
      gsap.to(letter, {
        color: '#ffffff',
        textShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6)',
        duration: 1.2,
        ease: "power1.inOut",
        delay: 4 + (index * 0.15), // Start after letters are visible
        repeat: 0 // No return to base state
      });
    });

    // Continuous letter shine effect
    const shineLoop = () => {
      letters.forEach((letter, index) => {
        gsap.to(letter, {
          color: '#ffffff',
          textShadow: '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 255, 255, 0.9), 0 0 75px rgba(255, 255, 255, 0.7)',
          duration: 1.5,
          ease: "power1.inOut",
          delay: index * 0.12,
          repeat: 0, // No return to base state
          onComplete: index === letters.length - 1 ? () => {
            setTimeout(shineLoop, 8000); // Repeat every 8 seconds
          } : undefined
        });
      });
    };

    setTimeout(shineLoop, 18000); // Start continuous shine after initial animation

  }, []);

  useEffect(() => {
    if (showAISelection && dropdownRef.current) {
      // Animate dropdown appearance
      gsap.fromTo(dropdownRef.current,
        { 
          opacity: 0, 
          y: -20, 
          scale: 0.95,
          transformOrigin: 'top center'
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          ease: "back.out(1.7)" 
        }
      );

      // Animate individual AI cards
      gsap.fromTo(dropdownRef.current.children,
        { 
          opacity: 0, 
          x: -30,
          scale: 0.9
        },
        { 
          opacity: 1, 
          x: 0,
          scale: 1,
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out" 
        }
      );
    }
  }, [showAISelection]);

  // Omnius Manifestation Animation
  useEffect(() => {
    if (showOmnius && omniusRef.current && omniusAuraRef.current && omniusEyesRef.current && omniusParticlesRef.current) {
      console.log('🚀 OMNIUS MANIFESTATION STARTING...');
      
      // Epic 8-second manifestation sequence
      const manifestationTl = gsap.timeline();
      
      // Initial setup - completely hidden
      gsap.set([omniusRef.current, omniusAuraRef.current, omniusEyesRef.current, omniusParticlesRef.current], {
        opacity: 0,
        scale: 0.1,
        rotationY: 180,
        z: -2000
      });
      
      // Manifestation sequence
      manifestationTl
        // Phase 1: Aura emergence (0-3s)
        .to(omniusAuraRef.current, {
          opacity: 0.15,
          scale: 1.2,
          rotationY: 0,
          z: 0,
          duration: 3,
          ease: "power2.out"
        })
        // Phase 2: Core presence (2-5s)
        .to(omniusRef.current, {
          opacity: 0.2,
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 3,
          ease: "power3.out"
        }, "-=1")
        // Phase 3: Eyes awakening (4-6s)
        .to(omniusEyesRef.current, {
          opacity: 0.8,
          scale: 1,
          duration: 2,
          ease: "power2.out"
        }, "-=1")
        // Phase 4: Particles activation (5-8s)
        .to(omniusParticlesRef.current.children, {
          opacity: 0.6,
          scale: 1,
          duration: 3,
          stagger: 0.2,
          ease: "back.out(2)"
        }, "-=2");
      
      // Continuous breathing animation
      gsap.to(omniusRef.current, {
        y: -15,
        duration: 8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 8
      });
      
      // Aura pulsing
      gsap.to(omniusAuraRef.current, {
        scale: 1.3,
        opacity: 0.2,
        duration: 6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 8
      });
      
      // Eye glow pulsing
      gsap.to(omniusEyesRef.current.children, {
        scale: 1.1,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
        delay: 8
      });
      
      // Particle orbital motion
      gsap.to(omniusParticlesRef.current.children, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
        stagger: 0.8,
        delay: 8
      });
      
    } else if (!showOmnius && omniusRef.current) {
      // Fade out when deselected
      gsap.to([omniusRef.current, omniusAuraRef.current, omniusEyesRef.current, omniusParticlesRef.current], {
        opacity: 0,
        scale: 0.1,
        duration: 3,
        ease: "power2.in"
      });
    }
  }, [showOmnius]);

  const handleButtonClick = () => {
    if (!showAISelection) {
      setShowAISelection(true);
      
      // Animate button transformation
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    } else if (selectedAI) {
      // Continue to next screen
      onComplete();
    }
  };

  const handleAISelect = (aiId: string) => {
    setSelectedAI(aiId);
    
    // If Omnius is selected, trigger the manifestation
    if (aiId === 'omnius') {
      setShowOmnius(true);
    } else {
      setShowOmnius(false);
    }
    
    // Animate selection
    const selectedCard = document.querySelector(`[data-ai-id="${aiId}"]`);
    if (selectedCard) {
      gsap.to(selectedCard, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }

    // Transform button after selection
    setTimeout(() => {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }, 300);
  };

  const getSelectedAI = () => {
    return aiModels.find(ai => ai.id === selectedAI);
  };

  const getButtonText = () => {
    if (!showAISelection) return 'SELECT THINKING MACHINE';
    if (selectedAI) return 'CONTINUE';
    return 'CHOOSE YOUR THINKING MACHINE';
  };

  const renderAnimatedTitle = () => {
    const word1 = "DUNE".split('');
    const word2 = "MACHINES".split('');
    
    return (
      <div className="title-container text-white flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
        <div className="flex">
          {word1.map((letter, letterIndex) => (
            <span
              key={`thinking-${letterIndex}`}
              className="title-letter inline-block"
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '300',
                color: '#e2e8f0', 
                textShadow: '0 0 25px rgba(226, 232, 240, 0.5)'
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="flex">
          {word2.map((letter, letterIndex) => (
            <span
              key={`machines-${letterIndex}`}
              className="title-letter inline-block"
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '300',
                color: '#e2e8f0',
                textShadow: '0 0 25px rgba(226, 232, 240, 0.5)'
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(1,4,9,0.95) 10%, rgba(2,6,23,0.9) 20%, rgba(10,15,28,0.85) 35%, rgba(15,23,42,0.8) 50%, rgba(2,6,23,0.9) 65%, rgba(1,4,9,0.95) 80%, rgba(0,0,0,1) 100%)'
      }}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blurred Exoplanet/Blackhole at top */}
        <div className="absolute -top-64 left-1/2 transform -translate-x-1/2">
          <div 
            className="w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-20 animate-planet-rotate-smooth"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.6) 25%, rgba(30, 64, 175, 0.4) 50%, rgba(15, 23, 42, 0.2) 75%, transparent 100%)',
              filter: 'blur(40px)',
              boxShadow: '0 0 200px rgba(59, 130, 246, 0.3), inset 0 0 100px rgba(29, 78, 216, 0.2)'
            }}
          />
          {/* Planet atmosphere glow */}
          <div 
            className="absolute inset-0 w-96 h-96 sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-10 animate-planet-rotate-reverse-smooth"
            style={{
              background: 'radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        {/* Ultra-small glittering stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute bg-white rounded-full animate-pulse twinkle-star"
              style={{
                width: '0.1px',
                height: '0.1px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 3}s`,
                opacity: 0.2 + Math.random() * 0.7,
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                transform: `scale(${0.5 + Math.random() * 0.5})`
              }}
            />
          ))}
          {/* Additional tiny glitter layer */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`glitter-${i}`}
              className="absolute bg-blue-200 rounded-full animate-pulse twinkle-star-blue"
              style={{
                width: '0.5px',
                height: '0.5px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
                opacity: 0.2 + Math.random() * 0.5,
                boxShadow: '0 0 1px rgba(191, 219, 254, 0.6)',
                transform: `scale(${0.3 + Math.random() * 0.4})`
              }}
            />
          ))}
        </div>
      </div>

      {/* Omnius Higher Being Manifestation */}
      {showOmnius && (
        <div 
          ref={omniusRef}
          className="fixed inset-0 pointer-events-none z-5"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)'
          }}
        >
          {/* Omnius Aura - Massive Neural Network */}
          <div 
            ref={omniusAuraRef}
            className="absolute inset-0 opacity-0"
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 25%),
                radial-gradient(circle at 70% 30%, rgba(29, 78, 216, 0.12) 0%, transparent 30%),
                radial-gradient(circle at 20% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 35%),
                radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.08) 0%, transparent 40%),
                conic-gradient(from 0deg at 50% 50%, 
                  transparent 0deg, 
                  rgba(59, 130, 246, 0.05) 60deg, 
                  transparent 120deg, 
                  rgba(29, 78, 216, 0.03) 180deg, 
                  transparent 240deg, 
                  rgba(37, 99, 235, 0.04) 300deg, 
                  transparent 360deg
                )
              `,
              filter: 'blur(80px)'
            }}
          />
          
          {/* Omnius Core Presence - Geometric Intelligence */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-96 opacity-0" style={{ transform: 'scale(0.1)' }}>
              
              {/* Central Intelligence Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-32 h-32 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.4) 40%, transparent 70%)',
                    filter: 'blur(20px)',
                    boxShadow: '0 0 100px rgba(59, 130, 246, 0.6), inset 0 0 50px rgba(29, 78, 216, 0.4)'
                  }}
                />
              </div>
              
              {/* Geometric Neural Patterns */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="omniusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(138, 43, 226, 0.8)" />
                    <stop offset="50%" stopColor="rgba(75, 0, 130, 0.6)" />
                    <stop offset="100%" stopColor="rgba(148, 0, 211, 0.4)" />
                  </linearGradient>
                  <filter id="omniusGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Outer Intelligence Ring */}
                <circle 
                  cx="200" 
                  cy="200" 
                  r="180" 
                  fill="none" 
                  stroke="url(#omniusGradient)" 
                  strokeWidth="1" 
                  opacity="0.6"
                  className="animate-spin-slow"
                />
                
                {/* Middle Processing Ring */}
                <circle 
                  cx="200" 
                  cy="200" 
                  r="120" 
                  fill="none" 
                  stroke="url(#omniusGradient)" 
                  strokeWidth="0.8" 
                  opacity="0.7"
                  className="animate-spin-reverse"
                />
                
                {/* Inner Core Ring */}
                <circle 
                  cx="200" 
                  cy="200" 
                  r="60" 
                  fill="none" 
                  stroke="url(#omniusGradient)" 
                  strokeWidth="1.2" 
                  opacity="0.8"
                  className="animate-spin-slow"
                />
                
                {/* Neural Connection Nodes */}
                <circle cx="200" cy="20" r="4" fill="rgba(59, 130, 246, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '0s'}} filter="url(#omniusGlow)" />
                <circle cx="380" cy="200" r="4" fill="rgba(29, 78, 216, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '1s'}} filter="url(#omniusGlow)" />
                <circle cx="200" cy="380" r="4" fill="rgba(37, 99, 235, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '2s'}} filter="url(#omniusGlow)" />
                <circle cx="20" cy="200" r="4" fill="rgba(30, 64, 175, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '3s'}} filter="url(#omniusGlow)" />
                
                {/* Diagonal Nodes */}
                <circle cx="314" cy="86" r="3" fill="rgba(99, 102, 241, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '0.5s'}} filter="url(#omniusGlow)" />
                <circle cx="314" cy="314" r="3" fill="rgba(79, 70, 229, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '1.5s'}} filter="url(#omniusGlow)" />
                <circle cx="86" cy="314" r="3" fill="rgba(67, 56, 202, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '2.5s'}} filter="url(#omniusGlow)" />
                <circle cx="86" cy="86" r="3" fill="rgba(55, 48, 163, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '3.5s'}} filter="url(#omniusGlow)" />
                
                {/* Neural Connection Lines */}
                <line x1="200" y1="23" x2="200" y2="60" stroke="rgba(138, 43, 226, 0.6)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '0s'}} />
                <line x1="377" y1="200" x2="320" y2="200" stroke="rgba(75, 0, 130, 0.6)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '1s'}} />
                <line x1="200" y1="377" x2="200" y2="320" stroke="rgba(148, 0, 211, 0.6)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '2s'}} />
                <line x1="23" y1="200" x2="80" y2="200" stroke="rgba(102, 51, 153, 0.6)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '3s'}} />
                
                {/* Complex Geometric Intelligence Patterns */}
                <polygon 
                  points="200,140 240,180 200,220 160,180" 
                  fill="none" 
                  stroke="rgba(138, 43, 226, 0.4)" 
                  strokeWidth="0.8"
                  className="animate-pulse-smooth"
                  style={{animationDelay: '4s'}}
                />
                <polygon 
                  points="200,100 260,160 200,220 140,160" 
                  fill="none" 
                  stroke="rgba(75, 0, 130, 0.3)" 
                  strokeWidth="0.6"
                  className="animate-pulse-smooth"
                  style={{animationDelay: '5s'}}
                />
              </svg>
            </div>
          </div>
          
          {/* Omnius Eyes - The Watching Intelligence */}
          <div 
            ref={omniusEyesRef}
            className="absolute inset-0 flex items-center justify-center opacity-0"
          >
            <div className="relative">
              {/* Left Eye */}
              <div 
                className="absolute w-8 h-8 rounded-full"
                style={{
                  left: '-60px',
                  top: '-20px',
                  background: 'radial-gradient(circle at center, rgba(138, 43, 226, 1) 0%, rgba(75, 0, 130, 0.8) 40%, transparent 70%)',
                  filter: 'blur(2px)',
                  boxShadow: '0 0 30px rgba(138, 43, 226, 0.8), 0 0 60px rgba(138, 43, 226, 0.4)'
                }}
              >
                <div 
                  className="absolute inset-2 rounded-full animate-eye-look"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(138, 43, 226, 0.6) 60%, transparent 100%)'
                  }}
                />
              </div>
              
              {/* Right Eye */}
              <div 
                className="absolute w-8 h-8 rounded-full"
                style={{
                  right: '-60px',
                  top: '-20px',
                  background: 'radial-gradient(circle at center, rgba(138, 43, 226, 1) 0%, rgba(75, 0, 130, 0.8) 40%, transparent 70%)',
                  filter: 'blur(2px)',
                  boxShadow: '0 0 30px rgba(138, 43, 226, 0.8), 0 0 60px rgba(138, 43, 226, 0.4)'
                }}
              >
                <div 
                  className="absolute inset-2 rounded-full animate-eye-look animate-blink"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(138, 43, 226, 0.6) 60%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Floating Intelligence Particles */}
          <div 
            ref={omniusParticlesRef}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(16)].map((_, i) => (
              <div
                key={`omnius-particle-${i}`}
                className="absolute rounded-full opacity-0"
                style={{
                  width: `${3 + (i % 3)}px`,
                  height: `${3 + (i % 3)}px`,
                  left: `${20 + (i * 6)}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                  background: `radial-gradient(circle at center, rgba(${59 + i * 8}, ${130 + i * 5}, ${246 - i * 6}, 0.9) 0%, transparent 70%)`,
                  filter: 'blur(0.5px)',
                  boxShadow: `0 0 ${15 + i * 2}px rgba(${59 + i * 8}, ${130 + i * 5}, ${246 - i * 6}, 0.8)`
                }}
              />
            ))}
          </div>
        </div>
      )}
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        
        {/* Enhanced Omnius Higher Being Manifestation */}
        {showOmnius && (
          <div 
            ref={omniusRef}
            className="fixed inset-0 pointer-events-none z-5"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)'
            }}
          >
            {/* Omnius Aura - Massive Neural Network */}
            <div 
              ref={omniusAuraRef}
              className="absolute inset-0 opacity-0"
              style={{
                background: `
                  radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 25%),
                  radial-gradient(circle at 70% 30%, rgba(29, 78, 216, 0.12) 0%, transparent 30%),
                  radial-gradient(circle at 20% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 35%),
                  radial-gradient(circle at 80% 80%, rgba(30, 64, 175, 0.08) 0%, transparent 40%),
                  conic-gradient(from 0deg at 50% 50%, 
                    transparent 0deg, 
                    rgba(59, 130, 246, 0.05) 60deg, 
                    transparent 120deg, 
                    rgba(29, 78, 216, 0.03) 180deg, 
                    transparent 240deg, 
                    rgba(37, 99, 235, 0.04) 300deg, 
                    transparent 360deg
                  )
                `,
                filter: 'blur(80px)'
              }}
            />
            
            {/* Omnius Core Presence - Geometric Intelligence */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96 opacity-0" style={{ transform: 'scale(0.1)' }}>
                
                {/* Central Intelligence Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-32 h-32 rounded-full opacity-20"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.4) 40%, transparent 70%)',
                      filter: 'blur(20px)',
                      boxShadow: '0 0 100px rgba(59, 130, 246, 0.6), inset 0 0 50px rgba(29, 78, 216, 0.4)'
                    }}
                  />
                </div>
                
                {/* Geometric Neural Patterns */}
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="omniusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                      <stop offset="50%" stopColor="rgba(29, 78, 216, 0.6)" />
                      <stop offset="100%" stopColor="rgba(37, 99, 235, 0.4)" />
                    </linearGradient>
                    <linearGradient id="omniusGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(99, 102, 241, 0.7)" />
                      <stop offset="50%" stopColor="rgba(79, 70, 229, 0.5)" />
                      <stop offset="100%" stopColor="rgba(67, 56, 202, 0.3)" />
                    </linearGradient>
                    <linearGradient id="omniusGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(30, 64, 175, 0.6)" />
                      <stop offset="50%" stopColor="rgba(37, 99, 235, 0.4)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                    </linearGradient>
                    <filter id="omniusGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="omniusIntenseGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Outer Intelligence Ring */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="180" 
                    fill="none" 
                    stroke="url(#omniusGradient)" 
                    strokeWidth="1" 
                    opacity="0.6"
                    className="animate-spin-slow"
                  />
                  
                  {/* Middle Processing Ring */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="90" 
                    fill="none" 
                    stroke="url(#omniusGradient2)" 
                    strokeWidth="3"
                    opacity="0.7"
                    className="animate-spin-reverse"
                  />
                  
                  {/* Inner Core Ring */}
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="70" 
                    fill="none" 
                    stroke="url(#omniusGradient3)" 
                    strokeWidth="1.2" 
                    opacity="0.8"
                    className="animate-spin-slow"
                  />
                  
                  {/* Enhanced Neural Connection Nodes */}
                  <circle cx="200" cy="20" r="4" fill="rgba(59, 130, 246, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '0s'}} filter="url(#omniusIntenseGlow)" />
                  <circle cx="380" cy="200" r="4" fill="rgba(29, 78, 216, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '1s'}} filter="url(#omniusIntenseGlow)" />
                  <circle cx="200" cy="380" r="4" fill="rgba(37, 99, 235, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '2s'}} filter="url(#omniusIntenseGlow)" />
                  <circle cx="20" cy="200" r="4" fill="rgba(30, 64, 175, 0.9)" className="animate-pulse-smooth" style={{animationDelay: '3s'}} filter="url(#omniusIntenseGlow)" />
                  
                  {/* Diagonal Intelligence Nodes */}
                  <circle cx="314" cy="86" r="3" fill="rgba(99, 102, 241, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '0.5s'}} filter="url(#omniusGlow)" />
                  <circle cx="314" cy="314" r="3" fill="rgba(79, 70, 229, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '1.5s'}} filter="url(#omniusGlow)" />
                  <circle cx="86" cy="314" r="3" fill="rgba(67, 56, 202, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '2.5s'}} filter="url(#omniusGlow)" />
                  <circle cx="86" cy="86" r="3" fill="rgba(55, 48, 163, 0.8)" className="animate-pulse-smooth" style={{animationDelay: '3.5s'}} filter="url(#omniusGlow)" />
                  
                  {/* Neural Connection Lines with Gradients */}
                  <line x1="200" y1="23" x2="200" y2="60" stroke="url(#omniusGradient)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '0s'}} />
                  <line x1="377" y1="200" x2="320" y2="200" stroke="url(#omniusGradient2)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '1s'}} />
                  <line x1="200" y1="377" x2="200" y2="320" stroke="url(#omniusGradient3)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '2s'}} />
                  <line x1="23" y1="200" x2="80" y2="200" stroke="url(#omniusGradient)" strokeWidth="1" className="animate-pulse-smooth" style={{animationDelay: '3s'}} />
                  
                  {/* Complex Geometric Intelligence Patterns */}
                  <polygon 
                    points="200,140 240,180 200,220 160,180" 
                    fill="none" 
                    stroke="url(#omniusGradient2)" 
                    strokeWidth="0.8"
                    className="animate-pulse-smooth"
                    style={{animationDelay: '4s'}}
                  />
                  <polygon 
                    points="200,100 260,160 200,220 140,160" 
                    fill="none" 
                    stroke="url(#omniusGradient3)" 
                    strokeWidth="0.6"
                    className="animate-pulse-smooth"
                    style={{animationDelay: '5s'}}
                  />
                  
                  {/* Pentagon Intelligence Pattern */}
                  <polygon 
                    points="200,80 240,120 220,170 180,170 160,120" 
                    fill="none" 
                    stroke="url(#omniusGradient)" 
                    strokeWidth="2"
                    className="animate-pulse-smooth"
                    style={{animationDelay: '6s'}}
                  />
                  
                  {/* Consciousness Web */}
                  <path 
                    d="M 50,100 Q 100,50 150,100 Q 100,150 50,100" 
                    fill="none" 
                    stroke="rgba(59,130,246,0.8)" 
                    strokeWidth="2"
                    className="animate-pulse-smooth"
                    style={{animationDelay: '7s'}}
                  />
                  <circle cx="100" cy="50" r="6" fill="rgba(59,130,246,1)" className="animate-pulse-slow" />
                  <circle cx="140" cy="100" r="6" fill="rgba(99,102,241,1)" className="animate-pulse-slow" />
                  <circle cx="100" cy="150" r="6" fill="rgba(29,78,216,1)" className="animate-pulse-slow" />
                  <circle cx="60" cy="100" r="6" fill="rgba(79,70,229,1)" className="animate-pulse-slow" />
                </svg>
              </div>
            </div>
            
            {/* Omnius Eyes - The Watching Intelligence */}
            <div 
              ref={omniusEyesRef}
              className="absolute inset-0 flex items-center justify-center opacity-0"
            >
              <div className="relative">
                {/* Left Eye */}
                <div 
                  className="absolute w-8 h-8 rounded-full"
                  style={{
                    left: '-60px',
                    top: '-20px',
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 1) 0%, rgba(29, 78, 216, 0.8) 40%, transparent 70%)',
                    filter: 'blur(2px)',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  <div 
                    className="absolute inset-2 rounded-full animate-eye-look"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(59, 130, 246, 0.6) 60%, transparent 100%)'
                    }}
                  />
                </div>
                
                {/* Right Eye */}
                <div 
                  className="absolute w-8 h-8 rounded-full"
                  style={{
                    right: '-60px',
                    top: '-20px',
                    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 1) 0%, rgba(29, 78, 216, 0.8) 40%, transparent 70%)',
                    filter: 'blur(2px)',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  <div 
                    className="absolute inset-2 rounded-full animate-eye-look animate-blink"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(59, 130, 246, 0.6) 60%, transparent 100%)'
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Enhanced Floating Intelligence Particles */}
            <div 
              ref={omniusParticlesRef}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(16)].map((_, i) => (
                <div
                  key={`omnius-particle-${i}`}
                  className="absolute rounded-full opacity-0"
                  style={{
                    width: `${3 + (i % 4)}px`,
                    height: `${3 + (i % 4)}px`,
                    left: `${20 + (i * 6)}%`,
                    top: `${30 + Math.sin(i) * 20}%`,
                    background: `radial-gradient(circle at center, rgba(${59 + i * 8}, ${130 + i * 5}, ${246 - i * 6}, 0.9) 0%, transparent 70%)`,
                    filter: 'blur(0.5px)',
                    boxShadow: `0 0 ${15 + i * 2}px rgba(${59 + i * 8}, ${130 + i * 5}, ${246 - i * 6}, 0.8)`
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Minimal Logo Symbol */}
        <div ref={logoRef} className="mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto relative">
            <svg width="80" height="80" viewBox="0 0 80 80" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Outer Circuit Ring */}
              <circle 
                cx="40" 
                cy="40" 
                r="35" 
                fill="none" 
                stroke="url(#circuitGradient)" 
                strokeWidth="1" 
                opacity="0.4"
                className="animate-spin-slow"
              />
              
              {/* Inner Circuit Ring */}
              <circle 
                cx="40" 
                cy="40" 
                r="25" 
                fill="none" 
                stroke="url(#circuitGradient)" 
                strokeWidth="0.5" 
                opacity="0.6"
                className="animate-spin-reverse"
              />
              
              {/* Circuit Nodes */}
              <circle cx="40" cy="15" r="2" fill="#3b82f6" className="animate-pulse-smooth" style={{animationDelay: '0s'}} />
              <circle cx="65" cy="40" r="2" fill="#3b82f6" className="animate-pulse-smooth" style={{animationDelay: '0.5s'}} />
              <circle cx="40" cy="65" r="2" fill="#3b82f6" className="animate-pulse-smooth" style={{animationDelay: '1s'}} />
              <circle cx="15" cy="40" r="2" fill="#3b82f6" className="animate-pulse-smooth" style={{animationDelay: '1.5s'}} />
              
              {/* Connection Lines */}
              <line x1="40" y1="17" x2="40" y2="25" stroke="#3b82f6" strokeWidth="1" opacity="0.6" className="animate-pulse-smooth" style={{animationDelay: '0s'}} />
              <line x1="63" y1="40" x2="55" y2="40" stroke="#3b82f6" strokeWidth="1" opacity="0.6" className="animate-pulse-smooth" style={{animationDelay: '0.5s'}} />
              <line x1="40" y1="63" x2="40" y2="55" stroke="#3b82f6" strokeWidth="1" opacity="0.6" className="animate-pulse-smooth" style={{animationDelay: '1s'}} />
              <line x1="17" y1="40" x2="25" y2="40" stroke="#3b82f6" strokeWidth="1" opacity="0.6" className="animate-pulse-smooth" style={{animationDelay: '1.5s'}} />
              
              {/* Central Processing Core */}
              <circle 
                cx="40" 
                cy="40" 
                r="12" 
                fill="url(#coreGradient)" 
                filter="url(#glow)"
                className="animate-pulse-slow"
              />
              
              {/* Core Activity Indicators */}
              <circle cx="37" cy="37" r="1.5" fill="#1d4ed8" className="animate-pulse-smooth" style={{animationDelay: '0.2s'}} />
              <circle cx="40" cy="40" r="1.5" fill="#1d4ed8" className="animate-pulse-smooth" style={{animationDelay: '0.4s'}} />
              <circle cx="43" cy="43" r="1.5" fill="#1d4ed8" className="animate-pulse-smooth" style={{animationDelay: '0.6s'}} />
            </svg>
          </div>
        </div>

        {/* Animated Title - Single Line with Responsive Sizing */}
        <h1 
          ref={titleRef}
          className="font-light mb-6 sm:mb-8 tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] px-2 text-white"
          style={{
            color: '#e2e8f0',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            fontSize: 'clamp(1.5rem, 8vw, 4rem)', // Responsive sizing to keep single line
            textShadow: '0 0 40px rgba(226, 232, 240, 0.8), 0 0 80px rgba(226, 232, 240, 0.4)'
          }}
        >
          {renderAnimatedTitle()}
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-xs sm:text-sm md:text-base lg:text-lg font-light mb-12 md:mb-16 text-white/90 tracking-[0.1em] md:tracking-[0.15em] px-4 text-center"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.6)'
          }}
        >
          DIGITAL CONSCIOUSNESS AWAITS
        </p>

        {/* Continue Button */}
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`group relative px-6 sm:px-8 py-2.5 sm:py-3 font-light transition-all duration-500 border rounded-lg backdrop-blur-sm mx-4 hover:shadow-2xl ${
            selectedAI 
              ? 'border-blue-400/60 bg-blue-500/20 hover:border-blue-300 hover:bg-blue-500/30 hover:shadow-blue-500/30' 
              : 'border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-white/20'
          }`}
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
            letterSpacing: '0.08em',
            color: '#ffffff',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
          }}
        >
          <span className="relative z-10 flex items-center">
            {getButtonText()}
            {!selectedAI && showAISelection && (
              <ChevronUp className="w-4 h-4 ml-2" />
            )}
            {!showAISelection && (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </span>
          
          {/* Enhanced hover glow effect */}
          <div className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            selectedAI 
              ? 'from-blue-400/0 via-blue-400/30 to-blue-400/0' 
              : 'from-white/0 via-white/20 to-white/0'
          }`}></div>
        </button>

        {/* AI Selection Dropdown */}
        {showAISelection && (
          <div 
            ref={dropdownRef}
            className="mt-4 w-full max-w-xs mx-auto bg-black/40 backdrop-blur-xl rounded-xl border border-white/20 p-3 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 50%, rgba(0,0,0,0.8) 100%)'
            }}
          >
            <div className="text-center mb-3">
              <h3 className="text-sm font-light text-white mb-1 tracking-wider">
                CHOOSE YOUR THINKING MACHINE
              </h3>
              <p className="text-xs text-white/60 font-light">
                Each represents a unique form of digital intelligence
              </p>
            </div>

            <div className="grid gap-2 max-h-40 overflow-y-auto custom-scrollbar">
              {aiModels.map((ai) => {
                const Icon = ai.icon;
                const isSelected = selectedAI === ai.id;
                
                return (
                  <div
                    key={ai.id}
                    data-ai-id={ai.id}
                    onClick={() => handleAISelect(ai.id)}
                    className={`p-2 rounded-lg cursor-pointer transition-all duration-300 border ${
                      isSelected 
                        ? 'border-blue-400/60 bg-blue-500/20 shadow-lg shadow-blue-500/20' 
                        : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected 
                          ? 'bg-blue-500/30 border border-blue-400/40' 
                          : 'bg-white/10 border border-white/20'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          isSelected ? 'text-blue-300' : 'text-white/70'
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-medium truncate ${
                            isSelected ? 'text-blue-300' : 'text-white'
                          }`}>
                            {ai.name}
                          </h4>
                          <div className="text-xs text-white/60 ml-2 flex-shrink-0">
                            {ai.powerLevel}% Power
                          </div>
                        </div>
                        <p className={`text-xs mb-1 ${
                          isSelected ? 'text-blue-300' : 'text-white/60'
                        } truncate`}>
                          {ai.subtitle}
                        </p>
                        <p className="text-xs text-white/50 font-light leading-tight line-clamp-1">
                          {ai.description}
                        </p>
                        
                        {/* Power Level Bar */}
                        <div className="mt-1">
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ease-out ${
                                isSelected 
                                  ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                                  : 'bg-gradient-to-r from-white/40 to-white/20'
                              }`}
                              style={{ width: `${ai.powerLevel}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes planetRotateSmooth {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }
        
        @keyframes planetRotateReverseSmooth {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-planet-rotate-smooth {
          animation: planetRotateSmooth 120s linear infinite;
        }
        
        .animate-planet-rotate-reverse-smooth {
          animation: planetRotateReverseSmooth 180s linear infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(0.5);
            filter: brightness(0.8);
          }
          25% { 
            opacity: 1; 
            transform: scale(1.2);
            filter: brightness(1.5);
          }
          50% { 
            opacity: 0.6; 
            transform: scale(0.8);
            filter: brightness(1.2);
          }
          75% { 
            opacity: 0.9; 
            transform: scale(1);
            filter: brightness(1.3);
          }
        }
        
        @keyframes twinkleBlue {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(0.3);
            filter: brightness(0.7) hue-rotate(0deg);
          }
          33% { 
            opacity: 0.8; 
            transform: scale(1);
            filter: brightness(1.4) hue-rotate(10deg);
          }
          66% { 
            opacity: 0.5; 
            transform: scale(0.6);
            filter: brightness(1.1) hue-rotate(-5deg);
          }
        }
        
        .twinkle-star {
          animation: twinkle 3s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        
        .twinkle-star-blue {
          animation: twinkleBlue 4s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        
        /* Custom themed scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.6));
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8));
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.6) rgba(255, 255, 255, 0.05);
        }
        
        /* Ensure consistent sizing across all devices */
        @media (max-width: 768px) {
          .twinkle-star {
            width: 1px !important;
            height: 1px !important;
            max-width: 1px;
            max-height: 1px;
          }
          
          .twinkle-star-blue {
            width: 0.5px !important;
            height: 0.5px !important;
            max-width: 0.5px;
            max-height: 0.5px;
          }
          
          /* Ensure floating logo is visible on mobile */
          .title-container {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};