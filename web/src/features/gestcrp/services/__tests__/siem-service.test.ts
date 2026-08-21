import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SIEMService } from '../siem-service';
import { GestcrpNotFoundError, GestcrpValidationError } from '@educi/errors';

const mockEventsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockRulesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockCorrelationsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockSIEMRepo = {
  events: mockEventsRepo,
  rules: mockRulesRepo,
  correlations: mockCorrelationsRepo,
  findRecentEvents: vi.fn(),
  findBySourceType: vi.fn(),
  findActiveRules: vi.fn(),
};

const mockEvent = {
  id: 'evt-001',
  school_id: 'sch-001',
  source: 'firewall',
  event_type: 'CONNECTION_ATTEMPT',
  severity: 'HIGH',
  message: 'Blocked connection from suspicious IP',
  raw_log: 'raw log data',
  parsed_fields: {},
  user: '',
  ip_address: '10.0.0.1',
  device: '',
  application: '',
  tags: [],
  ioc_matches: [],
  correlated_events: [],
  normalized: false,
  timestamp: new Date().toISOString(),
  ingested_at: new Date().toISOString(),
};

const mockRule = {
  id: 'rule-001',
  school_id: 'sch-001',
  name: 'Brute Force Detection',
  description: 'Detects brute force login attempts',
  enabled: true,
  severity: 'HIGH',
  event_type: 'LOGIN_FAILURE',
  conditions: [],
  actions: [],
  suppression_window: 300,
  match_count: 0,
  created_at: new Date().toISOString(),
};

let service: SIEMService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new SIEMService(mockSIEMRepo as never);
});

