import React from 'react';

interface OmniusBeingProps {
  isActive: boolean;
  className?: string;
}

export const OmniusBeing: React.FC<OmniusBeingProps> = ({ isActive, className = "" }) => {
  if (!isActive) return null;

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      {/* Enhanced Omnius Being */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        
        {/* Massive Neural Aura - Outer Ring */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(29, 78, 216, 0.2) 30%, rgba(37, 99, 235, 0.1) 60%, transparent 100%)',
            filter: 'blur(8px)'
          }}
        />
        
        {/* Neural Aura - Middle Ring */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
          style={{
            background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.4), rgba(79, 70, 229, 0.3), rgba(59, 130, 246, 0.3))',
            filter: 'blur(6px)',
            animationDelay: '1s'
          }}
        />
        
        {/* Neural Aura - Inner Ring */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(29, 78, 216, 0.3) 50%, transparent 100%)',
            filter: 'blur(4px)',
            animationDelay: '2s'
          }}
        />

        {/* Geometric Neural Patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
          <defs>
            <radialGradient id="neuralGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
              <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.4" />
            </radialGradient>
            <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Pentagon Intelligence Pattern */}
          <polygon 
            points="200,50 350,150 300,300 100,300 50,150" 
            fill="none" 
            stroke="url(#neuralGradient)" 
            strokeWidth="3"
            filter="url(#glow)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Consciousness Web - Curved Paths */}
          <path 
            d="M 100 200 Q 200 100 300 200 Q 200 300 100 200" 
            fill="none" 
            stroke="url(#synapseGradient)" 
            strokeWidth="2"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          
          <path 
            d="M 200 100 Q 300 200 200 300 Q 100 200 200 100" 
            fill="none" 
            stroke="url(#synapseGradient)" 
            strokeWidth="2"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Intelligence Synapses - Diagonal Lines */}
          <line 
            x1="50" y1="50" x2="350" y2="350" 
            stroke="url(#neuralGradient)" 
            strokeWidth="1"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-width"
              values="1;4;1"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          
          <line 
            x1="350" y1="50" x2="50" y2="350" 
            stroke="url(#neuralGradient)" 
            strokeWidth="1"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-width"
              values="4;1;4"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
        </svg>

        {/* Enhanced Neural Nodes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 100%)',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
                filter: 'blur(0.5px)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          );
        })}

        {/* Floating Intelligence Particles */}
        {[...Array(16)].map((_, i) => {
          const size = 6 + Math.random() * 6; // 6-12px
          const delay = Math.random() * 4;
          const duration = 3 + Math.random() * 4;
          
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-60"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                background: `radial-gradient(circle, rgb(${59 + Math.random() * 40}, ${130 + Math.random() * 40}, 246) 0%, rgb(${29 + Math.random() * 40}, ${78 + Math.random() * 40}, 216) 100%)`,
                boxShadow: `0 0 15px rgba(59, 130, 246, 0.6)`,
                filter: 'blur(1px)',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          );
        })}

        {/* Enhanced Blue Eyes */}
        <div className="relative flex items-center justify-center space-x-8">
          {/* Left Eye */}
          <div className="relative">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.7) 40%, rgba(15, 23, 42, 0.9) 100%)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), inset 0 0 15px rgba(29, 78, 216, 0.6)'
              }}
            >
              <div 
                className="w-6 h-6 rounded-full animate-eye-look"
                style={{
                  background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 60%, rgb(15, 23, 42) 100%)',
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.8)'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full animate-blink"
                  style={{
                    background: 'radial-gradient(circle, rgb(147, 197, 253) 0%, rgb(59, 130, 246) 100%)',
                    margin: '6px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Eye */}
          <div className="relative">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.7) 40%, rgba(15, 23, 42, 0.9) 100%)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), inset 0 0 15px rgba(29, 78, 216, 0.6)',
                animationDelay: '0.5s'
              }}
            >
              <div 
                className="w-6 h-6 rounded-full animate-eye-look"
                style={{
                  background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 60%, rgb(15, 23, 42) 100%)',
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.8)',
                  animationDelay: '0.2s'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full animate-blink"
                  style={{
                    background: 'radial-gradient(circle, rgb(147, 197, 253) 0%, rgb(59, 130, 246) 100%)',
                    margin: '6px',
                    animationDelay: '0.3s'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};