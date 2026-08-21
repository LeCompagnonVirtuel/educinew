import { useState } from 'react';

export function useNFCAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const checkIn = async (nfcTag: string): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/nfc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nfc_tag: nfcTag }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erreur pointage NFC');
      setData(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      throw err;
    } finally { setLoading(false); }
  };

  return { checkIn, data, loading, error };
}
