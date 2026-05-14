import { useState, useEffect } from 'react';
import { HelpCircle, FileText, Shield, Info, LifeBuoy } from 'lucide-react';

const curiousFacts = [
  "Em 1970, Pelé fez 1.281 gols na carreira até aquele Mundial, consolidando o tricampeonato histórico no México.",
  "O Brasil é a única seleção a participar de todas as edições da Copa do Mundo, conquistando as taças em '58, '62, '70, '94 e '02.",
  "A taça Jules Rimet foi roubada duas vezes: uma em Londres (1966) e outra no Rio de Janeiro (1983), onde acabou sendo derretida.",
  "Na Copa de 1958, o adolescente Pelé com apenas 17 anos marcou 6 gols a partir das quartas de final, chocando o mundo da bola.",
  "Ronaldo Fenômeno cravou 8 gols na Copa de 2002 na Coreia e Japão, superando o fantasma de 1998 com o inesquecível corte cascão."
];

export function Footer() {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % curiousFacts.length);
    }, 8000); // Rotação suave a cada 8s para visualização dinâmica do usuário
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="mt-16 bg-bg-secondary border-t border-border-gold/10 py-8 px-4 relative overflow-hidden">
      {/* Watermarks Históricos */}
      <div className="absolute -right-10 -bottom-10 font-watermark text-9xl text-border-gold/5 select-none pointer-events-none transform rotate-12">
        1970
      </div>
      <div className="absolute -left-10 top-0 font-watermark text-8xl text-border-gold/5 select-none pointer-events-none transform -rotate-12">
        1958
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 relative z-10">
        
        {/* Fato Curioso do Dia */}
        <div className="w-full max-w-2xl bg-bg-primary/80 border border-border-gold/20 rounded-xl p-4 text-center shadow-lg relative">
          <div className="text-[10px] font-display tracking-widest text-border-gold uppercase mb-1">
            💡 Fato Curioso do Dia
          </div>
          <p className="text-xs sm:text-sm text-text-primary italic font-serif min-h-[40px] flex items-center justify-center transition-all duration-500">
            "{curiousFacts[factIndex]}"
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {curiousFacts.map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === factIndex ? 'bg-border-gold' : 'bg-border-gold/20'}`} 
              />
            ))}
          </div>
        </div>

        {/* Links Globais */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-text-secondary">
          <a href="#como-pontua" className="hover:text-border-gold flex items-center gap-1 transition-colors">
            <Info className="w-3.5 h-3.5 text-accent-green" /> Como pontua
          </a>
          <a href="#termos" className="hover:text-border-gold flex items-center gap-1 transition-colors">
            <FileText className="w-3.5 h-3.5" /> Termos de Uso
          </a>
          <a href="#privacidade" className="hover:text-border-gold flex items-center gap-1 transition-colors">
            <Shield className="w-3.5 h-3.5" /> Privacidade
          </a>
          <a href="#faq" className="hover:text-border-gold flex items-center gap-1 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </a>
          <a href="#suporte" className="hover:text-border-gold flex items-center gap-1 transition-colors">
            <LifeBuoy className="w-3.5 h-3.5" /> Suporte
          </a>
        </div>

        {/* Disclaimer Jurídico Crítico */}
        <div className="max-w-3xl text-center text-[10px] text-text-secondary/60 border-t border-border-gold/5 pt-4">
          <p>
            ⚠️ <strong>Aviso Legal:</strong> Este é um produto de entretenimento destinado a grupos fechados e ligas privadas. A plataforma Rumo ao Hexa não opera loterias, não atua como casa de apostas e não realiza a custódia nem distribuição de prêmios em dinheiro.
          </p>
          <p className="mt-1">
            © 2026 Rumo ao Hexa. Estética "Brasil Militar Metálico" premium. Feito para a torcida brasileira.
          </p>
        </div>

      </div>
    </footer>
  );
}
