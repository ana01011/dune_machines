import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { ConnectionLines } from './ConnectionLines';
import { organizationData } from '../data/organizationData';
import { useOrganizationFlow } from '../hooks/useOrganizationFlow';
import { Agent } from '../types/Agent';
import { TeamDetailsPopup } from './TeamDetailsPopup';
import { Footer } from './Footer';

interface OrganizationChartProps {
  onBack?: () => void;
}

gsap.registerPlugin(ScrollTrigger);

export const OrganizationChart: React.FC<OrganizationChartProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const cLevelRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);
  const [showTeamPopup, setShowTeamPopup] = React.useState(false);

  const { activeAgents, selectedAgents, customConnections, handleAgentClick, deactivateAll } = 
    useOrganizationFlow(organizationData);

  React.useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    // CEO level animation
    if (ceoRef.current) {
      gsap.fromTo(ceoRef.current.children,
        { scale: 0.8, opacity: 0, y: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "back.out(1.4)",
          delay: 0.3
        }
      );
    }

    // C-Level animation
    if (cLevelRef.current) {
      gsap.fromTo(cLevelRef.current.children,
        { scale: 0.8, opacity: 0, y: 40 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.8
        }
      );
    }

    // Departments animation
    if (departmentsRef.current) {
      gsap.fromTo(departmentsRef.current.querySelectorAll('.department-column'),
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
          delay: 1.2,
          scrollTrigger: {
            trigger: departmentsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  const getAgentsByLevel = (level: Agent['level']) => 
    organizationData.filter(agent => agent.level === level);

  const getAgentsByParent = (parentId: string) =>
    organizationData.filter(agent => agent.parentId === parentId);

  const selectedAgentObjects = Array.from(selectedAgents).map(id => 
    organizationData.find(agent => agent.id === id)
  ).filter(Boolean) as Agent[];

  return (
    <>
    <div 
      className="min-h-screen relative overflow-hidden transition-all duration-1500 ease-out"
      style={{
        paddingTop: '3.5rem', // Account for fixed header
        background: 'linear-gradient(135deg, #000000 0%, #010409 10%, #020617 20%, #0a0f1c 35%, #0f172a 50%, #020617 65%, #010409 80%, #000000 100%)'
      }}
    >
      {/* Minimal animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Twinkling Stars Background */}
        {[...Array(120)].map((_, i) => (
          <div
            key={`particle-${i}`}
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
        {/* Additional tiny glitter layer */}
        {[...Array(80)].map((_, i) => (
          <div
            key={`glitter-${i}`}
            className="absolute bg-blue-200 rounded-full animate-pulse twinkle-star-blue"
            style={{
              width: '0.5px',
              height: '0.5px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
              opacity: 0.2 + Math.random() * 0.5,
              boxShadow: '0 0 1px rgba(191, 219, 254, 0.6)',
              transform: `scale(${0.3 + Math.random() * 0.4})`
            }}
          />
        ))}
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/10 to-transparent animate-pulse-smooth"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/10 to-transparent animate-pulse-smooth" style={{animationDelay: '2s'}}></div>
          <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-400/8 to-transparent animate-pulse-smooth" style={{animationDelay: '4s'}}></div>
          <div className="absolute right-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-slate-400/8 to-transparent animate-pulse-smooth" style={{animationDelay: '6s'}}></div>
        </div>
      </div>

      {/* Header */}
      <div ref={headerRef} className="relative z-10 text-center pt-6 sm:pt-8 pb-4 sm:pb-6 px-4">
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 transition-all duration-[800ms] ease-out animate-continuous-shine"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            letterSpacing: 'clamp(0.1em, 2vw, 0.15em)',
            color: '#cbd5e1',
            textShadow: '0 0 20px rgba(203, 213, 225, 0.3)'
          }}
        >
          CORPORATE WORKFLOW
        </h1>
      </div>

      {/* Organization Chart */}
      <div 
        ref={containerRef}
        className="relative px-2 sm:px-4 pb-6 sm:pb-8"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        {/* Connection Lines */}
        <ConnectionLines
          agents={organizationData}
          activeAgents={activeAgents}
          selectedAgents={selectedAgents}
          customConnections={customConnections}
          containerRef={containerRef}
        />

        {/* CEO Level */}
        <div ref={ceoRef} className="flex justify-center mb-8 sm:mb-12">
          {getAgentsByLevel('ceo').map((agent) => (
            <div
              key={agent.id}
              data-agent-id={agent.id}
            >
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id) => handleAgentClick(id)}
              />
            </div>
          ))}
        </div>

        {/* C-Level */}
        <div ref={cLevelRef} className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 md:gap-6 justify-items-center mb-12 sm:mb-16 max-w-7xl mx-auto px-2">
          {getAgentsByLevel('c-level').map((agent) => (
            <div
              key={agent.id}
              data-agent-id={agent.id}
            >
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
        </div>

        {/* Senior Level (Directors) - Mobile Optimized Layout */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 md:gap-6 justify-items-center mb-8 sm:mb-12 max-w-7xl mx-auto px-2">
          {/* Finance Directors */}
          {getAgentsByParent('cfo').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Technology Directors */}
          {getAgentsByParent('cto').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Marketing Directors */}
          {getAgentsByParent('cmo').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Operations Directors */}
          {getAgentsByParent('coo').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* HR Directors */}
          {getAgentsByParent('chro').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Security Directors */}
          {getAgentsByParent('ciso').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
        </div>

        {/* Department Columns - Mobile Optimized */}
        <div ref={departmentsRef} className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 md:gap-6 max-w-8xl mx-auto px-2 sm:px-4">
          {/* Finance Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('cfo').map((seniorAgent) =>
              getAgentsByParent(seniorAgent.id).map((juniorAgent) => (
                <div key={juniorAgent.id} data-agent-id={juniorAgent.id}>
                  <AgentCard
                    agent={juniorAgent}
                    isActive={activeAgents.has(juniorAgent.id)}
                    isSelected={selectedAgents.has(juniorAgent.id)}
                    onClick={(id, clickEvent) => handleAgentClick(id, clickEvent)}
                  />
                </div>
              ))
            )}
          </div>

          {/* Technology Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('cto').map((seniorAgent) =>
              getAgentsByParent(seniorAgent.id).map((juniorAgent) => (
                <div key={juniorAgent.id} data-agent-id={juniorAgent.id}>
                  <AgentCard
                    agent={juniorAgent}
                    isActive={activeAgents.has(juniorAgent.id)}
                    isSelected={selectedAgents.has(juniorAgent.id)}
                    onClick={(id, clickEvent) => handleAgentClick(id, clickEvent)}
                  />
                </div>
              ))
            )}
          </div>

          {/* Marketing Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('cmo').map((seniorAgent) =>
              getAgentsByParent(seniorAgent.id).map((juniorAgent) => (
                <div key={juniorAgent.id} data-agent-id={juniorAgent.id}>
                  <AgentCard
                    agent={juniorAgent}
                    isActive={activeAgents.has(juniorAgent.id)}
                    isSelected={selectedAgents.has(juniorAgent.id)}
                    onClick={(id, clickEvent) => handleAgentClick(id, clickEvent)}
                  />
                </div>
              ))
            )}
          </div>

          {/* Operations Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('coo').map((seniorAgent) =>
              getAgentsByParent(seniorAgent.id).map((juniorAgent) => (
                <div key={juniorAgent.id} data-agent-id={juniorAgent.id}>
                  <AgentCard
                    agent={juniorAgent}
                    isActive={activeAgents.has(juniorAgent.id)}
                    isSelected={selectedAgents.has(juniorAgent.id)}
                    onClick={(id, clickEvent) => handleAgentClick(id, clickEvent)}
                  />
                </div>
              ))
            )}
          </div>

          {/* Human Resources Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('chro').map((seniorAgent) =>
              getAgentsByParent(seniorAgent.id).map((juniorAgent) => (
                <div key={juniorAgent.id} data-agent-id={juniorAgent.id}>
                  <AgentCard
                    agent={juniorAgent}
                    isActive={activeAgents.has(juniorAgent.id)}
                    isSelected={selectedAgents.has(juniorAgent.id)}
                    onClick={(id, clickEvent) => handleAgentClick(id, clickEvent)}
                  />
                </div>
              ))
            )}
          </div>

          {/* Security Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('ciso').map((seniorAgent) =>
              getAgentsByParent(seniorAgent.id).map((juniorAgent) => (
                <div key={juniorAgent.id} data-agent-id={juniorAgent.id}>
                  <AgentCard
                    agent={juniorAgent}
                    isActive={activeAgents.has(juniorAgent.id)}
                    isSelected={selectedAgents.has(juniorAgent.id)}
                    onClick={(id, clickEvent) => handleAgentClick(id, clickEvent)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Activate Team Button */}
      {selectedAgents && selectedAgents.size > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowTeamPopup(true)}
            className="group relative overflow-hidden text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-500 flex items-center space-x-2 sm:space-x-4 backdrop-blur-xl border border-white/20 hover:scale-105 transform"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 80px rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
            }}
          >
            {/* Text Shine Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <div className="relative z-10 flex items-center space-x-2 sm:space-x-4">
              <div className="text-left">
                <div className="text-sm sm:text-lg font-light tracking-wider relative">
                  <span className="relative z-10">ACTIVATE TEAM</span>
                </div>
                <div className="text-xs sm:text-sm opacity-90 font-light">{selectedAgents?.size || 0} selected</div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Team Details Popup */}
      {showTeamPopup && (
        <TeamDetailsPopup
          selectedAgents={selectedAgentObjects}
          activeAgents={Array.from(activeAgents).map(id => 
            organizationData.find(agent => agent.id === id)
          ).filter(Boolean) as Agent[]}
          onClose={() => setShowTeamPopup(false)}
          onActivate={() => {
            console.log('Team activated with', selectedAgents.size, 'members');
            setShowTeamPopup(false);
          }}
          industry="corporate"
        />
      )}

      {/* Footer */}
      <div className="relative z-10 text-center py-4 text-slate-400/80 text-xs px-4">
        <p 
          className="text-xs sm:text-sm"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '200',
            letterSpacing: '0.1em'
          }}
        >
          © 2025 THINKING MACHINES | CORPORATE WORKFLOW | SHIFT+CLICK FOR CUSTOM TEAMS
        </p>
      </div>

      <Footer />
    </div>

    {/* Twinkling Stars Styles */}
    <style jsx>{`
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
      
      /* Ensure consistent sizing across all devices */
      @media (max-width: 768px) {
        .twinkle-star {
          width: 1px !important;
          height: 1px !important;
          max-width: 1px;
          max-height: 1px;
        }
        
        .twinkle-star-blue {
          width: 0.5px !important;
          height: 0.5px !important;
          max-width: 0.5px;
          max-height: 0.5px;
        }
      }
    `}</style>
    </>
  );
};