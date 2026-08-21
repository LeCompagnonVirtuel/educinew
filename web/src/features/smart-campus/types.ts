import { SupabaseClient } from '@supabase/supabase-js';
import type {
  Bus, BusCreate, BusUpdate, BusQuery,
  BusStop, BusStopCreate,
  BusRoute, BusRouteCreate,
  BusTrip, BusTripCreate,
  BusDriver, BusDriverCreate,
  BusAssistant, BusAssistantCreate,
  BusStudentAssignment, BusStudentAssignmentCreate,
  GPSLocation, GPSTracking, LiveTracking,
  BusAttendance, BusCheckIn, BusCheckOut,
  ParentNotification,
  FuelRecord, FuelRecordCreate,
  MaintenanceRecord, MaintenanceRecordCreate,
  BusInsurance, BusInsuranceCreate,
  BusIncident, BusIncidentCreate,
  EmergencyAlert, EmergencyAlertCreate,
  Book, BookCreate, BookUpdate, BookQuery,
  Author, AuthorCreate,
  Publisher, PublisherCreate,
  BookCategory, BookCategoryCreate,
  BookCopy, BookCopyCreate,
  BookLoan, BookLoanCreate,
  BookReturn, BookReturnCreate,
  BookReservation, BookReservationCreate,
  LateFee, LateFeeCreate,
  EBook, EBookCreate,
  Audiobook, AudiobookCreate,
  RFIDTag, RFIDTagCreate,
  LibraryInventory, LibraryInventoryCreate,
  BookAcquisition, BookAcquisitionCreate,
  LibraryCard, LibraryCardCreate,
  Menu, MenuCreate, MenuUpdate,
  Meal, MealCreate,
  Nutrition, NutritionCreate,
  Allergen, AllergenCreate,
  FoodStock, FoodStockCreate,
  FoodSupplier, FoodSupplierCreate,
  MealOrder, MealOrderCreate,
  MealConsumption, MealConsumptionCreate,
  MealSubscription, MealSubscriptionCreate,
  MealPayment, MealPaymentCreate,
  KitchenStaff, KitchenStaffCreate,
  MedicalRecord, MedicalRecordCreate, MedicalRecordUpdate,
  MedicalVisit, MedicalVisitCreate,
  Treatment, TreatmentCreate,
  Vaccination, VaccinationCreate,
  MedicalAllergy2, MedicalAllergyCreate,
  MedicalHistory, MedicalHistoryCreate,
  Medication, MedicationCreate,
  EmergencyContact, EmergencyContactCreate,
  Accident, AccidentCreate,
  HealthReport, HealthReportCreate,
  MedicalCertificate, MedicalCertificateCreate,
  Building, BuildingCreate, BuildingUpdate,
  Room, RoomCreate, RoomUpdate,
  Bed, BedCreate, BedUpdate,
  Occupancy, OccupancyCreate,
  RoomAssignment, RoomAssignmentCreate,
  BoardingAttendance, BoardingAttendanceCreate,
  NightReport, NightReportCreate,
  Visitor, VisitorCreate,
  Discipline, DisciplineCreate,
  VisitorRegistration, VisitorRegistrationCreate,
  VisitorBadge, VisitorBadgeCreate,
  VisitorQR, VisitorQRCreate,
  VisitorInvitation, VisitorInvitationCreate,
  VisitorApproval, VisitorApprovalCreate,
  IdentityVerification, IdentityVerificationCreate,
  VisitorBlacklist, VisitorBlacklistCreate,
  VisitHistory, VisitHistoryCreate,
  Asset, AssetCreate, AssetUpdate,
  Equipment, EquipmentCreate,
  Furniture, FurnitureCreate,
  ITAsset, ITAssetCreate,
  AssetWarranty, AssetWarrantyCreate,
  AssetDepreciation, AssetDepreciationCreate,
  AssetTransfer, AssetTransferCreate,
  MaintenanceTicket, MaintenanceTicketCreate, MaintenanceTicketUpdate,
  Technician, TechnicianCreate,
  WorkOrder, WorkOrderCreate,
  MaintenanceContract, MaintenanceContractCreate,
  SparePart, SparePartCreate,
  IoTDevice, IoTDeviceCreate, IoTDeviceUpdate,
  Sensor, SensorCreate,
  SensorData, SensorDataCreate,
  EnergyMonitor, EnergyMonitorCreate,
  WaterMonitor, WaterMonitorCreate,
  DoorAccess, DoorAccessCreate,
  SmartLock, SmartLockCreate,
  SmartCamera, SmartCameraCreate,
  EnvironmentMonitor, EnvironmentMonitorCreate,
  IoTAlert, IoTAlertCreate,
  AutomationRule, AutomationRuleCreate,
  SmartRoom, SmartRoomCreate, SmartRoomUpdate,
  RoomReservation, RoomReservationCreate,
  RoomScheduling, RoomSchedulingCreate,
  EmergencyPlan, EmergencyPlanCreate, EmergencyPlanUpdate,
  SecurityIncident, SecurityIncidentCreate,
  Guard, GuardCreate,
  CCTV, CCTVCreate,
  WasteManagement, WasteManagementCreate,
  CarbonFootprint, CarbonFootprintCreate,
  SolarProduction, SolarProductionCreate,
  EnergySaving, EnergySavingCreate,
  WaterUsage, WaterUsageCreate,
  EnvironmentalReport, EnvironmentalReportCreate,
} from '@educi/types';

export interface ScBusRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Bus | null>;
  findAll(query?: BusQuery): Promise<Bus[]>;
  findByPlateNumber(plateNumber: string): Promise<Bus | null>;
  findByStatus(status: string): Promise<Bus[]>;
  create(data: BusCreate): Promise<Bus>;
  createMany(data: BusCreate[]): Promise<Bus[]>;
  update(id: string, data: BusUpdate): Promise<Bus>;
  updateMany(ids: string[], data: Partial<BusUpdate>): Promise<Bus[]>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(query?: BusQuery): Promise<number>;
  findByCapacity(minCapacity: number, maxCapacity: number): Promise<Bus[]>;
  findAvailable(date: string): Promise<Bus[]>;
  findBySchoolId(schoolId: string): Promise<Bus[]>;
  updateStatus(id: string, status: string): Promise<Bus>;
  findWithDriver(id: string): Promise<Bus | null>;
  findByYear(year: number): Promise<Bus[]>;
  softDelete(id: string): Promise<void>;
}

export interface ScBusStopRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusStop | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusStop[]>;
  findByLatitudeLongitude(lat: number, lng: number, radiusKm: number): Promise<BusStop[]>;
  findByRouteId(routeId: string): Promise<BusStop[]>;
  create(data: BusStopCreate): Promise<BusStop>;
  createMany(data: BusStopCreate[]): Promise<BusStop[]>;
  update(id: string, data: Partial<BusStopCreate>): Promise<BusStop>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findNearestStops(lat: number, lng: number, limit: number): Promise<BusStop[]>;
  findBySchoolId(schoolId: string): Promise<BusStop[]>;
  reorderStops(routeId: string, stopIds: string[]): Promise<void>;
  findByName(name: string): Promise<BusStop[]>;
  findByZone(zone: string): Promise<BusStop[]>;
}

export interface ScBusRouteRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusRoute | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusRoute[]>;
  findBySchoolId(schoolId: string): Promise<BusRoute[]>;
  findByDriverId(driverId: string): Promise<BusRoute[]>;
  findByStatus(status: string): Promise<BusRoute[]>;
  create(data: BusRouteCreate): Promise<BusRoute>;
  update(id: string, data: Partial<BusRouteCreate>): Promise<BusRoute>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActiveRoutes(date: string): Promise<BusRoute[]>;
  findByBusId(busId: string): Promise<BusRoute[]>;
  findByMorning(): Promise<BusRoute[]>;
  findByAfternoon(): Promise<BusRoute[]>;
  duplicateRoute(id: string, newName: string): Promise<BusRoute>;
  getRouteStops(routeId: string): Promise<BusStop[]>;
}

export interface ScBusTripRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusTrip | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusTrip[]>;
  findByRouteId(routeId: string): Promise<BusTrip[]>;
  findByBusId(busId: string): Promise<BusTrip[]>;
  findByDriverId(driverId: string): Promise<BusTrip[]>;
  findByDate(date: string): Promise<BusTrip[]>;
  create(data: BusTripCreate): Promise<BusTrip>;
  update(id: string, data: Partial<BusTripCreate>): Promise<BusTrip>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActiveTrips(): Promise<BusTrip[]>;
  findCompletedTrips(dateRange: { start: string; end: string }): Promise<BusTrip[]>;
  updateStatus(id: string, status: string): Promise<BusTrip>;
  findByDateRange(start: string, end: string): Promise<BusTrip[]>;
  findScheduledTrips(date: string): Promise<BusTrip[]>;
  getTripPassengers(tripId: string): Promise<BusStudentAssignment[]>;
}

export interface ScBusDriverRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusDriver | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusDriver[]>;
  findByLicenseNumber(licenseNumber: string): Promise<BusDriver | null>;
  findByStatus(status: string): Promise<BusDriver[]>;
  findBySchoolId(schoolId: string): Promise<BusDriver[]>;
  create(data: BusDriverCreate): Promise<BusDriver>;
  update(id: string, data: Partial<BusDriverCreate>): Promise<BusDriver>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByExperience(minYears: number): Promise<BusDriver[]>;
  findAvailable(date: string): Promise<BusDriver[]>;
  updateStatus(id: string, status: string): Promise<BusDriver>;
  findWithActiveRoute(): Promise<BusDriver[]>;
  findByCertification(certification: string): Promise<BusDriver[]>;
  getDriverSchedule(driverId: string, date: string): Promise<BusTrip[]>;
  findExpiringLicense(expiryDate: string): Promise<BusDriver[]>;
}

export interface ScBusAssistantRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusAssistant | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusAssistant[]>;
  findBySchoolId(schoolId: string): Promise<BusAssistant[]>;
  findByStatus(status: string): Promise<BusAssistant[]>;
  create(data: BusAssistantCreate): Promise<BusAssistant>;
  update(id: string, data: Partial<BusAssistantCreate>): Promise<BusAssistant>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailable(date: string): Promise<BusAssistant[]>;
  findByTripId(tripId: string): Promise<BusAssistant | null>;
  updateStatus(id: string, status: string): Promise<BusAssistant>;
  findByRouteId(routeId: string): Promise<BusAssistant[]>;
  findByBusId(busId: string): Promise<BusAssistant[]>;
  getAssistantHistory(assistantId: string): Promise<BusTrip[]>;
}

export interface ScBusAssignmentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusStudentAssignment | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusStudentAssignment[]>;
  findByStudentId(studentId: string): Promise<BusStudentAssignment[]>;
  findByBusId(busId: string): Promise<BusStudentAssignment[]>;
  findByRouteId(routeId: string): Promise<BusStudentAssignment[]>;
  create(data: BusStudentAssignmentCreate): Promise<BusStudentAssignment>;
  createMany(data: BusStudentAssignmentCreate[]): Promise<BusStudentAssignment[]>;
  update(id: string, data: Partial<BusStudentAssignmentCreate>): Promise<BusStudentAssignment>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByStopId(stopId: string): Promise<BusStudentAssignment[]>;
  findActiveByStudent(studentId: string): Promise<BusStudentAssignment | null>;
  bulkAssign(assignments: BusStudentAssignmentCreate[]): Promise<BusStudentAssignment[]>;
  removeStudentFromBus(studentId: string, busId: string): Promise<void>;
  findByDateRange(start: string, end: string): Promise<BusStudentAssignment[]>;
}

export interface ScGPSTrackingRepository {
  client: SupabaseClient;
  findById(id: string): Promise<GPSTracking | null>;
  findAll(filters?: Record<string, unknown>): Promise<GPSTracking[]>;
  findByBusId(busId: string): Promise<GPSTracking[]>;
  findLatestByBusId(busId: string): Promise<GPSTracking | null>;
  create(data: GPSLocation): Promise<GPSTracking>;
  createMany(data: GPSLocation[]): Promise<GPSTracking[]>;
  update(id: string, data: Partial<GPSLocation>): Promise<GPSTracking>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(busId: string, start: string, end: string): Promise<GPSTracking[]>;
  findOutOfRange(busId: string, maxDistanceKm: number): Promise<GPSTracking[]>;
  findSpeedViolations(maxSpeed: number): Promise<GPSTracking[]>;
  getBusRoute(busId: string, date: string): Promise<GPSTracking[]>;
  findRecentPositions(limit: number): Promise<GPSTracking[]>;
  getLivePositions(): Promise<LiveTracking[]>;
  findByTripId(tripId: string): Promise<GPSTracking[]>;
}

