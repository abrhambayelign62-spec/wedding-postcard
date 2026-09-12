import React from 'react';
import { motion } from 'motion/react';
import { Car, Utensils, Camera, Church, Cake, Clock } from 'lucide-react';
import { TimelineItem } from '../types';

interface TimelineSectionProps {
  timeline: TimelineItem[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ timeline }) => {
  const getIcon = (type: TimelineItem['icon']) => {
    switch (type) {
      case 'car':
        return <Car className="w-4 h-4 text-black" />;
      case 'church':
        return <Church className="w-4 h-4 text-black" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-black" />;
      case 'utensils':
        return <Utensils className="w-4 h-4 text-black" />;
      case 'cake':
        return <Cake className="w-4 h-4 text-black" />;
      default:
        return <Clock className="w-4 h-4 text-black" />;
    }
  };

  return (
    <section id="timeline-section" className="relative w-full bg-[#0A0A0A] py-14 px-5 sm:px-6">
      <div className="max-w-md mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 space-y-2"
        >
          <div className="inline-flex items-center gap-1 text-[#C9A66B] text-xs font-cinzel tracking-widest uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>Ceremony Itinerary</span>
          </div>
          <h3 className="font-amharic-heading text-3xl font-extrabold text-[#F4E3B2] tracking-wide">
            የሰርጋችን ፕሮግራም
          </h3>
          <p className="font-amharic-body text-xs sm:text-sm text-gray-400">
            የእለቱን የሰርግ ስነስርዓት ቅደም ተከተል
          </p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8">
          {/* Connecting Vertical Gold Line */}
          <div className="absolute left-[19px] sm:left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#C9A66B] via-[#F4E3B2] to-[#7A5A2E]" />

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-4 sm:gap-5"
              >
                {/* Circular Gold Icon Node */}
                <div className="relative -ml-[23px] sm:-ml-[31px] flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-[#B8874E] via-[#F4E3B2] to-[#C9A66B] p-[2px] shadow-lg shadow-[#C9A66B]/20 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                </div>

                {/* White Rounded Card matching the video */}
                <div className="flex-1 bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-gray-100 transition-all hover:translate-x-1 duration-200">
                  <h4 className="font-amharic-heading font-bold text-base sm:text-lg text-[#111111] leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1 text-xs sm:text-sm font-amharic-ui font-semibold text-[#8F652B]">
                    <Clock className="w-3.5 h-3.5 text-[#B8874E]" />
                    <span>{item.time}</span>
                  </div>
                  {item.subtitle && (
                    <p className="font-amharic-body text-xs text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
