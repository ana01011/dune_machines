import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Brain, Crown, Sparkles, Target, Globe, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: (aiId?: string) => void;
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

    // Animate title letters first
    tl.to('.title-letter', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: {
        amount: 0.8,
        from: "start"
      }
    })
    
    // Then animate logo when title appears
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.4")
    
    // Animate subtitle with 1.5 second delay after title
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power2.out"
    }, "+=1.5")
    
    // Finally animate button with 3 second delay after title
    tl.to(buttonRef.current, {
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
      onComplete(selectedAI);
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        
        {/* Logo Position Control - Adjust margin-bottom values to control gap between logo and title */}
        {/* Current: mb-2 sm:mb-3 (increase for more gap, decrease for less gap) */}
        <div ref={logoRef} className="mb-2 sm:mb-3">
          <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto relative">
            <img 
              src="/duneicon.webp" 
              alt="DUNE MACHINES Logo" 
              className="w-full h-full object-contain drop-shadow-2xl animate-pulse-slow"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.4))'
              }}
            />
          </div>
        </div>

        {/* Title Position Control - Adjust margin-bottom values to control gap between title and subtitle */}
        {/* Current: mb-3 sm:mb-4 (increase for more gap, decrease for less gap) */}
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

        {/* Subtitle Position Control - Adjust margin-bottom values to control gap between subtitle and button */}
        {/* Current: mb-8 md:mb-12 (increase for more gap, decrease for less gap) */}
        <p 
          ref={subtitleRef}
          className="text-xs sm:text-sm md:text-base lg:text-lg font-light mb-8 md:mb-12 text-white/90 tracking-[0.1em] md:tracking-[0.15em] px-4 text-center"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.6)'
          }}
        >
          DIGITAL CONSCIOUSNESS AWAITS
        </p>

        {/* Button Position Control - This button's position is controlled by the subtitle margin above */}
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`group relative px-6 sm:px-8 py-2.5 sm:py-3 font-light transition-all duration-500 border rounded-lg backdrop-blur-sm mx-4 hover:shadow-2xl ${
            selectedAI 
              ? 'border-blue-400/60 bg-blue-500/20 hover:border-blue-300 hover:bg-blue-500/30 hover:shadow-blue-500/30 animate-glow-loop' 
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
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>{getButtonText()}</span>
            {!showAISelection ? (
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            ) : selectedAI ? null : (
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            )}
          </span>
        </button>

        {/* AI Selection Dropdown */}
        {showAISelection && (
          <div 
            ref={dropdownRef}
            className="mt-4 w-full max-w-xs sm:max-w-sm px-4"
          >
            <div 
              className="backdrop-blur-2xl border border-blue-400/30 rounded-xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto custom-ai-scrollbar"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 80px rgba(59, 130, 246, 0.2)'
              }}
            >
              {aiModels.map((ai) => {
                const IconComponent = ai.icon;
                const isSelected = selectedAI === ai.id;
                
                return (
                  <button
                    key={ai.id}
                    data-ai-id={ai.id}
                    onClick={() => handleAISelect(ai.id)}
                    className={`w-full text-left px-3 py-2.5 transition-all duration-300 hover:bg-blue-500/10 border-b border-white/5 last:border-b-0 ${
                      isSelected
                        ? 'bg-blue-500/20 text-white border-l-3 border-blue-400' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                        <IconComponent className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-light text-white tracking-wider truncate">{ai.name}</div>
                          <div className="text-xs text-white/60 font-light truncate">{ai.subtitle}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-blue-400/80 mb-1">{ai.powerLevel}%</div>
                        <div className="w-6 h-0.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-400 transition-all duration-1000"
                            style={{ width: `${ai.powerLevel}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Custom AI Selection Scrollbar */
        .custom-ai-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-ai-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }
        
        .custom-ai-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.6));
          border-radius: 2px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .custom-ai-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8));
        }
        
        /* Firefox scrollbar */
        .custom-ai-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.6) rgba(0, 0, 0, 0.2);
        }
        
        @keyframes planetRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes planetRotateReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-planet-rotate-smooth {
          animation: planetRotate 120s linear infinite;
        }
        
        .animate-planet-rotate-reverse-smooth {
          animation: planetRotateReverse 80s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin 15s linear infinite reverse;
        }
        
        .animate-pulse-smooth {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 6s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(0.5);
            filter: brightness(0.8);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2);
            filter: brightness(1.5);
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
        
        @keyframes glowLoop {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2), 0 0 60px rgba(59, 130, 246, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4), 0 0 90px rgba(59, 130, 246, 0.2);
          }
        }
        
        .animate-glow-loop {
          animation: glowLoop 2s ease-in-out infinite;
        }
        
        .twinkle-star {
          animation: twinkle 3s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
        
        .twinkle-star-blue {
          animation: twinkleBlue 2s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </div>
  );
};