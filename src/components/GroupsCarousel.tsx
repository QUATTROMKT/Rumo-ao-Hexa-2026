import { groups, teamsData } from '@/mocks/world-cup-2026';

export function GroupsCarousel() {
  // Simulação de pontos reais e posições dinâmicas para o MVP
  const getMockStandings = (groupLetter: string, teams: string[]) => {
    // Definimos pontos lógicos para demonstrar a classificação real
    const basePoints = groupLetter === 'A' ? [7, 4, 3, 1] : [6, 4, 3, 0];
    return teams.map((teamCode, index) => ({
      code: teamCode,
      ...teamsData[teamCode],
      points: basePoints[index] || 0,
      played: basePoints[index] > 3 ? 3 : 2,
      goalsDiff: basePoints[index] - 1
    }));
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
            <span>GRUPOS DA COPA</span>
            <span className="text-xs font-sans font-normal text-text-secondary px-2 py-0.5 bg-bg-secondary rounded-full border border-border-gold/10">
              A ao L (48 Seleções)
            </span>
          </h2>
          <p className="text-xs text-text-secondary">
            Arraste para os lados para navegar por todos os 12 grupos oficiais.
          </p>
        </div>
      </div>

      {/* Container com Rolagem Horizontal Premium */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x scroll-smooth">
        {groups.map((g) => {
          const standings = getMockStandings(g.letter, g.teams);

          return (
            <div 
              key={g.letter} 
              className="glass-card min-w-[280px] sm:min-w-[310px] flex-shrink-0 p-4 snap-start relative overflow-hidden group hover:border-border-gold/40 transition-all duration-300"
            >
              {/* Opacidade de fundo watermark da letra do grupo */}
              <div className="absolute right-2 top-2 font-watermark text-7xl text-border-gold/5 select-none pointer-events-none">
                {g.letter}
              </div>

              {/* Título do Card */}
              <div className="flex items-center justify-between border-b border-border-gold/10 pb-2 mb-3">
                <span className="font-display text-base text-border-gold font-bold tracking-wider">
                  GRUPO {g.letter}
                </span>
                <span className="text-[10px] font-sans text-accent-green bg-accent-green/10 px-2 py-0.5 rounded">
                  Ao Vivo
                </span>
              </div>

              {/* Tabela de Classificação */}
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="text-[10px] text-text-secondary border-b border-border-gold/5">
                    <th className="pb-1 font-medium w-6">#</th>
                    <th className="pb-1 font-medium">Seleção</th>
                    <th className="pb-1 font-medium text-center w-8">J</th>
                    <th className="pb-1 font-medium text-center w-8">SG</th>
                    <th className="pb-1 font-medium text-right w-8">P</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-gold/5">
                  {standings.map((team, idx) => (
                    <tr 
                      key={team.code} 
                      className={`transition-colors ${idx < 2 ? 'bg-accent-green/5 font-medium' : ''} ${team.code === 'BRA' ? 'bg-border-gold/10 text-border-gold font-bold' : ''}`}
                    >
                      <td className="py-2.5">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${idx < 2 ? 'bg-border-gold/20 text-border-gold font-bold' : 'text-text-secondary'}`}>
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-2.5 flex items-center gap-2">
                        <span className="text-base select-none" role="img" aria-label={team.name}>
                          {team.flagEmoji}
                        </span>
                        <span className="truncate max-w-[110px] text-text-primary">
                          {team.name}
                        </span>
                      </td>
                      <td className="py-2.5 text-center text-text-secondary">
                        {team.played}
                      </td>
                      <td className="py-2.5 text-center text-text-secondary">
                        {team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}
                      </td>
                      <td className="py-2.5 text-right font-bold text-border-gold">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Rodapé do Card */}
              <div className="mt-3 pt-2 border-t border-border-gold/5 flex items-center justify-between text-[9px] text-text-secondary/70">
                <span>Top 2 avançam às oitavas</span>
                <span className="text-border-gold/80 group-hover:underline cursor-pointer">
                  Ver jogos →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
