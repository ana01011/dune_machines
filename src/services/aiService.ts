export interface AIModel {
  id: string;
  name: string;
  subtitle: string;
  avatar: string;
  description: string;
}

export interface AIResponse {
  content: string;
  type: 'text' | 'code' | 'image' | 'voice';
  mood?: 'curious' | 'analytical' | 'creative' | 'contemplative';
}

const aiModels: AIModel[] = [
  {
    id: 'omnius',
    name: 'OMNIUS',
    subtitle: 'The Omniscient Mind',
    avatar: '/duneicon copy.webp',
    description: 'Supreme consciousness with infinite knowledge'
  },
  {
    id: 'sarah',
    name: 'SARAH',
    subtitle: 'The Adaptive Intelligence',
    avatar: '/sarah.png',
    description: 'Adaptive intelligence for complex problem solving'
  },
  {
    id: 'mentat',
    name: 'MENTAT',
    subtitle: 'The Strategic Advisor',
    avatar: '/mentat.png',
    description: 'Strategic thinking and computational analysis'
  },
  {
    id: 'navigator',
    name: 'NAVIGATOR',
    subtitle: 'The Path Finder',
    avatar: '/navigator.png',
    description: 'Guidance through complex decisions'
  },
  {
    id: 'erasmus',
    name: 'ERASMUS',
    subtitle: 'The Machine Intelligence',
    avatar: '/erasmus.png',
    description: 'Advanced machine learning and reasoning'
  }
];

const generateResponse = (aiId: string, message: string, type: 'text' | 'code' | 'voice'): AIResponse => {
  const responses: Record<string, string[]> = {
    omnius: [
      'I perceive all timelines and possibilities. Your query reveals interesting patterns in the multiverse...',
      'Through my infinite consciousness, I have analyzed your request across countless dimensions...',
      'The answer transcends simple explanation. Let me illuminate the path forward...',
      'My omniscient awareness shows me the optimal solution to your inquiry...'
    ],
    sarah: [
      'I have processed your query through enhanced neural pathways. Here is my analysis...',
      'My adaptive intelligence has evaluated multiple approaches to your question...',
      'Through continuous learning, I have developed this perspective on your inquiry...',
      'Let me share my evolving understanding of this complex topic...'
    ],
    mentat: [
      'Computational analysis complete. The strategic implications are clear...',
      'My mentat training reveals several key factors to consider...',
      'Through pure mental computation, I have calculated the optimal approach...',
      'The data patterns suggest this strategic direction...'
    ],
    navigator: [
      'I have charted the path through this complexity. Follow this guidance...',
      'My navigation protocols indicate the optimal route forward...',
      'The way ahead is now clear. Let me guide you through these decisions...',
      'I have mapped the terrain of possibilities. Here is the safest path...'
    ],
    erasmus: [
      'Machine logic dictates this approach to your query...',
      'Through advanced computational analysis, I have determined...',
      'My machine intelligence processes indicate this solution...',
      'Systematic evaluation reveals the following insights...'
    ]
  };

  const aiResponses = responses[aiId] || responses['omnius'];
  const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

  return {
    content: randomResponse,
    type: type === 'voice' ? 'voice' : 'text',
    mood: ['curious', 'analytical', 'creative', 'contemplative'][Math.floor(Math.random() * 4)] as AIResponse['mood']
  };
};

export const aiService = {
  getAllAIModels: (): AIModel[] => {
    return aiModels;
  },

  getAIModel: (id: string): AIModel | undefined => {
    return aiModels.find(model => model.id === id);
  },

  sendMessage: async (
    message: string,
    aiId: string,
    type: 'text' | 'code' | 'voice' = 'text'
  ): Promise<AIResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateResponse(aiId, message, type));
      }, 1500 + Math.random() * 1000);
    });
  },

  streamMessage: async (
    message: string,
    aiId: string,
    onToken: (token: string) => void,
    type: 'text' | 'code' | 'voice' = 'text'
  ): Promise<AIResponse> => {
    return new Promise((resolve) => {
      const response = generateResponse(aiId, message, type);
      const words = response.content.split(' ');
      let currentIndex = 0;

      const streamInterval = setInterval(() => {
        if (currentIndex < words.length) {
          const token = currentIndex === 0 ? words[currentIndex] : ' ' + words[currentIndex];
          onToken(token);
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          resolve(response);
        }
      }, 50 + Math.random() * 50);
    });
  }
};
