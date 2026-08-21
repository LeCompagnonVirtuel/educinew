import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppSecurityService } from '../app-security-service';
import { GestcrpNotFoundError, GestcrpValidationError, GestcrpAppScanError } from '@educi/errors';

const mockScansRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockVulnerabilitiesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAPISecurityPoliciesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockDependencyScansRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAppSecurityRepo = {
  scans: mockScansRepo,
  vulnerabilities: mockVulnerabilitiesRepo,
  apiSecurityPolicies: mockAPISecurityPoliciesRepo,
  dependencyScans: mockDependencyScansRepo,
  findRecentScans: vi.fn(),
  findCriticalVulnerabilities: vi.fn(),
  findActiveAPISecurityPolicies: vi.fn(),
};

const mockScan = {
  id: 'scan-001',
  school_id: 'sch-001',
  scan_type: 'SAST' as const,
  target: '/src/app',
  status: 'PENDING' as const,
  findings: [],
  scanner: 'Semgrep',
  version: '1.0.0',
  triggered_by: 'user-001',
  created_at: new Date().toISOString(),
};

const mockVulnerability = {
  id: 'vuln-001',
  school_id: 'sch-001',
  scan_id: 'scan-001',
  title: 'SQL Injection',
  description: 'Potential SQL injection vulnerability',
  severity: 'CRITICAL' as const,
  status: 'NEW' as const,
  category: 'INJECTION',
  affected_component: 'api/users',
  evidence: 'SQL query constructed from user input',
  recommendation: 'Use parameterized queries',
  risk_score: 95,
  exploit_available: true,
  patch_available: false,
  discovered_at: new Date().toISOString(),
};

let service: AppSecurityService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new AppSecurityService(mockAppSecurityRepo as never);
});

