# Smart Campus IoT Documentation

## Executive Summary

The IoT module serves as the central nervous system of the Smart Campus, managing all connected sensors, actuators, and edge devices across campus infrastructure. It handles device provisioning, telemetry ingestion, command dispatch, and alert management through a unified MQTT-based architecture.

The system supports diverse sensor types including environmental (temperature, humidity, CO2), occupancy (infrared, camera-based), energy (power meters, water flow), and security (motion, door contacts). Data flows from edge devices through the IoT Gateway into TimescaleDB for real-time processing and historical analysis.

IoT infrastructure enables predictive facility management, energy optimization, and automated safety responses. It processes over 1 million data points daily while maintaining sub-second latency for critical alerts.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│           IoT Gateway Service            │
├──────────┬──────────┬────────────────────┤
│  Device  │ Telemetry│  Command           │
│ Registry │ Ingestor │  Dispatcher        │
├──────────┴──────────┴────────────────────┤
│     MQTT Broker (Mosquitto / EMQ X)      │
├──────────────────────────────────────────┤
│     Edge Computing Layer                 │
│     (Local aggregation + filtering)      │
├──────────────────────────────────────────┤
│     TimescaleDB (Hypertables)            │
│     PostgreSQL (Device Registry)         │
└──────────────────────────────────────────┘
```

Device Registry maintains device metadata, firmware versions, and configuration. Telemetry Ingestor processes incoming MQTT messages, validates schemas, and persists to hypertables. Command Dispatcher sends configuration updates and actuator commands to devices.

## Entity Relationships

### IoTDevice

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Device display name |
| type | ENUM | `sensor`, `actuator`, `gateway`, `edge` |
| model | VARCHAR(100) | Hardware model |
| firmware_version | VARCHAR(20) | Current firmware |
| mac_address | VARCHAR(17) | MAC address |
| mqtt_topic | VARCHAR(255) | MQTT topic path |
| location_id | UUID | FK to room (nullable) |
| installation_date | DATE | When deployed |
| battery_level | INTEGER | Battery percentage (nullable) |
| status | ENUM | `online`, `offline`, `maintenance`, `decommissioned` |
| last_seen | TIMESTAMP | Last telemetry received |
| config | JSONB | Device-specific configuration |

### SensorType

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(100) | Sensor type name |
| unit | VARCHAR(20) | Measurement unit |
| data_type | ENUM | `numeric`, `boolean`, `text` |
| min_value | DECIMAL | Minimum valid reading |
| max_value | DECIMAL | Maximum valid reading |
| precision | INTEGER | Decimal places |
| category | ENUM | `environmental`, `occupancy`, `energy`, `security` |

### TelemetryReading

| Field | Type | Description |
|-------|------|-------------|
| time | TIMESTAMPTZ | Timestamp (TimescaleDB) |
| device_id | UUID | FK to iot_device |
| sensor_type_id | UUID | FK to sensor_type |
| value | DECIMAL(15,6) | Measured value |
| quality | ENUM | `good`, `uncertain`, `bad` |
| raw_data | JSONB | Original payload |

### SensorAlert

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| device_id | UUID | FK to iot_device |
| sensor_type_id | UUID | FK to sensor_type |
| threshold_id | UUID | FK to alert_threshold |
| triggered_at | TIMESTAMP | When triggered |
| resolved_at | TIMESTAMP | When resolved |
| current_value | DECIMAL(15,6) | Value that triggered |
| threshold_value | DECIMAL(15,6) | Threshold that was exceeded |
| severity | ENUM | `info`, `warning`, `critical` |
| acknowledged_by | UUID | FK to staff (nullable) |
| notification_sent | BOOLEAN | Alert dispatched |

### AlertThreshold

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| sensor_type_id | UUID | FK to sensor_type |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Threshold description |
| condition | ENUM | `above`, `below`, `outside_range` |
| warning_value | DECIMAL(15,6) | Warning trigger |
| critical_value | DECIMAL(15,6) | Critical trigger |
| cooldown_seconds | INTEGER | Minimum gap between alerts |
| enabled | BOOLEAN | Active flag |

### DeviceCommand

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| device_id | UUID | FK to iot_device |
| command_type | VARCHAR(50) | Command identifier |
| payload | JSONB | Command parameters |
| sent_at | TIMESTAMP | When dispatched |
| acknowledged_at | TIMESTAMP | Device acknowledgment |
| result | JSONB | Response payload |
| status | ENUM | `pending`, `sent`, `acknowledged`, `failed`, `timeout` |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/iot/devices` | List all devices | admin, iot_manager |
| POST | `/api/v1/iot/devices` | Register device | iot_manager |
| GET | `/api/v1/iot/devices/:id` | Device details | admin, iot_manager |
| PUT | `/api/v1/iot/devices/:id` | Update device | iot_manager |
| PUT | `/api/v1/iot/devices/:id/config` | Update device config | iot_manager |
| POST | `/api/v1/iot/devices/:id/command` | Send command | iot_manager |
| GET | `/api/v1/iot/devices/:id/telemetry` | Recent readings | admin, iot_manager |
| GET | `/api/v1/iot/telemetry/aggregated` | Aggregated data | admin |
| GET | `/api/v1/iot/alerts` | Active alerts | admin, iot_manager |
| PUT | `/api/v1/iot/alerts/:id/acknowledge` | Acknowledge alert | admin |
| PUT | `/api/v1/iot/alerts/:id/resolve` | Resolve alert | admin |
| GET | `/api/v1/iot/thresholds` | List thresholds | admin, iot_manager |
| POST | `/api/v1/iot/thresholds` | Create threshold | admin |
| PUT | `/api/v1/iot/thresholds/:id` | Update threshold | admin |
| GET | `/api/v1/iot/dashboard` | IoT overview | admin |
| POST | `/api/v1/iot/devices/:id/firmware-update` | OTA update | iot_manager |

