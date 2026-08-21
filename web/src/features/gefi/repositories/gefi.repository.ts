import { SupabaseClient } from '@supabase/supabase-js';
import { createGEFI1Repository, GEFI1Repository } from './gefi-1-financial-core.repository';
import { createGEFI2Repository, GEFI2Repository } from './gefi-2-payment-infrastructure.repository';
import { createGEFI3Repository, GEFI3Repository } from './gefi-3-wallet-engine.repository';
import { createGEFI4Repository, GEFI4Repository } from './gefi-4-scholarship-engine.repository';
import { createGEFI5Repository, GEFI5Repository } from './gefi-5-student-financing.repository';
import { createGEFI6Repository, GEFI6Repository } from './gefi-6-institutional-finance.repository';
import { createGEFI7Repository, GEFI7Repository } from './gefi-7-government-finance.repository';
import { createGEFI8Repository, GEFI8Repository } from './gefi-8-international-finance.repository';
import { createGEFI9Repository, GEFI9Repository } from './gefi-9-investment-platform.repository';
import { createGEFI10Repository, GEFI10Repository } from './gefi-10-crowdfunding.repository';
import { createGEFI11Repository, GEFI11Repository } from './gefi-11-insurance.repository';
import { createGEFI12Repository, GEFI12Repository } from './gefi-12-economic-intelligence.repository';
import { createGEFI13Repository, GEFI13Repository } from './gefi-13-fraud-detection.repository';
import { createGEFI14Repository, GEFI14Repository } from './gefi-14-reconciliation.repository';
import { createGEFI15Repository, GEFI15Repository } from './gefi-15-multi-currency.repository';
import { createGEFI16Repository, GEFI16Repository } from './gefi-16-compliance.repository';
import { createGEFI17Repository, GEFI17Repository } from './gefi-17-digital-twin.repository';
import { createGEFI18Repository, GEFI18Repository } from './gefi-18-data-mesh.repository';
import { createGEFI19Repository, GEFI19Repository } from './gefi-19-marketplace.repository';
import { createGEFI20Repository, GEFI20Repository } from './gefi-20-orchestrator.repository';

// ═══════════════════════════════════════════════════════════════════════
// GEFI²P Aggregated Repository — All 20 Modules Combined
// Phase 4.5: Global Education Finance Infrastructure² Platform
// ═══════════════════════════════════════════════════════════════════════

export interface GEFIRepository {
  gefi1: GEFI1Repository;
  gefi2: GEFI2Repository;
  gefi3: GEFI3Repository;
  gefi4: GEFI4Repository;
  gefi5: GEFI5Repository;
  gefi6: GEFI6Repository;
  gefi7: GEFI7Repository;
  gefi8: GEFI8Repository;
  gefi9: GEFI9Repository;
  gefi10: GEFI10Repository;
  gefi11: GEFI11Repository;
  gefi12: GEFI12Repository;
  gefi13: GEFI13Repository;
  gefi14: GEFI14Repository;
  gefi15: GEFI15Repository;
  gefi16: GEFI16Repository;
  gefi17: GEFI17Repository;
  gefi18: GEFI18Repository;
  gefi19: GEFI19Repository;
  gefi20: GEFI20Repository;
}

export function createGEFIRepository(supabase: SupabaseClient): GEFIRepository {
  return {
    gefi1: createGEFI1Repository(supabase),
    gefi2: createGEFI2Repository(supabase),
    gefi3: createGEFI3Repository(supabase),
    gefi4: createGEFI4Repository(supabase),
    gefi5: createGEFI5Repository(supabase),
    gefi6: createGEFI6Repository(supabase),
    gefi7: createGEFI7Repository(supabase),
    gefi8: createGEFI8Repository(supabase),
    gefi9: createGEFI9Repository(supabase),
    gefi10: createGEFI10Repository(supabase),
    gefi11: createGEFI11Repository(supabase),
    gefi12: createGEFI12Repository(supabase),
    gefi13: createGEFI13Repository(supabase),
    gefi14: createGEFI14Repository(supabase),
    gefi15: createGEFI15Repository(supabase),
    gefi16: createGEFI16Repository(supabase),
    gefi17: createGEFI17Repository(supabase),
    gefi18: createGEFI18Repository(supabase),
    gefi19: createGEFI19Repository(supabase),
    gefi20: createGEFI20Repository(supabase),
  };
}

export type {
  GEFI1Repository,
  GEFI2Repository,
  GEFI3Repository,
  GEFI4Repository,
  GEFI5Repository,
  GEFI6Repository,
  GEFI7Repository,
  GEFI8Repository,
  GEFI9Repository,
  GEFI10Repository,
  GEFI11Repository,
  GEFI12Repository,
  GEFI13Repository,
  GEFI14Repository,
  GEFI15Repository,
  GEFI16Repository,
  GEFI17Repository,
  GEFI18Repository,
  GEFI19Repository,
  GEFI20Repository,
};
