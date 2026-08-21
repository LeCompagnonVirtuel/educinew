import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface ROIAnalysis {
  id: string;
  school_id: string;
  analysis_code: string;
  entity_type: 'project' | 'program' | 'investment' | 'department' | 'initiative';
  entity_id: string;
  entity_name: string;
  analysis_date: string;
  period_start: string;
  period_end: string;
  total_investment: number;
  direct_benefits: number;
  indirect_benefits: number;
  total_benefits: number;
  net_benefit: number;
  roi_percentage: number;
  payback_period_months: number;
  npv: number;
  irr: number;
  currency: string;
  assumptions: Record<string, unknown>;
  risks: Record<string, unknown>;
  recommendations: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateROIAnalysis {
  entity_type: 'project' | 'program' | 'investment' | 'department' | 'initiative';
  entity_id: string;
  entity_name: string;
  analysis_date: string;
  period_start: string;
  period_end: string;
  total_investment: number;
  direct_benefits: number;
  indirect_benefits: number;
  assumptions: Record<string, unknown>;
  risks: Record<string, unknown>;
  currency?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateROIAnalysis {
  total_investment?: number;
  direct_benefits?: number;
  indirect_benefits?: number;
  assumptions?: Record<string, unknown>;
  risks?: Record<string, unknown>;
  recommendations?: string[];
  metadata?: Record<string, unknown>;
}

export class ROIAnalysisService {
  private readonly TABLE = 'roi_analyses';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<ROIAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<ROIAnalysis | null> {
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

  async create(schoolId: string, analysis: CreateROIAnalysis): Promise<ROIAnalysis> {
    const analysisCode = `ROI-${Date.now()}`;
    const totalBenefits = analysis.direct_benefits + analysis.indirect_benefits;
    const netBenefit = totalBenefits - analysis.total_investment;
    const roiPercentage = analysis.total_investment > 0 ? (netBenefit / analysis.total_investment) * 100 : 0;
    const paybackPeriodMonths = totalBenefits > 0 ? Math.ceil((analysis.total_investment / totalBenefits) * 12) : 0;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        analysis_code: analysisCode,
        ...analysis,
        total_benefits: totalBenefits,
        net_benefit: netBenefit,
        roi_percentage: roiPercentage,
        payback_period_months: paybackPeriodMonths,
        npv: netBenefit,
        irr: roiPercentage,
        currency: analysis.currency || 'XOF',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, analysis: UpdateROIAnalysis): Promise<ROIAnalysis> {
    const existing = await this.getById(schoolId, id);
    if (!existing) throw new Error('Analysis not found');

    const totalInvestment = analysis.total_investment ?? existing.total_investment;
    const directBenefits = analysis.direct_benefits ?? existing.direct_benefits;
    const indirectBenefits = analysis.indirect_benefits ?? existing.indirect_benefits;
    const totalBenefits = directBenefits + indirectBenefits;
    const netBenefit = totalBenefits - totalInvestment;
    const roiPercentage = totalInvestment > 0 ? (netBenefit / totalInvestment) * 100 : 0;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        ...analysis,
        total_benefits: totalBenefits,
        net_benefit: netBenefit,
        roi_percentage: roiPercentage,
        updated_at: new Date().toISOString(),
      })
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

  async getByEntity(schoolId: string, entityType: string, entityId: string): Promise<ROIAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getLatest(schoolId: string, entityType: string, entityId: string): Promise<ROIAnalysis | null> {
    const analyses = await this.getByEntity(schoolId, entityType, entityId);
    return analyses.length > 0 ? analyses[0] : null;
  }

  async compareAnalyses(schoolId: string, analysisIds: string[]): Promise<{ id: string; entity_name: string; roi_percentage: number; net_benefit: number }[]> {
    const results: { id: string; entity_name: string; roi_percentage: number; net_benefit: number }[] = [];

    for (const id of analysisIds) {
      const analysis = await this.getById(schoolId, id);
      if (analysis) {
        results.push({
          id: analysis.id,
          entity_name: analysis.entity_name,
          roi_percentage: analysis.roi_percentage,
          net_benefit: analysis.net_benefit,
        });
      }
    }

    return results.sort((a, b) => b.roi_percentage - a.roi_percentage);
  }

  async getTopPerformers(schoolId: string, limit: number): Promise<ROIAnalysis[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('roi_percentage', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async getAverageROI(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('roi_percentage')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (error) throw error;
    if (!data || data.length === 0) return 0;
    return data.reduce((sum, a) => sum + a.roi_percentage, 0) / data.length;
  }
}
