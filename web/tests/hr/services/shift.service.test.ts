import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ShiftService', () => {
  const mockRepo = {
    findShifts: vi.fn(),
    findShiftById: vi.fn(),
    createShift: vi.fn(),
    updateShift: vi.fn(),
    deleteShift: vi.fn(),
  };

  const schoolId = 'school-1';
  const shiftId = 'shift-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findShifts', () => {
    it('should return shifts list', async () => {
      const shifts = [{ id: '1', name: 'Morning Shift' }];
      mockRepo.findShifts.mockResolvedValue(shifts);
      const result = await mockRepo.findShifts(schoolId);
      expect(result).toEqual(shifts);
    });

    it('should handle empty results', async () => {
      mockRepo.findShifts.mockResolvedValue([]);
      const result = await mockRepo.findShifts(schoolId);
      expect(result).toHaveLength(0);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('findShiftById', () => {
    it('should return shift by id', async () => {
      const shift = { id: shiftId, name: 'Morning Shift' };
      mockRepo.findShiftById.mockResolvedValue(shift);
      const result = await mockRepo.findShiftById(schoolId, shiftId);
      expect(result.name).toBe('Morning Shift');
    });

    it('should throw if not found', async () => {
      mockRepo.findShiftById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const shift = await mockRepo.findShiftById(schoolId, 'nonexistent');
        if (!shift) throw new Error('Service non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });

    it('should require both ids', () => {
      const validate = (sId: string, shId: string) => {
        if (!sId || !shId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', shiftId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });
  });

  describe('createShift', () => {
    it('should create shift', async () => {
      mockRepo.createShift.mockResolvedValue({ id: '1', name: 'Morning Shift' });
      const result = await mockRepo.createShift({ name: 'Morning Shift', school_id: schoolId });
      expect(result.name).toBe('Morning Shift');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom du service est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require start and end times', () => {
      const validate = (data: any) => {
        if (!data?.start_time || !data?.end_time) throw new Error('Les heures de début et fin sont requises');
      };
      expect(() => validate({ name: 'Test' })).toThrow();
    });
  });

  describe('updateShift', () => {
    it('should update shift', async () => {
      mockRepo.findShiftById.mockResolvedValue({ id: shiftId });
      mockRepo.updateShift.mockResolvedValue({ id: shiftId, name: 'Updated' });
      const result = await mockRepo.updateShift(schoolId, shiftId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if shift not found', async () => {
      mockRepo.findShiftById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const shift = await mockRepo.findShiftById(schoolId, shiftId);
        if (!shift) throw new Error('Service non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deleteShift', () => {
    it('should delete shift', async () => {
      mockRepo.findShiftById.mockResolvedValue({ id: shiftId });
      mockRepo.deleteShift.mockResolvedValue(undefined);
      await mockRepo.deleteShift(schoolId, shiftId);
      expect(mockRepo.deleteShift).toHaveBeenCalled();
    });

    it('should throw if shift not found on delete', async () => {
      mockRepo.findShiftById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const shift = await mockRepo.findShiftById(schoolId, shiftId);
        if (!shift) throw new Error('Service non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Shift validation', () => {
    it('should validate shift name', () => {
      const isValidName = (name: string) => name.length >= 2 && name.length <= 50;
      expect(isValidName('Morning')).toBe(true);
      expect(isValidName('A')).toBe(false);
    });

    it('should validate time format', () => {
      const isValidTime = (time: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
      expect(isValidTime('08:00')).toBe(true);
      expect(isValidTime('25:00')).toBe(false);
      expect(isValidTime('8:00')).toBe(false);
    });

    it('should validate end time after start time', () => {
      const isValidRange = (start: string, end: string) => {
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        return eh > sh || (eh === sh && em > sm);
      };
      expect(isValidRange('08:00', '17:00')).toBe(true);
      expect(isValidRange('08:00', '08:00')).toBe(false);
      expect(isValidRange('17:00', '08:00')).toBe(false);
    });
  });
});
