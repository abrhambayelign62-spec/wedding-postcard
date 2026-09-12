import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Heart, ShieldAlert } from 'lucide-react';
import { WeddingData } from '../types';
import { GoldWaveDivider } from './GoldWaveDivider';

interface HeroGreetingProps {
  wedding: WeddingData;
  onNavigateToMap: () => void;
}

export const HeroGreeting: React.FC<HeroGreetingProps> = ({
  wedding,
  onNavigateToMap,
}) => {
  return (
    <section id="hero-greeting" className="relative w-full bg-[#0A0A0A] text-white">
      {/* Top Couple Photo Header with Gradient Overlays */}
      <div className="relative w-full h-[68vh] sm:h-[75vh] min-h-[460px] overflow-hidden">
        <img
          src={wedding.heroPhoto}
          alt={`${wedding.groomName} እና ${wedding.brideName}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />

        {/* Top Vignette Overlay */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent pointer-events-none" />

        {/* Bottom Vignette Overlay blending seamlessly into black section below */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent pointer-events-none" />

        {/* Text Overlay on Couple Photo */}
        <div className="absolute inset-x-0 bottom-6 px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            {/* Formal Elegant Couple Names with Stately Ge'ez Display Style */}
            <h2 className="font-amharic-names text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-white tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight">
              {wedding.groomName} <span className="text-[#C9A66B] font-medium text-2xl sm:text-3xl mx-1 font-amharic-heading">እና</span> {wedding.brideName}
            </h2>

            {/* Subheading: ቀኑ እንደደረሰ */}
            <p className="font-amharic-poetic text-[#F4E3B2] text-sm sm:text-base font-semibold mt-1.5 drop-shadow-md">
              ቀኑ እንደደረሰ
            </p>

            {/* Date Tag */}
            <div className="inline-flex items-center gap-1.5 mt-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C9A66B]/50 text-xs text-[#F4E3B2] font-amharic-ui">
              <Calendar className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>{wedding.weddingDateEthiopian}</span>
            </div>

            {/* Dear Family and Friends Headline */}
            <h3 className="font-amharic-heading text-2xl sm:text-3xl font-bold text-white mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              ውድ ቤተሰቦች እና ጓደኞች
            </h3>
          </motion.div>
        </div>
      </div>

      {/* Solid Black Detail Card */}
      <div className="relative px-6 py-8 max-w-lg mx-auto text-center space-y-7 z-10">
        {/* Scripture Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative px-4 py-3 rounded-xl border border-[#C9A66B]/25 bg-[#141414]/80 shadow-lg"
        >
          <div className="flex justify-center mb-1 text-[#C9A66B]">
            <Heart className="w-4 h-4 fill-[#C9A66B]/30" />
          </div>
          <blockquote className="font-amharic-poetic text-sm sm:text-base text-[#F4E3B2] leading-relaxed">
            "{wedding.scriptureText}"
          </blockquote>
          <cite className="block text-xs font-amharic-ui text-[#C9A66B] mt-1.5 font-medium not-italic">
            {wedding.scriptureCitation}
          </cite>
        </motion.div>

        {/* Invitation Letter Body */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 text-sm sm:text-base font-amharic-body leading-relaxed text-gray-200"
        >
          <p className="text-gray-300">
            የክቡር እንግዳችን እንድትሆኑ በታላቅ ደስታና ፍቅር ጋብዘንዎታል።
          </p>
          <p className="text-[#F4E3B2] font-semibold font-amharic-heading text-base sm:text-lg">
            {wedding.groomFamilyTitle} እና {wedding.brideFamilyTitle}
          </p>
          <p className="text-gray-300">
            የጋብቻ ስነ-ስርዓት የሚፈጸመው እሁድ <span className="text-[#F4E3B2] font-bold font-amharic-heading">{wedding.weddingDateEthiopian}</span> ሲሆን፣
            በዚሁ ዕለት በአዳራሽ <span className="text-[#F4E3B2] font-bold font-amharic-heading">{wedding.weddingTime}</span> ጀምሮ በምናደርገው የእራት ግብዣ ላይ እንድትገኙልን በአክብሮት ጠርተንዎታል፡፡
          </p>

          {/* Polite Notice Badge */}
          <div className="p-3 rounded-lg bg-[#1a1510] border border-[#C9A66B]/30 text-xs sm:text-sm text-[#FFE8C2] flex flex-col items-center gap-1.5 mt-4">
            <div className="flex items-center gap-1.5 text-[#C9A66B] font-bold font-amharic-heading">
              <ShieldAlert className="w-4 h-4" />
              <span>የማስታወሻ መልዕክት</span>
            </div>
            <p className="text-center text-gray-300 font-amharic-body">
              የመግቢያ ካርድ እንዳይለይዎ፤
              <br />
              <span className="text-[#F4E3B2] font-semibold font-amharic-heading">ይቅርታ ጋር ለልጆች ቦታ አላዘጋጀንም !!!</span>
            </p>
          </div>
        </motion.div>

        {/* Venue Row Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2"
        >
          <button
            onClick={onNavigateToMap}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#181818] hover:bg-[#222222] border border-[#C9A66B] text-[#F4E3B2] text-sm font-amharic-ui font-semibold shadow-md transition-all active:scale-95 group cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#C9A66B] group-hover:scale-110 transition-transform" />
            <span>{wedding.venueName}</span>
          </button>
        </motion.div>
      </div>

      {/* Gold Ribbon Wave Divider transitioning into Map section */}
      <GoldWaveDivider inverted={false} bgFill="#0A0A0A" />
    </section>
  );
};
