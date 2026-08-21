'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ComplianceNotification } from '@educi/types';

export function useGOVComplianceNotificationActions(schoolId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const create = async (data: Partial<ComplianceNotification>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_compliance_notifications').insert({ ...data, school_id: schoolId }).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ComplianceNotification;
  };
  const update = async (id: string, data: Partial<ComplianceNotification>) => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_compliance_notifications').update(data).eq('id', id).eq('school_id', schoolId).select().single();
    setLoading(false);
    if (err) { setError(err.message); return null; }
    return result as ComplianceNotification;
  };
  const remove = async (id: string) => {
    setLoading(true);
    const { error: err } = await supabase.from('gov_compliance_notifications').delete().eq('id', id).eq('school_id', schoolId);
    setLoading(false);
    if (err) { setError(err.message); return false; }
    return true;
  };
  return { create, update, remove, loading, error };
}
