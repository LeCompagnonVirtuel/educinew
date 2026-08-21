import { supabase } from '../../services/supabase';
import type { School, SchoolCreationRequest, SchoolUpdateRequest, SchoolStatistics, SchoolSettings } from '@educi/types';
import { logger } from '@educi/logger';

export interface MobileSchoolRepository {
  findById(id: string): Promise<School | null>;
  findBySchoolId(schoolId: string): Promise<School | null>;
  findAll(filters?: { search?: string; page?: number; limit?: number }): Promise<{ data: School[]; total: number; page: number; limit: number }>;
  create(data: SchoolCreationRequest): Promise<School>;
  update(id: string, data: SchoolUpdateRequest): Promise<School>;
  archive(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  uploadLogo(schoolId: string, fileUri: string, fileName: string, mimeType: string): Promise<string>;
  getSettings(schoolId: string): Promise<SchoolSettings | null>;
  updateSettings(schoolId: string, settings: Partial<SchoolSettings>): Promise<void>;
  getStatistics(schoolId: string): Promise<SchoolStatistics>;
}

export function createMobileSchoolRepository(): MobileSchoolRepository {
  return {
    async findById(id: string): Promise<School | null> {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) return null;
      return data as unknown as School;
    },

    async findBySchoolId(schoolId: string): Promise<School | null> {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', schoolId)
        .single();

      if (error || !data) return null;
      return data as unknown as School;
    },

    async findAll(filters?: { search?: string; page?: number; limit?: number }): Promise<{ data: School[]; total: number; page: number; limit: number }> {
      const page = filters?.page || 1;
      const limit = filters?.limit || 20;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('schools')
        .select('*', { count: 'exact' });

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      query = query.order('created_at', { ascending: false });
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Mobile: Failed to list schools', { error: error.message }, 'schools');
        return { data: [], total: 0, page, limit };
      }

      return {
        data: (data as unknown as School[]) || [],
        total: count || 0,
        page,
        limit,
      };
    },

    async create(data: SchoolCreationRequest): Promise<School> {
      const { data: school, error } = await supabase
        .from('schools')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          address: data.address || null,
          city: data.city || null,
          region: data.region || null,
          country: data.country || "Côte d'Ivoire",
          website: data.website || null,
          sigle: data.sigle || null,
          slogan: data.slogan || null,
          description: data.description || null,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        logger.error('Mobile: Failed to create school', { error: error.message }, 'schools');
        throw new Error(error.message);
      }

