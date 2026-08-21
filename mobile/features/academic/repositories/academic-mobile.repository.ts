import type {
  AcademicYear, Term, Level, Section, Stream, Department, Subject, SchoolClass, Room,
  TeacherAssignment, TimetableSlot,
  CreateClassRequest, UpdateClassRequest, CreateSubjectRequest, UpdateSubjectRequest,
  CreateDepartmentRequest, UpdateDepartmentRequest, CreateLevelRequest, UpdateLevelRequest,
  CreateSectionRequest, UpdateSectionRequest, CreateStreamRequest, UpdateStreamRequest,
  CreateRoomRequest, UpdateRoomRequest, CreateAssignmentRequest, CreateScheduleSlotRequest,
  AcademicFilters,
} from '@educi/types';

export class AcademicMobileRepository {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async findAcademicYear(id: string): Promise<AcademicYear | null> {
    const response = await fetch(`${this.baseUrl}/api/academic-years/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllAcademicYears(schoolId: string): Promise<AcademicYear[]> {
    const response = await fetch(`${this.baseUrl}/api/academic-years?schoolId=${encodeURIComponent(schoolId)}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async findTerms(academicYearId: string): Promise<Term[]> {
    const response = await fetch(`${this.baseUrl}/api/academic-years/${academicYearId}/terms`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async findClass(id: string): Promise<SchoolClass | null> {
    const response = await fetch(`${this.baseUrl}/api/classes/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllClasses(schoolId: string, filters: AcademicFilters): Promise<{ data: SchoolClass[]; total: number }> {
    const params = new URLSearchParams({ schoolId });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/classes?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createClass(data: CreateClassRequest, schoolId: string): Promise<SchoolClass> {
    const response = await fetch(`${this.baseUrl}/api/classes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async updateClass(id: string, data: UpdateClassRequest): Promise<SchoolClass> {
    const response = await fetch(`${this.baseUrl}/api/classes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async archiveClass(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/classes/${id}/archive`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de l\'archivage');
  }

  async restoreClass(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/classes/${id}/restore`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de la restauration');
  }

  async deleteClass(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/classes/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findSubject(id: string): Promise<Subject | null> {
    const response = await fetch(`${this.baseUrl}/api/subjects/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllSubjects(schoolId: string, filters: AcademicFilters): Promise<{ data: Subject[]; total: number }> {
    const params = new URLSearchParams({ schoolId });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/subjects?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createSubject(data: CreateSubjectRequest, schoolId: string): Promise<Subject> {
    const response = await fetch(`${this.baseUrl}/api/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async updateSubject(id: string, data: UpdateSubjectRequest): Promise<Subject> {
    const response = await fetch(`${this.baseUrl}/api/subjects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async archiveSubject(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/subjects/${id}/archive`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de l\'archivage');
  }

  async restoreSubject(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/subjects/${id}/restore`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de la restauration');
  }

  async deleteSubject(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/subjects/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findRoom(id: string): Promise<Room | null> {
    const response = await fetch(`${this.baseUrl}/api/rooms/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllRooms(schoolId: string, filters: AcademicFilters): Promise<{ data: Room[]; total: number }> {
    const params = new URLSearchParams({ schoolId });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/rooms?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createRoom(data: CreateRoomRequest, schoolId: string): Promise<Room> {
    const response = await fetch(`${this.baseUrl}/api/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async updateRoom(id: string, data: UpdateRoomRequest): Promise<Room> {
    const response = await fetch(`${this.baseUrl}/api/rooms/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async archiveRoom(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/rooms/${id}/archive`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de l\'archivage');
  }

  async restoreRoom(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/rooms/${id}/restore`, { method: 'POST' });
    if (!response.ok) throw new Error('Erreur lors de la restauration');
  }

  async deleteRoom(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/rooms/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findTimetableSlot(id: string): Promise<TimetableSlot | null> {
    const response = await fetch(`${this.baseUrl}/api/timetable/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findTimetableSlots(schoolId: string, filters: AcademicFilters): Promise<TimetableSlot[]> {
    const params = new URLSearchParams({ schoolId });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/timetable?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createTimetableSlot(data: CreateScheduleSlotRequest, schoolId: string): Promise<TimetableSlot> {
    const response = await fetch(`${this.baseUrl}/api/timetable`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async deleteTimetableSlot(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/timetable/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findDepartment(id: string): Promise<Department | null> {
    const response = await fetch(`${this.baseUrl}/api/departments/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllDepartments(schoolId: string): Promise<Department[]> {
    const response = await fetch(`${this.baseUrl}/api/departments?schoolId=${encodeURIComponent(schoolId)}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createDepartment(data: CreateDepartmentRequest, schoolId: string): Promise<Department> {
    const response = await fetch(`${this.baseUrl}/api/departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async updateDepartment(id: string, data: UpdateDepartmentRequest): Promise<Department> {
    const response = await fetch(`${this.baseUrl}/api/departments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async deleteDepartment(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/departments/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findLevel(id: string): Promise<Level | null> {
    const response = await fetch(`${this.baseUrl}/api/levels/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllLevels(schoolId: string): Promise<Level[]> {
    const response = await fetch(`${this.baseUrl}/api/levels?schoolId=${encodeURIComponent(schoolId)}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createLevel(data: CreateLevelRequest, schoolId: string): Promise<Level> {
    const response = await fetch(`${this.baseUrl}/api/levels`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async updateLevel(id: string, data: UpdateLevelRequest): Promise<Level> {
    const response = await fetch(`${this.baseUrl}/api/levels/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async deleteLevel(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/levels/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findSection(id: string): Promise<Section | null> {
    const response = await fetch(`${this.baseUrl}/api/sections/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllSections(schoolId: string): Promise<Section[]> {
    const response = await fetch(`${this.baseUrl}/api/sections?schoolId=${encodeURIComponent(schoolId)}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createSection(data: CreateSectionRequest, schoolId: string): Promise<Section> {
    const response = await fetch(`${this.baseUrl}/api/sections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async updateSection(id: string, data: UpdateSectionRequest): Promise<Section> {
    const response = await fetch(`${this.baseUrl}/api/sections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async deleteSection(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/sections/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findStream(id: string): Promise<Stream | null> {
    const response = await fetch(`${this.baseUrl}/api/streams/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllStreams(schoolId: string): Promise<Stream[]> {
    const response = await fetch(`${this.baseUrl}/api/streams?schoolId=${encodeURIComponent(schoolId)}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createStream(data: CreateStreamRequest, schoolId: string): Promise<Stream> {
    const response = await fetch(`${this.baseUrl}/api/streams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async updateStream(id: string, data: UpdateStreamRequest): Promise<Stream> {
    const response = await fetch(`${this.baseUrl}/api/streams/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour');
    return response.json();
  }

  async deleteStream(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/streams/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }

  async findAssignment(id: string): Promise<TeacherAssignment | null> {
    const response = await fetch(`${this.baseUrl}/api/assignments/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async findAllAssignments(schoolId: string, filters: AcademicFilters): Promise<{ data: TeacherAssignment[]; total: number }> {
    const params = new URLSearchParams({ schoolId });
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(key, String(value));
      }
    });
    const response = await fetch(`${this.baseUrl}/api/assignments?${params.toString()}`);
    if (!response.ok) throw new Error('Erreur lors du chargement');
    return response.json();
  }

  async createAssignment(data: CreateAssignmentRequest, schoolId: string): Promise<TeacherAssignment> {
    const response = await fetch(`${this.baseUrl}/api/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, schoolId }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création');
    return response.json();
  }

  async deleteAssignment(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/assignments/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Erreur lors de la suppression');
  }
}
