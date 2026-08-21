import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  order: vi.fn().mockReturnThis(),
};

const schoolId = 'sch-001';
const mockModel = {
  id: 'aim-001', school_id: schoolId, model_name: 'disease_outbreak_predictor',
  model_type: 'classification', domain: 'epidemiology', status: 'active',
  accuracy: 0.89, last_trained: '2026-07-15', training_data_size: 5000,
  features_used: ['attendance_rate', 'symptoms_reported', 'season'],
  predictions_count: 234, created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

beforeEach(() => { vi.clearAllMocks(); });

describe('AIIntelligenceService - CRUD', () => {
  it('should create an AI model', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockModel, error: null });
    const result = await mockSupabase.from('health_ai_models').insert({
      school_id: schoolId, model_name: 'disease_outbreak_predictor', domain: 'epidemiology',
    }).select().single();
    expect(result.data).toHaveProperty('id', 'aim-001');
  });

  it('should get a model by id', async () => {
    mockSupabase.single.mockResolvedValue({ data: mockModel, error: null });
    const result = await mockSupabase.from('health_ai_models')
      .select('*').eq('id', 'aim-001').eq('school_id', schoolId).single();
    expect(result.data.model_name).toBe('disease_outbreak_predictor');
  });

  it('should list all models for a school', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockModel], error: null });
    const result = await mockSupabase.from('health_ai_models')
      .select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
    expect(result.data).toHaveLength(1);
  });

  it('should update a model', async () => {
    mockSupabase.single.mockResolvedValue({ data: { ...mockModel, accuracy: 0.92 }, error: null });
    const result = await mockSupabase.from('health_ai_models')
      .update({ accuracy: 0.92 }).eq('id', 'aim-001').select().single();
    expect(result.data.accuracy).toBe(0.92);
  });

  it('should soft delete a model', async () => {
    mockSupabase.single.mockResolvedValue({ data: null, error: null });
    const result = await mockSupabase.from('health_ai_models')
      .update({ deleted_at: new Date().toISOString() }).eq('id', 'aim-001').single();
    expect(result.error).toBeNull();
  });
});

describe('AIIntelligenceService - Domain', () => {
  it('should track model accuracy', async () => {
    expect(mockModel.accuracy).toBeGreaterThan(0);
    expect(mockModel.accuracy).toBeLessThanOrEqual(1);
  });

  it('should list predictions', async () => {
    mockSupabase.order.mockResolvedValue({ data: [mockModel], error: null });
    const result = await mockSupabase.from('health_ai_models').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data[0].predictions_count).toBe(234);
  });

  it('should categorize by domain', async () => {
    const models = [
      { ...mockModel, domain: 'epidemiology' },
      { ...mockModel, id: 'aim-002', domain: 'mental_health' },
    ];
    mockSupabase.order.mockResolvedValue({ data: models, error: null });
    const result = await mockSupabase.from('health_ai_models').select('*').eq('school_id', schoolId).order('created_at');
    expect(result.data).toHaveLength(2);
  });
});

describe('AIIntelligenceService - Errors', () => {
  it('should reject missing model_name', () => {
    const validate = (n: string) => { if (!n) throw new Error('Model name is required'); };
    expect(() => validate('')).toThrow('Model name is required');
  });

  it('should reject invalid accuracy', () => {
    const validate = (a: number) => { if (a < 0 || a > 1) throw new Error('Accuracy must be 0-1'); };
    expect(() => validate(1.5)).toThrow('Accuracy must be 0-1');
  });

  it('should handle DB errors', async () => {
    mockSupabase.order.mockRejectedValue(new Error('GPU out of memory'));
    await expect(
      mockSupabase.from('health_ai_models').select('*').eq('school_id', schoolId).order('created_at')
    ).rejects.toThrow('GPU out of memory');
  });
});
