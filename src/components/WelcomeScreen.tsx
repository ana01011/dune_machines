import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Brain, Crown, Sparkles, Target, Globe, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [showAISelection, setShowAISelection] = useState(false);
  const [selectedAI, setSelectedAI] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      // Continue to selected AI's interface
      handleContinue();
    }
  };

  const handleAISelect = (aiId: string) => {
    setSelectedAI(aiId);
    
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

  const handleContinue = () => {
    if (selectedAI) {
      // Navigate to the selected AI's chat interface
      if (selectedAI === 'omnius') {
        onComplete('omnius');
      } else {
        // For other AIs, we can add their interfaces later
        onComplete(selectedAI);
      }
    }
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

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        
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
          className="font-light mb-3 sm:mb-4 tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] lg:tracking-[0.4em] px-2 text-white"
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

        {/* Subtitle