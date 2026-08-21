import type { SupabaseClient } from '@supabase/supabase-js';

interface CorporateCourse {
  id: string;
  school_id: string;
  company_id?: string;
  title: string;
  description?: string;
  category: string;
  instructor?: string;
  duration_hours: number;
  max_participants?: number;
  current_participants: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  start_date?: string;
  end_date?: string;
  skills_covered: string[];
  completion_rate: number;
  created_at: string;
  updated_at: string;
}

interface CorporateCourseCreate {
  company_id?: string;
  title: string;
  description?: string;
  category: string;
  instructor?: string;
  duration_hours?: number;
  max_participants?: number;
  start_date?: string;
  end_date?: string;
  skills_covered?: string[];
}

interface Enrollment {
  id: string;
  school_id: string;
  course_id: string;
  person_id: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  progress: number;
  enrolled_at: string;
  completed_at?: string;
}

interface CorporateFilters {
  company_id?: string;
  category?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class CorporateLearningService {
  private readonly COURSE_TABLE = 'gewlp_corporate_courses';
  private readonly ENROLLMENT_TABLE = 'gewlp_corporate_enrollments';

  constructor(private supabase: SupabaseClient) {}

  async getCourse(schoolId: string, id: string): Promise<CorporateCourse> {
    const { data, error } = await this.supabase
      .from(this.COURSE_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();
    if (error) throw error;
    return data;
  }

  async listCourses(schoolId: string, filters?: CorporateFilters): Promise<CorporateCourse[]> {
    let query = this.supabase
      .from(this.COURSE_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.company_id) query = query.eq('company_id', filters.company_id);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createCourse(schoolId: string, data: CorporateCourseCreate): Promise<CorporateCourse> {
    const { data: course, error } = await this.supabase
      .from(this.COURSE_TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        duration_hours: data.duration_hours ?? 0,
        current_participants: 0,
        skills_covered: data.skills_covered ?? [],
        completion_rate: 0,
        status: 'draft',
      })
      .select()
      .single();
    if (error) throw error;
    return course;
  }

  async updateCourse(schoolId: string, id: string, data: Partial<CorporateCourseCreate>): Promise<CorporateCourse> {
    const existing = await this.getCourse(schoolId, id);
    if (!existing) throw new Error(`Corporate course ${id} not found`);

    const { data: course, error } = await this.supabase
      .from(this.COURSE_TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return course;
  }

  async deleteCourse(schoolId: string, id: string): Promise<void> {
    const existing = await this.getCourse(schoolId, id);
    if (!existing) throw new Error(`Corporate course ${id} not found`);

    const { error } = await this.supabase
      .from(this.COURSE_TABLE)
      .update({ deleted_at: new Date().toISOString(), status: 'cancelled' })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async enrollPerson(schoolId: string, courseId: string, personId: string): Promise<Enrollment> {
    const course = await this.getCourse(schoolId, courseId);
    if (!course) throw new Error(`Corporate course ${courseId} not found`);

    if (course.max_participants && course.current_participants >= course.max_participants) {
      throw new Error('Course is full');
    }

    const { data: enrollment, error } = await this.supabase
      .from(this.ENROLLMENT_TABLE)
      .insert({ school_id: schoolId, course_id: courseId, person_id: personId, status: 'enrolled', progress: 0, enrolled_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;

    await this.supabase
      .from(this.COURSE_TABLE)
      .update({ current_participants: course.current_participants + 1, updated_at: new Date().toISOString() })
      .eq('id', courseId);

    return enrollment;
  }

  async getCourseEnrollments(schoolId: string, courseId: string): Promise<Enrollment[]> {
    const { data, error } = await this.supabase
      .from(this.ENROLLMENT_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('course_id', courseId)
      .order('enrolled_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async updateEnrollmentProgress(schoolId: string, enrollmentId: string, progress: number): Promise<Enrollment> {
    const status = progress >= 100 ? 'completed' : 'in_progress';
    const { data: enrollment, error } = await this.supabase
      .from(this.ENROLLMENT_TABLE)
      .update({ progress, status, completed_at: status === 'completed' ? new Date().toISOString() : undefined })
      .eq('school_id', schoolId)
      .eq('id', enrollmentId)
      .select()
      .single();
    if (error) throw error;
    return enrollment;
  }

  async getCourseCompletionRate(schoolId: string, courseId: string): Promise<number> {
    const { count: total } = await this.supabase
      .from(this.ENROLLMENT_TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('course_id', courseId);
    const { count: completed } = await this.supabase
      .from(this.ENROLLMENT_TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('course_id', courseId)
      .eq('status', 'completed');
    if (!total || total === 0) return 0;
    return Math.round(((completed ?? 0) / total) * 100);
  }
}
