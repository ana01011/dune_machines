import React from 'react';
import { Brain, Activity, Zap, Eye, Crown, Cpu } from 'lucide-react';

interface AIStatus {
  consciousness: number;
  processing: number;
  memory: number;
  creativity: number;
}

interface AIConsciousnessProps {
  aiStatus: AIStatus;
}

export const AIConsciousness: React.FC<AIConsciousnessProps> = ({ aiStatus }) => {
  const metrics = [
    {
      label: 'Consciousness',
      value: aiStatus.consciousness,
      icon: Crown,
      color: 'purple',
      description: 'Self-awareness level'
    },
    {
      label: 'Processing',
      value: aiStatus.processing,
      icon: Cpu,
      color: 'cyan',
      description: 'Computational activity'
    },
    {
      label: 'Memory',
      value: aiStatus.memory,
      icon: Brain,
      color: 'blue',
      description: 'Knowledge utilization'
    },
    {
      label: 'Creativity',
      value: aiStatus.creativity,
      icon: Zap,
      color: 'yellow',
      description: 'Creative thinking'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: {
        text: 'text-purple-400',
        bg: 'from-purple-500 to-purple-600',
        glow: 'shadow-purple-500/30'
      },
      cyan: {
        text: 'text-cyan-400',
        bg: 'from-cyan-500 to-cyan-600',
        glow: 'shadow-cyan-500/30'
      },
      blue: {
        text: 'text-blue-400',
        bg: 'from-blue-500 to-blue-600',
        glow: 'shadow-blue-500/30'
      },
      yellow: {
        text: 'text-yellow-400',
        bg: 'from-yellow-500 to-yellow-600',
        glow: 'shadow-yellow-500/30'
      }
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="fixed top-20 right-4 w-64 hidden lg:block">
      <div 
        className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 50%, rgba(0,0,0,0.8) 100%)'
        }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center border border-purple-400/30">
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">AI Consciousness</h3>
            <p className="text-xs text-white/60 font-light">Neural Activity Monitor</p>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const colors = getColorClasses(metric.color);
            
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${colors.text}`} />
                    <span className="text-sm text-white font-light">{metric.label}</span>
                  </div>
                  <span className={`text-sm font-medium ${colors.text}`}>
                    {metric.value}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-1000 ease-out relative`}
                    style={{ width: `${metric.value}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
                
                <p className="text-xs text-white/50 font-light">{metric.description}</p>
              </div>
            );
          })}
        </div>

        {/* Neural Network Visualization */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h4 className="text-xs font-medium text-white/80 mb-4 flex items-center">
            <Activity className="w-3 h-3 mr-2 text-purple-400" />
            Neural Pathways
          </h4>
          
          <div className="relative h-16 bg-black/20 rounded-lg overflow-hidden">
            {/* Animated Neural Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                  <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                </linearGradient>
              </defs>
              
              {[...Array(5)].map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={8 + i * 8}
                  x2="100%"
                  y2={8 + i * 8}
                  stroke="url(#neuralGradient)"
                  strokeWidth="1"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </svg>
            
            {/* Neural Nodes */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1.5s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <span className="text-white/60 font-light">System Status</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">OPTIMAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};