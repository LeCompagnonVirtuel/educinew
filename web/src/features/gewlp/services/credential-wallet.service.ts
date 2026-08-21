import type { SupabaseClient } from '@supabase/supabase-js';

interface Credential {
  id: string;
  school_id: string;
  person_id: string;
  credential_type: 'diploma' | 'certificate' | 'badge' | 'license' | 'award' | 'transcript';
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_url?: string;
  credential_hash: string;
  verified: boolean;
  verified_by?: string;
  skills: string[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface CredentialCreate {
  person_id: string;
  credential_type: Credential['credential_type'];
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_url?: string;
  skills?: string[];
  metadata?: Record<string, unknown>;
}

interface CredentialFilters {
  person_id?: string;
  credential_type?: string;
  verified?: boolean;
  expired?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class CredentialWalletService {
  private readonly TABLE = 'gewlp_credentials';

  constructor(private supabase: SupabaseClient) {}

  async getCredential(schoolId: string, id: string): Promise<Credential> {
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

  async listCredentials(schoolId: string, filters?: CredentialFilters): Promise<Credential[]> {
    let query = this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (filters?.person_id) query = query.eq('person_id', filters.person_id);
    if (filters?.credential_type) query = query.eq('credential_type', filters.credential_type);
    if (filters?.verified !== undefined) query = query.eq('verified', filters.verified);
    if (filters?.expired) query = query.lt('expiry_date', new Date().toISOString());
    if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,issuer.ilike.%${filters.search}%`);

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 50;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('issue_date', { ascending: false }).range(from, to);

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async createCredential(schoolId: string, data: CredentialCreate): Promise<Credential> {
    const credentialHash = await this.generateHash(data);

    const { data: credential, error } = await this.supabase
      .from(this.TABLE)
      .insert({
        ...data,
        school_id: schoolId,
        skills: data.skills ?? [],
        credential_hash: credentialHash,
        verified: false,
      })
      .select()
      .single();
    if (error) throw error;
    return credential;
  }

  async updateCredential(schoolId: string, id: string, data: Partial<CredentialCreate>): Promise<Credential> {
    const existing = await this.getCredential(schoolId, id);
    if (!existing) throw new Error(`Credential ${id} not found`);

    const { data: credential, error } = await this.supabase
      .from(this.TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .is('deleted_at', null)
      .select()
      .single();
    if (error) throw error;
    return credential;
  }

  async deleteCredential(schoolId: string, id: string): Promise<void> {
    const existing = await this.getCredential(schoolId, id);
    if (!existing) throw new Error(`Credential ${id} not found`);

    const { error } = await this.supabase
      .from(this.TABLE)
      .update({ deleted_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id);
    if (error) throw error;
  }

  async verifyCredential(schoolId: string, id: string, verifiedBy: string): Promise<Credential> {
    const { data: credential, error } = await this.supabase
      .from(this.TABLE)
      .update({ verified: true, verified_by: verifiedBy, updated_at: new Date().toISOString() })
      .eq('school_id', schoolId)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return credential;
  }

  async verifyByHash(schoolId: string, credentialHash: string): Promise<Credential | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('credential_hash', credentialHash)
      .is('deleted_at', null)
      .single();
    if (error) return null;
    return data;
  }

  async getPersonWallet(schoolId: string, personId: string): Promise<Credential[]> {
    return this.listCredentials(schoolId, { person_id: personId, limit: 1000 });
  }

  async getExpiredCredentials(schoolId: string, personId: string): Promise<Credential[]> {
    return this.listCredentials(schoolId, { person_id: personId, expired: true });
  }

  async getExpiringSoon(schoolId: string, personId: string, withinDays: number = 30): Promise<Credential[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);

    const { data, error } = await this.supabase
      .from(this.TABLE)
      .select('*')
      .eq('school_id', schoolId)
      .eq('person_id', personId)
      .is('deleted_at', null)
      .lte('expiry_date', futureDate.toISOString())
      .gte('expiry_date', new Date().toISOString())
      .order('expiry_date', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }

  private async generateHash(data: CredentialCreate): Promise<string> {
    const payload = `${data.title}:${data.issuer}:${data.issue_date}:${Date.now()}`;
    const encoder = new TextEncoder();
    const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(payload));
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
