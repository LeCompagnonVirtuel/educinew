'use client';
import { useState, useCallback } from 'react';
export function useImportDocuments() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const importDocuments = useCallback(async (params: { files: File[]; folderId?: string; options?: any }) => {
    setLoading(true); setError(null);
    try {
      const formData = new FormData();
      params.files.forEach(file => formData.append('files', file));
      if (params.folderId) formData.append('folderId', params.folderId);
      if (params.options) formData.append('options', JSON.stringify(params.options));
      const result = await fetch('/api/documents/import', {
        method: 'POST',
        body: formData
      });
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
      return json.data;
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, []);
  return { data, loading, error, importDocuments };
}
