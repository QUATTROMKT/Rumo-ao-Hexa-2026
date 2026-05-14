import { createClient } from '@supabase/supabase-js';

// Conexão com o Supabase prontas para produção
// Caso o usuário preencha as credenciais reais no arquivo .env local, o app se conecta instantaneamente às tabelas do PostgreSQL via REST e Realtime.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sua-url-do-projeto.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ==========================================
 * 🚀 SCRIPT SQL COMPLETO PARA O SUPABASE
 * ==========================================
 * Copie e cole o script abaixo diretamente no SQL Editor do painel do seu Supabase
 * para criar todo o modelo relacional da Copa do Mundo de 2026 com base no Sorteio Oficial
 * e com suporte estrito a RLS (Row Level Security).
 */

export const INITIALIZATION_SQL_SCRIPT = `
-- 1. Tabela de Perfis de Usuário estendendo auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  favorite_team_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Perfis visíveis a todos" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Usuário atualiza próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Tabela de Seleções Oficiais
CREATE TABLE IF NOT EXISTS public.teams (
  short_code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  flag_emoji TEXT NOT NULL,
  group_letter CHAR(1) NOT NULL CHECK (group_letter IN ('A','B','C','D','E','F','G','H','I','J','K','L'))
);
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Seleções leitura pública" ON public.teams FOR SELECT USING (true);

-- 3. Tabela de Jogos
CREATE TABLE IF NOT EXISTS public.matches (
  id SERIAL PRIMARY KEY,
  stage TEXT NOT NULL CHECK (stage IN ('group','r32','r16','qf','sf','third','final')),
  group_letter CHAR(1),
  team_a TEXT REFERENCES public.teams(short_code),
  team_b TEXT REFERENCES public.teams(short_code),
  starts_at TIMESTAMPTZ NOT NULL,
  stadium TEXT,
  city TEXT,
  multiplier NUMERIC(3,1) DEFAULT 1.0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled','live','finished','cancelled')),
  score_a INT,
  score_b INT,
  et_score_a INT,
  et_score_b INT,
  penalties_winner TEXT REFERENCES public.teams(short_code)
);
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jogos leitura pública" ON public.matches FOR SELECT USING (true);

-- 4. Tabela de Palpites
CREATE TABLE IF NOT EXISTS public.predictions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  match_id INT NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  score_a INT NOT NULL CHECK (score_a >= 0),
  score_b INT NOT NULL CHECK (score_b >= 0),
  penalties_winner TEXT REFERENCES public.teams(short_code),
  points_awarded INT,
  is_exact BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, match_id)
);
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- POLÍTICA DE SEGURANÇA (RLS) DE PALPITES:
-- Usuário só vê os próprios palpites enquanto o jogo não encerra (impede espionagem e cópia do ranking).
-- Após o jogo finalizado, os palpites tornam-se públicos para verificação transparente.
CREATE POLICY "Ler próprio palpite ou público pós-jogo" ON public.predictions
  FOR SELECT USING (
    auth.uid() = user_id 
    OR EXISTS (SELECT 1 FROM public.matches WHERE id = match_id AND status = 'finished')
  );

CREATE POLICY "Inserir próprio palpite antes do lock" ON public.predictions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id 
    AND EXISTS (
      SELECT 1 FROM public.matches 
      WHERE id = match_id AND starts_at > NOW() + INTERVAL '5 minutes'
    )
  );

CREATE POLICY "Atualizar próprio palpite antes do lock" ON public.predictions
  FOR UPDATE USING (
    auth.uid() = user_id 
    AND EXISTS (
      SELECT 1 FROM public.matches 
      WHERE id = match_id AND starts_at > NOW() + INTERVAL '5 minutes'
    )
  );

-- 5. Ligas Privadas
CREATE TABLE IF NOT EXISTS public.leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  prize_note TEXT,
  organizer_id UUID NOT NULL REFERENCES public.profiles(id),
  join_code TEXT UNIQUE NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  max_participants INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ligas leitura pública" ON public.leagues FOR SELECT USING (true);
CREATE POLICY "Criação de liga autenticada" ON public.leagues FOR INSERT WITH CHECK (auth.uid() = organizer_id);

-- Membros das Ligas
CREATE TABLE IF NOT EXISTS public.league_members (
  league_id UUID REFERENCES public.leagues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (league_id, user_id)
);
ALTER TABLE public.league_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Membros leitura pública" ON public.league_members FOR SELECT USING (true);
CREATE POLICY "Entrada na liga" ON public.league_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Palpites Especiais (Únicos por usuário)
CREATE TABLE IF NOT EXISTS public.special_predictions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  champion_code TEXT REFERENCES public.teams(short_code),
  runner_up_code TEXT REFERENCES public.teams(short_code),
  top_scorer_name TEXT,
  best_player_name TEXT,
  dark_horse_code TEXT REFERENCES public.teams(short_code),
  points_awarded INT DEFAULT 0
);
ALTER TABLE public.special_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ler próprio ou todos" ON public.special_predictions FOR SELECT USING (true);
CREATE POLICY "Inserir/Atualizar próprio especial" ON public.special_predictions FOR ALL USING (auth.uid() = user_id);

-- 7. View de Leaderboard Global
CREATE OR REPLACE VIEW public.leaderboard_global AS
SELECT 
  p.user_id,
  pr.display_name AS name,
  pr.avatar_url AS avatar,
  SUM(COALESCE(p.points_awarded, 0)) AS points,
  COUNT(*) FILTER (WHERE p.is_exact) AS exacts,
  RANK() OVER (ORDER BY SUM(COALESCE(p.points_awarded, 0)) DESC) AS position
FROM public.predictions p
JOIN public.profiles pr ON pr.id = p.user_id
WHERE p.points_awarded IS NOT NULL
GROUP BY p.user_id, pr.display_name, pr.avatar_url;
`;

// Helper prático para buscar ou subscrever em realtime
export async function fetchLiveLeaderboard() {
  // Executa consulta real ao Supabase se VITE_SUPABASE_URL for fornecida
  if (import.meta.env.VITE_SUPABASE_URL) {
    const { data, error } = await supabase.from('leaderboard_global').select('*').order('position', { ascending: true });
    if (!error && data) return data;
  }
  return null;
}

export async function savePredictionBackend(matchId: number, scoreA: number, scoreB: number, userId: string, penaltiesWinner?: string) {
  if (import.meta.env.VITE_SUPABASE_URL) {
    const { error } = await supabase.from('predictions').upsert({
      user_id: userId,
      match_id: matchId,
      score_a: scoreA,
      score_b: scoreB,
      penalties_winner: penaltiesWinner,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,match_id' });
    return !error;
  }
  return true;
}
