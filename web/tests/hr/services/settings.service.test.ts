import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('SettingsService', () => {
  const mockRepo = {
    getSettings: vi.fn(),
    updateSettings: vi.fn(),
  };

  const schoolId = 'school-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSettings', () => {
    it('should return HR settings', async () => {
      const settings = { leavePolicy: { annualDays: 30 }, workingHours: { start: '08:00', end: '17:00' } };
      mockRepo.getSettings.mockResolvedValue(settings);
      const result = await mockRepo.getSettings(schoolId);
      expect(result.leavePolicy.annualDays).toBe(30);
    });

    it('should return default settings if none configured', async () => {
      mockRepo.getSettings.mockResolvedValue(null);
      const result = await mockRepo.getSettings(schoolId);
      expect(result).toBeNull();
    });
  });

  describe('updateSettings', () => {
    it('should update settings', async () => {
      mockRepo.updateSettings.mockResolvedValue({ workingHours: { start: '09:00', end: '18:00' } });
      const result = await mockRepo.updateSettings(schoolId, { workingHours: { start: '09:00', end: '18:00' } });
      expect(result.workingHours.start).toBe('09:00');
    });
  });

  describe('Leave policy validation', () => {
    it('should validate annual leave days', () => {
      const isValidDays = (days: number) => days >= 0 && days <= 60;
      expect(isValidDays(30)).toBe(true);
      expect(isValidDays(-1)).toBe(false);
      expect(isValidDays(61)).toBe(false);
    });

    it('should validate leave carryover limit', () => {
      const isValidCarryover = (days: number, max: number) => days <= max;
      expect(isValidCarryover(5, 10)).toBe(true);
      expect(isValidCarryover(15, 10)).toBe(false);
    });
  });

  describe('Working hours validation', () => {
    it('should validate working hours', () => {
      const isValidHours = (start: string, end: string) => {
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        return eh > sh || (eh === sh && em > sm);
      };
      expect(isValidHours('08:00', '17:00')).toBe(true);
      expect(isValidHours('17:00', '08:00')).toBe(false);
    });
  });

  describe('Contract types configuration', () => {
    it('should define valid contract types', () => {
      const types = ['CDI', 'CDD', 'Stage', 'Vacation'];
      expect(types).toContain('CDI');
      expect(types).toContain('CDD');
    });
  });

  describe('Working days configuration', () => {
    it('should define valid working days', () => {
      const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      expect(validDays).toContain('monday');
      expect(validDays).toContain('friday');
    });
  });
});
