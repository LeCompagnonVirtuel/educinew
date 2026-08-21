import type {
  DocDocument,
  DocFolder,
  DocWorkspace,
  DocPermission,
  DocAccess,
  DocActivity,
  DocComment,
  DocTag,
  DocCategoryEntity,
  DocArchive,
  DocArchiveRule,
  DocArchivePolicy,
  DocSignature,
  DocSignatureRequest,
  DocSignatureWorkflow,
  DocApprovalWorkflow,
  DocApprovalStep,
  DocApprovalHistory,
  DocOCRResult,
  DocOCRField,
  DocOCRTemplate,
  DocScanJob,
  DocFileMetadata,
  DocFileChecksum,
  DocFileStorage,
  DocShareLink,
  DocSharePermission,
  DocWatermark,
  DocTemplate,
  DocGeneratedDocument,
  DocMergeDocument,
  DocAudit,
  DocRetention,
  DocLegalHold,
  DocTrash,
  DocRestoreHistory,
  DocExternalStorage,
  DocWebDAVConfig,
  DocBackupJob,
  DocVersion,
  DocVersionDiff,
  DocBulkOperation,
  DocConflictResolution,
  DocCheckout,
  DocLock,
  DocFavorite,
  DocRecentDocument,
  DocOfflineDocument,
  DocUploadSession,
  DocProcessingJob,
  DocClassificationResult,
  DocSearchIndex,
  DocSearchQuery,
  DocSearchResult,
  DocSearchFilter,
  DocNotification,
  DocReminder,
  DocExpiry,
  DocReview,
  DocReviewComment,
  DocApprovalRequest,
  DocDelegation,
  DocAccessLog,
  DocQuota,
  DocStorageUsage,
  DocAnalytics,
  DocInsight,
  DocRecommendation,
  DocDuplicateDetection,
  DocSimilarityResult,
  DocCompliance,
  DocRegulation,
  DocRetentionSchedule,
  DocDisposition,
  DocChainOfCustody,
  DocForensicAudit,
  DocTimestamp,
  DocDigitalID,
  DocCertificate,
  DocEncryption,
  DocDecryption,
  DocDRM,
  DocViewingSession,
  DocDownloadLog,
  DocPrintLog,
  DocWatermarkConfig,
  DocRedaction,
  DocAnnotation,
  DocHighlight,
  DocSignatureField,
  DocFormField,
  DocFormTemplate,
  DocFormInstance,
  DocBatchProcess,
  DocQueue,
  DocJobStatus,
  DocPipeline,
  DocTransform,
  DocConvertResult,
  DocValidateResult,
  DocSyncStatus,
  DocExternalSync,
  DocWebhook,
  DocAPIKey,
  DocRateLimit,
  DocUsage,
  DocBilling,
  DocPlan,
  DocFeature,
  DocIntegration,
  DocPlugin,
  DocExtension,
  DocTheme,
  DocBranding,
  DocCustomField,
  DocValidationRule,
  DocBusinessRule,
  DocConditionalAccess,
  DocRole,
  DocGroup,
  DocPolicy,
  DocComplianceRule,
  DocAuditTrail,
  DocEvent,
  DocEventHandler,
  DocEventLog,
  DocStatus,
  DocCategory,
  DocClassification,
  DocVisibility,
  DocStorage,
  DocSource,
  DocFormat,
  DocProcessingStatus,
  DocRetentionAction,
  FolderType,
  FolderStatus,
  WorkspaceType,
  WorkspaceStatus,
  PermissionType,
  AccessLevel,
  ShareType,
  ShareExpiry,
  SignatureStatus,
  SignatureType,
  SignatureLevel,
  ApprovalStatus,
  ApprovalType,
  ApprovalAction,
  WorkflowStatus,
  WorkflowType,
  WorkflowTrigger,
  WorkflowCondition,
  OCRStatus,
  OCRFieldType,
  OCRLanguage,
  OCRConfidence,
  ArchiveStatus,
  ArchiveType,
  ArchiveStorage,
  BackupStatus,
  BackupType,
  BackupFrequency,
  RestoreStatus,
  TrashStatus,
  WatermarkType,
  WatermarkPosition,
  TagType,
  ActivityType,
  CommentType,
  VersionDiff,
  SearchScopeDoc,
  ClassificationLevel,
  LegalHoldStatus,
  WebDAVStatus,
  ThumbnailStatus,
  MergeStatus,
  SplitStatus,
  CompressionLevel,
  ConversionFormat,
  ImportSource,
  ExportFormatDoc,
  AuditActionDoc,
  ScanMode,
  ProcessingPipeline,
  Document,
  DocumentVersion,
  DocumentPermissionEntry,
  DocumentComment,
  DocumentPermissionLevel,
  DocumentType,
} from '@educi/types';