export interface ScBusAttendanceRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusAttendance | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusAttendance[]>;
  findByTripId(tripId: string): Promise<BusAttendance[]>;
  findByStudentId(studentId: string): Promise<BusAttendance[]>;
  findByDate(date: string): Promise<BusAttendance[]>;
  createCheckIn(data: BusCheckIn): Promise<BusAttendance>;
  createCheckOut(data: BusCheckOut): Promise<BusAttendance>;
  update(id: string, data: Partial<BusAttendance>): Promise<BusAttendance>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByBusId(busId: string, date: string): Promise<BusAttendance[]>;
  findAbsentStudents(tripId: string): Promise<string[]>;
  getAttendanceRate(busId: string, startDate: string, endDate: string): Promise<number>;
  findUncheckedOut(tripId: string): Promise<BusAttendance[]>;
  findByStopId(stopId: string, date: string): Promise<BusAttendance[]>;
  getDailyStats(schoolId: string, date: string): Promise<Record<string, number>>;
}

export interface ScFuelRecordRepository {
  client: SupabaseClient;
  findById(id: string): Promise<FuelRecord | null>;
  findAll(filters?: Record<string, unknown>): Promise<FuelRecord[]>;
  findByBusId(busId: string): Promise<FuelRecord[]>;
  findByDateRange(start: string, end: string): Promise<FuelRecord[]>;
  create(data: FuelRecordCreate): Promise<FuelRecord>;
  createMany(data: FuelRecordCreate[]): Promise<FuelRecord[]>;
  update(id: string, data: Partial<FuelRecordCreate>): Promise<FuelRecord>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  getTotalFuelCost(busId: string, start: string, end: string): Promise<number>;
  getAverageConsumption(busId: string): Promise<number>;
  findByFuelType(fuelType: string): Promise<FuelRecord[]>;
  findHighConsumption(thresholdLiters: number): Promise<FuelRecord[]>;
  getMonthlySummary(schoolId: string, year: number, month: number): Promise<Record<string, number>>;
  findRecentFills(busId: string, limit: number): Promise<FuelRecord[]>;
}

export interface ScBusMaintenanceRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MaintenanceRecord | null>;
  findAll(filters?: Record<string, unknown>): Promise<MaintenanceRecord[]>;
  findByBusId(busId: string): Promise<MaintenanceRecord[]>;
  findByStatus(status: string): Promise<MaintenanceRecord[]>;
  findByType(type: string): Promise<MaintenanceRecord[]>;
  create(data: MaintenanceRecordCreate): Promise<MaintenanceRecord>;
  createMany(data: MaintenanceRecordCreate[]): Promise<MaintenanceRecord[]>;
  update(id: string, data: Partial<MaintenanceRecordCreate>): Promise<MaintenanceRecord>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findUpcomingMaintenance(): Promise<MaintenanceRecord[]>;
  findOverdue(): Promise<MaintenanceRecord[]>;
  findByDateRange(start: string, end: string): Promise<MaintenanceRecord[]>;
  getNextMaintenanceDate(busId: string): Promise<string | null>;
  getMaintenanceCost(busId: string, start: string, end: string): Promise<number>;
  findByMechanic(mechanicName: string): Promise<MaintenanceRecord[]>;
}

export interface ScBusInsuranceRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusInsurance | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusInsurance[]>;
  findByBusId(busId: string): Promise<BusInsurance | null>;
  findByStatus(status: string): Promise<BusInsurance[]>;
  create(data: BusInsuranceCreate): Promise<BusInsurance>;
  update(id: string, data: Partial<BusInsuranceCreate>): Promise<BusInsurance>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findExpiringSoon(daysUntilExpiry: number): Promise<BusInsurance[]>;
  findExpired(): Promise<BusInsurance[]>;
  findByProvider(provider: string): Promise<BusInsurance[]>;
  findByPolicyNumber(policyNumber: string): Promise<BusInsurance | null>;
  findByDateRange(start: string, end: string): Promise<BusInsurance[]>;
  getTotalPremiumCost(schoolId: string): Promise<number>;
  renewInsurance(id: string, newExpiryDate: string): Promise<BusInsurance>;
}

export interface ScBusIncidentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BusIncident | null>;
  findAll(filters?: Record<string, unknown>): Promise<BusIncident[]>;
  findByBusId(busId: string): Promise<BusIncident[]>;
  findByDriverId(driverId: string): Promise<BusIncident[]>;
  findBySeverity(severity: string): Promise<BusIncident[]>;
  create(data: BusIncidentCreate): Promise<BusIncident>;
  createMany(data: BusIncidentCreate[]): Promise<BusIncident[]>;
  update(id: string, data: Partial<BusIncidentCreate>): Promise<BusIncident>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<BusIncident[]>;
  findOpenIncidents(): Promise<BusIncident[]>;
  findByTripId(tripId: string): Promise<BusIncident[]>;
  findByLocation(lat: number, lng: number, radiusKm: number): Promise<BusIncident[]>;
  resolveIncident(id: string, resolution: string): Promise<BusIncident>;
  getIncidentStats(schoolId: string, year: number): Promise<Record<string, number>>;
}

export interface ScEmergencyAlertRepository {
  client: SupabaseClient;
  findById(id: string): Promise<EmergencyAlert | null>;
  findAll(filters?: Record<string, unknown>): Promise<EmergencyAlert[]>;
  findByBusId(busId: string): Promise<EmergencyAlert[]>;
  findByType(type: string): Promise<EmergencyAlert[]>;
  findActive(): Promise<EmergencyAlert[]>;
  create(data: EmergencyAlertCreate): Promise<EmergencyAlert>;
  createMany(data: EmergencyAlertCreate[]): Promise<EmergencyAlert[]>;
  update(id: string, data: Partial<EmergencyAlertCreate>): Promise<EmergencyAlert>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<EmergencyAlert[]>;
  resolve(id: string, resolvedBy: string): Promise<EmergencyAlert>;
  findUnresolved(): Promise<EmergencyAlert[]>;
  findByPriority(priority: string): Promise<EmergencyAlert[]>;
  findSentAlerts(): Promise<EmergencyAlert[]>;
  findBySchoolId(schoolId: string): Promise<EmergencyAlert[]>;
}

// ─── Library ────────────────────────────────────────────────────────────────

export interface ScBookRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Book | null>;
  findAll(query?: BookQuery): Promise<Book[]>;
  findByISBN(isbn: string): Promise<Book | null>;
  findByTitle(title: string): Promise<Book[]>;
  findByAuthor(authorId: string): Promise<Book[]>;
  findByCategory(categoryId: string): Promise<Book[]>;
  findByPublisher(publisherId: string): Promise<Book[]>;
  create(data: BookCreate): Promise<Book>;
  createMany(data: BookCreate[]): Promise<Book[]>;
  update(id: string, data: BookUpdate): Promise<Book>;
  updateMany(ids: string[], data: Partial<BookUpdate>): Promise<Book[]>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(query?: BookQuery): Promise<number>;
  searchFullText(query: string): Promise<Book[]>;
  findAvailable(): Promise<Book[]>;
  findPopular(limit: number): Promise<Book[]>;
  findByLanguage(language: string): Promise<Book[]>;
  findByYearRange(startYear: number, endYear: number): Promise<Book[]>;
  findBySubject(subject: string): Promise<Book[]>;
}

export interface ScAuthorRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Author | null>;
  findAll(filters?: Record<string, unknown>): Promise<Author[]>;
  findByName(name: string): Promise<Author[]>;
  findByNationality(nationality: string): Promise<Author[]>;
  create(data: AuthorCreate): Promise<Author>;
  createMany(data: AuthorCreate[]): Promise<Author[]>;
  update(id: string, data: Partial<AuthorCreate>): Promise<Author>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  searchByName(query: string): Promise<Author[]>;
  findWithBooks(authorId: string): Promise<Book[]>;
  findMostProlific(limit: number): Promise<Author[]>;
  findByBirthYearRange(start: number, end: number): Promise<Author[]>;
  findByGenre(genre: string): Promise<Author[]>;
}

export interface ScPublisherRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Publisher | null>;
  findAll(filters?: Record<string, unknown>): Promise<Publisher[]>;
  findByName(name: string): Promise<Publisher | null>;
  findByCountry(country: string): Promise<Publisher[]>;
  create(data: PublisherCreate): Promise<Publisher>;
  createMany(data: PublisherCreate[]): Promise<Publisher[]>;
  update(id: string, data: Partial<PublisherCreate>): Promise<Publisher>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  searchByName(query: string): Promise<Publisher[]>;
  findWithBooks(publisherId: string): Promise<Book[]>;
  findMostActive(limit: number): Promise<Publisher[]>;
  findByCity(city: string): Promise<Publisher[]>;
  findByWebsite(website: string): Promise<Publisher | null>;
}

export interface ScBookCategoryRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BookCategory | null>;
  findAll(filters?: Record<string, unknown>): Promise<BookCategory[]>;
  findByName(name: string): Promise<BookCategory | null>;
  findByParentId(parentId: string): Promise<BookCategory[]>;
  findRootCategories(): Promise<BookCategory[]>;
  create(data: BookCategoryCreate): Promise<BookCategory>;
  update(id: string, data: Partial<BookCategoryCreate>): Promise<BookCategory>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  getSubcategories(id: string): Promise<BookCategory[]>;
  getBookCount(categoryId: string): Promise<number>;
  getFullPath(id: string): Promise<string>;
  findPopular(limit: number): Promise<BookCategory[]>;
  reorderCategories(categoryIds: string[]): Promise<void>;
}

export interface ScBookCopyRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BookCopy | null>;
  findAll(filters?: Record<string, unknown>): Promise<BookCopy[]>;
  findByBookId(bookId: string): Promise<BookCopy[]>;
  findByStatus(status: string): Promise<BookCopy[]>;
  findByBarcode(barcode: string): Promise<BookCopy | null>;
  findByRFID(rfidTagId: string): Promise<BookCopy | null>;
  create(data: BookCopyCreate): Promise<BookCopy>;
  createMany(data: BookCopyCreate[]): Promise<BookCopy[]>;
  update(id: string, data: Partial<BookCopyCreate>): Promise<BookCopy>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailableCopies(bookId: string): Promise<BookCopy[]>;
  findByBranch(branchId: string): Promise<BookCopy[]>;
  findDamaged(): Promise<BookCopy[]>;
  findLost(): Promise<BookCopy[]>;
  updateStatus(id: string, status: string): Promise<BookCopy>;
}

export interface ScBookLoanRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BookLoan | null>;
  findAll(filters?: Record<string, unknown>): Promise<BookLoan[]>;
  findByStudentId(studentId: string): Promise<BookLoan[]>;
  findByCopyId(copyId: string): Promise<BookLoan[]>;
  findByBookId(bookId: string): Promise<BookLoan[]>;
  findActiveLoans(): Promise<BookLoan[]>;
  findOverdueLoans(): Promise<BookLoan[]>;
  create(data: BookLoanCreate): Promise<BookLoan>;
  update(id: string, data: Partial<BookLoanCreate>): Promise<BookLoan>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<BookLoan[]>;
  findByCardId(cardId: string): Promise<BookLoan[]>;
  findCurrentlyLoaned(): Promise<BookLoan[]>;
  getLoanHistory(studentId: string): Promise<BookLoan[]>;
  extendLoan(id: string, newDueDate: string): Promise<BookLoan>;
  findMostBorrowed(limit: number): Promise<{ bookId: string; count: number }[]>;
}

export interface ScBookReturnRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BookReturn | null>;
  findAll(filters?: Record<string, unknown>): Promise<BookReturn[]>;
  findByLoanId(loanId: string): Promise<BookReturn | null>;
  findByStudentId(studentId: string): Promise<BookReturn[]>;
  findByCopyId(copyId: string): Promise<BookReturn[]>;
  create(data: BookReturnCreate): Promise<BookReturn>;
  update(id: string, data: Partial<BookReturnCreate>): Promise<BookReturn>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<BookReturn[]>;
  findLateReturns(): Promise<BookReturn[]>;
  findReturnedOnDate(date: string): Promise<BookReturn[]>;
  getReturnRate(startDate: string, endDate: string): Promise<number>;
  findByHandledBy(staffId: string): Promise<BookReturn[]>;
}

export interface ScBookReservationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BookReservation | null>;
  findAll(filters?: Record<string, unknown>): Promise<BookReservation[]>;
  findByStudentId(studentId: string): Promise<BookReservation[]>;
  findByBookId(bookId: string): Promise<BookReservation[]>;
  findActive(): Promise<BookReservation[]>;
  findPending(): Promise<BookReservation[]>;
  create(data: BookReservationCreate): Promise<BookReservation>;
  update(id: string, data: Partial<BookReservationCreate>): Promise<BookReservation>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<BookReservation[]>;
  cancel(id: string): Promise<BookReservation>;
  fulfill(id: string, copyId: string): Promise<BookReservation>;
  expireOldReservations(expiryDate: string): Promise<number>;
  getQueuePosition(bookId: string, studentId: string): Promise<number>;
  findExpired(): Promise<BookReservation[]>;
}

