import type { SupabaseClient } from '@supabase/supabase-js';
import type { LiveSession, LiveSessionCreate, LiveSessionQuery, Recording, Attendance } from '@educi/types';
import { LxpLiveSessionNotFoundError, LxpLiveSessionCreateError, LxpLiveSessionStartError, LxpLiveSessionEndError, LxpLiveSessionJoinError, LxpLiveSessionLeaveError, LxpRecordingNotFoundError, LxpAttendanceNotFoundError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpLiveSessionService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getLiveSession(schoolId: string, id: string): Promise<LiveSession> {
    const session = await this.repo.findLiveSessionById(schoolId, id);
    if (!session) throw new LxpLiveSessionNotFoundError(id);
    return session;
  }

  async listLiveSessions(query: LiveSessionQuery): Promise<readonly LiveSession[]> {
    return this.repo.findLiveSessions(query);
  }

  async createLiveSession(data: LiveSessionCreate): Promise<LiveSession> {
    const created = await this.repo.createLiveSession(data);
    if (!created) throw new LxpLiveSessionCreateError();
    return created;
  }

  async startLiveSession(schoolId: string, id: string): Promise<LiveSession> {
    const existing = await this.repo.findLiveSessionById(schoolId, id);
    if (!existing) throw new LxpLiveSessionNotFoundError(id);
    const started = await this.repo.startLiveSession(id);
    if (!started) throw new LxpLiveSessionStartError();
    return started;
  }

  async endLiveSession(schoolId: string, id: string): Promise<LiveSession> {
    const existing = await this.repo.findLiveSessionById(schoolId, id);
    if (!existing) throw new LxpLiveSessionNotFoundError(id);
    const ended = await this.repo.endLiveSession(id);
    if (!ended) throw new LxpLiveSessionEndError();
    return ended;
  }

  async joinLiveSession(schoolId: string, id: string, userId: string): Promise<boolean> {
    const existing = await this.repo.findLiveSessionById(schoolId, id);
    if (!existing) throw new LxpLiveSessionNotFoundError(id);
    const joined = await this.repo.joinLiveSession(id, userId);
    if (!joined) throw new LxpLiveSessionJoinError();
    return joined;
  }

  async leaveLiveSession(schoolId: string, id: string, userId: string): Promise<void> {
    const existing = await this.repo.findLiveSessionById(schoolId, id);
    if (!existing) throw new LxpLiveSessionNotFoundError(id);
    const left = await this.repo.leaveLiveSession(id, userId);
    if (!left) throw new LxpLiveSessionLeaveError();
  }

  async getAttendance(schoolId: string, sessionId: string): Promise<readonly Attendance[]> {
    const existing = await this.repo.findLiveSessionById(schoolId, sessionId);
    if (!existing) throw new LxpLiveSessionNotFoundError(sessionId);
    return this.repo.getSessionAttendance(sessionId);
  }
}
