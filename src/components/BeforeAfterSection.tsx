import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MoveHorizontal, Expand, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { GALLERY_CASE_STUDIES, GalleryCaseStudy } from '../data/detailingData';
import { GalleryVehicleVisual } from './AutomotiveArtwork';

interface BeforeAfterSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

type ComparisonMode = 'paint' | 'steam' | 'pethair';

interface ModeMetadata {
  id: ComparisonMode;
  tabLabel: string;
  title: string;
  vehicle: string;
  suburb: string;
  beforeLabel: string;
  afterLabel: string;
  metricSummary: string;
  bookingServiceId: string;
}

const COMPARISON_MODES: ModeMetadata[] = [
  {
    id: 'paint',
    tabLabel: 'Paint Correction',
    title: 'Multi-Stage Swirl & Hologram Elimination',
    vehicle: 'Porsche 911 GT3 · Jet Black Metallic',
    suburb: 'Applecross Driveway Service',
    beforeLabel: 'BEFORE · Heavy Wash Swirls & Oxidation (52 GU)',
    afterLabel: 'AFTER · 2-Stage Correction & 9H Ceramic (96 GU)',
    metricSummary: '95%+ Swirl Defect Removal · Mirror Clarity Restored',
    bookingServiceId: 'paint-correction',
  },
  {
    id: 'steam',
    tabLabel: 'Steam Interior',
    title: '160°C Dry Vapour Leather & Cockpit Sanitisation',
    vehicle: 'Mercedes-AMG C63 S · Nappa Perforated Leather',
    suburb: 'Subiaco Workplace Carpark',
    beforeLabel: 'BEFORE · Shiny Body Oils & Soiled Stitching',
    afterLabel: 'AFTER · OEM Dead-Matte Finish & 99.9% Sanitised',
    metricSummary: 'Chemical-Free 160°C Vapour · Zero Dampness Residue',
    bookingServiceId: 'steam-cleaning',
  },
  {
    id: 'pethair',
    tabLabel: 'Pet Hair Removal',
    title: 'Embedded Dog Fur & Coastal Beach Sand Extraction',
    vehicle: 'Ford Ranger Raptor · Rear Bench & Boot Carpet',
    suburb: 'Scarborough Beach Driveway',
    beforeLabel: 'BEFORE · Woven Retriever Fur & Quartz Sand',
    afterLabel: 'AFTER · Electrostatic Purge & Extractor Stripes',
    metricSummary: '100% Fur & Sand Extraction · Enzyme Deodorised',
    bookingServiceId: 'pet-hair-removal',
  },
];

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [activeMode, setActiveMode] = useState<ComparisonMode>('paint');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryCaseStudy | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentMode = COMPARISON_MODES.find((m) => m.id === activeMode) || COMPARISON_MODES[0];

  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPos(Math.max(4, Math.min(96, percentage)));
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => updateSliderFromClientX(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, updateSliderFromClientX]);

  // Keyboard support for Lightbox
  useEffect(() => {
    if (!lightboxItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const idx = GALLERY_CASE_STUDIES.findIndex((c) => c.id === lightboxItem.id);
        const nextIdx =
          e.key === 'ArrowRight'
            ? (idx + 1) % GALLERY_CASE_STUDIES.length
            : (idx - 1 + GALLERY_CASE_STUDIES.length) % GALLERY_CASE_STUDIES.length;
        setLightboxItem(GALLERY_CASE_STUDIES[nextIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem]);

  return (
    <section id="gallery" className="py-24 bg-[#0A0A0B] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
              Proven Showroom Results · Perth WA
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-chrome">
              Before & After Proof
            </h2>
            <p className="mt-3 text-[#A7ABB3] max-w-2xl text-base leading-relaxed">
              Drag the inspection slider to compare untreated paintwork, leather, and carpets against our finished mobile detailing results.
            </p>
          </div>

          {/* Interactive Mode Switcher Tabs */}
          <div
            role="tablist"
            aria-label="Before and after comparison categories"
            className="inline-flex p-1.5 rounded-xl bg-[#121316] border border-white/12 self-start"
          >
            {COMPARISON_MODES.map((mode) => {
              const active = mode.id === activeMode;
              return (
                <button
                  key={mode.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveMode(mode.id);
                    setSliderPos(50);
                  }}
                  className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#CFE3F2] text-black shadow-[0_0_20px_rgba(207,227,242,0.35)]'
                      : 'text-[#A7ABB3] hover:text-white'
                  }`}
                >
                  {mode.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Drag-to-Compare Viewport */}
        <div className="gents-card rounded-2xl p-4 sm:p-6 lg:p-8 mb-16">
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              updateSliderFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
            }}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[540px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/15 bg-black"
          >
            {/* FULL LAYER: AFTER (Mirror Corrected / Sanitised / Fur-Free) */}
            <div className="absolute inset-0 w-full h-full">
              {activeMode === 'paint' && (
                <svg viewBox="0 0 1000 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="afterObsidian" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#090B0E" />
                      <stop offset="45%" stopColor="#030405" />
                      <stop offset="100%" stopColor="#0C1017" />
                    </linearGradient>
                    <radialGradient id="afterLampGlow" cx="50%" cy="42%" r="36%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      <stop offset="22%" stopColor="#EAF5FF" stopOpacity="0.55" />
                      <stop offset="60%" stopColor="#CFE3F2" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="1000" height="560" fill="url(#afterObsidian)" />
                  {/* Sculpted Hood Curves with Razor-Sharp Studio Light Reflection */}
                  <path d="M0 160 Q500 95 1000 160 L1000 560 L0 560 Z" fill="url(#afterObsidian)" stroke="#CFE3F2" strokeWidth="2" strokeOpacity="0.65" />
                  <path d="M180 140 L340 560 M820 140 L660 560" stroke="#8FA7BA" strokeWidth="1.5" strokeOpacity="0.35" />
                  <ellipse cx="500" cy="270" rx="280" ry="130" fill="url(#afterLampGlow)" />
                  {/* Crisp Hexagonal Studio LED Reflection in Clear Coat */}
                  <polygon points="500,170 610,225 610,325 500,380 390,325 390,225" fill="none" stroke="#EAF5FF" strokeWidth="4" opacity="0.85" />
                  <polygon points="500,195 585,238 585,312 500,355 415,312 415,238" fill="none" stroke="#CFE3F2" strokeWidth="2" opacity="0.6" />
                </svg>
              )}

              {activeMode === 'steam' && (
                <svg viewBox="0 0 1000 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="1000" height="560" fill="#0B0D10" />
                  {/* Factory Dead-Matte Perforated Nappa Leather Bolsters */}
                  <rect x="80" y="40" width="840" height="480" rx="32" fill="#14171C" stroke="#CFE3F2" strokeWidth="2" strokeOpacity="0.4" />
                  {/* Crisp Silver Diamond Quilting */}
                  <g stroke="#EAF5FF" strokeOpacity="0.32" strokeWidth="1.4">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <React.Fragment key={i}>
                        <line x1={140 + i * 85} y1="60" x2={40 + i * 85} y2="500" />
                        <line x1={40 + i * 85} y1="60" x2={140 + i * 85} y2="500" />
                      </React.Fragment>
                    ))}
                  </g>
                </svg>
              )}

              {activeMode === 'pethair' && (
                <svg viewBox="0 0 1000 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="1000" height="560" fill="#090A0D" />
                  {/* Clean Vacuum-Striped Plush Carpet Pile */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <polygon
                      key={i}
                      points={`${i * 105},0 ${i * 105 + 55},0 ${i * 105 + 25},560 ${i * 105 - 30},560`}
                      fill={i % 2 === 0 ? '#13151A' : '#0D0F13'}
                    />
                  ))}
                  <rect x="60" y="50" width="880" height="460" rx="16" fill="none" stroke="#CFE3F2" strokeWidth="1.5" strokeOpacity="0.35" />
                </svg>
              )}
            </div>

            {/* CLIPPED LAYER: BEFORE (Swirl Marks / Oily Stained Leather / Embedded Pet Fur & Sand) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              {activeMode === 'paint' && (
                <svg viewBox="0 0 1000 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="1000" height="560" fill="#181A1E" />
                  <path d="M0 160 Q500 95 1000 160 L1000 560 L0 560 Z" fill="#1E2025" stroke="#8FA7BA" strokeWidth="1" strokeOpacity="0.3" />
                  {/* Hazy oxidized reflection */}
                  <ellipse cx="500" cy="270" rx="310" ry="155" fill="#8FA7BA" opacity="0.22" />
                  {/* Dense Spiderweb Swirl Marks & Random Deep Scratches */}
                  <g stroke="#CFE3F2" strokeOpacity="0.52" fill="none">
                    {[35, 58, 82, 108, 136, 165, 198, 232, 268, 305].map((r, i) => (
                      <circle
                        key={i}
                        cx={500 + ((i % 3) - 1) * 8}
                        cy={270 + ((i % 2) - 0.5) * 8}
                        r={r}
                        strokeWidth={i % 2 === 0 ? '1.2' : '0.8'}
                        strokeDasharray={`${18 + i * 3} ${9 + i * 2}`}
                      />
                    ))}
                    <path d="M210 210 L390 265 M610 190 L440 310 M280 390 L520 340 M560 410 L740 290" strokeWidth="1.1" opacity="0.65" />
                  </g>
                  {/* Hard water spot mineral rings */}
                  {[
                    { x: 240, y: 240 },
                    { x: 310, y: 360 },
                    { x: 680, y: 230 },
                    { x: 730, y: 380 },
                  ].map((s, idx) => (
                    <circle key={idx} cx={s.x} cy={s.y} r="14" fill="none" stroke="#A7ABB3" strokeWidth="1" strokeDasharray="4 3" opacity="0.45" />
                  ))}
                </svg>
              )}

              {activeMode === 'steam' && (
                <svg viewBox="0 0 1000 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="1000" height="560" fill="#17181B" />
                  <rect x="80" y="40" width="840" height="480" rx="32" fill="#23252A" stroke="#8FA7BA" strokeWidth="1" strokeOpacity="0.25" />
                  {/* Greasy shine patches & clogged stitching */}
                  <ellipse cx="340" cy="260" rx="180" ry="120" fill="#8FA7BA" opacity="0.24" />
                  <ellipse cx="640" cy="310" rx="160" ry="110" fill="#A7ABB3" opacity="0.2" />
                  <g stroke="#52565E" strokeWidth="1.4">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <React.Fragment key={i}>
                        <line x1={140 + i * 85} y1="60" x2={40 + i * 85} y2="500" />
                        <line x1={40 + i * 85} y1="60" x2={140 + i * 85} y2="500" />
                      </React.Fragment>
                    ))}
                  </g>
                </svg>
              )}

              {activeMode === 'pethair' && (
                <svg viewBox="0 0 1000 560" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="1000" height="560" fill="#141519" />
                  {/* Embedded pet hair strands & coastal sand speckles */}
                  <g stroke="#D8DEE6" strokeOpacity="0.65" strokeWidth="1.3" strokeLinecap="round">
                    {Array.from({ length: 140 }).map((_, i) => {
                      const x = (i * 73) % 920 + 40;
                      const y = (i * 47) % 480 + 40;
                      const dx = ((i % 7) - 3) * 11;
                      const dy = ((i % 5) - 2) * 9;
                      return <path key={i} d={`M${x} ${y} Q${x + dx / 2} ${y - 6} ${x + dx} ${y + dy}`} fill="none" />;
                    })}
                  </g>
                  <g fill="#A7ABB3" opacity="0.5">
                    {Array.from({ length: 90 }).map((_, i) => (
                      <circle key={i} cx={(i * 89) % 940 + 30} cy={(i * 61) % 500 + 30} r={(i % 3) + 1} />
                    ))}
                  </g>
                </svg>
              )}
            </div>

            {/* Top Overlay Captions (Unboxed clean typography on dark scrim) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/12">
                <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#A7ABB3]">
                  {currentMode.beforeLabel}
                </span>
              </div>
              <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#CFE3F2]/30">
                <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#EAF5FF]">
                  {currentMode.afterLabel}
                </span>
              </div>
            </div>

            {/* Vertical Divider Line & Draggable Handle */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#8FA7BA] via-[#EAF5FF] to-[#8FA7BA] shadow-[0_0_20px_#EAF5FF]"
            >
              <button
                type="button"
                role="slider"
                aria-label="Comparison slider handle"
                aria-valuemin={4}
                aria-valuemax={96}
                aria-valuenow={sliderPos}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(4, p - 5));
                  if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(96, p + 5));
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black border-2 border-[#EAF5FF] text-[#EAF5FF] shadow-[0_0_25px_rgba(234,245,255,0.6)] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-transform hover:scale-110"
              >
                <MoveHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Comparison Info Bar + Action */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div>
              <h3 className="text-lg font-display font-bold text-white uppercase tracking-wide">
                {currentMode.title}
              </h3>
              <p className="text-xs text-[#A7ABB3] mt-1 font-mono-tabular">
                {currentMode.vehicle} <span aria-hidden="true">·</span> {currentMode.suburb}{' '}
                <span aria-hidden="true">·</span>{' '}
                <span className="text-[#CFE3F2]">{currentMode.metricSummary}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectServiceForBooking(currentMode.bookingServiceId)}
              className="shine-sweep inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Book {currentMode.tabLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Masonry Case Study Grid with Lightbox */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-white">
              Recent Perth Driveway Transformations
            </h3>
            <p className="text-sm text-[#A7ABB3] mt-1">
              Click any vehicle to inspect the treatment breakdown and gloss readings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_CASE_STUDIES.map((item, index) => (
            <article
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className={`gents-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between ${
                index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <div className="w-full h-full transition-transform duration-300 group-hover:scale-105">
                  <GalleryVehicleVisual visualType={item.visualType} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <button
                  type="button"
                  aria-label={`Inspect ${item.vehicle}`}
                  className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/70 border border-white/15 text-[#CFE3F2] flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:border-[#CFE3F2] transition-all"
                >
                  <Expand className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[11px] font-mono-tabular text-[#CFE3F2] uppercase tracking-wider">
                    {item.suburb} · {item.duration}
                  </p>
                  <h4 className="text-base font-display font-bold text-white uppercase tracking-wide mt-0.5">
                    {item.vehicle}
                  </h4>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#A7ABB3] leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tabular text-[#CFE3F2]">
                  <span>{item.metrics}</span>
                  <span className="underline underline-offset-4 group-hover:text-white">Inspect</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.vehicle}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-2xl bg-[#121316] border border-white/20 overflow-hidden shadow-[0_0_70px_rgba(207,227,242,0.15)]"
          >
            <div className="relative aspect-[16/9] w-full bg-black">
              <GalleryVehicleVisual visualType={lightboxItem.visualType} />
              <button
                type="button"
                aria-label="Close lightbox"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white hover:text-[#CFE3F2] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#CFE3F2] mb-2">
                <span>{lightboxItem.suburb}</span>
                <span aria-hidden="true">·</span>
                <span>{lightboxItem.duration}</span>
                <span aria-hidden="true">·</span>
                <span>{lightboxItem.metrics}</span>
              </div>

              <h3 className="text-2xl font-display font-extrabold uppercase text-white">
                {lightboxItem.vehicle}
              </h3>
              <p className="text-sm font-semibold text-[#CFE3F2] mt-1">
                {lightboxItem.title}
              </p>
              <p className="mt-3 text-sm text-[#A7ABB3] leading-relaxed">
                {lightboxItem.summary}
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = GALLERY_CASE_STUDIES.findIndex((c) => c.id === lightboxItem.id);
                      const prev =
                        GALLERY_CASE_STUDIES[
                          (idx - 1 + GALLERY_CASE_STUDIES.length) % GALLERY_CASE_STUDIES.length
                        ];
                      setLightboxItem(prev);
                    }}
                    className="px-3 py-2 rounded-lg bg-[#1A1C20] border border-white/12 text-xs text-white hover:border-[#CFE3F2] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = GALLERY_CASE_STUDIES.findIndex((c) => c.id === lightboxItem.id);
                      const next = GALLERY_CASE_STUDIES[(idx + 1) % GALLERY_CASE_STUDIES.length];
                      setLightboxItem(next);
                    }}
                    className="px-3 py-2 rounded-lg bg-[#1A1C20] border border-white/12 text-xs text-white hover:border-[#CFE3F2] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const target = lightboxItem.servicePerformed;
                    setLightboxItem(null);
                    onSelectServiceForBooking(target);
                  }}
                  className="shine-sweep px-5 py-2.5 rounded-lg bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Book Similar Treatment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
