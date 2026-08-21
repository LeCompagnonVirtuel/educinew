import { useState } from 'react';

export function useMuteConversation(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mute = async (conversationId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}/mute`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  const unmute = async (conversationId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}/unmute`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { mute, unmute, loading, error };
}
