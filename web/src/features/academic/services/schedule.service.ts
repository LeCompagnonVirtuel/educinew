import type {
  AcademicRepository, AcademicFilters, TimetableSlot, CreateScheduleSlotRequest,
} from '../types';
import {
  NotFoundError, AppError, ScheduleConflictError, TeacherScheduleConflictError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export class ScheduleService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Retrieves timetable slots with optional filters for class, teacher, day, and level.
   */
  async getTimetable(schoolId: string, filters: AcademicFilters): Promise<TimetableSlot[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, filters);
    logger.info('Timetable retrieved', { schoolId, count: slots.length }, 'academic');
    return slots;
  }

  /**
   * Creates a new timetable slot after validating room and teacher availability with no conflicts.
   */
  async createSlot(
    schoolId: string,
    userId: string,
    data: CreateScheduleSlotRequest,
  ): Promise<TimetableSlot> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.classId) {
      errors.push({ field: 'classId', message: 'La classe est requise' });
    }
    if (!data.subjectId) {
      errors.push({ field: 'subjectId', message: 'La matière est requise' });
    }
    if (!data.teacherId) {
      errors.push({ field: 'teacherId', message: "L'enseignant est requis" });
    }
    if (!data.roomId) {
      errors.push({ field: 'roomId', message: 'La salle est requise' });
    }
    if (!data.academicYearId) {
      errors.push({ field: 'academicYearId', message: "L'année scolaire est requise" });
    }
    if (!data.dayOfWeek && data.dayOfWeek !== 0) {
      errors.push({ field: 'dayOfWeek', message: 'Le jour de la semaine est requis' });
    }
    if (!data.startTime) {
      errors.push({ field: 'startTime', message: "L'heure de début est requise" });
    }
    if (!data.endTime) {
      errors.push({ field: 'endTime', message: "L'heure de fin est requise" });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'SCHEDULE_VALIDATION_ERROR',
        400,
      );
    }

    if (data.startTime >= data.endTime) {
      throw new AppError(
        "L'heure de fin doit être après l'heure de début",
        'SCHEDULE_TIME_INVALID',
        400,
      );
    }

    if (data.roomId) {
      const room = await this.academicRepo.findRoom(data.roomId);
      if (!room || room.schoolId !== schoolId) {
        throw new NotFoundError('Salle', data.roomId);
      }
    }

    const cls = await this.academicRepo.findClass(data.classId);
    if (!cls || cls.schoolId !== schoolId) {
      throw new NotFoundError('Classe', data.classId);
    }

    const subject = await this.academicRepo.findSubject(data.subjectId);
    if (!subject || subject.schoolId !== schoolId) {
      throw new NotFoundError('Matière', data.subjectId);
    }

    const existingSlots = await this.academicRepo.findTimetableSlots(schoolId, {
      academicYearId: data.academicYearId,
    });

    const conflicts: Array<{ type: string; description: string }> = [];

    for (const slot of existingSlots) {
      if (slot.dayOfWeek !== data.dayOfWeek) continue;
      if (slot.startTime >= data.endTime || slot.endTime <= data.startTime) continue;

      if (slot.roomId === data.roomId) {
        conflicts.push({
          type: 'ROOM',
          description: `Salle déjà occupée ${data.startTime}-${data.endTime} (${slot.class?.name || 'inconnu'})`,
        });
      }
      if (slot.teacherId === data.teacherId) {
        conflicts.push({
          type: 'TEACHER',
          description: `Enseignant déjà assigné ${data.startTime}-${data.endTime} (${slot.class?.name || 'inconnu'})`,
        });
      }
      if (slot.classId === data.classId) {
        conflicts.push({
          type: 'CLASS',
          description: `Classe ${cls.name} a déjà un cours ${data.startTime}-${data.endTime}`,
        });
      }
    }

    if (conflicts.length > 0) {
      for (const conflict of conflicts) {
        await this.academicRepo.createConflict({
          schoolId,
          academicYearId: data.academicYearId,
          conflictType: conflict.type as 'TEACHER' | 'ROOM' | 'CLASS',
          slot1Id: '',
          slot2Id: '',
          description: conflict.description,
          severity: 'HIGH',
          resolved: false,
        });
      }
      throw new ScheduleConflictError(conflicts);
    }

    const slot = await this.academicRepo.createTimetableSlot(data, schoolId);
    logger.info('Timetable slot created', { slotId: slot.id, schoolId, userId }, 'academic');
    return slot;
  }

  /**
   * Updates a timetable slot by deleting the old one and creating a new one with validation.
   */
  async updateSlot(
    schoolId: string,
    userId: string,
    slotId: string,
    data: CreateScheduleSlotRequest,
  ): Promise<TimetableSlot> {
    const existing = await this.academicRepo.findTimetableSlot(slotId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new NotFoundError('Créneau', slotId);
    }

    await this.academicRepo.deleteTimetableSlot(slotId);
    const updated = await this.createSlot(schoolId, userId, data);
    logger.info('Timetable slot updated', { slotId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Deletes a timetable slot by its ID.
   */
  async deleteSlot(schoolId: string, userId: string, slotId: string): Promise<void> {
    const existing = await this.academicRepo.findTimetableSlot(slotId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new NotFoundError('Créneau', slotId);
    }

    await this.academicRepo.deleteTimetableSlot(slotId);
    logger.info('Timetable slot deleted', { slotId, schoolId, userId }, 'academic');
  }

  /**
   * Retrieves all timetable slots for a specific teacher within an academic year.
   */
  async getTeacherSchedule(
    schoolId: string,
    teacherId: string,
    academicYearId: string,
  ): Promise<TimetableSlot[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const teacherSlots = slots.filter((s) => s.teacherId === teacherId);
    logger.info('Teacher schedule retrieved', { schoolId, teacherId, count: teacherSlots.length }, 'academic');
    return teacherSlots;
  }

  /**
   * Retrieves all timetable slots for a specific class within an academic year.
   */
  async getClassSchedule(
    schoolId: string,
    classId: string,
    academicYearId: string,
  ): Promise<TimetableSlot[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const classSlots = slots.filter((s) => s.classId === classId);
    logger.info('Class schedule retrieved', { schoolId, classId, count: classSlots.length }, 'academic');
    return classSlots;
  }

  /**
   * Retrieves all timetable slots for a specific room within an academic year.
   */
  async getRoomSchedule(
    schoolId: string,
    roomId: string,
    academicYearId: string,
  ): Promise<TimetableSlot[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const roomSlots = slots.filter((s) => s.roomId === roomId);
    logger.info('Room schedule retrieved', { schoolId, roomId, count: roomSlots.length }, 'academic');
    return roomSlots;
  }

  /**
   * Retrieves all timetable slots for a given day of the week within an academic year.
   */
  async getDailySchedule(
    schoolId: string,
    academicYearId: string,
    dayOfWeek: number,
  ): Promise<TimetableSlot[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const daySlots = slots.filter((s) => s.dayOfWeek === dayOfWeek);
    logger.info('Daily schedule retrieved', { schoolId, dayOfWeek, count: daySlots.length }, 'academic');
    return daySlots;
  }
}
