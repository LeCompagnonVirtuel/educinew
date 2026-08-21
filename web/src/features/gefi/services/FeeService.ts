import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FeeStructure {
  id: string;
  school_id: string;
  code: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  frequency: 'one_time' | 'monthly' | 'quarterly' | 'annual';
  category: 'tuition' | 'registration' | 'exam' | 'transport' | 'meals' | 'uniform' | 'books' | 'activities' | 'other';
  grade_levels: string[];
  is_mandatory: boolean;
  is_active: boolean;
  due_date?: string;
  late_fee_percentage?: number;
  max_installments?: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FeeInvoice {
  id: string;
  school_id: string;
  invoice_number: string;
  student_id: string;
  fee_structure_id: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  status: 'pending' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  due_date: string;
  paid_amount: number;
  balance: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateFeeStructure {
  code: string;
  name: string;
  description: string;
  amount: number;
  currency?: string;
  frequency: 'one_time' | 'monthly' | 'quarterly' | 'annual';
  category: string;
  grade_levels: string[];
  is_mandatory?: boolean;
  is_active?: boolean;
  due_date?: string;
  late_fee_percentage?: number;
  max_installments?: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateFeeStructure {
  name?: string;
  description?: string;
  amount?: number;
  is_active?: boolean;
  late_fee_percentage?: number;
  max_installments?: number;
  metadata?: Record<string, unknown>;
}

export class FeeService {
  private readonly STRUCTURES_TABLE = 'fee_structures';
  private readonly INVOICES_TABLE = 'fee_invoices';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllStructures(schoolId: string): Promise<FeeStructure[]> {
    const { data, error } = await this.supabase
      .from(this.STRUCTURES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('code');

    if (error) throw error;
    return data || [];
  }

  async getStructureById(schoolId: string, id: string): Promise<FeeStructure | null> {
    const { data, error } = await this.supabase
      .from(this.STRUCTURES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createStructure(schoolId: string, structure: CreateFeeStructure): Promise<FeeStructure> {
    const { data, error } = await this.supabase
      .from(this.STRUCTURES_TABLE)
      .insert({ ...structure, currency: structure.currency || 'XOF', is_active: structure.is_active ?? true, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateStructure(schoolId: string, id: string, structure: UpdateFeeStructure): Promise<FeeStructure> {
    const { data, error } = await this.supabase
      .from(this.STRUCTURES_TABLE)
      .update({ ...structure, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteStructure(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.STRUCTURES_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async getStructuresByCategory(schoolId: string, category: string): Promise<FeeStructure[]> {
    const { data, error } = await this.supabase
      .from(this.STRUCTURES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActiveStructures(schoolId: string): Promise<FeeStructure[]> {
    const { data, error } = await this.supabase
      .from(this.STRUCTURES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async generateInvoice(schoolId: string, studentId: string, feeStructureId: string, dueDate: string): Promise<FeeInvoice> {
    const structure = await this.getStructureById(schoolId, feeStructureId);
    if (!structure) throw new Error('Fee structure not found');

    const invoiceNumber = `INV-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.INVOICES_TABLE)
      .insert({
        invoice_number: invoiceNumber,
        student_id: studentId,
        fee_structure_id: feeStructureId,
        amount: structure.amount,
        tax_amount: 0,
        total_amount: structure.amount,
        currency: structure.currency,
        status: 'pending',
        due_date: dueDate,
        paid_amount: 0,
        balance: structure.amount,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getInvoicesByStudent(schoolId: string, studentId: string): Promise<FeeInvoice[]> {
    const { data, error } = await this.supabase
      .from(this.INVOICES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getOverdueInvoices(schoolId: string): Promise<FeeInvoice[]> {
    const { data, error } = await this.supabase
      .from(this.INVOICES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'overdue')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }
}