describe('AppSecurityService', () => {
  describe('listScans', () => {
    it('should list scans for a school', async () => {
      mockScansRepo.findAll.mockResolvedValue({ data: [mockScan], total: 1 });

      const result = await service.listScans('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listScans('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getScan', () => {
    it('should retrieve a scan by id', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockScansRepo.findById.mockResolvedValue(mockScan);

      const result = await service.getScan('sch-001', 'scan-001');

      expect(result).toEqual(mockScan);
    });

    it('should throw if scan not found', async () => {
      mockScansRepo.exists.mockResolvedValue(false);

      await expect(service.getScan('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createScan', () => {
    it('should create a scan successfully', async () => {
      mockScansRepo.create.mockResolvedValue(mockScan);

      const result = await service.createScan('sch-001', {
        scan_type: 'SAST',
        scanType: 'SAST',
        target: '/src/app',
        scanner: 'Semgrep',
        version: '1.0.0',
        triggered_by: '550e8400-e29b-41d4-a716-446655440000',
        triggeredBy: '550e8400-e29b-41d4-a716-446655440000',
      });

      expect(result).toEqual(mockScan);
    });

    it('should reject invalid scan_type', async () => {
      await expect(service.createScan('sch-001', {
        scan_type: 'INVALID',
        scanType: 'INVALID',
        target: '/src/app',
        scanner: 'Semgrep',
        version: '1.0.0',
        triggered_by: '550e8400-e29b-41d4-a716-446655440000',
        triggeredBy: '550e8400-e29b-41d4-a716-446655440000',
      })).rejects.toThrow(GestcrpValidationError);
    });

    it('should reject missing required fields', async () => {
      await expect(service.createScan('sch-001', {
        scan_type: 'SAST',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('startScan', () => {
    it('should start a pending scan', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockScansRepo.findById.mockResolvedValue(mockScan);
      mockScansRepo.update.mockResolvedValue({ ...mockScan, status: 'RUNNING' });

      const result = await service.startScan('sch-001', 'scan-001');

      expect(result.status).toBe('RUNNING');
    });

    it('should reject starting non-pending scan', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockScansRepo.findById.mockResolvedValue({ ...mockScan, status: 'RUNNING' });

      await expect(service.startScan('sch-001', 'scan-001')).rejects.toThrow();
    });
  });

  describe('completeScan', () => {
    it('should complete a running scan', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockScansRepo.findById.mockResolvedValue({ ...mockScan, status: 'RUNNING', started_at: new Date().toISOString() });
      mockScansRepo.update.mockResolvedValue({ ...mockScan, status: 'COMPLETED' });

      const result = await service.completeScan('sch-001', 'scan-001', []);

      expect(result.status).toBe('COMPLETED');
    });

    it('should reject completing non-running scan', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockScansRepo.findById.mockResolvedValue({ ...mockScan, status: 'PENDING' });

      await expect(service.completeScan('sch-001', 'scan-001', [])).rejects.toThrow();
    });
  });

  describe('cancelScan', () => {
    it('should cancel a pending scan', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockScansRepo.findById.mockResolvedValue(mockScan);
      mockScansRepo.update.mockResolvedValue({ ...mockScan, status: 'CANCELLED' });

      const result = await service.cancelScan('sch-001', 'scan-001');

      expect(result.status).toBe('CANCELLED');
    });

    it('should reject cancelling completed scan', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockScansRepo.findById.mockResolvedValue({ ...mockScan, status: 'COMPLETED' });

      await expect(service.cancelScan('sch-001', 'scan-001')).rejects.toThrow();
    });
  });

  describe('createVulnerability', () => {
    it('should create a vulnerability', async () => {
      mockScansRepo.exists.mockResolvedValue(true);
      mockVulnerabilitiesRepo.create.mockResolvedValue(mockVulnerability);

      const result = await service.createVulnerability('sch-001', {
        scan_id: 'scan-001',
        title: 'SQL Injection',
        description: 'Potential SQL injection vulnerability',
        severity: 'CRITICAL',
        category: 'INJECTION',
        affected_component: 'api/users',
        evidence: 'SQL query constructed from user input',
        recommendation: 'Use parameterized queries',
      });

      expect(result).toEqual(mockVulnerability);
    });

    it('should reject non-existent scan', async () => {
      mockScansRepo.exists.mockResolvedValue(false);

      await expect(service.createVulnerability('sch-001', {
        scan_id: 'nonexistent',
        title: 'Test',
        description: 'Test',
        severity: 'HIGH',
        category: 'TEST',
        affected_component: 'test',
        evidence: 'test',
        recommendation: 'test',
      })).rejects.toThrow(GestcrpAppScanError);
    });
  });

  describe('updateVulnerabilityStatus', () => {
    it('should update vulnerability status', async () => {
      mockVulnerabilitiesRepo.exists.mockResolvedValue(true);
      mockVulnerabilitiesRepo.findById.mockResolvedValue(mockVulnerability);
      mockVulnerabilitiesRepo.update.mockResolvedValue({ ...mockVulnerability, status: 'CONFIRMED' });

      const result = await service.updateVulnerabilityStatus('sch-001', 'vuln-001', 'CONFIRMED');

      expect(result.status).toBe('CONFIRMED');
    });

    it('should set resolved_at when resolving', async () => {
      mockVulnerabilitiesRepo.exists.mockResolvedValue(true);
      mockVulnerabilitiesRepo.findById.mockResolvedValue(mockVulnerability);
      mockVulnerabilitiesRepo.update.mockResolvedValue({ ...mockVulnerability, status: 'RESOLVED' });

      const result = await service.updateVulnerabilityStatus('sch-001', 'vuln-001', 'RESOLVED');

      expect(result.status).toBe('RESOLVED');
    });
  });

  describe('deleteVulnerability', () => {
    it('should soft delete a vulnerability', async () => {
      mockVulnerabilitiesRepo.exists.mockResolvedValue(true);
      mockVulnerabilitiesRepo.findById.mockResolvedValue(mockVulnerability);
      mockVulnerabilitiesRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteVulnerability('sch-001', 'vuln-001');

      expect(mockVulnerabilitiesRepo.softDelete).toHaveBeenCalledWith('vuln-001', 'sch-001');
    });
  });

  describe('createAPISecurityPolicy', () => {
    it('should create an API security policy', async () => {
      const mockPolicy = {
        id: 'api-pol-001',
        school_id: 'sch-001',
        name: 'User API Policy',
        api_path: '/api/users',
        methods: ['GET', 'POST'],
        authentication: 'BEARER',
      };
      mockAPISecurityPoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockAPISecurityPoliciesRepo.create.mockResolvedValue(mockPolicy);

      const result = await service.createAPISecurityPolicy('sch-001', {
        name: 'User API Policy',
        description: 'Policy for user API',
        api_path: '/api/users',
        apiPath: '/api/users',
        methods: ['GET', 'POST'],
        authentication: 'BEARER',
      });

      expect(result).toEqual(mockPolicy);
    });

    it('should reject duplicate api_path', async () => {
      mockAPISecurityPoliciesRepo.findAll.mockResolvedValue({ data: [{ api_path: '/api/users' }], total: 1 });

      await expect(service.createAPISecurityPolicy('sch-001', {
        name: 'Test',
        description: 'Test',
        api_path: '/api/users',
        apiPath: '/api/users',
        methods: ['GET'],
        authentication: 'BEARER',
      })).rejects.toThrow();
    });
  });

  describe('getVulnerabilityStats', () => {
    it('should return vulnerability statistics', async () => {
      mockVulnerabilitiesRepo.findAll.mockResolvedValue({
        data: [mockVulnerability],
        total: 1,
      });

      const result = await service.getVulnerabilityStats('sch-001');

      expect(result.total).toBe(1);
      expect(result.bySeverity).toBeDefined();
      expect(result.byStatus).toBeDefined();
      expect(result.criticalCount).toBeDefined();
      expect(result.exploitableCount).toBeDefined();
    });
  });

  describe('getScanStats', () => {
    it('should return scan statistics', async () => {
      mockScansRepo.findAll.mockResolvedValue({
        data: [mockScan],
        total: 1,
      });

      const result = await service.getScanStats('sch-001');

      expect(result.total).toBe(1);
      expect(result.byType).toBeDefined();
      expect(result.byStatus).toBeDefined();
      expect(result.averageDuration).toBeDefined();
    });
  });
});