export interface ScLateFeeRepository {
  client: SupabaseClient;
  findById(id: string): Promise<LateFee | null>;
  findAll(filters?: Record<string, unknown>): Promise<LateFee[]>;
  findByStudentId(studentId: string): Promise<LateFee[]>;
  findByLoanId(loanId: string): Promise<LateFee | null>;
  findUnpaid(): Promise<LateFee[]>;
  create(data: LateFeeCreate): Promise<LateFee>;
  update(id: string, data: Partial<LateFeeCreate>): Promise<LateFee>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<LateFee[]>;
  markPaid(id: string, paymentDate: string): Promise<LateFee>;
  waive(id: string, reason: string): Promise<LateFee>;
  getTotalOutstanding(): Promise<number>;
  findByStatus(status: string): Promise<LateFee[]>;
  generateFee(loanId: string, daysLate: number): Promise<LateFee>;
}

export interface ScEBookRepository {
  client: SupabaseClient;
  findById(id: string): Promise<EBook | null>;
  findAll(filters?: Record<string, unknown>): Promise<EBook[]>;
  findByBookId(bookId: string): Promise<EBook | null>;
  findByFormat(format: string): Promise<EBook[]>;
  findByFileSize(maxSizeMb: number): Promise<EBook[]>;
  create(data: EBookCreate): Promise<EBook>;
  update(id: string, data: Partial<EBookCreate>): Promise<EBook>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailable(): Promise<EBook[]>;
  findWithDRM(): Promise<EBook[]>;
  findPopular(limit: number): Promise<EBook[]>;
  findByLanguage(language: string): Promise<EBook[]>;
  findByDateRange(start: string, end: string): Promise<EBook[]>;
  findRecentUploads(limit: number): Promise<EBook[]>;
}

export interface ScAudiobookRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Audiobook | null>;
  findAll(filters?: Record<string, unknown>): Promise<Audiobook[]>;
  findByBookId(bookId: string): Promise<Audiobook | null>;
  findByNarrator(narrator: string): Promise<Audiobook[]>;
  findByDurationRange(minMinutes: number, maxMinutes: number): Promise<Audiobook[]>;
  create(data: AudiobookCreate): Promise<Audiobook>;
  update(id: string, data: Partial<AudiobookCreate>): Promise<Audiobook>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailable(): Promise<Audiobook[]>;
  findByLanguage(language: string): Promise<Audiobook[]>;
  findPopular(limit: number): Promise<Audiobook[]>;
  findRecentUploads(limit: number): Promise<Audiobook[]>;
  findByFormat(format: string): Promise<Audiobook[]>;
  getTotalDuration(): Promise<number>;
}

export interface ScRFIDRepository {
  client: SupabaseClient;
  findById(id: string): Promise<RFIDTag | null>;
  findAll(filters?: Record<string, unknown>): Promise<RFIDTag[]>;
  findByTagCode(tagCode: string): Promise<RFIDTag | null>;
  findByStatus(status: string): Promise<RFIDTag[]>;
  findByCopyId(copyId: string): Promise<RFIDTag | null>;
  create(data: RFIDTagCreate): Promise<RFIDTag>;
  createMany(data: RFIDTagCreate[]): Promise<RFIDTag[]>;
  update(id: string, data: Partial<RFIDTagCreate>): Promise<RFIDTag>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  deactivate(id: string): Promise<RFIDTag>;
  reactivate(id: string): Promise<RFIDTag>;
  findActive(): Promise<RFIDTag[]>;
  findByBatch(batchId: string): Promise<RFIDTag[]>;
  findInactive(): Promise<RFIDTag[]>;
}

export interface ScLibraryInventoryRepository {
  client: SupabaseClient;
  findById(id: string): Promise<LibraryInventory | null>;
  findAll(filters?: Record<string, unknown>): Promise<LibraryInventory[]>;
  findByBookId(bookId: string): Promise<LibraryInventory | null>;
  findByBranch(branchId: string): Promise<LibraryInventory[]>;
  findLowStock(threshold: number): Promise<LibraryInventory[]>;
  create(data: LibraryInventoryCreate): Promise<LibraryInventory>;
  update(id: string, data: Partial<LibraryInventoryCreate>): Promise<LibraryInventory>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  adjustQuantity(id: string, adjustment: number): Promise<LibraryInventory>;
  getTotalValue(branchId: string): Promise<number>;
  findByShelfLocation(shelf: string): Promise<LibraryInventory[]>;
  findRecentlyAdded(limit: number): Promise<LibraryInventory[]>;
  getStockByCategory(categoryId: string): Promise<LibraryInventory[]>;
}

export interface ScBookAcquisitionRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BookAcquisition | null>;
  findAll(filters?: Record<string, unknown>): Promise<BookAcquisition[]>;
  findByStatus(status: string): Promise<BookAcquisition[]>;
  findByBookId(bookId: string): Promise<BookAcquisition | null>;
  findBySupplier(supplierId: string): Promise<BookAcquisition[]>;
  create(data: BookAcquisitionCreate): Promise<BookAcquisition>;
  update(id: string, data: Partial<BookAcquisitionCreate>): Promise<BookAcquisition>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<BookAcquisition[]>;
  approve(id: string, approvedBy: string): Promise<BookAcquisition>;
  complete(id: string): Promise<BookAcquisition>;
  cancel(id: string): Promise<BookAcquisition>;
  getPendingApprovals(): Promise<BookAcquisition[]>;
  getTotalSpent(startDate: string, endDate: string): Promise<number>;
}

export interface ScLibraryCardRepository {
  client: SupabaseClient;
  findById(id: string): Promise<LibraryCard | null>;
  findAll(filters?: Record<string, unknown>): Promise<LibraryCard[]>;
  findByStudentId(studentId: string): Promise<LibraryCard | null>;
  findByCardNumber(cardNumber: string): Promise<LibraryCard | null>;
  findByStatus(status: string): Promise<LibraryCard[]>;
  create(data: LibraryCardCreate): Promise<LibraryCard>;
  update(id: string, data: Partial<LibraryCardCreate>): Promise<LibraryCard>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  activate(id: string): Promise<LibraryCard>;
  deactivate(id: string): Promise<LibraryCard>;
  block(id: string, reason: string): Promise<LibraryCard>;
  findExpiringSoon(daysUntilExpiry: number): Promise<LibraryCard[]>;
  renew(id: string, newExpiryDate: string): Promise<LibraryCard>;
  findActive(): Promise<LibraryCard[]>;
}

// ─── Cantine ────────────────────────────────────────────────────────────────

export interface ScMenuRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Menu | null>;
  findAll(filters?: Record<string, unknown>): Promise<Menu[]>;
  findByDate(date: string): Promise<Menu | null>;
  findByDateRange(start: string, end: string): Promise<Menu[]>;
  findByWeek(weekNumber: number, year: number): Promise<Menu[]>;
  create(data: MenuCreate): Promise<Menu>;
  update(id: string, data: MenuUpdate): Promise<Menu>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActive(): Promise<Menu | null>;
  publish(id: string): Promise<Menu>;
  unpublish(id: string): Promise<Menu>;
  duplicateMenu(id: string, newDate: string): Promise<Menu>;
  findPublished(): Promise<Menu[]>;
  findByMealType(mealType: string): Promise<Menu[]>;
}

export interface ScMealRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Meal | null>;
  findAll(filters?: Record<string, unknown>): Promise<Meal[]>;
  findByMenuId(menuId: string): Promise<Meal[]>;
  findByType(type: string): Promise<Meal[]>;
  findByName(name: string): Promise<Meal[]>;
  create(data: MealCreate): Promise<Meal>;
  createMany(data: MealCreate[]): Promise<Meal[]>;
  update(id: string, data: Partial<MealCreate>): Promise<Meal>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByCaloriesRange(min: number, max: number): Promise<Meal[]>;
  findVegetarian(): Promise<Meal[]>;
  findVegan(): Promise<Meal[]>;
  findByAllergenFree(allergenIds: string[]): Promise<Meal[]>;
  findPopular(limit: number): Promise<Meal[]>;
}

export interface ScNutritionRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Nutrition | null>;
  findAll(filters?: Record<string, unknown>): Promise<Nutrition[]>;
  findByMealId(mealId: string): Promise<Nutrition | null>;
  findByNutrient(nutrientName: string, minValue: number, maxValue: number): Promise<Nutrition[]>;
  create(data: NutritionCreate): Promise<Nutrition>;
  update(id: string, data: Partial<NutritionCreate>): Promise<Nutrition>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByCaloriesRange(min: number, max: number): Promise<Nutrition[]>;
  findHighProtein(minGrams: number): Promise<Nutrition[]>;
  findLowFat(maxGrams: number): Promise<Nutrition[]>;
  findHighFiber(minGrams: number): Promise<Nutrition[]>;
  findByMealIds(mealIds: string[]): Promise<Nutrition[]>;
  getNutritionSummary(mealId: string): Promise<Nutrition | null>;
}

export interface ScAllergenRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Allergen | null>;
  findAll(filters?: Record<string, unknown>): Promise<Allergen[]>;
  findByName(name: string): Promise<Allergen | null>;
  findBySeverity(severity: string): Promise<Allergen[]>;
  create(data: AllergenCreate): Promise<Allergen>;
  createMany(data: AllergenCreate[]): Promise<Allergen[]>;
  update(id: string, data: Partial<AllergenCreate>): Promise<Allergen>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByMealId(mealId: string): Promise<Allergen[]>;
  findByStudentId(studentId: string): Promise<Allergen[]>;
  searchByName(query: string): Promise<Allergen[]>;
  findCommon(): Promise<Allergen[]>;
  getMealsWithAllergen(allergenId: string): Promise<Meal[]>;
}

export interface ScFoodStockRepository {
  client: SupabaseClient;
  findById(id: string): Promise<FoodStock | null>;
  findAll(filters?: Record<string, unknown>): Promise<FoodStock[]>;
  findByIngredient(ingredient: string): Promise<FoodStock | null>;
  findLowStock(): Promise<FoodStock[]>;
  findExpiringSoon(daysUntilExpiry: number): Promise<FoodStock[]>;
  create(data: FoodStockCreate): Promise<FoodStock>;
  update(id: string, data: Partial<FoodStockCreate>): Promise<FoodStock>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  adjustQuantity(id: string, adjustment: number): Promise<FoodStock>;
  findExpired(): Promise<FoodStock[]>;
  findBySupplier(supplierId: string): Promise<FoodStock[]>;
  findByCategory(category: string): Promise<FoodStock[]>;
  getStockValue(): Promise<number>;
  findByDateRange(addedStart: string, addedEnd: string): Promise<FoodStock[]>;
}

export interface ScFoodSupplierRepository {
  client: SupabaseClient;
  findById(id: string): Promise<FoodSupplier | null>;
  findAll(filters?: Record<string, unknown>): Promise<FoodSupplier[]>;
  findByName(name: string): Promise<FoodSupplier | null>;
  findByStatus(status: string): Promise<FoodSupplier[]>;
  findByProductType(productType: string): Promise<FoodSupplier[]>;
  create(data: FoodSupplierCreate): Promise<FoodSupplier>;
  update(id: string, data: Partial<FoodSupplierCreate>): Promise<FoodSupplier>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByRating(minRating: number): Promise<FoodSupplier[]>;
  findActive(): Promise<FoodSupplier[]>;
  findWithContract(): Promise<FoodSupplier[]>;
  findByCity(city: string): Promise<FoodSupplier[]>;
  findRecent(limit: number): Promise<FoodSupplier[]>;
}

export interface ScMealOrderRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MealOrder | null>;
  findAll(filters?: Record<string, unknown>): Promise<MealOrder[]>;
  findByStudentId(studentId: string): Promise<MealOrder[]>;
  findByMenuId(menuId: string): Promise<MealOrder[]>;
  findByDate(date: string): Promise<MealOrder[]>;
  findByStatus(status: string): Promise<MealOrder[]>;
  create(data: MealOrderCreate): Promise<MealOrder>;
  update(id: string, data: Partial<MealOrderCreate>): Promise<MealOrder>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<MealOrder[]>;
  cancel(id: string): Promise<MealOrder>;
  fulfill(id: string): Promise<MealOrder>;
  findPendingOrders(): Promise<MealOrder[]>;
  getDailyOrdersCount(date: string): Promise<number>;
  findByClassId(classId: string, date: string): Promise<MealOrder[]>;
}

