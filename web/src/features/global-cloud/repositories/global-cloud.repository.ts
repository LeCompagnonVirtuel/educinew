import { SupabaseClient } from '@supabase/supabase-js';
import { createCloudModuleRepository, CloudModuleRepository } from './global-cloud-1-cloud.repository';
import { createTwinModuleRepository, TwinModuleRepository } from './global-cloud-2-twin.repository';
import { createSimulationModuleRepository, SimulationModuleRepository } from './global-cloud-3-simulation.repository';
import { createKnowledgeModuleRepository, KnowledgeModuleRepository } from './global-cloud-4-knowledge.repository';
import { createInteropModuleRepository, InteropModuleRepository } from './global-cloud-5-interop.repository';
import { createGovernmentModuleRepository, GovernmentModuleRepository } from './global-cloud-6-government.repository';
import { createExecutiveModuleRepository, ExecutiveModuleRepository } from './global-cloud-7-executive.repository';
import { createSearchModuleRepository, SearchModuleRepository } from './global-cloud-8-search.repository';
import { createNotifyModuleRepository, NotifyModuleRepository } from './global-cloud-9-notify.repository';
import { createGreenModuleRepository, GreenModuleRepository } from './global-cloud-10-green.repository';
import { createObserveModuleRepository, ObserveModuleRepository } from './global-cloud-11-observe.repository';
import { createAIOpsModuleRepository, AIOpsModuleRepository } from './global-cloud-12-aiops.repository';
import { createComplianceModuleRepository, ComplianceModuleRepository } from './global-cloud-13-compliance.repository';

export type {
  CloudModuleRepository,
  TwinModuleRepository,
  SimulationModuleRepository,
  KnowledgeModuleRepository,
  InteropModuleRepository,
  GovernmentModuleRepository,
  ExecutiveModuleRepository,
  SearchModuleRepository,
  NotifyModuleRepository,
  GreenModuleRepository,
  ObserveModuleRepository,
  AIOpsModuleRepository,
  ComplianceModuleRepository,
};

export interface GlobalCloudRepository
  extends CloudModuleRepository,
    TwinModuleRepository,
    SimulationModuleRepository,
    KnowledgeModuleRepository,
    InteropModuleRepository,
    GovernmentModuleRepository,
    ExecutiveModuleRepository,
    SearchModuleRepository,
    NotifyModuleRepository,
    GreenModuleRepository,
    ObserveModuleRepository,
    AIOpsModuleRepository,
    ComplianceModuleRepository {}

export function createGlobalCloudRepository(supabase: SupabaseClient): GlobalCloudRepository {
  const cloud = createCloudModuleRepository(supabase);
  const twin = createTwinModuleRepository(supabase);
  const simulation = createSimulationModuleRepository(supabase);
  const knowledge = createKnowledgeModuleRepository(supabase);
  const interop = createInteropModuleRepository(supabase);
  const government = createGovernmentModuleRepository(supabase);
  const executive = createExecutiveModuleRepository(supabase);
  const search = createSearchModuleRepository(supabase);
  const notify = createNotifyModuleRepository(supabase);
  const green = createGreenModuleRepository(supabase);
  const observe = createObserveModuleRepository(supabase);
  const aiops = createAIOpsModuleRepository(supabase);
  const compliance = createComplianceModuleRepository(supabase);

  return Object.assign(
    {},
    cloud,
    twin,
    simulation,
    knowledge,
    interop,
    government,
    executive,
    search,
    notify,
    green,
    observe,
    aiops,
    compliance,
  ) as GlobalCloudRepository;
}