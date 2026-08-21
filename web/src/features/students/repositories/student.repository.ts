import { createClient } from '@/lib/supabase/client';
import type { StudentRepository, StudentFilters, StudentListResult, Student, StudentStatistics, StudentTimeline, StudentDashboard, StudentImport, StudentExport, StudentMedicalRecord, StudentGuardian, StudentPromotion, StudentTransfer, StudentAttendanceSummary, StudentGradeSummary, StudentPaymentSummary, CreateStudentRequest, UpdateStudentRequest } from '../types';
import { StudentNotFoundError, StudentAlreadyExistsError, StudentArchiveError, StudentRestoreError, StudentDeleteError, StudentImportError } from '@educi/errors';
import { logger } from '@educi/logger';

function generateMatricule(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `STU${year}${random}`;
}

export function createStudentRepository(): StudentRepository {
  const supabase = createClient();

  return {
    async create(data: CreateStudentRequest, schoolId: string): Promise<Student> {
      if (data.email) {
        const exists = await this.exists(schoolId, { email: data.email });
        if (exists) throw new StudentAlreadyExistsError('email', data.email);
      }

      const matricule = generateMatricule();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email || `${matricule.toLowerCase()}@educi.local`,
        password: data.email ? `${data.firstName.toLowerCase()}${data.lastName.toLowerCase()}${Date.now()}` : `${data.firstName.toLowerCase()}${Date.now()}`,
        options: {
          data: {
            name: `${data.firstName} ${data.lastName}`,
            role: 'ELEVE',
            school_id: schoolId,
          },
        },
      });

      if (authError) {
        logger.error('Failed to create student user', { error: authError.message }, 'students');
        throw new StudentAlreadyExistsError('email', data.email || matricule);
      }

      const { data: student, error } = await supabase
        .from('students')
        .insert({
          user_id: authData?.user?.id || '',
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
          nationality: data.nationality || 'Ivoirienne',
          blood_group: data.bloodGroup || 'UNKNOWN',
          class_id: data.classId || null,
          parent_id: data.parentId || null,
          enrollment_date: data.enrollmentDate || new Date().toISOString(),
          emergency_contact_name: data.emergencyContactName || null,
          emergency_contact_phone: data.emergencyContactPhone || null,
          emergency_contact_relation: data.emergencyContactRelation || null,
          allergies: data.allergies || null,
          series: data.series || null,
          level: data.level || null,
          status: 'ACTIVE',
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        logger.error('Failed to create student', { error: error.message }, 'students');
        throw new StudentAlreadyExistsError('matricule', matricule);
      }

      logger.info('Student created', { studentId: student.id, matricule }, 'students');
      return student as unknown as Student;
    },

    async update(id: string, data: UpdateStudentRequest): Promise<Student> {
      const existing = await this.findById(id);
      if (!existing) throw new StudentNotFoundError(id);

      const updateData: Record<string, unknown> = {};
      if (data.firstName !== undefined) updateData.first_name = data.firstName;
      if (data.lastName !== undefined) updateData.last_name = data.lastName;
      if (data.email !== undefined) updateData.email = data.email || null;
      if (data.phone !== undefined) updateData.phone = data.phone || null;
      if (data.dateOfBirth !== undefined) updateData.date_of_birth = data.dateOfBirth || null;
      if (data.placeOfBirth !== undefined) updateData.place_of_birth = data.placeOfBirth || null;
      if (data.gender !== undefined) updateData.gender = data.gender;
      if (data.address !== undefined) updateData.address = data.address || null;
      if (data.nationality !== undefined) updateData.nationality = data.nationality;
      if (data.bloodGroup !== undefined) updateData.blood_group = data.bloodGroup;
      if (data.classId !== undefined) updateData.class_id = data.classId;
      if (data.parentId !== undefined) updateData.parent_id = data.parentId;
      if (data.emergencyContactName !== undefined) updateData.emergency_contact_name = data.emergencyContactName || null;
      if (data.emergencyContactPhone !== undefined) updateData.emergency_contact_phone = data.emergencyContactPhone || null;
      if (data.emergencyContactRelation !== undefined) updateData.emergency_contact_relation = data.emergencyContactRelation || null;
      if (data.allergies !== undefined) updateData.allergies = data.allergies || null;
      if (data.series !== undefined) updateData.series = data.series || null;
      if (data.level !== undefined) updateData.level = data.level || null;
      if (data.status !== undefined) updateData.status = data.status;

      if (Object.keys(updateData).length === 0) throw new StudentNotFoundError(id);

      updateData.updated_at = new Date().toISOString();

      const { data: student, error } = await supabase
        .from('students')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Failed to update student', { studentId: id, error: error.message }, 'students');
        throw new StudentNotFoundError(id);
      }

      logger.info('Student updated', { studentId: id }, 'students');
      return student as unknown as Student;
    },

    async archive(id: string): Promise<void> {
      const existing = await this.findById(id);
      if (!existing) throw new StudentNotFoundError(id);

      const { error } = await supabase
        .from('students')
        .update({ status: 'ARCHIVED', is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        logger.error('Failed to archive student', { studentId: id, error: error.message }, 'students');
        throw new StudentArchiveError();
      }

      logger.info('Student archived', { studentId: id }, 'students');
    },

    async restore(id: string): Promise<void> {
      const existing = await this.findById(id);
      if (!existing) throw new StudentNotFoundError(id);

      const { error } = await supabase
        .from('students')
        .update({ status: 'ACTIVE', is_active: true, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        logger.error('Failed to restore student', { studentId: id, error: error.message }, 'students');
        throw new StudentRestoreError();
      }

      logger.info('Student restored', { studentId: id }, 'students');
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Failed to delete student', { studentId: id, error: error.message }, 'students');
        throw new StudentDeleteError();
      }

      logger.info('Student deleted', { studentId: id }, 'students');
    },

    async findById(id: string): Promise<Student | null> {
      const { data, error } = await supabase
        .from('students')
        .select('*, user:users(id, name, email, photo_url), class:classes(id, name, level), parent:users!parent_id(id, name)')
        .eq('id', id)
        .single();

      if (error || !data) return null;
      return data as unknown as Student;
    },

    async findByMatricule(matricule: string): Promise<Student | null> {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('matricule', matricule)
        .single();

      if (error || !data) return null;
      return data as unknown as Student;
    },

    async findByUserId(userId: string): Promise<Student | null> {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', userId)
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
        .select('*, user:users(id, name, email, photo_url), class:classes(id, name, level)', { count: 'exact' })
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

      if (filters.classId) {
        query = query.eq('class_id', filters.classId);
      }

      if (filters.levelId) {
        query = query.eq('level_id', filters.levelId);
      }

      const sortBy = filters.sortBy || 'created_at';
      const sortOrder = filters.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Failed to list students', { schoolId, error: error.message }, 'students');
        return { data: [], total: 0, page, limit, totalPages: 0 };
      }

      return {
        data: (data as unknown as Student[]) || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      };
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

    async uploadPhoto(studentId: string, file: File): Promise<string> {
      const fileExt = file.name.split('.').pop();
      const filePath = `students/${studentId}/photo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('student-assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        logger.error('Failed to upload student photo', { studentId, error: uploadError.message }, 'students');
        throw new StudentNotFoundError(studentId);
      }

      const { data: urlData } = supabase.storage
        .from('student-assets')
        .getPublicUrl(filePath);

      await supabase
        .from('students')
        .update({ photo_url: urlData.publicUrl, updated_at: new Date().toISOString() })
        .eq('id', studentId);

      logger.info('Student photo uploaded', { studentId }, 'students');
      return urlData.publicUrl;
    },

    async generateQRCode(studentId: string): Promise<string> {
      const code = `EDUCI-STU-${studentId.slice(0, 8)}-${Date.now()}`;
      logger.info('QR Code generated', { studentId, code }, 'students');
      return code;
    },

    async generateCard(studentId: string): Promise<string> {
      const student = await this.findById(studentId);
      if (!student) throw new StudentNotFoundError(studentId);
      logger.info('Student card generated', { studentId }, 'students');
      return `card-${studentId}`;
    },

    async getTimeline(studentId: string, limit = 50): Promise<StudentTimeline[]> {
      const { data, error } = await supabase
        .from('student_timeline')
        .select('*')
        .eq('student_id', studentId)
        .order('date', { ascending: false })
        .limit(limit);

      if (error || !data) return [];
      return data as unknown as StudentTimeline[];
    },

    async getStatistics(schoolId: string): Promise<StudentStatistics> {
      const { data: students } = await supabase
        .from('students')
        .select('status, gender, level, created_at')
        .eq('school_id', schoolId);

      const list = (students as unknown as Array<Record<string, unknown>>) || [];
      const active = list.filter((s) => s.status === 'ACTIVE');
      const now = new Date();
      const thisMonth = list.filter((s) => {
        const d = new Date(s.created_at as string);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });

      return {
        schoolId,
        totalStudents: list.length,
        activeStudents: active.length,
        inactiveStudents: list.length - active.length,
        newStudents: thisMonth.length,
        boys: list.filter((s) => s.gender === 'M').length,
        girls: list.filter((s) => s.gender === 'F').length,
        byAge: {},
        byLevel: list.reduce((acc: Record<string, number>, s) => {
          const level = (s.level as string) || 'Non défini';
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {}),
        byClass: {},
        byStatus: list.reduce((acc: Record<string, number>, s) => {
          const status = (s.status as string) || 'ACTIVE';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {}),
        transfers: list.filter((s) => s.status === 'TRANSFERRED').length,
        promotions: 0,
        repetitions: 0,
        archived: list.filter((s) => s.status === 'ARCHIVED').length,
      };
    },

    async getDashboard(schoolId: string): Promise<StudentDashboard> {
      const stats = await this.getStatistics(schoolId);
      const timeline = await this.getTimeline(schoolId, 10);

      return {
        totalStudents: stats.totalStudents,
        newThisMonth: stats.newStudents,
        activeToday: stats.activeStudents,
        pendingPayments: 0,
        attendanceRate: 0,
        recentActivity: timeline,
        topPerformers: [],
        lowAttendance: [],
      };
    },

    async importStudents(schoolId: string, data: CreateStudentRequest[]): Promise<StudentImport> {
      const importId = `import-${Date.now()}`;
      let successful = 0;
      let failed = 0;
      const errors: Array<{ row: number; field: string; message: string }> = [];

      for (let i = 0; i < data.length; i++) {
        try {
          await this.create(data[i], schoolId);
          successful++;
        } catch (err) {
          failed++;
          errors.push({
            row: i + 1,
            field: 'general',
            message: err instanceof Error ? err.message : 'Erreur inconnue',
          });
        }
      }

      logger.info('Students imported', { schoolId, total: data.length, successful, failed }, 'students');

      return {
        id: importId,
        schoolId,
        fileName: 'import.csv',
        status: failed === 0 ? 'COMPLETED' : 'PARTIAL',
        totalRows: data.length,
        processedRows: successful + failed,
        successfulRows: successful,
        failedRows: failed,
        errors: errors.length > 0 ? errors : undefined,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
    },

    async exportStudents(schoolId: string, filters: StudentFilters, format: string): Promise<StudentExport> {
      const exportId = `export-${Date.now()}`;
      const result = await this.findAll(schoolId, { ...filters, limit: 50000 });

      logger.info('Students exported', { schoolId, format, count: result.total }, 'students');

      return {
        id: exportId,
        schoolId,
        format: format as 'PDF' | 'EXCEL' | 'CSV' | 'JSON',
        status: 'COMPLETED',
        rowCount: result.total,
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
    },

    async getMedicalRecord(studentId: string): Promise<StudentMedicalRecord | null> {
      const { data, error } = await supabase
        .from('student_medical_records')
        .select('*')
        .eq('student_id', studentId)
        .single();

      if (error || !data) return null;
      return data as unknown as StudentMedicalRecord;
    },

    async updateMedicalRecord(studentId: string, data: Partial<StudentMedicalRecord>): Promise<void> {
      const { error } = await supabase
        .from('student_medical_records')
        .upsert({ student_id: studentId, ...data, updated_at: new Date().toISOString() });

      if (error) {
        logger.error('Failed to update medical record', { studentId, error: error.message }, 'students');
        throw new StudentNotFoundError(studentId);
      }
    },

    async getGuardians(studentId: string): Promise<StudentGuardian[]> {
      const { data, error } = await supabase
        .from('student_guardians')
        .select('*')
        .eq('student_id', studentId);

      if (error || !data) return [];
      return data as unknown as StudentGuardian[];
    },

    async addGuardian(studentId: string, guardian: Omit<StudentGuardian, 'id' | 'studentId'>): Promise<StudentGuardian> {
      const { data, error } = await supabase
        .from('student_guardians')
        .insert({ student_id: studentId, ...guardian })
        .select()
        .single();

      if (error) {
        logger.error('Failed to add guardian', { studentId, error: error.message }, 'students');
        throw new StudentNotFoundError(studentId);
      }

      return data as unknown as StudentGuardian;
    },

    async removeGuardian(guardianId: string): Promise<void> {
      const { error } = await supabase
        .from('student_guardians')
        .delete()
        .eq('id', guardianId);

      if (error) {
        logger.error('Failed to remove guardian', { guardianId, error: error.message }, 'students');
        throw new StudentNotFoundError(guardianId);
      }
    },

    async promote(studentId: string, data: Omit<StudentPromotion, 'id' | 'studentId'>): Promise<StudentPromotion> {
      const { data: promotion, error } = await supabase
        .from('student_promotions')
        .insert({ student_id: studentId, ...data })
        .select()
        .single();

      if (error) {
        logger.error('Failed to promote student', { studentId, error: error.message }, 'students');
        throw new StudentNotFoundError(studentId);
      }

      await supabase
        .from('students')
        .update({ class_id: data.toClassId, updated_at: new Date().toISOString() })
        .eq('id', studentId);

      logger.info('Student promoted', { studentId, type: data.type }, 'students');
      return promotion as unknown as StudentPromotion;
    },

    async transfer(studentId: string, data: Omit<StudentTransfer, 'id' | 'studentId'>): Promise<StudentTransfer> {
      const { data: transfer, error } = await supabase
        .from('student_transfers')
        .insert({ student_id: studentId, ...data })
        .select()
        .single();

      if (error) {
        logger.error('Failed to transfer student', { studentId, error: error.message }, 'students');
        throw new StudentNotFoundError(studentId);
      }

      await supabase
        .from('students')
        .update({ status: 'TRANSFERRED', is_active: false, updated_at: new Date().toISOString() })
        .eq('id', studentId);

      logger.info('Student transferred', { studentId }, 'students');
      return transfer as unknown as StudentTransfer;
    },

    async getAttendanceSummary(studentId: string, academicYearId: string): Promise<StudentAttendanceSummary> {
      return {
        studentId,
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
        lateDays: 0,
        excusedDays: 0,
        attendanceRate: 0,
      };
    },

    async getGradeSummary(studentId: string, academicYearId: string): Promise<StudentGradeSummary> {
      return {
        studentId,
        academicYearId,
        subjects: [],
        overallAverage: 0,
        overallRank: 0,
        totalStudents: 0,
      };
    },

    async getPaymentSummary(studentId: string): Promise<StudentPaymentSummary> {
      return {
        studentId,
        totalFees: 0,
        totalPaid: 0,
        totalPending: 0,
        totalOverdue: 0,
        currency: 'XOF',
      };
    },

    async exists(schoolId: string, filters: { email?: string; matricule?: string }): Promise<boolean> {
      let query = supabase.from('students').select('id').eq('school_id', schoolId).limit(1);

      if (filters.email) {
        query = query.eq('email', filters.email);
      }
      if (filters.matricule) {
        query = query.eq('matricule', filters.matricule);
      }

      const { data } = await query;
      return !!data && data.length > 0;
    },
  };
}
