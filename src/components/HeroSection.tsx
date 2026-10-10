import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  MapPin,
  Luggage,
  Palmtree,
  Plane,
  Ship,
  Mountain,
  Landmark,
  Minus,
  Plus,
  Check,
  RotateCcw,
} from 'lucide-react';

import heroCoupleImg from '../assets/images/hero_seniors_travel_1791629726859.jpg';
import baliImg from '../assets/images/bali_indonesia_travel_1791626330048.jpg';
import keralaImg from '../assets/images/kerala_india_travel_1791626393188.jpg';
import kashmirImg from '../assets/images/kashmir_india_travel_1791626404208.jpg';
import dubaiImg from '../assets/images/dubai_uae_travel_1791626414499.jpg';
import thailandImg from '../assets/images/thailand_travel_1791626345806.jpg';
import singaporeImg from '../assets/images/singapore_travel_1791626357149.jpg';
import sriLankaImg from '../assets/images/sri_lanka_travel_1791626370332.jpg';

// The 6 Travel Categories matching reference
export const CATEGORIES = [
  { id: 'domestic', label: 'Domestic Holidays', icon: Palmtree },
  { id: 'international', label: 'International Trips', icon: Plane },
  { id: 'cruise', label: 'Cruise Holidays', icon: Ship },
  { id: 'group', label: 'Group Tours', icon: Users },
  { id: 'scenic', label: 'Scenic Getaways', icon: Mountain },
  { id: 'spiritual', label: 'Spiritual Journeys', icon: Landmark },
];

// The exact 7 Trending Destinations in specified order
export const TRENDING_DESTINATIONS = [
  { id: 'bali', name: 'Bali', image: baliImg },
  { id: 'kerala', name: 'Kerala', image: keralaImg },
  { id: 'kashmir', name: 'Kashmir', image: kashmirImg },
  { id: 'dubai', name: 'Dubai', image: dubaiImg },
  { id: 'thailand', name: 'Thailand', image: thailandImg },
  { id: 'singapore', name: 'Singapore', image: singaporeImg },
  { id: 'sri-lanka', name: 'Sri Lanka', image: sriLankaImg },
];

