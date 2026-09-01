/**
 * Netflix-Inspired "Ta-Dum" Audio Synthesizer
 * Creates the iconic dual-oscillator chord with bass drop and brassy harmonics
 */

export function playTadum(): void {
    try {
        // Use existing window.AudioContext or webkit variant
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) {
            console.warn('Web Audio API not supported');
            return;
        }

        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // Volume envelope for the entire sound
        const masterGain = ctx.createGain();
        masterGain.connect(ctx.destination);
        masterGain.gain.setValueAtTime(0.25, now); // Start quiet to prevent clipping
        masterGain.gain.exponentialRampToValueAtTime(0.01, now + 2.8);

        // === PART 1: The Low Rumble (Detuned Oscillators) ===
        const low1 = ctx.createOscillator();
        const low2 = ctx.createOscillator();
        const lowGain = ctx.createGain();

        low1.type = 'sine';
        low2.type = 'sine';
        low1.frequency.setValueAtTime(41, now); // ~E1
        low2.frequency.setValueAtTime(38, now); // Slightly detuned for warmth

        lowGain.gain.setValueAtTime(0.4, now);
        lowGain.gain.exponentialRampToValueAtTime(0.05, now + 1.8);

        low1.connect(lowGain);
        low2.connect(lowGain);
        lowGain.connect(masterGain);

        low1.start(now);
        low2.start(now);
        low1.stop(now + 1.8);
        low2.stop(now + 1.8);

        // === PART 2: Mid-Range Brassy Tone ===
        const mid = ctx.createOscillator();
        const midGain = ctx.createGain();

        mid.type = 'square'; // Square wave = brassy
        mid.frequency.setValueAtTime(123, now); // ~B2
        
        midGain.gain.setValueAtTime(0.15, now);
        midGain.gain.exponentialRampToValueAtTime(0.02, now + 1.2);

        mid.connect(midGain);
        midGain.connect(masterGain);

        mid.start(now);
        mid.stop(now + 1.2);

        // === PART 3: High Shimmer (Harmonic Burst) ===
        const high = ctx.createOscillator();
        const highGain = ctx.createGain();

        high.type = 'triangle';
        high.frequency.setValueAtTime(493, now); // ~B4
        
        highGain.gain.setValueAtTime(0.1, now);
        highGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

        high.connect(highGain);
        highGain.connect(masterGain);

        high.start(now);
        high.stop(now + 0.8);

        // === PART 4: Sub-Bass Drop (Deep Impact) ===
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();

        sub.type = 'sine';
        sub.frequency.setValueAtTime(20, now); // Deep sub-bass
        
        subGain.gain.setValueAtTime(0.3, now);
        subGain.gain.exponentialRampToValueAtTime(0.05, now + 2.0);

        sub.connect(subGain);
        subGain.connect(masterGain);

        sub.start(now);
        sub.stop(now + 2.0);

    } catch (error) {
        console.error('Failed to play Ta-Dum audio:', error);
        // Graceful fallback - continue without audio
    }
}

/**
 * UI Click Sound (subtle beep)
 */
export function playUiClick(): void {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046, now); // C6 = sharp click
        
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    } catch (error) {
        // Silent fail
    }
}
