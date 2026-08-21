export enum DeviceType {
  SENSOR = 'SENSOR',
  GATEWAY = 'GATEWAY',
  ACTUATOR = 'ACTUATOR',
  CONTROLLER = 'CONTROLLER',
  ROUTER = 'ROUTER',
  SMART_METER = 'SMART_METER',
  CAMERA = 'CAMERA',
  DOOR_LOCK = 'DOOR_LOCK',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  ENERGY_METER = 'ENERGY_METER',
  WATER_METER = 'WATER_METER',
  MOTION_SENSOR = 'MOTION_SENSOR',
  PRESENCE_DETECTOR = 'PRESENCE_DETECTOR',
  LIGHT_SENSOR = 'LIGHT_SENSOR',
  HVAC_CONTROLLER = 'HVAC_CONTROLLER',
}

export enum DeviceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
  DECOMMISSIONED = 'DECOMMISSIONED',
  ERROR = 'ERROR',
  LOW_BATTERY = 'LOW_BATTERY',
  UPDATING = 'UPDATING',
}

export enum SensorType {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
  AIR_QUALITY = 'AIR_QUALITY',
  CO2 = 'CO2',
  NOISE = 'NOISE',
  LIGHT = 'LIGHT',
  MOTION = 'MOTION',
  PRESSURE = 'PRESSURE',
  WATER_FLOW = 'WATER_FLOW',
  VIBRATION = 'VIBRATION',
  SMOKE = 'SMOKE',
  CO = 'CO',
}

export enum SensorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CALIBRATING = 'CALIBRATING',
  FAULTY = 'FAULTY',
  BATTERY_LOW = 'BATTERY_LOW',
  REPLACED = 'REPLACED',
}

export enum EnergyType {
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  BATTERY = 'BATTERY',
  GENERATOR = 'GENERATOR',
  GRID = 'GRID',
}

export enum WaterMetric {
  CONSUMPTION = 'CONSUMPTION',
  FLOW_RATE = 'FLOW_RATE',
  PRESSURE = 'PRESSURE',
  QUALITY = 'QUALITY',
  TEMPERATURE = 'TEMPERATURE',
  PH = 'PH',
  TURBIDITY = 'TURBIDITY',
}

export enum AccessControlType {
  CARD_READER = 'CARD_READER',
  BIOMETRIC = 'BIOMETRIC',
  PIN_PAD = 'PIN_PAD',
  QR_CODE = 'QR_CODE',
  BLUETOOTH = 'BLUETOOTH',
  MOBILE = 'MOBILE',
  FACE_RECOGNITION = 'FACE_RECOGNITION',
}

export enum LockStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  JAMMED = 'JAMMED',
  LOW_BATTERY = 'LOW_BATTERY',
  TAMPERED = 'TAMPERED',
  MAINTENANCE = 'MAINTENANCE',
}

export enum CameraType {
  DOME = 'DOME',
  BULLET = 'BULLET',
  PTZ = 'PTZ',
  FISHEYE = 'FISHEYE',
  THERMAL = 'THERMAL',
  INFRARED = 'INFRARED',
  PANORAMIC = 'PANORAMIC',
}

export enum CameraStatus {
  RECORDING = 'RECORDING',
  STANDBY = 'STANDBY',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR',
  MAINTENANCE = 'MAINTENANCE',
  UPDATING = 'UPDATING',
}

export enum EnvironmentMetric {
  TEMPERATURE = 'TEMPERATURE',
  HUMIDITY = 'HUMIDITY',
  CO2 = 'CO2',
  PM25 = 'PM25',
  PM10 = 'PM10',
  NOISE = 'NOISE',
  LIGHT_LEVEL = 'LIGHT_LEVEL',
  UV_INDEX = 'UV_INDEX',
  OZONE = 'OZONE',
  VOC = 'VOC',
}

