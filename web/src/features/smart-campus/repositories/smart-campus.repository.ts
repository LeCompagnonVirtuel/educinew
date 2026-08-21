import { SupabaseClient } from '@supabase/supabase-js';
import type {
  ScBus, ScBusStop, ScRoute, ScTrip, ScDriver, ScAssistant, ScAssignment,
  ScGpsTracking, ScBusAttendance, ScFuelRecord, ScBusMaintenance, ScBusInsurance,
  ScBusIncident, ScEmergencyAlert,
  ScBook, ScAuthor, ScPublisher, ScBookCategory, ScBookCopy, ScBookLoan,
  ScBookReturn, ScBookReservation, ScLateFee, ScEbook, ScAudiobook,
  ScRfidTag, ScLibraryInventory, ScBookAcquisition, ScLibraryCard,
  ScMenu, ScMeal, ScNutrition, ScAllergen, ScFoodStock, ScFoodSupplier,
  ScMealOrder, ScMealConsumption, ScMealSubscription, ScMealPayment,
  ScKitchenStaff, ScCantineReport,
  ScMedicalRecord, ScMedicalVisit, ScTreatment, ScVaccination, ScMedicalAllergy,
  ScMedicalHistory, ScMedication, ScEmergencyContact, ScAccident, ScHealthReport,
  ScBuilding, ScRoom, ScBed, ScOccupancy, ScRoomAssignment, ScBoardingAttendance,
  ScNightReport, ScDiscipline,
  ScVisitorRegistration, ScVisitorBadge, ScVisitorQr, ScVisitorInvitation,
  ScVisitorApproval, ScIdentityVerification, ScVisitorBlacklist,
  ScAsset, ScEquipment, ScFurniture, ScItAsset, ScAssetWarranty,
  ScAssetDepreciation, ScAssetTransfer,
  ScMaintenanceTicket, ScTechnician, ScWorkOrder, ScMaintenanceContract, ScSparePart,
  ScIotDevice, ScSensor, ScEnergyMonitor, ScWaterMonitor, ScDoorAccess,
  ScSmartLock, ScSmartCamera, ScAutomationRule,
  ScSmartRoom, ScRoomReservation, ScRoomScheduling,
  ScEmergencyPlan, ScSecurityIncident, ScGuard, ScCctv,
  ScWasteManagement, ScCarbonFootprint, ScSolarProduction, ScEnergySaving,
  ScWaterUsage, ScEnvironmentalReport, ScEnvironmentalGoal,
} from '@educi/types';
import {
  ScBusNotFoundError, ScBusStopNotFoundError, ScRouteNotFoundError,
  ScTripNotFoundError, ScDriverNotFoundError, ScAssistantNotFoundError,
  ScAssignmentNotFoundError, ScGpsTrackingNotFoundError, ScBusAttendanceNotFoundError,
  ScFuelRecordNotFoundError, ScBusMaintenanceNotFoundError, ScBusInsuranceNotFoundError,
  ScBusIncidentNotFoundError, ScEmergencyAlertNotFoundError,
  ScBookNotFoundError, ScAuthorNotFoundError, ScPublisherNotFoundError,
  ScBookCategoryNotFoundError, ScBookCopyNotFoundError, ScBookLoanNotFoundError,
  ScBookReturnNotFoundError, ScBookReservationNotFoundError, ScLateFeeNotFoundError,
  ScEbookNotFoundError, ScAudiobookNotFoundError, ScRfidTagNotFoundError,
  ScLibraryInventoryNotFoundError, ScBookAcquisitionNotFoundError, ScLibraryCardNotFoundError,
  ScMenuNotFoundError, ScMealNotFoundError, ScNutritionNotFoundError,
  ScAllergenNotFoundError, ScFoodStockNotFoundError, ScFoodSupplierNotFoundError,
  ScMealOrderNotFoundError, ScMealConsumptionNotFoundError, ScMealSubscriptionNotFoundError,
  ScMealPaymentNotFoundError, ScKitchenStaffNotFoundError, ScCantineReportNotFoundError,
  ScMedicalRecordNotFoundError, ScMedicalVisitNotFoundError, ScTreatmentNotFoundError,
  ScVaccinationNotFoundError, ScMedicalAllergyNotFoundError, ScMedicalHistoryNotFoundError,
  ScMedicationNotFoundError, ScEmergencyContactNotFoundError, ScAccidentNotFoundError,
  ScHealthReportNotFoundError,
  ScBuildingNotFoundError, ScRoomNotFoundError, ScBedNotFoundError,
  ScOccupancyNotFoundError, ScRoomAssignmentNotFoundError, ScBoardingAttendanceNotFoundError,
  ScNightReportNotFoundError, ScDisciplineNotFoundError,
  ScVisitorRegistrationNotFoundError, ScVisitorBadgeNotFoundError, ScVisitorQrNotFoundError,
  ScVisitorInvitationNotFoundError, ScVisitorApprovalNotFoundError,
  ScIdentityVerificationNotFoundError, ScVisitorBlacklistNotFoundError,
  ScAssetNotFoundError, ScEquipmentNotFoundError, ScFurnitureNotFoundError,
  ScItAssetNotFoundError, ScAssetWarrantyNotFoundError, ScAssetDepreciationNotFoundError,
  ScAssetTransferNotFoundError,
  ScMaintenanceTicketNotFoundError, ScTechnicianNotFoundError, ScWorkOrderNotFoundError,
  ScMaintenanceContractNotFoundError, ScSparePartNotFoundError,
  ScIoTDeviceNotFoundError, ScSensorNotFoundError, ScEnergyMonitorNotFoundError,
  ScWaterMonitorNotFoundError, ScDoorAccessNotFoundError, ScSmartLockNotFoundError,
  ScSmartCameraNotFoundError, ScAutomationRuleNotFoundError,
  ScSmartRoomNotFoundError, ScRoomReservationNotFoundError, ScRoomSchedulingNotFoundError,
  ScEmergencyPlanNotFoundError, ScSecurityIncidentNotFoundError, ScGuardNotFoundError,
  ScCctvNotFoundError,
  ScWasteManagementNotFoundError, ScCarbonFootprintNotFoundError,
  ScSolarProductionNotFoundError, ScEnergySavingNotFoundError, ScWaterUsageNotFoundError,
  ScEnvironmentalReportNotFoundError, ScEnvironmentalGoalNotFoundError,
} from '@educi/errors';

export class SmartCampusRepositoryEnterprise {
  constructor(private readonly supabase: SupabaseClient) {}

