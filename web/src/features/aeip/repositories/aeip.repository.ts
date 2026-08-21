import { SupabaseClient } from '@supabase/supabase-js';
import { createAEIP1Repository, AEIP1Repository } from './aeip-1-ai-os.repository';
import { createAEIP2Repository, AEIP2Repository } from './aeip-2-multi-agent.repository';
import { createAEIP3Repository, AEIP3Repository } from './aeip-3-autonomous-ops.repository';
import { createAEIP4Repository, AEIP4Repository } from './aeip-4-ai-decision.repository';
import { createAEIP5Repository, AEIP5Repository } from './aeip-5-digital-brain.repository';
import { createAEIP6Repository, AEIP6Repository } from './aeip-6-copilot.repository';
import { createAEIP7Repository, AEIP7Repository } from './aeip-7-generative-studio.repository';
import { createAEIP8Repository, AEIP8Repository } from './aeip-8-autonomous-finance.repository';
import { createAEIP9Repository, AEIP9Repository } from './aeip-9-autonomous-academic.repository';
import { createAEIP10Repository, AEIP10Repository } from './aeip-10-autonomous-infra.repository';
import { createAEIP11Repository, AEIP11Repository } from './aeip-11-ai-governance.repository';
import { createAEIP12Repository, AEIP12Repository } from './aeip-12-quantum-ready.repository';

// ═══════════════════════════════════════════════════════════════════════
// AEIP Aggregated Repository — All 12 Modules Combined
// ═══════════════════════════════════════════════════════════════════════

export interface AEIPRepository {
  aeip1: AEIP1Repository;
  aeip2: AEIP2Repository;
  aeip3: AEIP3Repository;
  aeip4: AEIP4Repository;
  aeip5: AEIP5Repository;
  aeip6: AEIP6Repository;
  aeip7: AEIP7Repository;
  aeip8: AEIP8Repository;
  aeip9: AEIP9Repository;
  aeip10: AEIP10Repository;
  aeip11: AEIP11Repository;
  aeip12: AEIP12Repository;
}

export function createAEIPRepository(supabase: SupabaseClient): AEIPRepository {
  return {
    aeip1: createAEIP1Repository(supabase),
    aeip2: createAEIP2Repository(supabase),
    aeip3: createAEIP3Repository(supabase),
    aeip4: createAEIP4Repository(supabase),
    aeip5: createAEIP5Repository(supabase),
    aeip6: createAEIP6Repository(supabase),
    aeip7: createAEIP7Repository(supabase),
    aeip8: createAEIP8Repository(supabase),
    aeip9: createAEIP9Repository(supabase),
    aeip10: createAEIP10Repository(supabase),
    aeip11: createAEIP11Repository(supabase),
    aeip12: createAEIP12Repository(supabase),
  };
}

export type {
  AEIP1Repository,
  AEIP2Repository,
  AEIP3Repository,
  AEIP4Repository,
  AEIP5Repository,
  AEIP6Repository,
  AEIP7Repository,
  AEIP8Repository,
  AEIP9Repository,
  AEIP10Repository,
  AEIP11Repository,
  AEIP12Repository,
};
