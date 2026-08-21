import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipCopilotService } from '../copilot.service';

const mockSessionRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockAnswerRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockExplanationRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const SESSION_ID = '660e8400-e29b-41d4-a716-446655440001';
const ANSWER_ID = '770e8400-e29b-41d4-a716-446655440002';
const EXPL_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockSession = {
  id: SESSION_ID,
  school_id: SCHOOL_ID,
  userId: 'user-1',
  query: 'Show me enrollment trends',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockAnswer = {
  id: ANSWER_ID,
  school_id: SCHOOL_ID,
  sessionId: SESSION_ID,
  content: 'Enrollment increased by 12%',
  confidence: 0.94,
  sources: ['database'],
  created_at: new Date().toISOString(),
};

const mockExplanation = {
  id: EXPL_ID,
  school_id: SCHOOL_ID,
  answerId: ANSWER_ID,
  reasoning: 'Based on historical data analysis',
  confidence: 0.91,
  created_at: new Date().toISOString(),
};

let service: GeaesipCopilotService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipCopilotService(
    mockSessionRepo as never,
    mockAnswerRepo as never,
    mockExplanationRepo as never,
  );
});

describe('GeaesipCopilotService', () => {
  describe('listSessions', () => {
    it('should list copilot sessions for a school', async () => {
      mockSessionRepo.findAllBySchool.mockResolvedValue([mockSession]);

      const result = await service.listSessions(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listSessions('')).rejects.toThrow();
    });
  });

  describe('getSession', () => {
    it('should retrieve a session by id', async () => {
      mockSessionRepo.findById.mockResolvedValue(mockSession);

      const result = await service.getSession(SCHOOL_ID, SESSION_ID);

      expect(result).toEqual(mockSession);
    });

    it('should throw if session not found', async () => {
      mockSessionRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getSession(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createSession', () => {
    it('should create a session successfully', async () => {
      mockSessionRepo.create.mockResolvedValue(mockSession);

      const result = await service.createSession(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        userId: 'user-1',
        query: 'Show me enrollment trends',
        status: 'active',
      } as never);

      expect(result).toEqual(mockSession);
    });
  });

  describe('updateSession', () => {
    it('should update a session', async () => {
      mockSessionRepo.findById.mockResolvedValue(mockSession);
      mockSessionRepo.update.mockResolvedValue({ ...mockSession, status: 'closed' });

      const result = await service.updateSession(SCHOOL_ID, SESSION_ID, { status: 'closed' });

      expect(result.status).toBe('closed');
    });
  });

  describe('deleteSession', () => {
    it('should delete a session', async () => {
      mockSessionRepo.findById.mockResolvedValue(mockSession);
      mockSessionRepo.delete.mockResolvedValue(undefined);

      await service.deleteSession(SCHOOL_ID, SESSION_ID);

      expect(mockSessionRepo.delete).toHaveBeenCalledWith(SESSION_ID);
    });
  });

  describe('listAnswers', () => {
    it('should list copilot answers', async () => {
      mockAnswerRepo.findAllBySchool.mockResolvedValue([mockAnswer]);

      const result = await service.listAnswers(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getAnswer', () => {
    it('should retrieve an answer by id', async () => {
      mockAnswerRepo.findById.mockResolvedValue(mockAnswer);

      const result = await service.getAnswer(SCHOOL_ID, ANSWER_ID);

      expect(result).toEqual(mockAnswer);
    });
  });

  describe('createAnswer', () => {
    it('should create an answer', async () => {
      mockAnswerRepo.create.mockResolvedValue(mockAnswer);

      const result = await service.createAnswer(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        sessionId: SESSION_ID,
        content: 'Enrollment increased by 12%',
        confidence: 0.94,
        sources: ['database'],
      } as never);

      expect(result.content).toContain('Enrollment');
    });
  });

  describe('listExplanations', () => {
    it('should list copilot explanations', async () => {
      mockExplanationRepo.findAllBySchool.mockResolvedValue([mockExplanation]);

      const result = await service.listExplanations(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createExplanation', () => {
    it('should create an explanation', async () => {
      mockExplanationRepo.create.mockResolvedValue(mockExplanation);

      const result = await service.createExplanation(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        answerId: ANSWER_ID,
        reasoning: 'Based on historical data analysis',
        confidence: 0.91,
      } as never);

      expect(result.reasoning).toContain('historical');
    });
  });

  describe('getCopilotStats', () => {
    it('should return stats', async () => {
      mockSessionRepo.findAllBySchool.mockResolvedValue([mockSession]);
      mockAnswerRepo.findAllBySchool.mockResolvedValue([mockAnswer]);
      mockExplanationRepo.findAllBySchool.mockResolvedValue([mockExplanation]);

      const result = await service.getCopilotStats(SCHOOL_ID);

      expect(result.totalSessions).toBe(1);
      expect(result.totalAnswers).toBe(1);
      expect(result.totalExplanations).toBe(1);
    });
  });
});
