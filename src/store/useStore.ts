import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Prediction, SpecialPredictions } from '@/mocks/world-cup-2026';
import { savePredictionBackend, supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  displayName: string;
  avatarUrl: string;
  favoriteTeam: string;
  exactCount: number;
  totalPoints: number;
  streak: number;
  position: number;
}

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  predictions: Record<number, Prediction>;
  specialPredictions: SpecialPredictions;
  soundEnabled: boolean;
  currentLeagueId: string;
  
  // Actions
  login: (type: 'google' | 'magic') => void;
  logout: () => void;
  setPrediction: (matchId: number, scoreA: number, scoreB: number, penaltiesWinner?: string) => void;
  setSpecialPredictions: (specials: Partial<SpecialPredictions>) => void;
  toggleSound: () => void;
  setCurrentLeagueId: (id: string) => void;
  initializeSession: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // DADOS ZERADOS PARA ENTRADA EM PRODUÇÃO COM USUÁRIOS REAIS
      user: null,
      isAuthenticated: false,
      predictions: {},
      specialPredictions: {},
      soundEnabled: true,
      currentLeagueId: 'global',

      login: (type) => set({
        isAuthenticated: true,
        user: {
          id: 'usr-production-demo-uuid',
          displayName: type === 'google' ? 'Cadu (Google)' : 'Cadu (Visitante)',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          favoriteTeam: 'BRA',
          exactCount: 0,
          totalPoints: 0,
          streak: 0,
          position: 1
        }
      }),

      logout: async () => {
        await supabase.auth.signOut();
        set({ isAuthenticated: false, user: null, predictions: {}, specialPredictions: {} });
      },

      setPrediction: (matchId, scoreA, scoreB, penaltiesWinner) => {
        // Atualização reativa imediata na UI
        set((state) => {
          return {
            predictions: {
              ...state.predictions,
              [matchId]: {
                matchId,
                scoreA,
                scoreB,
                penaltiesWinner,
                pointsAwarded: undefined, // pontos só vêm do cálculo final
                isExact: false
              }
            }
          };
        });

        // Execução assíncrona de persistência no Supabase Postgres em Background
        const currentUser = get().user;
        if (currentUser) {
          savePredictionBackend(matchId, scoreA, scoreB, currentUser.id, penaltiesWinner).catch(() => {
            // Silencioso
          });
        }
      },

      setSpecialPredictions: (specials) => set((state) => ({
        specialPredictions: { ...state.specialPredictions, ...specials }
      })),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      setCurrentLeagueId: (id) => set({ currentLeagueId: id }),

      initializeSession: () => {
        // Inscreve no listener de autenticação real do Supabase
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            set({
              isAuthenticated: true,
              user: {
                id: session.user.id,
                displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuário Premium',
                avatarUrl: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                favoriteTeam: 'BRA',
                exactCount: 0,
                totalPoints: 0,
                streak: 0,
                position: 1
              }
            });
          }
        });

        supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            set({
              isAuthenticated: true,
              user: {
                id: session.user.id,
                displayName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Usuário Premium',
                avatarUrl: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                favoriteTeam: 'BRA',
                exactCount: 0,
                totalPoints: 0,
                streak: 0,
                position: 1
              }
            });
          } else {
            set({ isAuthenticated: false, user: null });
          }
        });
      }
    }),
    {
      name: 'rumo-ao-hexa-production-live',
    }
  )
);
