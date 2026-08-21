import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SOCService } from '../soc-service';
import { GestcrpNotFoundError, GestcrpValidationError, GestcrpSOCIncidentError } from '@educi/errors';

const mockIncidentsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockIndicatorsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAPTActionsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockSOCRepo = {
  incidents: mockIncidentsRepo,
  indicators: mockIndicatorsRepo,
  aptActions: mockAPTActionsRepo,
  findOpenIncidents: vi.fn(),
  findBySeverity: vi.fn(),
  findByIncidentId: vi.fn(),
};

const mockIncident = {
  id: 'inc-001',
  school_id: 'sch-001',
  title: 'Unauthorized Access Attempt',
  description: 'Multiple failed login attempts detected',
  severity: 'HIGH',
  status: 'NEW',
  category: 'ACCESS',
  source: 'SIEM',
  affected_systems: [],
  affected_users: [],
  indicators: [],
  timeline: [],
  apt_actions: [],
  risk_score: 75,
  estimated_impact: 60,
  created_at: new Date().toISOString(),
};

const mockIndicator = {
  id: 'ind-001',
  school_id: 'sch-001',
  incident_id: 'inc-001',
  type: 'IP' as const,
  value: '192.168.1.100',
  confidence: 85,
  severity: 'HIGH',
  source: 'Firewall',
  tags: [],
  first_seen: new Date().toISOString(),
  last_seen: new Date().toISOString(),
};

let service: SOCService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new SOCService(mockSOCRepo as never);
});

