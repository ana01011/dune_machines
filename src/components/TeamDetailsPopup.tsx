import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Users, Crown, Building2, Heart, Zap, ChevronRight } from 'lucide-react';
import { Agent } from '../types/Agent';

interface TeamDetailsPopupProps {
  selectedAgents: Agent[];
  activeAgents: Agent[];
  onClose: () => void;
  onActivate: () => void;
  industry: 'corporate' | 'medical';
}

export const TeamDetailsPopup: React.FC<TeamDetailsPopupProps> = ({
  selectedAgents,
  activeAgents,
  onClose,
  onActivate,
  industry
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current && popupRef.current && contentRef.current) {
      // Initial setup
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(popupRef.current, { 
        scale: 0.8, 
        opacity: 0, 
        y: 0
      });
      gsap.set(contentRef.current.children, { 
        opacity: 0, 
        y: 20 
      });

      // Entrance animation
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(popupRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2")
      .to(contentRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");
    }
  }, []);

  const handleClose = () => {
    if (overlayRef.current && popupRef.current) {
      const tl = gsap.timeline();
      
      tl.to(popupRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.in"
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose
      }, "-=0.3");
    }
  };

  const getIndustryConfig = () => {
    if (industry === 'medical') {
      return {
        title: 'Medical Team Selected',
        icon: Heart,
        gradient: 'from-emerald-500/20 to-teal-500/20',
        borderGradient: 'from-emerald-500/50 to-teal-500/50',
        accentColor: 'emerald',
        buttonGradient: 'from-emerald-600 to-teal-600',
        glowColor: 'shadow-emerald-500/30'
      };
    } else {
      return {
        title: 'Corporate Team Selected',
        icon: Building2,
        gradient: 'from-blue-500/20 to-indigo-500/20',
        borderGradient: 'from-blue-500/50 to-indigo-500/50',
        accentColor: 'blue',
        buttonGradient: 'from-blue-600 to-indigo-600',
        glowColor: 'shadow-blue-500/30'
      };
    }
  };

  const config = getIndustryConfig();
  const MainIcon = config.icon;

  // Use active agents (which includes all team members) instead of just selected
  const teamAgents = activeAgents.length > 0 ? activeAgents : selectedAgents;
  
  // Group team agents by department
  const departmentGroups = teamAgents.reduce((groups, agent) => {
    if (!groups[agent.department]) {
      groups[agent.department] = [];
    }
    groups[agent.department].push(agent);
    return groups;
  }, {} as Record<string, Agent[]>);

  const totalTeamSize = teamAgents.length;
  const selectedCount = selectedAgents.length;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)'
      }}
      onClick={handleClose}
    >
      <div 
        ref={popupRef}
        className="relative w-full max-w-sm sm:max-w-md bg-black/40 backdrop-blur-2xl rounded-2xl border overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 30%, rgba(30,41,59,0.9) 70%, rgba(0,0,0,0.9) 100%)',
          borderImage: `linear-gradient(45deg, ${config.borderGradient}) 1`,
          boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 80px ${config.accentColor === 'emerald' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Border */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-60"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${config.accentColor === 'emerald' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.3)'} 50%, transparent 70%)`,
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 4s ease infinite'
          }}
        />

        <div ref={contentRef} className="relative p-4 sm:p-6 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center border border-white/10`}>
                <MainIcon className={`w-6 h-6 text-${config.accentColor}-400`} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-light text-white">{config.title}</h2>
                <p className="text-xs sm:text-sm text-white/60">Team composition overview</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <Users className={`w-5 h-5 text-${config.accentColor}-400`} />
                <div>
                  <div className="text-lg sm:text-2xl font-light text-white">{selectedCount}</div>
                  <div className="text-xs text-white/60">Selected</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <Crown className={`w-5 h-5 text-${config.accentColor}-400`} />
                <div>
                  <div className="text-lg sm:text-2xl font-light text-white">{totalTeamSize}</div>
                  <div className="text-xs text-white/60">Total Team</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <Crown className={`w-5 h-5 text-${config.accentColor}-400`} />
                <div>
                  <div className="text-lg sm:text-2xl font-light text-white">{Object.keys(departmentGroups).length}</div>
                  <div className="text-xs text-white/60">Depts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center flex-shrink-0">
              <Building2 className="w-4 h-4 mr-2" />
              Department Breakdown
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar-small">
              {Object.entries(departmentGroups).slice(0, 6).map(([department, agents]) => (
                <div key={department} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full bg-${config.accentColor}-400`} />
                    <span className="text-sm text-white/90">{department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white/60">{agents.length}</span>
                    <Users className="w-3 h-3 text-white/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Members Preview */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white/80 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Team Members Preview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar-small">
              {teamAgents.map((agent) => (
                <div key={agent.id} className="flex items-center space-x-2 p-2 bg-white/5 rounded-lg border border-white/10 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-white truncate">{agent.name}</div>
                    <div className="text-xs text-white/60 truncate">{agent.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activate Button */}
          <button
            onClick={onActivate}
            className={`w-full bg-gradient-to-r ${config.buttonGradient} hover:shadow-lg ${config.glowColor} text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 group hover:scale-105`}
          >
            <Zap className="w-5 h-5 group-hover:animate-pulse" />
            <span>Activate Team</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.6));
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8));
        }
        
        .custom-scrollbar-small::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar-small::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        
        .custom-scrollbar-small::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(6, 182, 212, 0.6));
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-scrollbar-small::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(6, 182, 212, 0.8));
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.6) rgba(255, 255, 255, 0.05);
        }
        
        .custom-scrollbar-small {
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.6) rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};