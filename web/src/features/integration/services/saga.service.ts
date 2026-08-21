import type { EnterpriseIntegrationRepository } from '@/features/integration/types';
import { IntgSagaError } from '@educi/errors';
import { logger } from '@educi/logger';

export function createSagaService(repository: EnterpriseIntegrationRepository) {
  return {
    async getSaga(schoolId: string, userId: string, sagaId: string) {
      try {
        logger.info('Getting saga', { schoolId, userId, sagaId }, 'SagaService');
        const result = await repository.getSaga(schoolId, sagaId);
        return result;
      } catch (error) {
        logger.error('Failed to get saga', { schoolId, sagaId, error }, 'SagaService');
        throw error;
      }
    },

    async listSagas(schoolId: string, userId: string, filters: Record<string, unknown>) {
      try {
        logger.info('Listing sagas', { schoolId, userId }, 'SagaService');
        const result = await repository.listSagas(schoolId, filters);
        return result;
      } catch (error) {
        logger.error('Failed to list sagas', { schoolId, error }, 'SagaService');
        throw error;
      }
    },

    async createSaga(schoolId: string, userId: string, data: Record<string, unknown>) {
      try {
        logger.info('Creating saga', { schoolId, userId }, 'SagaService');
        const result = await repository.createSaga(schoolId, data);
        return result;
      } catch (error) {
        logger.error('Failed to create saga', { schoolId, error }, 'SagaService');
        throw error;
      }
    },

    async updateSaga(schoolId: string, userId: string, sagaId: string, data: Record<string, unknown>) {
      try {
        logger.info('Updating saga', { schoolId, userId, sagaId }, 'SagaService');
        const result = await repository.updateSaga(schoolId, sagaId, data);
        return result;
      } catch (error) {
        logger.error('Failed to update saga', { schoolId, sagaId, error }, 'SagaService');
        throw error;
      }
    },

    async deleteSaga(schoolId: string, userId: string, sagaId: string) {
      try {
        logger.info('Deleting saga', { schoolId, userId, sagaId }, 'SagaService');
        await repository.deleteSaga(schoolId, sagaId);
      } catch (error) {
        logger.error('Failed to delete saga', { schoolId, sagaId, error }, 'SagaService');
        throw error;
      }
    },

    async executeSaga(schoolId: string, userId: string, sagaId: string, params: Record<string, unknown>) {
      try {
        logger.info('Executing saga', { schoolId, userId, sagaId }, 'SagaService');
        const result = await repository.executeSaga(schoolId, sagaId, params);
        return result;
      } catch (error) {
        logger.error('Failed to execute saga', { schoolId, sagaId, error }, 'SagaService');
        throw error;
      }
    },

    async getSagaStatus(schoolId: string, userId: string, sagaId: string, executionId: string) {
      try {
        logger.info('Getting saga status', { schoolId, userId, sagaId, executionId }, 'SagaService');
        const result = await repository.getSagaStatus(schoolId, sagaId, executionId);
        return result;
      } catch (error) {
        logger.error('Failed to get saga status', { schoolId, sagaId, executionId, error }, 'SagaService');
        throw error;
      }
    },

    async compensateSaga(schoolId: string, userId: string, sagaId: string, executionId: string) {
      try {
        logger.info('Compensating saga', { schoolId, userId, sagaId, executionId }, 'SagaService');
        const result = await repository.compensateSaga(schoolId, sagaId, executionId);
        return result;
      } catch (error) {
        logger.error('Failed to compensate saga', { schoolId, sagaId, executionId, error }, 'SagaService');
        throw error;
      }
    },
  };
}