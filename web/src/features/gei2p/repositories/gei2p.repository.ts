import { SupabaseClient } from '@supabase/supabase-js';
import { createGEI2P1Repository, GEI2P1Repository } from './gei2p-1-identity.repository';
import { createGEI2P2Repository, GEI2P2Repository } from './gei2p-2-credentials.repository';
import { createGEI2P3Repository, GEI2P3Repository } from './gei2p-3-transcripts.repository';
import { createGEI2P4Repository, GEI2P4Repository } from './gei2p-4-skills.repository';
import { createGEI2P5Repository, GEI2P5Repository } from './gei2p-5-connectors.repository';
import { createGEI2P6Repository, GEI2P6Repository } from './gei2p-6-apihub.repository';
import { createGEI2P7Repository, GEI2P7Repository } from './gei2p-7-events.repository';
import { createGEI2P8Repository, GEI2P8Repository } from './gei2p-8-sync.repository';
import { createGEI2P9Repository, GEI2P9Repository } from './gei2p-9-governance.repository';
import { createGEI2P10Repository, GEI2P10Repository } from './gei2p-10-marketplace.repository';
import { createGEI2P11Repository, GEI2P11Repository } from './gei2p-11-datamesh.repository';
import { createGEI2P12Repository, GEI2P12Repository } from './gei2p-12-ai.repository';

// ═══════════════════════════════════════════════════════════════════════
// GEI2P Aggregated Repository — All 12 Modules Combined
// ═══════════════════════════════════════════════════════════════════════

export interface GEI2PRepository {
  gei2p1: GEI2P1Repository;
  gei2p2: GEI2P2Repository;
  gei2p3: GEI2P3Repository;
  gei2p4: GEI2P4Repository;
  gei2p5: GEI2P5Repository;
  gei2p6: GEI2P6Repository;
  gei2p7: GEI2P7Repository;
  gei2p8: GEI2P8Repository;
  gei2p9: GEI2P9Repository;
  gei2p10: GEI2P10Repository;
  gei2p11: GEI2P11Repository;
  gei2p12: GEI2P12Repository;
}

export function createGEI2PRepository(supabase: SupabaseClient): GEI2PRepository {
  return {
    gei2p1: createGEI2P1Repository(supabase),
    gei2p2: createGEI2P2Repository(supabase),
    gei2p3: createGEI2P3Repository(supabase),
    gei2p4: createGEI2P4Repository(supabase),
    gei2p5: createGEI2P5Repository(supabase),
    gei2p6: createGEI2P6Repository(supabase),
    gei2p7: createGEI2P7Repository(supabase),
    gei2p8: createGEI2P8Repository(supabase),
    gei2p9: createGEI2P9Repository(supabase),
    gei2p10: createGEI2P10Repository(supabase),
    gei2p11: createGEI2P11Repository(supabase),
    gei2p12: createGEI2P12Repository(supabase),
  };
}

export type {
  GEI2P1Repository,
  GEI2P2Repository,
  GEI2P3Repository,
  GEI2P4Repository,
  GEI2P5Repository,
  GEI2P6Repository,
  GEI2P7Repository,
  GEI2P8Repository,
  GEI2P9Repository,
  GEI2P10Repository,
  GEI2P11Repository,
  GEI2P12Repository,
};
