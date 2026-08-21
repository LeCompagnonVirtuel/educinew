import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudCrossTenantError, EduCloudCrossTenantQueryError, EduCloudCrossTenantResultError, EduCloudCrossTenantSearchError, EduCloudFederatedError, EduCloudFederatedQueryError, EduCloudFederatedResultError, EduCloudFederatedSearchError, EduCloudFederatedSourceError, EduCloudGlobalSearchError, EduCloudImageAnalysisError, EduCloudImageFaceError, EduCloudImageObjectError, EduCloudImageQueryError, EduCloudImageResultError, EduCloudImageSearchError, EduCloudImageTagError, EduCloudKnowledgeSearchError, EduCloudNaturalLanguageSearchError, EduCloudOCRBlockError, EduCloudOCRDocumentError, EduCloudOCRFieldError, EduCloudOCRPageError, EduCloudOCRResultError, EduCloudOCRSearchError, EduCloudOCRTableCellError, EduCloudOCRTableError, EduCloudSearchAIError, EduCloudSearchAIInsightError, EduCloudSearchAIModelError, EduCloudSearchAIQueryError, EduCloudSearchAlertError, EduCloudSearchAnalyticsDataError, EduCloudSearchAnalyticsError, EduCloudSearchAnalyzerError, EduCloudSearchAuditLogError, EduCloudSearchAutoCompleteError, EduCloudSearchBookmarkError, EduCloudSearchContextError, EduCloudSearchDashboardError, EduCloudSearchDashboardWidgetError, EduCloudSearchDocumentError, EduCloudSearchError, EduCloudSearchEventError, EduCloudSearchExportError, EduCloudSearchFacetError, EduCloudSearchFacetRangeError, EduCloudSearchFieldError, EduCloudSearchFilterError, EduCloudSearchHighlightError, EduCloudSearchHistoryError, EduCloudSearchIndexError, EduCloudSearchInsightError, EduCloudSearchMappingError, EduCloudSearchMetricError, EduCloudSearchMigrationError, EduCloudSearchMigrationStepError, EduCloudSearchNotificationError, EduCloudSearchPerformanceMetricsError, EduCloudSearchPersonalizationError, EduCloudSearchPipelineError, EduCloudSearchPresetError, EduCloudSearchQualityAssessmentError, EduCloudSearchQueryError, EduCloudSearchRankingError, EduCloudSearchRecommendationError, EduCloudSearchRelevanceError, EduCloudSearchReportError, EduCloudSearchResultError, EduCloudSearchResultGroupError, EduCloudSearchResultItemError, EduCloudSearchResultSnippetError, EduCloudSearchRunError, EduCloudSearchSchemaError, EduCloudSearchSecurityError, EduCloudSearchSpellCheckError, EduCloudSearchSpellCorrectionError, EduCloudSearchStageError, EduCloudSearchSuggestionError, EduCloudSearchTemplateError, EduCloudSearchTemplateParameterError, EduCloudSearchTokenFilterError, EduCloudSearchTokenizerError, EduCloudSearchVersionError, EduCloudSemanticSearchError, EduCloudVectorEmbeddingError, EduCloudVectorIndexError, EduCloudVectorSearchError, EduCloudVectorSearchResultError, EduCloudVectorStoreError, EduCloudVoiceCommandError, EduCloudVoiceQueryError, EduCloudVoiceResultError, EduCloudVoiceSearchError, EduCloudVoiceTranscriptionError, EduCloudVoiceWordError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface GreenModuleRepository {

  // =============================================================================
  // SEARCH-PLATFORM
  // =============================================================================
  getGlobalSearch(schoolId: string, id: string): Promise<any | null>;
  listGlobalSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGlobalSearch(schoolId: string, data: any): Promise<any>;
  updateGlobalSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteGlobalSearch(schoolId: string, id: string): Promise<void>;

  getSemanticSearch(schoolId: string, id: string): Promise<any | null>;
  listSemanticSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSemanticSearch(schoolId: string, data: any): Promise<any>;
  updateSemanticSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteSemanticSearch(schoolId: string, id: string): Promise<void>;

  getOCRSearch(schoolId: string, id: string): Promise<any | null>;
  listOCRSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRSearch(schoolId: string, data: any): Promise<any>;
  updateOCRSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRSearch(schoolId: string, id: string): Promise<void>;

  getVoiceSearch(schoolId: string, id: string): Promise<any | null>;
  listVoiceSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVoiceSearch(schoolId: string, data: any): Promise<any>;
  updateVoiceSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteVoiceSearch(schoolId: string, id: string): Promise<void>;

  getImageSearch(schoolId: string, id: string): Promise<any | null>;
  listImageSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImageSearch(schoolId: string, data: any): Promise<any>;
  updateImageSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteImageSearch(schoolId: string, id: string): Promise<void>;

  getKnowledgeSearch(schoolId: string, id: string): Promise<any | null>;
  listKnowledgeSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createKnowledgeSearch(schoolId: string, data: any): Promise<any>;
  updateKnowledgeSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteKnowledgeSearch(schoolId: string, id: string): Promise<void>;

  getFederatedSearch(schoolId: string, id: string): Promise<any | null>;
  listFederatedSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederatedSearch(schoolId: string, data: any): Promise<any>;
  updateFederatedSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederatedSearch(schoolId: string, id: string): Promise<void>;

  getCrossTenantSearch(schoolId: string, id: string): Promise<any | null>;
  listCrossTenantSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCrossTenantSearch(schoolId: string, data: any): Promise<any>;
  updateCrossTenantSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteCrossTenantSearch(schoolId: string, id: string): Promise<void>;

  getNaturalLanguageSearch(schoolId: string, id: string): Promise<any | null>;
  listNaturalLanguageSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNaturalLanguageSearch(schoolId: string, data: any): Promise<any>;
  updateNaturalLanguageSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteNaturalLanguageSearch(schoolId: string, id: string): Promise<void>;

  getSearchQuery(schoolId: string, id: string): Promise<any | null>;
  listSearchQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchQuery(schoolId: string, data: any): Promise<any>;
  updateSearchQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchQuery(schoolId: string, id: string): Promise<void>;

  getSearchFilter(schoolId: string, id: string): Promise<any | null>;
  listSearchFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchFilter(schoolId: string, data: any): Promise<any>;
  updateSearchFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchFilter(schoolId: string, id: string): Promise<void>;

  getSearchFacet(schoolId: string, id: string): Promise<any | null>;
  listSearchFacet(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchFacet(schoolId: string, data: any): Promise<any>;
  updateSearchFacet(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchFacet(schoolId: string, id: string): Promise<void>;

  getSearchFacetRange(schoolId: string, id: string): Promise<any | null>;
  listSearchFacetRange(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchFacetRange(schoolId: string, data: any): Promise<any>;
  updateSearchFacetRange(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchFacetRange(schoolId: string, id: string): Promise<void>;

  getSearchHighlight(schoolId: string, id: string): Promise<any | null>;
  listSearchHighlight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchHighlight(schoolId: string, data: any): Promise<any>;
  updateSearchHighlight(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchHighlight(schoolId: string, id: string): Promise<void>;

  getSearchIndex(schoolId: string, id: string): Promise<any | null>;
  listSearchIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchIndex(schoolId: string, data: any): Promise<any>;
  updateSearchIndex(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchIndex(schoolId: string, id: string): Promise<void>;

  getSearchDocument(schoolId: string, id: string): Promise<any | null>;
  listSearchDocument(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchDocument(schoolId: string, data: any): Promise<any>;
  updateSearchDocument(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchDocument(schoolId: string, id: string): Promise<void>;

  getSearchField(schoolId: string, id: string): Promise<any | null>;
  listSearchField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchField(schoolId: string, data: any): Promise<any>;
  updateSearchField(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchField(schoolId: string, id: string): Promise<void>;

  getSearchSchema(schoolId: string, id: string): Promise<any | null>;
  listSearchSchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchSchema(schoolId: string, data: any): Promise<any>;
  updateSearchSchema(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchSchema(schoolId: string, id: string): Promise<void>;

  getSearchMapping(schoolId: string, id: string): Promise<any | null>;
  listSearchMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchMapping(schoolId: string, data: any): Promise<any>;
  updateSearchMapping(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchMapping(schoolId: string, id: string): Promise<void>;

  getSearchAnalyzer(schoolId: string, id: string): Promise<any | null>;
  listSearchAnalyzer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAnalyzer(schoolId: string, data: any): Promise<any>;
  updateSearchAnalyzer(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAnalyzer(schoolId: string, id: string): Promise<void>;

  getSearchTokenizer(schoolId: string, id: string): Promise<any | null>;
  listSearchTokenizer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchTokenizer(schoolId: string, data: any): Promise<any>;
  updateSearchTokenizer(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchTokenizer(schoolId: string, id: string): Promise<void>;

  getSearchTokenFilter(schoolId: string, id: string): Promise<any | null>;
  listSearchTokenFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchTokenFilter(schoolId: string, data: any): Promise<any>;
  updateSearchTokenFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchTokenFilter(schoolId: string, id: string): Promise<void>;

  getSearchConfig(schoolId: string, id: string): Promise<any | null>;
  listSearchConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchConfig(schoolId: string, data: any): Promise<any>;
  updateSearchConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchConfig(schoolId: string, id: string): Promise<void>;

  getSearchSecurityConfig(schoolId: string, id: string): Promise<any | null>;
  listSearchSecurityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchSecurityConfig(schoolId: string, data: any): Promise<any>;
  updateSearchSecurityConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchSecurityConfig(schoolId: string, id: string): Promise<void>;

  getSearchPerformanceMetrics(schoolId: string, id: string): Promise<any | null>;
  listSearchPerformanceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchPerformanceMetrics(schoolId: string, data: any): Promise<any>;
  updateSearchPerformanceMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchPerformanceMetrics(schoolId: string, id: string): Promise<void>;

  getSearchAnalyticsData(schoolId: string, id: string): Promise<any | null>;
  listSearchAnalyticsData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAnalyticsData(schoolId: string, data: any): Promise<any>;
  updateSearchAnalyticsData(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAnalyticsData(schoolId: string, id: string): Promise<void>;

  getSearchAnalyticsEntry(schoolId: string, id: string): Promise<any | null>;
  listSearchAnalyticsEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAnalyticsEntry(schoolId: string, data: any): Promise<any>;
  updateSearchAnalyticsEntry(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAnalyticsEntry(schoolId: string, id: string): Promise<void>;

  getSearchResult(schoolId: string, id: string): Promise<any | null>;
  listSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchResult(schoolId: string, data: any): Promise<any>;
  updateSearchResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchResult(schoolId: string, id: string): Promise<void>;

  getSearchResultItem(schoolId: string, id: string): Promise<any | null>;
  listSearchResultItem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchResultItem(schoolId: string, data: any): Promise<any>;
  updateSearchResultItem(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchResultItem(schoolId: string, id: string): Promise<void>;

  getSearchResultGroup(schoolId: string, id: string): Promise<any | null>;
  listSearchResultGroup(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchResultGroup(schoolId: string, data: any): Promise<any>;
  updateSearchResultGroup(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchResultGroup(schoolId: string, id: string): Promise<void>;

  getSearchResultSnippet(schoolId: string, id: string): Promise<any | null>;
  listSearchResultSnippet(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchResultSnippet(schoolId: string, data: any): Promise<any>;
  updateSearchResultSnippet(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchResultSnippet(schoolId: string, id: string): Promise<void>;

  getSearchSuggestion(schoolId: string, id: string): Promise<any | null>;
  listSearchSuggestion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchSuggestion(schoolId: string, data: any): Promise<any>;
  updateSearchSuggestion(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchSuggestion(schoolId: string, id: string): Promise<void>;

  getSearchAutoComplete(schoolId: string, id: string): Promise<any | null>;
  listSearchAutoComplete(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAutoComplete(schoolId: string, data: any): Promise<any>;
  updateSearchAutoComplete(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAutoComplete(schoolId: string, id: string): Promise<void>;

  getSearchSpellCheck(schoolId: string, id: string): Promise<any | null>;
  listSearchSpellCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchSpellCheck(schoolId: string, data: any): Promise<any>;
  updateSearchSpellCheck(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchSpellCheck(schoolId: string, id: string): Promise<void>;

  getSearchSpellCorrection(schoolId: string, id: string): Promise<any | null>;
  listSearchSpellCorrection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchSpellCorrection(schoolId: string, data: any): Promise<any>;
  updateSearchSpellCorrection(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchSpellCorrection(schoolId: string, id: string): Promise<void>;

  getSearchHistory(schoolId: string, id: string): Promise<any | null>;
  listSearchHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchHistory(schoolId: string, data: any): Promise<any>;
  updateSearchHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchHistory(schoolId: string, id: string): Promise<void>;

  getSearchBookmark(schoolId: string, id: string): Promise<any | null>;
  listSearchBookmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchBookmark(schoolId: string, data: any): Promise<any>;
  updateSearchBookmark(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchBookmark(schoolId: string, id: string): Promise<void>;

  getSearchAlert(schoolId: string, id: string): Promise<any | null>;
  listSearchAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAlert(schoolId: string, data: any): Promise<any>;
  updateSearchAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAlert(schoolId: string, id: string): Promise<void>;

  getSearchNotification(schoolId: string, id: string): Promise<any | null>;
  listSearchNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchNotification(schoolId: string, data: any): Promise<any>;
  updateSearchNotification(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchNotification(schoolId: string, id: string): Promise<void>;

  getSearchPipeline(schoolId: string, id: string): Promise<any | null>;
  listSearchPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchPipeline(schoolId: string, data: any): Promise<any>;
  updateSearchPipeline(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchPipeline(schoolId: string, id: string): Promise<void>;

  getSearchStage(schoolId: string, id: string): Promise<any | null>;
  listSearchStage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchStage(schoolId: string, data: any): Promise<any>;
  updateSearchStage(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchStage(schoolId: string, id: string): Promise<void>;

  getSearchRun(schoolId: string, id: string): Promise<any | null>;
  listSearchRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchRun(schoolId: string, data: any): Promise<any>;
  updateSearchRun(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchRun(schoolId: string, id: string): Promise<void>;

  getSearchMetric(schoolId: string, id: string): Promise<any | null>;
  listSearchMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchMetric(schoolId: string, data: any): Promise<any>;
  updateSearchMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchMetric(schoolId: string, id: string): Promise<void>;

  getSearchTemplate(schoolId: string, id: string): Promise<any | null>;
  listSearchTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchTemplate(schoolId: string, data: any): Promise<any>;
  updateSearchTemplate(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchTemplate(schoolId: string, id: string): Promise<void>;

  getSearchTemplateParameter(schoolId: string, id: string): Promise<any | null>;
  listSearchTemplateParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchTemplateParameter(schoolId: string, data: any): Promise<any>;
  updateSearchTemplateParameter(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchTemplateParameter(schoolId: string, id: string): Promise<void>;

  getSearchPreset(schoolId: string, id: string): Promise<any | null>;
  listSearchPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchPreset(schoolId: string, data: any): Promise<any>;
  updateSearchPreset(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchPreset(schoolId: string, id: string): Promise<void>;

  getSearchExport(schoolId: string, id: string): Promise<any | null>;
  listSearchExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchExport(schoolId: string, data: any): Promise<any>;
  updateSearchExport(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchExport(schoolId: string, id: string): Promise<void>;

  getSearchAI(schoolId: string, id: string): Promise<any | null>;
  listSearchAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAI(schoolId: string, data: any): Promise<any>;
  updateSearchAI(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAI(schoolId: string, id: string): Promise<void>;

  getSearchAIModel(schoolId: string, id: string): Promise<any | null>;
  listSearchAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAIModel(schoolId: string, data: any): Promise<any>;
  updateSearchAIModel(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAIModel(schoolId: string, id: string): Promise<void>;

  getSearchAIInsight(schoolId: string, id: string): Promise<any | null>;
  listSearchAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAIInsight(schoolId: string, data: any): Promise<any>;
  updateSearchAIInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAIInsight(schoolId: string, id: string): Promise<void>;

  getSearchAIQuery(schoolId: string, id: string): Promise<any | null>;
  listSearchAIQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAIQuery(schoolId: string, data: any): Promise<any>;
  updateSearchAIQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAIQuery(schoolId: string, id: string): Promise<void>;

  getVectorEmbedding(schoolId: string, id: string): Promise<any | null>;
  listVectorEmbedding(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVectorEmbedding(schoolId: string, data: any): Promise<any>;
  updateVectorEmbedding(schoolId: string, id: string, data: any): Promise<any>;
  deleteVectorEmbedding(schoolId: string, id: string): Promise<void>;

  getVectorSearch(schoolId: string, id: string): Promise<any | null>;
  listVectorSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVectorSearch(schoolId: string, data: any): Promise<any>;
  updateVectorSearch(schoolId: string, id: string, data: any): Promise<any>;
  deleteVectorSearch(schoolId: string, id: string): Promise<void>;

  getVectorSearchResult(schoolId: string, id: string): Promise<any | null>;
  listVectorSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVectorSearchResult(schoolId: string, data: any): Promise<any>;
  updateVectorSearchResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteVectorSearchResult(schoolId: string, id: string): Promise<void>;

  getVectorIndex(schoolId: string, id: string): Promise<any | null>;
  listVectorIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVectorIndex(schoolId: string, data: any): Promise<any>;
  updateVectorIndex(schoolId: string, id: string, data: any): Promise<any>;
  deleteVectorIndex(schoolId: string, id: string): Promise<void>;

  getVectorStoreConfig(schoolId: string, id: string): Promise<any | null>;
  listVectorStoreConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVectorStoreConfig(schoolId: string, data: any): Promise<any>;
  updateVectorStoreConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteVectorStoreConfig(schoolId: string, id: string): Promise<void>;

  getOCRDocument(schoolId: string, id: string): Promise<any | null>;
  listOCRDocument(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRDocument(schoolId: string, data: any): Promise<any>;
  updateOCRDocument(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRDocument(schoolId: string, id: string): Promise<void>;

  getOCRResult(schoolId: string, id: string): Promise<any | null>;
  listOCRResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRResult(schoolId: string, data: any): Promise<any>;
  updateOCRResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRResult(schoolId: string, id: string): Promise<void>;

  getOCRPage(schoolId: string, id: string): Promise<any | null>;
  listOCRPage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRPage(schoolId: string, data: any): Promise<any>;
  updateOCRPage(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRPage(schoolId: string, id: string): Promise<void>;

  getOCRBlock(schoolId: string, id: string): Promise<any | null>;
  listOCRBlock(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRBlock(schoolId: string, data: any): Promise<any>;
  updateOCRBlock(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRBlock(schoolId: string, id: string): Promise<void>;

  getOCRTable(schoolId: string, id: string): Promise<any | null>;
  listOCRTable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRTable(schoolId: string, data: any): Promise<any>;
  updateOCRTable(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRTable(schoolId: string, id: string): Promise<void>;

  getOCRTableCell(schoolId: string, id: string): Promise<any | null>;
  listOCRTableCell(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRTableCell(schoolId: string, data: any): Promise<any>;
  updateOCRTableCell(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRTableCell(schoolId: string, id: string): Promise<void>;

  getOCRField(schoolId: string, id: string): Promise<any | null>;
  listOCRField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOCRField(schoolId: string, data: any): Promise<any>;
  updateOCRField(schoolId: string, id: string, data: any): Promise<any>;
  deleteOCRField(schoolId: string, id: string): Promise<void>;

  getVoiceQuery(schoolId: string, id: string): Promise<any | null>;
  listVoiceQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVoiceQuery(schoolId: string, data: any): Promise<any>;
  updateVoiceQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteVoiceQuery(schoolId: string, id: string): Promise<void>;

  getVoiceResult(schoolId: string, id: string): Promise<any | null>;
  listVoiceResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVoiceResult(schoolId: string, data: any): Promise<any>;
  updateVoiceResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteVoiceResult(schoolId: string, id: string): Promise<void>;

  getVoiceTranscription(schoolId: string, id: string): Promise<any | null>;
  listVoiceTranscription(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVoiceTranscription(schoolId: string, data: any): Promise<any>;
  updateVoiceTranscription(schoolId: string, id: string, data: any): Promise<any>;
  deleteVoiceTranscription(schoolId: string, id: string): Promise<void>;

  getVoiceWord(schoolId: string, id: string): Promise<any | null>;
  listVoiceWord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVoiceWord(schoolId: string, data: any): Promise<any>;
  updateVoiceWord(schoolId: string, id: string, data: any): Promise<any>;
  deleteVoiceWord(schoolId: string, id: string): Promise<void>;

  getVoiceCommand(schoolId: string, id: string): Promise<any | null>;
  listVoiceCommand(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVoiceCommand(schoolId: string, data: any): Promise<any>;
  updateVoiceCommand(schoolId: string, id: string, data: any): Promise<any>;
  deleteVoiceCommand(schoolId: string, id: string): Promise<void>;

  getImageQuery(schoolId: string, id: string): Promise<any | null>;
  listImageQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImageQuery(schoolId: string, data: any): Promise<any>;
  updateImageQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteImageQuery(schoolId: string, id: string): Promise<void>;

  getImageResult(schoolId: string, id: string): Promise<any | null>;
  listImageResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImageResult(schoolId: string, data: any): Promise<any>;
  updateImageResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteImageResult(schoolId: string, id: string): Promise<void>;

  getImageAnalysis(schoolId: string, id: string): Promise<any | null>;
  listImageAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImageAnalysis(schoolId: string, data: any): Promise<any>;
  updateImageAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteImageAnalysis(schoolId: string, id: string): Promise<void>;

  getImageObject(schoolId: string, id: string): Promise<any | null>;
  listImageObject(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImageObject(schoolId: string, data: any): Promise<any>;
  updateImageObject(schoolId: string, id: string, data: any): Promise<any>;
  deleteImageObject(schoolId: string, id: string): Promise<void>;

  getImageFace(schoolId: string, id: string): Promise<any | null>;
  listImageFace(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImageFace(schoolId: string, data: any): Promise<any>;
  updateImageFace(schoolId: string, id: string, data: any): Promise<any>;
  deleteImageFace(schoolId: string, id: string): Promise<void>;

  getImageTag(schoolId: string, id: string): Promise<any | null>;
  listImageTag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImageTag(schoolId: string, data: any): Promise<any>;
  updateImageTag(schoolId: string, id: string, data: any): Promise<any>;
  deleteImageTag(schoolId: string, id: string): Promise<void>;

  getFederatedSourceConfig(schoolId: string, id: string): Promise<any | null>;
  listFederatedSourceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederatedSourceConfig(schoolId: string, data: any): Promise<any>;
  updateFederatedSourceConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederatedSourceConfig(schoolId: string, id: string): Promise<void>;

  getFederatedQuery(schoolId: string, id: string): Promise<any | null>;
  listFederatedQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederatedQuery(schoolId: string, data: any): Promise<any>;
  updateFederatedQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederatedQuery(schoolId: string, id: string): Promise<void>;

  getFederatedResult(schoolId: string, id: string): Promise<any | null>;
  listFederatedResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederatedResult(schoolId: string, data: any): Promise<any>;
  updateFederatedResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederatedResult(schoolId: string, id: string): Promise<void>;

  getFederatedConfig(schoolId: string, id: string): Promise<any | null>;
  listFederatedConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFederatedConfig(schoolId: string, data: any): Promise<any>;
  updateFederatedConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteFederatedConfig(schoolId: string, id: string): Promise<void>;

  getCrossTenantQuery(schoolId: string, id: string): Promise<any | null>;
  listCrossTenantQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCrossTenantQuery(schoolId: string, data: any): Promise<any>;
  updateCrossTenantQuery(schoolId: string, id: string, data: any): Promise<any>;
  deleteCrossTenantQuery(schoolId: string, id: string): Promise<void>;

  getCrossTenantResult(schoolId: string, id: string): Promise<any | null>;
  listCrossTenantResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCrossTenantResult(schoolId: string, data: any): Promise<any>;
  updateCrossTenantResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteCrossTenantResult(schoolId: string, id: string): Promise<void>;

  getCrossTenantConfig(schoolId: string, id: string): Promise<any | null>;
  listCrossTenantConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCrossTenantConfig(schoolId: string, data: any): Promise<any>;
  updateCrossTenantConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteCrossTenantConfig(schoolId: string, id: string): Promise<void>;

  getSearchDashboard(schoolId: string, id: string): Promise<any | null>;
  listSearchDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchDashboard(schoolId: string, data: any): Promise<any>;
  updateSearchDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchDashboard(schoolId: string, id: string): Promise<void>;

  getSearchDashboardWidget(schoolId: string, id: string): Promise<any | null>;
  listSearchDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchDashboardWidget(schoolId: string, data: any): Promise<any>;
  updateSearchDashboardWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchDashboardWidget(schoolId: string, id: string): Promise<void>;

  getSearchReport(schoolId: string, id: string): Promise<any | null>;
  listSearchReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchReport(schoolId: string, data: any): Promise<any>;
  updateSearchReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchReport(schoolId: string, id: string): Promise<void>;

  getSearchInsight(schoolId: string, id: string): Promise<any | null>;
  listSearchInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchInsight(schoolId: string, data: any): Promise<any>;
  updateSearchInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchInsight(schoolId: string, id: string): Promise<void>;

  getSearchEvent(schoolId: string, id: string): Promise<any | null>;
  listSearchEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchEvent(schoolId: string, data: any): Promise<any>;
  updateSearchEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchEvent(schoolId: string, id: string): Promise<void>;

  getSearchQualityAssessment(schoolId: string, id: string): Promise<any | null>;
  listSearchQualityAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchQualityAssessment(schoolId: string, data: any): Promise<any>;
  updateSearchQualityAssessment(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchQualityAssessment(schoolId: string, id: string): Promise<void>;

  getSearchRelevance(schoolId: string, id: string): Promise<any | null>;
  listSearchRelevance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchRelevance(schoolId: string, data: any): Promise<any>;
  updateSearchRelevance(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchRelevance(schoolId: string, id: string): Promise<void>;

  getSearchRanking(schoolId: string, id: string): Promise<any | null>;
  listSearchRanking(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchRanking(schoolId: string, data: any): Promise<any>;
  updateSearchRanking(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchRanking(schoolId: string, id: string): Promise<void>;

  getSearchPersonalizationConfig(schoolId: string, id: string): Promise<any | null>;
  listSearchPersonalizationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchPersonalizationConfig(schoolId: string, data: any): Promise<any>;
  updateSearchPersonalizationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchPersonalizationConfig(schoolId: string, id: string): Promise<void>;

  getSearchRecommendation(schoolId: string, id: string): Promise<any | null>;
  listSearchRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchRecommendation(schoolId: string, data: any): Promise<any>;
  updateSearchRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchRecommendation(schoolId: string, id: string): Promise<void>;

  getSearchContext(schoolId: string, id: string): Promise<any | null>;
  listSearchContext(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchContext(schoolId: string, data: any): Promise<any>;
  updateSearchContext(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchContext(schoolId: string, id: string): Promise<void>;

  getSearchVersion(schoolId: string, id: string): Promise<any | null>;
  listSearchVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchVersion(schoolId: string, data: any): Promise<any>;
  updateSearchVersion(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchVersion(schoolId: string, id: string): Promise<void>;

  getSearchMigration(schoolId: string, id: string): Promise<any | null>;
  listSearchMigration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchMigration(schoolId: string, data: any): Promise<any>;
  updateSearchMigration(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchMigration(schoolId: string, id: string): Promise<void>;

  getSearchMigrationStep(schoolId: string, id: string): Promise<any | null>;
  listSearchMigrationStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchMigrationStep(schoolId: string, data: any): Promise<any>;
  updateSearchMigrationStep(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchMigrationStep(schoolId: string, id: string): Promise<void>;

  getSearchAuditLog(schoolId: string, id: string): Promise<any | null>;
  listSearchAuditLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSearchAuditLog(schoolId: string, data: any): Promise<any>;
  updateSearchAuditLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteSearchAuditLog(schoolId: string, id: string): Promise<void>;

}

class GreenModuleRepositoryImpl implements GreenModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // SEARCH-PLATFORM
  // =============================================================================
  async getGlobalSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('global_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGlobalSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('global_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGlobalSearchError(error.message);
    return data ?? [];
  }

  async createGlobalSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('global_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGlobalSearchError(error.message);
    return result;
  }

  async updateGlobalSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('global_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGlobalSearchError(error.message);
    return result;
  }

  async deleteGlobalSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('global_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGlobalSearchError(error.message);
  }

  async getSemanticSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('semantic_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSemanticSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('semantic_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSemanticSearchError(error.message);
    return data ?? [];
  }

  async createSemanticSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('semantic_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSemanticSearchError(error.message);
    return result;
  }

  async updateSemanticSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('semantic_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSemanticSearchError(error.message);
    return result;
  }

  async deleteSemanticSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('semantic_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSemanticSearchError(error.message);
  }

  async getOCRSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrsearches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrsearches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRSearchError(error.message);
    return data ?? [];
  }

  async createOCRSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrsearches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRSearchError(error.message);
    return result;
  }

  async updateOCRSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrsearches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRSearchError(error.message);
    return result;
  }

  async deleteOCRSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrsearches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRSearchError(error.message);
  }

  async getVoiceSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('voice_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVoiceSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('voice_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVoiceSearchError(error.message);
    return data ?? [];
  }

  async createVoiceSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('voice_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVoiceSearchError(error.message);
    return result;
  }

  async updateVoiceSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('voice_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVoiceSearchError(error.message);
    return result;
  }

  async deleteVoiceSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('voice_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVoiceSearchError(error.message);
  }

  async getImageSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('image_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImageSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('image_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImageSearchError(error.message);
    return data ?? [];
  }

  async createImageSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('image_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImageSearchError(error.message);
    return result;
  }

  async updateImageSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('image_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImageSearchError(error.message);
    return result;
  }

  async deleteImageSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('image_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImageSearchError(error.message);
  }

  async getKnowledgeSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('knowledge_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listKnowledgeSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('knowledge_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudKnowledgeSearchError(error.message);
    return data ?? [];
  }

  async createKnowledgeSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('knowledge_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeSearchError(error.message);
    return result;
  }

  async updateKnowledgeSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('knowledge_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudKnowledgeSearchError(error.message);
    return result;
  }

  async deleteKnowledgeSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('knowledge_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudKnowledgeSearchError(error.message);
  }

  async getFederatedSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federated_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederatedSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federated_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederatedSearchError(error.message);
    return data ?? [];
  }

  async createFederatedSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federated_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederatedSearchError(error.message);
    return result;
  }

  async updateFederatedSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federated_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederatedSearchError(error.message);
    return result;
  }

  async deleteFederatedSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federated_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederatedSearchError(error.message);
  }

  async getCrossTenantSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cross_tenant_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCrossTenantSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cross_tenant_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCrossTenantSearchError(error.message);
    return data ?? [];
  }

  async createCrossTenantSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cross_tenant_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantSearchError(error.message);
    return result;
  }

  async updateCrossTenantSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cross_tenant_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantSearchError(error.message);
    return result;
  }

  async deleteCrossTenantSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cross_tenant_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCrossTenantSearchError(error.message);
  }

  async getNaturalLanguageSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('natural_language_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNaturalLanguageSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('natural_language_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNaturalLanguageSearchError(error.message);
    return data ?? [];
  }

  async createNaturalLanguageSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('natural_language_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNaturalLanguageSearchError(error.message);
    return result;
  }

  async updateNaturalLanguageSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('natural_language_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNaturalLanguageSearchError(error.message);
    return result;
  }

  async deleteNaturalLanguageSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('natural_language_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNaturalLanguageSearchError(error.message);
  }

  async getSearchQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchQueryError(error.message);
    return data ?? [];
  }

  async createSearchQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchQueryError(error.message);
    return result;
  }

  async updateSearchQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchQueryError(error.message);
    return result;
  }

  async deleteSearchQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchQueryError(error.message);
  }

  async getSearchFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchFilterError(error.message);
    return data ?? [];
  }

  async createSearchFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchFilterError(error.message);
    return result;
  }

  async updateSearchFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchFilterError(error.message);
    return result;
  }

  async deleteSearchFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchFilterError(error.message);
  }

  async getSearchFacet(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_facets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchFacet(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_facets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchFacetError(error.message);
    return data ?? [];
  }

  async createSearchFacet(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_facets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchFacetError(error.message);
    return result;
  }

  async updateSearchFacet(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_facets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchFacetError(error.message);
    return result;
  }

  async deleteSearchFacet(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_facets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchFacetError(error.message);
  }

  async getSearchFacetRange(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_facet_ranges')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchFacetRange(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_facet_ranges').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchFacetRangeError(error.message);
    return data ?? [];
  }

  async createSearchFacetRange(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_facet_ranges')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchFacetRangeError(error.message);
    return result;
  }

  async updateSearchFacetRange(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_facet_ranges')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchFacetRangeError(error.message);
    return result;
  }

  async deleteSearchFacetRange(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_facet_ranges')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchFacetRangeError(error.message);
  }

  async getSearchHighlight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_highlights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchHighlight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_highlights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchHighlightError(error.message);
    return data ?? [];
  }

  async createSearchHighlight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_highlights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchHighlightError(error.message);
    return result;
  }

  async updateSearchHighlight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_highlights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchHighlightError(error.message);
    return result;
  }

  async deleteSearchHighlight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_highlights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchHighlightError(error.message);
  }

  async getSearchIndex(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_indexes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchIndexError(error.message);
    return data ?? [];
  }

  async createSearchIndex(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_indexes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchIndexError(error.message);
    return result;
  }

  async updateSearchIndex(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_indexes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchIndexError(error.message);
    return result;
  }

  async deleteSearchIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_indexes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchIndexError(error.message);
  }

  async getSearchDocument(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_documents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchDocument(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_documents').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchDocumentError(error.message);
    return data ?? [];
  }

  async createSearchDocument(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_documents')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchDocumentError(error.message);
    return result;
  }

  async updateSearchDocument(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_documents')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchDocumentError(error.message);
    return result;
  }

  async deleteSearchDocument(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_documents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchDocumentError(error.message);
  }

  async getSearchField(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_fields')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_fields').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchFieldError(error.message);
    return data ?? [];
  }

  async createSearchField(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_fields')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchFieldError(error.message);
    return result;
  }

  async updateSearchField(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_fields')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchFieldError(error.message);
    return result;
  }

  async deleteSearchField(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_fields')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchFieldError(error.message);
  }

  async getSearchSchema(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_schemas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchSchema(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_schemas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchSchemaError(error.message);
    return data ?? [];
  }

  async createSearchSchema(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_schemas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchSchemaError(error.message);
    return result;
  }

  async updateSearchSchema(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_schemas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchSchemaError(error.message);
    return result;
  }

  async deleteSearchSchema(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_schemas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchSchemaError(error.message);
  }

  async getSearchMapping(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_mappings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchMapping(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_mappings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchMappingError(error.message);
    return data ?? [];
  }

  async createSearchMapping(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_mappings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchMappingError(error.message);
    return result;
  }

  async updateSearchMapping(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_mappings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchMappingError(error.message);
    return result;
  }

  async deleteSearchMapping(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_mappings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchMappingError(error.message);
  }

  async getSearchAnalyzer(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_analyzers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAnalyzer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_analyzers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAnalyzerError(error.message);
    return data ?? [];
  }

  async createSearchAnalyzer(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_analyzers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAnalyzerError(error.message);
    return result;
  }

  async updateSearchAnalyzer(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_analyzers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAnalyzerError(error.message);
    return result;
  }

  async deleteSearchAnalyzer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_analyzers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAnalyzerError(error.message);
  }

  async getSearchTokenizer(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_tokenizers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchTokenizer(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_tokenizers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchTokenizerError(error.message);
    return data ?? [];
  }

  async createSearchTokenizer(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_tokenizers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchTokenizerError(error.message);
    return result;
  }

  async updateSearchTokenizer(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_tokenizers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchTokenizerError(error.message);
    return result;
  }

  async deleteSearchTokenizer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_tokenizers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchTokenizerError(error.message);
  }

  async getSearchTokenFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_token_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchTokenFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_token_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchTokenFilterError(error.message);
    return data ?? [];
  }

  async createSearchTokenFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_token_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchTokenFilterError(error.message);
    return result;
  }

  async updateSearchTokenFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_token_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchTokenFilterError(error.message);
    return result;
  }

  async deleteSearchTokenFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_token_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchTokenFilterError(error.message);
  }

  async getSearchConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchError(error.message);
    return data ?? [];
  }

  async createSearchConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchError(error.message);
    return result;
  }

  async updateSearchConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchError(error.message);
    return result;
  }

  async deleteSearchConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchError(error.message);
  }

  async getSearchSecurityConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_securitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchSecurityConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_securitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchSecurityError(error.message);
    return data ?? [];
  }

  async createSearchSecurityConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_securitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchSecurityError(error.message);
    return result;
  }

  async updateSearchSecurityConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_securitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchSecurityError(error.message);
    return result;
  }

  async deleteSearchSecurityConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_securitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchSecurityError(error.message);
  }

  async getSearchPerformanceMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_performance_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchPerformanceMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_performance_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchPerformanceMetricsError(error.message);
    return data ?? [];
  }

  async createSearchPerformanceMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_performance_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchPerformanceMetricsError(error.message);
    return result;
  }

  async updateSearchPerformanceMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_performance_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchPerformanceMetricsError(error.message);
    return result;
  }

  async deleteSearchPerformanceMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_performance_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchPerformanceMetricsError(error.message);
  }

  async getSearchAnalyticsData(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_analytics_datas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAnalyticsData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_analytics_datas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAnalyticsDataError(error.message);
    return data ?? [];
  }

  async createSearchAnalyticsData(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_analytics_datas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAnalyticsDataError(error.message);
    return result;
  }

  async updateSearchAnalyticsData(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_analytics_datas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAnalyticsDataError(error.message);
    return result;
  }

  async deleteSearchAnalyticsData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_analytics_datas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAnalyticsDataError(error.message);
  }

  async getSearchAnalyticsEntry(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAnalyticsEntry(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAnalyticsError(error.message);
    return data ?? [];
  }

  async createSearchAnalyticsEntry(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAnalyticsError(error.message);
    return result;
  }

  async updateSearchAnalyticsEntry(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAnalyticsError(error.message);
    return result;
  }

  async deleteSearchAnalyticsEntry(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAnalyticsError(error.message);
  }

  async getSearchResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchResultError(error.message);
    return data ?? [];
  }

  async createSearchResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchResultError(error.message);
    return result;
  }

  async updateSearchResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchResultError(error.message);
    return result;
  }

  async deleteSearchResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchResultError(error.message);
  }

  async getSearchResultItem(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_result_items')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchResultItem(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_result_items').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchResultItemError(error.message);
    return data ?? [];
  }

  async createSearchResultItem(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_result_items')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchResultItemError(error.message);
    return result;
  }

  async updateSearchResultItem(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_result_items')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchResultItemError(error.message);
    return result;
  }

  async deleteSearchResultItem(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_result_items')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchResultItemError(error.message);
  }

  async getSearchResultGroup(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_result_groups')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchResultGroup(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_result_groups').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchResultGroupError(error.message);
    return data ?? [];
  }

  async createSearchResultGroup(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_result_groups')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchResultGroupError(error.message);
    return result;
  }

  async updateSearchResultGroup(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_result_groups')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchResultGroupError(error.message);
    return result;
  }

  async deleteSearchResultGroup(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_result_groups')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchResultGroupError(error.message);
  }

  async getSearchResultSnippet(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_result_snippets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchResultSnippet(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_result_snippets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchResultSnippetError(error.message);
    return data ?? [];
  }

  async createSearchResultSnippet(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_result_snippets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchResultSnippetError(error.message);
    return result;
  }

  async updateSearchResultSnippet(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_result_snippets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchResultSnippetError(error.message);
    return result;
  }

  async deleteSearchResultSnippet(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_result_snippets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchResultSnippetError(error.message);
  }

  async getSearchSuggestion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_suggestioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchSuggestion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_suggestioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchSuggestionError(error.message);
    return data ?? [];
  }

  async createSearchSuggestion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_suggestioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchSuggestionError(error.message);
    return result;
  }

  async updateSearchSuggestion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_suggestioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchSuggestionError(error.message);
    return result;
  }

  async deleteSearchSuggestion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_suggestioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchSuggestionError(error.message);
  }

  async getSearchAutoComplete(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_auto_completes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAutoComplete(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_auto_completes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAutoCompleteError(error.message);
    return data ?? [];
  }

  async createSearchAutoComplete(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_auto_completes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAutoCompleteError(error.message);
    return result;
  }

  async updateSearchAutoComplete(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_auto_completes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAutoCompleteError(error.message);
    return result;
  }

  async deleteSearchAutoComplete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_auto_completes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAutoCompleteError(error.message);
  }

  async getSearchSpellCheck(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_spell_checks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchSpellCheck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_spell_checks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchSpellCheckError(error.message);
    return data ?? [];
  }

  async createSearchSpellCheck(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_spell_checks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchSpellCheckError(error.message);
    return result;
  }

  async updateSearchSpellCheck(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_spell_checks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchSpellCheckError(error.message);
    return result;
  }

  async deleteSearchSpellCheck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_spell_checks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchSpellCheckError(error.message);
  }

  async getSearchSpellCorrection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_spell_correctioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchSpellCorrection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_spell_correctioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchSpellCorrectionError(error.message);
    return data ?? [];
  }

  async createSearchSpellCorrection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_spell_correctioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchSpellCorrectionError(error.message);
    return result;
  }

  async updateSearchSpellCorrection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_spell_correctioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchSpellCorrectionError(error.message);
    return result;
  }

  async deleteSearchSpellCorrection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_spell_correctioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchSpellCorrectionError(error.message);
  }

  async getSearchHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchHistoryError(error.message);
    return data ?? [];
  }

  async createSearchHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchHistoryError(error.message);
    return result;
  }

  async updateSearchHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchHistoryError(error.message);
    return result;
  }

  async deleteSearchHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchHistoryError(error.message);
  }

  async getSearchBookmark(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_bookmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchBookmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_bookmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchBookmarkError(error.message);
    return data ?? [];
  }

  async createSearchBookmark(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_bookmarks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchBookmarkError(error.message);
    return result;
  }

  async updateSearchBookmark(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_bookmarks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchBookmarkError(error.message);
    return result;
  }

  async deleteSearchBookmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_bookmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchBookmarkError(error.message);
  }

  async getSearchAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAlertError(error.message);
    return data ?? [];
  }

  async createSearchAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAlertError(error.message);
    return result;
  }

  async updateSearchAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAlertError(error.message);
    return result;
  }

  async deleteSearchAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAlertError(error.message);
  }

  async getSearchNotification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_notificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchNotification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_notificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchNotificationError(error.message);
    return data ?? [];
  }

  async createSearchNotification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_notificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchNotificationError(error.message);
    return result;
  }

  async updateSearchNotification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_notificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchNotificationError(error.message);
    return result;
  }

  async deleteSearchNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_notificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchNotificationError(error.message);
  }

  async getSearchPipeline(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_pipelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchPipeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_pipelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchPipelineError(error.message);
    return data ?? [];
  }

  async createSearchPipeline(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_pipelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchPipelineError(error.message);
    return result;
  }

  async updateSearchPipeline(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_pipelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchPipelineError(error.message);
    return result;
  }

  async deleteSearchPipeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_pipelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchPipelineError(error.message);
  }

  async getSearchStage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_stages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchStage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_stages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchStageError(error.message);
    return data ?? [];
  }

  async createSearchStage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_stages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchStageError(error.message);
    return result;
  }

  async updateSearchStage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_stages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchStageError(error.message);
    return result;
  }

  async deleteSearchStage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_stages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchStageError(error.message);
  }

  async getSearchRun(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_runs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchRun(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_runs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchRunError(error.message);
    return data ?? [];
  }

  async createSearchRun(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_runs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchRunError(error.message);
    return result;
  }

  async updateSearchRun(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_runs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchRunError(error.message);
    return result;
  }

  async deleteSearchRun(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_runs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchRunError(error.message);
  }

  async getSearchMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchMetricError(error.message);
    return data ?? [];
  }

  async createSearchMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchMetricError(error.message);
    return result;
  }

  async updateSearchMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchMetricError(error.message);
    return result;
  }

  async deleteSearchMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchMetricError(error.message);
  }

  async getSearchTemplate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchTemplateError(error.message);
    return data ?? [];
  }

  async createSearchTemplate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchTemplateError(error.message);
    return result;
  }

  async updateSearchTemplate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchTemplateError(error.message);
    return result;
  }

  async deleteSearchTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchTemplateError(error.message);
  }

  async getSearchTemplateParameter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_template_parameters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchTemplateParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_template_parameters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchTemplateParameterError(error.message);
    return data ?? [];
  }

  async createSearchTemplateParameter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_template_parameters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchTemplateParameterError(error.message);
    return result;
  }

  async updateSearchTemplateParameter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_template_parameters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchTemplateParameterError(error.message);
    return result;
  }

  async deleteSearchTemplateParameter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_template_parameters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchTemplateParameterError(error.message);
  }

  async getSearchPreset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_presets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_presets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchPresetError(error.message);
    return data ?? [];
  }

  async createSearchPreset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_presets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchPresetError(error.message);
    return result;
  }

  async updateSearchPreset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_presets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchPresetError(error.message);
    return result;
  }

  async deleteSearchPreset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_presets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchPresetError(error.message);
  }

  async getSearchExport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_exports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchExport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_exports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchExportError(error.message);
    return data ?? [];
  }

  async createSearchExport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_exports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchExportError(error.message);
    return result;
  }

  async updateSearchExport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_exports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchExportError(error.message);
    return result;
  }

  async deleteSearchExport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_exports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchExportError(error.message);
  }

  async getSearchAI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_ais').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAIError(error.message);
    return data ?? [];
  }

  async createSearchAI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAIError(error.message);
    return result;
  }

  async updateSearchAI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAIError(error.message);
    return result;
  }

  async deleteSearchAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAIError(error.message);
  }

  async getSearchAIModel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_aimodels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_aimodels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAIModelError(error.message);
    return data ?? [];
  }

  async createSearchAIModel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_aimodels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAIModelError(error.message);
    return result;
  }

  async updateSearchAIModel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_aimodels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAIModelError(error.message);
    return result;
  }

  async deleteSearchAIModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_aimodels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAIModelError(error.message);
  }

  async getSearchAIInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_aiinsights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAIInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_aiinsights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAIInsightError(error.message);
    return data ?? [];
  }

  async createSearchAIInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_aiinsights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAIInsightError(error.message);
    return result;
  }

  async updateSearchAIInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_aiinsights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAIInsightError(error.message);
    return result;
  }

  async deleteSearchAIInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_aiinsights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAIInsightError(error.message);
  }

  async getSearchAIQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_aiquerys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAIQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_aiquerys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAIQueryError(error.message);
    return data ?? [];
  }

  async createSearchAIQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_aiquerys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAIQueryError(error.message);
    return result;
  }

  async updateSearchAIQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_aiquerys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAIQueryError(error.message);
    return result;
  }

  async deleteSearchAIQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_aiquerys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAIQueryError(error.message);
  }

  async getVectorEmbedding(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vector_embeddings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVectorEmbedding(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vector_embeddings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVectorEmbeddingError(error.message);
    return data ?? [];
  }

  async createVectorEmbedding(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vector_embeddings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVectorEmbeddingError(error.message);
    return result;
  }

  async updateVectorEmbedding(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vector_embeddings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVectorEmbeddingError(error.message);
    return result;
  }

  async deleteVectorEmbedding(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vector_embeddings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVectorEmbeddingError(error.message);
  }

  async getVectorSearch(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vector_searches')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVectorSearch(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vector_searches').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVectorSearchError(error.message);
    return data ?? [];
  }

  async createVectorSearch(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vector_searches')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVectorSearchError(error.message);
    return result;
  }

  async updateVectorSearch(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vector_searches')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVectorSearchError(error.message);
    return result;
  }

  async deleteVectorSearch(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vector_searches')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVectorSearchError(error.message);
  }

  async getVectorSearchResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vector_search_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVectorSearchResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vector_search_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVectorSearchResultError(error.message);
    return data ?? [];
  }

  async createVectorSearchResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vector_search_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVectorSearchResultError(error.message);
    return result;
  }

  async updateVectorSearchResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vector_search_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVectorSearchResultError(error.message);
    return result;
  }

  async deleteVectorSearchResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vector_search_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVectorSearchResultError(error.message);
  }

  async getVectorIndex(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vector_indexes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVectorIndex(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vector_indexes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVectorIndexError(error.message);
    return data ?? [];
  }

  async createVectorIndex(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vector_indexes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVectorIndexError(error.message);
    return result;
  }

  async updateVectorIndex(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vector_indexes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVectorIndexError(error.message);
    return result;
  }

  async deleteVectorIndex(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vector_indexes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVectorIndexError(error.message);
  }

  async getVectorStoreConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vector_stores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVectorStoreConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vector_stores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVectorStoreError(error.message);
    return data ?? [];
  }

  async createVectorStoreConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vector_stores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVectorStoreError(error.message);
    return result;
  }

  async updateVectorStoreConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vector_stores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVectorStoreError(error.message);
    return result;
  }

  async deleteVectorStoreConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vector_stores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVectorStoreError(error.message);
  }

  async getOCRDocument(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrdocuments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRDocument(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrdocuments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRDocumentError(error.message);
    return data ?? [];
  }

  async createOCRDocument(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrdocuments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRDocumentError(error.message);
    return result;
  }

  async updateOCRDocument(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrdocuments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRDocumentError(error.message);
    return result;
  }

  async deleteOCRDocument(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrdocuments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRDocumentError(error.message);
  }

  async getOCRResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrresults')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrresults').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRResultError(error.message);
    return data ?? [];
  }

  async createOCRResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrresults')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRResultError(error.message);
    return result;
  }

  async updateOCRResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrresults')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRResultError(error.message);
    return result;
  }

  async deleteOCRResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrresults')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRResultError(error.message);
  }

  async getOCRPage(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrpages')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRPage(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrpages').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRPageError(error.message);
    return data ?? [];
  }

  async createOCRPage(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrpages')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRPageError(error.message);
    return result;
  }

  async updateOCRPage(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrpages')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRPageError(error.message);
    return result;
  }

  async deleteOCRPage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrpages')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRPageError(error.message);
  }

  async getOCRBlock(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrblocks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRBlock(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrblocks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRBlockError(error.message);
    return data ?? [];
  }

  async createOCRBlock(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrblocks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRBlockError(error.message);
    return result;
  }

  async updateOCRBlock(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrblocks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRBlockError(error.message);
    return result;
  }

  async deleteOCRBlock(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrblocks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRBlockError(error.message);
  }

  async getOCRTable(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrtables')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRTable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrtables').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRTableError(error.message);
    return data ?? [];
  }

  async createOCRTable(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrtables')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRTableError(error.message);
    return result;
  }

  async updateOCRTable(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrtables')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRTableError(error.message);
    return result;
  }

  async deleteOCRTable(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrtables')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRTableError(error.message);
  }

  async getOCRTableCell(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrtable_cells')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRTableCell(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrtable_cells').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRTableCellError(error.message);
    return data ?? [];
  }

  async createOCRTableCell(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrtable_cells')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRTableCellError(error.message);
    return result;
  }

  async updateOCRTableCell(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrtable_cells')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRTableCellError(error.message);
    return result;
  }

  async deleteOCRTableCell(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrtable_cells')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRTableCellError(error.message);
  }

  async getOCRField(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ocrfields')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOCRField(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ocrfields').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOCRFieldError(error.message);
    return data ?? [];
  }

  async createOCRField(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ocrfields')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOCRFieldError(error.message);
    return result;
  }

  async updateOCRField(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ocrfields')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOCRFieldError(error.message);
    return result;
  }

  async deleteOCRField(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ocrfields')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOCRFieldError(error.message);
  }

  async getVoiceQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('voice_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVoiceQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('voice_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVoiceQueryError(error.message);
    return data ?? [];
  }

  async createVoiceQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('voice_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVoiceQueryError(error.message);
    return result;
  }

  async updateVoiceQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('voice_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVoiceQueryError(error.message);
    return result;
  }

  async deleteVoiceQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('voice_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVoiceQueryError(error.message);
  }

  async getVoiceResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('voice_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVoiceResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('voice_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVoiceResultError(error.message);
    return data ?? [];
  }

  async createVoiceResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('voice_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVoiceResultError(error.message);
    return result;
  }

  async updateVoiceResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('voice_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVoiceResultError(error.message);
    return result;
  }

  async deleteVoiceResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('voice_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVoiceResultError(error.message);
  }

  async getVoiceTranscription(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('voice_transcriptioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVoiceTranscription(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('voice_transcriptioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVoiceTranscriptionError(error.message);
    return data ?? [];
  }

  async createVoiceTranscription(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('voice_transcriptioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVoiceTranscriptionError(error.message);
    return result;
  }

  async updateVoiceTranscription(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('voice_transcriptioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVoiceTranscriptionError(error.message);
    return result;
  }

  async deleteVoiceTranscription(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('voice_transcriptioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVoiceTranscriptionError(error.message);
  }

  async getVoiceWord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('voice_words')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVoiceWord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('voice_words').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVoiceWordError(error.message);
    return data ?? [];
  }

  async createVoiceWord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('voice_words')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVoiceWordError(error.message);
    return result;
  }

  async updateVoiceWord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('voice_words')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVoiceWordError(error.message);
    return result;
  }

  async deleteVoiceWord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('voice_words')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVoiceWordError(error.message);
  }

  async getVoiceCommand(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('voice_commands')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVoiceCommand(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('voice_commands').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVoiceCommandError(error.message);
    return data ?? [];
  }

  async createVoiceCommand(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('voice_commands')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVoiceCommandError(error.message);
    return result;
  }

  async updateVoiceCommand(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('voice_commands')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVoiceCommandError(error.message);
    return result;
  }

  async deleteVoiceCommand(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('voice_commands')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVoiceCommandError(error.message);
  }

  async getImageQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('image_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImageQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('image_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImageQueryError(error.message);
    return data ?? [];
  }

  async createImageQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('image_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImageQueryError(error.message);
    return result;
  }

  async updateImageQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('image_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImageQueryError(error.message);
    return result;
  }

  async deleteImageQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('image_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImageQueryError(error.message);
  }

  async getImageResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('image_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImageResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('image_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImageResultError(error.message);
    return data ?? [];
  }

  async createImageResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('image_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImageResultError(error.message);
    return result;
  }

  async updateImageResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('image_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImageResultError(error.message);
    return result;
  }

  async deleteImageResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('image_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImageResultError(error.message);
  }

  async getImageAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('image_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImageAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('image_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImageAnalysisError(error.message);
    return data ?? [];
  }

  async createImageAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('image_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImageAnalysisError(error.message);
    return result;
  }

  async updateImageAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('image_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImageAnalysisError(error.message);
    return result;
  }

  async deleteImageAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('image_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImageAnalysisError(error.message);
  }

  async getImageObject(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('image_objects')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImageObject(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('image_objects').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImageObjectError(error.message);
    return data ?? [];
  }

  async createImageObject(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('image_objects')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImageObjectError(error.message);
    return result;
  }

  async updateImageObject(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('image_objects')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImageObjectError(error.message);
    return result;
  }

  async deleteImageObject(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('image_objects')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImageObjectError(error.message);
  }

  async getImageFace(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('image_faces')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImageFace(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('image_faces').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImageFaceError(error.message);
    return data ?? [];
  }

  async createImageFace(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('image_faces')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImageFaceError(error.message);
    return result;
  }

  async updateImageFace(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('image_faces')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImageFaceError(error.message);
    return result;
  }

  async deleteImageFace(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('image_faces')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImageFaceError(error.message);
  }

  async getImageTag(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('image_tags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImageTag(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('image_tags').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImageTagError(error.message);
    return data ?? [];
  }

  async createImageTag(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('image_tags')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImageTagError(error.message);
    return result;
  }

  async updateImageTag(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('image_tags')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImageTagError(error.message);
    return result;
  }

  async deleteImageTag(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('image_tags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImageTagError(error.message);
  }

  async getFederatedSourceConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federated_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederatedSourceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federated_sources').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederatedSourceError(error.message);
    return data ?? [];
  }

  async createFederatedSourceConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federated_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederatedSourceError(error.message);
    return result;
  }

  async updateFederatedSourceConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federated_sources')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederatedSourceError(error.message);
    return result;
  }

  async deleteFederatedSourceConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federated_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederatedSourceError(error.message);
  }

  async getFederatedQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federated_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederatedQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federated_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederatedQueryError(error.message);
    return data ?? [];
  }

  async createFederatedQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federated_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederatedQueryError(error.message);
    return result;
  }

  async updateFederatedQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federated_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederatedQueryError(error.message);
    return result;
  }

  async deleteFederatedQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federated_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederatedQueryError(error.message);
  }

  async getFederatedResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federated_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederatedResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federated_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederatedResultError(error.message);
    return data ?? [];
  }

  async createFederatedResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federated_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederatedResultError(error.message);
    return result;
  }

  async updateFederatedResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federated_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederatedResultError(error.message);
    return result;
  }

  async deleteFederatedResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federated_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederatedResultError(error.message);
  }

  async getFederatedConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('federateds')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFederatedConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('federateds').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFederatedError(error.message);
    return data ?? [];
  }

  async createFederatedConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('federateds')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFederatedError(error.message);
    return result;
  }

  async updateFederatedConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('federateds')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFederatedError(error.message);
    return result;
  }

  async deleteFederatedConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('federateds')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFederatedError(error.message);
  }

  async getCrossTenantQuery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cross_tenant_querys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCrossTenantQuery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cross_tenant_querys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCrossTenantQueryError(error.message);
    return data ?? [];
  }

  async createCrossTenantQuery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cross_tenant_querys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantQueryError(error.message);
    return result;
  }

  async updateCrossTenantQuery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cross_tenant_querys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantQueryError(error.message);
    return result;
  }

  async deleteCrossTenantQuery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cross_tenant_querys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCrossTenantQueryError(error.message);
  }

  async getCrossTenantResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cross_tenant_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCrossTenantResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cross_tenant_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCrossTenantResultError(error.message);
    return data ?? [];
  }

  async createCrossTenantResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cross_tenant_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantResultError(error.message);
    return result;
  }

  async updateCrossTenantResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cross_tenant_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantResultError(error.message);
    return result;
  }

  async deleteCrossTenantResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cross_tenant_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCrossTenantResultError(error.message);
  }

  async getCrossTenantConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('cross_tenants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCrossTenantConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('cross_tenants').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCrossTenantError(error.message);
    return data ?? [];
  }

  async createCrossTenantConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('cross_tenants')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantError(error.message);
    return result;
  }

  async updateCrossTenantConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('cross_tenants')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCrossTenantError(error.message);
    return result;
  }

  async deleteCrossTenantConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('cross_tenants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCrossTenantError(error.message);
  }

  async getSearchDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchDashboardError(error.message);
    return data ?? [];
  }

  async createSearchDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchDashboardError(error.message);
    return result;
  }

  async updateSearchDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchDashboardError(error.message);
    return result;
  }

  async deleteSearchDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchDashboardError(error.message);
  }

  async getSearchDashboardWidget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_dashboard_widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_dashboard_widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchDashboardWidgetError(error.message);
    return data ?? [];
  }

  async createSearchDashboardWidget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_dashboard_widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchDashboardWidgetError(error.message);
    return result;
  }

  async updateSearchDashboardWidget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_dashboard_widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchDashboardWidgetError(error.message);
    return result;
  }

  async deleteSearchDashboardWidget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_dashboard_widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchDashboardWidgetError(error.message);
  }

  async getSearchReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchReportError(error.message);
    return data ?? [];
  }

  async createSearchReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchReportError(error.message);
    return result;
  }

  async updateSearchReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchReportError(error.message);
    return result;
  }

  async deleteSearchReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchReportError(error.message);
  }

  async getSearchInsight(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_insights')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_insights').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchInsightError(error.message);
    return data ?? [];
  }

  async createSearchInsight(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_insights')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchInsightError(error.message);
    return result;
  }

  async updateSearchInsight(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_insights')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchInsightError(error.message);
    return result;
  }

  async deleteSearchInsight(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_insights')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchInsightError(error.message);
  }

  async getSearchEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchEventError(error.message);
    return data ?? [];
  }

  async createSearchEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchEventError(error.message);
    return result;
  }

  async updateSearchEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchEventError(error.message);
    return result;
  }

  async deleteSearchEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchEventError(error.message);
  }

  async getSearchQualityAssessment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_quality_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchQualityAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_quality_assessments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchQualityAssessmentError(error.message);
    return data ?? [];
  }

  async createSearchQualityAssessment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_quality_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchQualityAssessmentError(error.message);
    return result;
  }

  async updateSearchQualityAssessment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_quality_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchQualityAssessmentError(error.message);
    return result;
  }

  async deleteSearchQualityAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_quality_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchQualityAssessmentError(error.message);
  }

  async getSearchRelevance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_relevances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchRelevance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_relevances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchRelevanceError(error.message);
    return data ?? [];
  }

  async createSearchRelevance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_relevances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchRelevanceError(error.message);
    return result;
  }

  async updateSearchRelevance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_relevances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchRelevanceError(error.message);
    return result;
  }

  async deleteSearchRelevance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_relevances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchRelevanceError(error.message);
  }

  async getSearchRanking(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_rankings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchRanking(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_rankings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchRankingError(error.message);
    return data ?? [];
  }

  async createSearchRanking(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_rankings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchRankingError(error.message);
    return result;
  }

  async updateSearchRanking(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_rankings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchRankingError(error.message);
    return result;
  }

  async deleteSearchRanking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_rankings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchRankingError(error.message);
  }

  async getSearchPersonalizationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_personalizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchPersonalizationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_personalizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchPersonalizationError(error.message);
    return data ?? [];
  }

  async createSearchPersonalizationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_personalizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchPersonalizationError(error.message);
    return result;
  }

  async updateSearchPersonalizationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_personalizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchPersonalizationError(error.message);
    return result;
  }

  async deleteSearchPersonalizationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_personalizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchPersonalizationError(error.message);
  }

  async getSearchRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchRecommendationError(error.message);
    return data ?? [];
  }

  async createSearchRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchRecommendationError(error.message);
    return result;
  }

  async updateSearchRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchRecommendationError(error.message);
    return result;
  }

  async deleteSearchRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchRecommendationError(error.message);
  }

  async getSearchContext(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_contexts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchContext(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_contexts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchContextError(error.message);
    return data ?? [];
  }

  async createSearchContext(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_contexts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchContextError(error.message);
    return result;
  }

  async updateSearchContext(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_contexts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchContextError(error.message);
    return result;
  }

  async deleteSearchContext(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_contexts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchContextError(error.message);
  }

  async getSearchVersion(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_versioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchVersion(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_versioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchVersionError(error.message);
    return data ?? [];
  }

  async createSearchVersion(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_versioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchVersionError(error.message);
    return result;
  }

  async updateSearchVersion(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_versioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchVersionError(error.message);
    return result;
  }

  async deleteSearchVersion(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_versioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchVersionError(error.message);
  }

  async getSearchMigration(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_migratioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchMigration(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_migratioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchMigrationError(error.message);
    return data ?? [];
  }

  async createSearchMigration(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_migratioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchMigrationError(error.message);
    return result;
  }

  async updateSearchMigration(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_migratioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchMigrationError(error.message);
    return result;
  }

  async deleteSearchMigration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_migratioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchMigrationError(error.message);
  }

  async getSearchMigrationStep(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_migration_steps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchMigrationStep(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_migration_steps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchMigrationStepError(error.message);
    return data ?? [];
  }

  async createSearchMigrationStep(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_migration_steps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchMigrationStepError(error.message);
    return result;
  }

  async updateSearchMigrationStep(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_migration_steps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchMigrationStepError(error.message);
    return result;
  }

  async deleteSearchMigrationStep(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_migration_steps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchMigrationStepError(error.message);
  }

  async getSearchAuditLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('search_audit_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSearchAuditLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('search_audit_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSearchAuditLogError(error.message);
    return data ?? [];
  }

  async createSearchAuditLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('search_audit_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSearchAuditLogError(error.message);
    return result;
  }

  async updateSearchAuditLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('search_audit_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSearchAuditLogError(error.message);
    return result;
  }

  async deleteSearchAuditLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('search_audit_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSearchAuditLogError(error.message);
  }

}

export function createGreenModuleRepository(supabase: SupabaseClient): GreenModuleRepository {
  return new GreenModuleRepositoryImpl(supabase);
}

