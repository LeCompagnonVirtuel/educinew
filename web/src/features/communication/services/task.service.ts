import type { CommunicationRepositoryExtended, Task } from '@/features/communication/types';
import {
  CommTaskNotFoundError,
  CommTaskAccessDeniedError,
  CommTaskAlreadyCompletedError,
  CommTaskDeadlineError,
  CommTaskDependencyError,
  CommTaskChecklistError,
  CommTaskAssigneeError,
  CommTaskPermissionError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createTaskService(repository: CommunicationRepositoryExtended) {
  return {
    async getTasks(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching tasks', { schoolId, userId }, 'TaskService');

        const tasks = await repository.getTasks(schoolId, userId, filters);

        logger.info('Tasks fetched', { schoolId, count: tasks.length }, 'TaskService');

        return tasks;
      } catch (error) {
        logger.error('Failed to fetch tasks', { schoolId }, 'TaskService');
        throw error;
      }
    },

    async getTask(taskId: string, userId: string) {
      try {
        if (!taskId) throw new Error('taskId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching task', { taskId, userId }, 'TaskService');

        const task = await repository.getTask(taskId);
        if (!task) throw new CommTaskNotFoundError(taskId);

        return task;
      } catch (error) {
        logger.error('Failed to fetch task', { taskId }, 'TaskService');
        throw error;
      }
    },

    async createTask(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.title) throw new Error('task title is required');
        if (data.deadline && new Date(data.deadline) < new Date()) {
          throw new CommTaskDeadlineError();
        }

        logger.info('Creating task', { schoolId, userId, title: data.title }, 'TaskService');

        const task = await repository.createTask({
          ...data,
          schoolId,
          createdBy: userId,
          status: data.status || 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'task.created', { taskId: task.id, userId });

        logger.info('Task created', { taskId: task.id }, 'TaskService');

        return task;
      } catch (error) {
        logger.error('Failed to create task', { schoolId }, 'TaskService');
        throw error;
      }
    },

    async updateTask(taskId: string, userId: string, data: any) {
      try {
        if (!taskId) throw new Error('taskId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating task', { taskId, userId }, 'TaskService');

        const existing = await repository.getTask(taskId);
        if (!existing) throw new CommTaskNotFoundError(taskId);

        if (data.status === 'completed' && (existing as any).status === 'completed') {
          throw new CommTaskAlreadyCompletedError(taskId);
        }

        const updated = await repository.updateTask(taskId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'task.updated', { taskId, userId });

        logger.info('Task updated', { taskId }, 'TaskService');

        return updated;
      } catch (error) {
        logger.error('Failed to update task', { taskId }, 'TaskService');
        throw error;
      }
    },

    async deleteTask(taskId: string, userId: string) {
      try {
        if (!taskId) throw new Error('taskId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting task', { taskId, userId }, 'TaskService');

        const existing = await repository.getTask(taskId);
        if (!existing) throw new CommTaskNotFoundError(taskId);

        await repository.deleteTask(taskId);

        await repository.logCommunicationEvent((existing as any).schoolId, 'task.deleted', { taskId, userId });

        logger.info('Task deleted', { taskId }, 'TaskService');
      } catch (error) {
        logger.error('Failed to delete task', { taskId }, 'TaskService');
        throw error;
      }
    },

    async assignTask(taskId: string, userId: string, assigneeId: string) {
      try {
        if (!taskId) throw new Error('taskId is required');
        if (!userId) throw new Error('userId is required');
        if (!assigneeId) throw new Error('assigneeId is required');

        logger.info('Assigning task', { taskId, userId, assigneeId }, 'TaskService');

        const task = await repository.getTask(taskId);
        if (!task) throw new CommTaskNotFoundError(taskId);

        const updated = await repository.updateTask(taskId, {
          assignees: [
            ...((task as any).assignees || []),
            { userId: assigneeId, assignedAt: new Date().toISOString(), assignedBy: userId },
          ],
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((task as any).schoolId, 'task.assigned', {
          taskId,
          userId,
          assigneeId,
        });

        logger.info('Task assigned', { taskId, assigneeId }, 'TaskService');

        return updated;
      } catch (error) {
        logger.error('Failed to assign task', { taskId }, 'TaskService');
        throw error;
      }
    },

    async addTaskComment(taskId: string, userId: string, content: string) {
      try {
        if (!taskId) throw new Error('taskId is required');
        if (!userId) throw new Error('userId is required');
        if (!content || content.trim().length === 0) throw new Error('comment content is required');

        logger.info('Adding task comment', { taskId, userId }, 'TaskService');

        const task = await repository.getTask(taskId);
        if (!task) throw new CommTaskNotFoundError(taskId);

        const comment = await repository.addTaskComment(taskId, {
          userId,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((task as any).schoolId, 'task.comment_added', {
          taskId,
          userId,
        });

        logger.info('Task comment added', { taskId }, 'TaskService');

        return comment;
      } catch (error) {
        logger.error('Failed to add task comment', { taskId }, 'TaskService');
        throw error;
      }
    },

    async toggleTaskChecklist(taskId: string, userId: string, checklistId: string, completed: boolean) {
      try {
        if (!taskId) throw new Error('taskId is required');
        if (!userId) throw new Error('userId is required');
        if (!checklistId) throw new Error('checklistId is required');

        logger.info('Toggling task checklist', { taskId, userId, checklistId, completed }, 'TaskService');

        const task = await repository.getTask(taskId);
        if (!task) throw new CommTaskNotFoundError(taskId);

        const updated = await repository.updateTask(taskId, {
          checklist: ((task as any).checklist || []).map((item: any) =>
            item.id === checklistId ? { ...item, completed, completedAt: completed ? new Date().toISOString() : null } : item
          ),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Task checklist toggled', { taskId, checklistId, completed }, 'TaskService');

        return updated;
      } catch (error) {
        logger.error('Failed to toggle task checklist', { taskId }, 'TaskService');
        throw error;
      }
    },

    async getTaskStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching task stats', { schoolId, dateFrom, dateTo }, 'TaskService');

        const stats = await repository.getTaskStats(schoolId, dateFrom, dateTo);

        logger.info('Task stats fetched', { schoolId }, 'TaskService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch task stats', { schoolId }, 'TaskService');
        throw error;
      }
    },

    async getOverdueTasks(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching overdue tasks', { schoolId, userId }, 'TaskService');

        const tasks = await repository.getTasks(schoolId, userId, {
          deadlineBefore: new Date().toISOString(),
          status: 'pending',
        });

        logger.info('Overdue tasks fetched', { schoolId, count: tasks.length }, 'TaskService');

        return tasks;
      } catch (error) {
        logger.error('Failed to fetch overdue tasks', { schoolId }, 'TaskService');
        throw error;
      }
    },
  };
}
