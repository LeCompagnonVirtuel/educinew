import {
  GestcrpDeviceInventoryError,
  GestcrpDeviceComplianceError,
  GestcrpMDMCommandError,
} from '@educi/errors';
import {
  createDeviceInventorySchema,
  updateDeviceInventorySchema,
  createMDMCommandSchema,
  updateMDMCommandSchema,
} from '../validators';
import type {
  GestcrpDeviceInventory,
  GestcrpDeviceCompliance,
  GestcrpMDMCommand,
  DeviceRepository,
} from '../repositories/device-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Device & Endpoint Security Service
// ============================================================================

export class DeviceSecurityService extends BaseGestcrpService {
  constructor(
    private readonly deviceRepo: DeviceRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Device Inventory ────────────────────────────────────────────────────

  async listDevices(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpDeviceInventory>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.deviceRepo.inventory.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getDevice(schoolId: string, id: string): Promise<GestcrpDeviceInventory> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Appareil');
    return this.ensureExists(this.deviceRepo.inventory, id, schoolId, 'Appareil');
  }

  async getOnlineDevices(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpDeviceInventory>> {
    this.validateSchoolId(schoolId);
    return this.deviceRepo.findOnlineDevices(schoolId, params);
  }

  async getDevicesByPlatform(
    schoolId: string,
    platform: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpDeviceInventory>> {
    this.validateSchoolId(schoolId);

    const VALID_PLATFORMS = ['WINDOWS', 'MACOS', 'LINUX', 'IOS', 'ANDROID', 'CHROME_OS', 'IOT'] as const;
    this.validateEnum(platform, VALID_PLATFORMS, 'platform', 'Appareil');

    return this.deviceRepo.findByPlatform(platform, schoolId, params);
  }

  async registerDevice(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpDeviceInventory> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'hostname', 'platform', 'os_version', 'serial_number', 'mac_address', 'ip_address', 'owner'],
      'Appareil',
    );

    const VALID_PLATFORMS = ['WINDOWS', 'MACOS', 'LINUX', 'IOS', 'ANDROID', 'CHROME_OS', 'IOT'] as const;
    this.validateEnum(data.platform as string, VALID_PLATFORMS, 'platform', 'Appareil');

    const validated = this.validateSchema(createDeviceInventorySchema, data, 'Appareil');

    const existing = await this.deviceRepo.inventory.findAll(schoolId, {
      serial_number: validated.serial_number,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpDeviceInventoryError(
        `Un appareil avec le numéro de série "${validated.serial_number}" existe déjà`,
      );
    }

    return this.deviceRepo.inventory.create(
      {
        name: validated.name,
        hostname: validated.hostname,
        platform: validated.platform,
        os_version: validated.os_version,
        architecture: validated.architecture ?? '',
        serial_number: validated.serial_number,
        mac_address: validated.mac_address,
        ip_address: validated.ip_address,
        last_seen_at: new Date().toISOString(),
        status: 'ONLINE',
        owner: validated.owner,
        department: validated.department ?? '',
        location: validated.location ?? '',
        tags: validated.tags ?? [],
        managed_by: validated.managed_by ?? 'MANUAL',
        protection_status: validated.protection_status ?? {},
        compliance_status: validated.compliance_status ?? {},
        installed_software: validated.installed_software ?? [],
        open_ports: validated.open_ports ?? [],
        network_interfaces: validated.network_interfaces ?? [],
      },
      schoolId,
    );
  }

  async updateDevice(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpDeviceInventory> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Appareil');

    const existing = await this.ensureExists(
      this.deviceRepo.inventory,
      id,
      schoolId,
      'Appareil',
    );
    this.validateOwnership(existing, schoolId, 'Appareil');

    const validated = this.validateSchema(updateDeviceInventorySchema, data, 'Appareil');

    return this.deviceRepo.inventory.update(id, schoolId, {
      ...validated,
      last_seen_at: new Date().toISOString(),
    });
  }

  async updateDeviceStatus(
    schoolId: string,
    id: string,
    status: GestcrpDeviceInventory['status'],
  ): Promise<GestcrpDeviceInventory> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Appareil');

    const VALID_STATUSES = ['ONLINE', 'OFFLINE', 'SUSPENDED', 'COMPROMISED', 'QUARANTINED', 'RETIRED'] as const;
    this.validateEnum(status, VALID_STATUSES, 'status', 'Appareil');

    const existing = await this.ensureExists(
      this.deviceRepo.inventory,
      id,
      schoolId,
      'Appareil',
    );
    this.validateOwnership(existing, schoolId, 'Appareil');

    return this.deviceRepo.inventory.update(id, schoolId, {
      status,
      last_seen_at: new Date().toISOString(),
    });
  }

  async deleteDevice(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Appareil');

    const existing = await this.ensureExists(
      this.deviceRepo.inventory,
      id,
      schoolId,
      'Appareil',
    );
    this.validateOwnership(existing, schoolId, 'Appareil');

    await this.deviceRepo.inventory.softDelete(id, schoolId);
  }

  // ─── Device Compliance ──────────────────────────────────────────────────

  async listCompliance(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpDeviceCompliance>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.deviceRepo.compliance.findAll(schoolId, pagination);
  }

  async getCompliance(schoolId: string, id: string): Promise<GestcrpDeviceCompliance> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Conformité appareil');
    return this.ensureExists(
      this.deviceRepo.compliance,
      id,
      schoolId,
      'Conformité appareil',
    );
  }

