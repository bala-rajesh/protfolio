import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtx) {
            audioCtx = new AudioContextClass();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
        }
        return audioCtx;
    } catch {
        return null;
    }
}

/**
 * Synthesizes the signature Netflix "Ta-Dum" sound effect using Web Audio API harmonic oscillators.
 */
export function playTadum(): void {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;

        // Stage 1: "Ta" (Transient mid-low impact at t = 0)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(80, now);
        osc1.frequency.exponentialRampToValueAtTime(160, now + 0.15);
        osc1.frequency.exponentialRampToValueAtTime(60, now + 0.35);

        const filter1 = ctx.createBiquadFilter();
        filter1.type = 'lowpass';
        filter1.frequency.setValueAtTime(350, now);
        filter1.frequency.exponentialRampToValueAtTime(180, now + 0.35);

        gain1.gain.setValueAtTime(0.4, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

        osc1.connect(filter1);
        filter1.connect(gain1);
        gain1.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.4);

        // Stage 2: "DUM" (Heavy sub-bass & brassy resonance at t = 0.28s)
        const dumTime = now + 0.28;

        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(95, dumTime);
        subOsc.frequency.exponentialRampToValueAtTime(45, dumTime + 0.6);
        subOsc.frequency.exponentialRampToValueAtTime(32, dumTime + 1.6);

        subGain.gain.setValueAtTime(0.65, dumTime);
        subGain.gain.exponentialRampToValueAtTime(0.2, dumTime + 0.8);
        subGain.gain.exponentialRampToValueAtTime(0.001, dumTime + 1.8);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);

        subOsc.start(dumTime);
        subOsc.stop(dumTime + 1.85);

        const brassOsc = ctx.createOscillator();
        const brassGain = ctx.createGain();
        const brassFilter = ctx.createBiquadFilter();

        brassOsc.type = 'sawtooth';
        brassOsc.frequency.setValueAtTime(140, dumTime);
        brassOsc.frequency.exponentialRampToValueAtTime(90, dumTime + 0.8);

        brassFilter.type = 'bandpass';
        brassFilter.frequency.setValueAtTime(400, dumTime);
        brassFilter.Q.setValueAtTime(2.5, dumTime);

        brassGain.gain.setValueAtTime(0.3, dumTime);
        brassGain.gain.exponentialRampToValueAtTime(0.005, dumTime + 1.2);

        brassOsc.connect(brassFilter);
        brassFilter.connect(brassGain);
        brassGain.connect(ctx.destination);

        brassOsc.start(dumTime);
        brassOsc.stop(dumTime + 1.25);
    } catch {
        // Silent fallback
    }
}

/**
 * Subtle click sound for UI feedback
 */
export function playUiClick(): void {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    } catch {
        // Fallback
    }
}
