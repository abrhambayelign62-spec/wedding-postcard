import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { WeddingData } from '../types';

interface StoryGallerySectionProps {
  wedding: WeddingData;
}

export const StoryGallerySection: React.FC<StoryGallerySectionProps> = ({ wedding }) => {
  const slides = [
    {
      id: 'modern',
      image: wedding.heroPhoto,
      tag: 'የሰርጋችን ቀን',
      title: 'ፍቅር የህይወት ውብ ጅምር ነው',
      desc: 'የሁለት ልቦች አንድነት፣ በፈጣሪ በረከትና በወዳጅ ዘመድ ጸሎት የደመቀ።',
    },
    {
      id: 'traditional',
      image: wedding.traditionalPhoto,
      tag: 'የሀበሻ ባህላዊ ክብር (ካባ)',
      title: 'የወላጆች ምርቃት እና የባህል ክብር',
      desc: 'በጥልፍና በካባ ደምቀን የወላጆቻችንን ምርቃት ተቀብለናል።',
    },
    {
      id: 'promise',
      image: wedding.detailPhoto,
      tag: 'የዘላለም ቃል ኪዳን',
      title: 'የቀለበት ማሰርና የፍቅር ቃል',
      desc: 'በደስታም በችግርም አብሮ ለመጓዝ የተገባ የዘላለም ቃል ኪዳን።',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="story-section" className="relative w-full bg-[#0A0A0A] py-12 px-4 sm:px-6 text-white overflow-hidden">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 space-y-1.5"
        >
          <div className="inline-flex items-center gap-1.5 text-[#C9A66B] text-xs font-cinzel tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-[#C9A66B]/30" />
            <span>Our Love Story</span>
          </div>
          <h3 className="font-amharic-heading text-3xl font-extrabold text-white">
            የፍቅራችን ታሪክ
          </h3>
          <p className="font-amharic-body text-xs sm:text-sm text-gray-400">
            የውብ ትዝታዎቻችን ገጾች
          </p>
        </motion.div>

        {/* Gallery Carousel Container */}
        <div className="relative rounded-2xl overflow-hidden border border-[#C9A66B]/30 shadow-2xl bg-[#141414]">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[currentIndex].id}
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {/* Top & Bottom Vignettes */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

            {/* Category Tag on Photo */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C9A66B]/40 text-[#F4E3B2] text-xs font-amharic-ui">
                {slides[currentIndex].tag}
              </span>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Story Text Overlay at Bottom */}
            <div className="absolute inset-x-0 bottom-4 px-5 z-10 text-center space-y-1">
              <h4 className="font-amharic-heading text-lg sm:text-xl font-bold text-[#F4E3B2]">
                {slides[currentIndex].title}
              </h4>
              <p className="font-amharic-body text-xs sm:text-sm text-gray-200 line-clamp-2">
                {slides[currentIndex].desc}
              </p>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="p-3 bg-[#111111] flex items-center justify-center gap-2 border-t border-[#C9A66B]/20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                type="button"
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 bg-[#C9A66B]'
                    : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
