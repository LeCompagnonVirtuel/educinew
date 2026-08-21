import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface Comparison {
  id: string;
  school_id: string;
  comparison_code: string;
  name: string;
  description: string;
  product_ids: string[];
  criteria: ComparisonCriteria[];
  results?: ComparisonResult;
  status: 'draft' | 'completed' | 'archived';
  created_by: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ComparisonCriteria {
  name: string;
  weight: number;
  type: 'numeric' | 'boolean' | 'rating' | 'text';
  description: string;
}

export interface ComparisonResult {
  scores: ProductScore[];
  recommendation: string;
  analysis: string;
}

export interface ProductScore {
  product_id: string;
  product_name: string;
  total_score: number;
  criteria_scores: Record<number, number>;
  rank: number;
  pros: string[];
  cons: string[];
}

export interface CreateComparison {
  name: string;
  description: string;
  product_ids: string[];
  criteria: ComparisonCriteria[];
  created_by: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateComparison {
  name?: string;
  description?: string;
  product_ids?: string[];
  criteria?: ComparisonCriteria[];
  results?: ComparisonResult;
  status?: string;
  metadata?: Record<string, unknown>;
}

export class ComparisonService {
  private readonly TABLE = 'comparisons';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<Comparison[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<Comparison | null> {
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

  async create(schoolId: string, comparison: CreateComparison): Promise<Comparison> {
    const comparisonCode = `CMP-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        comparison_code: comparisonCode,
        ...comparison,
        status: 'draft',
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, comparison: UpdateComparison): Promise<Comparison> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...comparison, updated_at: new Date().toISOString() })
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

  async runComparison(schoolId: string, id: string, scores: Record<string, Record<string, number>>): Promise<Comparison> {
    const comparison = await this.getById(schoolId, id);
    if (!comparison) throw new Error('Comparison not found');

    const productScores: ProductScore[] = comparison.product_ids.map((productId) => {
      const productScores = scores[productId] || {};
      let totalScore = 0;

      comparison.criteria.forEach((criterion, index) => {
        const score = productScores[criterion.name] || 0;
        totalScore += score * criterion.weight;
      });

      return {
        product_id: productId,
        product_name: `Product ${productId}`,
        total_score: totalScore,
        criteria_scores: productScores,
        rank: 0,
        pros: [],
        cons: [],
      };
    });

    productScores.sort((a, b) => b.total_score - a.total_score);
    productScores.forEach((score, index) => {
      score.rank = index + 1;
    });

    const results: ComparisonResult = {
      scores: productScores,
      recommendation: `Based on the comparison, ${productScores[0]?.product_name || 'the top product'} is recommended.`,
      analysis: `Compared ${comparison.product_ids.length} products across ${comparison.criteria.length} criteria.`,
    };

    return this.update(schoolId, id, {
      results,
      status: 'completed',
    });
  }

  async getCompleted(schoolId: string): Promise<Comparison[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getDrafts(schoolId: string): Promise<Comparison[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'draft')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByCreator(schoolId: string, createdBy: string): Promise<Comparison[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('created_by', createdBy)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getStats(schoolId: string): Promise<{ total: number; draft: number; completed: number; archived: number }> {
    const comparisons = await this.getAll(schoolId);
    return {
      total: comparisons.length,
      draft: comparisons.filter((c) => c.status === 'draft').length,
      completed: comparisons.filter((c) => c.status === 'completed').length,
      archived: comparisons.filter((c) => c.status === 'archived').length,
    };
  }

  async addProduct(schoolId: string, id: string, productId: string): Promise<Comparison> {
    const comparison = await this.getById(schoolId, id);
    if (!comparison) throw new Error('Comparison not found');

    if (comparison.product_ids.includes(productId)) {
      throw new Error('Product already in comparison');
    }

    return this.update(schoolId, id, {
      product_ids: [...comparison.product_ids, productId],
    });
  }

  async removeProduct(schoolId: string, id: string, productId: string): Promise<Comparison> {
    const comparison = await this.getById(schoolId, id);
    if (!comparison) throw new Error('Comparison not found');

    return this.update(schoolId, id, {
      product_ids: comparison.product_ids.filter((pid) => pid !== productId),
    });
  }

  async addCriteria(schoolId: string, id: string, criteria: ComparisonCriteria): Promise<Comparison> {
    const comparison = await this.getById(schoolId, id);
    if (!comparison) throw new Error('Comparison not found');

    return this.update(schoolId, id, {
      criteria: [...comparison.criteria, criteria],
    });
  }

  async removeCriteria(schoolId: string, id: string, criteriaName: string): Promise<Comparison> {
    const comparison = await this.getById(schoolId, id);
    if (!comparison) throw new Error('Comparison not found');

    return this.update(schoolId, id, {
      criteria: comparison.criteria.filter((c) => c.name !== criteriaName),
    });
  }
}
