import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Campaign {
  id: string;
  school_id: string;
  campaign_code: string;
  title: string;
  description: string;
  type: 'fundraising' | 'scholarship' | 'infrastructure' | 'emergency' | 'awareness' | 'other';
  goal_amount: number;
  raised_amount: number;
  currency: string;
  start_date: string;
  end_date: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  organizer_id: string;
  beneficiary_type?: string;
  beneficiary_id?: string;
  media_assets?: string[];
  tags?: string[];
  is_featured: boolean;
  view_count: number;
  share_count: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateCampaign {
  title: string;
  description: string;
  type: 'fundraising' | 'scholarship' | 'infrastructure' | 'emergency' | 'awareness' | 'other';
  goal_amount: number;
  currency?: string;
  start_date: string;
  end_date: string;
  organizer_id: string;
  beneficiary_type?: string;
  beneficiary_id?: string;
  media_assets?: string[];
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateCampaign {
  title?: string;
  description?: string;
  goal_amount?: number;
  status?: string;
  end_date?: string;
  media_assets?: string[];
  tags?: string[];
  is_featured?: boolean;
  metadata?: Record<string, unknown>;
}

export class CampaignService {
  private readonly TABLE = 'campaigns';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Campaign[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Campaign | null> {
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

  async create(schoolId: string, campaign: CreateCampaign): Promise<Campaign> {
    const campaignCode = `CMP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        campaign_code: campaignCode,
        ...campaign,
        raised_amount: 0,
        currency: campaign.currency || 'XOF',
        status: 'draft',
        is_featured: false,
        view_count: 0,
        share_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, campaign: UpdateCampaign): Promise<Campaign> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...campaign, updated_at: new Date().toISOString() })
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

  async activate(schoolId: string, id: string): Promise<Campaign> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async pause(schoolId: string, id: string): Promise<Campaign> {
    return this.update(schoolId, id, { status: 'paused' });
  }

  async complete(schoolId: string, id: string): Promise<Campaign> {
    return this.update(schoolId, id, { status: 'completed' });
  }

  async recordDonation(schoolId: string, id: string, amount: number): Promise<Campaign> {
    const campaign = await this.getById(schoolId, id);
    if (!campaign) throw new Error('Campaign not found');

    return this.update(schoolId, id, {
      raised_amount: campaign.raised_amount + amount,
    });
  }

  async incrementViews(schoolId: string, id: string): Promise<void> {
    const campaign = await this.getById(schoolId, id);
    if (campaign) {
      await this.update(schoolId, id, { view_count: campaign.view_count + 1 });
    }
  }

  async incrementShares(schoolId: string, id: string): Promise<void> {
    const campaign = await this.getById(schoolId, id);
    if (campaign) {
      await this.update(schoolId, id, { share_count: campaign.share_count + 1 });
    }
  }

  async getActive(schoolId: string): Promise<Campaign[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getFeatured(schoolId: string): Promise<Campaign[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_featured', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, type: string): Promise<Campaign[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getProgress(schoolId: string, id: string): Promise<{ raised: number; goal: number; percentage: number }> {
    const campaign = await this.getById(schoolId, id);
    if (!campaign) throw new Error('Campaign not found');
    return {
      raised: campaign.raised_amount,
      goal: campaign.goal_amount,
      percentage: campaign.goal_amount > 0 ? (campaign.raised_amount / campaign.goal_amount) * 100 : 0,
    };
  }

  async search(schoolId: string, query: string): Promise<Campaign[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }
}
