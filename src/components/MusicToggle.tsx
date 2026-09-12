import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '../utils/audioSynth';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkState = () => {
      setIsPlaying(weddingAudio.getPlayingState());
    };
    const interval = setInterval(checkState, 800);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const active = weddingAudio.toggleMute();
    setIsPlaying(active);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleToggle}
        type="button"
        title={isPlaying ? 'ድምፅ አጥፋ (Mute Music)' : 'ሙዚቃ ክፈት (Play Music)'}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#111111]/90 hover:bg-black text-[#F4E3B2] border border-[#C9A66B] shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
      >
        {/* Animated pulsing wave rings when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#C9A66B]/50 animate-ping opacity-40 pointer-events-none" />
        )}

        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-4">
              <span className="w-[3px] bg-[#C9A66B] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3" />
              <span className="w-[3px] bg-[#F4E3B2] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-4" />
              <span className="w-[3px] bg-[#C9A66B] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          )}
        </div>
      </button>
    </div>
  );
};
