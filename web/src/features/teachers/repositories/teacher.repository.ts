import type { TeacherRepository, CreateTeacherRequest, UpdateTeacherRequest, TeacherFilters, TeacherListResult, TeacherStatistics, TeacherDashboard, TeacherTimeline, TeacherAssignment, TeacherSchedule, TeacherAvailability, TeacherLeave, TeacherContract, TeacherEvaluation, TeacherQualification, TeacherCertification, TeacherPayrollSummary, Teacher } from '../types';
import { logger } from '@educi/logger';
import type { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseTeacherRepository implements TeacherRepository {
  private readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async findById(id: string): Promise<Teacher | null> {
    const { data, error } = await this.supabase
      .from('teachers')
      .select('*, user:users(id, name, email, photo_url), department:teacher_departments(id, name)')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapTeacher(data);
  }

  async findAll(schoolId: string, filters: TeacherFilters): Promise<TeacherListResult> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;

    let query = this.supabase
      .from('teachers')
      .select('*, user:users(id, name, email, photo_url), department:teacher_departments(id, name)', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,matricule.ilike.%${filters.search}%`);
    }
    if (filters.status && filters.status !== 'ALL') {
      query = query.eq('status', filters.status);
    }
    if (filters.gender && filters.gender !== 'ALL') {
      query = query.eq('gender', filters.gender);
    }
    if (filters.employmentType && filters.employmentType !== 'ALL') {
      query = query.eq('employment_type', filters.employmentType);
    }
    if (filters.contractType && filters.contractType !== 'ALL') {
      query = query.eq('contract_type', filters.contractType);
    }
    if (filters.departmentId) {
      query = query.eq('department_id', filters.departmentId);
    }
    if (filters.grade) {
      query = query.eq('grade', filters.grade);
    }
    if (filters.speciality) {
      query = query.eq('speciality', filters.speciality);
    }

    const sortBy = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      data: (data || []).map((t: Record<string, unknown>) => this.mapTeacher(t)),
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  async search(schoolId: string, query: string, limit = 20): Promise<Teacher[]> {
    const { data, error } = await this.supabase
      .from('teachers')
      .select('*, user:users(id, name, email, photo_url)')
      .eq('school_id', schoolId)
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,matricule.ilike.%${query}%,speciality.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return (data || []).map((t: Record<string, unknown>) => this.mapTeacher(t));
  }

  async create(data: CreateTeacherRequest, schoolId: string): Promise<Teacher> {
    const matricule = `TCH${new Date().getFullYear().toString().slice(-2)}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const { data: teacher, error } = await this.supabase
      .from('teachers')
      .insert({
        school_id: schoolId,
        matricule,
        first_name: data.firstName,
        last_name: data.lastName,
        date_of_birth: data.dateOfBirth || null,
        place_of_birth: data.placeOfBirth || null,
        gender: data.gender || null,
        address: data.address || null,
        phone: data.phone || null,
        email: data.email || null,
        nationality: data.nationality || null,
        employment_type: data.employmentType,
        contract_type: data.contractType,
        grade: data.grade || null,
        speciality: data.speciality || null,
        department_id: data.departmentId || null,
        hire_date: data.hireDate || new Date().toISOString(),
        contract_start_date: data.contractStartDate || null,
        contract_end_date: data.contractEndDate || null,
        salary: data.salary || null,
        hourly_rate: data.hourlyRate || null,
        max_weekly_hours: data.maxWeeklyHours || 24,
        status: 'ACTIVE',
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    logger.info('Teacher created', { teacherId: teacher.id }, 'teachers');
    return this.mapTeacher(teacher);
  }

  async update(id: string, data: UpdateTeacherRequest): Promise<Teacher> {
    const updateData: Record<string, unknown> = {};
    if (data.firstName !== undefined) updateData.first_name = data.firstName;
    if (data.lastName !== undefined) updateData.last_name = data.lastName;
    if (data.email !== undefined) updateData.email = data.email || null;
    if (data.phone !== undefined) updateData.phone = data.phone || null;
    if (data.dateOfBirth !== undefined) updateData.date_of_birth = data.dateOfBirth || null;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.employmentType !== undefined) updateData.employment_type = data.employmentType;
    if (data.contractType !== undefined) updateData.contract_type = data.contractType;
    if (data.grade !== undefined) updateData.grade = data.grade;
    if (data.speciality !== undefined) updateData.speciality = data.speciality;
    if (data.departmentId !== undefined) updateData.department_id = data.departmentId;
    if (data.salary !== undefined) updateData.salary = data.salary;
    if (data.hourlyRate !== undefined) updateData.hourly_rate = data.hourlyRate;
    if (data.maxWeeklyHours !== undefined) updateData.max_weekly_hours = data.maxWeeklyHours;
    if (data.status !== undefined) updateData.status = data.status;

    updateData.updated_at = new Date().toISOString();

    const { data: teacher, error } = await this.supabase
      .from('teachers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapTeacher(teacher);
  }

  async archive(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teachers')
      .update({ status: 'ARCHIVED', is_active: false, archived_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }

  async restore(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teachers')
      .update({ status: 'ACTIVE', is_active: true, archived_at: null, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('teachers').delete().eq('id', id);
    if (error) throw error;
  }

  async getStatistics(schoolId: string): Promise<TeacherStatistics> {
    const { data: teachers } = await this.supabase
      .from('teachers')
      .select('status, gender, employment_type, contract_type, speciality, grade, department_id, hire_date, salary, max_weekly_hours')
      .eq('school_id', schoolId);

    const list = teachers || [];
    const active = list.filter((t: Record<string, unknown>) => t.status === 'ACTIVE');
    const now = new Date();

    const byGender: Record<string, number> = {};
    const byContractType: Record<string, number> = {};
    const bySpeciality: Record<string, number> = {};
    const byDepartment: Record<string, number> = {};
    const byGrade: Record<string, number> = {};

    let totalSalary = 0;
    let totalHours = 0;
    let totalSeniority = 0;

    for (const t of list) {
      const g = (t.gender as string) || 'UNKNOWN';
      byGender[g] = (byGender[g] || 0) + 1;
      const ct = (t.contract_type as string) || 'UNKNOWN';
      byContractType[ct] = (byContractType[ct] || 0) + 1;
      const sp = (t.speciality as string) || 'NON_DÉFINI';
      bySpeciality[sp] = (bySpeciality[sp] || 0) + 1;
      const dept = (t.department_id as string) || 'NON_DÉFINI';
      byDepartment[dept] = (byDepartment[dept] || 0) + 1;
      const gr = (t.grade as string) || 'NON_DÉFINI';
      byGrade[gr] = (byGrade[gr] || 0) + 1;
      if (t.salary) totalSalary += t.salary as number;
      if (t.max_weekly_hours) totalHours += t.max_weekly_hours as number;
      if (t.hire_date) {
        const hireDate = new Date(t.hire_date as string);
        totalSeniority += (now.getTime() - hireDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      }
    }

    return {
      schoolId,
      totalTeachers: list.length,
      activeTeachers: active.length,
      inactiveTeachers: list.length - active.length,
      onLeave: list.filter((t: Record<string, unknown>) => t.status === 'ON_LEAVE').length,
      byGender,
      byContractType,
      bySpeciality,
      byDepartment,
      byGrade,
      averageSeniority: list.length > 0 ? Math.round(totalSeniority / list.length * 10) / 10 : 0,
      averageSalary: active.length > 0 ? Math.round(totalSalary / active.length) : 0,
      totalHoursPerWeek: totalHours,
      leaveApprovalRate: 0,
      averageEvaluationScore: 0,
    };
  }

  async getDashboard(schoolId: string): Promise<TeacherDashboard> {
    const stats = await this.getStatistics(schoolId);

    const { data: pendingLeaves } = await this.supabase
      .from('teacher_leaves')
      .select('id', { count: 'exact' })
      .eq('school_id', schoolId)
      .eq('status', 'PENDING');

    const now = new Date();
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const { data: expiringContracts } = await this.supabase
      .from('teacher_contracts')
      .select('id', { count: 'exact' })
      .eq('school_id', schoolId)
      .eq('status', 'ACTIVE')
      .lte('end_date', thirtyDaysLater.toISOString());

    return {
      schoolId,
      totalActive: stats.activeTeachers,
      onLeave: stats.onLeave,
      pendingLeaves: pendingLeaves?.length || 0,
      expiringContracts: expiringContracts?.length || 0,
      recentEvaluations: 0,
      averageScore: stats.averageEvaluationScore,
      departmentBreakdown: Object.entries(stats.byDepartment).map(([department, count]) => ({ department, count })),
      contractBreakdown: Object.entries(stats.byContractType).map(([type, count]) => ({ type, count })),
      leaveBreakdown: [],
      upcomingReviews: [],
    };
  }

  async getTimeline(teacherId: string, limit = 50): Promise<TeacherTimeline[]> {
    const { data, error } = await this.supabase
      .from('teacher_timeline')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []).map((e: Record<string, unknown>) => ({
      id: e.id as string,
      teacherId: e.teacher_id as string,
      schoolId: e.school_id as string,
      type: e.type as TeacherTimeline['type'],
      description: e.description as string,
      details: e.details as Record<string, unknown> | undefined,
      createdBy: e.created_by as string | undefined,
      createdAt: e.created_at as string,
    }));
  }

  async getAssignments(teacherId: string): Promise<TeacherAssignment[]> {
    const { data, error } = await this.supabase
      .from('teacher_assignments')
      .select('*, class:classes(id, name, level), subject:teacher_subjects(id, name)')
      .eq('teacher_id', teacherId)
      .eq('is_active', true);

    if (error) throw error;
    return (data || []).map((a: Record<string, unknown>) => ({
      id: a.id as string,
      teacherId: a.teacher_id as string,
      schoolId: a.school_id as string,
      classId: a.class_id as string,
      subjectId: a.subject_id as string,
      academicYearId: a.academic_year_id as string,
      levelId: a.level_id as string | undefined,
      sectionId: a.section_id as string | undefined,
      hoursPerWeek: a.hours_per_week as number,
      startDate: a.start_date as string,
      endDate: a.end_date as string | undefined,
      isActive: a.is_active as boolean,
      createdAt: a.created_at as string,
    }));
  }

  async getSchedule(teacherId: string): Promise<TeacherSchedule[]> {
    const { data, error } = await this.supabase
      .from('teacher_schedules')
      .select('*')
      .eq('teacher_id', teacherId)
      .eq('is_active', true)
      .order('day_of_week');

    if (error) throw error;
    return (data || []).map((s: Record<string, unknown>) => ({
      id: s.id as string,
      teacherId: s.teacher_id as string,
      schoolId: s.school_id as string,
      classId: s.class_id as string,
      subjectId: s.subject_id as string,
      dayOfWeek: s.day_of_week as number,
      startTime: s.start_time as string,
      endTime: s.end_time as string,
      room: s.room as string | undefined,
      isRecurring: s.is_recurring as boolean,
      startDate: s.start_date as string,
      endDate: s.end_date as string | undefined,
      isActive: s.is_active as boolean,
      createdAt: s.created_at as string,
    }));
  }

  async getAvailability(teacherId: string): Promise<TeacherAvailability[]> {
    const { data, error } = await this.supabase
      .from('teacher_availability')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('day_of_week');

    if (error) throw error;
    return (data || []).map((a: Record<string, unknown>) => ({
      id: a.id as string,
      teacherId: a.teacher_id as string,
      schoolId: a.school_id as string,
      dayOfWeek: a.day_of_week as number,
      startTime: a.start_time as string,
      endTime: a.end_time as string,
      isAvailable: a.is_available as boolean,
      reason: a.reason as string | undefined,
      recurring: a.recurring as boolean,
      startDate: a.start_date as string | undefined,
      endDate: a.end_date as string | undefined,
      createdAt: a.created_at as string,
    }));
  }

  async getLeaves(teacherId: string): Promise<TeacherLeave[]> {
    const { data, error } = await this.supabase
      .from('teacher_leaves')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map((l: Record<string, unknown>) => ({
      id: l.id as string,
      teacherId: l.teacher_id as string,
      schoolId: l.school_id as string,
      leaveType: l.leave_type as TeacherLeave['leaveType'],
      startDate: l.start_date as string,
      endDate: l.end_date as string,
      reason: l.reason as string,
      status: l.status as TeacherLeave['status'],
      approvedBy: l.approved_by as string | undefined,
      approvedAt: l.approved_at as string | undefined,
      rejectionReason: l.rejection_reason as string | undefined,
      daysCount: l.days_count as number,
      attachments: l.attachments as string[] | undefined,
      createdAt: l.created_at as string,
      updatedAt: l.updated_at as string | undefined,
    }));
  }

  async getContracts(teacherId: string): Promise<TeacherContract[]> {
    const { data, error } = await this.supabase
      .from('teacher_contracts')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map((c: Record<string, unknown>) => ({
      id: c.id as string,
      teacherId: c.teacher_id as string,
      schoolId: c.school_id as string,
      contractType: c.contract_type as TeacherContract['contractType'],
      startDate: c.start_date as string,
      endDate: c.end_date as string | undefined,
      salary: c.salary as number | undefined,
      hourlyRate: c.hourly_rate as number | undefined,
      maxHoursPerWeek: c.max_hours_per_week as number | undefined,
      terms: c.terms as string,
      status: c.status as TeacherContract['status'],
      signedAt: c.signed_at as string | undefined,
      terminatedAt: c.terminated_at as string | undefined,
      terminationReason: c.termination_reason as string | undefined,
      documents: c.documents as string[] | undefined,
      createdAt: c.created_at as string,
      updatedAt: c.updated_at as string | undefined,
    }));
  }

  async getEvaluations(teacherId: string): Promise<TeacherEvaluation[]> {
    const { data, error } = await this.supabase
      .from('teacher_evaluations')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map((e: Record<string, unknown>) => ({
      id: e.id as string,
      teacherId: e.teacher_id as string,
      schoolId: e.school_id as string,
      evaluatorId: e.evaluator_id as string,
      evaluationType: e.evaluation_type as TeacherEvaluation['evaluationType'],
      period: e.period as string,
      score: e.score as number | undefined,
      maxScore: e.max_score as number,
      criteria: e.criteria as TeacherEvaluation['criteria'],
      strengths: e.strengths as string[] | undefined,
      improvements: e.improvements as string[] | undefined,
      overallComment: e.overall_comment as string | undefined,
      nextReviewDate: e.next_review_date as string | undefined,
      createdAt: e.created_at as string,
    }));
  }

  async getQualifications(teacherId: string): Promise<TeacherQualification[]> {
    const { data, error } = await this.supabase
      .from('teacher_qualifications')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('graduation_year', { ascending: false });

    if (error) throw error;
    return (data || []).map((q: Record<string, unknown>) => ({
      id: q.id as string,
      teacherId: q.teacher_id as string,
      institution: q.institution as string,
      degree: q.degree as string,
      field: q.field as string,
      graduationYear: q.graduation_year as number,
      grade: q.grade as string | undefined,
      documentUrl: q.document_url as string | undefined,
      verified: q.verified as boolean,
      createdAt: q.created_at as string,
    }));
  }

  async getCertifications(teacherId: string): Promise<TeacherCertification[]> {
    const { data, error } = await this.supabase
      .from('teacher_certifications')
      .select('*')
      .eq('teacher_id', teacherId)
      .order('issue_date', { ascending: false });

    if (error) throw error;
    return (data || []).map((c: Record<string, unknown>) => ({
      id: c.id as string,
      teacherId: c.teacher_id as string,
      name: c.name as string,
      issuingOrganization: c.issuing_organization as string,
      issueDate: c.issue_date as string,
      expiryDate: c.expiry_date as string | undefined,
      certificateNumber: c.certificate_number as string | undefined,
      documentUrl: c.document_url as string | undefined,
      verified: c.verified as boolean,
      createdAt: c.created_at as string,
    }));
  }

  async getPayroll(schoolId: string): Promise<TeacherPayrollSummary[]> {
    const { data: teachers } = await this.supabase
      .from('teachers')
      .select('id, first_name, last_name, matricule, salary, hourly_rate, contract_type, max_weekly_hours')
      .eq('school_id', schoolId)
      .eq('status', 'ACTIVE');

    return (teachers || []).map((t: Record<string, unknown>) => ({
      teacherId: t.id as string,
      teacherName: `${t.first_name} ${t.last_name}`,
      matricule: t.matricule as string,
      baseSalary: (t.salary as number) || 0,
      overtimePay: 0,
      bonuses: 0,
      deductions: 0,
      netPay: (t.salary as number) || 0,
      contractType: t.contract_type as TeacherPayrollSummary['contractType'],
      hoursWorked: 0,
      overtimeHours: 0,
    }));
  }

  async importTeachers(schoolId: string, data: CreateTeacherRequest[]): Promise<{ imported: number; skipped: number; errors: Array<{ row: number; error: string }> }> {
    let imported = 0;
    let skipped = 0;
    const errors: Array<{ row: number; error: string }> = [];

    for (let i = 0; i < data.length; i++) {
      try {
        await this.create(data[i], schoolId);
        imported++;
      } catch (err) {
        errors.push({ row: i + 1, error: err instanceof Error ? err.message : 'Erreur inconnue' });
        skipped++;
      }
    }

    return { imported, skipped, errors };
  }

  async exportTeachers(schoolId: string, filters: TeacherFilters): Promise<Teacher[]> {
    const result = await this.findAll(schoolId, { ...filters, limit: 50000 });
    return result.data;
  }

  private mapTeacher(data: Record<string, unknown>): Teacher {
    return {
      id: data.id as string,
      userId: data.user_id as string,
      schoolId: data.school_id as string,
      matricule: data.matricule as string,
      firstName: data.first_name as string,
      lastName: data.last_name as string,
      dateOfBirth: data.date_of_birth as string | undefined,
      placeOfBirth: data.place_of_birth as string | undefined,
      gender: data.gender as Teacher['gender'],
      address: data.address as string | undefined,
      phone: data.phone as string | undefined,
      email: data.email as string | undefined,
      nationality: data.nationality as string | undefined,
      bloodGroup: data.blood_group as string | undefined,
      employmentType: data.employment_type as Teacher['employmentType'],
      contractType: data.contract_type as Teacher['contractType'],
      grade: data.grade as Teacher['grade'],
      speciality: data.speciality as Teacher['speciality'],
      departmentId: data.department_id as string | undefined,
      hireDate: data.hire_date as string | undefined,
      contractStartDate: data.contract_start_date as string | undefined,
      contractEndDate: data.contract_end_date as string | undefined,
      salary: data.salary as number | undefined,
      hourlyRate: data.hourly_rate as number | undefined,
      maxWeeklyHours: data.max_weekly_hours as number | undefined,
      photoUrl: data.photo_url as string | undefined,
      status: data.status as Teacher['status'],
      isActive: data.is_active as boolean,
      archivedAt: data.archived_at as string | undefined,
      archivedBy: data.archived_by as string | undefined,
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string | undefined,
    };
  }
}
