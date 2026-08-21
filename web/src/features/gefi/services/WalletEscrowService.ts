import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface WalletEscrow {
  id: string;
  school_id: string;
  escrow_number: string;
  wallet_id: string;
  amount: number;
  currency: string;
  status: 'held' | 'released' | 'disputed' | 'cancelled';
  release_condition: Record<string, unknown>;
  released_at?: string;
  released_by?: string;
  dispute_reason?: string;
  dispute_resolved_at?: string;
  reference_type: string;
  reference_id: string;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CreateWalletEscrow {
  wallet_id: string;
  amount: number;
  currency?: string;
  release_condition: Record<string, unknown>;
  reference_type: string;
  reference_id: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateWalletEscrow {
  status?: 'held' | 'released' | 'disputed' | 'cancelled';
  release_condition?: Record<string, unknown>;
  dispute_reason?: string;
  metadata?: Record<string, unknown>;
}

export class WalletEscrowService {
  private readonly TABLE = 'wallet_escrows';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<WalletEscrow[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<WalletEscrow | null> {
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

  async create(schoolId: string, escrow: CreateWalletEscrow): Promise<WalletEscrow> {
    const escrowNumber = `ESC-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        escrow_number: escrowNumber,
        ...escrow,
        currency: escrow.currency || 'XOF',
        status: 'held',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, escrow: UpdateWalletEscrow): Promise<WalletEscrow> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...escrow, updated_at: new Date().toISOString() })
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

  async release(schoolId: string, id: string, releasedBy: string): Promise<WalletEscrow> {
    const escrow = await this.getById(schoolId, id);
    if (!escrow) throw new Error('Escrow not found');
    if (escrow.status !== 'held') throw new Error('Escrow is not in held status');

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        status: 'released',
        released_at: new Date().toISOString(),
        released_by: releasedBy,
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async dispute(schoolId: string, id: string, reason: string): Promise<WalletEscrow> {
    return this.update(schoolId, id, {
      status: 'disputed',
      dispute_reason: reason,
    });
  }

  async resolveDispute(schoolId: string, id: string): Promise<WalletEscrow> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({
        status: 'held',
        dispute_reason: null,
        dispute_resolved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async cancel(schoolId: string, id: string): Promise<WalletEscrow> {
    return this.update(schoolId, id, { status: 'cancelled' });
  }

  async getByStatus(schoolId: string, status: string): Promise<WalletEscrow[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getHeldEscrows(schoolId: string): Promise<WalletEscrow[]> {
    return this.getByStatus(schoolId, 'held');
  }

  async getByWallet(schoolId: string, walletId: string): Promise<WalletEscrow[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('wallet_id', walletId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getTotalHeld(schoolId: string, walletId: string): Promise<number> {
    const escrows = await this.getByWallet(schoolId, walletId);
    return escrows
      .filter((e) => e.status === 'held')
      .reduce((sum, e) => sum + e.amount, 0);
  }
}
