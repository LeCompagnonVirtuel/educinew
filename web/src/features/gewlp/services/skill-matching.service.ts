import type { SupabaseClient } from '@supabase/supabase-js';

interface SkillMatch {
  id: string;
  school_id: string;
  person_id: string;
  skill_id: string;
  proficiency: number;
  verified: boolean;
  verified_by?: string;
  evidence?: string;
  created_at: string;
  updated_at: string;
}

interface SkillMatchCreate {
  person_id: string;
  skill_id: string;
  proficiency: number;
  verified?: boolean;
  evidence?: string;
}

interface MatchResult {
  person_id: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
}

interface MatchFilters {
  person_id?: string;
  skill_id?: string;
  min_proficiency?: number;
  verified?: boolean;
  page?: number;
  limit?: number;
}

export class SkillMatchingService {
  private readonly TABLE = 'gewlp_skill_matches';

  constructor(private supabase: SupabaseClient) {}

  async getMatch(schoolId: string, id: string): Promise<SkillMatch> {
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

  async listMatches(schoolId: string, filters?: MatchFilters): Promise<SkillMatch[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.skill_id) query = query.eq('skill_id', filters.skill_id);
    if (filters?.min_proficiency) query = query.gte('proficiency', filters.min_proficiency);
    if (filters?.verified !== undefined) query = query.eq('verified', filters.verified);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createMatch(schoolId: string, data: SkillMatchCreate): Promise<SkillMatch> {
    const { data: match, error } = await this.supabase
      .from(this.TABLE)
      .insert({ ...data, school_id: schoolId, verified: data.verified ?? false })
      .select()
      .single();
    if (error) throw error;
    return match;
  }

  async updateMatch(schoolId: string, id: string, data: Partial<SkillMatchCreate>): Promise<SkillMatch> {
    const existing = await this.getMatch(schoolId, id);
    if (!existing) throw new Error(`Skill match ${id} not found`);

    const { data: match, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return match;
  }

  async deleteMatch(schoolId: string, id: string): Promise<void> {
    const existing = await this.getMatch(schoolId, id);
    if (!existing) throw new Error(`Skill match ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async verifyMatch(schoolId: string, id: string, verifiedBy: string): Promise<SkillMatch> {
    const existing = await this.getMatch(schoolId, id);
    if (!existing) throw new Error(`Skill match ${id} not found`);

    const { data: match, error } = await this.supabase
      .from(this.TABLE)
      .update({ verified: true, verified_by: verifiedBy, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return match;
  }

  async findMatchesForJob(schoolId: string, requiredSkills: string[], minProficiency?: number): Promise<MatchResult[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('person_id, skill_id, proficiency')
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .in('skill_id', requiredSkills)
      .gte('proficiency', minProficiency ?? 0);
    if (error) throw error;

    const personMap = new Map<string, { matched: string[]; totalProficiency: number }>();
    for (const row of data ?? []) {
      const entry = personMap.get(row.person_id) ?? { matched: [], totalProficiency: 0 };
      entry.matched.push(row.skill_id);
      entry.totalProficiency += row.proficiency;
      personMap.set(row.person_id, entry);
    }

    const results: MatchResult[] = [];
    for (const [personId, info] of personMap) {
      const matchedCount = info.matched.length;
      const matchScore = matchedCount / requiredSkills.length;
      const missingSkills = requiredSkills.filter(s => !info.matched.includes(s));
      results.push({
        person_id: personId,
        match_score: matchScore,
        matched_skills: info.matched,
        missing_skills: missingSkills,
      });
    }

    return results.sort((a, b) => b.match_score - a.match_score);
  }

  async getPersonSkills(schoolId: string, personId: string): Promise<SkillMatch[]> {
    return this.listMatches(schoolId, { person_id: personId, limit: 1000 });
  }
}
