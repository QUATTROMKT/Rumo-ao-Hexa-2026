import { useState, useEffect } from 'react';
import { matches, teamsData } from '@/mocks/world-cup-2026';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export function CountdownCard({ onSelectMatch }: { onSelectMatch?: (matchId: number) => void }) {
  // Próximo jogo do Brasil (ID 1: BRA vs FRA)
  const nextMatch = matches.find((m) => m.teamA === 'BRA' || m.teamB === 'BRA') || matches[0];
  const teamAInfo = teamsData[nextMatch.teamA];
  const teamBInfo = teamsData[nextMatch.teamB];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(nextMatch.startsAt).getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [nextMatch.startsAt]);

  return (
    <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-border-gold via-accent-yellow to-border-gold animate-border-glow shadow-gold-glow overflow-hidden mt-6">
      
      {/* Camada Interna Premium */}
      <div className="bg-bg-primary rounded-[14px] p-5 sm:p-6 relative z-10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Watermark Brasil Destaque */}
        <div className="absolute -left-12 -bottom-16 font-watermark text-9xl text-accent-green/5 select-none pointer-events-none transform -rotate-12">
          HEXA
        </div>

        {/* Info do Jogo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-1.5 bg-accent-green/10 border border-accent-green/30 text-accent-green text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-yellow animate-spin" />
            Destaque Rumo ao Hexa
          </div>

          <div className="text-xs text-text-secondary font-medium flex items-center gap-2">
            <span>Grupo {nextMatch.groupLetter}</span>
            <span>•</span>
            <span>{nextMatch.stadium}</span>
          </div>

          {/* Confronto */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl select-none" role="img" aria-label={teamAInfo?.name}>
                {teamAInfo?.flagEmoji}
              </span>
              <span className="font-display text-lg tracking-wider text-border-gold mt-1">
                {teamAInfo?.name}
              </span>
            </div>

            <div className="font-display text-2xl text-text-secondary/50 font-bold px-2">
              VS
            </div>

            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl select-none" role="img" aria-label={teamBInfo?.name}>
                {teamBInfo?.flagEmoji}
              </span>
              <span className="font-display text-lg tracking-wider text-text-primary mt-1">
                {teamBInfo?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Contador & CTA */}
        <div className="flex flex-col items-center md:items-end w-full md:w-auto border-t md:border-t-0 md:border-l border-border-gold/10 pt-4 md:pt-0 md:pl-6">
          <div className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
            Contagem Regressiva
          </div>

          {/* Display Numérico */}
          <div className="flex items-center gap-2 sm:gap-3 bg-bg-secondary border border-border-gold/20 px-4 py-2.5 rounded-xl shadow-inner">
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-border-gold leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-text-secondary uppercase mt-0.5">Dias</span>
            </div>
            <span className="text-border-gold font-bold text-lg leading-none animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-text-secondary uppercase mt-0.5">Hrs</span>
            </div>
            <span className="text-border-gold font-bold text-lg leading-none animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-text-primary leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-text-secondary uppercase mt-0.5">Min</span>
            </div>
            <span className="text-border-gold font-bold text-lg leading-none animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <span className="font-display text-2xl sm:text-3xl font-bold text-accent-green leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-text-secondary uppercase mt-0.5">Seg</span>
            </div>
          </div>

          {/* Botão de Palpite */}
          <button
            onClick={() => onSelectMatch?.(nextMatch.id)}
            className="w-full sm:w-auto mt-4 btn-primary flex items-center justify-center gap-2 group"
          >
            <span>Fazer Palpite Agora</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-1 text-[10px] text-text-secondary/70 mt-2">
            <ShieldCheck className="w-3 h-3 text-border-gold" />
            <span>Tranca 5min antes do apito</span>
          </div>
        </div>

      </div>

    </div>
  );
}
