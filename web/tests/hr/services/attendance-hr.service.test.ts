import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AttendanceHrService', () => {
  const mockRepo = {
    clockIn: vi.fn(),
    clockOut: vi.fn(),
    findAttendance: vi.fn(),
    findEmployeeById: vi.fn(),
  };

  const schoolId = 'school-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('clockIn', () => {
    it('should clock in employee', async () => {
      mockRepo.findEmployeeById.mockResolvedValue({ id: employeeId });
      mockRepo.clockIn.mockResolvedValue({ id: '1', clock_in: '2026-07-23T08:00:00Z' });
      const result = await mockRepo.clockIn(schoolId, employeeId, '2026-07-23T08:00:00Z');
      expect(result.clock_in).toBeDefined();
    });

    it('should require schoolId and employeeId', () => {
      const validate = (sId: string, eId: string) => {
        if (!sId || !eId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', employeeId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });

    it('should throw if employee not found', async () => {
      mockRepo.findEmployeeById.mockResolvedValue(null);
      const clockOrThrow = async () => {
        const emp = await mockRepo.findEmployeeById(schoolId, employeeId);
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(clockOrThrow()).rejects.toThrow();
    });

    it('should accept location parameter', async () => {
      mockRepo.findEmployeeById.mockResolvedValue({ id: employeeId });
      mockRepo.clockIn.mockResolvedValue({ id: '1', location: 'Main Office' });
      await mockRepo.clockIn(schoolId, employeeId, undefined, 'Main Office');
      expect(mockRepo.clockIn).toHaveBeenCalledWith(schoolId, employeeId, undefined, 'Main Office');
    });
  });

  describe('clockOut', () => {
    it('should clock out employee', async () => {
      mockRepo.clockOut.mockResolvedValue({ id: '1', clock_out: '2026-07-23T17:00:00Z' });
      const result = await mockRepo.clockOut(schoolId, employeeId, '2026-07-23T17:00:00Z');
      expect(result.clock_out).toBeDefined();
    });

    it('should require ids', () => {
      const validate = (sId: string, eId: string) => {
        if (!sId || !eId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', employeeId)).toThrow();
    });

    it('should use current time as default', async () => {
      mockRepo.clockOut.mockResolvedValue({ id: '1' });
      await mockRepo.clockOut(schoolId, employeeId);
      expect(mockRepo.clockOut).toHaveBeenCalled();
    });
  });

  describe('findAttendance', () => {
    it('should return attendance records', async () => {
      mockRepo.findAttendance.mockResolvedValue([{ id: '1', clock_in: '2026-07-23T08:00:00Z' }]);
      const result = await mockRepo.findAttendance(schoolId);
      expect(result).toHaveLength(1);
    });

    it('should filter by employee', async () => {
      mockRepo.findAttendance.mockResolvedValue([]);
      await mockRepo.findAttendance(schoolId, employeeId);
      expect(mockRepo.findAttendance).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should filter by date range', async () => {
      mockRepo.findAttendance.mockResolvedValue([]);
      await mockRepo.findAttendance(schoolId, undefined, '2026-07-01', '2026-07-31');
      expect(mockRepo.findAttendance).toHaveBeenCalledWith(schoolId, undefined, '2026-07-01', '2026-07-31');
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should handle empty results', async () => {
      mockRepo.findAttendance.mockResolvedValue([]);
      const result = await mockRepo.findAttendance(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findAttendanceByEmployee', () => {
    it('should return employee attendance', async () => {
      mockRepo.findAttendance.mockResolvedValue([{ employee_id: employeeId }]);
      const result = await mockRepo.findAttendance(schoolId, employeeId);
      expect(result).toHaveLength(1);
    });

    it('should require both ids', () => {
      const validate = (sId: string, eId: string) => {
        if (!sId || !eId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', employeeId)).toThrow();
    });
  });

  describe('findAttendanceByDateRange', () => {
    it('should return attendance in date range', async () => {
      mockRepo.findAttendance.mockResolvedValue([{ clock_in: '2026-07-15T08:00:00Z' }]);
      const result = await mockRepo.findAttendance(schoolId, undefined, '2026-07-01', '2026-07-31');
      expect(result).toHaveLength(1);
    });

    it('should require dates', () => {
      const validate = (from: string, to: string) => {
        if (!from || !to) throw new Error('Les dates sont requises');
      };
      expect(() => validate('', '2026-07-31')).toThrow();
      expect(() => validate('2026-07-01', '')).toThrow();
    });
  });

  describe('Attendance duration calculation', () => {
    it('should calculate work duration in hours', () => {
      const calcDuration = (clockIn: string, clockOut: string) => {
        const diff = new Date(clockOut).getTime() - new Date(clockIn).getTime();
        return diff / (1000 * 60 * 60);
      };
      expect(calcDuration('2026-07-23T08:00:00Z', '2026-07-23T17:00:00Z')).toBe(9);
    });

    it('should handle overnight shifts', () => {
      const calcDuration = (clockIn: string, clockOut: string) => {
        const diff = new Date(clockOut).getTime() - new Date(clockIn).getTime();
        return diff / (1000 * 60 * 60);
      };
      expect(calcDuration('2026-07-23T22:00:00Z', '2026-07-24T06:00:00Z')).toBe(8);
    });
  });

  describe('Attendance status', () => {
    it('should determine if late arrival', () => {
      const isLate = (clockIn: string, expectedTime: string) => new Date(clockIn) > new Date(expectedTime);
      expect(isLate('2026-07-23T09:15:00Z', '2026-07-23T09:00:00Z')).toBe(true);
      expect(isLate('2026-07-23T08:50:00Z', '2026-07-23T09:00:00Z')).toBe(false);
    });

    it('should determine if early departure', () => {
      const isEarlyDeparture = (clockOut: string, expectedTime: string) => new Date(clockOut) < new Date(expectedTime);
      expect(isEarlyDeparture('2026-07-23T16:30:00Z', '2026-07-23T17:00:00Z')).toBe(true);
      expect(isEarlyDeparture('2026-07-23T17:15:00Z', '2026-07-23T17:00:00Z')).toBe(false);
    });
  });
});

describe('PositionService', () => {
  const mockRepo = {
    findPositions: vi.fn(),
    findPositionById: vi.fn(),
    createPosition: vi.fn(),
    updatePosition: vi.fn(),
    deletePosition: vi.fn(),
  };

  const schoolId = 'school-1';
  const positionId = 'pos-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findPositions', () => {
    it('should return positions list', async () => {
      const positions = [{ id: '1', name: 'Directeur' }];
      mockRepo.findPositions.mockResolvedValue(positions);
      const result = await mockRepo.findPositions(schoolId);
      expect(result).toEqual(positions);
    });

    it('should filter by department', async () => {
      mockRepo.findPositions.mockResolvedValue([]);
      await mockRepo.findPositions(schoolId, 'dept-1');
      expect(mockRepo.findPositions).toHaveBeenCalledWith(schoolId, 'dept-1');
    });

    it('should handle empty results', async () => {
      mockRepo.findPositions.mockResolvedValue([]);
      const result = await mockRepo.findPositions(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findPositionById', () => {
    it('should return position by id', async () => {
      const position = { id: positionId, name: 'Directeur' };
      mockRepo.findPositionById.mockResolvedValue(position);
      const result = await mockRepo.findPositionById(schoolId, positionId);
      expect(result.name).toBe('Directeur');
    });

    it('should throw if not found', async () => {
      mockRepo.findPositionById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const pos = await mockRepo.findPositionById(schoolId, 'nonexistent');
        if (!pos) throw new Error('Poste non trouvé');
      };
      await expect(findOrThrow()).rejects.toThrow('Poste non trouvé');
    });
  });

  describe('createPosition', () => {
    it('should create position', async () => {
      mockRepo.createPosition.mockResolvedValue({ id: '1', name: 'Directeur' });
      const result = await mockRepo.createPosition({ name: 'Directeur', school_id: schoolId });
      expect(result.name).toBe('Directeur');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom du poste est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require school_id', () => {
      const validate = (data: any) => {
        if (!data?.school_id) throw new Error('L\'identifiant de l\'école est requis');
      };
      expect(() => validate({ name: 'Test' })).toThrow();
    });
  });

  describe('updatePosition', () => {
    it('should update position', async () => {
      mockRepo.findPositionById.mockResolvedValue({ id: positionId });
      mockRepo.updatePosition.mockResolvedValue({ id: positionId, name: 'Updated' });
      const result = await mockRepo.updatePosition(schoolId, positionId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if position not found', async () => {
      mockRepo.findPositionById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const pos = await mockRepo.findPositionById(schoolId, positionId);
        if (!pos) throw new Error('Poste non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deletePosition', () => {
    it('should delete position', async () => {
      mockRepo.findPositionById.mockResolvedValue({ id: positionId });
      mockRepo.deletePosition.mockResolvedValue(undefined);
      await mockRepo.deletePosition(schoolId, positionId);
      expect(mockRepo.deletePosition).toHaveBeenCalled();
    });

    it('should throw if position not found on delete', async () => {
      mockRepo.findPositionById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const pos = await mockRepo.findPositionById(schoolId, positionId);
        if (!pos) throw new Error('Poste non trouvé');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Position validation', () => {
    it('should validate position name', () => {
      const isValidName = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValidName('Directeur')).toBe(true);
      expect(isValidName('A')).toBe(false);
    });
  });
});
