import { useStore } from '@/store/useStore';
import { teamsData } from '@/mocks/world-cup-2026';
import { Award, Lock, Star, Zap, UserCheck, Shield } from 'lucide-react';

export function SpecialPredictionsCard() {
  const { specialPredictions, setSpecialPredictions } = useStore();

  // Simula travamento após o jogo de abertura
  const isLocked = false; // Permite edição no preview para o usuário brincar e ver o WOW effect

  const teamsList = Object.keys(teamsData);

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
            <span>PALPITES ESPECIAIS</span>
            <span className="text-xs font-sans font-normal text-accent-yellow px-2 py-0.5 bg-accent-yellow/10 border border-accent-yellow/20 rounded">
              Bônus Único
            </span>
          </h2>
          <p className="text-xs text-text-secondary">
            Escolhas de ouro travadas no apito inicial do Mundial. Acertos garantem até 50 pontos diretos!
          </p>
        </div>
        {isLocked && (
          <span className="text-xs text-border-gold flex items-center gap-1 bg-bg-secondary px-2.5 py-1 rounded border border-border-gold/20">
            <Lock className="w-3.5 h-3.5" /> Travados
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Campeão (50 pts) */}
        <div className="glass-card p-4 relative overflow-hidden group hover:border-border-gold/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-border-gold">
              <Award className="w-4 h-4 text-accent-yellow" />
              <span>Seleção Campeã</span>
            </div>
            <span className="text-[10px] font-bold text-bg-primary bg-border-gold px-1.5 py-0.5 rounded">
              50 pts
            </span>
          </div>
          
          <select
            disabled={isLocked}
            value={specialPredictions.champion || ''}
            onChange={(e) => setSpecialPredictions({ champion: e.target.value })}
            className="w-full bg-bg-secondary border border-border-gold/20 rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:border-border-gold"
          >
            <option value="">Selecione o Campeão</option>
            {teamsList.map((code) => (
              <option key={code} value={code}>
                {teamsData[code].flagEmoji} {teamsData[code].name}
              </option>
            ))}
          </select>
          <div className="text-[10px] text-text-secondary mt-1 italic">
            Quem levantará a taça em Nova York?
          </div>
        </div>

        {/* Vice-campeão (25 pts) */}
        <div className="glass-card p-4 relative overflow-hidden group hover:border-border-gold/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary">
              <Award className="w-4 h-4 text-silver" />
              <span>Vice-campeão</span>
            </div>
            <span className="text-[10px] font-bold text-bg-primary bg-silver px-1.5 py-0.5 rounded">
              25 pts
            </span>
          </div>
          
          <select
            disabled={isLocked}
            value={specialPredictions.runnerUp || ''}
            onChange={(e) => setSpecialPredictions({ runnerUp: e.target.value })}
            className="w-full bg-bg-secondary border border-border-gold/20 rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:border-border-gold"
          >
            <option value="">Selecione o Vice</option>
            {teamsList.map((code) => (
              <option key={code} value={code}>
                {teamsData[code].flagEmoji} {teamsData[code].name}
              </option>
            ))}
          </select>
          <div className="text-[10px] text-text-secondary mt-1 italic">
            O segundo lugar de maior prestígio.
          </div>
        </div>

        {/* Artilheiro (40 pts) */}
        <div className="glass-card p-4 relative overflow-hidden group hover:border-border-gold/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-border-gold">
              <Zap className="w-4 h-4 text-accent-yellow" />
              <span>Chuteira de Ouro (Artilheiro)</span>
            </div>
            <span className="text-[10px] font-bold text-bg-primary bg-border-gold px-1.5 py-0.5 rounded">
              40 pts
            </span>
          </div>
          
          <input
            type="text"
            disabled={isLocked}
            placeholder="Ex: Vini Jr, Mbappé, Haaland..."
            value={specialPredictions.topScorer || ''}
            onChange={(e) => setSpecialPredictions({ topScorer: e.target.value })}
            className="w-full bg-bg-secondary border border-border-gold/20 rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:border-border-gold placeholder:text-text-secondary/40"
          >
          </input>
          <div className="text-[10px] text-text-secondary mt-1 italic">
            Máximo goleador do torneio.
          </div>
        </div>

        {/* Melhor jogador (30 pts) */}
        <div className="glass-card p-4 relative overflow-hidden group hover:border-border-gold/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-border-gold">
              <Star className="w-4 h-4 text-accent-yellow" />
              <span>Bola de Ouro (Melhor Jogador)</span>
            </div>
            <span className="text-[10px] font-bold text-bg-primary bg-border-gold px-1.5 py-0.5 rounded">
              30 pts
            </span>
          </div>
          
          <input
            type="text"
            disabled={isLocked}
            placeholder="Ex: Rodrygo, Bellingham..."
            value={specialPredictions.bestPlayer || ''}
            onChange={(e) => setSpecialPredictions({ bestPlayer: e.target.value })}
            className="w-full bg-bg-secondary border border-border-gold/20 rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:border-border-gold placeholder:text-text-secondary/40"
          >
          </input>
          <div className="text-[10px] text-text-secondary mt-1 italic">
            Craque absoluto eleito pela FIFA.
          </div>
        </div>

        {/* Seleção surpresa (20 pts) */}
        <div className="glass-card p-4 relative overflow-hidden group hover:border-border-gold/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-green">
              <UserCheck className="w-4 h-4" />
              <span>Zebra / Surpresa (Pós-Oitavas)</span>
            </div>
            <span className="text-[10px] font-bold text-bg-primary bg-accent-green px-1.5 py-0.5 rounded">
              20 pts
            </span>
          </div>
          
          <select
            disabled={isLocked}
            value={specialPredictions.darkHorse || ''}
            onChange={(e) => setSpecialPredictions({ darkHorse: e.target.value })}
            className="w-full bg-bg-secondary border border-border-gold/20 rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:border-border-gold"
          >
            <option value="">Selecione a Surpresa</option>
            {teamsList.map((code) => (
              <option key={code} value={code}>
                {teamsData[code].flagEmoji} {teamsData[code].name}
              </option>
            ))}
          </select>
          <div className="text-[10px] text-text-secondary mt-1 italic">
            Seleção modesta que irá longe inesperadamente.
          </div>
        </div>

        {/* Fair play (10 pts) */}
        <div className="glass-card p-4 relative overflow-hidden group hover:border-border-gold/50 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
              <Shield className="w-4 h-4" />
              <span>Troféu Fair Play</span>
            </div>
            <span className="text-[10px] font-bold text-bg-primary bg-text-secondary px-1.5 py-0.5 rounded">
              10 pts
            </span>
          </div>
          
          <select
            disabled={isLocked}
            className="w-full bg-bg-secondary border border-border-gold/20 rounded-lg p-2 text-sm text-text-primary focus:outline-none focus:border-border-gold"
          >
            <option value="JPN">🇯🇵 Japão</option>
            <option value="KOR">🇰🇷 Coreia do Sul</option>
            <option value="SUI">🇨🇭 Suíça</option>
            <option value="CAN">🇨🇦 Canadá</option>
          </select>
          <div className="text-[10px] text-text-secondary mt-1 italic">
            Equipe mais disciplinada da competição.
          </div>
        </div>

      </div>
    </section>
  );
}
