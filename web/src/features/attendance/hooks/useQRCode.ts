import { useState } from 'react';

export function useQRCode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const scanQR = async (qrCode: string): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qr_code: qrCode }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erreur scan QR');
      setData(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      throw err;
    } finally { setLoading(false); }
  };

  return { scanQR, data, loading, error };
}
