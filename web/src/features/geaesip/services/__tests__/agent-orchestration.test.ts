import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipAgentOrchestrationService } from '../agent-orchestration.service';

const mockRegistryRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockMissionRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockVoteRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const mockNegotiationRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const AGENT_ID = '660e8400-e29b-41d4-a716-446655440001';
const MISSION_ID = '770e8400-e29b-41d4-a716-446655440002';
const VOTE_ID = '880e8400-e29b-41d4-a716-446655440003';
const NEG_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockAgent = {
  id: AGENT_ID,
  school_id: SCHOOL_ID,
  name: 'Analytics Agent',
  type: 'ANALYTICS',
  status: 'active',
  capabilities: ['predict', 'analyze'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
};

const mockMission = {
  id: MISSION_ID,
  school_id: SCHOOL_ID,
  agentId: AGENT_ID,
  name: 'Predict enrollment',
  status: 'completed',
  completedAt: new Date().toISOString(),
  result: { prediction: 95 },
  score: 0.92,
  createdAt: new Date().toISOString(),
};

const mockVote = {
  id: VOTE_ID,
  school_id: SCHOOL_ID,
  agentId: AGENT_ID,
  topic: 'Budget allocation',
  position: 'APPROVE',
  weight: 0.8,
  timestamp: new Date().toISOString(),
};

const mockNegotiation = {
  id: NEG_ID,
  school_id: SCHOOL_ID,
  participants: [AGENT_ID],
  topic: 'Resource sharing',
  status: 'completed',
  result: { agreement: true },
  timestamp: new Date().toISOString(),
};

let service: GeaesipAgentOrchestrationService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipAgentOrchestrationService(
    mockRegistryRepo as never,
    mockMissionRepo as never,
    mockVoteRepo as never,
    mockNegotiationRepo as never,
  );
});

describe('GeaesipAgentOrchestrationService', () => {
  describe('listAgents', () => {
    it('should list agents for a school', async () => {
      mockRegistryRepo.findAllBySchool.mockResolvedValue([mockAgent]);

      const result = await service.listAgents(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listAgents('')).rejects.toThrow();
    });
  });

  describe('getAgent', () => {
    it('should retrieve an agent by id', async () => {
      mockRegistryRepo.findById.mockResolvedValue(mockAgent);

      const result = await service.getAgent(SCHOOL_ID, AGENT_ID);

      expect(result).toEqual(mockAgent);
    });

    it('should throw if agent not found', async () => {
      mockRegistryRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getAgent(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('registerAgent', () => {
    it('should register an agent successfully', async () => {
      mockRegistryRepo.create.mockResolvedValue(mockAgent);

      const result = await service.registerAgent(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Analytics Agent',
        type: 'ANALYTICS',
        status: 'active',
        capabilities: ['predict', 'analyze'],
      } as never);

      expect(result).toEqual(mockAgent);
    });
  });

  describe('deactivateAgent', () => {
    it('should deactivate an agent', async () => {
      mockRegistryRepo.findById.mockResolvedValue(mockAgent);
      mockRegistryRepo.update.mockResolvedValue({ ...mockAgent, status: 'inactive' });

      const result = await service.deactivateAgent(SCHOOL_ID, AGENT_ID);

      expect(result.status).toBe('inactive');
    });
  });

  describe('deleteAgent', () => {
    it('should delete an agent', async () => {
      mockRegistryRepo.findById.mockResolvedValue(mockAgent);
      mockRegistryRepo.delete.mockResolvedValue(undefined);

      await service.deleteAgent(SCHOOL_ID, AGENT_ID);

      expect(mockRegistryRepo.delete).toHaveBeenCalledWith(AGENT_ID);
    });
  });

  describe('listMissions', () => {
    it('should list missions', async () => {
      mockMissionRepo.findAllBySchool.mockResolvedValue([mockMission]);

      const result = await service.listMissions(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('completeMission', () => {
    it('should complete a mission with result and score', async () => {
      mockMissionRepo.findById.mockResolvedValue(mockMission);
      mockMissionRepo.update.mockResolvedValue({ ...mockMission, completedAt: new Date().toISOString() });

      const result = await service.completeMission(SCHOOL_ID, MISSION_ID, { prediction: 95 }, 0.92);

      expect(result.completedAt).toBeDefined();
    });
  });

  describe('listVotes', () => {
    it('should list votes', async () => {
      mockVoteRepo.findAllBySchool.mockResolvedValue([mockVote]);

      const result = await service.listVotes(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('castVote', () => {
    it('should cast a vote', async () => {
      mockVoteRepo.create.mockResolvedValue(mockVote);

      const result = await service.castVote(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        agentId: AGENT_ID,
        topic: 'Budget allocation',
        position: 'APPROVE',
        weight: 0.8,
      } as never);

      expect(result.position).toBe('APPROVE');
    });
  });

  describe('listNegotiations', () => {
    it('should list negotiations', async () => {
      mockNegotiationRepo.findAllBySchool.mockResolvedValue([mockNegotiation]);

      const result = await service.listNegotiations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getAgentOrchestrationStats', () => {
    it('should return stats', async () => {
      mockRegistryRepo.findAllBySchool.mockResolvedValue([mockAgent]);
      mockMissionRepo.findAllBySchool.mockResolvedValue([mockMission]);
      mockVoteRepo.findAllBySchool.mockResolvedValue([mockVote]);
      mockNegotiationRepo.findAllBySchool.mockResolvedValue([]);

      const result = await service.getAgentOrchestrationStats(SCHOOL_ID);

      expect(result.totalAgents).toBe(1);
      expect(result.activeAgents).toBe(1);
      expect(result.totalMissions).toBe(1);
      expect(result.completedMissions).toBe(1);
      expect(result.totalVotes).toBe(1);
      expect(result.totalNegotiations).toBe(0);
    });
  });
});
