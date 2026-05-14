import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Trophy, Award, TrendingUp, Users, Globe, X } from 'lucide-react';

interface RankUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  exacts: number;
  streak: number;
  percentage: number;
  position: number;
  history: number[];
}

export function Leaderboard() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'global' | 'league' | 'h2h'>('global');
  const [selectedUser, setSelectedUser] = useState<RankUser | null>(null);

  // Dados Mockados de Alta Fidelidade com visual premium
  const mockUsers: RankUser[] = [
    {
      id: 'usr-gold',
      name: 'General Alisson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      points: 215,
      exacts: 7,
      streak: 5,
      percentage: 78,
      position: 1,
      history: [10, 35, 60, 95, 140, 185, 215]
    },
    {
      id: 'usr-silver',
      name: 'Major Beatriz',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      points: 198,
      exacts: 6,
      streak: 4,
      percentage: 72,
      position: 2,
      history: [15, 30, 55, 80, 120, 160, 198]
    },
    {
      id: 'usr-bronze',
      name: 'Tenente Carlos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      points: 180,
      exacts: 5,
      streak: 2,
      percentage: 65,
      position: 3,
      history: [0, 25, 50, 75, 110, 145, 180]
    },
    {
      id: 'usr-4',
      name: 'Sargento Daniel',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      points: 162,
      exacts: 4,
      streak: 1,
      percentage: 58,
      position: 4,
      history: [10, 20, 40, 60, 90, 125, 162]
    },
    // O usuário logado está na posição 1247
    {
      id: 'usr-1',
      name: user?.displayName || 'Capitão Cadu',
      avatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      points: user?.totalPoints || 125,
      exacts: user?.exactCount || 4,
      streak: user?.streak || 3,
      percentage: 60,
      position: user?.position || 1247,
      history: [10, 20, 45, 65, 85, 105, 125]
    }
  ];

  const filteredUsers = activeTab === 'h2h' 
    ? mockUsers.slice(0, 3) 
    : mockUsers;

  return (
    <section className="mt-12" id="leaderboard">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 px-1">
        <div>
          <h2 className="font-display text-xl text-border-gold tracking-wide font-bold flex items-center gap-2">
            <span>LEADERBOARD OFICIAL</span>
            <span className="text-xs font-sans font-normal text-accent-green px-2 py-0.5 bg-accent-green/10 border border-accent-green/20 rounded">
              Tempo Real
            </span>
          </h2>
          <p className="text-xs text-text-secondary">
            Ranking atualizado a cada apito final por Edge Functions com proteção anti-fraude.
          </p>
        </div>

        {/* Abas */}
        <div className="flex items-center bg-bg-secondary p-1 rounded-lg border border-border-gold/20 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1 ${
              activeTab === 'global' ? 'bg-border-gold text-bg-primary font-bold shadow' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Global
          </button>
          <button
            onClick={() => setActiveTab('league')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1 ${
              activeTab === 'league' ? 'bg-border-gold text-bg-primary font-bold shadow' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Minha Liga
          </button>
          <button
            onClick={() => setActiveTab('h2h')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1 ${
              activeTab === 'h2h' ? 'bg-border-gold text-bg-primary font-bold shadow' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Amigos (H2H)
          </button>
        </div>
      </div>

      {/* Tabela Wrapper Premium */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-bg-secondary/60 text-[10px] text-text-secondary uppercase tracking-wider border-b border-border-gold/10">
                <th className="py-3 px-4 font-bold w-12 text-center">Pos</th>
                <th className="py-3 px-4 font-bold">Patente & Competidor</th>
                <th className="py-3 px-4 font-bold text-center w-16">Pontos</th>
                <th className="py-3 px-4 font-bold text-center w-16 hidden sm:table-cell">Cravadas</th>
                <th className="py-3 px-4 font-bold text-center w-16 hidden sm:table-cell">Sequência</th>
                <th className="py-3 px-4 font-bold text-right w-16">% Aproveit.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-gold/5">
              {filteredUsers.map((u) => {
                const isTop1 = u.position === 1;
                const isTop2 = u.position === 2;
                const isTop3 = u.position === 3;
                const isCurrentUser = u.id === 'usr-1';

                // Aplica Glow Ouro/Prata/Bronze nos Top 3
                let rowBg = 'hover:bg-bg-primary/40';
                let badgeClass = 'text-text-secondary bg-bg-secondary';
                
                if (isTop1) {
                  rowBg = 'bg-gradient-to-r from-border-gold/15 via-transparent to-transparent font-medium border-l-4 border-border-gold';
                  badgeClass = 'bg-border-gold text-bg-primary font-extrabold shadow-md shadow-border-gold/40';
                } else if (isTop2) {
                  rowBg = 'bg-gradient-to-r from-silver/10 via-transparent to-transparent font-medium border-l-4 border-silver';
                  badgeClass = 'bg-silver text-bg-primary font-bold shadow-sm';
                } else if (isTop3) {
                  rowBg = 'bg-gradient-to-r from-bronze/10 via-transparent to-transparent font-medium border-l-4 border-bronze';
                  badgeClass = 'bg-bronze text-bg-primary font-bold';
                } else if (isCurrentUser) {
                  rowBg = 'bg-accent-green/10 font-bold border-l-4 border-accent-green';
                }

                return (
                  <tr 
                    key={u.id} 
                    onClick={() => setSelectedUser(u)}
                    className={`transition-colors cursor-pointer ${rowBg}`}
                    title="Clique para ver o gráfico de evolução"
                  >
                    {/* # Posição */}
                    <td className="py-3 px-4 text-center">
                      <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs ${badgeClass}`}>
                        {u.position}
                      </span>
                    </td>

                    {/* Avatar & Nome */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-border-gold/40" />
                          {isTop1 && <Award className="w-3.5 h-3.5 text-accent-yellow absolute -top-1 -right-1" />}
                        </div>
                        <div>
                          <div className="text-text-primary font-semibold flex items-center gap-1.5">
                            {u.name}
                            {isCurrentUser && (
                              <span className="text-[9px] bg-accent-green text-bg-primary px-1 rounded font-bold uppercase">
                                Você
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-text-secondary/70">
                            {u.percentage > 70 ? 'Patente de Ouro' : 'Patente de Elite'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Pontos */}
                    <td className="py-3 px-4 text-center font-display text-base font-bold text-border-gold">
                      {u.points}
                    </td>

                    {/* Cravadas */}
                    <td className="py-3 px-4 text-center text-text-secondary hidden sm:table-cell">
                      {u.exacts} <span className="text-[9px]">🎯</span>
                    </td>

                    {/* Sequência */}
                    <td className="py-3 px-4 text-center hidden sm:table-cell">
                      <span className="text-accent-green font-bold">
                        {u.streak} 🔥
                      </span>
                    </td>

                    {/* % Aproveitamento */}
                    <td className="py-3 px-4 text-right font-medium text-text-primary">
                      {u.percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Linha do usuário fixada em destaque se houver rolagem ou sumário */}
        <div className="bg-bg-secondary border-t border-border-gold/20 p-3 px-4 flex items-center justify-between text-xs font-bold text-border-gold">
          <div className="flex items-center gap-2">
            <span>Sua Meta de Subida:</span>
            <span className="text-text-primary font-normal text-[11px]">
              Faltam 18 pontos para alcançar o Top 1000
            </span>
          </div>
          <div className="text-[10px] font-normal text-text-secondary flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-accent-green" /> Clique num usuário para ver o gráfico
          </div>
        </div>
      </div>

      {/* Modal / Detalhe Gráfico de Evolução (Estatísticas do Perfil) */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-bg-secondary border border-border-gold rounded-2xl w-full max-w-md p-5 relative shadow-2xl">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary p-1 rounded-full bg-bg-primary"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-border-gold/10 pb-4 mb-4">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-12 h-12 rounded-full border-2 border-border-gold object-cover" />
              <div>
                <h4 className="font-display text-lg text-border-gold font-bold tracking-wide">
                  {selectedUser.name}
                </h4>
                <div className="text-xs text-text-secondary flex items-center gap-2">
                  <span>Posição: #{selectedUser.position}</span>
                  <span>•</span>
                  <span>Total: {selectedUser.points} pts</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs font-semibold text-text-secondary mb-2 flex items-center justify-between">
                <span>Evolução de Pontos (Últimos Jogos)</span>
                <span className="text-[10px] text-accent-green">Sempre subindo</span>
              </div>
              
              {/* Representação Gráfica Customizada CSS para o WOW design premium sem dependência pesada de canvas */}
              <div className="bg-bg-primary p-4 rounded-xl border border-border-gold/10 h-32 flex items-end justify-between gap-2 relative">
                {selectedUser.history.map((pts, idx) => {
                  const maxPts = Math.max(...selectedUser.history, 1);
                  const heightPercent = `${(pts / maxPts) * 100}%`;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1 text-[9px] bg-bg-secondary px-1.5 py-0.5 rounded text-border-gold border border-border-gold/20 font-display">
                        {pts}p
                      </div>
                      <div 
                        style={{ height: heightPercent }} 
                        className="w-full bg-gradient-to-t from-accent-green/40 to-border-gold rounded-t transition-all duration-500 max-w-[24px]"
                      />
                      <span className="text-[8px] text-text-secondary/60">J{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-bg-primary/50 p-3 rounded-xl text-center text-xs">
              <div>
                <div className="text-text-secondary text-[10px]">Cravadas</div>
                <div className="font-bold text-border-gold mt-0.5">{selectedUser.exacts}</div>
              </div>
              <div>
                <div className="text-text-secondary text-[10px]">Aproveitamento</div>
                <div className="font-bold text-text-primary mt-0.5">{selectedUser.percentage}%</div>
              </div>
              <div>
                <div className="text-text-secondary text-[10px]">Sequência</div>
                <div className="font-bold text-accent-green mt-0.5">{selectedUser.streak} 🔥</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
