import { supabase } from '../../services/supabase';
import type { Student, StudentFilters, StudentListResult, CreateStudentRequest, UpdateStudentRequest, StudentStatistics } from '@educi/types';
import { logger } from '@educi/logger';

export interface MobileStudentRepository {
  create(data: CreateStudentRequest, schoolId: string): Promise<Student>;
  update(id: string, data: UpdateStudentRequest): Promise<Student>;
  archive(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Student | null>;
  findAll(schoolId: string, filters: StudentFilters): Promise<StudentListResult>;
  search(schoolId: string, query: string, limit?: number): Promise<Student[]>;
  uploadPhoto(studentId: string, fileUri: string, fileName: string, mimeType: string): Promise<string>;
  getStatistics(schoolId: string): Promise<StudentStatistics>;
}

export function createMobileStudentRepository(): MobileStudentRepository {
  return {
    async create(data: CreateStudentRequest, schoolId: string): Promise<Student> {
      const matricule = `STU${new Date().getFullYear().toString().slice(-2)}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const { data: student, error } = await supabase
        .from('students')
        .insert({
          user_id: '',
          school_id: schoolId,
          matricule,
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: data.dateOfBirth || null,
          gender: data.gender || null,
          address: data.address || null,
          phone: data.phone || null,
          email: data.email || null,
          class_id: data.classId || null,
          status: 'ACTIVE',
          is_active: true,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      logger.info('Mobile: Student created', { studentId: student.id }, 'students');
      return student as unknown as Student;
    },

    async update(id: string, data: UpdateStudentRequest): Promise<Student> {
      const updateData: Record<string, unknown> = {};
      if (data.firstName !== undefined) updateData.first_name = data.firstName;
      if (data.lastName !== undefined) updateData.last_name = data.lastName;
      if (data.classId !== undefined) updateData.class_id = data.classId;
      if (data.status !== undefined) updateData.status = data.status;

      if (Object.keys(updateData).length === 0) throw new Error('Aucun champ à modifier');

      updateData.updated_at = new Date().toISOString();

      const { data: student, error } = await supabase
        .from('students')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return student as unknown as Student;
    },

    async archive(id: string): Promise<void> {
      const { error } = await supabase
        .from('students')
        .update({ status: 'ARCHIVED', is_active: false })
        .eq('id', id);
      if (error) throw new Error(error.message);
    },

    async restore(id: string): Promise<void> {
      const { error } = await supabase
        .from('students')
        .update({ status: 'ACTIVE', is_active: true })
        .eq('id', id);
      if (error) throw new Error(error.message);
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },

    async findById(id: string): Promise<Student | null> {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !data) return null;
      return data as unknown as Student;
    },

    async findAll(schoolId: string, filters: StudentFilters): Promise<StudentListResult> {
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('students')
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId);

      if (filters.search) {
        query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`);
      }

      query = query.range(offset, offset + limit - 1);
      const { data, error, count } = await query;

      if (error) return { data: [], total: 0, page, limit, totalPages: 0 };
      return { data: (data as unknown as Student[]) || [], total: count || 0, page, limit, totalPages: Math.ceil((count || 0) / limit) };
    },

    async search(schoolId: string, query: string, limit = 20): Promise<Student[]> {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('school_id', schoolId)
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,matricule.ilike.%${query}%`)
        .limit(limit);
      if (error || !data) return [];
      return data as unknown as Student[];
    },

    async uploadPhoto(studentId: string, fileUri: string, fileName: string, mimeType: string): Promise<string> {
      const fileExt = fileName.split('.').pop();
      const filePath = `students/${studentId}/photo.${fileExt}`;

      const response = await fetch(fileUri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('student-assets')
        .upload(filePath, blob, { upsert: true, contentType: mimeType });

      if (uploadError) throw new Error(uploadError.message);

      const { data: urlData } = supabase.storage.from('student-assets').getPublicUrl(filePath);
      await supabase.from('students').update({ photo_url: urlData.publicUrl }).eq('id', studentId);

      return urlData.publicUrl;
    },

    async getStatistics(schoolId: string): Promise<StudentStatistics> {
      const { data: students } = await supabase
        .from('students')
        .select('status, gender, level')
        .eq('school_id', schoolId);

      const list = (students as unknown as Array<Record<string, unknown>>) || [];
      return {
        schoolId,
        totalStudents: list.length,
        activeStudents: list.filter((s) => s.status === 'ACTIVE').length,
        inactiveStudents: list.filter((s) => s.status !== 'ACTIVE').length,
        newStudents: 0,
        boys: list.filter((s) => s.gender === 'M').length,
        girls: list.filter((s) => s.gender === 'F').length,
        byAge: {},
        byLevel: {},
        byClass: {},
        byStatus: {},
        transfers: 0,
        promotions: 0,
        repetitions: 0,
        archived: 0,
      };
    },
  };
}
