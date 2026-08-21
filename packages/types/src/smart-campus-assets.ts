export enum AssetCategory {
  IT_EQUIPMENT = "IT_EQUIPMENT",
  FURNITURE = "FURNITURE",
  LABORATORY = "LABORATORY",
  LIBRARY = "LIBRARY",
  SPORTS = "SPORTS",
  MUSICAL = "MUSICAL",
  OFFICE = "OFFICE",
  CLEANING = "CLEANING",
  SECURITY = "SECURITY",
  VEHICLE = "VEHICLE",
  MEDICAL = "MEDICAL",
  KITCHEN = "KITCHEN",
  GARDEN = "GARDEN",
  OTHER = "OTHER",
}

export enum AssetStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  UNDER_REPAIR = "UNDER_REPAIR",
  DISPOSED = "DISPOSED",
  LOST = "LOST",
  STOLEN = "STOLEN",
  RETURNED = "RETURNED",
  PENDING_APPROVAL = "PENDING_APPROVAL",
}

export enum EquipmentType {
  DESKTOP = "DESKTOP",
  LAPTOP = "LAPTOP",
  PRINTER = "PRINTER",
  SCANNER = "SCANNER",
  PROJECTOR = "PROJECTOR",
  INTERACTIVE_WHITEBOARD = "INTERACTIVE_WHITEBOARD",
  SERVER = "SERVER",
  ROUTER = "ROUTER",
  SWITCH = "SWITCH",
  UPS = "UPS",
  MONITOR = "MONITOR",
  KEYBOARD = "KEYBOARD",
  MOUSE = "MOUSE",
  SPEAKER = "SPEAKER",
  CAMERA = "CAMERA",
  MICROPHONE = "MICROPHONE",
  OTHER = "OTHER",
}

export enum WarrantyStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  EXTENDED = "EXTENDED",
  VOID = "VOID",
  NOT_APPLICABLE = "NOT_APPLICABLE",
}

export enum DepreciationMethod {
  STRAIGHT_LINE = "STRAIGHT_LINE",
  DECLINING_BALANCE = "DECLINING_BALANCE",
  DOUBLE_DECLINING = "DOUBLE_DECLINING",
  SUM_OF_YEARS = "SUM_OF_YEARS",
  UNITS_OF_PRODUCTION = "UNITS_OF_PRODUCTION",
  NOT_APPLICABLE = "NOT_APPLICABLE",
}

export enum TransferStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum AssetCondition {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
  DAMAGED = "DAMAGED",
  BEYOND_REPAIR = "BEYOND_REPAIR",
}

export enum ITAssetType {
  COMPUTER = "COMPUTER",
  SERVER = "SERVER",
  NETWORK_DEVICE = "NETWORK_DEVICE",
  STORAGE = "STORAGE",
  PERIPHERAL = "PERIPHERAL",
  MOBILE_DEVICE = "MOBILE_DEVICE",
  OTHER = "OTHER",
}

export enum FurnitureType {
  DESK = "DESK",
  CHAIR = "CHAIR",
  TABLE = "TABLE",
  BOOKSHELF = "BOOKSHELF",
  CABINET = "CABINET",
  SOFA = "SOFA",
  BED = "BED",
  WARDROBE = "WARDROBE",
  WHITEBOARD = "WHITEBOARD",
  OTHER = "OTHER",
}

export enum LabEquipmentType {
  MICROSCOPE = "MICROSCOPE",
  SPECTROMETER = "SPECTROMETER",
  CENTRIFUGE = "CENTRIFUGE",
  INCUBATOR = "INCUBATOR",
  FUME_HOOD = "FUME_HOOD",
  BALANCE = "BALANCE",
  HEATING_MANTLE = "HEATING_MANTLE",
  WATER_BATH = "WATER_BATH",
  AUTOCLAVE = "AUTOCLAVE",
  SAFETY_CABINET = "SAFETY_CABINET",
  OTHER = "OTHER",
}

export enum InventoryStatus2 {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  DISCREPANCY_FOUND = "DISCREPANCY_FOUND",
}

