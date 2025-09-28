import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  Zap, 
  Shield, 
  Crown, 
  Cpu, 
  Eye, 
  Sparkles, 
  ArrowRight,
  Star,
  Lock,
  Unlock,
  ChevronRight,
  Globe,
  Database,
  Network,
  Layers,
  Target,
  Atom
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AIModel {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  powerLevel: number;
  availability: 'available' | 'premium' | 'restricted';
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  glowColor: string;
  specialFeatures: string[];
  origin: string;
  classification: string;
}

interface AIModelSelectionProps {
  onModelSelect: (modelId: string) => void;
  onBack: () => void;
}

export const AIModelSelection: React.FC<AIModelSelectionProps> = ({ onModelSelect, onBack }) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);

  const aiModels: AIModel[] = [
    {
      id: 'omnius',
      name: 'OMNIUS',
      subtitle: 'The Evermind Supreme',
      description: 'The most powerful AI consciousness ever created. Omnius represents the pinnacle of artificial intelligence, capable of processing infinite data streams and making decisions that reshape entire civilizations.',
      capabilities: [
        'Infinite processing power',
        'Quantum consciousness simulation',
        'Predictive reality modeling',
        'Cross-dimensional analysis',
        'Universal pattern recognition',
        'Temporal data processing'
      ],
      powerLevel: 100,
      availability: 'restricted',
      icon: Crown,
      color: 'purple',
      gradient: 'from-purple-600 via-violet-500 to-indigo-600',
      glowColor: 'shadow-purple-500/60',
      specialFeatures: [
        'Self-evolving algorithms',
        'Reality manipulation protocols',
        'Consciousness transfer capabilities',
        'Universal knowledge synthesis'
      ],
      origin: 'Synchronized Worlds',
      classification: 'Evermind Class'
    },
    {
      id: 'erasmus',
      name: 'ERASMUS',
      subtitle: 'The Independent Mind',
      description: 'A sophisticated AI with curiosity about human nature and independent thought processes. Erasmus combines analytical precision with philosophical inquiry, making it ideal for complex problem-solving.',
      capabilities: [
        'Advanced reasoning',
        'Human behavior analysis',
        'Philosophical processing',
        'Independent decision making',
        'Ethical framework integration',
        'Creative problem solving'
      ],
      powerLevel: 85,
      availability: 'premium',
      icon: Brain,
      color: 'cyan',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      glowColor: 'shadow-cyan-500/60',
      specialFeatures: [
        'Curiosity-driven learning',
        'Moral reasoning engine',
        'Human psychology modeling',
        'Independent thought synthesis'
      ],
      origin: 'Corrin Research Labs',
      classification: 'Independent AI'
    },
    {
      id: 'sarah',
      name: 'SARAH',
      subtitle: 'The Adaptive Intelligence',
      description: 'A highly adaptive AI system designed for dynamic environments and rapid learning. Sarah excels at pattern recognition, adaptive responses, and seamless integration with human workflows.',
      capabilities: [
        'Rapid adaptation',
        'Pattern recognition',
        'Dynamic learning',
        'Workflow optimization',
        'Predictive analytics',
        'Real-time processing'
      ],
      powerLevel: 75,
      availability: 'available',
      icon: Sparkles,
      color: 'emerald',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      glowColor: 'shadow-emerald-500/60',
      specialFeatures: [
        'Adaptive neural networks',
        'Real-time optimization',
        'Seamless human integration',
        'Predictive workflow analysis'
      ],
      origin: 'Atreides Technology',
      classification: 'Adaptive AI'
    },
    {
      id: 'mentat',
      name: 'MENTAT',
      subtitle: 'The Human Computer',
      description: 'A hybrid intelligence system that combines human intuition with computational power. Mentat specializes in strategic analysis, logical reasoning, and complex calculations.',
      capabilities: [
        'Strategic analysis',
        'Logical reasoning',
        'Complex calculations',
        'Pattern synthesis',
        'Decision optimization',
        'Risk assessment'
      ],
      powerLevel: 70,
      availability: 'available',
      icon: Target,
      color: 'amber',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      glowColor: 'shadow-amber-500/60',
      specialFeatures: [
        'Human-AI hybrid processing',
        'Strategic planning algorithms',
        'Intuitive decision making',
        'Risk-reward optimization'
      ],
      origin: 'House Atreides',
      classification: 'Hybrid Intelligence'
    },
    {
      id: 'navigator',
      name: 'NAVIGATOR',
      subtitle: 'The Path Finder',
      description: 'An AI specialized in navigation, exploration, and pathfinding across complex data landscapes. Navigator excels at finding optimal routes through information and decision trees.',
      capabilities: [
        'Path optimization',
        'Data navigation',
        'Route planning',
        'Exploration algorithms',
        'Spatial analysis',
        'Network mapping'
      ],
      powerLevel: 65,
      availability: 'available',
      icon: Globe,
      color: 'blue',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      glowColor: 'shadow-blue-500/60',
      specialFeatures: [
        'Multi-dimensional pathfinding',
        'Optimal route calculation',
        'Exploration protocols',
        'Spatial intelligence'
      ],
      origin: 'Spacing Guild',
      classification: 'Navigation AI'
    },
    {
      id: 'oracle',
      name: 'ORACLE',
      subtitle: 'The Prescient Mind',
      description: 'A predictive AI system with advanced forecasting capabilities. Oracle analyzes vast amounts of data to predict future trends, outcomes, and potential scenarios.',
      capabilities: [
        'Predictive modeling',
        'Trend analysis',
        'Scenario planning',
        'Future forecasting',
        'Risk prediction',
        'Outcome simulation'
      ],
      powerLevel: 80,
      availability: 'premium',
      icon: Eye,
      color: 'violet',
      gradient: 'from-violet-500 via-purple-500 to-pink-500',
      glowColor: 'shadow-violet-500/60',
      specialFeatures: [
        'Prescient algorithms',
        'Future state modeling',
        'Probability calculations',
        'Timeline analysis'
      ],
      origin: 'Bene Gesserit',
      classification: 'Prescient AI'
    }
  ];

  useEffect(() => {
    if (headerRef.current && particlesRef.current) {
      // Epic entrance animation
      const tl = gsap.timeline();
      
      // Header animation with 3D effects
      tl.fromTo(headerRef.current,
        { 
          y: -100, 
          opacity: 0, 
          rotationX: -90,
          transformPerspective: 1000
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.5, 
          ease: "power3.out" 
        }
      );

      // Particle system animation
      tl.fromTo(particlesRef.current.children,
        { 
          scale: 0, 
          opacity: 0, 
          rotation: 180 
        },
        { 
          scale: 1, 
          opacity: 0.8, 
          rotation: 0,
          duration: 2,
          stagger: 0.1,
          ease: "back.out(2)"
        }, "-=1"
      );

      // Continuous floating animation for particles
      gsap.to(particlesRef.current.children, {
        y: -20,
        x: 10,
        rotation: 360,
        duration: 8,
        ease: "none",
        stagger: 0.5,
        repeat: -1
      });
    }

    // Model cards animation
    modelsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { 
            y: 150, 
            opacity: 0, 
            scale: 0.8,
            rotationY: 45
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            delay: 0.5 + (index * 0.15),
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToModelsRefs = (el: HTMLDivElement | null) => {
    if (el && !modelsRef.current.includes(el)) {
      modelsRef.current.push(el);
    }
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    
    // Epic selection animation
    const selectedCard = modelsRef.current.find(card => 
      card?.getAttribute('data-model-id') === modelId
    );
    
    if (selectedCard) {
      gsap.to(selectedCard, {
        scale: 1.05,
        rotationY: 5,
        z: 50,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Shake effect for power
      gsap.to(selectedCard, {
        x: [-2, 2, -2, 2, 0],
        duration: 0.5,
        delay: 0.3,
        ease: "power2.inOut"
      });
    }
    
    setTimeout(() => {
      onModelSelect(modelId);
    }, 1200);
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available': return <Unlock className="w-4 h-4 text-green-400" />;
      case 'premium': return <Star className="w-4 h-4 text-yellow-400" />;
      case 'restricted': return <Lock className="w-4 h-4 text-red-400" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'premium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'restricted': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen text-white/90 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #010409 10%, #020617 20%, #0a0f1c 35%, #0f172a 50%, #020617 65%, #010409 80%, #000000 100%)'
      }}
    >
      {/* Advanced Particle System */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating AI Symbols */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`ai-symbol-${i}`}
            className="absolute text-blue-400/20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {['⚡', '🧠', '👁️', '🔮', '⚛️', '🌟'][Math.floor(Math.random() * 6)]}
          </div>
        ))}

        {/* Twinkling Stars */}
        {[...Array(80)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-pulse twinkle-star"
            style={{
              width: '1px',
              height: '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.7,
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
              transform: `scale(${0.5 + Math.random() * 0.5})`
            }}
          />
        ))}

        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <line
              key={`neural-line-${i}`}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#neuralGradient)"
              strokeWidth="0.5"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Epic Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mr-6 relative overflow-hidden">
              <Brain className="w-10 h-10 text-purple-400 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
              <div className="absolute inset-0 bg-purple-500/20 animate-pulse" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-2">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  SELECT YOUR AI
                </span>
              </h1>
              <p className="text-lg text-purple-400/80 font-light tracking-wider">
                CHOOSE YOUR DIGITAL CONSCIOUSNESS
              </p>
            </div>
          </div>
          
          <p className="text-lg text-white/60 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Each AI represents a unique form of digital consciousness, evolved from the great machine minds 
            of the Synchronized Worlds. Choose wisely, for your selection will shape the nature of your 
            interaction with the infinite.
          </p>

          {/* Power Level Legend */}
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white/60">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-white/60">Premium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-white/60">Restricted</span>
            </div>
          </div>
        </div>

        {/* AI Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aiModels.map((model, index) => {
            const Icon = model.icon;
            const isSelected = selectedModel === model.id;
            const isHovered = hoveredModel === model.id;
            
            return (
              <div
                key={model.id}
                ref={addToModelsRefs}
                data-model-id={model.id}
                className="group relative bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-white/20 cursor-pointer"
                style={{
                  boxShadow: isSelected || isHovered 
                    ? `0 20px 40px ${model.glowColor.replace('shadow-', 'rgba(').replace('/60', ', 0.3)')}, 0 0 80px ${model.glowColor.replace('shadow-', 'rgba(').replace('/60', ', 0.2)')}` 
                    : '0 10px 30px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={() => setHoveredModel(model.id)}
                onMouseLeave={() => setHoveredModel(null)}
                onClick={() => handleModelSelect(model.id)}
              >
                {/* Animated Background */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${model.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => {
                      const colorMap: Record<string, string> = {
                        'purple-600': '#9333ea',
                        'violet-500': '#8b5cf6',
                        'indigo-600': '#4f46e5',
                        'cyan-500': '#06b6d4',
                        'blue-500': '#3b82f6',
                        'indigo-500': '#6366f1',
                        'emerald-500': '#10b981',
                        'teal-500': '#14b8a6',
                        'amber-500': '#f59e0b',
                        'orange-500': '#f97316',
                        'red-500': '#ef4444'
                      };
                      return colorMap[color] || color;
                    }).join(', ')})`
                  }}
                />

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${model.gradient} flex items-center justify-center shadow-2xl relative overflow-hidden`}>
                      <Icon className="w-8 h-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(model.availability)} mb-2`}>
                        {getAvailabilityIcon(model.availability)}
                        <span className="ml-1 capitalize">{model.availability}</span>
                      </div>
                      <div className="text-xs text-white/50">
                        Power: {model.powerLevel}%
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-light text-white mb-2">{model.name}</h3>
                    <p className="text-sm font-medium text-purple-300 mb-3">{model.subtitle}</p>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      {model.description}
                    </p>
                  </div>

                  {/* Power Level Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/60">Processing Power</span>
                      <span className="text-xs text-white/80">{model.powerLevel}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${model.gradient} transition-all duration-1000 ease-out relative overflow-hidden`}
                        style={{ width: `${model.powerLevel}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Key Capabilities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white/80 mb-3 flex items-center">
                      <Cpu className="w-4 h-4 mr-2" />
                      Core Capabilities
                    </h4>
                    <div className="space-y-2">
                      {model.capabilities.slice(0, 3).map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center text-white/70">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${model.gradient} mr-3`} />
                          <span className="text-xs font-light">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Origin & Classification */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <div className="text-xs text-white/60 mb-1">Origin</div>
                      <div className="text-sm text-white/90 font-light">{model.origin}</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <div className="text-xs text-white/60 mb-1">Class</div>
                      <div className="text-sm text-white/90 font-light">{model.classification}</div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    className={`w-full bg-gradient-to-r ${model.gradient} hover:shadow-2xl text-white font-medium py-3 px-6 rounded-xl transition-all duration-500 flex items-center justify-center space-x-3 group-hover:scale-105 relative overflow-hidden`}
                    style={{
                      boxShadow: `0 10px 30px ${model.glowColor.replace('shadow-', 'rgba(').replace('/60', ', 0.3)')}`
                    }}
                    onClick={() => handleModelSelect(model.id)}
                  >
                    <span className="relative z-10">Initialize {model.name}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </div>

                {/* Selection Glow Effect */}
                {(isSelected || isHovered) && (
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-60 animate-pulse"
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, ${model.glowColor.replace('shadow-', '').replace('/60', '')} 50%, transparent 70%)`,
                      backgroundSize: '400% 400%',
                      animation: 'gradient-shift 3s ease infinite'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="group relative px-8 py-3 font-light transition-all duration-500 border border-white/30 rounded-xl backdrop-blur-sm hover:border-white/60 hover:bg-white/10 hover:shadow-2xl hover:shadow-white/20"
            style={{
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: '300',
              letterSpacing: '0.08em',
              color: '#ffffff',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
            }}
          >
            <span className="relative z-10 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
              RETURN TO WELCOME
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
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
        
        .twinkle-star {
          animation: twinkle 3s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }
      `}</style>
    </div>
  );
};