export enum AlertType {
  THRESHOLD_BREACH = 'THRESHOLD_BREACH',
  DEVICE_OFFLINE = 'DEVICE_OFFLINE',
  LOW_BATTERY = 'LOW_BATTERY',
  SECURITY_BREACH = 'SECURITY_BREACH',
  ENERGY_ANOMALY = 'ENERGY_ANOMALY',
  WATER_LEAK = 'WATER_LEAK',
  FIRE = 'FIRE',
  EQUIPMENT_FAILURE = 'EQUIPMENT_FAILURE',
  SCHEDULE_CONFLICT = 'SCHEDULE_CONFLICT',
}

export enum AutomationTrigger {
  TIME_BASED = 'TIME_BASED',
  SENSOR_VALUE = 'SENSOR_VALUE',
  PRESENCE = 'PRESENCE',
  SCHEDULE = 'SCHEDULE',
  WEATHER = 'WEATHER',
  OCCUPANCY = 'OCCUPANCY',
  ENERGY_THRESHOLD = 'ENERGY_THRESHOLD',
  MANUAL = 'MANUAL',
}

export enum AutomationAction {
  TURN_ON = 'TURN_ON',
  TURN_OFF = 'TURN_OFF',
  ADJUST_SETTING = 'ADJUST_SETTING',
  SEND_NOTIFICATION = 'SEND_NOTIFICATION',
  LOCK = 'LOCK',
  UNLOCK = 'UNLOCK',
  ADJUST_TEMPERATURE = 'ADJUST_TEMPERATURE',
  ADJUST_LIGHTING = 'ADJUST_LIGHTING',
  START_SEQUENCE = 'START_SEQUENCE',
  STOP_SEQUENCE = 'STOP_SEQUENCE',
}

export enum IoTProtocol {
  MQTT = 'MQTT',
  COAP = 'COAP',
  HTTP = 'HTTP',
  WEBSOCKET = 'WEBSOCKET',
  ZIGBEE = 'ZIGBEE',
  ZWAVE = 'ZWAVE',
  BLUETOOTH_LE = 'BLUETOOTH_LE',
  LORA = 'LORA',
  WIFI = 'WIFI',
  ETHERNET = 'ETHERNET',
}

export enum DataFrequency {
  REALTIME = 'REALTIME',
  EVERY_SECOND = 'EVERY_SECOND',
  EVERY_5_SECONDS = 'EVERY_5_SECONDS',
  EVERY_30_SECONDS = 'EVERY_30_SECONDS',
  EVERY_MINUTE = 'EVERY_MINUTE',
  EVERY_5_MINUTES = 'EVERY_5_MINUTES',
  EVERY_15_MINUTES = 'EVERY_15_MINUTES',
  EVERY_HOUR = 'EVERY_HOUR',
  DAILY = 'DAILY',
}

export enum CalibrationStatus {
  CALIBRATED = 'CALIBRATED',
  NEEDS_CALIBRATION = 'NEEDS_CALIBRATION',
  CALIBRATING = 'CALIBRATING',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
}

export enum BatteryStatus {
  FULL = 'FULL',
  GOOD = 'GOOD',
  LOW = 'LOW',
  CRITICAL = 'CRITICAL',
  CHARGING = 'CHARGING',
  DISCONNECTED = 'DISCONNECTED',
}

export enum NetworkType {
  WIFI = 'WIFI',
  ETHERNET = 'ETHERNET',
  LORA = 'LORA',
  ZIGBEE = 'ZIGBEE',
  BLUETOOTH = 'BLUETOOTH',
  CELLULAR = 'CELLULAR',
  NB_IOT = 'NB_IOT',
}

