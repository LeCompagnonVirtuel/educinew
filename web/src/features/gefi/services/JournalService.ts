import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface JournalEntry {
  id: string;
  school_id: string;
  journal_number: string;
  entry_date: string;
  description: string;
  reference_type: string;
  reference_id: string;
  status: 'draft' | 'posted' | 'reversed';
  total_debit: number;
  total_credit: number;
  currency: string;
  posted_by?: string;
  posted_at?: string;
  reversed_by?: string;
  reversed_at?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface JournalLine {
  id: string;
  journal_entry_id: string;
  account_id: string;
  account_code: string;
  description: string;
  debit: number;
  credit: number;
  currency: string;
  school_id: string;
  created_at: string;
}

export interface CreateJournalEntry {
  entry_date: string;
  description: string;
  reference_type: string;
  reference_id: string;
  lines: Omit<JournalLine, 'id' | 'journal_entry_id' | 'created_at'>[];
  metadata?: Record<string, unknown>;
}

export interface UpdateJournalEntry {
  description?: string;
  metadata?: Record<string, unknown>;
}

export class JournalService {
  private readonly TABLE = 'journal_entries';
  private readonly LINES_TABLE = 'journal_lines';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<JournalEntry[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('entry_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<JournalEntry | null> {
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

  async getWithLines(schoolId: string, id: string): Promise<{ entry: JournalEntry; lines: JournalLine[] } | null> {
    const entry = await this.getById(schoolId, id);
    if (!entry) return null;

    const { data: lines, error: linesError } = await this.supabase
      .from(this.LINES_TABLE)
      .select('*')
      .eq('journal_entry_id', id)
      .eq('school_id', schoolId)
      .order('created_at');

    if (linesError) throw linesError;
    return { entry, lines: lines || [] };
  }

  async create(schoolId: string, entry: CreateJournalEntry): Promise<JournalEntry> {
    const totalDebit = entry.lines.reduce((sum, line) => sum + line.debit, 0);
    const totalCredit = entry.lines.reduce((sum, line) => sum + line.credit, 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      throw new Error('Debit and credit totals must be equal');
    }

    const journalNumber = `JE-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        journal_number: journalNumber,
        entry_date: entry.entry_date,
        description: entry.description,
        reference_type: entry.reference_type,
        reference_id: entry.reference_id,
        status: 'draft',
        total_debit: totalDebit,
        total_credit: totalCredit,
        currency: 'XOF',
        school_id: schoolId,
        metadata: entry.metadata,
      })
      .select()
      .single();

    if (error) throw error;

    const linesWithJournalId = entry.lines.map((line) => ({
      ...line,
      journal_entry_id: data.id,
      school_id: schoolId,
    }));

    const { error: linesError } = await this.supabase
      .from(this.LINES_TABLE)
      .insert(linesWithJournalId);

    if (linesError) throw linesError;

    return data;
  }

  async update(schoolId: string, id: string, entry: UpdateJournalEntry): Promise<JournalEntry> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...entry, updated_at: new Date().toISOString() })
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

  async post(schoolId: string, id: string, postedBy: string): Promise<JournalEntry> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        status: 'posted',
        posted_by: postedBy,
        posted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async reverse(schoolId: string, id: string, reversedBy: string): Promise<JournalEntry> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        status: 'reversed',
        reversed_by: reversedBy,
        reversed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getByStatus(schoolId: string, status: string): Promise<JournalEntry[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null)
      .order('entry_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByDateRange(schoolId: string, startDate: string, endDate: string): Promise<JournalEntry[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .gte('entry_date', startDate)
      .lte('entry_date', endDate)
      .is('deleted_at', null)
      .order('entry_date', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}
