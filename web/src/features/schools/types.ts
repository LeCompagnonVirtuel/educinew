import type { School, SchoolSettings, SchoolBranding, SchoolPlan, SchoolStatus, SchoolLimits, SchoolStatistics, SchoolCreationRequest, SchoolUpdateRequest } from '@educi/types';

export type {
  School,
  SchoolSettings,
  SchoolBranding,
  SchoolPlan,
  SchoolStatus,
  SchoolLimits,
  SchoolStatistics,
  SchoolCreationRequest,
  SchoolUpdateRequest,
};

export interface SchoolFilters {
  search?: string;
  status?: SchoolStatus | 'ALL';
  plan?: SchoolPlan | 'ALL';
  city?: string;
  region?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
}

export interface SchoolListResult {
  data: School[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SchoolRepository {
  create(data: SchoolCreationRequest): Promise<School>;
  update(id: string, data: SchoolUpdateRequest): Promise<School>;
  archive(id: string): Promise<void>;
  restore(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<School | null>;
  findBySlug(slug: string): Promise<School | null>;
  findAll(filters: SchoolFilters): Promise<SchoolListResult>;
  exists(filters: { email?: string; name?: string; code?: string }): Promise<boolean>;
  uploadLogo(schoolId: string, file: File): Promise<string>;
  updateSettings(schoolId: string, settings: Partial<SchoolSettings>): Promise<void>;
  getSettings(schoolId: string): Promise<SchoolSettings | null>;
  getStatistics(schoolId: string): Promise<SchoolStatistics>;
  updateStatus(id: string, status: SchoolStatus): Promise<void>;
}

export interface SchoolLogoResult {
  url: string;
  path: string;
}

export interface SchoolSlugResult {
  slug: string;
  isUnique: boolean;
}
