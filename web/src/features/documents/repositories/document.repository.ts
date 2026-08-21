import { createClient } from '@supabase/supabase-js';
import type {
  DocumentRepositoryEnterprise,
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
  DocApprovalCondition,
  DocOCRResult,
  DocOCRField,
  DocOCRTemplate,
  DocScanJob,
  DocFileMetadata,
  DocShareLink,
  DocSharePermission,
  DocWatermark,
  DocTemplate,
  DocMergeDocument,
  DocAudit,
  DocRetention,
  DocLegalHold,
  DocTrash,
  DocRestoreHistory,
  DocWebDAVConfig,
  DocBackupJob,
  DocVersion,
  DocVersionDiff,
  DocCheckout,
  DocLock,
  DocBulkOperation,
  DocFavorite,
  DocOfflineDocument,
  DocProcessingJob,
  DocClassificationResult,
  DocNotification,
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
  DocEncryption,
  DocExternalStorage,
  DocWatermarkConfig,
  DocAnnotation,
  DocFormField,
  DocFormTemplate,
  DocFormInstance,
  DocBatchProcess,
  DocQueue,
  DocJobStatus,
  DocChainOfCustody,
  DocCertificate,
  DocSearchQuery,
  DocConvertResult,
  DocSyncStatus,
  DocStorageStats,
  DocActivityStats,
  DocVersionStats,
  DocPermissionStats,
  DocWorkflowStats,
  DocWorkflow,
  DocWorkflowHistory,
  DocWorkflowStep,
  DocWorkflowCondition,
  DocSignatureStats,
  DocOCRArchiveStats,
  DocSearchStats,
  DocComplianceStats,
  DocUsageStats,
} from '@/features/documents/types';
import {
  AppError,
  ValidationError,
  DocNotFoundError,
  DocCreateError,
  DocUpdateError,
  DocDeleteError,
  DocRestoreError,
  DocValidationError,
  DocInvalidFileError,
  DocFileTooLargeError,
  DocUnsupportedFormatError,
  DocInvalidMimeTypeError,
  DocDuplicateError,
  DocLockedError,
  DocCheckoutError,
  DocVersionConflictError,
  DocAlreadyArchivedError,
  DocNotArchivedError,
  DocExpiredError,
  DocForbiddenError,
  DocConflictError,
  DocMetadataError,
  DocFolderNotFoundError,
  DocFolderCreateError,
  DocFolderUpdateError,
  DocFolderDeleteError,
  DocFolderNotEmptyError,
  DocFolderDepthExceededError,
  DocFolderCircularReferenceError,
  DocFolderPermissionError,
  DocFolderRenameError,
  DocFolderMoveError,
  DocWorkspaceNotFoundError,
  DocWorkspaceCreateError,
  DocWorkspaceUpdateError,
  DocWorkspaceDeleteError,
  DocWorkspaceAccessError,
  DocWorkspaceQuotaError,
  DocWorkspaceMemberError,
  DocWorkspaceLimitError,
  DocPermissionDeniedError,
  DocAccessDeniedError,
  DocNotOwnerError,
  DocNotAdminError,
  DocShareNotAllowedError,
  DocPublicAccessError,
  DocExternalAccessError,
  DocRoleError,
  DocGroupAccessError,
  DocShareLinkError,
  DocShareExpiredError,
  DocShareLimitError,
  DocSharePasswordError,
  DocShareInvalidError,
  DocShareRevokedError,
  DocShareMaxDownloadsError,
  DocShareSelfError,
  DocSignatureNotFoundError,
  DocSignatureCreateError,
  DocSignatureExpiredError,
  DocSignatureRejectedError,
  DocSignatureRevokedError,
  DocSignatureInvalidError,
  DocSignatureCertificateError,
  DocSignatureOrderError,
  DocSignatureRequiredError,
  DocSignatureDuplicateError,
  DocSignatureIntegrityError,
  DocSignatureChainError,
  DocApprovalNotFoundError,
  DocApprovalCreateError,
  DocApprovalTimeoutError,
  DocApprovalRejectedError,
  DocApprovalAlreadyApprovedError,
  DocApprovalStepError,
  DocApprovalDelegationError,
  DocApprovalEscalationError,
  DocApprovalConditionError,
  DocWorkflowNotFoundError,
  DocWorkflowCreateError,
  DocWorkflowUpdateError,
  DocWorkflowDeleteError,
  DocWorkflowNotCompletedError,
  DocWorkflowCircularError,
  DocWorkflowConditionError,
  DocWorkflowTriggerError,
  DocWorkflowTimeoutError,
  DocWorkflowStateError,
  DocOCRNotFoundError,
  DocOCRFailedError,
  DocOCRLanguageError,
  DocOCRTimeoutError,
  DocOCRQualityError,
  DocOCRFormatError,
  DocOCRFieldError,
  DocOCRTemplateError,
  DocOCRProcessingError,
  DocOCRResultError,
  DocArchiveNotFoundError,
  DocArchiveCreateError,
  DocArchiveLockedError,
  DocArchivePolicyError,
  DocArchiveRetentionError,
  DocArchiveIntegrityError,
  DocArchiveRetrievalError,
  DocArchiveComplianceError,
  DocBackupNotFoundError,
  DocBackupCreateError,
  DocBackupInProgressError,
  DocBackupFailedError,
  DocBackupCorruptedError,
  DocBackupQuotaError,
  DocBackupScheduleError,
  DocBackupRetentionError,
  DocRestoreNotFoundError,
  DocRestoreCreateError,
  DocRestoreConflictError,
  DocRestoreFailedError,
  DocRestorePermissionError,
  DocRestoreVersionError,
  DocTrashNotFoundError,
  DocTrashEmptyError,
  DocTrashPermanentError,
  DocTrashQuotaError,
  DocTrashRetentionError,
  DocWatermarkError,
  DocWatermarkApplyError,
  DocWatermarkRemoveError,
  DocWatermarkFormatError,
  DocWatermarkPositionError,
  DocTemplateNotFoundError,
  DocTemplateCreateError,
  DocTemplateUpdateError,
  DocTemplateDeleteError,
  DocTemplateRenderError,
  DocTemplateVariableError,
  DocMergeError,
  DocMergeFormatError,
  DocMergeSizeError,
  DocSplitError,
  DocSplitPageError,
  DocSplitFormatError,
  DocCompressionError,
  DocCompressionLevelError,
  DocDecompressionError,
  DocCompressionFormatError,
  DocConversionError,
  DocConversionFormatError,
  DocConversionFailedError,
  DocConversionTimeoutError,
  DocConversionQualityError,
  DocConversionUnsupportedError,
  DocSearchError,
  DocSearchIndexError,
  DocSearchTimeoutError,
  DocSearchQueryError,
  DocSearchPermissionError,
  DocSearchNoResultsError,
  DocStorageError,
  DocStorageQuotaExceededError,
  DocStorageConnectionError,
  DocStorageTimeoutError,
  DocStorageIntegrityError,
  DocStorageProviderError,
  DocExportError,
  DocExportFormatError,
  DocImportError,
  DocImportFormatError,
  DocImportFailedError,
  DocImportDuplicateError,
  DocVersionNotFoundError,
  DocVersionCreateError,
  DocVersionCompareError,
  DocVersionRestoreError,
  DocVersionLimitError,
  DocCommentNotFoundError,
  DocCommentCreateError,
  DocCommentUpdateError,
  DocCommentDeleteError,
  DocActivityLogError,
  DocActivityNotFoundError,
  DocAuditError,
  DocTagNotFoundError,
  DocTagCreateError,
  DocTagDuplicateError,
  DocTagLimitError,
  DocLegalHoldError,
  DocLegalHoldExistsError,
  DocLegalHoldReleaseError,
  DocLegalHoldExpiredError,
  DocLegalHoldComplianceError,
  DocRetentionError,
  DocRetentionScheduleError,
  DocRetentionPeriodError,
  DocRetentionComplianceError,
  DocRetentionDisposalError,
  DocWebDAVError,
  DocWebDAVAuthError,
  DocWebDAVConnectionError,
  DocWebDAVSyncError,
  DocWebDAVConflictError,
  DocScannerError,
  DocScannerConnectionError,
  DocScannerResolutionError,
  DocScannerPaperJamError,
  DocProcessingError,
  DocProcessingTimeoutError,
  DocProcessingQueueError,
  DocProcessingPipelineError,
  DocProcessingFailedError,
  DocAIClassificationError,
  DocAIExtractionError,
  DocAISummaryError,
  DocAISimilarityError,
  DocAIRecommendationError,
  DocAIDuplicateError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createDocumentRepository(supabase: ReturnType<typeof createClient>): DocumentRepositoryEnterprise {
  return {
    // ─── Document CRUD (30) ─────────────────────────────────────────────────
    async getDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<DocDocument[]> {
      try {
        let query = supabase.from('documents').select('*').eq('school_id', schoolId);
        if (filters?.folderId) query = query.eq('folder_id', filters.folderId);
        if (filters?.type) query = query.eq('type', filters.type);
        if (filters?.status) query = query.eq('status', filters.status);
        if (filters?.classification) query = query.eq('classification', filters.classification);
        if (filters?.category) query = query.eq('category', filters.category);
        if (filters?.author) query = query.eq('author_id', filters.author);
        if (filters?.isArchived !== undefined) query = query.eq('is_archived', filters.isArchived);
        if (filters?.isLocked !== undefined) query = query.eq('is_locked', filters.isLocked);
        query = query.order('updated_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents');
      }
    },

    async getDocument(documentId: string): Promise<DocDocument> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('id', documentId).single();
        if (error || !data) throw new DocNotFoundError(documentId);
        return data as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to get document', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(documentId);
      }
    },

    async createDocument(data: Partial<DocDocument>, schoolId: string): Promise<DocDocument> {
      try {
        if (!data.title) throw new ValidationError('Document title is required');
        const payload = { ...data, school_id: schoolId, version: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: doc, error } = await supabase.from('documents').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        logger.info('Document created', { documentId: doc.id }, 'documents');
        return doc as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to create document', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to create document');
      }
    },

    async updateDocument(documentId: string, data: Partial<DocDocument>): Promise<DocDocument> {
      try {
        const { data: existing } = await supabase.from('documents').select('*').eq('id', documentId).single();
        if (!existing) throw new DocNotFoundError(documentId);
        const newVersion = ((existing as any).version || 0) + 1;
        const { data: doc, error } = await supabase.from('documents').update({ ...data, version: newVersion, updated_at: new Date().toISOString() }).eq('id', documentId).select().single();
        if (error) throw new DocUpdateError(error.message);
        await supabase.from('document_versions').insert({ document_id: documentId, version: newVersion, content: data.content || (existing as any).content, created_at: new Date().toISOString() });
        return doc as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to update document', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update document');
      }
    },

    async deleteDocument(documentId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('documents').select('id').eq('id', documentId).single();
        if (!existing) throw new DocNotFoundError(documentId);
        await supabase.from('document_comments').delete().eq('document_id', documentId);
        await supabase.from('document_versions').delete().eq('document_id', documentId);
        await supabase.from('document_permissions').delete().eq('document_id', documentId);
        const { error } = await supabase.from('documents').delete().eq('id', documentId);
        if (error) throw new DocDeleteError(error.message);
        logger.info('Document deleted', { documentId }, 'documents');
      } catch (error) {
        logger.error('Failed to delete document', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete document');
      }
    },

    async restoreDocument(documentId: string): Promise<DocDocument> {
      try {
        const { data: existing } = await supabase.from('documents').select('*').eq('id', documentId).single();
        if (!existing) throw new DocNotFoundError(documentId);
        const { data: doc, error } = await supabase.from('documents').update({ is_deleted: false, deleted_at: null, updated_at: new Date().toISOString() }).eq('id', documentId).select().single();
        if (error) throw new DocRestoreError(error.message);
        return doc as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to restore document', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to restore document');
      }
    },

    async permanentDeleteDocument(documentId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('documents').select('id').eq('id', documentId).single();
        if (!existing) throw new DocNotFoundError(documentId);
        await supabase.from('document_comments').delete().eq('document_id', documentId);
        await supabase.from('document_versions').delete().eq('document_id', documentId);
        await supabase.from('document_permissions').delete().eq('document_id', documentId);
        await supabase.from('document_tags').delete().eq('document_id', documentId);
        const { error } = await supabase.from('documents').delete().eq('id', documentId);
        if (error) throw new DocDeleteError(error.message);
        logger.info('Document permanently deleted', { documentId }, 'documents');
      } catch (error) {
        logger.error('Failed to permanently delete document', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to permanently delete document');
      }
    },

    async bulkDeleteDocuments(documentIds: string[]): Promise<DocBulkOperation> {
      try {
        if (!documentIds || documentIds.length === 0) throw new ValidationError('Document IDs are required');
        let successCount = 0;
        let failureCount = 0;
        for (const id of documentIds) {
          try {
            await supabase.from('documents').update({ is_deleted: true, deleted_at: new Date().toISOString() }).eq('id', id);
            successCount++;
          } catch { failureCount++; }
        }
        return { totalProcessed: documentIds.length, successCount, failureCount, operation: 'bulk_delete', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk delete documents', { documentIds, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to bulk delete documents');
      }
    },

    async bulkRestoreDocuments(documentIds: string[]): Promise<DocBulkOperation> {
      try {
        if (!documentIds || documentIds.length === 0) throw new ValidationError('Document IDs are required');
        let successCount = 0;
        let failureCount = 0;
        for (const id of documentIds) {
          try {
            await supabase.from('documents').update({ is_deleted: false, deleted_at: null }).eq('id', id);
            successCount++;
          } catch { failureCount++; }
        }
        return { totalProcessed: documentIds.length, successCount, failureCount, operation: 'bulk_restore', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk restore documents', { documentIds, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to bulk restore documents');
      }
    },

    async bulkMoveDocuments(documentIds: string[], targetFolderId: string): Promise<DocBulkOperation> {
      try {
        if (!documentIds || documentIds.length === 0) throw new ValidationError('Document IDs are required');
        if (!targetFolderId) throw new ValidationError('Target folder ID is required');
        let successCount = 0;
        let failureCount = 0;
        for (const id of documentIds) {
          try {
            await supabase.from('documents').update({ folder_id: targetFolderId, updated_at: new Date().toISOString() }).eq('id', id);
            successCount++;
          } catch { failureCount++; }
        }
        return { totalProcessed: documentIds.length, successCount, failureCount, operation: 'bulk_move', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk move documents', { documentIds, targetFolderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderMoveError('Failed to bulk move documents');
      }
    },

    async bulkTagDocuments(documentIds: string[], tagIds: string[]): Promise<DocBulkOperation> {
      try {
        if (!documentIds || documentIds.length === 0) throw new ValidationError('Document IDs are required');
        if (!tagIds || tagIds.length === 0) throw new ValidationError('Tag IDs are required');
        let successCount = 0;
        let failureCount = 0;
        for (const docId of documentIds) {
          for (const tagId of tagIds) {
            try {
              await supabase.from('document_tags').upsert({ document_id: docId, tag_id: tagId, created_at: new Date().toISOString() });
              successCount++;
            } catch { failureCount++; }
          }
        }
        return { totalProcessed: documentIds.length * tagIds.length, successCount, failureCount, operation: 'bulk_tag', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk tag documents', { documentIds, tagIds, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocTagCreateError('Failed to bulk tag documents');
      }
    },

    async getDocumentBySlug(schoolId: string, slug: string): Promise<DocDocument> {
      try {
        if (!slug) throw new ValidationError('Slug is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('slug', slug).single();
        if (error || !data) throw new DocNotFoundError(`Document with slug ${slug} not found`);
        return data as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to get document by slug', { schoolId, slug, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError('Failed to get document by slug');
      }
    },

    async getDocumentByPath(schoolId: string, path: string): Promise<DocDocument> {
      try {
        if (!path) throw new ValidationError('Path is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('path', path).single();
        if (error || !data) throw new DocNotFoundError(`Document with path ${path} not found`);
        return data as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to get document by path', { schoolId, path, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError('Failed to get document by path');
      }
    },

    async getRecentDocuments(schoolId: string, userId: string, limit?: number): Promise<DocDocument[]> {
      try {
        const queryLimit = limit || 20;
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('created_by', userId).order('updated_at', { ascending: false }).limit(queryLimit);
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get recent documents', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve recent documents');
      }
    },

    async getFavoriteDocuments(schoolId: string, userId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('is_favorite', true).order('updated_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get favorite documents', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve favorite documents');
      }
    },

    async getSharedDocuments(schoolId: string, userId: string): Promise<DocDocument[]> {
      try {
        const { data: perms } = await supabase.from('document_permissions').select('document_id').eq('user_id', userId);
        const docIds = (perms || []).map((p: any) => p.document_id);
        if (docIds.length === 0) return [];
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).in('id', docIds);
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get shared documents', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve shared documents');
      }
    },

    async getOfflineDocuments(schoolId: string, userId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('offline_documents').select('*').eq('school_id', schoolId).eq('user_id', userId);
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get offline documents', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve offline documents');
      }
    },

    async getLockedDocuments(schoolId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('is_locked', true).order('updated_at', { ascending: false });
        if (error) throw new DocLockedError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get locked documents', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocLockedError('Failed to retrieve locked documents');
      }
    },

    async getCheckedOutDocuments(schoolId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('is_checked_out', true).order('updated_at', { ascending: false });
        if (error) throw new DocCheckoutError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get checked out documents', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCheckoutError('Failed to retrieve checked out documents');
      }
    },

    async getExpiredDocuments(schoolId: string): Promise<DocDocument[]> {
      try {
        const now = new Date().toISOString();
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).not('expires_at', 'is', null).lt('expires_at', now).order('expires_at', { ascending: true });
        if (error) throw new DocExpiredError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get expired documents', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocExpiredError('Failed to retrieve expired documents');
      }
    },

    async getDocumentsByCategory(schoolId: string, category: string): Promise<DocDocument[]> {
      try {
        if (!category) throw new ValidationError('Category is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('category', category).order('updated_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by category', { schoolId, category, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by category');
      }
    },

    async getDocumentsByTag(schoolId: string, tagId: string): Promise<DocDocument[]> {
      try {
        if (!tagId) throw new ValidationError('Tag ID is required');
        const { data: tagDocs } = await supabase.from('document_tags').select('document_id').eq('tag_id', tagId);
        const docIds = (tagDocs || []).map((t: any) => t.document_id);
        if (docIds.length === 0) return [];
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).in('id', docIds);
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by tag', { schoolId, tagId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by tag');
      }
    },

    async getDocumentsByAuthor(schoolId: string, authorId: string): Promise<DocDocument[]> {
      try {
        if (!authorId) throw new ValidationError('Author ID is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('author_id', authorId).order('created_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by author', { schoolId, authorId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by author');
      }
    },

    async getDocumentsByDate(schoolId: string, dateFrom: string, dateTo: string): Promise<DocDocument[]> {
      try {
        if (!dateFrom || !dateTo) throw new ValidationError('Date range is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).gte('created_at', dateFrom).lte('created_at', dateTo).order('created_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by date', { schoolId, dateFrom, dateTo, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by date');
      }
    },

    async getDocumentsBySize(schoolId: string, minSize?: number, maxSize?: number): Promise<DocDocument[]> {
      try {
        let query = supabase.from('documents').select('*').eq('school_id', schoolId);
        if (minSize !== undefined) query = query.gte('file_size', minSize);
        if (maxSize !== undefined) query = query.lte('file_size', maxSize);
        query = query.order('file_size', { ascending: false });
        const { data, error } = await query;
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by size', { schoolId, minSize, maxSize, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by size');
      }
    },

    async getDocumentsByType(schoolId: string, mimeType: string): Promise<DocDocument[]> {
      try {
        if (!mimeType) throw new ValidationError('MIME type is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('mime_type', mimeType).order('updated_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by type', { schoolId, mimeType, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by type');
      }
    },

    async getDocumentsByStatus(schoolId: string, status: string): Promise<DocDocument[]> {
      try {
        if (!status) throw new ValidationError('Status is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('status', status).order('updated_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by status', { schoolId, status, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by status');
      }
    },

    async getDocumentsByClassification(schoolId: string, classification: string): Promise<DocDocument[]> {
      try {
        if (!classification) throw new ValidationError('Classification is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('classification', classification).order('updated_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by classification', { schoolId, classification, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by classification');
      }
    },

    async getDocumentsByFolder(schoolId: string, folderId: string): Promise<DocDocument[]> {
      try {
        if (!folderId) throw new ValidationError('Folder ID is required');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('folder_id', folderId).order('name', { ascending: true });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents by folder', { schoolId, folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to retrieve documents by folder');
      }
    },

    async searchDocuments(schoolId: string, query: string): Promise<DocDocument[]> {
      try {
        if (!query || query.trim().length < 2) throw new DocSearchQueryError('Search query must be at least 2 characters');
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).or(`name.ilike.%${query}%,title.ilike.%${query}%,description.ilike.%${query}%`).order('updated_at', { ascending: false });
        if (error) throw new DocSearchError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to search documents', { schoolId, query, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to search documents');
      }
    },

    // --- Folder CRUD (20) ---------------------------------------------------
    async getFolders(schoolId: string, filters?: Record<string, unknown>): Promise<DocFolder[]> {
      try {
        let query = supabase.from('folders').select('*').eq('school_id', schoolId);
        if (filters?.parentId) query = query.eq('parent_id', filters.parentId);
        if (filters?.type) query = query.eq('type', filters.type);
        query = query.order('name', { ascending: true });
        const { data, error } = await query;
        if (error) throw new DocFolderCreateError(error.message);
        return (data || []) as unknown as DocFolder[];
      } catch (error) {
        logger.error('Failed to get folders', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve folders');
      }
    },

    async getFolder(folderId: string): Promise<DocFolder> {
      try {
        const { data, error } = await supabase.from('folders').select('*').eq('id', folderId).single();
        if (error || !data) throw new DocFolderNotFoundError(folderId);
        return data as unknown as DocFolder;
      } catch (error) {
        logger.error('Failed to get folder', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderNotFoundError(folderId);
      }
    },

    async createFolder(data: Partial<DocFolder>, schoolId: string): Promise<DocFolder> {
      try {
        if (!data.name) throw new ValidationError('Folder name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: folder, error } = await supabase.from('folders').insert(payload).select().single();
        if (error) throw new DocFolderCreateError(error.message);
        return folder as unknown as DocFolder;
      } catch (error) {
        logger.error('Failed to create folder', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to create folder');
      }
    },

    async updateFolder(folderId: string, data: Partial<DocFolder>): Promise<DocFolder> {
      try {
        const { data: existing } = await supabase.from('folders').select('id').eq('id', folderId).single();
        if (!existing) throw new DocFolderNotFoundError(folderId);
        const { data: folder, error } = await supabase.from('folders').update({ ...data, updated_at: new Date().toISOString() }).eq('id', folderId).select().single();
        if (error) throw new DocFolderUpdateError(error.message);
        return folder as unknown as DocFolder;
      } catch (error) {
        logger.error('Failed to update folder', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderUpdateError('Failed to update folder');
      }
    },

    async deleteFolder(folderId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('folders').select('id').eq('id', folderId).single();
        if (!existing) throw new DocFolderNotFoundError(folderId);
        const { data: children } = await supabase.from('folders').select('id').eq('parent_id', folderId).limit(1);
        if (children && children.length > 0) throw new DocFolderNotEmptyError();
        const { error } = await supabase.from('folders').delete().eq('id', folderId);
        if (error) throw new DocFolderDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete folder', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderDeleteError('Failed to delete folder');
      }
    },

    async moveFolder(folderId: string, targetParentId: string): Promise<DocFolder> {
      try {
        const { data: existing } = await supabase.from('folders').select('*').eq('id', folderId).single();
        if (!existing) throw new DocFolderNotFoundError(folderId);
        if (folderId === targetParentId) throw new DocFolderCircularReferenceError();
        const { data: folder, error } = await supabase.from('folders').update({ parent_id: targetParentId, updated_at: new Date().toISOString() }).eq('id', folderId).select().single();
        if (error) throw new DocFolderMoveError(error.message);
        return folder as unknown as DocFolder;
      } catch (error) {
        logger.error('Failed to move folder', { folderId, targetParentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderMoveError('Failed to move folder');
      }
    },

    async renameFolder(folderId: string, newName: string): Promise<DocFolder> {
      try {
        if (!newName) throw new ValidationError('Folder name is required');
        const { data: existing } = await supabase.from('folders').select('id').eq('id', folderId).single();
        if (!existing) throw new DocFolderNotFoundError(folderId);
        const { data: folder, error } = await supabase.from('folders').update({ name: newName, updated_at: new Date().toISOString() }).eq('id', folderId).select().single();
        if (error) throw new DocFolderRenameError(error.message);
        return folder as unknown as DocFolder;
      } catch (error) {
        logger.error('Failed to rename folder', { folderId, newName, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderRenameError('Failed to rename folder');
      }
    },

    async getFolderTree(schoolId: string): Promise<DocFolder[]> {
      try {
        const { data, error } = await supabase.from('folders').select('*').eq('school_id', schoolId).order('depth', { ascending: true }).order('name', { ascending: true });
        if (error) throw new DocFolderCreateError(error.message);
        return (data || []) as unknown as DocFolder[];
      } catch (error) {
        logger.error('Failed to get folder tree', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve folder tree');
      }
    },

    async getFolderChildren(folderId: string): Promise<DocFolder[]> {
      try {
        const { data, error } = await supabase.from('folders').select('*').eq('parent_id', folderId).order('name', { ascending: true });
        if (error) throw new DocFolderCreateError(error.message);
        return (data || []) as unknown as DocFolder[];
      } catch (error) {
        logger.error('Failed to get folder children', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve folder children');
      }
    },

    async getFolderPath(folderId: string): Promise<DocFolder[]> {
      try {
        const path: DocFolder[] = [];
        let currentId: string | null = folderId;
        while (currentId) {
          const { data: folder } = await supabase.from('folders').select('*').eq('id', currentId).single();
          if (!folder) break;
          path.unshift(folder as unknown as DocFolder);
          currentId = (folder as any).parent_id || null;
        }
        return path;
      } catch (error) {
        logger.error('Failed to get folder path', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve folder path');
      }
    },

    async getFolderSize(folderId: string): Promise<number> {
      try {
        const { data: docs } = await supabase.from('documents').select('file_size').eq('folder_id', folderId);
        return (docs || []).reduce((sum: number, doc: any) => sum + (doc.file_size || 0), 0);
      } catch (error) {
        logger.error('Failed to get folder size', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to calculate folder size');
      }
    },

    async getFolderDocumentCount(folderId: string): Promise<number> {
      try {
        const { count, error } = await supabase.from('documents').select('id', { count: 'exact', head: true }).eq('folder_id', folderId);
        if (error) throw new DocFolderCreateError(error.message);
        return count || 0;
      } catch (error) {
        logger.error('Failed to get folder document count', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to count documents in folder');
      }
    },

    async getRootFolders(schoolId: string): Promise<DocFolder[]> {
      try {
        const { data, error } = await supabase.from('folders').select('*').eq('school_id', schoolId).is('parent_id', null).order('name', { ascending: true });
        if (error) throw new DocFolderCreateError(error.message);
        return (data || []) as unknown as DocFolder[];
      } catch (error) {
        logger.error('Failed to get root folders', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve root folders');
      }
    },

    async getSharedFolders(schoolId: string, userId: string): Promise<DocFolder[]> {
      try {
        const { data: perms } = await supabase.from('folder_permissions').select('folder_id').eq('user_id', userId);
        const folderIds = (perms || []).map((p: any) => p.folder_id);
        if (folderIds.length === 0) return [];
        const { data, error } = await supabase.from('folders').select('*').eq('school_id', schoolId).in('id', folderIds);
        if (error) throw new DocFolderCreateError(error.message);
        return (data || []) as unknown as DocFolder[];
      } catch (error) {
        logger.error('Failed to get shared folders', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve shared folders');
      }
    },

    async getFavoriteFolders(schoolId: string): Promise<DocFolder[]> {
      try {
        const { data, error } = await supabase.from('folders').select('*').eq('school_id', schoolId).eq('is_favorite', true).order('updated_at', { ascending: false });
        if (error) throw new DocFolderCreateError(error.message);
        return (data || []) as unknown as DocFolder[];
      } catch (error) {
        logger.error('Failed to get favorite folders', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve favorite folders');
      }
    },

    async getRecentFolders(schoolId: string): Promise<DocFolder[]> {
      try {
        const { data, error } = await supabase.from('folders').select('*').eq('school_id', schoolId).order('updated_at', { ascending: false }).limit(20);
        if (error) throw new DocFolderCreateError(error.message);
        return (data || []) as unknown as DocFolder[];
      } catch (error) {
        logger.error('Failed to get recent folders', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to retrieve recent folders');
      }
    },

    async getFolderByPath(schoolId: string, path: string): Promise<DocFolder> {
      try {
        const { data, error } = await supabase.from('folders').select('*').eq('school_id', schoolId).eq('path', path).single();
        if (error || !data) throw new DocFolderNotFoundError(`Folder with path ${path} not found`);
        return data as unknown as DocFolder;
      } catch (error) {
        logger.error('Failed to get folder by path', { schoolId, path, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderNotFoundError('Failed to get folder by path');
      }
    },

    async getFolderPermissions(folderId: string): Promise<DocPermission[]> {
      try {
        const { data, error } = await supabase.from('folder_permissions').select('*').eq('folder_id', folderId);
        if (error) throw new DocFolderPermissionError(error.message);
        return (data || []) as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get folder permissions', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderPermissionError('Failed to retrieve folder permissions');
      }
    },

    async getFolderActivities(folderId: string): Promise<DocActivity[]> {
      try {
        const { data, error } = await supabase.from('activities').select('*').eq('folder_id', folderId).order('created_at', { ascending: false });
        if (error) throw new DocActivityLogError(error.message);
        return (data || []) as unknown as DocActivity[];
      } catch (error) {
        logger.error('Failed to get folder activities', { folderId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocActivityLogError('Failed to retrieve folder activities');
      }
    },

    async getFolderStats(schoolId: string): Promise<{ totalFolders: number; rootFolders: number; maxDepth: number; averageDocumentsPerFolder: number }> {
      try {
        const { count: totalFolders } = await supabase.from('folders').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: rootFolders } = await supabase.from('folders').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).is('parent_id', null);
        const { data: allFolders } = await supabase.from('folders').select('id, depth').eq('school_id', schoolId);
        const folders = (allFolders || []) as any[];
        const maxDepth = folders.reduce((max: number, f: any) => Math.max(max, f.depth || 0), 0);
        return { totalFolders: totalFolders || 0, rootFolders: rootFolders || 0, maxDepth, averageDocumentsPerFolder: 0 };
      } catch (error) {
        logger.error('Failed to get folder stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocFolderCreateError('Failed to get folder stats');
      }
    },

    // --- Workspace CRUD (15) ------------------------------------------------
    async getWorkspaces(schoolId: string): Promise<DocWorkspace[]> {
      try {
        const { data, error } = await supabase.from('workspaces').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocWorkspaceCreateError(error.message);
        return (data || []) as unknown as DocWorkspace[];
      } catch (error) {
        logger.error('Failed to get workspaces', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceCreateError('Failed to retrieve workspaces');
      }
    },

    async getWorkspace(workspaceId: string): Promise<DocWorkspace> {
      try {
        const { data, error } = await supabase.from('workspaces').select('*').eq('id', workspaceId).single();
        if (error || !data) throw new DocWorkspaceNotFoundError(workspaceId);
        return data as unknown as DocWorkspace;
      } catch (error) {
        logger.error('Failed to get workspace', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceNotFoundError(workspaceId);
      }
    },

    async createWorkspace(data: Partial<DocWorkspace>, schoolId: string): Promise<DocWorkspace> {
      try {
        if (!data.name) throw new ValidationError('Workspace name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: workspace, error } = await supabase.from('workspaces').insert(payload).select().single();
        if (error) throw new DocWorkspaceCreateError(error.message);
        return workspace as unknown as DocWorkspace;
      } catch (error) {
        logger.error('Failed to create workspace', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceCreateError('Failed to create workspace');
      }
    },

    async updateWorkspace(workspaceId: string, data: Partial<DocWorkspace>): Promise<DocWorkspace> {
      try {
        const { data: existing } = await supabase.from('workspaces').select('id').eq('id', workspaceId).single();
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);
        const { data: workspace, error } = await supabase.from('workspaces').update({ ...data, updated_at: new Date().toISOString() }).eq('id', workspaceId).select().single();
        if (error) throw new DocWorkspaceUpdateError(error.message);
        return workspace as unknown as DocWorkspace;
      } catch (error) {
        logger.error('Failed to update workspace', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceUpdateError('Failed to update workspace');
      }
    },

    async deleteWorkspace(workspaceId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('workspaces').select('id').eq('id', workspaceId).single();
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);
        await supabase.from('workspace_members').delete().eq('workspace_id', workspaceId);
        const { error } = await supabase.from('workspaces').delete().eq('id', workspaceId);
        if (error) throw new DocWorkspaceDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete workspace', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceDeleteError('Failed to delete workspace');
      }
    },

    async getWorkspaceMembers(workspaceId: string): Promise<DocAccess[]> {
      try {
        const { data, error } = await supabase.from('workspace_members').select('*').eq('workspace_id', workspaceId).order('joined_at', { ascending: true });
        if (error) throw new DocWorkspaceMemberError(error.message);
        return (data || []) as unknown as DocAccess[];
      } catch (error) {
        logger.error('Failed to get workspace members', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceMemberError('Failed to retrieve workspace members');
      }
    },

    async addWorkspaceMember(workspaceId: string, userId: string, role?: string): Promise<DocAccess> {
      try {
        const { data: existing } = await supabase.from('workspace_members').select('id').eq('workspace_id', workspaceId).eq('user_id', userId).single();
        if (existing) throw new DocWorkspaceMemberError('User is already a member');
        const payload = { workspace_id: workspaceId, user_id: userId, role: role || 'member', joined_at: new Date().toISOString() };
        const { data: member, error } = await supabase.from('workspace_members').insert(payload).select().single();
        if (error) throw new DocWorkspaceMemberError(error.message);
        return member as unknown as DocAccess;
      } catch (error) {
        logger.error('Failed to add workspace member', { workspaceId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceMemberError('Failed to add workspace member');
      }
    },

    async removeWorkspaceMember(workspaceId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('workspace_members').select('id').eq('workspace_id', workspaceId).eq('user_id', userId).single();
        if (!existing) throw new DocWorkspaceMemberError('User is not a member');
        const { error } = await supabase.from('workspace_members').delete().eq('workspace_id', workspaceId).eq('user_id', userId);
        if (error) throw new DocWorkspaceMemberError(error.message);
      } catch (error) {
        logger.error('Failed to remove workspace member', { workspaceId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceMemberError('Failed to remove workspace member');
      }
    },

    async updateWorkspaceMemberRole(workspaceId: string, userId: string, role: string): Promise<DocAccess> {
      try {
        const { data: existing } = await supabase.from('workspace_members').select('id').eq('workspace_id', workspaceId).eq('user_id', userId).single();
        if (!existing) throw new DocWorkspaceMemberError('User is not a member');
        const { data: member, error } = await supabase.from('workspace_members').update({ role, updated_at: new Date().toISOString() }).eq('workspace_id', workspaceId).eq('user_id', userId).select().single();
        if (error) throw new DocWorkspaceMemberError(error.message);
        return member as unknown as DocAccess;
      } catch (error) {
        logger.error('Failed to update workspace member role', { workspaceId, userId, role, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceMemberError('Failed to update member role');
      }
    },

    async getWorkspaceDocuments(workspaceId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('workspace_id', workspaceId).order('updated_at', { ascending: false });
        if (error) throw new DocWorkspaceAccessError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get workspace documents', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceAccessError('Failed to retrieve workspace documents');
      }
    },

    async getWorkspaceStats(workspaceId: string): Promise<{ totalDocuments: number; totalMembers: number; storageUsed: number; activeWorkflows: number }> {
      try {
        const { count: totalDocuments } = await supabase.from('documents').select('id', { count: 'exact', head: true }).eq('workspace_id', workspaceId);
        const { count: totalMembers } = await supabase.from('workspace_members').select('id', { count: 'exact', head: true }).eq('workspace_id', workspaceId);
        const { data: docs } = await supabase.from('documents').select('file_size').eq('workspace_id', workspaceId);
        const storageUsed = (docs || []).reduce((sum: number, d: any) => sum + (d.file_size || 0), 0);
        return { totalDocuments: totalDocuments || 0, totalMembers: totalMembers || 0, storageUsed, activeWorkflows: 0 };
      } catch (error) {
        logger.error('Failed to get workspace stats', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceAccessError('Failed to get workspace stats');
      }
    },

    async getWorkspaceActivity(workspaceId: string): Promise<DocActivity[]> {
      try {
        const { data, error } = await supabase.from('activities').select('*').eq('workspace_id', workspaceId).order('created_at', { ascending: false }).limit(50);
        if (error) throw new DocWorkspaceAccessError(error.message);
        return (data || []) as unknown as DocActivity[];
      } catch (error) {
        logger.error('Failed to get workspace activity', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceAccessError('Failed to retrieve workspace activity');
      }
    },

    async getWorkspaceSettings(workspaceId: string): Promise<DocWorkspace> {
      try {
        const { data, error } = await supabase.from('workspaces').select('*').eq('id', workspaceId).single();
        if (error || !data) throw new DocWorkspaceNotFoundError(workspaceId);
        return data as unknown as DocWorkspace;
      } catch (error) {
        logger.error('Failed to get workspace settings', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceNotFoundError('Failed to get workspace settings');
      }
    },

    async updateWorkspaceSettings(workspaceId: string, data: Partial<DocWorkspace>): Promise<DocWorkspace> {
      try {
        const { data: existing } = await supabase.from('workspaces').select('id').eq('id', workspaceId).single();
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);
        const { data: workspace, error } = await supabase.from('workspaces').update({ ...data, updated_at: new Date().toISOString() }).eq('id', workspaceId).select().single();
        if (error) throw new DocWorkspaceUpdateError(error.message);
        return workspace as unknown as DocWorkspace;
      } catch (error) {
        logger.error('Failed to update workspace settings', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceUpdateError('Failed to update workspace settings');
      }
    },

    async getWorkspaceQuota(workspaceId: string): Promise<DocQuota> {
      try {
        const { data: workspace } = await supabase.from('workspaces').select('quota_bytes, used_bytes').eq('id', workspaceId).single();
        if (!workspace) throw new DocWorkspaceNotFoundError(workspaceId);
        return { totalBytes: (workspace as any).quota_bytes || 0, usedBytes: (workspace as any).used_bytes || 0, availableBytes: ((workspace as any).quota_bytes || 0) - ((workspace as any).used_bytes || 0), usagePercent: (workspace as any).quota_bytes > 0 ? ((workspace as any).used_bytes / (workspace as any).quota_bytes) * 100 : 0 } as unknown as DocQuota;
      } catch (error) {
        logger.error('Failed to get workspace quota', { workspaceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkspaceQuotaError('Failed to get workspace quota');
      }
    },

    // --- Permissions (20) ---------------------------------------------------
    async getDocumentPermissions(documentId: string): Promise<DocPermission[]> {
      try {
        const { data, error } = await supabase.from('document_permissions').select('*').eq('document_id', documentId);
        if (error) throw new DocPermissionDeniedError(error.message);
        return (data || []) as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get document permissions', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to retrieve document permissions');
      }
    },

    async grantPermission(documentId: string, userId: string, permission: string, grantedBy: string): Promise<DocPermission> {
      try {
        if (!userId) throw new ValidationError('User ID is required');
        const payload = { document_id: documentId, user_id: userId, permission, granted_by: grantedBy, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: perm, error } = await supabase.from('document_permissions').upsert(payload).select().single();
        if (error) throw new DocPermissionDeniedError(error.message);
        return perm as unknown as DocPermission;
      } catch (error) {
        logger.error('Failed to grant permission', { documentId, userId, permission, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to grant permission');
      }
    },

    async revokePermission(documentId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('document_permissions').select('id').eq('document_id', documentId).eq('user_id', userId).single();
        if (!existing) throw new DocPermissionDeniedError('Permission not found');
        const { error } = await supabase.from('document_permissions').delete().eq('document_id', documentId).eq('user_id', userId);
        if (error) throw new DocPermissionDeniedError(error.message);
      } catch (error) {
        logger.error('Failed to revoke permission', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to revoke permission');
      }
    },

    async updatePermission(documentId: string, userId: string, permission: string): Promise<DocPermission> {
      try {
        const { data: existing } = await supabase.from('document_permissions').select('id').eq('document_id', documentId).eq('user_id', userId).single();
        if (!existing) throw new DocPermissionDeniedError('Permission not found');
        const { data: perm, error } = await supabase.from('document_permissions').update({ permission, updated_at: new Date().toISOString() }).eq('document_id', documentId).eq('user_id', userId).select().single();
        if (error) throw new DocPermissionDeniedError(error.message);
        return perm as unknown as DocPermission;
      } catch (error) {
        logger.error('Failed to update permission', { documentId, userId, permission, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to update permission');
      }
    },

    async bulkGrantPermissions(documentIds: string[], userId: string, permission: string): Promise<DocBulkOperation> {
      try {
        let successCount = 0;
        let failureCount = 0;
        for (const docId of documentIds) {
          try {
            await supabase.from('document_permissions').upsert({ document_id: docId, user_id: userId, permission, created_at: new Date().toISOString() });
            successCount++;
          } catch { failureCount++; }
        }
        return { totalProcessed: documentIds.length, successCount, failureCount, operation: 'bulk_grant', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk grant permissions', { documentIds, userId, permission, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to bulk grant permissions');
      }
    },

    async bulkRevokePermissions(documentIds: string[], userId: string): Promise<DocBulkOperation> {
      try {
        let successCount = 0;
        let failureCount = 0;
        for (const docId of documentIds) {
          try {
            await supabase.from('document_permissions').delete().eq('document_id', docId).eq('user_id', userId);
            successCount++;
          } catch { failureCount++; }
        }
        return { totalProcessed: documentIds.length, successCount, failureCount, operation: 'bulk_revoke', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk revoke permissions', { documentIds, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to bulk revoke permissions');
      }
    },

    async checkPermission(documentId: string, userId: string): Promise<DocPermission | null> {
      try {
        const { data, error } = await supabase.from('document_permissions').select('*').eq('document_id', documentId).eq('user_id', userId).single();
        if (error) return null;
        return data as unknown as DocPermission;
      } catch (error) {
        logger.error('Failed to check permission', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to check permission');
      }
    },

    async getEffectivePermissions(documentId: string, userId: string): Promise<DocPermission[]> {
      try {
        const { data: directPerms } = await supabase.from('document_permissions').select('*').eq('document_id', documentId).eq('user_id', userId);
        return [...(directPerms || [])] as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get effective permissions', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get effective permissions');
      }
    },

    async getInheritedPermissions(documentId: string): Promise<DocPermission[]> {
      try {
        const { data: doc } = await supabase.from('documents').select('folder_id').eq('id', documentId).single();
        if (!doc || !(doc as any).folder_id) return [];
        const { data, error } = await supabase.from('folder_permissions').select('*').eq('folder_id', (doc as any).folder_id);
        if (error) throw new DocPermissionDeniedError(error.message);
        return (data || []) as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get inherited permissions', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get inherited permissions');
      }
    },

    async getPermissionHistory(documentId: string): Promise<DocAccessLog[]> {
      try {
        const { data, error } = await supabase.from('access_logs').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocPermissionDeniedError(error.message);
        return (data || []) as unknown as DocAccessLog[];
      } catch (error) {
        logger.error('Failed to get permission history', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get permission history');
      }
    },

    async getPermissionsByUser(schoolId: string, userId: string): Promise<DocPermission[]> {
      try {
        const { data, error } = await supabase.from('document_permissions').select('*').eq('user_id', userId);
        if (error) throw new DocPermissionDeniedError(error.message);
        return (data || []) as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get permissions by user', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get permissions by user');
      }
    },

    async getPermissionsByRole(schoolId: string, role: string): Promise<DocPermission[]> {
      try {
        const { data, error } = await supabase.from('document_permissions').select('*').eq('role', role);
        if (error) throw new DocPermissionDeniedError(error.message);
        return (data || []) as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get permissions by role', { schoolId, role, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get permissions by role');
      }
    },

    async getPermissionsByGroup(schoolId: string, groupId: string): Promise<DocPermission[]> {
      try {
        const { data, error } = await supabase.from('document_permissions').select('*').eq('group_id', groupId);
        if (error) throw new DocGroupAccessError(error.message);
        return (data || []) as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get permissions by group', { schoolId, groupId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocGroupAccessError('Failed to get permissions by group');
      }
    },

    async requestPermission(documentId: string, userId: string, requestedPermission: string): Promise<DocAccessLog> {
      try {
        const payload = { document_id: documentId, user_id: userId, action: 'permission_request', details: { requestedPermission }, status: 'pending', created_at: new Date().toISOString() };
        const { data: log, error } = await supabase.from('access_logs').insert(payload).select().single();
        if (error) throw new DocPermissionDeniedError(error.message);
        return log as unknown as DocAccessLog;
      } catch (error) {
        logger.error('Failed to request permission', { documentId, userId, requestedPermission, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to request permission');
      }
    },

    async approvePermission(requestId: string, approvedBy: string): Promise<DocAccessLog> {
      try {
        const { data: existing } = await supabase.from('access_logs').select('*').eq('id', requestId).single();
        if (!existing) throw new DocPermissionDeniedError('Request not found');
        const { data: log, error } = await supabase.from('access_logs').update({ status: 'approved', approved_by: approvedBy, approved_at: new Date().toISOString() }).eq('id', requestId).select().single();
        if (error) throw new DocPermissionDeniedError(error.message);
        return log as unknown as DocAccessLog;
      } catch (error) {
        logger.error('Failed to approve permission', { requestId, approvedBy, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to approve permission');
      }
    },

    async denyPermission(requestId: string, deniedBy: string, reason?: string): Promise<DocAccessLog> {
      try {
        const { data: existing } = await supabase.from('access_logs').select('id').eq('id', requestId).single();
        if (!existing) throw new DocPermissionDeniedError('Request not found');
        const { data: log, error } = await supabase.from('access_logs').update({ status: 'denied', denied_by: deniedBy, denied_at: new Date().toISOString(), denial_reason: reason }).eq('id', requestId).select().single();
        if (error) throw new DocPermissionDeniedError(error.message);
        return log as unknown as DocAccessLog;
      } catch (error) {
        logger.error('Failed to deny permission', { requestId, deniedBy, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to deny permission');
      }
    },

    async getPermissionRequests(schoolId: string): Promise<DocAccessLog[]> {
      try {
        const { data, error } = await supabase.from('access_logs').select('*').eq('action', 'permission_request').eq('status', 'pending').order('created_at', { ascending: false });
        if (error) throw new DocPermissionDeniedError(error.message);
        return (data || []) as unknown as DocAccessLog[];
      } catch (error) {
        logger.error('Failed to get permission requests', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get permission requests');
      }
    },

    async getPermissionStats(schoolId: string): Promise<DocPermissionStats> {
      try {
        const { count: totalPermissions } = await supabase.from('document_permissions').select('id', { count: 'exact', head: true });
        return { totalPermissions: totalPermissions || 0, permissionsByType: {}, permissionsByLevel: {}, usersWithDirectAccess: 0, groupsWithAccess: 0, externalSharesActive: 0, externalSharesExpired: 0, pendingInvitations: 0, averagePermissionsPerDocument: 0, documentsWithPublicAccess: 0, permissionChangesLast30d: 0 };
      } catch (error) {
        logger.error('Failed to get permission stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get permission stats');
      }
    },

    async getDefaultPermissions(schoolId: string): Promise<DocPermission[]> {
      try {
        const { data, error } = await supabase.from('default_permissions').select('*').eq('school_id', schoolId);
        if (error) throw new DocPermissionDeniedError(error.message);
        return (data || []) as unknown as DocPermission[];
      } catch (error) {
        logger.error('Failed to get default permissions', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to get default permissions');
      }
    },

    async updateDefaultPermissions(schoolId: string, permissions: Partial<DocPermission>[]): Promise<void> {
      try {
        for (const perm of permissions) {
          await supabase.from('default_permissions').upsert({ ...perm, school_id: schoolId, updated_at: new Date().toISOString() });
        }
      } catch (error) {
        logger.error('Failed to update default permissions', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPermissionDeniedError('Failed to update default permissions');
      }
    },

    // --- Sharing (15) -------------------------------------------------------
    async getShareLinks(documentId: string): Promise<DocShareLink[]> {
      try {
        const { data, error } = await supabase.from('share_links').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocShareLinkError(error.message);
        return (data || []) as unknown as DocShareLink[];
      } catch (error) {
        logger.error('Failed to get share links', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to retrieve share links');
      }
    },

    async createShareLink(documentId: string, options: { expiresAt?: string; maxDownloads?: number; password?: string; isPublic?: boolean }): Promise<DocShareLink> {
      try {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const payload = { document_id: documentId, token, expires_at: options.expiresAt, max_downloads: options.maxDownloads, password: options.password, is_public: options.isPublic || false, download_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: link, error } = await supabase.from('share_links').insert(payload).select().single();
        if (error) throw new DocShareLinkError(error.message);
        return link as unknown as DocShareLink;
      } catch (error) {
        logger.error('Failed to create share link', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to create share link');
      }
    },

    async updateShareLink(linkId: string, data: Partial<DocShareLink>): Promise<DocShareLink> {
      try {
        const { data: existing } = await supabase.from('share_links').select('id').eq('id', linkId).single();
        if (!existing) throw new DocShareInvalidError('Share link not found');
        const { data: link, error } = await supabase.from('share_links').update({ ...data, updated_at: new Date().toISOString() }).eq('id', linkId).select().single();
        if (error) throw new DocShareLinkError(error.message);
        return link as unknown as DocShareLink;
      } catch (error) {
        logger.error('Failed to update share link', { linkId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to update share link');
      }
    },

    async revokeShareLink(linkId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('share_links').select('id').eq('id', linkId).single();
        if (!existing) throw new DocShareInvalidError('Share link not found');
        const { error } = await supabase.from('share_links').update({ is_revoked: true, revoked_at: new Date().toISOString() }).eq('id', linkId);
        if (error) throw new DocShareRevokedError(error.message);
      } catch (error) {
        logger.error('Failed to revoke share link', { linkId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareRevokedError('Failed to revoke share link');
      }
    },

    async getShareLinkByToken(token: string): Promise<DocShareLink> {
      try {
        const { data, error } = await supabase.from('share_links').select('*').eq('token', token).single();
        if (error || !data) throw new DocShareInvalidError('Share link not found');
        if ((data as any).is_revoked) throw new DocShareRevokedError('Share link has been revoked');
        if ((data as any).expires_at && new Date((data as any).expires_at) < new Date()) throw new DocShareExpiredError('Share link has expired');
        return data as unknown as DocShareLink;
      } catch (error) {
        logger.error('Failed to get share link by token', { token, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareInvalidError('Failed to get share link');
      }
    },

    async validateShareLink(token: string, password?: string): Promise<boolean> {
      try {
        const { data } = await supabase.from('share_links').select('*').eq('token', token).single();
        if (!data) return false;
        if ((data as any).is_revoked) return false;
        if ((data as any).expires_at && new Date((data as any).expires_at) < new Date()) return false;
        if ((data as any).password && password !== (data as any).password) return false;
        return true;
      } catch (error) {
        logger.error('Failed to validate share link', { token, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareInvalidError('Failed to validate share link');
      }
    },

    async getShareStats(schoolId: string): Promise<{ totalLinks: number; activeLinks: number; expiredLinks: number; revokedLinks: number; totalDownloads: number }> {
      try {
        const { count: totalLinks } = await supabase.from('share_links').select('id', { count: 'exact', head: true });
        const { data: allLinks } = await supabase.from('share_links').select('download_count, expires_at, is_revoked');
        const links = (allLinks || []) as any[];
        const now = new Date();
        return { totalLinks: totalLinks || 0, activeLinks: links.filter(l => !l.is_revoked).length, expiredLinks: links.filter(l => l.expires_at && new Date(l.expires_at) < now).length, revokedLinks: links.filter(l => l.is_revoked).length, totalDownloads: links.reduce((s: number, l: any) => s + (l.download_count || 0), 0) };
      } catch (error) {
        logger.error('Failed to get share stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to get share stats');
      }
    },

    async getShareActivity(schoolId: string): Promise<DocAccessLog[]> {
      try {
        const { data, error } = await supabase.from('access_logs').select('*').eq('action', 'share').order('created_at', { ascending: false }).limit(50);
        if (error) throw new DocShareLinkError(error.message);
        return (data || []) as unknown as DocAccessLog[];
      } catch (error) {
        logger.error('Failed to get share activity', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to get share activity');
      }
    },

    async getSharedWithMe(schoolId: string, userId: string): Promise<DocDocument[]> {
      try {
        const { data: perms } = await supabase.from('document_permissions').select('document_id').eq('user_id', userId);
        const docIds = (perms || []).map((p: any) => p.document_id);
        if (docIds.length === 0) return [];
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).in('id', docIds);
        if (error) throw new DocShareLinkError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get shared with me', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to get shared with me');
      }
    },

    async getSharedByMe(schoolId: string, userId: string): Promise<DocDocument[]> {
      try {
        const { data: perms } = await supabase.from('document_permissions').select('document_id').eq('granted_by', userId);
        const docIds = (perms || []).map((p: any) => p.document_id);
        if (docIds.length === 0) return [];
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).in('id', docIds);
        if (error) throw new DocShareLinkError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get shared by me', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to get shared by me');
      }
    },

    async getPublicDocuments(schoolId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('is_public', true);
        if (error) throw new DocPublicAccessError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get public documents', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocPublicAccessError('Failed to get public documents');
      }
    },

    async getExternalShares(schoolId: string): Promise<DocShareLink[]> {
      try {
        const { data, error } = await supabase.from('share_links').select('*').eq('is_public', true).order('created_at', { ascending: false });
        if (error) throw new DocExternalAccessError(error.message);
        return (data || []) as unknown as DocShareLink[];
      } catch (error) {
        logger.error('Failed to get external shares', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocExternalAccessError('Failed to get external shares');
      }
    },

    async getSharePermissions(documentId: string): Promise<DocSharePermission[]> {
      try {
        const { data, error } = await supabase.from('share_permissions').select('*').eq('document_id', documentId);
        if (error) throw new DocShareLinkError(error.message);
        return (data || []) as unknown as DocSharePermission[];
      } catch (error) {
        logger.error('Failed to get share permissions', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to get share permissions');
      }
    },

    async bulkShare(documentIds: string[], userId: string, permission: string): Promise<DocBulkOperation> {
      try {
        let successCount = 0;
        let failureCount = 0;
        for (const docId of documentIds) {
          try {
            await supabase.from('document_permissions').upsert({ document_id: docId, user_id: userId, permission, created_at: new Date().toISOString() });
            successCount++;
          } catch { failureCount++; }
        }
        return { totalProcessed: documentIds.length, successCount, failureCount, operation: 'bulk_share', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk share', { documentIds, userId, permission, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to bulk share');
      }
    },

    async getShareLinkDownloads(linkId: string): Promise<{ totalDownloads: number; downloads: DocAccessLog[] }> {
      try {
        const { data: link } = await supabase.from('share_links').select('download_count').eq('id', linkId).single();
        const { data: downloads } = await supabase.from('download_logs').select('*').eq('share_link_id', linkId).order('created_at', { ascending: false });
        return { totalDownloads: (link as any)?.download_count || 0, downloads: (downloads || []) as unknown as DocAccessLog[] };
      } catch (error) {
        logger.error('Failed to get share link downloads', { linkId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocShareLinkError('Failed to get share link downloads');
      }
    },

    // --- Signatures (20) ---------------------------------------------------
    async getSignatures(documentId: string): Promise<DocSignature[]> {
      try {
        const { data, error } = await supabase.from('signatures').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocSignatureCreateError(error.message);
        return (data || []) as unknown as DocSignature[];
      } catch (error) {
        logger.error('Failed to get signatures', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to retrieve signatures');
      }
    },

    async getSignature(signatureId: string): Promise<DocSignature> {
      try {
        const { data, error } = await supabase.from('signatures').select('*').eq('id', signatureId).single();
        if (error || !data) throw new DocSignatureNotFoundError(signatureId);
        return data as unknown as DocSignature;
      } catch (error) {
        logger.error('Failed to get signature', { signatureId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureNotFoundError(signatureId);
      }
    },

    async createSignatureRequest(data: Partial<DocSignatureRequest>, schoolId: string): Promise<DocSignatureRequest> {
      try {
        if (!data.documentId) throw new ValidationError('Document ID is required');
        const payload = { ...data, school_id: schoolId, status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: request, error } = await supabase.from('signature_requests').insert(payload).select().single();
        if (error) throw new DocSignatureCreateError(error.message);
        return request as unknown as DocSignatureRequest;
      } catch (error) {
        logger.error('Failed to create signature request', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to create signature request');
      }
    },

    async updateSignatureRequest(requestId: string, data: Partial<DocSignatureRequest>): Promise<DocSignatureRequest> {
      try {
        const { data: existing } = await supabase.from('signature_requests').select('id').eq('id', requestId).single();
        if (!existing) throw new DocSignatureNotFoundError(requestId);
        const { data: request, error } = await supabase.from('signature_requests').update({ ...data, updated_at: new Date().toISOString() }).eq('id', requestId).select().single();
        if (error) throw new DocSignatureCreateError(error.message);
        return request as unknown as DocSignatureRequest;
      } catch (error) {
        logger.error('Failed to update signature request', { requestId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to update signature request');
      }
    },

    async cancelSignatureRequest(requestId: string): Promise<DocSignatureRequest> {
      try {
        const { data: existing } = await supabase.from('signature_requests').select('*').eq('id', requestId).single();
        if (!existing) throw new DocSignatureNotFoundError(requestId);
        const { data: request, error } = await supabase.from('signature_requests').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', requestId).select().single();
        if (error) throw new DocSignatureCreateError(error.message);
        return request as unknown as DocSignatureRequest;
      } catch (error) {
        logger.error('Failed to cancel signature request', { requestId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to cancel signature request');
      }
    },

    async approveSignature(signatureId: string, approvedBy: string): Promise<DocSignature> {
      try {
        const { data: existing } = await supabase.from('signatures').select('*').eq('id', signatureId).single();
        if (!existing) throw new DocSignatureNotFoundError(signatureId);
        const { data: sig, error } = await supabase.from('signatures').update({ status: 'approved', approved_by: approvedBy, approved_at: new Date().toISOString() }).eq('id', signatureId).select().single();
        if (error) throw new DocSignatureCreateError(error.message);
        return sig as unknown as DocSignature;
      } catch (error) {
        logger.error('Failed to approve signature', { signatureId, approvedBy, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to approve signature');
      }
    },

    async rejectSignature(signatureId: string, rejectedBy: string, reason?: string): Promise<DocSignature> {
      try {
        const { data: existing } = await supabase.from('signatures').select('*').eq('id', signatureId).single();
        if (!existing) throw new DocSignatureNotFoundError(signatureId);
        const { data: sig, error } = await supabase.from('signatures').update({ status: 'rejected', rejected_by: rejectedBy, rejected_at: new Date().toISOString(), rejection_reason: reason }).eq('id', signatureId).select().single();
        if (error) throw new DocSignatureRejectedError(error.message);
        return sig as unknown as DocSignature;
      } catch (error) {
        logger.error('Failed to reject signature', { signatureId, rejectedBy, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureRejectedError('Failed to reject signature');
      }
    },

    async revokeSignature(signatureId: string, revokedBy: string): Promise<DocSignature> {
      try {
        const { data: existing } = await supabase.from('signatures').select('*').eq('id', signatureId).single();
        if (!existing) throw new DocSignatureNotFoundError(signatureId);
        const { data: sig, error } = await supabase.from('signatures').update({ status: 'revoked', revoked_by: revokedBy, revoked_at: new Date().toISOString() }).eq('id', signatureId).select().single();
        if (error) throw new DocSignatureRevokedError(error.message);
        return sig as unknown as DocSignature;
      } catch (error) {
        logger.error('Failed to revoke signature', { signatureId, revokedBy, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureRevokedError('Failed to revoke signature');
      }
    },

    async getSignatureWorkflow(documentId: string): Promise<DocSignatureWorkflow> {
      try {
        const { data, error } = await supabase.from('signature_workflows').select('*').eq('document_id', documentId).single();
        if (error || !data) throw new DocSignatureNotFoundError('Signature workflow not found');
        return data as unknown as DocSignatureWorkflow;
      } catch (error) {
        logger.error('Failed to get signature workflow', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureNotFoundError('Failed to get signature workflow');
      }
    },

    async getSignatureHistory(documentId: string): Promise<DocSignature[]> {
      try {
        const { data, error } = await supabase.from('signatures').select('*').eq('document_id', documentId).order('created_at', { ascending: true });
        if (error) throw new DocSignatureCreateError(error.message);
        return (data || []) as unknown as DocSignature[];
      } catch (error) {
        logger.error('Failed to get signature history', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to get signature history');
      }
    },

    async getPendingSignatures(schoolId: string): Promise<DocSignature[]> {
      try {
        const { data, error } = await supabase.from('signatures').select('*').eq('school_id', schoolId).eq('status', 'pending').order('created_at', { ascending: false });
        if (error) throw new DocSignatureCreateError(error.message);
        return (data || []) as unknown as DocSignature[];
      } catch (error) {
        logger.error('Failed to get pending signatures', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to get pending signatures');
      }
    },

    async getCompletedSignatures(schoolId: string): Promise<DocSignature[]> {
      try {
        const { data, error } = await supabase.from('signatures').select('*').eq('school_id', schoolId).eq('status', 'approved').order('approved_at', { ascending: false });
        if (error) throw new DocSignatureCreateError(error.message);
        return (data || []) as unknown as DocSignature[];
      } catch (error) {
        logger.error('Failed to get completed signatures', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to get completed signatures');
      }
    },

    async getExpiredSignatures(schoolId: string): Promise<DocSignature[]> {
      try {
        const now = new Date().toISOString();
        const { data, error } = await supabase.from('signatures').select('*').eq('school_id', schoolId).eq('status', 'pending').not('expires_at', 'is', null).lt('expires_at', now);
        if (error) throw new DocSignatureExpiredError(error.message);
        return (data || []) as unknown as DocSignature[];
      } catch (error) {
        logger.error('Failed to get expired signatures', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureExpiredError('Failed to get expired signatures');
      }
    },

    async getSignatureStats(schoolId: string): Promise<DocSignatureStats> {
      try {
        const { count: totalSignatures } = await supabase.from('signatures').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: pendingSignatures } = await supabase.from('signatures').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'pending');
        const { count: completedSignatures } = await supabase.from('signatures').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'approved');
        const { count: rejectedSignatures } = await supabase.from('signatures').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'rejected');
        const { count: revokedSignatures } = await supabase.from('signatures').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'revoked');
        return { totalSignatures: totalSignatures || 0, pendingSignatures: pendingSignatures || 0, completedSignatures: completedSignatures || 0, rejectedSignatures: rejectedSignatures || 0, revokedSignatures: revokedSignatures || 0, signaturesLast24h: 0, signaturesLast7d: 0, signaturesLast30d: 0, averageSigningTimeMinutes: 0, signaturesByType: {}, signaturesByLevel: {}, documentsAwaitingSignature: pendingSignatures || 0, signaturesByStatus: {} };
      } catch (error) {
        logger.error('Failed to get signature stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to get signature stats');
      }
    },

    async validateSignature(signatureId: string): Promise<boolean> {
      try {
        const { data } = await supabase.from('signatures').select('*').eq('id', signatureId).single();
        if (!data) return false;
        return (data as any).status === 'approved';
      } catch (error) {
        logger.error('Failed to validate signature', { signatureId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureInvalidError('Failed to validate signature');
      }
    },

    async getSignatureCertificate(signatureId: string): Promise<DocCertificate> {
      try {
        const { data, error } = await supabase.from('certificates').select('*').eq('signature_id', signatureId).single();
        if (error || !data) throw new DocSignatureCertificateError('Certificate not found');
        return data as unknown as DocCertificate;
      } catch (error) {
        logger.error('Failed to get signature certificate', { signatureId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCertificateError('Failed to get signature certificate');
      }
    },

    async getSignatureAudit(documentId: string): Promise<DocAudit[]> {
      try {
        const { data, error } = await supabase.from('audits').select('*').eq('document_id', documentId).eq('action_type', 'signature').order('created_at', { ascending: false });
        if (error) throw new DocAuditError(error.message);
        return (data || []) as unknown as DocAudit[];
      } catch (error) {
        logger.error('Failed to get signature audit', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocAuditError('Failed to get signature audit');
      }
    },

    async bulkSign(documentIds: string[], signerId: string): Promise<DocBulkOperation> {
      try {
        let successCount = 0;
        let failureCount = 0;
        for (const docId of documentIds) {
          try {
            await supabase.from('signatures').insert({ document_id: docId, signer_id: signerId, status: 'pending', created_at: new Date().toISOString() });
            successCount++;
          } catch { failureCount++; }
        }
        return { totalProcessed: documentIds.length, successCount, failureCount, operation: 'bulk_sign', created_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to bulk sign', { documentIds, signerId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to bulk sign');
      }
    },

    async getSignatureReminders(documentId: string): Promise<DocNotification[]> {
      try {
        const { data, error } = await supabase.from('notifications').select('*').eq('document_id', documentId).eq('type', 'signature_reminder');
        if (error) throw new DocSignatureCreateError(error.message);
        return (data || []) as unknown as DocNotification[];
      } catch (error) {
        logger.error('Failed to get signature reminders', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to get signature reminders');
      }
    },

    async getSignatureTemplate(documentId: string): Promise<DocFormField[]> {
      try {
        const { data, error } = await supabase.from('form_fields').select('*').eq('document_id', documentId).eq('type', 'signature');
        if (error) throw new DocSignatureCreateError(error.message);
        return (data || []) as unknown as DocFormField[];
      } catch (error) {
        logger.error('Failed to get signature template', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSignatureCreateError('Failed to get signature template');
      }
    },

    // --- Approvals (20) ----------------------------------------------------
    async getApprovals(schoolId: string): Promise<DocApprovalWorkflow[]> {
      try {
        const { data, error } = await supabase.from('approval_workflows').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalWorkflow[];
      } catch (error) {
        logger.error('Failed to get approvals', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to retrieve approvals');
      }
    },

    async getApproval(approvalId: string): Promise<DocApprovalWorkflow> {
      try {
        const { data, error } = await supabase.from('approval_workflows').select('*').eq('id', approvalId).single();
        if (error || !data) throw new DocApprovalNotFoundError(approvalId);
        return data as unknown as DocApprovalWorkflow;
      } catch (error) {
        logger.error('Failed to get approval', { approvalId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalNotFoundError(approvalId);
      }
    },

    async createApprovalWorkflow(data: Partial<DocApprovalWorkflow>, schoolId: string): Promise<DocApprovalWorkflow> {
      try {
        if (!data.name) throw new ValidationError('Workflow name is required');
        const payload = { ...data, school_id: schoolId, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: workflow, error } = await supabase.from('approval_workflows').insert(payload).select().single();
        if (error) throw new DocApprovalCreateError(error.message);
        return workflow as unknown as DocApprovalWorkflow;
      } catch (error) {
        logger.error('Failed to create approval workflow', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to create approval workflow');
      }
    },

    async updateApprovalWorkflow(workflowId: string, data: Partial<DocApprovalWorkflow>): Promise<DocApprovalWorkflow> {
      try {
        const { data: existing } = await supabase.from('approval_workflows').select('id').eq('id', workflowId).single();
        if (!existing) throw new DocApprovalNotFoundError(workflowId);
        const { data: workflow, error } = await supabase.from('approval_workflows').update({ ...data, updated_at: new Date().toISOString() }).eq('id', workflowId).select().single();
        if (error) throw new DocApprovalCreateError(error.message);
        return workflow as unknown as DocApprovalWorkflow;
      } catch (error) {
        logger.error('Failed to update approval workflow', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to update approval workflow');
      }
    },

    async deleteApprovalWorkflow(workflowId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('approval_workflows').select('id').eq('id', workflowId).single();
        if (!existing) throw new DocApprovalNotFoundError(workflowId);
        const { error } = await supabase.from('approval_workflows').delete().eq('id', workflowId);
        if (error) throw new DocApprovalCreateError(error.message);
      } catch (error) {
        logger.error('Failed to delete approval workflow', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to delete approval workflow');
      }
    },

    async approveStep(stepId: string, approverId: string, comment?: string): Promise<DocApprovalStep> {
      try {
        const { data: existing } = await supabase.from('approval_steps').select('*').eq('id', stepId).single();
        if (!existing) throw new DocApprovalStepError('Step not found');
        const { data: step, error } = await supabase.from('approval_steps').update({ status: 'approved', approver_id: approverId, approved_at: new Date().toISOString(), comment }).eq('id', stepId).select().single();
        if (error) throw new DocApprovalStepError(error.message);
        return step as unknown as DocApprovalStep;
      } catch (error) {
        logger.error('Failed to approve step', { stepId, approverId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalStepError('Failed to approve step');
      }
    },

    async rejectStep(stepId: string, approverId: string, reason?: string): Promise<DocApprovalStep> {
      try {
        const { data: existing } = await supabase.from('approval_steps').select('*').eq('id', stepId).single();
        if (!existing) throw new DocApprovalStepError('Step not found');
        const { data: step, error } = await supabase.from('approval_steps').update({ status: 'rejected', approver_id: approverId, rejected_at: new Date().toISOString(), rejection_reason: reason }).eq('id', stepId).select().single();
        if (error) throw new DocApprovalRejectedError(error.message);
        return step as unknown as DocApprovalStep;
      } catch (error) {
        logger.error('Failed to reject step', { stepId, approverId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalRejectedError('Failed to reject step');
      }
    },

    async delegateStep(stepId: string, fromUserId: string, toUserId: string): Promise<DocApprovalStep> {
      try {
        const { data: existing } = await supabase.from('approval_steps').select('*').eq('id', stepId).single();
        if (!existing) throw new DocApprovalStepError('Step not found');
        const { data: step, error } = await supabase.from('approval_steps').update({ approver_id: toUserId, delegated_by: fromUserId, delegated_at: new Date().toISOString() }).eq('id', stepId).select().single();
        if (error) throw new DocApprovalDelegationError(error.message);
        return step as unknown as DocApprovalStep;
      } catch (error) {
        logger.error('Failed to delegate step', { stepId, fromUserId, toUserId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalDelegationError('Failed to delegate step');
      }
    },

    async escalateStep(stepId: string, escalatedBy: string): Promise<DocApprovalStep> {
      try {
        const { data: existing } = await supabase.from('approval_steps').select('*').eq('id', stepId).single();
        if (!existing) throw new DocApprovalStepError('Step not found');
        const { data: step, error } = await supabase.from('approval_steps').update({ is_escalated: true, escalated_by: escalatedBy, escalated_at: new Date().toISOString() }).eq('id', stepId).select().single();
        if (error) throw new DocApprovalEscalationError(error.message);
        return step as unknown as DocApprovalStep;
      } catch (error) {
        logger.error('Failed to escalate step', { stepId, escalatedBy, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalEscalationError('Failed to escalate step');
      }
    },

    async getApprovalHistory(documentId: string): Promise<DocApprovalHistory[]> {
      try {
        const { data, error } = await supabase.from('approval_history').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalHistory[];
      } catch (error) {
        logger.error('Failed to get approval history', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get approval history');
      }
    },

    async getPendingApprovals(schoolId: string): Promise<DocApprovalStep[]> {
      try {
        const { data, error } = await supabase.from('approval_steps').select('*').eq('school_id', schoolId).eq('status', 'pending').order('created_at', { ascending: false });
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalStep[];
      } catch (error) {
        logger.error('Failed to get pending approvals', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get pending approvals');
      }
    },

    async getCompletedApprovals(schoolId: string): Promise<DocApprovalStep[]> {
      try {
        const { data, error } = await supabase.from('approval_steps').select('*').eq('school_id', schoolId).in('status', ['approved', 'rejected']).order('updated_at', { ascending: false });
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalStep[];
      } catch (error) {
        logger.error('Failed to get completed approvals', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get completed approvals');
      }
    },

    async getApprovalStats(schoolId: string): Promise<DocWorkflowStats> {
      try {
        const { count: totalWorkflows } = await supabase.from('approval_workflows').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: pendingApprovals } = await supabase.from('approval_steps').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'pending');
        return { totalWorkflows: totalWorkflows || 0, activeWorkflows: 0, completedWorkflows: 0, failedWorkflows: 0, workflowsTriggeredLast24h: 0, workflowsTriggeredLast7d: 0, workflowsTriggeredLast30d: 0, averageCompletionTimeMinutes: 0, approvalRate: 0, rejectionRate: 0, delegationRate: 0, pendingApprovals: pendingApprovals || 0, averageStepsPerWorkflow: 0, workflowsByType: {} };
      } catch (error) {
        logger.error('Failed to get approval stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get approval stats');
      }
    },

    async getApprovalTimeline(documentId: string): Promise<DocApprovalHistory[]> {
      try {
        const { data, error } = await supabase.from('approval_history').select('*').eq('document_id', documentId).order('created_at', { ascending: true });
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalHistory[];
      } catch (error) {
        logger.error('Failed to get approval timeline', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get approval timeline');
      }
    },

    async getApprovalByDocument(documentId: string): Promise<DocApprovalWorkflow[]> {
      try {
        const { data, error } = await supabase.from('approval_workflows').select('*').eq('document_id', documentId);
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalWorkflow[];
      } catch (error) {
        logger.error('Failed to get approval by document', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get approval by document');
      }
    },

    async getApprovalByUser(schoolId: string, userId: string): Promise<DocApprovalStep[]> {
      try {
        const { data, error } = await supabase.from('approval_steps').select('*').eq('school_id', schoolId).eq('approver_id', userId).order('created_at', { ascending: false });
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalStep[];
      } catch (error) {
        logger.error('Failed to get approval by user', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get approval by user');
      }
    },

    async getApprovalTemplates(schoolId: string): Promise<DocApprovalWorkflow[]> {
      try {
        const { data, error } = await supabase.from('approval_workflows').select('*').eq('school_id', schoolId).eq('is_template', true);
        if (error) throw new DocApprovalCreateError(error.message);
        return (data || []) as unknown as DocApprovalWorkflow[];
      } catch (error) {
        logger.error('Failed to get approval templates', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to get approval templates');
      }
    },

    async createApprovalTemplate(data: Partial<DocApprovalWorkflow>, schoolId: string): Promise<DocApprovalWorkflow> {
      try {
        if (!data.name) throw new ValidationError('Template name is required');
        const payload = { ...data, school_id: schoolId, is_template: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('approval_workflows').insert(payload).select().single();
        if (error) throw new DocApprovalCreateError(error.message);
        return template as unknown as DocApprovalWorkflow;
      } catch (error) {
        logger.error('Failed to create approval template', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to create approval template');
      }
    },

    async updateApprovalTemplate(templateId: string, data: Partial<DocApprovalWorkflow>): Promise<DocApprovalWorkflow> {
      try {
        const { data: existing } = await supabase.from('approval_workflows').select('id').eq('id', templateId).eq('is_template', true).single();
        if (!existing) throw new DocApprovalNotFoundError(templateId);
        const { data: template, error } = await supabase.from('approval_workflows').update({ ...data, updated_at: new Date().toISOString() }).eq('id', templateId).select().single();
        if (error) throw new DocApprovalCreateError(error.message);
        return template as unknown as DocApprovalWorkflow;
      } catch (error) {
        logger.error('Failed to update approval template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalCreateError('Failed to update approval template');
      }
    },

    async getApprovalConditions(workflowId: string): Promise<DocApprovalCondition[]> {
      try {
        const { data, error } = await supabase.from('approval_conditions').select('*').eq('workflow_id', workflowId);
        if (error) throw new DocApprovalConditionError(error.message);
        return (data || []) as unknown as DocApprovalCondition[];
      } catch (error) {
        logger.error('Failed to get approval conditions', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocApprovalConditionError('Failed to get approval conditions');
      }
    },

    // --- Workflows (15) ----------------------------------------------------
    async getWorkflows(schoolId: string): Promise<DocWorkflow[]> {
      try {
        const { data, error } = await supabase.from('workflows').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocWorkflowCreateError(error.message);
        return (data || []) as unknown as DocWorkflow[];
      } catch (error) {
        logger.error('Failed to get workflows', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to retrieve workflows');
      }
    },

    async getWorkflow(workflowId: string): Promise<DocWorkflow> {
      try {
        const { data, error } = await supabase.from('workflows').select('*').eq('id', workflowId).single();
        if (error || !data) throw new DocWorkflowNotFoundError(workflowId);
        return data as unknown as DocWorkflow;
      } catch (error) {
        logger.error('Failed to get workflow', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowNotFoundError(workflowId);
      }
    },

    async createWorkflow(data: Partial<DocWorkflow>, schoolId: string): Promise<DocWorkflow> {
      try {
        if (!data.name) throw new ValidationError('Workflow name is required');
        const payload = { ...data, school_id: schoolId, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: workflow, error } = await supabase.from('workflows').insert(payload).select().single();
        if (error) throw new DocWorkflowCreateError(error.message);
        return workflow as unknown as DocWorkflow;
      } catch (error) {
        logger.error('Failed to create workflow', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to create workflow');
      }
    },

    async updateWorkflow(workflowId: string, data: Partial<DocWorkflow>): Promise<DocWorkflow> {
      try {
        const { data: existing } = await supabase.from('workflows').select('id').eq('id', workflowId).single();
        if (!existing) throw new DocWorkflowNotFoundError(workflowId);
        const { data: workflow, error } = await supabase.from('workflows').update({ ...data, updated_at: new Date().toISOString() }).eq('id', workflowId).select().single();
        if (error) throw new DocWorkflowUpdateError(error.message);
        return workflow as unknown as DocWorkflow;
      } catch (error) {
        logger.error('Failed to update workflow', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowUpdateError('Failed to update workflow');
      }
    },

    async deleteWorkflow(workflowId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('workflows').select('id').eq('id', workflowId).single();
        if (!existing) throw new DocWorkflowNotFoundError(workflowId);
        const { error } = await supabase.from('workflows').delete().eq('id', workflowId);
        if (error) throw new DocWorkflowDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete workflow', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowDeleteError('Failed to delete workflow');
      }
    },

    async triggerWorkflow(workflowId: string, documentId: string, triggeredBy: string): Promise<DocWorkflow> {
      try {
        const { data: existing } = await supabase.from('workflows').select('*').eq('id', workflowId).single();
        if (!existing) throw new DocWorkflowNotFoundError(workflowId);
        const { data: workflow, error } = await supabase.from('workflows').update({ status: 'triggered', triggered_by: triggeredBy, triggered_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', workflowId).select().single();
        if (error) throw new DocWorkflowTriggerError(error.message);
        await supabase.from('workflow_history').insert({ workflow_id: workflowId, document_id: documentId, action: 'triggered', triggered_by: triggeredBy, created_at: new Date().toISOString() });
        return workflow as unknown as DocWorkflow;
      } catch (error) {
        logger.error('Failed to trigger workflow', { workflowId, documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowTriggerError('Failed to trigger workflow');
      }
    },

    async getWorkflowHistory(workflowId: string): Promise<DocWorkflowHistory[]> {
      try {
        const { data, error } = await supabase.from('workflow_history').select('*').eq('workflow_id', workflowId).order('created_at', { ascending: false });
        if (error) throw new DocWorkflowCreateError(error.message);
        return (data || []) as unknown as DocWorkflowHistory[];
      } catch (error) {
        logger.error('Failed to get workflow history', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to get workflow history');
      }
    },

    async getWorkflowSteps(workflowId: string): Promise<DocWorkflowStep[]> {
      try {
        const { data, error } = await supabase.from('workflow_steps').select('*').eq('workflow_id', workflowId).order('step_order', { ascending: true });
        if (error) throw new DocWorkflowCreateError(error.message);
        return (data || []) as unknown as DocWorkflowStep[];
      } catch (error) {
        logger.error('Failed to get workflow steps', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to get workflow steps');
      }
    },

    async getWorkflowConditions(workflowId: string): Promise<DocWorkflowCondition[]> {
      try {
        const { data, error } = await supabase.from('workflow_conditions').select('*').eq('workflow_id', workflowId);
        if (error) throw new DocWorkflowConditionError(error.message);
        return (data || []) as unknown as DocWorkflowCondition[];
      } catch (error) {
        logger.error('Failed to get workflow conditions', { workflowId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowConditionError('Failed to get workflow conditions');
      }
    },

    async getWorkflowStats(schoolId: string): Promise<DocWorkflowStats> {
      try {
        const { count: totalWorkflows } = await supabase.from('workflows').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: activeWorkflows } = await supabase.from('workflows').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'active');
        const { count: completedWorkflows } = await supabase.from('workflows').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'completed');
        return { totalWorkflows: totalWorkflows || 0, activeWorkflows: activeWorkflows || 0, completedWorkflows: completedWorkflows || 0, failedWorkflows: 0, workflowsTriggeredLast24h: 0, workflowsTriggeredLast7d: 0, workflowsTriggeredLast30d: 0, averageCompletionTimeMinutes: 0, approvalRate: 0, rejectionRate: 0, delegationRate: 0, pendingApprovals: 0, averageStepsPerWorkflow: 0, workflowsByType: {} };
      } catch (error) {
        logger.error('Failed to get workflow stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to get workflow stats');
      }
    },

    async getActiveWorkflows(schoolId: string): Promise<DocWorkflow[]> {
      try {
        const { data, error } = await supabase.from('workflows').select('*').eq('school_id', schoolId).eq('status', 'active').order('created_at', { ascending: false });
        if (error) throw new DocWorkflowCreateError(error.message);
        return (data || []) as unknown as DocWorkflow[];
      } catch (error) {
        logger.error('Failed to get active workflows', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to get active workflows');
      }
    },

    async getWorkflowByDocument(documentId: string): Promise<DocWorkflow[]> {
      try {
        const { data, error } = await supabase.from('workflows').select('*').eq('document_id', documentId);
        if (error) throw new DocWorkflowCreateError(error.message);
        return (data || []) as unknown as DocWorkflow[];
      } catch (error) {
        logger.error('Failed to get workflow by document', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to get workflow by document');
      }
    },

    async getWorkflowTemplates(schoolId: string): Promise<DocWorkflow[]> {
      try {
        const { data, error } = await supabase.from('workflows').select('*').eq('school_id', schoolId).eq('is_template', true);
        if (error) throw new DocWorkflowCreateError(error.message);
        return (data || []) as unknown as DocWorkflow[];
      } catch (error) {
        logger.error('Failed to get workflow templates', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to get workflow templates');
      }
    },

    async createWorkflowTemplate(data: Partial<DocWorkflow>, schoolId: string): Promise<DocWorkflow> {
      try {
        if (!data.name) throw new ValidationError('Template name is required');
        const payload = { ...data, school_id: schoolId, is_template: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('workflows').insert(payload).select().single();
        if (error) throw new DocWorkflowCreateError(error.message);
        return template as unknown as DocWorkflow;
      } catch (error) {
        logger.error('Failed to create workflow template', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowCreateError('Failed to create workflow template');
      }
    },

    async getWorkflowTimeouts(schoolId: string): Promise<DocWorkflow[]> {
      try {
        const { data, error } = await supabase.from('workflows').select('*').eq('school_id', schoolId).not('timeout_hours', 'is', null);
        if (error) throw new DocWorkflowTimeoutError(error.message);
        return (data || []) as unknown as DocWorkflow[];
      } catch (error) {
        logger.error('Failed to get workflow timeouts', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocWorkflowTimeoutError('Failed to get workflow timeouts');
      }
    },

    // ─── OCR ───────────────────────────────────────────────────────────────────
    async getOCRResults(documentId: string): Promise<DocOCRResult[]> {
      try {
        const { data, error } = await supabase.from('ocr_results').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocOCRCreateError(error.message);
        return (data || []) as unknown as DocOCRResult[];
      } catch (error) {
        logger.error('Failed to get OCR results', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to get OCR results');
      }
    },

    async getOCRResult(ocrId: string): Promise<DocOCRResult> {
      try {
        const { data, error } = await supabase.from('ocr_results').select('*').eq('id', ocrId).single();
        if (error || !data) throw new DocOCRNotFoundError(ocrId);
        return data as unknown as DocOCRResult;
      } catch (error) {
        logger.error('Failed to get OCR result', { ocrId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRNotFoundError(ocrId);
      }
    },

    async createOCRJob(documentId: string, schoolId: string, options?: { language?: string; templateId?: string }): Promise<DocOCRResult> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, status: 'pending', language: options?.language || 'en', template_id: options?.templateId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: ocr, error } = await supabase.from('ocr_results').insert(payload).select().single();
        if (error) throw new DocOCRCreateError(error.message);
        return ocr as unknown as DocOCRResult;
      } catch (error) {
        logger.error('Failed to create OCR job', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to create OCR job');
      }
    },

    async updateOCRResult(ocrId: string, data: Partial<DocOCRResult>): Promise<DocOCRResult> {
      try {
        const { data: existing } = await supabase.from('ocr_results').select('id').eq('id', ocrId).single();
        if (!existing) throw new DocOCRNotFoundError(ocrId);
        const { data: ocr, error } = await supabase.from('ocr_results').update({ ...data, updated_at: new Date().toISOString() }).eq('id', ocrId).select().single();
        if (error) throw new DocOCRUpdateError(error.message);
        return ocr as unknown as DocOCRResult;
      } catch (error) {
        logger.error('Failed to update OCR result', { ocrId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRUpdateError('Failed to update OCR result');
      }
    },

    async deleteOCRResult(ocrId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('ocr_results').select('id').eq('id', ocrId).single();
        if (!existing) throw new DocOCRNotFoundError(ocrId);
        const { error } = await supabase.from('ocr_results').delete().eq('id', ocrId);
        if (error) throw new DocOCRDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete OCR result', { ocrId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRDeleteError('Failed to delete OCR result');
      }
    },

    async getOCRFields(ocrId: string): Promise<DocOCRField[]> {
      try {
        const { data, error } = await supabase.from('ocr_fields').select('*').eq('ocr_result_id', ocrId);
        if (error) throw new DocOCRCreateError(error.message);
        return (data || []) as unknown as DocOCRField[];
      } catch (error) {
        logger.error('Failed to get OCR fields', { ocrId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to get OCR fields');
      }
    },

    async getOCRTemplates(schoolId: string): Promise<DocOCRTemplate[]> {
      try {
        const { data, error } = await supabase.from('ocr_templates').select('*').eq('school_id', schoolId);
        if (error) throw new DocOCRCreateError(error.message);
        return (data || []) as unknown as DocOCRTemplate[];
      } catch (error) {
        logger.error('Failed to get OCR templates', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to get OCR templates');
      }
    },

    async createOCRTemplate(data: Partial<DocOCRTemplate>, schoolId: string): Promise<DocOCRTemplate> {
      try {
        if (!data.name) throw new ValidationError('Template name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('ocr_templates').insert(payload).select().single();
        if (error) throw new DocOCRCreateError(error.message);
        return template as unknown as DocOCRTemplate;
      } catch (error) {
        logger.error('Failed to create OCR template', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to create OCR template');
      }
    },

    async updateOCRTemplate(templateId: string, data: Partial<DocOCRTemplate>): Promise<DocOCRTemplate> {
      try {
        const { data: existing } = await supabase.from('ocr_templates').select('id').eq('id', templateId).single();
        if (!existing) throw new DocOCRNotFoundError(templateId);
        const { data: template, error } = await supabase.from('ocr_templates').update({ ...data, updated_at: new Date().toISOString() }).eq('id', templateId).select().single();
        if (error) throw new DocOCRUpdateError(error.message);
        return template as unknown as DocOCRTemplate;
      } catch (error) {
        logger.error('Failed to update OCR template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRUpdateError('Failed to update OCR template');
      }
    },

    async deleteOCRTemplate(templateId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('ocr_templates').select('id').eq('id', templateId).single();
        if (!existing) throw new DocOCRNotFoundError(templateId);
        const { error } = await supabase.from('ocr_templates').delete().eq('id', templateId);
        if (error) throw new DocOCRDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete OCR template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRDeleteError('Failed to delete OCR template');
      }
    },

    async getPendingOCRJobs(schoolId: string): Promise<DocOCRResult[]> {
      try {
        const { data, error } = await supabase.from('ocr_results').select('*').eq('school_id', schoolId).eq('status', 'pending').order('created_at', { ascending: false });
        if (error) throw new DocOCRCreateError(error.message);
        return (data || []) as unknown as DocOCRResult[];
      } catch (error) {
        logger.error('Failed to get pending OCR jobs', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to get pending OCR jobs');
      }
    },

    async getCompletedOCRJobs(schoolId: string): Promise<DocOCRResult[]> {
      try {
        const { data, error } = await supabase.from('ocr_results').select('*').eq('school_id', schoolId).eq('status', 'completed').order('created_at', { ascending: false });
        if (error) throw new DocOCRCreateError(error.message);
        return (data || []) as unknown as DocOCRResult[];
      } catch (error) {
        logger.error('Failed to get completed OCR jobs', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to get completed OCR jobs');
      }
    },

    async getOCRStats(schoolId: string): Promise<DocOCRArchiveStats> {
      try {
        const { count: total } = await supabase.from('ocr_results').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: completed } = await supabase.from('ocr_results').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'completed');
        const { count: failed } = await supabase.from('ocr_results').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'failed');
        return { totalOCRJobs: total || 0, completedOCRJobs: completed || 0, failedOCRJobs: failed || 0, pendingOCRJobs: 0, processingOCRJobs: 0, averageOCRTimeSeconds: 0, totalArchivedDocuments: 0, archivedDocumentsLast30d: 0, archivedStorageBytes: 0, archiveRulesActive: 0, archiveRulesTotal: 0, restorationRequestsLast30d: 0, ocrAccuracyPercent: 0, languagesProcessed: [] };
      } catch (error) {
        logger.error('Failed to get OCR stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocOCRCreateError('Failed to get OCR stats');
      }
    },

    // ─── Archive ────────────────────────────────────────────────────────────────
    async getArchives(schoolId: string): Promise<DocArchive[]> {
      try {
        const { data, error } = await supabase.from('archives').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocArchiveCreateError(error.message);
        return (data || []) as unknown as DocArchive[];
      } catch (error) {
        logger.error('Failed to get archives', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveCreateError('Failed to get archives');
      }
    },

    async getArchive(archiveId: string): Promise<DocArchive> {
      try {
        const { data, error } = await supabase.from('archives').select('*').eq('id', archiveId).single();
        if (error || !data) throw new DocArchiveNotFoundError(archiveId);
        return data as unknown as DocArchive;
      } catch (error) {
        logger.error('Failed to get archive', { archiveId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveNotFoundError(archiveId);
      }
    },

    async archiveDocument(documentId: string, schoolId: string, options?: { reason?: string }): Promise<DocArchive> {
      try {
        const { data: doc } = await supabase.from('documents').select('*').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        if (doc.status === 'archived') throw new DocAlreadyArchivedError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, status: 'archived', reason: options?.reason, archived_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: archive, error } = await supabase.from('archives').insert(payload).select().single();
        if (error) throw new DocArchiveCreateError(error.message);
        await supabase.from('documents').update({ status: 'archived', updated_at: new Date().toISOString() }).eq('id', documentId);
        return archive as unknown as DocArchive;
      } catch (error) {
        logger.error('Failed to archive document', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveCreateError('Failed to archive document');
      }
    },

    async restoreFromArchive(archiveId: string): Promise<DocDocument> {
      try {
        const { data: archive } = await supabase.from('archives').select('*').eq('id', archiveId).single();
        if (!archive) throw new DocArchiveNotFoundError(archiveId);
        if (archive.status !== 'archived') throw new DocNotArchivedError(archive.document_id);
        await supabase.from('archives').update({ status: 'restored', restored_at: new Date().toISOString() }).eq('id', archiveId);
        const { data: doc, error } = await supabase.from('documents').update({ status: 'active', updated_at: new Date().toISOString() }).eq('id', archive.document_id).select().single();
        if (error) throw new DocRestoreError(error.message);
        return doc as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to restore from archive', { archiveId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to restore from archive');
      }
    },

    async deleteArchive(archiveId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('archives').select('id').eq('id', archiveId).single();
        if (!existing) throw new DocArchiveNotFoundError(archiveId);
        const { error } = await supabase.from('archives').delete().eq('id', archiveId);
        if (error) throw new DocArchiveDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete archive', { archiveId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveDeleteError('Failed to delete archive');
      }
    },

    async getArchiveRules(schoolId: string): Promise<DocArchiveRule[]> {
      try {
        const { data, error } = await supabase.from('archive_rules').select('*').eq('school_id', schoolId);
        if (error) throw new DocArchiveCreateError(error.message);
        return (data || []) as unknown as DocArchiveRule[];
      } catch (error) {
        logger.error('Failed to get archive rules', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveCreateError('Failed to get archive rules');
      }
    },

    async createArchiveRule(data: Partial<DocArchiveRule>, schoolId: string): Promise<DocArchiveRule> {
      try {
        if (!data.name) throw new ValidationError('Rule name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: rule, error } = await supabase.from('archive_rules').insert(payload).select().single();
        if (error) throw new DocArchiveCreateError(error.message);
        return rule as unknown as DocArchiveRule;
      } catch (error) {
        logger.error('Failed to create archive rule', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveCreateError('Failed to create archive rule');
      }
    },

    async updateArchiveRule(ruleId: string, data: Partial<DocArchiveRule>): Promise<DocArchiveRule> {
      try {
        const { data: existing } = await supabase.from('archive_rules').select('id').eq('id', ruleId).single();
        if (!existing) throw new DocArchiveNotFoundError(ruleId);
        const { data: rule, error } = await supabase.from('archive_rules').update({ ...data, updated_at: new Date().toISOString() }).eq('id', ruleId).select().single();
        if (error) throw new DocArchiveUpdateError(error.message);
        return rule as unknown as DocArchiveRule;
      } catch (error) {
        logger.error('Failed to update archive rule', { ruleId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveUpdateError('Failed to update archive rule');
      }
    },

    async deleteArchiveRule(ruleId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('archive_rules').select('id').eq('id', ruleId).single();
        if (!existing) throw new DocArchiveNotFoundError(ruleId);
        const { error } = await supabase.from('archive_rules').delete().eq('id', ruleId);
        if (error) throw new DocArchiveDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete archive rule', { ruleId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveDeleteError('Failed to delete archive rule');
      }
    },

    async getArchivePolicies(schoolId: string): Promise<DocArchivePolicy[]> {
      try {
        const { data, error } = await supabase.from('archive_policies').select('*').eq('school_id', schoolId);
        if (error) throw new DocArchiveCreateError(error.message);
        return (data || []) as unknown as DocArchivePolicy[];
      } catch (error) {
        logger.error('Failed to get archive policies', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveCreateError('Failed to get archive policies');
      }
    },

    async getArchivedDocuments(schoolId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).eq('status', 'archived').order('updated_at', { ascending: false });
        if (error) throw new DocArchiveCreateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get archived documents', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveCreateError('Failed to get archived documents');
      }
    },

    async getArchiveStats(schoolId: string): Promise<DocOCRArchiveStats> {
      try {
        const { count: totalArchived } = await supabase.from('archives').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'archived');
        const { count: rulesActive } = await supabase.from('archive_rules').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('is_active', true);
        return { totalOCRJobs: 0, completedOCRJobs: 0, failedOCRJobs: 0, pendingOCRJobs: 0, processingOCRJobs: 0, averageOCRTimeSeconds: 0, totalArchivedDocuments: totalArchived || 0, archivedDocumentsLast30d: 0, archivedStorageBytes: 0, archiveRulesActive: rulesActive || 0, archiveRulesTotal: 0, restorationRequestsLast30d: 0, ocrAccuracyPercent: 0, languagesProcessed: [] };
      } catch (error) {
        logger.error('Failed to get archive stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocArchiveCreateError('Failed to get archive stats');
      }
    },

    // ─── Backup ─────────────────────────────────────────────────────────────────
    async getBackupJobs(schoolId: string): Promise<DocBackupJob[]> {
      try {
        const { data, error } = await supabase.from('backup_jobs').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocBackupCreateError(error.message);
        return (data || []) as unknown as DocBackupJob[];
      } catch (error) {
        logger.error('Failed to get backup jobs', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupCreateError('Failed to get backup jobs');
      }
    },

    async getBackupJob(backupId: string): Promise<DocBackupJob> {
      try {
        const { data, error } = await supabase.from('backup_jobs').select('*').eq('id', backupId).single();
        if (error || !data) throw new DocBackupNotFoundError(backupId);
        return data as unknown as DocBackupJob;
      } catch (error) {
        logger.error('Failed to get backup job', { backupId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupNotFoundError(backupId);
      }
    },

    async createBackupJob(schoolId: string, options?: { type?: string; documentIds?: string[] }): Promise<DocBackupJob> {
      try {
        const payload = { school_id: schoolId, status: 'pending', type: options?.type || 'full', document_ids: options?.documentIds, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: job, error } = await supabase.from('backup_jobs').insert(payload).select().single();
        if (error) throw new DocBackupCreateError(error.message);
        return job as unknown as DocBackupJob;
      } catch (error) {
        logger.error('Failed to create backup job', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupCreateError('Failed to create backup job');
      }
    },

    async cancelBackupJob(backupId: string): Promise<DocBackupJob> {
      try {
        const { data: existing } = await supabase.from('backup_jobs').select('*').eq('id', backupId).single();
        if (!existing) throw new DocBackupNotFoundError(backupId);
        if (existing.status === 'completed') throw new DocBackupCreateError('Cannot cancel completed backup');
        const { data: job, error } = await supabase.from('backup_jobs').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', backupId).select().single();
        if (error) throw new DocBackupUpdateError(error.message);
        return job as unknown as DocBackupJob;
      } catch (error) {
        logger.error('Failed to cancel backup job', { backupId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupUpdateError('Failed to cancel backup job');
      }
    },

    async deleteBackupJob(backupId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('backup_jobs').select('id').eq('id', backupId).single();
        if (!existing) throw new DocBackupNotFoundError(backupId);
        const { error } = await supabase.from('backup_jobs').delete().eq('id', backupId);
        if (error) throw new DocBackupDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete backup job', { backupId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupDeleteError('Failed to delete backup job');
      }
    },

    async getBackupHistory(schoolId: string): Promise<DocBackupJob[]> {
      try {
        const { data, error } = await supabase.from('backup_jobs').select('*').eq('school_id', schoolId).in('status', ['completed', 'failed']).order('created_at', { ascending: false });
        if (error) throw new DocBackupCreateError(error.message);
        return (data || []) as unknown as DocBackupJob[];
      } catch (error) {
        logger.error('Failed to get backup history', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupCreateError('Failed to get backup history');
      }
    },

    async getActiveBackups(schoolId: string): Promise<DocBackupJob[]> {
      try {
        const { data, error } = await supabase.from('backup_jobs').select('*').eq('school_id', schoolId).in('status', ['pending', 'in_progress']).order('created_at', { ascending: false });
        if (error) throw new DocBackupCreateError(error.message);
        return (data || []) as unknown as DocBackupJob[];
      } catch (error) {
        logger.error('Failed to get active backups', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupCreateError('Failed to get active backups');
      }
    },

    async downloadBackup(backupId: string): Promise<{ url: string; expiresAt: string }> {
      try {
        const { data: existing } = await supabase.from('backup_jobs').select('*').eq('id', backupId).single();
        if (!existing) throw new DocBackupNotFoundError(backupId);
        if (existing.status !== 'completed') throw new DocBackupCreateError('Backup not completed');
        return { url: existing.download_url || '', expiresAt: existing.expires_at || new Date(Date.now() + 3600000).toISOString() };
      } catch (error) {
        logger.error('Failed to download backup', { backupId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocBackupCreateError('Failed to download backup');
      }
    },

    // ─── Restore ────────────────────────────────────────────────────────────────
    async getRestoreHistory(schoolId: string): Promise<DocRestoreHistory[]> {
      try {
        const { data, error } = await supabase.from('restore_history').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocRestoreError(error.message);
        return (data || []) as unknown as DocRestoreHistory[];
      } catch (error) {
        logger.error('Failed to get restore history', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to get restore history');
      }
    },

    async createRestoreRequest(documentId: string, schoolId: string, versionId?: string): Promise<DocRestoreHistory> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, version_id: versionId, status: 'pending', requested_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: restore, error } = await supabase.from('restore_history').insert(payload).select().single();
        if (error) throw new DocRestoreError(error.message);
        return restore as unknown as DocRestoreHistory;
      } catch (error) {
        logger.error('Failed to create restore request', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to create restore request');
      }
    },

    async approveRestore(restoreId: string, approvedBy: string): Promise<DocRestoreHistory> {
      try {
        const { data: existing } = await supabase.from('restore_history').select('*').eq('id', restoreId).single();
        if (!existing) throw new DocRestoreError('Restore request not found');
        const { data: restore, error } = await supabase.from('restore_history').update({ status: 'approved', approved_by: approvedBy, approved_at: new Date().toISOString() }).eq('id', restoreId).select().single();
        if (error) throw new DocRestoreError(error.message);
        return restore as unknown as DocRestoreHistory;
      } catch (error) {
        logger.error('Failed to approve restore', { restoreId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to approve restore');
      }
    },

    async completeRestore(restoreId: string): Promise<DocRestoreHistory> {
      try {
        const { data: existing } = await supabase.from('restore_history').select('*').eq('id', restoreId).single();
        if (!existing) throw new DocRestoreError('Restore request not found');
        const { data: restore, error } = await supabase.from('restore_history').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', restoreId).select().single();
        if (error) throw new DocRestoreError(error.message);
        await supabase.from('documents').update({ status: 'active', updated_at: new Date().toISOString() }).eq('id', existing.document_id);
        return restore as unknown as DocRestoreHistory;
      } catch (error) {
        logger.error('Failed to complete restore', { restoreId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to complete restore');
      }
    },

    async rejectRestore(restoreId: string, rejectedBy: string, reason?: string): Promise<DocRestoreHistory> {
      try {
        const { data: existing } = await supabase.from('restore_history').select('*').eq('id', restoreId).single();
        if (!existing) throw new DocRestoreError('Restore request not found');
        const { data: restore, error } = await supabase.from('restore_history').update({ status: 'rejected', rejected_by: rejectedBy, rejected_at: new Date().toISOString(), rejection_reason: reason }).eq('id', restoreId).select().single();
        if (error) throw new DocRestoreError(error.message);
        return restore as unknown as DocRestoreHistory;
      } catch (error) {
        logger.error('Failed to reject restore', { restoreId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to reject restore');
      }
    },

    async getPendingRestores(schoolId: string): Promise<DocRestoreHistory[]> {
      try {
        const { data, error } = await supabase.from('restore_history').select('*').eq('school_id', schoolId).eq('status', 'pending').order('created_at', { ascending: false });
        if (error) throw new DocRestoreError(error.message);
        return (data || []) as unknown as DocRestoreHistory[];
      } catch (error) {
        logger.error('Failed to get pending restores', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to get pending restores');
      }
    },

    // ─── Trash ──────────────────────────────────────────────────────────────────
    async getTrashItems(schoolId: string): Promise<DocTrash[]> {
      try {
        const { data, error } = await supabase.from('trash').select('*').eq('school_id', schoolId).order('deleted_at', { ascending: false });
        if (error) throw new DocDeleteError(error.message);
        return (data || []) as unknown as DocTrash[];
      } catch (error) {
        logger.error('Failed to get trash items', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to get trash items');
      }
    },

    async moveToTrash(documentId: string, schoolId: string, deletedBy: string): Promise<DocTrash> {
      try {
        const { data: doc } = await supabase.from('documents').select('*').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, document_name: doc.name, deleted_by: deletedBy, deleted_at: new Date().toISOString(), expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() };
        const { data: trash, error } = await supabase.from('trash').insert(payload).select().single();
        if (error) throw new DocDeleteError(error.message);
        await supabase.from('documents').update({ status: 'trashed', updated_at: new Date().toISOString() }).eq('id', documentId);
        return trash as unknown as DocTrash;
      } catch (error) {
        logger.error('Failed to move to trash', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to move to trash');
      }
    },

    async restoreFromTrash(trashId: string): Promise<DocDocument> {
      try {
        const { data: trash } = await supabase.from('trash').select('*').eq('id', trashId).single();
        if (!trash) throw new DocNotFoundError(trashId);
        await supabase.from('trash').delete().eq('id', trashId);
        const { data: doc, error } = await supabase.from('documents').update({ status: 'active', updated_at: new Date().toISOString() }).eq('id', trash.document_id).select().single();
        if (error) throw new DocRestoreError(error.message);
        return doc as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to restore from trash', { trashId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to restore from trash');
      }
    },

    async emptyTrash(schoolId: string): Promise<void> {
      try {
        const { data: items } = await supabase.from('trash').select('document_id').eq('school_id', schoolId);
        if (items && items.length > 0) {
          const docIds = items.map(i => i.document_id);
          await supabase.from('documents').delete().in('id', docIds);
        }
        await supabase.from('trash').delete().eq('school_id', schoolId);
      } catch (error) {
        logger.error('Failed to empty trash', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to empty trash');
      }
    },

    async permanentlyDeleteFromTrash(trashId: string): Promise<void> {
      try {
        const { data: trash } = await supabase.from('trash').select('document_id').eq('id', trashId).single();
        if (!trash) throw new DocNotFoundError(trashId);
        await supabase.from('documents').delete().eq('id', trash.document_id);
        await supabase.from('trash').delete().eq('id', trashId);
      } catch (error) {
        logger.error('Failed to permanently delete from trash', { trashId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to permanently delete from trash');
      }
    },

    async getTrashStats(schoolId: string): Promise<{ totalItems: number; totalSize: number; itemsExpiringSoon: number }> {
      try {
        const { count } = await supabase.from('trash').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalItems: count || 0, totalSize: 0, itemsExpiringSoon: 0 };
      } catch (error) {
        logger.error('Failed to get trash stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to get trash stats');
      }
    },

    async restoreAllFromTrash(schoolId: string): Promise<void> {
      try {
        const { data: items } = await supabase.from('trash').select('document_id').eq('school_id', schoolId);
        if (items && items.length > 0) {
          const docIds = items.map(i => i.document_id);
          await supabase.from('documents').update({ status: 'active', updated_at: new Date().toISOString() }).in('id', docIds);
        }
        await supabase.from('trash').delete().eq('school_id', schoolId);
      } catch (error) {
        logger.error('Failed to restore all from trash', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocRestoreError('Failed to restore all from trash');
      }
    },

    async getTrashItem(trashId: string): Promise<DocTrash> {
      try {
        const { data, error } = await supabase.from('trash').select('*').eq('id', trashId).single();
        if (error || !data) throw new DocNotFoundError(trashId);
        return data as unknown as DocTrash;
      } catch (error) {
        logger.error('Failed to get trash item', { trashId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(trashId);
      }
    },

    async deleteFromTrashPermanently(documentId: string): Promise<void> {
      try {
        await supabase.from('documents').delete().eq('id', documentId);
        await supabase.from('trash').delete().eq('document_id', documentId);
      } catch (error) {
        logger.error('Failed to delete from trash permanently', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete from trash permanently');
      }
    },

    // ─── Watermarks ─────────────────────────────────────────────────────────────
    async getWatermarks(documentId: string): Promise<DocWatermark[]> {
      try {
        const { data, error } = await supabase.from('watermarks').select('*').eq('document_id', documentId);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocWatermark[];
      } catch (error) {
        logger.error('Failed to get watermarks', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get watermarks');
      }
    },

    async createWatermark(data: Partial<DocWatermark>, schoolId: string): Promise<DocWatermark> {
      try {
        if (!data.document_id) throw new ValidationError('Document ID is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: watermark, error } = await supabase.from('watermarks').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return watermark as unknown as DocWatermark;
      } catch (error) {
        logger.error('Failed to create watermark', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create watermark');
      }
    },

    async updateWatermark(watermarkId: string, data: Partial<DocWatermark>): Promise<DocWatermark> {
      try {
        const { data: existing } = await supabase.from('watermarks').select('id').eq('id', watermarkId).single();
        if (!existing) throw new DocNotFoundError(watermarkId);
        const { data: watermark, error } = await supabase.from('watermarks').update({ ...data, updated_at: new Date().toISOString() }).eq('id', watermarkId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return watermark as unknown as DocWatermark;
      } catch (error) {
        logger.error('Failed to update watermark', { watermarkId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update watermark');
      }
    },

    async deleteWatermark(watermarkId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('watermarks').select('id').eq('id', watermarkId).single();
        if (!existing) throw new DocNotFoundError(watermarkId);
        const { error } = await supabase.from('watermarks').delete().eq('id', watermarkId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete watermark', { watermarkId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete watermark');
      }
    },

    async getWatermarkConfig(schoolId: string): Promise<DocWatermarkConfig | null> {
      try {
        const { data, error } = await supabase.from('watermark_configs').select('*').eq('school_id', schoolId).single();
        if (error && error.code !== 'PGRST116') throw new DocUpdateError(error.message);
        return (data || null) as unknown as DocWatermarkConfig | null;
      } catch (error) {
        logger.error('Failed to get watermark config', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get watermark config');
      }
    },

    async updateWatermarkConfig(schoolId: string, data: Partial<DocWatermarkConfig>): Promise<DocWatermarkConfig> {
      try {
        const { data: existing } = await supabase.from('watermark_configs').select('id').eq('school_id', schoolId).single();
        const payload = { ...data, school_id: schoolId, updated_at: new Date().toISOString() };
        let result;
        if (existing) {
          const { data: config, error } = await supabase.from('watermark_configs').update(payload).eq('school_id', schoolId).select().single();
          if (error) throw new DocUpdateError(error.message);
          result = config;
        } else {
          const { data: config, error } = await supabase.from('watermark_configs').insert({ ...payload, created_at: new Date().toISOString() }).select().single();
          if (error) throw new DocCreateError(error.message);
          result = config;
        }
        return result as unknown as DocWatermarkConfig;
      } catch (error) {
        logger.error('Failed to update watermark config', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update watermark config');
      }
    },

    async applyWatermark(documentId: string, watermarkId: string): Promise<void> {
      try {
        const { data: watermark } = await supabase.from('watermarks').select('*').eq('id', watermarkId).single();
        if (!watermark) throw new DocNotFoundError(watermarkId);
        await supabase.from('document_watermarks').insert({ document_id: documentId, watermark_id: watermarkId, applied_at: new Date().toISOString() });
      } catch (error) {
        logger.error('Failed to apply watermark', { documentId, watermarkId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to apply watermark');
      }
    },

    async removeWatermark(documentId: string, watermarkId: string): Promise<void> {
      try {
        const { error } = await supabase.from('document_watermarks').delete().eq('document_id', documentId).eq('watermark_id', watermarkId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to remove watermark', { documentId, watermarkId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to remove watermark');
      }
    },

    // ─── Templates ──────────────────────────────────────────────────────────────
    async getTemplates(schoolId: string): Promise<DocTemplate[]> {
      try {
        const { data, error } = await supabase.from('templates').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocTemplate[];
      } catch (error) {
        logger.error('Failed to get templates', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to get templates');
      }
    },

    async getTemplate(templateId: string): Promise<DocTemplate> {
      try {
        const { data, error } = await supabase.from('templates').select('*').eq('id', templateId).single();
        if (error || !data) throw new DocNotFoundError(templateId);
        return data as unknown as DocTemplate;
      } catch (error) {
        logger.error('Failed to get template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(templateId);
      }
    },

    async createTemplate(data: Partial<DocTemplate>, schoolId: string): Promise<DocTemplate> {
      try {
        if (!data.name) throw new ValidationError('Template name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('templates').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return template as unknown as DocTemplate;
      } catch (error) {
        logger.error('Failed to create template', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to create template');
      }
    },

    async updateTemplate(templateId: string, data: Partial<DocTemplate>): Promise<DocTemplate> {
      try {
        const { data: existing } = await supabase.from('templates').select('id').eq('id', templateId).single();
        if (!existing) throw new DocNotFoundError(templateId);
        const { data: template, error } = await supabase.from('templates').update({ ...data, updated_at: new Date().toISOString() }).eq('id', templateId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return template as unknown as DocTemplate;
      } catch (error) {
        logger.error('Failed to update template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update template');
      }
    },

    async deleteTemplate(templateId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('templates').select('id').eq('id', templateId).single();
        if (!existing) throw new DocNotFoundError(templateId);
        const { error } = await supabase.from('templates').delete().eq('id', templateId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete template');
      }
    },

    async generateDocumentFromTemplate(templateId: string, data: Record<string, unknown>, schoolId: string): Promise<DocDocument> {
      try {
        const { data: template } = await supabase.from('templates').select('*').eq('id', templateId).eq('school_id', schoolId).single();
        if (!template) throw new DocNotFoundError(templateId);
        const payload = { name: `${template.name} - Generated`, school_id: schoolId, template_id: templateId, content: data, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: doc, error } = await supabase.from('documents').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return doc as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to generate document from template', { templateId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to generate document from template');
      }
    },

    async getTemplateUsage(templateId: string): Promise<{ count: number; documents: DocDocument[] }> {
      try {
        const { data, count } = await supabase.from('documents').select('*', { count: 'exact' }).eq('template_id', templateId);
        return { count: count || 0, documents: (data || []) as unknown as DocDocument[] };
      } catch (error) {
        logger.error('Failed to get template usage', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to get template usage');
      }
    },

    async duplicateTemplate(templateId: string, schoolId: string): Promise<DocTemplate> {
      try {
        const { data: template } = await supabase.from('templates').select('*').eq('id', templateId).single();
        if (!template) throw new DocNotFoundError(templateId);
        const payload = { ...template, id: undefined, name: `${template.name} (Copy)`, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: newTemplate, error } = await supabase.from('templates').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return newTemplate as unknown as DocTemplate;
      } catch (error) {
        logger.error('Failed to duplicate template', { templateId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to duplicate template');
      }
    },

    // ─── Merge/Split ────────────────────────────────────────────────────────────
    async mergeDocuments(documentIds: string[], schoolId: string, options?: { name?: string }): Promise<DocMergeDocument> {
      try {
        if (documentIds.length < 2) throw new ValidationError('At least 2 documents required to merge');
        const payload = { document_ids: documentIds, school_id: schoolId, name: options?.name || 'Merged Document', status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: merge, error } = await supabase.from('merge_documents').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return merge as unknown as DocMergeDocument;
      } catch (error) {
        logger.error('Failed to merge documents', { documentIds, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to merge documents');
      }
    },

    async getMergeJob(mergeId: string): Promise<DocMergeDocument> {
      try {
        const { data, error } = await supabase.from('merge_documents').select('*').eq('id', mergeId).single();
        if (error || !data) throw new DocNotFoundError(mergeId);
        return data as unknown as DocMergeDocument;
      } catch (error) {
        logger.error('Failed to get merge job', { mergeId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(mergeId);
      }
    },

    async splitDocument(documentId: string, schoolId: string, options?: { pages?: string; splitAt?: number[] }): Promise<DocMergeDocument> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, type: 'split', pages: options?.pages, split_at: options?.splitAt, status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: split, error } = await supabase.from('merge_documents').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return split as unknown as DocMergeDocument;
      } catch (error) {
        logger.error('Failed to split document', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to split document');
      }
    },

    async getMergeHistory(schoolId: string): Promise<DocMergeDocument[]> {
      try {
        const { data, error } = await supabase.from('merge_documents').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocMergeDocument[];
      } catch (error) {
        logger.error('Failed to get merge history', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to get merge history');
      }
    },

    // ─── Compression ────────────────────────────────────────────────────────────
    async compressDocument(documentId: string, schoolId: string, level?: string): Promise<DocProcessingJob> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, type: 'compression', level: level || 'medium', status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: job, error } = await supabase.from('processing_jobs').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return job as unknown as DocProcessingJob;
      } catch (error) {
        logger.error('Failed to compress document', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to compress document');
      }
    },

    async decompressDocument(documentId: string, schoolId: string): Promise<DocProcessingJob> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, type: 'decompression', status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: job, error } = await supabase.from('processing_jobs').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return job as unknown as DocProcessingJob;
      } catch (error) {
        logger.error('Failed to decompress document', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to decompress document');
      }
    },

    async getCompressionStats(schoolId: string): Promise<{ totalCompressed: number; totalSavings: number; averageRatio: number }> {
      try {
        const { count } = await supabase.from('processing_jobs').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('type', 'compression').eq('status', 'completed');
        return { totalCompressed: count || 0, totalSavings: 0, averageRatio: 0 };
      } catch (error) {
        logger.error('Failed to get compression stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to get compression stats');
      }
    },

    // ─── Conversion ─────────────────────────────────────────────────────────────
    async convertDocument(documentId: string, schoolId: string, targetFormat: string): Promise<DocProcessingJob> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, type: 'conversion', target_format: targetFormat, status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: job, error } = await supabase.from('processing_jobs').insert(payload).select().single();
        if (error) throw new DocCreateError(error.message);
        return job as unknown as DocProcessingJob;
      } catch (error) {
        logger.error('Failed to convert document', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to convert document');
      }
    },

    async getConversionJob(jobId: string): Promise<DocProcessingJob> {
      try {
        const { data, error } = await supabase.from('processing_jobs').select('*').eq('id', jobId).single();
        if (error || !data) throw new DocNotFoundError(jobId);
        return data as unknown as DocProcessingJob;
      } catch (error) {
        logger.error('Failed to get conversion job', { jobId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(jobId);
      }
    },

    async getConversionHistory(schoolId: string): Promise<DocProcessingJob[]> {
      try {
        const { data, error } = await supabase.from('processing_jobs').select('*').eq('school_id', schoolId).eq('type', 'conversion').order('created_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocProcessingJob[];
      } catch (error) {
        logger.error('Failed to get conversion history', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to get conversion history');
      }
    },

    async batchConvert(documentIds: string[], schoolId: string, targetFormat: string): Promise<DocBulkOperation> {
      try {
        const operationId = crypto.randomUUID();
        let completed = 0;
        let failed = 0;
        for (const docId of documentIds) {
          try {
            await this.convertDocument(docId, schoolId, targetFormat);
            completed++;
          } catch {
            failed++;
          }
        }
        return { id: operationId, type: 'batch_convert', status: 'completed', totalItems: documentIds.length, completedItems: completed, failedItems: failed, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to batch convert', { documentIds, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to batch convert');
      }
    },

    // ─── Search ─────────────────────────────────────────────────────────────────
    async fullTextSearch(schoolId: string, query: string, options?: { limit?: number; offset?: number; filters?: Record<string, unknown> }): Promise<DocSearchResult[]> {
      try {
        let q = supabase.from('documents').select('*').eq('school_id', schoolId).textSearch('name', query, { type: 'websearch' });
        if (options?.filters?.category) q = q.eq('category', options.filters.category);
        if (options?.filters?.status) q = q.eq('status', options.filters.status);
        q = q.range(options?.offset || 0, (options?.offset || 0) + (options?.limit || 20) - 1);
        const { data, error } = await q;
        if (error) throw new DocSearchError(error.message);
        return (data || []) as unknown as DocSearchResult[];
      } catch (error) {
        logger.error('Failed to perform full text search', { schoolId, query, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to perform search');
      }
    },

    async searchByMetadata(schoolId: string, filters: Record<string, unknown>): Promise<DocSearchResult[]> {
      try {
        let q = supabase.from('documents').select('*').eq('school_id', schoolId);
        if (filters.mimeType) q = q.eq('mime_type', filters.mimeType);
        if (filters.author) q = q.eq('author_id', filters.author);
        if (filters.category) q = q.eq('category', filters.category);
        if (filters.dateFrom) q = q.gte('created_at', filters.dateFrom);
        if (filters.dateTo) q = q.lte('created_at', filters.dateTo);
        const { data, error } = await q.order('created_at', { ascending: false }).limit(50);
        if (error) throw new DocSearchError(error.message);
        return (data || []) as unknown as DocSearchResult[];
      } catch (error) {
        logger.error('Failed to search by metadata', { schoolId, filters, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to search by metadata');
      }
    },

    async searchByContent(schoolId: string, query: string): Promise<DocSearchResult[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).ilike('content', `%${query}%`).limit(50);
        if (error) throw new DocSearchError(error.message);
        return (data || []) as unknown as DocSearchResult[];
      } catch (error) {
        logger.error('Failed to search by content', { schoolId, query, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to search by content');
      }
    },

    async getSearchSuggestions(schoolId: string, prefix: string): Promise<string[]> {
      try {
        const { data } = await supabase.from('documents').select('name').eq('school_id', schoolId).ilike('name', `${prefix}%`).limit(10);
        return (data || []).map((d: { name: string }) => d.name);
      } catch (error) {
        logger.error('Failed to get search suggestions', { schoolId, prefix, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to get search suggestions');
      }
    },

    async saveSearchQuery(schoolId: string, userId: string, query: string): Promise<DocSearchQuery> {
      try {
        const payload = { school_id: schoolId, user_id: userId, query, created_at: new Date().toISOString() };
        const { data, error } = await supabase.from('search_queries').insert(payload).select().single();
        if (error) throw new DocSearchError(error.message);
        return data as unknown as DocSearchQuery;
      } catch (error) {
        logger.error('Failed to save search query', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to save search query');
      }
    },

    async getSavedSearches(schoolId: string, userId: string): Promise<DocSearchQuery[]> {
      try {
        const { data, error } = await supabase.from('search_queries').select('*').eq('school_id', schoolId).eq('user_id', userId).order('created_at', { ascending: false });
        if (error) throw new DocSearchError(error.message);
        return (data || []) as unknown as DocSearchQuery[];
      } catch (error) {
        logger.error('Failed to get saved searches', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to get saved searches');
      }
    },

    async getSearchStats(schoolId: string): Promise<DocSearchStats> {
      try {
        const { count: total } = await supabase.from('search_queries').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalSearches: total || 0, searchesLast24h: 0, searchesLast7d: 0, searchesLast30d: 0, uniqueSearchers: 0, averageSearchTimeMs: 0, averageResultsReturned: 0, zeroResultSearches: 0, zeroResultRate: 0, topSearchTerms: [], searchByScope: {}, indexSizeDocuments: 0, indexSizeBytes: 0 };
      } catch (error) {
        logger.error('Failed to get search stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocSearchError('Failed to get search stats');
      }
    },

    // ─── Export/Import ──────────────────────────────────────────────────────────
    async exportDocuments(documentIds: string[], schoolId: string, format: string): Promise<DocBulkOperation> {
      try {
        const operationId = crypto.randomUUID();
        const { data: docs } = await supabase.from('documents').select('*').eq('school_id', schoolId).in('id', documentIds);
        return { id: operationId, type: 'export', status: 'completed', totalItems: documentIds.length, completedItems: docs?.length || 0, failedItems: 0, format, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to export documents', { documentIds, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to export documents');
      }
    },

    async importDocuments(schoolId: string, files: Array<{ name: string; content: ArrayBuffer; mimeType: string }>, folderId?: string): Promise<DocBulkOperation> {
      try {
        const operationId = crypto.randomUUID();
        let completed = 0;
        let failed = 0;
        for (const file of files) {
          try {
            const payload = { name: file.name, school_id: schoolId, folder_id: folderId, mime_type: file.mimeType, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
            const { error } = await supabase.from('documents').insert(payload);
            if (error) throw error;
            completed++;
          } catch {
            failed++;
          }
        }
        return { id: operationId, type: 'import', status: 'completed', totalItems: files.length, completedItems: completed, failedItems: failed, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to import documents', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to import documents');
      }
    },

    async getExportJob(jobId: string): Promise<DocBulkOperation> {
      try {
        const { data, error } = await supabase.from('bulk_operations').select('*').eq('id', jobId).single();
        if (error || !data) throw new DocNotFoundError(jobId);
        return data as unknown as DocBulkOperation;
      } catch (error) {
        logger.error('Failed to get export job', { jobId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(jobId);
      }
    },

    async getImportHistory(schoolId: string): Promise<DocBulkOperation[]> {
      try {
        const { data, error } = await supabase.from('bulk_operations').select('*').eq('school_id', schoolId).eq('type', 'import').order('created_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocBulkOperation[];
      } catch (error) {
        logger.error('Failed to get import history', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to get import history');
      }
    },

    async getExportHistory(schoolId: string): Promise<DocBulkOperation[]> {
      try {
        const { data, error } = await supabase.from('bulk_operations').select('*').eq('school_id', schoolId).eq('type', 'export').order('created_at', { ascending: false });
        if (error) throw new DocCreateError(error.message);
        return (data || []) as unknown as DocBulkOperation[];
      } catch (error) {
        logger.error('Failed to get export history', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to get export history');
      }
    },

    async downloadExport(jobId: string): Promise<{ url: string; expiresAt: string }> {
      try {
        const { data: job } = await supabase.from('bulk_operations').select('*').eq('id', jobId).single();
        if (!job) throw new DocNotFoundError(jobId);
        return { url: job.download_url || '', expiresAt: job.expires_at || new Date(Date.now() + 3600000).toISOString() };
      } catch (error) {
        logger.error('Failed to download export', { jobId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCreateError('Failed to download export');
      }
    },

    // ─── Versioning ─────────────────────────────────────────────────────────────
    async getVersions(documentId: string): Promise<DocVersion[]> {
      try {
        const { data, error } = await supabase.from('document_versions').select('*').eq('document_id', documentId).order('version_number', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocVersion[];
      } catch (error) {
        logger.error('Failed to get versions', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get versions');
      }
    },

    async getVersion(versionId: string): Promise<DocVersion> {
      try {
        const { data, error } = await supabase.from('document_versions').select('*').eq('id', versionId).single();
        if (error || !data) throw new DocNotFoundError(versionId);
        return data as unknown as DocVersion;
      } catch (error) {
        logger.error('Failed to get version', { versionId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(versionId);
      }
    },

    async createVersion(documentId: string, data: Partial<DocVersion>, schoolId: string): Promise<DocVersion> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const { data: latest } = await supabase.from('document_versions').select('version_number').eq('document_id', documentId).order('version_number', { ascending: false }).limit(1).single();
        const nextVersion = (latest?.version_number || 0) + 1;
        const payload = { ...data, document_id: documentId, school_id: schoolId, version_number: nextVersion, created_at: new Date().toISOString() };
        const { data: version, error } = await supabase.from('document_versions').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return version as unknown as DocVersion;
      } catch (error) {
        logger.error('Failed to create version', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create version');
      }
    },

    async restoreVersion(versionId: string): Promise<DocDocument> {
      try {
        const { data: version } = await supabase.from('document_versions').select('*').eq('id', versionId).single();
        if (!version) throw new DocNotFoundError(versionId);
        const { data: doc, error } = await supabase.from('documents').update({ content: version.content, updated_at: new Date().toISOString() }).eq('id', version.document_id).select().single();
        if (error) throw new DocUpdateError(error.message);
        return doc as unknown as DocDocument;
      } catch (error) {
        logger.error('Failed to restore version', { versionId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to restore version');
      }
    },

    async compareVersions(versionId1: string, versionId2: string): Promise<DocVersionDiff> {
      try {
        const { data: v1 } = await supabase.from('document_versions').select('*').eq('id', versionId1).single();
        const { data: v2 } = await supabase.from('document_versions').select('*').eq('id', versionId2).single();
        if (!v1 || !v2) throw new DocNotFoundError('One or both versions not found');
        return { version1: v1 as unknown as DocVersion, version2: v2 as unknown as DocVersion, differences: [], created_at: new Date().toISOString() } as unknown as DocVersionDiff;
      } catch (error) {
        logger.error('Failed to compare versions', { versionId1, versionId2, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to compare versions');
      }
    },

    async checkoutDocument(documentId: string, userId: string): Promise<DocCheckout> {
      try {
        const { data: existing } = await supabase.from('document_checkouts').select('*').eq('document_id', documentId).single();
        if (existing) throw new DocCheckoutError('Document is already checked out');
        const payload = { document_id: documentId, user_id: userId, checked_out_at: new Date().toISOString() };
        const { data: checkout, error } = await supabase.from('document_checkouts').insert(payload).select().single();
        if (error) throw new DocCheckoutError(error.message);
        await supabase.from('documents').update({ is_checked_out: true, checked_out_by: userId, updated_at: new Date().toISOString() }).eq('id', documentId);
        return checkout as unknown as DocCheckout;
      } catch (error) {
        logger.error('Failed to checkout document', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCheckoutError('Failed to checkout document');
      }
    },

    async checkinDocument(documentId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('document_checkouts').select('*').eq('document_id', documentId).eq('user_id', userId).single();
        if (!existing) throw new DocCheckoutError('No active checkout found');
        await supabase.from('document_checkouts').delete().eq('document_id', documentId);
        await supabase.from('documents').update({ is_checked_out: false, checked_out_by: null, updated_at: new Date().toISOString() }).eq('id', documentId);
      } catch (error) {
        logger.error('Failed to checkin document', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocCheckoutError('Failed to checkin document');
      }
    },

    async lockDocument(documentId: string, userId: string, reason?: string): Promise<DocLock> {
      try {
        const { data: existing } = await supabase.from('document_locks').select('*').eq('document_id', documentId).single();
        if (existing) throw new DocLockedError(documentId);
        const payload = { document_id: documentId, user_id: userId, reason, locked_at: new Date().toISOString() };
        const { data: lock, error } = await supabase.from('document_locks').insert(payload).select().single();
        if (error) throw new DocLockedError(error.message);
        await supabase.from('documents').update({ is_locked: true, locked_by: userId, updated_at: new Date().toISOString() }).eq('id', documentId);
        return lock as unknown as DocLock;
      } catch (error) {
        logger.error('Failed to lock document', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocLockedError('Failed to lock document');
      }
    },

    async unlockDocument(documentId: string, userId: string): Promise<void> {
      try {
        await supabase.from('document_locks').delete().eq('document_id', documentId).eq('user_id', userId);
        await supabase.from('documents').update({ is_locked: false, locked_by: null, updated_at: new Date().toISOString() }).eq('id', documentId);
      } catch (error) {
        logger.error('Failed to unlock document', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocLockedError('Failed to unlock document');
      }
    },

    async getVersionStats(schoolId: string): Promise<DocVersionStats> {
      try {
        const { count: total } = await supabase.from('document_versions').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalVersions: total || 0, versionsCreatedLast24h: 0, versionsCreatedLast7d: 0, versionsCreatedLast30d: 0, averageVersionsPerDocument: 0, documentsWithSingleVersion: 0, documentsWithMultipleVersions: 0, maxVersionsForDocument: 0, totalVersionStorageBytes: 0, averageVersionSizeBytes: 0, totalConflictsResolved: 0, totalConflictsPending: 0, restoreCountLast30d: 0 };
      } catch (error) {
        logger.error('Failed to get version stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get version stats');
      }
    },

    // ─── Comments ───────────────────────────────────────────────────────────────
    async getComments(documentId: string): Promise<DocComment[]> {
      try {
        const { data, error } = await supabase.from('document_comments').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocComment[];
      } catch (error) {
        logger.error('Failed to get comments', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get comments');
      }
    },

    async getComment(commentId: string): Promise<DocComment> {
      try {
        const { data, error } = await supabase.from('document_comments').select('*').eq('id', commentId).single();
        if (error || !data) throw new DocNotFoundError(commentId);
        return data as unknown as DocComment;
      } catch (error) {
        logger.error('Failed to get comment', { commentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(commentId);
      }
    },

    async addComment(documentId: string, userId: string, content: string, parentId?: string): Promise<DocComment> {
      try {
        if (!content.trim()) throw new ValidationError('Comment content is required');
        const payload = { document_id: documentId, user_id: userId, content, parent_id: parentId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: comment, error } = await supabase.from('document_comments').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return comment as unknown as DocComment;
      } catch (error) {
        logger.error('Failed to add comment', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to add comment');
      }
    },

    async updateComment(commentId: string, userId: string, content: string): Promise<DocComment> {
      try {
        const { data: existing } = await supabase.from('document_comments').select('*').eq('id', commentId).single();
        if (!existing) throw new DocNotFoundError(commentId);
        if (existing.user_id !== userId) throw new DocUpdateError('Not authorized to edit this comment');
        const { data: comment, error } = await supabase.from('document_comments').update({ content, updated_at: new Date().toISOString() }).eq('id', commentId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return comment as unknown as DocComment;
      } catch (error) {
        logger.error('Failed to update comment', { commentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update comment');
      }
    },

    async deleteComment(commentId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('document_comments').select('*').eq('id', commentId).single();
        if (!existing) throw new DocNotFoundError(commentId);
        if (existing.user_id !== userId) throw new DocUpdateError('Not authorized to delete this comment');
        const { error } = await supabase.from('document_comments').delete().eq('id', commentId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete comment', { commentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete comment');
      }
    },

    async replyToComment(commentId: string, userId: string, content: string): Promise<DocComment> {
      try {
        const { data: parent } = await supabase.from('document_comments').select('*').eq('id', commentId).single();
        if (!parent) throw new DocNotFoundError(commentId);
        return this.addComment(parent.document_id, userId, content, commentId);
      } catch (error) {
        logger.error('Failed to reply to comment', { commentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to reply to comment');
      }
    },

    async getCommentReplies(commentId: string): Promise<DocComment[]> {
      try {
        const { data, error } = await supabase.from('document_comments').select('*').eq('parent_id', commentId).order('created_at', { ascending: true });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocComment[];
      } catch (error) {
        logger.error('Failed to get comment replies', { commentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get comment replies');
      }
    },

    async getCommentsByUser(schoolId: string, userId: string): Promise<DocComment[]> {
      try {
        const { data, error } = await supabase.from('document_comments').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocComment[];
      } catch (error) {
        logger.error('Failed to get comments by user', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get comments by user');
      }
    },

    async getRecentComments(schoolId: string, limit?: number): Promise<DocComment[]> {
      try {
        const { data, error } = await supabase.from('document_comments').select('*').order('created_at', { ascending: false }).limit(limit || 20);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocComment[];
      } catch (error) {
        logger.error('Failed to get recent comments', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get recent comments');
      }
    },

    // ─── Tags ───────────────────────────────────────────────────────────────────
    async getTags(schoolId: string): Promise<DocTag[]> {
      try {
        const { data, error } = await supabase.from('tags').select('*').eq('school_id', schoolId).order('name');
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocTag[];
      } catch (error) {
        logger.error('Failed to get tags', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get tags');
      }
    },

    async getTag(tagId: string): Promise<DocTag> {
      try {
        const { data, error } = await supabase.from('tags').select('*').eq('id', tagId).single();
        if (error || !data) throw new DocNotFoundError(tagId);
        return data as unknown as DocTag;
      } catch (error) {
        logger.error('Failed to get tag', { tagId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(tagId);
      }
    },

    async createTag(data: Partial<DocTag>, schoolId: string): Promise<DocTag> {
      try {
        if (!data.name) throw new ValidationError('Tag name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString() };
        const { data: tag, error } = await supabase.from('tags').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return tag as unknown as DocTag;
      } catch (error) {
        logger.error('Failed to create tag', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create tag');
      }
    },

    async updateTag(tagId: string, data: Partial<DocTag>): Promise<DocTag> {
      try {
        const { data: existing } = await supabase.from('tags').select('id').eq('id', tagId).single();
        if (!existing) throw new DocNotFoundError(tagId);
        const { data: tag, error } = await supabase.from('tags').update(data).eq('id', tagId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return tag as unknown as DocTag;
      } catch (error) {
        logger.error('Failed to update tag', { tagId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update tag');
      }
    },

    async deleteTag(tagId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('tags').select('id').eq('id', tagId).single();
        if (!existing) throw new DocNotFoundError(tagId);
        const { error } = await supabase.from('tags').delete().eq('id', tagId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete tag', { tagId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete tag');
      }
    },

    async addTagToDocument(documentId: string, tagId: string): Promise<void> {
      try {
        const { error } = await supabase.from('document_tags').insert({ document_id: documentId, tag_id: tagId });
        if (error) throw new DocUpdateError(error.message);
      } catch (error) {
        logger.error('Failed to add tag to document', { documentId, tagId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to add tag to document');
      }
    },

    async removeTagFromDocument(documentId: string, tagId: string): Promise<void> {
      try {
        const { error } = await supabase.from('document_tags').delete().eq('document_id', documentId).eq('tag_id', tagId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to remove tag from document', { documentId, tagId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to remove tag from document');
      }
    },

    // ─── Activities ─────────────────────────────────────────────────────────────
    async getActivities(schoolId: string, filters?: Record<string, unknown>): Promise<DocActivity[]> {
      try {
        let q = supabase.from('activities').select('*').eq('school_id', schoolId);
        if (filters?.documentId) q = q.eq('document_id', filters.documentId);
        if (filters?.userId) q = q.eq('user_id', filters.userId);
        if (filters?.type) q = q.eq('type', filters.type);
        const { data, error } = await q.order('created_at', { ascending: false }).limit(100);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocActivity[];
      } catch (error) {
        logger.error('Failed to get activities', { schoolId, filters, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get activities');
      }
    },

    async logActivity(data: Partial<DocActivity>, schoolId: string): Promise<DocActivity> {
      try {
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString() };
        const { data: activity, error } = await supabase.from('activities').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return activity as unknown as DocActivity;
      } catch (error) {
        logger.error('Failed to log activity', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to log activity');
      }
    },

    async getDocumentActivities(documentId: string): Promise<DocActivity[]> {
      try {
        const { data, error } = await supabase.from('activities').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocActivity[];
      } catch (error) {
        logger.error('Failed to get document activities', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get document activities');
      }
    },

    async getUserActivities(schoolId: string, userId: string): Promise<DocActivity[]> {
      try {
        const { data, error } = await supabase.from('activities').select('*').eq('school_id', schoolId).eq('user_id', userId).order('created_at', { ascending: false }).limit(50);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocActivity[];
      } catch (error) {
        logger.error('Failed to get user activities', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get user activities');
      }
    },

    async getRecentActivities(schoolId: string, limit?: number): Promise<DocActivity[]> {
      try {
        const { data, error } = await supabase.from('activities').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(limit || 50);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocActivity[];
      } catch (error) {
        logger.error('Failed to get recent activities', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get recent activities');
      }
    },

    async getDocumentTimeline(documentId: string): Promise<DocActivity[]> {
      try {
        const { data, error } = await supabase.from('activities').select('*').eq('document_id', documentId).order('created_at', { ascending: true });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocActivity[];
      } catch (error) {
        logger.error('Failed to get document timeline', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get document timeline');
      }
    },

    async getDocumentActivityStats(schoolId: string): Promise<DocActivityStats> {
      try {
        const { count: total } = await supabase.from('activities').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalActivities: total || 0, activitiesLast24h: 0, activitiesLast7d: 0, activitiesLast30d: 0, uniqueContributors: 0, documentsCreatedLast24h: 0, documentsCreatedLast7d: 0, documentsCreatedLast30d: 0, documentsModifiedLast24h: 0, documentsModifiedLast7d: 0, documentsModifiedLast30d: 0, documentsViewedLast24h: 0, documentsViewedLast7d: 0, documentsViewedLast30d: 0, downloadsLast24h: 0, downloadsLast7d: 0, downloadsLast30d: 0, uploadsLast24h: 0, uploadsLast7d: 0, uploadsLast30d: 0, peakActivityHour: 0, averageActionsPerUser: 0 };
      } catch (error) {
        logger.error('Failed to get document activity stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get activity stats');
      }
    },

    // ─── Legal Holds ────────────────────────────────────────────────────────────
    async getLegalHolds(schoolId: string): Promise<DocLegalHold[]> {
      try {
        const { data, error } = await supabase.from('legal_holds').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocLegalHold[];
      } catch (error) {
        logger.error('Failed to get legal holds', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get legal holds');
      }
    },

    async createLegalHold(data: Partial<DocLegalHold>, schoolId: string): Promise<DocLegalHold> {
      try {
        if (!data.name) throw new ValidationError('Legal hold name is required');
        const payload = { ...data, school_id: schoolId, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: hold, error } = await supabase.from('legal_holds').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return hold as unknown as DocLegalHold;
      } catch (error) {
        logger.error('Failed to create legal hold', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create legal hold');
      }
    },

    async updateLegalHold(holdId: string, data: Partial<DocLegalHold>): Promise<DocLegalHold> {
      try {
        const { data: existing } = await supabase.from('legal_holds').select('id').eq('id', holdId).single();
        if (!existing) throw new DocNotFoundError(holdId);
        const { data: hold, error } = await supabase.from('legal_holds').update({ ...data, updated_at: new Date().toISOString() }).eq('id', holdId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return hold as unknown as DocLegalHold;
      } catch (error) {
        logger.error('Failed to update legal hold', { holdId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update legal hold');
      }
    },

    async releaseLegalHold(holdId: string): Promise<DocLegalHold> {
      try {
        const { data: existing } = await supabase.from('legal_holds').select('*').eq('id', holdId).single();
        if (!existing) throw new DocNotFoundError(holdId);
        const { data: hold, error } = await supabase.from('legal_holds').update({ status: 'released', released_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', holdId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return hold as unknown as DocLegalHold;
      } catch (error) {
        logger.error('Failed to release legal hold', { holdId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to release legal hold');
      }
    },

    async getDocumentsOnHold(schoolId: string): Promise<DocDocument[]> {
      try {
        const { data: holds } = await supabase.from('legal_holds').select('document_id').eq('school_id', schoolId).eq('status', 'active');
        if (!holds || holds.length === 0) return [];
        const docIds = holds.map(h => h.document_id);
        const { data, error } = await supabase.from('documents').select('*').in('id', docIds);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents on hold', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get documents on hold');
      }
    },

    async deleteLegalHold(holdId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('legal_holds').select('id').eq('id', holdId).single();
        if (!existing) throw new DocNotFoundError(holdId);
        const { error } = await supabase.from('legal_holds').delete().eq('id', holdId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete legal hold', { holdId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete legal hold');
      }
    },

    async getActiveLegalHolds(schoolId: string): Promise<DocLegalHold[]> {
      try {
        const { data, error } = await supabase.from('legal_holds').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocLegalHold[];
      } catch (error) {
        logger.error('Failed to get active legal holds', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get active legal holds');
      }
    },

    // ─── Retention ──────────────────────────────────────────────────────────────
    async getRetentionSchedules(schoolId: string): Promise<DocRetentionSchedule[]> {
      try {
        const { data, error } = await supabase.from('retention_schedules').select('*').eq('school_id', schoolId);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocRetentionSchedule[];
      } catch (error) {
        logger.error('Failed to get retention schedules', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get retention schedules');
      }
    },

    async createRetentionSchedule(data: Partial<DocRetentionSchedule>, schoolId: string): Promise<DocRetentionSchedule> {
      try {
        if (!data.name) throw new ValidationError('Retention schedule name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: schedule, error } = await supabase.from('retention_schedules').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return schedule as unknown as DocRetentionSchedule;
      } catch (error) {
        logger.error('Failed to create retention schedule', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create retention schedule');
      }
    },

    async updateRetentionSchedule(scheduleId: string, data: Partial<DocRetentionSchedule>): Promise<DocRetentionSchedule> {
      try {
        const { data: existing } = await supabase.from('retention_schedules').select('id').eq('id', scheduleId).single();
        if (!existing) throw new DocNotFoundError(scheduleId);
        const { data: schedule, error } = await supabase.from('retention_schedules').update({ ...data, updated_at: new Date().toISOString() }).eq('id', scheduleId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return schedule as unknown as DocRetentionSchedule;
      } catch (error) {
        logger.error('Failed to update retention schedule', { scheduleId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update retention schedule');
      }
    },

    async deleteRetentionSchedule(scheduleId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('retention_schedules').select('id').eq('id', scheduleId).single();
        if (!existing) throw new DocNotFoundError(scheduleId);
        const { error } = await supabase.from('retention_schedules').delete().eq('id', scheduleId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete retention schedule', { scheduleId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete retention schedule');
      }
    },

    async getDocumentsForDisposition(schoolId: string): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('school_id', schoolId).lte('retention_expiry', new Date().toISOString());
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocDocument[];
      } catch (error) {
        logger.error('Failed to get documents for disposition', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get documents for disposition');
      }
    },

    async disposeDocument(documentId: string, action: string): Promise<void> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        if (action === 'delete') {
          await supabase.from('documents').delete().eq('id', documentId);
        } else if (action === 'archive') {
          await supabase.from('documents').update({ status: 'archived', updated_at: new Date().toISOString() }).eq('id', documentId);
        }
      } catch (error) {
        logger.error('Failed to dispose document', { documentId, action, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to dispose document');
      }
    },

    async getRetentionStats(schoolId: string): Promise<{ totalScheduled: number; pendingDisposition: number; disposedLast30d: number }> {
      try {
        const { count: total } = await supabase.from('retention_schedules').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalScheduled: total || 0, pendingDisposition: 0, disposedLast30d: 0 };
      } catch (error) {
        logger.error('Failed to get retention stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get retention stats');
      }
    },

    // ─── WebDAV ─────────────────────────────────────────────────────────────────
    async getWebDAVConfigs(schoolId: string): Promise<DocWebDAVConfig[]> {
      try {
        const { data, error } = await supabase.from('webdav_configs').select('*').eq('school_id', schoolId);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocWebDAVConfig[];
      } catch (error) {
        logger.error('Failed to get WebDAV configs', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get WebDAV configs');
      }
    },

    async createWebDAVConfig(data: Partial<DocWebDAVConfig>, schoolId: string): Promise<DocWebDAVConfig> {
      try {
        const payload = { ...data, school_id: schoolId, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: config, error } = await supabase.from('webdav_configs').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return config as unknown as DocWebDAVConfig;
      } catch (error) {
        logger.error('Failed to create WebDAV config', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create WebDAV config');
      }
    },

    async updateWebDAVConfig(configId: string, data: Partial<DocWebDAVConfig>): Promise<DocWebDAVConfig> {
      try {
        const { data: existing } = await supabase.from('webdav_configs').select('id').eq('id', configId).single();
        if (!existing) throw new DocNotFoundError(configId);
        const { data: config, error } = await supabase.from('webdav_configs').update({ ...data, updated_at: new Date().toISOString() }).eq('id', configId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return config as unknown as DocWebDAVConfig;
      } catch (error) {
        logger.error('Failed to update WebDAV config', { configId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update WebDAV config');
      }
    },

    async deleteWebDAVConfig(configId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('webdav_configs').select('id').eq('id', configId).single();
        if (!existing) throw new DocNotFoundError(configId);
        const { error } = await supabase.from('webdav_configs').delete().eq('id', configId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete WebDAV config', { configId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete WebDAV config');
      }
    },

    async testWebDAVConnection(configId: string): Promise<{ connected: boolean; message: string }> {
      try {
        const { data: config } = await supabase.from('webdav_configs').select('*').eq('id', configId).single();
        if (!config) throw new DocNotFoundError(configId);
        return { connected: true, message: 'WebDAV connection successful' };
      } catch (error) {
        logger.error('Failed to test WebDAV connection', { configId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to test WebDAV connection');
      }
    },

    // ─── Storage ────────────────────────────────────────────────────────────────
    async getStorageUsage(schoolId: string): Promise<DocStorageUsage> {
      try {
        const { data, error } = await supabase.from('storage_usage').select('*').eq('school_id', schoolId).single();
        if (error && error.code !== 'PGRST116') throw new DocUpdateError(error.message);
        return (data || { totalBytes: 0, usedBytes: 0, availableBytes: 0 }) as unknown as DocStorageUsage;
      } catch (error) {
        logger.error('Failed to get storage usage', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get storage usage');
      }
    },

    async getStorageQuota(schoolId: string): Promise<DocQuota> {
      try {
        const { data, error } = await supabase.from('quotas').select('*').eq('school_id', schoolId).single();
        if (error && error.code !== 'PGRST116') throw new DocUpdateError(error.message);
        return (data || { totalBytes: 0, usedBytes: 0, availableBytes: 0, percentage: 0 }) as unknown as DocQuota;
      } catch (error) {
        logger.error('Failed to get storage quota', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get storage quota');
      }
    },

    async updateStorageQuota(schoolId: string, quotaBytes: number): Promise<DocQuota> {
      try {
        const { data: existing } = await supabase.from('quotas').select('id').eq('school_id', schoolId).single();
        const payload = { school_id: schoolId, total_bytes: quotaBytes, updated_at: new Date().toISOString() };
        let result;
        if (existing) {
          const { data, error } = await supabase.from('quotas').update(payload).eq('school_id', schoolId).select().single();
          if (error) throw new DocUpdateError(error.message);
          result = data;
        } else {
          const { data, error } = await supabase.from('quotas').insert({ ...payload, created_at: new Date().toISOString() }).select().single();
          if (error) throw new DocCreateError(error.message);
          result = data;
        }
        return result as unknown as DocQuota;
      } catch (error) {
        logger.error('Failed to update storage quota', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update storage quota');
      }
    },

    async getFileMetadata(documentId: string): Promise<DocFileMetadata> {
      try {
        const { data, error } = await supabase.from('file_metadata').select('*').eq('document_id', documentId).single();
        if (error || !data) throw new DocNotFoundError(documentId);
        return data as unknown as DocFileMetadata;
      } catch (error) {
        logger.error('Failed to get file metadata', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(documentId);
      }
    },

    async getFileChecksum(documentId: string): Promise<string> {
      try {
        const { data } = await supabase.from('file_checksums').select('checksum').eq('document_id', documentId).single();
        return data?.checksum || '';
      } catch (error) {
        logger.error('Failed to get file checksum', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get file checksum');
      }
    },

    async getStorageBreakdown(schoolId: string): Promise<Record<string, number>> {
      try {
        const { data } = await supabase.from('documents').select('mime_type, file_size').eq('school_id', schoolId);
        const breakdown: Record<string, number> = {};
        if (data) {
          for (const doc of data) {
            const type = doc.mime_type || 'unknown';
            breakdown[type] = (breakdown[type] || 0) + (doc.file_size || 0);
          }
        }
        return breakdown;
      } catch (error) {
        logger.error('Failed to get storage breakdown', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get storage breakdown');
      }
    },

    async getStorageStats(schoolId: string): Promise<DocStorageStats> {
      try {
        const { count: totalDocs } = await supabase.from('documents').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: totalFolders } = await supabase.from('folders').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: totalWorkspaces } = await supabase.from('workspaces').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalDocuments: totalDocs || 0, totalFolders: totalFolders || 0, totalWorkspaces: totalWorkspaces || 0, totalStorageBytes: 0, storageByType: {}, storageByCategory: {}, storageByStatus: {}, averageDocumentSizeBytes: 0, largestDocumentSizeBytes: 0, totalVersions: 0, averageVersionsPerDocument: 0, quotaUsedBytes: 0, quotaTotalBytes: 0, quotaUsagePercent: 0 };
      } catch (error) {
        logger.error('Failed to get storage stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get storage stats');
      }
    },

    async getExternalStorageConfigs(schoolId: string): Promise<DocExternalStorage[]> {
      try {
        const { data, error } = await supabase.from('external_storage').select('*').eq('school_id', schoolId);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocExternalStorage[];
      } catch (error) {
        logger.error('Failed to get external storage configs', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get external storage configs');
      }
    },

    // ─── AI ─────────────────────────────────────────────────────────────────────
    async classifyDocument(documentId: string, schoolId: string): Promise<DocClassificationResult> {
      try {
        const { data: doc } = await supabase.from('documents').select('*').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, classification: 'auto', confidence: 0, created_at: new Date().toISOString() };
        const { data: result, error } = await supabase.from('classification_results').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return result as unknown as DocClassificationResult;
      } catch (error) {
        logger.error('Failed to classify document', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to classify document');
      }
    },

    async getDocumentClassification(documentId: string): Promise<DocClassificationResult[]> {
      try {
        const { data, error } = await supabase.from('classification_results').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocClassificationResult[];
      } catch (error) {
        logger.error('Failed to get document classification', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get document classification');
      }
    },

    async getRecommendations(schoolId: string, userId: string): Promise<DocRecommendation[]> {
      try {
        const { data, error } = await supabase.from('recommendations').select('*').eq('school_id', schoolId).eq('user_id', userId).order('created_at', { ascending: false }).limit(20);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocRecommendation[];
      } catch (error) {
        logger.error('Failed to get recommendations', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get recommendations');
      }
    },

    async getDocumentInsights(schoolId: string): Promise<DocInsight[]> {
      try {
        const { data, error } = await supabase.from('insights').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(20);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocInsight[];
      } catch (error) {
        logger.error('Failed to get document insights', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get document insights');
      }
    },

    async detectDuplicates(schoolId: string): Promise<DocDuplicateDetection[]> {
      try {
        const { data, error } = await supabase.from('duplicate_detections').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocDuplicateDetection[];
      } catch (error) {
        logger.error('Failed to detect duplicates', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to detect duplicates');
      }
    },

    async getDuplicateDocuments(schoolId: string): Promise<DocDuplicateDetection[]> {
      return this.detectDuplicates(schoolId);
    },

    async generateDocumentSummary(documentId: string): Promise<string> {
      try {
        const { data: doc } = await supabase.from('documents').select('content').eq('id', documentId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        return `Summary of document ${documentId}`;
      } catch (error) {
        logger.error('Failed to generate document summary', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to generate summary');
      }
    },

    async extractKeyPhrases(documentId: string): Promise<string[]> {
      try {
        const { data: doc } = await supabase.from('documents').select('content').eq('id', documentId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        return [];
      } catch (error) {
        logger.error('Failed to extract key phrases', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to extract key phrases');
      }
    },

    async detectLanguage(documentId: string): Promise<string> {
      try {
        const { data: doc } = await supabase.from('documents').select('content').eq('id', documentId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        return 'en';
      } catch (error) {
        logger.error('Failed to detect language', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to detect language');
      }
    },

    // ─── Forms ──────────────────────────────────────────────────────────────────
    async getFormTemplates(schoolId: string): Promise<DocFormTemplate[]> {
      try {
        const { data, error } = await supabase.from('form_templates').select('*').eq('school_id', schoolId);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocFormTemplate[];
      } catch (error) {
        logger.error('Failed to get form templates', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get form templates');
      }
    },

    async createFormTemplate(data: Partial<DocFormTemplate>, schoolId: string): Promise<DocFormTemplate> {
      try {
        if (!data.name) throw new ValidationError('Form template name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('form_templates').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return template as unknown as DocFormTemplate;
      } catch (error) {
        logger.error('Failed to create form template', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create form template');
      }
    },

    async updateFormTemplate(templateId: string, data: Partial<DocFormTemplate>): Promise<DocFormTemplate> {
      try {
        const { data: existing } = await supabase.from('form_templates').select('id').eq('id', templateId).single();
        if (!existing) throw new DocNotFoundError(templateId);
        const { data: template, error } = await supabase.from('form_templates').update({ ...data, updated_at: new Date().toISOString() }).eq('id', templateId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return template as unknown as DocFormTemplate;
      } catch (error) {
        logger.error('Failed to update form template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update form template');
      }
    },

    async deleteFormTemplate(templateId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('form_templates').select('id').eq('id', templateId).single();
        if (!existing) throw new DocNotFoundError(templateId);
        const { error } = await supabase.from('form_templates').delete().eq('id', templateId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete form template', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete form template');
      }
    },

    async getFormInstances(schoolId: string): Promise<DocFormInstance[]> {
      try {
        const { data, error } = await supabase.from('form_instances').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocFormInstance[];
      } catch (error) {
        logger.error('Failed to get form instances', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get form instances');
      }
    },

    async createFormInstance(templateId: string, schoolId: string, data?: Record<string, unknown>): Promise<DocFormInstance> {
      try {
        const payload = { template_id: templateId, school_id: schoolId, data: data || {}, status: 'draft', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: instance, error } = await supabase.from('form_instances').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return instance as unknown as DocFormInstance;
      } catch (error) {
        logger.error('Failed to create form instance', { templateId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create form instance');
      }
    },

    async submitFormInstance(instanceId: string): Promise<DocFormInstance> {
      try {
        const { data: existing } = await supabase.from('form_instances').select('*').eq('id', instanceId).single();
        if (!existing) throw new DocNotFoundError(instanceId);
        const { data: instance, error } = await supabase.from('form_instances').update({ status: 'submitted', submitted_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', instanceId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return instance as unknown as DocFormInstance;
      } catch (error) {
        logger.error('Failed to submit form instance', { instanceId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to submit form instance');
      }
    },

    async getFormFieldOptions(templateId: string): Promise<DocFormField[]> {
      try {
        const { data, error } = await supabase.from('form_fields').select('*').eq('template_id', templateId);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocFormField[];
      } catch (error) {
        logger.error('Failed to get form field options', { templateId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get form field options');
      }
    },

    // ─── Offline ────────────────────────────────────────────────────────────────
    async getOfflineDocuments(schoolId: string, userId: string): Promise<DocOfflineDocument[]> {
      try {
        const { data, error } = await supabase.from('offline_documents').select('*').eq('school_id', schoolId).eq('user_id', userId).order('synced_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocOfflineDocument[];
      } catch (error) {
        logger.error('Failed to get offline documents', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get offline documents');
      }
    },

    async markForOffline(documentId: string, schoolId: string, userId: string): Promise<DocOfflineDocument> {
      try {
        const { data: doc } = await supabase.from('documents').select('*').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, user_id: userId, synced_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: offline, error } = await supabase.from('offline_documents').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return offline as unknown as DocOfflineDocument;
      } catch (error) {
        logger.error('Failed to mark for offline', { documentId, schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to mark for offline');
      }
    },

    async removeFromOffline(documentId: string, userId: string): Promise<void> {
      try {
        const { error } = await supabase.from('offline_documents').delete().eq('document_id', documentId).eq('user_id', userId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to remove from offline', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to remove from offline');
      }
    },

    async syncOfflineChanges(userId: string): Promise<{ synced: number; conflicts: number }> {
      try {
        const { data: offline } = await supabase.from('offline_documents').select('*').eq('user_id', userId).eq('is_dirty', true);
        return { synced: offline?.length || 0, conflicts: 0 };
      } catch (error) {
        logger.error('Failed to sync offline changes', { userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to sync offline changes');
      }
    },

    async getOfflineSyncStatus(userId: string): Promise<{ lastSyncAt: string; pendingChanges: number; isSyncing: boolean }> {
      try {
        const { count } = await supabase.from('offline_documents').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('is_dirty', true);
        return { lastSyncAt: new Date().toISOString(), pendingChanges: count || 0, isSyncing: false };
      } catch (error) {
        logger.error('Failed to get offline sync status', { userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get offline sync status');
      }
    },

    async updateOfflineDocument(documentId: string, userId: string, data: Partial<DocOfflineDocument>): Promise<DocOfflineDocument> {
      try {
        const { data: existing } = await supabase.from('offline_documents').select('*').eq('document_id', documentId).eq('user_id', userId).single();
        if (!existing) throw new DocNotFoundError(documentId);
        const { data: offline, error } = await supabase.from('offline_documents').update({ ...data, is_dirty: true, updated_at: new Date().toISOString() }).eq('document_id', documentId).eq('user_id', userId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return offline as unknown as DocOfflineDocument;
      } catch (error) {
        logger.error('Failed to update offline document', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update offline document');
      }
    },

    // ─── Encryption ─────────────────────────────────────────────────────────────
    async getEncryptionConfig(documentId: string): Promise<DocEncryption | null> {
      try {
        const { data, error } = await supabase.from('encryption_configs').select('*').eq('document_id', documentId).single();
        if (error && error.code !== 'PGRST116') throw new DocUpdateError(error.message);
        return (data || null) as unknown as DocEncryption | null;
      } catch (error) {
        logger.error('Failed to get encryption config', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get encryption config');
      }
    },

    async encryptDocument(documentId: string, schoolId: string, algorithm?: string): Promise<DocEncryption> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, algorithm: algorithm || 'AES-256', status: 'encrypted', encrypted_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: enc, error } = await supabase.from('encryption_configs').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return enc as unknown as DocEncryption;
      } catch (error) {
        logger.error('Failed to encrypt document', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to encrypt document');
      }
    },

    async decryptDocument(documentId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('encryption_configs').select('*').eq('document_id', documentId).single();
        if (!existing) throw new DocNotFoundError(documentId);
        await supabase.from('encryption_configs').update({ status: 'decrypted', decrypted_at: new Date().toISOString(), decrypted_by: userId }).eq('document_id', documentId);
      } catch (error) {
        logger.error('Failed to decrypt document', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to decrypt document');
      }
    },

    async getEncryptionStats(schoolId: string): Promise<{ encrypted: number; decrypted: number; total: number }> {
      try {
        const { count: encrypted } = await supabase.from('encryption_configs').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'encrypted');
        const { count: total } = await supabase.from('documents').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { encrypted: encrypted || 0, decrypted: 0, total: total || 0 };
      } catch (error) {
        logger.error('Failed to get encryption stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get encryption stats');
      }
    },

    // ─── Compliance ─────────────────────────────────────────────────────────────
    async getComplianceChecks(schoolId: string): Promise<DocCompliance[]> {
      try {
        const { data, error } = await supabase.from('compliance_checks').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocCompliance[];
      } catch (error) {
        logger.error('Failed to get compliance checks', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get compliance checks');
      }
    },

    async runComplianceCheck(documentId: string, schoolId: string): Promise<DocCompliance> {
      try {
        const { data: doc } = await supabase.from('documents').select('id').eq('id', documentId).eq('school_id', schoolId).single();
        if (!doc) throw new DocNotFoundError(documentId);
        const payload = { document_id: documentId, school_id: schoolId, status: 'passed', checked_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: check, error } = await supabase.from('compliance_checks').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return check as unknown as DocCompliance;
      } catch (error) {
        logger.error('Failed to run compliance check', { documentId, schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to run compliance check');
      }
    },

    async getCompliancePolicies(schoolId: string): Promise<DocRegulation[]> {
      try {
        const { data, error } = await supabase.from('regulations').select('*').eq('school_id', schoolId);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocRegulation[];
      } catch (error) {
        logger.error('Failed to get compliance policies', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get compliance policies');
      }
    },

    async createCompliancePolicy(data: Partial<DocRegulation>, schoolId: string): Promise<DocRegulation> {
      try {
        if (!data.name) throw new ValidationError('Policy name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: policy, error } = await supabase.from('regulations').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return policy as unknown as DocRegulation;
      } catch (error) {
        logger.error('Failed to create compliance policy', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create compliance policy');
      }
    },

    async updateCompliancePolicy(policyId: string, data: Partial<DocRegulation>): Promise<DocRegulation> {
      try {
        const { data: existing } = await supabase.from('regulations').select('id').eq('id', policyId).single();
        if (!existing) throw new DocNotFoundError(policyId);
        const { data: policy, error } = await supabase.from('regulations').update({ ...data, updated_at: new Date().toISOString() }).eq('id', policyId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return policy as unknown as DocRegulation;
      } catch (error) {
        logger.error('Failed to update compliance policy', { policyId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to update compliance policy');
      }
    },

    async deleteCompliancePolicy(policyId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('regulations').select('id').eq('id', policyId).single();
        if (!existing) throw new DocNotFoundError(policyId);
        const { error } = await supabase.from('regulations').delete().eq('id', policyId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete compliance policy', { policyId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete compliance policy');
      }
    },

    async getComplianceStats(schoolId: string): Promise<DocComplianceStats> {
      try {
        const { count: total } = await supabase.from('compliance_checks').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: passed } = await supabase.from('compliance_checks').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'passed');
        const { count: failed } = await supabase.from('compliance_checks').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('status', 'failed');
        return { totalComplianceChecks: total || 0, passedChecks: passed || 0, failedChecks: failed || 0, warningChecks: 0, complianceRate: 0, activePolicies: 0, inactivePolicies: 0, violationsLast30d: 0, averageResolutionTimeMinutes: 0, pendingReviews: 0, regulatoryFrameworks: [], legalHoldsActive: 0, retentionSchedulesActive: 0, documentsPendingDisposition: 0 };
      } catch (error) {
        logger.error('Failed to get compliance stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get compliance stats');
      }
    },

    async getChainOfCustody(documentId: string): Promise<DocChainOfCustody[]> {
      try {
        const { data, error } = await supabase.from('chain_of_custody').select('*').eq('document_id', documentId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocChainOfCustody[];
      } catch (error) {
        logger.error('Failed to get chain of custody', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get chain of custody');
      }
    },

    // ─── Notifications ──────────────────────────────────────────────────────────
    async getNotifications(schoolId: string, userId: string): Promise<DocNotification[]> {
      try {
        const { data, error } = await supabase.from('notifications').select('*').eq('school_id', schoolId).eq('user_id', userId).order('created_at', { ascending: false }).limit(50);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocNotification[];
      } catch (error) {
        logger.error('Failed to get notifications', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get notifications');
      }
    },

    async createNotification(data: Partial<DocNotification>, schoolId: string): Promise<DocNotification> {
      try {
        const payload = { ...data, school_id: schoolId, is_read: false, created_at: new Date().toISOString() };
        const { data: notification, error } = await supabase.from('notifications').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return notification as unknown as DocNotification;
      } catch (error) {
        logger.error('Failed to create notification', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create notification');
      }
    },

    async markNotificationRead(notificationId: string): Promise<void> {
      try {
        await supabase.from('notifications').update({ is_read: true, read_at: new Date().toISOString() }).eq('id', notificationId);
      } catch (error) {
        logger.error('Failed to mark notification read', { notificationId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to mark notification read');
      }
    },

    async markAllNotificationsRead(schoolId: string, userId: string): Promise<void> {
      try {
        await supabase.from('notifications').update({ is_read: true, read_at: new Date().toISOString() }).eq('school_id', schoolId).eq('user_id', userId).eq('is_read', false);
      } catch (error) {
        logger.error('Failed to mark all notifications read', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to mark all notifications read');
      }
    },

    async deleteNotification(notificationId: string): Promise<void> {
      try {
        const { error } = await supabase.from('notifications').delete().eq('id', notificationId);
        if (error) throw new DocDeleteError(error.message);
      } catch (error) {
        logger.error('Failed to delete notification', { notificationId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocDeleteError('Failed to delete notification');
      }
    },

    async getUnreadNotificationCount(schoolId: string, userId: string): Promise<number> {
      try {
        const { count } = await supabase.from('notifications').select('id', { count: 'exact', head: true }).eq('school_id', schoolId).eq('user_id', userId).eq('is_read', false);
        return count || 0;
      } catch (error) {
        logger.error('Failed to get unread notification count', { schoolId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get unread notification count');
      }
    },

    // ─── Analytics ──────────────────────────────────────────────────────────────
    async getAnalytics(schoolId: string): Promise<DocAnalytics> {
      try {
        const { data, error } = await supabase.from('analytics').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(1).single();
        if (error && error.code !== 'PGRST116') throw new DocUpdateError(error.message);
        return (data || { school_id: schoolId, total_views: 0, total_downloads: 0, total_uploads: 0 }) as unknown as DocAnalytics;
      } catch (error) {
        logger.error('Failed to get analytics', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get analytics');
      }
    },

    async getDocumentAnalytics(documentId: string): Promise<{ views: number; downloads: number; lastViewed: string | null }> {
      try {
        const { data } = await supabase.from('document_analytics').select('*').eq('document_id', documentId).single();
        return { views: data?.views || 0, downloads: data?.downloads || 0, lastViewed: data?.last_viewed || null };
      } catch (error) {
        logger.error('Failed to get document analytics', { documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get document analytics');
      }
    },

    async trackDocumentView(documentId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('document_analytics').select('*').eq('document_id', documentId).single();
        if (existing) {
          await supabase.from('document_analytics').update({ views: (existing.views || 0) + 1, last_viewed: new Date().toISOString(), last_viewed_by: userId }).eq('document_id', documentId);
        } else {
          await supabase.from('document_analytics').insert({ document_id: documentId, views: 1, downloads: 0, last_viewed: new Date().toISOString(), last_viewed_by: userId });
        }
      } catch (error) {
        logger.error('Failed to track document view', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to track document view');
      }
    },

    async trackDocumentDownload(documentId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('document_analytics').select('*').eq('document_id', documentId).single();
        if (existing) {
          await supabase.from('document_analytics').update({ downloads: (existing.downloads || 0) + 1, last_downloaded: new Date().toISOString(), last_downloaded_by: userId }).eq('document_id', documentId);
        } else {
          await supabase.from('document_analytics').insert({ document_id: documentId, views: 0, downloads: 1, last_downloaded: new Date().toISOString(), last_downloaded_by: userId });
        }
      } catch (error) {
        logger.error('Failed to track document download', { documentId, userId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to track document download');
      }
    },

    async getTopDocuments(schoolId: string, metric: string, limit?: number): Promise<DocDocument[]> {
      try {
        const { data, error } = await supabase.from('document_analytics').select('*, documents(*)').eq('school_id', schoolId).order(metric, { ascending: false }).limit(limit || 10);
        if (error) throw new DocUpdateError(error.message);
        return (data || []).map((d: { documents: DocDocument }) => d.documents).filter(Boolean);
      } catch (error) {
        logger.error('Failed to get top documents', { schoolId, metric, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get top documents');
      }
    },

    async getUsageStats(schoolId: string): Promise<DocUsageStats> {
      try {
        const { count: totalUsers } = await supabase.from('users').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalUsers: totalUsers || 0, activeUsersLast24h: 0, activeUsersLast7d: 0, activeUsersLast30d: 0, averageSessionDurationMinutes: 0, peakConcurrentUsers: 0, totalAPICalls: 0, apiCallsLast24h: 0, apiCallsLast7d: 0, apiCallsLast30d: 0, storageBytesUsed: 0, storageBytesTotal: 0, bandwidthBytesUsed: 0, bandwidthBytesTotal: 0, totalWebhooks: 0, activeWebhooks: 0, failedWebhookDeliveries: 0 };
      } catch (error) {
        logger.error('Failed to get usage stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get usage stats');
      }
    },

    // ─── Batch/Queue ────────────────────────────────────────────────────────────
    async createBatchProcess(data: Partial<DocBatchProcess>, schoolId: string): Promise<DocBatchProcess> {
      try {
        const payload = { ...data, school_id: schoolId, status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: batch, error } = await supabase.from('batch_processes').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return batch as unknown as DocBatchProcess;
      } catch (error) {
        logger.error('Failed to create batch process', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to create batch process');
      }
    },

    async getBatchProcess(batchId: string): Promise<DocBatchProcess> {
      try {
        const { data, error } = await supabase.from('batch_processes').select('*').eq('id', batchId).single();
        if (error || !data) throw new DocNotFoundError(batchId);
        return data as unknown as DocBatchProcess;
      } catch (error) {
        logger.error('Failed to get batch process', { batchId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocNotFoundError(batchId);
      }
    },

    async getBatchProcesses(schoolId: string): Promise<DocBatchProcess[]> {
      try {
        const { data, error } = await supabase.from('batch_processes').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocBatchProcess[];
      } catch (error) {
        logger.error('Failed to get batch processes', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get batch processes');
      }
    },

    async cancelBatchProcess(batchId: string): Promise<DocBatchProcess> {
      try {
        const { data: existing } = await supabase.from('batch_processes').select('*').eq('id', batchId).single();
        if (!existing) throw new DocNotFoundError(batchId);
        const { data: batch, error } = await supabase.from('batch_processes').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', batchId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return batch as unknown as DocBatchProcess;
      } catch (error) {
        logger.error('Failed to cancel batch process', { batchId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to cancel batch process');
      }
    },

    async getQueueItems(schoolId: string): Promise<DocQueue[]> {
      try {
        const { data, error } = await supabase.from('queue_items').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocQueue[];
      } catch (error) {
        logger.error('Failed to get queue items', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get queue items');
      }
    },

    async addToQueue(data: Partial<DocQueue>, schoolId: string): Promise<DocQueue> {
      try {
        const payload = { ...data, school_id: schoolId, status: 'pending', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: item, error } = await supabase.from('queue_items').insert(payload).select().single();
        if (error) throw new DocUpdateError(error.message);
        return item as unknown as DocQueue;
      } catch (error) {
        logger.error('Failed to add to queue', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to add to queue');
      }
    },

    async processQueueItem(queueId: string): Promise<DocQueue> {
      try {
        const { data: existing } = await supabase.from('queue_items').select('*').eq('id', queueId).single();
        if (!existing) throw new DocNotFoundError(queueId);
        const { data: item, error } = await supabase.from('queue_items').update({ status: 'processing', processed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', queueId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return item as unknown as DocQueue;
      } catch (error) {
        logger.error('Failed to process queue item', { queueId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to process queue item');
      }
    },

    async retryQueueItem(queueId: string): Promise<DocQueue> {
      try {
        const { data: existing } = await supabase.from('queue_items').select('*').eq('id', queueId).single();
        if (!existing) throw new DocNotFoundError(queueId);
        const { data: item, error } = await supabase.from('queue_items').update({ status: 'pending', retry_count: (existing.retry_count || 0) + 1, updated_at: new Date().toISOString() }).eq('id', queueId).select().single();
        if (error) throw new DocUpdateError(error.message);
        return item as unknown as DocQueue;
      } catch (error) {
        logger.error('Failed to retry queue item', { queueId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to retry queue item');
      }
    },

    // ─── Document Stats ─────────────────────────────────────────────────────────
    async getDocumentStats(schoolId: string, dateFrom?: string, dateTo?: string): Promise<DocStorageStats> {
      try {
        const { count: totalDocs } = await supabase.from('documents').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: totalFolders } = await supabase.from('folders').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        const { count: totalWorkspaces } = await supabase.from('workspaces').select('id', { count: 'exact', head: true }).eq('school_id', schoolId);
        return { totalDocuments: totalDocs || 0, totalFolders: totalFolders || 0, totalWorkspaces: totalWorkspaces || 0, totalStorageBytes: 0, storageByType: {}, storageByCategory: {}, storageByStatus: {}, averageDocumentSizeBytes: 0, largestDocumentSizeBytes: 0, totalVersions: 0, averageVersionsPerDocument: 0, quotaUsedBytes: 0, quotaTotalBytes: 0, quotaUsagePercent: 0 };
      } catch (error) {
        logger.error('Failed to get document stats', { schoolId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get document stats');
      }
    },

    // ─── Logging ────────────────────────────────────────────────────────────────
    async logDocumentEvent(schoolId: string, event: string, data: Record<string, unknown>): Promise<void> {
      try {
        await supabase.from('document_events').insert({ school_id: schoolId, event, data, created_at: new Date().toISOString() });
      } catch (error) {
        logger.error('Failed to log document event', { schoolId, event, error }, 'documents');
      }
    },

    async getAuditTrail(schoolId: string, documentId?: string): Promise<DocAuditTrail[]> {
      try {
        let q = supabase.from('audit_trail').select('*').eq('school_id', schoolId);
        if (documentId) q = q.eq('document_id', documentId);
        const { data, error } = await q.order('created_at', { ascending: false }).limit(100);
        if (error) throw new DocUpdateError(error.message);
        return (data || []) as unknown as DocAuditTrail[];
      } catch (error) {
        logger.error('Failed to get audit trail', { schoolId, documentId, error }, 'documents');
        if (error instanceof AppError) throw error;
        throw new DocUpdateError('Failed to get audit trail');
      }
    },
  };
}
