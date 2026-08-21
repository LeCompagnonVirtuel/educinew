import { describe, it, expect } from 'vitest';
import {
  CreateAcademicYearSchema,
  CreateTermSchema,
  CreateLevelSchema,
  UpdateLevelSchema,
  CreateSectionSchema,
  UpdateSectionSchema,
  CreateStreamSchema,
  UpdateStreamSchema,
  CreateDepartmentSchema,
  UpdateDepartmentSchema,
  CreateSubjectSchema,
  UpdateSubjectSchema,
  CreateRoomSchema,
  UpdateRoomSchema,
  CreateClassSchema,
  UpdateClassSchema,
  CreateAssignmentSchema,
  CreateScheduleSlotSchema,
  CreateEventSchema,
  AcademicFiltersSchema,
  AcademicSearchSchema,
  ScheduleGeneratorSchema,
  ExportAcademicSchema,
} from '@/features/academic/validators';

describe('Academic Validators', () => {
  describe('CreateAcademicYearSchema', () => {
    it('should validate correct academic year data', () => {
      const result = CreateAcademicYearSchema.safeParse({
        name: '2024-2025',
        startDate: '2024-09-01',
        endDate: '2025-06-30',
        termsCount: 3,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty name', () => {
      const result = CreateAcademicYearSchema.safeParse({
        name: '',
        startDate: '2024-09-01',
        endDate: '2025-06-30',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty startDate', () => {
      const result = CreateAcademicYearSchema.safeParse({
        name: '2024-2025',
        startDate: '',
        endDate: '2025-06-30',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty endDate', () => {
      const result = CreateAcademicYearSchema.safeParse({
        name: '2024-2025',
        startDate: '2024-09-01',
        endDate: '',
      });
      expect(result.success).toBe(false);
    });

    it('should default termsCount to 3', () => {
      const result = CreateAcademicYearSchema.safeParse({
        name: '2024-2025',
        startDate: '2024-09-01',
        endDate: '2025-06-30',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.termsCount).toBe(3);
    });

    it('should reject termsCount > 4', () => {
      const result = CreateAcademicYearSchema.safeParse({
        name: '2024-2025',
        startDate: '2024-09-01',
        endDate: '2025-06-30',
        termsCount: 5,
      });
      expect(result.success).toBe(false);
    });

    it('should reject termsCount < 1', () => {
      const result = CreateAcademicYearSchema.safeParse({
        name: '2024-2025',
        startDate: '2024-09-01',
        endDate: '2025-06-30',
        termsCount: 0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateTermSchema', () => {
    it('should validate correct term data', () => {
      const result = CreateTermSchema.safeParse({
        academicYearId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Trimestre 1',
        order: 1,
        startDate: '2024-09-01',
        endDate: '2024-12-20',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID', () => {
      const result = CreateTermSchema.safeParse({
        academicYearId: 'invalid',
        name: 'Trimestre 1',
        order: 1,
        startDate: '2024-09-01',
        endDate: '2024-12-20',
      });
      expect(result.success).toBe(false);
    });

    it('should reject order < 1', () => {
      const result = CreateTermSchema.safeParse({
        academicYearId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Trimestre 1',
        order: 0,
        startDate: '2024-09-01',
        endDate: '2024-12-20',
      });
      expect(result.success).toBe(false);
    });

    it('should reject order > 4', () => {
      const result = CreateTermSchema.safeParse({
        academicYearId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Trimestre 1',
        order: 5,
        startDate: '2024-09-01',
        endDate: '2024-12-20',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateLevelSchema', () => {
    it('should validate correct level data', () => {
      const result = CreateLevelSchema.safeParse({
        name: 'Sixième',
        code: '6EME',
        order: 1,
        educationCycle: 'COLLEGE',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all education cycles', () => {
      for (const cycle of ['MATERNELLE', 'PRIMAIRE', 'COLLEGE', 'LYCEE', 'SUPERIEUR']) {
        const result = CreateLevelSchema.safeParse({
          name: 'Level',
          code: 'L1',
          order: 1,
          educationCycle: cycle,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid education cycle', () => {
      const result = CreateLevelSchema.safeParse({
        name: 'Level',
        code: 'L1',
        order: 1,
        educationCycle: 'INVALID',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty name', () => {
      const result = CreateLevelSchema.safeParse({
        name: '',
        code: 'L1',
        order: 1,
        educationCycle: 'COLLEGE',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty code', () => {
      const result = CreateLevelSchema.safeParse({
        name: 'Level',
        code: '',
        order: 1,
        educationCycle: 'COLLEGE',
      });
      expect(result.success).toBe(false);
    });

    it('should accept optional sections array', () => {
      const result = CreateLevelSchema.safeParse({
        name: 'Level',
        code: 'L1',
        order: 1,
        educationCycle: 'COLLEGE',
        sections: ['A', 'B'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('UpdateLevelSchema', () => {
    it('should validate partial update', () => {
      const result = UpdateLevelSchema.safeParse({ name: 'Updated Level' });
      expect(result.success).toBe(true);
    });

    it('should accept empty update', () => {
      const result = UpdateLevelSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe('CreateSectionSchema', () => {
    it('should validate correct section data', () => {
      const result = CreateSectionSchema.safeParse({
        name: 'Section A',
        code: 'SEC-A',
      });
      expect(result.success).toBe(true);
    });

    it('should accept optional levelId', () => {
      const result = CreateSectionSchema.safeParse({
        name: 'Section A',
        code: 'SEC-A',
        levelId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('CreateStreamSchema', () => {
    it('should validate correct stream data', () => {
      const result = CreateStreamSchema.safeParse({
        name: 'Scientifique',
        code: 'SCI',
      });
      expect(result.success).toBe(true);
    });

    it('should accept optional description', () => {
      const result = CreateStreamSchema.safeParse({
        name: 'Scientifique',
        code: 'SCI',
        description: 'Filière scientifique',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('CreateDepartmentSchema', () => {
    it('should validate correct department data', () => {
      const result = CreateDepartmentSchema.safeParse({
        name: 'Mathématiques',
        code: 'MATH',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('CreateSubjectSchema', () => {
    it('should validate correct subject data', () => {
      const result = CreateSubjectSchema.safeParse({
        name: 'Mathématiques',
        code: 'MATH',
        coefficient: 3,
        maxHoursPerWeek: 5,
        levels: ['level1'],
      });
      expect(result.success).toBe(true);
    });

    it('should default coefficient to 1', () => {
      const result = CreateSubjectSchema.safeParse({
        name: 'Math',
        code: 'MATH',
        levels: ['level1'],
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.coefficient).toBe(1);
    });

    it('should reject coefficient > 10', () => {
      const result = CreateSubjectSchema.safeParse({
        name: 'Math',
        code: 'MATH',
        coefficient: 11,
        levels: ['level1'],
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty levels array', () => {
      const result = CreateSubjectSchema.safeParse({
        name: 'Math',
        code: 'MATH',
        levels: [],
      });
      expect(result.success).toBe(false);
    });

    it('should require at least one level', () => {
      const result = CreateSubjectSchema.safeParse({
        name: 'Math',
        code: 'MATH',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateRoomSchema', () => {
    it('should validate correct room data', () => {
      const result = CreateRoomSchema.safeParse({
        name: 'Salle 101',
        code: 'S101',
        capacity: 40,
        roomType: 'NORMAL',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all room types', () => {
      for (const type of ['NORMAL', 'LABORATORY', 'COMPUTER', 'AMPHITHEATER', 'WORKSHOP', 'LIBRARY']) {
        const result = CreateRoomSchema.safeParse({
          name: 'Room',
          code: 'R1',
          capacity: 30,
          roomType: type,
        });
        expect(result.success).toBe(true);
      }
    });

    it('should reject capacity > 500', () => {
      const result = CreateRoomSchema.safeParse({
        name: 'Room',
        code: 'R1',
        capacity: 501,
        roomType: 'NORMAL',
      });
      expect(result.success).toBe(false);
    });

    it('should default hasWhiteboard to true', () => {
      const result = CreateRoomSchema.safeParse({
        name: 'Room',
        code: 'R1',
        capacity: 30,
        roomType: 'NORMAL',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.hasWhiteboard).toBe(true);
    });
  });

  describe('CreateClassSchema', () => {
    it('should validate correct class data', () => {
      const result = CreateClassSchema.safeParse({
        name: '6ème A',
        levelId: '550e8400-e29b-41d4-a716-446655440000',
        academicYearId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
    });

    it('should default capacity to 40', () => {
      const result = CreateClassSchema.safeParse({
        name: '6ème A',
        levelId: '550e8400-e29b-41d4-a716-446655440000',
        academicYearId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.capacity).toBe(40);
    });

    it('should reject invalid levelId', () => {
      const result = CreateClassSchema.safeParse({
        name: '6ème A',
        levelId: 'invalid',
        academicYearId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateAssignmentSchema', () => {
    it('should validate correct assignment data', () => {
      const result = CreateAssignmentSchema.safeParse({
        teacherId: '550e8400-e29b-41d4-a716-446655440000',
        classId: '550e8400-e29b-41d4-a716-446655440001',
        subjectId: '550e8400-e29b-41d4-a716-446655440002',
        academicYearId: '550e8400-e29b-41d4-a716-446655440003',
        hoursPerWeek: 5,
        startDate: '2024-09-01',
      });
      expect(result.success).toBe(true);
    });

    it('should reject hoursPerWeek > 30', () => {
      const result = CreateAssignmentSchema.safeParse({
        teacherId: '550e8400-e29b-41d4-a716-446655440000',
        classId: '550e8400-e29b-41d4-a716-446655440001',
        subjectId: '550e8400-e29b-41d4-a716-446655440002',
        academicYearId: '550e8400-e29b-41d4-a716-446655440003',
        hoursPerWeek: 31,
        startDate: '2024-09-01',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateScheduleSlotSchema', () => {
    it('should validate correct schedule slot data', () => {
      const result = CreateScheduleSlotSchema.safeParse({
        classId: '550e8400-e29b-41d4-a716-446655440000',
        subjectId: '550e8400-e29b-41d4-a716-446655440001',
        teacherId: '550e8400-e29b-41d4-a716-446655440002',
        academicYearId: '550e8400-e29b-41d4-a716-446655440003',
        dayOfWeek: 1,
        startTime: '08:00',
        endTime: '09:00',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid time format', () => {
      const result = CreateScheduleSlotSchema.safeParse({
        classId: '550e8400-e29b-41d4-a716-446655440000',
        subjectId: '550e8400-e29b-41d4-a716-446655440001',
        teacherId: '550e8400-e29b-41d4-a716-446655440002',
        academicYearId: '550e8400-e29b-41d4-a716-446655440003',
        dayOfWeek: 1,
        startTime: '8:00',
        endTime: '9:00',
      });
      expect(result.success).toBe(false);
    });

    it('should reject dayOfWeek > 6', () => {
      const result = CreateScheduleSlotSchema.safeParse({
        classId: '550e8400-e29b-41d4-a716-446655440000',
        subjectId: '550e8400-e29b-41d4-a716-446655440001',
        teacherId: '550e8400-e29b-41d4-a716-446655440002',
        academicYearId: '550e8400-e29b-41d4-a716-446655440003',
        dayOfWeek: 7,
        startTime: '08:00',
        endTime: '09:00',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateEventSchema', () => {
    it('should validate correct event data', () => {
      const result = CreateEventSchema.safeParse({
        title: 'Examen trimestriel',
        eventType: 'EXAM',
        startDate: '2024-12-10',
        endDate: '2024-12-15',
        academicYearId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all event types', () => {
      for (const type of ['TRIMESTER', 'SEMESTER', 'VACATION', 'EXAM', 'COUNCIL', 'HOLIDAY', 'MEETING', 'OTHER']) {
        const result = CreateEventSchema.safeParse({
          title: 'Event',
          eventType: type,
          startDate: '2024-12-10',
          endDate: '2024-12-15',
          academicYearId: '550e8400-e29b-41d4-a716-446655440000',
        });
        expect(result.success).toBe(true);
      }
    });

    it('should default isRecurring to false', () => {
      const result = CreateEventSchema.safeParse({
        title: 'Event',
        eventType: 'EXAM',
        startDate: '2024-12-10',
        endDate: '2024-12-15',
        academicYearId: '550e8400-e29b-41d4-a716-446655440000',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.isRecurring).toBe(false);
    });
  });

  describe('AcademicFiltersSchema', () => {
    it('should validate empty filters', () => {
      const result = AcademicFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should default page to 1', () => {
      const result = AcademicFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.page).toBe(1);
    });

    it('should default limit to 20', () => {
      const result = AcademicFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.limit).toBe(20);
    });

    it('should default sortBy to created_at', () => {
      const result = AcademicFiltersSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.sortBy).toBe('created_at');
    });

    it('should reject page < 1', () => {
      const result = AcademicFiltersSchema.safeParse({ page: 0 });
      expect(result.success).toBe(false);
    });

    it('should reject limit > 100', () => {
      const result = AcademicFiltersSchema.safeParse({ limit: 101 });
      expect(result.success).toBe(false);
    });
  });

  describe('AcademicSearchSchema', () => {
    it('should validate correct search data', () => {
      const result = AcademicSearchSchema.safeParse({ query: 'math' });
      expect(result.success).toBe(true);
    });

    it('should reject query < 2 chars', () => {
      const result = AcademicSearchSchema.safeParse({ query: 'a' });
      expect(result.success).toBe(false);
    });

    it('should accept optional types', () => {
      const result = AcademicSearchSchema.safeParse({
        query: 'math',
        types: ['CLASS', 'SUBJECT'],
      });
      expect(result.success).toBe(true);
    });
  });

  describe('ScheduleGeneratorSchema', () => {
    it('should validate correct generator data', () => {
      const result = ScheduleGeneratorSchema.safeParse({
        schoolId: '550e8400-e29b-41d4-a716-446655440000',
        academicYearId: '550e8400-e29b-41d4-a716-446655440001',
        classIds: ['550e8400-e29b-41d4-a716-446655440002'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty classIds', () => {
      const result = ScheduleGeneratorSchema.safeParse({
        schoolId: '550e8400-e29b-41d4-a716-446655440000',
        academicYearId: '550e8400-e29b-41d4-a716-446655440001',
        classIds: [],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ExportAcademicSchema', () => {
    it('should validate correct export data', () => {
      const result = ExportAcademicSchema.safeParse({
        format: 'CSV',
        type: 'CLASSES',
      });
      expect(result.success).toBe(true);
    });

    it('should accept all formats', () => {
      for (const format of ['PDF', 'EXCEL', 'CSV', 'JSON']) {
        const result = ExportAcademicSchema.safeParse({ format, type: 'CLASSES' });
        expect(result.success).toBe(true);
      }
    });

    it('should accept all types', () => {
      for (const type of ['CLASSES', 'SUBJECTS', 'ROOMS', 'ASSIGNMENTS', 'SCHEDULE', 'STATISTICS']) {
        const result = ExportAcademicSchema.safeParse({ format: 'CSV', type });
        expect(result.success).toBe(true);
      }
    });
  });
});
