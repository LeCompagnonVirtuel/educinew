import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface StudentLoan {
  id: string;
  school_id: string;
  loan_number: string;
  student_id: string;
  program_id?: string;
  principal_amount: number;
  interest_rate: number;
  interest_type: 'fixed' | 'variable';
  term_months: number;
  monthly_payment: number;
  total_amount: number;
  disbursed_amount: number;
  repaid_amount: number;
  outstanding_balance: number;
  currency: string;
  status: 'pending' | 'approved' | 'disbursed' | 'active' | 'delinquent' | 'defaulted' | 'completed' | 'written_off';
  disbursement_date?: string;
  first_payment_date?: string;
  maturity_date?: string;
  collateral?: Record<string, unknown>;
  guarantor?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface LoanPayment {
  id: string;
  loan_id: string;
  payment_number: number;
  amount: number;
  principal_portion: number;
  interest_portion: number;
  balance_after: number;
  due_date: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'late' | 'missed';
  late_fee?: number;
  school_id: string;
  created_at: string;
}

export interface CreateStudentLoan {
  student_id: string;
  program_id?: string;
  principal_amount: number;
  interest_rate: number;
  interest_type: 'fixed' | 'variable';
  term_months: number;
  currency?: string;
  disbursement_date?: string;
  collateral?: Record<string, unknown>;
  guarantor?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateStudentLoan {
  status?: 'pending' | 'approved' | 'disbursed' | 'active' | 'delinquent' | 'defaulted' | 'completed' | 'written_off';
  interest_rate?: number;
  metadata?: Record<string, unknown>;
}

export class StudentLoanService {
  private readonly TABLE = 'student_loans';
  private readonly PAYMENTS_TABLE = 'loan_payments';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<StudentLoan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<StudentLoan | null> {
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

  async create(schoolId: string, loan: CreateStudentLoan): Promise<StudentLoan> {
    const loanNumber = `LN-${Date.now()}`;
    const totalAmount = loan.principal_amount * (1 + (loan.interest_rate * loan.term_months) / 1200);
    const monthlyPayment = totalAmount / loan.term_months;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        loan_number: loanNumber,
        ...loan,
        currency: loan.currency || 'XOF',
        total_amount: totalAmount,
        monthly_payment: monthlyPayment,
        disbursed_amount: 0,
        repaid_amount: 0,
        outstanding_balance: loan.principal_amount,
        status: 'pending',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, loan: UpdateStudentLoan): Promise<StudentLoan> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...loan, updated_at: new Date().toISOString() })
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

  async approve(schoolId: string, id: string): Promise<StudentLoan> {
    return this.update(schoolId, id, { status: 'approved' });
  }

  async disburse(schoolId: string, id: string, amount: number): Promise<StudentLoan> {
    const loan = await this.getById(schoolId, id);
    if (!loan) throw new Error('Loan not found');

    const newDisbursed = loan.disbursed_amount + amount;
    const newOutstanding = loan.outstanding_balance + amount;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        disbursed_amount: newDisbursed,
        outstanding_balance: newOutstanding,
        status: 'active',
        disbursement_date: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async recordPayment(schoolId: string, loanId: string, amount: number, paymentDate: string): Promise<LoanPayment> {
    const loan = await this.getById(schoolId, loanId);
    if (!loan) throw new Error('Loan not found');

    const interestPortion = (loan.outstanding_balance * loan.interest_rate) / 1200;
    const principalPortion = amount - interestPortion;
    const balanceAfter = loan.outstanding_balance - principalPortion;

    const { data: payment, error: paymentError } = await this.supabase
      .from(this.PAYMENTS_TABLE)
      .insert({
        loan_id: loanId,
        payment_number: loan.repaid_amount > 0 ? Math.floor(loan.repaid_amount / loan.monthly_payment) + 1 : 1,
        amount,
        principal_portion: principalPortion,
        interest_portion: interestPortion,
        balance_after: balanceAfter,
        due_date: paymentDate,
        paid_date: new Date().toISOString(),
        status: 'paid',
        school_id: schoolId,
      })
      .select()
      .single();

    if (paymentError) throw paymentError;

    await this.supabase
      .from(this.TABLE)
      .update({
        repaid_amount: loan.repaid_amount + amount,
        outstanding_balance: Math.max(0, balanceAfter),
        status: balanceAfter <= 0 ? 'completed' : loan.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', loanId)
      .eq('school_id', schoolId);

    return payment;
  }

  async getByStudent(schoolId: string, studentId: string): Promise<StudentLoan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<StudentLoan[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPayments(schoolId: string, loanId: string): Promise<LoanPayment[]> {
    const { data, error } = await this.supabase
      .from(this.PAYMENTS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('loan_id', loanId)
      .order('payment_number');

    if (error) throw error;
    return data || [];
  }
}
