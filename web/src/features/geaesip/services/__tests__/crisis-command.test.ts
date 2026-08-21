import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipCrisisCommandService } from '../crisis-command.service';

const mockCrisisRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockTeamRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockPlaybookRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockCommRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const CRISIS_ID = '660e8400-e29b-41d4-a716-446655440001';
const TEAM_ID = '770e8400-e29b-41d4-a716-446655440002';
const PLAYBOOK_ID = '880e8400-e29b-41d4-a716-446655440003';
const COMM_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockCrisis = {
  id: CRISIS_ID,
  school_id: SCHOOL_ID,
  name: 'Flood crisis',
  severity: 'CRITICAL',
  status: 'active',
  timeline: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockTeam = {
  id: TEAM_ID,
  school_id: SCHOOL_ID,
  name: 'Emergency Response Team',
  members: ['user-1', 'user-2'],
  role: 'FIRST_RESPONDERS',
  created_at: new Date().toISOString(),
};

const mockPlaybook = {
  id: PLAYBOOK_ID,
  school_id: SCHOOL_ID,
  name: 'Flood response playbook',
  steps: ['Evacuate', 'Notify', 'Document'],
  crisisType: 'NATURAL_DISASTER',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockComm = {
  id: COMM_ID,
  school_id: SCHOOL_ID,
  crisisId: CRISIS_ID,
  channel: 'SMS',
  message: 'Evacuate immediately',
  recipients: ['all_parents'],
  sentAt: new Date().toISOString(),
};

let service: GeaesipCrisisCommandService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipCrisisCommandService(
    mockCrisisRepo as never,
    mockTeamRepo as never,
    mockPlaybookRepo as never,
    mockCommRepo as never,
  );
});

describe('GeaesipCrisisCommandService', () => {
  describe('listCrises', () => {
    it('should list crises for a school', async () => {
      mockCrisisRepo.findAllBySchool.mockResolvedValue([mockCrisis]);

      const result = await service.listCrises(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listCrises('')).rejects.toThrow();
    });
  });

  describe('getCrisis', () => {
    it('should retrieve a crisis by id', async () => {
      mockCrisisRepo.findById.mockResolvedValue(mockCrisis);

      const result = await service.getCrisis(SCHOOL_ID, CRISIS_ID);

      expect(result).toEqual(mockCrisis);
    });

    it('should throw if crisis not found', async () => {
      mockCrisisRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getCrisis(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createCrisis', () => {
    it('should create a crisis successfully', async () => {
      mockCrisisRepo.create.mockResolvedValue(mockCrisis);

      const result = await service.createCrisis(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Flood crisis',
        severity: 'CRITICAL',
        status: 'active',
      } as never);

      expect(result).toEqual(mockCrisis);
    });
  });

  describe('updateCrisis', () => {
    it('should update a crisis', async () => {
      mockCrisisRepo.findById.mockResolvedValue(mockCrisis);
      mockCrisisRepo.update.mockResolvedValue({ ...mockCrisis, name: 'Updated' });

      const result = await service.updateCrisis(SCHOOL_ID, CRISIS_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteCrisis', () => {
    it('should delete a crisis', async () => {
      mockCrisisRepo.findById.mockResolvedValue(mockCrisis);
      mockCrisisRepo.delete.mockResolvedValue(undefined);

      await service.deleteCrisis(SCHOOL_ID, CRISIS_ID);

      expect(mockCrisisRepo.delete).toHaveBeenCalledWith(CRISIS_ID);
    });
  });

  describe('listTeams', () => {
    it('should list crisis teams', async () => {
      mockTeamRepo.findAllBySchool.mockResolvedValue([mockTeam]);

      const result = await service.listTeams(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createTeam', () => {
    it('should create a crisis team', async () => {
      mockTeamRepo.create.mockResolvedValue(mockTeam);

      const result = await service.createTeam(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Emergency Response Team',
        members: ['user-1', 'user-2'],
        role: 'FIRST_RESPONDERS',
      } as never);

      expect(result.name).toBe('Emergency Response Team');
    });
  });

  describe('listPlaybooks', () => {
    it('should list playbooks', async () => {
      mockPlaybookRepo.findAllBySchool.mockResolvedValue([mockPlaybook]);

      const result = await service.listPlaybooks(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createPlaybook', () => {
    it('should create a playbook', async () => {
      mockPlaybookRepo.create.mockResolvedValue(mockPlaybook);

      const result = await service.createPlaybook(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Flood response playbook',
        steps: ['Evacuate', 'Notify', 'Document'],
        crisisType: 'NATURAL_DISASTER',
      } as never);

      expect(result.name).toBe('Flood response playbook');
    });
  });

  describe('listCommunications', () => {
    it('should list emergency communications', async () => {
      mockCommRepo.findAllBySchool.mockResolvedValue([mockComm]);

      const result = await service.listCommunications(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('sendCommunication', () => {
    it('should send a communication', async () => {
      mockCommRepo.create.mockResolvedValue(mockComm);

      const result = await service.sendCommunication(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        crisisId: CRISIS_ID,
        channel: 'SMS',
        message: 'Evacuate immediately',
        recipients: ['all_parents'],
      } as never);

      expect(result.channel).toBe('SMS');
    });
  });

  describe('getCrisisCommandStats', () => {
    it('should return stats', async () => {
      mockCrisisRepo.findAllBySchool.mockResolvedValue([mockCrisis]);
      mockTeamRepo.findAllBySchool.mockResolvedValue([mockTeam]);
      mockPlaybookRepo.findAllBySchool.mockResolvedValue([mockPlaybook]);
      mockCommRepo.findAllBySchool.mockResolvedValue([mockComm]);

      const result = await service.getCrisisCommandStats(SCHOOL_ID);

      expect(result.totalCrises).toBe(1);
      expect(result.activeCrises).toBe(1);
      expect(result.totalTeams).toBe(1);
      expect(result.totalPlaybooks).toBe(1);
      expect(result.totalCommunications).toBe(1);
    });
  });
});
