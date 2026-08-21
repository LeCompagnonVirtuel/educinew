import type {
  AcademicRepository, TimetableSlot, AcademicFilters,
} from '../types';
import { AppError, NotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';

interface AvailabilityResult {
  available: boolean;
  conflicts: Array<{ slotId: string; startTime: string; endTime: string; entityName: string }>;
}

export class AvailabilityService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Checks if a teacher is available at the given day and time slot.
   */
  async checkTeacherAvailability(
    schoolId: string,
    teacherId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    academicYearId: string,
    excludeSlotId?: string,
  ): Promise<AvailabilityResult> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const conflicts: AvailabilityResult['conflicts'] = [];

    for (const slot of slots) {
      if (excludeSlotId && slot.id === excludeSlotId) continue;
      if (slot.teacherId !== teacherId) continue;
      if (slot.dayOfWeek !== dayOfWeek) continue;
      if (slot.startTime >= endTime || slot.endTime <= startTime) continue;

      conflicts.push({
        slotId: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        entityName: slot.class?.name || 'Classe inconnue',
      });
    }

    logger.info('Teacher availability checked', { schoolId, teacherId, available: conflicts.length === 0 }, 'academic');

    return {
      available: conflicts.length === 0,
      conflicts,
    };
  }

  /**
   * Checks if a room is available at the given day and time slot.
   */
  async checkRoomAvailability(
    schoolId: string,
    roomId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    academicYearId: string,
    excludeSlotId?: string,
  ): Promise<AvailabilityResult> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const conflicts: AvailabilityResult['conflicts'] = [];

    for (const slot of slots) {
      if (excludeSlotId && slot.id === excludeSlotId) continue;
      if (slot.roomId !== roomId) continue;
      if (slot.dayOfWeek !== dayOfWeek) continue;
      if (slot.startTime >= endTime || slot.endTime <= startTime) continue;

      conflicts.push({
        slotId: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        entityName: slot.class?.name || 'Classe inconnue',
      });
    }

    logger.info('Room availability checked', { schoolId, roomId, available: conflicts.length === 0 }, 'academic');

    return {
      available: conflicts.length === 0,
      conflicts,
    };
  }

  /**
   * Checks if a class is available at the given day and time slot.
   */
  async checkClassAvailability(
    schoolId: string,
    classId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    academicYearId: string,
    excludeSlotId?: string,
  ): Promise<AvailabilityResult> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const conflicts: AvailabilityResult['conflicts'] = [];

    for (const slot of slots) {
      if (excludeSlotId && slot.id === excludeSlotId) continue;
      if (slot.classId !== classId) continue;
      if (slot.dayOfWeek !== dayOfWeek) continue;
      if (slot.startTime >= endTime || slot.endTime <= startTime) continue;

      conflicts.push({
        slotId: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        entityName: slot.subject?.name || 'Matière inconnue',
      });
    }

    logger.info('Class availability checked', { schoolId, classId, available: conflicts.length === 0 }, 'academic');

    return {
      available: conflicts.length === 0,
      conflicts,
    };
  }

  /**
   * Returns all timetable slots for a teacher within an academic year.
   */
  async getTeacherAvailableSlots(
    schoolId: string,
    teacherId: string,
    academicYearId: string,
  ): Promise<TimetableSlot[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const teacherSlots = slots.filter((s) => s.teacherId === teacherId);

    logger.info('Teacher slots retrieved', { schoolId, teacherId, count: teacherSlots.length }, 'academic');
    return teacherSlots;
  }

  /**
   * Returns all timetable slots for a room within an academic year.
   */
  async getRoomAvailableSlots(
    schoolId: string,
    roomId: string,
    academicYearId: string,
  ): Promise<TimetableSlot[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const roomSlots = slots.filter((s) => s.roomId === roomId);

    logger.info('Room slots retrieved', { schoolId, roomId, count: roomSlots.length }, 'academic');
    return roomSlots;
  }

  /**
   * Returns all rooms that are available at the given day and time.
   */
  async getAvailableRooms(
    schoolId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    academicYearId: string,
  ): Promise<Array<{ roomId: string; roomName: string; roomType: string; capacity: number }>> {
    const { data: allRooms } = await this.academicRepo.findAllRooms(schoolId, { limit: 1000 });
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });

    const occupiedRoomIds = new Set<string>();
    for (const slot of slots) {
      if (slot.dayOfWeek !== dayOfWeek) continue;
      if (slot.startTime >= endTime || slot.endTime <= startTime) continue;
      if (slot.roomId) occupiedRoomIds.add(slot.roomId);
    }

    const availableRooms = allRooms
      .filter((r) => r.status === 'AVAILABLE' && !occupiedRoomIds.has(r.id))
      .map((r) => ({
        roomId: r.id,
        roomName: r.name,
        roomType: r.roomType,
        capacity: r.capacity,
      }));

    logger.info('Available rooms retrieved', { schoolId, dayOfWeek, count: availableRooms.length }, 'academic');
    return availableRooms;
  }

  /**
   * Returns all teachers that are available at the given day and time.
   */
  async getAvailableTeachers(
    schoolId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    academicYearId: string,
  ): Promise<Array<{ teacherId: string; firstName: string; lastName: string }>> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });

    const occupiedTeacherIds = new Set<string>();
    for (const slot of slots) {
      if (slot.dayOfWeek !== dayOfWeek) continue;
      if (slot.startTime >= endTime || slot.endTime <= startTime) continue;
      occupiedTeacherIds.add(slot.teacherId);
    }

    const { data: assignments } = await this.academicRepo.findAllAssignments(schoolId, {
      academicYearId,
      limit: 10000,
    });

    const teacherMap = new Map<string, { teacherId: string; firstName: string; lastName: string }>();
    for (const assignment of assignments) {
      if (assignment.status !== 'ACTIVE') continue;
      if (occupiedTeacherIds.has(assignment.teacherId)) continue;

      if (!teacherMap.has(assignment.teacherId) && assignment.teacher) {
        teacherMap.set(assignment.teacherId, {
          teacherId: assignment.teacherId,
          firstName: assignment.teacher.firstName || '',
          lastName: assignment.teacher.lastName || '',
        });
      }
    }

    const availableTeachers = Array.from(teacherMap.values());
    logger.info('Available teachers retrieved', { schoolId, dayOfWeek, count: availableTeachers.length }, 'academic');
    return availableTeachers;
  }
}
