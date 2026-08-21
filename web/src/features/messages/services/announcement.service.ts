import type { SupabaseMessageRepository } from '../repositories';
import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
  messageFiltersSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

interface AnnouncementServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class AnnouncementService {
  constructor(private readonly deps: AnnouncementServiceDeps) {}

  async findAnnouncement(id: string) {
    const announcement = await this.deps.repository.findAnnouncement(id);
    if (!announcement) throw new Error('Announcement not found');
    return announcement;
  }

  async findAnnouncements(filters?: Record<string, unknown>) {
    const parsed = filters ? messageFiltersSchema.parse(filters) : undefined;
    return this.deps.repository.findAnnouncements(this.deps.schoolId, parsed as any);
  }

  async createAnnouncement(data: Record<string, unknown>, publishedBy: string) {
    const parsed = createAnnouncementSchema.parse(data);
    const announcement = await this.deps.repository.createAnnouncement(
      parsed as any,
      this.deps.schoolId,
      publishedBy,
    );
    logger.info('Announcement created', { announcementId: announcement.id }, 'messages');
    return announcement;
  }

  async updateAnnouncement(id: string, data: Record<string, unknown>) {
    const existing = await this.deps.repository.findAnnouncement(id);
    if (!existing) throw new Error('Announcement not found');
    const parsed = updateAnnouncementSchema.parse(data);
    const updated = await this.deps.repository.updateAnnouncement(id, parsed as any);
    logger.info('Announcement updated', { announcementId: id }, 'messages');
    return updated;
  }

  async deleteAnnouncement(id: string) {
    const existing = await this.deps.repository.findAnnouncement(id);
    if (!existing) throw new Error('Announcement not found');
    await this.deps.repository.deleteAnnouncement(id);
    logger.info('Announcement deleted', { announcementId: id }, 'messages');
  }

  async publishAnnouncement(id: string) {
    const existing = await this.deps.repository.findAnnouncement(id);
    if (!existing) throw new Error('Announcement not found');
    return this.deps.repository.publishAnnouncement(id);
  }

  async incrementViewCount(id: string) {
    const existing = await this.deps.repository.findAnnouncement(id);
    if (!existing) throw new Error('Announcement not found');
    await this.deps.repository.incrementViewCount(id);
  }
}
