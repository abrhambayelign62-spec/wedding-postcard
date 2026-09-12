import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Download, Check, Sparkles } from 'lucide-react';
import { WeddingData } from '../types';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { GoldWaveDivider } from './GoldWaveDivider';

interface CountdownSectionProps {
  wedding: WeddingData;
  onOpenPass: () => void;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  wedding,
  onOpenPass,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    // Target: May 24, 2026 12:00:00 (Addis Ababa time UTC+3)
    const targetDate = new Date('2026-05-24T12:00:00+03:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadIcs = () => {
    downloadIcsFile(wedding);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const googleCalUrl = createGoogleCalendarUrl(wedding);

  return (
    <section id="countdown-section" className="relative w-full bg-white text-[#111111] pt-14 overflow-hidden">
      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-1.5"
        >
          <div className="inline-flex items-center gap-1.5 text-[#B8874E] text-xs font-cinzel tracking-widest uppercase">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Count Every Moment</span>
          </div>
          <h3 className="font-amharic-heading text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            ለሰርጋችን የቀረው ቀን
          </h3>
          <p className="font-amharic-body text-xs sm:text-sm text-gray-500">
            አብረን የምንደሰትበት የፍቅር ቀን
          </p>
        </motion.div>

        {/* 4 Counter Columns matching the video at 00:56 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-4 gap-2 sm:gap-3"
        >
          {/* Days */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#F8F6F3] border border-[#EAE3DA] shadow-sm">
            <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#A87938]">
              {timeLeft.days}
            </span>
            <span className="font-amharic-ui text-xs text-gray-700 font-bold mt-1">
              ቀን
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#F8F6F3] border border-[#EAE3DA] shadow-sm">
            <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#A87938]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="font-amharic-ui text-xs text-gray-700 font-bold mt-1">
              ሰዓት
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#F8F6F3] border border-[#EAE3DA] shadow-sm">
            <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#A87938]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="font-amharic-ui text-xs text-gray-700 font-bold mt-1">
              ደቂቃ
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-[#F8F6F3] border border-[#EAE3DA] shadow-sm">
            <span className="font-cinzel text-3xl sm:text-4xl font-bold text-[#A87938]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="font-amharic-ui text-xs text-gray-700 font-bold mt-1">
              ሰከንድ
            </span>
          </div>
        </motion.div>

        {/* Add to Calendar & Digital Pass Buttons */}
        <div className="space-y-3 pt-2">
          {/* Black Pill-Shaped Button: ወደ ካሌንደር ያስገቡ */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#111111] hover:bg-black text-[#F4E3B2] border border-[#C9A66B]/50 font-amharic-ui font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <CalendarIcon className="w-4 h-4 text-[#C9A66B]" />
              <span>ወደ Google Calendar ያስገቡ</span>
            </a>

            <button
              onClick={handleDownloadIcs}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-gray-50 text-[#111111] border border-gray-300 font-amharic-ui text-xs sm:text-sm font-medium shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-green-600" />
                  <span>ተመዝግቧል! (.ics)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-gray-600" />
                  <span>iCal / Outlook አውርድ</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Access to Digital Pass Card */}
          <div className="pt-2">
            <button
              onClick={onOpenPass}
              type="button"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-amharic-ui font-bold text-[#9C7133] hover:text-[#7A5A2E] underline underline-offset-4 cursor-pointer"
            >
              የመግቢያ ዲጂታል ፓስዎን (QR Code) እዚህ ይመልከቱ →
            </button>
          </div>
        </div>
      </div>

      {/* Gold Ribbon Wave Divider transitioning into next section */}
      <div className="mt-10">
        <GoldWaveDivider inverted={false} bgFill="#FFFFFF" />
      </div>
    </section>
  );
};
