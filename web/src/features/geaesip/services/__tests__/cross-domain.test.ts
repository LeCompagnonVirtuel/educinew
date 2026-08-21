import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipCrossDomainService } from '../cross-domain.service';

const mockEventRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockCorrelationRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockImpactChainRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockSystemicRiskRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockDependencyRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const EVENT_ID = '660e8400-e29b-41d4-a716-446655440001';
const CORRELATION_ID = '770e8400-e29b-41d4-a716-446655440002';
const IMPACT_ID = '880e8400-e29b-41d4-a716-446655440003';
const RISK_ID = '990e8400-e29b-41d4-a716-446655440004';
const DEP_ID = 'aa0e8400-e29b-41d4-a716-446655440005';

const mockEvent = {
  id: EVENT_ID,
  school_id: SCHOOL_ID,
  name: 'Cross-domain event',
  source: 'ATTENDANCE',
  target: 'GRADES',
  severity: 'MEDIUM',
  timestamp: new Date().toISOString(),
};

const mockCorrelation = {
  id: CORRELATION_ID,
  school_id: SCHOOL_ID,
  dimensionA: 'attendance',
  dimensionB: 'performance',
  coefficient: 0.85,
  discoveredAt: new Date().toISOString(),
};

const mockImpactChain = {
  id: IMPACT_ID,
  school_id: SCHOOL_ID,
  trigger: 'Teacher shortage',
  chain: ['Class cancel', 'Grade drop'],
  severity: 'HIGH',
  detectedAt: new Date().toISOString(),
};

const mockSystemicRisk = {
  id: RISK_ID,
  school_id: SCHOOL_ID,
  name: 'Systemic enrollment decline',
  probability: 0.3,
  impact: 9.5,
  lastAssessedAt: new Date().toISOString(),
};

const mockDependency = {
  id: DEP_ID,
  school_id: SCHOOL_ID,
  nodes: ['A', 'B', 'C'],
  edges: [['A', 'B'], ['B', 'C']],
  lastComputedAt: new Date().toISOString(),
};

let service: GeaesipCrossDomainService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipCrossDomainService(
    mockEventRepo as never,
    mockCorrelationRepo as never,
    mockImpactChainRepo as never,
    mockSystemicRiskRepo as never,
    mockDependencyRepo as never,
  );
});

describe('GeaesipCrossDomainService', () => {
  describe('listEvents', () => {
    it('should list events for a school', async () => {
      mockEventRepo.findAllBySchool.mockResolvedValue([mockEvent]);

      const result = await service.listEvents(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listEvents('')).rejects.toThrow();
    });
  });

  describe('getEvent', () => {
    it('should retrieve an event by id', async () => {
      mockEventRepo.findById.mockResolvedValue(mockEvent);

      const result = await service.getEvent(SCHOOL_ID, EVENT_ID);

      expect(result).toEqual(mockEvent);
    });

    it('should throw if event not found', async () => {
      mockEventRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getEvent(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      mockEventRepo.create.mockResolvedValue(mockEvent);

      const result = await service.createEvent(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Cross-domain event',
        source: 'ATTENDANCE',
        target: 'GRADES',
        severity: 'MEDIUM',
      } as never);

      expect(result).toEqual(mockEvent);
    });
  });

  describe('listCorrelations', () => {
    it('should list correlations', async () => {
      mockCorrelationRepo.findAllBySchool.mockResolvedValue([mockCorrelation]);

      const result = await service.listCorrelations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getCorrelation', () => {
    it('should retrieve a correlation by id', async () => {
      mockCorrelationRepo.findById.mockResolvedValue(mockCorrelation);

      const result = await service.getCorrelation(SCHOOL_ID, CORRELATION_ID);

      expect(result).toEqual(mockCorrelation);
    });
  });

  describe('listImpactChains', () => {
    it('should list impact chains', async () => {
      mockImpactChainRepo.findAllBySchool.mockResolvedValue([mockImpactChain]);

      const result = await service.listImpactChains(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getImpactChain', () => {
    it('should retrieve an impact chain by id', async () => {
      mockImpactChainRepo.findById.mockResolvedValue(mockImpactChain);

      const result = await service.getImpactChain(SCHOOL_ID, IMPACT_ID);

      expect(result).toEqual(mockImpactChain);
    });
  });

  describe('listSystemicRisks', () => {
    it('should list systemic risks', async () => {
      mockSystemicRiskRepo.findAllBySchool.mockResolvedValue([mockSystemicRisk]);

      const result = await service.listSystemicRisks(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getSystemicRisk', () => {
    it('should retrieve a systemic risk by id', async () => {
      mockSystemicRiskRepo.findById.mockResolvedValue(mockSystemicRisk);

      const result = await service.getSystemicRisk(SCHOOL_ID, RISK_ID);

      expect(result).toEqual(mockSystemicRisk);
    });
  });

  describe('listDependencyGraphs', () => {
    it('should list dependency graphs', async () => {
      mockDependencyRepo.findAllBySchool.mockResolvedValue([mockDependency]);

      const result = await service.listDependencyGraphs(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getDependencyGraph', () => {
    it('should retrieve a dependency graph by id', async () => {
      mockDependencyRepo.findById.mockResolvedValue(mockDependency);

      const result = await service.getDependencyGraph(SCHOOL_ID, DEP_ID);

      expect(result).toEqual(mockDependency);
    });
  });

  describe('getCrossDomainStats', () => {
    it('should return stats', async () => {
      mockEventRepo.findAllBySchool.mockResolvedValue([mockEvent]);
      mockCorrelationRepo.findAllBySchool.mockResolvedValue([]);
      mockImpactChainRepo.findAllBySchool.mockResolvedValue([mockImpactChain]);
      mockSystemicRiskRepo.findAllBySchool.mockResolvedValue([]);
      mockDependencyRepo.findAllBySchool.mockResolvedValue([mockDependency]);

      const result = await service.getCrossDomainStats(SCHOOL_ID);

      expect(result.totalEvents).toBe(1);
      expect(result.totalCorrelations).toBe(0);
      expect(result.totalImpactChains).toBe(1);
      expect(result.totalSystemicRisks).toBe(0);
      expect(result.totalDependencyGraphs).toBe(1);
    });
  });
});
