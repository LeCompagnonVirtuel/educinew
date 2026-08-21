import { SupabaseClient } from '@supabase/supabase-js';
import { EventDispatchService } from './gei2p-events-event-dispatch.service';

export interface Event {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilityEventService {
  private readonly eventService: EventDispatchService;

  constructor(supabase: SupabaseClient) {
    this.eventService = new EventDispatchService(supabase);
  }

  async listEvents(schoolId: string, filters?: Record<string, unknown>): Promise<Event[]> {
    return this.eventService.listEntities(schoolId, filters) as Promise<Event[]>;
  }

  async getEvent(schoolId: string, id: string): Promise<Event | null> {
    const entity = await this.eventService.getEntity(id);
    if (entity && (entity as Event).school_id === schoolId) return entity as Event;
    return null;
  }

  async createEvent(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Event | null> {
    return this.eventService.createEntity({ ...data, school_id: schoolId } as Parameters<EventDispatchService['createEntity']>[0]) as Promise<Event | null>;
  }

  async updateEvent(schoolId: string, id: string, data: Record<string, unknown>): Promise<Event | null> {
    const entity = await this.eventService.getEntity(id);
    if (!entity || (entity as Event).school_id !== schoolId) return null;
    return this.eventService.updateEntity(id, data as Parameters<EventDispatchService['updateEntity']>[1]) as Promise<Event | null>;
  }

  async deleteEvent(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.eventService.getEntity(id);
    if (!entity || (entity as Event).school_id !== schoolId) return false;
    return this.eventService.deleteEntity(id);
  }
}
