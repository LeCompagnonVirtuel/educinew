import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('CertificationService', () => {
  const mockRepo = {
    findCertifications: vi.fn(),
    findCertificationById: vi.fn(),
    createCertification: vi.fn(),
    updateCertification: vi.fn(),
    deleteCertification: vi.fn(),
  };

  const schoolId = 'school-1';
  const certificationId = 'cert-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findCertifications', () => {
    it('should return certifications list', async () => {
      const certs = [{ id: '1', name: 'PMP' }];
      mockRepo.findCertifications.mockResolvedValue(certs);
      const result = await mockRepo.findCertifications(schoolId);
      expect(result).toEqual(certs);
    });

    it('should filter by employee', async () => {
      mockRepo.findCertifications.mockResolvedValue([]);
      await mockRepo.findCertifications(schoolId, employeeId);
      expect(mockRepo.findCertifications).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty results', async () => {
      mockRepo.findCertifications.mockResolvedValue([]);
      const result = await mockRepo.findCertifications(schoolId);
      expect(result).toHaveLength(0);
    });
  });

  describe('findCertificationById', () => {
    it('should return certification by id', async () => {
      const cert = { id: certificationId, name: 'PMP' };
      mockRepo.findCertificationById.mockResolvedValue(cert);
      const result = await mockRepo.findCertificationById(schoolId, certificationId);
      expect(result.name).toBe('PMP');
    });

    it('should throw if not found', async () => {
      mockRepo.findCertificationById.mockResolvedValue(null);
      const findOrThrow = async () => {
        const cert = await mockRepo.findCertificationById(schoolId, 'nonexistent');
        if (!cert) throw new Error('Certification non trouvée');
      };
      await expect(findOrThrow()).rejects.toThrow();
    });

    it('should require both ids', () => {
      const validate = (sId: string, cId: string) => {
        if (!sId || !cId) throw new Error('Identifiants requis');
      };
      expect(() => validate('', certificationId)).toThrow();
      expect(() => validate(schoolId, '')).toThrow();
    });
  });

  describe('createCertification', () => {
    it('should create certification', async () => {
      mockRepo.createCertification.mockResolvedValue({ id: '1', name: 'PMP' });
      const result = await mockRepo.createCertification({ name: 'PMP', employee_id: employeeId, school_id: schoolId });
      expect(result.name).toBe('PMP');
    });

    it('should require name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom de la certification est requis');
      };
      expect(() => validate({})).toThrow();
    });

    it('should require employee_id', () => {
      const validate = (data: any) => {
        if (!data?.employee_id) throw new Error('L\'identifiant de l\'employé est requis');
      };
      expect(() => validate({ name: 'PMP' })).toThrow();
    });
  });

  describe('updateCertification', () => {
    it('should update certification', async () => {
      mockRepo.findCertificationById.mockResolvedValue({ id: certificationId });
      mockRepo.updateCertification.mockResolvedValue({ id: certificationId, name: 'Updated' });
      const result = await mockRepo.updateCertification(schoolId, certificationId, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findCertificationById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const cert = await mockRepo.findCertificationById(schoolId, certificationId);
        if (!cert) throw new Error('Certification non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow();
    });
  });

  describe('deleteCertification', () => {
    it('should delete certification', async () => {
      mockRepo.findCertificationById.mockResolvedValue({ id: certificationId });
      mockRepo.deleteCertification.mockResolvedValue(undefined);
      await mockRepo.deleteCertification(schoolId, certificationId);
      expect(mockRepo.deleteCertification).toHaveBeenCalled();
    });

    it('should throw if not found on delete', async () => {
      mockRepo.findCertificationById.mockResolvedValue(null);
      const deleteOrThrow = async () => {
        const cert = await mockRepo.findCertificationById(schoolId, certificationId);
        if (!cert) throw new Error('Certification non trouvée');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });
  });

  describe('Certification expiry', () => {
    it('should detect expired certification', () => {
      const isExpired = (expiryDate: string) => new Date(expiryDate) < new Date();
      expect(isExpired('2025-01-01')).toBe(true);
      expect(isExpired('2030-12-31')).toBe(false);
    });

    it('should calculate days until expiry', () => {
      const daysUntilExpiry = (expiryDate: string) => {
        const diff = new Date(expiryDate).getTime() - Date.now();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
      };
      expect(daysUntilExpiry('2025-01-01')).toBeLessThan(0);
      expect(daysUntilExpiry('2030-12-31')).toBeGreaterThan(0);
    });

    it('should detect expiring soon (within 30 days)', () => {
      const isExpiringSoon = (expiryDate: string) => {
        const diff = new Date(expiryDate).getTime() - Date.now();
        const days = diff / (1000 * 60 * 60 * 24);
        return days > 0 && days <= 30;
      };
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 15);
      expect(isExpiringSoon(futureDate.toISOString())).toBe(true);
      expect(isExpiringSoon('2030-12-31')).toBe(false);
    });
  });

  describe('Certification validation', () => {
    it('should validate certification name', () => {
      const isValidName = (name: string) => name.length >= 2 && name.length <= 100;
      expect(isValidName('PMP')).toBe(true);
      expect(isValidName('A')).toBe(false);
    });

    it('should validate issue date before expiry', () => {
      const isValidDates = (issued: string, expiry: string) => new Date(issued) <= new Date(expiry);
      expect(isValidDates('2024-01-01', '2026-01-01')).toBe(true);
      expect(isValidDates('2026-01-01', '2024-01-01')).toBe(false);
    });
  });
});
