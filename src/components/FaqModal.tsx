import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  ChevronDown,
  X,
  ShieldCheck,
  Heart,
  Phone,
} from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    category: 'Trip Design & Senior Care',
    question: 'Are your holiday tours specifically tailored for senior citizens?',
    answer:
      'Yes! Every ParentHolidays tour is meticulously curated exclusively for seniors and multigenerational families. We ensure slow-paced itineraries, direct hotel elevator access, pre-allocated ground-floor or low-floor rooms, verified medical assistance on call, and 24/7 dedicated tour companions.',
  },
  {
    category: 'Medical & Safety',
    question: 'What kind of medical support and doctor assistance is available during trips?',
    answer:
      'We maintain tie-ups with trusted local hospitals and multi-specialty clinics at every destination. A trained senior-care coordinator travels with every group, carrying emergency first-aid kits, portable oxygen support (on high-altitude trips like Kashmir/Himachal), and coordinates timely refills for regular medications.',
  },
  {
    category: 'Food & Dining',
    question: 'Can we request special dietary requirements (e.g. sattvic, low-spice, diabetic)?',
    answer:
      'Absolutely. We coordinate directly with partner hotels and restaurants ahead of time to arrange freshly prepared, mild, pure vegetarian, sattvic, or onion-garlic free meals, as well as customized low-sodium and diabetic-friendly meals upon request.',
  },
  {
    category: 'Luggage & Transfers',
    question: 'How is luggage handled during airport, train, and hotel transfers?',
    answer:
      'Luggage porter assistance is fully included throughout your journey. From station/airport check-ins right up to placing bags inside your hotel room, our team handles all heavy lifting so seniors never have to carry suitcases or rush across platforms.',
  },
  {
    category: 'Booking & Cancellation',
    question: 'What is the cancellation and refund policy for senior bookings?',
    answer:
      'We offer flexible cancellation terms with full transparency. If a trip must be cancelled due to sudden medical emergencies with valid certificate verification, we offer hassle-free rescheduling or priority refunds according to our senior-first care guarantee.',
  },
  {
    category: 'Solo Travel',
    question: 'Can solo seniors or elderly parents travel comfortably on these tours?',
    answer:
      'Yes! Over 40% of our travelers are solo seniors or elderly couples. Our warm group environment, constant companion supervision, and instant emergency response ensure they feel completely safe, cared for, and treated like family from day one.',
  },
];

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="faq-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-[92%] sm:w-[88%] max-w-[420px] sm:max-w-[850px] lg:max-w-[950px] bg-[#FAF7F0] text-black rounded-3xl shadow-2xl border-2 border-[#FFC928] overflow-hidden max-h-[85dvh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-200/90 hover:bg-neutral-300 text-black flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Info Panel (Hidden on mobile, visible lg+) with Travel Photograph */}
            <div className="hidden lg:flex lg:col-span-5 bg-black text-white p-6 lg:p-8 flex-col justify-between relative overflow-hidden rounded-2xl mr-4 shadow-md">
              {/* High-quality travel photograph background */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 transform hover:scale-105 transition-transform duration-700" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000")' }} 
              />
              {/* Premium dark gradient overlay for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC928] bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs w-fit border border-[#FFC928]/30">
                  <HelpCircle className="w-3.5 h-3.5 text-[#FFC928]" />
                  <span>Frequently Asked Questions</span>
                </div>

                <h3
                  id="faq-modal-title"
                  className="text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm"
                >
                  Everything You Need to Know About Senior-First Holidays
                </h3>

                <p className="text-xs text-neutral-200 leading-relaxed drop-shadow-sm">
                  We answer your most pressing questions regarding medical safety, dietary preferences, pace of travel, luggage support, and booking flexibility.
                </p>
              </div>

              <div className="relative z-10 space-y-3 pt-6 mt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFC928]/20 text-[#FFC928] flex items-center justify-center shrink-0 border border-[#FFC928]/40">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-neutral-100 font-medium">
                    100% Verified Senior Safety & Assistance
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFC928]/20 text-[#FFC928] flex items-center justify-center shrink-0 border border-[#FFC928]/40">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-neutral-100 font-medium">
                    Dedicated 24/7 Tour Companions
                  </div>
                </div>
              </div>
            </div>

            {/* Right FAQs Accordion List */}
            <div className="lg:col-span-7 space-y-3">
              <div className="lg:hidden mb-4">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-full mb-1.5 border border-amber-200">
                  <HelpCircle className="w-3 h-3" />
                  <span>FAQs & Help</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-black">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-2.5">
                {FAQ_LIST.map((faq, idx) => {
                  const isOpenItem = openIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white border rounded-xl overflow-hidden shadow-xs transition-all duration-200 ${
                        isOpenItem ? 'border-amber-400 ring-1 ring-amber-400/30' : 'border-neutral-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpenItem ? null : idx)}
                        className={`w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-bold text-xs sm:text-sm transition-colors cursor-pointer gap-3 ${
                          isOpenItem ? 'text-amber-700 bg-amber-50/40' : 'text-neutral-900 hover:text-amber-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 transition-colors ${
                            isOpenItem ? 'bg-amber-500 text-black' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className={isOpenItem ? 'text-amber-800' : ''}>{faq.question}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isOpenItem ? 'rotate-180 text-amber-700' : 'text-neutral-500'
                          }`}
                        />
                      </button>

                      {isOpenItem && (
                        <div className="px-3.5 sm:px-4 pb-4 pt-1 text-xs sm:text-[13px] text-neutral-700 leading-relaxed border-t border-amber-100 bg-amber-50/20">
                          <div className="font-bold text-amber-700 text-[11px] uppercase tracking-wider mb-1">
                            {faq.category}
                          </div>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Support Prompt */}
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="text-xs font-bold text-amber-900">
                    Have more specific questions?
                  </div>
                  <div className="text-[11px] text-amber-700">
                    Our senior travel advisors are happy to help anytime.
                  </div>
                </div>
                <a
                  href="tel:+918005550199"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black text-[#FFC928] text-xs font-black hover:bg-neutral-900 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FFC928]" />
                  <span>Call Helpdesk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqModal;
