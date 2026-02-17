import { useState, useEffect } from 'react';
import TokenCard from './components/TokenCard';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  createdAt: string;
  marketCap: number;
  holders: number;
  price: number;
  change24h: number;
  volume24h: number;
  chain: string;
  verified: boolean;
}

const generateMockTokens = (): Token[] => {
  const names = [
    'Nebula Protocol', 'Quantum Flux', 'Dark Matter', 'Stellar Drift',
    'Void Walker', 'Plasma Core', 'Neon Genesis', 'Cyber Pulse',
    'Binary Storm', 'Echo Chamber', 'Phantom Node', 'Astral Link',
    'Nova Burst', 'Zenith Peak', 'Orbit Sync', 'Flux Weaver',
    'Grid Phantom', 'Hex Protocol', 'Ion Storm', 'Laser Chain',
    'Matrix Flow', 'Neural Net', 'Omega Drive', 'Pixel Forge'
  ];

  const chains = ['Ethereum', 'Solana', 'Base', 'Arbitrum', 'Polygon'];

  return names.map((name, i) => ({
    id: `token-${i}`,
    name,
    symbol: name.split(' ').map(w => w[0]).join('').toUpperCase(),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    marketCap: Math.floor(Math.random() * 10000000) + 10000,
    holders: Math.floor(Math.random() * 50000) + 100,
    price: Math.random() * 100,
    change24h: (Math.random() - 0.5) * 100,
    volume24h: Math.floor(Math.random() * 5000000) + 1000,
    chain: chains[Math.floor(Math.random() * chains.length)],
    verified: Math.random() > 0.6,
  }));
};

function App() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState('All');
  const [sortBy, setSortBy] = useState<'marketCap' | 'holders' | 'change24h' | 'createdAt'>('marketCap');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockTokens = generateMockTokens();
      setTokens(mockTokens);
      setFilteredTokens(mockTokens);
      setIsLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    let result = [...tokens];

    if (searchQuery) {
      result = result.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedChain !== 'All') {
      result = result.filter(t => t.chain === selectedChain);
    }

    result.sort((a, b) => {
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return (b[sortBy] as number) - (a[sortBy] as number);
    });

    setFilteredTokens(result);
  }, [tokens, searchQuery, selectedChain, sortBy]);

  const chains = ['All', ...Array.from(new Set(tokens.map(t => t.chain)))];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Glow orbs */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        <Header />
        <StatsBar tokens={tokens} isLoading={isLoading} />

        <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedChain={selectedChain}
            setSelectedChain={setSelectedChain}
            sortBy={sortBy}
            setSortBy={setSortBy}
            chains={chains}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-56 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          ) : filteredTokens.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">
                <span className="opacity-20">{"{ }"}</span>
              </div>
              <p className="text-[#a0a0b0] font-mono">No tokens found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
              {filteredTokens.map((token, index) => (
                <TokenCard key={token.id} token={token} index={index} />
              ))}
            </div>
          )}
        </main>

        <footer className="relative z-10 py-6 md:py-8 mt-12 border-t border-white/5">
          <p className="text-center text-[#505060] text-xs font-mono">
            Requested by @vladyy__01 · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
