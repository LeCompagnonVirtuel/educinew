import { createClient } from '@supabase/supabase-js';

export class HrMobileRepository {
  private readonly supabase: ReturnType<typeof createClient>;
  constructor(supabase: ReturnType<typeof createClient>) { this.supabase = supabase; }

  async findEmployee(id: string) {
    const { data, error } = await this.supabase.from('employees').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllEmployees(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('employees').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.department) query = query.eq('department', filters.department);
    if (filters?.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createEmployee(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('employees').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateEmployee(id: string, data: Record<string, unknown>) {
    const { data: result, error } = await this.supabase.from('employees').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async deleteEmployee(id: string) {
    const { error } = await this.supabase.from('employees').delete().eq('id', id);
    if (error) throw error;
  }

  async findDepartment(id: string) {
    const { data, error } = await this.supabase.from('departments').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllDepartments(schoolId: string) {
    const { data, error } = await this.supabase.from('departments').select('*').eq('school_id', schoolId).order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async createDepartment(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('departments').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateDepartment(id: string, data: Record<string, unknown>) {
    const { data: result, error } = await this.supabase.from('departments').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findLeave(id: string) {
    const { data, error } = await this.supabase.from('leaves').select('*, employees(first_name, last_name)').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllLeaves(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('leaves').select('*, employees(first_name, last_name)', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.employeeId) query = query.eq('employee_id', filters.employeeId);
    if (filters?.leaveType) query = query.eq('leave_type', filters.leaveType);
    const { data, error, count } = await query.order('created_at', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createLeave(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('leaves').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updateLeaveStatus(id: string, status: string, approvedBy: string) {
    const { data: result, error } = await this.supabase.from('leaves').update({ status, approved_by: approvedBy, approved_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async findAttendance(id: string) {
    const { data, error } = await this.supabase.from('attendance').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllAttendance(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('attendance').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.employeeId) query = query.eq('employee_id', filters.employeeId);
    if (filters?.date) query = query.eq('date', filters.date);
    if (filters?.startDate) query = query.gte('date', filters.startDate);
    if (filters?.endDate) query = query.lte('date', filters.endDate);
    const { data, error, count } = await query.order('date', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async clockIn(employeeId: string, method: string, latitude?: number, longitude?: number) {
    const { data: result, error } = await this.supabase.from('attendance').insert({ employee_id: employeeId, check_in: new Date().toISOString(), method, latitude, longitude, status: 'PRESENT' }).select().single();
    if (error) throw error;
    return result;
  }

  async clockOut(employeeId: string) {
    const { data: result, error } = await this.supabase.from('attendance').update({ check_out: new Date().toISOString() }).eq('employee_id', employeeId).is('check_out', null).select().single();
    if (error) throw error;
    return result;
  }

  async getTodayAttendance(employeeId: string) {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await this.supabase.from('attendance').select('*').eq('employee_id', employeeId).eq('date', today).single();
    if (error || !data) return null;
    return data;
  }

  async findTraining(id: string) {
    const { data, error } = await this.supabase.from('trainings').select('*').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllTrainings(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('trainings').select('*', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.type) query = query.eq('type', filters.type);
    const { data, error, count } = await query.order('start_date', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createTraining(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('trainings').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async enrollTraining(trainingId: string, employeeId: string) {
    const { data: result, error } = await this.supabase.from('training_enrollments').insert({ training_id: trainingId, employee_id: employeeId, enrolled_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    return result;
  }

  async findPerformanceReview(id: string) {
    const { data, error } = await this.supabase.from('performance_reviews').select('*, employees(first_name, last_name)').eq('id', id).single();
    if (error || !data) return null;
    return data;
  }

  async findAllPerformanceReviews(schoolId: string, filters?: Record<string, unknown>) {
    let query = this.supabase.from('performance_reviews').select('*, employees(first_name, last_name)', { count: 'exact' }).eq('school_id', schoolId);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.employeeId) query = query.eq('employee_id', filters.employeeId);
    const { data, error, count } = await query.order('review_date', { ascending: false }).limit((filters?.limit as number) || 20);
    if (error) throw error;
    return { data: data || [], total: count || 0 };
  }

  async createPerformanceReview(data: Record<string, unknown>, schoolId: string) {
    const { data: result, error } = await this.supabase.from('performance_reviews').insert({ ...data, school_id: schoolId }).select().single();
    if (error) throw error;
    return result;
  }

  async updatePerformanceReview(id: string, data: Record<string, unknown>) {
    const { data: result, error } = await this.supabase.from('performance_reviews').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (error) throw error;
    return result;
  }

  async getDashboard(schoolId: string) {
    const { data: employees } = await this.supabase.from('employees').select('id, status').eq('school_id', schoolId);
    const { data: leaves } = await this.supabase.from('leaves').select('id, status').eq('school_id', schoolId);
    const { data: trainings } = await this.supabase.from('trainings').select('id, status').eq('school_id', schoolId);
    const { data: reviews } = await this.supabase.from('performance_reviews').select('id, status').eq('school_id', schoolId);

    const totalEmployees = employees?.length || 0;
    const activeEmployees = employees?.filter(e => e.status === 'ACTIVE').length || 0;
    const onLeave = employees?.filter(e => e.status === 'ON_LEAVE').length || 0;
    const pendingLeaves = leaves?.filter(l => l.status === 'PENDING').length || 0;
    const upcomingTrainings = trainings?.filter(t => t.status === 'UPCOMING').length || 0;
    const pendingReviews = reviews?.filter(r => r.status === 'PENDING').length || 0;

    return {
      total_employees: totalEmployees,
      active_employees: activeEmployees,
      on_leave: onLeave,
      pending_leaves: pendingLeaves,
      upcoming_trainings: upcomingTrainings,
      pending_reviews: pendingReviews,
    };
  }

  async searchEmployees(schoolId: string, query: string) {
    const { data, error } = await this.supabase.from('employees').select('*').eq('school_id', schoolId).or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`).limit(20);
    if (error) throw error;
    return { data: data || [], total: data?.length || 0 };
  }
}