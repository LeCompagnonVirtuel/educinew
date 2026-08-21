import { SupabaseClient } from '@supabase/supabase-js';
import { createEDU_HEALTH_1_Repository, EDU_HEALTH_1_Repository } from './edu-health-1-student-health.repository';
import { createEDU_HEALTH_2_Repository, EDU_HEALTH_2_Repository } from './edu-health-2-mental-health.repository';
import { createEDU_HEALTH_3_Repository, EDU_HEALTH_3_Repository } from './edu-health-3-safeguarding.repository';
import { createEDU_HEALTH_4_Repository, EDU_HEALTH_4_Repository } from './edu-health-4-bullying.repository';
import { createEDU_HEALTH_5_Repository, EDU_HEALTH_5_Repository } from './edu-health-5-incidents.repository';
import { createEDU_HEALTH_6_Repository, EDU_HEALTH_6_Repository } from './edu-health-6-accessibility.repository';
import { createEDU_HEALTH_7_Repository, EDU_HEALTH_7_Repository } from './edu-health-7-social-support.repository';
import { createEDU_HEALTH_8_Repository, EDU_HEALTH_8_Repository } from './edu-health-8-campus-safety.repository';
import { createEDU_HEALTH_9_Repository, EDU_HEALTH_9_Repository } from './edu-health-9-ai-intelligence.repository';
import { createEDU_HEALTH_10_Repository, EDU_HEALTH_10_Repository } from './edu-health-10-analytics.repository';
import { createEDU_HEALTH_11_Repository, EDU_HEALTH_11_Repository } from './edu-health-11-governance.repository';
import { createEDU_HEALTH_12_Repository, EDU_HEALTH_12_Repository } from './edu-health-12-digital-twin.repository';

// ═══════════════════════════════════════════════════════════════════════
// EDU-HEALTH Aggregated Repository — All 12 Modules Combined
// ═══════════════════════════════════════════════════════════════════════

export interface EDU_HEALTH_Repository {
  module1: EDU_HEALTH_1_Repository;
  module2: EDU_HEALTH_2_Repository;
  module3: EDU_HEALTH_3_Repository;
  module4: EDU_HEALTH_4_Repository;
  module5: EDU_HEALTH_5_Repository;
  module6: EDU_HEALTH_6_Repository;
  module7: EDU_HEALTH_7_Repository;
  module8: EDU_HEALTH_8_Repository;
  module9: EDU_HEALTH_9_Repository;
  module10: EDU_HEALTH_10_Repository;
  module11: EDU_HEALTH_11_Repository;
  module12: EDU_HEALTH_12_Repository;
}

export function createEDU_HEALTH_Repository(supabase: SupabaseClient): EDU_HEALTH_Repository {
  return {
    module1: createEDU_HEALTH_1_Repository(supabase),
    module2: createEDU_HEALTH_2_Repository(supabase),
    module3: createEDU_HEALTH_3_Repository(supabase),
    module4: createEDU_HEALTH_4_Repository(supabase),
    module5: createEDU_HEALTH_5_Repository(supabase),
    module6: createEDU_HEALTH_6_Repository(supabase),
    module7: createEDU_HEALTH_7_Repository(supabase),
    module8: createEDU_HEALTH_8_Repository(supabase),
    module9: createEDU_HEALTH_9_Repository(supabase),
    module10: createEDU_HEALTH_10_Repository(supabase),
    module11: createEDU_HEALTH_11_Repository(supabase),
    module12: createEDU_HEALTH_12_Repository(supabase),
  };
}

export type {
  EDU_HEALTH_1_Repository,
  EDU_HEALTH_2_Repository,
  EDU_HEALTH_3_Repository,
  EDU_HEALTH_4_Repository,
  EDU_HEALTH_5_Repository,
  EDU_HEALTH_6_Repository,
  EDU_HEALTH_7_Repository,
  EDU_HEALTH_8_Repository,
  EDU_HEALTH_9_Repository,
  EDU_HEALTH_10_Repository,
  EDU_HEALTH_11_Repository,
  EDU_HEALTH_12_Repository,
};
