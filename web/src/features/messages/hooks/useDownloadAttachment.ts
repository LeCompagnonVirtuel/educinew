import { useState } from 'react';

export function useDownloadAttachment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async (attachmentId: string): Promise<Blob | null> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/attachments/${attachmentId}/download`);
      if (!response.ok) throw new Error('Erreur');
      const blob = await response.blob();
      return blob;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally { setLoading(false); }
  };

  return { download, loading, error };
}
