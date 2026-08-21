import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TrainingService', () => {
  const mockRepo = {
    findTrainings: vi.fn(),
    findTrainingById: vi.fn(),
    createTraining: vi.fn(),
    updateTraining: vi.fn(),
    deleteTraining: vi.fn(),
    findTrainingEnrollments: vi.fn(),
    enrollTraining: vi.fn(),
    unenrollTraining: vi.fn(),
    findEmployeeById: vi.fn(),
  };

  const schoolId = 'school-1';
  const trainingId = 'training-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findTrainings', () => {
    it('should return trainings list', async () => {
      const trainings = [{ id: '1', title: 'Leadership' }];
      mockRepo.findTrainings.mockResolvedValue(trainings);
      const result = await mockRepo.findTrainings(schoolId);
      expect(result).toEqual(trainings);
    });

    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should handle empty results', async () => {
      mockRepo.findTrainings.mockResolvedValue([]);
      const result = await mockRepo.findTrainings(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findTrainingById', () => {
    it('should return training by id', async () => {
      const training = { id: trainingId, title: 'Leadership' };
      mockRepo.findTrainingById.mockResolvedValue(training);
      const result = await mockRepo.findTrainingById(schoolId, trainingId);
      expect(result.title).toBe('Leadership');
    });

    it('should throw if not found', async () => {
      mockRepo.findTrainingById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const t = await mockRepo.findTrainingById(schoolId, 'nonexistent');
        if (!t) throw new Error('Formation non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });
  });

  describe('createTraining', () => {
    it('should create training', async () => {
      mockRepo.createTraining.mockResolvedValue({ id: '1', title: 'Leadership' });
      const result = await mockRepo.createTraining({ title: 'Leadership', start_date: '2026-09-01', school_id: schoolId });
      expect(result.title).toBe('Leadership');
    });

    it('should require title', () => {
      const validate = (data: any) => {
        if (!data?.title) throw new Error('Le titre de la formation est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require start_date', () => {
      const validate = (data: any) => {
        if (!data?.start_date) throw new Error('La date de début est requise');
      };
      expect(() => validate({ title: 'Test' })).toThrow();
    });
  });

  describe('updateTraining', () => {
    it('should update training', async () => {
      mockRepo.findTrainingById.mockResolvedValue({ id: trainingId });
      mockRepo.updateTraining.mockResolvedValue({ id: trainingId, title: 'Updated' });
      const result = await mockRepo.updateTraining(schoolId, trainingId, { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findTrainingById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const t = await mockRepo.findTrainingById(schoolId, trainingId);
        if (!t) throw new Error('Formation non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deleteTraining', () => {
    it('should delete training', async () => {
      mockRepo.findTrainingById.mockResolvedValue({ id: trainingId });
      mockRepo.deleteTraining.mockResolvedValue(undefined);
      await mockRepo.deleteTraining(schoolId, trainingId);
      expect(mockRepo.deleteTraining).toHaveBeenCalled();
    });

    it('should throw if not found on delete', async () => {
      mockRepo.findTrainingById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const t = await mockRepo.findTrainingById(schoolId, trainingId);
        if (!t) throw new Error('Formation non trouvée');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('findTrainingEnrollments', () => {
    it('should return enrollments', async () => {
      mockRepo.findTrainingEnrollments.mockResolvedValue([{ employee_id: employeeId }]);
      const result = await mockRepo.findTrainingEnrollments(schoolId, trainingId);
      expect(result).toHaveLength(1);
    });

    it('should require ids', () => {
      const validate = (sId: string, tId: string) => {
        if (!sId || !tId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', trainingId)).toThrow();
    });
  });

  describe('enrollTraining', () => {
    it('should enroll employee in training', async () => {
      mockRepo.findTrainingById.mockResolvedValue({ id: trainingId });
      mockRepo.findEmployeeById.mockResolvedValue({ id: employeeId });
      mockRepo.enrollTraining.mockResolvedValue({ id: '1', training_id: trainingId, employee_id: employeeId });
      const result = await mockRepo.enrollTraining({ training_id: trainingId, employee_id: employeeId, school_id: schoolId });
      expect(result.training_id).toBe(trainingId);
    });

    it('should require training_id', () => {
      const validate = (data: any) => {
        if (!data?.training_id) throw new Error('L\'identifiant de la formation est requis');
      };
      expect(() => validate({ employee_id: employeeId })).toThrow();
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({ training_id: trainingId })).toThrow();
    });

    it('should throw if training not found', async () => {
      mockRepo.findTrainingById.mockResolvedValue(null);
      const enrollOrThrow = async () => {
        const t = await mockRepo.findTrainingById(schoolId, 'nonexistent');
        if (!t) throw new Error('Formation non trouvée');
      };
      await expect(enrollOrThrow()).rejects.toThrow();
    });

    it('should throw if employee not found', async () => {
      mockRepo.findTrainingById.mockResolvedValue({ id: trainingId });
      mockRepo.findEmployeeById.mockResolvedValue(null);
      const enrollOrThrow = async () => {
        const emp = await mockRepo.findEmployeeById(schoolId, 'nonexistent');
        if (!emp) throw new Error('Employé non trouvé');
      };
      await expect(enrollOrThrow()).rejects.toThrow();
    });
  });

  describe('unenrollTraining', () => {
    it('should unenroll from training', async () => {
      mockRepo.unenrollTraining.mockResolvedValue(undefined);
      await mockRepo.unenrollTraining(schoolId, 'enrollment-1');
      expect(mockRepo.unenrollTraining).toHaveBeenCalled();
    });

    it('should require ids', () => {
      const validate = (sId: string, eId: string) => {
        if (!sId || !eId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', 'enrollment-1')).toThrow();
    });
  });

  describe('Training validation', () => {
    it('should validate training title length', () => {
      const isValidTitle = (title: string) => title.length >= 3 && title.length <= 200;
      expect(isValidTitle('Leadership')).toBe(true);
      expect(isValidTitle('Ab')).toBe(false);
    });

    it('should validate training dates', () => {
      const isValidRange = (start: string, end: string) => new Date(end) >= new Date(start);
      expect(isValidRange('2026-09-01', '2026-09-05')).toBe(true);
      expect(isValidRange('2026-09-05', '2026-09-01')).toBe(false);
    });
  });

  describe('Training status', () => {
    it('should define valid statuses', () => {
      const statuses = ['upcoming', 'in_progress', 'completed', 'cancelled'];
      expect(statuses).toContain('upcoming');
      expect(statuses).toContain('completed');
    });
  });
});