  async findBusById(schoolId: string, id: string): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusNotFoundError(id);
    return data;
  }

  async findAllBuses(schoolId: string): Promise<ScBus[]> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBus(schoolId: string, bus: Partial<ScBus>): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .insert({ ...bus, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBus(schoolId: string, id: string, updates: Partial<ScBus>): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusNotFoundError(id);
    return data;
  }

  async deleteBus(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_buses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBusByPlate(schoolId: string, plateNumber: string): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*')
      .eq('plate_number', plateNumber)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusNotFoundError(plateNumber);
    return data;
  }

  async findActiveBuses(schoolId: string): Promise<ScBus[]> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findBusesByRoute(schoolId: string, routeId: string): Promise<ScBus[]> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*, sc_assignments(*)')
      .eq('school_id', schoolId)
      .eq('sc_assignments.route_id', routeId);
    if (error) throw error;
    return data ?? [];
  }

  async countBuses(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_buses')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async softDeleteBus(schoolId: string, id: string): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .update({ status: 'inactive', deleted_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusNotFoundError(id);
    return data;
  }

  async reactivateBus(schoolId: string, id: string): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .update({ status: 'active', deleted_at: null })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusNotFoundError(id);
    return data;
  }

  async findBusWithDetails(schoolId: string, id: string): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*, sc_assignments(*, sc_routes(*), sc_drivers(*), sc_assistants(*))')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusNotFoundError(id);
    return data;
  }

  async updateBusStatus(schoolId: string, id: string, status: string): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusNotFoundError(id);
    return data;
  }

  async findBusByNumber(schoolId: string, busNumber: string): Promise<ScBus> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*')
      .eq('bus_number', busNumber)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusNotFoundError(busNumber);
    return data;
  }

  async findBusesWithCapacity(schoolId: string, minCapacity: number): Promise<ScBus[]> {
    const { data, error } = await this.supabase
      .from('sc_buses')
      .select('*')
      .eq('school_id', schoolId)
      .gte('capacity', minCapacity)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findBusStopById(schoolId: string, id: string): Promise<ScBusStop> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusStopNotFoundError(id);
    return data;
  }

  async findAllBusStops(schoolId: string): Promise<ScBusStop[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBusStop(schoolId: string, stop: Partial<ScBusStop>): Promise<ScBusStop> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .insert({ ...stop, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBusStop(schoolId: string, id: string, updates: Partial<ScBusStop>): Promise<ScBusStop> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusStopNotFoundError(id);
    return data;
  }

  async deleteBusStop(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_bus_stops')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBusStopsByRoute(schoolId: string, routeId: string): Promise<ScBusStop[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .select('*')
      .eq('school_id', schoolId)
      .eq('route_id', routeId)
      .order('stop_order');
    if (error) throw error;
    return data ?? [];
  }

  async findNearbyBusStops(schoolId: string, latitude: number, longitude: number, radiusKm: number): Promise<ScBusStop[]> {
    const { data, error } = await this.supabase
      .rpc('find_nearby_bus_stops', {
        p_school_id: schoolId,
        p_latitude: latitude,
        p_longitude: longitude,
        p_radius_km: radiusKm,
      });
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBusStops(schoolId: string): Promise<ScBusStop[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_active', true);
    if (error) throw error;
    return data ?? [];
  }

  async countBusStops(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_bus_stops')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async updateBusStopLocation(schoolId: string, id: string, latitude: number, longitude: number): Promise<ScBusStop> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .update({ latitude, longitude })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusStopNotFoundError(id);
    return data;
  }

  async findNearestBusStop(schoolId: string, latitude: number, longitude: number): Promise<ScBusStop> {
    const { data, error } = await this.supabase
      .rpc('find_nearest_bus_stop', {
        p_school_id: schoolId,
        p_latitude: latitude,
        p_longitude: longitude,
      });
    if (error) throw error;
    return data;
  }

  async findBusStopsByZone(schoolId: string, zone: string): Promise<ScBusStop[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_stops')
      .select('*')
      .eq('school_id', schoolId)
      .eq('zone', zone);
    if (error) throw error;
    return data ?? [];
  }

  async findRouteById(schoolId: string, id: string): Promise<ScRoute> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScRouteNotFoundError(id);
    return data;
  }

  async findAllRoutes(schoolId: string): Promise<ScRoute[]> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRoute(schoolId: string, route: Partial<ScRoute>): Promise<ScRoute> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .insert({ ...route, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRoute(schoolId: string, id: string, updates: Partial<ScRoute>): Promise<ScRoute> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScRouteNotFoundError(id);
    return data;
  }

  async deleteRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findActiveRoutes(schoolId: string): Promise<ScRoute[]> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRoutesByDriver(schoolId: string, driverId: string): Promise<ScRoute[]> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*, sc_assignments(*)')
      .eq('school_id', schoolId)
      .eq('sc_assignments.driver_id', driverId);
    if (error) throw error;
    return data ?? [];
  }

  async findRoutesBySchool(schoolId: string): Promise<ScRoute[]> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*')
      .eq('school_id', schoolId)
      .order('name');
    if (error) throw error;
    return data ?? [];
  }

  async updateRouteStatus(schoolId: string, id: string, status: string): Promise<ScRoute> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .update({ status })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScRouteNotFoundError(id);
    return data;
  }

  async findRouteWithStops(schoolId: string, id: string): Promise<ScRoute> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*, sc_bus_stops(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScRouteNotFoundError(id);
    return data;
  }

  async countRoutes(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_routes')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRouteByName(schoolId: string, name: string): Promise<ScRoute> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*')
      .eq('school_id', schoolId)
      .eq('name', name)
      .single();
    if (error) throw new ScRouteNotFoundError(name);
    return data;
  }

  async findRouteByDistance(schoolId: string, minDistance: number, maxDistance: number): Promise<ScRoute[]> {
    const { data, error } = await this.supabase
      .from('sc_routes')
      .select('*')
      .eq('school_id', schoolId)
      .gte('distance_km', minDistance)
      .lte('distance_km', maxDistance);
    if (error) throw error;
    return data ?? [];
  }

  async findTripById(schoolId: string, id: string): Promise<ScTrip> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScTripNotFoundError(id);
    return data;
  }

  async findAllTrips(schoolId: string): Promise<ScTrip[]> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createTrip(schoolId: string, trip: Partial<ScTrip>): Promise<ScTrip> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .insert({ ...trip, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateTrip(schoolId: string, id: string, updates: Partial<ScTrip>): Promise<ScTrip> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScTripNotFoundError(id);
    return data;
  }

  async deleteTrip(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_trips')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findActiveTrips(schoolId: string): Promise<ScTrip[]> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'in_progress');
    if (error) throw error;
    return data ?? [];
  }

  async findTripsByDate(schoolId: string, date: string): Promise<ScTrip[]> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .select('*')
      .eq('school_id', schoolId)
      .eq('trip_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async startTrip(schoolId: string, id: string): Promise<ScTrip> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .update({ status: 'in_progress', actual_start: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScTripNotFoundError(id);
    return data;
  }

  async endTrip(schoolId: string, id: string): Promise<ScTrip> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .update({ status: 'completed', actual_end: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScTripNotFoundError(id);
    return data;
  }

  async cancelTrip(schoolId: string, id: string, reason: string): Promise<ScTrip> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .update({ status: 'cancelled', cancellation_reason: reason })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScTripNotFoundError(id);
    return data;
  }

  async findTripsByRoute(schoolId: string, routeId: string): Promise<ScTrip[]> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .select('*')
      .eq('school_id', schoolId)
      .eq('route_id', routeId);
    if (error) throw error;
    return data ?? [];
  }

  async findTripsByBus(schoolId: string, busId: string): Promise<ScTrip[]> {
    const { data, error } = await this.supabase
      .from('sc_trips')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId);
    if (error) throw error;
    return data ?? [];
  }

  async countTrips(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_trips')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDriverById(schoolId: string, id: string): Promise<ScDriver> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScDriverNotFoundError(id);
    return data;
  }

  async findAllDrivers(schoolId: string): Promise<ScDriver[]> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDriver(schoolId: string, driver: Partial<ScDriver>): Promise<ScDriver> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .insert({ ...driver, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateDriver(schoolId: string, id: string, updates: Partial<ScDriver>): Promise<ScDriver> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScDriverNotFoundError(id);
    return data;
  }

  async deleteDriver(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_drivers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findDriverByLicense(schoolId: string, licenseNumber: string): Promise<ScDriver> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('license_number', licenseNumber)
      .single();
    if (error) throw new ScDriverNotFoundError(licenseNumber);
    return data;
  }

  async findActiveDrivers(schoolId: string): Promise<ScDriver[]> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAvailableDrivers(schoolId: string, date: string): Promise<ScDriver[]> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .not('id', 'in', this.supabase
        .from('sc_assignments')
        .select('driver_id')
        .eq('assignment_date', date)
      );
    if (error) throw error;
    return data ?? [];
  }

  async countDrivers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_drivers')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDriverByName(schoolId: string, firstName: string, lastName: string): Promise<ScDriver> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('first_name', firstName)
      .eq('last_name', lastName)
      .single();
    if (error) throw new ScDriverNotFoundError(`${firstName} ${lastName}`);
    return data;
  }

  async findDriversWithAssignments(schoolId: string): Promise<ScDriver[]> {
    const { data, error } = await this.supabase
      .from('sc_drivers')
      .select('*, sc_assignments(*)')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAssistantById(schoolId: string, id: string): Promise<ScAssistant> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScAssistantNotFoundError(id);
    return data;
  }

  async findAllAssistants(schoolId: string): Promise<ScAssistant[]> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAssistant(schoolId: string, assistant: Partial<ScAssistant>): Promise<ScAssistant> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .insert({ ...assistant, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAssistant(schoolId: string, id: string, updates: Partial<ScAssistant>): Promise<ScAssistant> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScAssistantNotFoundError(id);
    return data;
  }

  async deleteAssistant(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_assistants')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findActiveAssistants(schoolId: string): Promise<ScAssistant[]> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async countAssistants(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_assistants')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAvailableAssistants(schoolId: string, date: string): Promise<ScAssistant[]> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .not('id', 'in', this.supabase
        .from('sc_assignments')
        .select('assistant_id')
        .eq('assignment_date', date)
      );
    if (error) throw error;
    return data ?? [];
  }

  async findAssistantByName(schoolId: string, firstName: string, lastName: string): Promise<ScAssistant> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .select('*')
      .eq('school_id', schoolId)
      .eq('first_name', firstName)
      .eq('last_name', lastName)
      .single();
    if (error) throw new ScAssistantNotFoundError(`${firstName} ${lastName}`);
    return data;
  }

  async findAssistantsWithAssignments(schoolId: string): Promise<ScAssistant[]> {
    const { data, error } = await this.supabase
      .from('sc_assistants')
      .select('*, sc_assignments(*)')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAssignmentById(schoolId: string, id: string): Promise<ScAssignment> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScAssignmentNotFoundError(id);
    return data;
  }

  async findAllAssignments(schoolId: string): Promise<ScAssignment[]> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAssignment(schoolId: string, assignment: Partial<ScAssignment>): Promise<ScAssignment> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .insert({ ...assignment, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAssignment(schoolId: string, id: string, updates: Partial<ScAssignment>): Promise<ScAssignment> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScAssignmentNotFoundError(id);
    return data;
  }

  async deleteAssignment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_assignments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAssignmentsByDate(schoolId: string, date: string): Promise<ScAssignment[]> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .select('*, sc_buses(*), sc_routes(*), sc_drivers(*), sc_assistants(*)')
      .eq('school_id', schoolId)
      .eq('assignment_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveAssignments(schoolId: string): Promise<ScAssignment[]> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findAssignmentsByDriver(schoolId: string, driverId: string): Promise<ScAssignment[]> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('driver_id', driverId);
    if (error) throw error;
    return data ?? [];
  }

  async findAssignmentsByBus(schoolId: string, busId: string): Promise<ScAssignment[]> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId);
    if (error) throw error;
    return data ?? [];
  }

  async countAssignments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_assignments')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAssignmentsWithDetails(schoolId: string, id: string): Promise<ScAssignment> {
    const { data, error } = await this.supabase
      .from('sc_assignments')
      .select('*, sc_buses(*), sc_routes(*), sc_drivers(*), sc_assistants(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScAssignmentNotFoundError(id);
    return data;
  }

  async findGpsTrackingById(schoolId: string, id: string): Promise<ScGpsTracking> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScGpsTrackingNotFoundError(id);
    return data;
  }

  async findAllGpsTracking(schoolId: string): Promise<ScGpsTracking[]> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createGpsTracking(schoolId: string, tracking: Partial<ScGpsTracking>): Promise<ScGpsTracking> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .insert({ ...tracking, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getLatestBusPosition(schoolId: string, busId: string): Promise<ScGpsTracking> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .order('recorded_at', { ascending: false })
      .limit(1)
      .single();
    if (error) throw new ScGpsTrackingNotFoundError(busId);
    return data;
  }

  async trackBusHistory(schoolId: string, busId: string, from: string, to: string): Promise<ScGpsTracking[]> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .gte('recorded_at', from)
      .lte('recorded_at', to)
      .order('recorded_at');
    if (error) throw error;
    return data ?? [];
  }

  async findBusesInArea(schoolId: string, minLat: number, maxLat: number, minLng: number, maxLng: number): Promise<ScGpsTracking[]> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*, sc_buses(*)')
      .eq('school_id', schoolId)
      .gte('latitude', minLat)
      .lte('latitude', maxLat)
      .gte('longitude', minLng)
      .lte('longitude', maxLng);
    if (error) throw error;
    return data ?? [];
  }

  async updateGpsPosition(schoolId: string, busId: string, latitude: number, longitude: number, speed: number): Promise<ScGpsTracking> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .insert({
        school_id: schoolId,
        bus_id: busId,
        latitude,
        longitude,
        speed,
        recorded_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findGpsTrackingByTrip(schoolId: string, tripId: string): Promise<ScGpsTracking[]> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*')
      .eq('school_id', schoolId)
      .eq('trip_id', tripId)
      .order('recorded_at');
    if (error) throw error;
    return data ?? [];
  }

  async countGpsTrackingRecords(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findGpsTrackingByDate(schoolId: string, date: string): Promise<ScGpsTracking[]> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*')
      .eq('school_id', schoolId)
      .gte('recorded_at', `${date}T00:00:00`)
      .lte('recorded_at', `${date}T23:59:59`);
    if (error) throw error;
    return data ?? [];
  }

  async findMaxSpeedRecord(schoolId: string, busId: string): Promise<ScGpsTracking> {
    const { data, error } = await this.supabase
      .from('sc_gps_tracking')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .order('speed', { ascending: false })
      .limit(1)
      .single();
    if (error) throw new ScGpsTrackingNotFoundError(busId);
    return data;
  }

  async findBusAttendanceById(schoolId: string, id: string): Promise<ScBusAttendance> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusAttendanceNotFoundError(id);
    return data;
  }

  async findAllBusAttendance(schoolId: string): Promise<ScBusAttendance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBusAttendance(schoolId: string, attendance: Partial<ScBusAttendance>): Promise<ScBusAttendance> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .insert({ ...attendance, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBusAttendance(schoolId: string, id: string, updates: Partial<ScBusAttendance>): Promise<ScBusAttendance> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusAttendanceNotFoundError(id);
    return data;
  }

  async deleteBusAttendance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_bus_attendance')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBusAttendanceByDate(schoolId: string, date: string): Promise<ScBusAttendance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('attendance_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async markStudentPresent(schoolId: string, tripId: string, studentId: string): Promise<ScBusAttendance> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .upsert({
        school_id: schoolId,
        trip_id: tripId,
        student_id: studentId,
        status: 'present',
        boarded_at: new Date().toISOString(),
      }, { onConflict: 'trip_id,student_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async markStudentAbsent(schoolId: string, tripId: string, studentId: string): Promise<ScBusAttendance> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .upsert({
        school_id: schoolId,
        trip_id: tripId,
        student_id: studentId,
        status: 'absent',
      }, { onConflict: 'trip_id,student_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findStudentBusAttendance(schoolId: string, studentId: string, from: string, to: string): Promise<ScBusAttendance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .gte('attendance_date', from)
      .lte('attendance_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async getBusAttendanceStats(schoolId: string, tripId: string): Promise<{ present: number; absent: number; late: number }> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .select('status')
      .eq('school_id', schoolId)
      .eq('trip_id', tripId);
    if (error) throw error;
    const records = data ?? [];
    return {
      present: records.filter(r => r.status === 'present').length,
      absent: records.filter(r => r.status === 'absent').length,
      late: records.filter(r => r.status === 'late').length,
    };
  }

  async countBusAttendance(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_bus_attendance')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBusAttendanceByTrip(schoolId: string, tripId: string): Promise<ScBusAttendance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('trip_id', tripId);
    if (error) throw error;
    return data ?? [];
  }

  async markStudentLate(schoolId: string, tripId: string, studentId: string): Promise<ScBusAttendance> {
    const { data, error } = await this.supabase
      .from('sc_bus_attendance')
      .upsert({
        school_id: schoolId,
        trip_id: tripId,
        student_id: studentId,
        status: 'late',
      }, { onConflict: 'trip_id,student_id' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findFuelRecordById(schoolId: string, id: string): Promise<ScFuelRecord> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScFuelRecordNotFoundError(id);
    return data;
  }

  async findAllFuelRecords(schoolId: string): Promise<ScFuelRecord[]> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createFuelRecord(schoolId: string, record: Partial<ScFuelRecord>): Promise<ScFuelRecord> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .insert({ ...record, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateFuelRecord(schoolId: string, id: string, updates: Partial<ScFuelRecord>): Promise<ScFuelRecord> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScFuelRecordNotFoundError(id);
    return data;
  }

  async deleteFuelRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_fuel_records')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findFuelRecordsByBus(schoolId: string, busId: string): Promise<ScFuelRecord[]> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .order('refuel_date', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async findFuelRecordsByDateRange(schoolId: string, from: string, to: string): Promise<ScFuelRecord[]> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('*')
      .eq('school_id', schoolId)
      .gte('refuel_date', from)
      .lte('refuel_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async getFuelStats(schoolId: string, busId: string): Promise<{ totalCost: number; totalLiters: number; avgCostPerLiter: number }> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('cost, liters')
      .eq('school_id', schoolId)
      .eq('bus_id', busId);
    if (error) throw error;
    const records = data ?? [];
    const totalCost = records.reduce((sum, r) => sum + (r.cost ?? 0), 0);
    const totalLiters = records.reduce((sum, r) => sum + (r.liters ?? 0), 0);
    return { totalCost, totalLiters, avgCostPerLiter: totalLiters > 0 ? totalCost / totalLiters : 0 };
  }

  async calculateTotalFuelCost(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('cost')
      .eq('school_id', schoolId)
      .gte('refuel_date', from)
      .lte('refuel_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.cost ?? 0), 0);
  }

  async countFuelRecords(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_fuel_records')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findFuelRecordsByFuelType(schoolId: string, fuelType: string): Promise<ScFuelRecord[]> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('*')
      .eq('school_id', schoolId)
      .eq('fuel_type', fuelType);
    if (error) throw error;
    return data ?? [];
  }

  async findRecentFuelRecords(schoolId: string, days: number): Promise<ScFuelRecord[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('*')
      .eq('school_id', schoolId)
      .gte('refuel_date', since.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async getAverageFuelConsumption(schoolId: string, busId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_fuel_records')
      .select('kilometers, liters')
      .eq('school_id', schoolId)
      .eq('bus_id', busId);
    if (error) throw error;
    const records = data ?? [];
    const totalKm = records.reduce((sum, r) => sum + (r.kilometers ?? 0), 0);
    const totalLiters = records.reduce((sum, r) => sum + (r.liters ?? 0), 0);
    return totalLiters > 0 ? totalKm / totalLiters : 0;
  }

  async findBusMaintenanceById(schoolId: string, id: string): Promise<ScBusMaintenance> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusMaintenanceNotFoundError(id);
    return data;
  }

  async findAllBusMaintenance(schoolId: string): Promise<ScBusMaintenance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBusMaintenance(schoolId: string, maintenance: Partial<ScBusMaintenance>): Promise<ScBusMaintenance> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .insert({ ...maintenance, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBusMaintenance(schoolId: string, id: string, updates: Partial<ScBusMaintenance>): Promise<ScBusMaintenance> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusMaintenanceNotFoundError(id);
    return data;
  }

  async deleteBusMaintenance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_bus_maintenance')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBusMaintenanceByBus(schoolId: string, busId: string): Promise<ScBusMaintenance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .order('scheduled_date', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async findBusMaintenanceByStatus(schoolId: string, status: string): Promise<ScBusMaintenance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findUpcomingBusMaintenance(schoolId: string): Promise<ScBusMaintenance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'scheduled')
      .gte('scheduled_date', new Date().toISOString())
      .order('scheduled_date');
    if (error) throw error;
    return data ?? [];
  }

  async markBusMaintenanceCompleted(schoolId: string, id: string, notes: string): Promise<ScBusMaintenance> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .update({ status: 'completed', completed_at: new Date().toISOString(), notes })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusMaintenanceNotFoundError(id);
    return data;
  }

  async findOverdueBusMaintenance(schoolId: string): Promise<ScBusMaintenance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'scheduled')
      .lt('scheduled_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async countBusMaintenance(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBusMaintenanceByType(schoolId: string, maintenanceType: string): Promise<ScBusMaintenance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('maintenance_type', maintenanceType);
    if (error) throw error;
    return data ?? [];
  }

  async findBusMaintenanceByCostRange(schoolId: string, minCost: number, maxCost: number): Promise<ScBusMaintenance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('*')
      .eq('school_id', schoolId)
      .gte('cost', minCost)
      .lte('cost', maxCost);
    if (error) throw error;
    return data ?? [];
  }

  async getMaintenanceCostByBus(schoolId: string, busId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_bus_maintenance')
      .select('cost')
      .eq('school_id', schoolId)
      .eq('bus_id', busId);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.cost ?? 0), 0);
  }

  async findBusInsuranceById(schoolId: string, id: string): Promise<ScBusInsurance> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusInsuranceNotFoundError(id);
    return data;
  }

  async findAllBusInsurance(schoolId: string): Promise<ScBusInsurance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBusInsurance(schoolId: string, insurance: Partial<ScBusInsurance>): Promise<ScBusInsurance> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .insert({ ...insurance, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBusInsurance(schoolId: string, id: string, updates: Partial<ScBusInsurance>): Promise<ScBusInsurance> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusInsuranceNotFoundError(id);
    return data;
  }

  async deleteBusInsurance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_bus_insurance')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBusInsuranceByBus(schoolId: string, busId: string): Promise<ScBusInsurance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .order('expiry_date', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async findExpiringBusInsurance(schoolId: string, withinDays: number): Promise<ScBusInsurance[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('school_id', schoolId)
      .lte('expiry_date', futureDate.toISOString())
      .gte('expiry_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async renewBusInsurance(schoolId: string, busId: string, newPolicyNumber: string, newExpiryDate: string): Promise<ScBusInsurance> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .insert({
        school_id: schoolId,
        bus_id: busId,
        policy_number: newPolicyNumber,
        expiry_date: newExpiryDate,
        status: 'active',
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findExpiredBusInsurance(schoolId: string): Promise<ScBusInsurance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('school_id', schoolId)
      .lt('expiry_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async countBusInsurance(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBusInsuranceByProvider(schoolId: string, provider: string): Promise<ScBusInsurance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('provider', provider);
    if (error) throw error;
    return data ?? [];
  }

  async getActiveBusInsurance(schoolId: string): Promise<ScBusInsurance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .gte('expiry_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findBusInsuranceByCostRange(schoolId: string, minCost: number, maxCost: number): Promise<ScBusInsurance[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_insurance')
      .select('*')
      .eq('school_id', schoolId)
      .gte('premium_amount', minCost)
      .lte('premium_amount', maxCost);
    if (error) throw error;
    return data ?? [];
  }

  async findBusIncidentById(schoolId: string, id: string): Promise<ScBusIncident> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBusIncidentNotFoundError(id);
    return data;
  }

  async findAllBusIncidents(schoolId: string): Promise<ScBusIncident[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBusIncident(schoolId: string, incident: Partial<ScBusIncident>): Promise<ScBusIncident> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .insert({ ...incident, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBusIncident(schoolId: string, id: string, updates: Partial<ScBusIncident>): Promise<ScBusIncident> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusIncidentNotFoundError(id);
    return data;
  }

  async deleteBusIncident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_bus_incidents')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBusIncidentsBySeverity(schoolId: string, severity: string): Promise<ScBusIncident[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('severity', severity);
    if (error) throw error;
    return data ?? [];
  }

  async findBusIncidentsByBus(schoolId: string, busId: string): Promise<ScBusIncident[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .order('incident_date', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async findRecentBusIncidents(schoolId: string, days: number): Promise<ScBusIncident[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*')
      .eq('school_id', schoolId)
      .gte('incident_date', since.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async resolveBusIncident(schoolId: string, id: string, resolutionNotes: string): Promise<ScBusIncident> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .update({ status: 'resolved', resolution_notes: resolutionNotes, resolved_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBusIncidentNotFoundError(id);
    return data;
  }

  async countBusIncidents(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBusIncidentsByDriver(schoolId: string, driverId: string): Promise<ScBusIncident[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('driver_id', driverId);
    if (error) throw error;
    return data ?? [];
  }

  async findUnresolvedBusIncidents(schoolId: string): Promise<ScBusIncident[]> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'open');
    if (error) throw error;
    return data ?? [];
  }

  async getIncidentCountBySeverity(schoolId: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .from('sc_bus_incidents')
      .select('severity')
      .eq('school_id', schoolId);
    if (error) throw error;
    const counts: Record<string, number> = {};
    for (const record of data ?? []) {
      const sev = record.severity ?? 'unknown';
      counts[sev] = (counts[sev] ?? 0) + 1;
    }
    return counts;
  }

  async findEmergencyAlertById(schoolId: string, id: string): Promise<ScEmergencyAlert> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScEmergencyAlertNotFoundError(id);
    return data;
  }

  async findAllEmergencyAlerts(schoolId: string): Promise<ScEmergencyAlert[]> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEmergencyAlert(schoolId: string, alert: Partial<ScEmergencyAlert>): Promise<ScEmergencyAlert> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .insert({ ...alert, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEmergencyAlert(schoolId: string, id: string, updates: Partial<ScEmergencyAlert>): Promise<ScEmergencyAlert> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScEmergencyAlertNotFoundError(id);
    return data;
  }

  async deleteEmergencyAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_emergency_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEmergencyAlertsByType(schoolId: string, alertType: string): Promise<ScEmergencyAlert[]> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('alert_type', alertType);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveEmergencyAlerts(schoolId: string): Promise<ScEmergencyAlert[]> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async dismissEmergencyAlert(schoolId: string, id: string): Promise<ScEmergencyAlert> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .update({ status: 'dismissed', dismissed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScEmergencyAlertNotFoundError(id);
    return data;
  }

  async findEmergencyAlertsByBus(schoolId: string, busId: string): Promise<ScEmergencyAlert[]> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('bus_id', busId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async countEmergencyAlerts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRecentEmergencyAlerts(schoolId: string, days: number): Promise<ScEmergencyAlert[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*')
      .eq('school_id', schoolId)
      .gte('created_at', since.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findEmergencyAlertsBySeverity(schoolId: string, severity: string): Promise<ScEmergencyAlert[]> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('*')
      .eq('school_id', schoolId)
      .eq('severity', severity);
    if (error) throw error;
    return data ?? [];
  }

  async resolveEmergencyAlert(schoolId: string, id: string, resolutionNotes: string): Promise<ScEmergencyAlert> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .update({ status: 'resolved', resolution_notes: resolutionNotes, resolved_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScEmergencyAlertNotFoundError(id);
    return data;
  }

  async getEmergencyAlertCountByType(schoolId: string): Promise<Record<string, number>> {
    const { data, error } = await this.supabase
      .from('sc_emergency_alerts')
      .select('alert_type')
      .eq('school_id', schoolId);
    if (error) throw error;
    const counts: Record<string, number> = {};
    for (const record of data ?? []) {
      const type = record.alert_type ?? 'unknown';
      counts[type] = (counts[type] ?? 0) + 1;
    }
    return counts;
  }

  async findBookById(schoolId: string, id: string): Promise<ScBook> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookNotFoundError(id);
    return data;
  }

  async findAllBooks(schoolId: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBook(schoolId: string, book: Partial<ScBook>): Promise<ScBook> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .insert({ ...book, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBook(schoolId: string, id: string, updates: Partial<ScBook>): Promise<ScBook> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookNotFoundError(id);
    return data;
  }

  async deleteBook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_books')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBookByISBN(schoolId: string, isbn: string): Promise<ScBook> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('isbn', isbn)
      .single();
    if (error) throw new ScBookNotFoundError(isbn);
    return data;
  }

  async findBookByTitle(schoolId: string, title: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('title', `%${title}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findAvailableBooks(schoolId: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*, sc_book_copies(*)')
      .eq('school_id', schoolId)
      .gt('available_count', 0);
    if (error) throw error;
    return data ?? [];
  }

  async findBooksByCategory(schoolId: string, categoryId: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category_id', categoryId);
    if (error) throw error;
    return data ?? [];
  }

  async countBooks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_books')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBooksByAuthor(schoolId: string, authorId: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('author_id', authorId);
    if (error) throw error;
    return data ?? [];
  }

  async findPopularBooks(schoolId: string, limit: number): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .order('loan_count', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  }

  async searchBooks(schoolId: string, query: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .or(`title.ilike.%${query}%,isbn.ilike.%${query}%,author.ilike.%${query}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findBooksByPublisher(schoolId: string, publisherId: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('publisher_id', publisherId);
    if (error) throw error;
    return data ?? [];
  }

  async findBooksByLanguage(schoolId: string, language: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('language', language);
    if (error) throw error;
    return data ?? [];
  }

  async findBooksByYear(schoolId: string, year: number): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('publication_year', year);
    if (error) throw error;
    return data ?? [];
  }

  async findBooksByGradeLevel(schoolId: string, gradeLevel: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('grade_level', gradeLevel);
    if (error) throw error;
    return data ?? [];
  }

  async updateBookStock(schoolId: string, id: string, quantityChange: number): Promise<ScBook> {
    const book = await this.findBookById(schoolId, id);
    const { data, error } = await this.supabase
      .from('sc_books')
      .update({ total_copies: (book.total_copies ?? 0) + quantityChange })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookNotFoundError(id);
    return data;
  }

  async findBooksWithDetails(schoolId: string, id: string): Promise<ScBook> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*, sc_authors(*), sc_publishers(*), sc_book_categories(*), sc_book_copies(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookNotFoundError(id);
    return data;
  }

  async findBookByBarcode(schoolId: string, barcode: string): Promise<ScBook> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('barcode', barcode)
      .single();
    if (error) throw new ScBookNotFoundError(barcode);
    return data;
  }

  async findAuthorById(schoolId: string, id: string): Promise<ScAuthor> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScAuthorNotFoundError(id);
    return data;
  }

  async findAllAuthors(schoolId: string): Promise<ScAuthor[]> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAuthor(schoolId: string, author: Partial<ScAuthor>): Promise<ScAuthor> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .insert({ ...author, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAuthor(schoolId: string, id: string, updates: Partial<ScAuthor>): Promise<ScAuthor> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScAuthorNotFoundError(id);
    return data;
  }

  async deleteAuthor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_authors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAuthorByName(schoolId: string, name: string): Promise<ScAuthor[]> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${name}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findAuthorBooks(schoolId: string, authorId: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('author_id', authorId);
    if (error) throw error;
    return data ?? [];
  }

  async countAuthors(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_authors')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAuthorsWithBookCount(schoolId: string): Promise<ScAuthor[]> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .select('*, sc_books(count)')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findAuthorByNationality(schoolId: string, nationality: string): Promise<ScAuthor[]> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .select('*')
      .eq('school_id', schoolId)
      .eq('nationality', nationality);
    if (error) throw error;
    return data ?? [];
  }

  async findAuthorsAlphabetical(schoolId: string): Promise<ScAuthor[]> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .select('*')
      .eq('school_id', schoolId)
      .order('name', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }

  async searchAuthors(schoolId: string, query: string): Promise<ScAuthor[]> {
    const { data, error } = await this.supabase
      .from('sc_authors')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${query}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findPublisherById(schoolId: string, id: string): Promise<ScPublisher> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScPublisherNotFoundError(id);
    return data;
  }

  async findAllPublishers(schoolId: string): Promise<ScPublisher[]> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createPublisher(schoolId: string, publisher: Partial<ScPublisher>): Promise<ScPublisher> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .insert({ ...publisher, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updatePublisher(schoolId: string, id: string, updates: Partial<ScPublisher>): Promise<ScPublisher> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScPublisherNotFoundError(id);
    return data;
  }

  async deletePublisher(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_publishers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findPublisherByName(schoolId: string, name: string): Promise<ScPublisher> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${name}%`)
      .single();
    if (error) throw new ScPublisherNotFoundError(name);
    return data;
  }

  async findPublisherBooks(schoolId: string, publisherId: string): Promise<ScBook[]> {
    const { data, error } = await this.supabase
      .from('sc_books')
      .select('*')
      .eq('school_id', schoolId)
      .eq('publisher_id', publisherId);
    if (error) throw error;
    return data ?? [];
  }

  async countPublishers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_publishers')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findPublishersWithBookCount(schoolId: string): Promise<ScPublisher[]> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .select('*, sc_books(count)')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async searchPublishers(schoolId: string, query: string): Promise<ScPublisher[]> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${query}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findPublishersAlphabetical(schoolId: string): Promise<ScPublisher[]> {
    const { data, error } = await this.supabase
      .from('sc_publishers')
      .select('*')
      .eq('school_id', schoolId)
      .order('name', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }

  async findBookCategoryById(schoolId: string, id: string): Promise<ScBookCategory> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookCategoryNotFoundError(id);
    return data;
  }

  async findAllBookCategories(schoolId: string): Promise<ScBookCategory[]> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBookCategory(schoolId: string, category: Partial<ScBookCategory>): Promise<ScBookCategory> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .insert({ ...category, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBookCategory(schoolId: string, id: string, updates: Partial<ScBookCategory>): Promise<ScBookCategory> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookCategoryNotFoundError(id);
    return data;
  }

  async deleteBookCategory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_book_categories')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBookCategoryByName(schoolId: string, name: string): Promise<ScBookCategory> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', name)
      .single();
    if (error) throw new ScBookCategoryNotFoundError(name);
    return data;
  }

  async findSubcategories(schoolId: string, parentId: string): Promise<ScBookCategory[]> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*')
      .eq('school_id', schoolId)
      .eq('parent_id', parentId);
    if (error) throw error;
    return data ?? [];
  }

  async findRootCategories(schoolId: string): Promise<ScBookCategory[]> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*')
      .eq('school_id', schoolId)
      .is('parent_id', null);
    if (error) throw error;
    return data ?? [];
  }

  async countBookCategories(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_categories')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCategoriesWithBookCount(schoolId: string): Promise<ScBookCategory[]> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*, sc_books(count)')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async findCategoryTree(schoolId: string): Promise<ScBookCategory[]> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*, sc_book_categories(*)')
      .eq('school_id', schoolId)
      .is('parent_id', null);
    if (error) throw error;
    return data ?? [];
  }

  async searchCategories(schoolId: string, query: string): Promise<ScBookCategory[]> {
    const { data, error } = await this.supabase
      .from('sc_book_categories')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${query}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findBookCopyById(schoolId: string, id: string): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookCopyNotFoundError(id);
    return data;
  }

  async findAllBookCopies(schoolId: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBookCopy(schoolId: string, copy: Partial<ScBookCopy>): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .insert({ ...copy, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBookCopy(schoolId: string, id: string, updates: Partial<ScBookCopy>): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookCopyNotFoundError(id);
    return data;
  }

  async deleteBookCopy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_book_copies')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBookCopiesByBook(schoolId: string, bookId: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId);
    if (error) throw error;
    return data ?? [];
  }

  async findAvailableBookCopies(schoolId: string, bookId: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId)
      .eq('status', 'available');
    if (error) throw error;
    return data ?? [];
  }

  async findDamagedBookCopies(schoolId: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('condition', 'damaged');
    if (error) throw error;
    return data ?? [];
  }

  async updateBookCopyCondition(schoolId: string, id: string, condition: string): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .update({ condition })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookCopyNotFoundError(id);
    return data;
  }

  async countBookCopies(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_copies')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBookCopiesByShelf(schoolId: string, shelfLocation: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('shelf_location', shelfLocation);
    if (error) throw error;
    return data ?? [];
  }

  async findBookCopyByBarcode(schoolId: string, barcode: string): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('barcode', barcode)
      .single();
    if (error) throw new ScBookCopyNotFoundError(barcode);
    return data;
  }

  async findLostBookCopies(schoolId: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'lost');
    if (error) throw error;
    return data ?? [];
  }

  async markBookCopyLost(schoolId: string, id: string): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .update({ status: 'lost' })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookCopyNotFoundError(id);
    return data;
  }

  async findBookCopiesByAcquisition(schoolId: string, acquisitionId: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('acquisition_id', acquisitionId);
    if (error) throw error;
    return data ?? [];
  }

  async markBookCopyAvailable(schoolId: string, id: string): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .update({ status: 'available' })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookCopyNotFoundError(id);
    return data;
  }

  async findBookCopiesByStatus(schoolId: string, status: string): Promise<ScBookCopy[]> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async markBookCopyDamaged(schoolId: string, id: string, notes: string): Promise<ScBookCopy> {
    const { data, error } = await this.supabase
      .from('sc_book_copies')
      .update({ condition: 'damaged', damage_notes: notes })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookCopyNotFoundError(id);
    return data;
  }

  async findOverdueBookLoans(schoolId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'overdue')
      .lt('due_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findBookLoansByBook(schoolId: string, bookId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId);
    if (error) throw error;
    return data ?? [];
  }

  async findBookLoanById(schoolId: string, id: string): Promise<ScBookLoan> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookLoanNotFoundError(id);
    return data;
  }

  async findAllBookLoans(schoolId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBookLoan(schoolId: string, loan: Partial<ScBookLoan>): Promise<ScBookLoan> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .insert({ ...loan, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBookLoan(schoolId: string, id: string, updates: Partial<ScBookLoan>): Promise<ScBookLoan> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookLoanNotFoundError(id);
    return data;
  }

  async deleteBookLoan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_book_loans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBookLoansByStudent(schoolId: string, studentId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBookLoans(schoolId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async renewBookLoan(schoolId: string, id: string, newDueDate: string): Promise<ScBookLoan> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .update({ due_date: newDueDate, renewed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookLoanNotFoundError(id);
    return data;
  }

  async countBookLoans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_loans')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBookLoansByDate(schoolId: string, date: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('loan_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findBookLoansWithDetails(schoolId: string, id: string): Promise<ScBookLoan> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*, sc_books(*), sc_library_cards(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookLoanNotFoundError(id);
    return data;
  }

  async countActiveLoansByStudent(schoolId: string, studentId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_loans')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .eq('status', 'active');
    if (error) throw error;
    return count ?? 0;
  }

  async findRecentBookLoans(schoolId: string, days: number): Promise<ScBookLoan[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .gte('loan_date', since.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findBookLoansByCard(schoolId: string, cardId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('library_card_id', cardId);
    if (error) throw error;
    return data ?? [];
  }

  async getOverdueLoanCount(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_loans')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('status', 'overdue');
    if (error) throw error;
    return count ?? 0;
  }

  async findBookLoansByDateRange(schoolId: string, from: string, to: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .gte('loan_date', from)
      .lte('loan_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findOverdueBookLoansByStudent(schoolId: string, studentId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .eq('status', 'overdue');
    if (error) throw error;
    return data ?? [];
  }

  async findBookLoansByStatus(schoolId: string, status: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async markBookLoanReturned(schoolId: string, id: string): Promise<ScBookLoan> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .update({ status: 'returned', returned_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookLoanNotFoundError(id);
    return data;
  }

  async findBookLoansWithFees(schoolId: string): Promise<ScBookLoan[]> {
    const { data, error } = await this.supabase
      .from('sc_book_loans')
      .select('*, sc_late_fees(*)')
      .eq('school_id', schoolId)
      .not('sc_late_fees.id', 'is', null);
    if (error) throw error;
    return data ?? [];
  }

  async findBookReturnById(schoolId: string, id: string): Promise<ScBookReturn> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookReturnNotFoundError(id);
    return data;
  }

  async findAllBookReturns(schoolId: string): Promise<ScBookReturn[]> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBookReturn(schoolId: string, bookReturn: Partial<ScBookReturn>): Promise<ScBookReturn> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .insert({ ...bookReturn, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findBookReturnsByLoan(schoolId: string, loanId: string): Promise<ScBookReturn[]> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*')
      .eq('school_id', schoolId)
      .eq('loan_id', loanId);
    if (error) throw error;
    return data ?? [];
  }

  async findRecentBookReturns(schoolId: string, days: number): Promise<ScBookReturn[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*')
      .eq('school_id', schoolId)
      .gte('returned_at', since.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async countBookReturns(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_returns')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBookReturnsByDate(schoolId: string, date: string): Promise<ScBookReturn[]> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*')
      .eq('school_id', schoolId)
      .eq('return_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findBookReturnWithDetails(schoolId: string, id: string): Promise<ScBookReturn> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*, sc_book_loans(*, sc_books(*))')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookReturnNotFoundError(id);
    return data;
  }

  async findBookReturnsByCondition(schoolId: string, condition: string): Promise<ScBookReturn[]> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*')
      .eq('school_id', schoolId)
      .eq('return_condition', condition);
    if (error) throw error;
    return data ?? [];
  }

  async findBookReturnsByDateRange(schoolId: string, from: string, to: string): Promise<ScBookReturn[]> {
    const { data, error } = await this.supabase
      .from('sc_book_returns')
      .select('*')
      .eq('school_id', schoolId)
      .gte('returned_at', from)
      .lte('returned_at', to);
    if (error) throw error;
    return data ?? [];
  }

  async findBookReservationById(schoolId: string, id: string): Promise<ScBookReservation> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookReservationNotFoundError(id);
    return data;
  }

  async findAllBookReservations(schoolId: string): Promise<ScBookReservation[]> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBookReservation(schoolId: string, reservation: Partial<ScBookReservation>): Promise<ScBookReservation> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .insert({ ...reservation, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBookReservation(schoolId: string, id: string, updates: Partial<ScBookReservation>): Promise<ScBookReservation> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookReservationNotFoundError(id);
    return data;
  }

  async deleteBookReservation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_book_reservations')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBookReservationsByStudent(schoolId: string, studentId: string): Promise<ScBookReservation[]> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findBookReservationsByBook(schoolId: string, bookId: string): Promise<ScBookReservation[]> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId)
      .order('reservation_date');
    if (error) throw error;
    return data ?? [];
  }

  async findActiveBookReservations(schoolId: string): Promise<ScBookReservation[]> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async cancelBookReservation(schoolId: string, id: string): Promise<ScBookReservation> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookReservationNotFoundError(id);
    return data;
  }

  async fulfillBookReservation(schoolId: string, id: string): Promise<ScBookReservation> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .update({ status: 'fulfilled', fulfilled_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookReservationNotFoundError(id);
    return data;
  }

  async countBookReservations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBookReservationsByStatus(schoolId: string, status: string): Promise<ScBookReservation[]> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findExpiringBookReservations(schoolId: string, withinDays: number): Promise<ScBookReservation[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending')
      .lte('expiry_date', futureDate.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findBookReservationWithDetails(schoolId: string, id: string): Promise<ScBookReservation> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*, sc_books(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookReservationNotFoundError(id);
    return data;
  }

  async findBookReservationsByDateRange(schoolId: string, from: string, to: string): Promise<ScBookReservation[]> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId)
      .gte('reservation_date', from)
      .lte('reservation_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingReservationsByBook(schoolId: string, bookId: string): Promise<ScBookReservation[]> {
    const { data, error } = await this.supabase
      .from('sc_book_reservations')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId)
      .eq('status', 'pending')
      .order('reservation_date');
    if (error) throw error;
    return data ?? [];
  }

  async findLateFeeById(schoolId: string, id: string): Promise<ScLateFee> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScLateFeeNotFoundError(id);
    return data;
  }

  async findAllLateFees(schoolId: string): Promise<ScLateFee[]> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createLateFee(schoolId: string, fee: Partial<ScLateFee>): Promise<ScLateFee> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .insert({ ...fee, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateLateFee(schoolId: string, id: string, updates: Partial<ScLateFee>): Promise<ScLateFee> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLateFeeNotFoundError(id);
    return data;
  }

  async deleteLateFee(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_late_fees')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findLateFeesByLoan(schoolId: string, loanId: string): Promise<ScLateFee[]> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('school_id', schoolId)
      .eq('loan_id', loanId);
    if (error) throw error;
    return data ?? [];
  }

  async findUnpaidLateFees(schoolId: string): Promise<ScLateFee[]> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'unpaid');
    if (error) throw error;
    return data ?? [];
  }

  async markLateFeePaid(schoolId: string, id: string): Promise<ScLateFee> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLateFeeNotFoundError(id);
    return data;
  }

  async countLateFees(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_late_fees')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findLateFeesByStudent(schoolId: string, studentId: string): Promise<ScLateFee[]> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async calculateTotalUnpaidFees(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('amount')
      .eq('school_id', schoolId)
      .eq('status', 'unpaid');
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.amount ?? 0), 0);
  }

  async findLateFeesByDateRange(schoolId: string, from: string, to: string): Promise<ScLateFee[]> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('school_id', schoolId)
      .gte('created_at', from)
      .lte('created_at', to);
    if (error) throw error;
    return data ?? [];
  }

  async findLateFeesByAmount(schoolId: string, minAmount: number, maxAmount: number): Promise<ScLateFee[]> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('school_id', schoolId)
      .gte('amount', minAmount)
      .lte('amount', maxAmount);
    if (error) throw error;
    return data ?? [];
  }

  async findLateFeeWithDetails(schoolId: string, id: string): Promise<ScLateFee> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*, sc_book_loans(*, sc_books(*))')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScLateFeeNotFoundError(id);
    return data;
  }

  async findWaivedLateFees(schoolId: string): Promise<ScLateFee[]> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'waived');
    if (error) throw error;
    return data ?? [];
  }

  async waiveLateFee(schoolId: string, id: string, reason: string): Promise<ScLateFee> {
    const { data, error } = await this.supabase
      .from('sc_late_fees')
      .update({ status: 'waived', waiver_reason: reason, waived_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLateFeeNotFoundError(id);
    return data;
  }

  async findEbookById(schoolId: string, id: string): Promise<ScEbook> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScEbookNotFoundError(id);
    return data;
  }

  async findAllEbooks(schoolId: string): Promise<ScEbook[]> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEbook(schoolId: string, ebook: Partial<ScEbook>): Promise<ScEbook> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .insert({ ...ebook, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateEbook(schoolId: string, id: string, updates: Partial<ScEbook>): Promise<ScEbook> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScEbookNotFoundError(id);
    return data;
  }

  async deleteEbook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_ebooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEbooksByFormat(schoolId: string, format: string): Promise<ScEbook[]> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .select('*')
      .eq('school_id', schoolId)
      .eq('format', format);
    if (error) throw error;
    return data ?? [];
  }

  async findEbooksByBook(schoolId: string, bookId: string): Promise<ScEbook[]> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId);
    if (error) throw error;
    return data ?? [];
  }

  async countEbooks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_ebooks')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEbooksByFileSize(schoolId: string, minSize: number, maxSize: number): Promise<ScEbook[]> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .select('*')
      .eq('school_id', schoolId)
      .gte('file_size', minSize)
      .lte('file_size', maxSize);
    if (error) throw error;
    return data ?? [];
  }

  async findEbookWithDetails(schoolId: string, id: string): Promise<ScEbook> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .select('*, sc_books(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScEbookNotFoundError(id);
    return data;
  }

  async searchEbooks(schoolId: string, query: string): Promise<ScEbook[]> {
    const { data, error } = await this.supabase
      .from('sc_ebooks')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('title', `%${query}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findAudiobookById(schoolId: string, id: string): Promise<ScAudiobook> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScAudiobookNotFoundError(id);
    return data;
  }

  async findAllAudiobooks(schoolId: string): Promise<ScAudiobook[]> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAudiobook(schoolId: string, audiobook: Partial<ScAudiobook>): Promise<ScAudiobook> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .insert({ ...audiobook, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAudiobook(schoolId: string, id: string, updates: Partial<ScAudiobook>): Promise<ScAudiobook> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScAudiobookNotFoundError(id);
    return data;
  }

  async deleteAudiobook(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_audiobooks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAudiobooksByNarrator(schoolId: string, narrator: string): Promise<ScAudiobook[]> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('narrator', `%${narrator}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findAudiobooksByBook(schoolId: string, bookId: string): Promise<ScAudiobook[]> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId);
    if (error) throw error;
    return data ?? [];
  }

  async countAudiobooks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAudiobooksByDuration(schoolId: string, minMinutes: number, maxMinutes: number): Promise<ScAudiobook[]> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*')
      .eq('school_id', schoolId)
      .gte('duration_minutes', minMinutes)
      .lte('duration_minutes', maxMinutes);
    if (error) throw error;
    return data ?? [];
  }

  async findAudiobookWithDetails(schoolId: string, id: string): Promise<ScAudiobook> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*, sc_books(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScAudiobookNotFoundError(id);
    return data;
  }

  async searchAudiobooks(schoolId: string, query: string): Promise<ScAudiobook[]> {
    const { data, error } = await this.supabase
      .from('sc_audiobooks')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('title', `%${query}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findRfidTagById(schoolId: string, id: string): Promise<ScRfidTag> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScRfidTagNotFoundError(id);
    return data;
  }

  async findAllRfidTags(schoolId: string): Promise<ScRfidTag[]> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRfidTag(schoolId: string, tag: Partial<ScRfidTag>): Promise<ScRfidTag> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .insert({ ...tag, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateRfidTag(schoolId: string, id: string, updates: Partial<ScRfidTag>): Promise<ScRfidTag> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScRfidTagNotFoundError(id);
    return data;
  }

  async deleteRfidTag(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_rfid_tags')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findRfidTagByTagCode(schoolId: string, tagCode: string): Promise<ScRfidTag> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('school_id', schoolId)
      .eq('tag_code', tagCode)
      .single();
    if (error) throw new ScRfidTagNotFoundError(tagCode);
    return data;
  }

  async findRfidTagsByBook(schoolId: string, bookId: string): Promise<ScRfidTag[]> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId);
    if (error) throw error;
    return data ?? [];
  }

  async deactivateRfidTag(schoolId: string, id: string): Promise<ScRfidTag> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .update({ status: 'inactive', deactivated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScRfidTagNotFoundError(id);
    return data;
  }

  async countRfidTags(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findActiveRfidTags(schoolId: string): Promise<ScRfidTag[]> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findRfidTagsByStatus(schoolId: string, status: string): Promise<ScRfidTag[]> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findRfidTagWithDetails(schoolId: string, id: string): Promise<ScRfidTag> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*, sc_books(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScRfidTagNotFoundError(id);
    return data;
  }

  async findRfidTagsByDateAssigned(schoolId: string, date: string): Promise<ScRfidTag[]> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('school_id', schoolId)
      .eq('assigned_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async reactivateRfidTag(schoolId: string, id: string): Promise<ScRfidTag> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .update({ status: 'active', deactivated_at: null })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScRfidTagNotFoundError(id);
    return data;
  }

  async findRfidTagsByType(schoolId: string, tagType: string): Promise<ScRfidTag[]> {
    const { data, error } = await this.supabase
      .from('sc_rfid_tags')
      .select('*')
      .eq('school_id', schoolId)
      .eq('tag_type', tagType);
    if (error) throw error;
    return data ?? [];
  }

  async findLibraryInventoryById(schoolId: string, id: string): Promise<ScLibraryInventory> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScLibraryInventoryNotFoundError(id);
    return data;
  }

  async findAllLibraryInventory(schoolId: string): Promise<ScLibraryInventory[]> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createLibraryInventory(schoolId: string, inventory: Partial<ScLibraryInventory>): Promise<ScLibraryInventory> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .insert({ ...inventory, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateLibraryInventory(schoolId: string, id: string, updates: Partial<ScLibraryInventory>): Promise<ScLibraryInventory> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLibraryInventoryNotFoundError(id);
    return data;
  }

  async deleteLibraryInventory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_library_inventory')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findLibraryInventoryByBook(schoolId: string, bookId: string): Promise<ScLibraryInventory[]> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*')
      .eq('school_id', schoolId)
      .eq('book_id', bookId);
    if (error) throw error;
    return data ?? [];
  }

  async findLowStockLibraryInventory(schoolId: string, threshold: number): Promise<ScLibraryInventory[]> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*')
      .eq('school_id', schoolId)
      .lte('quantity', threshold);
    if (error) throw error;
    return data ?? [];
  }

  async countLibraryInventory(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findLibraryInventoryByLocation(schoolId: string, location: string): Promise<ScLibraryInventory[]> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*')
      .eq('school_id', schoolId)
      .eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async updateLibraryInventoryQuantity(schoolId: string, id: string, quantity: number): Promise<ScLibraryInventory> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .update({ quantity, last_counted_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLibraryInventoryNotFoundError(id);
    return data;
  }

  async findLibraryInventoryWithDetails(schoolId: string, id: string): Promise<ScLibraryInventory> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*, sc_books(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScLibraryInventoryNotFoundError(id);
    return data;
  }

  async findLibraryInventoryByDateRange(schoolId: string, from: string, to: string): Promise<ScLibraryInventory[]> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*')
      .eq('school_id', schoolId)
      .gte('last_counted_at', from)
      .lte('last_counted_at', to);
    if (error) throw error;
    return data ?? [];
  }

  async findLibraryInventoryNeedingReorder(schoolId: string): Promise<ScLibraryInventory[]> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('*')
      .eq('school_id', schoolId)
      .lte('quantity', 5);
    if (error) throw error;
    return data ?? [];
  }

  async getTotalInventoryCount(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_library_inventory')
      .select('quantity')
      .eq('school_id', schoolId);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.quantity ?? 0), 0);
  }

  async findBookAcquisitionById(schoolId: string, id: string): Promise<ScBookAcquisition> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookAcquisitionNotFoundError(id);
    return data;
  }

  async findAllBookAcquisitions(schoolId: string): Promise<ScBookAcquisition[]> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBookAcquisition(schoolId: string, acquisition: Partial<ScBookAcquisition>): Promise<ScBookAcquisition> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .insert({ ...acquisition, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateBookAcquisition(schoolId: string, id: string, updates: Partial<ScBookAcquisition>): Promise<ScBookAcquisition> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookAcquisitionNotFoundError(id);
    return data;
  }

  async deleteBookAcquisition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_book_acquisitions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBookAcquisitionsByStatus(schoolId: string, status: string): Promise<ScBookAcquisition[]> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async approveBookAcquisition(schoolId: string, id: string): Promise<ScBookAcquisition> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .update({ status: 'approved', approved_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookAcquisitionNotFoundError(id);
    return data;
  }

  async rejectBookAcquisition(schoolId: string, id: string, reason: string): Promise<ScBookAcquisition> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .update({ status: 'rejected', rejection_reason: reason, rejected_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookAcquisitionNotFoundError(id);
    return data;
  }

  async countBookAcquisitions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBookAcquisitionWithDetails(schoolId: string, id: string): Promise<ScBookAcquisition> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*, sc_books(*), sc_publishers(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScBookAcquisitionNotFoundError(id);
    return data;
  }

  async findBookAcquisitionsByDateRange(schoolId: string, from: string, to: string): Promise<ScBookAcquisition[]> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*')
      .eq('school_id', schoolId)
      .gte('request_date', from)
      .lte('request_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingBookAcquisitions(schoolId: string): Promise<ScBookAcquisition[]> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async getAcquisitionTotalCost(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('total_cost')
      .eq('school_id', schoolId);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.total_cost ?? 0), 0);
  }

  async completeBookAcquisition(schoolId: string, id: string): Promise<ScBookAcquisition> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScBookAcquisitionNotFoundError(id);
    return data;
  }

  async findBookAcquisitionsByRequester(schoolId: string, requesterId: string): Promise<ScBookAcquisition[]> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('requested_by', requesterId);
    if (error) throw error;
    return data ?? [];
  }

  async findBookAcquisitionsByPriority(schoolId: string, priority: string): Promise<ScBookAcquisition[]> {
    const { data, error } = await this.supabase
      .from('sc_book_acquisitions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('priority', priority);
    if (error) throw error;
    return data ?? [];
  }

  async findLibraryCardById(schoolId: string, id: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScLibraryCardNotFoundError(id);
    return data;
  }

  async findAllLibraryCards(schoolId: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createLibraryCard(schoolId: string, card: Partial<ScLibraryCard>): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .insert({ ...card, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateLibraryCard(schoolId: string, id: string, updates: Partial<ScLibraryCard>): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLibraryCardNotFoundError(id);
    return data;
  }

  async deleteLibraryCard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_library_cards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findLibraryCardByStudent(schoolId: string, studentId: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId)
      .single();
    if (error) throw new ScLibraryCardNotFoundError(studentId);
    return data;
  }

  async findActiveLibraryCards(schoolId: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async blockLibraryCard(schoolId: string, id: string, reason: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .update({ status: 'blocked', block_reason: reason, blocked_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLibraryCardNotFoundError(id);
    return data;
  }

  async unblockLibraryCard(schoolId: string, id: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .update({ status: 'active', block_reason: null, blocked_at: null })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLibraryCardNotFoundError(id);
    return data;
  }

  async countLibraryCards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_library_cards')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findLibraryCardByNumber(schoolId: string, cardNumber: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('card_number', cardNumber)
      .single();
    if (error) throw new ScLibraryCardNotFoundError(cardNumber);
    return data;
  }

  async findExpiringLibraryCards(schoolId: string, withinDays: number): Promise<ScLibraryCard[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lte('expiry_date', futureDate.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findLibraryCardWithDetails(schoolId: string, id: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*, sc_book_loans(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScLibraryCardNotFoundError(id);
    return data;
  }

  async renewLibraryCard(schoolId: string, id: string, newExpiryDate: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .update({ expiry_date: newExpiryDate, renewed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLibraryCardNotFoundError(id);
    return data;
  }

  async findLibraryCardsByStatus(schoolId: string, status: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findLibraryCardsByType(schoolId: string, cardType: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('card_type', cardType);
    if (error) throw error;
    return data ?? [];
  }

  async findLibraryCardsByGradeLevel(schoolId: string, gradeLevel: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('grade_level', gradeLevel);
    if (error) throw error;
    return data ?? [];
  }

  async findBlockedLibraryCards(schoolId: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'blocked');
    if (error) throw error;
    return data ?? [];
  }

  async getLibraryCardLoanCount(schoolId: string, cardId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_book_loans')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('library_card_id', cardId);
    if (error) throw error;
    return count ?? 0;
  }

  async findLibraryCardsByDateRange(schoolId: string, from: string, to: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .gte('issued_at', from)
      .lte('issued_at', to);
    if (error) throw error;
    return data ?? [];
  }

  async searchLibraryCards(schoolId: string, query: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .or(`card_number.ilike.%${query}%,student_name.ilike.%${query}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findExpiredLibraryCards(schoolId: string): Promise<ScLibraryCard[]> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .select('*')
      .eq('school_id', schoolId)
      .lt('expiry_date', new Date().toISOString())
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async suspendLibraryCard(schoolId: string, id: string, reason: string): Promise<ScLibraryCard> {
    const { data, error } = await this.supabase
      .from('sc_library_cards')
      .update({ status: 'suspended', suspension_reason: reason, suspended_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScLibraryCardNotFoundError(id);
    return data;
  }

  async findMenuById(schoolId: string, id: string): Promise<ScMenu> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMenuNotFoundError(id);
    return data;
  }

  async findAllMenus(schoolId: string): Promise<ScMenu[]> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMenu(schoolId: string, menu: Partial<ScMenu>): Promise<ScMenu> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .insert({ ...menu, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMenu(schoolId: string, id: string, updates: Partial<ScMenu>): Promise<ScMenu> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMenuNotFoundError(id);
    return data;
  }

  async deleteMenu(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_menus')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMenusByDate(schoolId: string, date: string): Promise<ScMenu[]> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*, sc_meals(*)')
      .eq('school_id', schoolId)
      .eq('menu_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMenus(schoolId: string): Promise<ScMenu[]> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMenusByWeek(schoolId: string, weekStart: string, weekEnd: string): Promise<ScMenu[]> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*, sc_meals(*)')
      .eq('school_id', schoolId)
      .gte('menu_date', weekStart)
      .lte('menu_date', weekEnd);
    if (error) throw error;
    return data ?? [];
  }

  async countMenus(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_menus')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMenuWithMeals(schoolId: string, id: string): Promise<ScMenu> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*, sc_meals(*, sc_nutrition(*), sc_allergens(*))')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMenuNotFoundError(id);
    return data;
  }

  async findMenusByType(schoolId: string, mealType: string): Promise<ScMenu[]> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*')
      .eq('school_id', schoolId)
      .eq('meal_type', mealType);
    if (error) throw error;
    return data ?? [];
  }

  async findMenusByDateRange(schoolId: string, from: string, to: string): Promise<ScMenu[]> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*')
      .eq('school_id', schoolId)
      .gte('menu_date', from)
      .lte('menu_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findCurrentMenu(schoolId: string): Promise<ScMenu> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await this.supabase
      .from('sc_menus')
      .select('*, sc_meals(*)')
      .eq('school_id', schoolId)
      .eq('menu_date', today)
      .single();
    if (error) throw new ScMenuNotFoundError(today);
    return data;
  }

  async duplicateMenu(schoolId: string, sourceId: string, newDate: string): Promise<ScMenu> {
    const source = await this.findMenuById(schoolId, sourceId);
    const { data, error } = await this.supabase
      .from('sc_menus')
      .insert({ ...source, id: undefined, school_id: schoolId, menu_date: newDate, created_at: undefined })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async publishMenu(schoolId: string, id: string): Promise<ScMenu> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMenuNotFoundError(id);
    return data;
  }

  async archiveMenu(schoolId: string, id: string): Promise<ScMenu> {
    const { data, error } = await this.supabase
      .from('sc_menus')
      .update({ status: 'archived', archived_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMenuNotFoundError(id);
    return data;
  }

  async findMealById(schoolId: string, id: string): Promise<ScMeal> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealNotFoundError(id);
    return data;
  }

  async findAllMeals(schoolId: string): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMeal(schoolId: string, meal: Partial<ScMeal>): Promise<ScMeal> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .insert({ ...meal, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMeal(schoolId: string, id: string, updates: Partial<ScMeal>): Promise<ScMeal> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealNotFoundError(id);
    return data;
  }

  async deleteMeal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_meals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMealsByMenu(schoolId: string, menuId: string): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('menu_id', menuId);
    if (error) throw error;
    return data ?? [];
  }

  async findMealsByName(schoolId: string, name: string): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${name}%`);
    if (error) throw error;
    return data ?? [];
  }

  async findMealsByType(schoolId: string, mealType: string): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('meal_type', mealType);
    if (error) throw error;
    return data ?? [];
  }

  async countMeals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_meals')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMealWithNutrition(schoolId: string, id: string): Promise<ScMeal> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*, sc_nutrition(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealNotFoundError(id);
    return data;
  }

  async findMealWithAllergens(schoolId: string, id: string): Promise<ScMeal> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*, sc_allergens(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealNotFoundError(id);
    return data;
  }

  async findMealsByPriceRange(schoolId: string, minPrice: number, maxPrice: number): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId)
      .gte('price', minPrice)
      .lte('price', maxPrice);
    if (error) throw error;
    return data ?? [];
  }

  async findVegetarianMeals(schoolId: string): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_vegetarian', true);
    if (error) throw error;
    return data ?? [];
  }

  async findHalalMeals(schoolId: string): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_halal', true);
    if (error) throw error;
    return data ?? [];
  }

  async findNutritionById(schoolId: string, id: string): Promise<ScNutrition> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScNutritionNotFoundError(id);
    return data;
  }

  async findAllNutrition(schoolId: string): Promise<ScNutrition[]> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNutrition(schoolId: string, nutrition: Partial<ScNutrition>): Promise<ScNutrition> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .insert({ ...nutrition, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateNutrition(schoolId: string, id: string, updates: Partial<ScNutrition>): Promise<ScNutrition> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScNutritionNotFoundError(id);
    return data;
  }

  async deleteNutrition(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_nutrition')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findNutritionByMeal(schoolId: string, mealId: string): Promise<ScNutrition> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('school_id', schoolId)
      .eq('meal_id', mealId)
      .single();
    if (error) throw new ScNutritionNotFoundError(mealId);
    return data;
  }

  async findNutritionByCalories(schoolId: string, minCal: number, maxCal: number): Promise<ScNutrition[]> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('school_id', schoolId)
      .gte('calories', minCal)
      .lte('calories', maxCal);
    if (error) throw error;
    return data ?? [];
  }

  async countNutrition(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_nutrition')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findHighProteinMeals(schoolId: string, minProtein: number): Promise<ScNutrition[]> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('school_id', schoolId)
      .gte('protein_g', minProtein);
    if (error) throw error;
    return data ?? [];
  }

  async findLowCalorieMeals(schoolId: string, maxCal: number): Promise<ScNutrition[]> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('school_id', schoolId)
      .lte('calories', maxCal);
    if (error) throw error;
    return data ?? [];
  }

  async findLowSugarMeals(schoolId: string, maxSugar: number): Promise<ScNutrition[]> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('school_id', schoolId)
      .lte('sugar_g', maxSugar);
    if (error) throw error;
    return data ?? [];
  }

  async getAverageNutritionByMealType(schoolId: string, mealType: string): Promise<ScNutrition> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*, sc_meals(*)')
      .eq('school_id', schoolId)
      .eq('sc_meals.meal_type', mealType);
    if (error) throw error;
    const records = data ?? [];
    if (records.length === 0) return {} as ScNutrition;
    return {
      calories: records.reduce((s, r) => s + (r.calories ?? 0), 0) / records.length,
      protein_g: records.reduce((s, r) => s + (r.protein_g ?? 0), 0) / records.length,
      carbs_g: records.reduce((s, r) => s + (r.carbs_g ?? 0), 0) / records.length,
      fat_g: records.reduce((s, r) => s + (r.fat_g ?? 0), 0) / records.length,
    } as ScNutrition;
  }

  async findNutritionByIds(schoolId: string, ids: string[]): Promise<ScNutrition[]> {
    const { data, error } = await this.supabase
      .from('sc_nutrition')
      .select('*')
      .eq('school_id', schoolId)
      .in('id', ids);
    if (error) throw error;
    return data ?? [];
  }

  async findAllergenById(schoolId: string, id: string): Promise<ScAllergen> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScAllergenNotFoundError(id);
    return data;
  }

  async findAllAllergens(schoolId: string): Promise<ScAllergen[]> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAllergen(schoolId: string, allergen: Partial<ScAllergen>): Promise<ScAllergen> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .insert({ ...allergen, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateAllergen(schoolId: string, id: string, updates: Partial<ScAllergen>): Promise<ScAllergen> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScAllergenNotFoundError(id);
    return data;
  }

  async deleteAllergen(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_allergens')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAllergensByMeal(schoolId: string, mealId: string): Promise<ScAllergen[]> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .select('*')
      .eq('school_id', schoolId)
      .eq('meal_id', mealId);
    if (error) throw error;
    return data ?? [];
  }

  async findAllergensByName(schoolId: string, name: string): Promise<ScAllergen[]> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${name}%`);
    if (error) throw error;
    return data ?? [];
  }

  async countAllergens(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_allergens')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findCommonAllergens(schoolId: string): Promise<ScAllergen[]> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_common', true);
    if (error) throw error;
    return data ?? [];
  }

  async findMealsWithoutAllergen(schoolId: string, allergenId: string): Promise<ScMeal[]> {
    const { data, error } = await this.supabase
      .from('sc_meals')
      .select('*')
      .eq('school_id', schoolId)
      .not('id', 'in', this.supabase
        .from('sc_allergens')
        .select('meal_id')
        .eq('allergen_type', allergenId)
      );
    if (error) throw error;
    return data ?? [];
  }

  async findAllergenSeverity(schoolId: string, allergenType: string): Promise<ScAllergen[]> {
    const { data, error } = await this.supabase
      .from('sc_allergens')
      .select('*')
      .eq('school_id', schoolId)
      .eq('allergen_type', allergenType);
    if (error) throw error;
    return data ?? [];
  }

  async findFoodStockById(schoolId: string, id: string): Promise<ScFoodStock> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScFoodStockNotFoundError(id);
    return data;
  }

  async findAllFoodStock(schoolId: string): Promise<ScFoodStock[]> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createFoodStock(schoolId: string, stock: Partial<ScFoodStock>): Promise<ScFoodStock> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .insert({ ...stock, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateFoodStock(schoolId: string, id: string, updates: Partial<ScFoodStock>): Promise<ScFoodStock> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScFoodStockNotFoundError(id);
    return data;
  }

  async deleteFoodStock(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_food_stock')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findFoodStockByIngredient(schoolId: string, ingredient: string): Promise<ScFoodStock> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('ingredient_name', `%${ingredient}%`)
      .single();
    if (error) throw new ScFoodStockNotFoundError(ingredient);
    return data;
  }

  async findLowFoodStock(schoolId: string, threshold: number): Promise<ScFoodStock[]> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .lte('quantity', threshold);
    if (error) throw error;
    return data ?? [];
  }

  async updateFoodStockQuantity(schoolId: string, id: string, quantityChange: number): Promise<ScFoodStock> {
    const stock = await this.findFoodStockById(schoolId, id);
    const newQty = (stock.quantity ?? 0) + quantityChange;
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .update({ quantity: newQty, last_updated: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScFoodStockNotFoundError(id);
    return data;
  }

  async countFoodStock(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_food_stock')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findExpiringFoodStock(schoolId: string, withinDays: number): Promise<ScFoodStock[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .lte('expiry_date', futureDate.toISOString())
      .gte('expiry_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findFoodStockBySupplier(schoolId: string, supplierId: string): Promise<ScFoodStock[]> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .eq('supplier_id', supplierId);
    if (error) throw error;
    return data ?? [];
  }

  async findFoodStockByCategory(schoolId: string, category: string): Promise<ScFoodStock[]> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findFoodStockNeedingReorder(schoolId: string): Promise<ScFoodStock[]> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .lte('quantity', 10);
    if (error) throw error;
    return data ?? [];
  }

  async getFoodStockTotalValue(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('quantity, unit_cost')
      .eq('school_id', schoolId);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.quantity ?? 0) * (r.unit_cost ?? 0), 0);
  }

  async findFoodStockByIds(schoolId: string, ids: string[]): Promise<ScFoodStock[]> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .in('id', ids);
    if (error) throw error;
    return data ?? [];
  }

  async findFoodStockByStorageLocation(schoolId: string, location: string): Promise<ScFoodStock[]> {
    const { data, error } = await this.supabase
      .from('sc_food_stock')
      .select('*')
      .eq('school_id', schoolId)
      .eq('storage_location', location);
    if (error) throw error;
    return data ?? [];
  }

  async findFoodSupplierById(schoolId: string, id: string): Promise<ScFoodSupplier> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScFoodSupplierNotFoundError(id);
    return data;
  }

  async findAllFoodSuppliers(schoolId: string): Promise<ScFoodSupplier[]> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createFoodSupplier(schoolId: string, supplier: Partial<ScFoodSupplier>): Promise<ScFoodSupplier> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .insert({ ...supplier, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateFoodSupplier(schoolId: string, id: string, updates: Partial<ScFoodSupplier>): Promise<ScFoodSupplier> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScFoodSupplierNotFoundError(id);
    return data;
  }

  async deleteFoodSupplier(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_food_suppliers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findFoodSupplierByName(schoolId: string, name: string): Promise<ScFoodSupplier> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('school_id', schoolId)
      .ilike('name', `%${name}%`)
      .single();
    if (error) throw new ScFoodSupplierNotFoundError(name);
    return data;
  }

  async findActiveFoodSuppliers(schoolId: string): Promise<ScFoodSupplier[]> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async countFoodSuppliers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findFoodSupplierWithStock(schoolId: string, id: string): Promise<ScFoodSupplier> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*, sc_food_stock(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScFoodSupplierNotFoundError(id);
    return data;
  }

  async findFoodSuppliersByRating(schoolId: string, minRating: number): Promise<ScFoodSupplier[]> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('school_id', schoolId)
      .gte('rating', minRating);
    if (error) throw error;
    return data ?? [];
  }

  async findFoodSuppliersBySpecialty(schoolId: string, specialty: string): Promise<ScFoodSupplier[]> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('school_id', schoolId)
      .eq('specialty', specialty);
    if (error) throw error;
    return data ?? [];
  }

  async findFoodSuppliersByDeliverySchedule(schoolId: string, day: string): Promise<ScFoodSupplier[]> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('school_id', schoolId)
      .contains('delivery_days', [day]);
    if (error) throw error;
    return data ?? [];
  }

  async updateFoodSupplierRating(schoolId: string, id: string, rating: number): Promise<ScFoodSupplier> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .update({ rating, rated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScFoodSupplierNotFoundError(id);
    return data;
  }

  async findFoodSuppliersWithContracts(schoolId: string): Promise<ScFoodSupplier[]> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .select('*')
      .eq('school_id', schoolId)
      .not('contract_end_date', 'is', null)
      .gte('contract_end_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async suspendFoodSupplier(schoolId: string, id: string, reason: string): Promise<ScFoodSupplier> {
    const { data, error } = await this.supabase
      .from('sc_food_suppliers')
      .update({ status: 'suspended', suspension_reason: reason })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScFoodSupplierNotFoundError(id);
    return data;
  }

  async findMealOrderById(schoolId: string, id: string): Promise<ScMealOrder> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealOrderNotFoundError(id);
    return data;
  }

  async findAllMealOrders(schoolId: string): Promise<ScMealOrder[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMealOrder(schoolId: string, order: Partial<ScMealOrder>): Promise<ScMealOrder> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .insert({ ...order, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMealOrder(schoolId: string, id: string, updates: Partial<ScMealOrder>): Promise<ScMealOrder> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealOrderNotFoundError(id);
    return data;
  }

  async deleteMealOrder(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_meal_orders')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMealOrdersByStudent(schoolId: string, studentId: string): Promise<ScMealOrder[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findMealOrdersByDate(schoolId: string, date: string): Promise<ScMealOrder[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('school_id', schoolId)
      .eq('order_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMealOrders(schoolId: string): Promise<ScMealOrder[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async cancelMealOrder(schoolId: string, id: string): Promise<ScMealOrder> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealOrderNotFoundError(id);
    return data;
  }

  async countMealOrders(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMealOrdersByStatus(schoolId: string, status: string): Promise<ScMealOrder[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findMealOrderWithDetails(schoolId: string, id: string): Promise<ScMealOrder> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*, sc_meals(*)')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealOrderNotFoundError(id);
    return data;
  }

  async findMealOrdersByDateRange(schoolId: string, from: string, to: string): Promise<ScMealOrder[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('school_id', schoolId)
      .gte('order_date', from)
      .lte('order_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async getDailyOrderCount(schoolId: string, date: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('order_date', date)
      .neq('status', 'cancelled');
    if (error) throw error;
    return count ?? 0;
  }

  async getMealOrderRevenue(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('total_amount')
      .eq('school_id', schoolId)
      .gte('order_date', from)
      .lte('order_date', to)
      .neq('status', 'cancelled');
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.total_amount ?? 0), 0);
  }

  async completeMealOrder(schoolId: string, id: string): Promise<ScMealOrder> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .update({ status: 'completed', completed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealOrderNotFoundError(id);
    return data;
  }

  async findMealOrdersByMeal(schoolId: string, mealId: string): Promise<ScMealOrder[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_orders')
      .select('*')
      .eq('school_id', schoolId)
      .eq('meal_id', mealId);
    if (error) throw error;
    return data ?? [];
  }

  async findMealConsumptionById(schoolId: string, id: string): Promise<ScMealConsumption> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealConsumptionNotFoundError(id);
    return data;
  }

  async findAllMealConsumption(schoolId: string): Promise<ScMealConsumption[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMealConsumption(schoolId: string, consumption: Partial<ScMealConsumption>): Promise<ScMealConsumption> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .insert({ ...consumption, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findMealConsumptionByDate(schoolId: string, date: string): Promise<ScMealConsumption[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('*')
      .eq('school_id', schoolId)
      .eq('consumption_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findMealConsumptionByMeal(schoolId: string, mealId: string): Promise<ScMealConsumption[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('*')
      .eq('school_id', schoolId)
      .eq('meal_id', mealId);
    if (error) throw error;
    return data ?? [];
  }

  async findMealConsumptionByStudent(schoolId: string, studentId: string): Promise<ScMealConsumption[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async getConsumptionStats(schoolId: string, from: string, to: string): Promise<{ totalMeals: number; avgPortion: number }> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('portion_size')
      .eq('school_id', schoolId)
      .gte('consumption_date', from)
      .lte('consumption_date', to);
    if (error) throw error;
    const records = data ?? [];
    return {
      totalMeals: records.length,
      avgPortion: records.length > 0 ? records.reduce((s, r) => s + (r.portion_size ?? 0), 0) / records.length : 0,
    };
  }

  async findMealConsumptionByDateRange(schoolId: string, from: string, to: string): Promise<ScMealConsumption[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('*')
      .eq('school_id', schoolId)
      .gte('consumption_date', from)
      .lte('consumption_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async countMealConsumption(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMostPopularMeals(schoolId: string, limit: number): Promise<{ meal_id: string; count: number }[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('meal_id')
      .eq('school_id', schoolId);
    if (error) throw error;
    const counts: Record<string, number> = {};
    for (const record of data ?? []) {
      const mealId = record.meal_id ?? '';
      counts[mealId] = (counts[mealId] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([meal_id, count]) => ({ meal_id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  async findWastedFoodByMeal(schoolId: string, mealId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_meal_consumption')
      .select('waste_amount')
      .eq('school_id', schoolId)
      .eq('meal_id', mealId);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.waste_amount ?? 0), 0);
  }

  async findMealSubscriptionById(schoolId: string, id: string): Promise<ScMealSubscription> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealSubscriptionNotFoundError(id);
    return data;
  }

  async findAllMealSubscriptions(schoolId: string): Promise<ScMealSubscription[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMealSubscription(schoolId: string, subscription: Partial<ScMealSubscription>): Promise<ScMealSubscription> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .insert({ ...subscription, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMealSubscription(schoolId: string, id: string, updates: Partial<ScMealSubscription>): Promise<ScMealSubscription> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealSubscriptionNotFoundError(id);
    return data;
  }

  async deleteMealSubscription(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_meal_subscriptions')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMealSubscriptionsByStudent(schoolId: string, studentId: string): Promise<ScMealSubscription[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMealSubscriptions(schoolId: string): Promise<ScMealSubscription[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async cancelMealSubscription(schoolId: string, id: string): Promise<ScMealSubscription> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealSubscriptionNotFoundError(id);
    return data;
  }

  async countMealSubscriptions(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMealSubscriptionsByPlan(schoolId: string, plan: string): Promise<ScMealSubscription[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('plan', plan);
    if (error) throw error;
    return data ?? [];
  }

  async findExpiringMealSubscriptions(schoolId: string, withinDays: number): Promise<ScMealSubscription[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .lte('end_date', futureDate.toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async renewMealSubscription(schoolId: string, id: string, newEndDate: string): Promise<ScMealSubscription> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .update({ end_date: newEndDate, renewed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealSubscriptionNotFoundError(id);
    return data;
  }

  async findMealSubscriptionsByDateRange(schoolId: string, from: string, to: string): Promise<ScMealSubscription[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('school_id', schoolId)
      .gte('start_date', from)
      .lte('start_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async getMealSubscriptionRevenue(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('monthly_fee')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.monthly_fee ?? 0), 0);
  }

  async findMealSubscriptionsByGradeLevel(schoolId: string, gradeLevel: string): Promise<ScMealSubscription[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .select('*')
      .eq('school_id', schoolId)
      .eq('grade_level', gradeLevel);
    if (error) throw error;
    return data ?? [];
  }

  async suspendMealSubscription(schoolId: string, id: string, reason: string): Promise<ScMealSubscription> {
    const { data, error } = await this.supabase
      .from('sc_meal_subscriptions')
      .update({ status: 'suspended', suspension_reason: reason })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealSubscriptionNotFoundError(id);
    return data;
  }

  async findMealPaymentById(schoolId: string, id: string): Promise<ScMealPayment> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScMealPaymentNotFoundError(id);
    return data;
  }

  async findAllMealPayments(schoolId: string): Promise<ScMealPayment[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMealPayment(schoolId: string, payment: Partial<ScMealPayment>): Promise<ScMealPayment> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .insert({ ...payment, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMealPayment(schoolId: string, id: string, updates: Partial<ScMealPayment>): Promise<ScMealPayment> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealPaymentNotFoundError(id);
    return data;
  }

  async deleteMealPayment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_meal_payments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMealPaymentsByStudent(schoolId: string, studentId: string): Promise<ScMealPayment[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findMealPaymentsByDate(schoolId: string, date: string): Promise<ScMealPayment[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('payment_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findMealPaymentsByStatus(schoolId: string, status: string): Promise<ScMealPayment[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async processMealPayment(schoolId: string, id: string): Promise<ScMealPayment> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .update({ status: 'completed', processed_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealPaymentNotFoundError(id);
    return data;
  }

  async countMealPayments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMealPaymentsByDateRange(schoolId: string, from: string, to: string): Promise<ScMealPayment[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('school_id', schoolId)
      .gte('payment_date', from)
      .lte('payment_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async getMealPaymentTotal(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('amount')
      .eq('school_id', schoolId)
      .eq('status', 'completed')
      .gte('payment_date', from)
      .lte('payment_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.amount ?? 0), 0);
  }

  async findMealPaymentsByMethod(schoolId: string, method: string): Promise<ScMealPayment[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('payment_method', method);
    if (error) throw error;
    return data ?? [];
  }

  async findPendingMealPayments(schoolId: string): Promise<ScMealPayment[]> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return data ?? [];
  }

  async refundMealPayment(schoolId: string, id: string, reason: string): Promise<ScMealPayment> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .update({ status: 'refunded', refund_reason: reason, refunded_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScMealPaymentNotFoundError(id);
    return data;
  }

  async getPendingPaymentTotal(schoolId: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_meal_payments')
      .select('amount')
      .eq('school_id', schoolId)
      .eq('status', 'pending');
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.amount ?? 0), 0);
  }

  async findKitchenStaffById(schoolId: string, id: string): Promise<ScKitchenStaff> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScKitchenStaffNotFoundError(id);
    return data;
  }

  async findAllKitchenStaff(schoolId: string): Promise<ScKitchenStaff[]> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createKitchenStaff(schoolId: string, staff: Partial<ScKitchenStaff>): Promise<ScKitchenStaff> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .insert({ ...staff, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateKitchenStaff(schoolId: string, id: string, updates: Partial<ScKitchenStaff>): Promise<ScKitchenStaff> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScKitchenStaffNotFoundError(id);
    return data;
  }

  async deleteKitchenStaff(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_kitchen_staff')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findActiveKitchenStaff(schoolId: string): Promise<ScKitchenStaff[]> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async countKitchenStaff(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_kitchen_staff')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findKitchenStaffByName(schoolId: string, firstName: string, lastName: string): Promise<ScKitchenStaff> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .select('*')
      .eq('school_id', schoolId)
      .eq('first_name', firstName)
      .eq('last_name', lastName)
      .single();
    if (error) throw new ScKitchenStaffNotFoundError(`${firstName} ${lastName}`);
    return data;
  }

  async assignKitchenShift(schoolId: string, staffId: string, shift: string): Promise<ScKitchenStaff> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .update({ current_shift: shift })
      .eq('id', staffId)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScKitchenStaffNotFoundError(staffId);
    return data;
  }

  async findKitchenStaffByRole(schoolId: string, role: string): Promise<ScKitchenStaff[]> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .select('*')
      .eq('school_id', schoolId)
      .eq('role', role);
    if (error) throw error;
    return data ?? [];
  }

  async findAvailableKitchenStaff(schoolId: string, date: string): Promise<ScKitchenStaff[]> {
    const { data, error } = await this.supabase
      .from('sc_kitchen_staff')
      .select('*')
      .eq('school_id', schoolId)
      .eq('status', 'active')
      .not('id', 'in', this.supabase
        .from('sc_kitchen_staff')
        .select('id')
        .eq('current_shift', date)
      );
    if (error) throw error;
    return data ?? [];
  }

  async findCantineReportById(schoolId: string, id: string): Promise<ScCantineReport> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) throw new ScCantineReportNotFoundError(id);
    return data;
  }

  async findAllCantineReports(schoolId: string): Promise<ScCantineReport[]> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCantineReport(schoolId: string, report: Partial<ScCantineReport>): Promise<ScCantineReport> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .insert({ ...report, school_id: schoolId })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateCantineReport(schoolId: string, id: string, updates: Partial<ScCantineReport>): Promise<ScCantineReport> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .update(updates)
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new ScCantineReportNotFoundError(id);
    return data;
  }

  async deleteCantineReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_cantine_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async findCantineReportsByDate(schoolId: string, date: string): Promise<ScCantineReport[]> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('report_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findCantineReportsByType(schoolId: string, reportType: string): Promise<ScCantineReport[]> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('report_type', reportType);
    if (error) throw error;
    return data ?? [];
  }

  async generateDailyReport(schoolId: string, date: string): Promise<ScCantineReport> {
    const orderData = await this.supabase
      .from('sc_meal_orders')
      .select('total_amount')
      .eq('school_id', schoolId)
      .eq('order_date', date)
      .neq('status', 'cancelled');
    const totalRevenue = (orderData.data ?? []).reduce((s, r) => s + (r.total_amount ?? 0), 0);
    const totalOrders = (orderData.data ?? []).length;
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .insert({
        school_id: schoolId,
        report_date: date,
        report_type: 'daily',
        total_revenue: totalRevenue,
        total_orders: totalOrders,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findCantineReportsByDateRange(schoolId: string, from: string, to: string): Promise<ScCantineReport[]> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('school_id', schoolId)
      .gte('report_date', from)
      .lte('report_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async countCantineReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findLatestCantineReport(schoolId: string): Promise<ScCantineReport> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('school_id', schoolId)
      .order('report_date', { ascending: false })
      .limit(1)
      .single();
    if (error) throw new ScCantineReportNotFoundError('latest');
    return data;
  }

  async getTotalCantineRevenue(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('total_revenue')
      .eq('school_id', schoolId)
      .gte('report_date', from)
      .lte('report_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.total_revenue ?? 0), 0);
  }

  async findWeeklyCantineReport(schoolId: string, weekStart: string): Promise<ScCantineReport[]> {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('report_type', 'daily')
      .gte('report_date', weekStart)
      .lte('report_date', weekEnd.toISOString().split('T')[0]);
    if (error) throw error;
    return data ?? [];
  }

  async findCantineReportsByStaff(schoolId: string, staffId: string): Promise<ScCantineReport[]> {
    const { data, error } = await this.supabase
      .from('sc_cantine_reports')
      .select('*')
      .eq('school_id', schoolId)
      .eq('generated_by', staffId);
    if (error) throw error;
    return data ?? [];
  }

  async findMedicalRecordById(schoolId: string, id: string): Promise<ScMedicalRecord> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMedicalRecordNotFoundError(id);
    return data;
  }

  async findAllMedicalRecords(schoolId: string): Promise<ScMedicalRecord[]> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMedicalRecord(schoolId: string, record: Partial<ScMedicalRecord>): Promise<ScMedicalRecord> {
    const { data, error } = await this.supabase.from('sc_medical_records').insert({ ...record, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateMedicalRecord(schoolId: string, id: string, updates: Partial<ScMedicalRecord>): Promise<ScMedicalRecord> {
    const { data, error } = await this.supabase.from('sc_medical_records').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMedicalRecordNotFoundError(id);
    return data;
  }

  async deleteMedicalRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_medical_records').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMedicalRecordsByStudent(schoolId: string, studentId: string): Promise<ScMedicalRecord[]> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findMedicalRecordsByCondition(schoolId: string, condition: string): Promise<ScMedicalRecord[]> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*').eq('school_id', schoolId).ilike('condition', `%${condition}%`);
    if (error) throw error;
    return data ?? [];
  }

  async countMedicalRecords(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_medical_records').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMedicalRecordWithDetails(schoolId: string, id: string): Promise<ScMedicalRecord> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*, sc_treatments(*), sc_medications(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMedicalRecordNotFoundError(id);
    return data;
  }

  async findChronicConditions(schoolId: string): Promise<ScMedicalRecord[]> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*').eq('school_id', schoolId).eq('is_chronic', true);
    if (error) throw error;
    return data ?? [];
  }

  async findMedicalRecordsByBloodType(schoolId: string, bloodType: string): Promise<ScMedicalRecord[]> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*').eq('school_id', schoolId).eq('blood_type', bloodType);
    if (error) throw error;
    return data ?? [];
  }

  async findMedicalRecordsWithAllergies(schoolId: string): Promise<ScMedicalRecord[]> {
    const { data, error } = await this.supabase.from('sc_medical_records').select('*, sc_medical_allergies(*)').eq('school_id', schoolId).not('sc_medical_allergies.id', 'is', null);
    if (error) throw error;
    return data ?? [];
  }

  async findMedicalVisitById(schoolId: string, id: string): Promise<ScMedicalVisit> {
    const { data, error } = await this.supabase.from('sc_medical_visits').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMedicalVisitNotFoundError(id);
    return data;
  }

  async findAllMedicalVisits(schoolId: string): Promise<ScMedicalVisit[]> {
    const { data, error } = await this.supabase.from('sc_medical_visits').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMedicalVisit(schoolId: string, visit: Partial<ScMedicalVisit>): Promise<ScMedicalVisit> {
    const { data, error } = await this.supabase.from('sc_medical_visits').insert({ ...visit, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateMedicalVisit(schoolId: string, id: string, updates: Partial<ScMedicalVisit>): Promise<ScMedicalVisit> {
    const { data, error } = await this.supabase.from('sc_medical_visits').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMedicalVisitNotFoundError(id);
    return data;
  }

  async deleteMedicalVisit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_medical_visits').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMedicalVisitsByStudent(schoolId: string, studentId: string): Promise<ScMedicalVisit[]> {
    const { data, error } = await this.supabase.from('sc_medical_visits').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findMedicalVisitsByDate(schoolId: string, date: string): Promise<ScMedicalVisit[]> {
    const { data, error } = await this.supabase.from('sc_medical_visits').select('*').eq('school_id', schoolId).eq('visit_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findUpcomingMedicalVisits(schoolId: string): Promise<ScMedicalVisit[]> {
    const { data, error } = await this.supabase.from('sc_medical_visits').select('*').eq('school_id', schoolId).eq('status', 'scheduled').gte('visit_date', new Date().toISOString()).order('visit_date');
    if (error) throw error;
    return data ?? [];
  }

  async countMedicalVisits(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_medical_visits').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async completeMedicalVisit(schoolId: string, id: string, notes: string): Promise<ScMedicalVisit> {
    const { data, error } = await this.supabase.from('sc_medical_visits').update({ status: 'completed', notes, completed_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMedicalVisitNotFoundError(id);
    return data;
  }

  async cancelMedicalVisit(schoolId: string, id: string): Promise<ScMedicalVisit> {
    const { data, error } = await this.supabase.from('sc_medical_visits').update({ status: 'cancelled', cancelled_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMedicalVisitNotFoundError(id);
    return data;
  }

  async findMedicalVisitsByDateRange(schoolId: string, from: string, to: string): Promise<ScMedicalVisit[]> {
    const { data, error } = await this.supabase.from('sc_medical_visits').select('*').eq('school_id', schoolId).gte('visit_date', from).lte('visit_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findTreatmentById(schoolId: string, id: string): Promise<ScTreatment> {
    const { data, error } = await this.supabase.from('sc_treatments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScTreatmentNotFoundError(id);
    return data;
  }

  async findAllTreatments(schoolId: string): Promise<ScTreatment[]> {
    const { data, error } = await this.supabase.from('sc_treatments').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createTreatment(schoolId: string, treatment: Partial<ScTreatment>): Promise<ScTreatment> {
    const { data, error } = await this.supabase.from('sc_treatments').insert({ ...treatment, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateTreatment(schoolId: string, id: string, updates: Partial<ScTreatment>): Promise<ScTreatment> {
    const { data, error } = await this.supabase.from('sc_treatments').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScTreatmentNotFoundError(id);
    return data;
  }

  async deleteTreatment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_treatments').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findTreatmentsByStudent(schoolId: string, studentId: string): Promise<ScTreatment[]> {
    const { data, error } = await this.supabase.from('sc_treatments').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async countTreatments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_treatments').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findActiveTreatments(schoolId: string): Promise<ScTreatment[]> {
    const { data, error } = await this.supabase.from('sc_treatments').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async completeTreatment(schoolId: string, id: string): Promise<ScTreatment> {
    const { data, error } = await this.supabase.from('sc_treatments').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScTreatmentNotFoundError(id);
    return data;
  }

  async findVaccinationById(schoolId: string, id: string): Promise<ScVaccination> {
    const { data, error } = await this.supabase.from('sc_vaccinations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVaccinationNotFoundError(id);
    return data;
  }

  async findAllVaccinations(schoolId: string): Promise<ScVaccination[]> {
    const { data, error } = await this.supabase.from('sc_vaccinations').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createVaccination(schoolId: string, vaccination: Partial<ScVaccination>): Promise<ScVaccination> {
    const { data, error } = await this.supabase.from('sc_vaccinations').insert({ ...vaccination, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateVaccination(schoolId: string, id: string, updates: Partial<ScVaccination>): Promise<ScVaccination> {
    const { data, error } = await this.supabase.from('sc_vaccinations').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVaccinationNotFoundError(id);
    return data;
  }

  async deleteVaccination(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_vaccinations').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findVaccinationsByStudent(schoolId: string, studentId: string): Promise<ScVaccination[]> {
    const { data, error } = await this.supabase.from('sc_vaccinations').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findUpcomingVaccinations(schoolId: string): Promise<ScVaccination[]> {
    const { data, error } = await this.supabase.from('sc_vaccinations').select('*').eq('school_id', schoolId).eq('status', 'scheduled').gte('scheduled_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async countVaccinations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_vaccinations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async completeVaccination(schoolId: string, id: string): Promise<ScVaccination> {
    const { data, error } = await this.supabase.from('sc_vaccinations').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVaccinationNotFoundError(id);
    return data;
  }

  async findMedicalAllergyById(schoolId: string, id: string): Promise<ScMedicalAllergy> {
    const { data, error } = await this.supabase.from('sc_medical_allergies').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMedicalAllergyNotFoundError(id);
    return data;
  }

  async findAllMedicalAllergies(schoolId: string): Promise<ScMedicalAllergy[]> {
    const { data, error } = await this.supabase.from('sc_medical_allergies').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMedicalAllergy(schoolId: string, allergy: Partial<ScMedicalAllergy>): Promise<ScMedicalAllergy> {
    const { data, error } = await this.supabase.from('sc_medical_allergies').insert({ ...allergy, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateMedicalAllergy(schoolId: string, id: string, updates: Partial<ScMedicalAllergy>): Promise<ScMedicalAllergy> {
    const { data, error } = await this.supabase.from('sc_medical_allergies').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMedicalAllergyNotFoundError(id);
    return data;
  }

  async deleteMedicalAllergy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_medical_allergies').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMedicalAllergiesByStudent(schoolId: string, studentId: string): Promise<ScMedicalAllergy[]> {
    const { data, error } = await this.supabase.from('sc_medical_allergies').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async countMedicalAllergies(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_medical_allergies').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSevereAllergies(schoolId: string): Promise<ScMedicalAllergy[]> {
    const { data, error } = await this.supabase.from('sc_medical_allergies').select('*').eq('school_id', schoolId).eq('severity', 'severe');
    if (error) throw error;
    return data ?? [];
  }

  async findMedicalHistoryById(schoolId: string, id: string): Promise<ScMedicalHistory> {
    const { data, error } = await this.supabase.from('sc_medical_history').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMedicalHistoryNotFoundError(id);
    return data;
  }

  async findAllMedicalHistory(schoolId: string): Promise<ScMedicalHistory[]> {
    const { data, error } = await this.supabase.from('sc_medical_history').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMedicalHistory(schoolId: string, history: Partial<ScMedicalHistory>): Promise<ScMedicalHistory> {
    const { data, error } = await this.supabase.from('sc_medical_history').insert({ ...history, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateMedicalHistory(schoolId: string, id: string, updates: Partial<ScMedicalHistory>): Promise<ScMedicalHistory> {
    const { data, error } = await this.supabase.from('sc_medical_history').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMedicalHistoryNotFoundError(id);
    return data;
  }

  async deleteMedicalHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_medical_history').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMedicalHistoryByStudent(schoolId: string, studentId: string): Promise<ScMedicalHistory[]> {
    const { data, error } = await this.supabase.from('sc_medical_history').select('*').eq('school_id', schoolId).eq('student_id', studentId).order('event_date', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async countMedicalHistory(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_medical_history').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findMedicationById(schoolId: string, id: string): Promise<ScMedication> {
    const { data, error } = await this.supabase.from('sc_medications').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMedicationNotFoundError(id);
    return data;
  }

  async findAllMedications(schoolId: string): Promise<ScMedication[]> {
    const { data, error } = await this.supabase.from('sc_medications').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMedication(schoolId: string, medication: Partial<ScMedication>): Promise<ScMedication> {
    const { data, error } = await this.supabase.from('sc_medications').insert({ ...medication, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateMedication(schoolId: string, id: string, updates: Partial<ScMedication>): Promise<ScMedication> {
    const { data, error } = await this.supabase.from('sc_medications').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMedicationNotFoundError(id);
    return data;
  }

  async deleteMedication(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_medications').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMedicationsByStudent(schoolId: string, studentId: string): Promise<ScMedication[]> {
    const { data, error } = await this.supabase.from('sc_medications').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async countMedications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_medications').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findActiveMedications(schoolId: string): Promise<ScMedication[]> {
    const { data, error } = await this.supabase.from('sc_medications').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findMedicationsExpiring(schoolId: string, withinDays: number): Promise<ScMedication[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase.from('sc_medications').select('*').eq('school_id', schoolId).lte('expiry_date', futureDate.toISOString()).gte('expiry_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async findEmergencyContactById(schoolId: string, id: string): Promise<ScEmergencyContact> {
    const { data, error } = await this.supabase.from('sc_emergency_contacts').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEmergencyContactNotFoundError(id);
    return data;
  }

  async findAllEmergencyContacts(schoolId: string): Promise<ScEmergencyContact[]> {
    const { data, error } = await this.supabase.from('sc_emergency_contacts').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEmergencyContact(schoolId: string, contact: Partial<ScEmergencyContact>): Promise<ScEmergencyContact> {
    const { data, error } = await this.supabase.from('sc_emergency_contacts').insert({ ...contact, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateEmergencyContact(schoolId: string, id: string, updates: Partial<ScEmergencyContact>): Promise<ScEmergencyContact> {
    const { data, error } = await this.supabase.from('sc_emergency_contacts').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEmergencyContactNotFoundError(id);
    return data;
  }

  async deleteEmergencyContact(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_emergency_contacts').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEmergencyContactsByStudent(schoolId: string, studentId: string): Promise<ScEmergencyContact[]> {
    const { data, error } = await this.supabase.from('sc_emergency_contacts').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async countEmergencyContacts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_emergency_contacts').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAccidentById(schoolId: string, id: string): Promise<ScAccident> {
    const { data, error } = await this.supabase.from('sc_accidents').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScAccidentNotFoundError(id);
    return data;
  }

  async findAllAccidents(schoolId: string): Promise<ScAccident[]> {
    const { data, error } = await this.supabase.from('sc_accidents').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAccident(schoolId: string, accident: Partial<ScAccident>): Promise<ScAccident> {
    const { data, error } = await this.supabase.from('sc_accidents').insert({ ...accident, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateAccident(schoolId: string, id: string, updates: Partial<ScAccident>): Promise<ScAccident> {
    const { data, error } = await this.supabase.from('sc_accidents').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAccidentNotFoundError(id);
    return data;
  }

  async deleteAccident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_accidents').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAccidentsByStudent(schoolId: string, studentId: string): Promise<ScAccident[]> {
    const { data, error } = await this.supabase.from('sc_accidents').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findAccidentsBySeverity(schoolId: string, severity: string): Promise<ScAccident[]> {
    const { data, error } = await this.supabase.from('sc_accidents').select('*').eq('school_id', schoolId).eq('severity', severity);
    if (error) throw error;
    return data ?? [];
  }

  async countAccidents(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_accidents').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async resolveAccident(schoolId: string, id: string, notes: string): Promise<ScAccident> {
    const { data, error } = await this.supabase.from('sc_accidents').update({ status: 'resolved', resolution_notes: notes, resolved_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAccidentNotFoundError(id);
    return data;
  }

  async findUnresolvedAccidents(schoolId: string): Promise<ScAccident[]> {
    const { data, error } = await this.supabase.from('sc_accidents').select('*').eq('school_id', schoolId).eq('status', 'open');
    if (error) throw error;
    return data ?? [];
  }

  async findHealthReportById(schoolId: string, id: string): Promise<ScHealthReport> {
    const { data, error } = await this.supabase.from('sc_health_reports').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScHealthReportNotFoundError(id);
    return data;
  }

  async findAllHealthReports(schoolId: string): Promise<ScHealthReport[]> {
    const { data, error } = await this.supabase.from('sc_health_reports').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createHealthReport(schoolId: string, report: Partial<ScHealthReport>): Promise<ScHealthReport> {
    const { data, error } = await this.supabase.from('sc_health_reports').insert({ ...report, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateHealthReport(schoolId: string, id: string, updates: Partial<ScHealthReport>): Promise<ScHealthReport> {
    const { data, error } = await this.supabase.from('sc_health_reports').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScHealthReportNotFoundError(id);
    return data;
  }

  async deleteHealthReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_health_reports').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findHealthReportsByDate(schoolId: string, date: string): Promise<ScHealthReport[]> {
    const { data, error } = await this.supabase.from('sc_health_reports').select('*').eq('school_id', schoolId).eq('report_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findHealthReportsByType(schoolId: string, reportType: string): Promise<ScHealthReport[]> {
    const { data, error } = await this.supabase.from('sc_health_reports').select('*').eq('school_id', schoolId).eq('report_type', reportType);
    if (error) throw error;
    return data ?? [];
  }

  async countHealthReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_health_reports').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBuildingById(schoolId: string, id: string): Promise<ScBuilding> {
    const { data, error } = await this.supabase.from('sc_buildings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScBuildingNotFoundError(id);
    return data;
  }

  async findAllBuildings(schoolId: string): Promise<ScBuilding[]> {
    const { data, error } = await this.supabase.from('sc_buildings').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBuilding(schoolId: string, building: Partial<ScBuilding>): Promise<ScBuilding> {
    const { data, error } = await this.supabase.from('sc_buildings').insert({ ...building, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateBuilding(schoolId: string, id: string, updates: Partial<ScBuilding>): Promise<ScBuilding> {
    const { data, error } = await this.supabase.from('sc_buildings').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScBuildingNotFoundError(id);
    return data;
  }

  async deleteBuilding(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_buildings').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBuildingsByType(schoolId: string, type: string): Promise<ScBuilding[]> {
    const { data, error } = await this.supabase.from('sc_buildings').select('*').eq('school_id', schoolId).eq('building_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async countBuildings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_buildings').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBuildingWithRooms(schoolId: string, id: string): Promise<ScBuilding> {
    const { data, error } = await this.supabase.from('sc_buildings').select('*, sc_rooms(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScBuildingNotFoundError(id);
    return data;
  }

  async findRoomById(schoolId: string, id: string): Promise<ScRoom> {
    const { data, error } = await this.supabase.from('sc_rooms').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScRoomNotFoundError(id);
    return data;
  }

  async findAllRooms(schoolId: string): Promise<ScRoom[]> {
    const { data, error } = await this.supabase.from('sc_rooms').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRoom(schoolId: string, room: Partial<ScRoom>): Promise<ScRoom> {
    const { data, error } = await this.supabase.from('sc_rooms').insert({ ...room, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateRoom(schoolId: string, id: string, updates: Partial<ScRoom>): Promise<ScRoom> {
    const { data, error } = await this.supabase.from('sc_rooms').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScRoomNotFoundError(id);
    return data;
  }

  async deleteRoom(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_rooms').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findRoomsByBuilding(schoolId: string, buildingId: string): Promise<ScRoom[]> {
    const { data, error } = await this.supabase.from('sc_rooms').select('*').eq('school_id', schoolId).eq('building_id', buildingId);
    if (error) throw error;
    return data ?? [];
  }

  async findAvailableRooms(schoolId: string): Promise<ScRoom[]> {
    const { data, error } = await this.supabase.from('sc_rooms').select('*').eq('school_id', schoolId).eq('status', 'available');
    if (error) throw error;
    return data ?? [];
  }

  async findRoomsByType(schoolId: string, roomType: string): Promise<ScRoom[]> {
    const { data, error } = await this.supabase.from('sc_rooms').select('*').eq('school_id', schoolId).eq('room_type', roomType);
    if (error) throw error;
    return data ?? [];
  }

  async countRooms(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_rooms').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRoomWithBeds(schoolId: string, id: string): Promise<ScRoom> {
    const { data, error } = await this.supabase.from('sc_rooms').select('*, sc_beds(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScRoomNotFoundError(id);
    return data;
  }

  async findBedById(schoolId: string, id: string): Promise<ScBed> {
    const { data, error } = await this.supabase.from('sc_beds').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScBedNotFoundError(id);
    return data;
  }

  async findAllBeds(schoolId: string): Promise<ScBed[]> {
    const { data, error } = await this.supabase.from('sc_beds').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBed(schoolId: string, bed: Partial<ScBed>): Promise<ScBed> {
    const { data, error } = await this.supabase.from('sc_beds').insert({ ...bed, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateBed(schoolId: string, id: string, updates: Partial<ScBed>): Promise<ScBed> {
    const { data, error } = await this.supabase.from('sc_beds').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScBedNotFoundError(id);
    return data;
  }

  async deleteBed(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_beds').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBedsByRoom(schoolId: string, roomId: string): Promise<ScBed[]> {
    const { data, error } = await this.supabase.from('sc_beds').select('*').eq('school_id', schoolId).eq('room_id', roomId);
    if (error) throw error;
    return data ?? [];
  }

  async findAvailableBeds(schoolId: string): Promise<ScBed[]> {
    const { data, error } = await this.supabase.from('sc_beds').select('*').eq('school_id', schoolId).eq('status', 'available');
    if (error) throw error;
    return data ?? [];
  }

  async countBeds(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_beds').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBedsByStatus(schoolId: string, status: string): Promise<ScBed[]> {
    const { data, error } = await this.supabase.from('sc_beds').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findOccupancyById(schoolId: string, id: string): Promise<ScOccupancy> {
    const { data, error } = await this.supabase.from('sc_occupancy').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScOccupancyNotFoundError(id);
    return data;
  }

  async findAllOccupancy(schoolId: string): Promise<ScOccupancy[]> {
    const { data, error } = await this.supabase.from('sc_occupancy').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createOccupancy(schoolId: string, occupancy: Partial<ScOccupancy>): Promise<ScOccupancy> {
    const { data, error } = await this.supabase.from('sc_occupancy').insert({ ...occupancy, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateOccupancy(schoolId: string, id: string, updates: Partial<ScOccupancy>): Promise<ScOccupancy> {
    const { data, error } = await this.supabase.from('sc_occupancy').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScOccupancyNotFoundError(id);
    return data;
  }

  async deleteOccupancy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_occupancy').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findOccupancyByRoom(schoolId: string, roomId: string): Promise<ScOccupancy[]> {
    const { data, error } = await this.supabase.from('sc_occupancy').select('*').eq('school_id', schoolId).eq('room_id', roomId);
    if (error) throw error;
    return data ?? [];
  }

  async getOccupancyRate(schoolId: string, buildingId: string): Promise<number> {
    const { data: totalBeds } = await this.supabase.from('sc_beds').select('id', { count: 'exact' }).eq('school_id', schoolId).eq('building_id', buildingId);
    const { data: occupiedBeds } = await this.supabase.from('sc_beds').select('id', { count: 'exact' }).eq('school_id', schoolId).eq('building_id', buildingId).eq('status', 'occupied');
    const total = totalBeds?.length ?? 0;
    const occupied = occupiedBeds?.length ?? 0;
    return total > 0 ? (occupied / total) * 100 : 0;
  }

  async countOccupancy(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_occupancy').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRoomAssignmentById(schoolId: string, id: string): Promise<ScRoomAssignment> {
    const { data, error } = await this.supabase.from('sc_room_assignments').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScRoomAssignmentNotFoundError(id);
    return data;
  }

  async findAllRoomAssignments(schoolId: string): Promise<ScRoomAssignment[]> {
    const { data, error } = await this.supabase.from('sc_room_assignments').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRoomAssignment(schoolId: string, assignment: Partial<ScRoomAssignment>): Promise<ScRoomAssignment> {
    const { data, error } = await this.supabase.from('sc_room_assignments').insert({ ...assignment, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateRoomAssignment(schoolId: string, id: string, updates: Partial<ScRoomAssignment>): Promise<ScRoomAssignment> {
    const { data, error } = await this.supabase.from('sc_room_assignments').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScRoomAssignmentNotFoundError(id);
    return data;
  }

  async deleteRoomAssignment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_room_assignments').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findRoomAssignmentsByStudent(schoolId: string, studentId: string): Promise<ScRoomAssignment[]> {
    const { data, error } = await this.supabase.from('sc_room_assignments').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRoomAssignments(schoolId: string): Promise<ScRoomAssignment[]> {
    const { data, error } = await this.supabase.from('sc_room_assignments').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async countRoomAssignments(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_room_assignments').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findBoardingAttendanceById(schoolId: string, id: string): Promise<ScBoardingAttendance> {
    const { data, error } = await this.supabase.from('sc_boarding_attendance').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScBoardingAttendanceNotFoundError(id);
    return data;
  }

  async findAllBoardingAttendance(schoolId: string): Promise<ScBoardingAttendance[]> {
    const { data, error } = await this.supabase.from('sc_boarding_attendance').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createBoardingAttendance(schoolId: string, attendance: Partial<ScBoardingAttendance>): Promise<ScBoardingAttendance> {
    const { data, error } = await this.supabase.from('sc_boarding_attendance').insert({ ...attendance, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateBoardingAttendance(schoolId: string, id: string, updates: Partial<ScBoardingAttendance>): Promise<ScBoardingAttendance> {
    const { data, error } = await this.supabase.from('sc_boarding_attendance').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScBoardingAttendanceNotFoundError(id);
    return data;
  }

  async deleteBoardingAttendance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_boarding_attendance').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findBoardingAttendanceByDate(schoolId: string, date: string): Promise<ScBoardingAttendance[]> {
    const { data, error } = await this.supabase.from('sc_boarding_attendance').select('*').eq('school_id', schoolId).eq('attendance_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findBoardingAttendanceByStudent(schoolId: string, studentId: string): Promise<ScBoardingAttendance[]> {
    const { data, error } = await this.supabase.from('sc_boarding_attendance').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async countBoardingAttendance(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_boarding_attendance').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNightReportById(schoolId: string, id: string): Promise<ScNightReport> {
    const { data, error } = await this.supabase.from('sc_night_reports').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScNightReportNotFoundError(id);
    return data;
  }

  async findAllNightReports(schoolId: string): Promise<ScNightReport[]> {
    const { data, error } = await this.supabase.from('sc_night_reports').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createNightReport(schoolId: string, report: Partial<ScNightReport>): Promise<ScNightReport> {
    const { data, error } = await this.supabase.from('sc_night_reports').insert({ ...report, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateNightReport(schoolId: string, id: string, updates: Partial<ScNightReport>): Promise<ScNightReport> {
    const { data, error } = await this.supabase.from('sc_night_reports').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScNightReportNotFoundError(id);
    return data;
  }

  async deleteNightReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_night_reports').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findNightReportsByDate(schoolId: string, date: string): Promise<ScNightReport[]> {
    const { data, error } = await this.supabase.from('sc_night_reports').select('*').eq('school_id', schoolId).eq('report_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async countNightReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_night_reports').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findNightReportsByBuilding(schoolId: string, buildingId: string): Promise<ScNightReport[]> {
    const { data, error } = await this.supabase.from('sc_night_reports').select('*').eq('school_id', schoolId).eq('building_id', buildingId);
    if (error) throw error;
    return data ?? [];
  }

  async findDisciplineById(schoolId: string, id: string): Promise<ScDiscipline> {
    const { data, error } = await this.supabase.from('sc_disciplines').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScDisciplineNotFoundError(id);
    return data;
  }

  async findAllDisciplines(schoolId: string): Promise<ScDiscipline[]> {
    const { data, error } = await this.supabase.from('sc_disciplines').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDiscipline(schoolId: string, discipline: Partial<ScDiscipline>): Promise<ScDiscipline> {
    const { data, error } = await this.supabase.from('sc_disciplines').insert({ ...discipline, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateDiscipline(schoolId: string, id: string, updates: Partial<ScDiscipline>): Promise<ScDiscipline> {
    const { data, error } = await this.supabase.from('sc_disciplines').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScDisciplineNotFoundError(id);
    return data;
  }

  async deleteDiscipline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_disciplines').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findDisciplinesByStudent(schoolId: string, studentId: string): Promise<ScDiscipline[]> {
    const { data, error } = await this.supabase.from('sc_disciplines').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findDisciplinesBySeverity(schoolId: string, severity: string): Promise<ScDiscipline[]> {
    const { data, error } = await this.supabase.from('sc_disciplines').select('*').eq('school_id', schoolId).eq('severity', severity);
    if (error) throw error;
    return data ?? [];
  }

  async countDisciplines(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_disciplines').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findVisitorRegistrationById(schoolId: string, id: string): Promise<ScVisitorRegistration> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVisitorRegistrationNotFoundError(id);
    return data;
  }

  async findAllVisitorRegistrations(schoolId: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createVisitorRegistration(schoolId: string, reg: Partial<ScVisitorRegistration>): Promise<ScVisitorRegistration> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').insert({ ...reg, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateVisitorRegistration(schoolId: string, id: string, updates: Partial<ScVisitorRegistration>): Promise<ScVisitorRegistration> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorRegistrationNotFoundError(id);
    return data;
  }

  async deleteVisitorRegistration(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_visitor_registrations').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findVisitorRegistrationsByDate(schoolId: string, date: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId).eq('visit_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findVisitorRegistrationsByStudent(schoolId: string, studentId: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveVisitorRegistrations(schoolId: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async countVisitorRegistrations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_visitor_registrations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async completeVisitorRegistration(schoolId: string, id: string): Promise<ScVisitorRegistration> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').update({ status: 'completed', checkout_time: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorRegistrationNotFoundError(id);
    return data;
  }

  async findVisitorRegistrationsByDateRange(schoolId: string, from: string, to: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId).gte('visit_date', from).lte('visit_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findVisitorRegistrationsByPurpose(schoolId: string, purpose: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId).eq('purpose', purpose);
    if (error) throw error;
    return data ?? [];
  }

  async findVisitorRegistrationWithDetails(schoolId: string, id: string): Promise<ScVisitorRegistration> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*, sc_visitor_badges(*), sc_identity_verifications(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVisitorRegistrationNotFoundError(id);
    return data;
  }

  async findVisitorRegistrationsByHost(schoolId: string, hostId: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId).eq('host_id', hostId);
    if (error) throw error;
    return data ?? [];
  }

  async findVisitorRegistrationsByStatus(schoolId: string, status: string): Promise<ScVisitorRegistration[]> {
    const { data, error } = await this.supabase.from('sc_visitor_registrations').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findVisitorBadgeById(schoolId: string, id: string): Promise<ScVisitorBadge> {
    const { data, error } = await this.supabase.from('sc_visitor_badges').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVisitorBadgeNotFoundError(id);
    return data;
  }

  async findAllVisitorBadges(schoolId: string): Promise<ScVisitorBadge[]> {
    const { data, error } = await this.supabase.from('sc_visitor_badges').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createVisitorBadge(schoolId: string, badge: Partial<ScVisitorBadge>): Promise<ScVisitorBadge> {
    const { data, error } = await this.supabase.from('sc_visitor_badges').insert({ ...badge, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateVisitorBadge(schoolId: string, id: string, updates: Partial<ScVisitorBadge>): Promise<ScVisitorBadge> {
    const { data, error } = await this.supabase.from('sc_visitor_badges').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorBadgeNotFoundError(id);
    return data;
  }

  async deleteVisitorBadge(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_visitor_badges').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findVisitorBadgesByVisitor(schoolId: string, visitorId: string): Promise<ScVisitorBadge[]> {
    const { data, error } = await this.supabase.from('sc_visitor_badges').select('*').eq('school_id', schoolId).eq('visitor_id', visitorId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveVisitorBadges(schoolId: string): Promise<ScVisitorBadge[]> {
    const { data, error } = await this.supabase.from('sc_visitor_badges').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async deactivateVisitorBadge(schoolId: string, id: string): Promise<ScVisitorBadge> {
    const { data, error } = await this.supabase.from('sc_visitor_badges').update({ status: 'inactive', deactivated_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorBadgeNotFoundError(id);
    return data;
  }

  async countVisitorBadges(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_visitor_badges').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findVisitorQrById(schoolId: string, id: string): Promise<ScVisitorQr> {
    const { data, error } = await this.supabase.from('sc_visitor_qrs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVisitorQrNotFoundError(id);
    return data;
  }

  async findAllVisitorQrs(schoolId: string): Promise<ScVisitorQr[]> {
    const { data, error } = await this.supabase.from('sc_visitor_qrs').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createVisitorQr(schoolId: string, qr: Partial<ScVisitorQr>): Promise<ScVisitorQr> {
    const { data, error } = await this.supabase.from('sc_visitor_qrs').insert({ ...qr, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateVisitorQr(schoolId: string, id: string, updates: Partial<ScVisitorQr>): Promise<ScVisitorQr> {
    const { data, error } = await this.supabase.from('sc_visitor_qrs').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorQrNotFoundError(id);
    return data;
  }

  async deleteVisitorQr(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_visitor_qrs').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findVisitorQrByCode(schoolId: string, code: string): Promise<ScVisitorQr> {
    const { data, error } = await this.supabase.from('sc_visitor_qrs').select('*').eq('school_id', schoolId).eq('qr_code', code).single();
    if (error) throw new ScVisitorQrNotFoundError(code);
    return data;
  }

  async validateVisitorQr(schoolId: string, id: string): Promise<boolean> {
    const { data } = await this.supabase.from('sc_visitor_qrs').select('*').eq('school_id', schoolId).eq('id', id).single();
    if (!data) return false;
    return data.is_valid === true && (!data.expires_at || new Date(data.expires_at) > new Date());
  }

  async countVisitorQrs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_visitor_qrs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async invalidateVisitorQr(schoolId: string, id: string): Promise<ScVisitorQr> {
    const { data, error } = await this.supabase.from('sc_visitor_qrs').update({ is_valid: false, invalidated_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorQrNotFoundError(id);
    return data;
  }

  async findVisitorInvitationById(schoolId: string, id: string): Promise<ScVisitorInvitation> {
    const { data, error } = await this.supabase.from('sc_visitor_invitations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVisitorInvitationNotFoundError(id);
    return data;
  }

  async findAllVisitorInvitations(schoolId: string): Promise<ScVisitorInvitation[]> {
    const { data, error } = await this.supabase.from('sc_visitor_invitations').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createVisitorInvitation(schoolId: string, invitation: Partial<ScVisitorInvitation>): Promise<ScVisitorInvitation> {
    const { data, error } = await this.supabase.from('sc_visitor_invitations').insert({ ...invitation, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateVisitorInvitation(schoolId: string, id: string, updates: Partial<ScVisitorInvitation>): Promise<ScVisitorInvitation> {
    const { data, error } = await this.supabase.from('sc_visitor_invitations').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorInvitationNotFoundError(id);
    return data;
  }

  async deleteVisitorInvitation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_visitor_invitations').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findVisitorInvitationsByStudent(schoolId: string, studentId: string): Promise<ScVisitorInvitation[]> {
    const { data, error } = await this.supabase.from('sc_visitor_invitations').select('*').eq('school_id', schoolId).eq('student_id', studentId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveVisitorInvitations(schoolId: string): Promise<ScVisitorInvitation[]> {
    const { data, error } = await this.supabase.from('sc_visitor_invitations').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async cancelVisitorInvitation(schoolId: string, id: string): Promise<ScVisitorInvitation> {
    const { data, error } = await this.supabase.from('sc_visitor_invitations').update({ status: 'cancelled', cancelled_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorInvitationNotFoundError(id);
    return data;
  }

  async countVisitorInvitations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_visitor_invitations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findVisitorApprovalById(schoolId: string, id: string): Promise<ScVisitorApproval> {
    const { data, error } = await this.supabase.from('sc_visitor_approvals').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVisitorApprovalNotFoundError(id);
    return data;
  }

  async findAllVisitorApprovals(schoolId: string): Promise<ScVisitorApproval[]> {
    const { data, error } = await this.supabase.from('sc_visitor_approvals').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createVisitorApproval(schoolId: string, approval: Partial<ScVisitorApproval>): Promise<ScVisitorApproval> {
    const { data, error } = await this.supabase.from('sc_visitor_approvals').insert({ ...approval, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateVisitorApproval(schoolId: string, id: string, updates: Partial<ScVisitorApproval>): Promise<ScVisitorApproval> {
    const { data, error } = await this.supabase.from('sc_visitor_approvals').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorApprovalNotFoundError(id);
    return data;
  }

  async deleteVisitorApproval(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_visitor_approvals').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async approveVisitor(schoolId: string, id: string): Promise<ScVisitorApproval> {
    const { data, error } = await this.supabase.from('sc_visitor_approvals').update({ status: 'approved', approved_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorApprovalNotFoundError(id);
    return data;
  }

  async rejectVisitor(schoolId: string, id: string, reason: string): Promise<ScVisitorApproval> {
    const { data, error } = await this.supabase.from('sc_visitor_approvals').update({ status: 'rejected', rejection_reason: reason, rejected_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorApprovalNotFoundError(id);
    return data;
  }

  async countVisitorApprovals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_visitor_approvals').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findVisitorApprovalsByStatus(schoolId: string, status: string): Promise<ScVisitorApproval[]> {
    const { data, error } = await this.supabase.from('sc_visitor_approvals').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findIdentityVerificationById(schoolId: string, id: string): Promise<ScIdentityVerification> {
    const { data, error } = await this.supabase.from('sc_identity_verifications').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScIdentityVerificationNotFoundError(id);
    return data;
  }

  async findAllIdentityVerifications(schoolId: string): Promise<ScIdentityVerification[]> {
    const { data, error } = await this.supabase.from('sc_identity_verifications').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createIdentityVerification(schoolId: string, verification: Partial<ScIdentityVerification>): Promise<ScIdentityVerification> {
    const { data, error } = await this.supabase.from('sc_identity_verifications').insert({ ...verification, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateIdentityVerification(schoolId: string, id: string, updates: Partial<ScIdentityVerification>): Promise<ScIdentityVerification> {
    const { data, error } = await this.supabase.from('sc_identity_verifications').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScIdentityVerificationNotFoundError(id);
    return data;
  }

  async verifyIdentity(schoolId: string, id: string): Promise<ScIdentityVerification> {
    const { data, error } = await this.supabase.from('sc_identity_verifications').update({ status: 'verified', verified_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScIdentityVerificationNotFoundError(id);
    return data;
  }

  async countIdentityVerifications(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_identity_verifications').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findVisitorBlacklistById(schoolId: string, id: string): Promise<ScVisitorBlacklist> {
    const { data, error } = await this.supabase.from('sc_visitor_blacklists').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScVisitorBlacklistNotFoundError(id);
    return data;
  }

  async findAllVisitorBlacklists(schoolId: string): Promise<ScVisitorBlacklist[]> {
    const { data, error } = await this.supabase.from('sc_visitor_blacklists').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createVisitorBlacklist(schoolId: string, blacklist: Partial<ScVisitorBlacklist>): Promise<ScVisitorBlacklist> {
    const { data, error } = await this.supabase.from('sc_visitor_blacklists').insert({ ...blacklist, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateVisitorBlacklist(schoolId: string, id: string, updates: Partial<ScVisitorBlacklist>): Promise<ScVisitorBlacklist> {
    const { data, error } = await this.supabase.from('sc_visitor_blacklists').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScVisitorBlacklistNotFoundError(id);
    return data;
  }

  async deleteVisitorBlacklist(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_visitor_blacklists').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async isVisitorBlacklisted(schoolId: string, visitorId: string): Promise<boolean> {
    const { data } = await this.supabase.from('sc_visitor_blacklists').select('id').eq('school_id', schoolId).eq('visitor_id', visitorId).limit(1);
    return (data?.length ?? 0) > 0;
  }

  async countVisitorBlacklists(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_visitor_blacklists').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAssetById(schoolId: string, id: string): Promise<ScAsset> {
    const { data, error } = await this.supabase.from('sc_assets').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScAssetNotFoundError(id);
    return data;
  }

  async findAllAssets(schoolId: string): Promise<ScAsset[]> {
    const { data, error } = await this.supabase.from('sc_assets').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAsset(schoolId: string, asset: Partial<ScAsset>): Promise<ScAsset> {
    const { data, error } = await this.supabase.from('sc_assets').insert({ ...asset, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateAsset(schoolId: string, id: string, updates: Partial<ScAsset>): Promise<ScAsset> {
    const { data, error } = await this.supabase.from('sc_assets').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAssetNotFoundError(id);
    return data;
  }

  async deleteAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_assets').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAssetsByCategory(schoolId: string, category: string): Promise<ScAsset[]> {
    const { data, error } = await this.supabase.from('sc_assets').select('*').eq('school_id', schoolId).eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async countAssets(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_assets').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAssetsByStatus(schoolId: string, status: string): Promise<ScAsset[]> {
    const { data, error } = await this.supabase.from('sc_assets').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findAssetsByLocation(schoolId: string, location: string): Promise<ScAsset[]> {
    const { data, error } = await this.supabase.from('sc_assets').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async findAssetWithWarranty(schoolId: string, id: string): Promise<ScAsset> {
    const { data, error } = await this.supabase.from('sc_assets').select('*, sc_asset_warranties(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScAssetNotFoundError(id);
    return data;
  }

  async findEquipmentById(schoolId: string, id: string): Promise<ScEquipment> {
    const { data, error } = await this.supabase.from('sc_equipment').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEquipmentNotFoundError(id);
    return data;
  }

  async findAllEquipment(schoolId: string): Promise<ScEquipment[]> {
    const { data, error } = await this.supabase.from('sc_equipment').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEquipment(schoolId: string, equipment: Partial<ScEquipment>): Promise<ScEquipment> {
    const { data, error } = await this.supabase.from('sc_equipment').insert({ ...equipment, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateEquipment(schoolId: string, id: string, updates: Partial<ScEquipment>): Promise<ScEquipment> {
    const { data, error } = await this.supabase.from('sc_equipment').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEquipmentNotFoundError(id);
    return data;
  }

  async deleteEquipment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_equipment').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEquipmentByType(schoolId: string, type: string): Promise<ScEquipment[]> {
    const { data, error } = await this.supabase.from('sc_equipment').select('*').eq('school_id', schoolId).eq('equipment_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async countEquipment(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_equipment').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEquipmentByStatus(schoolId: string, status: string): Promise<ScEquipment[]> {
    const { data, error } = await this.supabase.from('sc_equipment').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findFurnitureById(schoolId: string, id: string): Promise<ScFurniture> {
    const { data, error } = await this.supabase.from('sc_furniture').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScFurnitureNotFoundError(id);
    return data;
  }

  async findAllFurniture(schoolId: string): Promise<ScFurniture[]> {
    const { data, error } = await this.supabase.from('sc_furniture').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createFurniture(schoolId: string, furniture: Partial<ScFurniture>): Promise<ScFurniture> {
    const { data, error } = await this.supabase.from('sc_furniture').insert({ ...furniture, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateFurniture(schoolId: string, id: string, updates: Partial<ScFurniture>): Promise<ScFurniture> {
    const { data, error } = await this.supabase.from('sc_furniture').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScFurnitureNotFoundError(id);
    return data;
  }

  async deleteFurniture(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_furniture').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findFurnitureByType(schoolId: string, type: string): Promise<ScFurniture[]> {
    const { data, error } = await this.supabase.from('sc_furniture').select('*').eq('school_id', schoolId).eq('furniture_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async countFurniture(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_furniture').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findFurnitureByRoom(schoolId: string, roomId: string): Promise<ScFurniture[]> {
    const { data, error } = await this.supabase.from('sc_furniture').select('*').eq('school_id', schoolId).eq('room_id', roomId);
    if (error) throw error;
    return data ?? [];
  }

  async findFurnitureByStatus(schoolId: string, status: string): Promise<ScFurniture[]> {
    const { data, error } = await this.supabase.from('sc_furniture').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findItAssetById(schoolId: string, id: string): Promise<ScItAsset> {
    const { data, error } = await this.supabase.from('sc_it_assets').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScItAssetNotFoundError(id);
    return data;
  }

  async findAllItAssets(schoolId: string): Promise<ScItAsset[]> {
    const { data, error } = await this.supabase.from('sc_it_assets').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createItAsset(schoolId: string, asset: Partial<ScItAsset>): Promise<ScItAsset> {
    const { data, error } = await this.supabase.from('sc_it_assets').insert({ ...asset, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateItAsset(schoolId: string, id: string, updates: Partial<ScItAsset>): Promise<ScItAsset> {
    const { data, error } = await this.supabase.from('sc_it_assets').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScItAssetNotFoundError(id);
    return data;
  }

  async deleteItAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_it_assets').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findItAssetsByType(schoolId: string, type: string): Promise<ScItAsset[]> {
    const { data, error } = await this.supabase.from('sc_it_assets').select('*').eq('school_id', schoolId).eq('asset_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async countItAssets(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_it_assets').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findItAssetsByStatus(schoolId: string, status: string): Promise<ScItAsset[]> {
    const { data, error } = await this.supabase.from('sc_it_assets').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findAssetWarrantyById(schoolId: string, id: string): Promise<ScAssetWarranty> {
    const { data, error } = await this.supabase.from('sc_asset_warranties').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScAssetWarrantyNotFoundError(id);
    return data;
  }

  async findAllAssetWarranties(schoolId: string): Promise<ScAssetWarranty[]> {
    const { data, error } = await this.supabase.from('sc_asset_warranties').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAssetWarranty(schoolId: string, warranty: Partial<ScAssetWarranty>): Promise<ScAssetWarranty> {
    const { data, error } = await this.supabase.from('sc_asset_warranties').insert({ ...warranty, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateAssetWarranty(schoolId: string, id: string, updates: Partial<ScAssetWarranty>): Promise<ScAssetWarranty> {
    const { data, error } = await this.supabase.from('sc_asset_warranties').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAssetWarrantyNotFoundError(id);
    return data;
  }

  async deleteAssetWarranty(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_asset_warranties').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAssetWarrantiesByAsset(schoolId: string, assetId: string): Promise<ScAssetWarranty[]> {
    const { data, error } = await this.supabase.from('sc_asset_warranties').select('*').eq('school_id', schoolId).eq('asset_id', assetId);
    if (error) throw error;
    return data ?? [];
  }

  async findExpiringWarranties(schoolId: string, withinDays: number): Promise<ScAssetWarranty[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase.from('sc_asset_warranties').select('*').eq('school_id', schoolId).lte('expiry_date', futureDate.toISOString()).gte('expiry_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async countAssetWarranties(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_asset_warranties').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAssetDepreciationById(schoolId: string, id: string): Promise<ScAssetDepreciation> {
    const { data, error } = await this.supabase.from('sc_asset_depreciations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScAssetDepreciationNotFoundError(id);
    return data;
  }

  async findAllAssetDepreciations(schoolId: string): Promise<ScAssetDepreciation[]> {
    const { data, error } = await this.supabase.from('sc_asset_depreciations').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAssetDepreciation(schoolId: string, dep: Partial<ScAssetDepreciation>): Promise<ScAssetDepreciation> {
    const { data, error } = await this.supabase.from('sc_asset_depreciations').insert({ ...dep, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateAssetDepreciation(schoolId: string, id: string, updates: Partial<ScAssetDepreciation>): Promise<ScAssetDepreciation> {
    const { data, error } = await this.supabase.from('sc_asset_depreciations').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAssetDepreciationNotFoundError(id);
    return data;
  }

  async deleteAssetDepreciation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_asset_depreciations').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAssetDepreciationsByAsset(schoolId: string, assetId: string): Promise<ScAssetDepreciation[]> {
    const { data, error } = await this.supabase.from('sc_asset_depreciations').select('*').eq('school_id', schoolId).eq('asset_id', assetId);
    if (error) throw error;
    return data ?? [];
  }

  async countAssetDepreciations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_asset_depreciations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAssetTransferById(schoolId: string, id: string): Promise<ScAssetTransfer> {
    const { data, error } = await this.supabase.from('sc_asset_transfers').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScAssetTransferNotFoundError(id);
    return data;
  }

  async findAllAssetTransfers(schoolId: string): Promise<ScAssetTransfer[]> {
    const { data, error } = await this.supabase.from('sc_asset_transfers').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAssetTransfer(schoolId: string, transfer: Partial<ScAssetTransfer>): Promise<ScAssetTransfer> {
    const { data, error } = await this.supabase.from('sc_asset_transfers').insert({ ...transfer, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateAssetTransfer(schoolId: string, id: string, updates: Partial<ScAssetTransfer>): Promise<ScAssetTransfer> {
    const { data, error } = await this.supabase.from('sc_asset_transfers').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAssetTransferNotFoundError(id);
    return data;
  }

  async deleteAssetTransfer(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_asset_transfers').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAssetTransfersByAsset(schoolId: string, assetId: string): Promise<ScAssetTransfer[]> {
    const { data, error } = await this.supabase.from('sc_asset_transfers').select('*').eq('school_id', schoolId).eq('asset_id', assetId);
    if (error) throw error;
    return data ?? [];
  }

  async countAssetTransfers(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_asset_transfers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAssetTransfersByDateRange(schoolId: string, from: string, to: string): Promise<ScAssetTransfer[]> {
    const { data, error } = await this.supabase.from('sc_asset_transfers').select('*').eq('school_id', schoolId).gte('transfer_date', from).lte('transfer_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findMaintenanceTicketById(schoolId: string, id: string): Promise<ScMaintenanceTicket> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMaintenanceTicketNotFoundError(id);
    return data;
  }

  async findAllMaintenanceTickets(schoolId: string): Promise<ScMaintenanceTicket[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMaintenanceTicket(schoolId: string, ticket: Partial<ScMaintenanceTicket>): Promise<ScMaintenanceTicket> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').insert({ ...ticket, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateMaintenanceTicket(schoolId: string, id: string, updates: Partial<ScMaintenanceTicket>): Promise<ScMaintenanceTicket> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMaintenanceTicketNotFoundError(id);
    return data;
  }

  async deleteMaintenanceTicket(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_maintenance_tickets').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMaintenanceTicketsByStatus(schoolId: string, status: string): Promise<ScMaintenanceTicket[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findMaintenanceTicketsByAsset(schoolId: string, assetId: string): Promise<ScMaintenanceTicket[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*').eq('school_id', schoolId).eq('asset_id', assetId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveMaintenanceTickets(schoolId: string): Promise<ScMaintenanceTicket[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*').eq('school_id', schoolId).eq('status', 'open');
    if (error) throw error;
    return data ?? [];
  }

  async countMaintenanceTickets(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_maintenance_tickets').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async resolveMaintenanceTicket(schoolId: string, id: string, notes: string): Promise<ScMaintenanceTicket> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').update({ status: 'resolved', resolution_notes: notes, resolved_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMaintenanceTicketNotFoundError(id);
    return data;
  }

  async findMaintenanceTicketWithDetails(schoolId: string, id: string): Promise<ScMaintenanceTicket> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*, sc_assets(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMaintenanceTicketNotFoundError(id);
    return data;
  }

  async findMaintenanceTicketByPriority(schoolId: string, priority: string): Promise<ScMaintenanceTicket[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*').eq('school_id', schoolId).eq('priority', priority);
    if (error) throw error;
    return data ?? [];
  }

  async findOverdueMaintenanceTickets(schoolId: string): Promise<ScMaintenanceTicket[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').select('*').eq('school_id', schoolId).eq('status', 'open').lt('due_date', new Date().toISOString());
    if (error) throw error;
    return data ?? [];
  }

  async assignMaintenanceTicket(schoolId: string, id: string, technicianId: string): Promise<ScMaintenanceTicket> {
    const { data, error } = await this.supabase.from('sc_maintenance_tickets').update({ assigned_to: technicianId, status: 'in_progress' }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMaintenanceTicketNotFoundError(id);
    return data;
  }

  async findTechnicianById(schoolId: string, id: string): Promise<ScTechnician> {
    const { data, error } = await this.supabase.from('sc_technicians').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScTechnicianNotFoundError(id);
    return data;
  }

  async findAllTechnicians(schoolId: string): Promise<ScTechnician[]> {
    const { data, error } = await this.supabase.from('sc_technicians').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createTechnician(schoolId: string, tech: Partial<ScTechnician>): Promise<ScTechnician> {
    const { data, error } = await this.supabase.from('sc_technicians').insert({ ...tech, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateTechnician(schoolId: string, id: string, updates: Partial<ScTechnician>): Promise<ScTechnician> {
    const { data, error } = await this.supabase.from('sc_technicians').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScTechnicianNotFoundError(id);
    return data;
  }

  async deleteTechnician(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_technicians').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findAvailableTechnicians(schoolId: string): Promise<ScTechnician[]> {
    const { data, error } = await this.supabase.from('sc_technicians').select('*').eq('school_id', schoolId).eq('status', 'available');
    if (error) throw error;
    return data ?? [];
  }

  async countTechnicians(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_technicians').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findTechniciansBySpecialty(schoolId: string, specialty: string): Promise<ScTechnician[]> {
    const { data, error } = await this.supabase.from('sc_technicians').select('*').eq('school_id', schoolId).eq('specialty', specialty);
    if (error) throw error;
    return data ?? [];
  }

  async findWorkOrderById(schoolId: string, id: string): Promise<ScWorkOrder> {
    const { data, error } = await this.supabase.from('sc_work_orders').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScWorkOrderNotFoundError(id);
    return data;
  }

  async findAllWorkOrders(schoolId: string): Promise<ScWorkOrder[]> {
    const { data, error } = await this.supabase.from('sc_work_orders').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createWorkOrder(schoolId: string, order: Partial<ScWorkOrder>): Promise<ScWorkOrder> {
    const { data, error } = await this.supabase.from('sc_work_orders').insert({ ...order, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateWorkOrder(schoolId: string, id: string, updates: Partial<ScWorkOrder>): Promise<ScWorkOrder> {
    const { data, error } = await this.supabase.from('sc_work_orders').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScWorkOrderNotFoundError(id);
    return data;
  }

  async deleteWorkOrder(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_work_orders').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findWorkOrdersByTicket(schoolId: string, ticketId: string): Promise<ScWorkOrder[]> {
    const { data, error } = await this.supabase.from('sc_work_orders').select('*').eq('school_id', schoolId).eq('ticket_id', ticketId);
    if (error) throw error;
    return data ?? [];
  }

  async findWorkOrdersByStatus(schoolId: string, status: string): Promise<ScWorkOrder[]> {
    const { data, error } = await this.supabase.from('sc_work_orders').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async countWorkOrders(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_work_orders').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async completeWorkOrder(schoolId: string, id: string): Promise<ScWorkOrder> {
    const { data, error } = await this.supabase.from('sc_work_orders').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScWorkOrderNotFoundError(id);
    return data;
  }

  async findMaintenanceContractById(schoolId: string, id: string): Promise<ScMaintenanceContract> {
    const { data, error } = await this.supabase.from('sc_maintenance_contracts').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScMaintenanceContractNotFoundError(id);
    return data;
  }

  async findAllMaintenanceContracts(schoolId: string): Promise<ScMaintenanceContract[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_contracts').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createMaintenanceContract(schoolId: string, contract: Partial<ScMaintenanceContract>): Promise<ScMaintenanceContract> {
    const { data, error } = await this.supabase.from('sc_maintenance_contracts').insert({ ...contract, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateMaintenanceContract(schoolId: string, id: string, updates: Partial<ScMaintenanceContract>): Promise<ScMaintenanceContract> {
    const { data, error } = await this.supabase.from('sc_maintenance_contracts').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMaintenanceContractNotFoundError(id);
    return data;
  }

  async deleteMaintenanceContract(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_maintenance_contracts').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findMaintenanceContractsByAsset(schoolId: string, assetId: string): Promise<ScMaintenanceContract[]> {
    const { data, error } = await this.supabase.from('sc_maintenance_contracts').select('*').eq('school_id', schoolId).eq('asset_id', assetId);
    if (error) throw error;
    return data ?? [];
  }

  async findExpiringMaintenanceContracts(schoolId: string, withinDays: number): Promise<ScMaintenanceContract[]> {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + withinDays);
    const { data, error } = await this.supabase.from('sc_maintenance_contracts').select('*').eq('school_id', schoolId).lte('end_date', futureDate.toISOString()).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async countMaintenanceContracts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_maintenance_contracts').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async renewMaintenanceContract(schoolId: string, id: string, newEndDate: string): Promise<ScMaintenanceContract> {
    const { data, error } = await this.supabase.from('sc_maintenance_contracts').update({ end_date: newEndDate, renewed_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScMaintenanceContractNotFoundError(id);
    return data;
  }

  async findSparePartById(schoolId: string, id: string): Promise<ScSparePart> {
    const { data, error } = await this.supabase.from('sc_spare_parts').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSparePartNotFoundError(id);
    return data;
  }

  async findAllSpareParts(schoolId: string): Promise<ScSparePart[]> {
    const { data, error } = await this.supabase.from('sc_spare_parts').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSparePart(schoolId: string, part: Partial<ScSparePart>): Promise<ScSparePart> {
    const { data, error } = await this.supabase.from('sc_spare_parts').insert({ ...part, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateSparePart(schoolId: string, id: string, updates: Partial<ScSparePart>): Promise<ScSparePart> {
    const { data, error } = await this.supabase.from('sc_spare_parts').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSparePartNotFoundError(id);
    return data;
  }

  async deleteSparePart(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_spare_parts').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findLowStockSpareParts(schoolId: string): Promise<ScSparePart[]> {
    const { data, error } = await this.supabase.from('sc_spare_parts').select('*').eq('school_id', schoolId).lte('quantity', 5);
    if (error) throw error;
    return data ?? [];
  }

  async countSpareParts(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_spare_parts').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSparePartsByName(schoolId: string, name: string): Promise<ScSparePart[]> {
    const { data, error } = await this.supabase.from('sc_spare_parts').select('*').eq('school_id', schoolId).ilike('name', `%${name}%`);
    if (error) throw error;
    return data ?? [];
  }

  async updateSparePartQuantity(schoolId: string, id: string, quantityChange: number): Promise<ScSparePart> {
    const part = await this.findSparePartById(schoolId, id);
    const newQty = (part.quantity ?? 0) + quantityChange;
    const { data, error } = await this.supabase.from('sc_spare_parts').update({ quantity: Math.max(0, newQty) }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSparePartNotFoundError(id);
    return data;
  }

  async findSparePartsByCategory(schoolId: string, category: string): Promise<ScSparePart[]> {
    const { data, error } = await this.supabase.from('sc_spare_parts').select('*').eq('school_id', schoolId).eq('category', category);
    if (error) throw error;
    return data ?? [];
  }

  async findIotDeviceById(schoolId: string, id: string): Promise<ScIotDevice> {
    const { data, error } = await this.supabase.from('sc_iot_devices').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScIoTDeviceNotFoundError(id);
    return data;
  }

  async findAllIotDevices(schoolId: string): Promise<ScIotDevice[]> {
    const { data, error } = await this.supabase.from('sc_iot_devices').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createIotDevice(schoolId: string, device: Partial<ScIotDevice>): Promise<ScIotDevice> {
    const { data, error } = await this.supabase.from('sc_iot_devices').insert({ ...device, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateIotDevice(schoolId: string, id: string, updates: Partial<ScIotDevice>): Promise<ScIotDevice> {
    const { data, error } = await this.supabase.from('sc_iot_devices').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScIoTDeviceNotFoundError(id);
    return data;
  }

  async deleteIotDevice(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_iot_devices').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findIotDevicesByType(schoolId: string, type: string): Promise<ScIotDevice[]> {
    const { data, error } = await this.supabase.from('sc_iot_devices').select('*').eq('school_id', schoolId).eq('device_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveIotDevices(schoolId: string): Promise<ScIotDevice[]> {
    const { data, error } = await this.supabase.from('sc_iot_devices').select('*').eq('school_id', schoolId).eq('status', 'online');
    if (error) throw error;
    return data ?? [];
  }

  async countIotDevices(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_iot_devices').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findIotDevicesByLocation(schoolId: string, location: string): Promise<ScIotDevice[]> {
    const { data, error } = await this.supabase.from('sc_iot_devices').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async findSensorById(schoolId: string, id: string): Promise<ScSensor> {
    const { data, error } = await this.supabase.from('sc_sensors').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSensorNotFoundError(id);
    return data;
  }

  async findAllSensors(schoolId: string): Promise<ScSensor[]> {
    const { data, error } = await this.supabase.from('sc_sensors').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSensor(schoolId: string, sensor: Partial<ScSensor>): Promise<ScSensor> {
    const { data, error } = await this.supabase.from('sc_sensors').insert({ ...sensor, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateSensor(schoolId: string, id: string, updates: Partial<ScSensor>): Promise<ScSensor> {
    const { data, error } = await this.supabase.from('sc_sensors').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSensorNotFoundError(id);
    return data;
  }

  async deleteSensor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_sensors').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findSensorsByType(schoolId: string, type: string): Promise<ScSensor[]> {
    const { data, error } = await this.supabase.from('sc_sensors').select('*').eq('school_id', schoolId).eq('sensor_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async countSensors(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_sensors').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findSensorsByDevice(schoolId: string, deviceId: string): Promise<ScSensor[]> {
    const { data, error } = await this.supabase.from('sc_sensors').select('*').eq('school_id', schoolId).eq('device_id', deviceId);
    if (error) throw error;
    return data ?? [];
  }

  async findEnergyMonitorById(schoolId: string, id: string): Promise<ScEnergyMonitor> {
    const { data, error } = await this.supabase.from('sc_energy_monitors').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEnergyMonitorNotFoundError(id);
    return data;
  }

  async findAllEnergyMonitors(schoolId: string): Promise<ScEnergyMonitor[]> {
    const { data, error } = await this.supabase.from('sc_energy_monitors').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEnergyMonitor(schoolId: string, monitor: Partial<ScEnergyMonitor>): Promise<ScEnergyMonitor> {
    const { data, error } = await this.supabase.from('sc_energy_monitors').insert({ ...monitor, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateEnergyMonitor(schoolId: string, id: string, updates: Partial<ScEnergyMonitor>): Promise<ScEnergyMonitor> {
    const { data, error } = await this.supabase.from('sc_energy_monitors').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEnergyMonitorNotFoundError(id);
    return data;
  }

  async deleteEnergyMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_energy_monitors').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEnergyMonitorsByLocation(schoolId: string, location: string): Promise<ScEnergyMonitor[]> {
    const { data, error } = await this.supabase.from('sc_energy_monitors').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async countEnergyMonitors(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_energy_monitors').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEnergyMonitorByDateRange(schoolId: string, from: string, to: string): Promise<ScEnergyMonitor[]> {
    const { data, error } = await this.supabase.from('sc_energy_monitors').select('*').eq('school_id', schoolId).gte('reading_date', from).lte('reading_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async getTotalEnergyConsumption(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase.from('sc_energy_monitors').select('consumption_kwh').eq('school_id', schoolId).gte('reading_date', from).lte('reading_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.consumption_kwh ?? 0), 0);
  }

  async findWaterMonitorById(schoolId: string, id: string): Promise<ScWaterMonitor> {
    const { data, error } = await this.supabase.from('sc_water_monitors').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScWaterMonitorNotFoundError(id);
    return data;
  }

  async findAllWaterMonitors(schoolId: string): Promise<ScWaterMonitor[]> {
    const { data, error } = await this.supabase.from('sc_water_monitors').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createWaterMonitor(schoolId: string, monitor: Partial<ScWaterMonitor>): Promise<ScWaterMonitor> {
    const { data, error } = await this.supabase.from('sc_water_monitors').insert({ ...monitor, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateWaterMonitor(schoolId: string, id: string, updates: Partial<ScWaterMonitor>): Promise<ScWaterMonitor> {
    const { data, error } = await this.supabase.from('sc_water_monitors').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScWaterMonitorNotFoundError(id);
    return data;
  }

  async deleteWaterMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_water_monitors').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findWaterMonitorsByLocation(schoolId: string, location: string): Promise<ScWaterMonitor[]> {
    const { data, error } = await this.supabase.from('sc_water_monitors').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async countWaterMonitors(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_water_monitors').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findWaterMonitorByDateRange(schoolId: string, from: string, to: string): Promise<ScWaterMonitor[]> {
    const { data, error } = await this.supabase.from('sc_water_monitors').select('*').eq('school_id', schoolId).gte('reading_date', from).lte('reading_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async getTotalWaterUsage(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase.from('sc_water_monitors').select('usage_liters').eq('school_id', schoolId).gte('reading_date', from).lte('reading_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.usage_liters ?? 0), 0);
  }

  async findDoorAccessById(schoolId: string, id: string): Promise<ScDoorAccess> {
    const { data, error } = await this.supabase.from('sc_door_accesses').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScDoorAccessNotFoundError(id);
    return data;
  }

  async findAllDoorAccesses(schoolId: string): Promise<ScDoorAccess[]> {
    const { data, error } = await this.supabase.from('sc_door_accesses').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createDoorAccess(schoolId: string, access: Partial<ScDoorAccess>): Promise<ScDoorAccess> {
    const { data, error } = await this.supabase.from('sc_door_accesses').insert({ ...access, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateDoorAccess(schoolId: string, id: string, updates: Partial<ScDoorAccess>): Promise<ScDoorAccess> {
    const { data, error } = await this.supabase.from('sc_door_accesses').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScDoorAccessNotFoundError(id);
    return data;
  }

  async deleteDoorAccess(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_door_accesses').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findDoorAccessesByDoor(schoolId: string, doorId: string): Promise<ScDoorAccess[]> {
    const { data, error } = await this.supabase.from('sc_door_accesses').select('*').eq('school_id', schoolId).eq('door_id', doorId);
    if (error) throw error;
    return data ?? [];
  }

  async countDoorAccesses(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_door_accesses').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findDoorAccessesByDate(schoolId: string, date: string): Promise<ScDoorAccess[]> {
    const { data, error } = await this.supabase.from('sc_door_accesses').select('*').eq('school_id', schoolId).eq('access_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findDoorAccessesByPerson(schoolId: string, personId: string): Promise<ScDoorAccess[]> {
    const { data, error } = await this.supabase.from('sc_door_accesses').select('*').eq('school_id', schoolId).eq('person_id', personId);
    if (error) throw error;
    return data ?? [];
  }

  async findSmartLockById(schoolId: string, id: string): Promise<ScSmartLock> {
    const { data, error } = await this.supabase.from('sc_smart_locks').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSmartLockNotFoundError(id);
    return data;
  }

  async findAllSmartLocks(schoolId: string): Promise<ScSmartLock[]> {
    const { data, error } = await this.supabase.from('sc_smart_locks').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSmartLock(schoolId: string, lock: Partial<ScSmartLock>): Promise<ScSmartLock> {
    const { data, error } = await this.supabase.from('sc_smart_locks').insert({ ...lock, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateSmartLock(schoolId: string, id: string, updates: Partial<ScSmartLock>): Promise<ScSmartLock> {
    const { data, error } = await this.supabase.from('sc_smart_locks').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSmartLockNotFoundError(id);
    return data;
  }

  async deleteSmartLock(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_smart_locks').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findSmartLocksByDoor(schoolId: string, doorId: string): Promise<ScSmartLock[]> {
    const { data, error } = await this.supabase.from('sc_smart_locks').select('*').eq('school_id', schoolId).eq('door_id', doorId);
    if (error) throw error;
    return data ?? [];
  }

  async countSmartLocks(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_smart_locks').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async lockSmartLock(schoolId: string, id: string): Promise<ScSmartLock> {
    const { data, error } = await this.supabase.from('sc_smart_locks').update({ status: 'locked', locked_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSmartLockNotFoundError(id);
    return data;
  }

  async unlockSmartLock(schoolId: string, id: string): Promise<ScSmartLock> {
    const { data, error } = await this.supabase.from('sc_smart_locks').update({ status: 'unlocked', unlocked_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSmartLockNotFoundError(id);
    return data;
  }

  async findSmartLocksByStatus(schoolId: string, status: string): Promise<ScSmartLock[]> {
    const { data, error } = await this.supabase.from('sc_smart_locks').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async findSmartCameraById(schoolId: string, id: string): Promise<ScSmartCamera> {
    const { data, error } = await this.supabase.from('sc_smart_cameras').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSmartCameraNotFoundError(id);
    return data;
  }

  async findAllSmartCameras(schoolId: string): Promise<ScSmartCamera[]> {
    const { data, error } = await this.supabase.from('sc_smart_cameras').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSmartCamera(schoolId: string, camera: Partial<ScSmartCamera>): Promise<ScSmartCamera> {
    const { data, error } = await this.supabase.from('sc_smart_cameras').insert({ ...camera, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateSmartCamera(schoolId: string, id: string, updates: Partial<ScSmartCamera>): Promise<ScSmartCamera> {
    const { data, error } = await this.supabase.from('sc_smart_cameras').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSmartCameraNotFoundError(id);
    return data;
  }

  async deleteSmartCamera(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_smart_cameras').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findSmartCamerasByLocation(schoolId: string, location: string): Promise<ScSmartCamera[]> {
    const { data, error } = await this.supabase.from('sc_smart_cameras').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async countSmartCameras(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_smart_cameras').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findActiveSmartCameras(schoolId: string): Promise<ScSmartCamera[]> {
    const { data, error } = await this.supabase.from('sc_smart_cameras').select('*').eq('school_id', schoolId).eq('status', 'recording');
    if (error) throw error;
    return data ?? [];
  }

  async findSmartCamerasByType(schoolId: string, type: string): Promise<ScSmartCamera[]> {
    const { data, error } = await this.supabase.from('sc_smart_cameras').select('*').eq('school_id', schoolId).eq('camera_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findAutomationRuleById(schoolId: string, id: string): Promise<ScAutomationRule> {
    const { data, error } = await this.supabase.from('sc_automation_rules').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScAutomationRuleNotFoundError(id);
    return data;
  }

  async findAllAutomationRules(schoolId: string): Promise<ScAutomationRule[]> {
    const { data, error } = await this.supabase.from('sc_automation_rules').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createAutomationRule(schoolId: string, rule: Partial<ScAutomationRule>): Promise<ScAutomationRule> {
    const { data, error } = await this.supabase.from('sc_automation_rules').insert({ ...rule, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateAutomationRule(schoolId: string, id: string, updates: Partial<ScAutomationRule>): Promise<ScAutomationRule> {
    const { data, error } = await this.supabase.from('sc_automation_rules').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAutomationRuleNotFoundError(id);
    return data;
  }

  async deleteAutomationRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_automation_rules').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findActiveAutomationRules(schoolId: string): Promise<ScAutomationRule[]> {
    const { data, error } = await this.supabase.from('sc_automation_rules').select('*').eq('school_id', schoolId).eq('is_active', true);
    if (error) throw error;
    return data ?? [];
  }

  async countAutomationRules(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_automation_rules').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async toggleAutomationRule(schoolId: string, id: string): Promise<ScAutomationRule> {
    const rule = await this.findAutomationRuleById(schoolId, id);
    const { data, error } = await this.supabase.from('sc_automation_rules').update({ is_active: !rule.is_active }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScAutomationRuleNotFoundError(id);
    return data;
  }

  async findAutomationRulesByType(schoolId: string, ruleType: string): Promise<ScAutomationRule[]> {
    const { data, error } = await this.supabase.from('sc_automation_rules').select('*').eq('school_id', schoolId).eq('rule_type', ruleType);
    if (error) throw error;
    return data ?? [];
  }

  async findSmartRoomById(schoolId: string, id: string): Promise<ScSmartRoom> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSmartRoomNotFoundError(id);
    return data;
  }

  async findAllSmartRooms(schoolId: string): Promise<ScSmartRoom[]> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSmartRoom(schoolId: string, room: Partial<ScSmartRoom>): Promise<ScSmartRoom> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').insert({ ...room, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateSmartRoom(schoolId: string, id: string, updates: Partial<ScSmartRoom>): Promise<ScSmartRoom> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSmartRoomNotFoundError(id);
    return data;
  }

  async deleteSmartRoom(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_smart_rooms').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findSmartRoomsByBuilding(schoolId: string, buildingId: string): Promise<ScSmartRoom[]> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').select('*').eq('school_id', schoolId).eq('building_id', buildingId);
    if (error) throw error;
    return data ?? [];
  }

  async findSmartRoomsByType(schoolId: string, roomType: string): Promise<ScSmartRoom[]> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').select('*').eq('school_id', schoolId).eq('room_type', roomType);
    if (error) throw error;
    return data ?? [];
  }

  async countSmartRooms(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_smart_rooms').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findAvailableSmartRooms(schoolId: string): Promise<ScSmartRoom[]> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').select('*').eq('school_id', schoolId).eq('status', 'available');
    if (error) throw error;
    return data ?? [];
  }

  async findSmartRoomWithDevices(schoolId: string, id: string): Promise<ScSmartRoom> {
    const { data, error } = await this.supabase.from('sc_smart_rooms').select('*, sc_iot_devices(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSmartRoomNotFoundError(id);
    return data;
  }

  async findRoomReservationById(schoolId: string, id: string): Promise<ScRoomReservation> {
    const { data, error } = await this.supabase.from('sc_room_reservations').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScRoomReservationNotFoundError(id);
    return data;
  }

  async findAllRoomReservations(schoolId: string): Promise<ScRoomReservation[]> {
    const { data, error } = await this.supabase.from('sc_room_reservations').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRoomReservation(schoolId: string, reservation: Partial<ScRoomReservation>): Promise<ScRoomReservation> {
    const { data, error } = await this.supabase.from('sc_room_reservations').insert({ ...reservation, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateRoomReservation(schoolId: string, id: string, updates: Partial<ScRoomReservation>): Promise<ScRoomReservation> {
    const { data, error } = await this.supabase.from('sc_room_reservations').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScRoomReservationNotFoundError(id);
    return data;
  }

  async deleteRoomReservation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_room_reservations').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findRoomReservationsByRoom(schoolId: string, roomId: string): Promise<ScRoomReservation[]> {
    const { data, error } = await this.supabase.from('sc_room_reservations').select('*').eq('school_id', schoolId).eq('room_id', roomId);
    if (error) throw error;
    return data ?? [];
  }

  async findActiveRoomReservations(schoolId: string): Promise<ScRoomReservation[]> {
    const { data, error } = await this.supabase.from('sc_room_reservations').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async countRoomReservations(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_room_reservations').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async cancelRoomReservation(schoolId: string, id: string): Promise<ScRoomReservation> {
    const { data, error } = await this.supabase.from('sc_room_reservations').update({ status: 'cancelled', cancelled_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScRoomReservationNotFoundError(id);
    return data;
  }

  async findRoomReservationsByDate(schoolId: string, date: string): Promise<ScRoomReservation[]> {
    const { data, error } = await this.supabase.from('sc_room_reservations').select('*').eq('school_id', schoolId).eq('reservation_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findRoomSchedulingById(schoolId: string, id: string): Promise<ScRoomScheduling> {
    const { data, error } = await this.supabase.from('sc_room_schedulings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScRoomSchedulingNotFoundError(id);
    return data;
  }

  async findAllRoomSchedulings(schoolId: string): Promise<ScRoomScheduling[]> {
    const { data, error } = await this.supabase.from('sc_room_schedulings').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createRoomScheduling(schoolId: string, scheduling: Partial<ScRoomScheduling>): Promise<ScRoomScheduling> {
    const { data, error } = await this.supabase.from('sc_room_schedulings').insert({ ...scheduling, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateRoomScheduling(schoolId: string, id: string, updates: Partial<ScRoomScheduling>): Promise<ScRoomScheduling> {
    const { data, error } = await this.supabase.from('sc_room_schedulings').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScRoomSchedulingNotFoundError(id);
    return data;
  }

  async deleteRoomScheduling(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_room_schedulings').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findRoomSchedulingsByRoom(schoolId: string, roomId: string): Promise<ScRoomScheduling[]> {
    const { data, error } = await this.supabase.from('sc_room_schedulings').select('*').eq('school_id', schoolId).eq('room_id', roomId);
    if (error) throw error;
    return data ?? [];
  }

  async countRoomSchedulings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_room_schedulings').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findRoomSchedulingsByDate(schoolId: string, date: string): Promise<ScRoomScheduling[]> {
    const { data, error } = await this.supabase.from('sc_room_schedulings').select('*').eq('school_id', schoolId).eq('schedule_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async findRoomSchedulingsByDateRange(schoolId: string, from: string, to: string): Promise<ScRoomScheduling[]> {
    const { data, error } = await this.supabase.from('sc_room_schedulings').select('*').eq('school_id', schoolId).gte('schedule_date', from).lte('schedule_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findEmergencyPlanById(schoolId: string, id: string): Promise<ScEmergencyPlan> {
    const { data, error } = await this.supabase.from('sc_emergency_plans').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEmergencyPlanNotFoundError(id);
    return data;
  }

  async findAllEmergencyPlans(schoolId: string): Promise<ScEmergencyPlan[]> {
    const { data, error } = await this.supabase.from('sc_emergency_plans').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEmergencyPlan(schoolId: string, plan: Partial<ScEmergencyPlan>): Promise<ScEmergencyPlan> {
    const { data, error } = await this.supabase.from('sc_emergency_plans').insert({ ...plan, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateEmergencyPlan(schoolId: string, id: string, updates: Partial<ScEmergencyPlan>): Promise<ScEmergencyPlan> {
    const { data, error } = await this.supabase.from('sc_emergency_plans').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEmergencyPlanNotFoundError(id);
    return data;
  }

  async deleteEmergencyPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_emergency_plans').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEmergencyPlansByType(schoolId: string, planType: string): Promise<ScEmergencyPlan[]> {
    const { data, error } = await this.supabase.from('sc_emergency_plans').select('*').eq('school_id', schoolId).eq('plan_type', planType);
    if (error) throw error;
    return data ?? [];
  }

  async countEmergencyPlans(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_emergency_plans').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findActiveEmergencyPlans(schoolId: string): Promise<ScEmergencyPlan[]> {
    const { data, error } = await this.supabase.from('sc_emergency_plans').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async findSecurityIncidentById(schoolId: string, id: string): Promise<ScSecurityIncident> {
    const { data, error } = await this.supabase.from('sc_security_incidents').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSecurityIncidentNotFoundError(id);
    return data;
  }

  async findAllSecurityIncidents(schoolId: string): Promise<ScSecurityIncident[]> {
    const { data, error } = await this.supabase.from('sc_security_incidents').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSecurityIncident(schoolId: string, incident: Partial<ScSecurityIncident>): Promise<ScSecurityIncident> {
    const { data, error } = await this.supabase.from('sc_security_incidents').insert({ ...incident, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateSecurityIncident(schoolId: string, id: string, updates: Partial<ScSecurityIncident>): Promise<ScSecurityIncident> {
    const { data, error } = await this.supabase.from('sc_security_incidents').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSecurityIncidentNotFoundError(id);
    return data;
  }

  async deleteSecurityIncident(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_security_incidents').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findSecurityIncidentsBySeverity(schoolId: string, severity: string): Promise<ScSecurityIncident[]> {
    const { data, error } = await this.supabase.from('sc_security_incidents').select('*').eq('school_id', schoolId).eq('severity', severity);
    if (error) throw error;
    return data ?? [];
  }

  async countSecurityIncidents(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_security_incidents').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findUnresolvedSecurityIncidents(schoolId: string): Promise<ScSecurityIncident[]> {
    const { data, error } = await this.supabase.from('sc_security_incidents').select('*').eq('school_id', schoolId).eq('status', 'open');
    if (error) throw error;
    return data ?? [];
  }

  async resolveSecurityIncident(schoolId: string, id: string, notes: string): Promise<ScSecurityIncident> {
    const { data, error } = await this.supabase.from('sc_security_incidents').update({ status: 'resolved', resolution_notes: notes, resolved_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSecurityIncidentNotFoundError(id);
    return data;
  }

  async findGuardById(schoolId: string, id: string): Promise<ScGuard> {
    const { data, error } = await this.supabase.from('sc_guards').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScGuardNotFoundError(id);
    return data;
  }

  async findAllGuards(schoolId: string): Promise<ScGuard[]> {
    const { data, error } = await this.supabase.from('sc_guards').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createGuard(schoolId: string, guard: Partial<ScGuard>): Promise<ScGuard> {
    const { data, error } = await this.supabase.from('sc_guards').insert({ ...guard, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateGuard(schoolId: string, id: string, updates: Partial<ScGuard>): Promise<ScGuard> {
    const { data, error } = await this.supabase.from('sc_guards').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScGuardNotFoundError(id);
    return data;
  }

  async deleteGuard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_guards').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findActiveGuards(schoolId: string): Promise<ScGuard[]> {
    const { data, error } = await this.supabase.from('sc_guards').select('*').eq('school_id', schoolId).eq('status', 'on_duty');
    if (error) throw error;
    return data ?? [];
  }

  async countGuards(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_guards').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findGuardsByShift(schoolId: string, shift: string): Promise<ScGuard[]> {
    const { data, error } = await this.supabase.from('sc_guards').select('*').eq('school_id', schoolId).eq('shift', shift);
    if (error) throw error;
    return data ?? [];
  }

  async findCctvById(schoolId: string, id: string): Promise<ScCctv> {
    const { data, error } = await this.supabase.from('sc_cctvs').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScCctvNotFoundError(id);
    return data;
  }

  async findAllCctvs(schoolId: string): Promise<ScCctv[]> {
    const { data, error } = await this.supabase.from('sc_cctvs').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCctv(schoolId: string, cctv: Partial<ScCctv>): Promise<ScCctv> {
    const { data, error } = await this.supabase.from('sc_cctvs').insert({ ...cctv, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateCctv(schoolId: string, id: string, updates: Partial<ScCctv>): Promise<ScCctv> {
    const { data, error } = await this.supabase.from('sc_cctvs').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScCctvNotFoundError(id);
    return data;
  }

  async deleteCctv(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_cctvs').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findCctvsByLocation(schoolId: string, location: string): Promise<ScCctv[]> {
    const { data, error } = await this.supabase.from('sc_cctvs').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async countCctvs(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_cctvs').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findActiveCctvs(schoolId: string): Promise<ScCctv[]> {
    const { data, error } = await this.supabase.from('sc_cctvs').select('*').eq('school_id', schoolId).eq('status', 'recording');
    if (error) throw error;
    return data ?? [];
  }

  async findCctvsByType(schoolId: string, type: string): Promise<ScCctv[]> {
    const { data, error } = await this.supabase.from('sc_cctvs').select('*').eq('school_id', schoolId).eq('camera_type', type);
    if (error) throw error;
    return data ?? [];
  }

  async findWasteManagementById(schoolId: string, id: string): Promise<ScWasteManagement> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScWasteManagementNotFoundError(id);
    return data;
  }

  async findAllWasteManagement(schoolId: string): Promise<ScWasteManagement[]> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createWasteManagement(schoolId: string, waste: Partial<ScWasteManagement>): Promise<ScWasteManagement> {
    const { data, error } = await this.supabase.from('sc_waste_management').insert({ ...waste, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateWasteManagement(schoolId: string, id: string, updates: Partial<ScWasteManagement>): Promise<ScWasteManagement> {
    const { data, error } = await this.supabase.from('sc_waste_management').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScWasteManagementNotFoundError(id);
    return data;
  }

  async deleteWasteManagement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_waste_management').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findWasteManagementByType(schoolId: string, wasteType: string): Promise<ScWasteManagement[]> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('*').eq('school_id', schoolId).eq('waste_type', wasteType);
    if (error) throw error;
    return data ?? [];
  }

  async countWasteManagement(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_waste_management').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findWasteManagementByDate(schoolId: string, date: string): Promise<ScWasteManagement[]> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('*').eq('school_id', schoolId).eq('collection_date', date);
    if (error) throw error;
    return data ?? [];
  }

  async getTotalWasteWeight(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('weight_kg').eq('school_id', schoolId).gte('collection_date', from).lte('collection_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.weight_kg ?? 0), 0);
  }

  async findWasteManagementByDateRange(schoolId: string, from: string, to: string): Promise<ScWasteManagement[]> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('*').eq('school_id', schoolId).gte('collection_date', from).lte('collection_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findRecycledWaste(schoolId: string): Promise<ScWasteManagement[]> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('*').eq('school_id', schoolId).eq('disposal_method', 'recycled');
    if (error) throw error;
    return data ?? [];
  }

  async findWasteManagementByLocation(schoolId: string, location: string): Promise<ScWasteManagement[]> {
    const { data, error } = await this.supabase.from('sc_waste_management').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async findCarbonFootprintById(schoolId: string, id: string): Promise<ScCarbonFootprint> {
    const { data, error } = await this.supabase.from('sc_carbon_footprint').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScCarbonFootprintNotFoundError(id);
    return data;
  }

  async findAllCarbonFootprint(schoolId: string): Promise<ScCarbonFootprint[]> {
    const { data, error } = await this.supabase.from('sc_carbon_footprint').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createCarbonFootprint(schoolId: string, data_: Partial<ScCarbonFootprint>): Promise<ScCarbonFootprint> {
    const { data, error } = await this.supabase.from('sc_carbon_footprint').insert({ ...data_, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateCarbonFootprint(schoolId: string, id: string, updates: Partial<ScCarbonFootprint>): Promise<ScCarbonFootprint> {
    const { data, error } = await this.supabase.from('sc_carbon_footprint').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScCarbonFootprintNotFoundError(id);
    return data;
  }

  async deleteCarbonFootprint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_carbon_footprint').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findCarbonFootprintByType(schoolId: string, sourceType: string): Promise<ScCarbonFootprint[]> {
    const { data, error } = await this.supabase.from('sc_carbon_footprint').select('*').eq('school_id', schoolId).eq('source_type', sourceType);
    if (error) throw error;
    return data ?? [];
  }

  async countCarbonFootprint(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_carbon_footprint').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async getTotalCarbonEmissions(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase.from('sc_carbon_footprint').select('emissions_kg').eq('school_id', schoolId).gte('record_date', from).lte('record_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.emissions_kg ?? 0), 0);
  }

  async findCarbonFootprintByDateRange(schoolId: string, from: string, to: string): Promise<ScCarbonFootprint[]> {
    const { data, error } = await this.supabase.from('sc_carbon_footprint').select('*').eq('school_id', schoolId).gte('record_date', from).lte('record_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findSolarProductionById(schoolId: string, id: string): Promise<ScSolarProduction> {
    const { data, error } = await this.supabase.from('sc_solar_production').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScSolarProductionNotFoundError(id);
    return data;
  }

  async findAllSolarProduction(schoolId: string): Promise<ScSolarProduction[]> {
    const { data, error } = await this.supabase.from('sc_solar_production').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createSolarProduction(schoolId: string, production: Partial<ScSolarProduction>): Promise<ScSolarProduction> {
    const { data, error } = await this.supabase.from('sc_solar_production').insert({ ...production, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateSolarProduction(schoolId: string, id: string, updates: Partial<ScSolarProduction>): Promise<ScSolarProduction> {
    const { data, error } = await this.supabase.from('sc_solar_production').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScSolarProductionNotFoundError(id);
    return data;
  }

  async deleteSolarProduction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_solar_production').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findSolarProductionByDateRange(schoolId: string, from: string, to: string): Promise<ScSolarProduction[]> {
    const { data, error } = await this.supabase.from('sc_solar_production').select('*').eq('school_id', schoolId).gte('production_date', from).lte('production_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async countSolarProduction(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_solar_production').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async getTotalSolarProduction(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase.from('sc_solar_production').select('energy_kwh').eq('school_id', schoolId).gte('production_date', from).lte('production_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.energy_kwh ?? 0), 0);
  }

  async findEnergySavingById(schoolId: string, id: string): Promise<ScEnergySaving> {
    const { data, error } = await this.supabase.from('sc_energy_savings').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEnergySavingNotFoundError(id);
    return data;
  }

  async findAllEnergySavings(schoolId: string): Promise<ScEnergySaving[]> {
    const { data, error } = await this.supabase.from('sc_energy_savings').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEnergySaving(schoolId: string, saving: Partial<ScEnergySaving>): Promise<ScEnergySaving> {
    const { data, error } = await this.supabase.from('sc_energy_savings').insert({ ...saving, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateEnergySaving(schoolId: string, id: string, updates: Partial<ScEnergySaving>): Promise<ScEnergySaving> {
    const { data, error } = await this.supabase.from('sc_energy_savings').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEnergySavingNotFoundError(id);
    return data;
  }

  async deleteEnergySaving(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_energy_savings').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEnergySavingsByType(schoolId: string, savingType: string): Promise<ScEnergySaving[]> {
    const { data, error } = await this.supabase.from('sc_energy_savings').select('*').eq('school_id', schoolId).eq('saving_type', savingType);
    if (error) throw error;
    return data ?? [];
  }

  async countEnergySavings(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_energy_savings').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async getTotalEnergySavings(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase.from('sc_energy_savings').select('savings_kwh').eq('school_id', schoolId).gte('record_date', from).lte('record_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.savings_kwh ?? 0), 0);
  }

  async findWaterUsageById(schoolId: string, id: string): Promise<ScWaterUsage> {
    const { data, error } = await this.supabase.from('sc_water_usage').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScWaterUsageNotFoundError(id);
    return data;
  }

  async findAllWaterUsage(schoolId: string): Promise<ScWaterUsage[]> {
    const { data, error } = await this.supabase.from('sc_water_usage').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createWaterUsage(schoolId: string, usage: Partial<ScWaterUsage>): Promise<ScWaterUsage> {
    const { data, error } = await this.supabase.from('sc_water_usage').insert({ ...usage, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateWaterUsage(schoolId: string, id: string, updates: Partial<ScWaterUsage>): Promise<ScWaterUsage> {
    const { data, error } = await this.supabase.from('sc_water_usage').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScWaterUsageNotFoundError(id);
    return data;
  }

  async deleteWaterUsage(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_water_usage').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findWaterUsageByLocation(schoolId: string, location: string): Promise<ScWaterUsage[]> {
    const { data, error } = await this.supabase.from('sc_water_usage').select('*').eq('school_id', schoolId).eq('location', location);
    if (error) throw error;
    return data ?? [];
  }

  async countWaterUsage(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_water_usage').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async getTotalWaterUsage(schoolId: string, from: string, to: string): Promise<number> {
    const { data, error } = await this.supabase.from('sc_water_usage').select('usage_liters').eq('school_id', schoolId).gte('usage_date', from).lte('usage_date', to);
    if (error) throw error;
    return (data ?? []).reduce((sum, r) => sum + (r.usage_liters ?? 0), 0);
  }

  async findWaterUsageByDateRange(schoolId: string, from: string, to: string): Promise<ScWaterUsage[]> {
    const { data, error } = await this.supabase.from('sc_water_usage').select('*').eq('school_id', schoolId).gte('usage_date', from).lte('usage_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findEnvironmentalReportById(schoolId: string, id: string): Promise<ScEnvironmentalReport> {
    const { data, error } = await this.supabase.from('sc_environmental_reports').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEnvironmentalReportNotFoundError(id);
    return data;
  }

  async findAllEnvironmentalReports(schoolId: string): Promise<ScEnvironmentalReport[]> {
    const { data, error } = await this.supabase.from('sc_environmental_reports').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEnvironmentalReport(schoolId: string, report: Partial<ScEnvironmentalReport>): Promise<ScEnvironmentalReport> {
    const { data, error } = await this.supabase.from('sc_environmental_reports').insert({ ...report, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateEnvironmentalReport(schoolId: string, id: string, updates: Partial<ScEnvironmentalReport>): Promise<ScEnvironmentalReport> {
    const { data, error } = await this.supabase.from('sc_environmental_reports').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEnvironmentalReportNotFoundError(id);
    return data;
  }

  async deleteEnvironmentalReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_environmental_reports').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEnvironmentalReportsByType(schoolId: string, reportType: string): Promise<ScEnvironmentalReport[]> {
    const { data, error } = await this.supabase.from('sc_environmental_reports').select('*').eq('school_id', schoolId).eq('report_type', reportType);
    if (error) throw error;
    return data ?? [];
  }

  async countEnvironmentalReports(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_environmental_reports').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findEnvironmentalReportsByDateRange(schoolId: string, from: string, to: string): Promise<ScEnvironmentalReport[]> {
    const { data, error } = await this.supabase.from('sc_environmental_reports').select('*').eq('school_id', schoolId).gte('report_date', from).lte('report_date', to);
    if (error) throw error;
    return data ?? [];
  }

  async findEnvironmentalGoalById(schoolId: string, id: string): Promise<ScEnvironmentalGoal> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').select('*').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEnvironmentalGoalNotFoundError(id);
    return data;
  }

  async findAllEnvironmentalGoals(schoolId: string): Promise<ScEnvironmentalGoal[]> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').select('*').eq('school_id', schoolId);
    if (error) throw error;
    return data ?? [];
  }

  async createEnvironmentalGoal(schoolId: string, goal: Partial<ScEnvironmentalGoal>): Promise<ScEnvironmentalGoal> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').insert({ ...goal, school_id: schoolId }).select().single();
    if (error) throw error;
    return data;
  }

  async updateEnvironmentalGoal(schoolId: string, id: string, updates: Partial<ScEnvironmentalGoal>): Promise<ScEnvironmentalGoal> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').update(updates).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEnvironmentalGoalNotFoundError(id);
    return data;
  }

  async deleteEnvironmentalGoal(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase.from('sc_environmental_goals').delete().eq('id', id).eq('school_id', schoolId);
    if (error) throw error;
  }

  async findEnvironmentalGoalsByStatus(schoolId: string, status: string): Promise<ScEnvironmentalGoal[]> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').select('*').eq('school_id', schoolId).eq('status', status);
    if (error) throw error;
    return data ?? [];
  }

  async countEnvironmentalGoals(schoolId: string): Promise<number> {
    const { count, error } = await this.supabase.from('sc_environmental_goals').select('*', { count: 'exact', head: true }).eq('school_id', schoolId);
    if (error) throw error;
    return count ?? 0;
  }

  async findActiveEnvironmentalGoals(schoolId: string): Promise<ScEnvironmentalGoal[]> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').select('*').eq('school_id', schoolId).eq('status', 'active');
    if (error) throw error;
    return data ?? [];
  }

  async completeEnvironmentalGoal(schoolId: string, id: string): Promise<ScEnvironmentalGoal> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', id).eq('school_id', schoolId).select().single();
    if (error) throw new ScEnvironmentalGoalNotFoundError(id);
    return data;
  }

  async findEnvironmentalGoalsByType(schoolId: string, goalType: string): Promise<ScEnvironmentalGoal[]> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').select('*').eq('school_id', schoolId).eq('goal_type', goalType);
    if (error) throw error;
    return data ?? [];
  }

  async findEnvironmentalGoalProgress(schoolId: string, id: string): Promise<ScEnvironmentalGoal> {
    const { data, error } = await this.supabase.from('sc_environmental_goals').select('*, sc_environmental_reports(*)').eq('id', id).eq('school_id', schoolId).single();
    if (error) throw new ScEnvironmentalGoalNotFoundError(id);
    return data;
  }
}
