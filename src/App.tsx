/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEFAULT_WEDDING_DATA, DEFAULT_TIMELINE } from './data/invitationData';
import { WeddingData, RSVPSubmission } from './types';
import { OpeningCover } from './components/OpeningCover';
import { HeroGreeting } from './components/HeroGreeting';
import { MapSection } from './components/MapSection';
import { CalendarSection } from './components/CalendarSection';
import { TimelineSection } from './components/TimelineSection';
import { StoryGallerySection } from './components/StoryGallerySection';
import { CountdownSection } from './components/CountdownSection';
import { DigitalPass } from './components/DigitalPassModal';
import { ShareMediaSection } from './components/ShareMediaSection';
import { RSVPSection } from './components/RSVPSection';
import { MusicToggle } from './components/MusicToggle';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { weddingAudio } from './utils/audioSynth';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [wedding, setWedding] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [rsvps, setRsvps] = useState<RSVPSubmission[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Synchronize dynamic document.title for browser tabs and shared links
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (guestName) {
        document.title = `ለክቡር/ት ${guestName} | የሰርግ ጥሪ - ${wedding.groomName} እና ${wedding.brideName}`;
      } else {
        document.title = `${wedding.groomName} እና ${wedding.brideName} | የሰርግ ጥሪ`;
      }
    }
  }, [guestName, wedding.groomName, wedding.brideName]);

  // Parse guest and admin parameters from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('guest');
      if (guestParam) {
        setGuestName(guestParam);
      }

      // Check if organizer/admin mode is enabled (e.g. ?admin=true or ?settings=true)
      const adminRequested =
        params.get('admin') === 'true' ||
        params.get('settings') === 'true' ||
        params.get('edit') === 'true' ||
        localStorage.getItem('wedding_is_admin') === 'true';

      setIsAdmin(adminRequested);

      // Load existing RSVPs
      try {
        const stored = localStorage.getItem('wedding_rsvps');
        if (stored) {
          setRsvps(JSON.parse(stored));
        }
      } catch {
        // Safe fallback
      }
    }
  }, []);

  const handleOpenInvitation = async () => {
    // Start ambient romantic krar music on user gesture
    await weddingAudio.start();
    setIsInvitationOpen(true);
  };

  const handleResetToCover = () => {
    setIsInvitationOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateWedding = (updated: Partial<WeddingData>) => {
    setWedding((prev) => ({ ...prev, ...updated }));
  };

  const handleRSVPSubmitted = (submission: RSVPSubmission) => {
    setRsvps((prev) => [...prev, submission]);
  };

  const handleNavigateToMap = () => {
    const el = document.getElementById('map-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#050505] relative flex justify-center selection:bg-[#C9A66B] selection:text-black">
      {/* Blurred atmospheric desktop background backdrop */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none hidden lg:block bg-cover bg-center filter blur-3xl scale-110"
        style={{ backgroundImage: `url(${wedding.heroPhoto})` }}
        aria-hidden="true"
      />

      {/* Mobile-First Device Frame / Centered Container (Vertical 9:16 optimized) */}
      <div className="relative z-10 w-full max-w-[480px] min-h-screen bg-[#0A0A0A] shadow-[0_0_80px_rgba(0,0,0,0.9)] border-x border-[#1a1a1a] flex flex-col">
        {/* Floating Host Controls Drawer (Hidden for invited guests; accessible only with ?admin=true) */}
        {isAdmin && (
          <CustomizeDrawer
            wedding={wedding}
            onUpdateWedding={handleUpdateWedding}
            guestName={guestName}
            onUpdateGuestName={setGuestName}
            rsvps={rsvps}
          />
        )}

        {/* Ambient Music Toggle (Fixed bottom-right) */}
        <MusicToggle />

        {/* Top return to cover button if invitation is open */}
        {isInvitationOpen && (
          <div className="fixed top-4 left-4 z-40">
            <button
              onClick={handleResetToCover}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/95 text-[#F4E3B2] border border-[#C9A66B]/40 backdrop-blur-md shadow-lg text-xs font-amharic-ui transition-all active:scale-95 cursor-pointer"
              title="ወደ መጀመሪያው ገጽ ተመለስ"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>መጀመሪያ (Cover)</span>
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isInvitationOpen ? (
            /* Screen 1: Cover Screen */
            <OpeningCover
              key="cover"
              wedding={wedding}
              onOpen={handleOpenInvitation}
              guestName={guestName}
            />
          ) : (
            /* Scrollable Invitation Body */
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col divide-y-0"
            >
              {/* Screen 2: Hero / Greeting Screen */}
              <HeroGreeting
                wedding={wedding}
                onNavigateToMap={handleNavigateToMap}
              />

              {/* Screen 3: Map Section */}
              <MapSection wedding={wedding} />

              {/* Screen 4: Save-the-Date Calendar Section */}
              <CalendarSection wedding={wedding} />

              {/* Screen 5: Ceremony Timeline Section */}
              <TimelineSection timeline={DEFAULT_TIMELINE} />

              {/* Screen 6: Our Story / Photo Gallery */}
              <StoryGallerySection wedding={wedding} />

              {/* Screen 7: Countdown Section */}
              <CountdownSection
                wedding={wedding}
                onOpenPass={() => setIsPassModalOpen(true)}
              />

              {/* Digital Pass / Access Ticket Card */}
              <DigitalPass
                wedding={wedding}
                guestName={guestName}
                isModal={false}
              />

              {/* Screen 8: Share Photos / Telegram Bot Section */}
              <ShareMediaSection wedding={wedding} />

              {/* Screen 9: RSVP Section */}
              <RSVPSection
                wedding={wedding}
                initialGuestName={guestName}
                onRSVPSubmitted={handleRSVPSubmitted}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Digital Pass Modal (when opened from Countdown button) */}
        <DigitalPass
          wedding={wedding}
          guestName={guestName}
          isOpen={isPassModalOpen}
          onClose={() => setIsPassModalOpen(false)}
          isModal={true}
        />
      </div>
    </main>
  );
}
