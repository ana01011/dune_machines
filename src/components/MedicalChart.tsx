import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { ConnectionLines } from './ConnectionLines';
import { medicalData } from '../data/medicalData';
import { useOrganizationFlow } from '../hooks/useOrganizationFlow';
import { Agent } from '../types/Agent';
import { TeamDetailsPopup } from './TeamDetailsPopup';
import { Footer } from './Footer';

interface MedicalChartProps {
  onBack?: () => void;
}

gsap.registerPlugin(ScrollTrigger);

export const MedicalChart: React.FC<MedicalChartProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cmoRef = useRef<HTMLDivElement>(null);
  const departmentHeadsRef = useRef<HTMLDivElement>(null);
  const departmentsRef = useRef<HTMLDivElement>(null);
  const [showTeamPopup, setShowTeamPopup] = React.useState(false);

  const { activeAgents, selectedAgents, customConnections, handleAgentClick, deactivateAll } = 
    useOrganizationFlow(medicalData);

  React.useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }

    // CMO level animation
    if (cmoRef.current) {
      gsap.fromTo(cmoRef.current.children,
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

    // Department Heads animation
    if (departmentHeadsRef.current) {
      gsap.fromTo(departmentHeadsRef.current.children,
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
    medicalData.filter(agent => agent.level === level);

  const getAgentsByParent = (parentId: string) =>
    medicalData.filter(agent => agent.parentId === parentId);

  const selectedAgentObjects = Array.from(selectedAgents).map(id => 
    medicalData.find(agent => agent.id === id)
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
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 transition-all duration-[800ms] ease-out animate-continuous-shine"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '300',
            letterSpacing: 'clamp(0.1em, 2vw, 0.15em)',
            color: '#cbd5e1',
            textShadow: '0 0 20px rgba(203, 213, 225, 0.3)'
          }}
        >
          THINKING MACHINES
        </h1>
        <p 
          className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-4xl mx-auto px-4 transition-all duration-[800ms] ease-out"
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: '200',
            letterSpacing: 'clamp(0.1em, 1.5vw, 0.15em)',
            textShadow: '0 0 25px rgba(203, 213, 225, 0.6)'
          }}
        >
          MEDICAL WORKFLOW
        </p>
      </div>

      {/* Medical Chart */}
      <div 
        ref={containerRef}
        className="relative px-2 sm:px-4 pb-6 sm:pb-8"
        style={{ minHeight: 'calc(100vh - 200px)' }}
      >
        {/* Connection Lines */}
        <ConnectionLines
          agents={medicalData}
          activeAgents={activeAgents}
          selectedAgents={selectedAgents}
          customConnections={customConnections}
          containerRef={containerRef}
        />

        {/* CMO Level */}
        <div ref={cmoRef} className="flex justify-center mb-8 sm:mb-12">
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

        {/* Department Heads */}
        <div ref={departmentHeadsRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4 md:gap-6 justify-items-center mb-12 sm:mb-16 max-w-7xl mx-auto px-2">
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

        {/* Senior Level (Department Specialists) - Mobile Optimized Layout */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4 md:gap-6 justify-items-center mb-8 sm:mb-12 max-w-7xl mx-auto px-2">
          {/* Emergency Specialists */}
          {getAgentsByParent('head-emergency').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Surgery Specialists */}
          {getAgentsByParent('head-surgery').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Internal Medicine Specialists */}
          {getAgentsByParent('head-internal').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Pediatrics Specialists */}
          {getAgentsByParent('head-pediatrics').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Radiology Specialists */}
          {getAgentsByParent('head-radiology').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Laboratory Specialists */}
          {getAgentsByParent('head-laboratory').map((agent) => (
            <div key={agent.id} data-agent-id={agent.id}>
              <AgentCard
                agent={agent}
                isActive={activeAgents.has(agent.id)}
                isSelected={selectedAgents.has(agent.id)}
                onClick={(id, event) => handleAgentClick(id, event)}
              />
            </div>
          ))}
          
          {/* Nursing Specialists */}
          {getAgentsByParent('head-nursing').map((agent) => (
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
        <div ref={departmentsRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4 md:gap-6 max-w-8xl mx-auto px-2 sm:px-4">
          {/* Emergency Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('head-emergency').map((seniorAgent) =>
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

          {/* Surgery Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('head-surgery').map((seniorAgent) =>
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

          {/* Internal Medicine Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('head-internal').map((seniorAgent) =>
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

          {/* Pediatrics Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('head-pediatrics').map((seniorAgent) =>
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

          {/* Radiology Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('head-radiology').map((seniorAgent) =>
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

          {/* Laboratory Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('head-laboratory').map((seniorAgent) =>
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

          {/* Nursing Department */}
          <div className="department-column flex flex-col items-center space-y-3 sm:space-y-4">
            {getAgentsByParent('head-nursing').map((seniorAgent) =>
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
            medicalData.find(agent => agent.id === id)
          ).filter(Boolean) as Agent[]}
          onClose={() => setShowTeamPopup(false)}
          onActivate={() => {
            console.log('Medical team activated with', selectedAgents.size, 'members');
            setShowTeamPopup(false);
          }}
          industry="medical"
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
          © 2025 THINKING MACHINES | MEDICAL WORKFLOW | SHIFT+CLICK FOR CUSTOM TEAMS
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