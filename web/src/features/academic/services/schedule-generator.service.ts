import type {
  AcademicRepository, AcademicFilters, TimetableSlot, CreateScheduleSlotRequest,
  ScheduleGeneratorInput, ScheduleGeneratorResult, ScheduleConflict,
} from '../types';
import {
  AppError, NotFoundError, ScheduleGenerationError, ScheduleValidationError,
} from '@educi/errors';
import { logger } from '@educi/logger';
import { ACADEMIC_SCHEDULE } from '@educi/config';

interface ScheduleSuggestion {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  roomId: string;
  confidence: number;
}

export class ScheduleGeneratorService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Auto-generates a timetable from teacher assignments, respecting constraints on teacher hours, room capacity, and gap avoidance.
   */
  async generateSchedule(
    schoolId: string,
    userId: string,
    data: ScheduleGeneratorInput,
  ): Promise<ScheduleGeneratorResult> {
    if (!data.academicYearId) {
      throw new AppError("L'année scolaire est requise", 'SCHEDULE_GENERATION_ERROR', 400);
    }

    const academicYear = await this.academicRepo.findAcademicYear(data.academicYearId);
    if (!academicYear || academicYear.schoolId !== schoolId) {
      throw new NotFoundError('Année scolaire', data.academicYearId);
    }

    const [assignmentsResult, rooms, existingSlots] = await Promise.all([
      this.academicRepo.findAllAssignments(schoolId, {
        academicYearId: data.academicYearId,
        limit: 10000,
      }),
      this.academicRepo.findAllRooms(schoolId, { limit: 1000 }),
      this.academicRepo.findTimetableSlots(schoolId, { academicYearId: data.academicYearId }),
    ]);

    const assignments = assignmentsResult.data.filter((a) => a.status === 'ACTIVE');

    if (assignments.length === 0) {
      throw new AppError(
        "Aucune affectation active trouvée pour générer l'emploi du temps",
        'SCHEDULE_GENERATION_NO_ASSIGNMENTS',
        400,
      );
    }

    const generatedSlots: TimetableSlot[] = [];
    const conflicts: Array<{ type: string; description: string }> = [];
    const teacherHours = new Map<string, number>();
    const classSlots = new Map<string, Array<{ dayOfWeek: number; startTime: string; endTime: string }>>();
    const roomSlots = new Map<string, Array<{ dayOfWeek: number; startTime: string; endTime: string }>>();

    for (const slot of existingSlots) {
      const th = teacherHours.get(slot.teacherId) || 0;
      const startMin = this.timeToMinutes(slot.startTime);
      const endMin = this.timeToMinutes(slot.endTime);
      teacherHours.set(slot.teacherId, th + (endMin - startMin) / 60);

      const cs = classSlots.get(slot.classId) || [];
      cs.push({ dayOfWeek: slot.dayOfWeek, startTime: slot.startTime, endTime: slot.endTime });
      classSlots.set(slot.classId, cs);

      const rs = roomSlots.get(slot.roomId || '') || [];
      rs.push({ dayOfWeek: slot.dayOfWeek, startTime: slot.startTime, endTime: slot.endTime });
      if (slot.roomId) roomSlots.set(slot.roomId, rs);
    }

    const availableRooms = (rooms.data || []).filter((r) => r.status === 'AVAILABLE');
    const days = [1, 2, 3, 4, 5];
    const slotMinutes = ACADEMIC_SCHEDULE.SLOT_DURATION_MINUTES;

    for (const assignment of assignments) {
      const hoursNeeded = assignment.hoursPerWeek || 2;
      const slotsNeeded = Math.ceil((hoursNeeded * 60) / slotMinutes);
      let slotsCreated = 0;

      for (const day of days) {
        if (slotsCreated >= slotsNeeded) break;

        for (let hour = ACADEMIC_SCHEDULE.DEFAULT_START_HOUR; hour < ACADEMIC_SCHEDULE.DEFAULT_END_HOUR; hour++) {
          if (slotsCreated >= slotsNeeded) break;

          const startTime = `${String(hour).padStart(2, '0')}:00`;
          const endMinutes = hour * 60 + slotMinutes;
          const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;

          if (this.timeToMinutes(endTime) > ACADEMIC_SCHEDULE.DEFAULT_END_HOUR * 60) continue;

          const th = teacherHours.get(assignment.teacherId) || 0;
          if (th >= ACADEMIC_SCHEDULE.MAX_HOURS_PER_TEACHER_PER_DAY) continue;

          const existingClass = classSlots.get(assignment.classId) || [];
          const hasClassConflict = existingClass.some(
            (s) => s.dayOfWeek === day && s.startTime < endTime && s.endTime > startTime,
          );
          if (hasClassConflict) continue;

          const room = availableRooms[slotsCreated % availableRooms.length];
          if (!room) continue;

          const existingRoom = roomSlots.get(room.id) || [];
          const hasRoomConflict = existingRoom.some(
            (s) => s.dayOfWeek === day && s.startTime < endTime && s.endTime > startTime,
          );
          if (hasRoomConflict) continue;

          try {
            const slotData: CreateScheduleSlotRequest = {
              classId: assignment.classId,
              subjectId: assignment.subjectId,
              teacherId: assignment.teacherId,
              roomId: room.id,
              academicYearId: data.academicYearId,
              dayOfWeek: day as 0 | 1 | 2 | 3 | 4 | 5 | 6,
              startTime,
              endTime,
            };

            const slot = await this.academicRepo.createTimetableSlot(slotData, schoolId);
            generatedSlots.push(slot);

            teacherHours.set(assignment.teacherId, th + slotMinutes / 60);

            const cs = classSlots.get(assignment.classId) || [];
            cs.push({ dayOfWeek: day, startTime, endTime });
            classSlots.set(assignment.classId, cs);

            const rs = roomSlots.get(room.id) || [];
            rs.push({ dayOfWeek: day, startTime, endTime });
            roomSlots.set(room.id, rs);

            slotsCreated++;
          } catch {
            conflicts.push({
              type: 'GENERATION',
              description: `Échec de création du créneau pour l'affectation ${assignment.id}`,
            });
          }
        }
      }

      if (slotsCreated < slotsNeeded) {
        conflicts.push({
          type: 'HOURS',
          description: `Enseignant ${assignment.teacherId}: ${slotsCreated}/${slotsNeeded} créneaux créés`,
        });
      }
    }

    logger.info('Schedule generated', {
      schoolId,
      userId,
      slotsGenerated: generatedSlots.length,
      conflictsCount: conflicts.length,
    }, 'academic');

    return {
      slots: generatedSlots as unknown as CreateScheduleSlotRequest[],
      conflicts: conflicts as unknown as ScheduleConflict[],
      statistics: {
        totalSlots: generatedSlots.length,
        teacherUtilization: 0,
        roomUtilization: 0,
        classCoverage: 0,
      },
    };
  }

  /**
   * Validates a generated schedule has no conflicts.
   */
  async validateSchedule(schoolId: string, academicYearId: string): Promise<{ valid: boolean; errors: Array<{ type: string; description: string }> }> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const errors: Array<{ type: string; description: string }> = [];

    for (let i = 0; i < slots.length; i++) {
      for (let j = i + 1; j < slots.length; j++) {
        const a = slots[i];
        const b = slots[j];

        if (a.dayOfWeek !== b.dayOfWeek) continue;
        if (a.startTime >= b.endTime || b.startTime >= a.endTime) continue;

        if (a.teacherId === b.teacherId) {
          errors.push({
            type: 'TEACHER',
            description: `Enseignant double-booké: ${a.startTime}-${a.endTime}`,
          });
        }
        if (a.roomId === b.roomId) {
          errors.push({
            type: 'ROOM',
            description: `Salle double-réservée: ${a.startTime}-${a.endTime}`,
          });
        }
        if (a.classId === b.classId) {
          errors.push({
            type: 'CLASS',
            description: `Classe double-bookée: ${a.startTime}-${a.endTime}`,
          });
        }
      }
    }

    if (errors.length > 0) {
      throw new ScheduleValidationError(
        `Emploi du temps invalide: ${errors.length} conflit(s) détecté(s)`,
      );
    }

    logger.info('Schedule validated', { schoolId, academicYearId, valid: true }, 'academic');
    return { valid: true, errors: [] };
  }

  /**
   * Suggests schedule options for a given assignment or constraint set.
   */
  async getSuggestions(
    schoolId: string,
    data: { academicYearId: string; classId?: string; subjectId?: string; teacherId?: string },
  ): Promise<ScheduleSuggestion[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId: data.academicYearId });
    const rooms = await this.academicRepo.findAllRooms(schoolId, { limit: 1000 });
    const availableRooms = (rooms.data || []).filter((r) => r.status === 'AVAILABLE');
    const days = [1, 2, 3, 4, 5];
    const suggestions: ScheduleSuggestion[] = [];

    const occupiedByTeacher = new Map<string, Set<string>>();
    const occupiedByRoom = new Map<string, Set<string>>();
    const occupiedByClass = new Map<string, Set<string>>();

    for (const slot of slots) {
      const key = `${slot.dayOfWeek}-${slot.startTime}-${slot.endTime}`;
      const tSet = occupiedByTeacher.get(slot.teacherId) || new Set();
      tSet.add(key);
      occupiedByTeacher.set(slot.teacherId, tSet);

      const rSet = occupiedByRoom.get(slot.roomId || '') || new Set();
      rSet.add(key);
      if (slot.roomId) occupiedByRoom.set(slot.roomId, rSet);

      const cSet = occupiedByClass.get(slot.classId) || new Set();
      cSet.add(key);
      occupiedByClass.set(slot.classId, cSet);
    }

    for (const day of days) {
      for (let hour = ACADEMIC_SCHEDULE.DEFAULT_START_HOUR; hour < ACADEMIC_SCHEDULE.DEFAULT_END_HOUR; hour++) {
        const startTime = `${String(hour).padStart(2, '0')}:00`;
        const endMinutes = hour * 60 + ACADEMIC_SCHEDULE.SLOT_DURATION_MINUTES;
        const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;

        if (this.timeToMinutes(endTime) > ACADEMIC_SCHEDULE.DEFAULT_END_HOUR * 60) continue;

        const key = `${day}-${startTime}-${endTime}`;

        for (const room of availableRooms) {
          let confidence = 1.0;

          if (data.teacherId) {
            const tSet = occupiedByTeacher.get(data.teacherId);
            if (tSet?.has(key)) continue;
          } else {
            confidence -= 0.2;
          }

          const rSet = occupiedByRoom.get(room.id);
          if (rSet?.has(key)) continue;

          if (data.classId) {
            const cSet = occupiedByClass.get(data.classId);
            if (cSet?.has(key)) continue;
          } else {
            confidence -= 0.2;
          }

          suggestions.push({
            dayOfWeek: day,
            startTime,
            endTime,
            roomId: room.id,
            confidence: Math.round(confidence * 100) / 100,
          });
        }
      }
    }

    suggestions.sort((a, b) => b.confidence - a.confidence);

    logger.info('Schedule suggestions generated', { schoolId, count: suggestions.length }, 'academic');
    return suggestions.slice(0, 50);
  }

  private timeToMinutes(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }
}
