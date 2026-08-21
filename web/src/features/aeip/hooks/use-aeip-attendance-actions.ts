'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AttendancePrediction } from '@educi/types';

export function useAttendanceActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const create = async (attendance: Omit<AttendancePrediction, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('aeip_attendances')
        .insert(attendance)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, updates: Partial<AttendancePrediction>) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('aeip_attendances')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from('aeip_attendances')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading, error };
}
