# Environnement Documentation

## Executive Summary

The Environment module monitors and manages campus environmental conditions including air quality, temperature, humidity, noise levels, lighting, and energy consumption. It provides real-time dashboards, automated alerts, and sustainability reporting to support healthy learning environments and energy efficiency goals.

The system aggregates data from IoT sensors distributed across campus, calculates environmental scores per room and building, and triggers automated responses such as HVAC adjustments when conditions deviate from targets. It tracks energy consumption against sustainability goals and generates compliance reports.

Environmental monitoring ensures student and staff well-being through proactive air quality management, reduces energy costs by 20% through optimized consumption patterns, and supports institutional sustainability commitments with verifiable metrics.

## Architecture Overview

```
┌──────────────────────────────────────────┐
│        Environment Service               │
├──────────┬──────────┬────────────────────┤
│ Air      │ Energy   │  Sustainability    │
│ Quality  │ Monitor  │  Tracker           │
├──────────┴──────────┴────────────────────┤
│    IoT Sensor Data Aggregation           │
│    (Temperature, Humidity, CO2, PM2.5)   │
├──────────────────────────────────────────┤
│    HVAC / Lighting Control Integration   │
├──────────────────────────────────────────┤
│     TimescaleDB (Environmental Data)     │
│     PostgreSQL (Configuration)           │
└──────────────────────────────────────────┘
```

Air Quality Engine computes indoor air quality indices from multiple sensor readings. Energy Monitor tracks consumption in real-time against budgets. Sustainability Tracker calculates carbon footprint and waste metrics for institutional reporting.

## Entity Relationships

### EnvironmentalZone

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| name | VARCHAR(100) | Zone name |
| zone_type | ENUM | `classroom`, `office`, `common_area`, `outdoor` |
| building_id | UUID | FK to building (nullable) |
| floor_id | UUID | FK to floor (nullable) |
| target_temperature_min | DECIMAL(4,1) | Minimum comfortable temp |
| target_temperature_max | DECIMAL(4,1) | Maximum comfortable temp |
| target_humidity_min | DECIMAL(4,1) | Minimum humidity % |
| target_humidity_max | DECIMAL(4,1) | Maximum humidity % |
| target_co2_max | INTEGER | Max CO2 ppm |

### SensorReading

| Field | Type | Description |
|-------|------|-------------|
| time | TIMESTAMPTZ | Timestamp (TimescaleDB) |
| sensor_id | UUID | FK to iot_device |
| zone_id | UUID | FK to environmental_zone |
| parameter | ENUM | `temperature`, `humidity`, `co2`, `pm25`, `pm10`, `noise`, `light`, `voc` |
| value | DECIMAL(10,4) | Measured value |
| unit | VARCHAR(10) | Measurement unit |
| quality | ENUM | `good`, `moderate`, `poor`, `very_poor` |

### AirQualityIndex

| Field | Type | Description |
|-------|------|-------------|
| time | TIMESTAMPTZ | Timestamp (TimescaleDB) |
| zone_id | UUID | FK to environmental_zone |
| aqi_value | INTEGER | Computed AQI (0-500) |
| rating | ENUM | `good`, `moderate`, `unhealthy_sensitive`, `unhealthy`, `very_unhealthy` |
| dominant_pollutant | VARCHAR(20) | Primary factor |
| recommendation | TEXT | Action suggestion |

### EnergyMeter

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| meter_number | VARCHAR(50) | Unique identifier |
| meter_type | ENUM | `electricity`, `gas`, `water`, `solar` |
| location | VARCHAR(100) | Meter location |
| capacity_kw | DECIMAL(10,2) | Maximum capacity |
| iot_device_id | UUID | FK to iot_device |
| installation_date | DATE | When installed |

### EnergyReading

| Field | Type | Description |
|-------|------|-------------|
| time | TIMESTAMPTZ | Timestamp (TimescaleDB) |
| meter_id | UUID | FK to energy_meter |
| consumption_kwh | DECIMAL(12,6) | Energy consumed |
| demand_kw | DECIMAL(10,4) | Current demand |
| cost | DECIMAL(10,4) | Running cost |

### EnvironmentalAlert

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| zone_id | UUID | FK to environmental_zone |
| alert_type | ENUM | `high_temperature`, `low_temperature`, `high_co2`, `high_humidity`, `low_humidity`, `high_noise`, `poor_air_quality` |
| severity | ENUM | `info`, `warning`, `critical` |
| triggered_at | TIMESTAMP | When triggered |
| resolved_at | TIMESTAMP | When resolved |
| current_value | DECIMAL(10,4) | Value that triggered |
| threshold_value | DECIMAL(10,4) | Threshold exceeded |
| auto_action_taken | TEXT | Automated response |

