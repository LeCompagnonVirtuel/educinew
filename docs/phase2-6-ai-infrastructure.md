# Phase 2.6: AI Infrastructure and DevOps

## Overview

Le module AI Infrastructure d'EduCI fournit les fondations techniques pour le déploiement, la gestion et la scalabilité des services IA : orchestration container, gestion de configuration, monitoring infrastructure, et pipelines CI/CD. Il est optimisé pour le contexte ivoirien avec considérations réseau et coûts.

### Capacités

- Déploiement containerisé (Docker/Kubernetes)
- Gestion de configuration centralisée
- Auto-scaling basé sur la demande
- Monitoring et observabilité complets
- CI/CD pour les modèles IA
- Gestion des secrets et clés
- Backup et disaster recovery
- Optimisation réseau Afrique

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│        AI Infrastructure Service             │
├──────────┬──────────┬──────────┬────────────┤
│Container │Config    │Secret    │  CI/CD     │
│ Orch.    │ Manager  │ Manager  │  Pipeline  │
├──────────┴──────────┴──────────┴────────────┤
│              Infrastructure Layer             │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│Docker│K8s   │Redis │PgSQL │S3    │ CDN      │
│      │      │      │      │      │          │
└──────┴──────┴──────┴──────┴──────┴──────────┘
```

### Modèles de données

```typescript
interface AIInfrastructureConfig {
  id: string;
  environment: 'development' | 'staging' | 'production';
  region: string;
  deployment: DeploymentConfig;
  scaling: ScalingConfig;
  monitoring: MonitoringConfig;
  backup: BackupConfig;
  security: SecurityConfig;
  createdAt: string;
  updatedAt: string;
}

interface DeploymentConfig {
  provider: 'docker' | 'kubernetes' | 'aws' | 'gcp' | 'azure' | 'local';
  containers: ContainerConfig[];
  networking: NetworkConfig;
  storage: StorageConfig;
}

interface ContainerConfig {
  name: string;
  image: string;
  tag: string;
  replicas: number;
  resources: {
    cpu: string;
    memory: string;
    gpu?: string;
  };
  environment: Record<string, string>;
  ports: number[];
  healthCheck: HealthCheckConfig;
}

interface HealthCheckConfig {
  path: string;
  interval: number;
  timeout: number;
  retries: number;
  startPeriod: number;
}

interface ScalingConfig {
  autoScaling: boolean;
  minReplicas: number;
  maxReplicas: number;
  targetCpuUtilization: number;
  targetMemoryUtilization: number;
  scaleUpCooldown: number;
  scaleDownCooldown: number;
  metrics: ScalingMetric[];
}

interface ScalingMetric {
  type: 'cpu' | 'memory' | 'requests' | 'custom';
  target: number;
  window: number;
}

interface NetworkConfig {
  loadBalancer: boolean;
  ssl: boolean;
  cdn: boolean;
  rateLimit: RateLimitConfig;
  firewall: FirewallRule[];
}

interface RateLimitConfig {
  enabled: boolean;
  requestsPerMinute: number;
  burstSize: number;
}

interface FirewallRule {
  name: string;
  action: 'allow' | 'deny';
  protocol: string;
  port: number;
  source?: string;
}

interface StorageConfig {
  type: 'local' | 's3' | 'gcs' | 'azure_blob';
  bucket?: string;
  region?: string;
  encryption: boolean;
  versioning: boolean;
  lifecycle: LifecycleRule[];
}

interface LifecycleRule {
  name: string;
  conditions: Record<string, unknown>;
  actions: string[];
}

interface MonitoringConfig {
  enabled: boolean;
  provider: 'prometheus' | 'datadog' | 'grafana' | 'local';
  metrics: MetricsConfig;
  logging: LoggingConfig;
  tracing: TracingConfig;
  alerting: AlertingConfig;
}

interface MetricsConfig {
  enabled: boolean;
  scrapeInterval: number;
  retentionDays: number;
  dashboards: DashboardConfig[];
}

