import { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { matches } from '@/mocks/world-cup-2026';

// Components
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AuthSplash } from '@/components/AuthSplash';
import { CountdownCard } from '@/components/CountdownCard';
import { GroupsCarousel } from '@/components/GroupsCarousel';
import { MatchCard } from '@/components/MatchCard';
import { KnockoutBracket } from '@/components/KnockoutBracket';
import { SpecialPredictionsCard } from '@/components/SpecialPredictionsCard';
import { SpecialsSection } from '@/components/SpecialsSection';
import { AchievementsGrid } from '@/components/AchievementsGrid';
import { PrivateLeagues } from '@/components/PrivateLeagues';
import { Leaderboard } from '@/components/Leaderboard';
import { AdminPanel } from '@/components/AdminPanel';

import { Filter, Calendar } from 'lucide-react';

export function App() {
  const { isAuthenticated, predictions, initializeSession } = useStore();
  const [matchFilter, setMatchFilter] = useState<'all' | 'brazil' | 'groups' | 'knockout' | 'missing'>('all');

  // Inicializa o ouvinte de sessão real do Supabase
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // Filtragem dos jogos da listagem
  const filteredMatches = matches.filter((m) => {
    if (matchFilter === 'brazil') {
      return m.teamA === 'BRA' || m.teamB === 'BRA';
    }
    if (matchFilter === 'groups') {
      return m.stage === 'group';
    }
    if (matchFilter === 'knockout') {
      return m.stage !== 'group';
    }
    if (matchFilter === 'missing') {
      // Falta palpitar e jogo agendado
      return !predictions[m.id] && m.status === 'scheduled';
    }
    return true; // 'all'
  });

  // Agrupamento de jogos por Data / Identificador Visual real
  const groupedMatches = filteredMatches.reduce((acc, match) => {
    let dateLabel = "";
    try {
      const d = new Date(match.startsAt);
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
      const formatted = d.toLocaleDateString('pt-BR', options).replace(/\./g, '').toUpperCase();
      
      if (match.stage !== 'group') {
        const stageNames: Record<string, string> = {
          r16: 'OITAVAS DE FINAL',
          qf: 'QUARTAS DE FINAL',
          sf: 'SEMIFINAL',
          third: 'DISPUTA DO 3º LUGAR',
          final: 'A GRANDE FINAL'
        };
        dateLabel = `${stageNames[match.stage] || match.stage.toUpperCase()} • ${formatted}`;
      } else {
        dateLabel = `FASE DE GRUPOS • ${formatted}`;
      }
    } catch {
      dateLabel = match.stage === 'group' ? 'FASE DE GRUPOS' : `MATA-MATA • ${match.stage.toUpperCase()}`;
    }

    if (!acc[dateLabel]) acc[dateLabel] = [];
    acc[dateLabel].push(match);
    return acc;
  }, {} as Record<string, typeof matches>);

  // Se não estiver autenticado, exibe a Splash Screen de Onboarding & Auth real
  if (!isAuthenticated) {
    return <AuthSplash />;
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-border-gold selection:text-bg-primary">
      {/* Header Fixo Premium */}
      <Header />

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        
        {/* Card Destaque Próximo Jogo Brasil com contagem regressiva animada */}
        <CountdownCard 
          onSelectMatch={() => {
            const element = document.getElementById('matches-section');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              setMatchFilter('all');
            }
          }}
        />

        {/* Carrossel de Grupos com classificação de pontos reais */}
        <GroupsCarousel />

        {/* Seção de Ligas Privadas */}
        <PrivateLeagues />

        {/* Seção Principal de Jogos */}
        <section className="mt-12" id="matches-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-1">
            <div>
              <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
                <span>CONFRONTOS & PALPITES</span>
                <span className="text-xs font-sans font-normal text-text-secondary px-2 py-0.5 bg-bg-secondary rounded-full border border-border-gold/10">
                  {filteredMatches.length} jogos exibidos
                </span>
              </h2>
              <p className="text-xs text-text-secondary">
                Insira ou ajuste placares. O salvamento é automático e otimista via cache.
              </p>
            </div>

            {/* Filtros de Listagem */}
            <div className="flex flex-wrap items-center gap-1.5 bg-bg-secondary p-1 rounded-xl border border-border-gold/10">
              <span className="text-text-secondary px-2 text-xs flex items-center gap-1 font-semibold">
                <Filter className="w-3 h-3 text-border-gold" /> Filtro:
              </span>
              <button
                onClick={() => setMatchFilter('all')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  matchFilter === 'all' ? 'bg-border-gold text-bg-primary font-bold' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setMatchFilter('brazil')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  matchFilter === 'brazil' ? 'bg-accent-green text-bg-primary font-bold' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                🇧🇷 Brasil
              </button>
              <button
                onClick={() => setMatchFilter('groups')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  matchFilter === 'groups' ? 'bg-border-gold text-bg-primary font-bold' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Grupos
              </button>
              <button
                onClick={() => setMatchFilter('knockout')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  matchFilter === 'knockout' ? 'bg-border-gold text-bg-primary font-bold' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Mata-Mata
              </button>
              <button
                onClick={() => setMatchFilter('missing')}
                className={`px-2.5 py-1 rounded text-xs transition-all ${
                  matchFilter === 'missing' ? 'bg-danger text-text-primary font-bold animate-pulse' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Faltam Palpitar
              </button>
            </div>
          </div>

          {/* Listagem Agrupada por Data */}
          {Object.entries(groupedMatches).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedMatches).map(([dateLabel, groupList]) => (
                <div key={dateLabel} className="space-y-3">
                  {/* Sticky Header do Agrupamento */}
                  <div className="sticky top-16 z-30 bg-bg-primary/95 backdrop-blur-sm py-2 px-1 flex items-center gap-2 border-b border-border-gold/20">
                    <Calendar className="w-4 h-4 text-border-gold" />
                    <h3 className="font-display text-sm tracking-wide font-bold text-border-gold uppercase">
                      {dateLabel}
                    </h3>
                    <div className="h-px bg-border-gold/10 flex-1 ml-2" />
                  </div>

                  {/* Cards dos Jogos daquele grupo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groupList.map((m) => (
                      <MatchCard key={m.id} match={m} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-text-secondary">
              Nenhum jogo encontrado para o filtro selecionado.
            </div>
          )}
        </section>

        {/* Seção Mata-Mata Bracket Interativo */}
        <KnockoutBracket />

        {/* Seção Palpites Especiais Bônus */}
        <SpecialPredictionsCard />

        {/* Seção Especiais Brasil Histórico */}
        <SpecialsSection />

        {/* Seção de Conquistas/Achievements */}
        <AchievementsGrid />

        {/* Seção do Leaderboard Oficial */}
        <Leaderboard />

        {/* Painel Interno de Teste/Simulação de Admin Service_role oculto por padrão */}
        {typeof window !== 'undefined' && window.location.search.includes('admin=true') && (
          <AdminPanel />
        )}

      </main>

      {/* Rodapé Global */}
      <Footer />
    </div>
  );
}
export default App;
