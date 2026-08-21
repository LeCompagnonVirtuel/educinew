import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThreatDetectionService } from '../threat-detection-service';
import { GestcrpNotFoundError, GestcrpValidationError, GestcrpThreatFeedError } from '@educi/errors';

const mockIndicatorsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockFeedsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAnalysesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockFeedMatchesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockThreatRepo = {
  indicators: mockIndicatorsRepo,
  feeds: mockFeedsRepo,
  analyses: mockAnalysesRepo,
  feedMatches: mockFeedMatchesRepo,
  findByCategory: vi.fn(),
  findActiveFeeds: vi.fn(),
};

const mockIndicator = {
  id: 'ind-001',
  school_id: 'sch-001',
  type: 'IP',
  value: '10.0.0.1',
  confidence: 90,
  severity: 'HIGH',
  category: 'NETWORK',
  source: 'ThreatFeed',
  tags: ['malware'],
  description: 'Known C2 server',
  first_seen: new Date().toISOString(),
  last_seen: new Date().toISOString(),
  mitre_attack_ids: ['T1071'],
  associated_threats: [],
};

const mockFeed = {
  id: 'feed-001',
  school_id: 'sch-001',
  name: 'Abuse.ch Feed',
  url: 'https://urlhaus.abuse.ch/downloads/csv/',
  feed_type: 'CSV' as const,
  format: 'csv',
  refresh_interval_minutes: 60,
  enabled: true,
  indicators_count: 100,
  reliability: 80,
  created_at: new Date().toISOString(),
};

let service: ThreatDetectionService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ThreatDetectionService(mockThreatRepo as never);
});

