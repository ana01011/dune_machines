export interface ChatTheme {
  id: string;
  name: string;
  displayName: string;
  background: {
    gradient: string;
    containerBg: string;
    sidebarBg: string;
    headerBg: string;
  };
  effects: {
    hasStars?: boolean;
    hasPlanet?: boolean;
    hasGridLines?: boolean;
    customEffects?: string[];
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

export const chatThemes: Record<string, ChatTheme> = {
  light: {
    id: 'light',
    name: 'light',
    displayName: 'Cosmic Light',
    background: {
      gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(1,4,9,0.95) 10%, rgba(2,6,23,0.9) 20%, rgba(10,15,28,0.85) 35%, rgba(15,23,42,0.8) 50%, rgba(2,6,23,0.9) 65%, rgba(1,4,9,0.95) 80%, rgba(0,0,0,1) 100%)',
      containerBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(1,4,9,0.96) 10%, rgba(2,6,23,0.94) 20%, rgba(10,15,28,0.92) 35%, rgba(15,23,42,0.90) 50%, rgba(2,6,23,0.94) 65%, rgba(1,4,9,0.96) 80%, rgba(0,0,0,0.98) 100%)',
      sidebarBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)',
      headerBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
    },
    effects: {
      hasStars: true,
      hasPlanet: true,
      hasGridLines: false
    },
    colors: {
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)'
    }
  },
  dark: {
    id: 'dark',
    name: 'dark',
    displayName: 'Deep Space',
    background: {
      gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(1,4,9,0.95) 10%, rgba(2,6,23,0.9) 20%, rgba(10,15,28,0.85) 35%, rgba(15,23,42,0.8) 50%, rgba(2,6,23,0.9) 65%, rgba(1,4,9,0.95) 80%, rgba(0,0,0,1) 100%)',
      containerBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(1,4,9,0.96) 10%, rgba(2,6,23,0.94) 20%, rgba(10,15,28,0.92) 35%, rgba(15,23,42,0.90) 50%, rgba(2,6,23,0.94) 65%, rgba(1,4,9,0.96) 80%, rgba(0,0,0,0.98) 100%)',
      sidebarBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)',
      headerBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(1,4,9,0.95) 15%, rgba(2,6,23,0.95) 30%, rgba(10,15,28,0.95) 45%, rgba(15,23,42,0.95) 60%, rgba(2,6,23,0.95) 75%, rgba(1,4,9,0.95) 85%, rgba(0,0,0,0.95) 100%)'
    },
    effects: {
      hasStars: false,
      hasPlanet: false,
      hasGridLines: false
    },
    colors: {
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.1)'
    }
  },
};

// AI-specific theme mappings
export const aiThemeMapping: Record<string, string[]> = {
  omnius: ['light', 'dark'],
  erasmus: ['light', 'dark'],
  sarah: ['light', 'dark'],
  mentat: ['light', 'dark'],
  navigator: ['light', 'dark'],
  oracle: ['light', 'dark']
};

export const getTheme = (themeId: string): ChatTheme => {
  return chatThemes[themeId] || chatThemes.light;
};

export const getAvailableThemes = (aiId: string): ChatTheme[] => {
  const availableThemeIds = aiThemeMapping[aiId] || ['light', 'dark'];
  return availableThemeIds.map(id => chatThemes[id]);
};