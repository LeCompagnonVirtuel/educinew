import type {
  AcademicRepository, AcademicStatistics, AcademicDashboard, AcademicFilters,
} from '../types';
import { AppError, NotFoundError } from '@educi/errors';
import { logger } from '@educi/logger';
import { ACADEMIC_EXPORT } from '@educi/config';

interface ClassStatistics {
  total: number;
  byLevel: Array<{ levelId: string; count: number }>;
  bySection: Array<{ sectionId: string; count: number }>;
}

interface SubjectStatistics {
  total: number;
  byDepartment: Array<{ departmentId: string; count: number }>;
  avgCoefficient: number;
}

interface TeacherWorkload {
  teacherId: string;
  firstName: string;
  lastName: string;
  totalHoursPerWeek: number;
  assignmentCount: number;
}

interface RoomUtilization {
  roomId: string;
  name: string;
  roomType: string;
  capacity: number;
  slotCount: number;
  utilizationRate: number;
}

export class StatisticsService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Returns full academic statistics for a school and academic year.
   */
  async getOverview(schoolId: string, academicYearId: string): Promise<AcademicStatistics> {
    const academicYear = await this.academicRepo.findAcademicYear(academicYearId);
    if (!academicYear || academicYear.schoolId !== schoolId) {
      throw new NotFoundError('Année scolaire', academicYearId);
    }

    const stats = await this.academicRepo.getStatistics(schoolId, academicYearId);
    logger.info('Statistics overview retrieved', { schoolId, academicYearId }, 'academic');
    return stats;
  }

  /**
   * Returns a dashboard summary for the school.
   */
  async getDashboard(schoolId: string): Promise<AcademicDashboard> {
    const dashboard = await this.academicRepo.getDashboard(schoolId);
    logger.info('Dashboard retrieved', { schoolId }, 'academic');
    return dashboard;
  }

  /**
   * Returns class statistics broken down by level and section.
   */
  async getClassStatistics(schoolId: string, academicYearId: string): Promise<ClassStatistics> {
    const { data: classes } = await this.academicRepo.findAllClasses(schoolId, {
      academicYearId,
      limit: 10000,
    });

    const byLevelMap = new Map<string, { levelId: string; count: number }>();
    const bySectionMap = new Map<string, { sectionId: string; count: number }>();

    for (const cls of classes) {
      if (cls.level) {
        const existing = byLevelMap.get(cls.level.id);
        if (existing) {
          existing.count++;
        } else {
          byLevelMap.set(cls.level.id, { levelId: cls.level.id, count: 1 });
        }
      }
      if (cls.section) {
        const existing = bySectionMap.get(cls.section.id);
        if (existing) {
          existing.count++;
        } else {
          bySectionMap.set(cls.section.id, { sectionId: cls.section.id, count: 1 });
        }
      }
    }

    logger.info('Class statistics retrieved', { schoolId, total: classes.length }, 'academic');

    return {
      total: classes.length,
      byLevel: Array.from(byLevelMap.values()),
      bySection: Array.from(bySectionMap.values()),
    };
  }

  /**
   * Returns subject statistics broken down by department with average coefficient.
   */
  async getSubjectStatistics(schoolId: string, academicYearId: string): Promise<SubjectStatistics> {
    const { data: subjects } = await this.academicRepo.findAllSubjects(schoolId, { limit: 10000 });

    const byDepartmentMap = new Map<string, { departmentId: string; count: number }>();
    let totalCoefficient = 0;

    for (const subject of subjects) {
      const deptId = subject.departmentId || 'NONE';
      const existing = byDepartmentMap.get(deptId);
      if (existing) {
        existing.count++;
      } else {
        byDepartmentMap.set(deptId, { departmentId: deptId, count: 1 });
      }
      totalCoefficient += subject.coefficient || 1;
    }

    const avgCoefficient = subjects.length > 0
      ? Math.round((totalCoefficient / subjects.length) * 100) / 100
      : 0;

    logger.info('Subject statistics retrieved', { schoolId, total: subjects.length }, 'academic');

    return {
      total: subjects.length,
      byDepartment: Array.from(byDepartmentMap.values()),
      avgCoefficient,
    };
  }

  /**
   * Returns teacher workload with hours per week and assignment count.
   */
  async getTeacherWorkload(schoolId: string, academicYearId: string): Promise<TeacherWorkload[]> {
    const { data: assignments } = await this.academicRepo.findAllAssignments(schoolId, {
      academicYearId,
      limit: 10000,
    });

    const workloadMap = new Map<string, TeacherWorkload>();

    for (const assignment of assignments) {
      if (assignment.status !== 'ACTIVE') continue;

      const existing = workloadMap.get(assignment.teacherId);
      if (existing) {
        existing.totalHoursPerWeek += assignment.hoursPerWeek || 0;
        existing.assignmentCount++;
      } else {
        const teacher = assignment.teacher;
        workloadMap.set(assignment.teacherId, {
          teacherId: assignment.teacherId,
          firstName: teacher?.firstName || '',
          lastName: teacher?.lastName || '',
          totalHoursPerWeek: assignment.hoursPerWeek || 0,
          assignmentCount: 1,
        });
      }
    }

    const workload = Array.from(workloadMap.values());
    workload.sort((a, b) => b.totalHoursPerWeek - a.totalHoursPerWeek);

    logger.info('Teacher workload retrieved', { schoolId, count: workload.length }, 'academic');
    return workload;
  }

  /**
   * Returns room utilization rates based on timetable slots.
   */
  async getRoomUtilization(schoolId: string, academicYearId: string): Promise<RoomUtilization[]> {
    const [roomsResult, slots] = await Promise.all([
      this.academicRepo.findAllRooms(schoolId, { limit: 1000 }),
      this.academicRepo.findTimetableSlots(schoolId, { academicYearId }),
    ]);

    const rooms = roomsResult.data;
    const utilization: RoomUtilization[] = [];

    const maxSlotsPerWeek = 5 * 8;

    for (const room of rooms) {
      const roomSlots = slots.filter((s) => s.roomId === room.id);
      const slotCount = roomSlots.length;
      const utilizationRate = maxSlotsPerWeek > 0
        ? Math.round((slotCount / maxSlotsPerWeek) * 100)
        : 0;

      utilization.push({
        roomId: room.id,
        name: room.name,
        roomType: room.roomType,
        capacity: room.capacity,
        slotCount,
        utilizationRate,
      });
    }

    utilization.sort((a, b) => b.utilizationRate - a.utilizationRate);

    logger.info('Room utilization retrieved', { schoolId, count: utilization.length }, 'academic');
    return utilization;
  }

  /**
   * Exports statistics in the specified format.
   */
  async exportStatistics(
    schoolId: string,
    academicYearId: string,
    format: string,
  ): Promise<{ data: string | object; filename: string; mimeType: string }> {
    if (!ACADEMIC_EXPORT.FORMATS.includes(format)) {
      throw new AppError(
        `Format non supporté: ${format}`,
        'STATISTICS_EXPORT_FORMAT_INVALID',
        400,
      );
    }

    const [stats, classes, subjects, workload, roomUtil] = await Promise.all([
      this.getOverview(schoolId, academicYearId),
      this.getClassStatistics(schoolId, academicYearId),
      this.getSubjectStatistics(schoolId, academicYearId),
      this.getTeacherWorkload(schoolId, academicYearId),
      this.getRoomUtilization(schoolId, academicYearId),
    ]);

    const exportData = {
      overview: stats,
      classes,
      subjects,
      teacherWorkload: workload,
      roomUtilization: roomUtil,
      exportedAt: new Date().toISOString(),
    };

    const timestamp = new Date().toISOString().split('T')[0];

    switch (format) {
      case 'JSON': {
        return {
          data: exportData,
          filename: `statistiques_${timestamp}.json`,
          mimeType: 'application/json',
        };
      }
      case 'CSV': {
        const lines = [
          'Type,Labelle,Valeur',
          `Total Classes,${classes.total}`,
          `Total Matières,${subjects.total}`,
          `Coefficient Moyen,${subjects.avgCoefficient}`,
          ...workload.map((w) => `Charge Enseignant,${w.firstName} ${w.lastName},${w.totalHoursPerWeek}h`),
          ...roomUtil.map((r) => `Utilisation Salle,${r.name},${r.utilizationRate}%`),
        ];

        return {
          data: lines.join('\n'),
          filename: `statistiques_${timestamp}.csv`,
          mimeType: 'text/csv',
        };
      }
      case 'PDF': {
        return {
          data: exportData,
          filename: `statistiques_${timestamp}.pdf`,
          mimeType: 'application/pdf',
        };
      }
      case 'EXCEL': {
        return {
          data: exportData,
          filename: `statistiques_${timestamp}.xlsx`,
          mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
      }
      default: {
        throw new AppError(
          `Format non supporté: ${format}`,
          'STATISTICS_EXPORT_FORMAT_INVALID',
          400,
        );
      }
    }
  }
}
