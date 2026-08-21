import { getSupabase } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';
import type { SchoolBranding } from '@/types/branding';
import { DEFAULT_BRANDING } from '@/types/branding';
import { realtimeManager } from '@/lib/realtime/RealtimeManager';

export const sbBranding = {
  async get(schoolId?: string): Promise<SchoolBranding | null> {
    try {
      const supabase = getSupabase();
      const sid = schoolId || await getAuthenticatedSchoolId();
      if (!sid) return null;

      const { data, error } = await supabase
        .from('school_branding')
        .upsert({ school_id: sid, ...DEFAULT_BRANDING }, { onConflict: 'school_id', ignoreDuplicates: false })
        .select()
        .single();

      if (error) return null;
      return data as SchoolBranding;
    } catch {
      return null;
    }
  },

  async update(schoolId: string, data: Partial<SchoolBranding>): Promise<SchoolBranding | null> {
    const supabase = getSupabase();
    const { data: updated, error } = await supabase
      .from('school_branding')
      .upsert({ school_id: schoolId, ...data }, { onConflict: 'school_id' })
      .select()
      .single();

    if (error) throw error;
    return updated as SchoolBranding;
  },

  async updateSetupStep(schoolId: string, step: number, completed?: boolean): Promise<void> {
    const supabase = getSupabase();
    await supabase
      .from('school_branding')
      .upsert(
        { school_id: schoolId, setup_step: step, ...(completed !== undefined ? { setup_completed: completed } : {}) },
        { onConflict: 'school_id' }
      );
  },

  async uploadLogo(schoolId: string, file: File, type: 'logo' | 'logo_icon' | 'logo_favicon' | 'logo_dark' | 'signature' | 'stamp'): Promise<string | null> {
    const supabase = getSupabase();
    const ext = file.name.split('.').pop() || 'png';
    const path = `${schoolId}/${type}.${ext}`;

    const { error } = await supabase.storage
      .from('school-logos')
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('school-logos')
      .getPublicUrl(path);

    return urlData?.publicUrl || null;
  },

  subscribe(schoolId: string, callback: (branding: SchoolBranding) => void) {
    try {
      const channelName = `branding-${schoolId}`;
      return realtimeManager.subscribe(channelName, [
        {
          config: {
            event: '*',
            schema: 'public',
            table: 'school_branding',
            filter: `school_id=eq.${schoolId}`,
          },
          callback: (payload: { new: Record<string, any> }) => {
            if (payload.new) {
              callback(payload.new as SchoolBranding);
            }
          },
        },
      ]);
    } catch {
      return () => {};
    }
  },
};
