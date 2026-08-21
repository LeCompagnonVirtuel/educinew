import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeaesipControlCenterService } from '../control-center.service';

const mockCenterRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockCockpitRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockAlertRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const mockQueueRepo = {
  findAllBySchool: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const CENTER_ID = '660e8400-e29b-41d4-a716-446655440001';
const ALERT_ID = '770e8400-e29b-41d4-a716-446655440002';
const QUEUE_ID = '880e8400-e29b-41d4-a716-446655440003';
const COCKPIT_ID = '990e8400-e29b-41d4-a716-446655440004';

const mockCenter = {
  id: CENTER_ID,
  school_id: SCHOOL_ID,
  name: 'Main Control Center',
  type: 'OPERATIONAL',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockCockpit = {
  id: COCKPIT_ID,
  school_id: SCHOOL_ID,
  name: 'Executive Dashboard',
  widgets: ['enrollment', 'finance'],
  computedAt: new Date().toISOString(),
};

const mockAlert = {
  id: ALERT_ID,
  school_id: SCHOOL_ID,
  title: 'Low attendance',
  severity: 'HIGH',
  acknowledged: false,
  acknowledgedBy: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockQueue = {
  id: QUEUE_ID,
  school_id: SCHOOL_ID,
  name: 'Approval Queue',
  priority: 1,
  status: 'pending',
  created_at: new Date().toISOString(),
};

let service: GeaesipControlCenterService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new GeaesipControlCenterService(
    mockCenterRepo as never,
    mockCockpitRepo as never,
    mockAlertRepo as never,
    mockQueueRepo as never,
  );
});

describe('GeaesipControlCenterService', () => {
  describe('listCenters', () => {
    it('should list centers for a school', async () => {
      mockCenterRepo.findAllBySchool.mockResolvedValue([mockCenter]);

      const result = await service.listCenters(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listCenters('')).rejects.toThrow();
    });
  });

  describe('getCenter', () => {
    it('should retrieve a center by id', async () => {
      mockCenterRepo.findById.mockResolvedValue(mockCenter);

      const result = await service.getCenter(SCHOOL_ID, CENTER_ID);

      expect(result).toEqual(mockCenter);
    });

    it('should throw if center not found', async () => {
      mockCenterRepo.findById.mockImplementation(() => { throw new Error('Not found'); });

      await expect(service.getCenter(SCHOOL_ID, 'nonexistent')).rejects.toThrow();
    });
  });

  describe('createCenter', () => {
    it('should create a center successfully', async () => {
      mockCenterRepo.create.mockResolvedValue(mockCenter);

      const result = await service.createCenter(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Main Control Center',
        type: 'OPERATIONAL',
        status: 'active',
      } as never);

      expect(result).toEqual(mockCenter);
    });
  });

  describe('updateCenter', () => {
    it('should update a center', async () => {
      mockCenterRepo.findById.mockResolvedValue(mockCenter);
      mockCenterRepo.update.mockResolvedValue({ ...mockCenter, name: 'Updated' });

      const result = await service.updateCenter(SCHOOL_ID, CENTER_ID, { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteCenter', () => {
    it('should delete a center', async () => {
      mockCenterRepo.findById.mockResolvedValue(mockCenter);
      mockCenterRepo.delete.mockResolvedValue(undefined);

      await service.deleteCenter(SCHOOL_ID, CENTER_ID);

      expect(mockCenterRepo.delete).toHaveBeenCalledWith(CENTER_ID);
    });
  });

  describe('listCockpits', () => {
    it('should list cockpits for a school', async () => {
      mockCockpitRepo.findAllBySchool.mockResolvedValue([mockCockpit]);

      const result = await service.listCockpits(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('getCockpit', () => {
    it('should retrieve a cockpit by id', async () => {
      mockCockpitRepo.findById.mockResolvedValue(mockCockpit);

      const result = await service.getCockpit(SCHOOL_ID, COCKPIT_ID);

      expect(result).toEqual(mockCockpit);
    });
  });

  describe('listAlerts', () => {
    it('should list alerts for a school', async () => {
      mockAlertRepo.findAllBySchool.mockResolvedValue([mockAlert]);

      const result = await service.listAlerts(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createAlert', () => {
    it('should create an alert successfully', async () => {
      mockAlertRepo.create.mockResolvedValue(mockAlert);

      const result = await service.createAlert(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        title: 'Low attendance',
        severity: 'HIGH',
      } as never);

      expect(result.title).toBe('Low attendance');
    });
  });

  describe('acknowledgeAlert', () => {
    it('should acknowledge an alert', async () => {
      mockAlertRepo.findById.mockResolvedValue(mockAlert);
      mockAlertRepo.update.mockResolvedValue({ ...mockAlert, acknowledged: true, acknowledgedBy: 'user-1' });

      const result = await service.acknowledgeAlert(SCHOOL_ID, ALERT_ID, 'user-1');

      expect(result.acknowledged).toBe(true);
      expect(result.acknowledgedBy).toBe('user-1');
    });
  });

  describe('listUnacknowledgedAlerts', () => {
    it('should filter unacknowledged alerts', async () => {
      const acked = { ...mockAlert, acknowledged: true };
      mockAlertRepo.findAllBySchool.mockResolvedValue([mockAlert, acked]);

      const result = await service.listUnacknowledgedAlerts(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('listDecisionQueues', () => {
    it('should list decision queues', async () => {
      mockQueueRepo.findAllBySchool.mockResolvedValue([mockQueue]);

      const result = await service.listDecisionQueues(SCHOOL_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('createDecisionQueue', () => {
    it('should create a decision queue', async () => {
      mockQueueRepo.create.mockResolvedValue(mockQueue);

      const result = await service.createDecisionQueue(SCHOOL_ID, {
        school_id: SCHOOL_ID,
        name: 'Approval Queue',
        priority: 1,
        status: 'pending',
      } as never);

      expect(result.name).toBe('Approval Queue');
    });
  });

  describe('getControlCenterStats', () => {
    it('should return stats', async () => {
      mockCenterRepo.findAllBySchool.mockResolvedValue([mockCenter]);
      mockCockpitRepo.findAllBySchool.mockResolvedValue([mockCockpit]);
      mockAlertRepo.findAllBySchool.mockResolvedValue([mockAlert]);
      mockQueueRepo.findAllBySchool.mockResolvedValue([mockQueue]);

      const result = await service.getControlCenterStats(SCHOOL_ID);

      expect(result.totalCenters).toBe(1);
      expect(result.totalCockpits).toBe(1);
      expect(result.totalAlerts).toBe(1);
      expect(result.unacknowledgedAlerts).toBe(1);
      expect(result.totalDecisionQueues).toBe(1);
    });
  });
});
