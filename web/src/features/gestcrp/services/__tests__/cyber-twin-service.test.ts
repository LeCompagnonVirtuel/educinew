import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CyberTwinService } from '../cyber-twin-service';
import { GestcrpNotFoundError, GestcrpValidationError, GestcrpDigitalTwinError } from '@educi/errors';

const mockTwinsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockResultsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAttackScenariosRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockCyberTwinRepo = {
  twins: mockTwinsRepo,
  results: mockResultsRepo,
  attackScenarios: mockAttackScenariosRepo,
  findCompletedTwins: vi.fn(),
  findResultsByTwinId: vi.fn(),
  findScenariosByTwinId: vi.fn(),
};

const mockTwin = {
  id: 'twin-001',
  school_id: 'sch-001',
  name: 'Network Attack Simulation',
  description: 'Simulate network-based attacks',
  status: 'DRAFT' as const,
  simulation_type: 'ATTACK_SIMULATION' as const,
  scope: 'Internal network',
  environment: {},
  attack_scenarios: [{ name: 'Scenario 1', type: 'PORT_SCAN' }],
  defenses: [],
  created_by: 'user-001',
  created_at: new Date().toISOString(),
};

const mockResult = {
  id: 'result-001',
  school_id: 'sch-001',
  twin_id: 'twin-001',
  scenario_id: 'scenario-001',
  success: true,
  detection_time: 30,
  response_time: 60,
  mitigation_time: 120,
  findings: [],
  recommendations: [],
  score: 85,
  created_at: new Date().toISOString(),
};

const mockScenario = {
  id: 'scenario-001',
  school_id: 'sch-001',
  twin_id: 'twin-001',
  name: 'Port Scan',
  description: 'Scan all ports on target',
  technique: 'Port Scanning',
  severity: 'MEDIUM',
  target: '192.168.1.0/24',
  expected_duration: 300,
  steps: [],
  success_criteria: ['All ports identified'],
  rollback_plan: 'Close all connections',
  created_at: new Date().toISOString(),
};

let service: CyberTwinService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new CyberTwinService(mockCyberTwinRepo as never);
});

