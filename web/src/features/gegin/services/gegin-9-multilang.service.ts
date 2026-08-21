import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINTranslation, GEGINLocalisation, GEGINLanguagePack, GEGINVoiceTranslation, GEGINOCRDocument, GEGINContentAdaptation, GEGIN9_TABLE_NAMES } from '../repositories/gegin-9-multilang.repository';
import { logger } from '@educi/logger';

export class GEGINTranslationService extends GEGINBaseService<GEGINTranslation> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN9_TABLE_NAMES.GEGINTranslation, moduleName: 'Translation' });
  }
}

export class GEGINLocalisationService extends GEGINBaseService<GEGINLocalisation> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN9_TABLE_NAMES.GEGINLocalisation, moduleName: 'Localisation' });
  }
}

export class GEGINLanguagePackService extends GEGINBaseService<GEGINLanguagePack> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN9_TABLE_NAMES.GEGINLanguagePack, moduleName: 'LanguagePack' });
  }
}

export class GEGINVoiceTranslationService extends GEGINBaseService<GEGINVoiceTranslation> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN9_TABLE_NAMES.GEGINVoiceTranslation, moduleName: 'VoiceTranslation' });
  }
}

export class GEGINOCRDocumentService extends GEGINBaseService<GEGINOCRDocument> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN9_TABLE_NAMES.GEGINOCRDocument, moduleName: 'OCRDocument' });
  }
}

export class GEGINContentAdaptationService extends GEGINBaseService<GEGINContentAdaptation> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN9_TABLE_NAMES.GEGINContentAdaptation, moduleName: 'ContentAdaptation' });
  }
}

export class GEGIN9MultilangService {
  readonly translations: GEGINTranslationService;
  readonly localisations: GEGINLocalisationService;
  readonly languagePacks: GEGINLanguagePackService;
  readonly voiceTranslations: GEGINVoiceTranslationService;
  readonly ocrDocuments: GEGINOCRDocumentService;
  readonly contentAdaptations: GEGINContentAdaptationService;

  constructor(supabase: SupabaseClient) {
    this.translations = new GEGINTranslationService(supabase);
    this.localisations = new GEGINLocalisationService(supabase);
    this.languagePacks = new GEGINLanguagePackService(supabase);
    this.voiceTranslations = new GEGINVoiceTranslationService(supabase);
    this.ocrDocuments = new GEGINOCRDocumentService(supabase);
    this.contentAdaptations = new GEGINContentAdaptationService(supabase);
  }
}

export function createGEGIN9MultilangService(supabase: SupabaseClient): GEGIN9MultilangService {
  return new GEGIN9MultilangService(supabase);
}
