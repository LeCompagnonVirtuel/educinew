'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CopilotService } from '../services';
import type {
  GedkinCopilotQuery,
  GedkinCopilotConversation,
  GedkinCopilotApproval,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const COPILOT_QUERY_KEY = 'gedkin-copilot';

function createService(): CopilotService {
  return new CopilotService();
}

export function useCopilotQuery(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinCopilotQuery>>({
    queryKey: [COPILOT_QUERY_KEY, 'queries', schoolId, params, filters],
    queryFn: () => service.listQueries(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCopilotConversations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinCopilotConversation>>({
    queryKey: [COPILOT_QUERY_KEY, 'conversations', schoolId, params, filters],
    queryFn: () => service.listConversations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCopilotApprovals(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinCopilotApproval>>({
    queryKey: [COPILOT_QUERY_KEY, 'approvals', schoolId, params, filters],
    queryFn: () => service.listApprovals(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