describe('CyberTwinService', () => {
  describe('listTwins', () => {
    it('should list twins for a school', async () => {
      mockTwinsRepo.findAll.mockResolvedValue({ data: [mockTwin], total: 1 });

      const result = await service.listTwins('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listTwins('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getTwin', () => {
    it('should retrieve a twin by id', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);

      const result = await service.getTwin('sch-001', 'twin-001');

      expect(result).toEqual(mockTwin);
    });

    it('should throw if twin not found', async () => {
      mockTwinsRepo.exists.mockResolvedValue(false);

      await expect(service.getTwin('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createTwin', () => {
    it('should create a twin successfully', async () => {
      mockTwinsRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockTwinsRepo.create.mockResolvedValue(mockTwin);

      const result = await service.createTwin('sch-001', {
        name: 'Network Attack Simulation',
        description: 'Simulate network-based attacks',
        simulation_type: 'ATTACK_SIMULATION',
        simulationType: 'ATTACK_SIMULATION',
        scope: 'Internal network',
        created_by: 'user-001',
        environment: {
          network: {
            segments: ['INTERNAL'],
            firewallRules: [],
            openPorts: [],
            dnsConfig: {},
          },
          systems: [],
          users: [],
          data: [],
        },
        attackScenarios: [{
          name: 'Port Scan',
          description: 'Scan all ports',
          technique: 'Port Scanning',
          severity: 'MEDIUM',
          target: '192.168.1.0/24',
          expectedDuration: 300,
          steps: [{
            order: 1,
            action: 'scan_ports',
            parameters: {},
            expectedOutcome: 'All ports identified',
            timeout: 300,
          }],
          successCriteria: ['All ports identified'],
          rollbackPlan: 'Close connections',
        }],
      });

      expect(result).toEqual(mockTwin);
    });

    it('should reject duplicate twin name', async () => {
      mockTwinsRepo.findAll.mockResolvedValue({ data: [mockTwin], total: 1 });

      await expect(service.createTwin('sch-001', {
        name: 'Network Attack Simulation',
        description: 'Test',
        simulation_type: 'ATTACK_SIMULATION',
        simulationType: 'ATTACK_SIMULATION',
        scope: 'Test',
        created_by: 'user-001',
      })).rejects.toThrow();
    });

    it('should reject invalid simulation_type', async () => {
      await expect(service.createTwin('sch-001', {
        name: 'Test',
        description: 'Test',
        simulation_type: 'INVALID',
        simulationType: 'INVALID',
        scope: 'Test',
        created_by: 'user-001',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('startTwin', () => {
    it('should start a draft twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);
      mockTwinsRepo.update.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });

      const result = await service.startTwin('sch-001', 'twin-001');

      expect(result.status).toBe('RUNNING');
    });

    it('should reject starting twin without scenarios', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, attack_scenarios: [] });

      await expect(service.startTwin('sch-001', 'twin-001')).rejects.toThrow();
    });

    it('should reject starting from invalid status', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });

      await expect(service.startTwin('sch-001', 'twin-001')).rejects.toThrow();
    });
  });

  describe('completeTwin', () => {
    it('should complete a running twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });
      mockTwinsRepo.update.mockResolvedValue({ ...mockTwin, status: 'COMPLETED' });

      const result = await service.completeTwin('sch-001', 'twin-001', 3600);

      expect(result.status).toBe('COMPLETED');
    });

    it('should reject completing non-running twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);

      await expect(service.completeTwin('sch-001', 'twin-001', 3600)).rejects.toThrow();
    });
  });

  describe('failTwin', () => {
    it('should fail a running twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });
      mockTwinsRepo.update.mockResolvedValue({ ...mockTwin, status: 'FAILED' });

      const result = await service.failTwin('sch-001', 'twin-001', 'Network timeout');

      expect(result.status).toBe('FAILED');
    });
  });

  describe('pauseTwin', () => {
    it('should pause a running twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });
      mockTwinsRepo.update.mockResolvedValue({ ...mockTwin, status: 'PAUSED' });

      const result = await service.pauseTwin('sch-001', 'twin-001');

      expect(result.status).toBe('PAUSED');
    });

    it('should reject pausing non-running twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);

      await expect(service.pauseTwin('sch-001', 'twin-001')).rejects.toThrow();
    });
  });

  describe('deleteTwin', () => {
    it('should delete a draft twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);
      mockTwinsRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteTwin('sch-001', 'twin-001');

      expect(mockTwinsRepo.softDelete).toHaveBeenCalledWith('twin-001', 'sch-001');
    });

    it('should reject deleting running twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });

      await expect(service.deleteTwin('sch-001', 'twin-001')).rejects.toThrow();
    });
  });

  describe('createResult', () => {
    it('should create a result', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockResultsRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockResultsRepo.create.mockResolvedValue(mockResult);

      const result = await service.createResult('sch-001', {
        twin_id: 'twin-001',
        scenario_id: 'scenario-001',
        success: true,
        detection_time: 30,
        response_time: 60,
        mitigation_time: 120,
      });

      expect(result).toEqual(mockResult);
    });

    it('should reject non-existent twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(false);

      await expect(service.createResult('sch-001', {
        twin_id: 'nonexistent',
        scenario_id: 'scenario-001',
        success: true,
        detection_time: 30,
        response_time: 60,
        mitigation_time: 120,
      })).rejects.toThrow(GestcrpDigitalTwinError);
    });

    it('should reject duplicate result for same scenario', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockResultsRepo.findAll.mockResolvedValue({ data: [mockResult], total: 1 });

      await expect(service.createResult('sch-001', {
        twin_id: 'twin-001',
        scenario_id: 'scenario-001',
        success: true,
        detection_time: 30,
        response_time: 60,
        mitigation_time: 120,
      })).rejects.toThrow();
    });
  });

  describe('createScenario', () => {
    it('should create an attack scenario', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);
      mockAttackScenariosRepo.create.mockResolvedValue(mockScenario);

      const result = await service.createScenario('sch-001', {
        twin_id: 'twin-001',
        name: 'Port Scan',
        description: 'Scan all ports on target',
        technique: 'Port Scanning',
        severity: 'MEDIUM',
        target: '192.168.1.0/24',
        expected_duration: 300,
        steps: [],
        success_criteria: ['All ports identified'],
        rollback_plan: 'Close all connections',
      });

      expect(result).toEqual(mockScenario);
    });

    it('should reject adding scenario to running twin', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });

      await expect(service.createScenario('sch-001', {
        twin_id: 'twin-001',
        name: 'Test',
        description: 'Test',
        technique: 'Test',
        severity: 'LOW',
        target: 'test',
        expected_duration: 100,
        steps: [],
        success_criteria: [],
        rollback_plan: 'test',
      })).rejects.toThrow();
    });

    it('should reject invalid expected_duration', async () => {
      mockTwinsRepo.exists.mockResolvedValue(true);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);

      await expect(service.createScenario('sch-001', {
        twin_id: 'twin-001',
        name: 'Test',
        description: 'Test',
        technique: 'Test',
        severity: 'LOW',
        target: 'test',
        expected_duration: 100000,
        steps: [],
        success_criteria: [],
        rollback_plan: 'test',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('deleteScenario', () => {
    it('should delete a scenario from draft twin', async () => {
      mockAttackScenariosRepo.exists.mockResolvedValue(true);
      mockAttackScenariosRepo.findById.mockResolvedValue(mockScenario);
      mockTwinsRepo.findById.mockResolvedValue(mockTwin);
      mockAttackScenariosRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteScenario('sch-001', 'scenario-001');

      expect(mockAttackScenariosRepo.softDelete).toHaveBeenCalledWith('scenario-001', 'sch-001');
    });

    it('should reject deleting scenario from running twin', async () => {
      mockAttackScenariosRepo.exists.mockResolvedValue(true);
      mockAttackScenariosRepo.findById.mockResolvedValue(mockScenario);
      mockTwinsRepo.findById.mockResolvedValue({ ...mockTwin, status: 'RUNNING' });

      await expect(service.deleteScenario('sch-001', 'scenario-001')).rejects.toThrow();
    });
  });

  describe('getTwinStats', () => {
    it('should return twin statistics', async () => {
      mockTwinsRepo.findAll.mockResolvedValue({
        data: [mockTwin, { ...mockTwin, id: 'twin-002', status: 'COMPLETED', simulation_type: 'RED_TEAM' }],
        total: 2,
      });
      mockResultsRepo.findAll.mockResolvedValue({ data: [mockResult], total: 1 });

      const result = await service.getTwinStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.byStatus).toBeDefined();
      expect(result.bySimulationType).toBeDefined();
      expect(result.completedCount).toBeDefined();
      expect(result.averageScore).toBeDefined();
    });
  });

  describe('getResultStats', () => {
    it('should return result statistics', async () => {
      mockResultsRepo.findAll.mockResolvedValue({
        data: [mockResult, { ...mockResult, id: 'result-002', success: false, detection_time: 60, response_time: 120, mitigation_time: 240 }],
        total: 2,
      });

      const result = await service.getResultStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.successes).toBeDefined();
      expect(result.failures).toBeDefined();
      expect(result.averageDetectionTime).toBeDefined();
      expect(result.averageResponseTime).toBeDefined();
      expect(result.averageMitigationTime).toBeDefined();
    });
  });
});
