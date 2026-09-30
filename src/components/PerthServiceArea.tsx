import React, { useState, useMemo } from 'react';
import { MapPin, Search, Phone, Check } from 'lucide-react';
import { PERTH_SUBURBS, PerthSuburb } from '../data/detailingData';

const REGIONS: PerthSuburb['region'][] = [
  'Perth CBD & Inner',
  'Western & Coastal',
  'Northern Suburbs',
  'Southern Suburbs',
  'Eastern Suburbs',
];

export const PerthServiceArea: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<PerthSuburb['region'] | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSuburbs = useMemo(() => {
    return PERTH_SUBURBS.filter((s) => {
      const matchesRegion = activeRegion === 'All' || s.region === activeRegion;
      const matchesQuery =
        !searchQuery.trim() ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.postcode.includes(searchQuery.trim());
      return matchesRegion && matchesQuery;
    });
  }, [activeRegion, searchQuery]);

  return (
    <section id="service-area" className="py-24 bg-[#0A0A0B] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Cols: Stylised Dark Vector Map of Perth Metro & Swan River */}
          <div className="lg:col-span-5 gents-card rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#CFE3F2]">
                  100% Mobile Coverage
                </p>
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  Perth Metropolitan Radar
                </h3>
              </div>
              <span className="text-xs font-mono-tabular text-[#A7ABB3]">31.95° S, 115.86° E</span>
            </div>

            <div className="relative aspect-[4/5] w-full rounded-xl bg-black border border-white/12 overflow-hidden">
              <svg
                viewBox="0 0 420 520"
                className="w-full h-full"
                aria-label="Stylised map of Perth metropolitan area and Swan River coverage"
              >
                <defs>
                  <radialGradient id="perthRadarGlow" cx="52%" cy="52%" r="48%">
                    <stop offset="0%" stopColor="#CFE3F2" stopOpacity="0.22" />
                    <stop offset="55%" stopColor="#8FA7BA" stopOpacity="0.07" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Radar Grid Lines */}
                <g stroke="#8FA7BA" strokeOpacity="0.12" strokeWidth="1">
                  {[60, 130, 200, 270, 340].map((x) => (
                    <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="520" />
                  ))}
                  {[80, 160, 240, 320, 400, 480].map((y) => (
                    <line key={`h-${y}`} x1="0" y1={y} x2="420" y2={y} />
                  ))}
                </g>

                {/* Coverage Radius Rings */}
                <circle cx="220" cy="270" r="190" fill="url(#perthRadarGlow)" stroke="#CFE3F2" strokeOpacity="0.18" strokeDasharray="6 6" />
                <circle cx="220" cy="270" r="115" fill="none" stroke="#CFE3F2" strokeOpacity="0.26" strokeDasharray="4 4" />

                {/* Indian Ocean Coastline (Joondalup -> Hillarys -> Scarborough -> Cottesloe -> Fremantle) */}
                <path
                  d="M95 10 C102 65, 112 120, 120 175 C126 215, 122 255, 115 295 C110 330, 118 365, 112 405 C106 445, 115 485, 122 520"
                  fill="none"
                  stroke="#CFE3F2"
                  strokeWidth="2.5"
                  strokeOpacity="0.7"
                />

                {/* Swan & Canning River System */}
                <path
                  d="M114 358 C142 350, 165 330, 182 308 C198 288, 218 278, 242 272 C275 264, 305 235, 338 195 M218 282 C232 315, 255 348, 288 375"
                  fill="none"
                  stroke="#8FA7BA"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeOpacity="0.55"
                />

                {/* Key Perth Hub Pins */}
                {[
                  { x: 112, y: 85, label: 'JOONDALUP & HILLARYS', align: 'start' },
                  { x: 122, y: 205, label: 'SCARBOROUGH & KARRINYUP', align: 'start' },
                  { x: 118, y: 295, label: 'COTTESLOE & NEDLANDS', align: 'start' },
                  { x: 235, y: 265, label: 'PERTH CBD & SUBIACO', align: 'start' },
                  { x: 215, y: 332, label: 'APPLECROSS & SOUTH PERTH', align: 'start' },
                  { x: 116, y: 382, label: 'FREMANTLE', align: 'start' },
                  { x: 325, y: 220, label: 'GUILDFORD & EASTERN HILLS', align: 'end' },
                ].map((hub, i) => (
                  <g key={i} transform={`translate(${hub.x}, ${hub.y})`}>
                    <circle cx="0" cy="0" r="9" fill="#CFE3F2" opacity="0.22" />
                    <circle cx="0" cy="0" r="4" fill="#EAF5FF" />
                    <text
                      x={hub.align === 'end' ? -10 : 12}
                      y="4"
                      textAnchor={hub.align as 'start' | 'end'}
                      fill="#FFFFFF"
                      fontSize="9.5"
                      fontFamily="JetBrains Mono"
                      fontWeight="600"
                      letterSpacing="0.8"
                    >
                      {hub.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#A7ABB3]">
              <span>Home Driveways · Office Carparks</span>
              <span className="text-[#CFE3F2] font-mono-tabular">$0 Metro Callout Fee</span>
            </div>
          </div>

          {/* Right 7 Cols: Suburb Coverage Directory & Filter */}
          <div className="lg:col-span-7">
            <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
              We Travel Across Greater Perth
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-chrome">
              Perth Service Area
            </h2>
            <p className="mt-3 text-[#A7ABB3] text-base leading-relaxed">
              Whether your car is parked in a Cottesloe driveway, an Applecross garage, or a Subiaco office carpark, our mobile detailing unit comes fully equipped to you.
            </p>

            {/* Suburb Search & Region Filter */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#A7ABB3] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Check your Perth suburb or postcode (e.g. Subiaco, 6153)..."
                  aria-label="Search Perth suburb or postcode"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#121316] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/60 focus:outline-none focus:border-[#CFE3F2]"
                />
              </div>
            </div>

            {/* Region Filter Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              {(['All', ...REGIONS] as const).map((reg) => {
                const active = activeRegion === reg;
                return (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => setActiveRegion(reg)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#CFE3F2] text-black'
                        : 'bg-[#121316] text-[#A7ABB3] border border-white/10 hover:text-white'
                    }`}
                  >
                    {reg}
                  </button>
                );
              })}
            </div>

            {/* Suburb Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
              {filteredSuburbs.map((s) => (
                <div
                  key={s.name}
                  className="p-3 rounded-xl bg-[#121316] border border-white/10 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Check className="w-3.5 h-3.5 text-[#CFE3F2] shrink-0" />
                    <span className="text-xs font-medium text-white truncate">{s.name}</span>
                  </div>
                  <span className="text-[11px] font-mono-tabular text-[#A7ABB3] shrink-0">
                    {s.postcode}
                  </span>
                </div>
              ))}
            </div>

            {/* Callout Note required by user prompt */}
            <div className="mt-6 p-5 rounded-2xl bg-[#121316] border border-[#CFE3F2]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <MapPin className="w-5 h-5 text-[#CFE3F2] shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <p className="text-sm font-display font-bold uppercase text-white">
                    Not sure if we cover your suburb?
                  </p>
                  <p className="text-xs text-[#A7ABB3] mt-0.5">
                    We regularly service outer metro suburbs, Swan Valley, and Mandurah by arrangement.
                  </p>
                </div>
              </div>
              <a
                href="tel:+61447826355"
                className="shine-sweep inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 0447 826 355</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