describe('SIEMService', () => {
  describe('listEvents', () => {
    it('should list events for a school', async () => {
      mockEventsRepo.findAll.mockResolvedValue({ data: [mockEvent], total: 1 });

      const result = await service.listEvents('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listEvents('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getEvent', () => {
    it('should retrieve an event by id', async () => {
      mockEventsRepo.exists.mockResolvedValue(true);
      mockEventsRepo.findById.mockResolvedValue(mockEvent);

      const result = await service.getEvent('sch-001', 'evt-001');

      expect(result).toEqual(mockEvent);
    });

    it('should throw if event not found', async () => {
      mockEventsRepo.exists.mockResolvedValue(false);

      await expect(service.getEvent('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('getEventsBySource', () => {
    it('should filter events by source', async () => {
      mockSIEMRepo.findBySourceType.mockResolvedValue({ data: [mockEvent], total: 1 });

      const result = await service.getEventsBySource('sch-001', 'firewall');

      expect(result.data).toHaveLength(1);
    });

    it('should reject empty source', async () => {
      await expect(service.getEventsBySource('sch-001', '')).rejects.toThrow();
    });
  });

  describe('ingestEvent', () => {
    it('should ingest an event successfully', async () => {
      mockEventsRepo.create.mockResolvedValue(mockEvent);

      const result = await service.ingestEvent('sch-001', {
        source: 'firewall',
        event_type: 'CONNECTION_ATTEMPT',
        severity: 'HIGH',
        message: 'Blocked connection',
        raw_log: 'raw log',
      });

      expect(result).toEqual(mockEvent);
    });

    it('should reject missing required fields', async () => {
      await expect(service.ingestEvent('sch-001', {
        source: 'firewall',
      })).rejects.toThrow(GestcrpValidationError);
    });

    it('should reject invalid severity', async () => {
      await expect(service.ingestEvent('sch-001', {
        source: 'firewall',
        event_type: 'TEST',
        severity: 'INVALID',
        message: 'test',
        raw_log: 'test',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('bulkIngestEvents', () => {
    it('should ingest multiple events', async () => {
      mockEventsRepo.create.mockResolvedValue(mockEvent);

      const result = await service.bulkIngestEvents('sch-001', [
        { source: 'firewall', event_type: 'TEST', severity: 'HIGH', message: 'test', raw_log: 'test' },
        { source: 'ids', event_type: 'TEST', severity: 'LOW', message: 'test2', raw_log: 'test2' },
      ]);

      expect(result.ingested).toBe(2);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('searchEvents', () => {
    it('should search events with valid query', async () => {
      mockEventsRepo.findAll.mockResolvedValue({ data: [mockEvent], total: 1 });

      const result = await service.searchEvents('sch-001', 'firewall');

      expect(result.data).toHaveLength(1);
    });

    it('should reject short query', async () => {
      await expect(service.searchEvents('sch-001', 'a')).rejects.toThrow();
    });
  });

  describe('createRule', () => {
    it('should create a rule successfully', async () => {
      mockRulesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockRulesRepo.create.mockResolvedValue(mockRule);

      const result = await service.createRule('sch-001', {
        name: 'Brute Force Detection',
        description: 'Detects brute force login attempts',
        severity: 'HIGH',
        event_type: 'AUTH',
        eventType: 'AUTH',
        conditions: [{
          field: 'event_type',
          operator: 'EQUALS',
          value: 'LOGIN_FAILURE',
          timeframe: 300,
        }],
        actions: [],
      });

      expect(result).toEqual(mockRule);
    });

    it('should reject duplicate rule name', async () => {
      mockRulesRepo.findAll.mockResolvedValue({ data: [mockRule], total: 1 });

      await expect(service.createRule('sch-001', {
        name: 'Brute Force Detection',
        description: 'Test',
        severity: 'HIGH',
        event_type: 'AUTH',
        eventType: 'AUTH',
        conditions: [{
          field: 'event_type',
          operator: 'EQUALS',
          value: 'LOGIN_FAILURE',
          timeframe: 300,
        }],
        actions: [],
      })).rejects.toThrow();
    });
  });

  describe('updateRule', () => {
    it('should update a rule', async () => {
      mockRulesRepo.exists.mockResolvedValue(true);
      mockRulesRepo.findById.mockResolvedValue(mockRule);
      mockRulesRepo.update.mockResolvedValue({ ...mockRule, name: 'Updated Rule' });

      const result = await service.updateRule('sch-001', 'rule-001', { name: 'Updated Rule' });

      expect(result.name).toBe('Updated Rule');
    });
  });

  describe('deleteRule', () => {
    it('should soft delete a rule', async () => {
      mockRulesRepo.exists.mockResolvedValue(true);
      mockRulesRepo.findById.mockResolvedValue(mockRule);
      mockRulesRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteRule('sch-001', 'rule-001');

      expect(mockRulesRepo.softDelete).toHaveBeenCalledWith('rule-001', 'sch-001');
    });
  });

  describe('toggleRule', () => {
    it('should toggle rule enabled state', async () => {
      mockRulesRepo.exists.mockResolvedValue(true);
      mockRulesRepo.findById.mockResolvedValue(mockRule);
      mockRulesRepo.update.mockResolvedValue({ ...mockRule, enabled: false });

      const result = await service.toggleRule('sch-001', 'rule-001', false);

      expect(result.enabled).toBe(false);
    });
  });

  describe('createCorrelation', () => {
    it('should create a correlation rule', async () => {
      const mockCorrelation = {
        id: 'corr-001',
        school_id: 'sch-001',
        name: 'Brute Force Correlation',
        description: 'Correlates multiple failed logins',
        enabled: true,
        events: [],
        time_window: 300,
        threshold: 5,
        severity: 'HIGH',
        actions: [],
      };
      mockCorrelationsRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockCorrelationsRepo.create.mockResolvedValue(mockCorrelation);

      const result = await service.createCorrelation('sch-001', {
        name: 'Brute Force Correlation',
        description: 'Correlates multiple failed logins',
        events: [],
        time_window: 300,
        threshold: 5,
        severity: 'HIGH',
        actions: [],
      });

      expect(result).toEqual(mockCorrelation);
    });

    it('should reject invalid threshold range', async () => {
      await expect(service.createCorrelation('sch-001', {
        name: 'Test',
        description: 'Test',
        events: [],
        time_window: 300,
        threshold: 150,
        severity: 'HIGH',
        actions: [],
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('deleteCorrelation', () => {
    it('should soft delete a correlation', async () => {
      const mockCorrelation = { id: 'corr-001', school_id: 'sch-001' };
      mockCorrelationsRepo.exists.mockResolvedValue(true);
      mockCorrelationsRepo.findById.mockResolvedValue(mockCorrelation);
      mockCorrelationsRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteCorrelation('sch-001', 'corr-001');

      expect(mockCorrelationsRepo.softDelete).toHaveBeenCalledWith('corr-001', 'sch-001');
    });
  });

  describe('getEventStats', () => {
    it('should return event statistics', async () => {
      mockEventsRepo.findAll.mockResolvedValue({
        data: [mockEvent, { ...mockEvent, id: 'evt-002', severity: 'LOW', source: 'ids', normalized: true, ioc_matches: ['ioc-1'] }],
        total: 2,
      });

      const result = await service.getEventStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.bySeverity).toBeDefined();
      expect(result.bySource).toBeDefined();
      expect(result.normalizedCount).toBe(1);
      expect(result.iocMatchCount).toBe(1);
    });
  });

  describe('getRuleStats', () => {
    it('should return rule statistics', async () => {
      mockRulesRepo.findAll.mockResolvedValue({
        data: [mockRule, { ...mockRule, id: 'rule-002', match_count: 10 }],
        total: 2,
      });

      const result = await service.getRuleStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.active).toBeDefined();
      expect(result.topMatchedRules).toBeDefined();
    });
  });
});
