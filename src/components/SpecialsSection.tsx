import { useState } from 'react';
import { Sparkles, HelpCircle, Trophy, Star } from 'lucide-react';

interface HistoryYear {
  year: string;
  host: string;
  hero: string;
  quote: string;
  bgImg: string;
}

export function SpecialsSection() {
  const [selectedYear, setSelectedYear] = useState<string>('1970');
  const [brTopScorer, setBrTopScorer] = useState<string>('Vini Jr');
  const [brReachesFinal, setBrReachesFinal] = useState<string>('yes');

  const historyData: HistoryYear[] = [
    {
      year: '1958',
      host: 'Suécia',
      hero: 'Pelé & Garrincha',
      quote: 'O surgimento do Rei com apenas 17 anos e a afirmação do futebol arte para o planeta.',
      bgImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80'
    },
    {
      year: '1962',
      host: 'Chile',
      hero: 'Garrincha (O Anjo de Pernas Tortas)',
      quote: 'Com a lesão de Pelé, Garrincha chamou a responsabilidade e conduziu o bicampeonato absoluto.',
      bgImg: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80'
    },
    {
      year: '1970',
      host: 'México',
      hero: 'O Esquadrão de Ouro',
      quote: 'Considerada a melhor seleção de todos os tempos. Pelé, Tostão, Rivelino, Jairzinho e Gérson.',
      bgImg: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=80'
    },
    {
      year: '1994',
      host: 'Estados Unidos',
      hero: 'Romário & Bebeto',
      quote: 'O fim do jejum de 24 anos sob o calor escaldante americano e o inesquecível "É Teta!"',
      bgImg: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80'
    },
    {
      year: '2002',
      host: 'Coreia do Sul & Japão',
      hero: 'Ronaldo Fenômeno',
      quote: 'A redenção perfeita com 8 gols na Copa e a conquista invicta sob o comando de Felipão.',
      bgImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const currentTriumph = historyData.find((h) => h.year === selectedYear) || historyData[2];

  return (
    <section className="mt-12" id="specials">
      <div className="mb-4 px-1">
        <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
          <span>ESPECIAIS "RUMO AO HEXA"</span>
          <span className="text-xs font-sans font-normal text-bg-primary px-2 py-0.5 bg-border-gold rounded font-bold">
            Exclusivo Seleção
          </span>
        </h2>
        <p className="text-xs text-text-secondary">
          Mergulhe no passado glorioso e faça previsões de alto risco dedicadas à campanha brasileira.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Histórico (2 colunas em telas grandes) */}
        <div className="lg:col-span-2 glass-card p-5 relative overflow-hidden flex flex-col justify-between">
          
          {/* Watermark do ano selecionado */}
          <div className="absolute right-2 bottom-2 font-watermark text-9xl text-border-gold/5 select-none pointer-events-none transform rotate-6">
            {selectedYear}
          </div>

          <div>
            <div className="text-xs font-bold text-accent-green uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-border-gold" />
              <span>Memória Viva das 5 Estrelas</span>
            </div>

            {/* Abas dos anos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {historyData.map((item) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className={`px-3 py-1.5 rounded-lg font-display text-base transition-all tracking-wider ${
                    selectedYear === item.year 
                      ? 'bg-border-gold text-bg-primary font-bold shadow-md scale-105' 
                      : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-border-gold/20'
                  }`}
                >
                  ★ {item.year}
                </button>
              ))}
            </div>

            {/* Quadro de Destaque da Conquista */}
            <div className="bg-bg-primary/90 border border-border-gold/30 rounded-xl p-4 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-border-gold font-bold mb-1">
                <span>Sede: {currentTriumph.host}</span>
                <span className="text-[10px] bg-border-gold/10 px-2 py-0.5 rounded text-text-primary">
                  Heróis: {currentTriumph.hero}
                </span>
              </div>

              <h4 className="font-display text-2xl text-text-primary tracking-wide mt-2">
                A GLÓRIA DE {currentTriumph.year}
              </h4>

              <p className="text-xs text-text-secondary italic mt-2 leading-relaxed">
                "{currentTriumph.quote}"
              </p>
            </div>
          </div>

          {/* Curiosidade Fixa */}
          <div className="mt-4 pt-3 border-t border-border-gold/10 flex items-start gap-2 text-[11px] text-text-secondary/90 bg-bg-secondary/40 p-2.5 rounded-lg">
            <Sparkles className="w-4 h-4 text-accent-yellow flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <strong>Você Sabia?</strong> Em 1970, Pelé fez 1.281 gols na carreira até aquele Mundial. No México, ele imortalizou o drible de corpo no goleiro Mazurkiewicz e o gol de cabeça na final contra a Itália.
            </div>
          </div>

        </div>

        {/* Coluna Palpites Exclusivos do Brasil */}
        <div className="glass-card p-5 flex flex-col justify-between bg-gradient-to-b from-bg-secondary/30 via-bg-primary to-bg-secondary/30">
          
          <div>
            <div className="text-xs font-bold text-border-gold uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-accent-yellow" />
              <span>Palpites Especiais Brasil</span>
            </div>

            {/* Pergunta 1: Artilheiro do Brasil */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-text-primary mb-1">
                Quem será o artilheiro do Brasil na Copa?
              </label>
              <input 
                type="text"
                value={brTopScorer}
                onChange={(e) => setBrTopScorer(e.target.value)}
                placeholder="Ex: Vini Jr, Endrick, Rodrygo..."
                className="w-full bg-bg-primary border border-border-gold/30 rounded p-2 text-xs text-border-gold font-bold focus:outline-none focus:border-border-gold"
              />
              <span className="text-[9px] text-text-secondary mt-1 block">
                Vale +20 pontos se acertar o artilheiro isolado da nossa seleção.
              </span>
            </div>

            {/* Pergunta 2: Brasil na Final? */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-text-primary mb-1">
                O Brasil chega à Grande Final?
              </label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => setBrReachesFinal('yes')}
                  className={`p-2 text-xs rounded-lg font-bold border transition-all ${
                    brReachesFinal === 'yes' 
                      ? 'bg-accent-green text-bg-primary border-accent-green shadow' 
                      : 'bg-bg-secondary text-text-secondary border-border-gold/10 hover:text-text-primary'
                  }`}
                >
                  Sim, Rumo ao Hexa!
                </button>
                <button
                  onClick={() => setBrReachesFinal('no')}
                  className={`p-2 text-xs rounded-lg font-bold border transition-all ${
                    brReachesFinal === 'no' 
                      ? 'bg-danger text-text-primary border-danger shadow' 
                      : 'bg-bg-secondary text-text-secondary border-border-gold/10 hover:text-text-primary'
                  }`}
                >
                  Cai antes (Zica)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border-gold/10 text-center">
            <span className="inline-flex items-center gap-1 text-[10px] font-display text-border-gold bg-border-gold/10 px-3 py-1 rounded-full border border-border-gold/20">
              ★ BADGE RUMO AO HEXA ATIVADO
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
