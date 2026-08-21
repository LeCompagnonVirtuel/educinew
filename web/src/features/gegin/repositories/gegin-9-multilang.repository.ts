import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-9: Multilang — Multilingual Content Framework
// ============================================================================

export interface GEGINTranslation extends BaseEntity {
  key: string;
  namespace: string;
  translations: Record<string, string>;
  context?: string;
  description?: string;
  is_plural: boolean;
  plural_forms?: string[];
  status: 'active' | 'deprecated' | 'draft';
  metadata: Record<string, unknown>;
}

export interface GEGINLocalisation extends BaseEntity {
  language_code: string;
  language_name: string;
  native_name: string;
  direction: 'ltr' | 'rtl';
  date_format: string;
  time_format: string;
  number_format: Record<string, unknown>;
  currency_format: Record<string, unknown>;
  status: 'active' | 'inactive' | 'draft';
  metadata: Record<string, unknown>;
}

export interface GEGINLanguagePack extends BaseEntity {
  name: string;
  version: string;
  source_language: string;
  target_languages: string[];
  completeness: Record<string, number>;
  status: 'draft' | 'review' | 'published' | 'archived';
  published_at?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINVoiceTranslation extends BaseEntity {
  source_text: string;
  source_language: string;
  target_language: string;
  translated_text: string;
  confidence_score: number;
  audio_url?: string;
  status: 'pending' | 'completed' | 'failed';
  metadata: Record<string, unknown>;
}

export interface GEGINOCRDocument extends BaseEntity {
  document_url: string;
  source_language: string;
  detected_text: string;
  confidence_score: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  output_format: 'text' | 'structured' | 'json';
  metadata: Record<string, unknown>;
}

export interface GEGINContentAdaptation extends BaseEntity {
  content_id: string;
  content_type: string;
  source_language: string;
  target_language: string;
  adaptation_type: 'translation' | 'localization' | 'transcreation';
  status: 'pending' | 'in_progress' | 'completed' | 'review';
  adapted_content?: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN9_TABLE_NAMES: Record<string, string> = {
  GEGINTranslation: 'gegin_translations',
  GEGINLocalisation: 'gegin_localisations',
  GEGINLanguagePack: 'gegin_language_packs',
  GEGINVoiceTranslation: 'gegin_voice_translations',
  GEGINOCRDocument: 'gegin_ocr_documents',
  GEGINContentAdaptation: 'gegin_content_adaptations',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN9Repository {
  translations: CrudRepository<GEGINTranslation>;
  localisations: CrudRepository<GEGINLocalisation>;
  languagePacks: CrudRepository<GEGINLanguagePack>;
  voiceTranslations: CrudRepository<GEGINVoiceTranslation>;
  ocrDocuments: CrudRepository<GEGINOCRDocument>;
  contentAdaptations: CrudRepository<GEGINContentAdaptation>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN9Repository(supabase: SupabaseClient): GEGIN9Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    translations: crud<GEGINTranslation>(GEGIN9_TABLE_NAMES.GEGINTranslation),
    localisations: crud<GEGINLocalisation>(GEGIN9_TABLE_NAMES.GEGINLocalisation),
    languagePacks: crud<GEGINLanguagePack>(GEGIN9_TABLE_NAMES.GEGINLanguagePack),
    voiceTranslations: crud<GEGINVoiceTranslation>(GEGIN9_TABLE_NAMES.GEGINVoiceTranslation),
    ocrDocuments: crud<GEGINOCRDocument>(GEGIN9_TABLE_NAMES.GEGINOCRDocument),
    contentAdaptations: crud<GEGINContentAdaptation>(GEGIN9_TABLE_NAMES.GEGINContentAdaptation),
  };
}
