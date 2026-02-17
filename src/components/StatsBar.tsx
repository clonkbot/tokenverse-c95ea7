import { Token } from '../App';

interface StatsBarProps {
  tokens: Token[];
  isLoading: boolean;
}

export default function StatsBar({ tokens, isLoading }: StatsBarProps) {
  const totalMarketCap = tokens.reduce((acc, t) => acc + t.marketCap, 0);
  const totalVolume = tokens.reduce((acc, t) => acc + t.volume24h, 0);
  const totalHolders = tokens.reduce((acc, t) => acc + t.holders, 0);

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatCount = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const stats = [
    { label: 'Total Tokens', value: tokens.length.toString(), icon: '◈' },
    { label: 'Market Cap', value: formatNumber(totalMarketCap), icon: '◇' },
    { label: '24h Volume', value: formatNumber(totalVolume), icon: '△' },
    { label: 'Total Holders', value: formatCount(totalHolders), icon: '◎' },
  ];

  return (
    <div className="border-b border-white/5 bg-gradient-to-r from-cyan-500/[0.03] via-transparent to-fuchsia-500/[0.03]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative p-3 md:p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-cyan-400 text-lg md:text-xl">{stat.icon}</span>
                  <div>
                    <p className="text-[10px] md:text-xs text-[#606070] font-mono uppercase tracking-wider">
                      {stat.label}
                    </p>
                    {isLoading ? (
                      <div className="h-5 md:h-7 w-16 md:w-20 bg-white/5 rounded animate-pulse mt-1" />
                    ) : (
                      <p className="text-lg md:text-2xl font-orbitron font-bold text-white">
                        {stat.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
