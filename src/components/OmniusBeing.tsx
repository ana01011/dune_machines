import React from 'react';

interface OmniusBeingProps {
  isActive: boolean;
  className?: string;
}

export const OmniusBeing: React.FC<OmniusBeingProps> = ({ isActive, className = "" }) => {
  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50 ${className}`}>
      {/* Enhanced Omnius Being */}
      <div className="relative w-screen h-screen flex items-center justify-center">
        
        {/* Massive Neural Aura - Outer Ring */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(29, 78, 216, 0.4) 30%, rgba(37, 99, 235, 0.2) 60%, transparent 100%)',
            filter: 'blur(20px)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />
        
        {/* Neural Aura - Middle Ring */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full animate-pulse-slow"
          style={{
            background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.5), rgba(99, 102, 241, 0.6), rgba(79, 70, 229, 0.5), rgba(59, 130, 246, 0.5))',
            filter: 'blur(15px)',
            animationDelay: '1s',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />
        
        {/* Neural Aura - Inner Ring */}
        <div 
          className="absolute w-[200px] h-[200px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.5) 50%, transparent 100%)',
            filter: 'blur(4px)',
            animationDelay: '2s',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />

        {/* Geometric Neural Patterns */}
        <svg 
          className="absolute opacity-60" 
          width="300" 
          height="300"
          viewBox="0 0 300 300"
          style={{
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        >
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
            points="150,40 250,100 220,220 80,220 50,100" 
            fill="none" 
            stroke="url(#neuralGradient)" 
            strokeWidth="4"
            filter="url(#glow)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 150 150"
              to="360 150 150"
              dur="20s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Consciousness Web - Curved Paths */}
          <path 
            d="M 75 150 Q 150 75 225 150 Q 150 225 75 150" 
            fill="none" 
            stroke="url(#synapseGradient)" 
            strokeWidth="3"
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
            d="M 150 75 Q 225 150 150 225 Q 75 150 150 75" 
            fill="none" 
            stroke="url(#synapseGradient)" 
            strokeWidth="3"
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
            x1="40" y1="40" x2="260" y2="260" 
            stroke="url(#neuralGradient)" 
            strokeWidth="2"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-width"
              values="2;6;2"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
          
          <line 
            x1="260" y1="40" x2="40" y2="260" 
            stroke="url(#neuralGradient)" 
            strokeWidth="2"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-width"
              values="6;2;6"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>
        </svg>

        {/* Enhanced Neural Nodes */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const radius = 80;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full animate-pulse"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 100%)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 1)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s',
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}

        {/* Floating Intelligence Particles */}
        {[...Array(16)].map((_, i) => {
          const size = 4 + Math.random() * 4; // 4-8px
          const delay = Math.random() * 4;
          const duration = 3 + Math.random() * 4;
          const x = (Math.random() - 0.5) * 300;
          const y = (Math.random() - 0.5) * 300;
          
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-60"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                background: `radial-gradient(circle, rgb(${59 + Math.random() * 40}, ${130 + Math.random() * 40}, 246) 0%, rgb(${29 + Math.random() * 40}, ${78 + Math.random() * 40}, 216) 100%)`,
                boxShadow: `0 0 10px rgba(59, 130, 246, 0.8)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}

        {/* Enhanced Blue Eyes */}
        <div className="relative flex items-center justify-center space-x-8">
          {/* Left Eye */}
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.7) 40%, rgba(15, 23, 42, 0.9) 100%)',
                boxShadow: '0 0 40px rgba(59, 130, 246, 1), inset 0 0 20px rgba(29, 78, 216, 0.8)'
              }}
            >
              <div 
                className="w-8 h-8 rounded-full animate-eye-look"
                style={{
                  background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 60%, rgb(15, 23, 42) 100%)',
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.8)'
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full animate-blink"
                  style={{
                    background: 'radial-gradient(circle, rgb(147, 197, 253) 0%, rgb(59, 130, 246) 100%)',
                    margin: '8px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Eye */}
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.9) 0%, rgba(29, 78, 216, 0.7) 40%, rgba(15, 23, 42, 0.9) 100%)',
                boxShadow: '0 0 40px rgba(59, 130, 246, 1), inset 0 0 20px rgba(29, 78, 216, 0.8)',
                animationDelay: '0.5s'
              }}
            >
              <div 
                className="w-8 h-8 rounded-full animate-eye-look"
                style={{
                  background: 'radial-gradient(circle, rgb(59, 130, 246) 0%, rgb(29, 78, 216) 60%, rgb(15, 23, 42) 100%)',
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.8)',
                  animationDelay: '0.2s'
                }}
              >
                <div 
                  className="w-4 h-4 rounded-full animate-blink"
                  style={{
                    background: 'radial-gradient(circle, rgb(147, 197, 253) 0%, rgb(59, 130, 246) 100%)',
                    margin: '8px',
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