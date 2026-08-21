import { createClient } from '@/lib/supabase/client';
import type { OnboardingData, SchoolInitResult } from '../types';
import { OnboardingCompletionError } from '@educi/errors';
import { logger } from '@educi/logger';
import { AuditOnboardingService } from './audit-onboarding.service';

export class SchoolInitializationService {
  constructor(private readonly auditService: AuditOnboardingService) {}

  async initializeSchool(data: OnboardingData, userId: string): Promise<SchoolInitResult> {
    const supabase = createClient();

    try {
      const { data: school, error: schoolError } = await supabase
        .from('schools')
        .insert({
          name: data.generalInfo.name,
          code: data.generalInfo.code || null,
          email: data.generalInfo.email,
          phone: data.generalInfo.phone || null,
          address: data.generalInfo.address || null,
          city: data.generalInfo.city || null,
          region: data.generalInfo.region || null,
          country: data.generalInfo.country || "Côte d'Ivoire",
          latitude: data.generalInfo.latitude || null,
          longitude: data.generalInfo.longitude || null,
          logo_url: data.generalInfo.logoUrl || null,
          primary_color: data.branding.colorPrimary || '#1E40AF',
          secondary_color: data.branding.colorSecondary || '#3B82F6',
          academic_year: data.academicConfig.academicYear,
          grading_system: data.academicConfig.gradingSystem,
          passing_grade: data.academicConfig.passingGrade,
          language: data.adminInfo.languages[0] || 'fr',
          timezone: data.adminInfo.timezone || 'Africa/Abidjan',
          currency: data.adminInfo.currency || 'XOF',
          is_active: true,
        })
        .select()
        .single();

      if (schoolError || !school) {
        throw new OnboardingCompletionError(`Erreur création école: ${schoolError?.message}`);
      }

      const { data: director, error: directorError } = await supabase.auth.signUp({
        email: data.director.email,
        password: data.director.password,
        options: {
          data: {
            name: `${data.director.firstName} ${data.director.lastName}`,
            role: 'DIRECTEUR',
            school_id: school.id,
          },
        },
      });

      if (directorError || !director?.user) {
        await supabase.from('schools').delete().eq('id', school.id);
        throw new OnboardingCompletionError(`Erreur création directeur: ${directorError?.message}`);
      }

      await supabase.from('users').update({
        school_id: school.id,
        role: 'DIRECTEUR',
        name: `${data.director.firstName} ${data.director.lastName}`,
      }).eq('id', director.user.id);

      let academicYearId = '';
      const { data: year, error: yearError } = await supabase
        .from('academic_years')
        .insert({
          school_id: school.id,
          name: data.academicConfig.academicYear,
          start_date: data.academicConfig.yearStartDate,
          end_date: data.academicConfig.yearEndDate,
          is_current: true,
        })
        .select()
        .single();

      if (!yearError && year) {
        academicYearId = year.id;
      }

      const levelIds: string[] = [];
      const sectionIds: string[] = [];

      for (const level of data.pedagogicStructure.levels) {
        const { data: levelData } = await supabase
          .from('levels')
          .insert({
            school_id: school.id,
            name: level.name,
            order_index: level.order,
          })
          .select()
          .single();

        if (levelData) {
          levelIds.push(levelData.id);

          for (const section of level.sections) {
            const { data: sectionData } = await supabase
              .from('sections')
              .insert({
                school_id: school.id,
                level_id: levelData.id,
                name: section.name,
                max_students: section.maxStudents || 40,
              })
              .select()
              .single();

            if (sectionData) {
              sectionIds.push(sectionData.id);
            }
          }
        }
      }

      await this.auditService.log({
        action: 'SCHOOL_INITIALIZED',
        schoolId: school.id,
        userId,
        details: {
          name: data.generalInfo.name,
          levelsCount: levelIds.length,
          sectionsCount: sectionIds.length,
        },
      });

      logger.info('School initialized', {
        schoolId: school.id,
        directorId: director.user.id,
        levelsCount: levelIds.length,
      }, 'onboarding');

      return {
        schoolId: school.id,
        directorId: director.user.id,
        academicYearId,
        levelIds,
        sectionIds,
      };
    } catch (error) {
      if (error instanceof OnboardingCompletionError) throw error;
      logger.error('School initialization failed', { userId, error }, 'onboarding');
      throw new OnboardingCompletionError('Erreur lors de l\'initialisation de l\'école');
    }
  }
}
