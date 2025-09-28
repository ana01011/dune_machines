export interface Agent {
  id: string;
  name: string;
  title: string;
  department: string;
  level: 'ceo' | 'c-level' | 'senior' | 'junior';
  parentId?: string;
  color: string;
  glowColor: string;
  icon: string; // Now stores emoji directly
  description: string;
  skills: string[];
}

export interface Connection {
  from: string;
  to: string;
  active: boolean;
}

export interface ActivationState {
  activeAgents: Set<string>;
  selectedAgent: string | null;
  connections: Connection[];
}