import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface TaxCompliance {
  id: string;
  school_id: string;
  compliance_code: string;
  tax_type: string;
  jurisdiction: string;
  fiscal_period: string;
  total_taxable: number;
  tax_amount: number;
  credits: number;
  net_tax: number;
  status: 'draft' | 'filed' | 'paid' | 'overdue' | 'amended';
  filing_date?: string;
  due_date: string;
  payment_date?: string;
  payment_reference?: string;
  documents?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface TaxReturn {
  id: string;
  compliance_id: string;
  return_type: string;
  period: string;
  data: Record<string, unknown>;
  submitted: boolean;
  submitted_at?: string;
  confirmation_number?: string;
  school_id: string;
  created_at: string;
}

export interface CreateTaxCompliance {
  tax_type: string;
  jurisdiction: string;
  fiscal_period: string;
  total_taxable: number;
  tax_amount: number;
  credits?: number;
  due_date: string;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateTaxCompliance {
  total_taxable?: number;
  tax_amount?: number;
  credits?: number;
  status?: string;
  filing_date?: string;
  payment_date?: string;
  payment_reference?: string;
  documents?: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
}

export class TaxComplianceService {
  private readonly TABLE = 'tax_compliances';
  private readonly RETURNS_TABLE = 'tax_returns';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<TaxCompliance[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<TaxCompliance | null> {
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

  async create(schoolId: string, compliance: CreateTaxCompliance): Promise<TaxCompliance> {
    const complianceCode = `TC-${Date.now()}`;
    const netTax = compliance.tax_amount - (compliance.credits || 0);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        compliance_code: complianceCode,
        ...compliance,
        credits: compliance.credits || 0,
        net_tax: netTax,
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, compliance: UpdateTaxCompliance): Promise<TaxCompliance> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...compliance, updated_at: new Date().toISOString() })
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

  async file(schoolId: string, id: string): Promise<TaxCompliance> {
    return this.update(schoolId, id, {
      status: 'filed',
      filing_date: new Date().toISOString(),
    });
  }

  async recordPayment(schoolId: string, id: string, paymentReference: string): Promise<TaxCompliance> {
    return this.update(schoolId, id, {
      status: 'paid',
      payment_date: new Date().toISOString(),
      payment_reference: paymentReference,
    });
  }

  async getByStatus(schoolId: string, status: string): Promise<TaxCompliance[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getOverdue(schoolId: string): Promise<TaxCompliance[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['draft', 'filed'])
      .lt('due_date', new Date().toISOString().split('T')[0])
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByTaxType(schoolId: string, taxType: string): Promise<TaxCompliance[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('tax_type', taxType)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByFiscalPeriod(schoolId: string, fiscalPeriod: string): Promise<TaxCompliance[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('fiscal_period', fiscalPeriod)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async createReturn(schoolId: string, complianceId: string, returnType: string, period: string, data: Record<string, unknown>): Promise<TaxReturn> {
    const { data: returnData, error } = await this.supabase
      .from(this.RETURNS_TABLE)
      .insert({
        compliance_id: complianceId,
        return_type: returnType,
        period,
        data,
        submitted: false,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return returnData;
  }

  async submitReturn(schoolId: string, returnId: string, confirmationNumber: string): Promise<TaxReturn> {
    const { data, error } = await this.supabase
      .from(this.RETURNS_TABLE)
      .update({
        submitted: true,
        submitted_at: new Date().toISOString(),
        confirmation_number: confirmationNumber,
      })
      .eq('school_id', schoolId)
      .eq('id', returnId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getReturns(schoolId: string, complianceId: string): Promise<TaxReturn[]> {
    const { data, error } = await this.supabase
      .from(this.RETURNS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('compliance_id', complianceId);

    if (error) throw error;
    return data || [];
  }

  async getTotalTaxLiability(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('net_tax')
      .eq('school_id', schoolId)
      .in('status', ['draft', 'filed', 'overdue'])
      .is('deleted_at', null);

    if (error) throw error;
    return (data || []).reduce((sum, c) => sum + c.net_tax, 0);
  }

  async getComplianceStats(schoolId: string): Promise<{ total: number; filed: number; paid: number; overdue: number; totalLiability: number }> {
    const compliances = await this.getAll(schoolId);
    return {
      total: compliances.length,
      filed: compliances.filter((c) => c.status === 'filed').length,
      paid: compliances.filter((c) => c.status === 'paid').length,
      overdue: compliances.filter((c) => c.status === 'overdue').length,
      totalLiability: compliances.reduce((sum, c) => sum + c.net_tax, 0),
    };
  }
}
