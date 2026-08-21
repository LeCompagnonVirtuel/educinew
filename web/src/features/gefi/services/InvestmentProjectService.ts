import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface InvestmentProject {
  id: string;
  school_id: string;
  project_code: string;
  name: string;
  description: string;
  type: 'infrastructure' | 'technology' | 'program' | 'research' | 'other';
  total_investment: number;
  invested_amount: number;
  expected_return: number;
  actual_return: number;
  currency: string;
  status: 'proposed' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
  start_date: string;
  end_date: string;
  expected_roi: number;
  actual_roi?: number;
  risk_level: 'low' | 'medium' | 'high';
  funding_sources: Record<string, unknown>[];
  milestones: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateInvestmentProject {
  name: string;
  description: string;
  type: 'infrastructure' | 'technology' | 'program' | 'research' | 'other';
  total_investment: number;
  expected_return: number;
  currency?: string;
  start_date: string;
  end_date: string;
  expected_roi: number;
  risk_level: 'low' | 'medium' | 'high';
  funding_sources: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export interface UpdateInvestmentProject {
  name?: string;
  description?: string;
  total_investment?: number;
  expected_return?: number;
  status?: string;
  end_date?: string;
  expected_roi?: number;
  risk_level?: string;
  funding_sources?: Record<string, unknown>[];
  milestones?: Record<string, unknown>[];
  metadata?: Record<string, unknown>;
}

export class InvestmentProjectService {
  private readonly TABLE = 'investment_projects';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<InvestmentProject[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<InvestmentProject | null> {
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

  async create(schoolId: string, project: CreateInvestmentProject): Promise<InvestmentProject> {
    const projectCode = `INV-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        project_code: projectCode,
        ...project,
        invested_amount: 0,
        actual_return: 0,
        currency: project.currency || 'XOF',
        status: 'proposed',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, project: UpdateInvestmentProject): Promise<InvestmentProject> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...project, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string): Promise<InvestmentProject> {
    return this.update(schoolId, id, { status: 'approved' });
  }

  async start(schoolId: string, id: string): Promise<InvestmentProject> {
    return this.update(schoolId, id, { status: 'in_progress' });
  }

  async complete(schoolId: string, id: string): Promise<InvestmentProject> {
    const project = await this.getById(schoolId, id);
    if (!project) throw new Error('Project not found');

    const actualRoi = project.invested_amount > 0 ? (project.actual_return / project.invested_amount) * 100 : 0;

    return this.update(schoolId, id, {
      status: 'completed',
      actual_roi: actualRoi,
    });
  }

  async recordInvestment(schoolId: string, id: string, amount: number): Promise<InvestmentProject> {
    const project = await this.getById(schoolId, id);
    if (!project) throw new Error('Project not found');

    return this.update(schoolId, id, {
      invested_amount: project.invested_amount + amount,
    });
  }

  async recordReturn(schoolId: string, id: string, amount: number): Promise<InvestmentProject> {
    const project = await this.getById(schoolId, id);
    if (!project) throw new Error('Project not found');

    return this.update(schoolId, id, {
      actual_return: project.actual_return + amount,
    });
  }

  async getByType(schoolId: string, type: string): Promise<InvestmentProject[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('type', type)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<InvestmentProject[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'in_progress')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPortfolioSummary(schoolId: string): Promise<{ totalInvested: number; totalReturn: number; averageRoi: number; activeProjects: number }> {
    const projects = await this.getAll(schoolId);
    const activeProjects = projects.filter((p) => p.status === 'in_progress');
    const totalInvested = projects.reduce((sum, p) => sum + p.invested_amount, 0);
    const totalReturn = projects.reduce((sum, p) => sum + p.actual_return, 0);
    const averageRoi = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    return { totalInvested, totalReturn, averageRoi, activeProjects: activeProjects.length };
  }
}
