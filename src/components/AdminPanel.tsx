import { useState } from 'react';
import { matches, teamsData } from '@/mocks/world-cup-2026';
import { useStore } from '@/store/useStore';
import { ShieldAlert, Save, RefreshCw } from 'lucide-react';

export function AdminPanel() {
  const { predictions } = useStore();
  const [selectedMatchId, setSelectedMatchId] = useState<number>(1);
  const [scoreA, setScoreA] = useState<number>(2);
  const [scoreB, setScoreB] = useState<number>(1);
  const [etScoreA, setEtScoreA] = useState<number>(0);
  const [etScoreB, setEtScoreB] = useState<number>(0);
  const [penaltiesWinner, setPenaltiesWinner] = useState<string>('');
  
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedMatch = matches.find((m) => m.id === selectedMatchId) || matches[0];
  const teamAInfo = teamsData[selectedMatch.teamA];
  const teamBInfo = teamsData[selectedMatch.teamB];

  // Dispara o cálculo customizado de pontos simulando a Edge Function calculate_points
  const handleRegisterResult = () => {
    // Atualiza placar do match no mock em memória local
    selectedMatch.status = 'finished';
    selectedMatch.scoreA = scoreA;
    selectedMatch.scoreB = scoreB;
    selectedMatch.etScoreA = etScoreA;
    selectedMatch.etScoreB = etScoreB;
    selectedMatch.penaltiesWinner = penaltiesWinner || undefined;

    // Simula recálculo do palpite associado
    const pred = predictions[selectedMatch.id];
    let calculatedPoints = 0;
    let isExact = false;

    if (pred) {
      // Regras de Negócio de Pontuação (Fase de grupos / base)
      const predA = pred.scoreA;
      const predB = pred.scoreB;

      const isPredDraw = predA === predB;
      const isRealDraw = scoreA === scoreB;
      const isPredAWinner = predA > predB;
      const isRealAWinner = scoreA > scoreB;
      const isPredBWinner = predB > predA;
      const isRealBWinner = scoreB > scoreA;

      // 1. Placar exato
      if (predA === scoreA && predB === scoreB) {
        calculatedPoints = 25;
        isExact = true;
      } 
      // 2. Vencedor + saldo de gols
      else if (
        (isPredAWinner && isRealAWinner && (predA - predB === scoreA - scoreB)) ||
        (isPredBWinner && isRealBWinner && (predB - predA === scoreB - scoreA))
      ) {
        calculatedPoints = 18;
      }
      // 3. Vencedor + gols de um dos times
      else if (
        ((isPredAWinner && isRealAWinner) || (isPredBWinner && isRealBWinner) || (isPredDraw && isRealDraw)) &&
        (predA === scoreA || predB === scoreB)
      ) {
        calculatedPoints = 15;
      }
      // 4. Vencedor/empate correto, gols errados
      else if (
        (isPredAWinner && isRealAWinner) || 
        (isPredBWinner && isRealBWinner) || 
        (isPredDraw && isRealDraw)
      ) {
        calculatedPoints = 10;
      } else {
        calculatedPoints = 0;
      }

      // Aplica Multiplicador de Mata-mata
      calculatedPoints = Math.round(calculatedPoints * selectedMatch.multiplier);
      
      // Salva pontos associados no store para o client reagir na tela
      pred.pointsAwarded = calculatedPoints;
      pred.isExact = isExact;
    }

    setFeedback(`Resultado gravado! Palpite do usuário pontuado em ${calculatedPoints} pts (Multiplicador ×${selectedMatch.multiplier}).`);
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <section className="mt-12 pt-8 border-t-2 border-dashed border-danger/30" id="admin">
      <div className="bg-bg-secondary/90 border-2 border-danger/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        
        {/* Ribbon Service Role */}
        <div className="absolute top-0 right-0 bg-danger text-text-primary font-display text-[10px] tracking-widest px-3 py-1 rounded-bl-lg font-bold flex items-center gap-1">
          <ShieldAlert className="w-3 h-3" />
          <span>PAINEL DO ADMIN (SERVICE_ROLE)</span>
        </div>

        <div className="mb-4">
          <h3 className="font-display text-lg text-danger font-bold tracking-wide">
            SIMULADOR DO BACKEND — CADASTRO DE RESULTADO OFICIAL
          </h3>
          <p className="text-xs text-text-secondary">
            Simula a submissão protegida via RLS e disparo de Webhook para a Edge Function <code className="text-border-gold">calculate_points</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* Seletor de Jogo */}
          <div>
            <label className="block text-[11px] font-semibold text-text-secondary mb-1">
              Escolher Confronto:
            </label>
            <select
              value={selectedMatchId}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                setSelectedMatchId(id);
                const m = matches.find((x) => x.id === id);
                if (m) {
                  setScoreA(m.scoreA ?? 0);
                  setScoreB(m.scoreB ?? 0);
                }
              }}
              className="w-full bg-bg-primary border border-danger/30 rounded p-2 text-xs text-text-primary focus:outline-none focus:border-danger"
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  #{m.id} - {m.stage.toUpperCase()} ({m.teamA} vs {m.teamB})
                </option>
              ))}
            </select>
          </div>

          {/* Placar Final Oficial */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-text-secondary mb-1 truncate">
                Gols {teamAInfo?.name || selectedMatch.teamA}:
              </label>
              <input
                type="number"
                min="0"
                value={scoreA}
                onChange={(e) => setScoreA(parseInt(e.target.value) || 0)}
                className="w-full bg-bg-primary border border-border-gold/30 rounded p-2 text-xs font-display text-border-gold text-center"
              />
            </div>
            <span className="font-display text-lg text-text-secondary pb-1">×</span>
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-text-secondary mb-1 truncate">
                Gols {teamBInfo?.name || selectedMatch.teamB}:
              </label>
              <input
                type="number"
                min="0"
                value={scoreB}
                onChange={(e) => setScoreB(parseInt(e.target.value) || 0)}
                className="w-full bg-bg-primary border border-border-gold/30 rounded p-2 text-xs font-display text-text-primary text-center"
              />
            </div>
          </div>

          {/* Botão Salvar Placar */}
          <div>
            <button
              onClick={handleRegisterResult}
              className="w-full bg-danger hover:bg-danger/80 text-text-primary font-bold text-xs py-2.5 px-4 rounded transition-all flex items-center justify-center gap-1 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Gravar Placar Oficial</span>
            </button>
          </div>

        </div>

        {/* Informação do Palpite Existente */}
        <div className="mt-3 pt-3 border-t border-danger/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-text-secondary">
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-border-gold" />
            <span>Palpite Atual do Usuário:</span>
            <strong className="text-text-primary">
              {predictions[selectedMatch.id] 
                ? `${predictions[selectedMatch.id].scoreA} × ${predictions[selectedMatch.id].scoreB}` 
                : 'Nenhum Palpite Salvo'}
            </strong>
          </div>

          <div className="text-[10px] text-border-gold">
            Peso do Jogo: <strong className="text-text-primary">×{selectedMatch.multiplier}</strong>
          </div>
        </div>

        {/* Feedback visual de gravação */}
        {feedback && (
          <div className="mt-3 bg-accent-green/20 text-accent-green border border-accent-green/40 p-2.5 rounded text-xs font-medium animate-fade-in flex items-center gap-2">
            <span>✅</span>
            <span>{feedback}</span>
          </div>
        )}

      </div>
    </section>
  );
}