export interface ScMealConsumptionRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MealConsumption | null>;
  findAll(filters?: Record<string, unknown>): Promise<MealConsumption[]>;
  findByStudentId(studentId: string): Promise<MealConsumption[]>;
  findByMealId(mealId: string): Promise<MealConsumption[]>;
  findByDate(date: string): Promise<MealConsumption[]>;
  create(data: MealConsumptionCreate): Promise<MealConsumption>;
  createMany(data: MealConsumptionCreate[]): Promise<MealConsumption[]>;
  update(id: string, data: Partial<MealConsumptionCreate>): Promise<MealConsumption>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<MealConsumption[]>;
  getConsumptionStats(startDate: string, endDate: string): Promise<Record<string, number>>;
  findMostConsumed(limit: number): Promise<{ mealId: string; count: number }[]>;
  findByWasteLevel(level: string): Promise<MealConsumption[]>;
  getWasteStats(startDate: string, endDate: string): Promise<Record<string, number>>;
}

export interface ScMealSubscriptionRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MealSubscription | null>;
  findAll(filters?: Record<string, unknown>): Promise<MealSubscription[]>;
  findByStudentId(studentId: string): Promise<MealSubscription | null>;
  findByStatus(status: string): Promise<MealSubscription[]>;
  findByPlanType(planType: string): Promise<MealSubscription[]>;
  create(data: MealSubscriptionCreate): Promise<MealSubscription>;
  update(id: string, data: Partial<MealSubscriptionCreate>): Promise<MealSubscription>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<MealSubscription[]>;
  activate(id: string): Promise<MealSubscription>;
  pause(id: string): Promise<MealSubscription>;
  cancel(id: string): Promise<MealSubscription>;
  renew(id: string, newEndDate: string): Promise<MealSubscription>;
  findExpiringSoon(daysUntilExpiry: number): Promise<MealSubscription[]>;
  findActive(): Promise<MealSubscription[]>;
}

export interface ScMealPaymentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MealPayment | null>;
  findAll(filters?: Record<string, unknown>): Promise<MealPayment[]>;
  findByStudentId(studentId: string): Promise<MealPayment[]>;
  findByStatus(status: string): Promise<MealPayment[]>;
  findByMethod(method: string): Promise<MealPayment[]>;
  create(data: MealPaymentCreate): Promise<MealPayment>;
  update(id: string, data: Partial<MealPaymentCreate>): Promise<MealPayment>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<MealPayment[]>;
  markPaid(id: string, paymentDate: string): Promise<MealPayment>;
  getRevenue(startDate: string, endDate: string): Promise<number>;
  findPending(): Promise<MealPayment[]>;
  findRefunded(): Promise<MealPayment[]>;
  getTotalOutstanding(): Promise<number>;
  findBySubscriptionId(subscriptionId: string): Promise<MealPayment[]>;
}

export interface ScKitchenStaffRepository {
  client: SupabaseClient;
  findById(id: string): Promise<KitchenStaff | null>;
  findAll(filters?: Record<string, unknown>): Promise<KitchenStaff[]>;
  findByName(name: string): Promise<KitchenStaff[]>;
  findByRole(role: string): Promise<KitchenStaff[]>;
  findByStatus(status: string): Promise<KitchenStaff[]>;
  create(data: KitchenStaffCreate): Promise<KitchenStaff>;
  update(id: string, data: Partial<KitchenStaffCreate>): Promise<KitchenStaff>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActive(): Promise<KitchenStaff[]>;
  findOnDuty(date: string): Promise<KitchenStaff[]>;
  findByCertification(certification: string): Promise<KitchenStaff[]>;
  findAvailable(date: string): Promise<KitchenStaff[]>;
  getSchedule(staffId: string, startDate: string, endDate: string): Promise<Record<string, string[]>>;
}

export interface ScCantineReportRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Record<string, unknown> | null>;
  findAll(filters?: Record<string, unknown>): Promise<Record<string, unknown>[]>;
  findByDateRange(start: string, end: string): Promise<Record<string, unknown>[]>;
  findByType(type: string): Promise<Record<string, unknown>[]>;
  generateDailyReport(date: string): Promise<Record<string, unknown>>;
  generateWeeklyReport(weekNumber: number, year: number): Promise<Record<string, unknown>>;
  generateMonthlyReport(month: number, year: number): Promise<Record<string, unknown>>;
  getConsumptionReport(startDate: string, endDate: string): Promise<Record<string, unknown>>;
  getWasteReport(startDate: string, endDate: string): Promise<Record<string, unknown>>;
  getNutritionReport(startDate: string, endDate: string): Promise<Record<string, unknown>>;
  getFinancialReport(startDate: string, endDate: string): Promise<Record<string, unknown>>;
  getOrderStats(startDate: string, endDate: string): Promise<Record<string, number>>;
  getPopularityStats(): Promise<Record<string, number>>;
  delete(id: string): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
}

// ─── Medical ────────────────────────────────────────────────────────────────

export interface ScMedicalRecordRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MedicalRecord | null>;
  findAll(filters?: Record<string, unknown>): Promise<MedicalRecord[]>;
  findByStudentId(studentId: string): Promise<MedicalRecord | null>;
  findByBloodType(bloodType: string): Promise<MedicalRecord[]>;
  findByInsuranceProvider(provider: string): Promise<MedicalRecord[]>;
  create(data: MedicalRecordCreate): Promise<MedicalRecord>;
  update(id: string, data: MedicalRecordUpdate): Promise<MedicalRecord>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findWithAllergies(): Promise<MedicalRecord[]>;
  findByChronicCondition(condition: string): Promise<MedicalRecord[]>;
  findEmergencyCases(): Promise<MedicalRecord[]>;
  updateEmergencyInfo(id: string, data: Partial<MedicalRecordUpdate>): Promise<MedicalRecord>;
  findByGender(gender: string): Promise<MedicalRecord[]>;
  findIncomplete(): Promise<MedicalRecord[]>;
}

export interface ScMedicalVisitRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MedicalVisit | null>;
  findAll(filters?: Record<string, unknown>): Promise<MedicalVisit[]>;
  findByStudentId(studentId: string): Promise<MedicalVisit[]>;
  findByDate(date: string): Promise<MedicalVisit[]>;
  findByDoctor(doctorName: string): Promise<MedicalVisit[]>;
  findByType(type: string): Promise<MedicalVisit[]>;
  create(data: MedicalVisitCreate): Promise<MedicalVisit>;
  update(id: string, data: Partial<MedicalVisitCreate>): Promise<MedicalVisit>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<MedicalVisit[]>;
  findFollowUpRequired(): Promise<MedicalVisit[]>;
  findByDiagnosis(diagnosis: string): Promise<MedicalVisit[]>;
  getVisitStats(startDate: string, endDate: string): Promise<Record<string, number>>;
  findRecentVisits(limit: number): Promise<MedicalVisit[]>;
}

export interface ScTreatmentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Treatment | null>;
  findAll(filters?: Record<string, unknown>): Promise<Treatment[]>;
  findByVisitId(visitId: string): Promise<Treatment[]>;
  findByStudentId(studentId: string): Promise<Treatment[]>;
  findByType(type: string): Promise<Treatment[]>;
  create(data: TreatmentCreate): Promise<Treatment>;
  createMany(data: TreatmentCreate[]): Promise<Treatment[]>;
  update(id: string, data: Partial<TreatmentCreate>): Promise<Treatment>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActive(): Promise<Treatment[]>;
  findByDateRange(start: string, end: string): Promise<Treatment[]>;
  findCompleted(): Promise<Treatment[]>;
  findByMedication(medicationName: string): Promise<Treatment[]>;
  getTreatmentHistory(studentId: string): Promise<Treatment[]>;
}

export interface ScVaccinationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Vaccination | null>;
  findAll(filters?: Record<string, unknown>): Promise<Vaccination[]>;
  findByStudentId(studentId: string): Promise<Vaccination[]>;
  findByVaccineName(vaccineName: string): Promise<Vaccination[]>;
  findByStatus(status: string): Promise<Vaccination[]>;
  create(data: VaccinationCreate): Promise<Vaccination>;
  createMany(data: VaccinationCreate[]): Promise<Vaccination[]>;
  update(id: string, data: Partial<VaccinationCreate>): Promise<Vaccination>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findDueForBooster(boosterDate: string): Promise<Vaccination[]>;
  findOverdue(): Promise<Vaccination[]>;
  findByDateRange(start: string, end: string): Promise<Vaccination[]>;
  getVaccinationRate(vaccineName: string): Promise<number>;
  findExpiringSoon(daysUntilExpiry: number): Promise<Vaccination[]>;
  findByBatch(batchNumber: string): Promise<Vaccination[]>;
}

export interface ScMedicalAllergyRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MedicalAllergy2 | null>;
  findAll(filters?: Record<string, unknown>): Promise<MedicalAllergy2[]>;
  findByStudentId(studentId: string): Promise<MedicalAllergy2[]>;
  findByAllergen(allergen: string): Promise<MedicalAllergy2[]>;
  findBySeverity(severity: string): Promise<MedicalAllergy2[]>;
  create(data: MedicalAllergyCreate): Promise<MedicalAllergy2>;
  createMany(data: MedicalAllergyCreate[]): Promise<MedicalAllergy2[]>;
  update(id: string, data: Partial<MedicalAllergyCreate>): Promise<MedicalAllergy2>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findLifeThreatening(): Promise<MedicalAllergy2[]>;
  findByAllergenType(allergenType: string): Promise<MedicalAllergy2[]>;
  getStudentsWithAllergy(allergen: string): Promise<string[]>;
  findByReactionType(reactionType: string): Promise<MedicalAllergy2[]>;
  findRecentOnset(startDate: string): Promise<MedicalAllergy2[]>;
}

export interface ScMedicalHistoryRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MedicalHistory | null>;
  findAll(filters?: Record<string, unknown>): Promise<MedicalHistory[]>;
  findByStudentId(studentId: string): Promise<MedicalHistory[]>;
  findByCondition(condition: string): Promise<MedicalHistory[]>;
  findByCategory(category: string): Promise<MedicalHistory[]>;
  create(data: MedicalHistoryCreate): Promise<MedicalHistory>;
  update(id: string, data: Partial<MedicalHistoryCreate>): Promise<MedicalHistory>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActive(): Promise<MedicalHistory[]>;
  findResolved(): Promise<MedicalHistory[]>;
  findByDateRange(start: string, end: string): Promise<MedicalHistory[]>;
  findBySeverity(severity: string): Promise<MedicalHistory[]>;
  getConditionStats(): Promise<Record<string, number>>;
  findChronic(): Promise<MedicalHistory[]>;
}

export interface ScMedicationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Medication | null>;
  findAll(filters?: Record<string, unknown>): Promise<Medication[]>;
  findByStudentId(studentId: string): Promise<Medication[]>;
  findByName(name: string): Promise<Medication[]>;
  findByCategory(category: string): Promise<Medication[]>;
  create(data: MedicationCreate): Promise<Medication>;
  createMany(data: MedicationCreate[]): Promise<Medication[]>;
  update(id: string, data: Partial<MedicationCreate>): Promise<Medication>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActive(): Promise<Medication[]>;
  findExpired(): Promise<Medication[]>;
  findExpiringSoon(daysUntilExpiry: number): Promise<Medication[]>;
  findByDosage(dosage: string): Promise<Medication[]>;
  findControlledSubstances(): Promise<Medication[]>;
  findBySchedule(schedule: string): Promise<Medication[]>;
}

export interface ScEmergencyContactRepository {
  client: SupabaseClient;
  findById(id: string): Promise<EmergencyContact | null>;
  findAll(filters?: Record<string, unknown>): Promise<EmergencyContact[]>;
  findByStudentId(studentId: string): Promise<EmergencyContact[]>;
  findByName(name: string): Promise<EmergencyContact[]>;
  findByRelationship(relationship: string): Promise<EmergencyContact[]>;
  create(data: EmergencyContactCreate): Promise<EmergencyContact>;
  update(id: string, data: Partial<EmergencyContactCreate>): Promise<EmergencyContact>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findPrimary(studentId: string): Promise<EmergencyContact | null>;
  findByPhone(phone: string): Promise<EmergencyContact[]>;
  findActive(): Promise<EmergencyContact[]>;
  updatePriority(id: string, priority: number): Promise<EmergencyContact>;
  findForMultipleStudents(studentIds: string[]): Promise<EmergencyContact[]>;
}

