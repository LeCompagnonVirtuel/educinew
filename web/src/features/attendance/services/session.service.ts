import type {
  AttendanceSession, AttendanceFilters, CreateSessionRequest,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceSessionNotFoundError,
  AttendanceSessionError,
  AttendanceValidationError,
  ClassNotFoundError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_SESSION } from '@educi/config';

export class SessionService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async start(schoolId: string, userId: string, data: CreateSessionRequest): Promise<AttendanceSession> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.classId) {
      errors.push({ field: 'classId', message: 'La classe est requise' });
    }
    if (!data.date) {
      errors.push({ field: 'date', message: 'La date est requise' });
    }

    if (errors.length > 0) {
      throw new AttendanceValidationError(errors);
    }

    const cls = await this.attendanceRepo.findClass(data.classId);
    if (!cls || cls.schoolId !== schoolId) {
      throw new ClassNotFoundError(data.classId);
    }

    const activeSession = await this.attendanceRepo.findActiveSession(schoolId, data.classId);
    if (activeSession) {
      throw new AttendanceSessionError('Une session est déjà active pour cette classe');
    }

    const session = await this.attendanceRepo.createSession({
      ...data,
      schoolId,
      status: 'ACTIVE',
      startedAt: new Date().toISOString(),
      startedBy: userId,
    });

    logger.info('Attendance session started', { sessionId: session.id, classId: data.classId, schoolId, userId }, 'attendance');
    return session;
  }

  async end(schoolId: string, userId: string, sessionId: string): Promise<AttendanceSession> {
    const session = await this.attendanceRepo.findSession(sessionId);
    if (!session || session.schoolId !== schoolId) {
      throw new AttendanceSessionNotFoundError(sessionId);
    }

    if (session.status !== 'ACTIVE') {
      throw new AttendanceSessionError('Seules les sessions actives peuvent être terminées');
    }

    const updated = await this.attendanceRepo.updateSession(sessionId, {
      status: 'COMPLETED',
      endedAt: new Date().toISOString(),
      endedBy: userId,
    });

    logger.info('Attendance session ended', { sessionId, schoolId, userId }, 'attendance');
    return updated;
  }

  async cancel(schoolId: string, userId: string, sessionId: string, reason?: string): Promise<AttendanceSession> {
    const session = await this.attendanceRepo.findSession(sessionId);
    if (!session || session.schoolId !== schoolId) {
      throw new AttendanceSessionNotFoundError(sessionId);
    }

    if (session.status === 'COMPLETED') {
      throw new AttendanceSessionError('Les sessions terminées ne peuvent pas être annulées');
    }

    const updated = await this.attendanceRepo.updateSession(sessionId, {
      status: 'CANCELLED',
      cancelledAt: new Date().toISOString(),
      cancelledBy: userId,
      cancellationReason: reason,
    });

    logger.info('Attendance session cancelled', { sessionId, schoolId, userId }, 'attendance');
    return updated;
  }

  async getById(schoolId: string, sessionId: string): Promise<AttendanceSession> {
    const session = await this.attendanceRepo.findSession(sessionId);
    if (!session || session.schoolId !== schoolId) {
      throw new AttendanceSessionNotFoundError(sessionId);
    }
    return session;
  }

  async list(schoolId: string, filters: AttendanceFilters): Promise<{ data: AttendanceSession[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let queryFilters: AttendanceFilters = { ...filters, page, limit };

    if (filters.classId) {
      queryFilters = { ...queryFilters, classId: filters.classId };
    }
    if (filters.date) {
      queryFilters = { ...queryFilters, date: filters.date };
    }
    if (filters.startDate) {
      queryFilters = { ...queryFilters, startDate: filters.startDate };
    }
    if (filters.endDate) {
      queryFilters = { ...queryFilters, endDate: filters.endDate };
    }
    if (filters.status) {
      queryFilters = { ...queryFilters, status: filters.status };
    }

    return this.attendanceRepo.findAllSessions(schoolId, queryFilters);
  }

  async getCurrentSession(schoolId: string, classId: string): Promise<AttendanceSession | null> {
    const session = await this.attendanceRepo.findActiveSession(schoolId, classId);
    return session;
  }

  async getSessionStats(schoolId: string, classId: string, startDate: string, endDate: string): Promise<{
    totalSessions: number;
    activeSessions: number;
    completedSessions: number;
    cancelledSessions: number;
    averageDurationMinutes: number;
  }> {
    const { data: sessions } = await this.attendanceRepo.findAllSessions(schoolId, {
      classId,
      startDate,
      endDate,
      limit: 10000,
    });

    const totalSessions = sessions.length;
    const activeSessions = sessions.filter((s) => s.status === 'ACTIVE').length;
    const completedSessions = sessions.filter((s) => s.status === 'COMPLETED').length;
    const cancelledSessions = sessions.filter((s) => s.status === 'CANCELLED').length;

    let totalDuration = 0;
    let durationCount = 0;

    for (const session of sessions) {
      if (session.startedAt && session.endedAt) {
        const duration = new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime();
        totalDuration += duration / 60000;
        durationCount++;
      }
    }

    const averageDurationMinutes = durationCount > 0 ? Math.round(totalDuration / durationCount) : 0;

    logger.info('Session stats retrieved', { schoolId, classId, totalSessions }, 'attendance');
    return {
      totalSessions,
      activeSessions,
      completedSessions,
      cancelledSessions,
      averageDurationMinutes,
    };
  }
}
