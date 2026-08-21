import type { StudentRepository } from '../types';
import { StudentNotFoundError, StudentPhotoError } from '@educi/errors';
import { STUDENT_PHOTO } from '@educi/config';
import { logger } from '@educi/logger';
import { AuditStudentService } from './audit-student.service';

export class PhotoService {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly auditService: AuditStudentService,
  ) {}

  async uploadPhoto(studentId: string, file: File): Promise<string> {
    const existing = await this.studentRepo.findById(studentId);
    if (!existing) throw new StudentNotFoundError(studentId);

    this.validateFile(file);

    try {
      const url = await this.studentRepo.uploadPhoto(studentId, file);
      await this.auditService.log({
        action: 'STUDENT_PHOTO_UPLOAD',
        studentId,
        details: { fileName: file.name },
      });
      logger.info('Student photo uploaded', { studentId }, 'students');
      return url;
    } catch (err) {
      throw new StudentPhotoError();
    }
  }

  validateFile(file: File): void {
    if (!STUDENT_PHOTO.ALLOWED_TYPES.includes(file.type)) {
      throw new StudentPhotoError(`Format non supporté: ${file.type}`);
    }
    if (file.size > STUDENT_PHOTO.MAX_SIZE_MB * 1024 * 1024) {
      throw new StudentPhotoError(`Le fichier ne doit pas dépasser ${STUDENT_PHOTO.MAX_SIZE_MB}MB`);
    }
  }
}