export enum FirmwareStatus {
  UP_TO_DATE = 'UP_TO_DATE',
  UPDATE_AVAILABLE = 'UPDATE_AVAILABLE',
  UPDATING = 'UPDATING',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export interface IoTDevice {
  id: string;
  school_id: string;
  name: string;
  device_type: DeviceType;
  status: DeviceStatus;
  protocol: IoTProtocol;
  mac_address: string;
  ip_address: string | null;
  location_id: string | null;
  building_id: string | null;
  floor: number | null;
  room_id: string | null;
  latitude: number | null;
  longitude: number | null;
  firmware_version: string;
  firmware_status: FirmwareStatus;
  battery_status: BatteryStatus;
  battery_level: number | null;
  network_type: NetworkType;
  signal_strength: number | null;
  last_seen: string;
  installed_at: string;
  metadata: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface IoTDeviceCreate {
  school_id: string;
  name: string;
  device_type: DeviceType;
  protocol: IoTProtocol;
  mac_address: string;
  ip_address?: string;
  location_id?: string;
  building_id?: string;
  floor?: number;
  room_id?: string;
  latitude?: number;
  longitude?: number;
  firmware_version: string;
  network_type: NetworkType;
  metadata?: Record<string, string>;
}

export interface IoTDeviceUpdate {
  name?: string;
  status?: DeviceStatus;
  ip_address?: string;
  location_id?: string;
  building_id?: string;
  floor?: number;
  room_id?: string;
  firmware_version?: string;
  firmware_status?: FirmwareStatus;
  battery_status?: BatteryStatus;
  battery_level?: number;
  network_type?: NetworkType;
  signal_strength?: number;
  metadata?: Record<string, string>;
}

export interface Sensor {
  id: string;
  school_id: string;
  device_id: string;
  sensor_type: SensorType;
  status: SensorStatus;
  unit: string;
  min_value: number | null;
  max_value: number | null;
  accuracy: number | null;
  calibration_status: CalibrationStatus;
  calibration_date: string | null;
  next_calibration_date: string | null;
  threshold_min: number | null;
  threshold_max: number | null;
  data_frequency: DataFrequency;
  location_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SensorCreate {
  school_id: string;
  device_id: string;
  sensor_type: SensorType;
  unit: string;
  min_value?: number;
  max_value?: number;
  accuracy?: number;
  threshold_min?: number;
  threshold_max?: number;
  data_frequency: DataFrequency;
  location_id?: string;
}

export interface SensorData {
  id: string;
  school_id: string;
  sensor_id: string;
  value: number;
  unit: string;
  timestamp: string;
  quality_score: number;
  is_valid: boolean;
  metadata: Record<string, string>;
  created_at: string;
}

export interface SensorDataCreate {
  school_id: string;
  sensor_id: string;
  value: number;
  unit: string;
  timestamp: string;
  quality_score?: number;
  is_valid?: boolean;
  metadata?: Record<string, string>;
}

export interface EnergyMonitor {
  id: string;
  school_id: string;
  device_id: string;
  energy_type: EnergyType;
  meter_number: string;
  total_consumption: number;
  peak_demand: number;
  power_factor: number;
  voltage: number;
  current: number;
  frequency: number;
  location_id: string | null;
  building_id: string | null;
  installation_date: string;
  last_reading: string;
  created_at: string;
  updated_at: string;
}

export interface EnergyMonitorCreate {
  school_id: string;
  device_id: string;
  energy_type: EnergyType;
  meter_number: string;
  total_consumption?: number;
  peak_demand?: number;
  power_factor?: number;
  voltage?: number;
  current?: number;
  frequency?: number;
  location_id?: string;
  building_id?: string;
  installation_date: string;
}

export interface WaterMonitor {
  id: string;
  school_id: string;
  device_id: string;
  metric: WaterMetric;
  meter_number: string;
  total_consumption: number;
  flow_rate: number;
  pressure: number;
  leak_detected: boolean;
  location_id: string | null;
  building_id: string | null;
  installation_date: string;
  last_reading: string;
  created_at: string;
  updated_at: string;
}

export interface WaterMonitorCreate {
  school_id: string;
  device_id: string;
  metric: WaterMetric;
  meter_number: string;
  total_consumption?: number;
  flow_rate?: number;
  pressure?: number;
  leak_detected?: boolean;
  location_id?: string;
  building_id?: string;
  installation_date: string;
}

export interface ElectricityMonitor {
  id: string;
  school_id: string;
  device_id: string;
  meter_number: string;
  phase: number;
  total_kwh: number;
  peak_kw: number;
  power_factor: number;
  voltage_l1: number;
  voltage_l2: number;
  voltage_l3: number;
  current_l1: number;
  current_l2: number;
  current_l3: number;
  demand_kw: number;
  power_quality_score: number;
  location_id: string | null;
  building_id: string | null;
  installation_date: string;
  last_reading: string;
  created_at: string;
  updated_at: string;
}

export interface ElectricityMonitorCreate {
  school_id: string;
  device_id: string;
  meter_number: string;
  phase: number;
  total_kwh?: number;
  peak_kw?: number;
  power_factor?: number;
  voltage_l1?: number;
  voltage_l2?: number;
  voltage_l3?: number;
  current_l1?: number;
  current_l2?: number;
  current_l3?: number;
  location_id?: string;
  building_id?: string;
  installation_date: string;
}

export interface DoorAccess {
  id: string;
  school_id: string;
  device_id: string;
  access_type: AccessControlType;
  door_name: string;
  location_id: string | null;
  building_id: string | null;
  floor: number | null;
  is_active: boolean;
  auto_lock_seconds: number;
  last_accessed: string | null;
  last_accessed_by: string | null;
  access_count_today: number;
  created_at: string;
  updated_at: string;
}

export interface DoorAccessCreate {
  school_id: string;
  device_id: string;
  access_type: AccessControlType;
  door_name: string;
  location_id?: string;
  building_id?: string;
  floor?: number;
  is_active?: boolean;
  auto_lock_seconds?: number;
}

export interface SmartLock {
  id: string;
  school_id: string;
  device_id: string;
  door_access_id: string;
  lock_status: LockStatus;
  battery_level: number;
  firmware_version: string;
  auto_lock_enabled: boolean;
  auto_lock_seconds: number;
  tamper_alert_enabled: boolean;
  last_locked: string | null;
  last_unlocked: string | null;
  lock_count_today: number;
  created_at: string;
  updated_at: string;
}

export interface SmartLockCreate {
  school_id: string;
  device_id: string;
  door_access_id: string;
  auto_lock_enabled?: boolean;
  auto_lock_seconds?: number;
  tamper_alert_enabled?: boolean;
}

export interface SmartCamera {
  id: string;
  school_id: string;
  device_id: string;
  camera_type: CameraType;
  status: CameraStatus;
  resolution: string;
  fps: number;
  storage_location: string;
  recording_enabled: boolean;
  motion_detection_enabled: boolean;
  night_vision_enabled: boolean;
  ptz_enabled: boolean;
  stream_url: string;
  location_id: string | null;
  building_id: string | null;
  floor: number | null;
  coverage_area: string;
  retention_days: number;
  created_at: string;
  updated_at: string;
}

export interface SmartCameraCreate {
  school_id: string;
  device_id: string;
  camera_type: CameraType;
  resolution: string;
  fps?: number;
  storage_location: string;
  recording_enabled?: boolean;
  motion_detection_enabled?: boolean;
  night_vision_enabled?: boolean;
  ptz_enabled?: boolean;
  stream_url: string;
  location_id?: string;
  building_id?: string;
  floor?: number;
  coverage_area?: string;
  retention_days?: number;
}

export interface EnvironmentMonitor {
  id: string;
  school_id: string;
  device_id: string;
  metric: EnvironmentMetric;
  current_value: number;
  unit: string;
  min_threshold: number | null;
  max_threshold: number | null;
  average_24h: number;
  peak_24h: number;
  location_id: string | null;
  building_id: string | null;
  floor: number | null;
  room_id: string | null;
  last_calibrated: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentMonitorCreate {
  school_id: string;
  device_id: string;
  metric: EnvironmentMetric;
  current_value?: number;
  unit: string;
  min_threshold?: number;
  max_threshold?: number;
  location_id?: string;
  building_id?: string;
  floor?: number;
  room_id?: string;
}

export interface IoTAlert {
  id: string;
  school_id: string;
  alert_type: AlertType;
  severity: string;
  title: string;
  message: string;
  device_id: string | null;
  sensor_id: string | null;
  location_id: string | null;
  building_id: string | null;
  is_acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
  resolved: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
  metadata: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface IoTAlertCreate {
  school_id: string;
  alert_type: AlertType;
  severity: string;
  title: string;
  message: string;
  device_id?: string;
  sensor_id?: string;
  location_id?: string;
  building_id?: string;
  metadata?: Record<string, string>;
}

export interface AutomationRule {
  id: string;
  school_id: string;
  name: string;
  description: string;
  is_active: boolean;
  trigger_type: AutomationTrigger;
  trigger_config: Record<string, string>;
  conditions: AutomationCondition[];
  actions: AutomationActionConfig[];
  priority: number;
  cooldown_seconds: number;
  last_triggered: string | null;
  trigger_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AutomationCondition {
  sensor_id: string;
  operator: string;
  value: number;
  unit: string;
}

export interface AutomationActionConfig {
  action_type: AutomationAction;
  target_device_id: string;
  parameters: Record<string, string>;
  delay_seconds: number;
}

export interface AutomationRuleCreate {
  school_id: string;
  name: string;
  description?: string;
  is_active?: boolean;
  trigger_type: AutomationTrigger;
  trigger_config: Record<string, string>;
  conditions?: AutomationCondition[];
  actions: AutomationActionConfig[];
  priority?: number;
  cooldown_seconds?: number;
  created_by: string;
}

export interface IoTQuery {
  school_id: string;
  device_ids?: string[];
  device_types?: DeviceType[];
  statuses?: DeviceStatus[];
  location_id?: string;
  building_id?: string;
  floor?: number;
  room_id?: string;
  protocol?: IoTProtocol;
  network_type?: NetworkType;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface IoTFilter {
  school_id: string;
  search?: string;
  device_type?: DeviceType;
  status?: DeviceStatus;
  location_id?: string;
  building_id?: string;
  floor?: number;
  has_alerts?: boolean;
  low_battery?: boolean;
  offline?: boolean;
  calibration_needed?: boolean;
  firmware_outdated?: boolean;
}

export interface IoTAnalytics {
  school_id: string;
  total_devices: number;
  online_devices: number;
  offline_devices: number;
  devices_by_type: Record<DeviceType, number>;
  devices_by_status: Record<DeviceStatus, number>;
  devices_by_building: Record<string, number>;
  devices_by_protocol: Record<IoTProtocol, number>;
  average_battery_level: number;
  low_battery_count: number;
  alert_count: number;
  unresolved_alert_count: number;
  energy_consumption_kwh: number;
  water_consumption_liters: number;
  data_points_collected: number;
  network_uptime_percentage: number;
  period_start: string;
  period_end: string;
}

export interface IoTReport {
  id: string;
  school_id: string;
  title: string;
  report_type: string;
  analytics: IoTAnalytics;
  device_summary: DeviceSummary[];
  alert_summary: AlertSummary[];
  recommendations: string[];
  generated_at: string;
  generated_by: string;
}

export interface DeviceSummary {
  device_type: DeviceType;
  total_count: number;
  online_count: number;
  offline_count: number;
  maintenance_count: number;
  alert_count: number;
}

export interface AlertSummary {
  alert_type: AlertType;
  total_count: number;
  unresolved_count: number;
  average_resolution_time_minutes: number;
}

export interface IoTConfig {
  id: string;
  school_id: string;
  default_data_frequency: DataFrequency;
  default_protocol: IoTProtocol;
  max_devices: number;
  alert_email_enabled: boolean;
  alert_sms_enabled: boolean;
  alert_webhook_url: string | null;
  data_retention_days: number;
  auto_calibration_enabled: boolean;
  energy_threshold_kwh: number;
  water_threshold_liters: number;
  co2_threshold_ppm: number;
  temperature_min_celsius: number;
  temperature_max_celsius: number;
  humidity_min_percent: number;
  humidity_max_percent: number;
  created_at: string;
  updated_at: string;
}

export interface DeviceCalibration {
  id: string;
  school_id: string;
  sensor_id: string;
  device_id: string;
  calibration_type: string;
  status: CalibrationStatus;
  previous_value: number;
  corrected_value: number;
  calibration_date: string;
  next_calibration_date: string;
  performed_by: string;
  notes: string;
  certificate_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeviceFirmware {
  id: string;
  school_id: string;
  device_id: string;
  current_version: string;
  available_version: string;
  status: FirmwareStatus;
  release_notes: string;
  download_url: string;
  file_size_bytes: number;
  checksum_sha256: string;
  released_at: string;
  installed_at: string | null;
  rollback_version: string | null;
  created_at: string;
  updated_at: string;
}

export interface NetworkConfig {
  id: string;
  school_id: string;
  device_id: string;
  network_type: NetworkType;
  ssid: string | null;
  ip_address: string;
  subnet_mask: string;
  gateway: string;
  dns_primary: string;
  dns_secondary: string;
  mac_address: string;
  signal_strength_dbm: number | null;
  connection_uptime_seconds: number;
  last_reconnected: string;
  is_dhcp: boolean;
  vlan_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface DataAggregation {
  id: string;
  school_id: string;
  sensor_id: string;
  aggregation_type: string;
  period_start: string;
  period_end: string;
  min_value: number;
  max_value: number;
  avg_value: number;
  sum_value: number;
  count: number;
  std_deviation: number;
  data_points: number;
  created_at: string;
}

export interface IoTDashboard {
  id: string;
  school_id: string;
  name: string;
  description: string;
  layout: IoTDashboardLayout;
  widgets: IoTDashboardWidget[];
  is_default: boolean;
  shared_with: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface IoTDashboardLayout {
  columns: number;
  rows: number;
  grid_size: string;
}

export interface IoTDashboardWidget {
  widget_id: string;
  widget_type: string;
  title: string;
  position: WidgetPosition;
  size: WidgetSize;
  device_ids: string[];
  sensor_ids: string[];
  config: Record<string, string>;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}

export interface EnergyReport {
  id: string;
  school_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  total_consumption_kwh: number;
  peak_demand_kw: number;
  average_power_factor: number;
  cost_estimate: number;
  consumption_by_building: BuildingConsumption[];
  consumption_by_type: Record<EnergyType, number>;
  comparison_previous_period_percent: number;
  recommendations: string[];
  generated_at: string;
}

export interface BuildingConsumption {
  building_id: string;
  building_name: string;
  consumption_kwh: number;
  percentage: number;
  trend: string;
}

export interface WaterReport {
  id: string;
  school_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  total_consumption_liters: number;
  leak_detected_count: number;
  average_flow_rate: number;
  cost_estimate: number;
  consumption_by_building: BuildingWaterConsumption[];
  comparison_previous_period_percent: number;
  recommendations: string[];
  generated_at: string;
}

export interface BuildingWaterConsumption {
  building_id: string;
  building_name: string;
  consumption_liters: number;
  percentage: number;
  leak_count: number;
}

export interface EnvironmentReport {
  id: string;
  school_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  average_temperature: number;
  average_humidity: number;
  average_co2_ppm: number;
  average_pm25: number;
  average_noise_db: number;
  air_quality_index: number;
  compliance_status: string;
  readings_by_building: BuildingEnvironmentReading[];
  alerts_summary: AlertSummary[];
  recommendations: string[];
  generated_at: string;
}

export interface BuildingEnvironmentReading {
  building_id: string;
  building_name: string;
  average_temperature: number;
  average_humidity: number;
  average_co2_ppm: number;
  air_quality_index: number;
  alert_count: number;
}
