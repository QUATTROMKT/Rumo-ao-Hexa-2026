export interface Team {
  id: number;
  name: string;
  shortCode: string;
  flagEmoji: string;
  groupLetter: string;
}

export interface Group {
  letter: string;
  teams: string[];
}

export interface Match {
  id: number;
  stage: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final';
  groupLetter?: string;
  teamA: string;
  teamB: string;
  startsAt: string;
  stadium: string;
  city: string;
  multiplier: number;
  status: 'scheduled' | 'live' | 'finished';
  scoreA?: number;
  scoreB?: number;
  etScoreA?: number;
  etScoreB?: number;
  penaltiesWinner?: string;
}

// 48 Seleções Oficiais Classificadas com base no Sorteio Oficial da FIFA (5/dez/2025)
export const teamsData: Record<string, { name: string; flagEmoji: string }> = {
  // Grupo A
  MEX: { name: 'México', flagEmoji: '🇲🇽' },
  KOR: { name: 'Coreia do Sul', flagEmoji: '🇰🇷' },
  RSA: { name: 'África do Sul', flagEmoji: '🇿🇦' },
  CZE: { name: 'Tchéquia', flagEmoji: '🇨🇿' },

  // Grupo B
  CAN: { name: 'Canadá', flagEmoji: '🇨🇦' },
  SUI: { name: 'Suíça', flagEmoji: '🇨🇭' },
  QAT: { name: 'Catar', flagEmoji: '🇶🇦' },
  BIH: { name: 'Bósnia e Herz.', flagEmoji: '🇧🇦' },

  // Grupo C
  BRA: { name: 'Brasil', flagEmoji: '🇧🇷' },
  MAR: { name: 'Marrocos', flagEmoji: '🇲🇦' },
  SCO: { name: 'Escócia', flagEmoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  HAI: { name: 'Haiti', flagEmoji: '🇭🇹' },

  // Grupo D
  USA: { name: 'Estados Unidos', flagEmoji: '🇺🇸' },
  PAR: { name: 'Paraguai', flagEmoji: '🇵🇾' },
  AUS: { name: 'Austrália', flagEmoji: '🇦🇺' },
  TUR: { name: 'Turquia', flagEmoji: '🇹🇷' },

  // Grupo E
  GER: { name: 'Alemanha', flagEmoji: '🇩🇪' },
  ECU: { name: 'Equador', flagEmoji: '🇪🇨' },
  CIV: { name: 'Costa do Marfim', flagEmoji: '🇨🇮' },
  CUW: { name: 'Curaçao', flagEmoji: '🇨🇼' },

  // Grupo F
  NED: { name: 'Holanda', flagEmoji: '🇳🇱' },
  JPN: { name: 'Japão', flagEmoji: '🇯🇵' },
  TUN: { name: 'Tunísia', flagEmoji: '🇹🇳' },
  SWE: { name: 'Suécia', flagEmoji: '🇸🇪' },

  // Grupo G
  BEL: { name: 'Bélgica', flagEmoji: '🇧🇪' },
  IRN: { name: 'Irã', flagEmoji: '🇮🇷' },
  EGY: { name: 'Egito', flagEmoji: '🇪🇬' },
  NZL: { name: 'Nova Zelândia', flagEmoji: '🇳🇿' },

  // Grupo H
  ESP: { name: 'Espanha', flagEmoji: '🇪🇸' },
  URU: { name: 'Uruguai', flagEmoji: '🇺🇾' },
  KSA: { name: 'Arábia Saudita', flagEmoji: '🇸🇦' },
  CPV: { name: 'Cabo Verde', flagEmoji: '🇨🇻' },

  // Grupo I
  FRA: { name: 'França', flagEmoji: '🇫🇷' },
  SEN: { name: 'Senegal', flagEmoji: '🇸🇳' },
  NOR: { name: 'Noruega', flagEmoji: '🇳🇴' },
  IRQ: { name: 'Iraque', flagEmoji: '🇮🇶' },

  // Grupo J
  ARG: { name: 'Argentina', flagEmoji: '🇦🇷' },
  ALG: { name: 'Argélia', flagEmoji: '🇩🇿' },
  AUT: { name: 'Áustria', flagEmoji: '🇦🇹' },
  JOR: { name: 'Jordânia', flagEmoji: '🇯🇴' },

  // Grupo K
  COL: { name: 'Colômbia', flagEmoji: '🇨🇴' },
  UZB: { name: 'Uzbequistão', flagEmoji: '🇺🇿' },
  COD: { name: 'RD Congo', flagEmoji: '🇨🇩' },
  BOL: { name: 'Bolívia', flagEmoji: '🇧🇴' },

  // Grupo L
  GHA: { name: 'Gana', flagEmoji: '🇬🇭' },
  PAN: { name: 'Panamá', flagEmoji: '🇵🇦' },
  POL: { name: 'Polônia', flagEmoji: '🇵🇱' },
  ALB: { name: 'Albânia', flagEmoji: '🇦🇱' }
};

// 12 Grupos Oficiais do Sorteio da FIFA 2026
export const groups: Group[] = [
  { letter: 'A', teams: ['MEX', 'KOR', 'RSA', 'CZE'] },
  { letter: 'B', teams: ['CAN', 'SUI', 'QAT', 'BIH'] },
  { letter: 'C', teams: ['BRA', 'MAR', 'SCO', 'HAI'] },
  { letter: 'D', teams: ['USA', 'PAR', 'AUS', 'TUR'] },
  { letter: 'E', teams: ['GER', 'ECU', 'CIV', 'CUW'] },
  { letter: 'F', teams: ['NED', 'JPN', 'TUN', 'SWE'] },
  { letter: 'G', teams: ['BEL', 'IRN', 'EGY', 'NZL'] },
  { letter: 'H', teams: ['ESP', 'URU', 'KSA', 'CPV'] },
  { letter: 'I', teams: ['FRA', 'SEN', 'NOR', 'IRQ'] },
  { letter: 'J', teams: ['ARG', 'ALG', 'AUT', 'JOR'] },
  { letter: 'K', teams: ['COL', 'UZB', 'COD', 'BOL'] },
  { letter: 'L', teams: ['GHA', 'PAN', 'POL', 'ALB'] }
];

// Tabela de Jogos representativa englobando aberturas de cada grupo, destaques do Brasil e chaves de mata-mata
export const matches: Match[] = [
  // Jogo de Abertura Oficial
  {
    id: 1,
    stage: 'group',
    groupLetter: 'A',
    teamA: 'MEX',
    teamB: 'RSA',
    startsAt: '2026-06-11T16:00:00-06:00', // Azteca
    stadium: 'Estadio Azteca',
    city: 'Cidade do México',
    multiplier: 1.0,
    status: 'scheduled'
  },
  // Jogos do Grupo do Brasil (Grupo C)
  {
    id: 2,
    stage: 'group',
    groupLetter: 'C',
    teamA: 'BRA',
    teamB: 'SCO',
    startsAt: '2026-06-13T16:00:00-03:00',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles',
    multiplier: 1.0,
    status: 'scheduled'
  },
  {
    id: 3,
    stage: 'group',
    groupLetter: 'C',
    teamA: 'MAR',
    teamB: 'HAI',
    startsAt: '2026-06-13T20:00:00-03:00',
    stadium: 'Levi\'s Stadium',
    city: 'San Francisco',
    multiplier: 1.0,
    status: 'scheduled'
  },
  {
    id: 4,
    stage: 'group',
    groupLetter: 'C',
    teamA: 'BRA',
    teamB: 'MAR',
    startsAt: '2026-06-18T18:00:00-03:00',
    stadium: 'MetLife Stadium',
    city: 'Nova York / NJ',
    multiplier: 1.0,
    status: 'scheduled'
  },
  {
    id: 5,
    stage: 'group',
    groupLetter: 'C',
    teamA: 'SCO',
    teamB: 'HAI',
    startsAt: '2026-06-18T15:00:00-03:00',
    stadium: 'Gillette Stadium',
    city: 'Boston',
    multiplier: 1.0,
    status: 'scheduled'
  },
  {
    id: 6,
    stage: 'group',
    groupLetter: 'C',
    teamA: 'BRA',
    teamB: 'HAI',
    startsAt: '2026-06-24T17:00:00-03:00',
    stadium: 'Hard Rock Stadium',
    city: 'Miami',
    multiplier: 1.0,
    status: 'scheduled'
  },
  // Outros clássicos da fase de grupos
  {
    id: 7,
    stage: 'group',
    groupLetter: 'D',
    teamA: 'USA',
    teamB: 'TUR',
    startsAt: '2026-06-12T19:00:00-03:00',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles',
    multiplier: 1.0,
    status: 'scheduled'
  },
  {
    id: 8,
    stage: 'group',
    groupLetter: 'J',
    teamA: 'ARG',
    teamB: 'AUT',
    startsAt: '2026-06-14T16:00:00-03:00',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    multiplier: 1.0,
    status: 'scheduled'
  },
  {
    id: 9,
    stage: 'group',
    groupLetter: 'I',
    teamA: 'FRA',
    teamB: 'SEN',
    startsAt: '2026-06-15T21:00:00-03:00',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    multiplier: 1.0,
    status: 'scheduled'
  },
  {
    id: 10,
    stage: 'group',
    groupLetter: 'E',
    teamA: 'GER',
    teamB: 'ECU',
    startsAt: '2026-06-16T14:00:00-03:00',
    stadium: 'BMO Field',
    city: 'Toronto',
    multiplier: 1.0,
    status: 'scheduled'
  },
  // Mata-Mata Oficiais Mapeados
  {
    id: 101,
    stage: 'r16',
    teamA: 'BRA',
    teamB: 'URU',
    startsAt: '2026-07-01T17:00:00-03:00',
    stadium: 'NRG Stadium',
    city: 'Houston',
    multiplier: 1.5,
    status: 'scheduled'
  },
  {
    id: 102,
    stage: 'qf',
    teamA: 'ARG',
    teamB: 'FRA',
    startsAt: '2026-07-05T16:00:00-03:00',
    stadium: 'SoFi Stadium',
    city: 'Los Angeles',
    multiplier: 2.0,
    status: 'scheduled'
  },
  {
    id: 103,
    stage: 'sf',
    teamA: 'BRA',
    teamB: 'ARG',
    startsAt: '2026-07-10T21:00:00-03:00',
    stadium: 'MetLife Stadium',
    city: 'Nova York / NJ',
    multiplier: 2.5,
    status: 'scheduled'
  },
  {
    id: 104,
    stage: 'final',
    teamA: 'BRA',
    teamB: 'FRA',
    startsAt: '2026-07-19T16:00:00-03:00',
    stadium: 'MetLife Stadium',
    city: 'Nova York / NJ',
    multiplier: 3.0,
    status: 'scheduled'
  }
];

export interface Prediction {
  matchId: number;
  scoreA: number;
  scoreB: number;
  penaltiesWinner?: string;
  pointsAwarded?: number;
  isExact?: boolean;
}

export interface SpecialPredictions {
  champion?: string;
  runnerUp?: string;
  topScorer?: string;
  bestPlayer?: string;
  darkHorse?: string;
}