export interface ScAccidentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Accident | null>;
  findAll(filters?: Record<string, unknown>): Promise<Accident[]>;
  findByStudentId(studentId: string): Promise<Accident[]>;
  findByLocation(location: string): Promise<Accident[]>;
  findBySeverity(severity: string): Promise<Accident[]>;
  findByType(type: string): Promise<Accident[]>;
  create(data: AccidentCreate): Promise<Accident>;
  update(id: string, data: Partial<AccidentCreate>): Promise<Accident>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<Accident[]>;
  findOpen(): Promise<Accident[]>;
  findResolved(): Promise<Accident[]>;
  getAccidentStats(startDate: string, endDate: string): Promise<Record<string, number>>;
  findRecent(limit: number): Promise<Accident[]>;
}

export interface ScHealthReportRepository {
  client: SupabaseClient;
  findById(id: string): Promise<HealthReport | null>;
  findAll(filters?: Record<string, unknown>): Promise<HealthReport[]>;
  findByStudentId(studentId: string): Promise<HealthReport[]>;
  findByType(type: string): Promise<HealthReport[]>;
  findByDateRange(start: string, end: string): Promise<HealthReport[]>;
  create(data: HealthReportCreate): Promise<HealthReport>;
  update(id: string, data: Partial<HealthReportCreate>): Promise<HealthReport>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByStatus(status: string): Promise<HealthReport[]>;
  generateAnnualReport(studentId: string, year: number): Promise<HealthReport>;
  findBySchoolId(schoolId: string, date: string): Promise<HealthReport[]>;
  findPendingReview(): Promise<HealthReport[]>;
  approve(id: string, approvedBy: string): Promise<HealthReport>;
  findRecent(limit: number): Promise<HealthReport[]>;
}

// ─── Boarding ───────────────────────────────────────────────────────────────

export interface ScBuildingRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Building | null>;
  findAll(filters?: Record<string, unknown>): Promise<Building[]>;
  findByName(name: string): Promise<Building | null>;
  findByType(type: string): Promise<Building[]>;
  findBySchoolId(schoolId: string): Promise<Building[]>;
  create(data: BuildingCreate): Promise<Building>;
  update(id: string, data: BuildingUpdate): Promise<Building>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByStatus(status: string): Promise<Building[]>;
  findWithAvailableRooms(): Promise<Building[]>;
  getOccupancyRate(buildingId: string): Promise<number>;
  getRoomCount(buildingId: string): Promise<number>;
  findRecent(limit: number): Promise<Building[]>;
}

export interface ScRoomRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Room | null>;
  findAll(filters?: Record<string, unknown>): Promise<Room[]>;
  findByBuildingId(buildingId: string): Promise<Room[]>;
  findByNumber(roomNumber: string): Promise<Room | null>;
  findByType(type: string): Promise<Room[]>;
  findByStatus(status: string): Promise<Room[]>;
  create(data: RoomCreate): Promise<Room>;
  createMany(data: RoomCreate[]): Promise<Room[]>;
  update(id: string, data: RoomUpdate): Promise<Room>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailable(): Promise<Room[]>;
  findByFloor(floor: number): Promise<Room[]>;
  findByCapacityRange(min: number, max: number): Promise<Room[]>;
  findWithOccupancy(buildingId: string): Promise<(Room & { occupancy: Occupancy })[]>;
  getAvailableBeds(roomId: string): Promise<Bed[]>;
}

export interface ScBedRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Bed | null>;
  findAll(filters?: Record<string, unknown>): Promise<Bed[]>;
  findByRoomId(roomId: string): Promise<Bed[]>;
  findByStatus(status: string): Promise<Bed[]>;
  findByNumber(bedNumber: string): Promise<Bed | null>;
  create(data: BedCreate): Promise<Bed>;
  createMany(data: BedCreate[]): Promise<Bed[]>;
  update(id: string, data: BedUpdate): Promise<Bed>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailable(): Promise<Bed[]>;
  findByBuildingId(buildingId: string): Promise<Bed[]>;
  assignStudent(bedId: string, studentId: string): Promise<Bed>;
  unassignStudent(bedId: string): Promise<Bed>;
  findAssigned(): Promise<Bed[]>;
  getBedOccupancy(roomId: string): Promise<{ total: number; assigned: number; available: number }>;
}

export interface ScOccupancyRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Occupancy | null>;
  findAll(filters?: Record<string, unknown>): Promise<Occupancy[]>;
  findByRoomId(roomId: string): Promise<Occupancy | null>;
  findByBuildingId(buildingId: string): Promise<Occupancy[]>;
  findByDate(date: string): Promise<Occupancy[]>;
  create(data: OccupancyCreate): Promise<Occupancy>;
  update(id: string, data: Partial<OccupancyCreate>): Promise<Occupancy>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailableRooms(buildingId: string): Promise<Occupancy[]>;
  findByDateRange(start: string, end: string): Promise<Occupancy[]>;
  getOccupancyRate(buildingId: string, date: string): Promise<number>;
  getDailyOccupancyHistory(buildingId: string, start: string, end: string): Promise<Occupancy[]>;
  findFullRooms(): Promise<Occupancy[]>;
  findEmptyRooms(): Promise<Occupancy[]>;
}

export interface ScRoomAssignmentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<RoomAssignment | null>;
  findAll(filters?: Record<string, unknown>): Promise<RoomAssignment[]>;
  findByStudentId(studentId: string): Promise<RoomAssignment | null>;
  findByRoomId(roomId: string): Promise<RoomAssignment[]>;
  findByBedId(bedId: string): Promise<RoomAssignment | null>;
  findByStatus(status: string): Promise<RoomAssignment[]>;
  create(data: RoomAssignmentCreate): Promise<RoomAssignment>;
  update(id: string, data: Partial<RoomAssignmentCreate>): Promise<RoomAssignment>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<RoomAssignment[]>;
  assignStudent(studentId: string, roomId: string, bedId: string): Promise<RoomAssignment>;
  unassignStudent(studentId: string): Promise<RoomAssignment>;
  transferStudent(studentId: string, newRoomId: string, newBedId: string): Promise<RoomAssignment>;
  findActive(): Promise<RoomAssignment[]>;
  findByBuildingId(buildingId: string): Promise<RoomAssignment[]>;
}

export interface ScBoardingAttendanceRepository {
  client: SupabaseClient;
  findById(id: string): Promise<BoardingAttendance | null>;
  findAll(filters?: Record<string, unknown>): Promise<BoardingAttendance[]>;
  findByStudentId(studentId: string): Promise<BoardingAttendance[]>;
  findByDate(date: string): Promise<BoardingAttendance[]>;
  findByRoomId(roomId: string, date: string): Promise<BoardingAttendance[]>;
  create(data: BoardingAttendanceCreate): Promise<BoardingAttendance>;
  createMany(data: BoardingAttendanceCreate[]): Promise<BoardingAttendance[]>;
  update(id: string, data: Partial<BoardingAttendanceCreate>): Promise<BoardingAttendance>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<BoardingAttendance[]>;
  findAbsent(buildingId: string, date: string): Promise<string[]>;
  findPresent(buildingId: string, date: string): Promise<string[]>;
  getAttendanceRate(studentId: string, start: string, end: string): Promise<number>;
  findLateCheckIns(date: string): Promise<BoardingAttendance[]>;
  findUnauthorizedAbsences(date: string): Promise<BoardingAttendance[]>;
}

export interface ScNightReportRepository {
  client: SupabaseClient;
  findById(id: string): Promise<NightReport | null>;
  findAll(filters?: Record<string, unknown>): Promise<NightReport[]>;
  findByDate(date: string): Promise<NightReport | null>;
  findByBuildingId(buildingId: string): Promise<NightReport[]>;
  findBySupervisorId(supervisorId: string): Promise<NightReport[]>;
  create(data: NightReportCreate): Promise<NightReport>;
  update(id: string, data: Partial<NightReportCreate>): Promise<NightReport>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<NightReport[]>;
  findIncidents(): Promise<NightReport[]>;
  findPendingReview(): Promise<NightReport[]>;
  approve(id: string, approvedBy: string): Promise<NightReport>;
  findByStatus(status: string): Promise<NightReport[]>;
  getRecentReports(limit: number): Promise<NightReport[]>;
}

export interface ScDisciplineRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Discipline | null>;
  findAll(filters?: Record<string, unknown>): Promise<Discipline[]>;
  findByStudentId(studentId: string): Promise<Discipline[]>;
  findByType(type: string): Promise<Discipline[]>;
  findBySeverity(severity: string): Promise<Discipline[]>;
  findByDate(date: string): Promise<Discipline[]>;
  create(data: DisciplineCreate): Promise<Discipline>;
  update(id: string, data: Partial<DisciplineCreate>): Promise<Discipline>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<Discipline[]>;
  findOpen(): Promise<Discipline[]>;
  resolve(id: string, resolution: string): Promise<Discipline>;
  findByBuildingId(buildingId: string): Promise<Discipline[]>;
  getDisciplineStats(startDate: string, endDate: string): Promise<Record<string, number>>;
  findRepeatOffenders(): Promise<{ studentId: string; count: number }[]>;
}

// ─── Visitors ───────────────────────────────────────────────────────────────

export interface ScVisitorRegistrationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<VisitorRegistration | null>;
  findAll(filters?: Record<string, unknown>): Promise<VisitorRegistration[]>;
  findByVisitorId(visitorId: string): Promise<VisitorRegistration[]>;
  findByDate(date: string): Promise<VisitorRegistration[]>;
  findByPurpose(purpose: string): Promise<VisitorRegistration[]>;
  create(data: VisitorRegistrationCreate): Promise<VisitorRegistration>;
  update(id: string, data: Partial<VisitorRegistrationCreate>): Promise<VisitorRegistration>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<VisitorRegistration[]>;
  findByStatus(status: string): Promise<VisitorRegistration[]>;
  checkIn(id: string): Promise<VisitorRegistration>;
  checkOut(id: string): Promise<VisitorRegistration>;
  findCheckedIn(): Promise<VisitorRegistration[]>;
  findByHostId(hostId: string): Promise<VisitorRegistration[]>;
  findRecent(limit: number): Promise<VisitorRegistration[]>;
}

export interface ScVisitorBadgeRepository {
  client: SupabaseClient;
  findById(id: string): Promise<VisitorBadge | null>;
  findAll(filters?: Record<string, unknown>): Promise<VisitorBadge[]>;
  findByBadgeNumber(badgeNumber: string): Promise<VisitorBadge | null>;
  findByStatus(status: string): Promise<VisitorBadge[]>;
  findByVisitorId(visitorId: string): Promise<VisitorBadge[]>;
  create(data: VisitorBadgeCreate): Promise<VisitorBadge>;
  update(id: string, data: Partial<VisitorBadgeCreate>): Promise<VisitorBadge>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  activate(id: string): Promise<VisitorBadge>;
  deactivate(id: string): Promise<VisitorBadge>;
  findActive(): Promise<VisitorBadge[]>;
  findExpired(): Promise<VisitorBadge[]>;
  findLost(): Promise<VisitorBadge[]>;
  reportLost(id: string): Promise<VisitorBadge>;
}

export interface ScVisitorQRRepository {
  client: SupabaseClient;
  findById(id: string): Promise<VisitorQR | null>;
  findAll(filters?: Record<string, unknown>): Promise<VisitorQR[]>;
  findByCode(code: string): Promise<VisitorQR | null>;
  findByVisitorId(visitorId: string): Promise<VisitorQR | null>;
  create(data: VisitorQRCreate): Promise<VisitorQR>;
  update(id: string, data: Partial<VisitorQRCreate>): Promise<VisitorQR>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  verifyCode(code: string): Promise<boolean>;
  findActive(): Promise<VisitorQR[]>;
  findExpired(): Promise<VisitorQR[]>;
  invalidate(id: string): Promise<VisitorQR>;
  findByRegistrationId(registrationId: string): Promise<VisitorQR | null>;
  findRecent(limit: number): Promise<VisitorQR[]>;
  bulkGenerate(visitorIds: string[]): Promise<VisitorQR[]>;
}

export interface ScVisitorInvitationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<VisitorInvitation | null>;
  findAll(filters?: Record<string, unknown>): Promise<VisitorInvitation[]>;
  findByHostId(hostId: string): Promise<VisitorInvitation[]>;
  findByStatus(status: string): Promise<VisitorInvitation[]>;
  findByDateRange(start: string, end: string): Promise<VisitorInvitation[]>;
  create(data: VisitorInvitationCreate): Promise<VisitorInvitation>;
  update(id: string, data: Partial<VisitorInvitationCreate>): Promise<VisitorInvitation>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  accept(id: string): Promise<VisitorInvitation>;
  decline(id: string): Promise<VisitorInvitation>;
  findPending(): Promise<VisitorInvitation[]>;
  findExpired(): Promise<VisitorInvitation[]>;
  findByVisitorEmail(email: string): Promise<VisitorInvitation[]>;
  sendReminder(id: string): Promise<VisitorInvitation>;
}