  async getNonCompliantDevices(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpDeviceCompliance>> {
    this.validateSchoolId(schoolId);
    return this.deviceRepo.findNonCompliantDevices(schoolId, params);
  }

  async checkDeviceCompliance(
    schoolId: string,
    deviceId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpDeviceCompliance> {
    this.validateSchoolId(schoolId);
    this.validateId(deviceId, 'Appareil');

    const deviceExists = await this.deviceRepo.inventory.exists(deviceId, schoolId);
    if (!deviceExists) {
      throw new GestcrpDeviceInventoryError(
        `Appareil (${deviceId}) introuvable`,
      );
    }

    const compliant = data.compliant as boolean ?? false;

    const existingCompliance = await this.deviceRepo.compliance.findAll(schoolId, {
      device_id: deviceId,
      limit: 1,
    });

    if (existingCompliance.total > 0) {
      const existing = existingCompliance.data[0];
      return this.deviceRepo.compliance.update(existing.id, schoolId, {
        compliant,
        last_checked_at: new Date().toISOString(),
        issues: (data.issues as Record<string, unknown>[]) ?? [],
        patch_level: data.patch_level as string ?? existing.patch_level,
        os_up_to_date: data.os_up_to_date as boolean ?? existing.os_up_to_date,
        encryption_compliant: data.encryption_compliant as boolean ?? existing.encryption_compliant,
        password_compliant: data.password_compliant as boolean ?? existing.password_compliant,
      });
    }

    return this.deviceRepo.compliance.create(
      {
        device_id: deviceId,
        compliant,
        last_checked_at: new Date().toISOString(),
        issues: (data.issues as Record<string, unknown>[]) ?? [],
        patch_level: data.patch_level as string ?? '',
        os_up_to_date: data.os_up_to_date as boolean ?? false,
        encryption_compliant: data.encryption_compliant as boolean ?? false,
        password_compliant: data.password_compliant as boolean ?? false,
      },
      schoolId,
    );
  }

  // ─── MDM Commands ────────────────────────────────────────────────────────

  async listMDMCommands(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpMDMCommand>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.deviceRepo.mdmCommands.findAll(schoolId, pagination);
  }

  async getMDMCommand(schoolId: string, id: string): Promise<GestcrpMDMCommand> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Commande MDM');
    return this.ensureExists(this.deviceRepo.mdmCommands, id, schoolId, 'Commande MDM');
  }

  async sendMDMCommand(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpMDMCommand> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['device_id', 'command'], 'Commande MDM');

    const VALID_COMMANDS = [
      'LOCK', 'WIPE', 'REBOOT', 'INSTALL_APP', 'REMOVE_APP',
      'UPDATE_POLICY', 'ENCRYPT', 'DECRYPT', 'SCAN', 'ENROLL',
      'LOCATION', 'SCREENSHOT',
    ] as const;
    this.validateEnum(data.command as string, VALID_COMMANDS, 'command', 'Commande MDM');

    const deviceExists = await this.deviceRepo.inventory.exists(
      data.device_id as string,
      schoolId,
    );
    if (!deviceExists) {
      throw new GestcrpDeviceInventoryError(
        `Appareil (${data.device_id}) introuvable`,
      );
    }

    const device = await this.deviceRepo.inventory.findById(
      data.device_id as string,
      schoolId,
    );
    if (device.status === 'OFFLINE' || device.status === 'RETIRED') {
      throw new GestcrpMDMCommandError(
        `Impossible d'envoyer une commande à un appareil "${device.status}"`,
      );
    }

    const validated = this.validateSchema(createMDMCommandSchema, data, 'Commande MDM');

    return this.deviceRepo.mdmCommands.create(
      {
        device_id: validated.device_id,
        command: validated.command,
        parameters: validated.parameters ?? {},
        status: 'PENDING',
      },
      schoolId,
    );
  }

