import { createClient } from '@/lib/supabase/client';
import type { SchoolRepository, SchoolFilters, SchoolListResult } from '../types';
import type { School, SchoolSettings, SchoolBranding, SchoolStatistics, SchoolStatus, SchoolCreationRequest, SchoolUpdateRequest } from '@educi/types';
import { SchoolNotFoundError, SchoolSlugConflictError, SchoolLogoError, SchoolArchiveError, SchoolRestoreError, SchoolDeleteError, ConflictError } from '@educi/errors';
import { logger } from '@educi/logger';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function createSchoolRepository(): SchoolRepository {
  const supabase = createClient();

  return {
    async create(data: SchoolCreationRequest): Promise<School> {
      const slug = generateSlug(data.name);

      const { data: existingName } = await supabase
        .from('schools')
        .select('id')
        .eq('name', data.name)
        .limit(1);

      if (existingName && existingName.length > 0) {
        throw new ConflictError(`Le nom "${data.name}" est déjà utilisé par un autre établissement`);
      }

      const { data: existingEmail } = await supabase
        .from('schools')
        .select('id')
        .eq('email', data.email)
        .limit(1);

      if (existingEmail && existingEmail.length > 0) {
        throw new ConflictError(`L'email "${data.email}" est déjà utilisé par un autre établissement`);
      }

      const { data: school, error } = await supabase
        .from('schools')
        .insert({
          name: data.name,
          email: data.email,
          slug,
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
        logger.error('Failed to create school', { error: error.message }, 'schools');
        if (error.code === '23505') {
          throw new SchoolSlugConflictError(slug);
        }
        throw error;
      }

      logger.info('School created', { schoolId: school.id, name: school.name }, 'schools');
      return school as unknown as School;
    },

    async update(id: string, data: SchoolUpdateRequest): Promise<School> {
      const { data: existing } = await supabase
        .from('schools')
        .select('id')
        .eq('id', id)
        .single();

      if (!existing) {
        throw new SchoolNotFoundError(id);
      }

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
        throw new SchoolNotFoundError(id);
      }

      updateData.updated_at = new Date().toISOString();

      const { data: school, error } = await supabase
        .from('schools')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Failed to update school', { schoolId: id, error: error.message }, 'schools');
        throw new SchoolNotFoundError(id);
      }

      logger.info('School updated', { schoolId: id }, 'schools');
      return school as unknown as School;
    },

    async archive(id: string): Promise<void> {
      const { data: school } = await supabase
        .from('schools')
        .select('id, is_active')
        .eq('id', id)
        .single();

      if (!school) throw new SchoolNotFoundError(id);
      if (!school.is_active) throw new SchoolArchiveError('Cet établissement est déjà archivé');

      const { error } = await supabase
        .from('schools')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        logger.error('Failed to archive school', { schoolId: id, error: error.message }, 'schools');
        throw new SchoolArchiveError();
      }

      logger.info('School archived', { schoolId: id }, 'schools');
    },

    async restore(id: string): Promise<void> {
      const { data: school } = await supabase
        .from('schools')
        .select('id, is_active')
        .eq('id', id)
        .single();

      if (!school) throw new SchoolNotFoundError(id);
      if (school.is_active) throw new SchoolRestoreError('Cet établissement est déjà actif');

      const { error } = await supabase
        .from('schools')
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        logger.error('Failed to restore school', { schoolId: id, error: error.message }, 'schools');
        throw new SchoolRestoreError();
      }

      logger.info('School restored', { schoolId: id }, 'schools');
    },

    async delete(id: string): Promise<void> {
      const { data: school } = await supabase
        .from('schools')
        .select('id')
        .eq('id', id)
        .single();

      if (!school) throw new SchoolNotFoundError(id);

      const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Failed to delete school', { schoolId: id, error: error.message }, 'schools');
        throw new SchoolDeleteError();
      }

      logger.info('School deleted', { schoolId: id }, 'schools');
    },

    async findById(id: string): Promise<School | null> {
      const { data, error } = await supabase
        .from('schools')
        .select(`
          *,
          students(count),
          teachers(count),
          classes(count)
        `)
        .eq('id', id)
        .single();

      if (error || !data) return null;

      const school = data as unknown as School & {
        students?: Array<{ count: number }>;
        teachers?: Array<{ count: number }>;
        classes?: Array<{ count: number }>;
      };

      return {
        ...school,
        _count: {
          students: school.students?.[0]?.count ?? 0,
          teachers: school.teachers?.[0]?.count ?? 0,
          classes: school.classes?.[0]?.count ?? 0,
        },
      } as School;
    },

    async findBySlug(slug: string): Promise<School | null> {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .ilike('name', slug.replace(/-/g, ' '))
        .single();

      if (error || !data) return null;
      return data as unknown as School;
    },

    async findAll(filters: SchoolFilters): Promise<SchoolListResult> {
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const offset = (page - 1) * limit;

      let query = supabase
        .from('schools')
        .select('*', { count: 'exact' });

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,sigle.ilike.%${filters.search}%`);
      }

      if (filters.status && filters.status !== 'ALL') {
        if (filters.status === 'ACTIVE') {
          query = query.eq('is_active', true);
        } else if (filters.status === 'ARCHIVED') {
          query = query.eq('is_active', false);
        }
      }

      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      if (filters.region) {
        query = query.eq('region', filters.region);
      }

      const sortBy = filters.sortBy || 'created_at';
      const sortOrder = filters.sortOrder || 'desc';
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });

      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Failed to list schools', { error: error.message }, 'schools');
        return { data: [], total: 0, page, limit, totalPages: 0 };
      }

      return {
        data: (data as unknown as School[]) || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      };
    },

    async exists(filters: { email?: string; name?: string; code?: string }): Promise<boolean> {
      let query = supabase.from('schools').select('id').limit(1);

      if (filters.email) {
        query = query.eq('email', filters.email);
      }
      if (filters.name) {
        query = query.eq('name', filters.name);
      }
      if (filters.code) {
        query = query.eq('code', filters.code);
      }

      const { data } = await query;
      return !!data && data.length > 0;
    },

    async uploadLogo(schoolId: string, file: File): Promise<string> {
      const fileExt = file.name.split('.').pop();
      const filePath = `schools/${schoolId}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('school-assets')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        logger.error('Failed to upload logo', { schoolId, error: uploadError.message }, 'schools');
        throw new SchoolLogoError('Erreur lors de l\'upload du logo');
      }

      const { data: urlData } = supabase.storage
        .from('school-assets')
        .getPublicUrl(filePath);

      await supabase
        .from('schools')
        .update({ logo_url: urlData.publicUrl, updated_at: new Date().toISOString() })
        .eq('id', schoolId);

      logger.info('Logo uploaded', { schoolId, path: filePath }, 'schools');
      return urlData.publicUrl;
    },

    async updateSettings(schoolId: string, settings: Partial<SchoolSettings>): Promise<void> {
      const { data: existing } = await supabase
        .from('schools')
        .select('id')
        .eq('id', schoolId)
        .single();

      if (!existing) throw new SchoolNotFoundError(schoolId);

      const { error } = await supabase
        .from('schools')
        .update({
          language: settings.language,
          timezone: settings.timezone,
          currency: settings.currency,
          grading_system: settings.gradingSystem,
          passing_grade: settings.passingGrade,
          academic_year: settings.academicYear,
          checkin_radius: settings.checkinRadius,
          updated_at: new Date().toISOString(),
        })
        .eq('id', schoolId);

      if (error) {
        logger.error('Failed to update school settings', { schoolId, error: error.message }, 'schools');
        throw new SchoolNotFoundError(schoolId);
      }

      logger.info('School settings updated', { schoolId }, 'schools');
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

    async updateStatus(id: string, status: SchoolStatus): Promise<void> {
      const isActive = status === 'ACTIVE';

      const { error } = await supabase
        .from('schools')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        logger.error('Failed to update school status', { schoolId: id, status, error: error.message }, 'schools');
        throw new SchoolNotFoundError(id);
      }

      logger.info('School status updated', { schoolId: id, status }, 'schools');
    },
  };
}
