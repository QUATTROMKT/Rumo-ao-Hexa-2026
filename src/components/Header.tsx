import { useStore } from '@/store/useStore';
import { Trophy, Volume2, VolumeX, LogOut } from 'lucide-react';

export function Header() {
  const { user, soundEnabled, toggleSound, logout } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-bg-secondary/90 backdrop-blur-md border-b border-border-gold/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand & Promessa */}
        <div className="flex items-center gap-2">
          <div className="relative p-2 bg-bg-primary rounded-lg border border-border-gold/40 shadow-gold-glow">
            <Trophy className="w-6 h-6 text-border-gold" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent-green rounded-full animate-ping" />
          </div>
          <div>
            <h1 className="font-display text-xl tracking-wider text-border-gold font-bold flex items-center gap-1">
              RUMO AO HEXA
              <span className="text-xs font-sans px-1.5 py-0.5 bg-accent-green/20 text-accent-green border border-accent-green/30 rounded">
                2026
              </span>
            </h1>
            <p className="text-[10px] font-sans text-text-secondary hidden sm:block">
              O bolão mais bonito e mais justo do Mundial.
            </p>
          </div>
        </div>

        {/* User Stats & Controls */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* Posição Leaderboard */}
            <div className="text-right hidden sm:block">
              <div className="text-xs text-text-secondary font-medium">Posição Global</div>
              <div className="font-display text-base text-border-gold font-bold tracking-wide">
                {user.position}º <span className="text-xs font-sans font-normal text-text-primary">({user.totalPoints} pts)</span>
              </div>
            </div>

            {/* Micro Controls */}
            <button 
              onClick={toggleSound}
              title={soundEnabled ? "Som ativado (Efeitos de Gol)" : "Som desativado"}
              className="p-2 text-text-secondary hover:text-border-gold transition-colors rounded-full hover:bg-bg-primary"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-accent-green" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Avatar & Profile summary */}
            <div className="flex items-center gap-2 pl-2 border-l border-border-gold/20">
              <img 
                src={user.avatarUrl} 
                alt={user.displayName} 
                className="w-9 h-9 rounded-full border border-border-gold ring-2 ring-border-gold/20 object-cover"
              />
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-text-primary truncate max-w-[100px]">
                  {user.displayName}
                </div>
                <div className="text-[10px] text-accent-green flex items-center gap-0.5">
                  🔥 {user.streak} cravadas
                </div>
              </div>

              <button
                onClick={logout}
                title="Sair"
                className="p-1.5 text-danger/80 hover:text-danger hover:bg-danger/10 rounded transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs font-sans text-border-gold font-medium animate-pulse">
            🔒 Identifique-se para palpitar
          </div>
        )}

      </div>
    </header>
  );
}
