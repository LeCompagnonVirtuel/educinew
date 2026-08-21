import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface Permission {
  resource: string;
  action: string;
  granted: boolean;
}

interface Role {
  name: string;
  permissions: Permission[];
}

export class ScPermissionService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async checkPermission(schoolId: string, userId: string, resource: string, action: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('sc_user_permissions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .eq('resource', resource)
      .eq('action', action)
      .single();
    if (error) return false;
    return data?.granted === true;
  }

  async getUserPermissions(schoolId: string, userId: string): Promise<Permission[]> {
    const { data, error } = await this.supabase
      .from('sc_user_permissions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('user_id', userId);
    if (error) throw error;
    return data ?? [];
  }

  async grantPermission(schoolId: string, userId: string, resource: string, action: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_user_permissions')
      .upsert({
        school_id: schoolId,
        user_id: userId,
        resource,
        action,
        granted: true,
      }, { onConflict: 'school_id,user_id,resource,action' });
    if (error) throw error;
  }

  async revokePermission(schoolId: string, userId: string, resource: string, action: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_user_permissions')
      .delete()
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .eq('resource', resource)
      .eq('action', action);
    if (error) throw error;
  }

  async getRolePermissions(schoolId: string, role: string): Promise<Permission[]> {
    const { data, error } = await this.supabase
      .from('sc_role_permissions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('role', role);
    if (error) throw error;
    return data ?? [];
  }

  async bulkGrantPermissions(schoolId: string, userId: string, permissions: Permission[]): Promise<void> {
    const rows = permissions.map(p => ({
      school_id: schoolId,
      user_id: userId,
      resource: p.resource,
      action: p.action,
      granted: p.granted,
    }));
    const { error } = await this.supabase
      .from('sc_user_permissions')
      .upsert(rows, { onConflict: 'school_id,user_id,resource,action' });
    if (error) throw error;
  }

  async hasAnyPermission(schoolId: string, userId: string, resource: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('sc_user_permissions')
      .select('id')
      .eq('school_id', schoolId)
      .eq('user_id', userId)
      .eq('resource', resource)
      .eq('granted', true)
      .limit(1);
    if (error) return false;
    return (data?.length ?? 0) > 0;
  }
}
