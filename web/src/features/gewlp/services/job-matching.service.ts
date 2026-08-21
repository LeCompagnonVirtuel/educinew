import type { SupabaseClient } from '@supabase/supabase-js';

interface JobListing {
  id: string;
  school_id: string;
  employer_id: string;
  title: string;
  description: string;
  industry?: string;
  work_type: 'full_time' | 'part_time' | 'contract' | 'internship' | 'freelance';
  location?: string;
  remote_allowed: boolean;
  salary_min?: number;
  salary_max?: number;
  required_skills: string[];
  preferred_skills: string[];
  status: 'draft' | 'active' | 'paused' | 'closed' | 'filled';
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

interface JobListingCreate {
  employer_id: string;
  title: string;
  description: string;
  industry?: string;
  work_type?: JobListing['work_type'];
  location?: string;
  remote_allowed?: boolean;
  salary_min?: number;
  salary_max?: number;
  required_skills?: string[];
  preferred_skills?: string[];
  expires_at?: string;
}

interface JobMatch {
  job_id: string;
  person_id: string;
  match_score: number;
  matched_required: string[];
  matched_preferred: string[];
  missing_required: string[];
}

interface JobFilters {
  employer_id?: string;
  industry?: string;
  work_type?: string;
  status?: string;
  remote_allowed?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class JobMatchingService {
  private readonly TABLE = 'gewlp_job_listings';
  private readonly MATCH_TABLE = 'gewlp_job_applications';

  constructor(private supabase: SupabaseClient) {}

  async getJob(schoolId: string, id: string): Promise<JobListing> {
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

  async listJobs(schoolId: string, filters?: JobFilters): Promise<JobListing[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.employer_id) query = query.eq('employer_id', filters.employer_id);
    if (filters?.industry) query = query.eq('industry', filters.industry);
    if (filters?.work_type) query = query.eq('work_type', filters.work_type);
    if (filters?.status) query = query.eq('status', filters.status);
    if (filters?.remote_allowed !== undefined) query = query.eq('remote_allowed', filters.remote_allowed);
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createJob(schoolId: string, data: JobListingCreate): Promise<JobListing> {
    const { data: job, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        work_type: data.work_type ?? 'full_time',
        remote_allowed: data.remote_allowed ?? false,
        required_skills: data.required_skills ?? [],
        preferred_skills: data.preferred_skills ?? [],
        status: 'draft',
      })
      .select()
      .single();
    if (error) throw error;
    return job;
  }

  async updateJob(schoolId: string, id: string, data: Partial<JobListingCreate>): Promise<JobListing> {
    const existing = await this.getJob(schoolId, id);
    if (!existing) throw new Error(`Job listing ${id} not found`);

    const { data: job, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return job;
  }

  async deleteJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.getJob(schoolId, id);
    if (!existing) throw new Error(`Job listing ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString(), status: 'closed' })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async publishJob(schoolId: string, id: string): Promise<JobListing> {
    return this.updateJob(schoolId, id, { status: 'active' } as Partial<JobListingCreate>);
  }

  async closeJob(schoolId: string, id: string): Promise<JobListing> {
    return this.updateJob(schoolId, id, { status: 'closed' } as Partial<JobListingCreate>);
  }

  async matchCandidateToJob(schoolId: string, jobId: string, personSkills: string[]): Promise<JobMatch> {
    const job = await this.getJob(schoolId, jobId);

    const matchedRequired = job.required_skills.filter(s => personSkills.includes(s));
    const missingRequired = job.required_skills.filter(s => !personSkills.includes(s));
    const matchedPreferred = job.preferred_skills.filter(s => personSkills.includes(s));

    const requiredScore = job.required_skills.length > 0
      ? matchedRequired.length / job.required_skills.length
      : 1;
    const preferredScore = job.preferred_skills.length > 0
      ? matchedPreferred.length / job.preferred_skills.length
      : 0;

    const matchScore = requiredScore * 0.7 + preferredScore * 0.3;

    return {
      job_id: jobId,
      person_id: '',
      match_score: Math.round(matchScore * 100) / 100,
      matched_required: matchedRequired,
      matched_preferred: matchedPreferred,
      missing_required: missingRequired,
    };
  }

  async applyToJob(schoolId: string, jobId: string, personId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.MATCH_TABLE)
      .insert({ school_id: schoolId, job_id: jobId, person_id: personId, status: 'pending' });
    if (error) throw error;
  }

  async getJobApplications(schoolId: string, jobId: string): Promise<Record<string, unknown>[]> {
    const { data, error } = await this.supabase
      .from(this.MATCH_TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
}
