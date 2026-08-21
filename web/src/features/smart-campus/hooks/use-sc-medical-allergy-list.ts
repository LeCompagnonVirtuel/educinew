'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScMedicalAllergyService } from '../services/sc-medical-allergy.service';
import { createClient } from '@/lib/supabase/client';
import type { MedicalAllergy2, MedicalAllergyCreate } from '@educi/types';

export const useScMedicalAllergyList = (schoolId: string) => {
  const [items, setItems] = useState<MedicalAllergy2[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScMedicalAllergyService(createClient());
      const data = await service.listAllergies(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { items, loading, error, refresh: fetchData };
};

export const useScMedicalAllergyGet = (schoolId: string, id: string | null) => {
  const [item, setItem] = useState<MedicalAllergy2 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchItem = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    try {
      setLoading(true);
      const service = new ScMedicalAllergyService(createClient());
      const data = await service.getAllergy(schoolId, id);
      setItem(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId, id]);
  useEffect(() => { fetchItem(); }, [fetchItem]);
  return { item, loading, error, refresh: fetchItem };
};

export const useScMedicalAllergyCreate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const create = useCallback(async (data: MedicalAllergyCreate): Promise<MedicalAllergy2 | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalAllergyService(createClient());
      const result = await service.createAllergy(schoolId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { create, loading, error };
};

export const useScMedicalAllergyUpdate = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const update = useCallback(async (id: string, data: Partial<MedicalAllergyCreate>): Promise<MedicalAllergy2 | null> => {
    try {
      setLoading(true);
      const service = new ScMedicalAllergyService(createClient());
      const result = await service.updateAllergy(schoolId, id, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { update, loading, error };
};

export const useScMedicalAllergyDelete = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const service = new ScMedicalAllergyService(createClient());
      await service.deleteAllergy(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);
  return { remove, loading, error };
};
