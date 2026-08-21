import { SupabaseClient } from '@supabase/supabase-js';
import {
  Campus, CampusCreate, CampusUpdate,
  CampusGroup, CampusGroupCreate, CampusGroupUpdate,
  CampusGroupMember, CampusGroupMemberCreate, CampusGroupMemberUpdate,
  SharedResource, SharedResourceCreate, SharedResourceUpdate,
  SharedResourceBooking, SharedResourceBookingCreate, SharedResourceBookingUpdate,
  CrossCampusUser, CrossCampusUserCreate, CrossCampusUserUpdate,
  CampusTransfer, CampusTransferCreate, CampusTransferUpdate,
  CentralizedAdministration, CentralizedAdministrationCreate, CentralizedAdministrationUpdate,
  CampusAnalytics, CampusAnalyticsCreate, CampusAnalyticsUpdate,
  InterCampusCommunication, InterCampusCommunicationCreate, InterCampusCommunicationUpdate,
} from '@educi/types';
import {
  GovCampusNotFoundError,
  GovCampusGroupNotFoundError,
  GovCampusGroupMemberNotFoundError,
  GovSharedResourceNotFoundError,
  GovSharedResourceBookingNotFoundError,
  GovCrossCampusUserNotFoundError,
  GovCampusTransferNotFoundError,
  GovCentralizedAdministrationNotFoundError,
  GovCampusAnalyticsNotFoundError,
  GovInterCampusCommunicationNotFoundError,
} from '@educi/errors';

// ============================================================================
// GOV Module 7: Portal & Campus Management
// ============================================================================

export interface GOV7Repository {
  campus: CampusRepo;
  campusGroup: CampusGroupRepo;
  campusGroupMember: CampusGroupMemberRepo;
  sharedResource: SharedResourceRepo;
  sharedResourceBooking: SharedResourceBookingRepo;
  crossCampusUser: CrossCampusUserRepo;
  campusTransfer: CampusTransferRepo;
  centralizedAdministration: CentralizedAdministrationRepo;
  campusAnalytics: CampusAnalyticsRepo;
  interCampusCommunication: InterCampusCommunicationRepo;
}