  async updateMDMCommandStatus(
    schoolId: string,
    id: string,
    status: GestcrpMDMCommand['status'],
    result?: Record<string, unknown>,
    errorMessage?: string,
  ): Promise<GestcrpMDMCommand> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Commande MDM');

    const VALID_STATUSES = ['PENDING', 'SENT', 'ACKNOWLEDGED', 'COMPLETED', 'FAILED', 'TIMEOUT'] as const;
    this.validateEnum(status, VALID_STATUSES, 'status', 'Commande MDM');

    const existing = await this.ensureExists(
      this.deviceRepo.mdmCommands,
      id,
      schoolId,
      'Commande MDM',
    );
    this.validateOwnership(existing, schoolId, 'Commande MDM');

    const updateData: Partial<GestcrpMDMCommand> = { status };
    if (status === 'SENT') {
      updateData.sent_at = new Date().toISOString();
    }
    if (status === 'COMPLETED' || status === 'FAILED' || status === 'TIMEOUT') {
      updateData.completed_at = new Date().toISOString();
    }
    if (result) {
      updateData.result = result;
    }
    if (errorMessage) {
      updateData.error_message = errorMessage;
    }

    return this.deviceRepo.mdmCommands.update(id, schoolId, updateData);
  }

  async cancelMDMCommand(schoolId: string, id: string): Promise<GestcrpMDMCommand> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Commande MDM');

    const existing = await this.ensureExists(
      this.deviceRepo.mdmCommands,
      id,
      schoolId,
      'Commande MDM',
    );
    this.validateOwnership(existing, schoolId, 'Commande MDM');

    if (!['PENDING', 'SENT'].includes(existing.status)) {
      throw new GestcrpMDMCommandError(
        `La commande ne peut pas être annulée depuis le statut "${existing.status}"`,
      );
    }

    return this.deviceRepo.mdmCommands.update(id, schoolId, {
      status: 'CANCELLED',
      completed_at: new Date().toISOString(),
    });
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getDeviceStats(schoolId: string): Promise<{
    total: number;
    online: number;
    offline: number;
    compromised: number;
    quarantined: number;
    byPlatform: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.deviceRepo.inventory.findAll(schoolId, { limit: 1000 });

    const byPlatform: Record<string, number> = {};
    const byStatus: Record<string, number> = {};

    for (const device of all.data) {
      byPlatform[device.platform] = (byPlatform[device.platform] ?? 0) + 1;
      byStatus[device.status] = (byStatus[device.status] ?? 0) + 1;
    }

    return {
      total: all.total,
      online: byStatus['ONLINE'] ?? 0,
      offline: byStatus['OFFLINE'] ?? 0,
      compromised: byStatus['COMPROMISED'] ?? 0,
      quarantined: byStatus['QUARANTINED'] ?? 0,
      byPlatform,
      byStatus,
    };
  }

  async getComplianceStats(schoolId: string): Promise<{
    total: number;
    compliant: number;
    nonCompliant: number;
    complianceRate: number;
    commonIssues: Array<{ issue: string; count: number }>;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.deviceRepo.compliance.findAll(schoolId, { limit: 1000 });

    const compliant = all.data.filter((c) => c.compliant).length;
    const nonCompliant = all.total - compliant;

    const issueMap: Record<string, number> = {};
    for (const compliance of all.data) {
      for (const issue of compliance.issues) {
        const issueStr = typeof issue === 'object' && issue !== null && 'type' in issue
          ? (issue as Record<string, unknown>).type as string
          : String(issue);
        issueMap[issueStr] = (issueMap[issueStr] ?? 0) + 1;
      }
    }

    const commonIssues = Object.entries(issueMap)
      .map(([issue, count]) => ({ issue, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      total: all.total,
      compliant,
      nonCompliant,
      complianceRate: all.total > 0 ? (compliant / all.total) * 100 : 0,
      commonIssues,
    };
  }

  async getMDMCommandStats(schoolId: string): Promise<{
    total: number;
    pending: number;
    completed: number;
    failed: number;
    byCommand: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const all = await this.deviceRepo.mdmCommands.findAll(schoolId, { limit: 1000 });

    const byCommand: Record<string, number> = {};
    for (const cmd of all.data) {
      byCommand[cmd.command] = (byCommand[cmd.command] ?? 0) + 1;
    }

    return {
      total: all.total,
      pending: all.data.filter((c) => c.status === 'PENDING').length,
      completed: all.data.filter((c) => c.status === 'COMPLETED').length,
      failed: all.data.filter((c) => c.status === 'FAILED').length,
      byCommand,
    };
  }
}
