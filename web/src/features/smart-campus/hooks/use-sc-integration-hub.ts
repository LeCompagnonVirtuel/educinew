'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, unknown>;
  lastSyncAt: string | null;
}

interface IntegrationConfig {
  name: string;
  type: string;
  config: Record<string, unknown>;
}

export const useScIntegrationHub = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async (config: IntegrationConfig): Promise<Integration | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from('sc_integrations')
        .insert({
          school_id: schoolId,
          name: config.name,
          type: config.type,
          status: 'connected',
          config: config.config,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      return data as Integration;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const disconnect = useCallback(async (integrationId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from('sc_integrations')
        .update({ status: 'disconnected' })
        .eq('id', integrationId)
        .eq('school_id', schoolId);

      if (updateError) throw updateError;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getStatus = useCallback(async (integrationId: string): Promise<Integration | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_integrations')
        .select('*')
        .eq('id', integrationId)
        .single();

      if (queryError) throw queryError;
      return data as Integration;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, connect, disconnect, getStatus };
};