export interface ScVisitorApprovalRepository {
  client: SupabaseClient;
  findById(id: string): Promise<VisitorApproval | null>;
  findAll(filters?: Record<string, unknown>): Promise<VisitorApproval[]>;
  findByVisitorId(visitorId: string): Promise<VisitorApproval | null>;
  findByStatus(status: string): Promise<VisitorApproval[]>;
  findByApproverId(approverId: string): Promise<VisitorApproval[]>;
  create(data: VisitorApprovalCreate): Promise<VisitorApproval>;
  update(id: string, data: Partial<VisitorApprovalCreate>): Promise<VisitorApproval>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  approve(id: string, approverId: string, notes: string): Promise<VisitorApproval>;
  reject(id: string, approverId: string, reason: string): Promise<VisitorApproval>;
  findPending(): Promise<VisitorApproval[]>;
  findByRegistrationId(registrationId: string): Promise<VisitorApproval | null>;
  getApprovalHistory(visitorId: string): Promise<VisitorApproval[]>;
  findByDateRange(start: string, end: string): Promise<VisitorApproval[]>;
}

export interface ScIdentityVerificationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<IdentityVerification | null>;
  findAll(filters?: Record<string, unknown>): Promise<IdentityVerification[]>;
  findByVisitorId(visitorId: string): Promise<IdentityVerification | null>;
  findByDocumentType(documentType: string): Promise<IdentityVerification[]>;
  findByStatus(status: string): Promise<IdentityVerification[]>;
  create(data: IdentityVerificationCreate): Promise<IdentityVerification>;
  update(id: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  verify(id: string, verifiedBy: string): Promise<IdentityVerification>;
  reject(id: string, reason: string): Promise<IdentityVerification>;
  findPending(): Promise<IdentityVerification[]>;
  findByDocumentNumber(documentNumber: string): Promise<IdentityVerification | null>;
  findExpired(): Promise<IdentityVerification[]>;
  findByDateRange(start: string, end: string): Promise<IdentityVerification[]>;
}

export interface ScVisitorBlacklistRepository {
  client: SupabaseClient;
  findById(id: string): Promise<VisitorBlacklist | null>;
  findAll(filters?: Record<string, unknown>): Promise<VisitorBlacklist[]>;
  findByVisitorId(visitorId: string): Promise<VisitorBlacklist | null>;
  findByReason(reason: string): Promise<VisitorBlacklist[]>;
  findByStatus(status: string): Promise<VisitorBlacklist[]>;
  create(data: VisitorBlacklistCreate): Promise<VisitorBlacklist>;
  update(id: string, data: Partial<VisitorBlacklistCreate>): Promise<VisitorBlacklist>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  isBlacklisted(visitorId: string): Promise<boolean>;
  add(visitorId: string, reason: string, addedBy: string): Promise<VisitorBlacklist>;
  remove(visitorId: string, removedBy: string): Promise<void>;
  findActive(): Promise<VisitorBlacklist[]>;
  findByDateRange(start: string, end: string): Promise<VisitorBlacklist[]>;
  findExpiring(durationDays: number): Promise<VisitorBlacklist[]>;
}

// ─── Assets ─────────────────────────────────────────────────────────────────

export interface ScAssetRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Asset | null>;
  findAll(filters?: Record<string, unknown>): Promise<Asset[]>;
  findByTag(tag: string): Promise<Asset | null>;
  findByCategory(category: string): Promise<Asset[]>;
  findByStatus(status: string): Promise<Asset[]>;
  findByLocation(location: string): Promise<Asset[]>;
  create(data: AssetCreate): Promise<Asset>;
  update(id: string, data: AssetUpdate): Promise<Asset>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDepartment(department: string): Promise<Asset[]>;
  findAvailable(): Promise<Asset[]>;
  findUnderMaintenance(): Promise<Asset[]>;
  findByAcquisitionDateRange(start: string, end: string): Promise<Asset[]>;
  findByValueRange(min: number, max: number): Promise<Asset[]>;
  getDepreciatingAssets(): Promise<Asset[]>;
}

export interface ScEquipmentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Equipment | null>;
  findAll(filters?: Record<string, unknown>): Promise<Equipment[]>;
  findByAssetId(assetId: string): Promise<Equipment | null>;
  findByType(type: string): Promise<Equipment[]>;
  findByStatus(status: string): Promise<Equipment[]>;
  findByManufacturer(manufacturer: string): Promise<Equipment[]>;
  create(data: EquipmentCreate): Promise<Equipment>;
  update(id: string, data: Partial<EquipmentCreate>): Promise<Equipment>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findBySerialNumber(serialNumber: string): Promise<Equipment | null>;
  findExpiredWarranty(): Promise<Equipment[]>;
  findByLocation(location: string): Promise<Equipment[]>;
  findOperational(): Promise<Equipment[]>;
  findNeedingService(): Promise<Equipment[]>;
  getMaintenanceSchedule(equipmentId: string): Promise<Record<string, unknown>[]>;
}

export interface ScFurnitureRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Furniture | null>;
  findAll(filters?: Record<string, unknown>): Promise<Furniture[]>;
  findByAssetId(assetId: string): Promise<Furniture | null>;
  findByType(type: string): Promise<Furniture[]>;
  findByMaterial(material: string): Promise<Furniture[]>;
  findByStatus(status: string): Promise<Furniture[]>;
  create(data: FurnitureCreate): Promise<Furniture>;
  update(id: string, data: Partial<FurnitureCreate>): Promise<Furniture>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByRoom(roomId: string): Promise<Furniture[]>;
  findByColor(color: string): Promise<Furniture[]>;
  findByCondition(condition: string): Promise<Furniture[]>;
  findDamaged(): Promise<Furniture[]>;
  findByBuildingId(buildingId: string): Promise<Furniture[]>;
}

export interface ScITAssetRepository {
  client: SupabaseClient;
  findById(id: string): Promise<ITAsset | null>;
  findAll(filters?: Record<string, unknown>): Promise<ITAsset[]>;
  findByAssetId(assetId: string): Promise<ITAsset | null>;
  findByType(type: string): Promise<ITAsset[]>;
  findByStatus(status: string): Promise<ITAsset[]>;
  findByOS(os: string): Promise<ITAsset[]>;
  create(data: ITAssetCreate): Promise<ITAsset>;
  update(id: string, data: Partial<ITAssetCreate>): Promise<ITAsset>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByIP(ipAddress: string): Promise<ITAsset | null>;
  findByMAC(macAddress: string): Promise<ITAsset | null>;
  findOutOfWarranty(): Promise<ITAsset[]>;
  findByAssignedTo(userId: string): Promise<ITAsset[]>;
  findUnassigned(): Promise<ITAsset[]>;
  findBySoftwareInstalled(softwareName: string): Promise<ITAsset[]>;
}

export interface ScAssetWarrantyRepository {
  client: SupabaseClient;
  findById(id: string): Promise<AssetWarranty | null>;
  findAll(filters?: Record<string, unknown>): Promise<AssetWarranty[]>;
  findByAssetId(assetId: string): Promise<AssetWarranty | null>;
  findByProvider(provider: string): Promise<AssetWarranty[]>;
  findByStatus(status: string): Promise<AssetWarranty[]>;
  create(data: AssetWarrantyCreate): Promise<AssetWarranty>;
  update(id: string, data: Partial<AssetWarrantyCreate>): Promise<AssetWarranty>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findExpiringSoon(daysUntilExpiry: number): Promise<AssetWarranty[]>;
  findExpired(): Promise<AssetWarranty[]>;
  findByDateRange(start: string, end: string): Promise<AssetWarranty[]>;
  renew(id: string, newExpiryDate: string): Promise<AssetWarranty>;
  findByPolicyNumber(policyNumber: string): Promise<AssetWarranty | null>;
  findActive(): Promise<AssetWarranty[]>;
}

export interface ScAssetDepreciationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<AssetDepreciation | null>;
  findAll(filters?: Record<string, unknown>): Promise<AssetDepreciation[]>;
  findByAssetId(assetId: string): Promise<AssetDepreciation | null>;
  findByMethod(method: string): Promise<AssetDepreciation[]>;
  findByStatus(status: string): Promise<AssetDepreciation[]>;
  create(data: AssetDepreciationCreate): Promise<AssetDepreciation>;
  update(id: string, data: Partial<AssetDepreciationCreate>): Promise<AssetDepreciation>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<AssetDepreciation[]>;
  calculateCurrentValue(assetId: string): Promise<number>;
  findByAssetIds(assetIds: string[]): Promise<AssetDepreciation[]>;
  findFullyDepreciated(): Promise<AssetDepreciation[]>;
  getTotalDepreciation(startDate: string, endDate: string): Promise<number>;
  getDepreciationReport(year: number): Promise<AssetDepreciation[]>;
}

export interface ScAssetTransferRepository {
  client: SupabaseClient;
  findById(id: string): Promise<AssetTransfer | null>;
  findAll(filters?: Record<string, unknown>): Promise<AssetTransfer[]>;
  findByAssetId(assetId: string): Promise<AssetTransfer[]>;
  findByFromLocation(fromLocation: string): Promise<AssetTransfer[]>;
  findByToLocation(toLocation: string): Promise<AssetTransfer[]>;
  findByStatus(status: string): Promise<AssetTransfer[]>;
  create(data: AssetTransferCreate): Promise<AssetTransfer>;
  update(id: string, data: Partial<AssetTransferCreate>): Promise<AssetTransfer>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<AssetTransfer[]>;
  approve(id: string, approvedBy: string): Promise<AssetTransfer>;
  complete(id: string): Promise<AssetTransfer>;
  cancel(id: string): Promise<AssetTransfer>;
  findByRequestedBy(userId: string): Promise<AssetTransfer[]>;
  findPending(): Promise<AssetTransfer[]>;
}

// ─── Maintenance ────────────────────────────────────────────────────────────

export interface ScMaintenanceTicketRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MaintenanceTicket | null>;
  findAll(filters?: Record<string, unknown>): Promise<MaintenanceTicket[]>;
  findByAssetId(assetId: string): Promise<MaintenanceTicket[]>;
  findByPriority(priority: string): Promise<MaintenanceTicket[]>;
  findByStatus(status: string): Promise<MaintenanceTicket[]>;
  findByType(type: string): Promise<MaintenanceTicket[]>;
  findByRequestedBy(userId: string): Promise<MaintenanceTicket[]>;
  create(data: MaintenanceTicketCreate): Promise<MaintenanceTicket>;
  update(id: string, data: MaintenanceTicketUpdate): Promise<MaintenanceTicket>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<MaintenanceTicket[]>;
  findOpen(): Promise<MaintenanceTicket[]>;
  assignTechnician(id: string, technicianId: string): Promise<MaintenanceTicket>;
  resolve(id: string, resolution: string): Promise<MaintenanceTicket>;
  findByLocation(location: string): Promise<MaintenanceTicket[]>;
  findOverdue(): Promise<MaintenanceTicket[]>;
}

export interface ScTechnicianRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Technician | null>;
  findAll(filters?: Record<string, unknown>): Promise<Technician[]>;
  findByName(name: string): Promise<Technician[]>;
  findBySpecialization(specialization: string): Promise<Technician[]>;
  findByStatus(status: string): Promise<Technician[]>;
  create(data: TechnicianCreate): Promise<Technician>;
  update(id: string, data: Partial<TechnicianCreate>): Promise<Technician>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findAvailable(): Promise<Technician[]>;
  findOnDuty(date: string): Promise<Technician[]>;
  findByCertification(certification: string): Promise<Technician[]>;
  getWorkload(technicianId: string): Promise<number>;
  getCompletedJobs(technicianId: string, start: string, end: string): Promise<number>;
  findActive(): Promise<Technician[]>;
  findByRating(minRating: number): Promise<Technician[]>;
}

export interface ScWorkOrderRepository {
  client: SupabaseClient;
  findById(id: string): Promise<WorkOrder | null>;
  findAll(filters?: Record<string, unknown>): Promise<WorkOrder[]>;
  findByTicketId(ticketId: string): Promise<WorkOrder | null>;
  findByTechnicianId(technicianId: string): Promise<WorkOrder[]>;
  findByStatus(status: string): Promise<WorkOrder[]>;
  findByType(type: string): Promise<WorkOrder[]>;
  create(data: WorkOrderCreate): Promise<WorkOrder>;
  update(id: string, data: Partial<WorkOrderCreate>): Promise<WorkOrder>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<WorkOrder[]>;
  start(id: string): Promise<WorkOrder>;
  complete(id: string, notes: string): Promise<WorkOrder>;
  cancel(id: string, reason: string): Promise<WorkOrder>;
  findOverdue(): Promise<WorkOrder[]>;
  findPending(): Promise<WorkOrder[]>;
  getCompletionRate(startDate: string, endDate: string): Promise<number>;
}

