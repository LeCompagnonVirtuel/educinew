import type {
  AcademicRepository, TimetableSlot, ScheduleConflict, ConflictType,
} from '../types';
import { NotFoundError, AppError, ScheduleConflictError } from '@educi/errors';
import { logger } from '@educi/logger';

interface ConflictStats {
  total: number;
  byType: Array<{ type: ConflictType; count: number }>;
  bySeverity: Array<{ severity: string; count: number }>;
  unresolved: number;
  resolved: number;
}

export class ConflictDetectionService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Detects all schedule conflicts across teacher double-booking, room double-booking, and class double-booking.
   */
  async detectConflicts(schoolId: string, academicYearId: string): Promise<ScheduleConflict[]> {
    const slots = await this.academicRepo.findTimetableSlots(schoolId, { academicYearId });
    const existingConflicts = await this.academicRepo.findConflicts(schoolId, academicYearId);
    const resolvedIds = new Set(existingConflicts.filter((c) => c.resolved).map((c) => `${c.slot1Id}-${c.slot2Id}`));

    const newConflicts: Array<Omit<ScheduleConflict, 'id' | 'createdAt'>> = [];

    for (let i = 0; i < slots.length; i++) {
      for (let j = i + 1; j < slots.length; j++) {
        const a = slots[i];
        const b = slots[j];

        if (a.dayOfWeek !== b.dayOfWeek) continue;
        if (a.startTime >= b.endTime || b.startTime >= a.endTime) continue;

        if (a.teacherId === b.teacherId) {
          const key = [a.id, b.id].sort().join('-');
          if (!resolvedIds.has(key)) {
            newConflicts.push({
              schoolId,
              academicYearId,
              conflictType: 'TEACHER',
              slot1Id: a.id,
              slot2Id: b.id,
              description: `Enseignant double-booké: ${a.startTime}-${a.endTime}`,
              severity: 'HIGH',
              resolved: false,
            });
          }
        }

        if (a.roomId === b.roomId) {
          const key = [a.id, b.id].sort().join('-');
          if (!resolvedIds.has(key)) {
            newConflicts.push({
              schoolId,
              academicYearId,
              conflictType: 'ROOM',
              slot1Id: a.id,
              slot2Id: b.id,
              description: `Salle double-réservée: ${a.startTime}-${a.endTime}`,
              severity: 'HIGH',
              resolved: false,
            });
          }
        }

        if (a.classId === b.classId) {
          const key = [a.id, b.id].sort().join('-');
          if (!resolvedIds.has(key)) {
            newConflicts.push({
              schoolId,
              academicYearId,
              conflictType: 'CLASS',
              slot1Id: a.id,
              slot2Id: b.id,
              description: `Classe double-bookée: ${a.startTime}-${a.endTime}`,
              severity: 'CRITICAL',
              resolved: false,
            });
          }
        }
      }
    }

    const created: ScheduleConflict[] = [];
    for (const conflict of newConflicts) {
      const c = await this.academicRepo.createConflict(conflict);
      created.push(c);
    }

    logger.info('Conflicts detected', { schoolId, academicYearId, count: created.length }, 'academic');
    return created;
  }

  /**
   * Checks if creating a new slot would create conflicts with existing slots.
   */
  async detectSlotConflicts(
    schoolId: string,
    slotData: { teacherId: string; roomId: string; classId: string; dayOfWeek: number; startTime: string; endTime: string; academicYearId: string },
  ): Promise<Array<{ type: string; description: string; severity: string }>> {
    const existingSlots = await this.academicRepo.findTimetableSlots(schoolId, {
      academicYearId: slotData.academicYearId,
    });

    const conflicts: Array<{ type: string; description: string; severity: string }> = [];

    for (const slot of existingSlots) {
      if (slot.dayOfWeek !== slotData.dayOfWeek) continue;
      if (slot.startTime >= slotData.endTime || slot.endTime <= slotData.startTime) continue;

      if (slot.teacherId === slotData.teacherId) {
        conflicts.push({
          type: 'TEACHER',
          description: `Conflit enseignant: cours existant ${slot.startTime}-${slot.endTime}`,
          severity: 'HIGH',
        });
      }
      if (slot.roomId === slotData.roomId) {
        conflicts.push({
          type: 'ROOM',
          description: `Conflit salle: cours existant ${slot.startTime}-${slot.endTime}`,
          severity: 'HIGH',
        });
      }
      if (slot.classId === slotData.classId) {
        conflicts.push({
          type: 'CLASS',
          description: `Conflit classe: cours existant ${slot.startTime}-${slot.endTime}`,
          severity: 'CRITICAL',
        });
      }
    }

    logger.info('Slot conflicts detected', { schoolId, count: conflicts.length }, 'academic');
    return conflicts;
  }

  /**
   * Resolves a conflict by marking it as resolved.
   */
  async resolveConflict(schoolId: string, userId: string, conflictId: string): Promise<void> {
    const allConflicts = await this.academicRepo.findConflicts(schoolId, '');
    const conflict = allConflicts.find((c) => c.id === conflictId);

    if (!conflict || conflict.schoolId !== schoolId) {
      throw new NotFoundError('Conflit', conflictId);
    }

    if (conflict.resolved) {
      throw new AppError('Ce conflit est déjà résolu', 'CONFLICT_ALREADY_RESOLVED', 400);
    }

    await this.academicRepo.resolveConflict(conflictId, userId);
    logger.info('Conflict resolved', { conflictId, schoolId, userId }, 'academic');
  }

  /**
   * Retrieves all unresolved conflicts for an academic year.
   */
  async getUnresolvedConflicts(schoolId: string, academicYearId: string): Promise<ScheduleConflict[]> {
    const conflicts = await this.academicRepo.findConflicts(schoolId, academicYearId);
    const unresolved = conflicts.filter((c) => !c.resolved);
    logger.info('Unresolved conflicts retrieved', { schoolId, count: unresolved.length }, 'academic');
    return unresolved;
  }

  /**
   * Returns conflict statistics including counts by type and severity.
   */
  async getConflictStats(schoolId: string, academicYearId: string): Promise<ConflictStats> {
    const conflicts = await this.academicRepo.findConflicts(schoolId, academicYearId);

    const byTypeMap = new Map<string, { type: ConflictType; count: number }>();
    const bySeverityMap = new Map<string, { severity: string; count: number }>();
    let unresolved = 0;

    for (const c of conflicts) {
      const typeEntry = byTypeMap.get(c.conflictType);
      if (typeEntry) {
        typeEntry.count++;
      } else {
        byTypeMap.set(c.conflictType, { type: c.conflictType, count: 1 });
      }

      const sevEntry = bySeverityMap.get(c.severity);
      if (sevEntry) {
        sevEntry.count++;
      } else {
        bySeverityMap.set(c.severity, { severity: c.severity, count: 1 });
      }

      if (!c.resolved) unresolved++;
    }

    logger.info('Conflict stats retrieved', { schoolId, total: conflicts.length }, 'academic');

    return {
      total: conflicts.length,
      byType: Array.from(byTypeMap.values()),
      bySeverity: Array.from(bySeverityMap.values()),
      unresolved,
      resolved: conflicts.length - unresolved,
    };
  }
}
