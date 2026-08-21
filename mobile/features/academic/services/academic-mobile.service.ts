import type {
  AcademicYear, Term, Level, Section, Stream, Department, Subject, SchoolClass, Room,
  TeacherAssignment, TimetableSlot,
  CreateClassRequest, UpdateClassRequest, CreateSubjectRequest, UpdateSubjectRequest,
  CreateDepartmentRequest, UpdateDepartmentRequest, CreateLevelRequest, UpdateLevelRequest,
  CreateSectionRequest, UpdateSectionRequest, CreateStreamRequest, UpdateStreamRequest,
  CreateRoomRequest, UpdateRoomRequest, CreateAssignmentRequest, CreateScheduleSlotRequest,
  AcademicFilters,
} from '@educi/types';
import { AcademicMobileRepository } from '../repositories/academic-mobile.repository';

export class AcademicMobileService {
  constructor(private readonly repo: AcademicMobileRepository) {}

  async getAcademicYear(id: string): Promise<AcademicYear | null> {
    return this.repo.findAcademicYear(id);
  }

  async getAcademicYears(schoolId: string): Promise<AcademicYear[]> {
    return this.repo.findAllAcademicYears(schoolId);
  }

  async getTerms(academicYearId: string): Promise<Term[]> {
    return this.repo.findTerms(academicYearId);
  }

  async getClass(id: string): Promise<SchoolClass | null> {
    return this.repo.findClass(id);
  }

  async getClasses(schoolId: string, filters: AcademicFilters): Promise<{ data: SchoolClass[]; total: number }> {
    return this.repo.findAllClasses(schoolId, filters);
  }

  async createClass(data: CreateClassRequest, schoolId: string): Promise<SchoolClass> {
    return this.repo.createClass(data, schoolId);
  }

  async updateClass(id: string, data: UpdateClassRequest): Promise<SchoolClass> {
    return this.repo.updateClass(id, data);
  }

  async archiveClass(id: string): Promise<void> {
    return this.repo.archiveClass(id);
  }

  async restoreClass(id: string): Promise<void> {
    return this.repo.restoreClass(id);
  }

  async deleteClass(id: string): Promise<void> {
    return this.repo.deleteClass(id);
  }

  async getSubject(id: string): Promise<Subject | null> {
    return this.repo.findSubject(id);
  }

  async getSubjects(schoolId: string, filters: AcademicFilters): Promise<{ data: Subject[]; total: number }> {
    return this.repo.findAllSubjects(schoolId, filters);
  }

  async createSubject(data: CreateSubjectRequest, schoolId: string): Promise<Subject> {
    return this.repo.createSubject(data, schoolId);
  }

  async updateSubject(id: string, data: UpdateSubjectRequest): Promise<Subject> {
    return this.repo.updateSubject(id, data);
  }

  async archiveSubject(id: string): Promise<void> {
    return this.repo.archiveSubject(id);
  }

  async restoreSubject(id: string): Promise<void> {
    return this.repo.restoreSubject(id);
  }

  async deleteSubject(id: string): Promise<void> {
    return this.repo.deleteSubject(id);
  }

  async getRoom(id: string): Promise<Room | null> {
    return this.repo.findRoom(id);
  }

  async getRooms(schoolId: string, filters: AcademicFilters): Promise<{ data: Room[]; total: number }> {
    return this.repo.findAllRooms(schoolId, filters);
  }

  async createRoom(data: CreateRoomRequest, schoolId: string): Promise<Room> {
    return this.repo.createRoom(data, schoolId);
  }

  async updateRoom(id: string, data: UpdateRoomRequest): Promise<Room> {
    return this.repo.updateRoom(id, data);
  }

  async archiveRoom(id: string): Promise<void> {
    return this.repo.archiveRoom(id);
  }

  async restoreRoom(id: string): Promise<void> {
    return this.repo.restoreRoom(id);
  }

  async deleteRoom(id: string): Promise<void> {
    return this.repo.deleteRoom(id);
  }

  async getTimetableSlot(id: string): Promise<TimetableSlot | null> {
    return this.repo.findTimetableSlot(id);
  }

  async getTimetableSlots(schoolId: string, filters: AcademicFilters): Promise<TimetableSlot[]> {
    return this.repo.findTimetableSlots(schoolId, filters);
  }

  async createTimetableSlot(data: CreateScheduleSlotRequest, schoolId: string): Promise<TimetableSlot> {
    return this.repo.createTimetableSlot(data, schoolId);
  }

  async deleteTimetableSlot(id: string): Promise<void> {
    return this.repo.deleteTimetableSlot(id);
  }

  async getDepartment(id: string): Promise<Department | null> {
    return this.repo.findDepartment(id);
  }

  async getDepartments(schoolId: string): Promise<Department[]> {
    return this.repo.findAllDepartments(schoolId);
  }

  async createDepartment(data: CreateDepartmentRequest, schoolId: string): Promise<Department> {
    return this.repo.createDepartment(data, schoolId);
  }

  async updateDepartment(id: string, data: UpdateDepartmentRequest): Promise<Department> {
    return this.repo.updateDepartment(id, data);
  }

  async deleteDepartment(id: string): Promise<void> {
    return this.repo.deleteDepartment(id);
  }

  async getLevel(id: string): Promise<Level | null> {
    return this.repo.findLevel(id);
  }

  async getLevels(schoolId: string): Promise<Level[]> {
    return this.repo.findAllLevels(schoolId);
  }

  async createLevel(data: CreateLevelRequest, schoolId: string): Promise<Level> {
    return this.repo.createLevel(data, schoolId);
  }

  async updateLevel(id: string, data: UpdateLevelRequest): Promise<Level> {
    return this.repo.updateLevel(id, data);
  }

  async deleteLevel(id: string): Promise<void> {
    return this.repo.deleteLevel(id);
  }

  async getSection(id: string): Promise<Section | null> {
    return this.repo.findSection(id);
  }

  async getSections(schoolId: string): Promise<Section[]> {
    return this.repo.findAllSections(schoolId);
  }

  async createSection(data: CreateSectionRequest, schoolId: string): Promise<Section> {
    return this.repo.createSection(data, schoolId);
  }

  async updateSection(id: string, data: UpdateSectionRequest): Promise<Section> {
    return this.repo.updateSection(id, data);
  }

  async deleteSection(id: string): Promise<void> {
    return this.repo.deleteSection(id);
  }

  async getStream(id: string): Promise<Stream | null> {
    return this.repo.findStream(id);
  }

  async getStreams(schoolId: string): Promise<Stream[]> {
    return this.repo.findAllStreams(schoolId);
  }

  async createStream(data: CreateStreamRequest, schoolId: string): Promise<Stream> {
    return this.repo.createStream(data, schoolId);
  }

  async updateStream(id: string, data: UpdateStreamRequest): Promise<Stream> {
    return this.repo.updateStream(id, data);
  }

  async deleteStream(id: string): Promise<void> {
    return this.repo.deleteStream(id);
  }

  async getAssignment(id: string): Promise<TeacherAssignment | null> {
    return this.repo.findAssignment(id);
  }

  async getAssignments(schoolId: string, filters: AcademicFilters): Promise<{ data: TeacherAssignment[]; total: number }> {
    return this.repo.findAllAssignments(schoolId, filters);
  }

  async createAssignment(data: CreateAssignmentRequest, schoolId: string): Promise<TeacherAssignment> {
    return this.repo.createAssignment(data, schoolId);
  }

  async deleteAssignment(id: string): Promise<void> {
    return this.repo.deleteAssignment(id);
  }
}
