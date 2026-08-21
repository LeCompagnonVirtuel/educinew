// Intelligence Platform Service - DocumentAnalysis
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DocumentAnalysis, DocumentAnalysisCreate } from '@educi/types';
import { IntDocumentAnalysisNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntDocumentAnalysisService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getDocumentAnalysis(schoolId: string, id: string): Promise<DocumentAnalysis> {
    const item = await this.repo.getDocumentAnalysis(id, schoolId);
    if (!item) throw new IntDocumentAnalysisNotFoundError(id);
    return item;
  }
  async listDocumentAnalyses(schoolId: string, filters?: Record<string, unknown>): Promise<DocumentAnalysis[]> {
    return this.repo.listDocumentAnalyses(schoolId, filters);
  }
  async createDocumentAnalysis(schoolId: string, data: DocumentAnalysisCreate): Promise<DocumentAnalysis> {
    return this.repo.createDocumentAnalysis({ ...data, school_id: schoolId });
  }
  async updateDocumentAnalysis(schoolId: string, id: string, data: Partial<DocumentAnalysisCreate>): Promise<DocumentAnalysis> {
    const existing = await this.repo.getDocumentAnalysis(id, schoolId);
    if (!existing) throw new IntDocumentAnalysisNotFoundError(id);
    return this.repo.updateDocumentAnalysis(id, schoolId, data);
  }
  async deleteDocumentAnalysis(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDocumentAnalysis(id, schoolId);
    if (!existing) throw new IntDocumentAnalysisNotFoundError(id);
    return this.repo.deleteDocumentAnalysis(id, schoolId);
  }
}
