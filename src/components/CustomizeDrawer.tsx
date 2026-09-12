import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, X, Copy, Check, Users, Share2, Heart, RefreshCw, MessageSquare } from 'lucide-react';
import { WeddingData, RSVPSubmission } from '../types';

interface CustomizeDrawerProps {
  wedding: WeddingData;
  onUpdateWedding: (data: Partial<WeddingData>) => void;
  guestName: string;
  onUpdateGuestName: (name: string) => void;
  rsvps: RSVPSubmission[];
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  wedding,
  onUpdateWedding,
  guestName,
  onUpdateGuestName,
  rsvps,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'customize' | 'guests' | 'share'>('customize');
  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}${guestName ? `?guest=${encodeURIComponent(guestName)}` : ''}`
    : '';

  const fullInvitationMessage = `🕊️ የክብር ጥሪ ለሰርጋችን 🕊️

የአቶ ${wedding.groomName} እና የወ/ሪት ${wedding.brideName} የጋብቻ ሥነ-ሥርዓት

ቀን፡ ${wedding.weddingDateEthiopian} (${wedding.weddingDateGregorian})
ቦታ፡ ${wedding.venueName}፣ ${wedding.venueAddress}

${guestName ? `ለክቡር/ት ${guestName}\n` : ''}የክብር ጥሪ ካርድዎን በዚህ ሊንክ ይመልከቱ፦
${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyFullMessage = () => {
    navigator.clipboard.writeText(fullInvitationMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  return (
    <>
      {/* Floating Discreet Host Controls Button */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/95 text-[#F4E3B2] border border-[#C9A66B]/50 backdrop-blur-md shadow-lg text-xs font-amharic-ui transition-all active:scale-95 cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-[#C9A66B]" />
          <span>ቅንብሮች (Settings)</span>
        </button>
      </div>

      {/* Slide-in Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#121212] border-l border-[#C9A66B]/30 h-full flex flex-col text-white shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#262626] flex items-center justify-between bg-[#161616]">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C9A66B] fill-[#C9A66B]/30" />
                  <h3 className="font-amharic-heading font-bold text-base text-[#F4E3B2]">
                    የሰርግ ጥሪ ማስተካከያ (Invitation Settings)
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#262626] bg-[#141414] text-xs font-amharic-ui">
                <button
                  onClick={() => setActiveTab('customize')}
                  className={`flex-1 py-3 text-center border-b-2 font-medium cursor-pointer transition-colors ${
                    activeTab === 'customize'
                      ? 'border-[#C9A66B] text-[#F4E3B2]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  ዝርዝር መረጃ (Details)
                </button>
                <button
                  onClick={() => setActiveTab('share')}
                  className={`flex-1 py-3 text-center border-b-2 font-medium cursor-pointer transition-colors ${
                    activeTab === 'share'
                      ? 'border-[#C9A66B] text-[#F4E3B2]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  የመጋበዣ ሊንክ (Share)
                </button>
                <button
                  onClick={() => setActiveTab('guests')}
                  className={`flex-1 py-3 text-center border-b-2 font-medium cursor-pointer transition-colors ${
                    activeTab === 'guests'
                      ? 'border-[#C9A66B] text-[#F4E3B2]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  የእንግዶች መልስ ({rsvps.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm font-amharic-ui">
                {activeTab === 'customize' && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-400">
                      የሙሽሮቹን ስም፣ ቀን እና ቦታ እዚህ በመቀየር ፈጣን ውጤቱን ይመልከቱ።
                    </p>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        የሙሽራው ስም (Groom Name)
                      </label>
                      <input
                        type="text"
                        value={wedding.groomName}
                        onChange={(e) => onUpdateWedding({ groomName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#333] text-white text-sm focus:border-[#C9A66B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        የሙሽሪት ስም (Bride Name)
                      </label>
                      <input
                        type="text"
                        value={wedding.brideName}
                        onChange={(e) => onUpdateWedding({ brideName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#333] text-white text-sm focus:border-[#C9A66B] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">
                          የሞኖግራም ፊደላት (Initials)
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          value={wedding.initials}
                          onChange={(e) => onUpdateWedding({ initials: e.target.value.toUpperCase() })}
                          className="w-full px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#333] text-white text-sm focus:border-[#C9A66B] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">
                          የእንግዶች ገደብ (Max Guests)
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={wedding.maxGuestsAllowed}
                          onChange={(e) => onUpdateWedding({ maxGuestsAllowed: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#333] text-white text-sm focus:border-[#C9A66B] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        የሰርግ ቀን በኢትዮጵያ ዘመን አቆጣጠር
                      </label>
                      <input
                        type="text"
                        value={wedding.weddingDateEthiopian}
                        onChange={(e) => onUpdateWedding({ weddingDateEthiopian: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#333] text-white text-sm focus:border-[#C9A66B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        የሰርጉ አዳራሽ ስም (Venue Name)
                      </label>
                      <input
                        type="text"
                        value={wedding.venueName}
                        onChange={(e) => onUpdateWedding({ venueName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#333] text-white text-sm focus:border-[#C9A66B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">
                        የመገኛ አድራሻ (Address)
                      </label>
                      <input
                        type="text"
                        value={wedding.venueAddress}
                        onChange={(e) => onUpdateWedding({ venueAddress: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#333] text-white text-sm focus:border-[#C9A66B] outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'share' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#1C1C1C] border border-[#C9A66B]/30 space-y-3">
                      <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
                        <Share2 className="w-4 h-4 text-[#C9A66B]" />
                        <span>ለእንግዳ የተለየ የጥሪ ካርድ ማዘጋጃ</span>
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        የተጋባዡን ስም ሲያስገቡ የካርዱ ፊት እና የመግቢያ ዲጂታል ፓሱ (QR Code) በእንግዳው ስም ይዘጋጃል!
                      </p>

                      <div>
                        <label className="block text-xs text-gray-300 mb-1">
                          የተጋባዥ ስም (Guest Name)
                        </label>
                        <input
                          type="text"
                          placeholder="ለምሳሌ: ዳዊት አበበ ወይም Selam"
                          value={guestName}
                          onChange={(e) => onUpdateGuestName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A66B]"
                        />
                      </div>

                      <div className="pt-2 space-y-2">
                        <button
                          onClick={handleCopyLink}
                          type="button"
                          className="w-full py-2.5 px-4 rounded-lg bg-[#C9A66B] hover:bg-[#B8874E] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-black" />
                              <span>ሊንኩ ተገልብጧል (Link Copied!)</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-black" />
                              <span>የተለየውን ሊንክ ቅዳ (Copy Invitation Link)</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleCopyFullMessage}
                          type="button"
                          className="w-full py-2.5 px-4 rounded-lg bg-[#242424] hover:bg-[#2e2e2e] text-[#F4E3B2] border border-[#C9A66B]/40 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          {copiedMsg ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-300">ሙሉ መልዕክቱ ተገልብጧል!</span>
                            </>
                          ) : (
                            <>
                              <MessageSquare className="w-4 h-4 text-[#C9A66B]" />
                              <span>ሙሉ የሰርግ ጥሪ መልዕክት ቅዳ (Copy Full Message)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 space-y-1 bg-[#161616] p-3 rounded-lg border border-[#262626]">
                      <span className="font-semibold text-gray-300">የተፈጠረው ሊንክ፦</span>
                      <p className="font-mono text-[11px] text-[#C9A66B] break-all">
                        {shareUrl}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'guests' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">
                        የተመዘገቡ እንግዶች ({rsvps.length})
                      </span>
                    </div>

                    {rsvps.length === 0 ? (
                      <div className="p-8 text-center text-gray-500 bg-[#161616] rounded-xl border border-[#262626] text-xs">
                        እስካሁን የተመዘገበ መልስ የለም። ከታች ባለው RSVP ፎርም ሞክረው ይመልከቱ!
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
                        {rsvps.map((rsvp) => (
                          <div
                            key={rsvp.id}
                            className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#2e2e2e] space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-sm">
                                {rsvp.fullName}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  rsvp.attending === 'yes'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                                }`}
                              >
                                {rsvp.attending === 'yes' ? `ይመጣሉ (${rsvp.guestCount})` : 'ይቅርታ'}
                              </span>
                            </div>
                            {rsvp.message && (
                              <p className="text-xs text-gray-300 italic pt-1">
                                "{rsvp.message}"
                              </p>
                            )}
                            <div className="text-[10px] text-gray-500 text-right">
                              {new Date(rsvp.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#262626] bg-[#141414] text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#222] hover:bg-[#333] text-gray-200 text-xs font-semibold cursor-pointer"
                >
                  ዝጋ (Close)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
