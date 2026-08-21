import type {
  AcademicYear, Term, Level, Section, Stream, Department, Subject, SchoolClass, Room,
  TeacherAssignment, TimetableSlot, ScheduleConflict, AcademicEvent,
  AcademicStatistics, AcademicSearch, AcademicDashboard,
  CreateClassRequest, UpdateClassRequest, CreateSubjectRequest, UpdateSubjectRequest,
  CreateDepartmentRequest, UpdateDepartmentRequest, CreateLevelRequest, UpdateLevelRequest,
  CreateSectionRequest, UpdateSectionRequest, CreateStreamRequest, UpdateStreamRequest,
  CreateRoomRequest, UpdateRoomRequest, CreateAssignmentRequest, CreateScheduleSlotRequest,
  CreateEventRequest, AcademicFilters, ScheduleGeneratorInput, ScheduleGeneratorResult,
  AcademicYearStatus, TermStatus, ClassStatus, RoomType, RoomStatus, AssignmentStatus,
  ScheduleStatus, ConflictType, DayOfWeek,
} from '@educi/types';

export type {
  AcademicYear, Term, Level, Section, Stream, Department, Subject, SchoolClass, Room,
  TeacherAssignment, TimetableSlot, ScheduleConflict, AcademicEvent,
  AcademicStatistics, AcademicSearch, AcademicDashboard,
  CreateClassRequest, UpdateClassRequest, CreateSubjectRequest, UpdateSubjectRequest,
  CreateDepartmentRequest, UpdateDepartmentRequest, CreateLevelRequest, UpdateLevelRequest,
  CreateSectionRequest, UpdateSectionRequest, CreateStreamRequest, UpdateStreamRequest,
  CreateRoomRequest, UpdateRoomRequest, CreateAssignmentRequest, CreateScheduleSlotRequest,
  CreateEventRequest, AcademicFilters, ScheduleGeneratorInput, ScheduleGeneratorResult,
  AcademicYearStatus, TermStatus, ClassStatus, RoomType, RoomStatus, AssignmentStatus,
  ScheduleStatus, ConflictType, DayOfWeek,
};

export interface AcademicRepository {
  // Academic Years
  findAcademicYear(id: string): Promise<AcademicYear | null>;
  findAllAcademicYears(schoolId: string): Promise<AcademicYear[]>;
  createAcademicYear(data: Omit<AcademicYear, 'id' | 'createdAt' | 'updatedAt'>): Promise<AcademicYear>;
  updateAcademicYear(id: string, data: Partial<AcademicYear>): Promise<AcademicYear>;
  // Terms
  findTerms(academicYearId: string): Promise<Term[]>;
  // Classes
  findClass(id: string): Promise<SchoolClass | null>;
  findAllClasses(schoolId: string, filters: AcademicFilters): Promise<{ data: SchoolClass[]; total: number }>;
  createClass(data: CreateClassRequest, schoolId: string): Promise<SchoolClass>;
  updateClass(id: string, data: UpdateClassRequest): Promise<SchoolClass>;
  archiveClass(id: string): Promise<void>;
  restoreClass(id: string): Promise<void>;
  deleteClass(id: string): Promise<void>;
  countActiveStudentsByClassId(schoolId: string, classId: string): Promise<number>;
  // Subjects
  findSubject(id: string): Promise<Subject | null>;
  findAllSubjects(schoolId: string, filters: AcademicFilters): Promise<{ data: Subject[]; total: number }>;
  createSubject(data: CreateSubjectRequest, schoolId: string): Promise<Subject>;
  updateSubject(id: string, data: UpdateSubjectRequest): Promise<Subject>;
  archiveSubject(id: string): Promise<void>;
  restoreSubject(id: string): Promise<void>;
  deleteSubject(id: string): Promise<void>;
  // Departments
  findDepartment(id: string): Promise<Department | null>;
  findAllDepartments(schoolId: string): Promise<Department[]>;
  createDepartment(data: CreateDepartmentRequest, schoolId: string): Promise<Department>;
  updateDepartment(id: string, data: UpdateDepartmentRequest): Promise<Department>;
  deleteDepartment(id: string): Promise<void>;
  // Levels
  findLevel(id: string): Promise<Level | null>;
  findAllLevels(schoolId: string): Promise<Level[]>;
  createLevel(data: CreateLevelRequest, schoolId: string): Promise<Level>;
  updateLevel(id: string, data: UpdateLevelRequest): Promise<Level>;
  deleteLevel(id: string): Promise<void>;
  // Sections
  findSection(id: string): Promise<Section | null>;
  findAllSections(schoolId: string): Promise<Section[]>;
  createSection(data: CreateSectionRequest, schoolId: string): Promise<Section>;
  updateSection(id: string, data: UpdateSectionRequest): Promise<Section>;
  deleteSection(id: string): Promise<void>;
  // Streams
  findStream(id: string): Promise<Stream | null>;
  findAllStreams(schoolId: string): Promise<Stream[]>;
  createStream(data: CreateStreamRequest, schoolId: string): Promise<Stream>;
  updateStream(id: string, data: UpdateStreamRequest): Promise<Stream>;
  deleteStream(id: string): Promise<void>;
  // Rooms
  findRoom(id: string): Promise<Room | null>;
  findAllRooms(schoolId: string, filters: AcademicFilters): Promise<{ data: Room[]; total: number }>;
  createRoom(data: CreateRoomRequest, schoolId: string): Promise<Room>;
  updateRoom(id: string, data: UpdateRoomRequest): Promise<Room>;
  archiveRoom(id: string): Promise<void>;
  restoreRoom(id: string): Promise<void>;
  deleteRoom(id: string): Promise<void>;
  // Assignments
  findAssignment(id: string): Promise<TeacherAssignment | null>;
  findAllAssignments(schoolId: string, filters: AcademicFilters): Promise<{ data: TeacherAssignment[]; total: number }>;
  createAssignment(data: CreateAssignmentRequest, schoolId: string): Promise<TeacherAssignment>;
  deleteAssignment(id: string): Promise<void>;
  // Timetable
  findTimetableSlot(id: string): Promise<TimetableSlot | null>;
  findTimetableSlots(schoolId: string, filters: AcademicFilters): Promise<TimetableSlot[]>;
  createTimetableSlot(data: CreateScheduleSlotRequest, schoolId: string): Promise<TimetableSlot>;
  deleteTimetableSlot(id: string): Promise<void>;
  // Conflicts
  findConflicts(schoolId: string, academicYearId: string): Promise<ScheduleConflict[]>;
  createConflict(data: Omit<ScheduleConflict, 'id' | 'createdAt'>): Promise<ScheduleConflict>;
  resolveConflict(id: string, resolvedBy: string): Promise<void>;
  // Calendar
  findEvents(schoolId: string, academicYearId: string): Promise<AcademicEvent[]>;
  createEvent(data: CreateEventRequest, schoolId: string): Promise<AcademicEvent>;
  deleteEvent(id: string): Promise<void>;
  // Statistics
  getStatistics(schoolId: string, academicYearId: string): Promise<AcademicStatistics>;
  getDashboard(schoolId: string): Promise<AcademicDashboard>;
  // Search
  search(schoolId: string, query: string, types?: string[], limit?: number): Promise<Array<{ id: string; name: string; type: string }>>;
}
