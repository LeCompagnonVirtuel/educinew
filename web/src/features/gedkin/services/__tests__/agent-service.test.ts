import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AgentService } from '../agent-service';

const mockAgentRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByType: vi.fn(),
  findByStatus: vi.fn(),
  findActive: vi.fn(),
  updateLastActive: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const AGENT_ID = '660e8400-e29b-41d4-a716-446655440001';

const mockAgent = {
  id: AGENT_ID,
  school_id: SCHOOL_ID,
  type: 'RESEARCH',
  name: 'Research Agent',
  description: 'AI agent for research tasks',
  status: 'ACTIVE',
  capabilities: ['analysis', 'reporting'],
  config: { model: 'deepseek' },
  lastActiveAt: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: AgentService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new AgentService(mockAgentRepo as never);
});

describe('AgentService', () => {
  describe('listAgents', () => {
    it('should list agents for a school', async () => {
      mockAgentRepo.findAll.mockResolvedValue({ data: [mockAgent], total: 1, offset: 0, limit: 50 });

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

      await expect(service.getAgent(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createAgent', () => {
    it('should create an agent successfully', async () => {
      mockAgentRepo.create.mockResolvedValue(mockAgent);

      const result = await service.createAgent(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        type: 'RESEARCH',
        name: 'Research Agent',
        description: 'AI agent for research tasks',
        status: 'ACTIVE',
        capabilities: ['analysis', 'reporting'],
        config: { model: 'deepseek' },
      });

      expect(result).toEqual(mockAgent);
    });
  });

  describe('updateAgent', () => {
    it('should update an agent successfully', async () => {
      mockAgentRepo.exists.mockResolvedValue(true);
      mockAgentRepo.findById.mockResolvedValue(mockAgent);
      mockAgentRepo.update.mockResolvedValue({ ...mockAgent, name: 'Updated Agent' });

      const result = await service.updateAgent(SCHOOL_ID, AGENT_ID, {
        name: 'Updated Agent',
      });

      expect(result.name).toBe('Updated Agent');
    });

    it('should throw if agent not found on update', async () => {
      mockAgentRepo.exists.mockResolvedValue(false);

      await expect(service.updateAgent(SCHOOL_ID, 'nonexistent', { name: 'X' })).rejects.toThrow();
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

  describe('listByType', () => {
    it('should list agents by type', async () => {
      mockAgentRepo.findByType.mockResolvedValue({ data: [mockAgent], total: 1, offset: 0, limit: 50 });

      const result = await service.listByType(SCHOOL_ID, 'RESEARCH');

      expect(result.data).toHaveLength(1);
    });
  });

  describe('listActiveAgents', () => {
    it('should list active agents', async () => {
      mockAgentRepo.findActive.mockResolvedValue([mockAgent]);

      const result = await service.listActiveAgents(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('updateLastActive', () => {
    it('should update last active timestamp', async () => {
      mockAgentRepo.updateLastActive.mockResolvedValue(mockAgent);

      const result = await service.updateLastActive(SCHOOL_ID, AGENT_ID);

      expect(result).toEqual(mockAgent);
    });
  });

  describe('getAgentStats', () => {
    it('should return agent statistics', async () => {
      mockAgentRepo.findAll.mockResolvedValue({ data: [mockAgent], total: 1, offset: 0, limit: 1000 });

      const result = await service.getAgentStats(SCHOOL_ID);

      expect(result.totalAgents).toBe(1);
      expect(result.activeAgents).toBe(1);
      expect(result.byType['RESEARCH']).toBe(1);
      expect(result.byStatus['ACTIVE']).toBe(1);
    });
  });
});
