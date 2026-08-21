import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface GEFIWallet {
  id: string;
  school_id: string;
  wallet_number: string;
  wallet_type: 'institutional' | 'student' | 'teacher' | 'parent';
  owner_id: string;
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
  daily_limit?: number;
  monthly_limit?: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  transaction_type: 'credit' | 'debit' | 'transfer' | 'refund';
  amount: number;
  balance_before: number;
  balance_after: number;
  reference_type: string;
  reference_id: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  school_id: string;
  created_at: string;
}

export interface CreateGEFIWallet {
  wallet_type: 'institutional' | 'student' | 'teacher' | 'parent';
  owner_id: string;
  currency?: string;
  daily_limit?: number;
  monthly_limit?: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateGEFIWallet {
  status?: 'active' | 'frozen' | 'closed';
  daily_limit?: number;
  monthly_limit?: number;
  metadata?: Record<string, unknown>;
}

export class GEFIWalletService {
  private readonly TABLE = 'gefi_wallets';
  private readonly TRANSACTIONS_TABLE = 'wallet_transactions';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<GEFIWallet[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<GEFIWallet | null> {
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

  async create(schoolId: string, wallet: CreateGEFIWallet): Promise<GEFIWallet> {
    const walletNumber = `WAL-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        wallet_number: walletNumber,
        ...wallet,
        balance: 0,
        currency: wallet.currency || 'XOF',
        status: 'active',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, wallet: UpdateGEFIWallet): Promise<GEFIWallet> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...wallet, updated_at: new Date().toISOString() })
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

  async credit(schoolId: string, walletId: string, amount: number, referenceType: string, referenceId: string, description: string): Promise<WalletTransaction> {
    const wallet = await this.getById(schoolId, walletId);
    if (!wallet) throw new Error('Wallet not found');
    if (wallet.status !== 'active') throw new Error('Wallet is not active');

    const balanceBefore = wallet.balance;
    const balanceAfter = balanceBefore + amount;

    await this.supabase
      .from(this.TABLE)
      .update({ balance: balanceAfter, updated_at: new Date().toISOString() })
      .eq('id', walletId)
      .eq('school_id', schoolId);

    const { data, error } = await this.supabase
      .from(this.TRANSACTIONS_TABLE)
      .insert({
        wallet_id: walletId,
        transaction_type: 'credit',
        amount,
        balance_before: balanceBefore,
        balance_after: balanceAfter,
        reference_type: referenceType,
        reference_id: referenceId,
        description,
        status: 'completed',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async debit(schoolId: string, walletId: string, amount: number, referenceType: string, referenceId: string, description: string): Promise<WalletTransaction> {
    const wallet = await this.getById(schoolId, walletId);
    if (!wallet) throw new Error('Wallet not found');
    if (wallet.status !== 'active') throw new Error('Wallet is not active');
    if (wallet.balance < amount) throw new Error('Insufficient balance');

    const balanceBefore = wallet.balance;
    const balanceAfter = balanceBefore - amount;

    await this.supabase
      .from(this.TABLE)
      .update({ balance: balanceAfter, updated_at: new Date().toISOString() })
      .eq('id', walletId)
      .eq('school_id', schoolId);

    const { data, error } = await this.supabase
      .from(this.TRANSACTIONS_TABLE)
      .insert({
        wallet_id: walletId,
        transaction_type: 'debit',
        amount,
        balance_before: balanceBefore,
        balance_after: balanceAfter,
        reference_type: referenceType,
        reference_id: referenceId,
        description,
        status: 'completed',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async transfer(schoolId: string, fromWalletId: string, toWalletId: string, amount: number, description: string): Promise<WalletTransaction[]> {
    const fromTx = await this.debit(schoolId, fromWalletId, amount, 'transfer', toWalletId, description);
    const toTx = await this.credit(schoolId, toWalletId, amount, 'transfer', fromWalletId, description);
    return [fromTx, toTx];
  }

  async getTransactions(schoolId: string, walletId: string): Promise<WalletTransaction[]> {
    const { data, error } = await this.supabase
      .from(this.TRANSACTIONS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('wallet_id', walletId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getByOwner(schoolId: string, ownerId: string): Promise<GEFIWallet[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('owner_id', ownerId)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async freeze(schoolId: string, id: string): Promise<GEFIWallet> {
    return this.update(schoolId, id, { status: 'frozen' });
  }

  async unfreeze(schoolId: string, id: string): Promise<GEFIWallet> {
    return this.update(schoolId, id, { status: 'active' });
  }

  async close(schoolId: string, id: string): Promise<GEFIWallet> {
    const wallet = await this.getById(schoolId, id);
    if (wallet && wallet.balance > 0) throw new Error('Cannot close wallet with positive balance');
    return this.update(schoolId, id, { status: 'closed' });
  }
}
