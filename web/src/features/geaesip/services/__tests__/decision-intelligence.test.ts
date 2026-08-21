import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipDecisionIntelligenceService } from '../decision-intelligence.service';

const mockDecisionRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockOptionRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockApprovalRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockAuditRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const DECISION_ID = '660e8400-e29b-41d4-a716-446655440001';
const OPTION_ID = '770e8400-e29b-41d4-a716-446655440002';
const APPROVAL_ID = '880e8400-e29b-41d4-a716-446655440003';
const AUDIT_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockDecision = {
  id: DECISION_ID,
  school_id: SCHOOL_ID,
  title: 'Hire new teacher',
  description: 'Need additional math teacher',
  selectedOption: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockOption = {
  id: OPTION_ID,
  school_id: SCHOOL_ID,
  decisionId: DECISION_ID,
  name: 'Option A',
  score: 8.5,
  created_at: new Date().toISOString(),
};

const mockApproval = {
  id: APPROVAL_ID,
  school_id: SCHOOL_ID,
  decisionId: DECISION_ID,
  approver: 'Director',
  status: 'PENDING',
  timestamp: new Date().toISOString(),
};

const mockAudit = {
  id: AUDIT_ID,
  school_id: SCHOOL_ID,
  decisionId: DECISION_ID,
  action: 'CREATED',
  actor: 'admin-1',
  timestamp: new Date().toISOString(),
};

let service: GeaesipDecisionIntelligenceService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipDecisionIntelligenceService(
    mockDecisionRepo as never,
    mockOptionRepo as never,
    mockApprovalRepo as never,
    mockAuditRepo as never,
  );
});

describe('GeaesipDecisionIntelligenceService', () => {
  describe('listDecisions', () => {
    it('should list decisions for a school', async () => {
      mockDecisionRepo.findAllBySchool.mockResolvedValue([mockDecision]);

      const result = await service.listDecisions(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listDecisions('')).rejects.toThrow();
    });
  });

  describe('getDecision', () => {
    it('should retrieve a decision by id', async () => {
      mockDecisionRepo.findById.mockResolvedValue(mockDecision);

      const result = await service.getDecision(SCHOOL_ID, DECISION_ID);

      expect(result).toEqual(mockDecision);
    });

    it('should throw if decision not found', async () => {
      mockDecisionRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getDecision(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createDecision', () => {
    it('should create a decision successfully', async () => {
      mockDecisionRepo.create.mockResolvedValue(mockDecision);

      const result = await service.createDecision(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        title: 'Hire new teacher',
        description: 'Need additional math teacher',
      } as never);

      expect(result).toEqual(mockDecision);
    });
  });

  describe('selectOption', () => {
    it('should select an option for a decision', async () => {
      mockDecisionRepo.findById.mockResolvedValue(mockDecision);
      mockDecisionRepo.update.mockResolvedValue({ ...mockDecision, selectedOption: OPTION_ID });

      const result = await service.selectOption(SCHOOL_ID, DECISION_ID, OPTION_ID);

      expect(result.selectedOption).toBe(OPTION_ID);
    });
  });

  describe('updateDecision', () => {
    it('should update a decision', async () => {
      mockDecisionRepo.findById.mockResolvedValue(mockDecision);
      mockDecisionRepo.update.mockResolvedValue({ ...mockDecision, title: 'Updated' });

      const result = await service.updateDecision(SCHOOL_ID, DECISION_ID, { title: 'Updated' });

      expect(result.title).toBe('Updated');
    });
  });

  describe('deleteDecision', () => {
    it('should delete a decision', async () => {
      mockDecisionRepo.findById.mockResolvedValue(mockDecision);
      mockDecisionRepo.delete.mockResolvedValue(undefined);

      await service.deleteDecision(SCHOOL_ID, DECISION_ID);

      expect(mockDecisionRepo.delete).toHaveBeenCalledWith(DECISION_ID);
    });
  });

  describe('listOptions', () => {
    it('should list options', async () => {
      mockOptionRepo.findAllBySchool.mockResolvedValue([mockOption]);

      const result = await service.listOptions(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createOption', () => {
    it('should create an option successfully', async () => {
      mockOptionRepo.create.mockResolvedValue(mockOption);

      const result = await service.createOption(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        decisionId: DECISION_ID,
        name: 'Option A',
        score: 8.5,
      } as never);

      expect(result.name).toBe('Option A');
    });
  });

  describe('listApprovals', () => {
    it('should list approvals', async () => {
      mockApprovalRepo.findAllBySchool.mockResolvedValue([mockApproval]);

      const result = await service.listApprovals(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createApproval', () => {
    it('should create an approval', async () => {
      mockApprovalRepo.create.mockResolvedValue(mockApproval);

      const result = await service.createApproval(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        decisionId: DECISION_ID,
        approver: 'Director',
        status: 'PENDING',
      } as never);

      expect(result.status).toBe('PENDING');
    });
  });

  describe('listAudits', () => {
    it('should list audits', async () => {
      mockAuditRepo.findAllBySchool.mockResolvedValue([mockAudit]);

      const result = await service.listAudits(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getDecisionIntelligenceStats', () => {
    it('should return stats', async () => {
      mockDecisionRepo.findAllBySchool.mockResolvedValue([mockDecision]);
      mockOptionRepo.findAllBySchool.mockResolvedValue([mockOption]);
      mockApprovalRepo.findAllBySchool.mockResolvedValue([]);
      mockAuditRepo.findAllBySchool.mockResolvedValue([mockAudit]);

      const result = await service.getDecisionIntelligenceStats(SCHOOL_ID);

      expect(result.totalDecisions).toBe(1);
      expect(result.decidedCount).toBe(0);
      expect(result.totalOptions).toBe(1);
      expect(result.totalApprovals).toBe(0);
      expect(result.totalAudits).toBe(1);
    });
  });
});
