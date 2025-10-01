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
      sidebarBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(15,23,42,0.98) 50%, rgba(0,0,0,0.95) 100%)',
      headerBg: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 50%, rgba(0,0,0,0.9) 100%)'
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
      gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(5,5,5,0.98) 20%, rgba(10,10,10,0.95) 50%, rgba(5,5,5,0.98) 80%, rgba(0,0,0,1) 100%)',
      containerBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(5,5,5,0.96) 20%, rgba(10,10,10,0.94) 50%, rgba(5,5,5,0.96) 80%, rgba(0,0,0,0.98) 100%)',
      sidebarBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(10,10,10,0.95) 50%, rgba(0,0,0,0.98) 100%)',
      headerBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,10,10,0.92) 50%, rgba(0,0,0,0.95) 100%)'
    },
    effects: {
      hasStars: true,
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
  matrix: {
    id: 'matrix',
    name: 'matrix',
    displayName: 'Matrix Code',
    background: {
      gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,20,0,0.95) 20%, rgba(0,40,0,0.9) 50%, rgba(0,20,0,0.95) 80%, rgba(0,0,0,1) 100%)',
      containerBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(0,20,0,0.96) 20%, rgba(0,40,0,0.94) 50%, rgba(0,20,0,0.96) 80%, rgba(0,0,0,0.98) 100%)',
      sidebarBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(0,30,0,0.95) 50%, rgba(0,0,0,0.98) 100%)',
      headerBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,30,0,0.92) 50%, rgba(0,0,0,0.95) 100%)'
    },
    effects: {
      hasStars: false,
      hasPlanet: false,
      hasGridLines: true,
      customEffects: ['matrix-rain']
    },
    colors: {
      primary: '#00ff00',
      secondary: '#00cc00',
      accent: '#00aa00',
      text: '#00ff00',
      textSecondary: 'rgba(0, 255, 0, 0.7)',
      border: 'rgba(0, 255, 0, 0.2)'
    }
  },
  neon: {
    id: 'neon',
    name: 'neon',
    displayName: 'Neon City',
    background: {
      gradient: 'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(20,0,20,0.95) 20%, rgba(40,0,40,0.9) 50%, rgba(20,0,20,0.95) 80%, rgba(0,0,0,1) 100%)',
      containerBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(20,0,20,0.96) 20%, rgba(40,0,40,0.94) 50%, rgba(20,0,20,0.96) 80%, rgba(0,0,0,0.98) 100%)',
      sidebarBg: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(30,0,30,0.95) 50%, rgba(0,0,0,0.98) 100%)',
      headerBg: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(30,0,30,0.92) 50%, rgba(0,0,0,0.95) 100%)'
    },
    effects: {
      hasStars: false,
      hasPlanet: false,
      hasGridLines: true,
      customEffects: ['neon-glow']
    },
    colors: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      accent: '#ffff00',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 0, 255, 0.3)'
    }
  },
  ocean: {
    id: 'ocean',
    name: 'ocean',
    displayName: 'Deep Ocean',
    background: {
      gradient: 'linear-gradient(135deg, rgba(0,0,20,1) 0%, rgba(0,10,40,0.95) 20%, rgba(0,20,60,0.9) 50%, rgba(0,10,40,0.95) 80%, rgba(0,0,20,1) 100%)',
      containerBg: 'linear-gradient(135deg, rgba(0,0,20,0.98) 0%, rgba(0,10,40,0.96) 20%, rgba(0,20,60,0.94) 50%, rgba(0,10,40,0.96) 80%, rgba(0,0,20,0.98) 100%)',
      sidebarBg: 'linear-gradient(135deg, rgba(0,0,20,0.98) 0%, rgba(0,15,50,0.95) 50%, rgba(0,0,20,0.98) 100%)',
      headerBg: 'linear-gradient(135deg, rgba(0,0,20,0.95) 0%, rgba(0,15,50,0.92) 50%, rgba(0,0,20,0.95) 100%)'
    },
    effects: {
      hasStars: false,
      hasPlanet: false,
      hasGridLines: false,
      customEffects: ['water-bubbles']
    },
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#0891b2',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(14, 165, 233, 0.2)'
    }
  }
};

// AI-specific theme mappings
export const aiThemeMapping: Record<string, string[]> = {
  omnius: ['light', 'dark'],
  erasmus: ['light', 'dark', 'ocean'],
  sarah: ['light', 'dark', 'neon'],
  mentat: ['light', 'dark', 'matrix'],
  navigator: ['light', 'dark', 'ocean'],
  oracle: ['light', 'dark', 'matrix', 'neon']
};

export const getTheme = (themeId: string): ChatTheme => {
  return chatThemes[themeId] || chatThemes.light;
};

export const getAvailableThemes = (aiId: string): ChatTheme[] => {
  const availableThemeIds = aiThemeMapping[aiId] || ['light', 'dark'];
  return availableThemeIds.map(id => chatThemes[id]);
};