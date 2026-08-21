import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPollService } from '../../src/features/communication/services/poll.service';

const mockRepository = {
  getPolls: vi.fn(),
  getPoll: vi.fn(),
  createPoll: vi.fn(),
  updatePoll: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('PollService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create PollService with all methods', () => {
    const service = createPollService(mockRepository as any);
    expect(typeof service.getPolls).toBe('function');
    expect(typeof service.getPoll).toBe('function');
    expect(typeof service.createPoll).toBe('function');
    expect(typeof service.votePoll).toBe('function');
    expect(typeof service.closePoll).toBe('function');
  });

  it('should fetch polls', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPolls.mockResolvedValue([{ id: 'p1' }]);
    const result = await service.getPolls('school1', 'user1');
    expect(result).toEqual([{ id: 'p1' }]);
  });

  it('should throw if schoolId missing', async () => {
    const service = createPollService(mockRepository as any);
    await expect(service.getPolls('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should fetch a poll', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', question: 'Favorite color?' });
    const result = await service.getPoll('p1', 'user1');
    expect(result).toEqual({ id: 'p1', question: 'Favorite color?' });
  });

  it('should throw if poll not found', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue(null);
    await expect(service.getPoll('p1', 'user1')).rejects.toThrow('Poll not found');
  });

  it('should create a poll', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.createPoll.mockResolvedValue({ id: 'p1', question: 'Colors?', options: ['Red', 'Blue'] });
    const result = await service.createPoll('school1', 'user1', { question: 'Colors?', options: ['Red', 'Blue'] });
    expect(result.question).toBe('Colors?');
  });

  it('should throw if question missing', async () => {
    const service = createPollService(mockRepository as any);
    await expect(service.createPoll('school1', 'user1', { options: ['A', 'B'] })).rejects.toThrow('poll question is required');
  });

  it('should throw if less than 2 options', async () => {
    const service = createPollService(mockRepository as any);
    await expect(service.createPoll('school1', 'user1', { question: 'Q', options: ['Only'] })).rejects.toThrow('at least 2 options are required');
  });

  it('should vote on a poll', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', schoolId: 'school1', status: 'active', votes: [] });
    mockRepository.updatePoll.mockResolvedValue({ id: 'p1', votes: [{ userId: 'user1', optionId: 'opt1' }] });
    const result = await service.votePoll('p1', 'user1', 'opt1');
    expect(result.votes).toHaveLength(1);
  });

  it('should throw if poll closed for vote', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', status: 'closed', votes: [] });
    await expect(service.votePoll('p1', 'user1', 'opt1')).rejects.toThrow('Poll is closed');
  });

  it('should throw if already voted', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', status: 'active', votes: [{ userId: 'user1', optionId: 'opt1' }] });
    await expect(service.votePoll('p1', 'user1', 'opt2')).rejects.toThrow('User has already voted');
  });

  it('should throw if poll not found for vote', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue(null);
    await expect(service.votePoll('p1', 'user1', 'opt1')).rejects.toThrow('Poll not found');
  });

  it('should close a poll', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', schoolId: 'school1', status: 'active' });
    mockRepository.updatePoll.mockResolvedValue({ id: 'p1', status: 'closed' });
    const result = await service.closePoll('p1', 'user1');
    expect(result.status).toBe('closed');
  });

  it('should throw if poll already closed', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', status: 'closed' });
    await expect(service.closePoll('p1', 'user1')).rejects.toThrow('Poll is already closed');
  });

  it('should throw if poll not found for close', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue(null);
    await expect(service.closePoll('p1', 'user1')).rejects.toThrow('Poll not found');
  });

  it('should handle getPolls with filters', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPolls.mockResolvedValue([]);
    await service.getPolls('school1', 'user1', { status: 'active' });
    expect(mockRepository.getPolls).toHaveBeenCalledWith('school1', 'user1', { status: 'active' });
  });

  it('should log event on createPoll', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.createPoll.mockResolvedValue({ id: 'p1' });
    await service.createPoll('school1', 'user1', { question: 'Q', options: ['A', 'B'] });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'poll.created', expect.any(Object));
  });

  it('should log event on votePoll', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', schoolId: 'school1', status: 'active', votes: [] });
    mockRepository.updatePoll.mockResolvedValue({ id: 'p1' });
    await service.votePoll('p1', 'user1', 'opt1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'poll.voted', expect.any(Object));
  });

  it('should log event on closePoll', async () => {
    const service = createPollService(mockRepository as any);
    mockRepository.getPoll.mockResolvedValue({ id: 'p1', schoolId: 'school1', status: 'active' });
    mockRepository.updatePoll.mockResolvedValue({ id: 'p1' });
    await service.closePoll('p1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'poll.closed', expect.any(Object));
  });
});
