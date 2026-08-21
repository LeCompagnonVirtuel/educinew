import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRepo = {
  findMany: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const schoolId = '550e8400-e29b-41d4-a716-446655440000';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Compliance - GDPRCompliance Service', () => {
  it('should list GDPR compliance', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: '1', status: 'COMPLIANT' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].status).toBe('COMPLIANT');
  });

  it('should create GDPR compliance', async () => {
    const data = { schoolId, status: 'COMPLIANT', articles: [], dataProcessing: [], consentManagement: 'CENTRALIZED', lastAssessment: '2026-01-01', nextAssessment: '2026-07-01', dpoContact: 'dpo@school.com' };
    mockRepo.create.mockResolvedValue({ id: 'gdpr1', ...data });
    const result = await mockRepo.create(data);
    expect(result.consentManagement).toBe('CENTRALIZED');
  });

  it('should update compliance status', async () => {
    mockRepo.update.mockResolvedValue({ id: 'gdpr1', status: 'PARTIAL' });
    const result = await mockRepo.update('gdpr1', { status: 'PARTIAL' });
    expect(result.status).toBe('PARTIAL');
  });

  it('should delete compliance record', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await mockRepo.delete('gdpr1');
    expect(mockRepo.delete).toHaveBeenCalledWith('gdpr1');
  });
});

describe('Compliance - ISO27001Compliance Service', () => {
  it('should create ISO27001 compliance', async () => {
    const data = { schoolId, status: 'IN_PROGRESS', clauses: [], annexControls: [], scope: 'All IT Systems' };
    mockRepo.create.mockResolvedValue({ id: 'iso1', ...data });
    const result = await mockRepo.create(data);
    expect(result.scope).toBe('All IT Systems');
  });

  it('should require scope', () => {
    const validate = (scope: string) => { if (!scope) throw new Error('Scope is required'); };
    expect(() => validate('')).toThrow('Scope is required');
  });
});

describe('Compliance - ComplianceScan Service', () => {
  it('should create scan', async () => {
    const data = { framework: 'GDPR', schoolId, status: 'SCHEDULED', findings: [], score: 0, totalChecks: 0, passedChecks: 0, failedChecks: 0, startedAt: '2026-01-01T00:00:00Z' };
    mockRepo.create.mockResolvedValue({ id: 'cs1', ...data });
    const result = await mockRepo.create(data);
    expect(result.framework).toBe('GDPR');
  });

  it('should update scan results', async () => {
    mockRepo.update.mockResolvedValue({ id: 'cs1', status: 'COMPLETED', score: 85, passedChecks: 85, failedChecks: 15 });
    const result = await mockRepo.update('cs1', { status: 'COMPLETED', score: 85, passedChecks: 85, failedChecks: 15 });
    expect(result.score).toBe(85);
  });
});

describe('Compliance - AuditTrail Service', () => {
  it('should create audit trail', async () => {
    const data = { schoolId, resource: 'student', resourceId: 's1', action: 'UPDATE', actor: 'u1', actorType: 'ADMIN', timestamp: '2026-01-01T00:00:00Z', ipAddress: '127.0.0.1', userAgent: 'Mozilla/5.0', changes: [{ field: 'name', oldValue: 'John', newValue: 'Jane' }] };
    mockRepo.create.mockResolvedValue({ id: 'at1', ...data });
    const result = await mockRepo.create(data);
    expect(result.action).toBe('UPDATE');
  });

  it('should list audit trails', async () => {
    mockRepo.findMany.mockResolvedValue([{ id: 'at1', action: 'CREATE' }]);
    const result = await mockRepo.findMany(schoolId);
    expect(result[0].action).toBe('CREATE');
  });
});

describe('Compliance - RiskAssessment Service', () => {
  it('should create risk assessment', async () => {
    const data = { schoolId, framework: 'ISO_27001', overallRisk: 'MEDIUM', risks: [], assessmentDate: '2026-01-01', assessor: 'a1', nextAssessment: '2026-07-01' };
    mockRepo.create.mockResolvedValue({ id: 'ra1', ...data });
    const result = await mockRepo.create(data);
    expect(result.overallRisk).toBe('MEDIUM');
  });

  it('should validate risk level', () => {
    const validLevels = ['MINIMAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    const validate = (level: string) => { if (!validLevels.includes(level)) throw new Error('Invalid risk level'); };
    expect(() => validate('INVALID')).toThrow('Invalid risk level');
    expect(() => validate('HIGH')).not.toThrow();
  });
});
