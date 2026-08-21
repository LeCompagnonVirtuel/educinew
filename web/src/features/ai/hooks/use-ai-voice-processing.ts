'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SpeechToText, TextToSpeech, VoiceClone, Transcription, VoiceTranslation, VoiceAuthentication, AudioEnhancement, NoiseReduction } from '@educi/types';

export function useSpeechToText() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SpeechToText | null>(null);

  const transcribe = useCallback(async (audioBlob: Blob, language: string) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('language', language);
      const res = await fetch('/api/ai/voice-processing/speech-to-text', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to transcribe speech');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { transcribe, data, loading, error };
}

export function useTextToSpeech() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TextToSpeech | null>(null);

  const synthesize = useCallback(async (text: string, voiceId: string, options?: { speed?: number; pitch?: number }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/voice-processing/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId, ...options }),
      });
      if (!res.ok) throw new Error('Failed to synthesize speech');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { synthesize, data, loading, error };
}

export function useVoiceClone() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VoiceClone | null>(null);

  const cloneVoice = useCallback(async (audioBlob: Blob, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('name', name);
      const res = await fetch('/api/ai/voice-processing/voice-clone', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to clone voice');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { cloneVoice, data, loading, error };
}

export function useTranscription(documentId: string) {
  const [data, setData] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTranscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/voice-processing/transcriptions?documentId=${documentId}`);
      if (!res.ok) throw new Error('Failed to fetch transcriptions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => { fetchTranscriptions(); }, [fetchTranscriptions]);

  return { data, loading, error, refetch: fetchTranscriptions };
}

export function useVoiceTranslation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VoiceTranslation | null>(null);

  const translate = useCallback(async (audioBlob: Blob, sourceLanguage: string, targetLanguage: string) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('sourceLanguage', sourceLanguage);
      formData.append('targetLanguage', targetLanguage);
      const res = await fetch('/api/ai/voice-processing/translation', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to translate voice');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { translate, data, loading, error };
}

export function useVoiceAuthentication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VoiceAuthentication | null>(null);

  const authenticate = useCallback(async (audioBlob: Blob, userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('userId', userId);
      const res = await fetch('/api/ai/voice-processing/authentication', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to authenticate voice');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { authenticate, data, loading, error };
}

export function useAudioEnhancement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AudioEnhancement | null>(null);

  const enhance = useCallback(async (audioBlob: Blob, options?: { normalize?: boolean; denoise?: boolean }) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('audio', audioBlob);
      if (options) formData.append('options', JSON.stringify(options));
      const res = await fetch('/api/ai/voice-processing/enhancement', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to enhance audio');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { enhance, data, loading, error };
}

export function useNoiseReduction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<NoiseReduction | null>(null);

  const reduceNoise = useCallback(async (audioBlob: Blob, intensity: number) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('intensity', String(intensity));
      const res = await fetch('/api/ai/voice-processing/noise-reduction', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to reduce noise');
      const json = await res.json();
      setData(json.data);
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { reduceNoise, data, loading, error };
}
