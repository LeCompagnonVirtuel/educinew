# GECIRAP — FinOps & Cloud Economic Intelligence

## Cost Visibility, Optimization & Financial Governance

---

## 1. Vision

GECIRAP FinOps provides complete cloud financial management with cost tracking, budgeting, forecasting, anomaly detection, and optimization recommendations — enabling educational institutions to maximize cloud value while controlling costs.

---

## 2. Cost Tracking

### Cost Record Structure

```json
{
  "providerId": "uuid-provider",
  "accountId": "uuid-account",
  "service": "EC2",
  "region": "us-east-1",
  "amount": 1250.50,
  "currency": "USD",
  "period": "MONTHLY",
  "tags": {
    "environment": "production",
    "department": "it",
    "project": "sis"
  }
}
```

### Cost Periods

| Period | Description |
|--------|-------------|
| `HOURLY` | Per-hour tracking |
| `DAILY` | Per-day aggregation |
| `WEEKLY` | Per-week aggregation |
| `MONTHLY` | Per-month aggregation |
| `QUARTERLY` | Per-quarter aggregation |
| `YEARLY` | Per-year aggregation |

---

## 3. Cost Allocation

### Allocation Structure

```json
{
  "costId": "uuid-cost",
  "school": "École Primaire Abidjan",
  "module": "Student Information System",
  "department": "IT",
  "percentage": 45,
  "amount": 562.73
}
```

### Allocation Dimensions

| Dimension | Description |
|-----------|-------------|
| `school` | Educational institution |
| `module` | EduCI module |
| `department` | Organizational unit |
| `project` | Initiative or project |
| `environment` | Deployment environment |

---

## 4. Cost Centers

```json
{
  "name": "IT Infrastructure",
  "budget": 10000,
  "spent": 7500,
  "forecast": 9200,
  "status": "ON_TRACK"
}
```

### Budget Status

| Status | Description |
|--------|-------------|
| `ON_TRACK` | Within budget |
| `AT_RISK` | Approaching threshold |
| `EXCEEDED` | Over budget |
| `FORECAST_EXCEED` | Forecast exceeds budget |

---

## 5. Budget Management

### Budget Configuration

```json
{
  "name": "Monthly Cloud Budget",
  "amount": 5000,
  "period": "MONTHLY",
  "spent": 3200,
  "forecast": 4800,
  "alertThreshold": 80,
  "status": "ON_TRACK"
}
```

### Alert Thresholds

| Threshold | Alert Type |
|-----------|------------|
| 50% | Informational |
| 75% | Warning |
| 90% | Critical |
| 100% | Emergency |

---

## 6. Cost Forecasting

### Forecast Models

| Model | Description | Use Case |
|-------|-------------|----------|
| `LINEAR` | Linear regression | Steady growth |
| `POLYNOMIAL` | Polynomial regression | Variable growth |
| `ARIMA` | Time series | Seasonal patterns |
| `LSTM` | Neural network | Complex patterns |
| `PROPHET` | Facebook Prophet | Business metrics |

### Forecast Output

```json
{
  "service": "EC2",
  "forecast": [
    { "date": "2026-01-16", "amount": 42.50 },
    { "date": "2026-01-17", "amount": 43.10 },
    { "date": "2026-01-18", "amount": 44.20 }
  ],
  "model": "LSTM",
  "confidence": 0.92,
  "period": "DAILY"
}
```

---

## 7. Cost Anomaly Detection

### Anomaly Types

| Type | Description |
|------|-------------|
| `COST_SPIKE` | Unexpected cost increase |
| `COST_DROP` | Unexpected cost decrease |
| `USAGE_SPIKE` | Unexpected usage increase |
| `USAGE_DROP` | Unexpected usage decrease |
| `NEW_SERVICE` | New service detected |
| `UNUSUAL_PATTERN` | Novel pattern |

### Anomaly Output

```json
{
  "service": "EC2",
  "amount": 2500,
  "expectedAmount": 1200,
  "deviation": 108,
  "type": "COST_SPIKE",
  "severity": "CRITICAL",
  "detectedAt": "2026-01-15T10:30:00Z",
  "acknowledged": false
}
```

### Detection Threshold

| Setting | Default |
|---------|---------|
| Anomaly threshold | 20% deviation |

---

## 8. Optimization Recommendations

### Optimization Types

| Type | Description | Typical Savings |
|------|-------------|-----------------|
| `RIGHTSIZING` | Right-size instances | 20-40% |
| `RESERVED_CAPACITY` | Purchase reservations | 30-60% |
| `SPOT_INSTANCES` | Use spot instances | 60-90% |
| `STORAGE_TIERING` | Move to cheaper storage | 40-70% |
| `NETWORK_OPTIMIZATION` | Reduce data transfer | 10-30% |
| `IDLE_RESOURCE` | Remove idle resources | 100% |

### Recommendation Output

```json
{
  "type": "RIGHTSIZING",
  "service": "EC2",
  "currentCost": 500,
  "optimizedCost": 300,
  "savings": 200,
  "effort": "Low",
  "risk": "LOW",
  "implemented": false
}
```

---

## 9. Reserved Capacity

### Commitment Types

| Type | Discount | Term |
|------|----------|------|
| `ON_DEMAND` | 0% | None |
| `RESERVED_1Y` | 30-40% | 1 year |
| `RESERVED_3Y` | 50-60% | 3 years |
| `SPOT` | 60-90% | None |
| `SAVINGS_PLAN` | 20-40% | 1-3 years |

### Reserved Capacity Tracking

```json
{
  "providerId": "uuid-provider",
  "service": "EC2",
  "type": "RESERVED_1Y",
  "quantity": 10,
  "term": 12,
  "utilization": 85,
  "cost": 12000,
  "savings": 4000,
  "expiresAt": "2027-01-01T00:00:00Z"
}
```

---

## 10. Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `costRetentionDays` | 365 | Cost data retention |
| `maxCostCentersPerSchool` | 50 | Max cost centers |
| `maxBudgetsPerSchool` | 100 | Max budgets |
| `anomalyDetectionEnabled` | true | Enable anomaly detection |
| `anomalyThresholdPercent` | 20 | Anomaly detection threshold |
| `forecastModelEnabled` | true | Enable forecasting |
| `optimizationRecommendationsEnabled` | true | Enable optimization |
| `maxReservedCapacities` | 50 | Max reservations |
| `budgetAlertThresholds` | [50, 75, 90, 100] | Alert thresholds % |
| `costAllocationGranularity` | daily | Allocation granularity |
