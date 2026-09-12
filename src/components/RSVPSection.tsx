import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Heart, MessageSquareHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingData, RSVPSubmission } from '../types';

interface RSVPSectionProps {
  wedding: WeddingData;
  initialGuestName?: string;
  onRSVPSubmitted?: (submission: RSVPSubmission) => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  wedding,
  initialGuestName = '',
  onRSVPSubmitted,
}) => {
  const [fullName, setFullName] = useState(initialGuestName);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('እባክዎ ሙሉ ስምዎን ያስገቡ');
      return;
    }

    setError('');

    // Trigger celebration confetti
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#C9A66B', '#F4E3B2', '#1F5568', '#FFFFFF', '#6FA37A'],
    });

    const newSubmission: RSVPSubmission = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      localStorage.setItem('wedding_rsvps', JSON.stringify([...existing, newSubmission]));
    } catch {
      // LocalStorage access fallback
    }

    if (onRSVPSubmitted) {
      onRSVPSubmitted(newSubmission);
    }

    setIsSubmitted(true);
  };

  return (
    <section id="rsvp-section" className="relative w-full bg-[#0A0A0A] py-16 px-5 sm:px-6 text-white">
      <div className="max-w-md mx-auto">
        {/* Gold Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 text-[#C9A66B] text-xs font-cinzel tracking-widest uppercase">
            <MessageSquareHeart className="w-4 h-4" />
            <span>RSVP & Wishes</span>
          </div>
          <h3 className="font-amharic-heading text-3xl font-extrabold text-[#F4E3B2] tracking-wide">
            ደስታችንን ተካፈሉን
          </h3>
          <p className="font-amharic-body text-xs sm:text-sm text-gray-400">
            እባክዎ የመገኘትዎን ሁኔታ እስከ ግንቦት 10 ቀን ድረስ ያሳውቁን
          </p>
        </motion.div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-[#141414] border border-[#C9A66B]/50 text-center space-y-4 shadow-2xl"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1F5568] border border-[#C9A66B] flex items-center justify-center text-[#F4E3B2]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-amharic-heading text-xl font-bold text-[#F4E3B2]">
                መልስዎ በክብር ደርሶናል!
              </h4>
              <p className="font-amharic-body text-sm text-gray-300 leading-relaxed">
                ክቡር <strong className="text-white font-amharic-heading">{fullName}</strong>፣ {attending === 'yes' ? 'በሰርጋችን ላይ ለመገኘት ፈቃደኛ ስለሆኑ እናመሰግናለን! በደስታ እንጠብቅዎታለን።' : 'መልዕክትዎን አድርሰውናል፤ በሌላ ጊዜ በፍቅር እንደምንገናኝ ተስፋ እናደርጋለን።'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  type="button"
                  className="text-xs text-[#C9A66B] underline font-amharic-ui hover:text-[#F4E3B2] cursor-pointer"
                >
                  መልስዎን ለመቀየር እዚህ ይጫኑ
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-7 rounded-3xl bg-[#141414] border border-[#262626] shadow-2xl space-y-6"
            >
              {error && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-200 text-xs font-amharic-ui text-center">
                  {error}
                </div>
              )}

              {/* 1. Full Name (ሙሉ ስም) */}
              <div className="space-y-2">
                <label
                  htmlFor="full-name-input"
                  className="block text-sm font-amharic-heading font-semibold text-white"
                >
                  ሙሉ ስም <span className="text-[#C9A66B]">*</span>
                </label>
                <input
                  id="full-name-input"
                  type="text"
                  required
                  placeholder="የእርስዎን ስም ያስገቡ..."
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white text-black placeholder-gray-400 font-amharic-body text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A66B] transition-all shadow-sm"
                />
              </div>

              {/* 2. Attendance Radio Options (ሰርጋችንን ላይ መገኘት ይቻላሉ?) */}
              <div className="space-y-3">
                <label className="block text-sm font-amharic-heading font-semibold text-white">
                  ሰርጋችንን ላይ መገኘት ይቻላሉ? <span className="text-[#C9A66B]">*</span>
                </label>

                <div className="space-y-2.5">
                  {/* Option 1: Yes */}
                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === 'yes'}
                      onChange={() => setAttending('yes')}
                      className="w-4 h-4 text-[#C9A66B] focus:ring-[#C9A66B] accent-[#C9A66B]"
                    />
                    <span className="font-amharic-body text-sm text-gray-200">
                      አዎ፣ በደስታ! እመጣለሁ።
                    </span>
                  </label>

                  {/* Option 2: No */}
                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === 'no'}
                      onChange={() => setAttending('no')}
                      className="w-4 h-4 text-[#C9A66B] focus:ring-[#C9A66B] accent-[#C9A66B]"
                    />
                    <span className="font-amharic-body text-sm text-gray-200">
                      በጣም ይቅርታ፣ መገኘት አልችልም።
                    </span>
                  </label>
                </div>
              </div>

              {/* 3. Number of Guests (if attending) */}
              {attending === 'yes' && (
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-amharic-ui font-semibold text-gray-300">
                    የተጋባዦች ብዛት (Max {wedding.maxGuestsAllowed})
                  </label>
                  <div className="flex gap-3">
                    {[1, 2].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2.5 rounded-xl font-amharic-ui font-bold text-sm border transition-all cursor-pointer ${
                          guestCount === num
                            ? 'bg-[#C9A66B] text-black border-[#C9A66B]'
                            : 'bg-[#1a1a1a] text-gray-300 border-[#333] hover:border-gray-500'
                        }`}
                      >
                        {num} {num === 1 ? 'ሰው' : 'ሰዎች (+1)'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Message for Bride & Groom (ለሙሽራይቱና ለሙሽራው መልዕክት) */}
              <div className="space-y-2">
                <label
                  htmlFor="message-input"
                  className="block text-sm font-amharic-heading font-semibold text-white"
                >
                  ለሙሽራይቱና ለሙሽራው መልዕክት
                </label>
                <textarea
                  id="message-input"
                  rows={3}
                  placeholder="የመልካም ምኞት ቃላቶን እዚህ ያጋሩን..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-400 font-amharic-body text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A66B] transition-all shadow-sm resize-none"
                />
              </div>

              {/* 5. Gold Submit Button: ይላኩ */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#B8874E] via-[#F4E3B2] to-[#C9A66B] hover:brightness-105 active:scale-[0.98] text-[#111111] font-amharic-ui font-bold text-base shadow-xl shadow-[#C9A66B]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>ይላኩ (Confirm RSVP)</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer Credit Line */}
        <div className="mt-14 pt-6 border-t border-[#222222] text-center space-y-2 text-xs text-gray-400">
          <div className="flex items-center justify-center gap-1.5 text-[#C9A66B]">
            <Heart className="w-3.5 h-3.5 fill-[#C9A66B]" />
            <span className="font-cinzel tracking-widest text-[11px] font-bold">
              YENE SERG • HABESHA WEDDING
            </span>
          </div>
          <p className="text-xs text-gray-400 font-amharic-names tracking-wider">
            {wedding.groomName} <span className="font-amharic-heading font-normal">እና</span> {wedding.brideName} • <span className="font-amharic-ui">ግንቦት 16/2018 ዓ.ም</span>
          </p>
        </div>
      </div>
    </section>
  );
};