      logger.info('Mobile: School created', { schoolId: school.id }, 'schools');
      return school as unknown as School;
    },

    async update(id: string, data: SchoolUpdateRequest): Promise<School> {
      const updateData: Record<string, unknown> = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.email !== undefined) updateData.email = data.email;
      if (data.phone !== undefined) updateData.phone = data.phone || null;
      if (data.address !== undefined) updateData.address = data.address || null;
      if (data.city !== undefined) updateData.city = data.city || null;
      if (data.region !== undefined) updateData.region = data.region || null;
      if (data.country !== undefined) updateData.country = data.country;
      if (data.website !== undefined) updateData.website = data.website || null;
      if (data.sigle !== undefined) updateData.sigle = data.sigle || null;
      if (data.slogan !== undefined) updateData.slogan = data.slogan || null;
      if (data.description !== undefined) updateData.description = data.description || null;
      if (data.latitude !== undefined) updateData.latitude = data.latitude;
      if (data.longitude !== undefined) updateData.longitude = data.longitude;
      if (data.checkinRadius !== undefined) updateData.checkin_radius = data.checkinRadius;
      if (data.primaryColor !== undefined) updateData.primary_color = data.primaryColor || null;
      if (data.secondaryColor !== undefined) updateData.secondary_color = data.secondaryColor || null;
      if (data.accentColor !== undefined) updateData.accent_color = data.accentColor || null;

      if (Object.keys(updateData).length === 0) {
        throw new Error('Aucun champ à modifier');
      }

      updateData.updated_at = new Date().toISOString();

      const { data: school, error } = await supabase
        .from('schools')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Mobile: Failed to update school', { schoolId: id, error: error.message }, 'schools');
        throw new Error(error.message);
      }

      logger.info('Mobile: School updated', { schoolId: id }, 'schools');
      return school as unknown as School;
    },

    async archive(id: string): Promise<void> {
      const { error } = await supabase
        .from('schools')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        logger.error('Mobile: Failed to archive school', { schoolId: id, error: error.message }, 'schools');
        throw new Error(error.message);
      }

      logger.info('Mobile: School archived', { schoolId: id }, 'schools');
    },

    async restore(id: string): Promise<void> {
      const { error } = await supabase
        .from('schools')
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        logger.error('Mobile: Failed to restore school', { schoolId: id, error: error.message }, 'schools');
        throw new Error(error.message);
      }

      logger.info('Mobile: School restored', { schoolId: id }, 'schools');
    },

    async uploadLogo(schoolId: string, fileUri: string, fileName: string, mimeType: string): Promise<string> {
      const fileExt = fileName.split('.').pop();
      const filePath = `schools/${schoolId}/logo.${fileExt}`;

      const response = await fetch(fileUri);
      const blob = await response.blob();

      const { error: uploadError } = await supabase.storage
        .from('school-assets')
        .upload(filePath, blob, { upsert: true, contentType: mimeType });

      if (uploadError) {
        logger.error('Mobile: Failed to upload logo', { schoolId, error: uploadError.message }, 'schools');
        throw new Error('Erreur lors de l\'upload du logo');
      }

      const { data: urlData } = supabase.storage
        .from('school-assets')
        .getPublicUrl(filePath);

      await supabase
        .from('schools')
        .update({ logo_url: urlData.publicUrl, updated_at: new Date().toISOString() })
        .eq('id', schoolId);

      logger.info('Mobile: Logo uploaded', { schoolId, path: filePath }, 'schools');
      return urlData.publicUrl;
    },

    async getSettings(schoolId: string): Promise<SchoolSettings | null> {
      const { data, error } = await supabase
        .from('schools')
        .select('language, timezone, currency, grading_system, passing_grade, academic_year, checkin_radius')
        .eq('id', schoolId)
        .single();

      if (error || !data) return null;

      return {
        language: data.language || 'fr',
        timezone: data.timezone || 'Africa/Abidjan',
        currency: data.currency || 'XOF',
        dateFormat: 'DD/MM/YYYY',
        gradingSystem: data.grading_system || '20',
        passingGrade: data.passing_grade || 10,
        academicYear: data.academic_year || '2025-2026',
        checkinRadius: data.checkin_radius || 100,
        notifications: {},
        paymentSettings: {},
        academicSettings: {},
      };
    },

    async updateSettings(schoolId: string, settings: Partial<SchoolSettings>): Promise<void> {
      const updateData: Record<string, unknown> = {};
      if (settings.language) updateData.language = settings.language;
      if (settings.timezone) updateData.timezone = settings.timezone;
      if (settings.currency) updateData.currency = settings.currency;
      if (settings.gradingSystem) updateData.grading_system = settings.gradingSystem;
      if (settings.passingGrade !== undefined) updateData.passing_grade = settings.passingGrade;
      if (settings.academicYear) updateData.academic_year = settings.academicYear;
      if (settings.checkinRadius !== undefined) updateData.checkin_radius = settings.checkinRadius;

      if (Object.keys(updateData).length === 0) return;

      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from('schools')
        .update(updateData)
        .eq('id', schoolId);

      if (error) {
        logger.error('Mobile: Failed to update school settings', { schoolId, error: error.message }, 'schools');
        throw new Error(error.message);
      }

      logger.info('Mobile: School settings updated', { schoolId }, 'schools');
    },

    async getStatistics(schoolId: string): Promise<SchoolStatistics> {
      const [students, teachers, classes, parents, staff] = await Promise.all([
        supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('teachers').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('classes').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('users').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('role', 'PARENT'),
        supabase.from('users').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('role', 'STAFF'),
      ]);

      return {
        studentsCount: students.count || 0,
        teachersCount: teachers.count || 0,
        classesCount: classes.count || 0,
        parentsCount: parents.count || 0,
        staffCount: staff.count || 0,
        activeUsers: 0,
        storageUsedMb: 0,
      };
    },
  };
}
