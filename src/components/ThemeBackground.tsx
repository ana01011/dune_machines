import React, { useMemo } from 'react';
import { ChatTheme } from '../themes/chatThemes';

interface ThemeBackgroundProps {
  theme: ChatTheme;
  className?: string;
}

const ThemeBackgroundComponent: React.FC<ThemeBackgroundProps> = ({ theme, className = "" }) => {
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      key: `particle-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.7,
      scale: 0.5 + Math.random() * 0.5
    }));
  }, []);

  const glitters = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      key: `glitter-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.5,
      scale: 0.3 + Math.random() * 0.4
    }));
  }, []);

  const matrixElements = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      key: `matrix-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      text: Math.random().toString(36).substring(2, 8)
    }));
  }, []);

  const neonGlows = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      key: `neon-${i}`,
      width: 10 + Math.random() * 20,
      height: 10 + Math.random() * 20,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }));
  }, []);

  const bubbles = useMemo(() => {
    return [...Array(25)].map((_, i) => ({
      key: `bubble-${i}`,
      width: 5 + Math.random() * 15,
      height: 5 + Math.random() * 15,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 3
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Starry Background */}
      {theme.effects.hasStars && (
        <div className="absolute inset-0">
          {/* Ultra-small glittering stars */}
          {stars.map((star) => (
            <div
              key={star.key}
              className="absolute bg-white rounded-full animate-pulse twinkle-star"
              style={{
                width: '0.1px',
                height: '0.1px',
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                opacity: star.opacity,
                boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                transform: `scale(${star.scale})`
              }}
            />
          ))}
          {/* Additional tiny glitter layer */}
          {glitters.map((glitter) => (
            <div
              key={glitter.key}
              className="absolute bg-blue-200 rounded-full animate-pulse twinkle-star-blue"
              style={{
                width: '0.5px',
                height: '0.5px',
                left: `${glitter.left}%`,
                top: `${glitter.top}%`,
                animationDelay: `${glitter.delay}s`,
                animationDuration: `${glitter.duration}s`,
                opacity: glitter.opacity,
                boxShadow: '0 0 1px rgba(191, 219, 254, 0.6)',
                transform: `scale(${glitter.scale})`
              }}
            />
          ))}
        </div>
      )}

      {/* Planet Background */}
      {theme.effects.hasPlanet && (
        <div className="absolute inset-0">
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
        </div>
      )}

      {/* Grid Lines */}
      {theme.effects.hasGridLines && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent animate-pulse-smooth"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-current to-transparent animate-pulse-smooth" style={{animationDelay: '2s'}}></div>
          <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-current to-transparent animate-pulse-smooth" style={{animationDelay: '4s'}}></div>
          <div className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-current to-transparent animate-pulse-smooth" style={{animationDelay: '6s'}}></div>
        </div>
      )}

      {/* Matrix Rain Effect */}
      {theme.effects.customEffects?.includes('matrix-rain') && (
        <div className="absolute inset-0">
          {matrixElements.map((elem) => (
            <div
              key={elem.key}
              className="absolute text-green-400 text-xs font-mono opacity-30 animate-pulse"
              style={{
                left: `${elem.left}%`,
                top: `${elem.top}%`,
                animationDelay: `${elem.delay}s`,
                animationDuration: `${elem.duration}s`
              }}
            >
              {elem.text}
            </div>
          ))}
        </div>
      )}

      {/* Neon Glow Effect */}
      {theme.effects.customEffects?.includes('neon-glow') && (
        <div className="absolute inset-0">
          {neonGlows.map((glow) => (
            <div
              key={glow.key}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${glow.width}px`,
                height: `${glow.height}px`,
                left: `${glow.left}%`,
                top: `${glow.top}%`,
                background: `radial-gradient(circle, ${theme.colors.primary}40, transparent)`,
                boxShadow: `0 0 20px ${theme.colors.primary}60`,
                animationDelay: `${glow.delay}s`,
                animationDuration: `${glow.duration}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Water Bubbles Effect */}
      {theme.effects.customEffects?.includes('water-bubbles') && (
        <div className="absolute inset-0">
          {bubbles.map((bubble) => (
            <div
              key={bubble.key}
              className="absolute rounded-full bg-blue-400 opacity-20 animate-pulse"
              style={{
                width: `${bubble.width}px`,
                height: `${bubble.height}px`,
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: `${bubble.duration}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      )}

      {/* Animation Styles */}
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
      `}</style>
    </div>
  );
};

export const ThemeBackground = React.memo(ThemeBackgroundComponent, (prevProps, nextProps) => {
  return prevProps.theme.name === nextProps.theme.name && prevProps.className === nextProps.className;
});