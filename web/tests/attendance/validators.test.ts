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
  AttendanceDashboardRequestSchema,
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

describe('Attendance Validators', () => {
  describe('CreateAttendanceSchema', () => {
    it('should validate correct attendance data', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'PRESENT',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid studentId', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: 'invalid',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'PRESENT',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty date', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '',
        status: 'PRESENT',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all statuses', () => {
      for (const status of ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'JUSTIFIED', 'PARTIAL']) {
        const result = CreateAttendanceSchema.safeParse({
          studentId: '123e4567-e89b-12d3-a456-426614174000',
          classId: '123e4567-e89b-12d3-a456-426614174001',
          academicYearId: '123e4567-e89b-12d3-a456-426614174002',
          date: '2025-10-15',
          status,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept optional fields', () => {
      const result = CreateAttendanceSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        classId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        status: 'LATE',
        method: 'QR',
        reason: 'MEDICAL',
        reasonNote: 'Grippe',
        period: 'MORNING',
        checkInTime: '08:15',
        lateMinutes: 15,
        notes: 'Retard signalé',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('UpdateAttendanceSchema', () => {
    it('should validate partial update', () => {
      const result = UpdateAttendanceSchema.safeParse({ status: 'ABSENT' });
      expect(result.success).toBe(true);
    });

    it('should validate with checkInTime', () => {
      const result = UpdateAttendanceSchema.safeParse({ checkInTime: '08:30' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid checkInTime format', () => {
      const result = UpdateAttendanceSchema.safeParse({ checkInTime: '8am' });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateTeacherAttendanceSchema', () => {
    it('should validate correct teacher attendance', () => {
      const result = CreateTeacherAttendanceSchema.safeParse({
        teacherId: '123e4567-e89b-12d3-a456-426614174000',
        date: '2025-10-15',
        status: 'PRESENT',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid teacherId', () => {
      const result = CreateTeacherAttendanceSchema.safeParse({
        teacherId: 'invalid',
        date: '2025-10-15',
        status: 'PRESENT',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateSessionSchema', () => {
    it('should validate correct session', () => {
      const result = CreateSessionSchema.safeParse({
        classId: '123e4567-e89b-12d3-a456-426614174000',
        teacherId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        period: 'MORNING',
        startTime: '08:00',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all periods', () => {
      for (const period of ['MORNING', 'AFTERNOON', 'FULL_DAY', 'PERIOD_1', 'PERIOD_2']) {
        const result = CreateSessionSchema.safeParse({
          classId: '123e4567-e89b-12d3-a456-426614174000',
          teacherId: '123e4567-e89b-12d3-a456-426614174001',
          academicYearId: '123e4567-e89b-12d3-a456-426614174002',
          date: '2025-10-15',
          period,
          startTime: '08:00',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should accept nullable subjectId', () => {
      const result = CreateSessionSchema.safeParse({
        classId: '123e4567-e89b-12d3-a456-426614174000',
        teacherId: '123e4567-e89b-12d3-a456-426614174001',
        academicYearId: '123e4567-e89b-12d3-a456-426614174002',
        date: '2025-10-15',
        period: 'MORNING',
        startTime: '08:00',
        subjectId: null,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('BulkAttendanceSchema', () => {
    it('should validate correct bulk data', () => {
      const result = BulkAttendanceSchema.safeParse({
        classId: '123e4567-e89b-12d3-a456-426614174000',
        academicYearId: '123e4567-e89b-12d3-a456-426614174001',
        date: '2025-10-15',
        period: 'MORNING',
        records: [
          { studentId: '123e4567-e89b-12d3-a456-426614174010', status: 'PRESENT' },
          { studentId: '123e4567-e89b-12d3-a456-426614174011', status: 'ABSENT' },
        ],
        recordedBy: '123e4567-e89b-12d3-a456-426614174020',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty records', () => {
      const result = BulkAttendanceSchema.safeParse({
        classId: '123e4567-e89b-12d3-a456-426614174000',
        academicYearId: '123e4567-e89b-12d3-a456-426614174001',
        date: '2025-10-15',
        period: 'MORNING',
        records: [],
        recordedBy: '123e4567-e89b-12d3-a456-426614174020',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('AttendanceFiltersSchema', () => {
    it('should validate with defaults', () => {
      const result = AttendanceFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('should validate custom filters', () => {
      const result = AttendanceFiltersSchema.safeParse({
        search: 'test',
        status: 'PRESENT',
        page: 2,
        limit: 50,
        sortBy: 'date',
        sortOrder: 'asc',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('AttendanceSearchSchema', () => {
    it('should validate correct search', () => {
      const result = AttendanceSearchSchema.safeParse({ query: 'test query' });
      expect(result.success).toBe(true);
    });

    it('should reject short query', () => {
      const result = AttendanceSearchSchema.safeParse({ query: 'a' });
      expect(result.success).toBe(false);
    });

    it('should accept types filter', () => {
      const result = AttendanceSearchSchema.safeParse({
        query: 'search term',
        types: ['STUDENT', 'TEACHER'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('CreateJustificationSchema', () => {
    it('should validate correct justification', () => {
      const result = CreateJustificationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        attendanceId: '123e4567-e89b-12d3-a456-426614174001',
        reason: 'Maladie',
        description: 'Grippe avec certificat médical',
        startDate: '2025-10-15',
        endDate: '2025-10-16',
      });
      expect(result.success).toBe(true);
    });

    it('should accept optional documentUrl', () => {
      const result = CreateJustificationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        attendanceId: '123e4567-e89b-12d3-a456-426614174001',
        reason: 'Maladie',
        description: 'Grippe',
        documentUrl: 'https://example.com/cert.pdf',
        startDate: '2025-10-15',
        endDate: '2025-10-16',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty reason', () => {
      const result = CreateJustificationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        attendanceId: '123e4567-e89b-12d3-a456-426614174001',
        reason: '',
        description: 'Grippe',
        startDate: '2025-10-15',
        endDate: '2025-10-16',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateCorrectionSchema', () => {
    it('should validate correct correction', () => {
      const result = CreateCorrectionSchema.safeParse({
        attendanceId: '123e4567-e89b-12d3-a456-426614174000',
        originalStatus: 'ABSENT',
        newStatus: 'EXCUSED',
        reason: 'Justification reçue',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('AttendanceReportRequestSchema', () => {
    it('should validate correct report request', () => {
      const result = AttendanceReportRequestSchema.safeParse({
        reportType: 'DAILY',
        startDate: '2025-10-01',
        endDate: '2025-10-15',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all report types', () => {
      for (const reportType of ['DAILY', 'WEEKLY', 'MONTHLY', 'TERM', 'YEARLY', 'CUSTOM', 'STUDENT', 'CLASS', 'LEVEL']) {
        const result = AttendanceReportRequestSchema.safeParse({
          reportType,
          startDate: '2025-10-01',
          endDate: '2025-10-15',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('AttendanceDashboardRequestSchema', () => {
    it('should validate empty request', () => {
      const result = AttendanceDashboardRequestSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should validate with date', () => {
      const result = AttendanceDashboardRequestSchema.safeParse({ date: '2025-10-15' });
      expect(result.success).toBe(true);
    });
  });

  describe('AttendanceImportRequestSchema', () => {
    it('should validate correct import', () => {
      const result = AttendanceImportRequestSchema.safeParse({
        importType: 'CSV',
        data: [{ studentId: 's1', status: 'PRESENT' }],
        date: '2025-10-15',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all import types', () => {
      for (const importType of ['CSV', 'EXCEL', 'JSON']) {
        const result = AttendanceImportRequestSchema.safeParse({
          importType,
          data: [{ studentId: 's1' }],
          date: '2025-10-15',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject empty data', () => {
      const result = AttendanceImportRequestSchema.safeParse({
        importType: 'CSV',
        data: [],
        date: '2025-10-15',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('AttendanceExportRequestSchema', () => {
    it('should validate correct export', () => {
      const result = AttendanceExportRequestSchema.safeParse({
        format: 'PDF',
        exportType: 'ALL',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all export types', () => {
      for (const exportType of ['ALL', 'STUDENTS', 'TEACHERS', 'CLASSES', 'ABSENTS', 'LATES', 'SUMMARY']) {
        const result = AttendanceExportRequestSchema.safeParse({
          format: 'PDF',
          exportType,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('AttendanceSettingsSchema', () => {
    it('should validate with defaults', () => {
      const result = AttendanceSettingsSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.qrEnabled).toBe(false);
        expect(result.data.gpsRadius).toBe(100);
      }
    });

    it('should validate custom settings', () => {
      const result = AttendanceSettingsSchema.safeParse({
        qrEnabled: true,
        gpsEnabled: true,
        gpsRadius: 200,
        qrExpiryMinutes: 10,
        autoMarkAbsentAfterMinutes: 45,
        lateThresholdMinutes: 20,
      });
      expect(result.success).toBe(true);
    });
  });

  describe('AttendancePolicySchema', () => {
    it('should validate correct policy', () => {
      const result = AttendancePolicySchema.safeParse({
        name: 'Politique standard',
        maxAbsencesWithoutJustification: 5,
        maxConsecutiveAbsences: 3,
        lateToleranceMinutes: 15,
        autoExclusionThreshold: 15,
        parentNotificationAfterAbsences: 3,
        adminAlertAfterAbsences: 5,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = AttendancePolicySchema.safeParse({
        name: '',
        maxAbsencesWithoutJustification: 5,
        maxConsecutiveAbsences: 3,
        lateToleranceMinutes: 15,
        autoExclusionThreshold: 15,
        parentNotificationAfterAbsences: 3,
        adminAlertAfterAbsences: 5,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('QRValidationSchema', () => {
    it('should validate correct QR data', () => {
      const result = QRValidationSchema.safeParse({
        code: 'QR123',
        sessionId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('GPSValidationSchema', () => {
    it('should validate correct GPS data', () => {
      const result = GPSValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        latitude: 5.3600,
        longitude: -4.0083,
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid latitude', () => {
      const result = GPSValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        latitude: 100,
        longitude: -4.0083,
        sessionId: '123e4567-e89b-12d3-a456-426614174001',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('FaceValidationSchema', () => {
    it('should validate correct face data', () => {
      const result = FaceValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        photoData: 'base64data',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('NFCValidationSchema', () => {
    it('should validate correct NFC data', () => {
      const result = NFCValidationSchema.safeParse({
        studentId: '123e4567-e89b-12d3-a456-426614174000',
        nfcTagId: 'NFC001',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('SyncValidationSchema', () => {
    it('should validate correct sync data', () => {
      const result = SyncValidationSchema.safeParse({
        deviceId: 'DEV001',
        records: [{
          studentId: '123e4567-e89b-12d3-a456-426614174000',
          sessionId: '123e4567-e89b-12d3-a456-426614174001',
          timestamp: '2025-10-15T08:00:00Z',
          method: 'QR',
        }],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty records', () => {
      const result = SyncValidationSchema.safeParse({
        deviceId: 'DEV001',
        records: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('AttendanceAlertSchema', () => {
    it('should validate correct alert', () => {
      const result = AttendanceAlertSchema.safeParse({
        alertType: 'ABSENCE_THRESHOLD',
        severity: 'HIGH',
        title: 'Alerte absences',
        message: 'Seuil dépassé',
        targetType: 'STUDENT',
        targetId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all alert types', () => {
      for (const alertType of ['ABSENCE_THRESHOLD', 'CONSECUTIVE_ABSENCES', 'LATE_THRESHOLD', 'JUSTIFICATION_PENDING', 'SESSION_INCOMPLETE']) {
        const result = AttendanceAlertSchema.safeParse({
          alertType,
          severity: 'MEDIUM',
          title: 'Alerte',
          message: 'Message',
          targetType: 'CLASS',
          targetId: '123e4567-e89b-12d3-a456-426614174000',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('AttendanceNotificationSchema', () => {
    it('should validate correct notification', () => {
      const result = AttendanceNotificationSchema.safeParse({
        notificationType: 'ABSENCE',
        recipientType: 'PARENT',
        recipientId: '123e4567-e89b-12d3-a456-426614174000',
        channel: 'EMAIL',
        title: 'Absence signalée',
        message: 'Votre enfant est absent',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all channels', () => {
      for (const channel of ['EMAIL', 'SMS', 'PUSH', 'IN_APP']) {
        const result = AttendanceNotificationSchema.safeParse({
          notificationType: 'ABSENCE',
          recipientType: 'PARENT',
          recipientId: '123e4567-e89b-12d3-a456-426614174000',
          channel,
          title: 'Test',
          message: 'Message',
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('AttendanceDeviceSchema', () => {
    it('should validate correct device', () => {
      const result = AttendanceDeviceSchema.safeParse({
        name: 'Scanner QR',
        type: 'QR_SCANNER',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all device types', () => {
      for (const type of ['QR_SCANNER', 'NFC_READER', 'FACE_CAMERA', 'FINGERPRINT', 'TABLET', 'PHONE']) {
        const result = AttendanceDeviceSchema.safeParse({
          name: 'Device',
          type,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('AttendanceLocationSchema', () => {
    it('should validate correct location', () => {
      const result = AttendanceLocationSchema.safeParse({
        name: 'Entrée principale',
        latitude: 5.3600,
        longitude: -4.0083,
        radius: 100,
        allowedMethods: ['QR', 'GPS'],
      });
      expect(result.success).toBe(true);
    });

    it('should require at least one method', () => {
      const result = AttendanceLocationSchema.safeParse({
        name: 'Entrée',
        latitude: 5.3600,
        longitude: -4.0083,
        radius: 100,
        allowedMethods: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('DailyReportSchema', () => {
    it('should validate correct daily report', () => {
      const result = DailyReportSchema.safeParse({ date: '2025-10-15' });
      expect(result.success).toBe(true);
    });
  });

  describe('MonthlyReportSchema', () => {
    it('should validate correct monthly report', () => {
      const result = MonthlyReportSchema.safeParse({ month: 10, year: 2025 });
      expect(result.success).toBe(true);
    });

    it('should reject invalid month', () => {
      const result = MonthlyReportSchema.safeParse({ month: 13, year: 2025 });
      expect(result.success).toBe(false);
    });
  });

  describe('AttendanceAnalyticsSchema', () => {
    it('should validate correct analytics', () => {
      const result = AttendanceAnalyticsSchema.safeParse({
        academicYearId: '123e4567-e89b-12d3-a456-426614174000',
        period: 'TRIMESTER_1',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all periods', () => {
      for (const period of ['TRIMESTER_1', 'TRIMESTER_2', 'TRIMESTER_3', 'SEMESTER_1', 'SEMESTER_2', 'FULL']) {
        const result = AttendanceAnalyticsSchema.safeParse({
          academicYearId: '123e4567-e89b-12d3-a456-426614174000',
          period,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('BulkUpdateSchema', () => {
    it('should validate correct bulk update', () => {
      const result = BulkUpdateSchema.safeParse({
        ids: ['123e4567-e89b-12d3-a456-426614174000'],
        status: 'ABSENT',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty ids', () => {
      const result = BulkUpdateSchema.safeParse({
        ids: [],
        status: 'ABSENT',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('SessionEndSchema', () => {
    it('should validate correct session end', () => {
      const result = SessionEndSchema.safeParse({
        completedBy: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('AttendanceCorrectionApproveSchema', () => {
    it('should validate correct approval', () => {
      const result = AttendanceCorrectionApproveSchema.safeParse({
        correctionId: '123e4567-e89b-12d3-a456-426614174000',
        approved: true,
      });
      expect(result.success).toBe(true);
    });

    it('should validate rejection', () => {
      const result = AttendanceCorrectionApproveSchema.safeParse({
        correctionId: '123e4567-e89b-12d3-a456-426614174000',
        approved: false,
        reviewNote: 'Non justifié',
      });
      expect(result.success).toBe(true);
    });
  });
});
