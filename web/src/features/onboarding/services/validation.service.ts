import type { OnboardingData, OnboardingStep, OnboardingValidationResult } from '../types';
import {
  GeneralInfoSchema, AdminInfoSchema, AcademicConfigSchema,
  PedagogicStructureSchema, DirectorSchema, ModulesSchema, BrandingSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

export class ValidationService {
  validateStep(step: OnboardingStep, data: OnboardingData): OnboardingValidationResult {
    const errors: OnboardingValidationResult['errors'] = [];
    const warnings: OnboardingValidationResult['warnings'] = [];

    try {
      switch (step) {
        case 'general_info': {
          const result = GeneralInfoSchema.safeParse(data.generalInfo);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({ step, field: issue.path.join('.'), message: issue.message });
            });
          }
          break;
        }
        case 'admin_info': {
          const result = AdminInfoSchema.safeParse(data.adminInfo);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({ step, field: issue.path.join('.'), message: issue.message });
            });
          }
          break;
        }
        case 'academic_config': {
          const result = AcademicConfigSchema.safeParse(data.academicConfig);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({ step, field: issue.path.join('.'), message: issue.message });
            });
          }
          if (!data.academicConfig.yearStartDate) {
            warnings.push({ step, field: 'yearStartDate', message: 'Date de début non définie' });
          }
          break;
        }
        case 'pedagogic_structure': {
          const result = PedagogicStructureSchema.safeParse(data.pedagogicStructure);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({ step, field: issue.path.join('.'), message: issue.message });
            });
          }
          if (data.pedagogicStructure.levels.length === 0) {
            warnings.push({ step, field: 'levels', message: 'Aucun niveau défini' });
          }
          break;
        }
        case 'director_creation': {
          const result = DirectorSchema.safeParse(data.director);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({ step, field: issue.path.join('.'), message: issue.message });
            });
          }
          break;
        }
        case 'modules': {
          const result = ModulesSchema.safeParse(data.modules);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({ step, field: issue.path.join('.'), message: issue.message });
            });
          }
          break;
        }
        case 'branding': {
          const result = BrandingSchema.safeParse(data.branding);
          if (!result.success) {
            result.error.issues.forEach((issue) => {
              errors.push({ step, field: issue.path.join('.'), message: issue.message });
            });
          }
          if (!data.branding.logoUrl) {
            warnings.push({ step, field: 'logoUrl', message: 'Logo non uploadé' });
          }
          break;
        }
        case 'validation': {
          const allResults = this.validateAll(data);
          errors.push(...allResults.errors);
          warnings.push(...allResults.warnings);
          break;
        }
      }
    } catch (err) {
      logger.error('Validation error', { step, error: err }, 'onboarding');
      errors.push({ step, field: 'unknown', message: 'Erreur de validation interne' });
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  validateAll(data: OnboardingData): OnboardingValidationResult {
    const errors: OnboardingValidationResult['errors'] = [];
    const warnings: OnboardingValidationResult['warnings'] = [];

    const steps: OnboardingStep[] = [
      'general_info', 'admin_info', 'academic_config',
      'pedagogic_structure', 'director_creation', 'modules', 'branding',
    ];

    for (const step of steps) {
      const result = this.validateStep(step, data);
      errors.push(...result.errors);
      warnings.push(...result.warnings);
    }

    return { isValid: errors.length === 0, errors, warnings };
  }

  validateGeneralInfo(data: OnboardingData['generalInfo']): OnboardingValidationResult {
    const result = GeneralInfoSchema.safeParse(data);
    const errors: OnboardingValidationResult['errors'] = [];
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push({ step: 'general_info', field: issue.path.join('.'), message: issue.message });
      });
    }
    return { isValid: errors.length === 0, errors, warnings: [] };
  }

  validateAdminInfo(data: OnboardingData['adminInfo']): OnboardingValidationResult {
    const result = AdminInfoSchema.safeParse(data);
    const errors: OnboardingValidationResult['errors'] = [];
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push({ step: 'admin_info', field: issue.path.join('.'), message: issue.message });
      });
    }
    return { isValid: errors.length === 0, errors, warnings: [] };
  }

  validateAcademicConfig(data: OnboardingData['academicConfig']): OnboardingValidationResult {
    const result = AcademicConfigSchema.safeParse(data);
    const errors: OnboardingValidationResult['errors'] = [];
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push({ step: 'academic_config', field: issue.path.join('.'), message: issue.message });
      });
    }
    return { isValid: errors.length === 0, errors, warnings: [] };
  }

  validateDirector(data: OnboardingData['director']): OnboardingValidationResult {
    const result = DirectorSchema.safeParse(data);
    const errors: OnboardingValidationResult['errors'] = [];
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        errors.push({ step: 'director_creation', field: issue.path.join('.'), message: issue.message });
      });
    }
    return { isValid: errors.length === 0, errors, warnings: [] };
  }
}