export interface DocWorkflow {
  id: string;
  name: string;
  school_id: string;
  document_id?: string;
  status: string;
  type?: string;
  trigger?: string;
  is_template?: boolean;
  timeout_hours?: number;
  triggered_by?: string;
  triggered_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DocWorkflowHistory {
  id: string;
  workflow_id: string;
  document_id?: string;
  action: string;
  triggered_by?: string;
  created_at: string;
}

export interface DocWorkflowStep {
  id: string;
  workflow_id: string;
  step_order: number;
  name: string;
  status?: string;
  assignee_id?: string;
  created_at: string;
  updated_at: string;
}

export interface DocWorkflowCondition {
  id: string;
  workflow_id: string;
  type: string;
  field: string;
  operator: string;
  value: string;
  created_at: string;
}

export interface DocApprovalCondition {
  id: string;
  workflow_id: string;
  type: string;
  field: string;
  operator: string;
  value: string;
  created_at: string;
}

export interface DocumentRepositoryEnterprise {
  logDocumentEvent(schoolId: string, event: string, data: Record<string, unknown>): Promise<void>;
  getDocumentStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocStorageStats>;
  getDocumentActivityStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocActivityStats>;
  getVersionStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocVersionStats>;
  getPermissionStats(schoolId: string): Promise<DocPermissionStats>;
  getWorkflowStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocWorkflowStats>;
  getSignatureStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocSignatureStats>;
  getOCRArchiveStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocOCRArchiveStats>;
  getSearchStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocSearchStats>;
  getComplianceStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocComplianceStats>;
  getUsageStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocUsageStats>;
  getStorageQuota(schoolId: string): Promise<DocQuota>;
  bulkMoveDocuments(documentIds: string[], targetFolderId: string): Promise<DocBulkOperation>;
  bulkDeleteDocuments(documentIds: string[]): Promise<DocBulkOperation>;
  bulkTagDocuments(documentIds: string[], tagIds: string[]): Promise<DocBulkOperation>;
  bulkChangePermissions(documentIds: string[], permissionChanges: Record<string, string>[]): Promise<DocBulkOperation>;
  getRecentDocuments(schoolId: string, userId: string, limit?: number): Promise<DocDocument[]>;
  getFavoriteDocuments(schoolId: string, userId: string): Promise<DocDocument[]>;
  getDuplicateDocuments(schoolId: string): Promise<DocDuplicateDetection[]>;
  getDocumentTimeline(documentId: string): Promise<DocActivity[]>;
  getDocumentInsights(schoolId: string): Promise<DocInsight[]>;
  getDocumentRecommendations(schoolId: string, userId: string): Promise<DocRecommendation[]>;
  getRetentionSchedule(schoolId: string): Promise<DocRetentionSchedule[]>;
  getLegalHolds(schoolId: string): Promise<DocLegalHold[]>;
  getAuditTrail(schoolId: string, documentId?: string): Promise<DocAuditTrail[]>;
  getDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<DocDocument[]>;
  getDocument(documentId: string): Promise<DocDocument>;
  createDocument(data: Partial<DocDocument>, schoolId: string): Promise<DocDocument>;
  updateDocument(documentId: string, data: Partial<DocDocument>): Promise<DocDocument>;
  deleteDocument(documentId: string): Promise<void>;
  restoreDocument(documentId: string): Promise<DocDocument>;
  permanentDeleteDocument(documentId: string): Promise<void>;
  bulkRestoreDocuments(documentIds: string[]): Promise<DocBulkOperation>;
  getDocumentBySlug(schoolId: string, slug: string): Promise<DocDocument>;
  getDocumentByPath(schoolId: string, path: string): Promise<DocDocument>;
  getSharedDocuments(schoolId: string, userId: string): Promise<DocDocument[]>;
  getOfflineDocuments(schoolId: string, userId: string): Promise<DocDocument[]>;
  getLockedDocuments(schoolId: string): Promise<DocDocument[]>;
  getCheckedOutDocuments(schoolId: string): Promise<DocDocument[]>;
  getExpiredDocuments(schoolId: string): Promise<DocDocument[]>;
  getDocumentsByCategory(schoolId: string, category: string): Promise<DocDocument[]>;
  getDocumentsByTag(schoolId: string, tagId: string): Promise<DocDocument[]>;
  getDocumentsByAuthor(schoolId: string, authorId: string): Promise<DocDocument[]>;
  getDocumentsByDate(schoolId: string, dateFrom: string, dateTo: string): Promise<DocDocument[]>;
  getDocumentsBySize(schoolId: string, minSize?: number, maxSize?: number): Promise<DocDocument[]>;
  getDocumentsByType(schoolId: string, mimeType: string): Promise<DocDocument[]>;
  getDocumentsByStatus(schoolId: string, status: string): Promise<DocDocument[]>;
  getDocumentsByClassification(schoolId: string, classification: string): Promise<DocDocument[]>;
  getDocumentsByFolder(schoolId: string, folderId: string): Promise<DocDocument[]>;
  searchDocuments(schoolId: string, query: string): Promise<DocDocument[]>;
  getFolders(schoolId: string, filters?: Record<string, unknown>): Promise<DocFolder[]>;
  getFolder(folderId: string): Promise<DocFolder>;
  createFolder(data: Partial<DocFolder>, schoolId: string): Promise<DocFolder>;
  updateFolder(folderId: string, data: Partial<DocFolder>): Promise<DocFolder>;
  deleteFolder(folderId: string): Promise<void>;
  moveFolder(folderId: string, targetParentId: string): Promise<DocFolder>;
  renameFolder(folderId: string, newName: string): Promise<DocFolder>;
  getFolderTree(schoolId: string): Promise<DocFolder[]>;
  getFolderChildren(folderId: string): Promise<DocFolder[]>;
  getFolderPath(folderId: string): Promise<DocFolder[]>;
  getFolderSize(folderId: string): Promise<number>;
  getFolderDocumentCount(folderId: string): Promise<number>;
  getRootFolders(schoolId: string): Promise<DocFolder[]>;
  getSharedFolders(schoolId: string, userId: string): Promise<DocFolder[]>;
  getFavoriteFolders(schoolId: string): Promise<DocFolder[]>;
  getRecentFolders(schoolId: string): Promise<DocFolder[]>;
  getFolderByPath(schoolId: string, path: string): Promise<DocFolder>;
  getFolderPermissions(folderId: string): Promise<DocPermission[]>;
  getFolderActivities(folderId: string): Promise<DocActivity[]>;
  getFolderStats(schoolId: string): Promise<{ totalFolders: number; rootFolders: number; maxDepth: number; averageDocumentsPerFolder: number }>;
  getWorkspaces(schoolId: string): Promise<DocWorkspace[]>;
  getWorkspace(workspaceId: string): Promise<DocWorkspace>;
  createWorkspace(data: Partial<DocWorkspace>, schoolId: string): Promise<DocWorkspace>;
  updateWorkspace(workspaceId: string, data: Partial<DocWorkspace>): Promise<DocWorkspace>;
  deleteWorkspace(workspaceId: string): Promise<void>;
  getWorkspaceMembers(workspaceId: string): Promise<DocAccess[]>;
  addWorkspaceMember(workspaceId: string, userId: string, role?: string): Promise<DocAccess>;
  removeWorkspaceMember(workspaceId: string, userId: string): Promise<void>;
  updateWorkspaceMemberRole(workspaceId: string, userId: string, role: string): Promise<DocAccess>;
  getWorkspaceDocuments(workspaceId: string): Promise<DocDocument[]>;
  getWorkspaceStats(workspaceId: string): Promise<{ totalDocuments: number; totalMembers: number; storageUsed: number; activeWorkflows: number }>;
  getWorkspaceActivity(workspaceId: string): Promise<DocActivity[]>;
  getWorkspaceSettings(workspaceId: string): Promise<DocWorkspace>;
  updateWorkspaceSettings(workspaceId: string, data: Partial<DocWorkspace>): Promise<DocWorkspace>;
  getWorkspaceQuota(workspaceId: string): Promise<DocQuota>;
  getDocumentPermissions(documentId: string): Promise<DocPermission[]>;
  grantPermission(documentId: string, userId: string, permission: string, grantedBy: string): Promise<DocPermission>;
  revokePermission(documentId: string, userId: string): Promise<void>;
  updatePermission(documentId: string, userId: string, permission: string): Promise<DocPermission>;
  bulkGrantPermissions(documentIds: string[], userId: string, permission: string): Promise<DocBulkOperation>;
  bulkRevokePermissions(documentIds: string[], userId: string): Promise<DocBulkOperation>;
  checkPermission(documentId: string, userId: string): Promise<DocPermission | null>;
  getEffectivePermissions(documentId: string, userId: string): Promise<DocPermission[]>;
  getInheritedPermissions(documentId: string): Promise<DocPermission[]>;
  getPermissionHistory(documentId: string): Promise<DocAccessLog[]>;
  getPermissionsByUser(schoolId: string, userId: string): Promise<DocPermission[]>;
  getPermissionsByRole(schoolId: string, role: string): Promise<DocPermission[]>;
  getPermissionsByGroup(schoolId: string, groupId: string): Promise<DocPermission[]>;
  requestPermission(documentId: string, userId: string, requestedPermission: string): Promise<DocAccessLog>;
  approvePermission(requestId: string, approvedBy: string): Promise<DocAccessLog>;
  denyPermission(requestId: string, deniedBy: string, reason?: string): Promise<DocAccessLog>;
  getPermissionRequests(schoolId: string): Promise<DocAccessLog[]>;
  getDefaultPermissions(schoolId: string): Promise<DocPermission[]>;
  updateDefaultPermissions(schoolId: string, permissions: Partial<DocPermission>[]): Promise<void>;
  bulkChangePermissions(documentIds: string[], permissionChanges: Record<string, string>[]): Promise<DocBulkOperation>;
  getShareLinks(documentId: string): Promise<DocShareLink[]>;
  createShareLink(documentId: string, options: { expiresAt?: string; maxDownloads?: number; password?: string; isPublic?: boolean }): Promise<DocShareLink>;
  updateShareLink(linkId: string, data: Partial<DocShareLink>): Promise<DocShareLink>;
  revokeShareLink(linkId: string): Promise<void>;
  getShareLinkByToken(token: string): Promise<DocShareLink>;
  validateShareLink(token: string, password?: string): Promise<boolean>;
  getShareStats(schoolId: string): Promise<{ totalLinks: number; activeLinks: number; expiredLinks: number; revokedLinks: number; totalDownloads: number }>;
  getShareActivity(schoolId: string): Promise<DocAccessLog[]>;
  getSharedWithMe(schoolId: string, userId: string): Promise<DocDocument[]>;
  getSharedByMe(schoolId: string, userId: string): Promise<DocDocument[]>;
  getPublicDocuments(schoolId: string): Promise<DocDocument[]>;
  getExternalShares(schoolId: string): Promise<DocShareLink[]>;
  getSharePermissions(documentId: string): Promise<DocSharePermission[]>;
  bulkShare(documentIds: string[], userId: string, permission: string): Promise<DocBulkOperation>;
  getShareLinkDownloads(linkId: string): Promise<{ totalDownloads: number; downloads: DocAccessLog[] }>;
  getSignatures(documentId: string): Promise<DocSignature[]>;
  getSignature(signatureId: string): Promise<DocSignature>;
  createSignatureRequest(data: Partial<DocSignatureRequest>, schoolId: string): Promise<DocSignatureRequest>;
  updateSignatureRequest(requestId: string, data: Partial<DocSignatureRequest>): Promise<DocSignatureRequest>;
  cancelSignatureRequest(requestId: string): Promise<DocSignatureRequest>;
  approveSignature(signatureId: string, approvedBy: string): Promise<DocSignature>;
  rejectSignature(signatureId: string, rejectedBy: string, reason?: string): Promise<DocSignature>;
  revokeSignature(signatureId: string, revokedBy: string): Promise<DocSignature>;
  getSignatureWorkflow(documentId: string): Promise<DocSignatureWorkflow>;
  getSignatureHistory(documentId: string): Promise<DocSignature[]>;
  getPendingSignatures(schoolId: string): Promise<DocSignature[]>;
  getCompletedSignatures(schoolId: string): Promise<DocSignature[]>;
  getExpiredSignatures(schoolId: string): Promise<DocSignature[]>;
  validateSignature(signatureId: string): Promise<boolean>;
  getSignatureCertificate(signatureId: string): Promise<DocCertificate>;
  getSignatureAudit(documentId: string): Promise<DocAudit[]>;
  bulkSign(documentIds: string[], signerId: string): Promise<DocBulkOperation>;
  getSignatureReminders(documentId: string): Promise<DocNotification[]>;
  getSignatureTemplate(documentId: string): Promise<DocFormField[]>;
  getApprovals(schoolId: string): Promise<DocApprovalWorkflow[]>;
  getApproval(approvalId: string): Promise<DocApprovalWorkflow>;
  createApprovalWorkflow(data: Partial<DocApprovalWorkflow>, schoolId: string): Promise<DocApprovalWorkflow>;
  updateApprovalWorkflow(workflowId: string, data: Partial<DocApprovalWorkflow>): Promise<DocApprovalWorkflow>;
  deleteApprovalWorkflow(workflowId: string): Promise<void>;
  approveStep(stepId: string, approverId: string, comment?: string): Promise<DocApprovalStep>;
  rejectStep(stepId: string, approverId: string, reason?: string): Promise<DocApprovalStep>;
  delegateStep(stepId: string, fromUserId: string, toUserId: string): Promise<DocApprovalStep>;
  escalateStep(stepId: string, escalatedBy: string): Promise<DocApprovalStep>;
  getApprovalHistory(documentId: string): Promise<DocApprovalHistory[]>;
  getPendingApprovals(schoolId: string): Promise<DocApprovalStep[]>;
  getCompletedApprovals(schoolId: string): Promise<DocApprovalStep[]>;
  getApprovalTimeline(documentId: string): Promise<DocApprovalHistory[]>;
  getApprovalByDocument(documentId: string): Promise<DocApprovalWorkflow[]>;
  getApprovalByUser(schoolId: string, userId: string): Promise<DocApprovalStep[]>;
  getApprovalTemplates(schoolId: string): Promise<DocApprovalWorkflow[]>;
  createApprovalTemplate(data: Partial<DocApprovalWorkflow>, schoolId: string): Promise<DocApprovalWorkflow>;
  updateApprovalTemplate(templateId: string, data: Partial<DocApprovalWorkflow>): Promise<DocApprovalWorkflow>;
  getApprovalConditions(workflowId: string): Promise<DocApprovalCondition[]>;
  getWorkflows(schoolId: string): Promise<DocWorkflow[]>;
  getWorkflow(workflowId: string): Promise<DocWorkflow>;
  createWorkflow(data: Partial<DocWorkflow>, schoolId: string): Promise<DocWorkflow>;
  updateWorkflow(workflowId: string, data: Partial<DocWorkflow>): Promise<DocWorkflow>;
  deleteWorkflow(workflowId: string): Promise<void>;
  triggerWorkflow(workflowId: string, documentId: string, triggeredBy: string): Promise<DocWorkflow>;
  getWorkflowHistory(workflowId: string): Promise<DocWorkflowHistory[]>;
  getWorkflowSteps(workflowId: string): Promise<DocWorkflowStep[]>;
  getWorkflowConditions(workflowId: string): Promise<DocWorkflowCondition[]>;
  getActiveWorkflows(schoolId: string): Promise<DocWorkflow[]>;
  getWorkflowByDocument(documentId: string): Promise<DocWorkflow[]>;
  getWorkflowTemplates(schoolId: string): Promise<DocWorkflow[]>;
  createWorkflowTemplate(data: Partial<DocWorkflow>, schoolId: string): Promise<DocWorkflow>;
  getWorkflowTimeouts(schoolId: string): Promise<DocWorkflow[]>;
  getOCRResults(documentId: string): Promise<DocOCRResult[]>;
  getOCRResult(ocrId: string): Promise<DocOCRResult>;
  createOCRJob(documentId: string, schoolId: string, options?: { language?: string; templateId?: string }): Promise<DocOCRResult>;
  updateOCRResult(ocrId: string, data: Partial<DocOCRResult>): Promise<DocOCRResult>;
  deleteOCRResult(ocrId: string): Promise<void>;
  getOCRFields(ocrId: string): Promise<DocOCRField[]>;
  getOCRTemplates(schoolId: string): Promise<DocOCRTemplate[]>;
  createOCRTemplate(data: Partial<DocOCRTemplate>, schoolId: string): Promise<DocOCRTemplate>;
  updateOCRTemplate(templateId: string, data: Partial<DocOCRTemplate>): Promise<DocOCRTemplate>;
  deleteOCRTemplate(templateId: string): Promise<void>;
  getPendingOCRJobs(schoolId: string): Promise<DocOCRResult[]>;
  getCompletedOCRJobs(schoolId: string): Promise<DocOCRResult[]>;
  getArchives(schoolId: string): Promise<DocArchive[]>;
  getArchive(archiveId: string): Promise<DocArchive>;
  archiveDocument(documentId: string, schoolId: string, options?: { reason?: string }): Promise<DocArchive>;
  restoreFromArchive(archiveId: string): Promise<DocDocument>;
  deleteArchive(archiveId: string): Promise<void>;
  getArchiveRules(schoolId: string): Promise<DocArchiveRule[]>;
  createArchiveRule(data: Partial<DocArchiveRule>, schoolId: string): Promise<DocArchiveRule>;
  updateArchiveRule(ruleId: string, data: Partial<DocArchiveRule>): Promise<DocArchiveRule>;
  deleteArchiveRule(ruleId: string): Promise<void>;
  getArchivePolicies(schoolId: string): Promise<DocArchivePolicy[]>;
  getArchivedDocuments(schoolId: string): Promise<DocDocument[]>;
  getBackupJobs(schoolId: string): Promise<DocBackupJob[]>;
  getBackupJob(backupId: string): Promise<DocBackupJob>;
  createBackupJob(schoolId: string, options?: { type?: string; documentIds?: string[] }): Promise<DocBackupJob>;
  cancelBackupJob(backupId: string): Promise<DocBackupJob>;
  deleteBackupJob(backupId: string): Promise<void>;
  getBackupHistory(schoolId: string): Promise<DocBackupJob[]>;
  getActiveBackups(schoolId: string): Promise<DocBackupJob[]>;
  downloadBackup(backupId: string): Promise<{ url: string; expiresAt: string }>;
  getRestoreHistory(schoolId: string): Promise<DocRestoreHistory[]>;
  createRestoreRequest(documentId: string, schoolId: string, versionId?: string): Promise<DocRestoreHistory>;
  approveRestore(restoreId: string, approvedBy: string): Promise<DocRestoreHistory>;
  completeRestore(restoreId: string): Promise<DocRestoreHistory>;
  rejectRestore(restoreId: string, rejectedBy: string, reason?: string): Promise<DocRestoreHistory>;
  getPendingRestores(schoolId: string): Promise<DocRestoreHistory[]>;
  getTrashItems(schoolId: string): Promise<DocTrash[]>;
  moveToTrash(documentId: string, schoolId: string, deletedBy: string): Promise<DocTrash>;
  restoreFromTrash(trashId: string): Promise<DocDocument>;
  emptyTrash(schoolId: string): Promise<void>;
  permanentlyDeleteFromTrash(trashId: string): Promise<void>;
  getTrashStats(schoolId: string): Promise<{ totalItems: number; totalSize: number; itemsExpiringSoon: number }>;
  restoreAllFromTrash(schoolId: string): Promise<void>;
  getTrashItem(trashId: string): Promise<DocTrash>;
  deleteFromTrashPermanently(documentId: string): Promise<void>;
  getWatermarks(documentId: string): Promise<DocWatermark[]>;
  createWatermark(data: Partial<DocWatermark>, schoolId: string): Promise<DocWatermark>;
  updateWatermark(watermarkId: string, data: Partial<DocWatermark>): Promise<DocWatermark>;
  deleteWatermark(watermarkId: string): Promise<void>;
  getWatermarkConfig(schoolId: string): Promise<DocWatermarkConfig | null>;
  updateWatermarkConfig(schoolId: string, data: Partial<DocWatermarkConfig>): Promise<DocWatermarkConfig>;
  applyWatermark(documentId: string, watermarkId: string): Promise<void>;
  removeWatermark(documentId: string, watermarkId: string): Promise<void>;
  getTemplates(schoolId: string): Promise<DocTemplate[]>;
  getTemplate(templateId: string): Promise<DocTemplate>;
  createTemplate(data: Partial<DocTemplate>, schoolId: string): Promise<DocTemplate>;
  updateTemplate(templateId: string, data: Partial<DocTemplate>): Promise<DocTemplate>;
  deleteTemplate(templateId: string): Promise<void>;
  generateDocumentFromTemplate(templateId: string, data: Record<string, unknown>, schoolId: string): Promise<DocDocument>;
  getTemplateUsage(templateId: string): Promise<{ count: number; documents: DocDocument[] }>;
  duplicateTemplate(templateId: string, schoolId: string): Promise<DocTemplate>;
  mergeDocuments(documentIds: string[], schoolId: string, options?: { name?: string }): Promise<DocMergeDocument>;
  getMergeJob(mergeId: string): Promise<DocMergeDocument>;
  splitDocument(documentId: string, schoolId: string, options?: { pages?: string; splitAt?: number[] }): Promise<DocMergeDocument>;
  getMergeHistory(schoolId: string): Promise<DocMergeDocument[]>;
  compressDocument(documentId: string, schoolId: string, level?: string): Promise<DocProcessingJob>;
  decompressDocument(documentId: string, schoolId: string): Promise<DocProcessingJob>;
  getCompressionStats(schoolId: string): Promise<{ totalCompressed: number; totalSavings: number; averageRatio: number }>;
  convertDocument(documentId: string, schoolId: string, targetFormat: string): Promise<DocProcessingJob>;
  getConversionJob(jobId: string): Promise<DocProcessingJob>;
  getConversionHistory(schoolId: string): Promise<DocProcessingJob[]>;
  batchConvert(documentIds: string[], schoolId: string, targetFormat: string): Promise<DocBulkOperation>;
  fullTextSearch(schoolId: string, query: string, options?: { limit?: number; offset?: number; filters?: Record<string, unknown> }): Promise<DocSearchResult[]>;
  searchByMetadata(schoolId: string, filters: Record<string, unknown>): Promise<DocSearchResult[]>;
  searchByContent(schoolId: string, query: string): Promise<DocSearchResult[]>;
  getSearchSuggestions(schoolId: string, prefix: string): Promise<string[]>;
  saveSearchQuery(schoolId: string, userId: string, query: string): Promise<DocSearchQuery>;
  getSavedSearches(schoolId: string, userId: string): Promise<DocSearchQuery[]>;
  exportDocuments(documentIds: string[], schoolId: string, format: string): Promise<DocBulkOperation>;
  importDocuments(schoolId: string, files: Array<{ name: string; content: ArrayBuffer; mimeType: string }>, folderId?: string): Promise<DocBulkOperation>;
  getExportJob(jobId: string): Promise<DocBulkOperation>;
  getImportHistory(schoolId: string): Promise<DocBulkOperation[]>;
  getExportHistory(schoolId: string): Promise<DocBulkOperation[]>;
  downloadExport(jobId: string): Promise<{ url: string; expiresAt: string }>;
  getVersions(documentId: string): Promise<DocVersion[]>;
  getVersion(versionId: string): Promise<DocVersion>;
  createVersion(documentId: string, data: Partial<DocVersion>, schoolId: string): Promise<DocVersion>;
  restoreVersion(versionId: string): Promise<DocDocument>;
  compareVersions(versionId1: string, versionId2: string): Promise<DocVersionDiff>;
  checkoutDocument(documentId: string, userId: string): Promise<DocCheckout>;
  checkinDocument(documentId: string, userId: string): Promise<void>;
  lockDocument(documentId: string, userId: string, reason?: string): Promise<DocLock>;
  unlockDocument(documentId: string, userId: string): Promise<void>;
  getComments(documentId: string): Promise<DocComment[]>;
  getComment(commentId: string): Promise<DocComment>;
  addComment(documentId: string, userId: string, content: string, parentId?: string): Promise<DocComment>;
  updateComment(commentId: string, userId: string, content: string): Promise<DocComment>;
  deleteComment(commentId: string, userId: string): Promise<void>;
  replyToComment(commentId: string, userId: string, content: string): Promise<DocComment>;
  getCommentReplies(commentId: string): Promise<DocComment[]>;
  getCommentsByUser(schoolId: string, userId: string): Promise<DocComment[]>;
  getRecentComments(schoolId: string, limit?: number): Promise<DocComment[]>;
  getTags(schoolId: string): Promise<DocTag[]>;
  getTag(tagId: string): Promise<DocTag>;
  createTag(data: Partial<DocTag>, schoolId: string): Promise<DocTag>;
  updateTag(tagId: string, data: Partial<DocTag>): Promise<DocTag>;
  deleteTag(tagId: string): Promise<void>;
  addTagToDocument(documentId: string, tagId: string): Promise<void>;
  removeTagFromDocument(documentId: string, tagId: string): Promise<void>;
  getActivities(schoolId: string, filters?: Record<string, unknown>): Promise<DocActivity[]>;
  logActivity(data: Partial<DocActivity>, schoolId: string): Promise<DocActivity>;
  getDocumentActivities(documentId: string): Promise<DocActivity[]>;
  getUserActivities(schoolId: string, userId: string): Promise<DocActivity[]>;
  getRecentActivities(schoolId: string, limit?: number): Promise<DocActivity[]>;
  getLegalHolds(schoolId: string): Promise<DocLegalHold[]>;
  createLegalHold(data: Partial<DocLegalHold>, schoolId: string): Promise<DocLegalHold>;
  updateLegalHold(holdId: string, data: Partial<DocLegalHold>): Promise<DocLegalHold>;
  releaseLegalHold(holdId: string): Promise<DocLegalHold>;
  getDocumentsOnHold(schoolId: string): Promise<DocDocument[]>;
  deleteLegalHold(holdId: string): Promise<void>;
  getActiveLegalHolds(schoolId: string): Promise<DocLegalHold[]>;
  getRetentionSchedules(schoolId: string): Promise<DocRetentionSchedule[]>;
  createRetentionSchedule(data: Partial<DocRetentionSchedule>, schoolId: string): Promise<DocRetentionSchedule>;
  updateRetentionSchedule(scheduleId: string, data: Partial<DocRetentionSchedule>): Promise<DocRetentionSchedule>;
  deleteRetentionSchedule(scheduleId: string): Promise<void>;
  getDocumentsForDisposition(schoolId: string): Promise<DocDocument[]>;
  disposeDocument(documentId: string, action: string): Promise<void>;
  getRetentionStats(schoolId: string): Promise<{ totalScheduled: number; pendingDisposition: number; disposedLast30d: number }>;
  getWebDAVConfigs(schoolId: string): Promise<DocWebDAVConfig[]>;
  createWebDAVConfig(data: Partial<DocWebDAVConfig>, schoolId: string): Promise<DocWebDAVConfig>;
  updateWebDAVConfig(configId: string, data: Partial<DocWebDAVConfig>): Promise<DocWebDAVConfig>;
  deleteWebDAVConfig(configId: string): Promise<void>;
  testWebDAVConnection(configId: string): Promise<{ connected: boolean; message: string }>;
  getStorageUsage(schoolId: string): Promise<DocStorageUsage>;
  updateStorageQuota(schoolId: string, quotaBytes: number): Promise<DocQuota>;
  getFileMetadata(documentId: string): Promise<DocFileMetadata>;
  getFileChecksum(documentId: string): Promise<string>;
  getStorageBreakdown(schoolId: string): Promise<Record<string, number>>;
  getStorageStats(schoolId: string): Promise<DocStorageStats>;
  getExternalStorageConfigs(schoolId: string): Promise<DocExternalStorage[]>;
  classifyDocument(documentId: string, schoolId: string): Promise<DocClassificationResult>;
  getDocumentClassification(documentId: string): Promise<DocClassificationResult[]>;
  getRecommendations(schoolId: string, userId: string): Promise<DocRecommendation[]>;
  detectDuplicates(schoolId: string): Promise<DocDuplicateDetection[]>;
  generateDocumentSummary(documentId: string): Promise<string>;
  extractKeyPhrases(documentId: string): Promise<string[]>;
  detectLanguage(documentId: string): Promise<string>;
  getFormTemplates(schoolId: string): Promise<DocFormTemplate[]>;
  createFormTemplate(data: Partial<DocFormTemplate>, schoolId: string): Promise<DocFormTemplate>;
  updateFormTemplate(templateId: string, data: Partial<DocFormTemplate>): Promise<DocFormTemplate>;
  deleteFormTemplate(templateId: string): Promise<void>;
  getFormInstances(schoolId: string): Promise<DocFormInstance[]>;
  createFormInstance(templateId: string, schoolId: string, data?: Record<string, unknown>): Promise<DocFormInstance>;
  submitFormInstance(instanceId: string): Promise<DocFormInstance>;
  getFormFieldOptions(templateId: string): Promise<DocFormField[]>;
  markForOffline(documentId: string, schoolId: string, userId: string): Promise<DocOfflineDocument>;
  removeFromOffline(documentId: string, userId: string): Promise<void>;
  syncOfflineChanges(userId: string): Promise<{ synced: number; conflicts: number }>;
  getOfflineSyncStatus(userId: string): Promise<{ lastSyncAt: string; pendingChanges: number; isSyncing: boolean }>;
  updateOfflineDocument(documentId: string, userId: string, data: Partial<DocOfflineDocument>): Promise<DocOfflineDocument>;
  getEncryptionConfig(documentId: string): Promise<DocEncryption | null>;
  encryptDocument(documentId: string, schoolId: string, algorithm?: string): Promise<DocEncryption>;
  decryptDocument(documentId: string, userId: string): Promise<void>;
  getEncryptionStats(schoolId: string): Promise<{ encrypted: number; decrypted: number; total: number }>;
  getComplianceChecks(schoolId: string): Promise<DocCompliance[]>;
  runComplianceCheck(documentId: string, schoolId: string): Promise<DocCompliance>;
  getCompliancePolicies(schoolId: string): Promise<DocRegulation[]>;
  createCompliancePolicy(data: Partial<DocRegulation>, schoolId: string): Promise<DocRegulation>;
  updateCompliancePolicy(policyId: string, data: Partial<DocRegulation>): Promise<DocRegulation>;
  deleteCompliancePolicy(policyId: string): Promise<void>;
  getChainOfCustody(documentId: string): Promise<DocChainOfCustody[]>;
  getNotifications(schoolId: string, userId: string): Promise<DocNotification[]>;
  createNotification(data: Partial<DocNotification>, schoolId: string): Promise<DocNotification>;
  markNotificationRead(notificationId: string): Promise<void>;
  markAllNotificationsRead(schoolId: string, userId: string): Promise<void>;
  deleteNotification(notificationId: string): Promise<void>;
  getUnreadNotificationCount(schoolId: string, userId: string): Promise<number>;
  getAnalytics(schoolId: string): Promise<DocAnalytics>;
  getDocumentAnalytics(documentId: string): Promise<{ views: number; downloads: number; lastViewed: string | null }>;
  trackDocumentView(documentId: string, userId: string): Promise<void>;
  trackDocumentDownload(documentId: string, userId: string): Promise<void>;
  getTopDocuments(schoolId: string, metric: string, limit?: number): Promise<DocDocument[]>;
  createBatchProcess(data: Partial<DocBatchProcess>, schoolId: string): Promise<DocBatchProcess>;
  getBatchProcess(batchId: string): Promise<DocBatchProcess>;
  getBatchProcesses(schoolId: string): Promise<DocBatchProcess[]>;
  cancelBatchProcess(batchId: string): Promise<DocBatchProcess>;
  getQueueItems(schoolId: string): Promise<DocQueue[]>;
  addToQueue(data: Partial<DocQueue>, schoolId: string): Promise<DocQueue>;
  processQueueItem(queueId: string): Promise<DocQueue>;
  retryQueueItem(queueId: string): Promise<DocQueue>;
  getTimestamp(timestampId: string): Promise<DocTimestamp>;
  createTimestamp(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocTimestamp>;
  getTimestamps(documentId: string): Promise<DocTimestamp[]>;
  validateTimestamp(timestampId: string): Promise<boolean>;
  getDRMConfig(documentId: string): Promise<DocDRM | null>;
  applyDRM(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocDRM>;
  removeDRM(documentId: string, userId: string): Promise<void>;
  validateDRM(documentId: string): Promise<boolean>;
  getDRMStats(schoolId: string): Promise<{ totalProtected: number; totalUnprotected: number; drmTypes: Record<string, number> }>;
  getRedactions(documentId: string): Promise<DocRedaction[]>;
  createRedaction(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocRedaction>;
  applyRedaction(documentId: string, redactionId: string): Promise<void>;
  removeRedaction(documentId: string, redactionId: string): Promise<void>;
  getRedactionStats(schoolId: string): Promise<{ totalRedactions: number; appliedRedactions: number; pendingRedactions: number }>;
  getAnnotations(documentId: string): Promise<DocAnnotation[]>;
  createAnnotation(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocAnnotation>;
  updateAnnotation(annotationId: string, userId: string, data: Record<string, unknown>): Promise<DocAnnotation>;
  deleteAnnotation(annotationId: string, userId: string): Promise<void>;
  getAnnotationStats(schoolId: string): Promise<{ totalAnnotations: number; annotationsByType: Record<string, number>; activeAnnotators: number }>;
  getHighlights(documentId: string): Promise<DocHighlight[]>;
  createHighlight(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocHighlight>;
  updateHighlight(highlightId: string, userId: string, data: Record<string, unknown>): Promise<DocHighlight>;
  deleteHighlight(highlightId: string, userId: string): Promise<void>;
  getHighlightStats(schoolId: string): Promise<{ totalHighlights: number; highlightsByColor: Record<string, number>; activeHighlighters: number }>;
  getSignatureFields(documentId: string): Promise<DocSignatureField[]>;
  createSignatureField(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocSignatureField>;
  updateSignatureField(fieldId: string, userId: string, data: Record<string, unknown>): Promise<DocSignatureField>;
  deleteSignatureField(fieldId: string, userId: string): Promise<void>;
  getSignatureFieldStats(schoolId: string): Promise<{ totalFields: number; signedFields: number; pendingFields: number }>;
  getFormFields(documentId: string): Promise<DocFormField[]>;
  createFormField(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocFormField>;
  updateFormField(fieldId: string, userId: string, data: Record<string, unknown>): Promise<DocFormField>;
  deleteFormField(fieldId: string, userId: string): Promise<void>;
  getFormFieldStats(schoolId: string): Promise<{ totalFields: number; filledFields: number; emptyFields: number }>;
  getCustomFields(documentId: string): Promise<DocCustomField[]>;
  createCustomField(documentId: string, userId: string, data: Record<string, unknown>): Promise<DocCustomField>;
  updateCustomField(fieldId: string, userId: string, data: Record<string, unknown>): Promise<DocCustomField>;
  deleteCustomField(fieldId: string, userId: string): Promise<void>;
  getCustomFieldStats(schoolId: string): Promise<{ totalFields: number; fieldsByType: Record<string, number>; activeFields: number }>;
  getBrandingConfig(schoolId: string): Promise<DocBranding | null>;
  updateBrandingConfig(schoolId: string, userId: string, data: Record<string, unknown>): Promise<DocBranding>;
  getBrandingPresets(schoolId: string): Promise<DocBranding[]>;
  applyBrandingPreset(schoolId: string, presetId: string): Promise<DocBranding>;
}


export interface DocStorageStats {
  totalDocuments: number;
  totalFolders: number;
  totalWorkspaces: number;
  totalStorageBytes: number;
  storageByType: Record<string, number>;
  storageByCategory: Record<string, number>;
  storageByStatus: Record<string, number>;
  averageDocumentSizeBytes: number;
  largestDocumentSizeBytes: number;
  totalVersions: number;
  averageVersionsPerDocument: number;
  quotaUsedBytes: number;
  quotaTotalBytes: number;
  quotaUsagePercent: number;
}

export interface DocActivityStats {
  totalActivities: number;
  activitiesLast24h: number;
  activitiesLast7d: number;
  activitiesLast30d: number;
  uniqueContributors: number;
  documentsCreatedLast24h: number;
  documentsCreatedLast7d: number;
  documentsCreatedLast30d: number;
  documentsModifiedLast24h: number;
  documentsModifiedLast7d: number;
  documentsModifiedLast30d: number;
  documentsViewedLast24h: number;
  documentsViewedLast7d: number;
  documentsViewedLast30d: number;
  downloadsLast24h: number;
  downloadsLast7d: number;
  downloadsLast30d: number;
  uploadsLast24h: number;
  uploadsLast7d: number;
  uploadsLast30d: number;
  peakActivityHour: number;
  averageActionsPerUser: number;
}

export interface DocVersionStats {
  totalVersions: number;
  versionsCreatedLast24h: number;
  versionsCreatedLast7d: number;
  versionsCreatedLast30d: number;
  averageVersionsPerDocument: number;
  documentsWithSingleVersion: number;
  documentsWithMultipleVersions: number;
  maxVersionsForDocument: number;
  totalVersionStorageBytes: number;
  averageVersionSizeBytes: number;
  totalConflictsResolved: number;
  totalConflictsPending: number;
  restoreCountLast30d: number;
}

export interface DocPermissionStats {
  totalPermissions: number;
  permissionsByType: Record<string, number>;
  permissionsByLevel: Record<string, number>;
  usersWithDirectAccess: number;
  groupsWithAccess: number;
  externalSharesActive: number;
  externalSharesExpired: number;
  pendingInvitations: number;
  averagePermissionsPerDocument: number;
  documentsWithPublicAccess: number;
  permissionChangesLast30d: number;
}

export interface DocWorkflowStats {
  totalWorkflows: number;
  activeWorkflows: number;
  completedWorkflows: number;
  failedWorkflows: number;
  workflowsTriggeredLast24h: number;
  workflowsTriggeredLast7d: number;
  workflowsTriggeredLast30d: number;
  averageCompletionTimeMinutes: number;
  approvalRate: number;
  rejectionRate: number;
  delegationRate: number;
  pendingApprovals: number;
  averageStepsPerWorkflow: number;
  workflowsByType: Record<string, number>;
}

export interface DocSignatureStats {
  totalSignatures: number;
  pendingSignatures: number;
  completedSignatures: number;
  rejectedSignatures: number;
  revokedSignatures: number;
  signaturesLast24h: number;
  signaturesLast7d: number;
  signaturesLast30d: number;
  averageSigningTimeMinutes: number;
  signaturesByType: Record<string, number>;
  signaturesByLevel: Record<string, number>;
  documentsAwaitingSignature: number;
  signaturesByStatus: Record<string, number>;
}

export interface DocOCRArchiveStats {
  totalOCRJobs: number;
  completedOCRJobs: number;
  failedOCRJobs: number;
  pendingOCRJobs: number;
  processingOCRJobs: number;
  averageOCRTimeSeconds: number;
  totalArchivedDocuments: number;
  archivedDocumentsLast30d: number;
  archivedStorageBytes: number;
  archiveRulesActive: number;
  archiveRulesTotal: number;
  restorationRequestsLast30d: number;
  ocrAccuracyPercent: number;
  languagesProcessed: string[];
}

export interface DocSearchStats {
  totalSearches: number;
  searchesLast24h: number;
  searchesLast7d: number;
  searchesLast30d: number;
  uniqueSearchers: number;
  averageSearchTimeMs: number;
  averageResultsReturned: number;
  zeroResultSearches: number;
  zeroResultRate: number;
  topSearchTerms: Array<{ term: string; count: number }>;
  searchByScope: Record<string, number>;
  indexSizeDocuments: number;
  indexSizeBytes: number;
}

export interface DocComplianceStats {
  totalComplianceChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  complianceRate: number;
  activePolicies: number;
  inactivePolicies: number;
  violationsLast30d: number;
  averageResolutionTimeMinutes: number;
  pendingReviews: number;
  regulatoryFrameworks: string[];
  legalHoldsActive: number;
  retentionSchedulesActive: number;
  documentsPendingDisposition: number;
}

export interface DocUsageStats {
  totalUsers: number;
  activeUsersLast24h: number;
  activeUsersLast7d: number;
  activeUsersLast30d: number;
  averageSessionDurationMinutes: number;
  peakConcurrentUsers: number;
  totalAPICalls: number;
  apiCallsLast24h: number;
  apiCallsLast7d: number;
  apiCallsLast30d: number;
  storageBytesUsed: number;
  storageBytesTotal: number;
  bandwidthBytesUsed: number;
  bandwidthBytesTotal: number;
  totalWebhooks: number;
  activeWebhooks: number;
  failedWebhookDeliveries: number;
}

export type {
  DocDocument,
  DocFolder,
  DocWorkspace,
  DocPermission,
  DocAccess,
  DocActivity,
  DocComment,
  DocTag,
  DocCategoryEntity,
  DocArchive,
  DocArchiveRule,
  DocArchivePolicy,
  DocSignature,
  DocSignatureRequest,
  DocSignatureWorkflow,
  DocApprovalWorkflow,
  DocApprovalStep,
  DocApprovalHistory,
  DocOCRResult,
  DocOCRField,
  DocOCRTemplate,
  DocScanJob,
  DocFileMetadata,
  DocFileChecksum,
  DocFileStorage,
  DocShareLink,
  DocSharePermission,
  DocWatermark,
  DocTemplate,
  DocGeneratedDocument,
  DocMergeDocument,
  DocAudit,
  DocRetention,
  DocLegalHold,
  DocTrash,
  DocRestoreHistory,
  DocExternalStorage,
  DocWebDAVConfig,
  DocBackupJob,
  DocVersion,
  DocVersionDiff,
  DocBulkOperation,
  DocConflictResolution,
  DocCheckout,
  DocLock,
  DocFavorite,
  DocRecentDocument,
  DocOfflineDocument,
  DocUploadSession,
  DocProcessingJob,
  DocClassificationResult,
  DocSearchIndex,
  DocSearchQuery,
  DocSearchResult,
  DocSearchFilter,
  DocNotification,
  DocReminder,
  DocExpiry,
  DocReview,
  DocReviewComment,
  DocApprovalRequest,
  DocDelegation,
  DocAccessLog,
  DocQuota,
  DocStorageUsage,
  DocAnalytics,
  DocInsight,
  DocRecommendation,
  DocDuplicateDetection,
  DocSimilarityResult,
  DocCompliance,
  DocRegulation,
  DocRetentionSchedule,
  DocDisposition,
  DocChainOfCustody,
  DocForensicAudit,
  DocTimestamp,
  DocDigitalID,
  DocCertificate,
  DocEncryption,
  DocDecryption,
  DocDRM,
  DocViewingSession,
  DocDownloadLog,
  DocPrintLog,
  DocWatermarkConfig,
  DocRedaction,
  DocAnnotation,
  DocHighlight,
  DocSignatureField,
  DocFormField,
  DocFormTemplate,
  DocFormInstance,
  DocBatchProcess,
  DocQueue,
  DocJobStatus,
  DocPipeline,
  DocTransform,
  DocConvertResult,
  DocValidateResult,
  DocSyncStatus,
  DocExternalSync,
  DocWebhook,
  DocAPIKey,
  DocRateLimit,
  DocUsage,
  DocBilling,
  DocPlan,
  DocFeature,
  DocIntegration,
  DocPlugin,
  DocExtension,
  DocTheme,
  DocBranding,
  DocCustomField,
  DocValidationRule,
  DocBusinessRule,
  DocConditionalAccess,
  DocRole,
  DocGroup,
  DocPolicy,
  DocComplianceRule,
  DocAuditTrail,
  DocEvent,
  DocEventHandler,
  DocEventLog,
  DocStatus,
  DocCategory,
  DocClassification,
  DocVisibility,
  DocStorage,
  DocSource,
  DocFormat,
  DocProcessingStatus,
  DocRetentionAction,
  FolderType,
  FolderStatus,
  WorkspaceType,
  WorkspaceStatus,
  PermissionType,
  AccessLevel,
  ShareType,
  ShareExpiry,
  SignatureStatus,
  SignatureType,
  SignatureLevel,
  ApprovalStatus,
  ApprovalType,
  ApprovalAction,
  WorkflowStatus,
  WorkflowType,
  WorkflowTrigger,
  WorkflowCondition,
  OCRStatus,
  OCRFieldType,
  OCRLanguage,
  OCRConfidence,
  ArchiveStatus,
  ArchiveType,
  ArchiveStorage,
  BackupStatus,
  BackupType,
  BackupFrequency,
  RestoreStatus,
  TrashStatus,
  WatermarkType,
  WatermarkPosition,
  TagType,
  ActivityType,
  CommentType,
  VersionDiff,
  SearchScopeDoc,
  ClassificationLevel,
  LegalHoldStatus,
  WebDAVStatus,
  ThumbnailStatus,
  MergeStatus,
  SplitStatus,
  CompressionLevel,
  ConversionFormat,
  ImportSource,
  ExportFormatDoc,
  AuditActionDoc,
  ScanMode,
  ProcessingPipeline,
  Document,
  DocumentVersion,
  DocumentPermissionEntry,
  DocumentComment,
  DocumentPermissionLevel,
  DocumentType,
};
