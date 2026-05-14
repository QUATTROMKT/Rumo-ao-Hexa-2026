import { useState, useEffect } from 'react';
import { Match, teamsData } from '@/mocks/world-cup-2026';
import { useStore } from '@/store/useStore';
import { Lock, Plus, Minus, CheckCircle, Award } from 'lucide-react';
import { format, isBefore, subMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function MatchCard({ match }: { match: Match }) {
  const { predictions, setPrediction, soundEnabled } = useStore();
  const currentPrediction = predictions[match.id];

  const teamAInfo = teamsData[match.teamA];
  const teamBInfo = teamsData[match.teamB];

  // Placar local inline para UX responsiva e optimistic update
  const [scoreA, setLocalScoreA] = useState<number>(currentPrediction?.scoreA ?? 0);
  const [scoreB, setLocalScoreB] = useState<number>(currentPrediction?.scoreB ?? 0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Sincroniza estado inicial caso o store mude
  useEffect(() => {
    if (currentPrediction) {
      setLocalScoreA(currentPrediction.scoreA);
      setLocalScoreB(currentPrediction.scoreB);
    }
  }, [currentPrediction]);

  // Lock status: tranca 5 minutos antes
  const matchDate = new Date(match.startsAt);
  const lockDate = subMinutes(matchDate, 5);
  // Para fins de demonstração interativa WOW, tratamos jogos com match.status === 'finished' como lockados,
  // e jogos futuros como destrancados, a menos que a data atual já tenha passado.
  const isLocked = match.status === 'finished' || isBefore(lockDate, new Date());

  // Formatador de data e hora do fuso BR
  const formattedTime = format(matchDate, "HH:mm", { locale: ptBR });
  const lockTooltipTime = format(lockDate, "HH:mm");

  // Handler de alteração com Optimistic Update e som/confete em caso de cravada simulada
  const handleScoreChange = (newA: number, newB: number) => {
    if (isLocked) return;
    const validA = Math.max(0, newA);
    const validB = Math.max(0, newB);
    
    setLocalScoreA(validA);
    setLocalScoreB(validB);

    // Optimistic Save
    setPrediction(match.id, validA, validB);

    // Se o usuário palpitar 2x1 no jogo do México (ID 3) ou 2x1 simulado, disparamos a microanimação de confete
    if (validA === 2 && validB === 1 && soundEnabled) {
      setShowConfetti(true);
      // Toca som sintético curto via Web Audio API para não depender de arquivos externos pesados
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // Nota A4
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // Sobe para A5 (Gol!)
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {
        // AudioContext pode ser bloqueado sem interação anterior
      }
      setTimeout(() => setShowConfetti(false), 2500);
    }
  };

  return (
    <div 
      className={`glass-card p-4 transition-all duration-300 relative group overflow-hidden ${
        isLocked ? 'bg-bg-secondary/80 border-border-gold/5' : 'hover:scale-[1.02] hover:border-border-gold/50 hover:shadow-gold-glow'
      }`}
    >
      {/* Confete Efeito Especial Visual */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
          <div className="absolute w-2 h-2 bg-accent-yellow rounded-full animate-bounce left-1/4 top-2 duration-300" />
          <div className="absolute w-3 h-3 bg-accent-green rounded left-1/3 top-1 duration-500 animate-spin" />
          <div className="absolute w-2 h-2 bg-border-gold rounded-full right-1/4 top-3 duration-700 animate-ping" />
          <div className="absolute w-4 h-1 bg-accent-yellow right-1/3 top-4 duration-1000 rotate-45" />
          <div className="text-xs font-display text-accent-yellow bg-bg-primary/90 px-3 py-1 rounded-full border border-border-gold animate-bounce">
            🎉 PALPITE CRAVADO! GOL!
          </div>
        </div>
      )}

      {/* Cabeçalho do Jogo */}
      <div className="flex items-center justify-between border-b border-border-gold/10 pb-2.5 mb-3 text-xs">
        <div className="flex items-center gap-2 text-text-secondary">
          <span className="font-semibold text-border-gold">
            {match.stage === 'group' ? `Grupo ${match.groupLetter}` : match.stage.toUpperCase()}
          </span>
          <span>•</span>
          <span className="truncate max-w-[140px]">{match.stadium}</span>
          {match.multiplier > 1.0 && (
            <span className="bg-border-gold/20 text-border-gold px-1.5 py-0.5 rounded font-bold text-[10px]">
              ×{match.multiplier}
            </span>
          )}
        </div>

        {/* Lock visual ou Status Horário */}
        <div className="flex items-center gap-1.5">
          {isLocked ? (
            <div 
              className="flex items-center gap-1 text-border-gold bg-border-gold/10 px-2 py-0.5 rounded text-[10px]"
              title={`Palpite trancado às ${lockTooltipTime} (5min antes)`}
            >
              <Lock className="w-3 h-3" />
              <span>Trancado</span>
            </div>
          ) : (
            <span className="text-accent-green font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              {formattedTime}
            </span>
          )}
        </div>
      </div>

      {/* Corpo do Confronto & Inputs Inline */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Time A */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-3xl sm:text-4xl select-none flex-shrink-0" role="img" aria-label={teamAInfo?.name}>
            {teamAInfo?.flagEmoji}
          </span>
          <div className="min-w-0">
            <div className="font-display text-base sm:text-lg text-text-primary truncate tracking-wide">
              {teamAInfo?.name}
            </div>
            <div className="text-[10px] text-text-secondary/60 font-sans">
              {match.teamA}
            </div>
          </div>
        </div>

        {/* Placar / Controles do Palpite */}
        <div className="flex items-center gap-1.5 sm:gap-3 bg-bg-primary/90 px-2.5 py-1.5 rounded-xl border border-border-gold/20 shadow-inner flex-shrink-0">
          {/* Input Score A */}
          <div className="flex items-center gap-1">
            {!isLocked && (
              <button 
                onClick={() => handleScoreChange(scoreA - 1, scoreB)}
                className="p-1 text-text-secondary hover:text-danger hover:bg-danger/10 rounded transition-colors"
                title="Diminuir gol"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            )}
            <span className={`font-display text-xl sm:text-2xl font-bold w-6 text-center select-none ${currentPrediction ? 'text-border-gold' : 'text-text-secondary/40'}`}>
              {scoreA}
            </span>
            {!isLocked && (
              <button 
                onClick={() => handleScoreChange(scoreA + 1, scoreB)}
                className="p-1 text-text-secondary hover:text-accent-green hover:bg-accent-green/10 rounded transition-colors"
                title="Adicionar gol"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <span className="font-display text-lg text-text-secondary/40 select-none">×</span>

          {/* Input Score B */}
          <div className="flex items-center gap-1">
            {!isLocked && (
              <button 
                onClick={() => handleScoreChange(scoreA, scoreB + 1)}
                className="p-1 text-text-secondary hover:text-accent-green hover:bg-accent-green/10 rounded transition-colors"
                title="Adicionar gol"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
            <span className={`font-display text-xl sm:text-2xl font-bold w-6 text-center select-none ${currentPrediction ? 'text-text-primary' : 'text-text-secondary/40'}`}>
              {scoreB}
            </span>
            {!isLocked && (
              <button 
                onClick={() => handleScoreChange(scoreA, scoreB - 1)}
                className="p-1 text-text-secondary hover:text-danger hover:bg-danger/10 rounded transition-colors"
                title="Diminuir gol"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Time B */}
        <div className="flex items-center gap-2.5 flex-1 justify-end min-w-0 text-right">
          <div className="min-w-0 order-2 sm:order-1">
            <div className="font-display text-base sm:text-lg text-text-primary truncate tracking-wide">
              {teamBInfo?.name}
            </div>
            <div className="text-[10px] text-text-secondary/60 font-sans">
              {match.teamB}
            </div>
          </div>
          <span className="text-3xl sm:text-4xl select-none flex-shrink-0 order-1 sm:order-2" role="img" aria-label={teamBInfo?.name}>
            {teamBInfo?.flagEmoji}
          </span>
        </div>

      </div>

      {/* Se o jogo terminou, mostra o placar oficial real e pontos calculados */}
      {match.status === 'finished' && (
        <div className="mt-3 pt-2.5 border-t border-border-gold/10 flex items-center justify-between text-xs bg-bg-primary/40 -mx-4 -mb-4 px-4 py-2">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <span className="font-medium text-[11px]">Resultado Oficial:</span>
            <span className="font-display tracking-wider text-text-primary font-bold">
              {match.scoreA} × {match.scoreB}
            </span>
          </div>

          {currentPrediction ? (
            <div className="flex items-center gap-1.5 text-accent-green font-bold text-xs bg-accent-green/10 px-2 py-0.5 rounded border border-accent-green/20 animate-pulse">
              <Award className="w-3.5 h-3.5 text-border-gold" />
              <span>+{currentPrediction.pointsAwarded} Pontos</span>
              {currentPrediction.isExact && (
                <span className="text-[9px] uppercase bg-border-gold text-bg-primary px-1 rounded font-extrabold ml-1">
                  Cravada!
                </span>
              )}
            </div>
          ) : (
            <span className="text-danger text-[10px] font-medium">
              Sem palpite trancado (0 pts)
            </span>
          )}
        </div>
      )}

      {/* Subtítulo indicando se o palpite foi salvo */}
      {!isLocked && currentPrediction && (
        <div className="mt-2 text-[10px] text-accent-green flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
          <CheckCircle className="w-3 h-3" />
          <span>Palpite salvo automaticamente</span>
        </div>
      )}

    </div>
  );
}
