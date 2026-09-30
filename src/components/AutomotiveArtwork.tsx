import React, { useEffect, useRef } from 'react';
import { GalleryCaseStudy } from '../data/detailingData';

/**
 * Full-screen dark cinematic hero background with a sleek obsidian & liquid-silver
 * sports car, wet studio floor reflection, and a slow animated light streak sweeping across the car.
 */
export const HeroCarBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#000000]">
      {/* Architectural studio ceiling light bars */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 25%, rgba(207, 227, 242, 0.16) 0%, rgba(10, 10, 11, 0.4) 55%, #000000 100%)',
        }}
      />

      {/* Slow animated light streak sweeping across the car */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#EAF5FF]/15 to-transparent blur-2xl animate-light-sweep" />

      {/* Center studio car silhouette & floor reflection */}
      <svg
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-85"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="studioCeilingLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="20%" stopColor="#8FA7BA" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#EAF5FF" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#8FA7BA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="carBodyRim" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#8FA7BA" stopOpacity="0.2" />
            <stop offset="32%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="52%" stopColor="#CFE3F2" stopOpacity="0.85" />
            <stop offset="78%" stopColor="#8FA7BA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#121316" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="obsidianBodyFill" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1F242B" />
            <stop offset="38%" stopColor="#0D0F12" />
            <stop offset="100%" stopColor="#030304" />
          </linearGradient>

          <radialGradient id="headlightFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EAF5FF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#CFE3F2" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#CFE3F2" stopOpacity="0" />
          </radialGradient>

          <filter id="heroBlurGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Studio perspective grid lines */}
        <g opacity="0.12" stroke="#8FA7BA" strokeWidth="1">
          <line x1="0" y1="560" x2="1440" y2="560" />
          <line x1="0" y1="620" x2="1440" y2="620" />
          <line x1="0" y1="690" x2="1440" y2="690" />
          <line x1="720" y1="560" x2="120" y2="800" />
          <line x1="720" y1="560" x2="420" y2="800" />
          <line x1="720" y1="560" x2="720" y2="800" />
          <line x1="720" y1="560" x2="1020" y2="800" />
          <line x1="720" y1="560" x2="1320" y2="800" />
        </g>

        {/* Overhead Scangrip LED Studio Light Bar */}
        <rect x="340" y="78" width="760" height="3" fill="url(#studioCeilingLight)" />
        <rect x="440" y="76" width="560" height="7" fill="url(#studioCeilingLight)" opacity="0.35" filter="url(#heroBlurGlow)" />

        {/* Grand Tourer / Supercar 3/4 Profile in Obsidian & Silver */}
        <g transform="translate(180, 250)">
          {/* Shadow on wet epoxy garage floor */}
          <ellipse cx="540" cy="315" rx="470" ry="34" fill="#000000" />
          <ellipse cx="540" cy="318" rx="420" ry="18" fill="#CFE3F2" opacity="0.08" filter="url(#heroBlurGlow)" />

          {/* Main sculpted bodywork */}
          <path
            d="M95 268 C102 222, 165 192, 265 180 L435 112 C515 84, 675 82, 785 118 L925 174 C985 186, 1020 218, 1025 265 L995 288 L88 288 Z"
            fill="url(#obsidianBodyFill)"
          />

          {/* Liquid silver upper roofline & fender highlight */}
          <path
            d="M102 248 C124 208, 195 186, 285 176 L445 114 C525 86, 675 85, 780 120 L918 174 C972 184, 1005 212, 1014 252"
            stroke="url(#carBodyRim)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#heroBlurGlow)"
          />

          {/* Side glass greenhouse & B-pillar */}
          <path
            d="M320 174 L455 122 C525 98, 655 98, 748 128 L835 168 L620 174 L320 174 Z"
            fill="#07090C"
            stroke="#8FA7BA"
            strokeWidth="1.3"
            strokeOpacity="0.6"
          />
          <line x1="595" y1="104" x2="575" y2="174" stroke="#8FA7BA" strokeWidth="2" strokeOpacity="0.5" />

          {/* Character shoulder line & door scallop */}
          <path
            d="M275 202 C430 194, 660 192, 875 208"
            stroke="url(#carBodyRim)"
            strokeWidth="1.8"
            opacity="0.75"
          />
          <path
            d="M375 256 L725 252 L758 218"
            stroke="#8FA7BA"
            strokeWidth="1.5"
            opacity="0.45"
          />

          {/* Front LED DRL signature & icy glow */}
          <circle cx="136" cy="232" r="46" fill="url(#headlightFlare)" />
          <path
            d="M108 228 L168 222 L156 236 L105 236 Z"
            fill="#EAF5FF"
            filter="url(#heroBlurGlow)"
          />

          {/* Rear LED light blade */}
          <path
            d="M975 198 L1016 204 L1012 214 L968 206 Z"
            fill="#CFE3F2"
            filter="url(#heroBlurGlow)"
          />

          {/* Front Forged Alloy Wheel */}
          <g transform="translate(248, 268)">
            <circle cx="0" cy="0" r="54" fill="#050608" stroke="#2A2E35" strokeWidth="6" />
            <circle cx="0" cy="0" r="42" fill="#090B0E" stroke="#CFE3F2" strokeWidth="1.8" strokeOpacity="0.75" />
            <circle cx="0" cy="0" r="28" stroke="#8FA7BA" strokeWidth="1" strokeDasharray="8 6" strokeOpacity="0.5" />
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2={Math.cos((deg * Math.PI) / 180) * 41}
                y2={Math.sin((deg * Math.PI) / 180) * 41}
                stroke="#CFE3F2"
                strokeWidth="1.6"
                strokeOpacity="0.7"
              />
            ))}
            <circle cx="0" cy="0" r="9" fill="#CFE3F2" />
          </g>

          {/* Rear Forged Alloy Wheel */}
          <g transform="translate(836, 268)">
            <circle cx="0" cy="0" r="56" fill="#050608" stroke="#2A2E35" strokeWidth="6" />
            <circle cx="0" cy="0" r="44" fill="#090B0E" stroke="#CFE3F2" strokeWidth="1.8" strokeOpacity="0.75" />
            <circle cx="0" cy="0" r="30" stroke="#8FA7BA" strokeWidth="1" strokeDasharray="8 6" strokeOpacity="0.5" />
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2={Math.cos((deg * Math.PI) / 180) * 43}
                y2={Math.sin((deg * Math.PI) / 180) * 43}
                stroke="#CFE3F2"
                strokeWidth="1.6"
                strokeOpacity="0.7"
              />
            ))}
            <circle cx="0" cy="0" r="9" fill="#CFE3F2" />
          </g>

          {/* Wet Showroom Floor Reflection */}
          <g transform="translate(0, 565) scale(1, -0.35)" opacity="0.22">
            <path
              d="M102 248 C124 208, 195 186, 285 176 L445 114 C525 86, 675 85, 780 120 L918 174 C972 184, 1005 212, 1014 252"
              stroke="url(#carBodyRim)"
              strokeWidth="4"
              filter="url(#heroBlurGlow)"
            />
            <circle cx="248" cy="268" r="42" stroke="#CFE3F2" strokeWidth="2" />
            <circle cx="836" cy="268" r="44" stroke="#CFE3F2" strokeWidth="2" />
          </g>
        </g>
      </svg>

      {/* Measured contrast scrims for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/80" />
    </div>
  );
};

/**
 * Subtle animated rising steam & water-bead particle canvas for the Steam Cleaning section.
 */
export const SteamParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth || 800;
      canvas.height = canvas.offsetHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: (i * 97) % 800,
      y: (i * 53) % 500,
      radius: 2 + (i % 5) * 1.8,
      speedY: 0.25 + (i % 4) * 0.15,
      driftX: ((i % 3) - 1) * 0.18,
      alpha: 0.08 + (i % 5) * 0.04,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0.5, p.x, p.y, p.radius * 3.2);
        grad.addColorStop(0, `rgba(234, 245, 255, ${p.alpha * 1.8})`);
        grad.addColorStop(0.5, `rgba(207, 227, 242, ${p.alpha})`);
        grad.addColorStop(1, 'rgba(207, 227, 242, 0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();

        if (!prefersReducedMotion) {
          p.y -= p.speedY;
          p.x += p.driftX;
          if (p.y < -20) {
            p.y = canvas.height + 20;
            p.x = Math.random() * canvas.width;
          }
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
};

interface SpecialtyArtworkProps {
  type: 'paint-correction' | 'ceramic-coating' | 'steam-cleaning';
}

/**
 * High-contrast bespoke studio artwork for the 3 Featured Specialties.
 */
export const SpecialtyArtwork: React.FC<SpecialtyArtworkProps> = ({ type }) => {
  if (type === 'paint-correction') {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A0A0B] border border-white/15 shadow-2xl group">
        <svg viewBox="0 0 640 480" className="w-full h-full" aria-label="Multi-stage paint correction under studio inspection light">
          <defs>
            <linearGradient id="pcHoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A1D24" />
              <stop offset="50%" stopColor="#090A0D" />
              <stop offset="100%" stopColor="#020203" />
            </linearGradient>
            <radialGradient id="pcLightSpot" cx="50%" cy="45%" r="45%">
              <stop offset="0%" stopColor="#EAF5FF" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#CFE3F2" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="640" height="480" fill="#060709" />

          {/* Scangrip Inspection LED Bar */}
          <rect x="120" y="42" width="400" height="14" rx="7" fill="#181B20" stroke="#8FA7BA" strokeWidth="1.2" />
          <rect x="145" y="46" width="350" height="6" rx="3" fill="#EAF5FF" />

          {/* Curved Gloss Black Sports Car Fender/Hood */}
          <path d="M-20 210 Q320 135 660 220 L660 480 L-20 480 Z" fill="url(#pcHoodGrad)" stroke="#CFE3F2" strokeWidth="1.5" strokeOpacity="0.5" />
          <ellipse cx="320" cy="290" rx="260" ry="110" fill="url(#pcLightSpot)" />

          {/* Split 50/50 Tape Line showing Uncorrected Swirls (Left) vs Mirror Gloss (Right) */}
          <line x1="320" y1="172" x2="320" y2="480" stroke="#CFE3F2" strokeWidth="2" strokeDasharray="6 4" />

          {/* Left side: Spiderweb swirl marks under inspection light */}
          <g opacity="0.42" stroke="#8FA7BA" strokeWidth="0.9" fill="none">
            <circle cx="210" cy="290" r="28" />
            <circle cx="210" cy="290" r="46" strokeDasharray="18 9" />
            <circle cx="210" cy="290" r="68" strokeDasharray="25 11" />
            <circle cx="215" cy="292" r="88" strokeDasharray="14 14" />
            <path d="M130 260 Q190 240 260 280 M140 330 Q210 310 280 345" />
          </g>

          {/* Right side: Dual-Action Polisher Head & Pure Mirror Reflection */}
          <rect x="355" y="255" width="185" height="8" rx="4" fill="#EAF5FF" opacity="0.85" />
          <g transform="translate(445, 210)">
            {/* Polisher Backing Plate & Foam Pad */}
            <ellipse cx="0" cy="40" rx="68" ry="22" fill="#CFE3F2" opacity="0.22" />
            <ellipse cx="0" cy="34" rx="62" ry="18" fill="#E8EEF3" />
            <path d="M-46 18 L46 18 L34 34 L-34 34 Z" fill="#1A1C20" stroke="#8FA7BA" strokeWidth="1.2" />
            {/* Polisher Body & Ergonomic Head */}
            <rect x="-24" y="-26" width="48" height="44" rx="10" fill="#121316" stroke="#CFE3F2" strokeWidth="1.5" />
            <path d="M24 -10 L135 -28 L142 -6 L24 10 Z" fill="#181A1F" stroke="#8FA7BA" strokeWidth="1.2" />
            <text x="0" y="0" textAnchor="middle" fill="#CFE3F2" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600">
              DA-21
            </text>
          </g>

          {/* Bottom Technical Telemetry Labels */}
          <text x="36" y="445" fill="#A7ABB3" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="1.5">
            BEFORE: 54 GU · SWIRL MARRING
          </text>
          <text x="355" y="445" fill="#EAF5FF" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="1.5">
            AFTER: 96 GU · MIRROR CLARITY
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'ceramic-coating') {
    return (
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A0A0B] border border-white/15 shadow-2xl">
        <svg viewBox="0 0 640 480" className="w-full h-full" aria-label="9H Ceramic coating hydrophobic water beading macro">
          <defs>
            <radialGradient id="beadGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="28%" stopColor="#EAF5FF" />
              <stop offset="65%" stopColor="#1E2630" />
              <stop offset="92%" stopColor="#050608" />
              <stop offset="100%" stopColor="#CFE3F2" />
            </radialGradient>
            <linearGradient id="ceramicSurface" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#08090C" />
              <stop offset="48%" stopColor="#181D24" />
              <stop offset="100%" stopColor="#050608" />
            </linearGradient>
          </defs>

          <rect width="640" height="480" fill="url(#ceramicSurface)" />

          {/* Hexagonal SiO2 Molecular Lattice Overlay in perspective */}
          <g stroke="#CFE3F2" strokeOpacity="0.16" strokeWidth="1" fill="none">
            <polygon points="320,70 365,95 365,145 320,170 275,145 275,95" />
            <polygon points="410,120 455,145 455,195 410,220 365,195 365,145" />
            <polygon points="230,120 275,145 275,195 230,220 185,195 185,145" />
            <polygon points="320,170 365,195 365,245 320,270 275,245 275,195" />
          </g>

          {/* High-Contact-Angle Crystalline Water Beads */}
          {[
            { cx: 190, cy: 280, r: 44 },
            { cx: 335, cy: 255, r: 58 },
            { cx: 475, cy: 295, r: 38 },
            { cx: 255, cy: 365, r: 28 },
            { cx: 405, cy: 355, r: 32 },
            { cx: 135, cy: 345, r: 20 },
            { cx: 525, cy: 225, r: 22 },
            { cx: 155, cy: 205, r: 18 },
            { cx: 280, cy: 185, r: 15 },
            { cx: 445, cy: 195, r: 16 },
          ].map((b, idx) => (
            <g key={idx}>
              <ellipse cx={b.cx + 6} cy={b.cy + b.r * 0.82} rx={b.r * 0.92} ry={b.r * 0.28} fill="#000000" opacity="0.65" />
              <ellipse cx={b.cx} cy={b.cy + b.r * 0.72} rx={b.r * 0.45} ry={b.r * 0.14} fill="#EAF5FF" opacity="0.35" />
              <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#beadGrad)" stroke="#CFE3F2" strokeWidth="1" strokeOpacity="0.6" />
              <ellipse cx={b.cx - b.r * 0.32} cy={b.cy - b.r * 0.32} rx={b.r * 0.24} ry={b.r * 0.13} transform={`rotate(-28 ${b.cx - b.r * 0.32} ${b.cy - b.r * 0.32})`} fill="#FFFFFF" opacity="0.9" />
            </g>
          ))}

          {/* Contact Angle Diagram Callout */}
          <g transform="translate(45, 70)">
            <rect x="0" y="0" width="185" height="62" rx="8" fill="#0A0A0B" fillOpacity="0.85" stroke="#CFE3F2" strokeOpacity="0.3" />
            <text x="16" y="26" fill="#EAF5FF" fontSize="13" fontFamily="Montserrat" fontWeight="700">
              9H SiO2 + GRAPHENE
            </text>
            <text x="16" y="46" fill="#A7ABB3" fontSize="11" fontFamily="JetBrains Mono">
              118° HYDROPHOBIC ANGLE
            </text>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A0A0B] border border-white/15 shadow-2xl">
      <SteamParticlesCanvas />
      <svg viewBox="0 0 640 480" className="relative z-10 w-full h-full" aria-label="160 degree interior dry vapour steam cleaning and pet hair extraction">
        <defs>
          <linearGradient id="leatherSeat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2026" />
            <stop offset="50%" stopColor="#121418" />
            <stop offset="100%" stopColor="#08090B" />
          </linearGradient>
          <radialGradient id="steamPlume" cx="30%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#EAF5FF" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#CFE3F2" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#CFE3F2" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sculpted Sports Bucket Seat in Matte Nappa Leather */}
        <path
          d="M120 75 C140 42, 260 42, 280 75 L315 340 L485 355 C515 360, 525 415, 495 430 L115 430 C88 420, 82 375, 92 330 Z"
          fill="url(#leatherSeat)"
          stroke="#8FA7BA"
          strokeWidth="1.5"
          strokeOpacity="0.55"
        />

        {/* Quilted diamond stitching on seat centre */}
        <g stroke="#CFE3F2" strokeOpacity="0.22" strokeWidth="1">
          <line x1="150" y1="130" x2="255" y2="235" />
          <line x1="145" y1="185" x2="250" y2="290" />
          <line x1="140" y1="240" x2="245" y2="345" />
          <line x1="255" y1="130" x2="150" y2="235" />
          <line x1="250" y1="185" x2="145" y2="290" />
          <line x1="245" y1="240" x2="140" y2="345" />
        </g>

        {/* High-Temperature 160°C Steam Plume & Lance Nozzle */}
        <ellipse cx="335" cy="245" rx="135" ry="75" transform="rotate(-18 335 245)" fill="url(#steamPlume)" />
        <g transform="translate(430, 175) rotate(-22)">
          <path d="M-55 18 L0 8 L0 28 Z" fill="#CFE3F2" />
          <rect x="0" y="4" width="140" height="28" rx="8" fill="#181A20" stroke="#CFE3F2" strokeWidth="1.5" />
          <line x1="25" y1="18" x2="95" y2="18" stroke="#8FA7BA" strokeWidth="2" />
        </g>

        {/* Technical Spec Callout */}
        <g transform="translate(365, 64)">
          <rect x="0" y="0" width="225" height="62" rx="8" fill="#0A0A0B" fillOpacity="0.88" stroke="#CFE3F2" strokeOpacity="0.3" />
          <text x="16" y="26" fill="#EAF5FF" fontSize="13" fontFamily="Montserrat" fontWeight="700">
            160°C DRY VAPOUR STEAM
          </text>
          <text x="16" y="46" fill="#A7ABB3" fontSize="11" fontFamily="JetBrains Mono">
            99.9% BACTERIA & FUR REMOVAL
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Custom high-contrast studio visual for each of the 6 Perth Gallery Case Studies.
 */
export const GalleryVehicleVisual: React.FC<{ visualType: GalleryCaseStudy['visualType']; className?: string }> = ({
  visualType,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full bg-[#090A0D] overflow-hidden select-none ${className}`}>
      <svg viewBox="0 0 600 420" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`grad-${visualType}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D222B" />
            <stop offset="55%" stopColor="#0C0E12" />
            <stop offset="100%" stopColor="#040406" />
          </linearGradient>
          <linearGradient id={`rim-${visualType}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8FA7BA" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#EAF5FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8FA7BA" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <rect width="600" height="420" fill={`url(#grad-${visualType})`} />

        {/* Studio overhead reflection strip */}
        <rect x="90" y="38" width="420" height="4" rx="2" fill={`url(#rim-${visualType})`} opacity="0.7" />

        {visualType === 'gt3_obsidian' && (
          <g transform="translate(55, 130)">
            <path d="M25 145 C40 110, 110 95, 175 88 L265 48 C320 32, 395 34, 445 68 L480 95 L485 68 L502 68 L495 145 Z" fill="#0B0C0E" stroke={`url(#rim-${visualType})`} strokeWidth="2.5" />
            <circle cx="125" cy="145" r="34" fill="#050608" stroke="#CFE3F2" strokeWidth="2" />
            <circle cx="405" cy="145" r="36" fill="#050608" stroke="#CFE3F2" strokeWidth="2" />
            <path d="M52 118 L92 114 L84 124 L48 124 Z" fill="#EAF5FF" />
          </g>
        )}

        {visualType === 'defender_ceramic' && (
          <g transform="translate(65, 105)">
            <path d="M35 170 L35 110 L145 102 L175 42 L435 42 L455 112 L465 170 Z" fill="#0D0F13" stroke={`url(#rim-${visualType})`} strokeWidth="2.5" />
            <rect x="188" y="54" width="95" height="44" rx="4" fill="#060709" stroke="#8FA7BA" strokeWidth="1.2" />
            <rect x="298" y="54" width="115" height="44" rx="4" fill="#060709" stroke="#8FA7BA" strokeWidth="1.2" />
            <circle cx="115" cy="172" r="40" fill="#050608" stroke="#CFE3F2" strokeWidth="2.2" />
            <circle cx="385" cy="172" r="40" fill="#050608" stroke="#CFE3F2" strokeWidth="2.2" />
          </g>
        )}

        {visualType === 'amg_steam' && (
          <g transform="translate(80, 75)">
            {/* Interior Steering Wheel & Quilted Seats */}
            <circle cx="155" cy="145" r="68" fill="none" stroke="#CFE3F2" strokeWidth="8" strokeOpacity="0.85" />
            <circle cx="155" cy="145" r="22" fill="#121316" stroke="#8FA7BA" strokeWidth="2" />
            <line x1="95" y1="145" x2="133" y2="145" stroke="#8FA7BA" strokeWidth="5" />
            <line x1="177" y1="145" x2="215" y2="145" stroke="#8FA7BA" strokeWidth="5" />
            <line x1="155" y1="167" x2="155" y2="208" stroke="#8FA7BA" strokeWidth="5" />
            <path d="M285 45 C310 25, 390 25, 415 45 L435 235 L265 235 Z" fill="#14171D" stroke="#CFE3F2" strokeWidth="1.8" />
          </g>
        )}

        {visualType === 'raptor_pet' && (
          <g transform="translate(50, 110)">
            <path d="M25 165 L32 102 L145 92 L185 38 L355 38 L365 92 L485 92 L485 165 Z" fill="#0D0F14" stroke={`url(#rim-${visualType})`} strokeWidth="2.5" />
            <circle cx="115" cy="168" r="42" fill="#050608" stroke="#CFE3F2" strokeWidth="2.5" strokeDasharray="10 4" />
            <circle cx="395" cy="168" r="42" fill="#050608" stroke="#CFE3F2" strokeWidth="2.5" strokeDasharray="10 4" />
          </g>
        )}

        {visualType === 'rs6_correction' && (
          <g transform="translate(55, 125)">
            <path d="M28 148 C42 112, 115 94, 185 86 L275 44 C355 36, 435 42, 475 88 L492 148 Z" fill="#161920" stroke={`url(#rim-${visualType})`} strokeWidth="2.5" />
            <circle cx="122" cy="148" r="35" fill="#050608" stroke="#EAF5FF" strokeWidth="2" />
            <circle cx="408" cy="148" r="35" fill="#050608" stroke="#EAF5FF" strokeWidth="2" />
          </g>
        )}

        {visualType === 'cayenne_full' && (
          <g transform="translate(60, 115)">
            <path d="M30 158 C45 115, 115 96, 175 86 L260 40 C345 34, 425 46, 468 95 L485 158 Z" fill="#0E1015" stroke={`url(#rim-${visualType})`} strokeWidth="2.5" />
            <circle cx="120" cy="158" r="38" fill="#050608" stroke="#CFE3F2" strokeWidth="2.2" />
            <circle cx="402" cy="158" r="38" fill="#050608" stroke="#CFE3F2" strokeWidth="2.2" />
          </g>
        )}
      </svg>
    </div>
  );
};
