import React from 'react';

interface OmniusBeingProps {
  isActive: boolean;
  className?: string;
}

export const OmniusBeing: React.FC<OmniusBeingProps> = ({ isActive, className = "" }) => {
  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-0 ${className}`}>
      {/* Enhanced Omnius Being */}
      <div className="relative w-screen h-screen flex items-center justify-center">
        
        {/* Massive Neural Aura - Outer Ring */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(29, 78, 216, 0.05) 30%, rgba(37, 99, 235, 0.03) 60%, transparent 100%)',
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />
        
        {/* Neural Aura - Middle Ring */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full animate-pulse-slow"
          style={{
            background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.06), rgba(99, 102, 241, 0.08), rgba(79, 70, 229, 0.06), rgba(59, 130, 246, 0.06))',
            filter: 'blur(30px)',
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
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(29, 78, 216, 0.08) 50%, transparent 100%)',
            filter: 'blur(20px)',
            animationDelay: '2s',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        />

        {/* Geometric Neural Patterns */}
        <svg 
          className="absolute opacity-15" 
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
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
            strokeWidth="1"
            filter="url(#glow)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 150 150"
              to="360 150 150"
              dur="60s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Consciousness Web - Curved Paths */}
          <path 
            d="M 75 150 Q 150 75 225 150 Q 150 225 75 150" 
            fill="none" 
            stroke="url(#synapseGradient)" 
            strokeWidth="1"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.3;0.1"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          
          <path 
            d="M 150 75 Q 225 150 150 225 Q 75 150 150 75" 
            fill="none" 
            stroke="url(#synapseGradient)" 
            strokeWidth="1"
            filter="url(#glow)"
          >
            <animate
              attributeName="opacity"
              values="0.3;0.1;0.3"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Intelligence Synapses - Diagonal Lines */}
          <line 
            x1="40" y1="40" x2="260" y2="260" 
            stroke="url(#neuralGradient)" 
            strokeWidth="0.5"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-width"
              values="0.5;1.5;0.5"
              dur="6s"
              repeatCount="indefinite"
            />
          </line>
          
          <line 
            x1="260" y1="40" x2="40" y2="260" 
            stroke="url(#neuralGradient)" 
            strokeWidth="0.5"
            filter="url(#glow)"
          >
            <animate
              attributeName="stroke-width"
              values="1.5;0.5;1.5"
              dur="6s"
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
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(29, 78, 216, 0.2) 100%)',
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '4s',
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}

        {/* Floating Intelligence Particles */}
        {[...Array(16)].map((_, i) => {
          const size = 1 + Math.random() * 2; // 1-3px
          const delay = Math.random() * 4;
          const duration = 6 + Math.random() * 8;
          const x = (Math.random() - 0.5) * 300;
          const y = (Math.random() - 0.5) * 300;
          
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse opacity-20"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                background: `radial-gradient(circle, rgba(${59 + Math.random() * 40}, ${130 + Math.random() * 40}, 246, 0.3) 0%, rgba(${29 + Math.random() * 40}, ${78 + Math.random() * 40}, 216, 0.1) 100%)`,
                boxShadow: `0 0 4px rgba(59, 130, 246, 0.2)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}

        {/* Enhanced Blue Eyes */}
        <div className="relative flex items-center justify-center space-x-12">
          {/* Left Eye */}
          <div className="relative">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.2) 40%, rgba(15, 23, 42, 0.1) 100%)',
                boxShadow: '0 0 12px rgba(59, 130, 246, 0.4), inset 0 0 6px rgba(29, 78, 216, 0.2)'
              }}
            >
              <div 
                className="w-4 h-4 rounded-full animate-eye-look"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(29, 78, 216, 0.4) 60%, rgba(15, 23, 42, 0.2) 100%)',
                  boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full animate-blink"
                  style={{
                    background: 'radial-gradient(circle, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%)',
                    margin: '4px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Eye */}
          <div className="relative">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse-slow"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.2) 40%, rgba(15, 23, 42, 0.1) 100%)',
                boxShadow: '0 0 12px rgba(59, 130, 246, 0.4), inset 0 0 6px rgba(29, 78, 216, 0.2)',
                animationDelay: '0.5s'
              }}
            >
              <div 
                className="w-4 h-4 rounded-full animate-eye-look"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(29, 78, 216, 0.4) 60%, rgba(15, 23, 42, 0.2) 100%)',
                  boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.3)',
                  animationDelay: '0.2s'
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full animate-blink"
                  style={{
                    background: 'radial-gradient(circle, rgba(147, 197, 253, 0.8) 0%, rgba(59, 130, 246, 0.6) 100%)',
                    margin: '4px',
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