import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface DataLineage {
  id: string;
  school_id: string;
  lineage_code: string;
  name: string;
  description: string;
  source_system: string;
  source_table: string;
  source_columns: string[];
  target_system: string;
  target_table: string;
  target_columns: string[];
  transformation_type: 'direct' | 'aggregation' | 'join' | 'filter' | 'custom';
  transformation_logic?: string;
  schedule?: string;
  status: 'active' | 'inactive' | 'error';
  last_processed_at?: string;
  records_processed: number;
  error_count: number;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface LineageNode {
  id: string;
  type: 'source' | 'transformation' | 'target';
  name: string;
  system: string;
  table: string;
  columns: string[];
}

export interface LineageEdge {
  source_id: string;
  target_id: string;
  transformation_type: string;
  transformation_logic?: string;
}

export interface LineageGraph {
  nodes: LineageNode[];
  edges: LineageEdge[];
}

export interface CreateDataLineage {
  name: string;
  description: string;
  source_system: string;
  source_table: string;
  source_columns: string[];
  target_system: string;
  target_table: string;
  target_columns: string[];
  transformation_type: 'direct' | 'aggregation' | 'join' | 'filter' | 'custom';
  transformation_logic?: string;
  schedule?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateDataLineage {
  name?: string;
  description?: string;
  source_columns?: string[];
  target_columns?: string[];
  transformation_logic?: string;
  schedule?: string;
  status?: string;
  metadata?: Record<string, unknown>;
}

export class DataLineageService {
  private readonly TABLE = 'data_lineages';

  constructor(private supabase: SupabaseClient<Database>) {}

  async getAll(schoolId: string): Promise<DataLineage[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async getById(schoolId: string, id: string): Promise<DataLineage | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  }

  async create(schoolId: string, lineage: CreateDataLineage): Promise<DataLineage> {
    const lineageCode = `DL-${Date.now()}`;

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        lineage_code: lineageCode,
        ...lineage,
        status: 'active',
        records_processed: 0,
        error_count: 0,
        school_id: schoolId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(schoolId: string, id: string, lineage: UpdateDataLineage): Promise<DataLineage> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...lineage, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);

    if (error) throw error;
  }

  async recordProcessing(schoolId: string, id: string, recordsProcessed: number, errors: number): Promise<DataLineage> {
    const lineage = await this.getById(schoolId, id);
    if (!lineage) throw new Error('Lineage not found');

    return this.update(schoolId, id, {
      records_processed: lineage.records_processed + recordsProcessed,
      error_count: lineage.error_count + errors,
      last_processed_at: new Date().toISOString(),
      status: errors > 0 ? 'error' : 'active',
    });
  }

  async getGraph(schoolId: string): Promise<LineageGraph> {
    const lineages = await this.getAll(schoolId);
    const nodes: LineageNode[] = [];
    const edges: LineageEdge[] = [];
    const nodeMap = new Map<string, LineageNode>();

    for (const lineage of lineages) {
      const sourceKey = `${lineage.source_system}-${lineage.source_table}`;
      const targetKey = `${lineage.target_system}-${lineage.target_table}`;

      if (!nodeMap.has(sourceKey)) {
        const sourceNode: LineageNode = {
          id: `source-${sourceKey}`,
          type: 'source',
          name: lineage.source_table,
          system: lineage.source_system,
          table: lineage.source_table,
          columns: lineage.source_columns,
        };
        nodeMap.set(sourceKey, sourceNode);
        nodes.push(sourceNode);
      }

      if (!nodeMap.has(targetKey)) {
        const targetNode: LineageNode = {
          id: `target-${targetKey}`,
          type: 'target',
          name: lineage.target_table,
          system: lineage.target_system,
          table: lineage.target_table,
          columns: lineage.target_columns,
        };
        nodeMap.set(targetKey, targetNode);
        nodes.push(targetNode);
      }

      edges.push({
        source_id: `source-${sourceKey}`,
        target_id: `target-${targetKey}`,
        transformation_type: lineage.transformation_type,
        transformation_logic: lineage.transformation_logic,
      });
    }

    return { nodes, edges };
  }

  async getBySourceTable(schoolId: string, sourceSystem: string, sourceTable: string): Promise<DataLineage[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('source_system', sourceSystem)
      .eq('source_table', sourceTable)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getByTargetTable(schoolId: string, targetSystem: string, targetTable: string): Promise<DataLineage[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_system', targetSystem)
      .eq('target_table', targetTable)
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getActive(schoolId: string): Promise<DataLineage[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getWithErrors(schoolId: string): Promise<DataLineage[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'error')
      .is('deleted_at', null);

    if (error) throw error;
    return data || [];
  }

  async getImpactAnalysis(schoolId: string, sourceSystem: string, sourceTable: string): Promise<DataLineage[]> {
    const downstream: DataLineage[] = [];
    const queue = [{ system: sourceSystem, table: sourceTable }];

    while (queue.length > 0) {
      const current = queue.shift()!;
      const affected = await this.getBySourceTable(schoolId, current.system, current.table);
      downstream.push(...affected);

      for (const lineage of affected) {
        queue.push({ system: lineage.target_system, table: lineage.target_table });
      }
    }

    return downstream;
  }

  async getLineageStats(schoolId: string): Promise<{ total: number; active: number; withErrors: number; totalRecordsProcessed: number; totalErrors: number }> {
    const lineages = await this.getAll(schoolId);
    return {
      total: lineages.length,
      active: lineages.filter((l) => l.status === 'active').length,
      withErrors: lineages.filter((l) => l.status === 'error').length,
      totalRecordsProcessed: lineages.reduce((sum, l) => sum + l.records_processed, 0),
      totalErrors: lineages.reduce((sum, l) => sum + l.error_count, 0),
    };
  }
}
