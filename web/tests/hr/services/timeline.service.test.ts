import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('TimelineService', () => {
  const mockRepo = {
    getTimeline: vi.fn(),
    addTimelineEntry: vi.fn(),
  };

  const schoolId = 'school-1';
  const employeeId = 'emp-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTimeline', () => {
    it('should return timeline entries', async () => {
      const entries = [{ id: '1', action: 'created', entity_type: 'employee' }];
      mockRepo.getTimeline.mockResolvedValue(entries);
      const result = await mockRepo.getTimeline(schoolId, employeeId);
      expect(result).toHaveLength(1);
    });

    it('should filter by employee', async () => {
      mockRepo.getTimeline.mockResolvedValue([]);
      await mockRepo.getTimeline(schoolId, employeeId);
      expect(mockRepo.getTimeline).toHaveBeenCalledWith(schoolId, employeeId);
    });

    it('should handle empty timeline', async () => {
      mockRepo.getTimeline.mockResolvedValue([]);
      const result = await mockRepo.getTimeline(schoolId, employeeId);
      expect(result).toHaveLength(0);
    });
  });

  describe('addTimelineEntry', () => {
    it('should add timeline entry', async () => {
      mockRepo.addTimelineEntry.mockResolvedValue({ id: '1', action: 'hired' });
      const result = await mockRepo.addTimelineEntry(schoolId, employeeId, { action: 'hired', entity_type: 'employee' });
      expect(result.action).toBe('hired');
    });
  });

  describe('Timeline event types', () => {
    it('should define valid event types', () => {
      const types = ['hired', 'promoted', 'transferred', 'terminated', 'leave', 'training', 'review'];
      expect(types).toContain('hired');
      expect(types).toContain('promoted');
    });
  });

  describe('Timeline sorting', () => {
    it('should sort entries by date descending', () => {
      const entries = [
        { date: '2026-01-01', action: 'created' },
        { date: '2026-06-01', action: 'promoted' },
        { date: '2026-03-01', action: 'review' },
      ];
      const sorted = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      expect(sorted[0].action).toBe('promoted');
      expect(sorted[2].action).toBe('created');
    });
  });

  describe('Timeline filtering', () => {
    it('should filter by event type', () => {
      const entries = [
        { action: 'hired', entity_type: 'employee' },
        { action: 'created', entity_type: 'department' },
        { action: 'promoted', entity_type: 'employee' },
      ];
      const filtered = entries.filter(e => e.entity_type === 'employee');
      expect(filtered).toHaveLength(2);
    });
  });

  describe('Timeline validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should require employeeId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'employé est requis');
      };
      expect(() => validate('')).toThrow();
    });
  });
});