### SustainabilityTarget

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| campus_id | UUID | FK to campus |
| metric_type | ENUM | `energy_reduction`, `water_reduction`, `waste_diversion`, `carbon_neutral` |
| target_value | DECIMAL(12,4) | Goal value |
| target_unit | VARCHAR(20) | Unit of measure |
| baseline_year | INTEGER | Reference year |
| target_year | INTEGER | Goal year |
| current_value | DECIMAL(12,4) | Current progress |

## API Endpoint Reference

| Method | Endpoint | Description | Auth Role |
|--------|----------|-------------|-----------|
| GET | `/api/v1/environment/zones` | List environmental zones | admin, facilities |
| POST | `/api/v1/environment/zones` | Create zone | admin |
| GET | `/api/v1/environment/zones/:id` | Zone details | admin, facilities |
| GET | `/api/v1/environment/readings` | Recent readings | admin, facilities |
| GET | `/api/v1/environment/readings/zone/:id` | Zone readings | admin, facilities |
| GET | `/api/v1/environment/aqi` | Current AQI dashboard | all |
| GET | `/api/v1/environment/aqi/zone/:id` | Zone AQI detail | all |
| GET | `/api/v1/environment/energy` | Energy consumption summary | admin |
| GET | `/api/v1/environment/energy/meters/:id` | Meter readings | admin, facilities |
| GET | `/api/v1/environment/energy/trends` | Consumption trends | admin |
| GET | `/api/v1/environment/alerts` | Active alerts | admin, facilities |
| PUT | `/api/v1/environment/alerts/:id/resolve` | Resolve alert | facilities |
| GET | `/api/v1/environment/sustainability` | Sustainability dashboard | admin |
| GET | `/api/v1/environment/sustainability/report` | Compliance report | admin |
| POST | `/api/v1/environment/targets` | Set sustainability target | admin |
| GET | `/api/v1/environment/compare` | Zone comparison | admin |

## Configuration Reference

```yaml
environment:
  air_quality:
    aqi_calculation_method: "epa"
    polling_interval_seconds: 60
    averaging_window_minutes: 15
    alert_thresholds:
      co2_warning: 1000
      co2_critical: 1500
      pm25_warning: 35
      pm25_critical: 55
      temperature_high: 26
      temperature_low: 18
      humidity_high: 60
      humidity_low: 30

  energy:
    meter_read_interval_minutes: 15
    cost_calculation_enabled: true
    peak_demand_tracking: true
    solar_monitoring: true
    budget_alert_threshold_percent: 90

  automation:
    hvac_adjustment_enabled: true
    lighting_auto_dim: true
    ventilation_boost_on_high_co2: true
    night_setback_enabled: true

  sustainability:
    carbon_factor_electricity: 0.05
    carbon_factor_gas: 0.2
    waste_diversion_target: 0.8
    reporting_frequency: "quarterly"

  retention:
    raw_data_days: 365
    hourly_averages_years: 5
    daily_averages_years: 10
    alert_logs_years: 3
```

## Security Considerations

- Environmental data accessible to all campus members via public dashboards
- Zone configuration modifications restricted to admin and facilities roles
- Energy meter data shared with sustainability auditors via secure export
- HVAC control commands require `environment:control` permission
- Sensor calibration records maintained for regulatory compliance
- Automated actions logged with trigger condition and timestamp
- Sustainability reports digitally signed for external verification
- Privacy: no individual behavior tracking through environmental sensors

## Mobile App Features

| Feature | Description |
|---------|-------------|
| Air Quality Map | Color-coded campus air quality display |
| Temperature View | Room-by-room temperature readings |
| Energy Dashboard | Real-time energy consumption and cost |
| Comfort Report | Submit comfort feedback for zone |
| Sustainability | Personal sustainability tips and campus stats |
| Alerts | Environmental alerts for subscribed zones |
| Historical Charts | View trends over hours, days, months |
| Compare Zones | Side-by-side environmental comparison |

## Testing Strategy

**AQI Calculation**: Tests validate AQI computation against EPA reference algorithm using known input/output datasets. Edge cases include sensor failures and out-of-range readings.

**Alert Evaluation**: Tests verify threshold detection across all parameters and correct severity assignment. Cooldown period enforcement tested with rapid value fluctuations.

**Energy Aggregation**: Tests validate hourly and daily energy consumption aggregation from 15-minute meter readings. Rounding errors verified within tolerance.

**Automation Actions**: Integration tests simulate HVAC adjustment triggers and verify control commands sent correctly. Override capability tested for manual intervention.

**Sustainability Calculations**: Tests verify carbon footprint calculation using correct emission factors. Year-over-year comparison validated against baseline data.

**Data Retention**: Tests validate automatic data lifecycle management: raw data after 365 days archived, hourly averages retained 5 years, daily averages retained 10 years.
