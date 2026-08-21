'use client';
import { useState, useCallback } from 'react';
import { ScEmergencyContactService } from '../services/sc-emergency-contact.service';
import { createClient } from '@/lib/supabase/client';
import type { EmergencyContact, EmergencyContactCreate } from '@educi/types';

export const useScEmergencyContact = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = useCallback(async (data: EmergencyContactCreate): Promise<EmergencyContact | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEmergencyContactService(createClient());
      return await service.createContact(schoolId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (contactId: string, data: Partial<EmergencyContactCreate>): Promise<EmergencyContact | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEmergencyContactService(createClient());
      return await service.updateContact(schoolId, contactId, data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (contactId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEmergencyContactService(createClient());
      await service.deleteContact(schoolId, contactId);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, add, update, remove };
};
