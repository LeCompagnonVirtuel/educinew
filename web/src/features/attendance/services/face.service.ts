import { randomUUID } from 'crypto';
import type {
  AttendanceFaceRecognition,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceFaceRecognitionError,
  AttendanceFaceNotRecognizedError,
  AttendanceValidationError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_FACE } from '@educi/config';

export class FaceRecognitionService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async validate(schoolId: string, studentId: string, faceData: string): Promise<{ valid: boolean; confidence?: number; reason?: string }> {
    if (!faceData || faceData.trim().length === 0) {
      throw new AttendanceValidationError([
        { field: 'faceData', message: 'Les données faciales sont requises' },
      ]);
    }

    const storedFace = await this.attendanceRepo.findFaceByStudent(schoolId, studentId);

    if (!storedFace) {
      return { valid: false, reason: 'Aucun visage enregistré pour cet élève' };
    }

    if (!storedFace.isActive) {
      return { valid: false, reason: 'Enregistrement facial désactivé' };
    }

    const confidence = this.calculateConfidence(faceData, storedFace.faceData);

    if (confidence < ATTENDANCE_FACE.MIN_CONFIDENCE) {
      logger.info('Face recognition failed - low confidence', { schoolId, studentId, confidence }, 'attendance');
      return { valid: false, confidence, reason: 'Confiance insuffisante pour la reconnaissance faciale' };
    }

    logger.info('Face recognition passed', { schoolId, studentId, confidence }, 'attendance');
    return { valid: true, confidence };
  }

  async registerFace(schoolId: string, userId: string, studentId: string, faceData: string): Promise<AttendanceFaceRecognition> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!studentId) {
      errors.push({ field: 'studentId', message: "L'élève est requis" });
    }
    if (!faceData || faceData.trim().length === 0) {
      errors.push({ field: 'faceData', message: 'Les données faciales sont requises' });
    }

    if (errors.length > 0) {
      throw new AttendanceValidationError(errors);
    }

    const existing = await this.attendanceRepo.findFaceByStudent(schoolId, studentId);
    if (existing) {
      const updated = await this.attendanceRepo.updateFace(existing.id, {
        faceData,
        updatedAt: new Date().toISOString(),
      });
      logger.info('Face data updated', { faceId: existing.id, studentId, schoolId, userId }, 'attendance');
      return updated;
    }

    const face: AttendanceFaceRecognition = {
      id: randomUUID(),
      studentId,
      schoolId,
      faceData,
      isActive: true,
      registeredBy: userId,
      createdAt: new Date().toISOString(),
    };

    await this.attendanceRepo.createFace(face);
    logger.info('Face registered', { faceId: face.id, studentId, schoolId, userId }, 'attendance');
    return face;
  }

  private calculateConfidence(inputData: string, storedData: string): number {
    if (inputData === storedData) return 1.0;

    const inputHash = this.simpleHash(inputData);
    const storedHash = this.simpleHash(storedData);

    let matches = 0;
    const maxLen = Math.max(inputHash.length, storedHash.length);

    for (let i = 0; i < maxLen; i++) {
      if (inputHash[i % inputHash.length] === storedHash[i % storedHash.length]) {
        matches++;
      }
    }

    return matches / maxLen;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  }
}
