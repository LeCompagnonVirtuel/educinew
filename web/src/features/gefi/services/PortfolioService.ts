import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Portfolio {
  id: string;
  school_id: string;
  portfolio_code: string;
  name: string;
  description: string;
  type: 'conservative' | 'moderate' | 'aggressive' | 'custom';
  total_value: number;
  invested_amount: number;
  current_value: number;
  unrealized_gain_loss: number;
  realized_gain_loss: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
  risk_tolerance: 'low' | 'medium' | 'high';
  investment_horizon: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PortfolioAsset {
  id: string;
  portfolio_id: string;
  asset_type: 'stock' | 'bond' | 'mutual_fund' | 'real_estate' | 'cash' | 'other';
  name: string;
  ticker?: string;
  quantity: number;
  purchase_price: number;
  current_price: number;
  purchase_date: string;
  weight: number;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePortfolio {
  name: string;
  description: string;
  type: 'conservative' | 'moderate' | 'aggressive' | 'custom';
  currency?: string;
  risk_tolerance: 'low' | 'medium' | 'high';
  investment_horizon: string;
  metadata?: Record<string, unknown>;
}

export interface UpdatePortfolio {
  name?: string;
  description?: string;
  status?: string;
  risk_tolerance?: string;
  investment_horizon?: string;
  metadata?: Record<string, unknown>;
}

export class PortfolioService {
  private readonly TABLE = 'portfolios';
  private readonly ASSETS_TABLE = 'portfolio_assets';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Portfolio[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Portfolio | null> {
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

  async create(schoolId: string, portfolio: CreatePortfolio): Promise<Portfolio> {
    const portfolioCode = `PF-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        portfolio_code: portfolioCode,
        ...portfolio,
        total_value: 0,
        invested_amount: 0,
        current_value: 0,
        unrealized_gain_loss: 0,
        realized_gain_loss: 0,
        currency: portfolio.currency || 'USD',
        status: 'active',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, portfolio: UpdatePortfolio): Promise<Portfolio> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...portfolio, updated_at: new Date().toISOString() })
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

  async addAsset(schoolId: string, portfolioId: string, asset: Omit<PortfolioAsset, 'id' | 'portfolio_id' | 'school_id' | 'created_at' | 'updated_at'>): Promise<PortfolioAsset> {
    const { data, error } = await this.supabase
      .from(this.ASSETS_TABLE)
      .insert({ ...asset, portfolio_id: portfolioId, school_id: schoolId })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAsset(schoolId: string, assetId: string, updates: Partial<PortfolioAsset>): Promise<PortfolioAsset> {
    const { data, error } = await this.supabase
      .from(this.ASSETS_TABLE)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', assetId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeAsset(schoolId: string, assetId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.ASSETS_TABLE)
      .delete()
      .eq('school_id', schoolId)
      .eq('id', assetId);

    if (error) throw error;
  }

  async getAssets(schoolId: string, portfolioId: string): Promise<PortfolioAsset[]> {
    const { data, error } = await this.supabase
      .from(this.ASSETS_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('portfolio_id', portfolioId)
      .order('weight', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<Portfolio[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getPerformance(schoolId: string, portfolioId: string): Promise<{ totalReturn: number; returnPercentage: number; sharpeRatio: number }> {
    const portfolio = await this.getById(schoolId, portfolioId);
    if (!portfolio) throw new Error('Portfolio not found');

    const totalReturn = portfolio.realized_gain_loss + portfolio.unrealized_gain_loss;
    const returnPercentage = portfolio.invested_amount > 0 ? (totalReturn / portfolio.invested_amount) * 100 : 0;
    const sharpeRatio = returnPercentage / 10;

    return { totalReturn, returnPercentage, sharpeRatio };
  }

  async rebalance(schoolId: string, portfolioId: string): Promise<void> {
    const assets = await this.getAssets(schoolId, portfolioId);
    const totalValue = assets.reduce((sum, a) => sum + a.current_price * a.quantity, 0);

    for (const asset of assets) {
      const newWeight = totalValue > 0 ? ((asset.current_price * asset.quantity) / totalValue) * 100 : 0;
      await this.updateAsset(schoolId, asset.id, { weight: newWeight });
    }
  }
}
