import React from 'react';
import { gsap } from 'gsap';
import { Agent } from '../types/Agent';
import { 
  Crown, DollarSign, Cpu, TrendingUp, Settings, User, Shield, Bot, Smartphone, Briefcase, Users, Calendar,
  Zap, BarChart3, ShieldCheck, Gem, Calculator, LineChart, AlertTriangle, ClipboardCheck, Monitor,
  Building, Cog, Palette, Brain, Database, Wrench, Cloud, Target, PenTool, Tag, Paintbrush, BarChart,
  MessageSquare, FileText, Video, Clipboard, Truck, CheckSquare, PieChart, Package, Search, FileCheck,
  BookOpen, Handshake, UserPlus, GraduationCap, Lock, ScrollText, Eye, Sword, BarChart2, Stethoscope,
  Siren, Scissors, Baby, Radio, Microscope, UserCheck, Building2, Bandage, Ambulance, Droplet, Heart,
  Bone, Hospital, Moon, HeartPulse, Dna, ClipboardList, Pill, Smile, Rainbow, Camera, ScanLine, Disc,
  TestTube, Droplets, UserCog, Syringe, Cross
} from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  isSelected: boolean;
  onClick: (agentId: string) => void;
  style?: React.CSSProperties;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  isActive,
  isSelected,
  onClick,
  style
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!cardRef.current) return;

    if (isActive) {
      // Animate activation
      gsap.to(cardRef.current, {
        scale: 1.05,
        y: -2,
        duration: 0.4,
        ease: "power2.out"
      });

      // Glow animation
      gsap.to(cardRef.current.querySelector('.card-inner'), {
        boxShadow: `0 0 3px ${getDepartmentColors().glow}`,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      // Animate deactivation
      gsap.to(cardRef.current, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(cardRef.current.querySelector('.card-inner'), {
        boxShadow: 'none',
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [isActive]);
  const getCardSize = () => {
    // Mobile-responsive card sizing
    return 'w-16 h-20 sm:w-18 sm:h-22 md:w-20 md:h-24';
  };

  const getTextSizes = () => {
    // Mobile-responsive text sizing
    return {
      name: 'text-xs sm:text-sm md:text-sm font-semibold leading-tight',
      title: 'text-xs sm:text-xs md:text-xs font-light leading-tight'
    };
  };


  const getDepartmentColors = () => {
    switch (agent.department) {
      case 'Finance':
        return {
          active: 'from-emerald-400 via-green-400 to-teal-400',
          border: 'border-emerald-400/60',
          glow: 'shadow-emerald-400/80',
          ring: 'ring-emerald-400',
          text: 'text-emerald-300',
          bg: 'from-emerald-500/20 to-green-500/20'
        };
      case 'Technology':
        return {
          active: 'from-cyan-400 via-blue-400 to-indigo-400',
          border: 'border-cyan-400/60',
          glow: 'shadow-cyan-400/80',
          ring: 'ring-cyan-400',
          text: 'text-cyan-300',
          bg: 'from-cyan-500/20 to-blue-500/20'
        };
      case 'Marketing':
        return {
          active: 'from-pink-400 via-rose-400 to-red-400',
          border: 'border-pink-400/60',
          glow: 'shadow-pink-400/80',
          ring: 'ring-pink-400',
          text: 'text-pink-300',
          bg: 'from-pink-500/20 to-rose-500/20'
        };
      case 'Operations':
        return {
          active: 'from-violet-400 via-purple-400 to-indigo-400',
          border: 'border-violet-400/60',
          glow: 'shadow-violet-400/80',
          ring: 'ring-violet-400',
          text: 'text-violet-300',
          bg: 'from-violet-500/20 to-purple-500/20'
        };
      case 'Human Resources':
        return {
          active: 'from-amber-400 via-yellow-400 to-orange-400',
          border: 'border-amber-400/60',
          glow: 'shadow-amber-400/80',
          ring: 'ring-amber-400',
          text: 'text-amber-300',
          bg: 'from-amber-500/20 to-yellow-500/20'
        };
      case 'Security':
        return {
          active: 'from-rose-400 via-pink-400 to-red-400',
          border: 'border-rose-400/60',
          glow: 'shadow-rose-400/80',
          ring: 'ring-rose-400',
          text: 'text-rose-300',
          bg: 'from-rose-500/20 to-pink-500/20'
        };
      // Medical Department Colors
      case 'Executive':
        return {
          active: 'from-purple-400 via-indigo-400 to-violet-400',
          border: 'border-purple-400/60',
          glow: 'shadow-purple-400/80',
          ring: 'ring-purple-400',
          text: 'text-purple-300',
          bg: 'from-purple-500/20 to-indigo-500/20'
        };
      case 'Emergency':
        return {
          active: 'from-red-400 via-orange-400 to-red-500',
          border: 'border-red-400/60',
          glow: 'shadow-red-400/80',
          ring: 'ring-red-400',
          text: 'text-red-300',
          bg: 'from-red-500/20 to-orange-500/20'
        };
      case 'Surgery':
        return {
          active: 'from-blue-400 via-cyan-400 to-blue-500',
          border: 'border-blue-400/60',
          glow: 'shadow-blue-400/80',
          ring: 'ring-blue-400',
          text: 'text-blue-300',
          bg: 'from-blue-500/20 to-cyan-500/20'
        };
      case 'Internal Medicine':
        return {
          active: 'from-green-400 via-emerald-400 to-green-500',
          border: 'border-green-400/60',
          glow: 'shadow-green-400/80',
          ring: 'ring-green-400',
          text: 'text-green-300',
          bg: 'from-green-500/20 to-emerald-500/20'
        };
      case 'Pediatrics':
        return {
          active: 'from-pink-400 via-rose-400 to-pink-500',
          border: 'border-pink-400/60',
          glow: 'shadow-pink-400/80',
          ring: 'ring-pink-400',
          text: 'text-pink-300',
          bg: 'from-pink-500/20 to-rose-500/20'
        };
      case 'Radiology':
        return {
          active: 'from-purple-400 via-violet-400 to-purple-500',
          border: 'border-purple-400/60',
          glow: 'shadow-purple-400/80',
          ring: 'ring-purple-400',
          text: 'text-purple-300',
          bg: 'from-purple-500/20 to-violet-500/20'
        };
      case 'Laboratory':
        return {
          active: 'from-amber-400 via-yellow-400 to-amber-500',
          border: 'border-amber-400/60',
          glow: 'shadow-amber-400/80',
          ring: 'ring-amber-400',
          text: 'text-amber-300',
          bg: 'from-amber-500/20 to-yellow-500/20'
        };
      case 'Nursing':
        return {
          active: 'from-teal-400 via-cyan-400 to-teal-500',
          border: 'border-teal-400/60',
          glow: 'shadow-teal-400/80',
          ring: 'ring-teal-400',
          text: 'text-teal-300',
          bg: 'from-teal-500/20 to-cyan-500/20'
        };
      default:
        return {
          active: 'from-slate-400 via-gray-400 to-slate-400',
          border: 'border-slate-400/60',
          glow: 'shadow-slate-400/80',
          ring: 'ring-slate-400',
          text: 'text-slate-300',
          bg: 'from-slate-500/20 to-gray-500/20'
        };
    }
  };

  const colors = getDepartmentColors();
  const sizes = getTextSizes();

  return (
    <div
      ref={cardRef}
      className={`
        ${getCardSize()}
        relative cursor-pointer select-none group
        transition-all duration-[600ms] ease-out
        ${isActive ? 'z-20' : 'z-10'}
      `}
      style={style}
      onClick={(event) => onClick(agent.id, event)}
      onMouseEnter={() => {
        if (!isActive) {
          gsap.to(cardRef.current, {
            scale: 1.02,
            y: -1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }}
      onMouseLeave={() => {
        if (!isActive) {
          gsap.to(cardRef.current, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }}
    >
      <div
        className={`
          card-inner
          w-full h-full rounded-xl p-3
          backdrop-blur-xl border transition-all duration-[800ms] ease-out
          ${isActive 
            ? `${colors.border}` 
            : 'border-slate-700/50 hover:border-slate-500/70 hover:shadow-lg hover:shadow-slate-400/20'
          }
          ${isSelected 
            ? `ring-1 ${colors.ring} ring-offset-1 ring-offset-slate-900 shadow-sm` 
            : ''
          }
          relative overflow-hidden
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
        }}
      >
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          {/* Name */}
          <h3 className={`${isActive ? 'text-white font-bold drop-shadow-lg' : 'text-slate-100'} ${sizes.name} transition-all duration-[600ms] ease-out text-center px-1 leading-tight mb-2`}>
            {agent.name}
          </h3>

          {/* Title */}
          <p className={`${isActive ? colors.text + ' font-medium drop-shadow-lg' : 'text-slate-400'} ${sizes.title} transition-all duration-[600ms] ease-out text-center px-1 leading-tight`}>
            {agent.title}
          </p>

          {/* Active indicator */}
          {isActive && (
            <div className="absolute top-2 right-2">
              <div className={`w-2 h-2 ${colors.text} rounded-full animate-pulse-smooth shadow-lg`} style={{
                boxShadow: `0 0 8px currentColor`
              }}></div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};