export interface ScMaintenanceContractRepository {
  client: SupabaseClient;
  findById(id: string): Promise<MaintenanceContract | null>;
  findAll(filters?: Record<string, unknown>): Promise<MaintenanceContract[]>;
  findByAssetId(assetId: string): Promise<MaintenanceContract | null>;
  findByProvider(provider: string): Promise<MaintenanceContract[]>;
  findByStatus(status: string): Promise<MaintenanceContract[]>;
  create(data: MaintenanceContractCreate): Promise<MaintenanceContract>;
  update(id: string, data: Partial<MaintenanceContractCreate>): Promise<MaintenanceContract>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<MaintenanceContract[]>;
  findExpiringSoon(daysUntilExpiry: number): Promise<MaintenanceContract[]>;
  findExpired(): Promise<MaintenanceContract[]>;
  renew(id: string, newExpiryDate: string): Promise<MaintenanceContract>;
  findActive(): Promise<MaintenanceContract[]>;
  getTotalCost(year: number): Promise<number>;
  findByContractNumber(contractNumber: string): Promise<MaintenanceContract | null>;
}

export interface ScSparePartRepository {
  client: SupabaseClient;
  findById(id: string): Promise<SparePart | null>;
  findAll(filters?: Record<string, unknown>): Promise<SparePart[]>;
  findByName(name: string): Promise<SparePart | null>;
  findByPartNumber(partNumber: string): Promise<SparePart | null>;
  findByCategory(category: string): Promise<SparePart[]>;
  create(data: SparePartCreate): Promise<SparePart>;
  update(id: string, data: Partial<SparePartCreate>): Promise<SparePart>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findLowStock(): Promise<SparePart[]>;
  findBySupplier(supplier: string): Promise<SparePart[]>;
  adjustQuantity(id: string, adjustment: number): Promise<SparePart>;
  findOutOfStock(): Promise<SparePart[]>;
  findByCompatibility(compatibleAssetType: string): Promise<SparePart[]>;
  getTotalValue(): Promise<number>;
}

// ─── IoT ────────────────────────────────────────────────────────────────────

export interface ScIoTDeviceRepository {
  client: SupabaseClient;
  findById(id: string): Promise<IoTDevice | null>;
  findAll(filters?: Record<string, unknown>): Promise<IoTDevice[]>;
  findBySerialNumber(serialNumber: string): Promise<IoTDevice | null>;
  findByType(type: string): Promise<IoTDevice[]>;
  findByStatus(status: string): Promise<IoTDevice[]>;
  findByLocation(location: string): Promise<IoTDevice[]>;
  create(data: IoTDeviceCreate): Promise<IoTDevice>;
  update(id: string, data: IoTDeviceUpdate): Promise<IoTDevice>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findBySchoolId(schoolId: string): Promise<IoTDevice[]>;
  findOffline(): Promise<IoTDevice[]>;
  findOnline(): Promise<IoTDevice[]>;
  updateStatus(id: string, status: string): Promise<IoTDevice>;
  findByFirmwareVersion(version: string): Promise<IoTDevice[]>;
  findNeedingUpdate(): Promise<IoTDevice[]>;
  findByBuildingId(buildingId: string): Promise<IoTDevice[]>;
}

export interface ScSensorRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Sensor | null>;
  findAll(filters?: Record<string, unknown>): Promise<Sensor[]>;
  findByDeviceId(deviceId: string): Promise<Sensor | null>;
  findByType(type: string): Promise<Sensor[]>;
  findByStatus(status: string): Promise<Sensor[]>;
  findByUnit(unit: string): Promise<Sensor[]>;
  create(data: SensorCreate): Promise<Sensor>;
  update(id: string, data: Partial<SensorCreate>): Promise<Sensor>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findOutOfRange(minValue: number, maxValue: number): Promise<Sensor[]>;
  findByLocation(location: string): Promise<Sensor[]>;
  findCalibrationDue(): Promise<Sensor[]>;
  findByThreshold(minThreshold: number, maxThreshold: number): Promise<Sensor[]>;
  findActive(): Promise<Sensor[]>;
  findByDeviceIds(deviceIds: string[]): Promise<Sensor[]>;
  findMalfunctioning(): Promise<Sensor[]>;
}

export interface ScEnergyMonitorRepository {
  client: SupabaseClient;
  findById(id: string): Promise<EnergyMonitor | null>;
  findAll(filters?: Record<string, unknown>): Promise<EnergyMonitor[]>;
  findByLocation(location: string): Promise<EnergyMonitor[]>;
  findByType(type: string): Promise<EnergyMonitor[]>;
  create(data: EnergyMonitorCreate): Promise<EnergyMonitor>;
  update(id: string, data: Partial<EnergyMonitorCreate>): Promise<EnergyMonitor>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByBuildingId(buildingId: string): Promise<EnergyMonitor[]>;
  findOverconsumption(threshold: number): Promise<EnergyMonitor[]>;
  getTotalConsumption(buildingId: string, start: string, end: string): Promise<number>;
  getPeakUsage(buildingId: string, start: string, end: string): Promise<number>;
  findActive(): Promise<EnergyMonitor[]>;
  findByMeterNumber(meterNumber: string): Promise<EnergyMonitor | null>;
  getConsumptionTrend(location: string, days: number): Promise<Record<string, number>[]>;
}

export interface ScWaterMonitorRepository {
  client: SupabaseClient;
  findById(id: string): Promise<WaterMonitor | null>;
  findAll(filters?: Record<string, unknown>): Promise<WaterMonitor[]>;
  findByLocation(location: string): Promise<WaterMonitor[]>;
  findByType(type: string): Promise<WaterMonitor[]>;
  create(data: WaterMonitorCreate): Promise<WaterMonitor>;
  update(id: string, data: Partial<WaterMonitorCreate>): Promise<WaterMonitor>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByBuildingId(buildingId: string): Promise<WaterMonitor[]>;
  findLeakage(): Promise<WaterMonitor[]>;
  getTotalUsage(buildingId: string, start: string, end: string): Promise<number>;
  findActive(): Promise<WaterMonitor[]>;
  findByMeterNumber(meterNumber: string): Promise<WaterMonitor | null>;
  getUsageTrend(location: string, days: number): Promise<Record<string, number>[]>;
  findHighUsage(thresholdLiters: number): Promise<WaterMonitor[]>;
}

export interface ScDoorAccessRepository {
  client: SupabaseClient;
  findById(id: string): Promise<DoorAccess | null>;
  findAll(filters?: Record<string, unknown>): Promise<DoorAccess[]>;
  findByDoorId(doorId: string): Promise<DoorAccess | null>;
  findByUserId(userId: string): Promise<DoorAccess[]>;
  findByStatus(status: string): Promise<DoorAccess[]>;
  create(data: DoorAccessCreate): Promise<DoorAccess>;
  update(id: string, data: Partial<DoorAccessCreate>): Promise<DoorAccess>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  grantAccess(userId: string, doorId: string): Promise<DoorAccess>;
  revokeAccess(userId: string, doorId: string): Promise<void>;
  findByTimeRange(start: string, end: string): Promise<DoorAccess[]>;
  findActive(): Promise<DoorAccess[]>;
  findDenied(): Promise<DoorAccess[]>;
  getAccessLog(doorId: string, date: string): Promise<DoorAccess[]>;
  findByLocation(location: string): Promise<DoorAccess[]>;
}

export interface ScSmartLockRepository {
  client: SupabaseClient;
  findById(id: string): Promise<SmartLock | null>;
  findAll(filters?: Record<string, unknown>): Promise<SmartLock[]>;
  findByLocation(location: string): Promise<SmartLock | null>;
  findByStatus(status: string): Promise<SmartLock[]>;
  findByType(type: string): Promise<SmartLock[]>;
  create(data: SmartLockCreate): Promise<SmartLock>;
  update(id: string, data: Partial<SmartLockCreate>): Promise<SmartLock>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  lock(id: string): Promise<SmartLock>;
  unlock(id: string): Promise<SmartLock>;
  findLocked(): Promise<SmartLock[]>;
  findUnlocked(): Promise<SmartLock[]>;
  findByBuildingId(buildingId: string): Promise<SmartLock[]>;
  getAccessHistory(lockId: string, start: string, end: string): Promise<DoorAccess[]>;
  emergencyUnlock(buildingId: string): Promise<SmartLock[]>;
}

export interface ScSmartCameraRepository {
  client: SupabaseClient;
  findById(id: string): Promise<SmartCamera | null>;
  findAll(filters?: Record<string, unknown>): Promise<SmartCamera[]>;
  findByLocation(location: string): Promise<SmartCamera | null>;
  findByStatus(status: string): Promise<SmartCamera[]>;
  findByType(type: string): Promise<SmartCamera[]>;
  create(data: SmartCameraCreate): Promise<SmartCamera>;
  update(id: string, data: Partial<SmartCameraCreate>): Promise<SmartCamera>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findOnline(): Promise<SmartCamera[]>;
  findOffline(): Promise<SmartCamera[]>;
  findByBuildingId(buildingId: string): Promise<SmartCamera[]>;
  findWithMotionDetection(): Promise<SmartCamera[]>;
  getRecordingStatus(cameraId: string): Promise<Record<string, unknown>>;
  findActive(): Promise<SmartCamera[]>;
  updateFirmware(id: string, version: string): Promise<SmartCamera>;
}

export interface ScAutomationRuleRepository {
  client: SupabaseClient;
  findById(id: string): Promise<AutomationRule | null>;
  findAll(filters?: Record<string, unknown>): Promise<AutomationRule[]>;
  findByName(name: string): Promise<AutomationRule | null>;
  findByStatus(status: string): Promise<AutomationRule[]>;
  findByTriggerType(triggerType: string): Promise<AutomationRule[]>;
  create(data: AutomationRuleCreate): Promise<AutomationRule>;
  update(id: string, data: Partial<AutomationRuleCreate>): Promise<AutomationRule>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  enable(id: string): Promise<AutomationRule>;
  disable(id: string): Promise<AutomationRule>;
  findActive(): Promise<AutomationRule[]>;
  findByDeviceId(deviceId: string): Promise<AutomationRule[]>;
  findBySchedule(scheduleType: string): Promise<AutomationRule[]>;
  getExecutionHistory(ruleId: string, limit: number): Promise<Record<string, unknown>[]>;
  findFailed(): Promise<AutomationRule[]>;
}

// ─── Rooms + Security ───────────────────────────────────────────────────────

export interface ScSmartRoomRepository {
  client: SupabaseClient;
  findById(id: string): Promise<SmartRoom | null>;
  findAll(filters?: Record<string, unknown>): Promise<SmartRoom[]>;
  findByRoomId(roomId: string): Promise<SmartRoom | null>;
  findByStatus(status: string): Promise<SmartRoom[]>;
  findByBuildingId(buildingId: string): Promise<SmartRoom[]>;
  create(data: SmartRoomCreate): Promise<SmartRoom>;
  update(id: string, data: SmartRoomUpdate): Promise<SmartRoom>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findOccupied(): Promise<SmartRoom[]>;
  findAvailable(): Promise<SmartRoom[]>;
  getDeviceCount(roomId: string): Promise<number>;
  findByDeviceType(deviceType: string): Promise<SmartRoom[]>;
  activateDevices(roomId: string): Promise<SmartRoom>;
  deactivateDevices(roomId: string): Promise<SmartRoom>;
  getEnvironmentalData(roomId: string): Promise<Record<string, number>>;
}

export interface ScRoomReservationRepository {
  client: SupabaseClient;
  findById(id: string): Promise<RoomReservation | null>;
  findAll(filters?: Record<string, unknown>): Promise<RoomReservation[]>;
  findByRoomId(roomId: string): Promise<RoomReservation[]>;
  findByUserId(userId: string): Promise<RoomReservation[]>;
  findByDate(date: string): Promise<RoomReservation[]>;
  findByStatus(status: string): Promise<RoomReservation[]>;
  create(data: RoomReservationCreate): Promise<RoomReservation>;
  update(id: string, data: Partial<RoomReservationCreate>): Promise<RoomReservation>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<RoomReservation[]>;
  cancel(id: string): Promise<RoomReservation>;
  approve(id: string, approvedBy: string): Promise<RoomReservation>;
  findPending(): Promise<RoomReservation[]>;
  findConflicts(roomId: string, start: string, end: string): Promise<RoomReservation[]>;
  findByRoomType(roomType: string, date: string): Promise<RoomReservation[]>;
}

