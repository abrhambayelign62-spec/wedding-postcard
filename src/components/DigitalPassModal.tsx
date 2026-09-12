import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Download, Check, X, ShieldCheck, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingData } from '../types';

interface DigitalPassProps {
  wedding: WeddingData;
  guestName?: string;
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const DigitalPass: React.FC<DigitalPassProps> = ({
  wedding,
  guestName,
  isOpen = true,
  onClose,
  isModal = false,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const passId = `YS-2026-MAY24-${Math.abs(
    (guestName || 'GUEST').split('').reduce((acc, char) => acc + char.charCodeAt(0), 1024)
  ) % 9000 + 1000}`;

  const handleDownload = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#C9A66B', '#F4E3B2', '#1F5568', '#FFFFFF'],
    });

    setDownloaded(true);
    // Trigger printable window or simulated download
    setTimeout(() => {
      window.print();
    }, 400);
    setTimeout(() => setDownloaded(false), 4000);
  };

  const passContent = (
    <div className="w-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden border-2 border-[#C9A66B] shadow-2xl text-[#111111] p-6 text-center space-y-5 relative">
      {/* Top Gold Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A66B] rounded-tl-2xl m-2" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A66B] rounded-tr-2xl m-2" />

      {/* Header Badge matching video at 00:58: "ACCESS FOR 2 GUESTS" */}
      <div className="space-y-1 pt-1">
        <span className="inline-block px-4 py-1 rounded-full bg-[#FAF5EE] border border-[#C9A66B]/50 font-cinzel text-xs font-bold text-[#8F652B] tracking-wider uppercase">
          ACCESS FOR {wedding.maxGuestsAllowed} GUESTS
        </span>
        <h4 className="font-amharic-heading text-lg font-bold text-black mt-2">
          የክብር መግቢያ ዲጂታል ካርድ
        </h4>
        <p className="font-amharic-names text-xs text-gray-700">
          {wedding.groomName} <span className="font-amharic-heading font-normal text-gray-500">እና</span> {wedding.brideName} • <span className="font-amharic-ui">ግንቦት 16/2018 ዓ.ም</span>
        </p>
      </div>

      {/* Personalized Guest Box */}
      <div className="px-3 py-2 rounded-xl bg-[#F8F6F3] border border-dashed border-[#C9A66B]/60 text-xs font-amharic-ui text-gray-700 flex items-center justify-center gap-2">
        <User className="w-3.5 h-3.5 text-[#B8874E]" />
        <span>የተጋባዥ ስም፦ </span>
        <strong className="text-black font-semibold font-amharic-heading">
          {guestName || 'የተከበሩ ቤተሰብ / ጓደኛ'}
        </strong>
      </div>

      {/* Stylized Scannable QR Code matching video */}
      <div className="relative mx-auto w-52 h-52 sm:w-56 sm:h-56 p-3 rounded-2xl bg-white border-2 border-gray-200 shadow-inner flex items-center justify-center">
        {/* SVG QR Code Pattern with Monogram center */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          shapeRendering="crispEdges"
        >
          {/* Background */}
          <rect width="200" height="200" fill="#ffffff" />

          {/* Top Left Finder Pattern */}
          <rect x="15" y="15" width="45" height="45" fill="#111111" />
          <rect x="22" y="22" width="31" height="31" fill="#ffffff" />
          <rect x="29" y="29" width="17" height="17" fill="#111111" />

          {/* Top Right Finder Pattern */}
          <rect x="140" y="15" width="45" height="45" fill="#111111" />
          <rect x="147" y="22" width="31" height="31" fill="#ffffff" />
          <rect x="154" y="29" width="17" height="17" fill="#111111" />

          {/* Bottom Left Finder Pattern */}
          <rect x="15" y="140" width="45" height="45" fill="#111111" />
          <rect x="22" y="147" width="31" height="31" fill="#ffffff" />
          <rect x="29" y="154" width="17" height="17" fill="#111111" />

          {/* Data Modules Grid (authentic rhythmic pattern) */}
          <g fill="#1F5568">
            <rect x="70" y="20" width="8" height="8" />
            <rect x="85" y="20" width="8" height="8" />
            <rect x="100" y="20" width="16" height="8" />
            <rect x="120" y="20" width="8" height="8" />

            <rect x="70" y="35" width="16" height="8" />
            <rect x="95" y="35" width="8" height="8" />
            <rect x="110" y="35" width="16" height="8" />

            <rect x="20" y="70" width="8" height="16" />
            <rect x="35" y="70" width="16" height="8" />
            <rect x="20" y="95" width="8" height="16" />
            <rect x="35" y="105" width="8" height="8" />

            <rect x="145" y="70" width="8" height="8" />
            <rect x="160" y="70" width="16" height="8" />
            <rect x="145" y="90" width="16" height="8" />
            <rect x="170" y="90" width="8" height="16" />
            <rect x="150" y="110" width="8" height="8" />

            <rect x="20" y="125" width="16" height="8" />
            <rect x="45" y="125" width="8" height="8" />

            <rect x="70" y="145" width="16" height="8" />
            <rect x="95" y="145" width="8" height="8" />
            <rect x="115" y="145" width="8" height="8" />
            <rect x="145" y="145" width="16" height="8" />
            <rect x="170" y="145" width="8" height="8" />

            <rect x="70" y="160" width="8" height="16" />
            <rect x="90" y="160" width="16" height="8" />
            <rect x="115" y="160" width="16" height="8" />
            <rect x="145" y="165" width="8" height="8" />
            <rect x="165" y="165" width="16" height="8" />

            <rect x="70" y="180" width="16" height="8" />
            <rect x="95" y="180" width="8" height="8" />
            <rect x="110" y="180" width="16" height="8" />
            <rect x="140" y="180" width="8" height="8" />
          </g>

          {/* Center Monogram Shield Badge */}
          <circle cx="100" cy="100" r="26" fill="#ffffff" stroke="#C9A66B" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="21" fill="#FAF5EE" />
          <text
            x="100"
            y="105"
            fontFamily="'Cinzel', serif"
            fontSize="14"
            fontWeight="bold"
            fill="#7A5A2E"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {wedding.initials}
          </text>
        </svg>

        {/* Pass ID Tag at bottom */}
        <div className="absolute -bottom-2.5 px-3 py-0.5 rounded-full bg-[#111111] text-[#F4E3B2] font-mono text-[10px] tracking-wider border border-[#C9A66B]/60">
          {passId}
        </div>
      </div>

      {/* Download Pass Button matching video styling (Cognac/Brownish-Gold) */}
      <div>
        <button
          onClick={handleDownload}
          type="button"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#A87938] via-[#B8874E] to-[#9C7133] hover:brightness-105 active:scale-[0.98] text-white font-amharic-ui font-bold text-sm shadow-lg shadow-[#A87938]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>ዲጂታል ካርዱ ተዘጋጅቷል / Ready!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-white" />
              <span>Download Pass</span>
            </>
          )}
        </button>
      </div>

      {/* Instruction text from video: "እባክዎ ኮዱን በስልክዎ ይያዙት ወይም ለማውረድ የተዘጋጀውን Download ይጠቀሙ" */}
      <p className="text-[11px] sm:text-xs text-gray-500 font-amharic-body leading-relaxed">
        እባክዎ ኮዱን በስልክዎ ይያዙት ወይም ለማውረድ የተዘጋጀውን Download ይጠቀሙ
      </p>

      {/* Venue note */}
      <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#A87938] font-amharic-ui">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>በመግቢያ በር ላይ ለተቆጣጣሪዎች ያሳዩ</span>
      </div>
    </div>
  );

  if (!isModal) {
    return (
      <section id="digital-pass-section" className="relative w-full bg-[#0A0A0A] py-10 px-4 sm:px-6">
        {passContent}
      </section>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm"
          >
            {onClose && (
              <button
                onClick={onClose}
                type="button"
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-[#1F5568] text-white border border-[#C9A66B] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {passContent}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
