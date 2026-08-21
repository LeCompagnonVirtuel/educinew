import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface CampaignImpact {
  id: string;
  school_id: string;
  campaign_id: string;
  impact_type: 'students_benefited' | 'infrastructure_built' | 'programs_funded' | 'scholarships_awarded' | 'community_reached' | 'other';
  title: string;
  description: string;
  metrics: ImpactMetric[];
  evidence?: string[];
  reported_date: string;
  reported_by: string;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ImpactMetric {
  name: string;
  value: number;
  unit: string;
  target?: number;
  achieved_percentage?: number;
}

export interface CreateCampaignImpact {
  campaign_id: string;
  impact_type: 'students_benefited' | 'infrastructure_built' | 'programs_funded' | 'scholarships_awarded' | 'community_reached' | 'other';
  title: string;
  description: string;
  metrics: ImpactMetric[];
  evidence?: string[];
  reported_date: string;
  reported_by: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateCampaignImpact {
  title?: string;
  description?: string;
  metrics?: ImpactMetric[];
  evidence?: string[];
  verified?: boolean;
  verified_by?: string;
  metadata?: Record<string, unknown>;
}

export class CampaignImpactService {
  private readonly TABLE = 'campaign_impacts';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<CampaignImpact[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('reported_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<CampaignImpact | null> {
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

  async create(schoolId: string, impact: CreateCampaignImpact): Promise<CampaignImpact> {
    const metricsWithPercentage = impact.metrics.map((metric) => ({
      ...metric,
      achieved_percentage: metric.target ? (metric.value / metric.target) * 100 : undefined,
    }));

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...impact,
        metrics: metricsWithPercentage,
        verified: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, impact: UpdateCampaignImpact): Promise<CampaignImpact> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...impact, updated_at: new Date().toISOString() })
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

  async verify(schoolId: string, id: string, verifiedBy: string): Promise<CampaignImpact> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        verified: true,
        verified_by: verifiedBy,
        verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getByCampaign(schoolId: string, campaignId: string): Promise<CampaignImpact[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('campaign_id', campaignId)
      .is('deleted_at', null)
      .order('reported_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByType(schoolId: string, impactType: string): Promise<CampaignImpact[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('impact_type', impactType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getVerified(schoolId: string): Promise<CampaignImpact[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('verified', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getUnverified(schoolId: string): Promise<CampaignImpact[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('verified', false)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getTotalImpact(schoolId: string, campaignId: string): Promise<{ totalMetrics: number; averageAchievement: number }> {
    const impacts = await this.getByCampaign(schoolId, campaignId);
    const allMetrics = impacts.flatMap((i) => i.metrics);
    const totalMetrics = allMetrics.length;
    const avgAchievement = allMetrics
      .filter((m) => m.achieved_percentage !== undefined)
      .reduce((sum, m, _, arr) => sum + (m.achieved_percentage || 0) / arr.length, 0);

    return { totalMetrics, averageAchievement: avgAchievement };
  }
}
