import type {
  AttendanceQR, AttendanceSession,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceQRCodeError,
  AttendanceQRCodeExpiredError,
  AttendanceSessionNotFoundError,
  AttendanceValidationError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_QR, QR_CODE } from '@educi/config';
import crypto from 'crypto';

export class QRService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async generate(schoolId: string, userId: string, sessionId: string): Promise<AttendanceQR> {
    const session = await this.attendanceRepo.findSession(sessionId);
    if (!session || session.schoolId !== schoolId) {
      throw new AttendanceSessionNotFoundError(sessionId);
    }

    if (session.status !== 'ACTIVE') {
      throw new AttendanceSessionError('Seules les sessions actives peuvent générer des QR codes');
    }

    const code = crypto.randomBytes(ATTENDANCE_QR.CODE_LENGTH / 2).toString('hex');
    const expiresAt = new Date(Date.now() + ATTENDANCE_QR.EXPIRY_MINUTES * 60000).toISOString();

    const qr: AttendanceQR = {
      id: crypto.randomUUID(),
      code,
      sessionId,
      schoolId,
      expiresAt,
      maxScans: ATTENDANCE_QR.MAX_SCANS,
      scanCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    await this.attendanceRepo.createQR(qr);
    logger.info('QR code generated', { qrId: qr.id, sessionId, schoolId, userId }, 'attendance');
    return qr;
  }

  async validate(schoolId: string, code: string): Promise<{ valid: boolean; sessionId?: string; reason?: string }> {
    const qr = await this.attendanceRepo.findQRByCode(code);

    if (!qr || qr.schoolId !== schoolId) {
      return { valid: false, reason: 'Code QR invalide' };
    }

    if (!qr.isActive) {
      return { valid: false, reason: 'Code QR désactivé' };
    }

    if (new Date(qr.expiresAt) < new Date()) {
      return { valid: false, reason: 'Code QR expiré' };
    }

    if (qr.scanCount >= qr.maxScans) {
      return { valid: false, reason: 'Nombre maximum de scans atteint' };
    }

    await this.attendanceRepo.incrementQRScanCount(qr.id);

    logger.info('QR code validated', { qrId: qr.id, sessionId: qr.sessionId, schoolId }, 'attendance');
    return { valid: true, sessionId: qr.sessionId };
  }

  async refresh(schoolId: string, userId: string, qrId: string): Promise<AttendanceQR> {
    const qr = await this.attendanceRepo.findQR(qrId);
    if (!qr || qr.schoolId !== schoolId) {
      throw new AttendanceQRCodeError('Code QR introuvable');
    }

    const newCode = crypto.randomBytes(ATTENDANCE_QR.CODE_LENGTH / 2).toString('hex');
    const expiresAt = new Date(Date.now() + ATTENDANCE_QR.EXPIRY_MINUTES * 60000).toISOString();

    const updated = await this.attendanceRepo.updateQR(qrId, {
      code: newCode,
      expiresAt,
      scanCount: 0,
      isActive: true,
    });

    logger.info('QR code refreshed', { qrId, schoolId, userId }, 'attendance');
    return updated;
  }

  async getActiveQR(schoolId: string, sessionId: string): Promise<AttendanceQR | null> {
    const qr = await this.attendanceRepo.findActiveQRBySession(schoolId, sessionId);

    if (qr && new Date(qr.expiresAt) < new Date()) {
      return null;
    }

    return qr;
  }
}
