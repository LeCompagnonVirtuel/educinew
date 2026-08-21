'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LxpVerificationService } from '../services/lxp-verification.service';
import type { Verification, BlockchainVerification, QRVerification } from '@educi/types';
import type { VerificationQuery } from '../types';

export const useLxpVerifications = (credentialId: string) => {
  const [verifications, setVerifications] = useState<readonly Verification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVerifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVerificationService(createClient());
      const data = await service.getVerificationHistory(credentialId);
      setVerifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch verifications');
    } finally {
      setLoading(false);
    }
  }, [credentialId]);

  useEffect(() => {
    fetchVerifications();
  }, [fetchVerifications]);

  return { verifications, loading, error, refresh: fetchVerifications };
};

export const useLxpVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verify = useCallback(async (credentialId: string, credentialType: string): Promise<Verification | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVerificationService(createClient());
      const result = await service.verifyCredential(credentialId, credentialType);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify credential');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verify, loading, error };
};

export const useLxpVerificationQRGenerate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (credentialId: string): Promise<QRVerification | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVerificationService(createClient());
      const result = await service.generateQRCode(credentialId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { generate, loading, error };
};

export const useLxpVerificationQRVerify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyQR = useCallback(async (code: string): Promise<Verification | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVerificationService(createClient());
      const result = await service.verifyQRCode(code);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify QR code');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { verifyQR, loading, error };
};

export const useLxpVerificationBlockchain = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const anchor = useCallback(async (credentialId: string): Promise<BlockchainVerification | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new LxpVerificationService(createClient());
      const result = await service.anchorToBlockchain(credentialId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to anchor to blockchain');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { anchor, loading, error };
};
