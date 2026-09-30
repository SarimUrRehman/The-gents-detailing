import React, { useState, useEffect, useMemo } from 'react';
import {
  Check,
  Calendar,
  Clock,
  Car,
  MapPin,
  User,
  Phone,
  Mail,
  FileText,
  ChevronRight,
  ChevronLeft,
  BookmarkCheck,
  Trash2,
  Copy,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  PACKAGE_TIERS,
  CORE_SERVICES,
  ADD_ON_OPTIONS,
  VEHICLE_SIZES,
  PERTH_SUBURBS,
  VehicleSizeOption,
} from '../data/detailingData';

export interface SavedBooking {
  reference: string;
  createdAt: string;
  selectionType: 'package' | 'service';
  primarySelectionId: string;
  primarySelectionName: string;
  addOnIds: string[];
  addOnNames: string[];
  vehicleType: VehicleSizeOption['id'];
  vehicleTypeLabel: string;
  make: string;
  model: string;
  year: string;
  colour: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerNotes: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  accessNotes: string;
  estimatedTotalAUD: number;
}

interface BookingSystemProps {
  preselectedTarget: string | null;
  showMyBookingsModal: boolean;
  setShowMyBookingsModal: (show: boolean) => void;
  savedBookings: SavedBooking[];
  onSaveBooking: (booking: SavedBooking) => void;
  onDeleteBooking: (reference: string) => void;
}

const TIME_SLOTS_AWST = [
  { id: '07:30', label: '07:30 AM AWST', note: 'Early Morning Driveway' },
  { id: '10:00', label: '10:00 AM AWST', note: 'Mid-Morning Slot' },
  { id: '13:00', label: '01:00 PM AWST', note: 'Afternoon Slot' },
  { id: '15:30', label: '03:30 PM AWST', note: 'Late Afternoon Express' },
];

/**
 * Generates upcoming 14 available service dates (Mon–Sat in Perth AWST).
 */
