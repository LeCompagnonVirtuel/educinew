import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface RepaymentSchedule {
  id: string;
  school_id: string;
  loan_id: string;
  schedule_number: number;
  due_date: string;
  amount_due: number;
  principal_portion: number;
  interest_portion: number;
  total_paid: number;
  balance_after: number;
  status: 'pending' | 'paid' | 'partial' | 'late' | 'missed';
  paid_date?: string;
  late_fee: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface RepaymentTransaction {
  id: string;
  repayment_id: string;
  transaction_id: string;
  amount: number;
  payment_method: string;
  reference: string;
  school_id: string;
  created_at: string;
}

export interface CreateRepaymentSchedule {
  loan_id: string;
  schedule_number: number;
  due_date: string;
  amount_due: number;
  principal_portion: number;
  interest_portion: number;
  balance_after: number;
}

export interface UpdateRepaymentSchedule {
  status?: 'pending' | 'paid' | 'partial' | 'late' | 'missed';
  total_paid?: number;
  paid_date?: string;
  late_fee?: number;
  notes?: string;
}

export class RepaymentService {
  private readonly SCHEDULES_TABLE = 'repayment_schedules';
  private readonly TRANSACTIONS_TABLE = 'repayment_transactions';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAllSchedules(schoolId: string): Promise<RepaymentSchedule[]> {
    const { data, error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getScheduleById(schoolId: string, id: string): Promise<RepaymentSchedule | null> {
    const { data, error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async createSchedule(schoolId: string, schedule: CreateRepaymentSchedule): Promise<RepaymentSchedule> {
    const { data, error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .insert({
        ...schedule,
        total_paid: 0,
        status: 'pending',
        late_fee: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateSchedule(schoolId: string, id: string, schedule: UpdateRepaymentSchedule): Promise<RepaymentSchedule> {
    const { data, error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .update({ ...schedule, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async generateSchedule(schoolId: string, loanId: string, totalAmount: number, termMonths: number, startDate: string): Promise<RepaymentSchedule[]> {
    const monthlyPayment = totalAmount / termMonths;
    const schedules: RepaymentSchedule[] = [];
    let balance = totalAmount;

    for (let i = 1; i <= termMonths; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      const interestPortion = balance * 0.08 / 12;
      const principalPortion = monthlyPayment - interestPortion;
      balance -= principalPortion;

      const schedule = await this.createSchedule(schoolId, {
        loan_id: loanId,
        schedule_number: i,
        due_date: dueDate.toISOString().split('T')[0],
        amount_due: monthlyPayment,
        principal_portion: principalPortion,
        interest_portion: interestPortion,
        balance_after: Math.max(0, balance),
      });
      schedules.push(schedule);
    }

    return schedules;
  }

  async recordPayment(schoolId: string, repaymentId: string, amount: number, paymentMethod: string, reference: string): Promise<RepaymentTransaction> {
    const repayment = await this.getScheduleById(schoolId, repaymentId);
    if (!repayment) throw new Error('Repayment schedule not found');

    const newTotalPaid = repayment.total_paid + amount;
    const newStatus = newTotalPaid >= repayment.amount_due ? 'paid' : 'partial';

    await this.updateSchedule(schoolId, repaymentId, {
      total_paid: newTotalPaid,
      status: newStatus,
      paid_date: new Date().toISOString(),
    });

    const { data, error } = await this.supabase
      .from(this.TRANSACTIONS_TABLE)
      .insert({
        repayment_id: repaymentId,
        transaction_id: `TXN-${Date.now()}`,
        amount,
        payment_method: paymentMethod,
        reference,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getByLoan(schoolId: string, loanId: string): Promise<RepaymentSchedule[]> {
    const { data, error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('loan_id', loanId)
      .is('deleted_at', null)
      .order('schedule_number');

    if (error) throw error;
    return data || [];
  }

  async getOverdue(schoolId: string): Promise<RepaymentSchedule[]> {
    const { data, error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .in('status', ['late', 'missed'])
      .is('deleted_at', null)
      .order('due_date');

    if (error) throw error;
    return data || [];
  }

  async getUpcoming(schoolId: string, days: number): Promise<RepaymentSchedule[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const { data, error } = await this.supabase
      .from(this.SCHEDULES_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending')
      .gte('due_date', new Date().toISOString().split('T')[0])
      .lte('due_date', futureDate.toISOString().split('T')[0])
      .is('deleted_at', null)
      .order('due_date');

    if (error) throw error;
    return data || [];
  }

  async getTotalOutstanding(schoolId: string, loanId: string): Promise<number> {
    const schedules = await this.getByLoan(schoolId, loanId);
    return schedules
      .filter((s) => s.status !== 'paid')
      .reduce((sum, s) => sum + (s.amount_due - s.total_paid), 0);
  }
}
