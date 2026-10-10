import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Building2,
  Luggage,
  Users,
  ChevronDown,
  Star,
  Phone,
  User,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Check,
} from 'lucide-react';
import ParentsHolidayLogo from './ParentsHolidayLogo';
import AuthModal, { UserProfile } from './AuthModal';
import ContactModal from './ContactModal';

export type NavItemKey =
  | 'home'
  | 'about-us'
  | 'holiday-packages'
  | 'group-tours'
  | 'testimonials'
  | 'contact-us'
  | 'sign-up';

interface NavigationBarProps {
  initialActiveItem?: NavItemKey;
  currentActiveItem?: NavItemKey;
  onNavigate?: (key: NavItemKey, subOption?: string) => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  initialActiveItem = 'home',
  currentActiveItem,
  onNavigate,
}) => {
  const [activeItem, setActiveItem] = useState<NavItemKey>(currentActiveItem || initialActiveItem);

  useEffect(() => {
    if (currentActiveItem) {
      setActiveItem(currentActiveItem);
    }
  }, [currentActiveItem]);
  const [isGroupToursOpen, setIsGroupToursOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Group Tours dropdown refs for click outside
  const groupToursDropdownRef = useRef<HTMLDivElement>(null);
  const groupToursButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        groupToursDropdownRef.current &&
        !groupToursDropdownRef.current.contains(event.target as Node) &&
        groupToursButtonRef.current &&
        !groupToursButtonRef.current.contains(event.target as Node)
      ) {
        setIsGroupToursOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle escape key to close dropdowns / modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsGroupToursOpen(false);
        setIsMobileMenuOpen(false);
        setIsSignUpModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleItemClick = (key: NavItemKey) => {
    if (key === 'contact-us') {
      setIsContactModalOpen(true);
      setIsMobileMenuOpen(false);
      return;
    }
    setActiveItem(key);
    if (key === 'sign-up') {
      setIsSignUpModalOpen(true);
    }
    if (key !== 'group-tours') {
      setIsGroupToursOpen(false);
    }
    setIsMobileMenuOpen(false);
    onNavigate?.(key);
  };

  const handleGroupTourSubSelect = (subOption: 'Domestic' | 'International') => {
    setActiveItem('group-tours');
    setIsGroupToursOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate?.('group-tours', `${subOption} Group Tours`);
  };

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className="w-full bg-black text-white relative z-40 select-none"
      >
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[52px] sm:h-[56px]">
            {/* Left Side: Parent's Holiday Brand Logo & Subtle Vertical Divider */}
            <div className="flex items-center shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick('home');
                }}
                className="flex items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2"
                aria-label="Parent's Holiday Home"
              >
                <ParentsHolidayLogo height={34} />
              </a>

              {/* Subtle Vertical Divider between Logo and Navigation Links */}
              <div
                className="hidden md:block w-[1px] h-6 bg-white/25 ml-4 sm:ml-5 lg:ml-6 mr-3 sm:mr-5 lg:mr-6 shrink-0"
                aria-hidden="true"
              />
            </div>

            {/* Desktop Navigation Items — Single Row to the Right of Logo */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-7 xl:space-x-8 h-full">
              {/* 1. Home */}
              <button
                type="button"
                onClick={() => handleItemClick('home')}
                className={`group relative flex items-center gap-2 h-full px-1 text-[14px] lg:text-[14.5px] font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2 ${
                  activeItem === 'home'
                    ? 'text-[#FFC928]'
                    : 'text-[#F5F5F5] hover:text-[#FFC928]'
                }`}
                aria-current={activeItem === 'home' ? 'page' : undefined}
              >
                <Home
                  className="w-[17px] h-[17px] shrink-0 transition-colors duration-250"
                  strokeWidth={1.8}
                />
                <span className="whitespace-nowrap tracking-normal">Home</span>
                {/* Thin golden-yellow underline with smooth left-to-right expansion on hover */}
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#FFC928] transition-transform duration-300 ease-out origin-left pointer-events-none ${
                    activeItem === 'home'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* 2. About Us */}
              <button
                type="button"
                onClick={() => handleItemClick('about-us')}
                className={`group relative flex items-center gap-2 h-full px-1 text-[14px] lg:text-[14.5px] font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2 ${
                  activeItem === 'about-us'
                    ? 'text-[#FFC928]'
                    : 'text-[#F5F5F5] hover:text-[#FFC928]'
                }`}
                aria-current={activeItem === 'about-us' ? 'page' : undefined}
              >
                <Building2
                  className="w-[17px] h-[17px] shrink-0 transition-colors duration-250"
                  strokeWidth={1.8}
                />
                <span className="whitespace-nowrap tracking-normal">About Us</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#FFC928] transition-transform duration-300 ease-out origin-left pointer-events-none ${
                    activeItem === 'about-us'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* 3. Holiday Packages */}
              <button
                type="button"
                onClick={() => handleItemClick('holiday-packages')}
                className={`group relative flex items-center gap-2 h-full px-1 text-[14px] lg:text-[14.5px] font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2 ${
                  activeItem === 'holiday-packages'
                    ? 'text-[#FFC928]'
                    : 'text-[#F5F5F5] hover:text-[#FFC928]'
                }`}
                aria-current={activeItem === 'holiday-packages' ? 'page' : undefined}
              >
                <Luggage
                  className="w-[17px] h-[17px] shrink-0 transition-colors duration-250"
                  strokeWidth={1.8}
                />
                <span className="whitespace-nowrap tracking-normal">Holiday Packages</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#FFC928] transition-transform duration-300 ease-out origin-left pointer-events-none ${
                    activeItem === 'holiday-packages'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* 4. Group Tours (Dropdown) */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setIsGroupToursOpen(true)}
                onMouseLeave={() => setIsGroupToursOpen(false)}
              >
                <button
                  ref={groupToursButtonRef}
                  type="button"
                  onClick={() => setIsGroupToursOpen((prev) => !prev)}
                  className={`group relative flex items-center gap-2 h-full px-1 text-[14px] lg:text-[14.5px] font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2 ${
                    activeItem === 'group-tours' || isGroupToursOpen
                      ? 'text-[#FFC928]'
                      : 'text-[#F5F5F5] hover:text-[#FFC928]'
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isGroupToursOpen}
                >
                  <Users
                    className="w-[17px] h-[17px] shrink-0 transition-colors duration-250"
                    strokeWidth={1.8}
                  />
                  <span className="whitespace-nowrap tracking-normal">Group Tours</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      isGroupToursOpen ? 'rotate-180 text-[#FFC928]' : ''
                    }`}
                    strokeWidth={2}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#FFC928] transition-transform duration-300 ease-out origin-left pointer-events-none ${
                      activeItem === 'group-tours'
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Dropdown Menu */}
                {isGroupToursOpen && (
                  <div
                    ref={groupToursDropdownRef}
                    className="absolute top-full left-0 mt-[1px] w-56 bg-[#0a0a0a] border border-[#262626] shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    role="menu"
                    aria-label="Group Tours Submenu"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleGroupTourSubSelect('Domestic')}
                      className="w-full text-left px-4 py-2 text-[14px] text-[#F5F5F5] hover:text-[#FFC928] hover:bg-[#141414] transition-colors duration-200 cursor-pointer"
                    >
                      Domestic Group Tours
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleGroupTourSubSelect('International')}
                      className="w-full text-left px-4 py-2 text-[14px] text-[#F5F5F5] hover:text-[#FFC928] hover:bg-[#141414] transition-colors duration-200 cursor-pointer border-t border-[#1f1f1f]"
                    >
                      International Group Tours
                    </button>
                  </div>
                )}
              </div>

              {/* 5. Testimonials */}
              <button
                type="button"
                onClick={() => handleItemClick('testimonials')}
                className={`group relative flex items-center gap-2 h-full px-1 text-[14px] lg:text-[14.5px] font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2 ${
                  activeItem === 'testimonials'
                    ? 'text-[#FFC928]'
                    : 'text-[#F5F5F5] hover:text-[#FFC928]'
                }`}
                aria-current={activeItem === 'testimonials' ? 'page' : undefined}
              >
                <Star
                  className="w-[17px] h-[17px] shrink-0 transition-colors duration-250"
                  strokeWidth={1.8}
                />
                <span className="whitespace-nowrap tracking-normal">Testimonials</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#FFC928] transition-transform duration-300 ease-out origin-left pointer-events-none ${
                    activeItem === 'testimonials'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* 6. Contact Us */}
              <button
                type="button"
                onClick={() => handleItemClick('contact-us')}
                className={`group relative flex items-center gap-2 h-full px-1 text-[14px] lg:text-[14.5px] font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2 ${
                  activeItem === 'contact-us'
                    ? 'text-[#FFC928]'
                    : 'text-[#F5F5F5] hover:text-[#FFC928]'
                }`}
                aria-current={activeItem === 'contact-us' ? 'page' : undefined}
              >
                <Phone
                  className="w-[17px] h-[17px] shrink-0 transition-colors duration-250"
                  strokeWidth={1.8}
                />
                <span className="whitespace-nowrap tracking-normal">Contact Us</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#FFC928] transition-transform duration-300 ease-out origin-left pointer-events-none ${
                    activeItem === 'contact-us'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* 7. Sign Up / Logged-in User */}
              {loggedInUser ? (
                <div ref={userMenuRef} className="relative flex items-center h-full">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 h-full px-2 text-[14px] lg:text-[14.5px] font-semibold text-[#FFC928] hover:text-white transition-colors cursor-pointer"
                    aria-expanded={isUserMenuOpen}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FFC928] text-black flex items-center justify-center text-xs font-black">
                      {loggedInUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="whitespace-nowrap max-w-[110px] truncate">
                      {loggedInUser.name}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Account Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-64 bg-[#0d0d0d] border border-[#2a2a2a] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-4 py-2.5 border-b border-[#222222]">
                        <div className="text-xs text-neutral-400">Signed in as</div>
                        <div className="text-sm font-bold text-white truncate">
                          {loggedInUser.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#FFC928]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Senior Club Member</span>
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            const el = document.getElementById('popular-packages');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-[#FFC928] hover:bg-white/5 transition-colors flex items-center justify-between"
                        >
                          <span>My Holiday Bookings</span>
                          <span className="text-[10px] bg-[#FFC928]/20 text-[#FFC928] px-1.5 py-0.5 rounded-sm">
                            Active
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            const el = document.getElementById('popular-packages');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-[#FFC928] hover:bg-white/5 transition-colors"
                        >
                          Saved Destinations & Wishlist
                        </button>
                      </div>

                      <div className="border-t border-[#222222] pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setLoggedInUser(null);
                            setIsUserMenuOpen(false);
                            setIsSignUpModalOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleItemClick('sign-up')}
                  className={`group relative flex items-center gap-2 h-full px-1 text-[14px] lg:text-[14.5px] font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928] focus-visible:outline-offset-2 ${
                    activeItem === 'sign-up'
                      ? 'text-[#FFC928]'
                      : 'text-[#F5F5F5] hover:text-[#FFC928]'
                  }`}
                  aria-current={activeItem === 'sign-up' ? 'page' : undefined}
                >
                  <User
                    className="w-[17px] h-[17px] shrink-0 transition-colors duration-250"
                    strokeWidth={1.8}
                  />
                  <span className="whitespace-nowrap tracking-normal">Sign Up</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] w-full bg-[#FFC928] transition-transform duration-300 ease-out origin-left pointer-events-none ${
                      activeItem === 'sign-up'
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>

            {/* Mobile Header: Hamburger */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="p-1.5 text-white hover:text-[#FFC928] focus-visible:outline-none cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-[#222222] px-4 py-3 space-y-1 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* 1. Home */}
            <button
              type="button"
              onClick={() => handleItemClick('home')}
              className={`w-full flex items-center gap-3 py-2.5 px-3 text-[14.5px] font-medium rounded-none border-b border-[#1a1a1a] transition-colors ${
                activeItem === 'home'
                  ? 'text-[#FFC928] border-[#FFC928]/40'
                  : 'text-[#F5F5F5] hover:text-[#FFC928]'
              }`}
            >
              <Home className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span>Home</span>
            </button>

            {/* 2. About Us */}
            <button
              type="button"
              onClick={() => handleItemClick('about-us')}
              className={`w-full flex items-center gap-3 py-2.5 px-3 text-[14.5px] font-medium rounded-none border-b border-[#1a1a1a] transition-colors ${
                activeItem === 'about-us'
                  ? 'text-[#FFC928] border-[#FFC928]/40'
                  : 'text-[#F5F5F5] hover:text-[#FFC928]'
              }`}
            >
              <Building2 className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span>About Us</span>
            </button>

            {/* 3. Holiday Packages */}
            <button
              type="button"
              onClick={() => handleItemClick('holiday-packages')}
              className={`w-full flex items-center gap-3 py-2.5 px-3 text-[14.5px] font-medium rounded-none border-b border-[#1a1a1a] transition-colors ${
                activeItem === 'holiday-packages'
                  ? 'text-[#FFC928] border-[#FFC928]/40'
                  : 'text-[#F5F5F5] hover:text-[#FFC928]'
              }`}
            >
              <Luggage className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span>Holiday Packages</span>
            </button>

            {/* 4. Group Tours (Accordion) */}
            <div className="border-b border-[#1a1a1a]">
              <button
                type="button"
                onClick={() => setIsGroupToursOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between py-2.5 px-3 text-[14.5px] font-medium transition-colors ${
                  activeItem === 'group-tours'
                    ? 'text-[#FFC928]'
                    : 'text-[#F5F5F5] hover:text-[#FFC928]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  <span>Group Tours</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isGroupToursOpen ? 'rotate-180 text-[#FFC928]' : ''
                  }`}
                />
              </button>
              {isGroupToursOpen && (
                <div className="bg-[#141414] py-1 pl-10 pr-4 space-y-1">
                  <button
                    type="button"
                    onClick={() => handleGroupTourSubSelect('Domestic')}
                    className="w-full text-left py-2 text-[13.5px] text-[#e0e0e0] hover:text-[#FFC928] transition-colors"
                  >
                    Domestic Group Tours
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGroupTourSubSelect('International')}
                    className="w-full text-left py-2 text-[13.5px] text-[#e0e0e0] hover:text-[#FFC928] transition-colors border-t border-[#222222]"
                  >
                    International Group Tours
                  </button>
                </div>
              )}
            </div>

            {/* 5. Testimonials */}
            <button
              type="button"
              onClick={() => handleItemClick('testimonials')}
              className={`w-full flex items-center gap-3 py-2.5 px-3 text-[14.5px] font-medium rounded-none border-b border-[#1a1a1a] transition-colors ${
                activeItem === 'testimonials'
                  ? 'text-[#FFC928] border-[#FFC928]/40'
                  : 'text-[#F5F5F5] hover:text-[#FFC928]'
              }`}
            >
              <Star className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span>Testimonials</span>
            </button>

            {/* 6. Contact Us */}
            <button
              type="button"
              onClick={() => handleItemClick('contact-us')}
              className={`w-full flex items-center gap-3 py-2.5 px-3 text-[14.5px] font-medium rounded-none border-b border-[#1a1a1a] transition-colors ${
                activeItem === 'contact-us'
                  ? 'text-[#FFC928] border-[#FFC928]/40'
                  : 'text-[#F5F5F5] hover:text-[#FFC928]'
              }`}
            >
              <Phone className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span>Contact Us</span>
            </button>

            {/* 7. Sign Up / User Profile (Mobile) */}
            {loggedInUser ? (
              <div className="border-t border-[#222222] pt-2 pb-1 px-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#FFC928] text-black flex items-center justify-center font-black text-xs">
                      {loggedInUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white truncate max-w-[160px]">
                        {loggedInUser.name}
                      </div>
                      <div className="text-[11px] text-[#FFC928]">Senior Club Member</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLoggedInUser(null);
                      setIsMobileMenuOpen(false);
                      setIsSignUpModalOpen(false);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded-sm bg-red-500/10 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleItemClick('sign-up')}
                className={`w-full flex items-center gap-3 py-2.5 px-3 text-[14.5px] font-medium rounded-none transition-colors ${
                  activeItem === 'sign-up'
                    ? 'text-[#FFC928]'
                    : 'text-[#F5F5F5] hover:text-[#FFC928]'
                }`}
              >
                <User className="w-[18px] h-[18px]" strokeWidth={1.8} />
                <span>Sign Up</span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Premium Senior-Travel Login & Sign Up Modal */}
      <AuthModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        initialTab="signup"
        onAuthSuccess={(user) => {
          setLoggedInUser(user);
        }}
      />

      {/* Contact Us Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default NavigationBar;
