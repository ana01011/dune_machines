import React from 'react';
import { gsap } from 'gsap';
import { Agent } from '../types/Agent';
import { CustomConnection } from '../hooks/useOrganizationFlow';

interface ConnectionLinesProps {
  agents: Agent[];
  activeAgents: Set<string>;
  selectedAgents: Set<string>;
  customConnections: CustomConnection[];
  containerRef: React.RefObject<HTMLDivElement>;
}

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  agents,
  activeAgents,
  selectedAgents,
  customConnections,
  containerRef
}) => {
  const [lines, setLines] = React.useState<Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    active: boolean;
    color: string;
    isCustom?: boolean;
    fromId: string;
    toId: string;
  }>>([]);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateLines = () => {
      const newLines: typeof lines = [];
      const container = containerRef.current;
      if (!container) return;

      // Get all C-level officers for communication lines
      const cLevelAgents = agents.filter(agent => agent.level === 'c-level');

      // Create hierarchical connections
      agents.forEach(agent => {
        if (!agent.parentId) return;

        const childElement = container.querySelector(`[data-agent-id="${agent.id}"]`);
        const parentElement = container.querySelector(`[data-agent-id="${agent.parentId}"]`);

        if (childElement && parentElement) {
          const childRect = childElement.getBoundingClientRect();
          const parentRect = parentElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const x1 = parentRect.left + parentRect.width / 2 - containerRect.left;
          const y1 = parentRect.bottom - containerRect.top;
          const x2 = childRect.left + childRect.width / 2 - containerRect.left;
          const y2 = childRect.top - containerRect.top;
          
          const isActive = activeAgents.has(agent.id) && activeAgents.has(agent.parentId);

          newLines.push({
            x1,
            y1,
            x2,
            y2,
            active: isActive,
            color: agent.department,
            isCustom: false,
            fromId: agent.parentId,
            toId: agent.id
          });
        }
      });

      // Create communication lines between all C-level officers
      for (let i = 0; i < cLevelAgents.length; i++) {
        for (let j = i + 1; j < cLevelAgents.length; j++) {
          const fromAgent = cLevelAgents[i];
          const toAgent = cLevelAgents[j];
          
          const fromElement = container.querySelector(`[data-agent-id="${fromAgent.id}"]`);
          const toElement = container.querySelector(`[data-agent-id="${toAgent.id}"]`);

          if (fromElement && toElement) {
            const fromRect = fromElement.getBoundingClientRect();
            const toRect = toElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Horizontal communication lines
            const x1 = fromRect.left + fromRect.width / 2 - containerRect.left;
            const y1 = fromRect.top + fromRect.height / 2 - containerRect.top;
            const x2 = toRect.left + toRect.width / 2 - containerRect.left;
            const y2 = y1; // Force horizontal

            // Check if this connection is active
            const isActive = selectedAgents.has(fromAgent.id) && selectedAgents.has(toAgent.id);

            newLines.push({
              x1,
              y1,
              x2,
              y2,
              active: isActive,
              color: 'Communication', 
              isCustom: true,
              fromId: fromAgent.id,
              toId: toAgent.id
            });
          }
        }
      }
      
      setLines(newLines);

      // Animate line appearances with GSAP (only for active lines)
      const activeLines = newLines.filter(l => l.active);
      if (activeLines.length > 0) {
        // Simple fade in for active lines
        gsap.set('.connection-line.active', { opacity: 0 });
        gsap.to('.connection-line.active', { 
          opacity: 1, 
          duration: 0.5, 
          ease: "power2.out" 
        });
      }
    };

    updateLines();
    
    const resizeObserver = new ResizeObserver(updateLines);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [agents, activeAgents, customConnections, containerRef]);

  const getDepartmentColor = (department: string) => {
    const colors = {
      'Finance': '#64748b',
      'Technology': '#64748b', 
      'Marketing': '#64748b',
      'Operations': '#64748b',
      'Human Resources': '#64748b',
      'Security': '#64748b',
      'Executive': '#64748b',
      'Communication': '#a855f7'
    };
    return colors[department as keyof typeof colors] || '#64748b';
  };

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ 
        width: '100%', 
        height: '100%',
        zIndex: 0
      }}
    >
      <defs>
        <filter id="communicationGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {lines.map((line, index) => {
        const color = getDepartmentColor(line.color);
        
        if (line.isCustom) {
          return (
            <g key={`communication-${line.fromId}-${line.toId}-${index}`}>
              {/* Communication line */}
              <line
                className={`connection-line ${line.active ? 'active' : 'inactive'}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.active ? "#a855f7" : "#475569"}
                strokeWidth={line.active ? "0.8" : "0.2"}
                opacity={line.active ? "0.8" : "0.1"}
                strokeLinecap="round"
                strokeDasharray={line.active ? "none" : "2,2"}
                filter={line.active ? "url(#communicationGlow)" : "none"}
              />
              
              {/* Endpoint indicators */}
              <circle
                className={`connection-endpoint ${line.active ? 'active' : 'inactive'}`}
                cx={line.x1}
                cy={line.y1}
                r={line.active ? "2" : "0.3"}
                fill={line.active ? "#a855f7" : "#475569"}
                opacity={line.active ? "0.8" : "0.1"}
                filter={line.active ? "url(#communicationGlow)" : "none"}
              />
              <circle
                className={`connection-endpoint ${line.active ? 'active' : 'inactive'}`}
                cx={line.x2}
                cy={line.y2}
                r={line.active ? "2" : "0.3"}
                fill={line.active ? "#a855f7" : "#475569"}
                opacity={line.active ? "0.8" : "0.1"}
                filter={line.active ? "url(#communicationGlow)" : "none"}
              />
            </g>
          );
        } else {
          // Hierarchical connections
          const strokeColor = line.active ? color : '#64748b';
          const strokeWidth = line.active ? 0.6 : 0.2;
          const opacity = line.active ? 0.8 : 0.2;
          
          const midY = line.y1 + (line.y2 - line.y1) / 2;
          const pathData = `M ${line.x1} ${line.y1} L ${line.x1} ${midY} L ${line.x2} ${midY} L ${line.x2} ${line.y2}`;
          
          return (
            <g key={`hierarchy-${line.fromId}-${line.toId}-${index}`}>
              <path
                className={`hierarchy-line ${line.active ? 'active' : 'inactive'}`}
                d={pathData}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                opacity={opacity}
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="miter"
                filter={line.active ? "url(#communicationGlow)" : "none"}
              />
              
              <circle
                className={`hierarchy-endpoint ${line.active ? 'active' : 'inactive'}`}
                cx={line.x1}
                cy={midY}
                r={line.active ? "1.5" : "0.3"}
                fill={strokeColor}
                opacity={opacity * 0.6}
                filter={line.active ? "url(#communicationGlow)" : "none"}
              />
              <circle
                className={`hierarchy-endpoint ${line.active ? 'active' : 'inactive'}`}
                cx={line.x2}
                cy={midY}
                r={line.active ? "1.5" : "0.3"}
                fill={strokeColor}
                opacity={opacity * 0.6}
                filter={line.active ? "url(#communicationGlow)" : "none"}
              />
            </g>
          );
        }
      })}
    </svg>
  );
};