export interface ScRoomSchedulingRepository {
  client: SupabaseClient;
  findById(id: string): Promise<RoomScheduling | null>;
  findAll(filters?: Record<string, unknown>): Promise<RoomScheduling[]>;
  findByRoomId(roomId: string): Promise<RoomScheduling[]>;
  findByDayOfWeek(dayOfWeek: number): Promise<RoomScheduling[]>;
  findByTimeSlot(timeSlot: string): Promise<RoomScheduling[]>;
  create(data: RoomSchedulingCreate): Promise<RoomScheduling>;
  update(id: string, data: Partial<RoomSchedulingCreate>): Promise<RoomScheduling>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findConflicts(roomId: string, dayOfWeek: number, startTime: string, endTime: string): Promise<RoomScheduling[]>;
  getWeekSchedule(roomId: string): Promise<RoomScheduling[]>;
  findAvailableSlots(roomId: string, dayOfWeek: number): Promise<RoomScheduling[]>;
  findByRecurringType(recurringType: string): Promise<RoomScheduling[]>;
  disable(id: string): Promise<RoomScheduling>;
  enable(id: string): Promise<RoomScheduling>;
  findActive(): Promise<RoomScheduling[]>;
}

export interface ScEmergencyPlanRepository {
  client: SupabaseClient;
  findById(id: string): Promise<EmergencyPlan | null>;
  findAll(filters?: Record<string, unknown>): Promise<EmergencyPlan[]>;
  findByName(name: string): Promise<EmergencyPlan | null>;
  findByType(type: string): Promise<EmergencyPlan[]>;
  findByStatus(status: string): Promise<EmergencyPlan[]>;
  create(data: EmergencyPlanCreate): Promise<EmergencyPlan>;
  update(id: string, data: EmergencyPlanUpdate): Promise<EmergencyPlan>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActive(): Promise<EmergencyPlan[]>;
  findByBuildingId(buildingId: string): Promise<EmergencyPlan[]>;
  findExpired(): Promise<EmergencyPlan[]>;
  findExpiringSoon(daysUntilExpiry: number): Promise<EmergencyPlan[]>;
  publish(id: string): Promise<EmergencyPlan>;
  archive(id: string): Promise<EmergencyPlan>;
  getLatestVersion(planType: string): Promise<EmergencyPlan | null>;
}

export interface ScSecurityIncidentRepository {
  client: SupabaseClient;
  findById(id: string): Promise<SecurityIncident | null>;
  findAll(filters?: Record<string, unknown>): Promise<SecurityIncident[]>;
  findByType(type: string): Promise<SecurityIncident[]>;
  findBySeverity(severity: string): Promise<SecurityIncident[]>;
  findByStatus(status: string): Promise<SecurityIncident[]>;
  findByLocation(location: string): Promise<SecurityIncident[]>;
  create(data: SecurityIncidentCreate): Promise<SecurityIncident>;
  update(id: string, data: Partial<SecurityIncidentCreate>): Promise<SecurityIncident>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<SecurityIncident[]>;
  findOpen(): Promise<SecurityIncident[]>;
  resolve(id: string, resolution: string): Promise<SecurityIncident>;
  findByReportedBy(userId: string): Promise<SecurityIncident[]>;
  findCritical(): Promise<SecurityIncident[]>;
  getIncidentStats(startDate: string, endDate: string): Promise<Record<string, number>>;
}

export interface ScGuardRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Guard | null>;
  findAll(filters?: Record<string, unknown>): Promise<Guard[]>;
  findByName(name: string): Promise<Guard[]>;
  findByShift(shift: string): Promise<Guard[]>;
  findByStatus(status: string): Promise<Guard[]>;
  create(data: GuardCreate): Promise<Guard>;
  update(id: string, data: Partial<GuardCreate>): Promise<Guard>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findOnDuty(date: string): Promise<Guard[]>;
  findByLocation(location: string): Promise<Guard[]>;
  findAvailable(date: string, shift: string): Promise<Guard[]>;
  getSchedule(guardId: string, startDate: string, endDate: string): Promise<Record<string, string[]>>;
  findActive(): Promise<Guard[]>;
  findByCertification(certification: string): Promise<Guard[]>;
  getDutyHours(guardId: string, startDate: string, endDate: string): Promise<number>;
}

export interface ScCCTVRepository {
  client: SupabaseClient;
  findById(id: string): Promise<CCTV | null>;
  findAll(filters?: Record<string, unknown>): Promise<CCTV[]>;
  findByLocation(location: string): Promise<CCTV | null>;
  findByStatus(status: string): Promise<CCTV[]>;
  findByType(type: string): Promise<CCTV[]>;
  findByBuildingId(buildingId: string): Promise<CCTV[]>;
  create(data: CCTVCreate): Promise<CCTV>;
  update(id: string, data: Partial<CCTVCreate>): Promise<CCTV>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findOnline(): Promise<CCTV[]>;
  findOffline(): Promise<CCTV[]>;
  findWithMotionDetection(): Promise<CCTV[]>;
  getRecordingStatus(cctvId: string): Promise<Record<string, unknown>>;
  updateFirmware(id: string, version: string): Promise<CCTV>;
  findActive(): Promise<CCTV[]>;
}

// ─── Environment ────────────────────────────────────────────────────────────

export interface ScWasteManagementRepository {
  client: SupabaseClient;
  findById(id: string): Promise<WasteManagement | null>;
  findAll(filters?: Record<string, unknown>): Promise<WasteManagement[]>;
  findByType(type: string): Promise<WasteManagement[]>;
  findByLocation(location: string): Promise<WasteManagement[]>;
  findByDate(date: string): Promise<WasteManagement[]>;
  create(data: WasteManagementCreate): Promise<WasteManagement>;
  update(id: string, data: Partial<WasteManagementCreate>): Promise<WasteManagement>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<WasteManagement[]>;
  findByDisposalMethod(method: string): Promise<WasteManagement[]>;
  getTotalWeight(type: string, start: string, end: string): Promise<number>;
  findByBuildingId(buildingId: string): Promise<WasteManagement[]>;
  getRecyclingRate(startDate: string, endDate: string): Promise<number>;
  findOverflowing(): Promise<WasteManagement[]>;
  getDisposalStats(startDate: string, endDate: string): Promise<Record<string, number>>;
}

export interface ScCarbonFootprintRepository {
  client: SupabaseClient;
  findById(id: string): Promise<CarbonFootprint | null>;
  findAll(filters?: Record<string, unknown>): Promise<CarbonFootprint[]>;
  findBySource(source: string): Promise<CarbonFootprint[]>;
  findByCategory(category: string): Promise<CarbonFootprint[]>;
  findByDateRange(start: string, end: string): Promise<CarbonFootprint[]>;
  create(data: CarbonFootprintCreate): Promise<CarbonFootprint>;
  update(id: string, data: Partial<CarbonFootprintCreate>): Promise<CarbonFootprint>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByBuildingId(buildingId: string): Promise<CarbonFootprint[]>;
  getTotalEmissions(start: string, end: string): Promise<number>;
  findByScope(scope: number): Promise<CarbonFootprint[]>;
  getEmissionsTrend(days: number): Promise<Record<string, number>[]>;
  findByDepartment(department: string): Promise<CarbonFootprint[]>;
  getMonthlyComparison(year: number): Promise<Record<string, number>[]>;
  getYearlyTotal(year: number): Promise<number>;
}

export interface ScSolarProductionRepository {
  client: SupabaseClient;
  findById(id: string): Promise<SolarProduction | null>;
  findAll(filters?: Record<string, unknown>): Promise<SolarProduction[]>;
  findByPanelId(panelId: string): Promise<SolarProduction[]>;
  findByDate(date: string): Promise<SolarProduction[]>;
  findByLocation(location: string): Promise<SolarProduction | null>;
  create(data: SolarProductionCreate): Promise<SolarProduction>;
  update(id: string, data: Partial<SolarProductionCreate>): Promise<SolarProduction>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<SolarProduction[]>;
  getTotalProduction(start: string, end: string): Promise<number>;
  getDailyAverage(days: number): Promise<number>;
  findLowProduction(threshold: number): Promise<SolarProduction[]>;
  findByPanelGroup(panelGroup: string): Promise<SolarProduction[]>;
  getEfficiencyRating(panelId: string): Promise<number>;
  getPeakProduction(start: string, end: string): Promise<SolarProduction>;
  findBySystemId(systemId: string): Promise<SolarProduction[]>;
}

export interface ScEnergySavingRepository {
  client: SupabaseClient;
  findById(id: string): Promise<EnergySaving | null>;
  findAll(filters?: Record<string, unknown>): Promise<EnergySaving[]>;
  findBySource(source: string): Promise<EnergySaving[]>;
  findByBuildingId(buildingId: string): Promise<EnergySaving | null>;
  findByDateRange(start: string, end: string): Promise<EnergySaving[]>;
  create(data: EnergySavingCreate): Promise<EnergySaving>;
  update(id: string, data: Partial<EnergySavingCreate>): Promise<EnergySaving>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  getTotalSavings(start: string, end: string): Promise<number>;
  findByType(type: string): Promise<EnergySaving[]>;
  findActive(): Promise<EnergySaving[]>;
  getMonthlySavings(year: number): Promise<Record<string, number>[]>;
  findByInitiative(initiative: string): Promise<EnergySaving[]>;
  getSavingsVsTarget(startDate: string, endDate: string): Promise<Record<string, number>>;
}

export interface ScWaterUsageRepository {
  client: SupabaseClient;
  findById(id: string): Promise<WaterUsage | null>;
  findAll(filters?: Record<string, unknown>): Promise<WaterUsage[]>;
  findByLocation(location: string): Promise<WaterUsage | null>;
  findByDate(date: string): Promise<WaterUsage[]>;
  findByMeterId(meterId: string): Promise<WaterUsage[]>;
  create(data: WaterUsageCreate): Promise<WaterUsage>;
  update(id: string, data: Partial<WaterUsageCreate>): Promise<WaterUsage>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findByDateRange(start: string, end: string): Promise<WaterUsage[]>;
  getTotalUsage(start: string, end: string): Promise<number>;
  findByBuildingId(buildingId: string): Promise<WaterUsage[]>;
  getDailyAverage(days: number): Promise<number>;
  findHighUsage(thresholdLiters: number): Promise<WaterUsage[]>;
  getUsageTrend(days: number): Promise<Record<string, number>[]>;
  getMonthlyComparison(year: number): Promise<Record<string, number>[]>;
}

export interface ScEnvironmentalReportRepository {
  client: SupabaseClient;
  findById(id: string): Promise<EnvironmentalReport | null>;
  findAll(filters?: Record<string, unknown>): Promise<EnvironmentalReport[]>;
  findByType(type: string): Promise<EnvironmentalReport[]>;
  findByDateRange(start: string, end: string): Promise<EnvironmentalReport[]>;
  findByStatus(status: string): Promise<EnvironmentalReport[]>;
  create(data: EnvironmentalReportCreate): Promise<EnvironmentalReport>;
  update(id: string, data: Partial<EnvironmentalReportCreate>): Promise<EnvironmentalReport>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  generateMonthly(month: number, year: number): Promise<EnvironmentalReport>;
  generateAnnual(year: number): Promise<EnvironmentalReport>;
  findBySchoolId(schoolId: string): Promise<EnvironmentalReport[]>;
  approve(id: string, approvedBy: string): Promise<EnvironmentalReport>;
  findPendingReview(): Promise<EnvironmentalReport[]>;
  getLatest(type: string): Promise<EnvironmentalReport | null>;
  findByPeriod(period: string): Promise<EnvironmentalReport[]>;
}

export interface ScEnvironmentalGoalRepository {
  client: SupabaseClient;
  findById(id: string): Promise<Record<string, unknown> | null>;
  findAll(filters?: Record<string, unknown>): Promise<Record<string, unknown>[]>;
  findByName(name: string): Promise<Record<string, unknown> | null>;
  findByCategory(category: string): Promise<Record<string, unknown>[]>;
  findByStatus(status: string): Promise<Record<string, unknown>[]>;
  create(data: Record<string, unknown>): Promise<Record<string, unknown>>;
  update(id: string, data: Record<string, unknown>): Promise<Record<string, unknown>>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
  findActive(): Promise<Record<string, unknown>[]>;
  findCompleted(): Promise<Record<string, unknown>[]>;
  findOverdue(): Promise<Record<string, unknown>[]>;
  updateProgress(id: string, progressPercent: number): Promise<Record<string, unknown>>;
  findByTargetYear(year: number): Promise<Record<string, unknown>[]>;
  findExpiringSoon(daysUntilDeadline: number): Promise<Record<string, unknown>[]>;
  getCompletionRate(): Promise<number>;
}
