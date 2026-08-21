'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DocumentUpload, DocumentQuery, DocumentAnnotation, DocumentExport, DocumentShare, DocumentVersion, OcrResult, Summarization } from '@educi/types';

export function useDocumentUpload(schoolId: string) {
  const [data, setData] = useState<DocumentUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUploads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/document-processing/uploads?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch document uploads');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchUploads(); }, [fetchUploads]);

  return { data, loading, error, refetch: fetchUploads };
}

export function useDocumentQuery(documentId: string) {
  const [data, setData] = useState<DocumentQuery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuery = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/document-processing/query?documentId=${documentId}`);
      if (!res.ok) throw new Error('Failed to fetch document query');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => { fetchQuery(); }, [fetchQuery]);

  return { data, loading, error, refetch: fetchQuery };
}

export function useDocumentAnnotation(documentId: string) {
  const [data, setData] = useState<DocumentAnnotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnotations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/document-processing/annotations?documentId=${documentId}`);
      if (!res.ok) throw new Error('Failed to fetch document annotations');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => { fetchAnnotations(); }, [fetchAnnotations]);

  return { data, loading, error, refetch: fetchAnnotations };
}

export function useDocumentExport(documentId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportDocument = useCallback(async (format: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/document-processing/export?documentId=${documentId}&format=${encodeURIComponent(format)}`);
      if (!res.ok) throw new Error('Failed to export document');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  return { exportDocument, loading, error };
}

export function useDocumentShare(documentId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shareDocument = useCallback(async (payload: { userId: string; permission: string }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/ai/document-processing/share?documentId=${documentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to share document');
      const json = await res.json();
      return json.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  return { shareDocument, loading, error };
}

export function useDocumentVersion(documentId: string) {
  const [data, setData] = useState<DocumentVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVersions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/document-processing/versions?documentId=${documentId}`);
      if (!res.ok) throw new Error('Failed to fetch document versions');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => { fetchVersions(); }, [fetchVersions]);

  return { data, loading, error, refetch: fetchVersions };
}

export function useOcr() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<OcrResult | null>(null);

  const processOcr = useCallback(async (file: File, language: string) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);
      const res = await fetch('/api/ai/document-processing/ocr', {
        method: 'POST',
        body: formData,
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

export function useSummarization() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Summarization | null>(null);

  const summarize = useCallback(async (documentId: string, maxLength?: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/ai/document-processing/summarization', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId, maxLength }),
      });
      if (!res.ok) throw new Error('Failed to summarize document');
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

  return { summarize, data, loading, error };
}
