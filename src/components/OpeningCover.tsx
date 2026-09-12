import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { WeddingData } from '../types';

interface OpeningCoverProps {
  wedding: WeddingData;
  onOpen: () => void;
  guestName?: string;
}

export const OpeningCover: React.FC<OpeningCoverProps> = ({
  wedding,
  onOpen,
  guestName,
}) => {
  return (
    <motion.div
      id="cover-screen"
      onClick={onOpen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -80, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }}
      className="relative w-full h-[100dvh] bg-[#FCFBF7] overflow-hidden flex flex-col items-center justify-between text-center cursor-pointer select-none py-12 px-6"
    >
      {/* Cover Background Photo in White / Ivory */}
      {wedding.coverPhoto && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={wedding.coverPhoto}
            alt="Wedding Cover Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105"
          />
          {/* Soft luminous white/ivory gradient overlay ensuring pristine contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF7]/75 via-[#FCFBF7]/50 to-[#FCFBF7]/85" />
        </div>
      )}

      {/* Spotlight Beams on White Background */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Left spotlight beam */}
        <div
          className="absolute -top-12 -left-16 w-[120vw] sm:w-[600px] h-[120vh] origin-top-left rotate-[28deg] animate-beam opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.95) 0%, rgba(201, 166, 107, 0.22) 35%, rgba(252, 251, 247, 0) 70%)',
            filter: 'blur(30px)',
          }}
        />
        {/* Right spotlight beam */}
        <div
          className="absolute -top-12 -right-16 w-[120vw] sm:w-[600px] h-[120vh] origin-top-right -rotate-[28deg] animate-beam opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(255, 255, 255, 0.95) 0%, rgba(201, 166, 107, 0.22) 35%, rgba(252, 251, 247, 0) 70%)',
            filter: 'blur(30px)',
            animationDelay: '-2s',
          }}
        />
        {/* Subtle radial center bloom */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(244, 227, 178, 0.35) 0%, rgba(252, 251, 247, 0) 70%)',
            filter: 'blur(45px)',
          }}
        />
      </div>

      {/* Top subtle badge if personalized for guest */}
      <div className="relative z-10 w-full pt-4">
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#C9A66B]/60 bg-white/90 backdrop-blur-md text-[#7A551E] text-xs font-amharic-ui tracking-wide mb-2 shadow-sm"
          >
            ለክቡር/ት: <span className="font-bold text-[#1A1A1A]">{guestName}</span>
          </motion.div>
        )}
      </div>

      {/* Center Group: Monogram Badge, Arrow, Open prompt, Names */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-md">
        {/* Monogram Seal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mb-6"
        >
          {/* Outer glowing halo */}
          <div className="absolute inset-0 rounded-full bg-[#C9A66B]/25 blur-md scale-110" />

          {/* White Monogram Circle */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center border-2 border-[#C9A66B] shadow-xl">
            {/* Inner delicate concentric ring */}
            <div className="w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full border border-[#C9A66B]/50 flex items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#F2EDE4]">
              <span className="font-script text-4xl sm:text-5xl font-bold text-[#2C5E3B] tracking-wider select-none drop-shadow-sm">
                {wedding.initials}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Upward pulsing arrow */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[#9C7133] mb-2 flex items-center justify-center"
        >
          <ArrowUp className="w-6 h-6 stroke-[2.2]" />
        </motion.div>

        {/* Open Invitation text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-1 mb-6"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#7A551E] font-semibold">
            Open Invitation
          </p>
          <p className="text-sm sm:text-base font-amharic-heading text-[#8F652B] font-bold tracking-wide">
            ግብዣውን ለመክፈት ይንኩ
          </p>
        </motion.div>

        {/* Couple Names: Latin Cursive + Formal Distinctive Amharic Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full px-2"
        >
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#2C5E3B] tracking-wide mb-1 drop-shadow-sm">
            Adane & Bitaniya
          </h1>
          <p className="font-amharic-names text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-[#1A1A1A] mt-1.5 drop-shadow-sm leading-snug">
            {wedding.groomName} <span className="text-[#9C7133] font-medium text-2xl sm:text-3xl mx-1 font-amharic-heading">እና</span> {wedding.brideName}
          </p>
        </motion.div>

        {/* Thin Gold Divider Line */}
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent my-6" />

        {/* Save the Date label and date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-1"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#7A551E] font-semibold">
            Save the Date
          </p>
          <p className="text-sm sm:text-base font-amharic-heading font-bold text-[#1A1A1A]">
            {wedding.weddingDateEthiopian}
          </p>
          <p className="text-xs text-[#7A551E] font-cinzel font-semibold tracking-widest">
            {wedding.weddingDateGregorian}
          </p>
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 pb-2">
        <span className="inline-block text-[11px] text-[#6B5A45] font-amharic-ui animate-pulse tracking-wide">
          የሰርግ ካርዱን ለማየት ይጫኑ • Tap anywhere to enter
        </span>
      </div>
    </motion.div>
  );
};
