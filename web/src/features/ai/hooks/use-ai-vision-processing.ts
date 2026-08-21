'use client';

import { useState, useCallback } from 'react';
import type { ImageAnalysis, ObjectDetection, FaceDetection, OcrVision, TextDetection, Handwriting, DiagramUnderstanding, VisualQA } from '@educi/types';

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ImageAnalysis | null>(null);

  const analyzeImage = useCallback(async (imageUrl: string, analysisType: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/image-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, analysisType }),
      });
      if (!res.ok) throw new Error('Failed to analyze image');
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

  return { analyzeImage, data, loading, error };
}

export function useObjectDetection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ObjectDetection | null>(null);

  const detectObjects = useCallback(async (imageUrl: string, confidence?: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/object-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, confidence }),
      });
      if (!res.ok) throw new Error('Failed to detect objects');
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

  return { detectObjects, data, loading, error };
}

export function useFaceDetection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FaceDetection | null>(null);

  const detectFaces = useCallback(async (imageUrl: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/face-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      if (!res.ok) throw new Error('Failed to detect faces');
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

  return { detectFaces, data, loading, error };
}

export function useOcrVision() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OcrVision | null>(null);

  const processOcr = useCallback(async (imageUrl: string, language: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, language }),
      });
      if (!res.ok) throw new Error('Failed to process OCR');
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

  return { processOcr, data, loading, error };
}

export function useTextDetection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TextDetection | null>(null);

  const detectText = useCallback(async (imageUrl: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/text-detection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      if (!res.ok) throw new Error('Failed to detect text');
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

  return { detectText, data, loading, error };
}

export function useHandwriting() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Handwriting | null>(null);

  const recognizeHandwriting = useCallback(async (imageUrl: string, language: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, language }),
      });
      if (!res.ok) throw new Error('Failed to recognize handwriting');
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

  return { recognizeHandwriting, data, loading, error };
}

export function useDiagramUnderstanding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DiagramUnderstanding | null>(null);

  const understandDiagram = useCallback(async (imageUrl: string, diagramType: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/diagram-understanding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, diagramType }),
      });
      if (!res.ok) throw new Error('Failed to understand diagram');
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

  return { understandDiagram, data, loading, error };
}

export function useVisualQA() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<VisualQA | null>(null);

  const askQuestion = useCallback(async (imageUrl: string, question: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/vision-processing/visual-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, question }),
      });
      if (!res.ok) throw new Error('Failed to answer visual question');
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

  return { askQuestion, data, loading, error };
}
