import { useRef, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import { AUDIO_CONFIG } from './splashConfig';

export function useSplashAudio() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const hasPlayed = useRef(false);
  const hasAudioFile = useRef(false);

  const preload = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync(AUDIO_CONFIG.file, {
        shouldPlay: false,
        volume: 1.0,
      });
      soundRef.current = sound;
      hasAudioFile.current = true;
      return true;
    } catch {
      hasAudioFile.current = false;
      return false;
    }
  }, []);

  const play = useCallback(async () => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;
    try {
      if (hasAudioFile.current && soundRef.current) {
        await soundRef.current.setPositionAsync(0);
        await soundRef.current.playAsync();
      } else {
        Speech.speak(AUDIO_CONFIG.voiceText, {
          language: AUDIO_CONFIG.voiceLanguage,
          rate: AUDIO_CONFIG.voiceRate,
          pitch: AUDIO_CONFIG.voicePitch,
        });
      }
    } catch {
      // Silent fallback
    }
  }, []);

  const cleanup = useCallback(async () => {
    Speech.stop();
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch {
        // Ignore cleanup errors
      }
      soundRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return { preload, play, cleanup };
}
