import { describe, it, expect } from 'vitest';
import {
  ATTENDANCE_STUDENT_STATUS,
  ATTENDANCE_TEACHER_STATUS,
  ATTENDANCE_METHODS,
  ATTENDANCE_REASONS,
  ATTENDANCE_PERIODS,
  ATTENDANCE_THRESHOLDS,
  ATTENDANCE_SESSION,
  ATTENDANCE_GPS,
  ATTENDANCE_QR,
  ATTENDANCE_NFC,
  ATTENDANCE_FACE,
  ATTENDANCE_NOTIFICATIONS,
  ATTENDANCE_REPORTS,
  ATTENDANCE_IMPORT,
  ATTENDANCE_EXPORT,
  ATTENDANCE_SYNC,
  ATTENDANCE_TIMELINE,
  ATTENDANCE_ANALYTICS,
  ATTENDANCE_PERMISSIONS,
  ATTENDANCE_DASHBOARD,
} from '@educi/config';

describe('Attendance Config', () => {
  describe('ATTENDANCE_STUDENT_STATUS', () => {
    it('should have all statuses', () => {
      expect(ATTENDANCE_STUDENT_STATUS.STATUSES).toContain('PRESENT');
      expect(ATTENDANCE_STUDENT_STATUS.STATUSES).toContain('ABSENT');
      expect(ATTENDANCE_STUDENT_STATUS.STATUSES).toContain('LATE');
      expect(ATTENDANCE_STUDENT_STATUS.STATUSES).toContain('EXCUSED');
      expect(ATTENDANCE_STUDENT_STATUS.STATUSES).toContain('UNKNOWN');
    });

    it('should have positive statuses', () => {
      expect(ATTENDANCE_STUDENT_STATUS.POSITIVE).toContain('PRESENT');
      expect(ATTENDANCE_STUDENT_STATUS.POSITIVE).toContain('LATE');
      expect(ATTENDANCE_STUDENT_STATUS.POSITIVE).toContain('EXCUSED');
    });

    it('should have negative statuses', () => {
      expect(ATTENDANCE_STUDENT_STATUS.NEGATIVE).toContain('ABSENT');
      expect(ATTENDANCE_STUDENT_STATUS.NEGATIVE).toContain('UNKNOWN');
    });

    it('should have default UNKNOWN', () => {
      expect(ATTENDANCE_STUDENT_STATUS.DEFAULT).toBe('UNKNOWN');
    });
  });

  describe('ATTENDANCE_TEACHER_STATUS', () => {
    it('should have all statuses', () => {
      expect(ATTENDANCE_TEACHER_STATUS.STATUSES).toContain('PRESENT');
      expect(ATTENDANCE_TEACHER_STATUS.STATUSES).toContain('ABSENT');
      expect(ATTENDANCE_TEACHER_STATUS.STATUSES).toContain('ON_LEAVE');
      expect(ATTENDANCE_TEACHER_STATUS.STATUSES).toContain('MISSION');
    });

    it('should have positive statuses', () => {
      expect(ATTENDANCE_TEACHER_STATUS.POSITIVE).toContain('PRESENT');
      expect(ATTENDANCE_TEACHER_STATUS.POSITIVE).toContain('REMOTE');
    });
  });

  describe('ATTENDANCE_METHODS', () => {
    it('should have all methods', () => {
      expect(ATTENDANCE_METHODS.METHODS).toContain('MANUAL');
      expect(ATTENDANCE_METHODS.METHODS).toContain('QR_CODE');
      expect(ATTENDANCE_METHODS.METHODS).toContain('GPS');
      expect(ATTENDANCE_METHODS.METHODS).toContain('NFC');
      expect(ATTENDANCE_METHODS.METHODS).toContain('FACE_RECOGNITION');
    });

    it('should have biometric methods', () => {
      expect(ATTENDANCE_METHODS.BIOMETRIC).toContain('QR_CODE');
      expect(ATTENDANCE_METHODS.BIOMETRIC).toContain('NFC');
      expect(ATTENDANCE_METHODS.BIOMETRIC).toContain('FACE_RECOGNITION');
    });

    it('should have digital methods', () => {
      expect(ATTENDANCE_METHODS.DIGITAL).toContain('QR_CODE');
      expect(ATTENDANCE_METHODS.DIGITAL).toContain('GPS');
      expect(ATTENDANCE_METHODS.DIGITAL).toContain('NFC');
      expect(ATTENDANCE_METHODS.DIGITAL).toContain('FACE_RECOGNITION');
    });
  });

  describe('ATTENDANCE_REASONS', () => {
    it('should have all reasons', () => {
      expect(ATTENDANCE_REASONS.REASONS).toContain('ILLNESS');
      expect(ATTENDANCE_REASONS.REASONS).toContain('FAMILY');
      expect(ATTENDANCE_REASONS.REASONS).toContain('TRANSPORT');
      expect(ATTENDANCE_REASONS.REASONS).toContain('WEATHER');
      expect(ATTENDANCE_REASONS.REASONS).toContain('OTHER');
    });

    it('should have justifiable reasons', () => {
      expect(ATTENDANCE_REASONS.JUSTIFIABLE).toContain('ILLNESS');
      expect(ATTENDANCE_REASONS.JUSTIFIABLE).toContain('FAMILY');
      expect(ATTENDANCE_REASONS.JUSTIFIABLE).toContain('SCHOOL_ACTIVITY');
    });
  });

  describe('ATTENDANCE_PERIODS', () => {
    it('should have all periods', () => {
      expect(ATTENDANCE_PERIODS.PERIODS).toContain('MORNING');
      expect(ATTENDANCE_PERIODS.PERIODS).toContain('AFTERNOON');
      expect(ATTENDANCE_PERIODS.PERIODS).toContain('FULL_DAY');
    });

    it('should default to FULL_DAY', () => {
      expect(ATTENDANCE_PERIODS.DEFAULT).toBe('FULL_DAY');
    });
  });

  describe('ATTENDANCE_THRESHOLDS', () => {
    it('should have late threshold', () => {
      expect(ATTENDANCE_THRESHOLDS.LATE_THRESHOLD_MINUTES).toBe(15);
    });

    it('should have auto mark absent threshold', () => {
      expect(ATTENDANCE_THRESHOLDS.AUTO_MARK_ABSENT_AFTER_MINUTES).toBe(30);
    });

    it('should have low attendance rate', () => {
      expect(ATTENDANCE_THRESHOLDS.LOW_ATTENDANCE_RATE).toBe(75);
    });

    it('should have critical attendance rate', () => {
      expect(ATTENDANCE_THRESHOLDS.CRITICAL_ATTENDANCE_RATE).toBe(50);
    });

    it('should have consecutive absence alert', () => {
      expect(ATTENDANCE_THRESHOLDS.CONSECUTIVE_ABSENCE_ALERT).toBe(3);
    });

    it('should have exclusion threshold', () => {
      expect(ATTENDANCE_THRESHOLDS.EXCLUSION_THRESHOLD).toBe(15);
    });
  });

  describe('ATTENDANCE_SESSION', () => {
    it('should have all statuses', () => {
      expect(ATTENDANCE_SESSION.STATUSES).toContain('PLANNED');
      expect(ATTENDANCE_SESSION.STATUSES).toContain('ACTIVE');
      expect(ATTENDANCE_SESSION.STATUSES).toContain('COMPLETED');
      expect(ATTENDANCE_SESSION.STATUSES).toContain('CANCELLED');
    });

    it('should have duration limits', () => {
      expect(ATTENDANCE_SESSION.MAX_DURATION_MINUTES).toBe(240);
      expect(ATTENDANCE_SESSION.MIN_DURATION_MINUTES).toBe(10);
    });
  });

  describe('ATTENDANCE_GPS', () => {
    it('should have default radius', () => {
      expect(ATTENDANCE_GPS.DEFAULT_RADIUS_METERS).toBe(100);
    });

    it('should have min/max radius', () => {
      expect(ATTENDANCE_GPS.MIN_RADIUS_METERS).toBe(10);
      expect(ATTENDANCE_GPS.MAX_RADIUS_METERS).toBe(1000);
    });
  });

  describe('ATTENDANCE_QR', () => {
    it('should have expiry minutes', () => {
      expect(ATTENDANCE_QR.EXPIRY_MINUTES).toBe(5);
    });

    it('should have max scans', () => {
      expect(ATTENDANCE_QR.MAX_SCANS).toBe(100);
    });

    it('should have code length', () => {
      expect(ATTENDANCE_QR.CODE_LENGTH).toBe(32);
    });
  });

  describe('ATTENDANCE_NFC', () => {
    it('should have tag types', () => {
      expect(ATTENDANCE_NFC.TAG_TYPES).toContain('MIFARE_CLASSIC');
      expect(ATTENDANCE_NFC.TAG_TYPES).toContain('NTAG');
    });

    it('should have max read distance', () => {
      expect(ATTENDANCE_NFC.MAX_READ_DISTANCE_CM).toBe(10);
    });
  });

  describe('ATTENDANCE_FACE', () => {
    it('should have min confidence', () => {
      expect(ATTENDANCE_FACE.MIN_CONFIDENCE).toBe(0.85);
    });

    it('should have photo dimensions', () => {
      expect(ATTENDANCE_FACE.PHOTO_MIN_WIDTH).toBe(200);
      expect(ATTENDANCE_FACE.PHOTO_MIN_HEIGHT).toBe(200);
    });
  });

  describe('ATTENDANCE_NOTIFICATIONS', () => {
    it('should have all channels', () => {
      expect(ATTENDANCE_NOTIFICATIONS.CHANNELS).toContain('SMS');
      expect(ATTENDANCE_NOTIFICATIONS.CHANNELS).toContain('EMAIL');
      expect(ATTENDANCE_NOTIFICATIONS.CHANNELS).toContain('PUSH');
      expect(ATTENDANCE_NOTIFICATIONS.CHANNELS).toContain('IN_APP');
    });

    it('should have all types', () => {
      expect(ATTENDANCE_NOTIFICATIONS.TYPES).toContain('ABSENCE');
      expect(ATTENDANCE_NOTIFICATIONS.TYPES).toContain('LATE');
      expect(ATTENDANCE_NOTIFICATIONS.TYPES).toContain('JUSTIFICATION');
    });
  });

  describe('ATTENDANCE_REPORTS', () => {
    it('should have all report types', () => {
      expect(ATTENDANCE_REPORTS.TYPES).toContain('DAILY');
      expect(ATTENDANCE_REPORTS.TYPES).toContain('WEEKLY');
      expect(ATTENDANCE_REPORTS.TYPES).toContain('MONTHLY');
      expect(ATTENDANCE_REPORTS.TYPES).toContain('YEARLY');
    });

    it('should have all formats', () => {
      expect(ATTENDANCE_REPORTS.FORMATS).toContain('PDF');
      expect(ATTENDANCE_REPORTS.FORMATS).toContain('EXCEL');
      expect(ATTENDANCE_REPORTS.FORMATS).toContain('CSV');
      expect(ATTENDANCE_REPORTS.FORMATS).toContain('JSON');
    });
  });

  describe('ATTENDANCE_IMPORT', () => {
    it('should support CSV and EXCEL', () => {
      expect(ATTENDANCE_IMPORT.SUPPORTED_FORMATS).toContain('CSV');
      expect(ATTENDANCE_IMPORT.SUPPORTED_FORMATS).toContain('EXCEL');
    });

    it('should have required columns for student', () => {
      expect(ATTENDANCE_IMPORT.REQUIRED_COLUMNS_STUDENT).toContain('studentId');
      expect(ATTENDANCE_IMPORT.REQUIRED_COLUMNS_STUDENT).toContain('classId');
      expect(ATTENDANCE_IMPORT.REQUIRED_COLUMNS_STUDENT).toContain('date');
      expect(ATTENDANCE_IMPORT.REQUIRED_COLUMNS_STUDENT).toContain('status');
    });

    it('should have required columns for teacher', () => {
      expect(ATTENDANCE_IMPORT.REQUIRED_COLUMNS_TEACHER).toContain('teacherId');
      expect(ATTENDANCE_IMPORT.REQUIRED_COLUMNS_TEACHER).toContain('date');
      expect(ATTENDANCE_IMPORT.REQUIRED_COLUMNS_TEACHER).toContain('status');
    });
  });

  describe('ATTENDANCE_EXPORT', () => {
    it('should support all formats', () => {
      expect(ATTENDANCE_EXPORT.FORMATS).toContain('PDF');
      expect(ATTENDANCE_EXPORT.FORMATS).toContain('EXCEL');
      expect(ATTENDANCE_EXPORT.FORMATS).toContain('CSV');
      expect(ATTENDANCE_EXPORT.FORMATS).toContain('JSON');
    });
  });

  describe('ATTENDANCE_SYNC', () => {
    it('should have max batch size', () => {
      expect(ATTENDANCE_SYNC.MAX_BATCH_SIZE).toBe(100);
    });

    it('should have retry settings', () => {
      expect(ATTENDANCE_SYNC.RETRY_ATTEMPTS).toBe(3);
      expect(ATTENDANCE_SYNC.RETRY_DELAY_MS).toBe(1000);
    });

    it('should have conflict resolution', () => {
      expect(ATTENDANCE_SYNC.CONFLICT_RESOLUTION).toBe('SERVER_WINS');
    });
  });

  describe('ATTENDANCE_TIMELINE', () => {
    it('should have event types', () => {
      expect(ATTENDANCE_TIMELINE.EVENT_TYPES).toContain('CHECK_IN');
      expect(ATTENDANCE_TIMELINE.EVENT_TYPES).toContain('CHECK_OUT');
      expect(ATTENDANCE_TIMELINE.EVENT_TYPES).toContain('STATUS_CHANGE');
    });

    it('should have max events', () => {
      expect(ATTENDANCE_TIMELINE.MAX_EVENTS).toBe(500);
    });
  });

  describe('ATTENDANCE_ANALYTICS', () => {
    it('should have periods', () => {
      expect(ATTENDANCE_ANALYTICS.PERIODS).toContain('DAILY');
      expect(ATTENDANCE_ANALYTICS.PERIODS).toContain('WEEKLY');
      expect(ATTENDANCE_ANALYTICS.PERIODS).toContain('MONTHLY');
    });

    it('should have prediction settings', () => {
      expect(ATTENDANCE_ANALYTICS.PREDICTION_MIN_DATA_POINTS).toBe(30);
      expect(ATTENDANCE_ANALYTICS.RISK_THRESHOLD).toBe(0.7);
    });
  });

  describe('ATTENDANCE_PERMISSIONS', () => {
    it('should define RECORD_ATTENDANCE permissions', () => {
      expect(ATTENDANCE_PERMISSIONS.RECORD_ATTENDANCE).toContain('ADMIN');
      expect(ATTENDANCE_PERMISSIONS.RECORD_ATTENDANCE).toContain('TEACHER');
    });

    it('should define VIEW_ATTENDANCE permissions', () => {
      expect(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE).toContain('ADMIN');
      expect(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE).toContain('PARENT');
      expect(ATTENDANCE_PERMISSIONS.VIEW_ATTENDANCE).toContain('STUDENT');
    });

    it('should define MANAGE_SETTINGS permissions', () => {
      expect(ATTENDANCE_PERMISSIONS.MANAGE_SETTINGS).toContain('ADMIN');
      expect(ATTENDANCE_PERMISSIONS.MANAGE_SETTINGS).toContain('SUPER_ADMIN');
    });
  });

  describe('ATTENDANCE_DASHBOARD', () => {
    it('should have refresh interval', () => {
      expect(ATTENDANCE_DASHBOARD.REFRESH_INTERVAL_MS).toBe(30000);
    });

    it('should have cache duration', () => {
      expect(ATTENDANCE_DASHBOARD.CACHE_DURATION_MS).toBe(60000);
    });

    it('should have max at-risk students', () => {
      expect(ATTENDANCE_DASHBOARD.MAX_AT_RISK_STUDENTS).toBe(20);
    });
  });
});
