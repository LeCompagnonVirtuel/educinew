import type { SupabaseMessageRepository } from '../repositories';
import {
  createBroadcastSchema,
  updateBroadcastSchema,
  broadcastScheduleSchema,
  messageFiltersSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

interface BroadcastServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class BroadcastService {
  constructor(private readonly deps: BroadcastServiceDeps) {}

  async findBroadcast(id: string) {
    const broadcast = await this.deps.repository.findBroadcast(id);
    if (!broadcast) throw new Error('Broadcast not found');
    return broadcast;
  }

  async findBroadcasts(filters?: Record<string, unknown>) {
    const parsed = filters ? messageFiltersSchema.parse(filters) : undefined;
    return this.deps.repository.findBroadcasts(this.deps.schoolId, parsed as any);
  }

  async createBroadcast(data: Record<string, unknown>, sentBy: string) {
    const parsed = createBroadcastSchema.parse(data);
    const broadcast = await this.deps.repository.createBroadcast(parsed as any, this.deps.schoolId, sentBy);
    logger.info('Broadcast created', { broadcastId: broadcast.id }, 'messages');
    return broadcast;
  }

  async updateBroadcast(id: string, data: Record<string, unknown>) {
    const existing = await this.deps.repository.findBroadcast(id);
    if (!existing) throw new Error('Broadcast not found');
    const parsed = updateBroadcastSchema.parse(data);
    const updated = await this.deps.repository.updateBroadcast(id, parsed as any);
    logger.info('Broadcast updated', { broadcastId: id }, 'messages');
    return updated;
  }

  async deleteBroadcast(id: string) {
    const existing = await this.deps.repository.findBroadcast(id);
    if (!existing) throw new Error('Broadcast not found');
    await this.deps.repository.deleteBroadcast(id);
    logger.info('Broadcast deleted', { broadcastId: id }, 'messages');
  }

  async sendBroadcast(id: string) {
    const existing = await this.deps.repository.findBroadcast(id);
    if (!existing) throw new Error('Broadcast not found');
    if (existing.status === 'SENT') throw new Error('Broadcast already sent');
    return this.deps.repository.sendBroadcast(id);
  }

  async scheduleBroadcast(id: string, scheduledAt: string) {
    const existing = await this.deps.repository.findBroadcast(id);
    if (!existing) throw new Error('Broadcast not found');
    const parsed = broadcastScheduleSchema.parse({ broadcastId: id, scheduledAt });
    return this.deps.repository.scheduleBroadcast(parsed.broadcastId, parsed.scheduledAt);
  }
}
