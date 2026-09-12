import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { WeddingData } from '../types';
import { GoldWaveDivider } from './GoldWaveDivider';

interface CalendarSectionProps {
  wedding: WeddingData;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({ wedding }) => {
  // Ethiopian day headers: እሁድ (Sun), ሰኞ (Mon), ማክሰኞ (Tue), ረቡዕ (Wed), ሐሙስ (Thu), አርብ (Fri), ቅዳሜ (Sat)
  const dayNames = ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'];

  // May 2026: May 1, 2026 was a Friday (5 empty days for Sun, Mon, Tue, Wed, Thu)
  // Total 31 days in May
  const emptyDaysBefore = 5;
  const daysInMonth = 31;
  const weddingDay = 24;

  return (
    <section id="calendar-section" className="relative w-full bg-[#EAE5E2] text-[#1A1A1A] pt-12 overflow-hidden">
      {/* Background Watermark Photo of the Couple */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] mix-blend-multiply overflow-hidden">
        <img
          src={wedding.heroPhoto}
          alt="Watermark background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 text-center space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-1.5"
        >
          <h3 className="font-amharic-heading text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            ቀኑን እንዳይረሱ
          </h3>
          <p className="font-amharic-names text-xl sm:text-2xl text-[#8C6228]">
            {wedding.groomName} አረጋ <span className="font-amharic-heading text-base font-normal text-[#A87938]">እና</span> {wedding.brideName} መስፍን
          </p>
        </motion.div>

        {/* Calendar Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-5 sm:p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#D5CBC2] shadow-xl"
        >
          {/* Month & Year header */}
          <div className="flex items-center justify-between border-b border-[#E2DDD7] pb-3 mb-4">
            <span className="font-cinzel font-bold text-sm tracking-widest text-[#7A5A2E]">
              MAY 2026
            </span>
            <span className="font-amharic-heading text-xs sm:text-sm font-bold text-[#8C6D39]">
              ግንቦት 2018 ዓ.ም
            </span>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3">
            {dayNames.map((day, idx) => (
              <div
                key={day}
                className={`text-[11px] sm:text-xs font-amharic-ui font-semibold py-1 ${
                  idx === 0 ? 'text-[#B8874E]' : 'text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-sm font-sans">
            {/* Empty slots before May 1 (Fri) */}
            {Array.from({ length: emptyDaysBefore }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-9 sm:h-10" />
            ))}

            {/* Days 1 to 31 */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const isWeddingDay = dayNum === weddingDay;

              return (
                <div
                  key={dayNum}
                  className="h-9 sm:h-10 flex items-center justify-center relative"
                >
                  {isWeddingDay ? (
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C9A66B] bg-[#FDF9F3] flex flex-col items-center justify-center shadow-md animate-pulse">
                      <Heart className="w-2.5 h-2.5 text-[#A87938] fill-[#A87938] -mt-1" />
                      <span className="font-bold text-xs sm:text-sm text-[#7A5A2E] leading-none">
                        {dayNum}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-700 hover:text-black font-medium text-xs sm:text-sm">
                      {dayNum}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Highlighted Date Summary Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1 pb-4"
        >
          <p className="font-amharic-heading text-xl sm:text-2xl font-bold text-[#111111]">
            ሜይ 24, 2026
          </p>
          <p className="font-amharic-heading text-sm sm:text-base text-[#A87938] font-semibold">
            {wedding.weddingDateEthiopian}
          </p>
        </motion.div>
      </div>

      {/* Gold Ribbon Wave Divider transitioning into Ceremony Timeline */}
      <div className="mt-6">
        <GoldWaveDivider inverted={false} bgFill="#EAE5E2" />
      </div>
    </section>
  );
};
