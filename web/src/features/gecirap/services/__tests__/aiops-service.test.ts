import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AIOpsService } from '../aiops-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockAgentRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
  findByAgentType: vi.fn(),
};

const mockEventRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByEventType: vi.fn(),
  findBySeverity: vi.fn(),
  findUnresolved: vi.fn(),
};

const mockCorrelationRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findUnresolved: vi.fn(),
  findByStatus: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const AGENT_ID = '660e8400-e29b-41d4-a716-446655440001';
const EVENT_ID = '770e8400-e29b-41d4-a716-446655440002';
const CORR_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockAgent = {
  id: AGENT_ID,
  school_id: SCHOOL_ID,
  type: 'MONITORING',
  name: 'cpu-monitor',
  status: 'active',
  capabilities: ['cpu_tracking', 'alerting'],
  config: {},
  last_active_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockEvent = {
  id: EVENT_ID,
  school_id: SCHOOL_ID,
  source: 'monitoring-agent',
  type: 'CPU_HIGH',
  severity: 'WARNING',
  message: 'CPU usage above 90%',
  metadata: {},
  correlated: [],
  timestamp: new Date().toISOString(),
};

const mockCorrelation = {
  id: CORR_ID,
  school_id: SCHOOL_ID,
  events: [EVENT_ID],
  pattern: 'high_cpu_correlated',
  confidence: 0.85,
  rootCause: null,
  impact: {},
  created_at: new Date().toISOString(),
};

let service: AIOpsService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new AIOpsService(
    mockAgentRepo as never,
    mockEventRepo as never,
    mockCorrelationRepo as never,
  );
});

describe('AIOpsService', () => {
  describe('listAgents', () => {
    it('should list agents for a school', async () => {
      mockAgentRepo.findAll.mockResolvedValue({ data: [mockAgent], total: 1 });

      const result = await service.listAgents(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listAgents('')).rejects.toThrow();
    });
  });

  describe('getAgent', () => {
    it('should retrieve an agent by id', async () => {
      mockAgentRepo.exists.mockResolvedValue(true);
      mockAgentRepo.findById.mockResolvedValue(mockAgent);

      const result = await service.getAgent(SCHOOL_ID, AGENT_ID);

      expect(result).toEqual(mockAgent);
    });

    it('should throw if agent not found', async () => {
      mockAgentRepo.exists.mockResolvedValue(false);

      await expect(service.getAgent(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createAgent', () => {
    it('should create an agent successfully', async () => {
      mockAgentRepo.create.mockResolvedValue(mockAgent);

      const result = await service.createAgent(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'cpu-monitor',
        type: 'MONITORING',
        agent_type: 'MONITORING',
        capabilities: ['cpu_tracking', 'alerting'],
      });

      expect(result).toEqual(mockAgent);
    });
  });

  describe('updateAgent', () => {
    it('should update an agent', async () => {
      mockAgentRepo.exists.mockResolvedValue(true);
      mockAgentRepo.findById.mockResolvedValue(mockAgent);
      mockAgentRepo.update.mockResolvedValue({ ...mockAgent, name: 'updated-agent' });

      const result = await service.updateAgent(SCHOOL_ID, AGENT_ID, { name: 'updated-agent' });

      expect(result.name).toBe('updated-agent');
    });
  });

  describe('deleteAgent', () => {
    it('should soft delete an agent', async () => {
      mockAgentRepo.exists.mockResolvedValue(true);
      mockAgentRepo.findById.mockResolvedValue(mockAgent);
      mockAgentRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteAgent(SCHOOL_ID, AGENT_ID);

      expect(mockAgentRepo.softDelete).toHaveBeenCalledWith(AGENT_ID, SCHOOL_ID);
    });
  });

  describe('listActiveAgents', () => {
    it('should list active agents', async () => {
      mockAgentRepo.findActive.mockResolvedValue([mockAgent]);

      const result = await service.listActiveAgents(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createEvent', () => {
    it('should create an infrastructure event', async () => {
      mockEventRepo.create.mockResolvedValue(mockEvent);

      const result = await service.createEvent(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        source: 'monitoring-agent',
        type: 'CPU_HIGH',
        event_type: 'CPU_HIGH',
        severity: 'WARNING',
        message: 'CPU usage above 90%',
      });

      expect(result).toEqual(mockEvent);
    });
  });

  describe('getUnresolvedEvents', () => {
    it('should return unresolved events', async () => {
      mockEventRepo.findUnresolved.mockResolvedValue([mockEvent]);

      const result = await service.getUnresolvedEvents(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createCorrelation', () => {
    it('should create an incident correlation', async () => {
      mockCorrelationRepo.create.mockResolvedValue(mockCorrelation);

      const result = await service.createCorrelation(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        incident_name: 'High CPU Incident',
        event_ids: [EVENT_ID],
        events: [EVENT_ID],
        correlation_score: 0.85,
        pattern: 'high_cpu_correlated',
        confidence: 0.85,
        status: 'INVESTIGATING',
      });

      expect(result).toEqual(mockCorrelation);
    });
  });

  describe('getUnresolvedCorrelations', () => {
    it('should return unresolved correlations', async () => {
      mockCorrelationRepo.findUnresolved.mockResolvedValue([mockCorrelation]);

      const result = await service.getUnresolvedCorrelations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getAIOpsOverview', () => {
    it('should return aiops overview stats', async () => {
      mockAgentRepo.findAll.mockResolvedValue({ data: [mockAgent], total: 1 });
      mockEventRepo.findAll.mockResolvedValue({ data: [mockEvent], total: 1 });
      mockEventRepo.findUnresolved.mockResolvedValue([mockEvent]);
      mockCorrelationRepo.findAll.mockResolvedValue({ data: [mockCorrelation], total: 1 });
      mockCorrelationRepo.findUnresolved.mockResolvedValue([mockCorrelation]);

      const result = await service.getAIOpsOverview(SCHOOL_ID);

      expect(result.totalAgents).toBe(1);
      expect(result.activeAgents).toBe(1);
      expect(result.totalEvents).toBe(1);
      expect(result.unresolvedEvents).toBe(1);
      expect(result.totalCorrelations).toBe(1);
      expect(result.unresolvedCorrelations).toBe(1);
    });
  });
});
