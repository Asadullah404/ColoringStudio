// Procedural ASMR sound engine using Web Audio API
class ASMRSoundEngine {
  private ctx: AudioContext | null = null;
  private isSoundEnabled = true;
  private isMusicEnabled = true;
  private bgmOscillators: OscillatorNode[] = [];
  private bgmGain: GainNode | null = null;
  private isBgmPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.isSoundEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.isMusicEnabled = enabled;
    if (!enabled && this.isBgmPlaying) {
      this.stopAmbientBgm();
    } else if (enabled && !this.isBgmPlaying) {
      this.startAmbientBgm();
    }
  }

  // Soft satisfying marker squeak / stroke ASMR sound
  private lastStrokeTime = 0;
  public playMarkerStrokeThrottled(intervalMs = 85) {
    const now = Date.now();
    if (now - this.lastStrokeTime >= intervalMs) {
      this.lastStrokeTime = now;
      this.playMarkerStroke();
    }
  }

  public playMarkerStroke() {
    if (!this.isSoundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      
      // Noise burst filtered to sound like felt pen on paper
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 + Math.random() * 400, t);
      filter.Q.setValueAtTime(3.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(t);
      noise.stop(t + 0.08);

      // Micro tone for felt marker resistance
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520 + Math.random() * 80, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + 0.05);

      oscGain.gain.setValueAtTime(0.015, t);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Satisfying tap fill sound (soft bubble pop)
  public playColorPop(pitchMultiplier = 1) {
    if (!this.isSoundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 440 * pitchMultiplier;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, t + 0.08);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.12);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Region completion chime (pentatonic chime)
  public playRegionComplete() {
    if (!this.isSoundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const t = this.ctx!.currentTime + i * 0.05;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Victory fanfare on 100% completion
  public playLevelVictory() {
    if (!this.isSoundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Arpeggio chords: C4, E4, G4, C5, E5, G5, C6
      const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      arpeggio.forEach((freq, index) => {
        const t = this.ctx!.currentTime + index * 0.08;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = index === arpeggio.length - 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        const duration = index === arpeggio.length - 1 ? 1.2 : 0.4;
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.0005, t + duration);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + duration);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // UI button click sound
  public playUiClick() {
    if (!this.isSoundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Hint sound (magical twinkle)
  public playHintTwinkle() {
    if (!this.isSoundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const freqs = [880, 1174.66, 1479.98, 1760];
      freqs.forEach((freq, idx) => {
        const t = this.ctx!.currentTime + idx * 0.06;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.2);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Ambient zen background music
  public startAmbientBgm() {
    if (!this.isMusicEnabled || this.isBgmPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      // Relaxing 432Hz ambient chord drone
      const chordFrequencies = [144, 216, 288, 432];
      this.bgmOscillators = chordFrequencies.map(freq => {
        const osc = this.ctx!.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        osc.connect(this.bgmGain!);
        osc.start();
        return osc;
      });

      this.isBgmPlaying = true;
    } catch (e) {
      console.warn('BGM error:', e);
    }
  }

  public stopAmbientBgm() {
    if (!this.isBgmPlaying) return;
    try {
      this.bgmOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.bgmOscillators = [];
      this.isBgmPlaying = false;
    } catch (e) {
      console.warn('Error stopping BGM:', e);
    }
  }
}

export const soundEngine = new ASMRSoundEngine();
