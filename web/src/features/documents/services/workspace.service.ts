import type { DocumentRepositoryEnterprise } from '@/features/documents/types';
import {
  DocWorkspaceNotFoundError,
  DocWorkspaceCreateError,
  DocWorkspaceUpdateError,
  DocWorkspaceDeleteError,
  DocWorkspaceAccessError,
  DocWorkspaceQuotaError,
  DocWorkspaceMemberError,
  DocWorkspaceLimitError,
  DocValidationError,
  DocForbiddenError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createWorkspaceService(repository: DocumentRepositoryEnterprise) {
  return {
    async getWorkspaces(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workspaces', { schoolId, userId }, 'WorkspaceService');

        const workspaces = await repository.getWorkspaces(schoolId);

        logger.info('Workspaces fetched successfully', { schoolId, count: workspaces.length }, 'WorkspaceService');

        return workspaces;
      } catch (error) {
        logger.error('Failed to fetch workspaces', { schoolId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async getWorkspace(workspaceId: string, userId: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workspace', { workspaceId, userId }, 'WorkspaceService');

        const workspace = await repository.getWorkspace(workspaceId);
        if (!workspace) throw new DocWorkspaceNotFoundError(workspaceId);

        return workspace;
      } catch (error) {
        logger.error('Failed to fetch workspace', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async createWorkspace(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data || !data.name) throw new DocValidationError('workspace name is required');

        logger.info('Creating workspace', { schoolId, userId, name: data.name }, 'WorkspaceService');

        const workspace = await repository.createWorkspace(
          { ...data, createdBy: userId } as any,
          schoolId
        );

        logger.info('Workspace created successfully', { workspaceId: workspace.id }, 'WorkspaceService');

        return workspace;
      } catch (error) {
        logger.error('Failed to create workspace', { schoolId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async updateWorkspace(workspaceId: string, userId: string, data: Record<string, unknown>) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!data) throw new DocValidationError('update data is required');

        logger.info('Updating workspace', { workspaceId, userId }, 'WorkspaceService');

        const existing = await repository.getWorkspace(workspaceId);
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);

        const updated = await repository.updateWorkspace(workspaceId, data as any);

        logger.info('Workspace updated successfully', { workspaceId }, 'WorkspaceService');

        return updated;
      } catch (error) {
        logger.error('Failed to update workspace', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async deleteWorkspace(workspaceId: string, userId: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Deleting workspace', { workspaceId, userId }, 'WorkspaceService');

        const existing = await repository.getWorkspace(workspaceId);
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);

        await repository.deleteWorkspace(workspaceId);

        logger.info('Workspace deleted successfully', { workspaceId }, 'WorkspaceService');
      } catch (error) {
        logger.error('Failed to delete workspace', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async getWorkspaceMembers(workspaceId: string, userId: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workspace members', { workspaceId, userId }, 'WorkspaceService');

        const members = await repository.getWorkspaceMembers(workspaceId);

        logger.info('Workspace members fetched', { workspaceId, count: members.length }, 'WorkspaceService');

        return members;
      } catch (error) {
        logger.error('Failed to fetch workspace members', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async addWorkspaceMember(workspaceId: string, userId: string, memberId: string, role?: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!memberId) throw new DocValidationError('memberId is required');

        logger.info('Adding workspace member', { workspaceId, userId, memberId, role }, 'WorkspaceService');

        const existing = await repository.getWorkspace(workspaceId);
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);

        const member = await repository.addWorkspaceMember(workspaceId, memberId, role);

        logger.info('Workspace member added', { workspaceId, memberId }, 'WorkspaceService');

        return member;
      } catch (error) {
        logger.error('Failed to add workspace member', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async removeWorkspaceMember(workspaceId: string, userId: string, memberId: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!memberId) throw new DocValidationError('memberId is required');

        logger.info('Removing workspace member', { workspaceId, userId, memberId }, 'WorkspaceService');

        const existing = await repository.getWorkspace(workspaceId);
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);

        await repository.removeWorkspaceMember(workspaceId, memberId);

        logger.info('Workspace member removed', { workspaceId, memberId }, 'WorkspaceService');
      } catch (error) {
        logger.error('Failed to remove workspace member', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async updateWorkspaceMemberRole(workspaceId: string, userId: string, memberId: string, role: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!memberId) throw new DocValidationError('memberId is required');
        if (!role) throw new DocValidationError('role is required');

        logger.info('Updating workspace member role', { workspaceId, userId, memberId, role }, 'WorkspaceService');

        const existing = await repository.getWorkspace(workspaceId);
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);

        const member = await repository.updateWorkspaceMemberRole(workspaceId, memberId, role);

        logger.info('Workspace member role updated', { workspaceId, memberId, role }, 'WorkspaceService');

        return member;
      } catch (error) {
        logger.error('Failed to update workspace member role', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async getWorkspaceSettings(workspaceId: string, userId: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workspace settings', { workspaceId, userId }, 'WorkspaceService');

        const workspace = await repository.getWorkspace(workspaceId);
        if (!workspace) throw new DocWorkspaceNotFoundError(workspaceId);

        return (workspace as any).settings || {};
      } catch (error) {
        logger.error('Failed to fetch workspace settings', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async updateWorkspaceSettings(workspaceId: string, userId: string, settings: Record<string, unknown>) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');
        if (!settings) throw new DocValidationError('settings are required');

        logger.info('Updating workspace settings', { workspaceId, userId }, 'WorkspaceService');

        const existing = await repository.getWorkspace(workspaceId);
        if (!existing) throw new DocWorkspaceNotFoundError(workspaceId);

        const updated = await repository.updateWorkspace(workspaceId, { settings } as any);

        logger.info('Workspace settings updated', { workspaceId }, 'WorkspaceService');

        return updated;
      } catch (error) {
        logger.error('Failed to update workspace settings', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async getWorkspaceStats(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new DocValidationError('schoolId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workspace stats', { schoolId, userId }, 'WorkspaceService');

        const workspaces = await repository.getWorkspaces(schoolId);
        const stats = {
          totalWorkspaces: workspaces.length,
          totalMembers: workspaces.reduce((sum: number, w: any) => sum + (w.memberCount || 0), 0),
          averageDocumentsPerWorkspace: 0,
        };

        logger.info('Workspace stats fetched', { schoolId }, 'WorkspaceService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch workspace stats', { schoolId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async getWorkspaceDocuments(workspaceId: string, userId: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workspace documents', { workspaceId, userId }, 'WorkspaceService');

        const workspace = await repository.getWorkspace(workspaceId);
        if (!workspace) throw new DocWorkspaceNotFoundError(workspaceId);

        const documents = await repository.getDocumentsByFolder(workspaceId, '');

        logger.info('Workspace documents fetched', { workspaceId, count: documents.length }, 'WorkspaceService');

        return documents;
      } catch (error) {
        logger.error('Failed to fetch workspace documents', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },

    async getWorkspaceFolders(workspaceId: string, userId: string) {
      try {
        if (!workspaceId) throw new DocValidationError('workspaceId is required');
        if (!userId) throw new DocValidationError('userId is required');

        logger.info('Fetching workspace folders', { workspaceId, userId }, 'WorkspaceService');

        const workspace = await repository.getWorkspace(workspaceId);
        if (!workspace) throw new DocWorkspaceNotFoundError(workspaceId);

        const folders = await repository.getFolders(workspaceId);

        logger.info('Workspace folders fetched', { workspaceId, count: folders.length }, 'WorkspaceService');

        return folders;
      } catch (error) {
        logger.error('Failed to fetch workspace folders', { workspaceId, error }, 'WorkspaceService');
        throw error;
      }
    },
  };
}
