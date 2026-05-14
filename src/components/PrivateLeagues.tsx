import { useState } from 'react';
import { Users, Plus, Key, Sparkles, Check, Info, ShieldAlert } from 'lucide-react';

interface League {
  id: string;
  name: string;
  banner: string;
  organizer: string;
  isPremium: boolean;
  participantsCount: number;
  maxParticipants: number;
  joinCode: string;
  prizeNote: string;
}

export function PrivateLeagues() {
  const [leagues, setLeagues] = useState<League[]>([
    {
      id: 'lg-1',
      name: 'Resenha & Cerveja — Copa 26',
      banner: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80',
      organizer: 'Capitão Cadu (Você)',
      isPremium: true,
      participantsCount: 42,
      maxParticipants: 200,
      joinCode: 'HEXA26',
      prizeNote: 'Acerto PIX de R$ 50 direto com o Organizador.'
    },
    {
      id: 'lg-2',
      name: 'Firma Tech Corp',
      banner: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&auto=format&fit=crop&q=80',
      organizer: 'Diretoria RH',
      isPremium: false,
      participantsCount: 10,
      maxParticipants: 10,
      joinCode: 'TECH10',
      prizeNote: 'Prêmio simbólico: Camisa oficial da Seleção.'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  
  // State criação
  const [newLeagueName, setNewLeagueName] = useState('');
  const [newLeaguePrize, setNewLeaguePrize] = useState('');
  const [isPremiumSelect, setIsPremiumSelect] = useState(true);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCreateLeague = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeagueName) return;

    const newLg: League = {
      id: `lg-${Date.now()}`,
      name: newLeagueName,
      banner: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
      organizer: 'Capitão Cadu (Você)',
      isPremium: isPremiumSelect,
      participantsCount: 1,
      maxParticipants: isPremiumSelect ? 200 : 10,
      joinCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      prizeNote: newLeaguePrize || 'Sem premiação externa combinada.'
    };

    setLeagues([newLg, ...leagues]);
    setNewLeagueName('');
    setNewLeaguePrize('');
    setShowCreateModal(false);
    
    setFeedback(`Liga "${newLg.name}" criada com sucesso! Código de convite: ${newLg.joinCode}`);
    setTimeout(() => setFeedback(null), 6000);
  };

  const handleJoinLeague = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput) return;

    setFeedback(`Solicitação de entrada enviada para o código "${joinCodeInput.toUpperCase()}".`);
    setJoinCodeInput('');
    setShowJoinModal(false);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <section className="mt-12" id="leagues">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 px-1">
        <div>
          <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
            <span>LIGAS PRIVADAS</span>
            <span className="text-xs font-sans font-normal text-bg-primary px-2 py-0.5 bg-border-gold rounded font-bold">
              Modelo Freemium
            </span>
          </h2>
          <p className="text-xs text-text-secondary">
            Convide sua turma, defina as regras externas e deixe a gestão do ranking e pontuação com o app.
          </p>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-bg-secondary hover:bg-bg-primary text-text-primary border border-border-gold/30 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-border-gold" />
            <span>Entrar com Código</span>
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Criar Nova Liga</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className="mb-4 bg-accent-green/10 border border-accent-green/30 p-3 rounded-xl text-xs text-text-primary flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-border-gold flex-shrink-0" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-text-secondary font-bold px-2">×</button>
        </div>
      )}

      {/* Grid de Ligas do Usuário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leagues.map((lg) => (
          <div key={lg.id} className="glass-card overflow-hidden flex flex-col justify-between group">
            
            {/* Banner Customizado da Liga */}
            <div className="h-32 w-full relative overflow-hidden bg-bg-primary">
              <img 
                src={lg.banner} 
                alt={lg.name} 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/40 to-transparent" />
              
              {/* Badges do Header */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                {lg.isPremium ? (
                  <span className="bg-border-gold text-bg-primary font-display text-[10px] tracking-widest px-2 py-0.5 rounded font-extrabold shadow">
                    ★ PREMIUM
                  </span>
                ) : (
                  <span className="bg-bg-primary/80 text-text-secondary font-sans text-[10px] px-2 py-0.5 rounded border border-border-gold/20">
                    Gratuita (10 máx)
                  </span>
                )}
              </div>

              {/* Código de Convite Visual */}
              <div className="absolute top-3 right-3 bg-bg-primary/90 backdrop-blur-sm border border-border-gold/30 px-2.5 py-1 rounded text-right">
                <div className="text-[8px] text-text-secondary uppercase">Código de Convite</div>
                <div className="font-display text-xs text-border-gold tracking-wider font-bold select-all">
                  {lg.joinCode}
                </div>
              </div>

              {/* Título sobreposto */}
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-display text-lg text-text-primary tracking-wide font-bold drop-shadow-md truncate">
                  {lg.name}
                </h3>
                <div className="text-[10px] text-text-secondary/90 flex items-center gap-1 font-sans">
                  <span>Organizador:</span>
                  <strong className="text-border-gold">{lg.organizer}</strong>
                </div>
              </div>
            </div>

            {/* Conteúdo & Regras */}
            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div className="text-xs">
                <div className="text-[10px] uppercase font-bold text-text-secondary mb-1">
                  Combinação Externa dos Participantes
                </div>
                <div className="p-2 bg-bg-primary/60 rounded border border-border-gold/10 text-text-primary italic">
                  "{lg.prizeNote}"
                </div>
              </div>

              {/* Barra de Progresso de Participantes */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-text-secondary mb-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-accent-green" /> Participantes
                  </span>
                  <span><strong>{lg.participantsCount}</strong> / {lg.maxParticipants} vagas</span>
                </div>
                <div className="w-full bg-bg-primary h-1.5 rounded-full overflow-hidden border border-border-gold/10">
                  <div 
                    style={{ width: `${(lg.participantsCount / lg.maxParticipants) * 100}%` }} 
                    className={`h-full rounded-full ${lg.isPremium ? 'bg-border-gold' : 'bg-accent-green'}`}
                  />
                </div>
              </div>

              {/* Detalhes de Ação */}
              <div className="pt-2 border-t border-border-gold/5 flex items-center justify-between text-[11px]">
                <span className="text-accent-green font-medium">
                  {lg.isPremium ? '✓ Mata-Mata x3 Ativado' : '✓ Regras Base'}
                </span>
                <button className="text-border-gold hover:underline font-bold">
                  Ver Ranking Interno →
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Conformidade Jurídica Destacada */}
      <div className="mt-6 bg-bg-secondary/40 border border-border-gold/10 p-4 rounded-xl flex items-start gap-3 text-xs text-text-secondary">
        <ShieldAlert className="w-5 h-5 text-border-gold flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-text-primary mb-0.5">
            Arquitetura Jurídica Seguro: Modelo de SaaS (Lei 14.790/2023)
          </div>
          <p className="leading-relaxed text-[11px]">
            O Rumo ao Hexa opera exclusivamente cobrando taxa fixa de serviço (SaaS) para desbloqueio de ferramentas de automação e peso de mata-mata nas ligas Premium. <strong>Nenhum valor financeiro ou prêmio de bolão transita, fica retido ou é distribuído pela plataforma.</strong> Os acertos e pagamentos ocorrem externamente (via PIX entre amigos), garantindo licitude total como entretenimento privado.
          </p>
        </div>
      </div>

      {/* Modal Criar Liga */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-secondary border border-border-gold rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <h3 className="font-display text-xl text-border-gold font-bold tracking-wide mb-2">
              CRIAR LIGA PRIVADA RUMO AO HEXA
            </h3>
            <p className="text-xs text-text-secondary mb-4">
              Configure sua liga para amigos, condomínio ou trabalho.
            </p>

            <form onSubmit={handleCreateLeague} className="flex flex-col gap-4">
              
              {/* Nome */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Nome da Liga *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Turma do Futebol, TI Campeã..."
                  value={newLeagueName}
                  onChange={(e) => setNewLeagueName(e.target.value)}
                  className="w-full bg-bg-primary border border-border-gold/30 rounded-lg p-2.5 text-xs text-text-primary focus:outline-none focus:border-border-gold"
                />
              </div>

              {/* Combinação/Premiação Externa */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Acerto/Combinação Externa (Informação Visível a Todos)
                </label>
                <input
                  type="text"
                  placeholder="Ex: R$ 50 via PIX direto com o organizador @cadu"
                  value={newLeaguePrize}
                  onChange={(e) => setNewLeaguePrize(e.target.value)}
                  className="w-full bg-bg-primary border border-border-gold/30 rounded-lg p-2.5 text-xs text-text-primary focus:outline-none focus:border-border-gold placeholder:text-text-secondary/40"
                />
                <span className="text-[10px] text-text-secondary/70 mt-1 block">
                  O app exibe essa nota para os participantes terem clareza do combinado do grupo.
                </span>
              </div>

              {/* Opções Free vs Premium */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                
                {/* Opção FREE */}
                <div 
                  onClick={() => setIsPremiumSelect(false)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    !isPremiumSelect 
                      ? 'bg-bg-primary border-accent-green ring-1 ring-accent-green' 
                      : 'border-border-gold/10 hover:bg-bg-primary/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-text-primary">Liga Gratuita</span>
                      {!isPremiumSelect && <Check className="w-3.5 h-3.5 text-accent-green" />}
                    </div>
                    <ul className="text-[10px] text-text-secondary space-y-1 list-disc list-inside mt-2">
                      <li>Máximo 10 participantes</li>
                      <li>Ranking interno padrão</li>
                      <li>Sem bônus multiplicador</li>
                    </ul>
                  </div>
                  <div className="mt-3 text-xs font-bold text-accent-green">
                    R$ 0,00
                  </div>
                </div>

                {/* Opção PREMIUM */}
                <div 
                  onClick={() => setIsPremiumSelect(true)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden ${
                    isPremiumSelect 
                      ? 'bg-gradient-to-b from-bg-primary to-bg-secondary border-border-gold ring-1 ring-border-gold shadow-gold-glow' 
                      : 'border-border-gold/10 hover:bg-bg-primary/30'
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-border-gold text-bg-primary text-[8px] font-display font-bold px-2 py-0.5 rounded-bl">
                    RECOMENDADO
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-border-gold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-accent-yellow" /> Premium
                      </span>
                      {isPremiumSelect && <Check className="w-3.5 h-3.5 text-border-gold" />}
                    </div>
                    <ul className="text-[10px] text-text-secondary space-y-1 list-disc list-inside mt-2">
                      <li>Até 200 participantes</li>
                      <li>Multiplicadores de Mata-Mata</li>
                      <li>Palpites especiais e estatísticas</li>
                    </ul>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-border-gold">Taxa SaaS Única:</span>
                    <span className="text-sm font-display font-bold text-accent-yellow tracking-wider">
                      R$ 9,90
                    </span>
                  </div>
                </div>

              </div>

              {/* Legal notice de check */}
              <div className="text-[10px] text-text-secondary/80 bg-bg-primary/40 p-2.5 rounded border border-border-gold/5 mt-1">
                Ao criar, declaro estar ciente de que a Plataforma atua apenas no fornecimento de tecnologia para cálculo de pontuação, isentando-se de intermediação financeira sobre premiações.
              </div>

              {/* Botões do formulário */}
              <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-border-gold/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-5"
                >
                  {isPremiumSelect ? 'Pagar R$ 9,90 e Ativar Liga' : 'Criar Liga Grátis'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal Entrar na Liga */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-secondary border border-border-gold rounded-2xl w-full max-w-sm p-6 relative shadow-2xl text-center">
            <h3 className="font-display text-lg text-border-gold font-bold tracking-wide mb-1">
              ENTRAR EM LIGA EXISTENTE
            </h3>
            <p className="text-xs text-text-secondary mb-4">
              Peça o código de 6 letras para o organizador da sua liga.
            </p>

            <form onSubmit={handleJoinLeague} className="flex flex-col gap-3">
              <input
                type="text"
                required
                maxLength={8}
                placeholder="Ex: HEXA26"
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                className="w-full bg-bg-primary border border-border-gold/30 rounded-lg p-3 text-center text-lg font-display text-border-gold tracking-widest font-bold focus:outline-none focus:border-border-gold"
              />

              <div className="flex items-center justify-between gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors border border-border-gold/10 rounded-lg"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary text-xs py-2"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
