import { SupabaseClient } from '@supabase/supabase-js';
import { createGewlp1Repository, Gewlp1Repository } from './gewlp-1-skills.repository';
import { createGewlp2Repository, Gewlp2Repository } from './gewlp-2-employment.repository';
import { createGewlp3Repository, Gewlp3Repository } from './gewlp-3-career.repository';
import { createGewlp4Repository, Gewlp4Repository } from './gewlp-4-lifelong.repository';
import { createGewlp5Repository, Gewlp5Repository } from './gewlp-5-corporate.repository';
import { createGewlp6Repository, Gewlp6Repository } from './gewlp-6-talent.repository';
import { createGewlp7Repository, Gewlp7Repository } from './gewlp-7-credentials.repository';
import { createGewlp8Repository, Gewlp8Repository } from './gewlp-8-workforce-analytics.repository';
import { createGewlp9Repository, Gewlp9Repository } from './gewlp-9-edu-employment.repository';
import { createGewlp10Repository, Gewlp10Repository } from './gewlp-10-person-twin.repository';
import { createGewlp11Repository, Gewlp11Repository } from './gewlp-11-finance.repository';
import { createGewlp12Repository, Gewlp12Repository } from './gewlp-12-ai-orchestrator.repository';

// ═══════════════════════════════════════════════════════════════════════
// GEWLP Aggregated Repository — All 12 Modules Combined
// ═══════════════════════════════════════════════════════════════════════

export interface GewlpRepository {
  gewlp1: Gewlp1Repository;
  gewlp2: Gewlp2Repository;
  gewlp3: Gewlp3Repository;
  gewlp4: Gewlp4Repository;
  gewlp5: Gewlp5Repository;
  gewlp6: Gewlp6Repository;
  gewlp7: Gewlp7Repository;
  gewlp8: Gewlp8Repository;
  gewlp9: Gewlp9Repository;
  gewlp10: Gewlp10Repository;
  gewlp11: Gewlp11Repository;
  gewlp12: Gewlp12Repository;
}

export function createGewlpRepository(supabase: SupabaseClient): GewlpRepository {
  return {
    gewlp1: createGewlp1Repository(supabase),
    gewlp2: createGewlp2Repository(supabase),
    gewlp3: createGewlp3Repository(supabase),
    gewlp4: createGewlp4Repository(supabase),
    gewlp5: createGewlp5Repository(supabase),
    gewlp6: createGewlp6Repository(supabase),
    gewlp7: createGewlp7Repository(supabase),
    gewlp8: createGewlp8Repository(supabase),
    gewlp9: createGewlp9Repository(supabase),
    gewlp10: createGewlp10Repository(supabase),
    gewlp11: createGewlp11Repository(supabase),
    gewlp12: createGewlp12Repository(supabase),
  };
}

export type {
  Gewlp1Repository,
  Gewlp2Repository,
  Gewlp3Repository,
  Gewlp4Repository,
  Gewlp5Repository,
  Gewlp6Repository,
  Gewlp7Repository,
  Gewlp8Repository,
  Gewlp9Repository,
  Gewlp10Repository,
  Gewlp11Repository,
  Gewlp12Repository,
};
