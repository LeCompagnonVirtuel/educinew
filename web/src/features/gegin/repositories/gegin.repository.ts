import { SupabaseClient } from '@supabase/supabase-js';
import { createGEGIN1Repository, GEGIN1Repository } from './gegin-1-governance.repository';
import { createGEGIN2Repository, GEGIN2Repository } from './gegin-2-organizations.repository';
import { createGEGIN3Repository, GEGIN3Repository } from './gegin-3-identity.repository';
import { createGEGIN4Repository, GEGIN4Repository } from './gegin-4-qualifications.repository';
import { createGEGIN5Repository, GEGIN5Repository } from './gegin-5-mobility.repository';
import { createGEGIN6Repository, GEGIN6Repository } from './gegin-6-research.repository';
import { createGEGIN7Repository, GEGIN7Repository } from './gegin-7-employment.repository';
import { createGEGIN8Repository, GEGIN8Repository } from './gegin-8-analytics.repository';
import { createGEGIN9Repository, GEGIN9Repository } from './gegin-9-multilang.repository';
import { createGEGIN10Repository, GEGIN10Repository } from './gegin-10-compliance.repository';
import { createGEGIN11Repository, GEGIN11Repository } from './gegin-11-marketplace.repository';
import { createGEGIN12Repository, GEGIN12Repository } from './gegin-12-digital-twin.repository';

// ═══════════════════════════════════════════════════════════════════════
// GEGIN Aggregated Repository — All 12 Modules Combined
// ═══════════════════════════════════════════════════════════════════════

export interface GEGINRepository {
  gegin1: GEGIN1Repository;
  gegin2: GEGIN2Repository;
  gegin3: GEGIN3Repository;
  gegin4: GEGIN4Repository;
  gegin5: GEGIN5Repository;
  gegin6: GEGIN6Repository;
  gegin7: GEGIN7Repository;
  gegin8: GEGIN8Repository;
  gegin9: GEGIN9Repository;
  gegin10: GEGIN10Repository;
  gegin11: GEGIN11Repository;
  gegin12: GEGIN12Repository;
}

export function createGEGINRepository(supabase: SupabaseClient): GEGINRepository {
  return {
    gegin1: createGEGIN1Repository(supabase),
    gegin2: createGEGIN2Repository(supabase),
    gegin3: createGEGIN3Repository(supabase),
    gegin4: createGEGIN4Repository(supabase),
    gegin5: createGEGIN5Repository(supabase),
    gegin6: createGEGIN6Repository(supabase),
    gegin7: createGEGIN7Repository(supabase),
    gegin8: createGEGIN8Repository(supabase),
    gegin9: createGEGIN9Repository(supabase),
    gegin10: createGEGIN10Repository(supabase),
    gegin11: createGEGIN11Repository(supabase),
    gegin12: createGEGIN12Repository(supabase),
  };
}

export type {
  GEGIN1Repository,
  GEGIN2Repository,
  GEGIN3Repository,
  GEGIN4Repository,
  GEGIN5Repository,
  GEGIN6Repository,
  GEGIN7Repository,
  GEGIN8Repository,
  GEGIN9Repository,
  GEGIN10Repository,
  GEGIN11Repository,
  GEGIN12Repository,
};
