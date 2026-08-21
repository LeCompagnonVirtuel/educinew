import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPredictiveAiService } from '../../src/features/analytics/services/predictive-ai.service';

const mockRepository = {
  runPredictiveModel: vi.fn(),
  getPredictions: vi.fn(),
};

describe('PredictiveAiService', () => {
  let service: ReturnType<typeof createPredictiveAiService>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = createPredictiveAiService(mockRepository as any);
  });

  it('should call runPredictiveModel with model type and params', async () => {
    const params = { schoolId: 'sch-1' };
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'dropout', predictions: [], accuracy: 0.85 });
    const result = await service.runPredictiveModel('dropout', params);
    expect(mockRepository.runPredictiveModel).toHaveBeenCalledWith('dropout', params);
    expect(result).toHaveProperty('accuracy');
  });

  it('should call runPredictiveModel without params', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'revenue_forecast', predictions: [] });
    await service.runPredictiveModel('revenue_forecast');
    expect(mockRepository.runPredictiveModel).toHaveBeenCalledWith('revenue_forecast', undefined);
  });

  it('should propagate errors from runPredictiveModel', async () => {
    mockRepository.runPredictiveModel.mockRejectedValue(new Error('Model error'));
    await expect(service.runPredictiveModel('dropout')).rejects.toThrow('Model error');
  });

  it('should call getPredictions with model type and filters', async () => {
    const filters = { schoolId: 'sch-1', riskLevel: 'high' };
    mockRepository.getPredictions.mockResolvedValue([{ studentId: 'stu-1', riskScore: 0.85 }]);
    const result = await service.getPredictions('dropout', filters);
    expect(mockRepository.getPredictions).toHaveBeenCalledWith('dropout', filters);
    expect(result).toHaveLength(1);
  });

  it('should call getPredictions without filters', async () => {
    mockRepository.getPredictions.mockResolvedValue([]);
    await service.getPredictions('payment_default');
    expect(mockRepository.getPredictions).toHaveBeenCalledWith('payment_default', undefined);
  });

  it('should propagate errors from getPredictions', async () => {
    mockRepository.getPredictions.mockRejectedValue(new Error('Predictions error'));
    await expect(service.getPredictions('academic_risk')).rejects.toThrow('Predictions error');
  });

  it('should run dropout model successfully', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'dropout', predictions: [{ id: 'p1', score: 0.9 }], accuracy: 0.88, confidence: 0.82 });
    const result = await service.runPredictiveModel('dropout', { schoolId: 'sch-1' });
    expect(result.model).toBe('dropout');
    expect(result.accuracy).toBe(0.88);
  });

  it('should run payment_default model successfully', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'payment_default', predictions: [], accuracy: 0.75 });
    const result = await service.runPredictiveModel('payment_default');
    expect(result.model).toBe('payment_default');
  });

  it('should run academic_risk model successfully', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'academic_risk', predictions: [], accuracy: 0.82 });
    const result = await service.runPredictiveModel('academic_risk');
    expect(result.model).toBe('academic_risk');
  });

  it('should run revenue_forecast model successfully', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'revenue_forecast', predictions: [], accuracy: 0.90 });
    const result = await service.runPredictiveModel('revenue_forecast');
    expect(result.model).toBe('revenue_forecast');
  });

  it('should run enrollment_forecast model successfully', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'enrollment_forecast', predictions: [], accuracy: 0.87 });
    const result = await service.runPredictiveModel('enrollment_forecast');
    expect(result.model).toBe('enrollment_forecast');
  });

  it('should run staff_turnover model successfully', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'staff_turnover', predictions: [], accuracy: 0.80 });
    const result = await service.runPredictiveModel('staff_turnover');
    expect(result.model).toBe('staff_turnover');
  });

  it('should return predictions with factors', async () => {
    mockRepository.getPredictions.mockResolvedValue([{ id: 'p1', score: 0.75, factors: [{ name: 'attendance', weight: 0.4 }] }]);
    const result = await service.getPredictions('dropout', { schoolId: 'sch-1' });
    expect(result[0].factors).toHaveLength(1);
  });

  it('should handle empty predictions list', async () => {
    mockRepository.getPredictions.mockResolvedValue([]);
    const result = await service.getPredictions('class_overload');
    expect(result).toEqual([]);
  });

  it('should handle predictions with risk levels', async () => {
    mockRepository.getPredictions.mockResolvedValue([{ id: 'p1', riskLevel: 'critical', score: 0.95 }]);
    const result = await service.getPredictions('academic_risk');
    expect(result[0].riskLevel).toBe('critical');
  });

  it('should run demand_forecast model successfully', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'demand_forecast', predictions: [], accuracy: 0.83 });
    const result = await service.runPredictiveModel('demand_forecast');
    expect(result.model).toBe('demand_forecast');
  });

  it('should handle model with recommendations', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'dropout', predictions: [], accuracy: 0.88, recommendations: ['Increase attendance monitoring'] });
    const result = await service.runPredictiveModel('dropout');
    expect(result.recommendations).toHaveLength(1);
  });

  it('should handle predictions with multiple risk scores', async () => {
    mockRepository.getPredictions.mockResolvedValue([
      { id: 'p1', score: 0.9, riskLevel: 'critical' },
      { id: 'p2', score: 0.5, riskLevel: 'medium' },
      { id: 'p3', score: 0.2, riskLevel: 'low' },
    ]);
    const result = await service.getPredictions('dropout');
    expect(result).toHaveLength(3);
  });

  it('should filter predictions by risk level', async () => {
    const filters = { riskLevel: 'high' };
    mockRepository.getPredictions.mockResolvedValue([{ id: 'p1', score: 0.8, riskLevel: 'high' }]);
    const result = await service.getPredictions('academic_risk', filters);
    expect(mockRepository.getPredictions).toHaveBeenCalledWith('academic_risk', filters);
    expect(result[0].riskLevel).toBe('high');
  });

  it('should handle model with confidence metric', async () => {
    mockRepository.runPredictiveModel.mockResolvedValue({ model: 'staff_turnover', predictions: [], accuracy: 0.78, confidence: 0.75 });
    const result = await service.runPredictiveModel('staff_turnover');
    expect(result.confidence).toBe(0.75);
  });

  it('should handle predictions with pagination params', async () => {
    const filters = { page: 1, limit: 10 };
    mockRepository.getPredictions.mockResolvedValue([]);
    await service.getPredictions('revenue_forecast', filters);
    expect(mockRepository.getPredictions).toHaveBeenCalledWith('revenue_forecast', filters);
  });
});
