import type {
  OnboardingStep,
  OnboardingStatus,
  OnboardingData,
  OnboardingProgress,
  OnboardingState,
  OnboardingValidationResult,
  OnboardingGeneralInfo,
  OnboardingAdminInfo,
  OnboardingAcademicConfig,
  OnboardingPedagogicStructure,
  OnboardingDirector,
  OnboardingModules,
  OnboardingBranding,
  OnboardingLevel,
  OnboardingSection,
} from '@educi/types';

export type {
  OnboardingStep,
  OnboardingStatus,
  OnboardingData,
  OnboardingProgress,
  OnboardingState,
  OnboardingValidationResult,
  OnboardingGeneralInfo,
  OnboardingAdminInfo,
  OnboardingAcademicConfig,
  OnboardingPedagogicStructure,
  OnboardingDirector,
  OnboardingModules,
  OnboardingBranding,
  OnboardingLevel,
  OnboardingSection,
};

export interface OnboardingFilters {
  userId?: string;
  status?: OnboardingStatus;
  page?: number;
  limit?: number;
}

export interface OnboardingListResult {
  data: OnboardingState[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OnboardingRepository {
  create(userId: string): Promise<OnboardingState>;
  findById(id: string): Promise<OnboardingState | null>;
  findByUserId(userId: string): Promise<OnboardingState | null>;
  update(id: string, data: Partial<OnboardingData>): Promise<OnboardingState>;
  updateProgress(id: string, progress: Partial<OnboardingProgress>): Promise<void>;
  updateStatus(id: string, status: OnboardingStatus): Promise<void>;
  delete(id: string): Promise<void>;
  findDrafts(userId: string): Promise<OnboardingState[]>;
  countDrafts(userId: string): Promise<number>;
  complete(id: string, schoolId: string): Promise<void>;
}

export interface WizardState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  data: OnboardingData;
  isValidating: boolean;
  errors: Array<{ step: OnboardingStep; field: string; message: string }>;
  warnings: Array<{ step: OnboardingStep; field: string; message: string }>;
  isSubmitting: boolean;
  isComplete: boolean;
}

export type WizardAction =
  | { type: 'SET_STEP'; step: OnboardingStep }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DATA'; step: OnboardingStep; data: Partial<OnboardingData> }
  | { type: 'COMPLETE_STEP'; step: OnboardingStep }
  | { type: 'SET_VALIDATING'; validating: boolean }
  | { type: 'SET_ERRORS'; errors: OnboardingValidationResult['errors'] }
  | { type: 'SET_WARNINGS'; warnings: OnboardingValidationResult['warnings'] }
  | { type: 'SET_SUBMITTING'; submitting: boolean }
  | { type: 'SET_COMPLETE'; complete: boolean }
  | { type: 'RESET' };

export interface BrandingConfig {
  logoUrl?: string;
  colorPrimary: string;
  colorSecondary: string;
  fontPrimary?: string;
  faviconUrl?: string;
  shortName?: string;
  slogan?: string;
  officialName?: string;
  commercialName?: string;
  motto?: string;
  description?: string;
}

export interface AcademicSetupConfig {
  academicYear: string;
  yearStartDate: string;
  yearEndDate: string;
  termsCount: number;
  semestersCount: number;
  gradingSystem: string;
  passingGrade: number;
  levels: Array<{
    name: string;
    order: number;
    sections: Array<{
      name: string;
      maxStudents: number;
    }>;
  }>;
}

export interface SchoolInitResult {
  schoolId: string;
  directorId: string;
  academicYearId: string;
  levelIds: string[];
  sectionIds: string[];
}
