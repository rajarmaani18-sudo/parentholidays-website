import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Copy,
} from 'lucide-react';
import ParentsHolidayLogo from './ParentsHolidayLogo';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  travelerType: 'senior' | 'family';
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'signup' | 'login';
  onAuthSuccess?: (user: UserProfile) => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'signup',
  onAuthSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>(initialTab);
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [travelerType, setTravelerType] = useState<'senior' | 'family'>('senior');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success states
  const [authSuccessUser, setAuthSuccessUser] = useState<UserProfile | null>(null);
  const [couponCopied, setCouponCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync initial tab and reset state when opened or closed
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setIsForgotPassword(false);
      setResetSent(false);
      setErrorMsg('');
      setOtpSent(false);
      setAuthSuccessUser(null);
      setCouponCopied(false);
    } else {
      // Also reset success state and submission state when modal closes
      setAuthSuccessUser(null);
      setCouponCopied(false);
      setOtpSent(false);
      setIsSubmitting(false);
    }
  }, [isOpen, initialTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Timer countdown for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, resendTimer]);

  if (!isOpen) return null;

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Handle Sign Up Submission
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || phone.length < 7) {
      setErrorMsg('Please enter a valid mobile number');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newUser: UserProfile = {
        name: name.trim(),
        email: email.trim(),
        phone: `${countryCode} ${phone.trim()}`,
        travelerType,
      };
      setAuthSuccessUser(newUser);
      onAuthSuccess?.(newUser);
    }, 600);
  };

  // Handle Log In Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (loginMethod === 'otp') {
      if (!otpSent) {
        if (!phone.trim() || phone.length < 7) {
          setErrorMsg('Please enter your registered mobile number');
          return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setOtpSent(true);
          setResendTimer(30);
          setTimeout(() => {
            otpInputRefs.current[0]?.focus();
          }, 100);
        }, 500);
        return;
      }

      // Verify OTP
      const fullOtp = otpCode.join('');
      if (fullOtp.length < 4) {
        setErrorMsg('Please enter the complete 4-digit verification code');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const loggedUser: UserProfile = {
          name: phone === '9876543210' ? 'Ramesh Sharma' : 'Senior Member',
          email: 'member@parentholidays.com',
          phone: `${countryCode} ${phone.trim()}`,
          travelerType: 'senior',
        };
        setAuthSuccessUser(loggedUser);
        onAuthSuccess?.(loggedUser);
      }, 600);
    } else {
      // Password mode
      if (!email.trim()) {
        setErrorMsg('Please enter your email or phone number');
        return;
      }
      if (!password) {
        setErrorMsg('Please enter your password');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        const extractedName = email.includes('@')
          ? email.split('@')[0].replace(/[._]/g, ' ')
          : 'Valued Traveler';
        const formattedName =
          extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

        const loggedUser: UserProfile = {
          name: formattedName || 'Senior Member',
          email: email.trim(),
          travelerType: 'senior',
        };
        setAuthSuccessUser(loggedUser);
        onAuthSuccess?.(loggedUser);
      }, 600);
    }
  };

  // Google Sign-In Simulation
  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const googleUser: UserProfile = {
        name: 'Arun Kumar',
        email: 'arun.kumar@gmail.com',
        travelerType: 'senior',
      };
      setAuthSuccessUser(googleUser);
      onAuthSuccess?.(googleUser);
    }, 650);
  };

  // OTP change handler
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otpCode];
    newOtp[index] = val.slice(-1);
    setOtpCode(newOtp);

    if (val && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('SENIORGOLD');
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2500);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* 
        COMPACT CENTERED DIALOG
        - Mobile: ~90% viewport width, max 400px
        - Tablet: ~480px wide (440–520px)
        - Desktop: ~520px wide (480–560px)
        - Height: content-driven, max 85vh / 85dvh with inner scroll
      */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] sm:w-[480px] md:w-[520px] max-w-[400px] sm:max-w-[490px] md:max-w-[530px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E8E2D2] flex flex-col my-auto max-h-[85vh] sm:max-h-[85dvh] overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Compact Header: Brand Logo, Senior Club Badge & Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3.5 pb-2.5 border-b border-slate-100 bg-[#FAF7F0] shrink-0">
          <div className="flex items-center gap-2">
            <ParentsHolidayLogo height={26} />
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FFC928]/20 text-[#000000] border border-[#FFC928]/40">
              <Sparkles className="w-2.5 h-2.5 text-[#D97706]" /> Senior Club
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-600 hover:text-black flex items-center justify-center transition-colors shadow-xs border border-slate-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFC928]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" strokeWidth={2.2} />
          </button>
        </div>

        {/* Scrollable Form Panel Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* =========================================================================
              SUCCESS VIEW
             ========================================================================= */}
          {authSuccessUser ? (
            <div className="py-4 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFC928]/20 text-[#000000] mb-1.5">
                  <Sparkles className="w-3 h-3 text-[#E67E00]" /> Senior Member Activated
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#000000]">
                  Welcome, {authSuccessUser.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xs mx-auto">
                  Your account has been activated with exclusive senior rates & personalized care.
                </p>
              </div>

              {/* Welcome Gift Box */}
              <div className="bg-[#FAF7F0] border border-dashed border-[#FFC928] rounded-xl p-3.5 max-w-sm mx-auto text-left relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-[#000000] uppercase tracking-wider">
                    Welcome Gift Voucher
                  </span>
                  <span className="text-[10.5px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-sm">
                    FLAT ₹5,000 OFF
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mb-2">
                  Use this code on your first holiday package booking:
                </p>
                <div className="flex items-center justify-between bg-white border border-[#E8E2D2] rounded-lg p-2">
                  <span className="font-mono font-black text-[#000000] tracking-wider text-sm">
                    SENIORGOLD
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCoupon}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#000000] bg-[#FFC928] hover:bg-[#e6b320] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    {couponCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-700" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('popular-packages');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto bg-[#000000] hover:bg-[#1a1a1a] text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Holiday Packages</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFC928]" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : isForgotPassword ? (
            /* =========================================================================
                FORGOT PASSWORD VIEW
               ========================================================================= */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#000000] tracking-tight">
                  Reset Password
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Enter your registered email address or mobile number to receive a secure password reset link or OTP.
                </p>
              </div>

              {resetSent ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2.5">
                  <div className="w-9 h-9 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-900">
                    Reset Instructions Sent!
                  </h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    We have dispatched a verification link and temporary OTP to your details. Please check your inbox or SMS.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setResetSent(false);
                    }}
                    className="text-xs font-bold text-[#000000] hover:underline cursor-pointer pt-1"
                  >
                    ← Back to Log In
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email) {
                      setErrorMsg('Please enter your email or phone number');
                      return;
                    }
                    setErrorMsg('');
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setResetSent(true);
                    }, 550);
                  }}
                  className="space-y-3"
                >
                  {errorMsg && (
                    <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address or Mobile Number
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. parent@example.com or 9876543210"
                        className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FFC928] hover:bg-[#e6b320] text-[#000000] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-spin">⏳</span>
                    ) : (
                      <>
                        <span>Send Reset Instructions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-xs font-semibold text-slate-600 hover:text-black cursor-pointer"
                    >
                      ← Back to Log In
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* =========================================================================
                STANDARD SIGN UP / LOG IN TABS
               ========================================================================= */
            <div className="space-y-3.5">
              {/* Top Segmented Tabs: Sign Up vs Log In */}
              <div className="flex border-b border-slate-200 pb-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('signup');
                    setErrorMsg('');
                  }}
                  className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold transition-all relative cursor-pointer text-center ${
                    activeTab === 'signup'
                      ? 'text-[#000000]'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span>Sign Up (New Account)</span>
                  {activeTab === 'signup' && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#FFC928] rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMsg('');
                  }}
                  className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold transition-all relative cursor-pointer text-center ${
                    activeTab === 'login'
                      ? 'text-[#000000]'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span>Log In (Member)</span>
                  {activeTab === 'login' && (
                    <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#FFC928] rounded-full" />
                  )}
                </button>
              </div>

              {/* Subheading */}
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#000000] tracking-tight">
                  {activeTab === 'signup'
                    ? 'Create Your Account'
                    : 'Welcome Back to ParentHolidays'}
                </h3>
                <p className="text-xs text-slate-500 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                  {activeTab === 'signup'
                    ? 'Join ParentHolidays for senior member rates & curated care.'
                    : 'Log in to view your bookings, wishlist & senior privileges.'}
                </p>
              </div>

              {/* Social Login: Google Single-Click Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2 px-3 rounded-xl border border-slate-300 shadow-2xs hover:shadow-xs transition-all text-xs cursor-pointer"
              >
                {/* Google "G" SVG */}
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Centered OR divider with balanced lines */}
              <div className="flex items-center justify-center gap-3 my-2.5">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center shrink-0">
                  Or with Mobile / Email
                </span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* ===================================================================
                  SIGN UP FORM
                 =================================================================== */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Chandra Sharma"
                        className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile Number with Country Code */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number (For WhatsApp Updates & Care) *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative shrink-0 w-[84px] sm:w-[94px]">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-2.5 pr-6 py-2 rounded-xl text-xs sm:text-sm text-slate-800 font-medium appearance-none focus:outline-none focus:border-[#000000] cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                      </div>
                      <div className="relative flex-1 min-w-0">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-10 pr-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Password with Show/Hide */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Create Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-9 pr-9 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Traveler Category Radio / Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      I am registering as:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTravelerType('senior')}
                        className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          travelerType === 'senior'
                            ? 'border-[#000000] bg-[#000000]/5 text-[#000000] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full border border-slate-400 flex items-center justify-center">
                            {travelerType === 'senior' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#000000]" />
                            )}
                          </span>
                          <span>Senior Traveler (55+)</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTravelerType('family')}
                        className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          travelerType === 'family'
                            ? 'border-[#000000] bg-[#000000]/5 text-[#000000] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full border border-slate-400 flex items-center justify-center">
                            {travelerType === 'family' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#000000]" />
                            )}
                          </span>
                          <span>Booking for Parents</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp Opt-in */}
                  <div className="flex items-start gap-2 pt-0.5">
                    <input
                      type="checkbox"
                      id="whatsapp-updates"
                      checked={whatsappUpdates}
                      onChange={(e) => setWhatsappUpdates(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 rounded-sm border-slate-300 text-[#000000] focus:ring-[#FFC928] cursor-pointer"
                    />
                    <label
                      htmlFor="whatsapp-updates"
                      className="text-[11px] text-slate-600 leading-snug cursor-pointer select-none"
                    >
                      Receive booking alerts & senior doctor updates on WhatsApp.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FFC928] hover:bg-[#F0BA1A] text-[#000000] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Creating Your Account...</span>
                      ) : (
                        <>
                          <span>Create Account & Get Member Privileges</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terms */}
                  <p className="text-[10.5px] text-center text-slate-400 leading-normal">
                    By signing up, you agree to ParentHolidays&apos;{' '}
                    <span className="text-slate-600 underline cursor-pointer">Terms of Service</span>{' '}
                    and{' '}
                    <span className="text-slate-600 underline cursor-pointer">Privacy Policy</span>.
                  </p>
                </form>
              )}

              {/* ===================================================================
                  LOG IN FORM
                 =================================================================== */}
              {activeTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  {/* Mode switcher: OTP vs Password */}
                  <div className="flex bg-[#FAF7F0] p-1 rounded-xl border border-[#E8E2D2]">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMethod('otp');
                        setOtpSent(false);
                        setErrorMsg('');
                      }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        loginMethod === 'otp'
                          ? 'bg-white text-[#000000] shadow-2xs'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Instant Mobile OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMethod('password');
                        setErrorMsg('');
                      }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        loginMethod === 'password'
                          ? 'bg-white text-[#000000] shadow-2xs'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Email & Password
                    </button>
                  </div>

                  {loginMethod === 'otp' ? (
                    /* OTP LOGIN */
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Mobile Number *
                        </label>
                        <div className="flex gap-2">
                          <div className="relative shrink-0 w-[84px] sm:w-[94px]">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-2.5 pr-6 py-2 rounded-xl text-xs sm:text-sm text-slate-800 font-medium appearance-none focus:outline-none focus:border-[#000000] cursor-pointer"
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
                          </div>
                          <div className="relative flex-1 min-w-0">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="98765 43210"
                              disabled={otpSent}
                              className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-10 pr-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors disabled:opacity-60"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {otpSent && (
                        <div className="space-y-2 bg-[#FAF7F0] p-3 rounded-xl border border-[#E8E2D2] animate-in fade-in duration-200">
                          <div className="flex items-center justify-between">
                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                              Enter 4-Digit OTP
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setOtpSent(false);
                                setOtpCode(['', '', '', '']);
                              }}
                              className="text-[11px] text-slate-500 hover:text-black underline cursor-pointer"
                            >
                              Change Number
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Sent to {countryCode} {phone} (Demo: 1234)
                          </p>

                          {/* 4-digit OTP code inputs */}
                          <div className="flex justify-center gap-2.5 py-1">
                            {otpCode.map((digit, idx) => (
                              <input
                                key={idx}
                                ref={(el) => {
                                  otpInputRefs.current[idx] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                className="w-11 h-11 text-center text-lg font-bold bg-white border-2 border-[#D9D2C2] rounded-xl text-slate-900 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] shadow-2xs"
                              />
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-xs pt-0.5">
                            <span className="text-slate-500 text-[11px]">Didn&apos;t receive code?</span>
                            {resendTimer > 0 ? (
                              <span className="text-slate-400 font-medium text-[11px]">
                                Resend in {resendTimer}s
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setResendTimer(30)}
                                className="font-bold text-[#000000] hover:underline cursor-pointer text-[11px]"
                              >
                                Resend OTP
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#FFC928] hover:bg-[#F0BA1A] text-[#000000] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Verifying...</span>
                          ) : (
                            <>
                              <span>{otpSent ? 'Verify & Log In' : 'Get Instant OTP'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* EMAIL & PASSWORD LOGIN */
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Email Address or Mobile Number *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com or 9876543210"
                            className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Password *
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsForgotPassword(true)}
                            className="text-[11px] text-[#000000] hover:underline font-semibold cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#FAF7F0] border border-[#D9D2C2] pl-9 pr-9 py-2 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000] transition-colors"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-0.5">
                        <label className="flex items-center gap-1.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-3.5 h-3.5 rounded-sm border-slate-300 text-[#000000] focus:ring-[#FFC928]"
                          />
                          <span className="text-[11px] text-slate-600">Remember me</span>
                        </label>
                      </div>

                      <div className="pt-1">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#FFC928] hover:bg-[#F0BA1A] text-[#000000] font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Logging In...</span>
                          ) : (
                            <>
                              <span>Log In to ParentHolidays</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}

              {/* Bottom Switcher */}
              <div className="text-center pt-2 border-t border-slate-100">
                {activeTab === 'signup' ? (
                  <p className="text-xs text-slate-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('login');
                        setErrorMsg('');
                      }}
                      className="font-bold text-[#000000] hover:underline cursor-pointer"
                    >
                      Log In here
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-slate-600">
                    New to ParentHolidays?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('signup');
                        setErrorMsg('');
                      }}
                      className="font-bold text-[#000000] hover:underline cursor-pointer"
                    >
                      Sign Up for free
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