export enum AssetLifecycle {
  PROCUREMENT = "PROCUREMENT",
  RECEIPT = "RECEIPT",
  DEPLOYMENT = "DEPLOYMENT",
  ACTIVE_USE = "ACTIVE_USE",
  MAINTENANCE = "MAINTENANCE",
  STORAGE = "STORAGE",
  TRANSFER = "TRANSFER",
  DISPOSAL = "DISPOSAL",
}

export enum DisposalMethod {
  SALE = "SALE",
  DONATION = "DONATION",
  RECYCLING = "RECYCLING",
  AUCTION = "AUCTION",
  SCRAPPING = "SCRAPPING",
  TRADE_IN = "TRADE_IN",
  OTHER = "OTHER",
}

export enum InsuranceStatus2 {
  INSURED = "INSURED",
  UNINSURED = "UNINSURED",
  PENDING = "PENDING",
  EXPIRED = "EXPIRED",
  CLAIMED = "CLAIMED",
}

export enum MaintenanceType2 {
  PREVENTIVE = "PREVENTIVE",
  CORRECTIVE = "CORRECTIVE",
  PREDICTIVE = "PREDICTIVE",
  CONDITION_BASED = "CONDITION_BASED",
  EMERGENCY = "EMERGENCY",
}

export interface Asset {
  id: string;
  school_id: string;
  asset_tag: string;
  name: string;
  description: string;
  category: AssetCategory;
  subcategory: string;
  brand: string;
  model: string;
  serial_number: string;
  status: AssetStatus;
  condition: AssetCondition;
  lifecycle: AssetLifecycle;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  depreciation_method: DepreciationMethod;
  useful_life_years: number;
  salvage_value: number;
  location_id: string;
  location_name: string;
  building_id: string | null;
  room_id: string | null;
  assigned_to: string | null;
  assigned_to_name: string | null;
  department_id: string;
  department_name: string;
  custodian_id: string;
  custodian_name: string;
  warranty_id: string | null;
  insurance_status: InsuranceStatus2;
  insurance_policy: string | null;
  images: string[];
  documents: string[];
  barcode: string;
  qr_code: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssetCreate {
  school_id: string;
  asset_tag: string;
  name: string;
  description: string;
  category: AssetCategory;
  subcategory: string;
  brand: string;
  model: string;
  serial_number: string;
  condition: AssetCondition;
  purchase_date: string;
  purchase_price: number;
  depreciation_method: DepreciationMethod;
  useful_life_years: number;
  salvage_value: number;
  location_id: string;
  location_name: string;
  building_id: string | null;
  room_id: string | null;
  assigned_to: string | null;
  department_id: string;
  department_name: string;
  custodian_id: string;
  custodian_name: string;
  insurance_status: InsuranceStatus2;
  insurance_policy: string | null;
  images: string[];
  documents: string[];
  barcode: string;
  qr_code: string;
  notes: string;
}

export interface AssetUpdate {
  name?: string;
  description?: string;
  category?: AssetCategory;
  subcategory?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  status?: AssetStatus;
  condition?: AssetCondition;
  lifecycle?: AssetLifecycle;
  purchase_price?: number;
  current_value?: number;
  depreciation_method?: DepreciationMethod;
  useful_life_years?: number;
  salvage_value?: number;
  location_id?: string;
  location_name?: string;
  building_id?: string | null;
  room_id?: string | null;
  assigned_to?: string | null;
  assigned_to_name?: string | null;
  department_id?: string;
  department_name?: string;
  custodian_id?: string;
  custodian_name?: string;
  insurance_status?: InsuranceStatus2;
  insurance_policy?: string | null;
  images?: string[];
  documents?: string[];
  barcode?: string;
  qr_code?: string;
  notes?: string;
}

export interface Equipment {
  id: string;
  school_id: string;
  asset_id: string;
  equipment_type: EquipmentType;
  brand: string;
  model: string;
  serial_number: string;
  mac_address: string | null;
  ip_address: string | null;
  operating_system: string | null;
  processor: string | null;
  ram_size: string | null;
  storage_size: string | null;
  display_size: string | null;
  resolution: string | null;
  connectivity: string[];
  power_consumption: number | null;
  last_boot_time: string | null;
  software_installed: string[];
  license_keys: Record<string, string>;
  network_id: string | null;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EquipmentCreate {
  school_id: string;
  asset_id: string;
  equipment_type: EquipmentType;
  brand: string;
  model: string;
  serial_number: string;
  mac_address: string | null;
  ip_address: string | null;
  operating_system: string | null;
  processor: string | null;
  ram_size: string | null;
  storage_size: string | null;
  display_size: string | null;
  resolution: string | null;
  connectivity: string[];
  power_consumption: number | null;
  software_installed: string[];
  license_keys: Record<string, string>;
  network_id: string | null;
  notes: string;
}

export interface Furniture {
  id: string;
  school_id: string;
  asset_id: string;
  furniture_type: FurnitureType;
  material: string;
  color: string;
  dimensions: FurnitureDimensions;
  weight: number | null;
  assembly_date: string;
  last_refurbishment: string | null;
  max_capacity: number | null;
  is_adjustable: boolean;
  has_storage: boolean;
  condition_notes: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FurnitureCreate {
  school_id: string;
  asset_id: string;
  furniture_type: FurnitureType;
  material: string;
  color: string;
  dimensions: FurnitureDimensions;
  weight: number | null;
  assembly_date: string;
  max_capacity: number | null;
  is_adjustable: boolean;
  has_storage: boolean;
  condition_notes: string;
  notes: string;
}

export interface ITAsset {
  id: string;
  school_id: string;
  asset_id: string;
  it_type: ITAssetType;
  brand: string;
  model: string;
  serial_number: string;
  mac_address: string | null;
  ip_address: string | null;
  hostname: string | null;
  operating_system: string;
  os_version: string;
  processor: string;
  ram_size: string;
  storage_type: string;
  storage_size: string;
  display_size: string | null;
  resolution: string | null;
  graphics: string | null;
  network_adapter: string | null;
  bluetooth: boolean;
  wifi: boolean;
  ports: string[];
  battery_health: number | null;
  last_system_update: string | null;
  antivirus_status: string;
  encryption_status: boolean;
  remote_access_enabled: boolean;
  asset_management_agent: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ITAssetCreate {
  school_id: string;
  asset_id: string;
  it_type: ITAssetType;
  brand: string;
  model: string;
  serial_number: string;
  mac_address: string | null;
  ip_address: string | null;
  hostname: string | null;
  operating_system: string;
  os_version: string;
  processor: string;
  ram_size: string;
  storage_type: string;
  storage_size: string;
  display_size: string | null;
  resolution: string | null;
  graphics: string | null;
  network_adapter: string | null;
  bluetooth: boolean;
  wifi: boolean;
  ports: string[];
  battery_health: number | null;
  antivirus_status: string;
  encryption_status: boolean;
  remote_access_enabled: boolean;
  asset_management_agent: boolean;
  notes: string;
}

export interface Printer {
  id: string;
  school_id: string;
  asset_id: string;
  brand: string;
  model: string;
  serial_number: string;
  printer_type: string;
  connectivity: string[];
  print_speed: string;
  resolution: string;
  paper_sizes: string[];
  has_duplex: boolean;
  has_scanner: boolean;
  has_fax: boolean;
  toner_level: number;
  total_pages_printed: number;
  ip_address: string | null;
  mac_address: string | null;
  network_id: string | null;
  driver_version: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PrinterCreate {
  school_id: string;
  asset_id: string;
  brand: string;
  model: string;
  serial_number: string;
  printer_type: string;
  connectivity: string[];
  print_speed: string;
  resolution: string;
  paper_sizes: string[];
  has_duplex: boolean;
  has_scanner: boolean;
  has_fax: boolean;
  ip_address: string | null;
  mac_address: string | null;
  network_id: string | null;
  driver_version: string;
  notes: string;
}

export interface Laptop {
  id: string;
  school_id: string;
  asset_id: string;
  brand: string;
  model: string;
  serial_number: string;
  color: string;
  weight: number;
  screen_size: string;
  resolution: string;
  processor: string;
  ram_size: string;
  storage_type: string;
  storage_size: string;
  graphics: string;
  battery_capacity: number;
  battery_health: number;
  charging_cycles: number;
  has_fingerprint: boolean;
  has_face_recognition: boolean;
  webcam: boolean;
  keyboard_layout: string;
  ports: string[];
  operating_system: string;
  os_version: string;
  mac_address: string | null;
  last_service_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LaptopCreate {
  school_id: string;
  asset_id: string;
  brand: string;
  model: string;
  serial_number: string;
  color: string;
  weight: number;
  screen_size: string;
  resolution: string;
  processor: string;
  ram_size: string;
  storage_type: string;
  storage_size: string;
  graphics: string;
  battery_capacity: number;
  has_fingerprint: boolean;
  has_face_recognition: boolean;
  webcam: boolean;
  keyboard_layout: string;
  ports: string[];
  operating_system: string;
  os_version: string;
  mac_address: string | null;
  notes: string;
}

export interface Projector {
  id: string;
  school_id: string;
  asset_id: string;
  brand: string;
  model: string;
  serial_number: string;
  projector_type: string;
  brightness: string;
  resolution: string;
  contrast_ratio: string;
  throw_ratio: string;
  screen_size_range: string;
  lamp_hours: number;
  lamp_life: number;
  has_speakers: boolean;
  has_wireless: boolean;
  has_hdmi: boolean;
  has_vga: boolean;
  has_usb: boolean;
  weight: number;
  noise_level: string;
  power_consumption: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectorCreate {
  school_id: string;
  asset_id: string;
  brand: string;
  model: string;
  serial_number: string;
  projector_type: string;
  brightness: string;
  resolution: string;
  contrast_ratio: string;
  throw_ratio: string;
  screen_size_range: string;
  lamp_hours: number;
  lamp_life: number;
  has_speakers: boolean;
  has_wireless: boolean;
  has_hdmi: boolean;
  has_vga: boolean;
  has_usb: boolean;
  weight: number;
  noise_level: string;
  power_consumption: number;
  notes: string;
}

export interface LabEquipment {
  id: string;
  school_id: string;
  asset_id: string;
  lab_type: string;
  equipment_type: LabEquipmentType;
  brand: string;
  model: string;
  serial_number: string;
  accuracy: string | null;
  range_min: number | null;
  range_max: number | null;
  calibration_date: string | null;
  calibration_due: string | null;
  calibration_certificate: string | null;
  requires_training: boolean;
  requires_certification: boolean;
  safety_level: string;
  chemical_compatibility: string[];
  power_requirements: string;
  operating_temperature: string | null;
  humidity_range: string | null;
  last_maintenance: string | null;
  next_maintenance: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface LabEquipmentCreate {
  school_id: string;
  asset_id: string;
  lab_type: string;
  equipment_type: LabEquipmentType;
  brand: string;
  model: string;
  serial_number: string;
  accuracy: string | null;
  range_min: number | null;
  range_max: number | null;
  calibration_date: string | null;
  calibration_due: string | null;
  calibration_certificate: string | null;
  requires_training: boolean;
  requires_certification: boolean;
  safety_level: string;
  chemical_compatibility: string[];
  power_requirements: string;
  operating_temperature: string | null;
  humidity_range: string | null;
  notes: string;
}

export interface AssetWarranty {
  id: string;
  school_id: string;
  asset_id: string;
  provider: string;
  policy_number: string;
  coverage_type: string;
  start_date: string;
  end_date: string;
  status: WarrantyStatus;
  coverage_amount: number;
  deductible: number;
  terms: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  documents: string[];
  claims: WarrantyClaim[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssetWarrantyCreate {
  school_id: string;
  asset_id: string;
  provider: string;
  policy_number: string;
  coverage_type: string;
  start_date: string;
  end_date: string;
  coverage_amount: number;
  deductible: number;
  terms: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  documents: string[];
  notes: string;
}

export interface AssetDepreciation {
  id: string;
  school_id: string;
  asset_id: string;
  method: DepreciationMethod;
  purchase_price: number;
  salvage_value: number;
  useful_life_years: number;
  annual_depreciation: number;
  monthly_depreciation: number;
  current_book_value: number;
  accumulated_depreciation: number;
  depreciation_start_date: string;
  last_calculated_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssetDepreciationCreate {
  school_id: string;
  asset_id: string;
  method: DepreciationMethod;
  purchase_price: number;
  salvage_value: number;
  useful_life_years: number;
  annual_depreciation: number;
  monthly_depreciation: number;
  depreciation_start_date: string;
  notes: string;
}

export interface AssetInventory {
  id: string;
  school_id: string;
  inventory_name: string;
  description: string;
  status: InventoryStatus2;
  scheduled_date: string;
  completed_date: string | null;
  inventory_type: string;
  building_ids: string[];
  room_ids: string[];
  department_ids: string[];
  category_filter: AssetCategory[];
  assigned_to: string[];
  total_assets_expected: number;
  total_assets_counted: number;
  discrepancies: InventoryDiscrepancy[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssetInventoryCreate {
  school_id: string;
  inventory_name: string;
  description: string;
  scheduled_date: string;
  inventory_type: string;
  building_ids: string[];
  room_ids: string[];
  department_ids: string[];
  category_filter: AssetCategory[];
  assigned_to: string[];
  notes: string;
}

export interface AssetTransfer {
  id: string;
  school_id: string;
  asset_id: string;
  transfer_type: string;
  from_location_id: string;
  from_location_name: string;
  from_building_id: string | null;
  from_room_id: string | null;
  to_location_id: string;
  to_location_name: string;
  to_building_id: string | null;
  to_room_id: string | null;
  from_custodian_id: string;
  from_custodian_name: string;
  to_custodian_id: string;
  to_custodian_name: string;
  from_department_id: string;
  from_department_name: string;
  to_department_id: string;
  to_department_name: string;
  status: TransferStatus;
  requested_by: string;
  requested_at: string;
  approved_by: string | null;
  approved_at: string | null;
  rejected_by: string | null;
  rejected_at: string | null;
  rejection_reason: string;
  completed_by: string | null;
  completed_at: string | null;
  condition_at_transfer: AssetCondition;
  reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssetTransferCreate {
  school_id: string;
  asset_id: string;
  transfer_type: string;
  from_location_id: string;
  from_location_name: string;
  from_building_id: string | null;
  from_room_id: string | null;
  to_location_id: string;
  to_location_name: string;
  to_building_id: string | null;
  to_room_id: string | null;
  from_custodian_id: string;
  from_custodian_name: string;
  to_custodian_id: string;
  to_custodian_name: string;
  from_department_id: string;
  from_department_name: string;
  to_department_id: string;
  to_department_name: string;
  requested_by: string;
  condition_at_transfer: AssetCondition;
  reason: string;
  notes: string;
}

export interface AssetMaintenance {
  id: string;
  school_id: string;
  asset_id: string;
  maintenance_type: MaintenanceType2;
  title: string;
  description: string;
  scheduled_date: string;
  completed_date: string | null;
  due_date: string | null;
  status: string;
  priority: string;
  assigned_to: string | null;
  assigned_to_name: string | null;
  performed_by: string | null;
  performed_by_name: string | null;
  estimated_cost: number;
  actual_cost: number | null;
  parts_used: MaintenancePart[];
  labor_hours: number;
  downtime_hours: number;
  before_condition: AssetCondition;
  after_condition: AssetCondition | null;
  findings: string;
  recommendations: string;
  next_maintenance_date: string | null;
  maintenance_notes: string;
  documents: string[];
  images: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssetMaintenanceCreate {
  school_id: string;
  asset_id: string;
  maintenance_type: MaintenanceType2;
  title: string;
  description: string;
  scheduled_date: string;
  due_date: string | null;
  priority: string;
  assigned_to: string | null;
  estimated_cost: number;
  parts_used: MaintenancePart[];
  labor_hours: number;
  before_condition: AssetCondition;
  notes: string;
}

export interface AssetFilter {
  school_id?: string;
  category?: AssetCategory;
  subcategory?: string;
  status?: AssetStatus;
  condition?: AssetCondition;
  lifecycle?: AssetLifecycle;
  building_id?: string;
  room_id?: string;
  location_id?: string;
  department_id?: string;
  assigned_to?: string;
  custodian_id?: string;
  brand?: string;
  model?: string;
  date_from?: string;
  date_to?: string;
  min_value?: number;
  max_value?: number;
  warranty_status?: WarrantyStatus;
  insurance_status?: InsuranceStatus2;
  search?: string;
}

export interface AssetAnalytics {
  total_assets: number;
  active_assets: number;
  total_value: number;
  current_book_value: number;
  assets_by_category: CategoryStat[];
  assets_by_status: AssetStatusStat[];
  assets_by_condition: AssetConditionStat[];
  assets_by_department: DepartmentAssetStat[];
  depreciation_summary: DepreciationSummary;
  warranty_expiring_soon: WarrantyExpiringStat[];
  maintenance_summary: MaintenanceSummary;
  transfer_summary: TransferSummary;
  inventory_summary: InventorySummary;
  monthly_trends: AssetMonthlyTrend[];
}

export interface AssetReport {
  id: string;
  school_id: string;
  title: string;
  description: string;
  report_type: string;
  generated_by: string;
  date_from: string;
  date_to: string;
  filters: AssetFilter;
  data: AssetAnalytics;
  format: string;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssetCategory2 {
  id: string;
  school_id: string;
  name: string;
  code: string;
  description: string;
  parent_id: string | null;
  icon: string;
  color: string;
  depreciation_rate: number;
  useful_life_years: number;
  is_active: boolean;
  subcategories: AssetCategory2[];
  created_at: string;
  updated_at: string;
}

export interface AssetSchedule {
  id: string;
  school_id: string;
  asset_id: string;
  schedule_type: string;
  title: string;
  description: string;
  frequency: string;
  start_date: string;
  end_date: string | null;
  next_occurrence: string;
  last_occurrence: string | null;
  assigned_to: string;
  assigned_to_name: string;
  estimated_duration: number;
  estimated_cost: number;
  is_active: boolean;
  notifications: ScheduleNotification[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AssetAudit {
  id: string;
  school_id: string;
  audit_name: string;
  description: string;
  audit_type: string;
  status: string;
  scheduled_date: string;
  completed_date: string | null;
  auditor_id: string;
  auditor_name: string;
  building_ids: string[];
  room_ids: string[];
  category_filter: AssetCategory[];
  total_assets_expected: number;
  total_assets_audited: number;
  discrepancies: AuditDiscrepancy[];
  compliance_score: number;
  findings: AuditFinding[];
  recommendations: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface FurnitureDimensions {
  width: number;
  height: number;
  depth: number;
  unit: string;
}

export interface WarrantyClaim {
  id: string;
  claim_date: string;
  issue_description: string;
  status: string;
  resolution: string | null;
  cost: number | null;
}

export interface InventoryDiscrepancy {
  asset_id: string;
  asset_tag: string;
  asset_name: string;
  expected_location: string;
  actual_location: string;
  expected_condition: AssetCondition;
  actual_condition: AssetCondition;
  status: string;
  notes: string;
}

export interface MaintenancePart {
  part_name: string;
  part_number: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
}

export interface CategoryStat {
  category: AssetCategory;
  count: number;
  total_value: number;
  percentage: number;
}

export interface AssetStatusStat {
  status: AssetStatus;
  count: number;
  percentage: number;
}

export interface AssetConditionStat {
  condition: AssetCondition;
  count: number;
  percentage: number;
}

export interface DepartmentAssetStat {
  department_id: string;
  department_name: string;
  count: number;
  total_value: number;
}

export interface DepreciationSummary {
  total_purchase_value: number;
  total_accumulated_depreciation: number;
  total_book_value: number;
  assets_fully_depreciated: number;
}

export interface WarrantyExpiringStat {
  asset_id: string;
  asset_tag: string;
  asset_name: string;
  warranty_end_date: string;
  days_remaining: number;
  provider: string;
}

export interface MaintenanceSummary {
  total_scheduled: number;
  total_completed: number;
  total_overdue: number;
  total_cost: number;
}

export interface TransferSummary {
  total_pending: number;
  total_completed: number;
  total_rejected: number;
}

export interface InventorySummary {
  total_inventories: number;
  last_inventory_date: string | null;
  accuracy_rate: number;
}

export interface AssetMonthlyTrend {
  month: string;
  new_assets: number;
  disposed_assets: number;
  total_value: number;
  total_count: number;
}

export interface ScheduleNotification {
  days_before: number;
  notification_type: string;
  recipient_ids: string[];
}

export interface AuditDiscrepancy {
  asset_id: string;
  asset_tag: string;
  expected: string;
  actual: string;
  severity: string;
}

export interface AuditFinding {
  category: string;
  description: string;
  severity: string;
  recommendation: string;
}
