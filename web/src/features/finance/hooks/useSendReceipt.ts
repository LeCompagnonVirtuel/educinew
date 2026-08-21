import { useState, useCallback } from 'react';

export default function useSendReceipt() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (receiptId?: string) => {
    if (!receiptId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/receipts/${receiptId}/send`, {
        method: 'POST',
      });
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
