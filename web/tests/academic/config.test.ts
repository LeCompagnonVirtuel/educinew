import { describe, it, expect } from 'vitest';
import {
  ACADEMIC_YEAR,
  ACADEMIC_LEVELS,
  ACADEMIC_ROOMS,
  ACADEMIC_SCHEDULE,
  ACADEMIC_ASSIGNMENTS,
  ACADEMIC_CONFLICTS,
  ACADEMIC_CALENDAR,
  ACADEMIC_STATISTICS,
  ACADEMIC_SEARCH,
  ACADEMIC_IMPORT,
  ACADEMIC_EXPORT,
  ACADEMIC_PERMISSIONS,
} from '@educi/config';

describe('Academic Config', () => {
  describe('ACADEMIC_YEAR', () => {
    it('should have valid statuses', () => {
      expect(ACADEMIC_YEAR.STATUSES).toContain('DRAFT');
      expect(ACADEMIC_YEAR.STATUSES).toContain('ACTIVE');
      expect(ACADEMIC_YEAR.STATUSES).toContain('COMPLETED');
      expect(ACADEMIC_YEAR.STATUSES).toContain('ARCHIVED');
    });

    it('should have valid max terms', () => {
      expect(ACADEMIC_YEAR.MAX_TERMS).toBe(4);
    });

    it('should have valid duration limits', () => {
      expect(ACADEMIC_YEAR.MIN_DURATION_DAYS).toBeLessThan(ACADEMIC_YEAR.MAX_DURATION_DAYS);
    });

    it('should have default terms count', () => {
      expect(ACADEMIC_YEAR.DEFAULT_TERMS_COUNT).toBe(3);
    });
  });

  describe('ACADEMIC_LEVELS', () => {
    it('should have valid cycles', () => {
      expect(ACADEMIC_LEVELS.CYCLES).toContain('MATERNELLE');
      expect(ACADEMIC_LEVELS.CYCLES).toContain('PRIMAIRE');
      expect(ACADEMIC_LEVELS.CYCLES).toContain('COLLEGE');
      expect(ACADEMIC_LEVELS.CYCLES).toContain('LYCEE');
      expect(ACADEMIC_LEVELS.CYCLES).toContain('SUPERIEUR');
    });

    it('should have default order', () => {
      expect(ACADEMIC_LEVELS.DEFAULT_ORDER).toBe(1);
    });
  });

  describe('ACADEMIC_ROOMS', () => {
    it('should have valid types', () => {
      expect(ACADEMIC_ROOMS.TYPES).toContain('NORMAL');
      expect(ACADEMIC_ROOMS.TYPES).toContain('LABORATORY');
      expect(ACADEMIC_ROOMS.TYPES).toContain('COMPUTER');
    });

    it('should have valid statuses', () => {
      expect(ACADEMIC_ROOMS.STATUSES).toContain('AVAILABLE');
      expect(ACADEMIC_ROOMS.STATUSES).toContain('OCCUPIED');
      expect(ACADEMIC_ROOMS.STATUSES).toContain('MAINTENANCE');
      expect(ACADEMIC_ROOMS.STATUSES).toContain('ARCHIVED');
    });

    it('should have valid capacity limits', () => {
      expect(ACADEMIC_ROOMS.MIN_CAPACITY).toBeLessThan(ACADEMIC_ROOMS.MAX_CAPACITY);
      expect(ACADEMIC_ROOMS.DEFAULT_CAPACITY).toBeGreaterThanOrEqual(ACADEMIC_ROOMS.MIN_CAPACITY);
      expect(ACADEMIC_ROOMS.DEFAULT_CAPACITY).toBeLessThanOrEqual(ACADEMIC_ROOMS.MAX_CAPACITY);
    });
  });

  describe('ACADEMIC_SCHEDULE', () => {
    it('should have valid day names', () => {
      expect(ACADEMIC_SCHEDULE.DAY_NAMES).toHaveLength(7);
      expect(ACADEMIC_SCHEDULE.DAY_NAMES).toContain('Lundi');
      expect(ACADEMIC_SCHEDULE.DAY_NAMES).toContain('Dimanche');
    });

    it('should have valid hours', () => {
      expect(ACADEMIC_SCHEDULE.DEFAULT_START_HOUR).toBeLessThan(ACADEMIC_SCHEDULE.DEFAULT_END_HOUR);
    });

    it('should have valid slot durations', () => {
      expect(ACADEMIC_SCHEDULE.SLOT_DURATION_MINUTES).toBeGreaterThan(0);
      expect(ACADEMIC_SCHEDULE.BREAK_DURATION_MINUTES).toBeGreaterThanOrEqual(0);
    });

    it('should have valid max limits', () => {
      expect(ACADEMIC_SCHEDULE.MAX_SLOTS_PER_DAY).toBeGreaterThan(0);
      expect(ACADEMIC_SCHEDULE.MAX_HOURS_PER_TEACHER_PER_DAY).toBeGreaterThan(0);
    });
  });

  describe('ACADEMIC_ASSIGNMENTS', () => {
    it('should have valid statuses', () => {
      expect(ACADEMIC_ASSIGNMENTS.STATUSES).toContain('ACTIVE');
      expect(ACADEMIC_ASSIGNMENTS.STATUSES).toContain('INACTIVE');
      expect(ACADEMIC_ASSIGNMENTS.STATUSES).toContain('COMPLETED');
      expect(ACADEMIC_ASSIGNMENTS.STATUSES).toContain('ARCHIVED');
    });

    it('should have valid hours limits', () => {
      expect(ACADEMIC_ASSIGNMENTS.MIN_HOURS_PER_WEEK).toBeLessThan(ACADEMIC_ASSIGNMENTS.MAX_HOURS_PER_WEEK);
    });
  });

  describe('ACADEMIC_CONFLICTS', () => {
    it('should have valid types', () => {
      expect(ACADEMIC_CONFLICTS.TYPES).toContain('TEACHER');
      expect(ACADEMIC_CONFLICTS.TYPES).toContain('ROOM');
      expect(ACADEMIC_CONFLICTS.TYPES).toContain('CLASS');
    });

    it('should have valid severities', () => {
      expect(ACADEMIC_CONFLICTS.SEVERITIES).toContain('LOW');
      expect(ACADEMIC_CONFLICTS.SEVERITIES).toContain('HIGH');
      expect(ACADEMIC_CONFLICTS.SEVERITIES).toContain('CRITICAL');
    });
  });

  describe('ACADEMIC_CALENDAR', () => {
    it('should have valid event types', () => {
      expect(ACADEMIC_CALENDAR.EVENT_TYPES).toContain('TRIMESTER');
      expect(ACADEMIC_CALENDAR.EVENT_TYPES).toContain('EXAM');
      expect(ACADEMIC_CALENDAR.EVENT_TYPES).toContain('VACATION');
    });

    it('should have valid max events', () => {
      expect(ACADEMIC_CALENDAR.MAX_EVENTS_PER_YEAR).toBeGreaterThan(0);
    });
  });

  describe('ACADEMIC_STATISTICS', () => {
    it('should have valid refresh interval', () => {
      expect(ACADEMIC_STATISTICS.REFRESH_INTERVAL_MS).toBeGreaterThan(0);
    });

    it('should have valid cache duration', () => {
      expect(ACADEMIC_STATISTICS.CACHE_DURATION_MS).toBeGreaterThan(0);
    });
  });

  describe('ACADEMIC_SEARCH', () => {
    it('should have valid min query length', () => {
      expect(ACADEMIC_SEARCH.MIN_QUERY_LENGTH).toBeGreaterThanOrEqual(1);
    });

    it('should have valid max results', () => {
      expect(ACADEMIC_SEARCH.MAX_RESULTS).toBeGreaterThan(0);
    });

    it('should have valid debounce', () => {
      expect(ACADEMIC_SEARCH.DEBOUNCE_MS).toBeGreaterThan(0);
    });

    it('should have valid search types', () => {
      expect(ACADEMIC_SEARCH.TYPES).toContain('CLASS');
      expect(ACADEMIC_SEARCH.TYPES).toContain('ROOM');
      expect(ACADEMIC_SEARCH.TYPES).toContain('SUBJECT');
    });
  });

  describe('ACADEMIC_IMPORT', () => {
    it('should have valid supported formats', () => {
      expect(ACADEMIC_IMPORT.SUPPORTED_FORMATS).toContain('CSV');
      expect(ACADEMIC_IMPORT.SUPPORTED_FORMATS).toContain('EXCEL');
    });

    it('should have valid CSV delimiters', () => {
      expect(ACADEMIC_IMPORT.CSV_DELIMITERS).toContain(',');
      expect(ACADEMIC_IMPORT.CSV_DELIMITERS).toContain(';');
    });

    it('should have valid max rows', () => {
      expect(ACADEMIC_IMPORT.MAX_ROWS).toBeGreaterThan(0);
    });
  });

  describe('ACADEMIC_EXPORT', () => {
    it('should have valid formats', () => {
      expect(ACADEMIC_EXPORT.FORMATS).toContain('PDF');
      expect(ACADEMIC_EXPORT.FORMATS).toContain('EXCEL');
      expect(ACADEMIC_EXPORT.FORMATS).toContain('CSV');
      expect(ACADEMIC_EXPORT.FORMATS).toContain('JSON');
    });

    it('should have valid max rows', () => {
      expect(ACADEMIC_EXPORT.MAX_ROWS).toBeGreaterThan(0);
    });
  });

  describe('ACADEMIC_PERMISSIONS', () => {
    it('should have CREATE_CLASS permission', () => {
      expect(ACADEMIC_PERMISSIONS.CREATE_CLASS).toContain('ADMIN');
      expect(ACADEMIC_PERMISSIONS.CREATE_CLASS).toContain('SUPER_ADMIN');
    });

    it('should have READ_CLASS permission with more roles', () => {
      expect(ACADEMIC_PERMISSIONS.READ_CLASS.length).toBeGreaterThanOrEqual(ACADEMIC_PERMISSIONS.CREATE_CLASS.length);
    });

    it('should have MANAGE_SCHEDULE permission', () => {
      expect(ACADEMIC_PERMISSIONS.MANAGE_SCHEDULE).toContain('ADMIN');
      expect(ACADEMIC_PERMISSIONS.MANAGE_SCHEDULE).toContain('SUPER_ADMIN');
    });

    it('should have VIEW_STATISTICS permission', () => {
      expect(ACADEMIC_PERMISSIONS.VIEW_STATISTICS).toContain('DIRECTEUR');
    });

    it('should have IMPORT_DATA permission', () => {
      expect(ACADEMIC_PERMISSIONS.IMPORT_DATA).toContain('ADMIN');
    });

    it('should have EXPORT_DATA permission', () => {
      expect(ACADEMIC_PERMISSIONS.EXPORT_DATA).toContain('SECRETARY');
    });
  });
});
