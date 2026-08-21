'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface QRScanResult {
  id: string;
  type: string;
  data: Record<string, unknown>;
  valid: boolean;
}

export const useScQRScanner = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = useCallback(async (qrCode: string): Promise<QRScanResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_qr_codes')
        .select('*')
        .eq('school_id', schoolId)
        .eq('code', qrCode)
        .single();

      if (queryError) throw queryError;
      return { ...data, valid: true } as QRScanResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getDetails = useCallback(async (qrId: string): Promise<QRScanResult | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_qr_codes')
        .select('*')
        .eq('id', qrId)
        .single();

      if (queryError) throw queryError;
      return data as QRScanResult;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const validate = useCallback(async (qrCode: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_qr_codes')
        .select('id')
        .eq('school_id', schoolId)
        .eq('code', qrCode)
        .eq('active', true)
        .single();

      if (queryError) throw queryError;
      return data !== null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, scan, getDetails, validate };
};
