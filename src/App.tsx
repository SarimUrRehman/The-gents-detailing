import React, { useState, useEffect } from 'react';
import {
  Phone,
  Calendar,
  MapPin,
  ShieldCheck,
  Sparkles,
  Flame,
  Scissors,
  Droplets,
  Armchair,
  Sun,
  Crown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowRight,
  Menu,
  X,
  Star,
  Clock,
  Mail,
  BookmarkCheck,
  Award,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  CORE_SERVICES,
  PACKAGE_TIERS,
  SAMPLE_REVIEWS,
  FAQ_ITEMS,
  ServiceItem,
} from './data/detailingData';
import { BrandLogo, LoadingScreen } from './components/BrandLogo';
import { HeroCarBackdrop, SpecialtyArtwork, SteamParticlesCanvas } from './components/AutomotiveArtwork';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { BookingSystem, SavedBooking } from './components/BookingSystem';
import { PerthServiceArea } from './components/PerthServiceArea';

const STORAGE_KEY = 'the_gents_perth_bookings_v1';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Booking system state & pre-selection
  const [preselectedTarget, setPreselectedTarget] = useState<string | null>('pkg-signature');
  const [showMyBookingsModal, setShowMyBookingsModal] = useState(false);
  const [savedBookings, setSavedBookings] = useState<SavedBooking[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Reviews auto-sliding carousel state
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewPaused, setReviewPaused] = useState(false);

  // FAQ open accordion item
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Quick Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSuburb, setContactSuburb] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Scroll listener for sticky navbar & back-to-top button
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 32);
      setShowBackToTop(y > 650);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-advance testimonial carousel every 5.5s unless paused
  useEffect(() => {
    if (reviewPaused) return;
    const timer = window.setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % SAMPLE_REVIEWS.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [reviewPaused]);

  const handleSaveBooking = (newBooking: SavedBooking) => {
    setSavedBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage quota errors
      }
      return updated;
    });
  };

  const handleDeleteBooking = (reference: string) => {
    setSavedBookings((prev) => {
      const updated = prev.filter((b) => b.reference !== reference);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  const scrollToBookingWithSelection = (targetIdOrName: string) => {
    setPreselectedTarget(targetIdOrName);
    setMobileMenuOpen(false);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderServiceIcon = (iconName: ServiceItem['iconName']) => {
    const props = { className: 'w-5 h-5 text-[#CFE3F2]' };
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Flame':
        return <Flame {...props} />;
      case 'Scissors':
        return <Scissors {...props} />;
      case 'Droplets':
        return <Droplets {...props} />;
      case 'Armchair':
        return <Armchair {...props} />;
      case 'Sun':
        return <Sun {...props} />;
      case 'Crown':
        return <Crown {...props} />;
    }
  };

  const handleQuickContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      setContactError('Please enter your name, phone number, and message so our Perth team can reply.');
      return;
    }
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#CFE3F2] selection:text-black">
      {/* Animated SVG Logo Entrance Screen */}
      <LoadingScreen />

      {/* 1. STICKY NAVBAR (Strict 3-Zone Top Bar Contract) */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-white/12 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark / Emblem */}
          <a
            href="#home"
            aria-label="The Gents Detailing Co Home"
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFE3F2] rounded-lg"
          >
            <BrandLogo size="sm" />
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7 text-xs font-display font-bold uppercase tracking-[0.14em] text-[#A7ABB3]"
          >
            <a href="#home" className="hover:text-white transition-colors whitespace-nowrap">
              Home
            </a>
            <a href="#services" className="hover:text-white transition-colors whitespace-nowrap">
              Services
            </a>
            <a href="#packages" className="hover:text-white transition-colors whitespace-nowrap">
              Packages
            </a>
            <a href="#gallery" className="hover:text-white transition-colors whitespace-nowrap">
              Gallery
            </a>
            <a href="#reviews" className="hover:text-white transition-colors whitespace-nowrap">
              Reviews
            </a>
            <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap">
              Contact
            </a>
            <button
              type="button"
              onClick={() => setShowMyBookingsModal(true)}
              className="hover:text-[#EAF5FF] text-[#CFE3F2] transition-colors whitespace-nowrap cursor-pointer"
            >
              My Bookings ({savedBookings.length})
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Click-to-Call + Book Now) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#121316] hover:bg-[#1A1C20] border border-white/15 hover:border-[#CFE3F2] text-xs font-mono-tabular font-semibold text-white transition-all whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#CFE3F2]" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>

            <a
              href="#booking"
              className="shine-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(207,227,242,0.3)] transition-all whitespace-nowrap"
            >
              <span>Book Now</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={BUSINESS_INFO.phoneHref}
              aria-label="Call 0447 826 355"
              className="p-2.5 rounded-lg bg-[#121316] border border-white/15 text-[#CFE3F2]"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2.5 rounded-lg bg-[#121316] border border-white/15 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0A0B]/98 backdrop-blur-2xl border-b border-white/15 px-4 pt-4 pb-6 mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-display font-bold uppercase tracking-wider">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Services', href: '#services' },
                { label: 'Packages', href: '#packages' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Booking', href: '#booking' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-lg bg-[#121316] border border-white/10 text-white hover:border-[#CFE3F2]"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowMyBookingsModal(true);
                }}
                className="w-full py-3 rounded-lg bg-[#1A1C20] border border-white/15 text-xs font-display font-bold uppercase tracking-wider text-[#CFE3F2]"
              >
                My Bookings ({savedBookings.length})
              </button>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="w-full py-3 rounded-lg bg-[#121316] border border-white/20 text-center text-xs font-mono-tabular font-bold text-white"
              >
                Call {BUSINESS_INFO.phoneDisplay}
              </a>
              <a
                href="#booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-lg bg-[#CFE3F2] text-black text-center text-xs font-display font-extrabold uppercase tracking-wider"
              >
                Book Online Now
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <section
          id="home"
          className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-black"
        >
          {/* Full-screen dark studio car artwork with sweeping light streak */}
          <HeroCarBackdrop />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
            <div className="max-w-3xl">
              {/* Unboxed regional trust metadata (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#CFE3F2] mb-5">
                <MapPin className="w-3.5 h-3.5 text-[#EAF5FF] shrink-0" />
                <span>Servicing Perth, WA</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A7ABB3]">Home Driveway & Workplace Mobile Unit</span>
              </div>

              {/* Staggered Display Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-[1.03] text-chrome">
                We Bring the Showroom to Your Driveway
              </h1>

              {/* Refined Cormorant Garamond italic accent */}
              <p className="mt-4 text-2xl sm:text-3xl font-serif-accent italic text-[#EAF5FF] tracking-wide">
                “Perfection, delivered to your door.”
              </p>

              <p className="mt-4 text-base sm:text-lg text-[#A7ABB3] max-w-2xl leading-relaxed">
                Perth’s premier mobile car detailing specialists. From multi-stage{' '}
                <strong className="text-white font-medium">Paint Correction</strong> and{' '}
                <strong className="text-white font-medium">9H Ceramic Coatings</strong> to{' '}
                <strong className="text-white font-medium">160°C Interior Steam Sanitising</strong> and{' '}
                <strong className="text-white font-medium">Pet Hair Removal</strong>—your car receives the gentleman’s treatment without you leaving home.
              </p>

              {/* Two Primary Hero CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#booking"
                  className="shine-sweep inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-extrabold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(207,227,242,0.4)] transition-all whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Your Detail Online</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-[#121316]/90 hover:bg-[#1A1C20] border border-white/20 hover:border-[#CFE3F2] text-white font-mono-tabular font-bold text-sm transition-all whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#CFE3F2]" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Quantitative Rigor Stat Counters */}
            <div className="mt-16 pt-8 border-t border-white/12 grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-mono-tabular font-bold text-white">
                  100% <span className="text-sm font-normal text-[#CFE3F2]">Mobile</span>
                </p>
                <p className="text-xs text-[#A7ABB3] mt-1">
                  Self-contained Perth metro studio van—home or office
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-mono-tabular font-bold text-white">
                  Up to 95% <span className="text-sm font-normal text-[#CFE3F2]">Correction</span>
                </p>
                <p className="text-xs text-[#A7ABB3] mt-1">
                  Swirl mark & oxidation removal under LED inspection
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-mono-tabular font-bold text-white">
                  160°C <span className="text-sm font-normal text-[#CFE3F2]">Dry Steam</span>
                </p>
                <p className="text-xs text-[#A7ABB3] mt-1">
                  Chemical-free interior sanitisation & pet hair extraction
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-mono-tabular font-bold text-white">
                  5.0 ★ <span className="text-sm font-normal text-[#CFE3F2]">Satisfaction</span>
                </p>
                <p className="text-xs text-[#A7ABB3] mt-1">
                  Walk-around handover inspection before you pay a cent
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INFINITE MARQUEE STRIP */}
        <div className="bg-[#0A0A0B] border-y border-white/12 py-3.5 overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-10 text-xs font-display font-extrabold uppercase tracking-[0.26em] text-[#CFE3F2]">
            {[...Array(2)].map((_, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <span>Paint Correction</span>
                <span className="text-white/30">•</span>
                <span>Ceramic Coatings</span>
                <span className="text-white/30">•</span>
                <span>Steam Cleaning</span>
                <span className="text-white/30">•</span>
                <span>Pet Hair Removal</span>
                <span className="text-white/30">•</span>
                <span>Mobile Service</span>
                <span className="text-white/30">•</span>
                <span>Perth WA</span>
                <span className="text-white/30">•</span>
                <span>0447 826 355</span>
                <span className="text-white/30">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3. TRUST BAR (4 PILLARS) */}
        <section aria-label="Why Choose The Gents Detailing Co" className="py-14 bg-[#0A0A0B] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Truck className="w-5 h-5 text-[#CFE3F2]" />,
                  title: '01. We Come to You',
                  desc: 'Service at your home driveway, apartment bay, or workplace across Greater Perth.',
                },
                {
                  icon: <Award className="w-5 h-5 text-[#CFE3F2]" />,
                  title: '02. Premium Products',
                  desc: 'German polishing compounds, pH-neutral snow foams, and high-solids 9H SiO2 coatings.',
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5 text-[#CFE3F2]" />,
                  title: '03. Satisfaction Guaranteed',
                  desc: 'We conduct a thorough walk-around inspection with you before completing every booking.',
                },
                {
                  icon: <Sparkles className="w-5 h-5 text-[#CFE3F2]" />,
                  title: '04. Attention to Detail',
                  desc: 'Two-bucket grit guards, compressed-air crevice purging, and OEM matte leather finishes.',
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-[#121316] border border-white/10 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A1C20] border border-white/12 flex items-center justify-center mb-4">
                    {pillar.icon}
                  </div>
                  <div>
                    <h2 className="text-sm font-display font-bold uppercase tracking-wider text-white">
                      {pillar.title}
                    </h2>
                    <p className="text-xs text-[#A7ABB3] mt-1.5 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CORE SERVICES GRID (8 SERVICES) */}
        <section id="services" className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
                  Your Car Deserves the Gentleman’s Treatment
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-chrome">
                  Mobile Detailing Services
                </h2>
              </div>
              <p className="text-sm text-[#A7ABB3] max-w-md">
                Every treatment is performed on-site across Perth using safe, swirl-free wash media and dedicated inspection lighting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CORE_SERVICES.map((service) => (
                <article
                  key={service.id}
                  className="gents-card rounded-2xl p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono-tabular font-bold text-[#8FA7BA]">
                        {service.index}.
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#0A0A0B] border border-white/12 group-hover:border-[#CFE3F2]/50 flex items-center justify-center transition-colors">
                        {renderServiceIcon(service.iconName)}
                      </div>
                    </div>

                    <h3 className="text-lg font-display font-bold uppercase text-white tracking-wide">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 text-xs text-[#A7ABB3] leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <ul className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                      {service.highlights.map((h) => (
                        <li key={h} className="text-[11px] text-white/90 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#CFE3F2] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-mono-tabular uppercase text-[#A7ABB3]">
                        {service.duration}
                      </span>
                      <span className="text-sm font-mono-tabular font-bold text-white">
                        From ${service.startingPrice} AUD
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToBookingWithSelection(service.id)}
                      className="px-3.5 py-2 rounded-lg bg-[#1A1C20] hover:bg-[#CFE3F2] text-white hover:text-black text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Book Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FEATURED SPECIALTIES (3 LARGE ALTERNATING IMAGE/TEXT BLOCKS) */}
        <section className="py-24 bg-[#0A0A0B] border-t border-white/10 space-y-24">
          {/* Specialty 01: Paint Correction */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <SpecialtyArtwork type="paint-correction" />
              </div>
              <div className="lg:col-span-6">
                <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-2">
                  Specialty 01 · Optical Clear Coat Refinement
                </p>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-chrome">
                  Multi-Stage Paint Correction
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#A7ABB3] leading-relaxed">
                  Automated brush car washes and improper drying towels leave thousands of microscopic scratches that dull your vehicle’s colour. Using ultrasonic paint depth gauges and dual-action German polishers, we safely level clear coat imperfections to restore liquid-mirror depth.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Removes up to 95% of swirl marks & holograms',
                    'Ultrasonic clear-coat thickness mapping',
                    'Eliminates hard WA bore-water mineral etching',
                    'Essential preparation before Ceramic Coating',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5 text-xs text-white">
                      <Check className="w-4 h-4 text-[#CFE3F2] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToBookingWithSelection('paint-correction')}
                    className="shine-sweep inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono-tabular text-[#A7ABB3]">
                    From $420 AUD · Shaded garage/carport recommended
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specialty 02: Ceramic Coatings */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2">
                <SpecialtyArtwork type="ceramic-coating" />
              </div>
              <div className="lg:col-span-6 lg:order-1">
                <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-2">
                  Specialty 02 · Extreme WA Sun & Coastal Defence
                </p>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-chrome">
                  9H SiO2 & Graphene Ceramic Coatings
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#A7ABB3] leading-relaxed">
                  Perth’s intense summer UV index and coastal sea breeze rapidly oxidise unprotected paint. Our covalent-bond ceramic coatings create a permanent glass-like barrier that repels water, bird droppings, brake dust, and road grime for years—not weeks.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '118° super-hydrophobic water beading angle',
                    'Blocks UV oxidation & clear-coat fading',
                    'Cuts routine washing time in half',
                    'Dedicated coatings for paint, alloys & glass',
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5 text-xs text-white">
                      <Check className="w-4 h-4 text-[#CFE3F2] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToBookingWithSelection('ceramic-coating')}
                    className="shine-sweep inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono-tabular text-[#A7ABB3]">
                    From $690 AUD · 3-Year & 5-Year Packages
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specialty 03: Steam Cleaning & Pet Hair Removal (with subtle animated steam background) */}
          <div className="relative py-12 overflow-hidden">
            <SteamParticlesCanvas />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-6">
                  <SpecialtyArtwork type="steam-cleaning" />
                </div>
                <div className="lg:col-span-6">
                  <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-2">
                    Specialty 03 · Cabin Hygiene & Fur Extraction
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-chrome">
                    160°C Steam Sanitising & Pet Hair Removal
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-[#A7ABB3] leading-relaxed">
                    Whether your SUV returns from North Cottesloe dog beach covered in Labrador fur and sand, or your daily commuter needs a hospital-grade cabin reset, our 160°C dry vapour steam and electrostatic extraction leave every surface spotless, dry, and allergen-free.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Kills 99.9% of bacteria, mould & dust mites',
                      'Lifts embedded dog fur from boot & seat pile',
                      'Restores factory dead-matte leather finish',
                      'Eliminates wet-dog, smoke & spilled coffee odours',
                    ].map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2.5 text-xs text-white">
                        <Check className="w-4 h-4 text-[#CFE3F2] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToBookingWithSelection('steam-cleaning')}
                      className="shine-sweep inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <span>Book This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono-tabular text-[#A7ABB3]">
                      Steam Clean from $185 · Pet Hair Removal from $140
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PACKAGES / PRICING (IN AUD) */}
        <section id="packages" className="py-24 bg-black border-t border-white/12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
                Transparent Pricing in AUD · Delivered to Your Door
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-chrome">
                Detailing Packages
              </h2>
              <p className="mt-3 text-[#A7ABB3] text-base">
                Choose the level of care your vehicle requires. Clicking any package pre-selects it in our online booking calculator below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PACKAGE_TIERS.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-[#1A1C20] to-[#121316] border-2 border-[#CFE3F2] shadow-[0_0_50px_rgba(207,227,242,0.16)] lg:-translate-y-2'
                      : 'gents-card'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#A7ABB3]">
                        {pkg.duration}
                      </span>
                      {pkg.popular && (
                        <span className="text-xs font-mono-tabular font-bold uppercase tracking-widest text-[#EAF5FF]">
                          ★ Most Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-display font-extrabold uppercase text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs font-serif-accent italic text-[#CFE3F2] text-lg mt-0.5">
                      {pkg.subtitle}
                    </p>

                    <div className="mt-5 pb-5 border-b border-white/10 flex items-baseline gap-2">
                      <span className="text-xs text-[#A7ABB3] uppercase">From</span>
                      <span className="text-4xl font-mono-tabular font-extrabold text-white">
                        ${pkg.basePrice}
                      </span>
                      <span className="text-xs font-mono-tabular text-[#CFE3F2]">AUD</span>
                    </div>

                    <p className="mt-4 text-xs text-[#A7ABB3] leading-relaxed">{pkg.description}</p>

                    <ul className="mt-6 space-y-3">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-white">
                          <Check className="w-4 h-4 text-[#CFE3F2] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => scrollToBookingWithSelection(pkg.id)}
                      className={`shine-sweep w-full py-3.5 px-5 rounded-xl font-display font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        pkg.popular
                          ? 'bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black shadow-[0_0_25px_rgba(207,227,242,0.3)]'
                          : 'bg-[#1A1C20] hover:bg-[#CFE3F2] text-white hover:text-black border border-white/15'
                      }`}
                    >
                      Book This Package
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs font-mono-tabular text-[#A7ABB3]">
              * Prices vary by vehicle size and condition. Final quote confirmed before service.
            </p>
          </div>
        </section>

        {/* 7. BEFORE / AFTER INTERACTIVE GALLERY & LIGHTBOX */}
        <BeforeAfterSection onSelectServiceForBooking={scrollToBookingWithSelection} />

        {/* 8. HOW IT WORKS (4 ANIMATED STEPS) */}
        <section className="py-20 bg-black border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-2">
                Effortless Convenience
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-chrome">
                How Mobile Detailing Works
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Book Online',
                  desc: 'Select your package, vehicle size, and preferred AWST date and time in 60 seconds.',
                },
                {
                  step: '02',
                  title: 'We Confirm',
                  desc: 'Receive an instant booking reference and a courtesy SMS confirmation from our Perth team.',
                },
                {
                  step: '03',
                  title: 'We Come to You',
                  desc: 'Our mobile studio arrives at your home driveway or workplace anywhere across Greater Perth.',
                },
                {
                  step: '04',
                  title: 'Enjoy the Shine',
                  desc: 'Inspect the finished vehicle with your detailer before making simple card or PayID payment.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="gents-card rounded-2xl p-6 relative flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono-tabular font-bold text-[#CFE3F2]">
                      {item.step}.
                    </span>
                    <span className="h-[1px] flex-1 bg-white/10 ml-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold uppercase text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A7ABB3] mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CORE BOOKING SYSTEM (MULTI-STEP FORM + LOCALSTORAGE) */}
        <BookingSystem
          preselectedTarget={preselectedTarget}
          showMyBookingsModal={showMyBookingsModal}
          setShowMyBookingsModal={setShowMyBookingsModal}
          savedBookings={savedBookings}
          onSaveBooking={handleSaveBooking}
          onDeleteBooking={handleDeleteBooking}
        />

        {/* 10. PERTH SERVICE AREA MAP & SUBURBS */}
        <PerthServiceArea />

        {/* 11. REVIEWS CAROUSEL (6 REALISTIC SAMPLE PERTH REVIEWS) */}
        <section
          id="reviews"
          onMouseEnter={() => setReviewPaused(true)}
          onMouseLeave={() => setReviewPaused(false)}
          className="py-24 bg-black border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
                  5.0 ★ Rating Summary · Perth Drivers
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-chrome">
                  Client Reviews
                </h2>
              </div>

              {/* Carousel Prev/Next Controls */}
              <div className="flex items-center gap-3">
                <div className="mr-3 text-right hidden sm:block">
                  <div className="flex items-center gap-1 text-[#EAF5FF]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#CFE3F2] text-[#CFE3F2]" />
                    ))}
                    <span className="ml-2 text-sm font-mono-tabular font-bold text-white">5.0 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-[#A7ABB3]">Perth Mobile Detailing Clients</p>
                </div>

                <button
                  type="button"
                  aria-label="Previous review"
                  onClick={() =>
                    setActiveReviewIndex(
                      (prev) => (prev - 1 + SAMPLE_REVIEWS.length) % SAMPLE_REVIEWS.length
                    )
                  }
                  className="w-10 h-10 rounded-xl bg-[#121316] border border-white/15 hover:border-[#CFE3F2] flex items-center justify-center text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next review"
                  onClick={() =>
                    setActiveReviewIndex((prev) => (prev + 1) % SAMPLE_REVIEWS.length)
                  }
                  className="w-10 h-10 rounded-xl bg-[#121316] border border-white/15 hover:border-[#CFE3F2] flex items-center justify-center text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3-Card Visible Window from the 6 Sample Perth Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const review = SAMPLE_REVIEWS[(activeReviewIndex + offset) % SAMPLE_REVIEWS.length];
                return (
                  <article
                    key={`${review.id}-${offset}`}
                    className="gents-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-3.5 h-3.5 fill-[#CFE3F2] text-[#CFE3F2]"
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-mono-tabular text-[#A7ABB3]">
                          {review.date}
                        </span>
                      </div>

                      <p className="text-sm text-white/95 leading-relaxed">“{review.text}”</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[#1A1C20] border border-[#CFE3F2]/40 flex items-center justify-center font-display font-bold text-xs text-[#EAF5FF] shrink-0">
                        {review.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-display font-bold uppercase text-white truncate">
                          {review.author} · {review.suburb}
                        </p>
                        <p className="text-[11px] font-mono-tabular text-[#CFE3F2] truncate">
                          {review.vehicle} — {review.service}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 12. FAQ ACCORDION */}
        <section id="faq" className="py-24 bg-[#0A0A0B] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
                Everything You Need to Know
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-chrome">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3.5">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-colors ${
                      isOpen
                        ? 'bg-[#121316] border-[#CFE3F2]/50'
                        : 'bg-[#121316]/60 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : item.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-display font-bold uppercase text-white">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#CFE3F2] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#A7ABB3] leading-relaxed border-t border-white/5">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 13. CONTACT SECTION */}
        <section id="contact" className="py-24 bg-black border-t border-white/12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Contact Information */}
              <div className="lg:col-span-5">
                <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
                  Direct Gentleman’s Concierge
                </p>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-chrome">
                  Get in Touch
                </h2>
                <p className="mt-3 text-sm text-[#A7ABB3] leading-relaxed">
                  Have a question about multi-stage paint correction, fleet accounts, or bespoke ceramic protection? Call us directly or send a quick message.
                </p>

                <div className="mt-8 space-y-4">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="gents-card p-5 rounded-2xl flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0A0A0B] border border-white/15 group-hover:border-[#CFE3F2] flex items-center justify-center text-[#CFE3F2]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono-tabular uppercase text-[#A7ABB3] block">
                        Direct Mobile (Click to Call)
                      </span>
                      <span className="text-lg font-mono-tabular font-bold text-white group-hover:text-[#EAF5FF]">
                        {BUSINESS_INFO.phoneDisplay}
                      </span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="gents-card p-5 rounded-2xl flex items-center gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#0A0A0B] border border-white/15 group-hover:border-[#CFE3F2] flex items-center justify-center text-[#CFE3F2]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono-tabular uppercase text-[#A7ABB3] block">
                        Email Enquiries
                      </span>
                      <span className="text-sm font-mono-tabular text-white group-hover:text-[#EAF5FF]">
                        {BUSINESS_INFO.email}
                      </span>
                    </div>
                  </a>

                  <div className="gents-card p-5 rounded-2xl flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#0A0A0B] border border-white/15 flex items-center justify-center text-[#CFE3F2]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono-tabular uppercase text-[#A7ABB3] block">
                        Service Hours & Coverage
                      </span>
                      <span className="text-sm font-semibold text-white block">
                        {BUSINESS_INFO.hours}
                      </span>
                      <span className="text-xs text-[#A7ABB3]">
                        Perth, WA · All Metro Suburbs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="lg:col-span-7 gents-card rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-display font-bold uppercase text-white mb-1">
                  Quick Quote or Question
                </h3>
                <p className="text-xs text-[#A7ABB3] mb-6">
                  We typically respond within 30 minutes during Perth business hours.
                </p>

                {contactSubmitted ? (
                  <div className="p-8 rounded-xl bg-[#0A0A0B] border border-[#CFE3F2]/40 text-center">
                    <Check className="w-10 h-10 text-[#EAF5FF] mx-auto mb-3" />
                    <h4 className="text-lg font-display font-bold uppercase text-white">
                      Enquiry Received, {contactName}
                    </h4>
                    <p className="text-xs text-[#A7ABB3] mt-1 max-w-md mx-auto">
                      Thank you for contacting The Gents Detailing Co. We will call or SMS you on{' '}
                      <span className="text-white font-mono-tabular">{contactPhone}</span> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSubmitted(false);
                        setContactName('');
                        setContactPhone('');
                        setContactMessage('');
                      }}
                      className="mt-5 px-5 py-2.5 rounded-lg bg-[#1A1C20] border border-white/15 text-xs font-display font-bold uppercase text-white cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickContactSubmit} className="space-y-4">
                    {contactError && (
                      <div className="p-3.5 rounded-xl bg-[#1A1C20] border border-[#CFE3F2] text-xs text-white">
                        {contactError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="q-name" className="block text-xs font-medium text-white mb-1.5">
                          Your Name *
                        </label>
                        <input
                          id="q-name"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Alex Mercer"
                          className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                        />
                      </div>
                      <div>
                        <label htmlFor="q-phone" className="block text-xs font-medium text-white mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          id="q-phone"
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="04XX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white font-mono-tabular placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="q-suburb" className="block text-xs font-medium text-white mb-1.5">
                        Perth Suburb & Vehicle Model
                      </label>
                      <input
                        id="q-suburb"
                        type="text"
                        value={contactSuburb}
                        onChange={(e) => setContactSuburb(e.target.value)}
                        placeholder="e.g. Cottesloe — 2023 Porsche Macan"
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                      />
                    </div>

                    <div>
                      <label htmlFor="q-msg" className="block text-xs font-medium text-white mb-1.5">
                        How Can We Help? *
                      </label>
                      <textarea
                        id="q-msg"
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell us about your car’s paintwork, interior condition, or preferred day..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="shine-sweep w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black font-display font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 14. QUIET FOOTER */}
      <footer className="bg-[#050506] border-t border-white/12 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5">
              <BrandLogo size="md" className="items-start" />
              <p className="mt-4 text-xs uppercase font-mono-tabular tracking-[0.2em] text-[#CFE3F2]">
                Perth Mobile Car Detailing
              </p>
              <p className="mt-2 text-xs text-[#A7ABB3] max-w-sm leading-relaxed">
                Premium detailing, delivered to your door. Paint correction, 9H ceramic coatings, 160°C dry vapour steam sanitising, and pet hair removal across Perth, Western Australia.
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-xs text-[#A7ABB3]">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Mobile Detailing Services
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-white transition-colors">
                    Packages & Pricing (AUD)
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white transition-colors">
                    Before & After Gallery
                  </a>
                </li>
                <li>
                  <a href="#booking" className="hover:text-white transition-colors">
                    Online Booking Calculator
                  </a>
                </li>
                <li>
                  <a href="#service-area" className="hover:text-white transition-colors">
                    Perth Suburbs Covered
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white mb-4">
                Perth Booking Desk
              </h3>
              <p className="text-sm font-mono-tabular font-bold text-white">
                <a href={BUSINESS_INFO.phoneHref} className="hover:text-[#CFE3F2]">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
              <p className="text-xs text-[#A7ABB3] mt-1">{BUSINESS_INFO.email}</p>
              <p className="text-xs text-[#A7ABB3] mt-1">{BUSINESS_INFO.hours}</p>

              <div className="mt-5 flex items-center gap-3 text-xs font-display font-bold uppercase tracking-wider text-[#CFE3F2]">
                <a
                  href={BUSINESS_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#121316] border border-white/12 hover:border-[#CFE3F2]"
                >
                  Instagram
                </a>
                <a
                  href={BUSINESS_INFO.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#121316] border border-white/12 hover:border-[#CFE3F2]"
                >
                  Facebook
                </a>
                <a
                  href={BUSINESS_INFO.socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#121316] border border-white/12 hover:border-[#CFE3F2]"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7ABB3]">
            <p>© 2024 The Gents Detailing Co. All rights reserved.</p>
            <p className="font-serif-accent italic text-base text-[#CFE3F2]">
              “Your car deserves the gentleman’s treatment.”
            </p>
          </div>
        </div>
      </footer>

      {/* 15. FLOATING ACTION BUTTONS (CALL & BACK TO TOP) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {showBackToTop && (
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-[#0A0A0B]/95 border border-white/20 hover:border-[#CFE3F2] text-white hover:text-[#EAF5FF] shadow-lg flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={BUSINESS_INFO.phoneHref}
          aria-label="Call The Gents Detailing Co on 0447 826 355"
          className="shine-sweep inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-black border border-[#CFE3F2]/60 text-white shadow-[0_0_30px_rgba(207,227,242,0.25)] hover:border-[#EAF5FF] transition-all"
        >
          <span className="w-7 h-7 rounded-full bg-[#CFE3F2] text-black flex items-center justify-center">
            <Phone className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-mono-tabular font-bold tracking-wider pr-1">
            0447 826 355
          </span>
        </a>
      </div>
    </div>
  );
}
