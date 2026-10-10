import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Send,
  X,
} from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    destination: 'Domestic India (Kashmir, Kerala, Himachal)',
    seniorCount: '2 Seniors (Couple)',
    specialNeeds: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] sm:w-[88%] max-w-[390px] sm:max-w-[850px] lg:max-w-[950px] bg-[#FAF7F0] text-black rounded-3xl shadow-2xl border-2 border-[#FFC928] overflow-hidden max-h-[80dvh] flex flex-col my-auto"
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
            {/* Left Promotional Panel (Hidden on mobile, visible lg+) */}
            <div className="hidden lg:flex lg:col-span-5 bg-black text-white p-6 lg:p-8 flex-col justify-between relative overflow-hidden rounded-2xl mr-4">
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/95 pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFC928]">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Personal Senior Travel Helpdesk</span>
                </div>

                <h3
                  id="contact-modal-title"
                  className="text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-snug"
                >
                  Need Personalized Guidance for Your Parents' Next Trip?
                </h3>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Our Senior Travel Consultants specialize in mobility-friendly routing, wheelchair-equipped transport, medical diet coordination, and custom room selections. Speak to an expert who listens with warmth.
                </p>
              </div>

              <div className="relative z-10 space-y-2.5 pt-4 mt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FFC928] text-black flex items-center justify-center font-bold shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400">Toll-Free Line</div>
                    <a
                      href="tel:+918005550199"
                      className="text-xs sm:text-sm font-black text-white hover:text-[#FFC928] transition-colors"
                    >
                      +91 800-555-0199
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 text-[#FFC928] flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400">Senior Care Inquiries</div>
                    <span className="text-xs font-semibold text-neutral-200">
                      care@parentholidays.com
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 text-[#FFC928] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400">Operating Hours</div>
                    <span className="text-xs font-semibold text-neutral-200">
                      Mon – Sun, 8 AM – 9 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Panel (Full width on mobile, right col on desktop) */}
            <div className="col-span-12 lg:col-span-7 bg-[#FAF7F0] text-black pr-2 sm:pr-0">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#FFC928] text-black flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-black">Callback Request Received!</h4>
                  <p className="text-xs sm:text-sm text-neutral-700 max-w-sm mx-auto">
                    Thank you, <span className="font-bold">{formData.fullName}</span>. One of our dedicated Senior Holiday Specialists will contact you at <span className="font-bold">{formData.phone}</span> within 15 minutes.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="mt-3 px-5 py-2 bg-black text-[#FFC928] text-xs font-bold rounded-lg hover:bg-neutral-800 cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 id="contact-modal-title" className="text-base sm:text-lg font-black text-black pr-8">
                      Request a Complimentary Callback
                    </h4>
                    <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5">
                      Share your travel preferences and our senior holiday planner will reach out with customized itineraries.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="modal-fullName" className="block text-[11px] sm:text-xs font-bold text-neutral-800 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      id="modal-fullName"
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma or Dr. Meera"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-phone" className="block text-[11px] sm:text-xs font-bold text-neutral-800 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-seniorCount" className="block text-[11px] sm:text-xs font-bold text-neutral-800 mb-1">
                        Who is Travelling?
                      </label>
                      <select
                        id="modal-seniorCount"
                        value={formData.seniorCount}
                        onChange={(e) => setFormData({ ...formData, seniorCount: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                      >
                        <option value="2 Seniors (Couple)">2 Seniors (Couple)</option>
                        <option value="1 Senior (Solo Traveler)">1 Senior (Solo Traveler)</option>
                        <option value="Senior Parents + Adult Children">Parents + Adult Children</option>
                        <option value="Senior Group of Friends (3+)">Group of Senior Friends</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-destination" className="block text-[11px] sm:text-xs font-bold text-neutral-800 mb-1">
                      Preferred Holiday Region
                    </label>
                    <select
                      id="modal-destination"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                    >
                      <option value="Domestic India (Kashmir, Kerala, Himachal)">Domestic India (Kashmir, Kerala, Himachal)</option>
                      <option value="Spiritual Pilgrimages (Varanasi, Char Dham, Tirupati)">Spiritual Pilgrimages (Varanasi, Char Dham)</option>
                      <option value="International Escorted (Switzerland, Bali, Dubai)">International Escorted (Switzerland, Bali, Dubai)</option>
                      <option value="Ayurveda & Wellness Sanctuary">Ayurveda & Wellness Sanctuary</option>
                      <option value="Undecided / Open to Recommendations">Undecided / Need Recommendations</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="modal-specialNeeds" className="block text-[11px] sm:text-xs font-bold text-neutral-800 mb-1">
                      Any Specific Mobility or Dietary Needs? (Optional)
                    </label>
                    <input
                      id="modal-specialNeeds"
                      type="text"
                      placeholder="e.g. Ground floor room, wheelchair assistance, diabetic food"
                      value={formData.specialNeeds}
                      onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1 py-2.5 px-4 bg-black hover:bg-neutral-800 active:bg-neutral-900 text-[#FFC928] font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>Connecting with Specialist...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request a Free Specialist Callback</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
