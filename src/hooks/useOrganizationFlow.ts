import { useState, useCallback } from 'react';
import { Agent } from '../types/Agent';

export interface CustomConnection {
  from: string;
  to: string;
  id: string;
}

export const useOrganizationFlow = (agents: Agent[]) => {
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set());
  const [customConnections, setCustomConnections] = useState<CustomConnection[]>([]);

  const getTeamMembers = useCallback((agentId: string): string[] => {
    const teamMembers = new Set<string>();
    
    const addMembersRecursively = (id: string) => {
      teamMembers.add(id);
      agents
        .filter(agent => agent.parentId === id)
        .forEach(agent => addMembersRecursively(agent.id));
    };

    addMembersRecursively(agentId);
    return Array.from(teamMembers);
  }, [agents]);

  const createCLevelConnections = useCallback((selectedIds: string[]): CustomConnection[] => {
    console.log('🚀 CREATING C-LEVEL CONNECTIONS FOR:', selectedIds);
    
    // Get only C-level officers from selected agents
    const cLevelAgents = selectedIds
      .map(id => agents.find(agent => agent.id === id))
      .filter(agent => agent && agent.level === 'c-level')
      .map(agent => agent!.id);
    
    console.log('🚀 C-LEVEL AGENTS FOUND:', cLevelAgents);
    
    if (cLevelAgents.length < 2) {
      console.log('🚀 NOT ENOUGH C-LEVEL AGENTS FOR CONNECTIONS');
      return [];
    }
    
    const connections: CustomConnection[] = [];
    
    // Create connections between all pairs of C-level officers
    for (let i = 0; i < cLevelAgents.length; i++) {
      for (let j = i + 1; j < cLevelAgents.length; j++) {
        const connection = {
          from: cLevelAgents[i],
          to: cLevelAgents[j],
          id: `comm-${cLevelAgents[i]}-${cLevelAgents[j]}`
        };
        connections.push(connection);
        console.log('🚀 CREATED CONNECTION:', connection);
      }
    }
    
    console.log('🚀 TOTAL CONNECTIONS CREATED:', connections.length);
    return connections;
  }, [agents]);

  const deactivateAll = useCallback(() => {
    setActiveAgents(new Set());
    setSelectedAgents(new Set());
    setCustomConnections([]);
  }, []);

  const handleAgentClick = useCallback((agentId: string, event?: React.MouseEvent) => {
    const isMultiSelect = event?.shiftKey === true;
    
    console.log('🚀 AGENT CLICKED:', agentId, 'MULTI-SELECT:', isMultiSelect, 'CURRENT SELECTED:', Array.from(selectedAgents));
    
    if (isMultiSelect) {
      let newSelectedAgents: Set<string>;
      
      if (selectedAgents.has(agentId)) {
        // Remove from selection
        newSelectedAgents = new Set(selectedAgents);
        newSelectedAgents.delete(agentId);
        
        // Remove team members from active
        const teamMembers = getTeamMembers(agentId);
        setActiveAgents(prev => {
          const newActive = new Set(prev);
          teamMembers.forEach(id => newActive.delete(id));
          return newActive;
        });
      } else {
        // Add to selection
        newSelectedAgents = new Set([...selectedAgents, agentId]);
        
        // Add team members to active
        const teamMembers = getTeamMembers(agentId);
        setActiveAgents(prev => {
          const newActive = new Set(prev);
          teamMembers.forEach(id => newActive.add(id));
          return newActive;
        });
      }
      
      // Update selected agents
      setSelectedAgents(newSelectedAgents);
      
      // Create C-level connections
      const connections = createCLevelConnections(Array.from(newSelectedAgents));
      setCustomConnections(connections);
      
      console.log('🚀 UPDATED SELECTED AGENTS:', Array.from(newSelectedAgents));
      console.log('🚀 UPDATED CONNECTIONS:', connections);
      
    } else {
      // Single select mode
      if (selectedAgents.has(agentId) && selectedAgents.size === 1) {
        deactivateAll();
      } else {
        const teamMembers = getTeamMembers(agentId);
        setActiveAgents(new Set(teamMembers));
        setSelectedAgents(new Set([agentId]));
        setCustomConnections([]);
      }
    }
    
    console.log('🚀 FINAL SELECTED AGENTS:', Array.from(selectedAgents));
  }, [selectedAgents, activeAgents, getTeamMembers, createCLevelConnections, deactivateAll]);

  return {
    activeAgents,
    selectedAgents,
    customConnections,
    handleAgentClick,
    deactivateAll
  };
};