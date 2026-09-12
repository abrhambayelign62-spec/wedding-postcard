import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Star, ExternalLink } from 'lucide-react';
import { WeddingData } from '../types';

interface MapSectionProps {
  wedding: WeddingData;
}

export const MapSection: React.FC<MapSectionProps> = ({ wedding }) => {
  return (
    <section id="map-section" className="relative w-full bg-[#0A0A0A] py-8 px-4 sm:px-6">
      <div className="max-w-md mx-auto space-y-4">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-1 mb-2"
        >
          <div className="inline-flex items-center justify-center gap-1.5 text-[#C9A66B] text-xs font-cinzel tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Venue Location</span>
          </div>
          <h3 className="font-amharic-heading text-2xl sm:text-3xl font-bold text-white">
            የሰርጉ አዳራሽ መገኛ
          </h3>
          <p className="font-amharic-body text-xs sm:text-sm text-gray-400">
            {wedding.venueName}
          </p>
        </motion.div>

        {/* Map Container with Location Card Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden border border-[#C9A66B]/40 shadow-2xl bg-[#111111]"
        >
          {/* Embedded Google Map iframe */}
          <div className="w-full h-80 sm:h-96 relative z-0">
            <iframe
              title="Wedding Venue Map"
              src={wedding.mapEmbedUrl}
              className="w-full h-full border-0 filter brightness-90 contrast-105"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Location Card Overlay matching reference video (East West | Gofa Mebrat) */}
          <div className="p-4 bg-[#141414] border-t border-[#C9A66B]/30 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-amharic-heading font-bold text-white text-sm sm:text-base">
                  East West | Gofa Mebrat
                </h4>
                <p className="text-xs text-gray-300 font-sans mt-0.5">
                  XP9X+MV5, Addis Ababa, Ethiopia
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-yellow-400 font-medium">
                  <span>4.3</span>
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-3 h-3 text-yellow-400" />
                  </div>
                  <span className="text-gray-400 text-[11px]">(44)</span>
                </div>
              </div>

              <a
                href={wedding.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#1F5568] hover:bg-[#164454] text-[#F4E3B2] border border-[#C9A66B]/50 transition-colors shadow-sm"
                title="Google Maps አቅጣጫ ይክፈቱ"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Directions Button */}
            <a
              href={wedding.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#B8874E] via-[#C9A66B] to-[#B8874E] text-black font-amharic-ui font-bold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>በካርታ አቅጣጫ አመልክተን (Open in Google Maps)</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
