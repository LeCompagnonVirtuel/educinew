# WORKFORCE_ARCHITECTURE - Architecture Technique

Phase 4.4 - Module Workforce Architecture

---

## 1. Vision

Architecture technique du module Workforce : Page → Hook → Service → Repository → Supabase.

## 2. Structure des Dossiers

```
src/
├── 04_WORKFORCE/
│   ├── skills/
│   │   ├── page.tsx
│   │   ├── components/ (SkillList, SkillForm, SkillDetail, CertificationCard)
│   │   ├── hooks/ (useSkills, useCertifications)
│   │   └── types.ts
│   ├── career/
│   │   ├── page.tsx
│   │   ├── components/ (CareerTimeline, MilestoneForm, CareerProgress)
│   │   ├── hooks/ (useCareer)
│   │   └── types.ts
│   ├── employment/
│   │   ├── page.tsx
│   │   ├── components/ (JobList, JobForm, ApplicationCard, CompanyProfile)
│   │   ├── hooks/ (useJobs, useApplications, useCompanies)
│   │   └── types.ts
│   ├── marketplace/
│   │   ├── page.tsx
│   │   ├── components/ (TalentCard, MatchList, MessageThread, SearchFilters)
│   │   ├── hooks/ (useMarketplace, useMessages)
│   │   └── types.ts
│   ├── wallet/
│   │   ├── page.tsx
│   │   ├── components/ (WalletGrid, WalletItem, ShareDialog, VerificationBadge)
│   │   ├── hooks/ (useWallet)
│   │   └── types.ts
│   ├── labor/
│   │   ├── page.tsx
│   │   ├── components/ (MarketDataChart, SalaryComparison, SkillsDemand, ForecastCard)
│   │   ├── hooks/ (useLaborIntel)
│   │   └── types.ts
│   └── shared/
│       ├── components/ (MatchScore, SkillBadge, AvailabilityIndicator)
│       └── utils/ (matching, calculations)
├── services/workforce/ (skills, career, jobs, applications, marketplace, wallet, labor, ai)
├── repositories/workforce/ (skills, career, jobs, applications, marketplace, wallet, labor)
└── types/workforce/ (skills, career, jobs, applications, marketplace, wallet, labor)
```

## 3. Flux de Données

```
Page (UI) → Hook (State) → Service (Logic) → Repository (Data) → Supabase
```

## 4. Exemple Hook

```typescript
'use client';
import { useState, useEffect } from 'react';
import { skillsService } from '@/services/workforce/skills.service';
import { Skill, SkillFilters } from '@/types/workforce/skills.types';

export function useSkills(filters?: SkillFilters) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { fetchSkills(); }, [filters]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setSkills(await skillsService.getAll(filters));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return { skills, loading, error, refetch: fetchSkills };
}
```

## 5. Exemple Service

```typescript
import { skillsRepository } from '@/repositories/workforce/skills.repository';
import { validateWithZod } from '@/lib/validation';
import { SkillSchema } from '@/lib/schemas/workforce';

export const skillsService = {
  async getAll(filters?: SkillFilters) { return skillsRepository.find(filters); },
  async getById(id: string) { return skillsRepository.findById(id); },
  async create(data: CreateSkillDTO) {
    return skillsRepository.create(validateWithZod(SkillSchema, data));
  },
  async update(id: string, data: Partial<CreateSkillDTO>) {
    return skillsRepository.update(id, validateWithZod(SkillSchema.partial(), data));
  },
  async delete(id: string) { return skillsRepository.softDelete(id); }
};
```

## 6. Exemple Repository

```typescript
import { supabase } from '@/lib/supabase';

export const skillsRepository = {
  async find(filters?: SkillFilters) {
    let query = supabase.from('workforce_skills').select('*')
      .eq('school_id', getSchoolId()).is('deleted_at', null);
    if (filters?.category) query = query.eq('category', filters.category);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  async create(data: CreateSkillDTO) {
    const { data: result, error } = await supabase.from('workforce_skills')
      .insert({ ...data, school_id: getSchoolId() }).select().single();
    if (error) throw error;
    return result;
  },
  async softDelete(id: string) {
    const { error } = await supabase.from('workforce_skills')
      .update({ deleted_at: new Date().toISOString() }).eq('id', id);
    if (error) throw error;
  }
};
```

## 7. Performance

```typescript
const PerformanceConfig = {
  caching: { strategy: 'stale-while-revalidate', ttl: 300000, maxItems: 100 },
  pagination: { defaultLimit: 20, maxLimit: 100 },
  virtualization: { enabled: true, rowHeight: 60, overscan: 5 }
};
```

## 8. Testing

```typescript
const TestStrategy = {
  unit: { services: 'Vitest', hooks: 'Vitest + React Testing Library' },
  integration: { api: 'Vitest + MSW' },
  e2e: { flows: 'Playwright', criticalPaths: ['Job Application', 'Talent Matching', 'Wallet Share'] }
};
```
