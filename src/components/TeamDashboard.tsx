import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Activity, 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle,
  BarChart3,
  Zap,
  Shield,
  Heart,
  Building2,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Settings,
  Bell,
  Wifi,
  Battery,
  Signal,
  X,
  Sparkles,
  Cpu,
  Globe
} from 'lucide-react';
import { Agent } from '../types/Agent';
import { Button } from '@/components/ui/button';

interface TeamDashboardProps {
  selectedAgents: Agent[];
  onClose: () => void;
  industry: 'corporate' | 'medical';
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({ selectedAgents, onClose, industry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [metrics, setMetrics] = useState({
    efficiency: 0,
    collaboration: 0,
    performance: 0,
    satisfaction: 0
  });

  useEffect(() => {
    // Ultra-modern entrance animation
    if (containerRef.current && headerRef.current && overlayRef.current && backgroundRef.current && particlesRef.current) {
      const tl = gsap.timeline();
      
      // Initial setup
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(containerRef.current, { 
        scale: 0.1, 
        opacity: 0, 
        rotationY: 360,
        z: -2000,
        filter: 'blur(20px)'
      });
      gsap.set(backgroundRef.current, { scale: 0, opacity: 0, rotation: 180 });
      gsap.set(particlesRef.current.children, { scale: 0, opacity: 0 });
      
      // Epic entrance sequence
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(backgroundRef.current, {
        scale: 1.2,
        opacity: 0.3,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.4")
      .to(particlesRef.current.children, {
        scale: 1,
        opacity: 0.8,
        duration: 2,
        stagger: 0.1,
        ease: "back.out(2)"
      }, "-=1")
      .to(containerRef.current, {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        z: 0,
        filter: 'blur(0px)',
        duration: 2,
        ease: "elastic.out(1, 0.4)"
      }, "-=1.2")
      .from(headerRef.current, {
        y: -200,
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        ease: "back.out(2)"
      }, "-=1");

      // Staggered metrics animation with 3D effects
      metricsRef.current.forEach((metric, index) => {
        if (metric) {
          gsap.fromTo(metric,
            { 
              y: 300, 
              opacity: 0, 
              scale: 0.3,
              rotationX: 180,
              rotationY: 90
            },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1,
              rotationX: 0,
              rotationY: 0,
              duration: 1.8, 
              delay: 1.2 + (index * 0.2), 
              ease: "elastic.out(1, 0.5)" 
            }
          );
        }
      });

      // Continuous floating and rotating animation
      gsap.to(containerRef.current, {
        y: -15,
        rotation: 0.5,
        duration: 6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Particle floating animation
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
  }, []);

  useEffect(() => {
    if (isActive) {
      // Extreme shaking and breaking animation
      if (containerRef.current) {
        const tl = gsap.timeline();
        
        // Intense screen shake with rotation
        tl.to(containerRef.current, {
          x: [-30, 30, -25, 25, -20, 20, -15, 15, -10, 10, -5, 5, 0],
          y: [-20, 20, -15, 15, -10, 10, -8, 8, -5, 5, -3, 3, 0],
          rotation: [-5, 5, -4, 4, -3, 3, -2, 2, -1, 1, 0],
          scale: [1, 1.1, 0.95, 1.05, 0.98, 1.03, 1],
          duration: 2,
          ease: "power2.inOut"
        })
        .to(containerRef.current, {
          scale: [1, 1.15, 0.9, 1.1, 0.95, 1.05, 1],
          rotationY: [0, 10, -8, 6, -4, 2, 0],
          duration: 1.5,
          ease: "elastic.out(1, 0.3)"
        }, "-=1");
      }

      // Metrics explosion with 3D rotation
      metricsRef.current.forEach((metric, index) => {
        if (metric) {
          gsap.to(metric, {
            scale: [1, 1.4, 0.8, 1.3, 0.9, 1.2, 1],
            rotation: [0, 15, -10, 12, -8, 5, 0],
            rotationY: [0, 20, -15, 10, -5, 0],
            duration: 2,
            delay: index * 0.15,
            ease: "elastic.out(1, 0.4)"
          });
        }
      });

      // Animate metrics values with smooth counting
      const interval = setInterval(() => {
        setMetrics(prev => ({
          efficiency: Math.min(prev.efficiency + Math.random() * 12, 95 + Math.random() * 5),
          collaboration: Math.min(prev.collaboration + Math.random() * 10, 88 + Math.random() * 7),
          performance: Math.min(prev.performance + Math.random() * 15, 92 + Math.random() * 6),
          satisfaction: Math.min(prev.satisfaction + Math.random() * 8, 89 + Math.random() * 8)
        }));
      }, 120);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const addToMetricsRefs = (el: HTMLDivElement | null) => {
    if (el && !metricsRef.current.includes(el)) {
      metricsRef.current.push(el);
    }
  };

  const getIndustryConfig = () => {
    if (industry === 'medical') {
      return {
        title: 'MEDICAL COMMAND CENTER',
        subtitle: 'Healthcare Operations Dashboard',
        icon: Heart,
        color: 'emerald',
        gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
        bgGradient: 'from-emerald-900/30 via-teal-900/30 to-cyan-900/30',
        glowColor: 'shadow-emerald-500/60',
        borderGradient: 'from-emerald-500/50 via-teal-500/50 to-cyan-500/50',
        metrics: [
          { label: 'Patient Care Excellence', icon: Heart, value: metrics.efficiency, color: 'emerald', unit: '%' },
          { label: 'Medical Team Sync', icon: Users, value: metrics.collaboration, color: 'teal', unit: '%' },
          { label: 'Clinical Performance', icon: Activity, value: metrics.performance, color: 'cyan', unit: '%' },
          { label: 'Patient Satisfaction', icon: CheckCircle, value: metrics.satisfaction, color: 'blue', unit: '%' }
        ],
        activities: [
          '🏥 Emergency protocols activated',
          '⚕️ Patient rounds initiated',
          '🧪 Lab results processed',
          '🔬 Surgery scheduled',
          '💊 Medication administered',
          '📊 Vital signs monitored',
          '🚑 Ambulance dispatched',
          '🩺 Diagnosis confirmed'
        ]
      };
    } else {
      return {
        title: 'CORPORATE COMMAND CENTER',
        subtitle: 'Enterprise Operations Dashboard',
        icon: Building2,
        color: 'blue',
        gradient: 'from-blue-400 via-indigo-400 to-purple-400',
        bgGradient: 'from-blue-900/30 via-indigo-900/30 to-purple-900/30',
        glowColor: 'shadow-blue-500/60',
        borderGradient: 'from-blue-500/50 via-indigo-500/50 to-purple-500/50',
        metrics: [
          { label: 'Operational Excellence', icon: TrendingUp, value: metrics.efficiency, color: 'blue', unit: '%' },
          { label: 'Team Collaboration', icon: Users, value: metrics.collaboration, color: 'indigo', unit: '%' },
          { label: 'Project Performance', icon: Target, value: metrics.performance, color: 'purple', unit: '%' },
          { label: 'Client Satisfaction', icon: CheckCircle, value: metrics.satisfaction, color: 'pink', unit: '%' }
        ],
        activities: [
          '📈 Strategic meeting initiated',
          '💼 Budget review completed',
          '🎯 Project milestone achieved',
          '📊 Client presentation delivered',
          '⚡ Performance metrics updated',
          '🤝 Team sync completed',
          '📋 Quarterly review scheduled',
          '🚀 Product launch approved'
        ]
      };
    }
  };

  const config = getIndustryConfig();
  const MainIcon = config.icon;

  const handleActivate = () => {
    setIsActive(!isActive);
  };

  const handleClose = () => {
    if (containerRef.current && overlayRef.current) {
      const tl = gsap.timeline();
      
      // Epic exit animation
      tl.to(containerRef.current, {
        scale: 0.1,
        opacity: 0,
        rotationY: -360,
        z: -2000,
        filter: 'blur(20px)',
        duration: 1.2,
        ease: "back.in(2)"
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: onClose
      }, "-=0.4");
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)',
        backdropFilter: 'blur(30px)'
      }}
    >
      {/* Animated Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${config.gradient} rounded-full opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Dynamic Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-20"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${config.color === 'emerald' ? '#10b981' : '#3b82f6'} 60deg, transparent 120deg, ${config.color === 'emerald' ? '#06b6d4' : '#8b5cf6'} 180deg, transparent 240deg, ${config.color === 'emerald' ? '#10b981' : '#3b82f6'} 300deg, transparent 360deg)`,
          filter: 'blur(100px)'
        }}
      />

      {/* Main Dashboard Container */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-7xl bg-black/20 backdrop-blur-3xl rounded-3xl border overflow-hidden shadow-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 30%, rgba(30,41,59,0.9) 70%, rgba(0,0,0,0.9) 100%)`,
          borderImage: `linear-gradient(45deg, ${config.borderGradient}) 1`,
          boxShadow: `0 0 150px ${config.color === 'emerald' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'}, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)`
        }}
      >
        {/* Animated Border Effect */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-60"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${config.color === 'emerald' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'} 50%, transparent 70%)`,
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 4s ease infinite'
          }}
        />

        {/* Header */}
        <div ref={headerRef} className="relative p-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center overflow-hidden shadow-2xl`}>
                <MainIcon className="w-10 h-10 text-white relative z-10" />
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-light text-white tracking-wider mb-3 flex items-center">
                  {config.title}
                  <Sparkles className="w-8 h-8 ml-4 text-yellow-400 animate-pulse" />
                </h1>
                <p className="text-white/70 font-light text-xl mb-3">{config.subtitle}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                    <span className="text-green-400 text-sm font-medium tracking-wide">SYSTEM ONLINE</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-blue-400" />
                    <Signal className="w-5 h-5 text-blue-400" />
                    <Battery className="w-5 h-5 text-green-400" />
                    <Globe className="w-5 h-5 text-purple-400 animate-spin" style={{animationDuration: '8s'}} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-white/60 mb-2 tracking-wide">ACTIVE TEAM MEMBERS</div>
                <div className="text-5xl font-light text-white flex items-center">
                  {selectedAgents.length}
                  <Users className="w-8 h-8 ml-3 text-white/60" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleActivate}
                  className={`relative overflow-hidden bg-gradient-to-r ${config.gradient} hover:shadow-2xl text-white font-medium px-10 py-5 rounded-2xl transition-all duration-500 transform hover:scale-105 ${isActive ? 'animate-pulse scale-110 shadow-2xl' : ''}`}
                  style={{
                    boxShadow: isActive ? `0 0 50px ${config.color === 'emerald' ? 'rgba(16, 185, 129, 0.6)' : 'rgba(59, 130, 246, 0.6)'}` : 'none'
                  }}
                >
                  <div className="relative z-10 flex items-center space-x-4">
                    {isActive ? (
                      <>
                        <Pause className="w-6 h-6" />
                        <span className="text-lg">DEACTIVATE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6" />
                        <span className="text-lg">ACTIVATE TEAM</span>
                      </>
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 bg-white/30 animate-pulse rounded-2xl" />
                  )}
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="border-white/30 text-white/80 hover:text-white hover:bg-white/10 p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="p-8 border-b border-white/10">
          <h3 className="text-2xl font-light text-white mb-8 flex items-center">
            <Users className="w-7 h-7 mr-4" />
            Selected Team Members
            <div className="ml-4 px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
              {selectedAgents.length} Active
            </div>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {selectedAgents.map((agent, index) => (
              <div 
                key={agent.id} 
                className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:rotate-1"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
                    {agent.icon}
                  </div>
                  <div className="text-sm font-medium text-white mb-2">{agent.name}</div>
                  <div className="text-xs text-white/70 mb-3">{agent.title}</div>
                  <div className={`text-xs text-${config.color}-400 font-medium px-3 py-1 bg-${config.color}-400/10 rounded-full`}>
                    {agent.department}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Dashboard */}
        <div className="p-8">
          <h3 className="text-2xl font-light text-white mb-10 flex items-center">
            <BarChart3 className="w-7 h-7 mr-4" />
            Real-Time Performance Metrics
            <Cpu className="w-6 h-6 ml-4 text-green-400 animate-pulse" />
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {config.metrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <div
                  key={metric.label}
                  ref={addToMetricsRefs}
                  className="relative bg-white/5 rounded-3xl p-8 border border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-700 hover:scale-105"
                  style={{
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${metric.color}-500/30 to-${metric.color}-600/30 flex items-center justify-center shadow-lg`}>
                        <MetricIcon className={`w-8 h-8 text-${metric.color}-400`} />
                      </div>
                      <div className={`text-4xl font-light text-${metric.color}-400 flex items-center`}>
                        {isActive ? Math.round(metric.value) : 0}{metric.unit}
                        {isActive && <Sparkles className="w-6 h-6 ml-2 animate-pulse" />}
                      </div>
                    </div>
                    <div className="text-sm text-white/90 font-light mb-6">{metric.label}</div>
                    
                    {/* Animated Progress Bar */}
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 transition-all duration-3000 ease-out relative overflow-hidden rounded-full`}
                        style={{ width: isActive ? `${metric.value}%` : '0%' }}
                      >
                        <div className="absolute inset-0 bg-white/40 animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-${metric.color}-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                </div>
              );
            })}
          </div>

          {/* Activity Feed and System Status */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <h4 className="text-white font-light mb-8 flex items-center text-xl">
                <Activity className="w-6 h-6 mr-4" />
                Live Activity Feed
                <div className="ml-4 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </h4>
              <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                {isActive ? config.activities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 text-sm p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 transform hover:scale-102"
                    style={{
                      animationDelay: `${index * 0.3}s`
                    }}
                  >
                    <div className={`w-3 h-3 bg-${config.color}-400 rounded-full animate-pulse shadow-lg`} />
                    <span className="text-white/90 flex-1 font-light">{activity}</span>
                    <span className="text-white/50 text-xs font-mono">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                )) : (
                  <div className="text-white/50 text-center py-16">
                    <Zap className="w-16 h-16 mx-auto mb-6 opacity-30" />
                    <p className="text-lg font-light">Activate team to see live activities</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <h4 className="text-white font-light mb-8 flex items-center text-xl">
                <Shield className="w-6 h-6 mr-4" />
                System Status
                <div className="ml-4 px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-xs font-medium">
                  SECURE
                </div>
              </h4>
              <div className="space-y-8">
                {[
                  { label: 'Team Connectivity', status: isActive ? 'ONLINE' : 'STANDBY', color: isActive ? 'green' : 'yellow', icon: Wifi },
                  { label: 'Data Synchronization', status: isActive ? 'SYNCING' : 'PAUSED', color: isActive ? 'blue' : 'gray', icon: Globe },
                  { label: 'Security Protocol', status: 'SECURE', color: 'green', icon: Shield },
                  { label: 'Performance Monitor', status: isActive ? 'ACTIVE' : 'IDLE', color: isActive ? 'purple' : 'gray', icon: Cpu }
                ].map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <ItemIcon className={`w-5 h-5 text-${item.color}-400`} />
                        <span className="text-white/80 text-sm font-light">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 bg-${item.color}-400 rounded-full ${isActive && item.color !== 'green' ? 'animate-pulse' : ''} shadow-lg`} />
                        <span className={`text-sm text-${item.color}-400 font-medium px-3 py-1 bg-${item.color}-400/10 rounded-full`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};