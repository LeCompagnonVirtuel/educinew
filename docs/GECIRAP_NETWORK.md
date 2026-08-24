# GECIRAP — Network & CDN Intelligence

## Intelligent Traffic Management & Content Delivery

---

## 1. Vision

GECIRAP Network provides unified management of networking infrastructure including VPCs, load balancers, CDN distributions, and DNS, with intelligent traffic analysis and anomaly detection.

---

## 2. Network Types

| Type | Description | Use Case |
|------|-------------|----------|
| `VPC` | Virtual Private Cloud | Isolated network environment |
| `SUBNET` | Network subdivision | Tiered architecture |
| `VPN` | Encrypted tunnel | Secure remote access |
| `PEERING` | Network interconnection | Multi-account connectivity |
| `DIRECT_CONNECT` | Dedicated link | High-bandwidth connectivity |

---

## 3. Entity Relationships

```
Network (1) ──── (N) NetworkRoute
Network (1) ──── (N) NetworkHealth
Network (1) ──── (N) TrafficMetric
LoadBalancer (1) ──── (N) Backend
CDNDistribution (1) ──── (N) Origin
CDNDistribution (1) ──── (N) CacheRule
```

---

## 4. Load Balancers

### Algorithms

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| `ROUND_ROBIN` | Equal distribution | Uniform workloads |
| `LEAST_CONNECTIONS` | Fewest active connections | Session-heavy apps |
| `IP_HASH` | Client IP sticky | Stateful apps |
| `LEAST_RESPONSE_TIME` | Fastest backend | Latency-sensitive |
| `WEIGHTED` | Custom weight distribution | Gradual migration |

### Backend Configuration

```json
{
  "backends": [
    { "address": "10.0.1.10", "port": 8080, "weight": 100 },
    { "address": "10.0.1.11", "port": 8080, "weight": 50 }
  ],
  "healthCheck": {
    "path": "/health",
    "interval": 10,
    "timeout": 5,
    "healthyThreshold": 2,
    "unhealthyThreshold": 3
  }
}
```

---

## 5. CDN Distributions

### Distribution Configuration

```json
{
  "name": "static-assets",
  "provider": "cloudflare",
  "origins": [
    { "domain": "cdn.educi.com", "path": "/static" }
  ],
  "cacheRules": [
    { "pattern": "*.js", "ttl": 86400, "type": "immutable" },
    { "pattern": "*.css", "ttl": 86400, "type": "immutable" },
    { "pattern": "*.html", "ttl": 300, "type": "must-revalidate" }
  ],
  "status": "ACTIVE"
}
```

### CDN Status

| Status | Description |
|--------|-------------|
| `ACTIVE` | Serving content |
| `PURGING` | Cache being cleared |
| `INVALIDATING` | Specific entries invalidated |
| `ERROR` | Distribution error |

---

## 6. DNS Management

### DNS Record Types

| Type | Description | Example |
|------|-------------|---------|
| `A` | IPv4 address | `192.0.2.1` |
| `AAAA` | IPv6 address | `2001:db8::1` |
| `CNAME` | Canonical name | `alias.example.com` |
| `MX` | Mail exchange | `mail.example.com` |
| `TXT` | Text record | SPF/DKIM |
| `SRV` | Service record | `_sip._tcp.example.com` |

### DNS Record

```json
{
  "name": "api.educi.com",
  "type": "A",
  "value": "192.0.2.1",
  "ttl": 3600,
  "status": "HEALTHY"
}
```

---

## 7. Network Health

| Metric | Unit | Threshold |
|--------|------|-----------|
| Latency | ms | < 50 excellent, < 100 good |
| Packet Loss | % | < 0.1% excellent, < 1% acceptable |
| Bandwidth | Mbps | Varies by link |

### Health Status

```json
{
  "networkId": "uuid-network",
  "status": "HEALTHY",
  "latency": 12,
  "packetLoss": 0.01,
  "bandwidth": 1000,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

---

## 8. Traffic Metrics

```json
{
  "networkId": "uuid-network",
  "requests": 15000,
  "bytesIn": 104857600,
  "bytesOut": 52428800,
  "errors": 5,
  "latency": 45,
  "timestamp": "2026-01-15T10:30:00Z"
}
```

---

## 9. Traffic Anomaly Detection

### Anomaly Types

| Type | Description |
|------|-------------|
| `SPIKE` | Sudden increase |
| `DROP` | Sudden decrease |
| `PLATEAU` | Sustained flat level |
| `FLUCTUATION` | Rapid oscillation |
| `UNUSUAL_PATTERN` | Novel pattern |

### Detection Settings

| Setting | Value |
|---------|-------|
| Detection interval | 60 seconds |
| Spike threshold | > 3σ from baseline |
| Drop threshold | < 0.3× baseline |
| Min data points | 100 |

---

## 10. Network Routes

```json
{
  "networkId": "uuid-network",
  "destination": "10.0.2.0/24",
  "target": "10.0.1.1",
  "metric": 100,
  "status": "HEALTHY"
}
```

---

## 11. Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `maxNetworksPerSchool` | 20 | Max networks per school |
| `maxRoutesPerNetwork` | 100 | Max routes per network |
| `defaultLBAlgorithm` | round_robin | Default LB algorithm |
| `healthCheckInterval` | 10 | Seconds between checks |
| `dnsProvider` | cloudflare | DNS provider |
| `anomalyDetectionEnabled` | true | Enable traffic analysis |
| `maxTrafficMetricsRetention` | 90 | Days to retain metrics |

### Supported CDN Providers

| Provider | Status |
|----------|--------|
| Cloudflare | Supported |
| Akamai | Supported |
| AWS CloudFront | Supported |
| Azure CDN | Supported |
| Fastly | Supported |
