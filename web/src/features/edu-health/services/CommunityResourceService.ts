import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CommunityResource {
  id: string;
  school_id: string;
  resource_number: string;
  name: string;
  organization: string;
  resource_type: 'health' | 'mental_health' | 'social' | 'legal' | 'educational' | 'recreational' | 'other';
  description: string;
  services_offered: string[];
  contact: ResourceContact;
  address?: string;
  website?: string;
  eligibility_criteria: string[];
  cost: 'free' | 'sliding_scale' | 'paid';
  cost_details?: string;
  availability: string;
  referral_process: string;
  rating?: number;
  status: 'active' | 'inactive' | 'pending_review';
  last_verified_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ResourceContact {
  phone: string;
  email?: string;
  contact_person?: string;
  hours: string;
}

export interface CreateCommunityResource {
  name: string;
  organization: string;
  resource_type: 'health' | 'mental_health' | 'social' | 'legal' | 'educational' | 'recreational' | 'other';
  description: string;
  services_offered: string[];
  contact: ResourceContact;
  address?: string;
  website?: string;
  eligibility_criteria?: string[];
  cost: 'free' | 'sliding_scale' | 'paid';
  cost_details?: string;
  availability: string;
  referral_process: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCommunityResource {
  name?: string;
  organization?: string;
  resource_type?: string;
  description?: string;
  services_offered?: string[];
  contact?: ResourceContact;
  address?: string;
  website?: string;
  eligibility_criteria?: string[];
  cost?: string;
  cost_details?: string;
  availability?: string;
  referral_process?: string;
  rating?: number;
  status?: string;
  last_verified_date?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class CommunityResourceService {
  private readonly TABLE = 'community_resources';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CommunityResource[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CommunityResource | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, resource: CreateCommunityResource): Promise<CommunityResource> {
    const resourceNumber = `CR-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        resource_number: resourceNumber,
        ...resource,
        eligibility_criteria: resource.eligibility_criteria || [],
        status: 'active',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, resource: UpdateCommunityResource): Promise<CommunityResource> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...resource, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async getByType(schoolId: string, resourceType: string): Promise<CommunityResource[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('resource_type', resourceType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async search(schoolId: string, query: string): Promise<CommunityResource[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .or(`name.ilike.%${query}%,organization.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) throw error;
    return data || [];
  }

  async getFree(schoolId: string): Promise<CommunityResource[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('cost', 'free')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<CommunityResource[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    active: number;
    byType: Record<string, number>;
    freeResources: number;
  }> {
    const resources = await this.getAll(schoolId);
    const byType: Record<string, number> = {};
    resources.forEach((r) => {
      byType[r.resource_type] = (byType[r.resource_type] || 0) + 1;
    });

    return {
      total: resources.length,
      active: resources.filter((r) => r.status === 'active').length,
      byType,
      freeResources: resources.filter((r) => r.cost === 'free').length,
    };
  }
}
