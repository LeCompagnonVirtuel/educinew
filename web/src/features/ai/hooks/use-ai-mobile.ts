'use client';

import { useState, useEffect, useCallback } from 'react';
import type { MobileConfig, PushNotification, BiometricAuth, DeviceManagement } from '@educi/types';

export function useMobileConfig(schoolId: string) {
  const [data, setData] = useState<MobileConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/mobile/config?schoolId=${schoolId}`);
      if (!res.ok) throw new Error('Failed to fetch mobile config');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  return { data, loading, error, refetch: fetchConfig };
}

export function usePushNotification(userId: string) {
  const [data, setData] = useState<PushNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/mobile/push-notifications?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch push notifications');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  return { data, loading, error, refetch: fetchNotifications };
}

export function useBiometricAuth(userId: string) {
  const [data, setData] = useState<BiometricAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBiometric = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/mobile/biometric?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch biometric auth');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchBiometric(); }, [fetchBiometric]);

  return { data, loading, error, refetch: fetchBiometric };
}

export function useDeviceManagement(userId: string) {
  const [data, setData] = useState<DeviceManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ai/mobile/devices?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch device management');
      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { fetchDevices(); }, [fetchDevices]);

  return { data, loading, error, refetch: fetchDevices };
}
