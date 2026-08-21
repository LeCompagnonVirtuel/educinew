import { describe, it, expect } from 'vitest';
import type {
  Attendance,
  TeacherAttendance,
  AttendanceRecord,
  AttendanceSession,
  AttendanceSummary,
  AttendanceStatistics,
  AttendanceDashboard,
  AttendanceTimeline,
  AttendanceReport,
  AttendanceAlert,
  AttendanceNotification,
  AttendanceImport,
  AttendanceExport,
  AttendanceHistory,
  AttendanceCorrection,
  AttendanceJustification,
  AttendanceDevice,
  AttendanceLocation,
  AttendanceSync,
  AttendanceQR,
  AttendanceGPS,
  AttendanceFaceRecognition,
  AttendanceNFC,
  AttendanceSettings,
  AttendancePolicy,
  AttendanceAudit,
  AttendanceSearch,
  AttendanceAnalytics,
  AttendanceFilters,
  CreateAttendanceRequest,
  UpdateAttendanceRequest,
  CreateTeacherAttendanceRequest,
  CreateSessionRequest,
  BulkAttendanceRequest,
  AttendanceReportRequest,
  AttendanceDashboardRequest,
  AttendanceImportRequest,
  AttendanceExportRequest,
  StudentAttendanceStatus,
  TeacherAttendanceStatus,
  AttendanceMethod,
  AttendanceReason,
  AttendanceType,
  AttendanceSessionStatus,
  AttendancePeriod,
} from '@educi/types';