interface DashboardConfig {
  name: string;
  panels: PanelConfig[];
}

interface PanelConfig {
  title: string;
  type: string;
  query: string;
  position: { x: number; y: number; w: number; h: number };
}

interface LoggingConfig {
  enabled: boolean;
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'text';
  output: 'stdout' | 'file' | 'elasticsearch';
  retentionDays: number;
}

interface TracingConfig {
  enabled: boolean;
  provider: 'jaeger' | 'zipkin' | 'opentelemetry';
  sampleRate: number;
  endpoint: string;
}

interface AlertingConfig {
  enabled: boolean;
  channels: AlertChannel[];
  rules: AlertRule[];
}

interface AlertChannel {
  type: 'email' | 'slack' | 'webhook' | 'sms';
  config: Record<string, unknown>;
}

interface AlertRule {
  name: string;
  condition: string;
  severity: 'info' | 'warning' | 'critical';
  cooldown: number;
  actions: string[];
}

interface BackupConfig {
  enabled: boolean;
  schedule: string;
  retention: number;
  storage: string;
  encryption: boolean;
  verification: boolean;
}

interface SecurityConfig {
  tls: boolean;
  authentication: AuthConfig;
  authorization: AuthzConfig;
  audit: AuditConfig;
  compliance: ComplianceConfig;
}

interface AuthConfig {
  provider: 'jwt' | 'oauth2' | 'api_key';
  tokenExpiry: number;
  refreshEnabled: boolean;
  mfaEnabled: boolean;
}

interface AuthzConfig {
  provider: 'rbac' | 'abac';
  defaultRole: string;
  roles: RoleConfig[];
}

interface RoleConfig {
  name: string;
  permissions: string[];
}

interface AuditConfig {
  enabled: boolean;
  events: string[];
  retention: number;
}

interface ComplianceConfig {
  standards: string[];
  enabled: boolean;
}
```

## Configuration

### Déploiement

```typescript
import { AI_INFRASTRUCTURE_CONFIG } from '@educi/config';

