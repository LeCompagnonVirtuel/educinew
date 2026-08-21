import { useState } from 'react';
import type { Attachment } from '../types';

export function useUploadAttachment(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Attachment | null>(null);

  const upload = async (formData: FormData): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/messages/attachments/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { upload, data, loading, error };
}
