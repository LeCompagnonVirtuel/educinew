import { describe, it, expect } from 'vitest';
import { ONBOARDING_STEPS, ONBOARDING_STEP_LABELS, DEFAULT_MODULES, DEFAULT_BRANDING_COLORS } from '@educi/types';

describe('Onboarding Config', () => {
  describe('ONBOARDING_STEPS', () => {
    it('should have 8 steps', () => {
      expect(ONBOARDING_STEPS).toHaveLength(8);
    });

    it('should start with general_info', () => {
      expect(ONBOARDING_STEPS[0]).toBe('general_info');
    });

    it('should end with validation', () => {
      expect(ONBOARDING_STEPS[7]).toBe('validation');
    });

    it('should contain all required steps', () => {
      const required = [
        'general_info', 'admin_info', 'academic_config',
        'pedagogic_structure', 'director_creation', 'modules',
        'branding', 'validation',
      ];
      for (const step of required) {
        expect(ONBOARDING_STEPS).toContain(step);
      }
    });
  });

  describe('ONBOARDING_STEP_LABELS', () => {
    it('should have labels for all steps', () => {
      for (const step of ONBOARDING_STEPS) {
        expect(ONBOARDING_STEP_LABELS[step]).toBeDefined();
        expect(typeof ONBOARDING_STEP_LABELS[step]).toBe('string');
      }
    });

    it('should have French labels', () => {
      expect(ONBOARDING_STEP_LABELS.general_info).toBe('Informations générales');
      expect(ONBOARDING_STEP_LABELS.director_creation).toBe('Création du Directeur');
      expect(ONBOARDING_STEP_LABELS.validation).toBe('Validation finale');
    });
  });

  describe('DEFAULT_MODULES', () => {
    it('should have exams enabled by default', () => {
      expect(DEFAULT_MODULES.exams).toBe(true);
    });

    it('should have payments disabled by default', () => {
      expect(DEFAULT_MODULES.payments).toBe(false);
    });

    it('should have all module keys', () => {
      const keys = ['payments', 'transport', 'library', 'cafeteria', 'health',
        'discipline', 'marketplace', 'hr', 'gps', 'exams', 'sms', 'ai'];
      for (const key of keys) {
        expect(DEFAULT_MODULES).toHaveProperty(key);
      }
    });
  });

  describe('DEFAULT_BRANDING_COLORS', () => {
    it('should have primary color', () => {
      expect(DEFAULT_BRANDING_COLORS.colorPrimary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it('should have secondary color', () => {
      expect(DEFAULT_BRANDING_COLORS.colorSecondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });
});
