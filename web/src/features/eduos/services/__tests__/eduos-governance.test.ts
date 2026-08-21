import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as repoModule from '../../repositories/eduos.repository';

vi.mock('../../repositories/eduos.repository', () => ({
  createEduOSRepository: vi.fn(),
}));

describe('EduOS Governance Services', () => {
  let mockRepo: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockRepo = {
      getBoard: vi.fn(),
      listBoards: vi.fn(),
      createBoard: vi.fn(),
      updateBoard: vi.fn(),
      deleteBoard: vi.fn(),
      getCommittee: vi.fn(),
      listCommittees: vi.fn(),
      createCommittee: vi.fn(),
      updateCommittee: vi.fn(),
      deleteCommittee: vi.fn(),
      getVoting: vi.fn(),
      listVotings: vi.fn(),
      createVoting: vi.fn(),
      updateVoting: vi.fn(),
      deleteVoting: vi.fn(),
    };
    (repoModule.createEduOSRepository as any).mockReturnValue(mockRepo);
  });

  describe('BoardService', () => {
    it('should create service', async () => {
      const { EduOSBoardService } = await import('../eduos-board.service');
      const service = new EduOSBoardService({} as any);
      expect(service).toBeDefined();
    });

    it('should get board', async () => {
      mockRepo.getBoard.mockResolvedValue({ id: 'b-1', name: 'School Board' });
      const { EduOSBoardService } = await import('../eduos-board.service');
      const service = new EduOSBoardService({} as any);
      const result = await service.getBoard('school-1', 'b-1');
      expect(result.id).toBe('b-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getBoard.mockResolvedValue(null);
      const { EduOSBoardService } = await import('../eduos-board.service');
      const service = new EduOSBoardService({} as any);
      await expect(service.getBoard('school-1', 'b-1')).rejects.toThrow();
    });

    it('should list boards', async () => {
      mockRepo.listBoards.mockResolvedValue([{ id: 'b-1' }]);
      const { EduOSBoardService } = await import('../eduos-board.service');
      const service = new EduOSBoardService({} as any);
      const result = await service.listBoards('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create board', async () => {
      mockRepo.createBoard.mockResolvedValue({ id: 'b-1' });
      const { EduOSBoardService } = await import('../eduos-board.service');
      const service = new EduOSBoardService({} as any);
      const result = await service.createBoard('school-1', { name: 'School Board' });
      expect(result.id).toBe('b-1');
    });

    it('should update board', async () => {
      mockRepo.getBoard.mockResolvedValue({ id: 'b-1' });
      mockRepo.updateBoard.mockResolvedValue({ id: 'b-1', name: 'Updated Board' });
      const { EduOSBoardService } = await import('../eduos-board.service');
      const service = new EduOSBoardService({} as any);
      const result = await service.updateBoard('school-1', 'b-1', { name: 'Updated Board' });
      expect(result.name).toBe('Updated Board');
    });

    it('should delete board', async () => {
      mockRepo.getBoard.mockResolvedValue({ id: 'b-1' });
      mockRepo.deleteBoard.mockResolvedValue(undefined);
      const { EduOSBoardService } = await import('../eduos-board.service');
      const service = new EduOSBoardService({} as any);
      await service.deleteBoard('school-1', 'b-1');
      expect(mockRepo.deleteBoard).toHaveBeenCalledWith('school-1', 'b-1');
    });
  });

  describe('VotingService', () => {
    it('should create service', async () => {
      const { EduOSVotingService } = await import('../eduos-voting.service');
      const service = new EduOSVotingService({} as any);
      expect(service).toBeDefined();
    });

    it('should get voting', async () => {
      mockRepo.getVoting.mockResolvedValue({ id: 'v-1', title: 'Budget Vote' });
      const { EduOSVotingService } = await import('../eduos-voting.service');
      const service = new EduOSVotingService({} as any);
      const result = await service.getVoting('school-1', 'v-1');
      expect(result.id).toBe('v-1');
    });

    it('should throw if not found', async () => {
      mockRepo.getVoting.mockResolvedValue(null);
      const { EduOSVotingService } = await import('../eduos-voting.service');
      const service = new EduOSVotingService({} as any);
      await expect(service.getVoting('school-1', 'v-1')).rejects.toThrow();
    });

    it('should list votings', async () => {
      mockRepo.listVotings.mockResolvedValue([{ id: 'v-1' }]);
      const { EduOSVotingService } = await import('../eduos-voting.service');
      const service = new EduOSVotingService({} as any);
      const result = await service.listVotings('school-1');
      expect(result).toHaveLength(1);
    });

    it('should create voting', async () => {
      mockRepo.createVoting.mockResolvedValue({ id: 'v-1' });
      const { EduOSVotingService } = await import('../eduos-voting.service');
      const service = new EduOSVotingService({} as any);
      const result = await service.createVoting('school-1', { title: 'Budget Vote' });
      expect(result.id).toBe('v-1');
    });

    it('should update voting', async () => {
      mockRepo.getVoting.mockResolvedValue({ id: 'v-1' });
      mockRepo.updateVoting.mockResolvedValue({ id: 'v-1', status: 'closed' });
      const { EduOSVotingService } = await import('../eduos-voting.service');
      const service = new EduOSVotingService({} as any);
      const result = await service.updateVoting('school-1', 'v-1', { status: 'closed' });
      expect(result.status).toBe('closed');
    });

    it('should delete voting', async () => {
      mockRepo.getVoting.mockResolvedValue({ id: 'v-1' });
      mockRepo.deleteVoting.mockResolvedValue(undefined);
      const { EduOSVotingService } = await import('../eduos-voting.service');
      const service = new EduOSVotingService({} as any);
      await service.deleteVoting('school-1', 'v-1');
      expect(mockRepo.deleteVoting).toHaveBeenCalledWith('school-1', 'v-1');
    });
  });
});
