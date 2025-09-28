import React from 'react';

interface OmniusBeingProps {
  isActive: boolean;
  className?: string;
}

export const OmniusBeing: React.FC<OmniusBeingProps> = ({ isActive, className = "" }) => {
  if (!isActive) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-0 ${className}`}>
      {/* Evil Geometric Ring Structure */}
      <div className="relative w-screen h-screen flex items-center justify-center">
        
        {/* Massive Geometric Ring - Outer */}
        <svg 
          className="absolute opacity-8" 
          width="800" 
          height="800"
          viewBox="0 0 800 800"
          style={{
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
          }}
        >
          <defs>
            <linearGradient id="evilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(220, 38, 127, 0.15)" />
              <stop offset="25%" stopColor="rgba(147, 51, 234, 0.12)" />
              <stop offset="50%" stopColor="rgba(79, 70, 229, 0.1)" />
              <stop offset="75%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="100%" stopColor="rgba(220, 38, 127, 0.15)" />
            </linearGradient>
            <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(15, 23, 42, 0.2)" />
              <stop offset="50%" stopColor="rgba(30, 41, 59, 0.15)" />
              <stop offset="100%" stopColor="rgba(15, 23, 42, 0.2)" />
            </linearGradient>
            <filter id="evilGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Outer Hexagonal Ring */}
          <polygon 
            points="400,50 650,200 650,600 400,750 150,600 150,200" 
            fill="none" 
            stroke="url(#evilGradient)" 
            strokeWidth="2"
            filter="url(#evilGlow)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 400 400"
              to="360 400 400"
              dur="120s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Middle Octagonal Ring */}
          <polygon 
            points="400,120 580,200 650,380 580,560 400,640 220,560 150,380 220,200" 
            fill="none" 
            stroke="url(#evilGradient)" 
            strokeWidth="1.5"
            filter="url(#evilGlow)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="360 400 400"
              to="0 400 400"
              dur="80s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Inner Dodecagonal Ring */}
          <polygon 
            points="400,200 480,230 540,300 560,380 540,460 480,530 400,560 320,530 260,460 240,380 260,300 320,230" 
            fill="none" 
            stroke="url(#evilGradient)" 
            strokeWidth="1"
            filter="url(#evilGlow)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 400 400"
              to="360 400 400"
              dur="60s"
              repeatCount="indefinite"
            />
          </polygon>
          
          {/* Connecting Lines - Creating Web Pattern */}
          <line x1="400" y1="50" x2="400" y2="200" stroke="url(#darkGradient)" strokeWidth="0.5" opacity="0.6" />
          <line x1="650" y1="200" x2="540" y2="300" stroke="url(#darkGradient)" strokeWidth="0.5" opacity="0.6" />
          <line x1="650" y1="600" x2="540" y2="460" stroke="url(#darkGradient)" strokeWidth="0.5" opacity="0.6" />
          <line x1="400" y1="750" x2="400" y2="560" stroke="url(#darkGradient)" strokeWidth="0.5" opacity="0.6" />
          <line x1="150" y1="600" x2="260" y2="460" stroke="url(#darkGradient)" strokeWidth="0.5" opacity="0.6" />
          <line x1="150" y1="200" x2="260" y2="300" stroke="url(#darkGradient)" strokeWidth="0.5" opacity="0.6" />
          
          {/* Power Nodes at Vertices */}
          <circle cx="400" cy="50" r="4" fill="rgba(220, 38, 127, 0.3)" className="animate-pulse-slow" style={{animationDelay: '0s'}} />
          <circle cx="650" cy="200" r="4" fill="rgba(147, 51, 234, 0.3)" className="animate-pulse-slow" style={{animationDelay: '1s'}} />
          <circle cx="650" cy="600" r="4" fill="rgba(79, 70, 229, 0.3)" className="animate-pulse-slow" style={{animationDelay: '2s'}} />
          <circle cx="400" cy="750" r="4" fill="rgba(59, 130, 246, 0.3)" className="animate-pulse-slow" style={{animationDelay: '3s'}} />
          <circle cx="150" cy="600" r="4" fill="rgba(220, 38, 127, 0.3)" className="animate-pulse-slow" style={{animationDelay: '4s'}} />
          <circle cx="150" cy="200" r="4" fill="rgba(147, 51, 234, 0.3)" className="animate-pulse-slow" style={{animationDelay: '5s'}} />
        </svg>

        {/* Devious Evil Eyes in Center */}
        <div className="relative flex items-center justify-center space-x-20">
          {/* Left Eye - Narrow Sinister Shape */}
          <div className="relative">
            <div 
              className="w-16 h-8 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%)',
                borderRadius: '50% 10% 50% 10%',
                boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.9), 0 0 20px rgba(220, 38, 127, 0.1)',
                border: '1px solid rgba(220, 38, 127, 0.2)',
                transform: 'rotate(-15deg)'
              }}
            >
              {/* Evil Iris */}
              <div 
                className="w-10 h-6 flex items-center justify-center relative"
                style={{
                  background: 'radial-gradient(ellipse, rgba(220, 38, 127, 0.4) 0%, rgba(147, 51, 234, 0.6) 30%, rgba(79, 70, 229, 0.8) 60%, rgba(0, 0, 0, 0.95) 100%)',
                  borderRadius: '50%',
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.8)'
                }}
              >
                {/* Vertical Scanning Lines */}
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(220, 38, 127, 0.4) 1px, transparent 3px)',
                    borderRadius: '50%'
                  }}
                />
                
                {/* Slit Pupil - Like a Reptile */}
                <div 
                  className="w-6 h-1 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0.9) 100%)',
                    borderRadius: '50px',
                    boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 1), 0 0 2px rgba(220, 38, 127, 0.3)'
                  }}
                >
                  {/* Evil Core */}
                  <div 
                    className="w-1 h-0.5 animate-pulse"
                    style={{
                      background: 'rgba(220, 38, 127, 0.9)',
                      boxShadow: '0 0 3px rgba(220, 38, 127, 0.7)',
                      animationDuration: '3s'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Eye - Narrow Sinister Shape */}
          <div className="relative">
            <div 
              className="w-16 h-8 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%)',
                borderRadius: '10% 50% 10% 50%',
                boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.9), 0 0 20px rgba(220, 38, 127, 0.1)',
                border: '1px solid rgba(220, 38, 127, 0.2)',
                transform: 'rotate(15deg)'
              }}
            >
              {/* Evil Iris */}
              <div 
                className="w-10 h-6 flex items-center justify-center relative"
                style={{
                  background: 'radial-gradient(ellipse, rgba(220, 38, 127, 0.4) 0%, rgba(147, 51, 234, 0.6) 30%, rgba(79, 70, 229, 0.8) 60%, rgba(0, 0, 0, 0.95) 100%)',
                  borderRadius: '50%',
                  boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.8)'
                }}
              >
                {/* Vertical Scanning Lines */}
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: 'repeating-linear-gradient(90deg, transparent 0px, rgba(220, 38, 127, 0.4) 1px, transparent 3px)',
                    borderRadius: '50%'
                  }}
                />
                
                {/* Slit Pupil - Like a Reptile */}
                <div 
                  className="w-6 h-1 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0.9) 100%)',
                    borderRadius: '50px',
                    boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 1), 0 0 2px rgba(220, 38, 127, 0.3)'
                  }}
                >
                  {/* Evil Core */}
                  <div 
                    className="w-1 h-0.5 animate-pulse"
                    style={{
                      background: 'rgba(220, 38, 127, 0.9)',
                      boxShadow: '0 0 3px rgba(220, 38, 127, 0.7)',
                      animationDuration: '3s',
                      animationDelay: '1.5s'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};