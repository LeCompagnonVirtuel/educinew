import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface SafetyInspectionCampus {
  id: string;
  school_id: string;
  inspection_number: string;
  inspection_type: 'fire_safety' | 'structural' | 'electrical' | 'environmental' | 'security' | 'accessibility' | 'general';
  status: 'scheduled' | 'in_progress' | 'completed' | 'follow_up_required';
  scheduled_date: string;
  completed_date?: string;
  inspector_name: string;
  inspector_organization?: string;
  location: string;
  checklist_items: ChecklistItem[];
  findings: InspectionFinding[];
  overall_score: number;
  compliance_status: 'compliant' | 'non_compliant' | 'partially_compliant';
  corrective_actions: CorrectiveAction[];
  next_inspection_date?: string;
  report_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  status: 'pass' | 'fail' | 'na' | 'needs_attention';
  notes?: string;
}

export interface InspectionFinding {
  id: string;
  category: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  photo_url?: string;
}

export interface CorrectiveAction {
  id: string;
  finding_id: string;
  description: string;
  responsible: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
  completed_date?: string;
}

export interface CreateSafetyInspectionCampus {
  inspection_type: 'fire_safety' | 'structural' | 'electrical' | 'environmental' | 'security' | 'accessibility' | 'general';
  scheduled_date: string;
  inspector_name: string;
  inspector_organization?: string;
  location: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateSafetyInspectionCampus {
  status?: string;
  completed_date?: string;
  checklist_items?: ChecklistItem[];
  findings?: InspectionFinding[];
  overall_score?: number;
  compliance_status?: string;
  corrective_actions?: CorrectiveAction[];
  next_inspection_date?: string;
  report_url?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class SafetyInspectionCampusService {
  private readonly TABLE = 'safety_inspections_campus';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<SafetyInspectionCampus[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('scheduled_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<SafetyInspectionCampus | null> {
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

  async create(schoolId: string, inspection: CreateSafetyInspectionCampus): Promise<SafetyInspectionCampus> {
    const inspectionNumber = `SI-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        inspection_number: inspectionNumber,
        ...inspection,
        status: 'scheduled',
        checklist_items: [],
        findings: [],
        overall_score: 0,
        compliance_status: 'compliant',
        corrective_actions: [],
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, inspection: UpdateSafetyInspectionCampus): Promise<SafetyInspectionCampus> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...inspection, updated_at: new Date().toISOString() })
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

  async complete(schoolId: string, id: string, checklistItems: ChecklistItem[], findings: InspectionFinding[]): Promise<SafetyInspectionCampus> {
    const failedItems = checklistItems.filter((i) => i.status === 'fail');
    const complianceStatus = failedItems.length === 0 ? 'compliant' : 'non_compliant';
    const overallScore = Math.round(
      (checklistItems.filter((i) => i.status === 'pass').length / checklistItems.length) * 100
    );

    return this.update(schoolId, id, {
      status: 'completed',
      completed_date: new Date().toISOString(),
      checklist_items: checklistItems,
      findings,
      overall_score: overallScore,
      compliance_status: complianceStatus,
    });
  }

  async getByType(schoolId: string, inspectionType: string): Promise<SafetyInspectionCampus[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('inspection_type', inspectionType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPending(schoolId: string): Promise<SafetyInspectionCampus[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'scheduled')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getNonCompliant(schoolId: string): Promise<SafetyInspectionCampus[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('compliance_status', 'non_compliant')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{
    total: number;
    completed: number;
    compliant: number;
    nonCompliant: number;
    averageScore: number;
    pendingFollowUp: number;
  }> {
    const inspections = await this.getAll(schoolId);
    const completed = inspections.filter((i) => i.status === 'completed');

    return {
      total: inspections.length,
      completed: completed.length,
      compliant: inspections.filter((i) => i.compliance_status === 'compliant').length,
      nonCompliant: inspections.filter((i) => i.compliance_status === 'non_compliant').length,
      averageScore: completed.length > 0
        ? completed.reduce((sum, i) => sum + i.overall_score, 0) / completed.length
        : 0,
      pendingFollowUp: inspections.filter((i) => i.status === 'follow_up_required').length,
    };
  }
}
