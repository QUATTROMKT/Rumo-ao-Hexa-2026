import { Trophy, Flame, Heart, Target, Sparkles, ShieldCheck } from 'lucide-react';

interface Medal {
  id: string;
  title: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  color: string;
}

export function AchievementsGrid() {
  const achievements: Medal[] = [
    {
      id: 'first-exact',
      title: 'Atirador de Elite',
      description: 'Cravou o placar exato do seu primeiro jogo no Mundial.',
      icon: Target,
      unlocked: true,
      color: 'text-border-gold'
    },
    {
      id: 'streak-3',
      title: 'Em Chamas (+5 pts)',
      description: 'Atingiu uma sequência de 3 cravadas consecutivas.',
      icon: Flame,
      unlocked: true,
      color: 'text-danger animate-pulse'
    },
    {
      id: 'brazil-perfect',
      title: 'Coração Verde-Amarelo',
      description: 'Acertou o vencedor de todos os jogos do Brasil na fase de grupos.',
      icon: Heart,
      unlocked: true,
      color: 'text-accent-green'
    },
    {
      id: 'early-bird',
      title: 'Estrategista Nato',
      description: 'Deixou palpites cravados com mais de 72h de antecedência.',
      icon: Sparkles,
      unlocked: false,
      color: 'text-text-secondary'
    },
    {
      id: 'knockout-king',
      title: 'General do Hexa',
      description: 'Gabaritou uma chave inteira das oitavas de final.',
      icon: Trophy,
      unlocked: false,
      color: 'text-text-secondary'
    },
    {
      id: 'fair-play',
      title: 'Sentinela Impecável',
      description: 'Participou de todas as rodadas sem perder nenhum prazo de lock.',
      icon: ShieldCheck,
      unlocked: true,
      color: 'text-accent-yellow'
    }
  ];

  return (
    <section className="mt-12">
      <div className="mb-4 px-1">
        <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
          <span>MEDALHAS DE HONRA (ACHIEVEMENTS)</span>
          <span className="text-xs font-sans font-normal text-text-secondary px-2 py-0.5 bg-bg-secondary rounded-full border border-border-gold/10">
            Engajamento Contínuo
          </span>
        </h2>
        <p className="text-xs text-text-secondary">
          Conquistas desbloqueadas ao longo da campanha. Mostre sua patente militar no bolão!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {achievements.map((item) => {
          const IconComponent = item.icon;

          return (
            <div 
              key={item.id} 
              className={`glass-card p-3 flex flex-col items-center text-center relative transition-all ${
                item.unlocked 
                  ? 'border-border-gold/30 bg-gradient-to-b from-bg-secondary/40 to-bg-primary shadow-sm hover:scale-105' 
                  : 'opacity-40 grayscale border-dashed border-border-gold/10'
              }`}
            >
              {item.unlocked && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-border-gold rounded-full" />
              )}

              <div className={`p-2.5 rounded-full mb-2 ${item.unlocked ? 'bg-bg-primary border border-border-gold/20 shadow-inner' : 'bg-bg-secondary'}`}>
                <IconComponent className={`w-6 h-6 ${item.color}`} />
              </div>

              <div className="font-display text-xs text-text-primary tracking-wider font-bold line-clamp-1">
                {item.title}
              </div>

              <p className="text-[9px] text-text-secondary/80 mt-1 line-clamp-3 leading-tight">
                {item.description}
              </p>

              {/* Status Ribbon */}
              <div className="mt-2 w-full pt-1.5 border-t border-border-gold/5">
                <span className={`text-[8px] uppercase tracking-widest font-bold ${item.unlocked ? 'text-border-gold' : 'text-text-secondary/40'}`}>
                  {item.unlocked ? 'Desbloqueado' : 'Bloqueado'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
