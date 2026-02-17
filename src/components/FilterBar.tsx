interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedChain: string;
  setSelectedChain: (c: string) => void;
  sortBy: 'marketCap' | 'holders' | 'change24h' | 'createdAt';
  setSortBy: (s: 'marketCap' | 'holders' | 'change24h' | 'createdAt') => void;
  chains: string[];
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedChain,
  setSelectedChain,
  sortBy,
  setSortBy,
  chains,
}: FilterBarProps) {
  const sortOptions: { value: FilterBarProps['sortBy']; label: string }[] = [
    { value: 'marketCap', label: 'Market Cap' },
    { value: 'holders', label: 'Holders' },
    { value: 'change24h', label: '24h Change' },
    { value: 'createdAt', label: 'Newest' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
      {/* Search */}
      <div className="relative flex-1 max-w-full lg:max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-[#606070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-white/[0.03] border border-white/10 rounded-xl font-mono text-sm text-white placeholder-[#505060] focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all min-h-[48px]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-xl blur-xl opacity-0 focus-within:opacity-30 transition-opacity pointer-events-none" />
      </div>

      {/* Chain Filter */}
      <div className="flex flex-wrap gap-2">
        {chains.map((chain) => (
          <button
            key={chain}
            onClick={() => setSelectedChain(chain)}
            className={`px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-mono text-xs transition-all min-h-[44px] flex items-center ${
              selectedChain === chain
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/[0.03] text-[#808090] border border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {chain}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as FilterBarProps['sortBy'])}
          className="appearance-none w-full lg:w-auto px-4 py-3 md:py-3.5 pr-10 bg-white/[0.03] border border-white/10 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all cursor-pointer min-h-[48px]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#12121a]">
              Sort: {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-[#606070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