const infraConfig = AI_INFRASTRUCTURE_CONFIG;
/*
{
  environment: "production",
  region: "afrique-ouest",
  deployment: {
    provider: "kubernetes",
    namespace: "educi-ai",
    containers: [
      {
        name: "ai-api",
        image: "educi/ai-api",
        tag: "latest",
        replicas: 3,
        resources: { cpu: "500m", memory: "512Mi" },
        ports: [3000],
      },
      {
        name: "ai-worker",
        image: "educi/ai-worker",
        tag: "latest",
        replicas: 2,
        resources: { cpu: "1000m", memory: "1Gi", gpu: "1" },
        ports: [],
      },
    ],
    networking: {
      loadBalancer: true,
      ssl: true,
      cdn: true,
      rateLimit: {
        enabled: true,
        requestsPerMinute: 1000,
        burstSize: 100,
      },
    },
    storage: {
      type: "s3",
      bucket: "educi-ai-data",
      region: "eu-west-1",
      encryption: true,
      versioning: true,
    },
  },
  scaling: {
    autoScaling: true,
    minReplicas: 2,
    maxReplicas: 10,
    targetCpuUtilization: 70,
    targetMemoryUtilization: 80,
    scaleUpCooldown: 60,
    scaleDownCooldown: 300,
  },
}
*/
```

### Monitoring

```typescript
const monitoringConfig = AI_INFRASTRUCTURE_CONFIG.monitoring;
/*
{
  enabled: true,
  provider: "prometheus",
  metrics: {
    enabled: true,
    scrapeInterval: 15,
    retentionDays: 30,
  },
  logging: {
    enabled: true,
    level: "info",
    format: "json",
    output: "elasticsearch",
    retentionDays: 90,
  },
  tracing: {
    enabled: true,
    provider: "jaeger",
    sampleRate: 0.1,
  },
  alerting: {
    enabled: true,
    channels: [
      { type: "slack", config: { webhook: "https://hooks.slack.com/..." } },
      { type: "email", config: { to: ["ops@educi.ci"] } },
    ],
    rules: [
      {
        name: "API Down",
        condition: "up{job='ai-api'} == 0",
        severity: "critical",
        cooldown: 60,
      },
      {
        name: "High Latency",
        condition: "http_request_duration_seconds{quantile='0.99'} > 2",
        severity: "warning",
        cooldown: 300,
      },
    ],
  },
}
*/
```

### Backup

```typescript
const backupConfig = AI_INFRASTRUCTURE_CONFIG.backup;
/*
{
  enabled: true,
  schedule: "0 2 * * *", // Chaque jour à 2h
  retention: 30,
  storage: "s3",
  encryption: true,
  verification: true,
  types: [
    { name: "database", tables: ["*"], schedule: "0 2 * * *" },
    { name: "files", paths: ["/data/uploads"], schedule: "0 3 * * *" },
    { name: "config", paths: ["/config"], schedule: "0 4 * * 0" },
  ],
}
*/
```

### CI/CD

```typescript
const cicdConfig = AI_INFRASTRUCTURE_CONFIG.cicd;
/*
{
  provider: "github_actions",
  pipelines: [
    {
      name: "ai-model-deployment",
      trigger: { type: "push", branches: ["main"] },
      stages: [
        { name: "test", command: "npm test" },
        { name: "lint", command: "npm run lint" },
        { name: "build", command: "docker build" },
        { name: "push", command: "docker push" },
        { name: "deploy", command: "kubectl apply" },
      ],
      environments: ["staging", "production"],
    },
  ],
  secrets: {
    provider: "vault",
    rotation: 90,
  },
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/infra/status` | État de l'infrastructure | ADMIN |
| GET | `/api/ai/infra/health` | Health check global | Tous |
| GET | `/api/ai/infra/metrics` | Métriques système | ADMIN |
| GET | `/api/ai/infra/logs` | Logs système | ADMIN |
| GET | `/api/ai/infra/containers` | État des containers | ADMIN |
| POST | `/api/ai/infra/containers/:name/restart` | Redémarrer un container | SUPER_ADMIN |
| GET | `/api/ai/infra/deployments` | Déploiements | ADMIN |
| POST | `/api/ai/infra/deployments` | Créer un déploiement | SUPER_ADMIN |
| GET | `/api/ai/infra/backups` | Liste des backups | ADMIN |
| POST | `/api/ai/infra/backups` | Créer un backup | ADMIN |
| POST | `/api/ai/infra/backups/:id/restore` | Restaurer un backup | SUPER_ADMIN |
| GET | `/api/ai/infra/secrets` | Liste des secrets | SUPER_ADMIN |
| POST | `/api/ai/infra/secrets` | Créer un secret | SUPER_ADMIN |
| GET | `/api/ai/infra/alerts` | Alertes actives | ADMIN |
| POST | `/api/ai/infra/alerts/:id/acknowledge` | Accuser réception | ADMIN |

### Exemples de requêtes

#### Vérifier l'état

```typescript
const status = await fetch('/api/ai/infra/status', {
  headers: { 'Authorization': `Bearer ${token}` },
});

const result = await status.json();
// {
//   environment: "production",
//   uptime: 2592000,
//   version: "2.6.0",
//   services: {
//     "ai-api": { status: "healthy", replicas: 3, cpu: "45%", memory: "60%" },
//     "ai-worker": { status: "healthy", replicas: 2, cpu: "70%", memory: "75%" },
//     "redis": { status: "healthy", connections: 150 },
//     "postgres": { status: "healthy", connections: 50, size: "15GB" },
//   },
//   lastBackup: "2025-01-15T02:00:00Z",
//   alerts: 0
// }
```

#### Consulter les métriques

```typescript
const metrics = await fetch('/api/ai/infra/metrics?range=24h', {
  headers: { 'Authorization': `Bearer ${token}` },
});

const result = await metrics.json();
// {
//   requests: { total: 150000, perMinute: 104 },
//   latency: { p50: 150, p95: 500, p99: 1200 },
//   errors: { rate: 0.02, total: 3000 },
//   resources: {
//     cpu: { average: 45, peak: 80 },
//     memory: { average: 60, peak: 85 },
//     storage: { used: "15GB", total: "100GB" },
//   },
//   ai: {
//     tokens: { input: 5000000, output: 2000000 },
//     cost: { total: 1500000, currency: "XOF" },
//     models: { "gpt-4o-mini": 60, "gpt-4o": 25, "claude-3-haiku": 15 },
//   }
// }
```

#### Gérer les secrets

```typescript
// Créer un secret
const secret = await fetch('/api/ai/infra/secrets', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: 'openai_api_key',
    value: 'sk-...',
    type: 'api_key',
    rotation: 90,
  }),
});

// Lister les secrets
const secrets = await fetch('/api/ai/infra/secrets', {
  headers: { 'Authorization': `Bearer ${token}` },
});
// [{ name: "openai_api_key", type: "api_key", lastRotated: "2025-01-01", expiresAt: "2025-04-01" }]
```

## Usage Examples

### Exemple 1 : Monitoring personnalisé

```typescript
class InfrastructureMonitor {
  async getHealthDashboard(): Promise<HealthDashboard> {
    const [containers, metrics, alerts] = await Promise.all([
      this.getContainerStatus(),
      this.getMetrics('1h'),
      this.getActiveAlerts(),
    ]);

    return {
      overall: this.calculateOverallHealth(containers, metrics, alerts),
      containers,
      metrics,
      alerts,
      recommendations: await this.generateRecommendations(containers, metrics),
    };
  }

  private calculateOverallHealth(
    containers: ContainerStatus[],
    metrics: Metrics,
    alerts: Alert[]
  ): 'healthy' | 'degraded' | 'unhealthy' {
    const allHealthy = containers.every(c => c.status === 'healthy');
    const noCriticalAlerts = !alerts.some(a => a.severity === 'critical');
    const metricsOk = metrics.latency.p99 < 2000 && metrics.errors.rate < 0.05;

    if (allHealthy && noCriticalAlerts && metricsOk) return 'healthy';
    if (!allHealthy || !noCriticalAlerts) return 'unhealthy';
    return 'degraded';
  }
}
```

### Exemple 2 : CI/CD Pipeline

```typescript
class CICDPipeline {
  async deploy(version: string, environment: string): Promise<Deployment> {
    // 1. Lancer les tests
    await this.runTests();

    // 2. Build l'image Docker
    await this.buildImage(version);

    // 3. Push vers le registry
    await this.pushImage(version);

    // 4. Déployer sur Kubernetes
    await this.deployToK8s(version, environment);

    // 5. Vérifier la santé
    await this.verifyHealth(environment);

    return {
      version,
      environment,
      status: 'deployed',
      timestamp: new Date(),
    };
  }
}
```

### Exemple 3 : Backup automatisé

```typescript
class BackupManager {
  async createBackup(type: string): Promise<Backup> {
    const backup = {
      id: `backup-${Date.now()}`,
      type,
      status: 'in_progress',
      startedAt: new Date(),
    };

    try {
      // Exécuter le backup
      const data = await this.executeBackup(type);

      // Chiffrer
      const encrypted = await this.encrypt(data);

      // Stocker
      const location = await this.store(encrypted, type);

      // Vérifier
      await this.verify(location);

      backup.status = 'completed';
      backup.location = location;
      backup.size = data.length;
      backup.completedAt = new Date();
    } catch (error) {
      backup.status = 'failed';
      backup.error = error.message;
      await this.notifyAdmin(backup);
    }

    return backup;
  }

  async restore(backupId: string): Promise<void> {
    // Récupérer le backup
    const backup = await this.getBackup(backupId);
    if (!backup) throw new Error('Backup not found');

    // Déchiffrer
    const data = await this.decrypt(backup.location);

    // Restaurer
    await this.restoreData(data, backup.type);

    // Vérifier
    await this.verifyIntegrity();
  }
}
```

## Best Practices

### Déploiement

1. **Blue-green deployment** : Zéro downtime
2. **Canary releases** : Déploiement progressif
3. **Rollback rapide** : Toujours pouvoir revenir en arrière
4. **Health checks** : Vérifier avant de router le trafic
5. **Resource limits** : Toujours définir les limites

### Monitoring

```typescript
// Bon : Métriques complètes
const metrics = {
  business: ['active_users', 'sessions', 'cost'],
  technical: ['latency', 'errors', 'throughput'],
  infrastructure: ['cpu', 'memory', 'disk', 'network'],
};

// Bon : Alerting adapté
const alerts = [
  { name: 'critical', threshold: 0.01, action: 'page' },
  { name: 'warning', threshold: 0.05, action: 'slack' },
  { name: 'info', threshold: 0.1, action: 'log' },
];
```

### Sécurité

```typescript
// Bon : Secrets en vault
const secrets = {
  provider: 'vault',
  rotation: 90,
  encryption: 'aes-256',
};

// Bon : TLS partout
const tls = {
  minVersion: '1.2',
  cipherSuites: ['TLS_AES_256_GCM_SHA384'],
};

// Bon : Rate limiting
const rateLimit = {
  global: 1000,
  perUser: 30,
  perIP: 100,
};
```

## Security Considerations

- Chiffrement au repos et en transit
- Gestion centralisée des secrets
- Audit trail complet
- Isolation réseau (VPC, subnets)
- WAF (Web Application Firewall)
- DDoS protection
- Conformité SOC2, ISO27001
- Penetration testing régulier

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `infra_cpu_usage` | Gauge | Utilisation CPU |
| `infra_memory_usage` | Gauge | Utilisation mémoire |
| `infra_disk_usage` | Gauge | Utilisation disque |
| `infra_network_bytes` | Counter | Trafic réseau |
| `infra_container_restarts` | Counter | Redémarrages containers |
| `infra_deployment_count` | Counter | Déploiements |
| `infra_backup_size` | Gauge | Taille des backups |
| `infra_alert_total` | Counter | Alertes générées |

### Alertes

```typescript
const infraAlerts = [
  {
    name: 'CPU élevé',
    condition: 'infra_cpu_usage > 80',
    severity: 'warning',
    action: 'scale_up',
  },
  {
    name: 'Disque presque plein',
    condition: 'infra_disk_usage > 90',
    severity: 'critical',
    action: 'cleanup',
  },
  {
    name: 'Container en crash',
    condition: 'infra_container_restarts > 3',
    severity: 'critical',
    action: 'investigate',
  },
  {
    name: 'Backup échoué',
    condition: 'infra_backup_status == failed',
    severity: 'high',
    action: 'retry_and_notify',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiInfraHealthError` | 503 | Service indisponible | Vérifier les containers |
| `AiInfraScalingError` | 500 | Erreur de scaling | Vérifier les métriques |
| `AiInfraDeployError` | 500 | Erreur de déploiement | Rollback |
| `AiInfraBackupError` | 500 | Erreur de backup | Vérifier l'espace |
| `AiInfraSecretError` | 403 | Secret invalide | Vérifier les accès |
| `AiInfraAlertError` | 500 | Erreur d'alerte | Vérifier la config |

## Changelog

### Version 2.6.0

- Déploiement containerisé complet
- Auto-scaling intelligent
- Monitoring et observabilité
- CI/CD pour modèles IA
- Gestion des secrets
- Backup automatisé
- Optimisation réseau Afrique
- Support multi-environnement