export interface CampusRepo {
  findById(schoolId: string, id: string): Promise<Campus>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<Campus[]>;
  create(schoolId: string, data: Partial<CampusCreate>): Promise<Campus>;
  update(schoolId: string, id: string, data: Partial<CampusCreate>): Promise<Campus>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findActive(schoolId: string): Promise<Campus[]>;
  findByRegion(schoolId: string, regionId: string): Promise<Campus[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<Campus>;
}

export interface CampusGroupRepo {
  findById(schoolId: string, id: string): Promise<CampusGroup>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<CampusGroup[]>;
  create(schoolId: string, data: Partial<CampusGroupCreate>): Promise<CampusGroup>;
  update(schoolId: string, id: string, data: Partial<CampusGroupCreate>): Promise<CampusGroup>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCampus(schoolId: string, campusId: string): Promise<CampusGroup[]>;
  findActive(schoolId: string): Promise<CampusGroup[]>;
  findByType(schoolId: string, type: string): Promise<CampusGroup[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<CampusGroup>;
}

export interface CampusGroupMemberRepo {
  findById(schoolId: string, id: string): Promise<CampusGroupMember>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<CampusGroupMember[]>;
  create(schoolId: string, data: Partial<CampusGroupMemberCreate>): Promise<CampusGroupMember>;
  update(schoolId: string, id: string, data: Partial<CampusGroupMemberCreate>): Promise<CampusGroupMember>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByGroup(schoolId: string, groupId: string): Promise<CampusGroupMember[]>;
  findByCampus(schoolId: string, campusId: string): Promise<CampusGroupMember[]>;
  findActive(schoolId: string): Promise<CampusGroupMember[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<CampusGroupMember>;
}

export interface SharedResourceRepo {
  findById(schoolId: string, id: string): Promise<SharedResource>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SharedResource[]>;
  create(schoolId: string, data: Partial<SharedResourceCreate>): Promise<SharedResource>;
  update(schoolId: string, id: string, data: Partial<SharedResourceCreate>): Promise<SharedResource>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCampus(schoolId: string, campusId: string): Promise<SharedResource[]>;
  findActive(schoolId: string): Promise<SharedResource[]>;
  findByType(schoolId: string, type: string): Promise<SharedResource[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<SharedResource>;
}

export interface SharedResourceBookingRepo {
  findById(schoolId: string, id: string): Promise<SharedResourceBooking>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<SharedResourceBooking[]>;
  create(schoolId: string, data: Partial<SharedResourceBookingCreate>): Promise<SharedResourceBooking>;
  update(schoolId: string, id: string, data: Partial<SharedResourceBookingCreate>): Promise<SharedResourceBooking>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByResource(schoolId: string, resourceId: string): Promise<SharedResourceBooking[]>;
  findByCampus(schoolId: string, campusId: string): Promise<SharedResourceBooking[]>;
  findActive(schoolId: string): Promise<SharedResourceBooking[]>;
  updateStatus(schoolId: string, id: string, status: string): Promise<SharedResourceBooking>;
}

export interface CrossCampusUserRepo {
  findById(schoolId: string, id: string): Promise<CrossCampusUser>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<CrossCampusUser[]>;
  create(schoolId: string, data: Partial<CrossCampusUserCreate>): Promise<CrossCampusUser>;
  update(schoolId: string, id: string, data: Partial<CrossCampusUserCreate>): Promise<CrossCampusUser>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCampus(schoolId: string, campusId: string): Promise<CrossCampusUser[]>;
  findActive(schoolId: string): Promise<CrossCampusUser[]>;
}

export interface CampusTransferRepo {
  findById(schoolId: string, id: string): Promise<CampusTransfer>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<CampusTransfer[]>;
  create(schoolId: string, data: Partial<CampusTransferCreate>): Promise<CampusTransfer>;
  update(schoolId: string, id: string, data: Partial<CampusTransferCreate>): Promise<CampusTransfer>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByStudent(schoolId: string, studentId: string): Promise<CampusTransfer[]>;
  findByStatus(schoolId: string, status: string): Promise<CampusTransfer[]>;
  approve(schoolId: string, id: string): Promise<void>;
  reject(schoolId: string, id: string, reason: string): Promise<void>;
}

export interface CentralizedAdministrationRepo {
  findById(schoolId: string, id: string): Promise<CentralizedAdministration>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<CentralizedAdministration[]>;
  create(schoolId: string, data: Partial<CentralizedAdministrationCreate>): Promise<CentralizedAdministration>;
  update(schoolId: string, id: string, data: Partial<CentralizedAdministrationCreate>): Promise<CentralizedAdministration>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCampus(schoolId: string, campusId: string): Promise<CentralizedAdministration[]>;
  findActive(schoolId: string): Promise<CentralizedAdministration[]>;
  findByType(schoolId: string, type: string): Promise<CentralizedAdministration[]>;
}

export interface CampusAnalyticsRepo {
  findById(schoolId: string, id: string): Promise<CampusAnalytics>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<CampusAnalytics[]>;
  create(schoolId: string, data: Partial<CampusAnalyticsCreate>): Promise<CampusAnalytics>;
  update(schoolId: string, id: string, data: Partial<CampusAnalyticsCreate>): Promise<CampusAnalytics>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findByCampus(schoolId: string, campusId: string): Promise<CampusAnalytics[]>;
  findLatest(schoolId: string, campusId: string): Promise<CampusAnalytics | null>;
}

export interface InterCampusCommunicationRepo {
  findById(schoolId: string, id: string): Promise<InterCampusCommunication>;
  findAll(schoolId: string, filters?: Record<string, unknown>): Promise<InterCampusCommunication[]>;
  create(schoolId: string, data: Partial<InterCampusCommunicationCreate>): Promise<InterCampusCommunication>;
  update(schoolId: string, id: string, data: Partial<InterCampusCommunicationCreate>): Promise<InterCampusCommunication>;
  delete(schoolId: string, id: string): Promise<void>;
  count(schoolId: string): Promise<number>;
  findBySenderCampus(schoolId: string, campusId: string): Promise<InterCampusCommunication[]>;
  findByReceiverCampus(schoolId: string, campusId: string): Promise<InterCampusCommunication[]>;
  findByStatus(schoolId: string, status: string): Promise<InterCampusCommunication[]>;
  markAsRead(schoolId: string, id: string): Promise<void>;
}

// ============================================================================
// Factory
// ============================================================================

function makeRepo<T>(supabase: SupabaseClient, table: string, Err: new (id: string) => Error, extra: Record<string, any> = {}) {
  const base = {
    async findById(schoolId: string, id: string): Promise<T> {
      const { data, error } = await supabase.from(table).select('*').eq('id', id).eq('school_id', schoolId).single();
      if (error) throw new Err(id);
      return data;
    },
    async findAll(schoolId: string, filters?: Record<string, unknown>): Promise<T[]> {
      let q = supabase.from(table).select('*').eq('school_id', schoolId);
      if (filters) for (const [k, v] of Object.entries(filters)) if (v !== undefined && v !== null) q = q.eq(k, v);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
    async create(schoolId: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).insert({ ...data, school_id: schoolId }).select().single();
      if (error) throw error;
      return d;
    },
    async update(schoolId: string, id: string, data: Partial<any>): Promise<T> {
      const { data: d, error } = await supabase.from(table).update(data).eq('id', id).eq('school_id', schoolId).select().single();
      if (error) throw new Err(id);
      return d;
    },
    async delete(schoolId: string, id: string): Promise<void> {
      const { error } = await supabase.from(table).delete().eq('id', id).eq('school_id', schoolId);
      if (error) throw error;
    },
    async count(schoolId: string): Promise<number> {
      const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
      if (error) throw error;
      return count ?? 0;
    },
  };
  return Object.assign(base, extra) as any;
}

export function createGOV7Repository(supabase: SupabaseClient): GOV7Repository {
  return {
    campus: makeRepo(supabase, 'gov_campuses', GovCampusNotFoundError, {
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_campuses').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByRegion(schoolId: string, regionId: string) {
        const { data, error } = await supabase.from('gov_campuses').select('*').eq('school_id', schoolId).eq('region_id', regionId);
        if (error) throw error;
        return data ?? [];
      },
      async updateStatus(schoolId: string, id: string, status: string) {
        const { data, error } = await supabase.from('gov_campuses').update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
        if (error) throw new GovCampusNotFoundError(id);
        return data;
      },
    }),
    campusGroup: makeRepo(supabase, 'gov_campus_groups', GovCampusGroupNotFoundError, {
      async findByCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_campus_groups').select('*').eq('school_id', schoolId).eq('campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_campus_groups').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_campus_groups').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async updateStatus(schoolId: string, id: string, status: string) {
        const { data, error } = await supabase.from('gov_campus_groups').update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
        if (error) throw new GovCampusGroupNotFoundError(id);
        return data;
      },
    }),
    campusGroupMember: makeRepo(supabase, 'gov_campus_group_members', GovCampusGroupMemberNotFoundError, {
      async findByGroup(schoolId: string, groupId: string) {
        const { data, error } = await supabase.from('gov_campus_group_members').select('*').eq('school_id', schoolId).eq('group_id', groupId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_campus_group_members').select('*').eq('school_id', schoolId).eq('campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_campus_group_members').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async updateStatus(schoolId: string, id: string, status: string) {
        const { data, error } = await supabase.from('gov_campus_group_members').update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
        if (error) throw new GovCampusGroupMemberNotFoundError(id);
        return data;
      },
    }),
    sharedResource: makeRepo(supabase, 'gov_shared_resources', GovSharedResourceNotFoundError, {
      async findByCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_shared_resources').select('*').eq('school_id', schoolId).eq('campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_shared_resources').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_shared_resources').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
      async updateStatus(schoolId: string, id: string, status: string) {
        const { data, error } = await supabase.from('gov_shared_resources').update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
        if (error) throw new GovSharedResourceNotFoundError(id);
        return data;
      },
    }),
    sharedResourceBooking: makeRepo(supabase, 'gov_shared_resource_bookings', GovSharedResourceBookingNotFoundError, {
      async findByResource(schoolId: string, resourceId: string) {
        const { data, error } = await supabase.from('gov_shared_resource_bookings').select('*').eq('school_id', schoolId).eq('resource_id', resourceId);
        if (error) throw error;
        return data ?? [];
      },
      async findByCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_shared_resource_bookings').select('*').eq('school_id', schoolId).eq('campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_shared_resource_bookings').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async updateStatus(schoolId: string, id: string, status: string) {
        const { data, error } = await supabase.from('gov_shared_resource_bookings').update({ status }).eq('id', id).eq('school_id', schoolId).select().single();
        if (error) throw new GovSharedResourceBookingNotFoundError(id);
        return data;
      },
    }),
    crossCampusUser: makeRepo(supabase, 'gov_cross_campus_users', GovCrossCampusUserNotFoundError, {
      async findByCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_cross_campus_users').select('*').eq('school_id', schoolId).eq('campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_cross_campus_users').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
    }),
    campusTransfer: makeRepo(supabase, 'gov_campus_transfers', GovCampusTransferNotFoundError, {
      async findByStudent(schoolId: string, studentId: string) {
        const { data, error } = await supabase.from('gov_campus_transfers').select('*').eq('school_id', schoolId).eq('student_id', studentId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_campus_transfers').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async approve(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_campus_transfers').update({ status: 'approved' }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovCampusTransferNotFoundError(id);
      },
      async reject(schoolId: string, id: string, reason: string) {
        const { error } = await supabase.from('gov_campus_transfers').update({ status: 'rejected', rejection_reason: reason }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovCampusTransferNotFoundError(id);
      },
    }),
    centralizedAdministration: makeRepo(supabase, 'gov_centralized_administrations', GovCentralizedAdministrationNotFoundError, {
      async findByCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_centralized_administrations').select('*').eq('school_id', schoolId).eq('campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findActive(schoolId: string) {
        const { data, error } = await supabase.from('gov_centralized_administrations').select('*').eq('school_id', schoolId).eq('status', 'active');
        if (error) throw error;
        return data ?? [];
      },
      async findByType(schoolId: string, type: string) {
        const { data, error } = await supabase.from('gov_centralized_administrations').select('*').eq('school_id', schoolId).eq('type', type);
        if (error) throw error;
        return data ?? [];
      },
    }),
    campusAnalytics: makeRepo(supabase, 'gov_campus_analytics', GovCampusAnalyticsNotFoundError, {
      async findByCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_campus_analytics').select('*').eq('school_id', schoolId).eq('campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findLatest(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_campus_analytics').select('*').eq('school_id', schoolId).eq('campus_id', campusId).order('created_at', { ascending: false }).limit(1).single();
        if (error) return null;
        return data;
      },
    }),
    interCampusCommunication: makeRepo(supabase, 'gov_inter_campus_communications', GovInterCampusCommunicationNotFoundError, {
      async findBySenderCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_inter_campus_communications').select('*').eq('school_id', schoolId).eq('sender_campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findByReceiverCampus(schoolId: string, campusId: string) {
        const { data, error } = await supabase.from('gov_inter_campus_communications').select('*').eq('school_id', schoolId).eq('receiver_campus_id', campusId);
        if (error) throw error;
        return data ?? [];
      },
      async findByStatus(schoolId: string, status: string) {
        const { data, error } = await supabase.from('gov_inter_campus_communications').select('*').eq('school_id', schoolId).eq('status', status);
        if (error) throw error;
        return data ?? [];
      },
      async markAsRead(schoolId: string, id: string) {
        const { error } = await supabase.from('gov_inter_campus_communications').update({ read: true }).eq('id', id).eq('school_id', schoolId);
        if (error) throw new GovInterCampusCommunicationNotFoundError(id);
      },
    }),
  };
}
