import { supabase } from '@educi/config';
import type {
  GeaesipWorkflow,
  GeaesipWorkflowTask,
  GeaesipActionPlan,
  GeaesipExecutionLog,
} from '@educi/types';

export class GeaesipWorkflowRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_workflow')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des workflows: ${error.message}`);
    return data as GeaesipWorkflow[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_workflow')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Workflow ${id} introuvable: ${error.message}`);
    return data as GeaesipWorkflow;
  }

  async create(data: Omit<GeaesipWorkflow, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now };

    const { data: result, error } = await this.client
      .from('geaesip_workflow')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du workflow: ${error.message}`);
    return result as GeaesipWorkflow;
  }

  async update(id: string, data: Partial<Omit<GeaesipWorkflow, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_workflow')
      .update({ ...data, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du workflow: ${error.message}`);
    return result as GeaesipWorkflow;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_workflow')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du workflow: ${error.message}`);
  }
}

export class GeaesipWorkflowTaskRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_workflow_task')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des taches: ${error.message}`);
    return data as GeaesipWorkflowTask[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_workflow_task')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Tache ${id} introuvable: ${error.message}`);
    return data as GeaesipWorkflowTask;
  }

  async create(data: Omit<GeaesipWorkflowTask, 'id' | 'createdAt' | 'completedAt' | 'result' | 'retries'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString(), completedAt: null, result: null, retries: 0 };

    const { data: result, error } = await this.client
      .from('geaesip_workflow_task')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation de la tache: ${error.message}`);
    return result as GeaesipWorkflowTask;
  }

  async update(id: string, data: Partial<Omit<GeaesipWorkflowTask, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_workflow_task')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour de la tache: ${error.message}`);
    return result as GeaesipWorkflowTask;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_workflow_task')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression de la tache: ${error.message}`);
  }
}

export class GeaesipActionPlanRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_action_plan')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des plans d'action: ${error.message}`);
    return data as GeaesipActionPlan[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_action_plan')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Plan d'action ${id} introuvable: ${error.message}`);
    return data as GeaesipActionPlan;
  }

  async create(data: Omit<GeaesipActionPlan, 'id' | 'createdAt'>) {
    const entity = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_action_plan')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du plan d'action: ${error.message}`);
    return result as GeaesipActionPlan;
  }

  async update(id: string, data: Partial<Omit<GeaesipActionPlan, 'id' | 'createdAt'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_action_plan')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du plan d'action: ${error.message}`);
    return result as GeaesipActionPlan;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_action_plan')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du plan d'action: ${error.message}`);
  }
}

export class GeaesipExecutionLogRepository {
  private get client() { return supabase; }

  async findAllBySchool(schoolId: string) {
    const { data, error } = await this.client
      .from('geaesip_execution_log')
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erreur lors de la recuperation des logs d'execution: ${error.message}`);
    return data as GeaesipExecutionLog[];
  }

  async findById(id: string) {
    const { data, error } = await this.client
      .from('geaesip_execution_log')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();

    if (error) throw new Error(`Log d'execution ${id} introuvable: ${error.message}`);
    return data as GeaesipExecutionLog;
  }

  async create(data: Omit<GeaesipExecutionLog, 'id' | 'timestamp'>) {
    const entity = { ...data, id: crypto.randomUUID(), timestamp: new Date().toISOString() };

    const { data: result, error } = await this.client
      .from('geaesip_execution_log')
      .insert(entity)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la creation du log d'execution: ${error.message}`);
    return result as GeaesipExecutionLog;
  }

  async update(id: string, data: Partial<Omit<GeaesipExecutionLog, 'id' | 'timestamp'>>) {
    const { data: result, error } = await this.client
      .from('geaesip_execution_log')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Erreur lors de la mise a jour du log d'execution: ${error.message}`);
    return result as GeaesipExecutionLog;
  }

  async delete(id: string) {
    const { error } = await this.client
      .from('geaesip_execution_log')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw new Error(`Erreur lors de la suppression du log d'execution: ${error.message}`);
  }
}