export const HeroSection: React.FC = () => {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState('domestic');
  const [isPackageDropdownOpen, setIsPackageDropdownOpen] = useState(false);
  const [packagePlacement, setPackagePlacement] = useState<'bottom' | 'top'>('bottom');
  const [packageRect, setPackageRect] = useState<DOMRect | null>(null);

  // Search input state
  const [destinationQuery, setDestinationQuery] = useState('');

  // Travel Month / Date picker state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarPlacement, setCalendarPlacement] = useState<'bottom' | 'top'>('bottom');
  const [calendarRect, setCalendarRect] = useState<DOMRect | null>(null);
  const [viewDate, setViewDate] = useState(() => new Date(2026, 9, 1)); // October 2026
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [confirmedDateLabel, setConfirmedDateLabel] = useState('Select dates');

  // Travellers state
  const [isTravellersOpen, setIsTravellersOpen] = useState(false);
  const [travellersPlacement, setTravellersPlacement] = useState<'bottom' | 'top'>('bottom');
  const [travellersRect, setTravellersRect] = useState<DOMRect | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Search confirmation notification
  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  // Refs for click outside handling
  const packageDropdownRef = useRef<HTMLDivElement>(null);
  const packageButtonRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const travellersRef = useRef<HTMLDivElement>(null);
  const travellersButtonRef = useRef<HTMLButtonElement>(null);

  // Click outside to close popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isPackageDropdownOpen &&
        packageDropdownRef.current &&
        !packageDropdownRef.current.contains(target) &&
        packageButtonRef.current &&
        !packageButtonRef.current.contains(target)
      ) {
        setIsPackageDropdownOpen(false);
      }

      if (
        isCalendarOpen &&
        calendarRef.current &&
        !calendarRef.current.contains(target) &&
        calendarButtonRef.current &&
        !calendarButtonRef.current.contains(target)
      ) {
        setIsCalendarOpen(false);
      }

      if (
        isTravellersOpen &&
        travellersRef.current &&
        !travellersRef.current.contains(target) &&
        travellersButtonRef.current &&
        !travellersButtonRef.current.contains(target)
      ) {
        setIsTravellersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPackageDropdownOpen, isCalendarOpen, isTravellersOpen]);

  // Keyboard Escape key to close popups
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPackageDropdownOpen(false);
        setIsCalendarOpen(false);
        setIsTravellersOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Total travellers count
  const totalTravellers = adults + children + infants;
  const travellerDisplay = `${totalTravellers} Traveller${totalTravellers === 1 ? '' : 's'}`;

  // Helper date calculations
  const today = new Date(2026, 9, 10); // 2026-10-10
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = viewDate.getFullYear();
  const currentMonthIndex = viewDate.getMonth();

  const handlePrevMonth = () => {
    if (currentYear > 2026 || (currentYear === 2026 && currentMonthIndex > 9)) {
      setViewDate(new Date(currentYear, currentMonthIndex - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonthIndex + 1, 1));
  };

  const isPrevDisabled = currentYear === 2026 && currentMonthIndex <= 9;

  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay();

  const handleDateClick = (day: number) => {
    const selected = new Date(currentYear, currentMonthIndex, day);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (selected < startDate) {
        setStartDate(selected);
        setEndDate(null);
      } else {
        setEndDate(selected);
      }
    }
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setConfirmedDateLabel('Select dates');
  };

  const handleDoneDates = () => {
    if (startDate && endDate) {
      const formatDate = (d: Date) =>
        `${d.getDate()} ${monthNames[d.getMonth()].slice(0, 3)}`;
      setConfirmedDateLabel(`${formatDate(startDate)} - ${formatDate(endDate)}`);
    } else if (startDate) {
      setConfirmedDateLabel(
        `${startDate.getDate()} ${monthNames[startDate.getMonth()].slice(0, 3)} ${startDate.getFullYear()}`
      );
    } else {
      setConfirmedDateLabel('Select dates');
    }
    setIsCalendarOpen(false);
  };

  const handleTogglePackage = () => {
    if (!isPackageDropdownOpen && packageButtonRef.current) {
      const rect = packageButtonRef.current.getBoundingClientRect();
      setPackageRect(rect);
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 260) {
        setPackagePlacement('top');
      } else {
        setPackagePlacement('bottom');
      }
    }
    setIsPackageDropdownOpen((prev) => !prev);
    setIsCalendarOpen(false);
    setIsTravellersOpen(false);
  };

  const handleToggleCalendar = () => {
    if (!isCalendarOpen && calendarButtonRef.current) {
      const rect = calendarButtonRef.current.getBoundingClientRect();
      setCalendarRect(rect);
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 380) {
        setCalendarPlacement('top');
      } else {
        setCalendarPlacement('bottom');
      }
    }
    setIsCalendarOpen((prev) => !prev);
    setIsPackageDropdownOpen(false);
    setIsTravellersOpen(false);
  };

  const handleToggleTravellers = () => {
    if (!isTravellersOpen && travellersButtonRef.current) {
      const rect = travellersButtonRef.current.getBoundingClientRect();
      setTravellersRect(rect);
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 320) {
        setTravellersPlacement('top');
      } else {
        setTravellersPlacement('bottom');
      }
    }
    setIsTravellersOpen((prev) => !prev);
    setIsPackageDropdownOpen(false);
    setIsCalendarOpen(false);
  };

  const handleSelectPackageType = (catId: string) => {
    setSelectedCategory(catId);
    setIsPackageDropdownOpen(false);
  };

  const handleDestinationSelect = (name: string) => {
    setDestinationQuery(name);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
    const dest = destinationQuery.trim() || 'All Destinations';
    const msg = `Searching ${categoryObj?.label}: "${dest}" | Dates: ${confirmedDateLabel} | ${adults} Adults, ${children} Children, ${infants} Infants`;
    setSearchNotification(msg);
    setTimeout(() => {
      setSearchNotification(null);
    }, 5000);
  };

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="relative w-full select-none">
      {/* VIBRANT FULL-WIDTH SCENIC TRAVEL BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base tropical sky & turquoise water backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #7ad5f9 0%, #a0e4fc 25%, #baeefd 50%, #6ee7b7 85%, #2dd4bf 100%)',
          }}
        />

        {/* Left Side: Senior couple travel photo in Thailand limestone bay */}
        <div className="absolute left-0 top-0 bottom-0 w-[55%] max-w-[800px] overflow-hidden">
          <img
            src={heroCoupleImg}
            alt="Smiling senior couple enjoying holiday"
            className="w-full h-full object-cover object-[center_20%] brightness-105 contrast-105"
          />
          {/* Subtle gradient feather to blend into center */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent sm:via-transparent sm:to-[#a0e4fc]/40" />
        </div>

        {/* Right Side: Scenic Balinese temple over lake with mountains & bright sunlight */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] max-w-[800px] overflow-hidden">
          <img
            src={baliImg}
            alt="Scenic Balinese temple over serene lake and mountains"
            className="w-full h-full object-cover object-[center_35%] brightness-105 contrast-105"
          />
          {/* Subtle gradient feather to blend into center */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#a0e4fc]/40" />
        </div>

        {/* Localized center radial bloom behind text for crisp contrast without washing out the photos */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 60% at 50% 32%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.65) 45%, rgba(255, 255, 255, 0.15) 75%, transparent 100%)',
          }}
        />

        {/* Soft bottom wash to ensure search boxes and circular thumbnails pop crisp */}
        <div className="absolute inset-x-0 bottom-0 h-[180px] bg-gradient-to-t from-[#22d3ee]/30 via-[#67e8f9]/20 to-transparent" />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 pb-6 sm:py-8">
        {/* Eyebrow / Kicker Header */}
        <div className="flex items-center justify-center gap-2.5 text-center mb-1.5">
          <span className="w-6 sm:w-14 h-[1.5px] bg-[#E58A1F]" aria-hidden="true" />
          <span className="text-[#000000] font-extrabold text-[11px] sm:text-[13px] tracking-wider uppercase drop-shadow-xs whitespace-nowrap">
            MEMORIES HAVE NO AGE LIMIT
          </span>
          <span className="w-6 sm:w-14 h-[1.5px] bg-[#E58A1F]" aria-hidden="true" />
        </div>

        {/* Main Headline */}
        <h1 className="text-center font-black text-[28px] sm:text-[42px] lg:text-[50px] leading-tight tracking-tight text-[#000000] mb-1.5 drop-shadow-xs whitespace-normal">
          Discover Holidays{' '}
          <span className="text-[#FFC928] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">Made for You</span>
        </h1>

        {/* Supporting Heading & Description */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-7">
          <p className="font-extrabold text-[15px] sm:text-[18px] text-[#000000] mb-0.5 drop-shadow-xs whitespace-normal">
            Comfortable. Memorable. Hassle-free.
          </p>
          <p className="text-[12.5px] sm:text-[14.5px] text-[#000000] font-medium leading-relaxed drop-shadow-xs px-2 sm:px-0">
            Thoughtfully planned holidays for senior travellers and families who want peace of mind.
          </p>
        </div>

        {/* Travel Category Icons Row (6 Categories in single non-scrollable row: 6-col grid on mobile, flex on desktop) */}
        <div className="grid grid-cols-6 gap-1 sm:gap-6 lg:gap-11 mb-6 sm:mb-8 overflow-visible md:flex md:flex-nowrap md:justify-center px-0.5 sm:px-2 pt-1 pb-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`group flex flex-col items-center gap-1 sm:gap-1 w-full md:w-auto md:shrink-0 md:min-w-[85px] px-0.5 sm:px-2 py-1 transition-all cursor-pointer relative ${
                  isSelected ? 'text-[#E58A1F]' : 'text-[#000000] hover:text-[#E58A1F]'
                }`}
              >
                <div
                  className={`w-5 h-5 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-[#E58A1F]' : 'text-[#000000]'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-7 sm:h-7" strokeWidth={1.8} />
                </div>
                <span
                  className={`text-[9px] sm:text-[13px] font-bold text-center whitespace-normal leading-tight w-full ${
                    isSelected ? 'text-[#E58A1F]' : 'text-[#000000]'
                  }`}
                >
                  {cat.label}
                </span>

                {/* Golden active underline indicator */}
                {isSelected && (
                  <span className="absolute -bottom-1.5 left-0.5 right-0.5 sm:left-1.5 sm:right-1.5 h-[2.5px] bg-[#E58A1F] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* HORIZONTAL SEARCH CONTROLS ROW — TWO COMPACT ROWS ON MOBILE, ONE ROW ON DESKTOP */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-9 relative">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-2 sm:gap-3"
          >
            {/* ROW 1 ON MOBILE (SIDE BY SIDE): Holiday Packages Dropdown + Destination Search Field */}
            <div className="flex flex-row items-center gap-2 w-full md:contents">
              {/* Box 1: Holiday Packages Dropdown */}
              <div className="relative shrink-0 w-[42%] md:w-[170px]">
                <button
                  ref={packageButtonRef}
                  type="button"
                  onClick={handleTogglePackage}
                  className={`w-full h-[46px] sm:h-[52px] bg-white rounded-xl shadow-md border px-2.5 sm:px-3.5 flex items-center justify-between text-left transition-all cursor-pointer ${
                    isPackageDropdownOpen
                      ? 'border-[#FFC928] ring-2 ring-[#FFC928]/40'
                      : 'border-white/80 hover:border-neutral-300'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isPackageDropdownOpen}
                >
                  <div className="flex items-center gap-2 overflow-hidden pr-0.5">
                    <Luggage className="w-4 h-4 text-[#000000] shrink-0" strokeWidth={2} />
                    <span className="font-bold text-[12.5px] sm:text-[13.5px] text-[#000000] truncate">
                      {currentCategoryObj ? currentCategoryObj.label : 'Holiday Packages'}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-500 shrink-0 transition-transform ${
                      isPackageDropdownOpen ? 'rotate-180 text-[#FFC928]' : ''
                    }`}
                  />
                </button>

                {/* Holiday Packages Dropdown Popover via Portal */}
                {isPackageDropdownOpen && packageRect && createPortal(
                  <div
                    ref={packageDropdownRef}
                    style={{
                      position: 'fixed',
                      ...(packagePlacement === 'top'
                        ? { bottom: `${window.innerHeight - packageRect.top + 6}px` }
                        : { top: `${packageRect.bottom + 6}px` }),
                      left: `${packageRect.left}px`,
                      width: `${Math.max(packageRect.width, 200)}px`,
                      zIndex: 99999,
                    }}
                    className="bg-white rounded-xl shadow-2xl border border-neutral-200 p-1.5 max-h-[85vh] overflow-y-auto animate-in fade-in duration-150"
                    role="listbox"
                  >
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectPackageType(cat.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium rounded-lg transition-colors cursor-pointer text-left ${
                            isSelected
                              ? 'bg-[#FFF7D6] text-[#D97706] font-bold'
                              : 'text-[#000000] hover:bg-neutral-50 hover:text-[#D97706]'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-[#D97706]' : 'text-neutral-500'
                            }`}
                            strokeWidth={1.8}
                          />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>,
                  document.body
                )}
              </div>

              {/* Box 2: Destination Search Field (with Search icon inside) */}
              <div className="relative flex-1 h-[46px] sm:h-[52px] bg-white rounded-xl shadow-md border border-white/80 hover:border-neutral-300 focus-within:border-[#FFC928] focus-within:ring-2 focus-within:ring-[#FFC928]/40 px-3 flex items-center gap-2 transition-all">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0" strokeWidth={2} />
                <input
                  type="text"
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  placeholder="Search for packages or destinations"
                  className="w-full text-[12.5px] sm:text-[13.5px] text-[#000000] placeholder:text-neutral-400 focus:outline-none bg-transparent truncate"
                />
                <button
                  type="submit"
                  className="md:hidden w-8 h-8 bg-[#FFC928] hover:bg-[#e6b320] rounded-lg flex items-center justify-center text-black shrink-0 cursor-pointer shadow-xs"
                  title="Search"
                >
                  <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* ROW 2 ON MOBILE (SIDE BY SIDE): Travel Month Selector + Travellers Selector (+ Desktop Search CTA) */}
            <div className="flex flex-row items-center gap-2 w-full md:contents">
              {/* Box 3: Travel Month Calendar Selector */}
              <div className="relative flex-1 md:w-[160px]">
                <button
                  ref={calendarButtonRef}
                  type="button"
                  onClick={handleToggleCalendar}
                  className={`w-full h-[46px] sm:h-[52px] bg-white rounded-xl shadow-md border px-2.5 sm:px-3.5 flex items-center justify-between text-left transition-all cursor-pointer ${
                    isCalendarOpen
                      ? 'border-[#FFC928] ring-2 ring-[#FFC928]/40'
                      : 'border-white/80 hover:border-neutral-300'
                  }`}
                  aria-haspopup="dialog"
                  aria-expanded={isCalendarOpen}
                >
                  <div className="flex items-center gap-2 overflow-hidden pr-0.5">
                    <Calendar className="w-4 h-4 text-[#000000] shrink-0" strokeWidth={1.8} />
                    <div className="flex flex-col leading-tight overflow-hidden">
                      <span className="text-[10.5px] sm:text-[11px] font-bold text-[#000000]">Travel Month</span>
                      <span className="text-[11.5px] sm:text-[12.5px] text-neutral-500 font-normal truncate">
                        {confirmedDateLabel}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform ${
                      isCalendarOpen ? 'rotate-180 text-[#FFC928]' : ''
                    }`}
                  />
                </button>

                {/* Calendar Popover via Portal */}
                {isCalendarOpen && calendarRect && createPortal(
                  <div
                    ref={calendarRef}
                    style={{
                      position: 'fixed',
                      ...(calendarPlacement === 'top'
                        ? { bottom: `${window.innerHeight - calendarRect.top + 6}px` }
                        : { top: `${calendarRect.bottom + 6}px` }),
                      left: `${Math.min(Math.max(12, calendarRect.left), window.innerWidth - 340)}px`,
                      zIndex: 99999,
                    }}
                    className="bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 w-[310px] sm:w-[330px] max-w-[calc(100vw-24px)] max-h-[85vh] overflow-y-auto animate-in fade-in duration-150"
                    role="dialog"
                    aria-label="Select travel dates"
                  >
                    {/* Month Header & Controls */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-100">
                      <span className="font-bold text-[14.5px] text-[#000000]">
                        {monthNames[currentMonthIndex]} {currentYear}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          disabled={isPrevDisabled}
                          className="p-1 rounded-md text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="p-1 rounded-md text-neutral-600 hover:bg-neutral-100 cursor-pointer transition-colors"
                          aria-label="Next month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-1">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                        <span key={d} className="text-[11px] font-semibold text-neutral-400">
                          {d}
                        </span>
                      ))}
                    </div>

                    {/* Day Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-4">
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-8 h-8" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const thisDate = new Date(currentYear, currentMonthIndex, day);
                        thisDate.setHours(0, 0, 0, 0);

                        const isPast = thisDate < today;
                        const isStart = startDate && thisDate.getTime() === startDate.getTime();
                        const isEnd = endDate && thisDate.getTime() === endDate.getTime();
                        const isInRange =
                          startDate &&
                          endDate &&
                          thisDate > startDate &&
                          thisDate < endDate;

                        return (
                          <button
                            key={`day-${day}`}
                            type="button"
                            disabled={isPast}
                            onClick={() => handleDateClick(day)}
                            className={`w-8 h-8 rounded-md text-[12.5px] font-medium flex items-center justify-center transition-colors cursor-pointer ${
                              isPast
                                ? 'text-neutral-300 cursor-not-allowed'
                                : isStart || isEnd
                                ? 'bg-[#FFC928] text-black font-bold shadow-xs'
                                : isInRange
                                ? 'bg-[#FFF7D6] text-[#854D0E] font-semibold'
                                : 'text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={handleClearDates}
                        className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-neutral-50"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleDoneDates}
                        className="bg-[#FFC928] hover:bg-[#e6b320] text-black font-bold text-xs py-1.5 px-4 rounded-lg transition-colors cursor-pointer shadow-xs"
                      >
                        Done
                      </button>
                    </div>
                  </div>,
                  document.body
                )}
              </div>

              {/* Box 4: Travellers Dropdown Selector */}
              <div className="relative flex-1 md:w-[150px]">
                <button
                  ref={travellersButtonRef}
                  type="button"
                  onClick={handleToggleTravellers}
                  className={`w-full h-[46px] sm:h-[52px] bg-white rounded-xl shadow-md border px-2.5 sm:px-3.5 flex items-center justify-between text-left transition-all cursor-pointer ${
                    isTravellersOpen
                      ? 'border-[#FFC928] ring-2 ring-[#FFC928]/40'
                      : 'border-white/80 hover:border-neutral-300'
                  }`}
                  aria-haspopup="dialog"
                  aria-expanded={isTravellersOpen}
                >
                  <div className="flex items-center gap-2 overflow-hidden pr-0.5">
                    <Users className="w-4 h-4 text-[#000000] shrink-0" strokeWidth={1.8} />
                    <div className="flex flex-col leading-tight overflow-hidden">
                      <span className="text-[10.5px] sm:text-[11px] font-bold text-[#000000]">Travellers</span>
                      <span className="text-[11.5px] sm:text-[12.5px] text-neutral-500 font-normal truncate">
                        {travellerDisplay}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform ${
                      isTravellersOpen ? 'rotate-180 text-[#FFC928]' : ''
                    }`}
                  />
                </button>

                {/* Travellers Stepper Popover via Portal */}
                {isTravellersOpen && travellersRect && createPortal(
                  <div
                    ref={travellersRef}
                    style={{
                      position: 'fixed',
                      ...(travellersPlacement === 'top'
                        ? { bottom: `${window.innerHeight - travellersRect.top + 6}px` }
                        : { top: `${travellersRect.bottom + 6}px` }),
                      right: `${Math.max(12, window.innerWidth - travellersRect.right)}px`,
                      zIndex: 99999,
                    }}
                    className="bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 w-[280px] sm:w-[295px] max-w-[calc(100vw-24px)] max-h-[85vh] overflow-y-auto animate-in fade-in duration-150"
                    role="dialog"
                    aria-label="Select travellers"
                  >
                    <div className="space-y-3.5 mb-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[13.5px] font-bold text-[#000000]">Adults</p>
                          <p className="text-[11px] text-neutral-400">Ages 12+</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                            disabled={adults <= 1}
                            className="w-7 h-7 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-[#FFC928] hover:bg-[#FFFDF7] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            aria-label="Decrease adults"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-[14px] text-[#000000] tabular-nums">
                            {adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => setAdults((prev) => prev + 1)}
                            className="w-7 h-7 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-[#FFC928] hover:bg-[#FFFDF7] cursor-pointer transition-colors"
                            aria-label="Increase adults"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100">
                        <div>
                          <p className="text-[13.5px] font-bold text-[#000000]">Children</p>
                          <p className="text-[11px] text-neutral-400">Ages 2-11</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                            disabled={children <= 0}
                            className="w-7 h-7 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-[#FFC928] hover:bg-[#FFFDF7] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            aria-label="Decrease children"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-[14px] text-[#000000] tabular-nums">
                            {children}
                          </span>
                          <button
                            type="button"
                            onClick={() => setChildren((prev) => prev + 1)}
                            className="w-7 h-7 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-[#FFC928] hover:bg-[#FFFDF7] cursor-pointer transition-colors"
                            aria-label="Increase children"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100">
                        <div>
                          <p className="text-[13.5px] font-bold text-[#000000]">Infants</p>
                          <p className="text-[11px] text-neutral-400">Under 2</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                            disabled={infants <= 0}
                            className="w-7 h-7 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-[#FFC928] hover:bg-[#FFFDF7] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                            aria-label="Decrease infants"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-[14px] text-[#000000] tabular-nums">
                            {infants}
                          </span>
                          <button
                            type="button"
                            onClick={() => setInfants((prev) => prev + 1)}
                            className="w-7 h-7 rounded-md border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-[#FFC928] hover:bg-[#FFFDF7] cursor-pointer transition-colors"
                            aria-label="Increase infants"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Done Button */}
                    <div className="pt-2 border-t border-neutral-100 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsTravellersOpen(false)}
                        className="bg-[#FFC928] hover:bg-[#e6b320] text-black font-bold text-xs py-1.5 px-5 rounded-lg transition-colors cursor-pointer shadow-xs"
                      >
                        Done
                      </button>
                    </div>
                  </div>,
                  document.body
                )}
              </div>

              {/* Box 5: Search Holidays CTA Button (Desktop) */}
              <button
                type="submit"
                className="hidden md:flex h-[52px] bg-[#FFC928] hover:bg-[#e6b320] active:bg-[#d4a014] text-black font-bold text-[14px] px-6 rounded-xl shadow-md items-center justify-center gap-2 shrink-0 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Search Holidays</span>
              </button>
            </div>
          </form>

          {/* Search feedback alert */}
          {searchNotification && (
            <div className="mt-2.5 p-2.5 bg-white/95 backdrop-blur-xs border border-[#FFC928] rounded-xl shadow-md text-xs text-[#000000] flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{searchNotification}</span>
            </div>
          )}
        </div>

        {/* TRENDING DESTINATIONS SECTION (EXACT 7 DESTINATIONS IN HORIZONTAL SCROLL) */}
        <div>
          {/* Section Heading with Golden Lines */}
          <div className="flex items-center justify-center gap-2.5 text-center mb-3.5">
            <span className="w-6 sm:w-14 h-[1.5px] bg-[#FFC928]" aria-hidden="true" />
            <h2 className="font-extrabold text-[14px] sm:text-[17px] text-[#000000] tracking-tight drop-shadow-xs whitespace-nowrap">
              Trending Destinations
            </h2>
            <span className="w-6 sm:w-14 h-[1.5px] bg-[#FFC928]" aria-hidden="true" />
          </div>

          {/* 7 Evenly Spaced Circular Destination Thumbnails (Single horizontal scrollable row on mobile & desktop) */}
          <div className="flex items-center justify-start sm:justify-center gap-3.5 sm:gap-6 md:gap-8 lg:gap-9 overflow-x-auto pb-2 scrollbar-none px-2">
            {TRENDING_DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => handleDestinationSelect(dest.name)}
                className="group flex flex-col items-center gap-1.5 cursor-pointer transition-transform hover:-translate-y-1 shrink-0"
              >
                <div className="w-[60px] h-[60px] sm:w-[78px] sm:h-[78px] md:w-[90px] md:h-[90px] rounded-full overflow-hidden border-2 sm:border-[2.5px] border-white shadow-lg group-hover:border-[#FFC928] transition-all duration-200">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="font-bold text-[12px] sm:text-[14px] text-[#000000] group-hover:text-[#D97706] transition-colors leading-tight drop-shadow-xs whitespace-nowrap">
                  {dest.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
