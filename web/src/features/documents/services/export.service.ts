import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocExportError,
  DocExportFormatError,
  DocImportError,
  DocImportFormatError,
  DocImportFailedError,
  DocImportDuplicateError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createExportService(repository: DocumentRepositoryEnterprise) {
  return {
    async exportDocument(documentId: string, schoolId: string, userId: string, format: string) {
      try {
        if (!documentId) throw new DocValidationError('documentId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!format) throw new DocValidationError('format is required');

        logger.info('Exporting document', { documentId, schoolId, userId, format }, 'ExportService');

        const result = await repository.exportDocuments([documentId], schoolId, format);

        logger.info('Document exported successfully', { documentId, jobId: result.id }, 'ExportService');

        return result;
      } catch (error) {
        logger.error('Failed to export document', { documentId, schoolId, format, error }, 'ExportService');
        throw error;
      }
    },

    async exportDocuments(documentIds: string[], schoolId: string, userId: string, format: string) {
      try {
        if (!documentIds || documentIds.length === 0) throw new DocValidationError('documentIds are required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!format) throw new DocValidationError('format is required');

        logger.info('Exporting documents', { count: documentIds.length, schoolId, userId, format }, 'ExportService');

        const result = await repository.exportDocuments(documentIds, schoolId, format);

        logger.info('Documents exported successfully', { count: documentIds.length, jobId: result.id }, 'ExportService');

        return result;
      } catch (error) {
        logger.error('Failed to export documents', { documentIds, schoolId, format, error }, 'ExportService');
        throw error;
      }
    },

    async exportFolder(folderId: string, schoolId: string, userId: string, format: string) {
      try {
        if (!folderId) throw new DocValidationError('folderId is required');
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!format) throw new DocValidationError('format is required');

        logger.info('Exporting folder', { folderId, schoolId, userId, format }, 'ExportService');

        const documents = await repository.getDocumentsByFolder(schoolId, folderId);
        const documentIds = documents.map((d: any) => d.id);

        const result = await repository.exportDocuments(documentIds, schoolId, format);

        logger.info('Folder exported successfully', { folderId, count: documentIds.length, jobId: result.id }, 'ExportService');

        return result;
      } catch (error) {
        logger.error('Failed to export folder', { folderId, schoolId, format, error }, 'ExportService');
        throw error;
      }
    },

    async getExportFormats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching export formats', { schoolId, userId }, 'ExportService');

        const formats = [
          { extension: 'pdf', name: 'PDF', mimeType: 'application/pdf' },
          { extension: 'docx', name: 'Word Document', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
          { extension: 'xlsx', name: 'Excel Spreadsheet', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
          { extension: 'pptx', name: 'PowerPoint', mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
          { extension: 'zip', name: 'ZIP Archive', mimeType: 'application/zip' },
          { extension: 'csv', name: 'CSV', mimeType: 'text/csv' },
          { extension: 'txt', name: 'Plain Text', mimeType: 'text/plain' },
        ];

        logger.info('Export formats fetched', { schoolId, count: formats.length }, 'ExportService');

        return formats;
      } catch (error) {
        logger.error('Failed to fetch export formats', { schoolId, error }, 'ExportService');
        throw error;
      }
    },

    async getExportHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching export history', { schoolId, userId }, 'ExportService');

        const history = await repository.getExportHistory(schoolId);

        logger.info('Export history fetched', { schoolId, count: history.length }, 'ExportService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch export history', { schoolId, error }, 'ExportService');
        throw error;
      }
    },

    async getImportFormats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching import formats', { schoolId, userId }, 'ExportService');

        const formats = [
          { extension: 'pdf', name: 'PDF', mimeType: 'application/pdf' },
          { extension: 'docx', name: 'Word Document', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
          { extension: 'xlsx', name: 'Excel Spreadsheet', mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
          { extension: 'pptx', name: 'PowerPoint', mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
          { extension: 'zip', name: 'ZIP Archive', mimeType: 'application/zip' },
          { extension: 'csv', name: 'CSV', mimeType: 'text/csv' },
          { extension: 'txt', name: 'Plain Text', mimeType: 'text/plain' },
          { extension: 'png', name: 'PNG Image', mimeType: 'image/png' },
          { extension: 'jpg', name: 'JPEG Image', mimeType: 'image/jpeg' },
        ];

        logger.info('Import formats fetched', { schoolId, count: formats.length }, 'ExportService');

        return formats;
      } catch (error) {
        logger.error('Failed to fetch import formats', { schoolId, error }, 'ExportService');
        throw error;
      }
    },

    async importDocuments(schoolId: string, userId: string, files: Array<{ name: string; content: ArrayBuffer; mimeType: string }>, folderId?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!files || files.length === 0) throw new DocValidationError('files are required');

        logger.info('Importing documents', { schoolId, userId, fileCount: files.length }, 'ExportService');

        const result = await repository.importDocuments(schoolId, files, folderId);

        logger.info('Documents imported successfully', { schoolId, result }, 'ExportService');

        return result;
      } catch (error) {
        logger.error('Failed to import documents', { schoolId, error }, 'ExportService');
        throw error;
      }
    },

    async importFromURL(schoolId: string, userId: string, url: string, folderId?: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!url) throw new DocValidationError('url is required');

        logger.info('Importing from URL', { schoolId, userId, url }, 'ExportService');

        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const fileName = url.split('/').pop() || 'imported-file';
        const mimeType = response.headers.get('content-type') || 'application/octet-stream';

        const files = [{ name: fileName, content: arrayBuffer, mimeType }];
        const result = await repository.importDocuments(schoolId, files, folderId);

        logger.info('Import from URL completed', { schoolId, url }, 'ExportService');

        return result;
      } catch (error) {
        logger.error('Failed to import from URL', { schoolId, url, error }, 'ExportService');
        throw error;
      }
    },

    async getImportHistory(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching import history', { schoolId, userId }, 'ExportService');

        const history = await repository.getImportHistory(schoolId);

        logger.info('Import history fetched', { schoolId, count: history.length }, 'ExportService');

        return history;
      } catch (error) {
        logger.error('Failed to fetch import history', { schoolId, error }, 'ExportService');
        throw error;
      }
    },

    async getImportStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching import stats', { schoolId, userId }, 'ExportService');

        const history = await repository.getImportHistory(schoolId);
        const stats = {
          totalImports: history.length,
          completedImports: history.filter((h: any) => h.status === 'completed').length,
          failedImports: history.filter((h: any) => h.status === 'failed').length,
          totalFilesImported: history.reduce((sum: number, h: any) => sum + (h.fileCount || 0), 0),
        };

        logger.info('Import stats fetched', { schoolId }, 'ExportService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch import stats', { schoolId, error }, 'ExportService');
        throw error;
      }
    },
  };
}
