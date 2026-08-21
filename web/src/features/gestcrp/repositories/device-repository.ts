import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpDeviceInventoryError,
  GestcrpDeviceComplianceError,
  GestcrpMDMCommandError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// Device Entity Interfaces
// ============================================================================

export interface GestcrpDeviceInventory extends GestcrpBaseEntity {
  name: string;
  hostname: string;
  platform: 'WINDOWS' | 'MACOS' | 'LINUX' | 'IOS' | 'ANDROID' | 'CHROME_OS' | 'IOT';
  os_version: string;
  architecture: string;
  serial_number: string;
  mac_address: string;
  ip_address: string;
  last_seen_at: string;
  status: 'ONLINE' | 'OFFLINE' | 'SUSPENDED' | 'COMPROMISED' | 'QUARANTINED' | 'RETIRED';
  owner: string;
  department: string;
  location: string;
  tags: string[];
  managed_by: 'MDM' | 'MANUAL' | 'AUTO_DISCOVER';
  protection_status: Record<string, unknown>;
  compliance_status: Record<string, unknown>;
  installed_software: Record<string, unknown>[];
  open_ports: number[];
  network_interfaces: Record<string, unknown>[];
}

export interface GestcrpDeviceCompliance extends GestcrpBaseEntity {
  device_id: string;
  compliant: boolean;
  last_checked_at: string;
  issues: Record<string, unknown>[];
  patch_level: string;
  os_up_to_date: boolean;
  encryption_compliant: boolean;
  password_compliant: boolean;
}

export interface GestcrpMDMCommand extends GestcrpBaseEntity {
  device_id: string;
  command: 'LOCK' | 'WIPE' | 'REBOOT' | 'INSTALL_APP' | 'REMOVE_APP' | 'UPDATE_POLICY' | 'ENCRYPT' | 'DECRYPT' | 'SCAN' | 'ENROLL' | 'LOCATION' | 'SCREENSHOT';
  parameters: Record<string, unknown>;
  status: 'PENDING' | 'SENT' | 'ACKNOWLEDGED' | 'COMPLETED' | 'FAILED' | 'TIMEOUT';
  sent_at?: string;
  completed_at?: string;
  result?: Record<string, unknown>;
  error_message?: string;
}

// ============================================================================
// Table Names
// ============================================================================

export const DEVICE_TABLE_NAMES = {
  inventory: 'gestcrp_device_inventory',
  compliance: 'gestcrp_device_compliance',
  mdmCommands: 'gestcrp_mdm_commands',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface DeviceRepository {
  inventory: GestcrpCrudRepository<GestcrpDeviceInventory>;
  compliance: GestcrpCrudRepository<GestcrpDeviceCompliance>;
  mdmCommands: GestcrpCrudRepository<GestcrpMDMCommand>;
  findOnlineDevices(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpDeviceInventory>>;
  findNonCompliantDevices(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpDeviceCompliance>>;
  findByPlatform(platform: string, schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpDeviceInventory>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createDeviceRepository(supabase: SupabaseClient): DeviceRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    inventory: crud<GestcrpDeviceInventory>(DEVICE_TABLE_NAMES.inventory),
    compliance: crud<GestcrpDeviceCompliance>(DEVICE_TABLE_NAMES.compliance),
    mdmCommands: crud<GestcrpMDMCommand>(DEVICE_TABLE_NAMES.mdmCommands),

    async findOnlineDevices(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(DEVICE_TABLE_NAMES.inventory)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('status', 'ONLINE')
        .is('deleted_at', null)
        .order('last_seen_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpDeviceInventoryError(
          `Erreur lors de la récupération des appareils en ligne: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpDeviceInventory[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findNonCompliantDevices(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(DEVICE_TABLE_NAMES.compliance)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('compliant', false)
        .is('deleted_at', null)
        .order('last_checked_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpDeviceComplianceError(
          `Erreur lors de la récupération des appareils non conformes: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpDeviceCompliance[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findByPlatform(platform: string, schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(DEVICE_TABLE_NAMES.inventory)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('platform', platform)
        .is('deleted_at', null)
        .order('last_seen_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpDeviceInventoryError(
          `Erreur lors de la récupération par plateforme: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpDeviceInventory[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}
