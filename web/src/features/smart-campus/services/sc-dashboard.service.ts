import type { SupabaseClient } from '@supabase/supabase-js';
import type { Bus, IoTDevice, EnergyMonitor, Room, Building } from '@educi/types';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface DashboardStats {
  totalBuses: number;
  activeTrips: number;
  totalDevices: number;
  offlineDevices: number;
  totalRooms: number;
  totalBuildings: number;
  energyConsumption: number;
}

export class ScDashboardService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getSchoolStats(schoolId: string): Promise<DashboardStats> {
    const [buses, devices, rooms, buildings] = await Promise.all([
      this.repo.findAllBuses(schoolId),
      this.repo.findAllIoTDevices(schoolId),
      this.repo.findAllRooms(schoolId),
      this.repo.findAllBuildings(schoolId),
    ]);

    return {
      totalBuses: buses.length,
      activeTrips: 0,
      totalDevices: devices.length,
      offlineDevices: devices.filter(d => d.status === 'offline').length,
      totalRooms: rooms.length,
      totalBuildings: buildings.length,
      energyConsumption: 0,
    };
  }

  async getBusOverview(schoolId: string): Promise<{ total: number; active: number; maintenance: number }> {
    const buses = await this.repo.findAllBuses(schoolId);
    return {
      total: buses.length,
      active: buses.filter(b => b.status === 'active').length,
      maintenance: buses.filter(b => b.status === 'maintenance').length,
    };
  }

  async getDeviceOverview(schoolId: string): Promise<{ total: number; online: number; offline: number }> {
    const devices = await this.repo.findAllIoTDevices(schoolId);
    return {
      total: devices.length,
      online: devices.filter(d => d.status === 'online').length,
      offline: devices.filter(d => d.status === 'offline').length,
    };
  }

  async getBuildingOverview(schoolId: string): Promise<{ total: number; totalRooms: number }> {
    const buildings = await this.repo.findAllBuildings(schoolId);
    const rooms = await this.repo.findAllRooms(schoolId);
    return {
      total: buildings.length,
      totalRooms: rooms.length,
    };
  }

  async getSecurityOverview(schoolId: string): Promise<{ openIncidents: number; activeGuards: number }> {
    const [incidents, guards] = await Promise.all([
      this.repo.findOpenSecurityIncidents(schoolId),
      this.repo.findAllGuards(schoolId),
    ]);
    return {
      openIncidents: incidents.length,
      activeGuards: guards.filter(g => g.status === 'active').length,
    };
  }

  async getVisitorOverview(schoolId: string): Promise<{ checkedIn: number; pendingApprovals: number }> {
    const [checkedIn, approvals] = await Promise.all([
      this.repo.findCheckedInVisitors(schoolId),
      this.repo.findPendingVisitorApprovals(schoolId),
    ]);
    return {
      checkedIn: checkedIn.length,
      pendingApprovals: approvals.length,
    };
  }

  async getMaintenanceOverview(schoolId: string): Promise<{ openTickets: number; overdue: number }> {
    const [open, overdue] = await Promise.all([
      this.repo.findOpenMaintenanceTickets(schoolId),
      this.repo.findOverdueMaintenanceTickets(schoolId),
    ]);
    return {
      openTickets: open.length,
      overdue: overdue.length,
    };
  }
}
