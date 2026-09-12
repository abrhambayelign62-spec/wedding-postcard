import React from 'react';
import { motion } from 'motion/react';
import { Send, Camera, Video } from 'lucide-react';
import { WeddingData } from '../types';

interface ShareMediaSectionProps {
  wedding: WeddingData;
}

export const ShareMediaSection: React.FC<ShareMediaSectionProps> = ({ wedding }) => {
  return (
    <section id="share-media-section" className="relative w-full py-16 px-6 text-white overflow-hidden bg-[#0A0A0A]">
      {/* Background with couple detail photo and dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={wedding.traditionalPhoto}
          alt="Share photos background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-[#181818]/90 border border-[#C9A66B]/50 text-[#F4E3B2] text-xs font-cinzel tracking-wider"
        >
          <Camera className="w-3.5 h-3.5 text-[#C9A66B]" />
          <span>Capture Memories</span>
          <Video className="w-3.5 h-3.5 text-[#C9A66B]" />
        </motion.div>

        {/* Headline matching prompt & video */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h3 className="font-amharic-heading text-2xl sm:text-3xl font-extrabold text-[#F4E3B2] leading-snug">
            የሰርጉን ድጋፍ በፎቶ እና በቪዲዮ አጋሩን
          </h3>
          <p className="font-amharic-body text-sm sm:text-base text-gray-300 leading-relaxed max-w-sm mx-auto">
            በሰርጉ ዕለት ያነሳችሁትን ፎቶ እና ቪዲዮ በቀጥታ ለእኛ በ<span className="text-[#F4E3B2] font-semibold font-amharic-heading">"ቴሌግራም ቦት"</span> አማካኝነት አጋሩን!!!
          </p>
        </motion.div>

        {/* Gold Pill Button matching video: ቴሌግራም ቦት */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-2"
        >
          <a
            href={wedding.telegramBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#B8874E] via-[#F4E3B2] to-[#C9A66B] hover:brightness-105 active:scale-95 text-[#111111] font-amharic-ui font-bold text-base shadow-xl shadow-[#C9A66B]/20 transition-all cursor-pointer"
          >
            <Send className="w-5 h-5 text-black -rotate-12" />
            <span>ቴሌግራም ቦት (Share on Telegram)</span>
          </a>
        </motion.div>

        <p className="text-xs text-gray-500 font-amharic-body">
          የላኳቸው ፎቶዎችና ቪዲዮዎች ለሙሽሮቹ የዲጂታል አልበም ይገባሉ
        </p>
      </div>
    </section>
  );
};
