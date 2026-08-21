import type {
  AcademicRepository, AcademicFilters,
} from '../types';
import {
  AcademicValidationError,
  ClassDuplicateError,
  SubjectDuplicateError,
  ClassCapacityError,
  AcademicYearConflictError,
  ScheduleConflictError,
  AppError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ACADEMIC_YEAR, ACADEMIC_SCHEDULE } from '@educi/config';

export class AcademicValidationService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Validates that a class name is unique within its level for a school.
   */
  async validateClassName(
    name: string,
    levelId: string,
    schoolId: string,
    excludeClassId?: string,
  ): Promise<void> {
    if (!name || name.trim().length === 0) {
      throw new AcademicValidationError([
        { field: 'name', message: 'Le nom de la classe est requis' },
      ]);
    }

    const { data: existingClasses } = await this.academicRepo.findAllClasses(schoolId, {
      levelId,
      limit: 1000,
    });

    const duplicate = existingClasses.find(
      (c) =>
        c.id !== excludeClassId &&
        c.name.toLowerCase() === name.trim().toLowerCase() &&
        c.levelId === levelId,
    );

    if (duplicate) {
      throw new ClassDuplicateError(name, levelId);
    }

    logger.info('Class name validated', { schoolId, name, levelId }, 'academic');
  }

  /**
   * Validates that a subject code is unique within a school.
   */
  async validateSubjectCode(
    code: string,
    schoolId: string,
    excludeSubjectId?: string,
  ): Promise<void> {
    if (!code || code.trim().length === 0) {
      throw new AcademicValidationError([
        { field: 'code', message: 'Le code de la matière est requis' },
      ]);
    }

    const { data: existingSubjects } = await this.academicRepo.findAllSubjects(schoolId, {
      limit: 1000,
    });

    const duplicate = existingSubjects.find(
      (s) =>
        s.id !== excludeSubjectId &&
        s.code.toLowerCase() === code.trim().toLowerCase(),
    );

    if (duplicate) {
      throw new SubjectDuplicateError(code);
    }

    logger.info('Subject code validated', { schoolId, code }, 'academic');
  }

  /**
   * Validates that a room code is unique within a school.
   */
  async validateRoomCode(
    code: string,
    schoolId: string,
    excludeRoomId?: string,
  ): Promise<void> {
    if (!code || code.trim().length === 0) {
      throw new AcademicValidationError([
        { field: 'code', message: 'Le code de la salle est requis' },
      ]);
    }

    const { data: existingRooms } = await this.academicRepo.findAllRooms(schoolId, {
      limit: 1000,
    });

    const duplicate = existingRooms.find(
      (r) =>
        r.id !== excludeRoomId &&
        r.code.toLowerCase() === code.trim().toLowerCase(),
    );

    if (duplicate) {
      throw new AppError(
        `Une salle avec le code ${code} existe déjà`,
        'ROOM_DUPLICATE',
        409,
      );
    }

    logger.info('Room code validated', { schoolId, code }, 'academic');
  }

  /**
   * Validates a schedule slot for time conflicts, teacher availability, and room availability.
   */
  async validateScheduleSlot(
    data: {
      teacherId: string;
      roomId: string;
      classId: string;
      dayOfWeek: number;
      startTime: string;
      endTime: string;
      academicYearId: string;
    },
    schoolId: string,
    excludeSlotId?: string,
  ): Promise<void> {
    const errors: Array<{ field: string; message: string }> = [];

    if (data.startTime >= data.endTime) {
      errors.push({ field: 'endTime', message: "L'heure de fin doit être après l'heure de début" });
    }

    if (data.dayOfWeek < 0 || data.dayOfWeek > 6) {
      errors.push({ field: 'dayOfWeek', message: 'Le jour de la semaine doit être entre 0 et 6' });
    }

    if (!data.teacherId) {
      errors.push({ field: 'teacherId', message: "L'enseignant est requis" });
    }
    if (!data.roomId) {
      errors.push({ field: 'roomId', message: 'La salle est requise' });
    }
    if (!data.classId) {
      errors.push({ field: 'classId', message: 'La classe est requise' });
    }

    if (errors.length > 0) {
      throw new AcademicValidationError(errors);
    }

    const existingSlots = await this.academicRepo.findTimetableSlots(schoolId, {
      academicYearId: data.academicYearId,
    });

    const conflicts: Array<{ type: string; description: string }> = [];

    for (const slot of existingSlots) {
      if (excludeSlotId && slot.id === excludeSlotId) continue;
      if (slot.dayOfWeek !== data.dayOfWeek) continue;
      if (slot.startTime >= data.endTime || slot.endTime <= data.startTime) continue;

      if (slot.teacherId === data.teacherId) {
        conflicts.push({
          type: 'TEACHER',
          description: `Enseignant déjà assigné ${slot.startTime}-${slot.endTime}`,
        });
      }
      if (slot.roomId === data.roomId) {
        conflicts.push({
          type: 'ROOM',
          description: `Salle déjà occupée ${slot.startTime}-${slot.endTime}`,
        });
      }
      if (slot.classId === data.classId) {
        conflicts.push({
          type: 'CLASS',
          description: `Classe a déjà un cours ${slot.startTime}-${slot.endTime}`,
        });
      }
    }

    if (conflicts.length > 0) {
      throw new ScheduleConflictError(conflicts);
    }

    logger.info('Schedule slot validated', { schoolId, academicYearId: data.academicYearId }, 'academic');
  }

  /**
   * Validates academic year data: start < end, no overlapping years.
   */
  async validateAcademicYear(
    data: { name: string; startDate: string; endDate: string },
    schoolId: string,
    excludeYearId?: string,
  ): Promise<void> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: "Le nom de l'année scolaire est requis" });
    }
    if (!data.startDate) {
      errors.push({ field: 'startDate', message: 'La date de début est requise' });
    }
    if (!data.endDate) {
      errors.push({ field: 'endDate', message: 'La date de fin est requise' });
    }

    if (errors.length > 0) {
      throw new AcademicValidationError(errors);
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (start >= end) {
      throw new AcademicValidationError([
        { field: 'endDate', message: "La date de fin doit être après la date de début" },
      ]);
    }

    const durationDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (durationDays < ACADEMIC_YEAR.MIN_DURATION_DAYS) {
      throw new AcademicValidationError([
        { field: 'duration', message: `La durée minimale est de ${ACADEMIC_YEAR.MIN_DURATION_DAYS} jours` },
      ]);
    }
    if (durationDays > ACADEMIC_YEAR.MAX_DURATION_DAYS) {
      throw new AcademicValidationError([
        { field: 'duration', message: `La durée maximale est de ${ACADEMIC_YEAR.MAX_DURATION_DAYS} jours` },
      ]);
    }

    const existingYears = await this.academicRepo.findAllAcademicYears(schoolId);
    const overlapping = existingYears.find(
      (y) =>
        y.id !== excludeYearId &&
        new Date(y.startDate) < end &&
        new Date(y.endDate) > start,
    );

    if (overlapping) {
      throw new AcademicYearConflictError(
        `Chevauchement avec l'année scolaire "${overlapping.name}"`,
      );
    }

    logger.info('Academic year validated', { schoolId, name: data.name }, 'academic');
  }

  /**
   * Validates term data: start/end within parent year, no overlapping terms.
   */
  async validateTerm(
    data: { name: string; startDate: string; endDate: string; order: number },
    academicYearId: string,
    schoolId: string,
    excludeTermId?: string,
  ): Promise<void> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom du trimestre est requis' });
    }
    if (!data.startDate) {
      errors.push({ field: 'startDate', message: 'La date de début est requise' });
    }
    if (!data.endDate) {
      errors.push({ field: 'endDate', message: 'La date de fin est requise' });
    }

    if (errors.length > 0) {
      throw new AcademicValidationError(errors);
    }

    const academicYear = await this.academicRepo.findAcademicYear(academicYearId);
    if (!academicYear || academicYear.schoolId !== schoolId) {
      throw new AppError('Année scolaire introuvable', 'ACADEMIC_YEAR_NOT_FOUND', 404);
    }

    const termStart = new Date(data.startDate);
    const termEnd = new Date(data.endDate);
    const yearStart = new Date(academicYear.startDate);
    const yearEnd = new Date(academicYear.endDate);

    if (termStart < yearStart || termEnd > yearEnd) {
      throw new AcademicValidationError([
        { field: 'dates', message: 'Le trimestre doit être inclus dans l\'année scolaire' },
      ]);
    }

    if (termStart >= termEnd) {
      throw new AcademicValidationError([
        { field: 'endDate', message: "La date de fin doit être après la date de début" },
      ]);
    }

    const existingTerms = await this.academicRepo.findTerms(academicYearId);
    const overlapping = existingTerms.find(
      (t) =>
        t.id !== excludeTermId &&
        new Date(t.startDate) < termEnd &&
        new Date(t.endDate) > termStart,
    );

    if (overlapping) {
      throw new AcademicValidationError([
        { field: 'dates', message: `Chevauchement avec le trimestre "${overlapping.name}"` },
      ]);
    }

    logger.info('Term validated', { schoolId, academicYearId, name: data.name }, 'academic');
  }

  /**
   * Validates if a class has capacity for more students.
   */
  async validateClassCapacity(
    classId: string,
    schoolId: string,
  ): Promise<{ hasCapacity: boolean; current: number; capacity: number }> {
    const cls = await this.academicRepo.findClass(classId);
    if (!cls || cls.schoolId !== schoolId) {
      throw new AppError('Classe introuvable', 'CLASS_NOT_FOUND', 404);
    }

    const currentStudents = await this.academicRepo.countActiveStudentsByClassId(schoolId, classId);

    if (currentStudents >= cls.capacity) {
      throw new ClassCapacityError(cls.capacity, currentStudents);
    }

    logger.info('Class capacity validated', { schoolId, classId, current: currentStudents, capacity: cls.capacity }, 'academic');

    return {
      hasCapacity: currentStudents < cls.capacity,
      current: currentStudents,
      capacity: cls.capacity,
    };
  }
}