function getAvailableServiceDates(): { iso: string; dayShort: string; dateNum: string; monthShort: string; fullLabel: string }[] {
  const result = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1); // Start from tomorrow

  while (result.length < 14) {
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek !== 0) {
      // Skip Sundays
      const iso = cursor.toISOString().split('T')[0];
      const dayShort = cursor.toLocaleDateString('en-AU', { weekday: 'short' });
      const dateNum = cursor.toLocaleDateString('en-AU', { day: '2-digit' });
      const monthShort = cursor.toLocaleDateString('en-AU', { month: 'short' });
      const fullLabel = cursor.toLocaleDateString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      result.push({ iso, dayShort, dateNum, monthShort, fullLabel });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

/**
 * Validates Australian mobile phone numbers (04XX XXX XXX or +61 4XX XXX XXX)
 */
function isValidAustralianMobile(input: string): boolean {
  const digits = input.replace(/\s|-/g, '');
  return /^(04\d{8}|\+614\d{8})$/.test(digits);
}

/**
 * Formats an Australian mobile phone string cleanly as 04XX XXX XXX
 */
function formatAustralianMobile(raw: string): string {
  const cleaned = raw.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('04') && cleaned.length <= 10) {
    const p1 = cleaned.slice(0, 4);
    const p2 = cleaned.slice(4, 7);
    const p3 = cleaned.slice(7, 10);
    return [p1, p2, p3].filter(Boolean).join(' ');
  }
  return raw;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  preselectedTarget,
  showMyBookingsModal,
  setShowMyBookingsModal,
  savedBookings,
  onSaveBooking,
  onDeleteBooking,
}) => {
  const availableDates = useMemo(() => getAvailableServiceDates(), []);

  // Multi-step state (1 to 5, plus 6 = confirmed screen)
  const [step, setStep] = useState<number>(1);
  const [selectionMode, setSelectionMode] = useState<'package' | 'service'>('package');
  const [selectedPrimaryId, setSelectedPrimaryId] = useState<string>('pkg-signature');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Step 2: Vehicle details
  const [vehicleType, setVehicleType] = useState<VehicleSizeOption['id']>('suv');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('2024');
  const [colour, setColour] = useState<string>('');

  // Step 3: Date & AWST Time
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.iso || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00');

  // Step 4: Customer & Perth Location
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [suburb, setSuburb] = useState<string>('Applecross');
  const [postcode, setPostcode] = useState<string>('6153');
  const [accessNotes, setAccessNotes] = useState<string>('Driveway parking with access to domestic water tap & power');

  // Validation error message
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<SavedBooking | null>(null);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Sync external preselected package or service
  useEffect(() => {
    if (!preselectedTarget) return;
    const pkgMatch = PACKAGE_TIERS.find(
      (p) => p.id === preselectedTarget || p.name.toLowerCase() === preselectedTarget.toLowerCase()
    );
    if (pkgMatch) {
      setSelectionMode('package');
      setSelectedPrimaryId(pkgMatch.id);
      setStep(1);
      setConfirmedBooking(null);
      return;
    }

    const srvMatch = CORE_SERVICES.find(
      (s) =>
        s.id === preselectedTarget ||
        preselectedTarget.toLowerCase().includes(s.title.split(' ')[0].toLowerCase())
    );
    if (srvMatch) {
      setSelectionMode('service');
      setSelectedPrimaryId(srvMatch.id);
      setStep(1);
      setConfirmedBooking(null);
    }
  }, [preselectedTarget]);

  // Deterministically disable 1 slot per date to simulate real Perth AWST availability
  const isSlotUnavailable = (dateIso: string, slotId: string): boolean => {
    const daySum = dateIso.split('-').reduce((acc, part) => acc + Number(part || 0), 0);
    if (daySum % 2 === 0 && slotId === '15:30') return true;
    if (daySum % 2 === 1 && slotId === '07:30') return true;
    return false;
  };

  // Ensure selected time slot is valid when date changes
  useEffect(() => {
    if (isSlotUnavailable(selectedDate, selectedTimeSlot)) {
      const firstOpen = TIME_SLOTS_AWST.find((t) => !isSlotUnavailable(selectedDate, t.id));
      if (firstOpen) setSelectedTimeSlot(firstOpen.id);
    }
  }, [selectedDate, selectedTimeSlot]);

  // Calculate live price estimate in AUD
  const pricingSummary = useMemo(() => {
    const pkg = PACKAGE_TIERS.find((p) => p.id === selectedPrimaryId);
    const srv = CORE_SERVICES.find((s) => s.id === selectedPrimaryId);

    const basePrice = selectionMode === 'package' ? pkg?.basePrice || 290 : srv?.startingPrice || 210;
    const primaryName = selectionMode === 'package' ? pkg?.name || 'Signature Detail' : srv?.title || 'Paint Correction';

    const sizeObj = VEHICLE_SIZES.find((v) => v.id === vehicleType) || VEHICLE_SIZES[0];
    const addOnObjects = ADD_ON_OPTIONS.filter((a) => selectedAddOns.includes(a.id));
    const addOnTotal = addOnObjects.reduce((sum, item) => sum + item.price, 0);

    const totalAUD = basePrice + sizeObj.priceAdder + addOnTotal;
    return {
      primaryName,
      basePrice,
      sizeLabel: sizeObj.label,
      sizeAdder: sizeObj.priceAdder,
      addOnObjects,
      addOnTotal,
      totalAUD,
    };
  }, [selectionMode, selectedPrimaryId, vehicleType, selectedAddOns]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSuburbChange = (newSuburb: string) => {
    setSuburb(newSuburb);
    const found = PERTH_SUBURBS.find((s) => s.name === newSuburb);
    if (found) setPostcode(found.postcode);
  };

  const validateAndProceed = (targetStep: number) => {
    setErrorMsg(null);

    if (step === 2 && targetStep > 2) {
      if (!make.trim() || !model.trim() || !colour.trim()) {
        setErrorMsg('Please enter your vehicle make, model, and exterior colour so we pack the right pads and compounds.');
        return;
      }
    }

    if (step === 3 && targetStep > 3) {
      if (!selectedDate || !selectedTimeSlot) {
        setErrorMsg('Please select a preferred service date and AWST time slot.');
        return;
      }
    }

    if (step === 4 && targetStep > 4) {
      if (!customerName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!isValidAustralianMobile(customerPhone)) {
        setErrorMsg('Please enter a valid Australian mobile number (e.g. 0447 826 355).');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
        setErrorMsg('Please enter a valid email address for your booking confirmation.');
        return;
      }
      if (!streetAddress.trim() || !postcode.trim()) {
        setErrorMsg('Please provide the street address and postcode where we will detail your vehicle.');
        return;
      }
    }

    setStep(targetStep);
  };

  const handleConfirmBooking = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const reference = `GENT-PER-${randomDigits}`;
    const timeLabel = TIME_SLOTS_AWST.find((t) => t.id === selectedTimeSlot)?.label || selectedTimeSlot;
    const dateLabel = availableDates.find((d) => d.iso === selectedDate)?.fullLabel || selectedDate;

    const newBooking: SavedBooking = {
      reference,
      createdAt: new Date().toLocaleString('en-AU', { timeZone: 'Australia/Perth' }),
      selectionType: selectionMode,
      primarySelectionId: selectedPrimaryId,
      primarySelectionName: pricingSummary.primaryName,
      addOnIds: selectedAddOns,
      addOnNames: pricingSummary.addOnObjects.map((a) => a.name),
      vehicleType,
      vehicleTypeLabel: pricingSummary.sizeLabel,
      make: make.trim(),
      model: model.trim(),
      year: year.trim(),
      colour: colour.trim(),
      date: dateLabel,
      timeSlot: timeLabel,
      customerName: customerName.trim(),
      customerPhone: formatAustralianMobile(customerPhone),
      customerEmail: customerEmail.trim(),
      customerNotes: customerNotes.trim(),
      streetAddress: streetAddress.trim(),
      suburb,
      postcode: postcode.trim(),
      accessNotes: accessNotes.trim(),
      estimatedTotalAUD: pricingSummary.totalAUD,
    };

    onSaveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setStep(6);
  };

  const resetFormForAnother = () => {
    setConfirmedBooking(null);
    setStep(1);
    setMake('');
    setModel('');
    setColour('');
    setCustomerNotes('');
  };

  const stepsMeta = [
    { num: 1, label: 'Service & Add-Ons' },
    { num: 2, label: 'Vehicle Details' },
    { num: 3, label: 'Date & AWST Time' },
    { num: 4, label: 'Perth Address' },
    { num: 5, label: 'Review & Confirm' },
  ];

  return (
    <section id="booking" className="py-24 bg-black border-t border-white/12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & My Bookings Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2] mb-3">
              Instant Online Scheduling · AWST Timezone
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-chrome">
              Book Your Mobile Detail
            </h2>
            <p className="mt-3 text-[#A7ABB3] max-w-2xl text-base leading-relaxed">
              Reserve your driveway or workplace appointment across Perth in under 2 minutes. No upfront deposit required—pay upon inspection.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowMyBookingsModal(true)}
            className="self-start inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#121316] hover:bg-[#1A1C20] border border-white/15 hover:border-[#CFE3F2] text-xs font-display font-bold uppercase tracking-wider text-white transition-all cursor-pointer whitespace-nowrap"
          >
            <BookmarkCheck className="w-4 h-4 text-[#CFE3F2]" />
            <span>My Bookings ({savedBookings.length})</span>
          </button>
        </div>

        {/* Main Booking Grid: Left Multi-Step Form (8 cols) + Right Live Price Summary (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Step Progress + Active Form Step */}
          <div className="lg:col-span-8 gents-card rounded-2xl p-6 sm:p-8">
            {step <= 5 && (
              <div className="mb-8">
                {/* Step Indicator Bar */}
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {stepsMeta.map((s) => {
                    const isCurrent = step === s.num;
                    const isDone = step > s.num;
                    return (
                      <button
                        key={s.num}
                        type="button"
                        onClick={() => {
                          if (s.num < step) {
                            setErrorMsg(null);
                            setStep(s.num);
                          }
                        }}
                        disabled={s.num > step}
                        className={`text-left group ${s.num < step ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            isCurrent
                              ? 'bg-[#EAF5FF] shadow-[0_0_12px_#CFE3F2]'
                              : isDone
                              ? 'bg-[#8FA7BA]'
                              : 'bg-white/10'
                          }`}
                        />
                        <div className="mt-2 flex items-center gap-1.5">
                          <span
                            className={`text-[11px] font-mono-tabular font-semibold ${
                              isCurrent ? 'text-[#EAF5FF]' : isDone ? 'text-white' : 'text-[#A7ABB3]/60'
                            }`}
                          >
                            0{s.num}.
                          </span>
                          <span
                            className={`hidden sm:inline text-[11px] font-display font-bold uppercase tracking-wider truncate ${
                              isCurrent ? 'text-white' : isDone ? 'text-[#A7ABB3]' : 'text-[#A7ABB3]/50'
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Validation Banner */}
            {errorMsg && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-[#1A1C20] border border-[#CFE3F2] flex items-start gap-3 text-sm text-white"
              >
                <AlertCircle className="w-5 h-5 text-[#CFE3F2] shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: CHOOSE SERVICE / PACKAGE & ADD-ONS */}
            {step === 1 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-display font-bold uppercase text-white">
                      Step 01 · Select Package or Specialty Service
                    </h3>
                    <p className="text-xs text-[#A7ABB3] mt-1">
                      Choose one of our 3 signature packages or a dedicated standalone treatment.
                    </p>
                  </div>

                  <div className="inline-flex p-1 rounded-xl bg-[#0A0A0B] border border-white/12 self-start">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectionMode('package');
                        setSelectedPrimaryId('pkg-signature');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        selectionMode === 'package' ? 'bg-[#CFE3F2] text-black' : 'text-[#A7ABB3] hover:text-white'
                      }`}
                    >
                      Packages (3)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectionMode('service');
                        setSelectedPrimaryId('paint-correction');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                        selectionMode === 'service' ? 'bg-[#CFE3F2] text-black' : 'text-[#A7ABB3] hover:text-white'
                      }`}
                    >
                      Individual Services (8)
                    </button>
                  </div>
                </div>

                {selectionMode === 'package' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {PACKAGE_TIERS.map((pkg) => {
                      const active = selectedPrimaryId === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPrimaryId(pkg.id)}
                          className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                            active
                              ? 'bg-[#1A1C20] border-[#EAF5FF] shadow-[0_0_25px_rgba(207,227,242,0.18)]'
                              : 'bg-[#0A0A0B]/90 border-white/12 hover:border-white/30'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#CFE3F2]">
                                {pkg.popular ? '★ Most Popular' : pkg.duration}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                  active ? 'bg-[#CFE3F2] border-[#CFE3F2] text-black' : 'border-white/30'
                                }`}
                              >
                                {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                            <h4 className="text-base font-display font-bold uppercase text-white">{pkg.name}</h4>
                            <p className="text-xs text-[#A7ABB3] mt-1 leading-relaxed">{pkg.subtitle}</p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
                            <span className="text-xs text-[#A7ABB3]">From</span>
                            <span className="text-lg font-mono-tabular font-bold text-white">${pkg.basePrice} AUD</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {CORE_SERVICES.map((srv) => {
                      const active = selectedPrimaryId === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setSelectedPrimaryId(srv.id)}
                          className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            active
                              ? 'bg-[#1A1C20] border-[#EAF5FF] shadow-[0_0_20px_rgba(207,227,242,0.15)]'
                              : 'bg-[#0A0A0B]/90 border-white/12 hover:border-white/30'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-display font-bold uppercase text-white">{srv.title}</p>
                            <p className="text-xs font-mono-tabular text-[#A7ABB3] mt-0.5">
                              {srv.duration} · From ${srv.startingPrice} AUD
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center ${
                              active ? 'bg-[#CFE3F2] border-[#CFE3F2] text-black' : 'border-white/30'
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Optional Add-Ons */}
                <div>
                  <h4 className="text-xs font-mono-tabular uppercase tracking-[0.2em] text-[#CFE3F2] mb-3">
                    Optional Driveway Enhancements (Select Any)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADD_ON_OPTIONS.map((addon) => {
                      const checked = selectedAddOns.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleAddOn(addon.id)}
                          className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer ${
                            checked
                              ? 'bg-[#1A1C20] border-[#CFE3F2]'
                              : 'bg-[#0A0A0B]/70 border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-display font-bold uppercase text-white">{addon.name}</p>
                            <p className="text-[11px] text-[#A7ABB3] mt-0.5 leading-snug">{addon.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-mono-tabular font-semibold text-[#CFE3F2] block">
                              +${addon.price}
                            </span>
                            <span className="text-[10px] font-mono-tabular text-[#A7ABB3]">{addon.durationAdd}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: VEHICLE DETAILS */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-display font-bold uppercase text-white mb-1">
                  Step 02 · Your Vehicle Details
                </h3>
                <p className="text-xs text-[#A7ABB3] mb-6">
                  Select your vehicle body size and enter its make, model, and paint colour.
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#CFE3F2] mb-3">
                    Vehicle Size Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {VEHICLE_SIZES.map((v) => {
                      const active = vehicleType === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVehicleType(v.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            active
                              ? 'bg-[#1A1C20] border-[#EAF5FF] shadow-[0_0_20px_rgba(207,227,242,0.16)]'
                              : 'bg-[#0A0A0B] border-white/12 hover:border-white/30'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-display font-bold uppercase text-white">{v.label}</p>
                            <p className="text-[10px] text-[#A7ABB3] mt-1 line-clamp-2">{v.examples}</p>
                          </div>
                          <p className="mt-3 pt-2 border-t border-white/10 text-xs font-mono-tabular text-[#CFE3F2]">
                            {v.priceAdder === 0 ? 'Base Price' : `+$${v.priceAdder} AUD`}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="veh-make" className="block text-xs font-medium text-white mb-1.5">
                      Vehicle Make *
                    </label>
                    <input
                      id="veh-make"
                      type="text"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      placeholder="e.g. Porsche, BMW, Ford, Toyota"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                    />
                  </div>
                  <div>
                    <label htmlFor="veh-model" className="block text-xs font-medium text-white mb-1.5">
                      Vehicle Model *
                    </label>
                    <input
                      id="veh-model"
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="e.g. 911 Carrera, Ranger Raptor, Prado"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                    />
                  </div>
                  <div>
                    <label htmlFor="veh-year" className="block text-xs font-medium text-white mb-1.5">
                      Manufacture Year
                    </label>
                    <input
                      id="veh-year"
                      type="number"
                      min="1960"
                      max="2027"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white font-mono-tabular focus:outline-none focus:border-[#CFE3F2]"
                    />
                  </div>
                  <div>
                    <label htmlFor="veh-colour" className="block text-xs font-medium text-white mb-1.5">
                      Exterior Paint Colour *
                    </label>
                    <input
                      id="veh-colour"
                      type="text"
                      value={colour}
                      onChange={(e) => setColour(e.target.value)}
                      placeholder="e.g. Obsidian Black, Liquid Silver, Pearl White"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PICK DATE & AWST TIME SLOT */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-display font-bold uppercase text-white mb-1">
                  Step 03 · Select Date & AWST Time Slot
                </h3>
                <p className="text-xs text-[#A7ABB3] mb-6">
                  All appointments operate on Australian Western Standard Time (Perth AWST · UTC+8).
                </p>

                <div className="mb-6">
                  <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#CFE3F2] mb-3">
                    Available Dates (Mon – Sat)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                    {availableDates.map((d) => {
                      const active = selectedDate === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setSelectedDate(d.iso)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            active
                              ? 'bg-[#CFE3F2] border-[#EAF5FF] text-black shadow-[0_0_20px_rgba(207,227,242,0.3)]'
                              : 'bg-[#0A0A0B] border-white/12 text-white hover:border-white/30'
                          }`}
                        >
                          <span className={`block text-[10px] font-mono-tabular uppercase ${active ? 'text-black/80' : 'text-[#A7ABB3]'}`}>
                            {d.dayShort}
                          </span>
                          <span className="block text-lg font-mono-tabular font-bold my-0.5">{d.dateNum}</span>
                          <span className={`block text-[10px] uppercase font-semibold ${active ? 'text-black' : 'text-[#CFE3F2]'}`}>
                            {d.monthShort}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#CFE3F2] mb-3">
                    Arrival Window (Perth AWST)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TIME_SLOTS_AWST.map((slot) => {
                      const disabled = isSlotUnavailable(selectedDate, slot.id);
                      const active = selectedTimeSlot === slot.id && !disabled;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                            disabled
                              ? 'bg-[#0A0A0B]/40 border-white/5 opacity-45 cursor-not-allowed'
                              : active
                              ? 'bg-[#1A1C20] border-[#EAF5FF] shadow-[0_0_20px_rgba(207,227,242,0.16)] cursor-pointer'
                              : 'bg-[#0A0A0B] border-white/12 hover:border-white/30 cursor-pointer'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-mono-tabular font-bold text-white">{slot.label}</p>
                            <p className="text-xs text-[#A7ABB3] mt-0.5">
                              {disabled ? 'Booked out on this date' : slot.note}
                            </p>
                          </div>
                          <span className="text-[11px] font-mono-tabular uppercase text-[#CFE3F2]">
                            {disabled ? 'Unavailable' : active ? 'Selected ✓' : 'Available'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CUSTOMER DETAILS & PERTH LOCATION */}
            {step === 4 && (
              <div>
                <h3 className="text-xl font-display font-bold uppercase text-white mb-1">
                  Step 04 · Contact & Perth Service Address
                </h3>
                <p className="text-xs text-[#A7ABB3] mb-6">
                  Where in the Perth metro area should our mobile detailing unit meet you?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="cust-name" className="block text-xs font-medium text-white mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#A7ABB3] absolute left-3.5 top-3.5" />
                      <input
                        id="cust-name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="James Sterling"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cust-phone" className="block text-xs font-medium text-white mb-1.5">
                      Australian Mobile (04XX XXX XXX) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#A7ABB3] absolute left-3.5 top-3.5" />
                      <input
                        id="cust-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(formatAustralianMobile(e.target.value))}
                        placeholder="0447 826 355"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white font-mono-tabular placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="cust-email" className="block text-xs font-medium text-white mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#A7ABB3] absolute left-3.5 top-3.5" />
                      <input
                        id="cust-email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="james@example.com.au"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                      />
                    </div>
                  </div>
                </div>

                {/* Perth Service Location */}
                <div className="pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-3">
                    <label htmlFor="cust-street" className="block text-xs font-medium text-white mb-1.5">
                      Street Address (Home Driveway or Workplace) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#A7ABB3] absolute left-3.5 top-3.5" />
                      <input
                        id="cust-street"
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="42 Ardross Street"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="cust-suburb" className="block text-xs font-medium text-white mb-1.5">
                      Perth Suburb *
                    </label>
                    <select
                      id="cust-suburb"
                      value={suburb}
                      onChange={(e) => handleSuburbChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white focus:outline-none focus:border-[#CFE3F2]"
                    >
                      {PERTH_SUBURBS.map((s) => (
                        <option key={s.name} value={s.name} className="bg-[#0A0A0B] text-white">
                          {s.name} ({s.region})
                        </option>
                      ))}
                      <option value="Other Perth Metro Suburb" className="bg-[#0A0A0B] text-white">
                        Other Perth Metro Suburb
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cust-postcode" className="block text-xs font-medium text-white mb-1.5">
                      WA Postcode *
                    </label>
                    <input
                      id="cust-postcode"
                      type="text"
                      maxLength={4}
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ''))}
                      placeholder="6000"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white font-mono-tabular focus:outline-none focus:border-[#CFE3F2]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="cust-access" className="block text-xs font-medium text-white mb-1.5">
                      Parking, Shade & Water/Power Access Notes
                    </label>
                    <input
                      id="cust-access"
                      type="text"
                      value={accessNotes}
                      onChange={(e) => setAccessNotes(e.target.value)}
                      placeholder="e.g. Double garage available, outdoor tap on left side of driveway"
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="cust-notes" className="block text-xs font-medium text-white mb-1.5">
                      Special Requests or Vehicle Condition Notes (Optional)
                    </label>
                    <textarea
                      id="cust-notes"
                      rows={2}
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      placeholder="Let us know about specific scratches, dog fur in the boot, or child seats..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 text-sm text-white placeholder-[#A7ABB3]/50 focus:outline-none focus:border-[#CFE3F2]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: SUMMARY & CONFIRM */}
            {step === 5 && (
              <div>
                <h3 className="text-xl font-display font-bold uppercase text-white mb-1">
                  Step 05 · Review & Confirm Appointment
                </h3>
                <p className="text-xs text-[#A7ABB3] mb-6">
                  Please verify your Perth driveway appointment details below before locking in your slot.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[#0A0A0B] border border-white/12">
                    <p className="text-[11px] font-mono-tabular uppercase text-[#CFE3F2] mb-1">Service & Vehicle</p>
                    <p className="text-sm font-display font-bold uppercase text-white">{pricingSummary.primaryName}</p>
                    <p className="text-xs text-[#A7ABB3] mt-1">
                      {year} {make} {model} ({colour}) · {pricingSummary.sizeLabel}
                    </p>
                    {pricingSummary.addOnObjects.length > 0 && (
                      <p className="text-xs text-[#CFE3F2] mt-2">
                        + {pricingSummary.addOnObjects.map((a) => a.name).join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A0A0B] border border-white/12">
                    <p className="text-[11px] font-mono-tabular uppercase text-[#CFE3F2] mb-1">AWST Date & Location</p>
                    <p className="text-sm font-display font-bold text-white">
                      {availableDates.find((d) => d.iso === selectedDate)?.fullLabel}
                    </p>
                    <p className="text-xs font-mono-tabular text-[#CFE3F2] mt-0.5">
                      {TIME_SLOTS_AWST.find((t) => t.id === selectedTimeSlot)?.label}
                    </p>
                    <p className="text-xs text-[#A7ABB3] mt-1">
                      {streetAddress}, {suburb} WA {postcode}
                    </p>
                  </div>

                  <div className="sm:col-span-2 p-4 rounded-xl bg-[#0A0A0B] border border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-mono-tabular uppercase text-[#CFE3F2]">Client Contact</p>
                      <p className="text-xs text-white mt-0.5">
                        {customerName} · {customerPhone} · {customerEmail}
                      </p>
                      {accessNotes && <p className="text-[11px] text-[#A7ABB3] mt-0.5">Access: {accessNotes}</p>}
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] font-mono-tabular uppercase text-[#A7ABB3] block">Estimated Total</span>
                      <span className="text-2xl font-mono-tabular font-bold text-[#EAF5FF]">
                        ${pricingSummary.totalAUD} AUD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: SUCCESS SCREEN WITH ANIMATED CHECKMARK */}
            {step === 6 && confirmedBooking && (
              <div className="py-6 text-center">
                <div className="w-20 h-20 rounded-full bg-[#CFE3F2]/15 border-2 border-[#EAF5FF] mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(234,245,255,0.35)] mb-6">
                  <svg viewBox="0 0 52 52" className="w-10 h-10 text-[#EAF5FF]" fill="none">
                    <path
                      d="M14 27 L22 35 L38 17"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="text-xs font-mono-tabular uppercase tracking-[0.25em] text-[#CFE3F2]">
                  Booking Request Confirmed · Perth WA
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white mt-2">
                  We’ll See You on the Driveway, {confirmedBooking.customerName.split(' ')[0]}
                </h3>
                <p className="text-sm text-[#A7ABB3] max-w-lg mx-auto mt-2">
                  Your booking has been saved to this device and queued for our Perth detailing team.
                </p>

                {/* Reference Number Box */}
                <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0A0A0B] border border-[#CFE3F2]/40">
                  <div className="text-left">
                    <span className="block text-[10px] font-mono-tabular uppercase text-[#A7ABB3]">
                      Booking Reference
                    </span>
                    <span className="text-lg font-mono-tabular font-bold text-[#EAF5FF] tracking-wider">
                      {confirmedBooking.reference}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(confirmedBooking.reference);
                      setCopiedRef(confirmedBooking.reference);
                      setTimeout(() => setCopiedRef(null), 2000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#1A1C20] hover:bg-[#CFE3F2] hover:text-black text-xs font-mono-tabular text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedRef === confirmedBooking.reference ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="mt-6 max-w-xl mx-auto p-5 rounded-xl bg-[#0A0A0B] border border-white/12 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#A7ABB3]">Treatment:</span>
                    <span className="text-white font-semibold">{confirmedBooking.primarySelectionName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A7ABB3]">Vehicle:</span>
                    <span className="text-white">
                      {confirmedBooking.year} {confirmedBooking.make} {confirmedBooking.model} ({confirmedBooking.colour})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A7ABB3]">Appointment (AWST):</span>
                    <span className="text-[#CFE3F2] font-mono-tabular">
                      {confirmedBooking.date} · {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A7ABB3]">Service Location:</span>
                    <span className="text-white">
                      {confirmedBooking.streetAddress}, {confirmedBooking.suburb} WA {confirmedBooking.postcode}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-mono-tabular font-bold">
                    <span className="text-white">Estimated Price (Pay on Completion):</span>
                    <span className="text-[#EAF5FF]">${confirmedBooking.estimatedTotalAUD} AUD</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowMyBookingsModal(true)}
                    className="px-5 py-3 rounded-xl bg-[#1A1C20] border border-white/15 hover:border-[#CFE3F2] text-xs font-display font-bold uppercase tracking-wider text-white cursor-pointer"
                  >
                    View My Bookings ({savedBookings.length})
                  </button>
                  <button
                    type="button"
                    onClick={resetFormForAnother}
                    className="shine-sweep px-6 py-3 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black text-xs font-display font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Book Another Vehicle
                  </button>
                </div>
              </div>
            )}

            {/* Step Navigation Footer Buttons */}
            {step <= 5 && (
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg(null);
                      setStep((s) => s - 1);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 hover:border-white/40 text-xs font-display font-bold uppercase tracking-wider text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => validateAndProceed(step + 1)}
                    className="shine-sweep inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#CFE3F2] hover:bg-[#EAF5FF] text-black text-xs font-display font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(207,227,242,0.25)] cursor-pointer"
                  >
                    <span>Continue to {stepsMeta[step]?.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="shine-sweep inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#EAF5FF] hover:bg-white text-black text-xs font-display font-extrabold uppercase tracking-wider shadow-[0_0_30px_rgba(234,245,255,0.4)] cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirm Perth Booking · ${pricingSummary.totalAUD} AUD</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live Price Estimate & Gentleman's Guarantee Card */}
          <aside className="lg:col-span-4 gents-card rounded-2xl p-6 sm:p-7 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#CFE3F2]">
                  Live Estimate (AUD)
                </p>
                <h3 className="text-lg font-display font-bold uppercase text-white mt-0.5">
                  Booking Summary
                </h3>
              </div>
              <Sparkles className="w-5 h-5 text-[#CFE3F2]" />
            </div>

            <div className="py-5 space-y-3.5 text-xs border-b border-white/10">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[#A7ABB3] block">Selected Treatment</span>
                  <span className="text-white font-semibold text-sm">{pricingSummary.primaryName}</span>
                </div>
                <span className="font-mono-tabular text-white font-semibold">
                  ${pricingSummary.basePrice}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[#A7ABB3] block">Vehicle Size Adjustment</span>
                  <span className="text-white">{pricingSummary.sizeLabel}</span>
                </div>
                <span className="font-mono-tabular text-white">
                  {pricingSummary.sizeAdder === 0 ? 'Included' : `+$${pricingSummary.sizeAdder}`}
                </span>
              </div>

              {pricingSummary.addOnObjects.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-[#A7ABB3] block">Optional Add-Ons</span>
                  {pricingSummary.addOnObjects.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between text-white">
                      <span>{addon.name}</span>
                      <span className="font-mono-tabular text-[#CFE3F2]">+${addon.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[#A7ABB3]">
                <span>Perth Metro Mobile Callout</span>
                <span className="font-mono-tabular text-[#CFE3F2]">FREE ($0)</span>
              </div>
            </div>

            <div className="py-5 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase font-display font-bold tracking-wider text-white block">
                  Estimated Total
                </span>
                <span className="text-[11px] text-[#A7ABB3]">Inc. GST · Pay on completion</span>
              </div>
              <span className="text-3xl font-mono-tabular font-extrabold text-[#EAF5FF]">
                ${pricingSummary.totalAUD}{' '}
                <span className="text-xs font-normal text-[#A7ABB3]">AUD</span>
              </span>
            </div>

            <p className="text-[11px] text-[#A7ABB3] leading-relaxed bg-[#0A0A0B] p-3.5 rounded-xl border border-white/10">
              Prices vary by vehicle size and condition. Final quote confirmed before we begin any work on your driveway.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[#A7ABB3]">Prefer to book by phone?</span>
              <a
                href="tel:+61447826355"
                className="font-mono-tabular font-bold text-[#CFE3F2] hover:text-white underline underline-offset-4"
              >
                0447 826 355
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* MY BOOKINGS MODAL / DRAWER */}
      {showMyBookingsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="My Saved Bookings"
          onClick={() => setShowMyBookingsModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full rounded-2xl bg-[#121316] border border-white/20 p-6 sm:p-8 shadow-[0_0_60px_rgba(207,227,242,0.15)] max-h-[85vh] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#CFE3F2]">
                  Saved on Your Device
                </p>
                <h3 className="text-2xl font-display font-extrabold uppercase text-white">
                  My Perth Bookings ({savedBookings.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMyBookingsModal(false)}
                className="px-3.5 py-1.5 rounded-lg bg-[#1A1C20] border border-white/15 text-xs text-white hover:border-[#CFE3F2] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="my-6 overflow-y-auto space-y-4 pr-1">
              {savedBookings.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-xl bg-[#0A0A0B] border border-white/10">
                  <Calendar className="w-8 h-8 text-[#8FA7BA] mx-auto mb-3" />
                  <p className="text-sm font-display font-bold uppercase text-white">
                    No Saved Bookings Yet
                  </p>
                  <p className="text-xs text-[#A7ABB3] mt-1 max-w-sm mx-auto">
                    Complete the 5-step booking form to schedule your mobile car detail anywhere in Perth.
                  </p>
                </div>
              ) : (
                savedBookings.map((b) => (
                  <div
                    key={b.reference}
                    className="p-5 rounded-xl bg-[#0A0A0B] border border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono-tabular font-bold text-[#EAF5FF] px-2.5 py-0.5 rounded bg-[#1A1C20] border border-[#CFE3F2]/30">
                          {b.reference}
                        </span>
                        <span className="text-xs font-mono-tabular text-[#CFE3F2]">
                          ${b.estimatedTotalAUD} AUD
                        </span>
                      </div>
                      <h4 className="text-sm font-display font-bold uppercase text-white pt-1">
                        {b.primarySelectionName} · {b.year} {b.make} {b.model}
                      </h4>
                      <p className="text-xs text-[#A7ABB3]">
                        {b.date} at {b.timeSlot} · {b.streetAddress}, {b.suburb} WA {b.postcode}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteBooking(b.reference)}
                      aria-label={`Cancel booking ${b.reference}`}
                      className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1A1C20] hover:bg-white hover:text-black text-xs text-[#A7ABB3] transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A7ABB3]">
              <span>Need to modify an appointment time?</span>
              <a href="tel:+61447826355" className="font-mono-tabular font-bold text-[#CFE3F2] hover:text-white">
                Call 0447 826 355
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