## Configuration Reference

```yaml
iot:
  mqtt:
    broker: "mqtt://iot.educi.local:1883"
    tls_enabled: true
    cert_path: "/certs/mqtt-server.crt"
    max_clients: 1000
    keepalive_seconds: 60

  telemetry:
    ingestion_rate_limit: 10000
    batch_size: 100
    flush_interval_seconds: 5
    retention_days: 365
    compression: true

  alerts:
    evaluation_interval_seconds: 30
    default_cooldown_seconds: 300
    notification_channels: ["push", "email", "sms"]
    escalation_timeout_minutes: 15

  device_management:
    auto_provisioning: false
    heartbeat_interval_seconds: 60
    offline_threshold_seconds: 300
    firmware_ota_enabled: true

  edge_computing:
    enabled: true
    aggregation_interval_seconds: 60
    local_alert_evaluation: true
    cloud_sync_interval_seconds: 300

  storage:
    hypertable_chunk_time: "1 day"
    compression_after_days: 7
    retention_policy_days: 365
    continuous_aggregates: true
```

## Security Considerations

- MQTT communication encrypted via TLS 1.3 with mutual authentication
- Device provisioning requires physical access plus administrative approval
- Firmware updates signed; devices verify signatures before installation
- Telemetry data encrypted at rest in TimescaleDB
- Device commands require `iot:command` permission with rate limiting
- Gateway devices on isolated IoT VLAN with firewall rules
- Telemetry anonymization for analytics exports (no device-level data sharing)
- Alert escalation to emergency services requires human confirmation

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Sensor Dashboard | View real-time readings from all sensors |
| Alert Feed | Browse and acknowledge active alerts |
| Device Map | Interactive map showing device locations |
| Environment View | Room-by-room temperature, humidity, CO2 |
| Energy Monitor | Real-time power and water consumption |
| Occupancy Status | Room occupancy levels and trends |
| Device Health | Battery levels, signal strength, last seen |
| Quick Configure | Update sensor thresholds from mobile |

## Testing Strategy

**MQTT Ingestion**: Load test publishes 10,000 messages/second from 500 simulated devices. Validates ingestion pipeline handles burst without data loss.

**Alert Evaluation**: Tests validate threshold detection for above, below, and outside-range conditions. Cooldown period enforcement verified with rapid successive threshold breaches.

**Device Lifecycle**: Integration tests cover provisioning, heartbeat monitoring, offline detection, and decommissioning. Firmware update flow tested with signature verification.

**Data Aggregation**: Tests verify continuous aggregate generation produces correct hourly and daily summaries from raw telemetry data.

**Edge Computing**: Tests validate local aggregation reduces cloud sync volume while maintaining data accuracy within configurable tolerance.

**Command Dispatch**: Tests verify command delivery, timeout handling, and retry logic. Device acknowledgment parsing tested across multiple device models.
