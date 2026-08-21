import { SupabaseClient } from '@supabase/supabase-js';
import { EventSubscriptionService } from './gei2p-events-event-subscription.service';

export interface Subscription {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilitySubscriptionService {
  private readonly subscriptionService: EventSubscriptionService;

  constructor(supabase: SupabaseClient) {
    this.subscriptionService = new EventSubscriptionService(supabase);
  }

  async listSubscriptions(schoolId: string, filters?: Record<string, unknown>): Promise<Subscription[]> {
    return this.subscriptionService.listEntities(schoolId, filters) as Promise<Subscription[]>;
  }

  async getSubscription(schoolId: string, id: string): Promise<Subscription | null> {
    const entity = await this.subscriptionService.getEntity(id);
    if (entity && (entity as Subscription).school_id === schoolId) return entity as Subscription;
    return null;
  }

  async createSubscription(schoolId: string, userId: string, data: Record<string, unknown>): Promise<Subscription | null> {
    return this.subscriptionService.createEntity({ ...data, school_id: schoolId } as Parameters<EventSubscriptionService['createEntity']>[0]) as Promise<Subscription | null>;
  }

  async updateSubscription(schoolId: string, id: string, data: Record<string, unknown>): Promise<Subscription | null> {
    const entity = await this.subscriptionService.getEntity(id);
    if (!entity || (entity as Subscription).school_id !== schoolId) return null;
    return this.subscriptionService.updateEntity(id, data as Parameters<EventSubscriptionService['updateEntity']>[1]) as Promise<Subscription | null>;
  }

  async deleteSubscription(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.subscriptionService.getEntity(id);
    if (!entity || (entity as Subscription).school_id !== schoolId) return false;
    return this.subscriptionService.deleteEntity(id);
  }
}
