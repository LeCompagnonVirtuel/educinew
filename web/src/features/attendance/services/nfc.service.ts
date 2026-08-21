import { randomUUID } from 'crypto';
import type {
  AttendanceNFC,
  AttendanceRepositoryExtended,
} from '../types';
import {
  AttendanceNFCError,
  AttendanceNFCNotRecognizedError,
  AttendanceValidationError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ATTENDANCE_NFC } from '@educi/config';

export class NFCService {
  constructor(private readonly attendanceRepo: AttendanceRepositoryExtended) {}

  async validate(schoolId: string, tagId: string): Promise<{ valid: boolean; studentId?: string; reason?: string }> {
    if (!tagId || tagId.trim().length === 0) {
      throw new AttendanceValidationError([
        { field: 'tagId', message: 'L\'identifiant du tag NFC est requis' },
      ]);
    }

    const tag = await this.attendanceRepo.findNFCByTagId(schoolId, tagId);

    if (!tag) {
      return { valid: false, reason: 'Tag NFC non reconnu' };
    }

    if (!tag.isActive) {
      return { valid: false, reason: 'Tag NFC désactivé' };
    }

    logger.info('NFC tag validated', { tagId: tag.id, studentId: tag.studentId, schoolId }, 'attendance');
    return { valid: true, studentId: tag.studentId };
  }

  async registerTag(schoolId: string, userId: string, studentId: string, tagId: string, tagType?: string): Promise<AttendanceNFC> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!studentId) {
      errors.push({ field: 'studentId', message: "L'élève est requis" });
    }
    if (!tagId || tagId.trim().length === 0) {
      errors.push({ field: 'tagId', message: 'L\'identifiant du tag NFC est requis' });
    }

    if (errors.length > 0) {
      throw new AttendanceValidationError(errors);
    }

    if (tagType && !ATTENDANCE_NFC.TAG_TYPES.includes(tagType as any)) {
      throw new AttendanceValidationError([
        { field: 'tagType', message: `Type de tag invalide: ${tagType}` },
      ]);
    }

    const existingTag = await this.attendanceRepo.findNFCByTagId(schoolId, tagId);
    if (existingTag) {
      throw new AttendanceNFCError('Ce tag NFC est déjà associé à un élève');
    }

    const nfc: AttendanceNFC = {
      id: randomUUID(),
      tagId,
      tagType: tagType || 'MIFARE_CLASSIC',
      studentId,
      schoolId,
      isActive: true,
      registeredBy: userId,
      createdAt: new Date().toISOString(),
    };

    await this.attendanceRepo.createNFC(nfc);
    logger.info('NFC tag registered', { nfcId: nfc.id, tagId, studentId, schoolId, userId }, 'attendance');
    return nfc;
  }
}
