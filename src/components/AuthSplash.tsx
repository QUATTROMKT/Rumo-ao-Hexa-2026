import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { Trophy, Sparkles, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export function AuthSplash() {
  const { login } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [magicSent, setMagicSent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  
  // Controle das 3 telas de Onboarding interativo
  const [onboardingStep, setOnboardingStep] = useState<number>(0); 

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError(null);
    if (!termsAccepted) {
      setFeedbackError('Você precisa aceitar os Termos de Uso para prosseguir.');
      return;
    }
    if (!emailInput) return;

    setMagicSent(true);
    // Chamada real à API do Supabase para Magic Link OTP
    const { error } = await supabase.auth.signInWithOtp({
      email: emailInput,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      setFeedbackError(error.message);
      setMagicSent(false);
    } else {
      setTimeout(() => {
        setOnboardingStep(1);
      }, 1500);
    }
  };

  const handleDirectGoogleLogin = async () => {
    setFeedbackError(null);
    if (!termsAccepted) {
      setFeedbackError('Você precisa aceitar os Termos de Uso para prosseguir.');
      return;
    }
    
    // Dispara OAuth com Google via Supabase em produção
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      setFeedbackError(error.message);
    }
  };

  const handleCompleteOnboarding = () => {
    // Para Magic Link em testes ou fallback se o redirecionamento estiver local
    login('magic');
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col justify-between relative overflow-hidden selection:bg-border-gold selection:text-bg-primary">
      
      {/* Fundo Torcida de Fundo com Overlay Verde Escuro */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1800&auto=format&fit=crop&q=80" 
          alt="Torcida Brasileira" 
          className="w-full h-full object-cover filter brightness-75 scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-bg-primary/85 backdrop-blur-[2px]" />
        
        {/* Watermark Histórico */}
        <div className="absolute top-1/4 -left-20 font-watermark text-[18rem] text-border-gold/5 select-none pointer-events-none transform -rotate-12">
          1958
        </div>
        <div className="absolute bottom-10 -right-20 font-watermark text-[16rem] text-border-gold/5 select-none pointer-events-none transform rotate-12">
          2002
        </div>
      </div>

      <div className="relative z-10 pt-6 px-6 text-center">
        <div className="inline-flex items-center gap-1.5 bg-bg-secondary/80 border border-border-gold/30 px-3 py-1 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-accent-yellow animate-spin" />
          <span className="text-[10px] font-display tracking-widest text-border-gold uppercase font-bold">
            🏆 O BOLÃO OFICIAL DA COPA DO MUNDO 2026
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 max-w-md mx-auto w-full">
        
        {/* STEP 0: Splash & Login */}
        {onboardingStep === 0 && (
          <div className="glass-card w-full p-6 sm:p-8 flex flex-col items-center text-center relative shadow-2xl animate-fade-in border-border-gold/40">
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary border-2 border-border-gold flex items-center justify-center shadow-gold-glow mb-4 relative">
              <Trophy className="w-8 h-8 text-border-gold animate-bounce duration-1000" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent-green rounded-full border border-border-gold" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-border-gold font-bold tracking-wider leading-none">
              RUMO AO HEXA
            </h1>
            <div className="text-xs font-sans text-accent-green uppercase font-extrabold tracking-widest mt-1 mb-3">
              COPA DO MUNDO 2026
            </div>

            <p className="text-xs text-text-primary/90 italic font-serif leading-relaxed mb-4 px-2">
              "Seu bolão da copa é aqui!"
            </p>

            {feedbackError && (
              <div className="w-full mb-3 p-2 bg-danger/20 border border-danger/40 rounded text-xs text-danger font-medium animate-fade-in">
                {feedbackError}
              </div>
            )}

            {/* Opções de Autenticação */}
            <div className="w-full space-y-3">
              
              <button
                onClick={handleDirectGoogleLogin}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 shadow-lg group font-display tracking-wide text-base"
              >
                <svg className="w-4 h-4 fill-current text-accent-yellow" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Entrar com Google</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-1" />
              </button>

              <div className="flex items-center gap-2 my-2">
                <div className="h-px bg-border-gold/10 flex-1" />
                <span className="text-[10px] font-sans text-text-secondary uppercase">ou Magic Link</span>
                <div className="h-px bg-border-gold/10 flex-1" />
              </div>

              <form onSubmit={handleMagicLink} className="space-y-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-secondary absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail principal"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-bg-primary/90 border border-border-gold/20 rounded-lg pl-9 pr-3 py-2 text-xs text-text-primary focus:outline-none focus:border-border-gold placeholder:text-text-secondary/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={magicSent}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    magicSent 
                      ? 'bg-accent-green/20 border-accent-green text-accent-green font-bold' 
                      : 'bg-bg-secondary text-text-primary border-border-gold/30 hover:border-border-gold'
                  }`}
                >
                  {magicSent ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Link de acesso enviado!</span>
                    </>
                  ) : (
                    <span>Receber Acesso sem Senha</span>
                  )}
                </button>
              </form>

            </div>

            <div className="mt-5 pt-4 border-t border-border-gold/10 w-full text-left">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-border-gold/30 text-border-gold focus:ring-0 accent-border-gold"
                />
                <span className="text-[10px] text-text-secondary leading-tight">
                  Concordo expressamente com os <a href="#termos" className="text-border-gold underline">Termos de Uso</a> e <a href="#privacidade" className="text-border-gold underline">Política de Privacidade</a> (SaaS exclusivo de entretenimento privado).
                </span>
              </label>
            </div>

            {/* Atalho de testes rápidos para Vercel Preview */}
            <div className="mt-3 text-center">
              <button 
                onClick={() => {
                  setTermsAccepted(true);
                  setOnboardingStep(1);
                }} 
                className="text-[9px] text-text-secondary/40 hover:text-text-secondary underline"
              >
                Pular direto para demonstração (Modo Visitante)
              </button>
            </div>

          </div>
        )}

        {/* STEP 1: Onboarding Tela 1 */}
        {onboardingStep === 1 && (
          <div className="glass-card w-full p-6 text-center relative shadow-2xl animate-fade-in border-border-gold/40">
            <div className="text-[10px] font-display text-accent-green tracking-widest uppercase mb-1">
              Passo 1 de 3 • Regras Claras
            </div>
            <h2 className="font-display text-2xl text-border-gold font-bold tracking-wide mb-3">
              COMO FUNCIONA A PONTUAÇÃO
            </h2>
            
            <div className="space-y-2 text-left text-xs bg-bg-primary/60 p-3 rounded-xl border border-border-gold/10">
              <div className="flex justify-between items-center border-b border-border-gold/5 pb-1.5">
                <span className="text-border-gold font-bold">🎯 Placar Exato (Cravada)</span>
                <span className="font-display text-sm text-accent-yellow font-extrabold">25 pts</span>
              </div>
              <div className="flex justify-between items-center border-b border-border-gold/5 pb-1.5">
                <span className="text-text-primary">Vencedor + Saldo de Gols</span>
                <span className="font-display text-sm text-text-primary">18 pts</span>
              </div>
              <div className="flex justify-between items-center border-b border-border-gold/5 pb-1.5">
                <span className="text-text-primary">Vencedor + Gols de 1 Time</span>
                <span className="font-display text-sm text-text-primary">15 pts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Apenas Vencedor ou Empate</span>
                <span className="font-display text-sm text-text-secondary">10 pts</span>
              </div>
            </div>

            <div className="mt-3 p-2.5 bg-danger/10 border border-danger/20 rounded-lg text-left text-[11px] text-danger">
              <strong>Multiplicadores de Mata-Mata:</strong><br />
              Oitavas valem ×1.5, Quartas ×2.0, Semifinal ×2.5 e a <strong>Grande Final vale ×3.0</strong>!
            </div>

            <button
              onClick={() => setOnboardingStep(2)}
              className="w-full mt-4 btn-primary py-2.5 flex items-center justify-center gap-2"
            >
              <span>Entendido, próximo passo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Onboarding Tela 2 */}
        {onboardingStep === 2 && (
          <div className="glass-card w-full p-6 text-center relative shadow-2xl animate-fade-in border-border-gold/40">
            <div className="text-[10px] font-display text-accent-green tracking-widest uppercase mb-1">
              Passo 2 de 3 • Conecte-se
            </div>
            <h2 className="font-display text-2xl text-border-gold font-bold tracking-wide mb-2">
              LIGAS PRIVADAS & AMIGOS
            </h2>
            <p className="text-xs text-text-secondary mb-4">
              O Rumo ao Hexa brilha ao máximo em disputas fechadas.
            </p>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-bg-primary/80 p-3 rounded-xl border border-border-gold/20">
                <div className="text-xs font-bold text-border-gold mb-1">👑 Organizador</div>
                <p className="text-[10px] text-text-secondary leading-tight">
                  Cria ligas customizadas e recebe os acertos da galera externamente.
                </p>
              </div>
              <div className="bg-bg-primary/80 p-3 rounded-xl border border-border-gold/20">
                <div className="text-xs font-bold text-accent-green mb-1">🤝 Competidor</div>
                <p className="text-[10px] text-text-secondary leading-tight">
                  Entra via código de 6 caracteres e acompanha o ranking em Realtime.
                </p>
              </div>
            </div>

            <div className="mt-3 text-[10px] text-text-secondary/70 italic">
              Lembrete: Palpites bônus cravados com mais de 72h de antecedência ganham +3 pontos extras!
            </div>

            <button
              onClick={() => setOnboardingStep(3)}
              className="w-full mt-4 btn-primary py-2.5 flex items-center justify-center gap-2"
            >
              <span>Avançar para o Último Passo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: Onboarding Tela 3 */}
        {onboardingStep === 3 && (
          <div className="glass-card w-full p-6 text-center relative shadow-2xl animate-fade-in border-border-gold/40">
            <div className="text-[10px] font-display text-accent-yellow tracking-widest uppercase mb-1 animate-pulse">
              Passo Final • Missão Autorizada
            </div>
            <h2 className="font-display text-2xl text-border-gold font-bold tracking-wide mb-2">
              PRONTO PARA O COMBATE!
            </h2>
            <p className="text-xs text-text-primary/90 mb-4">
              Você tem até 5 minutos antes do apito inicial para editar qualquer resultado.
            </p>

            <div className="p-4 bg-gradient-to-r from-bg-secondary via-bg-primary to-bg-secondary rounded-xl border border-border-gold/30 mb-4">
              <ShieldCheck className="w-8 h-8 text-border-gold mx-auto mb-1 animate-bounce" />
              <div className="font-display text-sm text-accent-green tracking-wider font-bold">
                AMBIENTE PREPARADO DO ZERO
              </div>
              <div className="text-[10px] text-text-secondary mt-0.5">
                Acessando chaves oficiais da Copa do Mundo de 2026.
              </div>
            </div>

            <button
              onClick={handleCompleteOnboarding}
              className="w-full btn-primary py-3 font-display tracking-wider text-base shadow-gold-glow animate-pulse"
            >
              ENTRAR NO BOLÃO AGORA
            </button>
          </div>
        )}

      </div>

      <div className="relative z-10 pb-4 px-4 text-center text-[10px] text-text-secondary/60">
        Ambiente 100% Protegido • Lei Federal 14.790/2023 compatível • PWA Ready
      </div>

    </div>
  );
}
