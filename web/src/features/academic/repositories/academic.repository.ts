import type {
  AcademicRepository, AcademicYear, Term, Level, Section, Stream, Department, Subject,
  SchoolClass, Room, TeacherAssignment, TimetableSlot, ScheduleConflict, AcademicEvent,
  AcademicStatistics, AcademicDashboard, AcademicFilters,
  CreateClassRequest, UpdateClassRequest, CreateSubjectRequest, UpdateSubjectRequest,
  CreateDepartmentRequest, UpdateDepartmentRequest, CreateLevelRequest, UpdateLevelRequest,
  CreateSectionRequest, UpdateSectionRequest, CreateStreamRequest, UpdateStreamRequest,
  CreateRoomRequest, UpdateRoomRequest, CreateAssignmentRequest, CreateScheduleSlotRequest,
  CreateEventRequest,
} from '../types';
import { logger } from '@educi/logger';
import type { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseAcademicRepository implements AcademicRepository {
  private readonly supabase: SupabaseClient;
  constructor(supabase: SupabaseClient) { this.supabase = supabase; }

  // === ACADEMIC YEARS ===
  async findAcademicYear(id: string): Promise<AcademicYear | null> {
    const { data, error } = await this.supabase.from('academic_years').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllAcademicYears(schoolId: string): Promise<AcademicYear[]> {
    const { data, error } = await this.supabase.from('academic_years').select('*').eq('school_id', schoolId).order('start_date', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createAcademicYear(data: Omit<AcademicYear, 'id' | 'createdAt' | 'updatedAt'>): Promise<AcademicYear> {
    const { data: result, error } = await this.supabase.from('academic_years').insert({
      school_id: data.schoolId, name: data.name, start_date: data.startDate, end_date: data.endDate,
      status: data.status, is_current: data.isCurrent, terms_count: data.termsCount,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateAcademicYear(id: string, data: Partial<AcademicYear>): Promise<AcademicYear> {
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.isCurrent !== undefined) updateData.is_current = data.isCurrent;
    updateData.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('academic_years').update(updateData).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findTerms(academicYearId: string): Promise<Term[]> {
    const { data, error } = await this.supabase.from('academic_terms').select('*').eq('academic_year_id', academicYearId).order('order');
    if (error) throw error;
    return data || [];
  }

  // === CLASSES ===
  async findClass(id: string): Promise<SchoolClass | null> {
    const { data, error } = await this.supabase.from('school_classes').select('*, level:levels(id,name), section:sections(id,name), stream:streams(id,name), room:rooms(id,name), mainTeacher:teachers(id,first_name,last_name)').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllClasses(schoolId: string, filters: AcademicFilters): Promise<{ data: SchoolClass[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('school_classes').select('*, level:levels(id,name), section:sections(id,name), stream:streams(id,name)', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.search) query = query.or(`name.ilike.%${filters.search}%`);
    if (filters.levelId) query = query.eq('level_id', filters.levelId);
    if (filters.sectionId) query = query.eq('section_id', filters.sectionId);
    if (filters.academicYearId) query = query.eq('academic_year_id', filters.academicYearId);
    if (filters.status) query = query.eq('status', filters.status);
    query = query.order(filters.sortBy || 'created_at', { ascending: filters.sortOrder === 'asc' }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createClass(data: CreateClassRequest, schoolId: string): Promise<SchoolClass> {
    const { data: result, error } = await this.supabase.from('school_classes').insert({
      school_id: schoolId, name: data.name, level_id: data.levelId, section_id: data.sectionId,
      stream_id: data.streamId, capacity: data.capacity, room_id: data.roomId,
      main_teacher_id: data.mainTeacherId, color: data.color, academic_year_id: data.academicYearId, status: 'ACTIVE',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateClass(id: string, data: UpdateClassRequest): Promise<SchoolClass> {
    const u: Record<string, unknown> = {};
    if (data.name !== undefined) u.name = data.name;
    if (data.levelId !== undefined) u.level_id = data.levelId;
    if (data.sectionId !== undefined) u.section_id = data.sectionId;
    if (data.streamId !== undefined) u.stream_id = data.streamId;
    if (data.capacity !== undefined) u.capacity = data.capacity;
    if (data.roomId !== undefined) u.room_id = data.roomId;
    if (data.mainTeacherId !== undefined) u.main_teacher_id = data.mainTeacherId;
    if (data.color !== undefined) u.color = data.color;
    if (data.status !== undefined) u.status = data.status;
    u.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('school_classes').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async archiveClass(id: string): Promise<void> {
    const { error } = await this.supabase.from('school_classes').update({ status: 'ARCHIVED', updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async restoreClass(id: string): Promise<void> {
    const { error } = await this.supabase.from('school_classes').update({ status: 'ACTIVE', updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async deleteClass(id: string): Promise<void> {
    const { error } = await this.supabase.from('school_classes').delete().eq('id', id);
    if (error) throw error;
  }

  async countActiveStudentsByClassId(schoolId: string, classId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('students')
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('class_id', classId)
      .eq('status', 'ACTIVE');
    if (error) throw error;
    return count || 0;
  }

  // === SUBJECTS ===
  async findSubject(id: string): Promise<Subject | null> {
    const { data, error } = await this.supabase.from('subjects').select('*, department:departments(id,name)').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllSubjects(schoolId: string, filters: AcademicFilters): Promise<{ data: Subject[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('subjects').select('*, department:departments(id,name)', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.search) query = query.or(`name.ilike.%${filters.search}%,code.ilike.%${filters.search}%`);
    if (filters.departmentId) query = query.eq('department_id', filters.departmentId);
    query = query.order('name').range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createSubject(data: CreateSubjectRequest, schoolId: string): Promise<Subject> {
    const { data: result, error } = await this.supabase.from('subjects').insert({
      school_id: schoolId, name: data.name, code: data.code, coefficient: data.coefficient || 1,
      max_hours_per_week: data.maxHoursPerWeek || 10, department_id: data.departmentId,
      color: data.color, levels: data.levels,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSubject(id: string, data: UpdateSubjectRequest): Promise<Subject> {
    const u: Record<string, unknown> = {};
    if (data.name !== undefined) u.name = data.name;
    if (data.code !== undefined) u.code = data.code;
    if (data.coefficient !== undefined) u.coefficient = data.coefficient;
    if (data.maxHoursPerWeek !== undefined) u.max_hours_per_week = data.maxHoursPerWeek;
    if (data.departmentId !== undefined) u.department_id = data.departmentId;
    if (data.color !== undefined) u.color = data.color;
    if (data.levels !== undefined) u.levels = data.levels;
    u.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('subjects').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async archiveSubject(id: string): Promise<void> {
    const { error } = await this.supabase.from('subjects').update({ archived: true, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async restoreSubject(id: string): Promise<void> {
    const { error } = await this.supabase.from('subjects').update({ archived: false, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async deleteSubject(id: string): Promise<void> {
    const { error } = await this.supabase.from('subjects').delete().eq('id', id);
    if (error) throw error;
  }

  // === DEPARTMENTS ===
  async findDepartment(id: string): Promise<Department | null> {
    const { data, error } = await this.supabase.from('departments').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllDepartments(schoolId: string): Promise<Department[]> {
    const { data, error } = await this.supabase.from('departments').select('*').eq('school_id', schoolId).order('name');
    if (error) throw error;
    return data || [];
  }

  async createDepartment(data: CreateDepartmentRequest, schoolId: string): Promise<Department> {
    const { data: result, error } = await this.supabase.from('departments').insert({ school_id: schoolId, name: data.name, code: data.code, head_teacher_id: data.headTeacherId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDepartment(id: string, data: UpdateDepartmentRequest): Promise<Department> {
    const u: Record<string, unknown> = {};
    if (data.name !== undefined) u.name = data.name;
    if (data.code !== undefined) u.code = data.code;
    if (data.headTeacherId !== undefined) u.head_teacher_id = data.headTeacherId;
    const { data: result, error } = await this.supabase.from('departments').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async deleteDepartment(id: string): Promise<void> {
    const { error } = await this.supabase.from('departments').delete().eq('id', id);
    if (error) throw error;
  }

  // === LEVELS ===
  async findLevel(id: string): Promise<Level | null> {
    const { data, error } = await this.supabase.from('levels').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllLevels(schoolId: string): Promise<Level[]> {
    const { data, error } = await this.supabase.from('levels').select('*').eq('school_id', schoolId).order('order');
    if (error) throw error;
    return data || [];
  }

  async createLevel(data: CreateLevelRequest, schoolId: string): Promise<Level> {
    const { data: result, error } = await this.supabase.from('levels').insert({ school_id: schoolId, name: data.name, code: data.code, order: data.order, education_cycle: data.educationCycle, sections: data.sections }).select().single();
    if (error) throw error;
    return result;
  }

  async updateLevel(id: string, data: UpdateLevelRequest): Promise<Level> {
    const u: Record<string, unknown> = {};
    if (data.name !== undefined) u.name = data.name;
    if (data.code !== undefined) u.code = data.code;
    if (data.order !== undefined) u.order = data.order;
    if (data.educationCycle !== undefined) u.education_cycle = data.educationCycle;
    const { data: result, error } = await this.supabase.from('levels').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async deleteLevel(id: string): Promise<void> {
    const { error } = await this.supabase.from('levels').delete().eq('id', id);
    if (error) throw error;
  }

  // === SECTIONS ===
  async findSection(id: string): Promise<Section | null> {
    const { data, error } = await this.supabase.from('sections').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllSections(schoolId: string): Promise<Section[]> {
    const { data, error } = await this.supabase.from('sections').select('*').eq('school_id', schoolId).order('name');
    if (error) throw error;
    return data || [];
  }

  async createSection(data: CreateSectionRequest, schoolId: string): Promise<Section> {
    const { data: result, error } = await this.supabase.from('sections').insert({ school_id: schoolId, name: data.name, code: data.code, level_id: data.levelId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateSection(id: string, data: UpdateSectionRequest): Promise<Section> {
    const u: Record<string, unknown> = {};
    if (data.name !== undefined) u.name = data.name;
    if (data.code !== undefined) u.code = data.code;
    if (data.levelId !== undefined) u.level_id = data.levelId;
    const { data: result, error } = await this.supabase.from('sections').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async deleteSection(id: string): Promise<void> {
    const { error } = await this.supabase.from('sections').delete().eq('id', id);
    if (error) throw error;
  }

  // === STREAMS ===
  async findStream(id: string): Promise<Stream | null> {
    const { data, error } = await this.supabase.from('streams').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllStreams(schoolId: string): Promise<Stream[]> {
    const { data, error } = await this.supabase.from('streams').select('*').eq('school_id', schoolId).order('name');
    if (error) throw error;
    return data || [];
  }

  async createStream(data: CreateStreamRequest, schoolId: string): Promise<Stream> {
    const { data: result, error } = await this.supabase.from('streams').insert({ school_id: schoolId, name: data.name, code: data.code, level_id: data.levelId, description: data.description }).select().single();
    if (error) throw error;
    return result;
  }

  async updateStream(id: string, data: UpdateStreamRequest): Promise<Stream> {
    const u: Record<string, unknown> = {};
    if (data.name !== undefined) u.name = data.name;
    if (data.code !== undefined) u.code = data.code;
    if (data.levelId !== undefined) u.level_id = data.levelId;
    if (data.description !== undefined) u.description = data.description;
    const { data: result, error } = await this.supabase.from('streams').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async deleteStream(id: string): Promise<void> {
    const { error } = await this.supabase.from('streams').delete().eq('id', id);
    if (error) throw error;
  }

  // === ROOMS ===
  async findRoom(id: string): Promise<Room | null> {
    const { data, error } = await this.supabase.from('rooms').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllRooms(schoolId: string, filters: AcademicFilters): Promise<{ data: Room[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('rooms').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.search) query = query.or(`name.ilike.%${filters.search}%,code.ilike.%${filters.search}%`);
    if (filters.status) query = query.eq('status', filters.status);
    query = query.order('name').range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createRoom(data: CreateRoomRequest, schoolId: string): Promise<Room> {
    const { data: result, error } = await this.supabase.from('rooms').insert({
      school_id: schoolId, name: data.name, code: data.code, capacity: data.capacity,
      room_type: data.roomType, floor: data.floor, building: data.building,
      has_projector: data.hasProjector ?? false, has_whiteboard: data.hasWhiteboard ?? true,
      has_computer: data.hasComputer ?? false, has_internet: data.hasInternet ?? false,
      status: 'AVAILABLE',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async updateRoom(id: string, data: UpdateRoomRequest): Promise<Room> {
    const u: Record<string, unknown> = {};
    if (data.name !== undefined) u.name = data.name;
    if (data.code !== undefined) u.code = data.code;
    if (data.capacity !== undefined) u.capacity = data.capacity;
    if (data.roomType !== undefined) u.room_type = data.roomType;
    if (data.floor !== undefined) u.floor = data.floor;
    if (data.building !== undefined) u.building = data.building;
    if (data.hasProjector !== undefined) u.has_projector = data.hasProjector;
    if (data.hasWhiteboard !== undefined) u.has_whiteboard = data.hasWhiteboard;
    if (data.hasComputer !== undefined) u.has_computer = data.hasComputer;
    if (data.hasInternet !== undefined) u.has_internet = data.hasInternet;
    if (data.status !== undefined) u.status = data.status;
    u.updated_at = new Date().toISOString();
    const { data: result, error } = await this.supabase.from('rooms').update(u).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async archiveRoom(id: string): Promise<void> {
    const { error } = await this.supabase.from('rooms').update({ status: 'ARCHIVED', updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async restoreRoom(id: string): Promise<void> {
    const { error } = await this.supabase.from('rooms').update({ status: 'AVAILABLE', updated_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }

  async deleteRoom(id: string): Promise<void> {
    const { error } = await this.supabase.from('rooms').delete().eq('id', id);
    if (error) throw error;
  }

  // === ASSIGNMENTS ===
  async findAssignment(id: string): Promise<TeacherAssignment | null> {
    const { data, error } = await this.supabase.from('teacher_assignments').select('*, teacher:teachers(id,first_name,last_name), class:school_classes(id,name), subject:subjects(id,name,coefficient)').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllAssignments(schoolId: string, filters: AcademicFilters): Promise<{ data: TeacherAssignment[]; total: number }> {
    const page = filters.page || 1; const limit = filters.limit || 20; const offset = (page - 1) * limit;
    let query = this.supabase.from('teacher_assignments').select('*, teacher:teachers(id,first_name,last_name), class:school_classes(id,name), subject:subjects(id,name,coefficient)', { count: 'exact' }).eq('school_id', schoolId);
    if (filters.academicYearId) query = query.eq('academic_year_id', filters.academicYearId);
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createAssignment(data: CreateAssignmentRequest, schoolId: string): Promise<TeacherAssignment> {
    const { data: result, error } = await this.supabase.from('teacher_assignments').insert({
      school_id: schoolId, teacher_id: data.teacherId, class_id: data.classId,
      subject_id: data.subjectId, academic_year_id: data.academicYearId, term_id: data.termId,
      hours_per_week: data.hoursPerWeek, start_date: data.startDate, end_date: data.endDate,
      status: 'ACTIVE',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async deleteAssignment(id: string): Promise<void> {
    const { error } = await this.supabase.from('teacher_assignments').delete().eq('id', id);
    if (error) throw error;
  }

  // === TIMETABLE ===
  async findTimetableSlot(id: string): Promise<TimetableSlot | null> {
    const { data, error } = await this.supabase.from('timetable_slots').select('*, teacher:teachers(id,first_name,last_name), class:school_classes(id,name), subject:subjects(id,name,color), room:rooms(id,name)').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findTimetableSlots(schoolId: string, filters: AcademicFilters): Promise<TimetableSlot[]> {
    let query = this.supabase.from('timetable_slots').select('*, teacher:teachers(id,first_name,last_name), class:school_classes(id,name), subject:subjects(id,name,color), room:rooms(id,name)').eq('school_id', schoolId);
    if (filters.academicYearId) query = query.eq('academic_year_id', filters.academicYearId);
    if (filters.levelId) query = query.eq('class.level_id', filters.levelId);
    query = query.order('day_of_week').order('start_time');
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async createTimetableSlot(data: CreateScheduleSlotRequest, schoolId: string): Promise<TimetableSlot> {
    const { data: result, error } = await this.supabase.from('timetable_slots').insert({
      school_id: schoolId, class_id: data.classId, subject_id: data.subjectId,
      teacher_id: data.teacherId, room_id: data.roomId, academic_year_id: data.academicYearId,
      day_of_week: data.dayOfWeek, start_time: data.startTime, end_time: data.endTime,
      is_break: false, status: 'ACTIVE',
    }).select().single();
    if (error) throw error;
    return result;
  }

  async deleteTimetableSlot(id: string): Promise<void> {
    const { error } = await this.supabase.from('timetable_slots').delete().eq('id', id);
    if (error) throw error;
  }

  // === CONFLICTS ===
  async findConflicts(schoolId: string, academicYearId: string): Promise<ScheduleConflict[]> {
    const { data, error } = await this.supabase.from('schedule_conflicts').select('*').eq('school_id', schoolId).eq('academic_year_id', academicYearId).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async createConflict(data: Omit<ScheduleConflict, 'id' | 'createdAt'>): Promise<ScheduleConflict> {
    const { data: result, error } = await this.supabase.from('schedule_conflicts').insert({
      school_id: data.schoolId, conflict_type: data.conflictType, slot1_id: data.slot1Id,
      slot2_id: data.slot2Id, description: data.description, severity: data.severity, resolved: false,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async resolveConflict(id: string, resolvedBy: string): Promise<void> {
    const { error } = await this.supabase.from('schedule_conflicts').update({ resolved: true, resolved_at: new Date().toISOString(), resolved_by: resolvedBy }).eq('id', id);
    if (error) throw error;
  }

  // === CALENDAR ===
  async findEvents(schoolId: string, academicYearId: string): Promise<AcademicEvent[]> {
    const { data, error } = await this.supabase.from('academic_events').select('*').eq('school_id', schoolId).eq('academic_year_id', academicYearId).order('start_date');
    if (error) throw error;
    return data || [];
  }

  async createEvent(data: CreateEventRequest, schoolId: string): Promise<AcademicEvent> {
    const { data: result, error } = await this.supabase.from('academic_events').insert({
      school_id: schoolId, academic_year_id: data.academicYearId, title: data.title,
      description: data.description, event_type: data.eventType, start_date: data.startDate,
      end_date: data.endDate, is_recurring: data.isRecurring ?? false,
    }).select().single();
    if (error) throw error;
    return result;
  }

  async deleteEvent(id: string): Promise<void> {
    const { error } = await this.supabase.from('academic_events').delete().eq('id', id);
    if (error) throw error;
  }

  // === STATISTICS ===
  async getStatistics(schoolId: string, academicYearId: string): Promise<AcademicStatistics> {
    const [classes, subjects, teachers, rooms] = await Promise.all([
      this.supabase.from('school_classes').select('id,name,level_id,capacity').eq('school_id', schoolId).eq('academic_year_id', academicYearId),
      this.supabase.from('subjects').select('id,name,department_id').eq('school_id', schoolId),
      this.supabase.from('teachers').select('id').eq('school_id', schoolId).eq('status', 'ACTIVE'),
      this.supabase.from('rooms').select('id,name,room_type,capacity,status').eq('school_id', schoolId),
    ]);
    const classList = classes.data || [];
    const subjectList = subjects.data || [];
    const teacherList = teachers.data || [];
    const roomList = rooms.data || [];
    const availableRooms = roomList.filter((r: any) => r.status === 'AVAILABLE').length;
    return {
      schoolId, academicYearId,
      totalClasses: classList.length, totalSubjects: subjectList.length,
      totalTeachers: teacherList.length, totalRooms: roomList.length,
      roomOccupancyRate: roomList.length > 0 ? Math.round((1 - availableRooms / roomList.length) * 100) : 0,
      teacherWorkloadAvg: 0, classFillRate: 0, totalHoursPerWeek: 0,
      byLevel: [], byDepartment: [],
      roomUsage: roomList.map((r: any) => ({ room: r.name, usageRate: 0 })),
    };
  }

  async getDashboard(schoolId: string): Promise<AcademicDashboard> {
    const [classes, subjects, teachers, rooms] = await Promise.all([
      this.supabase.from('school_classes').select('id').eq('school_id', schoolId).eq('status', 'ACTIVE'),
      this.supabase.from('subjects').select('id').eq('school_id', schoolId),
      this.supabase.from('teachers').select('id').eq('school_id', schoolId).eq('status', 'ACTIVE'),
      this.supabase.from('rooms').select('id,status').eq('school_id', schoolId),
    ]);
    const roomList = rooms.data || [];
    return {
      schoolId,
      totalClasses: (classes.data || []).length,
      totalSubjects: (subjects.data || []).length,
      activeTeachers: (teachers.data || []).length,
      totalRooms: roomList.length,
      availableRooms: roomList.filter((r: any) => r.status === 'AVAILABLE').length,
      todayClasses: 0, pendingConflicts: 0, upcomingEvents: 0,
      classBreakdown: [], subjectBreakdown: [],
      roomBreakdown: [],
    };
  }

  // === SEARCH ===
  async search(schoolId: string, query: string, types?: string[], limit = 20): Promise<Array<{ id: string; name: string; type: string }>> {
    const results: Array<{ id: string; name: string; type: string }> = [];
    const searchTypes = types || ['CLASS', 'ROOM', 'SUBJECT', 'TEACHER', 'DEPARTMENT'];
    if (searchTypes.includes('CLASS')) {
      const { data } = await this.supabase.from('school_classes').select('id,name').eq('school_id', schoolId).ilike('name', `%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: d.name, type: 'CLASS' }));
    }
    if (searchTypes.includes('ROOM')) {
      const { data } = await this.supabase.from('rooms').select('id,name').eq('school_id', schoolId).ilike('name', `%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: d.name, type: 'ROOM' }));
    }
    if (searchTypes.includes('SUBJECT')) {
      const { data } = await this.supabase.from('subjects').select('id,name').eq('school_id', schoolId).ilike('name', `%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: d.name, type: 'SUBJECT' }));
    }
    if (searchTypes.includes('TEACHER')) {
      const { data } = await this.supabase.from('teachers').select('id,first_name,last_name').eq('school_id', schoolId).or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: `${d.first_name} ${d.last_name}`, type: 'TEACHER' }));
    }
    if (searchTypes.includes('DEPARTMENT')) {
      const { data } = await this.supabase.from('departments').select('id,name').eq('school_id', schoolId).ilike('name', `%${query}%`).limit(limit);
      (data || []).forEach((d: any) => results.push({ id: d.id, name: d.name, type: 'DEPARTMENT' }));
    }
    return results.slice(0, limit);
  }
}
