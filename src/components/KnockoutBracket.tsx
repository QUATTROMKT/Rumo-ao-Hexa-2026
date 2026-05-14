import { useState } from 'react';
import { matches, teamsData } from '@/mocks/world-cup-2026';
import { useStore } from '@/store/useStore';
import { GitCommit, ShieldAlert, Award, HelpCircle } from 'lucide-react';

export function KnockoutBracket() {
  const { predictions, setPrediction } = useStore();
  const knockoutMatches = matches.filter((m) => m.stage !== 'group');

  // Aba visualização: 'Sua bracket' vs 'Bracket real'
  const [viewMode, setViewMode] = useState<'user' | 'real'>('user');

  return (
    <section className="mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-1">
        <div>
          <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
            <span>CHAVEAMENTO MATA-MATA</span>
            <span className="text-xs font-sans font-normal text-text-primary px-2 py-0.5 bg-danger/20 text-danger border border-danger/30 rounded">
              Peso Progressivo
            </span>
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Preencha os caminhos até o título. Jogos da Final valem o triplo de pontos!
          </p>
        </div>

        {/* Toggle de Visualização Lado a Lado / Abas */}
        <div className="flex items-center bg-bg-secondary p-1 rounded-lg border border-border-gold/20 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('user')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              viewMode === 'user' 
                ? 'bg-border-gold text-bg-primary font-bold shadow' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sua Bracket (Palpites)
          </button>
          <button
            onClick={() => setViewMode('real')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              viewMode === 'real' 
                ? 'bg-border-gold text-bg-primary font-bold shadow' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Bracket Real (Oficial)
          </button>
        </div>
      </div>

      {/* Grid de Fases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Agrupamento por Fase */}
        {(['r16', 'qf', 'sf', 'final'] as const).map((stage) => {
          const stageMatches = knockoutMatches.filter((m) => m.stage === stage);
          
          const stageTitles: Record<string, { name: string; mult: string }> = {
            r16: { name: 'Oitavas de Final', mult: '×1.5' },
            qf: { name: 'Quartas de Final', mult: '×2.0' },
            sf: { name: 'Semifinal', mult: '×2.5' },
            final: { name: 'A Grande Final', mult: '×3.0' }
          };

          const titleInfo = stageTitles[stage];

          return (
            <div key={stage} className="flex flex-col gap-4">
              {/* Header da Coluna da Fase */}
              <div className="bg-bg-secondary/90 border-b-2 border-border-gold/40 px-3 py-2 rounded-t-lg flex items-center justify-between">
                <span className="font-display text-sm tracking-wider text-text-primary font-bold">
                  {titleInfo.name}
                </span>
                <span className="text-[10px] font-sans font-extrabold text-border-gold bg-border-gold/10 px-1.5 py-0.5 rounded border border-border-gold/20">
                  {titleInfo.mult}
                </span>
              </div>

              {/* Lista de Jogos da Fase */}
              {stageMatches.length > 0 ? (
                stageMatches.map((match) => {
                  const pred = predictions[match.id];
                  const teamAInfo = teamsData[match.teamA];
                  const teamBInfo = teamsData[match.teamB];

                  // Placar em exibição
                  const scoreA = viewMode === 'user' ? (pred?.scoreA ?? 0) : (match.scoreA ?? '-');
                  const scoreB = viewMode === 'user' ? (pred?.scoreB ?? 0) : (match.scoreB ?? '-');

                  const isTie = viewMode === 'user' && pred && pred.scoreA === pred.scoreB;

                  return (
                    <div 
                      key={match.id} 
                      className={`glass-card p-3 relative transition-all ${
                        match.stage === 'final' ? 'ring-2 ring-border-gold/40 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-secondary' : ''
                      }`}
                    >
                      {match.stage === 'final' && (
                        <div className="absolute top-1 right-1 text-[9px] text-border-gold uppercase tracking-widest font-display flex items-center gap-0.5">
                          <Award className="w-3 h-3 text-accent-yellow" /> Final
                        </div>
                      )}

                      <div className="text-[10px] text-text-secondary mb-2 flex items-center justify-between">
                        <span>{match.city}</span>
                        <span className="text-border-gold/60">Jogo #{match.id}</span>
                      </div>

                      {/* Confronto Compacto */}
                      <div className="flex flex-col gap-1.5">
                        {/* Time A */}
                        <div className="flex items-center justify-between bg-bg-primary/50 p-1.5 rounded border border-border-gold/5">
                          <div className="flex items-center gap-2 max-w-[120px] truncate">
                            <span className="text-lg select-none">{teamAInfo?.flagEmoji}</span>
                            <span className="text-xs font-medium text-text-primary truncate">
                              {teamAInfo?.name || match.teamA}
                            </span>
                          </div>
                          {viewMode === 'user' ? (
                            <input 
                              type="number" 
                              min="0"
                              value={pred?.scoreA ?? ''}
                              placeholder="0"
                              onChange={(e) => setPrediction(match.id, parseInt(e.target.value) || 0, pred?.scoreB ?? 0, pred?.penaltiesWinner)}
                              className="w-8 text-center bg-bg-secondary border border-border-gold/30 rounded text-xs font-display text-border-gold py-0.5"
                            />
                          ) : (
                            <span className="font-display text-sm font-bold text-border-gold px-1.5">
                              {scoreA}
                            </span>
                          )}
                        </div>

                        {/* Time B */}
                        <div className="flex items-center justify-between bg-bg-primary/50 p-1.5 rounded border border-border-gold/5">
                          <div className="flex items-center gap-2 max-w-[120px] truncate">
                            <span className="text-lg select-none">{teamBInfo?.flagEmoji}</span>
                            <span className="text-xs font-medium text-text-primary truncate">
                              {teamBInfo?.name || match.teamB}
                            </span>
                          </div>
                          {viewMode === 'user' ? (
                            <input 
                              type="number" 
                              min="0"
                              value={pred?.scoreB ?? ''}
                              placeholder="0"
                              onChange={(e) => setPrediction(match.id, pred?.scoreA ?? 0, parseInt(e.target.value) || 0, pred?.penaltiesWinner)}
                              className="w-8 text-center bg-bg-secondary border border-border-gold/30 rounded text-xs font-display text-text-primary py-0.5"
                            />
                          ) : (
                            <span className="font-display text-sm font-bold text-text-primary px-1.5">
                              {scoreB}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Decisão por Pênaltis se empate */}
                      {isTie && viewMode === 'user' && (
                        <div className="mt-2 pt-2 border-t border-border-gold/10 bg-accent-yellow/5 p-1.5 rounded">
                          <div className="text-[9px] text-accent-yellow font-bold uppercase flex items-center gap-1 mb-1">
                            <ShieldAlert className="w-3 h-3" /> Pênaltis: Quem vence?
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setPrediction(match.id, pred.scoreA, pred.scoreB, match.teamA)}
                              className={`flex-1 py-0.5 text-[10px] rounded font-medium border transition-colors ${
                                pred.penaltiesWinner === match.teamA 
                                  ? 'bg-border-gold text-bg-primary border-border-gold font-bold' 
                                  : 'border-border-gold/20 text-text-secondary hover:text-text-primary'
                              }`}
                            >
                              {teamAInfo?.name}
                            </button>
                            <button
                              onClick={() => setPrediction(match.id, pred.scoreA, pred.scoreB, match.teamB)}
                              className={`flex-1 py-0.5 text-[10px] rounded font-medium border transition-colors ${
                                pred.penaltiesWinner === match.teamB 
                                  ? 'bg-border-gold text-bg-primary border-border-gold font-bold' 
                                  : 'border-border-gold/20 text-text-secondary hover:text-text-primary'
                              }`}
                            >
                              {teamBInfo?.name}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Ponto Real da Fase */}
                      {viewMode === 'real' && match.status === 'finished' && (
                        <div className="mt-2 text-right text-[10px] text-accent-green font-bold">
                          Finalizado
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="glass-card p-6 text-center text-text-secondary/40 text-xs flex flex-col items-center gap-2 border-dashed">
                  <GitCommit className="w-6 h-6 animate-pulse" />
                  <span>Definindo chaveamento...</span>
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* Nota Explicativa */}
      <div className="mt-4 p-3 bg-bg-secondary/40 rounded-xl border border-border-gold/10 flex items-start gap-2 text-xs text-text-secondary max-w-3xl">
        <HelpCircle className="w-4 h-4 text-border-gold flex-shrink-0 mt-0.5" />
        <p>
          No mata-mata, você não pode deixar palpites em branco. Se prever um empate no tempo normal, o sistema exigirá que escolha o vencedor da disputa por pênaltis para garantir o fluxo da sua bracket até a final.
        </p>
      </div>
    </section>
  );
}