describe('Attendance Types', () => {
  it('should define Attendance interface correctly', () => {
    const attendance: Attendance = {
      id: '1',
      studentId: 's1',
      classId: 'c1',
      schoolId: 'sch1',
      academicYearId: 'ay1',
      date: '2025-10-15',
      status: 'PRESENT',
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      isLate: false,
      isExcused: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(attendance.id).toBe('1');
    expect(attendance.status).toBe('PRESENT');
  });

  it('should define TeacherAttendance interface correctly', () => {
    const teacherAttendance: TeacherAttendance = {
      id: '1',
      teacherId: 't1',
      schoolId: 'sch1',
      date: '2025-10-15',
      status: 'PRESENT',
      method: 'MANUAL',
      period: 'MORNING',
      recordedBy: 'u1',
      source: 'MANUAL',
      verified: true,
      isLate: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(teacherAttendance.teacherId).toBe('t1');
    expect(teacherAttendance.status).toBe('PRESENT');
  });

  it('should define AttendanceRecord interface correctly', () => {
    const record: AttendanceRecord = {
      id: '1',
      schoolId: 's1',
      sessionId: 'ses1',
      studentId: 's1',
      classId: 'c1',
      status: 'ABSENT',
      method: 'MANUAL',
      recordedBy: 'u1',
      createdAt: new Date().toISOString(),
    };
    expect(record.status).toBe('ABSENT');
  });

  it('should define AttendanceSession interface correctly', () => {
    const session: AttendanceSession = {
      id: '1',
      classId: 'c1',
      teacherId: 't1',
      schoolId: 'sch1',
      academicYearId: 'ay1',
      date: '2025-10-15',
      period: 'MORNING',
      startTime: '08:00',
      status: 'ACTIVE',
      totalStudents: 30,
      presentCount: 25,
      absentCount: 3,
      lateCount: 2,
      excusedCount: 0,
      attendanceRate: 83.3,
      qrEnabled: true,
      gpsEnabled: false,
      nfcEnabled: false,
      faceEnabled: false,
      createdBy: 'u1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(session.status).toBe('ACTIVE');
    expect(session.qrEnabled).toBe(true);
  });

  it('should define AttendanceSummary interface correctly', () => {
    const summary: AttendanceSummary = {
      schoolId: 's1',
      academicYearId: 'ay1',
      startDate: '2025-09-01',
      endDate: '2025-10-15',
      totalDays: 30,
      presentDays: 25,
      absentDays: 3,
      lateDays: 2,
      excusedDays: 0,
      sickDays: 0,
      permissionDays: 0,
      attendanceRate: 83.3,
      punctualityRate: 93.3,
      totalHoursPresent: 200,
      totalHoursExpected: 240,
      byMonth: [],
      byClass: [],
      bySubject: [],
    };
    expect(summary.totalDays).toBe(30);
    expect(summary.attendanceRate).toBe(83.3);
  });

  it('should define AttendanceStatistics interface correctly', () => {
    const stats: AttendanceStatistics = {
      schoolId: 'sch1',
      academicYearId: 'ay1',
      date: '2025-10-15',
      totalStudents: 100,
      presentStudents: 85,
      absentStudents: 10,
      lateStudents: 5,
      excusedStudents: 0,
      attendanceRate: 85,
      punctualityRate: 95,
      totalTeachers: 50,
      presentTeachers: 48,
      absentTeachers: 1,
      lateTeachers: 1,
      teacherAttendanceRate: 96,
      byClass: [],
      byLevel: [],
      byDay: [],
      byMonth: [],
      trends: { weekly: [], monthly: [], yearly: [] },
    };
    expect(stats.attendanceRate).toBe(85);
  });

  it('should define AttendanceDashboard interface correctly', () => {
    const dashboard: AttendanceDashboard = {
      schoolId: 's1',
      date: '2025-10-15',
      presentToday: 85,
      absentToday: 10,
      lateToday: 5,
      excusedToday: 0,
      attendanceRate: 85,
      totalStudents: 100,
      totalTeachers: 50,
      presentTeachers: 48,
      absentTeachers: 1,
      teacherAttendanceRate: 96,
      mostAssiduousClass: { classId: 'c1', className: '6ème A', rate: 95 },
      leastAssiduousClass: { classId: 'c2', className: '3ème C', rate: 72 },
      atRiskStudents: [],
      monthlyEvolution: [],
      weeklyHeatmap: [],
      alerts: [],
      recentActivity: [],
    };
    expect(dashboard.attendanceRate).toBe(85);
  });

  it('should define AttendanceTimeline interface correctly', () => {
    const timeline: AttendanceTimeline = {
      schoolId: 's1',
      events: [],
      totalEvents: 0,
      page: 1,
      limit: 20,
    };
    expect(timeline.totalEvents).toBe(0);
  });

  it('should define AttendanceReport interface correctly', () => {
    const report: AttendanceReport = {
      schoolId: 's1',
      reportType: 'DAILY',
      startDate: '2025-10-01',
      endDate: '2025-10-15',
      data: {
        summary: {
          schoolId: 's1', academicYearId: 'ay1', startDate: '2025-10-01', endDate: '2025-10-15',
          totalDays: 15, presentDays: 12, absentDays: 2, lateDays: 1, excusedDays: 0,
          sickDays: 0, permissionDays: 0, attendanceRate: 80, punctualityRate: 93.3,
          totalHoursPresent: 120, totalHoursExpected: 150, byMonth: [], byClass: [], bySubject: [],
        },
        details: [],
        statistics: {
          schoolId: 's1', academicYearId: 'ay1', date: '2025-10-15',
          totalStudents: 30, presentStudents: 25, absentStudents: 3, lateStudents: 2, excusedStudents: 0,
          attendanceRate: 83.3, punctualityRate: 93.3, totalTeachers: 10, presentTeachers: 10,
          absentTeachers: 0, lateTeachers: 0, teacherAttendanceRate: 100,
          byClass: [], byLevel: [], byDay: [], byMonth: [],
          trends: { weekly: [], monthly: [], yearly: [] },
        },
        charts: [],
      },
      generatedAt: new Date().toISOString(),
      generatedBy: 'u1',
    };
    expect(report.reportType).toBe('DAILY');
  });

  it('should define AttendanceAlert interface correctly', () => {
    const alert: AttendanceAlert = {
      id: '1',
      schoolId: 's1',
      alertType: 'CONSECUTIVE_ABSENCE',
      severity: 'HIGH',
      title: 'Alerte absences',
      message: 'Seuil dépassé',
      targetType: 'STUDENT',
      targetId: 's1',
      resolved: false,
      createdAt: new Date().toISOString(),
    };
    expect(alert.severity).toBe('HIGH');
  });

  it('should define AttendanceNotification interface correctly', () => {
    const notification: AttendanceNotification = {
      id: '1',
      schoolId: 's1',
      notificationType: 'ABSENCE',
      recipientType: 'PARENT',
      recipientId: 'p1',
      channel: 'EMAIL',
      title: 'Absence signalée',
      message: 'Votre enfant est absent',
      sent: true,
      read: false,
      createdAt: new Date().toISOString(),
    };
    expect(notification.channel).toBe('EMAIL');
  });

  it('should define AttendanceImport interface correctly', () => {
    const attendanceImport: AttendanceImport = {
      id: '1',
      schoolId: 's1',
      importType: 'STUDENT_ATTENDANCE',
      fileName: 'import.csv',
      status: 'PENDING',
      totalRows: 100,
      processedRows: 0,
      successRows: 0,
      errorRows: 0,
      errors: [],
      importedBy: 'u1',
      importedAt: new Date().toISOString(),
    };
    expect(attendanceImport.importType).toBe('STUDENT_ATTENDANCE');
  });

  it('should define AttendanceExport interface correctly', () => {
    const attendanceExport: AttendanceExport = {
      format: 'PDF',
      exportType: 'REPORT',
      filters: {},
      data: [],
      filename: 'report.pdf',
    };
    expect(attendanceExport.format).toBe('PDF');
  });

  it('should define AttendanceHistory interface correctly', () => {
    const history: AttendanceHistory = {
      schoolId: 's1',
      entityType: 'STUDENT',
      entityId: 's1',
      records: [],
      totalRecords: 0,
    };
    expect(history.totalRecords).toBe(0);
  });

  it('should define AttendanceCorrection interface correctly', () => {
    const correction: AttendanceCorrection = {
      id: '1',
      schoolId: 's1',
      attendanceId: 'a1',
      originalStatus: 'ABSENT',
      newStatus: 'EXCUSED',
      reason: 'Raison médicale',
      correctedBy: 'u1',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    expect(correction.status).toBe('PENDING');
  });

  it('should define AttendanceJustification interface correctly', () => {
    const justification: AttendanceJustification = {
      id: '1',
      schoolId: 's1',
      studentId: 's1',
      attendanceId: 'a1',
      reason: 'ILLNESS',
      description: 'Grippe',
      startDate: '2025-10-15',
      endDate: '2025-10-16',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(justification.status).toBe('PENDING');
  });

  it('should define AttendanceDevice interface correctly', () => {
    const device: AttendanceDevice = {
      id: '1',
      schoolId: 's1',
      name: 'Scanner QR',
      type: 'QR_SCANNER',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    expect(device.type).toBe('QR_SCANNER');
  });

  it('should define AttendanceLocation interface correctly', () => {
    const location: AttendanceLocation = {
      id: '1',
      schoolId: 's1',
      name: 'Entrée principale',
      latitude: 5.3600,
      longitude: -4.0083,
      radius: 100,
      isActive: true,
      allowedMethods: ['QR_CODE', 'GPS'],
      createdAt: new Date().toISOString(),
    };
    expect(location.radius).toBe(100);
  });

  it('should define AttendanceSync interface correctly', () => {
    const sync: AttendanceSync = {
      id: '1',
      schoolId: 's1',
      deviceId: 'd1',
      syncType: 'FULL',
      status: 'COMPLETED',
      recordsCount: 50,
      syncedCount: 50,
      failedCount: 0,
      conflictsCount: 0,
      startedAt: new Date().toISOString(),
    };
    expect(sync.status).toBe('COMPLETED');
  });

  it('should define AttendanceQR interface correctly', () => {
    const qr: AttendanceQR = {
      id: '1',
      schoolId: 's1',
      sessionId: 'ses1',
      code: 'QR123',
      expiresAt: new Date().toISOString(),
      maxScans: 50,
      scanCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    expect(qr.isActive).toBe(true);
  });

  it('should define AttendanceGPS interface correctly', () => {
    const gps: AttendanceGPS = {
      id: '1',
      schoolId: 's1',
      sessionId: 'ses1',
      latitude: 5.3600,
      longitude: -4.0083,
      radius: 100,
      verified: true,
      distanceFromSchool: 15,
      createdAt: new Date().toISOString(),
    };
    expect(gps.verified).toBe(true);
  });

  it('should define AttendanceFaceRecognition interface correctly', () => {
    const face: AttendanceFaceRecognition = {
      id: '1',
      schoolId: 's1',
      studentId: 's1',
      faceData: 'base64data',
      confidence: 0.95,
      verified: true,
      createdAt: new Date().toISOString(),
    };
    expect(face.confidence).toBe(0.95);
  });

  it('should define AttendanceNFC interface correctly', () => {
    const nfc: AttendanceNFC = {
      id: '1',
      schoolId: 's1',
      studentId: 's1',
      nfcTagId: 'NFC001',
      readerId: 'reader1',
      verified: true,
      createdAt: new Date().toISOString(),
    };
    expect(nfc.nfcTagId).toBe('NFC001');
  });

  it('should define AttendanceSettings interface correctly', () => {
    const settings: AttendanceSettings = {
      id: '1',
      schoolId: 's1',
      qrEnabled: true,
      gpsEnabled: false,
      nfcEnabled: false,
      faceEnabled: false,
      gpsRadius: 100,
      qrExpiryMinutes: 5,
      autoMarkAbsentAfterMinutes: 30,
      allowLateJustification: true,
      lateThresholdMinutes: 15,
      notificationsEnabled: true,
      parentNotifications: true,
      smsEnabled: false,
      whatsappEnabled: false,
      pushEnabled: true,
      emailEnabled: false,
      consecutiveAbsenceThreshold: 3,
      lowAttendanceThreshold: 70,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(settings.gpsRadius).toBe(100);
  });

  it('should define AttendancePolicy interface correctly', () => {
    const policy: AttendancePolicy = {
      id: '1',
      schoolId: 's1',
      name: 'Politique standard',
      description: 'Politique standard de présence',
      maxAbsencesWithoutJustification: 5,
      maxConsecutiveAbsences: 3,
      lateToleranceMinutes: 15,
      autoExclusionThreshold: 15,
      parentNotificationAfterAbsences: 3,
      adminAlertAfterAbsences: 5,
      allowExemption: false,
      exemptionRoles: [],
      createdBy: 'u1',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(policy.maxAbsencesWithoutJustification).toBe(5);
  });

  it('should define AttendanceAudit interface correctly', () => {
    const audit: AttendanceAudit = {
      id: '1',
      schoolId: 's1',
      userId: 'u1',
      action: 'CREATE',
      entityType: 'ATTENDANCE',
      entityId: 'a1',
      createdAt: new Date().toISOString(),
    };
    expect(audit.action).toBe('CREATE');
  });

  it('should define AttendanceSearch interface correctly', () => {
    const search: AttendanceSearch = {
      query: 'test',
      types: ['STUDENT', 'TEACHER'],
    };
    expect(search.query).toBe('test');
  });

  it('should define AttendanceAnalytics interface correctly', () => {
    const analytics: AttendanceAnalytics = {
      schoolId: 's1',
      academicYearId: 'ay1',
      period: 'MONTHLY',
      metrics: {
        overallRate: 85.5,
        studentRate: 86,
        teacherRate: 92,
        punctualityRate: 90,
        improvementRate: 5,
      },
      trends: {
        attendance: [],
        punctuality: [],
        byClass: [],
        byLevel: [],
      },
      predictions: {
        atRiskStudents: [],
        dropoutRisk: [],
        improvementOpportunities: [],
      },
      recommendations: [],
    };
    expect(analytics.metrics.overallRate).toBe(85.5);
  });

  it('should define AttendanceFilters interface correctly', () => {
    const filters: AttendanceFilters = {
      search: 'test',
      status: 'PRESENT',
      method: 'MANUAL',
      period: 'MORNING',
      page: 1,
      limit: 20,
    };
    expect(filters.page).toBe(1);
  });

  it('should define CreateAttendanceRequest correctly', () => {
    const request: CreateAttendanceRequest = {
      studentId: 's1',
      classId: 'c1',
      academicYearId: 'ay1',
      date: '2025-10-15',
      status: 'PRESENT',
    };
    expect(request.status).toBe('PRESENT');
  });

  it('should define UpdateAttendanceRequest correctly', () => {
    const request: UpdateAttendanceRequest = {
      status: 'ABSENT',
      reason: 'ILLNESS',
    };
    expect(request.status).toBe('ABSENT');
  });

  it('should define CreateTeacherAttendanceRequest correctly', () => {
    const request: CreateTeacherAttendanceRequest = {
      teacherId: 't1',
      date: '2025-10-15',
      status: 'PRESENT',
    };
    expect(request.teacherId).toBe('t1');
  });

  it('should define CreateSessionRequest correctly', () => {
    const request: CreateSessionRequest = {
      classId: 'c1',
      teacherId: 't1',
      academicYearId: 'ay1',
      date: '2025-10-15',
      period: 'MORNING',
      startTime: '08:00',
    };
    expect(request.period).toBe('MORNING');
  });

  it('should define BulkAttendanceRequest correctly', () => {
    const request: BulkAttendanceRequest = {
      classId: 'c1',
      academicYearId: 'ay1',
      date: '2025-10-15',
      period: 'MORNING',
      records: [{ studentId: 's1', status: 'PRESENT' }],
      recordedBy: 'u1',
    };
    expect(request.records).toHaveLength(1);
  });

  it('should define AttendanceReportRequest correctly', () => {
    const request: AttendanceReportRequest = {
      reportType: 'DAILY',
      startDate: '2025-10-01',
      endDate: '2025-10-15',
    };
    expect(request.reportType).toBe('DAILY');
  });

  it('should define AttendanceDashboardRequest correctly', () => {
    const request: AttendanceDashboardRequest = {
      date: '2025-10-15',
    };
    expect(request.date).toBe('2025-10-15');
  });

  it('should define AttendanceImportRequest correctly', () => {
    const request: AttendanceImportRequest = {
      importType: 'STUDENT_ATTENDANCE',
      data: [{ studentId: 's1', status: 'PRESENT' }],
      date: '2025-10-15',
    };
    expect(request.importType).toBe('STUDENT_ATTENDANCE');
  });

  it('should define AttendanceExportRequest correctly', () => {
    const request: AttendanceExportRequest = {
      format: 'PDF',
      exportType: 'REPORT',
      filters: {},
    };
    expect(request.exportType).toBe('REPORT');
  });

  it('should define all StudentAttendanceStatus values', () => {
    const statuses: StudentAttendanceStatus[] = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'SICK', 'PERMISSION', 'EXCLUDED', 'REMOTE', 'UNKNOWN'];
    expect(statuses).toHaveLength(9);
  });

  it('should define all TeacherAttendanceStatus values', () => {
    const statuses: TeacherAttendanceStatus[] = ['PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE', 'MISSION', 'SUBSTITUTE', 'TRAINING', 'REMOTE', 'UNKNOWN'];
    expect(statuses).toHaveLength(9);
  });

  it('should define all AttendanceMethod values', () => {
    const methods: AttendanceMethod[] = ['MANUAL', 'QR_CODE', 'GPS', 'NFC', 'FACE_RECOGNITION', 'IMPORT', 'AUTO'];
    expect(methods).toHaveLength(7);
  });

  it('should define all AttendanceReason values', () => {
    const reasons: AttendanceReason[] = ['ILLNESS', 'FAMILY', 'TRANSPORT', 'WEATHER', 'PERSONAL', 'SCHOOL_ACTIVITY', 'OTHER', 'UNKNOWN'];
    expect(reasons).toHaveLength(8);
  });

  it('should define all AttendanceType values', () => {
    const types: AttendanceType[] = ['STUDENT', 'TEACHER'];
    expect(types).toHaveLength(2);
  });

  it('should define all AttendanceSessionStatus values', () => {
    const statuses: AttendanceSessionStatus[] = ['PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELLED'];
    expect(statuses).toHaveLength(4);
  });

  it('should define all AttendancePeriod values', () => {
    const periods: AttendancePeriod[] = ['MORNING', 'AFTERNOON', 'FULL_DAY', 'EVENING'];
    expect(periods).toHaveLength(4);
  });
});