describe('ThreatDetectionService', () => {
  describe('listIndicators', () => {
    it('should list indicators for a school', async () => {
      mockIndicatorsRepo.findAll.mockResolvedValue({ data: [mockIndicator], total: 1 });

      const result = await service.listIndicators('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listIndicators('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getIndicator', () => {
    it('should retrieve an indicator by id', async () => {
      mockIndicatorsRepo.exists.mockResolvedValue(true);
      mockIndicatorsRepo.findById.mockResolvedValue(mockIndicator);

      const result = await service.getIndicator('sch-001', 'ind-001');

      expect(result).toEqual(mockIndicator);
    });

    it('should throw if indicator not found', async () => {
      mockIndicatorsRepo.exists.mockResolvedValue(false);

      await expect(service.getIndicator('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('getIndicatorsByCategory', () => {
    it('should filter indicators by category', async () => {
      mockThreatRepo.findByCategory.mockResolvedValue({ data: [mockIndicator], total: 1 });

      const result = await service.getIndicatorsByCategory('sch-001', 'NETWORK');

      expect(result.data).toHaveLength(1);
    });

    it('should reject empty category', async () => {
      await expect(service.getIndicatorsByCategory('sch-001', '')).rejects.toThrow();
    });
  });

  describe('createIndicator', () => {
    it('should create an indicator successfully', async () => {
      mockIndicatorsRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockIndicatorsRepo.create.mockResolvedValue(mockIndicator);

      const result = await service.createIndicator('sch-001', {
        type: 'IP',
        value: '10.0.0.1',
        confidence: 90,
        severity: 'HIGH',
        category: 'MALWARE',
        source: 'ThreatFeed',
        description: 'Known C2 server',
      });

      expect(result).toEqual(mockIndicator);
    });

    it('should reject duplicate indicator', async () => {
      mockIndicatorsRepo.findAll.mockResolvedValue({ data: [mockIndicator], total: 1 });

      await expect(service.createIndicator('sch-001', {
        type: 'IP',
        value: '10.0.0.1',
        confidence: 90,
        severity: 'HIGH',
        category: 'MALWARE',
        source: 'ThreatFeed',
        description: 'test',
      })).rejects.toThrow();
    });

    it('should reject invalid indicator type', async () => {
      await expect(service.createIndicator('sch-001', {
        type: 'INVALID',
        value: 'test',
        confidence: 90,
        severity: 'HIGH',
        category: 'MALWARE',
        source: 'ThreatFeed',
        description: 'test',
      })).rejects.toThrow(GestcrpValidationError);
    });

    it('should reject out of range confidence', async () => {
      await expect(service.createIndicator('sch-001', {
        type: 'IP',
        value: '10.0.0.1',
        confidence: 150,
        severity: 'HIGH',
        category: 'MALWARE',
        source: 'ThreatFeed',
        description: 'test',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updateIndicator', () => {
    it('should update an indicator', async () => {
      mockIndicatorsRepo.exists.mockResolvedValue(true);
      mockIndicatorsRepo.findById.mockResolvedValue(mockIndicator);
      mockIndicatorsRepo.update.mockResolvedValue({ ...mockIndicator, confidence: 95 });

      const result = await service.updateIndicator('sch-001', 'ind-001', { confidence: 95 });

      expect(result.confidence).toBe(95);
    });
  });

  describe('deleteIndicator', () => {
    it('should soft delete an indicator', async () => {
      mockIndicatorsRepo.exists.mockResolvedValue(true);
      mockIndicatorsRepo.findById.mockResolvedValue(mockIndicator);
      mockIndicatorsRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteIndicator('sch-001', 'ind-001');

      expect(mockIndicatorsRepo.softDelete).toHaveBeenCalledWith('ind-001', 'sch-001');
    });
  });

  describe('expireIndicator', () => {
    it('should set expiry on an indicator', async () => {
      mockIndicatorsRepo.exists.mockResolvedValue(true);
      mockIndicatorsRepo.findById.mockResolvedValue(mockIndicator);
      mockIndicatorsRepo.update.mockResolvedValue({ ...mockIndicator, expiry: new Date().toISOString() });

      const result = await service.expireIndicator('sch-001', 'ind-001');

      expect(result.expiry).toBeDefined();
    });
  });

  describe('createFeed', () => {
    it('should create a feed successfully', async () => {
      mockFeedsRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockFeedsRepo.create.mockResolvedValue(mockFeed);

      const result = await service.createFeed('sch-001', {
        name: 'Abuse.ch Feed',
        url: 'https://urlhaus.abuse.ch/downloads/csv/',
        feed_type: 'CSV',
        format: 'csv',
        refresh_interval_minutes: 60,
      });

      expect(result).toEqual(mockFeed);
    });

    it('should reject duplicate feed name', async () => {
      mockFeedsRepo.findAll.mockResolvedValue({ data: [mockFeed], total: 1 });

      await expect(service.createFeed('sch-001', {
        name: 'Abuse.ch Feed',
        url: 'https://example.com',
        feed_type: 'CSV',
        format: 'csv',
        refresh_interval_minutes: 60,
      })).rejects.toThrow();
    });

    it('should reject invalid feed_type', async () => {
      await expect(service.createFeed('sch-001', {
        name: 'Test Feed',
        url: 'https://example.com',
        feed_type: 'INVALID',
        format: 'csv',
        refresh_interval_minutes: 60,
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('toggleFeed', () => {
    it('should toggle feed enabled state', async () => {
      mockFeedsRepo.exists.mockResolvedValue(true);
      mockFeedsRepo.findById.mockResolvedValue(mockFeed);
      mockFeedsRepo.update.mockResolvedValue({ ...mockFeed, enabled: false });

      const result = await service.toggleFeed('sch-001', 'feed-001', false);

      expect(result.enabled).toBe(false);
    });
  });

  describe('deleteFeed', () => {
    it('should soft delete a feed', async () => {
      mockFeedsRepo.exists.mockResolvedValue(true);
      mockFeedsRepo.findById.mockResolvedValue(mockFeed);
      mockFeedsRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteFeed('sch-001', 'feed-001');

      expect(mockFeedsRepo.softDelete).toHaveBeenCalledWith('feed-001', 'sch-001');
    });
  });

  describe('createFeedMatch', () => {
    it('should create a feed match', async () => {
      const mockFeedMatch = {
        id: 'match-001',
        school_id: 'sch-001',
        feed_id: 'feed-001',
        indicator_id: 'ind-001',
        matched_event: 'event-001',
        confidence: 90,
        acknowledged: false,
      };
      mockFeedsRepo.exists.mockResolvedValue(true);
      mockIndicatorsRepo.exists.mockResolvedValue(true);
      mockFeedMatchesRepo.create.mockResolvedValue(mockFeedMatch);

      const result = await service.createFeedMatch('sch-001', {
        feed_id: 'feed-001',
        indicator_id: 'ind-001',
        matched_event: 'event-001',
        confidence: 90,
      });

      expect(result).toEqual(mockFeedMatch);
    });

    it('should reject non-existent feed', async () => {
      mockFeedsRepo.exists.mockResolvedValue(false);

      await expect(service.createFeedMatch('sch-001', {
        feed_id: 'nonexistent',
        indicator_id: 'ind-001',
        matched_event: 'event-001',
        confidence: 90,
      })).rejects.toThrow(GestcrpThreatFeedError);
    });
  });

  describe('acknowledgeFeedMatch', () => {
    it('should acknowledge a feed match', async () => {
      const mockFeedMatch = {
        id: 'match-001',
        school_id: 'sch-001',
        acknowledged: false,
      };
      mockFeedMatchesRepo.exists.mockResolvedValue(true);
      mockFeedMatchesRepo.findById.mockResolvedValue(mockFeedMatch);
      mockFeedMatchesRepo.update.mockResolvedValue({ ...mockFeedMatch, acknowledged: true });

      const result = await service.acknowledgeFeedMatch('sch-001', 'match-001', 'user-001');

      expect(result.acknowledged).toBe(true);
    });

    it('should reject already acknowledged match', async () => {
      mockFeedMatchesRepo.exists.mockResolvedValue(true);
      mockFeedMatchesRepo.findById.mockResolvedValue({ id: 'match-001', acknowledged: true });

      await expect(service.acknowledgeFeedMatch('sch-001', 'match-001', 'user-001')).rejects.toThrow();
    });
  });

  describe('getIndicatorStats', () => {
    it('should return indicator statistics', async () => {
      mockIndicatorsRepo.findAll.mockResolvedValue({
        data: [mockIndicator, { ...mockIndicator, id: 'ind-002', type: 'DOMAIN', severity: 'LOW', category: 'WEB' }],
        total: 2,
      });

      const result = await service.getIndicatorStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.byType).toBeDefined();
      expect(result.bySeverity).toBeDefined();
      expect(result.byCategory).toBeDefined();
      expect(result.averageConfidence).toBeDefined();
    });
  });

  describe('getFeedStats', () => {
    it('should return feed statistics', async () => {
      mockFeedsRepo.findAll.mockResolvedValue({
        data: [mockFeed],
        total: 1,
      });

      const result = await service.getFeedStats('sch-001');

      expect(result.total).toBe(1);
      expect(result.active).toBeDefined();
      expect(result.totalIndicators).toBeDefined();
      expect(result.averageReliability).toBeDefined();
    });
  });
});