describe('SOCService', () => {
  describe('listIncidents', () => {
    it('should list incidents for a school', async () => {
      mockIncidentsRepo.findAll.mockResolvedValue({ data: [mockIncident], total: 1 });

      const result = await service.listIncidents('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listIncidents('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getIncident', () => {
    it('should retrieve an incident by id', async () => {
      mockIncidentsRepo.exists.mockResolvedValue(true);
      mockIncidentsRepo.findById.mockResolvedValue(mockIncident);

      const result = await service.getIncident('sch-001', 'inc-001');

      expect(result).toEqual(mockIncident);
    });

    it('should throw if incident not found', async () => {
      mockIncidentsRepo.exists.mockResolvedValue(false);

      await expect(service.getIncident('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('getIncidentsBySeverity', () => {
    it('should filter incidents by severity', async () => {
      mockSOCRepo.findBySeverity.mockResolvedValue({ data: [mockIncident], total: 1 });

      const result = await service.getIncidentsBySeverity('sch-001', 'HIGH');

      expect(result.data).toHaveLength(1);
    });

    it('should reject invalid severity', async () => {
      await expect(service.getIncidentsBySeverity('sch-001', 'INVALID')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('createIncident', () => {
    it('should create an incident successfully', async () => {
      mockIncidentsRepo.create.mockResolvedValue(mockIncident);

      const result = await service.createIncident('sch-001', {
        title: 'Unauthorized Access Attempt',
        description: 'Multiple failed login attempts detected',
        severity: 'HIGH',
        category: 'UNAUTHORIZED_ACCESS',
        source: 'SIEM',
      });

      expect(result).toEqual(mockIncident);
    });

    it('should reject missing required fields', async () => {
      await expect(service.createIncident('sch-001', {
        title: 'Test',
      })).rejects.toThrow(GestcrpValidationError);
    });

    it('should reject invalid severity', async () => {
      await expect(service.createIncident('sch-001', {
        title: 'Test',
        description: 'Test',
        severity: 'INVALID',
        category: 'UNAUTHORIZED_ACCESS',
        source: 'SIEM',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updateIncident', () => {
    it('should update an incident', async () => {
      mockIncidentsRepo.exists.mockResolvedValue(true);
      mockIncidentsRepo.findById.mockResolvedValue(mockIncident);
      mockIncidentsRepo.update.mockResolvedValue({ ...mockIncident, status: 'INVESTIGATING' });

      const result = await service.updateIncident('sch-001', 'inc-001', { status: 'INVESTIGATING' });

      expect(result.status).toBe('INVESTIGATING');
    });
  });

  describe('closeIncident', () => {
    it('should close an incident from valid status', async () => {
      const containedIncident = { ...mockIncident, status: 'CONTAINED' };
      mockIncidentsRepo.exists.mockResolvedValue(true);
      mockIncidentsRepo.findById.mockResolvedValue(containedIncident);
      mockIncidentsRepo.update.mockResolvedValue({ ...containedIncident, status: 'CLOSED' });

      const result = await service.closeIncident('sch-001', 'inc-001', {
        root_cause: 'Phishing attack',
        remediation: 'Blocked IPs and reset passwords',
      });

      expect(result.status).toBe('CLOSED');
    });

    it('should reject closing from invalid status', async () => {
      mockIncidentsRepo.exists.mockResolvedValue(true);
      mockIncidentsRepo.findById.mockResolvedValue({ ...mockIncident, status: 'NEW' });

      await expect(service.closeIncident('sch-001', 'inc-001', {})).rejects.toThrow();
    });
  });

  describe('assignIncident', () => {
    it('should assign an incident', async () => {
      mockIncidentsRepo.exists.mockResolvedValue(true);
      mockIncidentsRepo.findById.mockResolvedValue(mockIncident);
      mockIncidentsRepo.update.mockResolvedValue({ ...mockIncident, assigned_to: 'analyst-001', status: 'TRIAGED' });

      const result = await service.assignIncident('sch-001', 'inc-001', 'analyst-001');

      expect(result.assigned_to).toBe('analyst-001');
    });
  });

  describe('createIndicator', () => {
    it('should create an indicator', async () => {
      mockIncidentsRepo.exists.mockResolvedValue(true);
      mockIndicatorsRepo.create.mockResolvedValue(mockIndicator);

      const result = await service.createIndicator('sch-001', {
        incident_id: 'inc-001',
        type: 'IP',
        value: '192.168.1.100',
        confidence: 85,
        severity: 'HIGH',
        source: 'Firewall',
      });

      expect(result).toEqual(mockIndicator);
    });

    it('should reject invalid indicator type', async () => {
      await expect(service.createIndicator('sch-001', {
        incident_id: 'inc-001',
        type: 'INVALID',
        value: 'test',
        confidence: 85,
        severity: 'HIGH',
        source: 'Firewall',
      })).rejects.toThrow(GestcrpValidationError);
    });

    it('should reject non-existent incident', async () => {
      mockIncidentsRepo.exists.mockResolvedValue(false);

      await expect(service.createIndicator('sch-001', {
        incident_id: 'nonexistent',
        type: 'IP',
        value: '192.168.1.100',
        confidence: 85,
        severity: 'HIGH',
        source: 'Firewall',
      })).rejects.toThrow(GestcrpSOCIncidentError);
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

  describe('createAPTAction', () => {
    it('should create an APT action', async () => {
      const mockAPTAction = {
        id: 'apt-001',
        school_id: 'sch-001',
        incident_id: 'inc-001',
        action: 'BLOCK_IP',
        executed_by: 'system',
        result: 'PENDING',
      };
      mockIncidentsRepo.exists.mockResolvedValue(true);
      mockAPTActionsRepo.create.mockResolvedValue(mockAPTAction);

      const result = await service.createAPTAction('sch-001', {
        incident_id: 'inc-001',
        action: 'BLOCK_IP',
        executed_by: 'system',
      });

      expect(result).toEqual(mockAPTAction);
    });
  });

  describe('updateAPTActionResult', () => {
    it('should update APT action result', async () => {
      const mockAPTAction = {
        id: 'apt-001',
        school_id: 'sch-001',
        result: 'PENDING',
      };
      mockAPTActionsRepo.exists.mockResolvedValue(true);
      mockAPTActionsRepo.findById.mockResolvedValue(mockAPTAction);
      mockAPTActionsRepo.update.mockResolvedValue({ ...mockAPTAction, result: 'SUCCESS' });

      const result = await service.updateAPTActionResult('sch-001', 'apt-001', 'SUCCESS');

      expect(result.result).toBe('SUCCESS');
    });

    it('should reject updating already completed action', async () => {
      mockAPTActionsRepo.exists.mockResolvedValue(true);
      mockAPTActionsRepo.findById.mockResolvedValue({ id: 'apt-001', result: 'SUCCESS' });

      await expect(service.updateAPTActionResult('sch-001', 'apt-001', 'FAILURE')).rejects.toThrow();
    });
  });

  describe('getIncidentStats', () => {
    it('should return incident statistics', async () => {
      mockIncidentsRepo.findAll.mockResolvedValue({
        data: [mockIncident, { ...mockIncident, id: 'inc-002', severity: 'LOW', status: 'CLOSED' }],
        total: 2,
      });

      const result = await service.getIncidentStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.open).toBeDefined();
      expect(result.closed).toBeDefined();
      expect(result.bySeverity).toBeDefined();
      expect(result.byStatus).toBeDefined();
      expect(result.averageRiskScore).toBeDefined();
    });
  });
});
