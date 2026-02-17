import { Token } from '../App';

interface TokenCardProps {
  token: Token;
  index: number;
}

export default function TokenCard({ token, index }: TokenCardProps) {
  const formatPrice = (price: number) => {
    if (price < 0.001) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatMarketCap = (mc: number) => {
    if (mc >= 1000000) return `$${(mc / 1000000).toFixed(2)}M`;
    if (mc >= 1000) return `$${(mc / 1000).toFixed(1)}K`;
    return `$${mc.toFixed(0)}`;
  };

  const getChainColor = (chain: string) => {
    const colors: Record<string, string> = {
      Ethereum: 'from-blue-400 to-blue-600',
      Solana: 'from-purple-400 to-purple-600',
      Base: 'from-blue-300 to-blue-500',
      Arbitrum: 'from-sky-400 to-sky-600',
      Polygon: 'from-violet-400 to-violet-600',
    };
    return colors[chain] || 'from-gray-400 to-gray-600';
  };

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  return (
    <div
      className="group relative animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300" />

      <div className="relative h-full p-4 md:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm hover:border-transparent transition-all duration-300 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }} />

        {/* Top section */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Token icon */}
            <div className="relative">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${getChainColor(token.chain)} flex items-center justify-center text-white font-orbitron font-bold text-sm md:text-base shadow-lg`}>
                {token.symbol.slice(0, 2)}
              </div>
              {token.verified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-cyan-500 rounded-full flex items-center justify-center border-2 border-[#12121a]">
                  <svg className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-orbitron font-semibold text-white text-sm md:text-base truncate max-w-[120px] md:max-w-[160px]">
                {token.name}
              </h3>
              <p className="text-[#606070] font-mono text-xs">{token.symbol}</p>
            </div>
          </div>

          <div className={`px-2 py-1 rounded-lg font-mono text-xs ${
            token.change24h >= 0
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
          </div>
        </div>

        {/* Price */}
        <div className="relative mb-4">
          <p className="text-xl md:text-2xl font-orbitron font-bold text-white">
            {formatPrice(token.price)}
          </p>
          <p className="text-[10px] md:text-xs text-[#505060] font-mono">
            MCap: {formatMarketCap(token.marketCap)}
          </p>
        </div>

        {/* Stats grid */}
        <div className="relative grid grid-cols-2 gap-3 mb-4">
          <div className="p-2 md:p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <p className="text-[10px] text-[#505060] font-mono uppercase">Holders</p>
            <p className="text-sm font-mono text-white">{token.holders.toLocaleString()}</p>
          </div>
          <div className="p-2 md:p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <p className="text-[10px] text-[#505060] font-mono uppercase">24h Vol</p>
            <p className="text-sm font-mono text-white">{formatMarketCap(token.volume24h)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${getChainColor(token.chain)}`} />
            <span className="text-[10px] md:text-xs text-[#606070] font-mono">{token.chain}</span>
          </div>
          <span className="text-[10px] md:text-xs text-[#404050] font-mono">{timeAgo(token.createdAt)}</span>
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden rounded-2xl">
          <div className="absolute inset-0 animate-scanline" style={{
            background: 'linear-gradient(transparent 50%, rgba(0,240,255,0.02) 50%)',
            backgroundSize: '100% 4px',
          }} />
        </div>
      </div>
    </div>
  );
}
