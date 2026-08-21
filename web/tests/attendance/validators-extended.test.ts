import { describe, it, expect } from 'vitest';
import {
  CreateAttendanceSchema,
  UpdateAttendanceSchema,
  CreateTeacherAttendanceSchema,
  CreateSessionSchema,
  BulkAttendanceSchema,
  AttendanceFiltersSchema,
  AttendanceSearchSchema,
  CreateJustificationSchema,
  CreateCorrectionSchema,
  AttendanceReportRequestSchema,
  AttendanceImportRequestSchema,
  AttendanceExportRequestSchema,
  AttendanceSettingsSchema,
  AttendancePolicySchema,
  QRValidationSchema,
  GPSValidationSchema,
  FaceValidationSchema,
  NFCValidationSchema,
  SyncValidationSchema,
  AttendanceAlertSchema,
  AttendanceNotificationSchema,
  AttendanceDeviceSchema,
  AttendanceLocationSchema,
  DailyReportSchema,
  MonthlyReportSchema,
  AttendanceAnalyticsSchema,
  BulkUpdateSchema,
  SessionEndSchema,
  AttendanceCorrectionApproveSchema,
} from '@/features/attendance/validators';

describe('Attendance Validators Extended', () => {
  describe('CreateAttendanceSchema - edge cases', () => {
    it('should reject invalid status', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'INVALID',
      });
      expect(result.success).toBe(false);
    });

    it('should reject lateMinutes > 480', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'LATE',
        lateMinutes: 500,
      });
      expect(result.success).toBe(false);
    });

    it('should accept lateMinutes = 0', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'LATE',
        lateMinutes: 0,
      });
      expect(result.success).toBe(true);
    });

    it('should reject reasonNote > 500 chars', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'ABSENT',
        reasonNote: 'A'.repeat(501),
      });
      expect(result.success).toBe(false);
    });

    it('should reject notes > 1000 chars', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'ABSENT',
        notes: 'A'.repeat(1001),
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid checkInTime with seconds', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'LATE',
        checkInTime: '08:15:30',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('UpdateAttendanceSchema - edge cases', () => {
    it('should validate with all optional fields', () => {
      const result = UpdateAttendanceSchema.safeParse({
        status: 'LATE',
        reason: 'TRANSPORT',
        reasonNote: 'Retard bus',
        checkInTime: '08:30',
        checkOutTime: '17:00',
        lateMinutes: 30,
        notes: 'Note complète',
      });
      expect(result.success).toBe(true);
    });

    it('should reject checkOutTime format', () => {
      const result = UpdateAttendanceSchema.safeParse({ checkOutTime: '5pm' });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateSessionSchema - defaults', () => {
    it('should default qrEnabled to false', () => {
      const result = CreateSessionSchema.safeParse({
        classId: '123e4567-e89b-12d3-a456-426614174000',
        teacherId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        period: 'MORNING',
        startTime: '08:00',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.qrEnabled).toBe(false);
        expect(result.data.gpsEnabled).toBe(false);
        expect(result.data.nfcEnabled).toBe(false);
        expect(result.data.faceEnabled).toBe(false);
      }
    });

    it('should accept startTime with seconds', () => {
      const result = CreateSessionSchema.safeParse({
        classId: '123e4567-e89b-12d3-a456-426614174000',
        teacherId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        period: 'MORNING',
        startTime: '08:00:00',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('BulkAttendanceSchema - edge cases', () => {
    it('should accept records with optional fields', () => {
      const result = BulkAttendanceSchema.safeParse({
        classId: '123e4567-e89b-12d3-a456-426614174000',
        academicYearId: '123e4567-e89b-12d3-a456-426614174001',
        date: '2025-10-15',
        period: 'AFTERNOON',
        records: [{
          studentId: '123e4567-e89b-12d3-a456-426614174010',
          status: 'LATE',
          reason: 'TRANSPORT',
          lateMinutes: 20,
        }],
        recordedBy: '123e4567-e89b-12d3-a456-426614174020',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('AttendanceFiltersSchema - defaults and edge cases', () => {
    it('should default sortBy to created_at', () => {
      const result = AttendanceFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sortBy).toBe('created_at');
        expect(result.data.sortOrder).toBe('desc');
      }
    });

    it('should reject limit > 100', () => {
      const result = AttendanceFiltersSchema.safeParse({ limit: 101 });
      expect(result.success).toBe(false);
    });

    it('should reject page < 1', () => {
      const result = AttendanceFiltersSchema.safeParse({ page: 0 });
      expect(result.success).toBe(false);
    });
  });

  describe('AttendanceSettingsSchema - defaults', () => {
    it('should default gpsRadius to 100', () => {
      const result = AttendanceSettingsSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.gpsRadius).toBe(100);
      }
    });

    it('should default qrExpiryMinutes to 5', () => {
      const result = AttendanceSettingsSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.qrExpiryMinutes).toBe(5);
      }
    });

    it('should default autoMarkAbsentAfterMinutes to 30', () => {
      const result = AttendanceSettingsSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.autoMarkAbsentAfterMinutes).toBe(30);
      }
    });

    it('should default lateThresholdMinutes to 15', () => {
      const result = AttendanceSettingsSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lateThresholdMinutes).toBe(15);
      }
    });

    it('should reject gpsRadius < 10', () => {
      const result = AttendanceSettingsSchema.safeParse({ gpsRadius: 5 });
      expect(result.success).toBe(false);
    });

    it('should reject gpsRadius > 1000', () => {
      const result = AttendanceSettingsSchema.safeParse({ gpsRadius: 1001 });
      expect(result.success).toBe(false);
    });
  });

  describe('AttendancePolicySchema - edge cases', () => {
    it('should accept optional description', () => {
      const result = AttendancePolicySchema.safeParse({
        name: 'Politique stricte',
        description: 'Politique pour les classes terminales',
        maxAbsencesWithoutJustification: 3,
        maxConsecutiveAbsences: 2,
        lateToleranceMinutes: 10,
        autoExclusionThreshold: 10,
        parentNotificationAfterAbsences: 2,
        adminAlertAfterAbsences: 3,
      });
      expect(result.success).toBe(true);
    });

    it('should reject maxAbsencesWithoutJustification < 1', () => {
      const result = AttendancePolicySchema.safeParse({
        name: 'Politique',
        maxAbsencesWithoutJustification: 0,
        maxConsecutiveAbsences: 3,
        lateToleranceMinutes: 15,
        autoExclusionThreshold: 15,
        parentNotificationAfterAbsences: 3,
        adminAlertAfterAbsences: 5,
      });
      expect(result.success).toBe(false);
    });

    it('should accept lateToleranceMinutes = 0', () => {
      const result = AttendancePolicySchema.safeParse({
        name: 'Aucune tolérance',
        maxAbsencesWithoutJustification: 5,
        maxConsecutiveAbsences: 3,
        lateToleranceMinutes: 0,
        autoExclusionThreshold: 15,
        parentNotificationAfterAbsences: 3,
        adminAlertAfterAbsences: 5,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('GPSValidationSchema - edge cases', () => {
    it('should accept boundary latitude -90', () => {
      const result = GPSValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        latitude: -90,
        longitude: 0,
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });

    it('should accept boundary latitude 90', () => {
      const result = GPSValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        latitude: 90,
        longitude: 0,
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });

    it('should reject longitude < -180', () => {
      const result = GPSValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        latitude: 0,
        longitude: -181,
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(false);
    });

    it('should reject longitude > 180', () => {
      const result = GPSValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        latitude: 0,
        longitude: 181,
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('SyncValidationSchema - edge cases', () => {
    it('should accept records with optional data field', () => {
      const result = SyncValidationSchema.safeParse({
        deviceId: 'DEV001',
        records: [{
          studentId: '123e4567-e89b-12d3-a456-426614174000',
          sessionId: '123e4567-e89b-12d3-a456-426614174001',
          timestamp: '2025-10-15T08:00:00Z',
          method: 'GPS',
          data: { latitude: 5.36, longitude: -4.008 },
        }],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('AttendanceNotificationSchema - edge cases', () => {
    it('should accept all notification types', () => {
      for (const notificationType of ['ABSENCE', 'LATE', 'JUSTIFICATION_APPROVED', 'JUSTIFICATION_REJECTED', 'ALERT', 'REMINDER', 'REPORT']) {
        const result = AttendanceNotificationSchema.safeParse({
          notificationType,
          recipientType: 'PARENT',
          recipientId: '123e4567-e89b-12d3-a456-426614174000',
          channel: 'EMAIL',
          title: 'Test',
          message: 'Message',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept all recipient types', () => {
      for (const recipientType of ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN']) {
        const result = AttendanceNotificationSchema.safeParse({
          notificationType: 'ABSENCE',
          recipientType,
          recipientId: '123e4567-e89b-12d3-a456-426614174000',
          channel: 'EMAIL',
          title: 'Test',
          message: 'Message',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('AttendanceLocationSchema - edge cases', () => {
    it('should default radius to 100', () => {
      const result = AttendanceLocationSchema.safeParse({
        name: 'Entrée',
        latitude: 5.3600,
        longitude: -4.0083,
        allowedMethods: ['QR'],
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.radius).toBe(100);
      }
    });

    it('should accept all method types', () => {
      for (const method of ['MANUAL', 'QR', 'GPS', 'NFC', 'FACE', 'FINGERPRINT', 'AUTO']) {
        const result = AttendanceLocationSchema.safeParse({
          name: 'Location',
          latitude: 5.3600,
          longitude: -4.0083,
          allowedMethods: [method],
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('MonthlyReportSchema - edge cases', () => {
    it('should accept month 1', () => {
      const result = MonthlyReportSchema.safeParse({ month: 1, year: 2025 });
      expect(result.success).toBe(true);
    });

    it('should accept month 12', () => {
      const result = MonthlyReportSchema.safeParse({ month: 12, year: 2025 });
      expect(result.success).toBe(true);
    });

    it('should reject month 0', () => {
      const result = MonthlyReportSchema.safeParse({ month: 0, year: 2025 });
      expect(result.success).toBe(false);
    });

    it('should reject year < 2000', () => {
      const result = MonthlyReportSchema.safeParse({ month: 6, year: 1999 });
      expect(result.success).toBe(false);
    });

    it('should reject year > 2100', () => {
      const result = MonthlyReportSchema.safeParse({ month: 6, year: 2101 });
      expect(result.success).toBe(false);
    });
  });

  describe('AttendanceAnalyticsSchema - edge cases', () => {
    it('should accept FULL period', () => {
      const result = AttendanceAnalyticsSchema.safeParse({
        academicYearId: '123e4567-e89b-12d3-a456-426614174000',
        period: 'FULL',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('BulkUpdateSchema - edge cases', () => {
    it('should accept multiple IDs', () => {
      const result = BulkUpdateSchema.safeParse({
        ids: [
          '123e4567-e89b-12d3-a456-426614174000',
          '123e4567-e89b-12d3-a456-426614174001',
          '123e4567-e89b-12d3-a456-426614174002',
        ],
        status: 'EXCUSED',
        reason: 'Excursion scolaire',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all statuses', () => {
      for (const status of ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'JUSTIFIED', 'PARTIAL']) {
        const result = BulkUpdateSchema.safeParse({
          ids: ['123e4567-e89b-12d3-a456-426614174000'],
          status,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('AttendanceCorrectionApproveSchema - edge cases', () => {
    it('should accept approved with reviewNote', () => {
      const result = AttendanceCorrectionApproveSchema.safeParse({
        correctionId: '123e4567-e89b-12d3-a456-426614174000',
        approved: true,
        reviewNote: 'Correction approuvée',
      });
      expect(result.success).toBe(true);
    });

    it('should accept rejection without reviewNote', () => {
      const result = AttendanceCorrectionApproveSchema.safeParse({
        correctionId: '123e4567-e89b-12d3-a456-426614174000',
        approved: false,
      });
      expect(result.success).toBe(true);
    });
  });
});
