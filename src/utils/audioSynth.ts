/**
 * Authentic Ethiopian acoustic wedding melody synthesizer using Web Audio API
 * Plays a gentle, romantic Tizita / Anchihoye wedding pentatonic melody with soft harp/krar timbre.
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;

  // Ethiopian Tizita / Anchihoye pentatonic frequencies (in Hz)
  private melodyNotes: number[] = [
    293.66, // D4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    739.99, // F#5
    880.00, // A5
  ];

  // Romantic wedding sequence phrasing
  private sequence: number[] = [
    0, 2, 4, 3, 2, 0, 1, 2, 4, 5, 4, 2, 4, 7, 5, 4, 2, 0, 2, 4, 3, 2, 0
  ];
  private step: number = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public async start(): Promise<boolean> {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return true;
    this.isPlaying = true;

    // Pluck notes at rhythmic wedding tempo (~600ms per note)
    this.playNextNote();
    this.intervalId = window.setInterval(() => {
      this.playNextNote();
    }, 580);

    return true;
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  public toggleMute(): boolean {
    if (!this.isPlaying) {
      this.start();
      return true;
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.25, this.ctx.currentTime + 0.1);
    }
    return !this.isMuted;
  }

  public getPlayingState(): boolean {
    return this.isPlaying && !this.isMuted;
  }

  private playNextNote() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const noteIndex = this.sequence[this.step % this.sequence.length];
    const freq = this.melodyNotes[noteIndex % this.melodyNotes.length];
    this.step++;

    const now = this.ctx.currentTime;

    // Acoustic Krar / Harp physical modeling with twin oscillators & bandpass resonance
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // soft harmonic octave

    // Filter to give that warm acoustic pluck string quality
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 0.8, now + 1.2);

    // Pluck envelope
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.2, now + 0.02); // quick acoustic attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4); // graceful romantic decay

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.4);
    osc2.stop(now + 1.4);
  }
}

export const weddingAudio = new WeddingAudioPlayer();
