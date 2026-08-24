# Phase 2.7 LXP Deployment Documentation

## Executive Summary

The EduCI LXP deployment infrastructure supports continuous delivery across multiple environments with automated testing, containerization, and orchestration. This documentation covers deployment processes, environment setup, monitoring, and production best practices.

---

## Deployment Architecture

### Deployment Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    Deployment Pipeline                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Development                           │    │
│  │  - Local development                                     │    │
│  │  - Feature branches                                      │    │
│  │  - Pull requests                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    CI Pipeline                            │    │
│  │  - Lint & format                                         │    │
│  │  - Unit tests                                            │    │
│  │  - Integration tests                                     │    │
│  │  - Build                                                 │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Staging                                │    │
│  │  - Deploy to staging                                     │    │
│  │  - E2E tests                                             │    │
│  │  - Performance tests                                     │    │
│  │  - Security scan                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Production                             │    │
│  │  - Blue/green deployment                                 │    │
│  │  - Canary release                                        │    │
│  │  - Rollback capability                                   │    │
│  │  - Monitoring                                            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Environment Configuration

### Environment Variables

```bash
# .env.development
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
WEB_URL=http://localhost:3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=educi_lxp_dev
DB_USER=postgres
DB_PASSWORD=dev_password
DB_SSL=false

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Authentication
JWT_SECRET=dev_jwt_secret_min_32_chars_long_enough
JWT_ACCESS_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Storage
STORAGE_PROVIDER=local
LOCAL_STORAGE_PATH=./uploads

# Email
EMAIL_PROVIDER=smtp
SMTP_HOST=localhost
SMTP_PORT=1025

# Logging
LOG_LEVEL=debug
LOG_FORMAT=text

# Feature Flags
FEATURE_REGISTRATION=true
FEATURE_AI=true
FEATURE_ANALYTICS=true
```

```bash
# .env.staging
NODE_ENV=staging
PORT=3000
API_URL=https://staging-api.educi.com
WEB_URL=https://staging.educi.com

# Database
DB_HOST=staging-db.educi.com
DB_PORT=5432
DB_NAME=educi_lxp_staging
DB_USER=educi_staging
DB_PASSWORD=${DB_PASSWORD}
DB_SSL=true

# Redis
REDIS_HOST=staging-redis.educi.com
REDIS_PORT=6379
REDIS_PASSWORD=${REDIS_PASSWORD}

# Authentication
JWT_SECRET=${JWT_SECRET}
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Storage
STORAGE_PROVIDER=s3
S3_BUCKET=educi-staging-uploads
S3_REGION=us-east-1

# Email
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=${SENDGRID_API_KEY}

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

```bash
# .env.production
NODE_ENV=production
PORT=3000
API_URL=https://api.educi.com
WEB_URL=https://educi.com

# Database
DB_HOST=production-db.educi.com
DB_PORT=5432
DB_NAME=educi_lxp_production
DB_USER=educi_production
DB_PASSWORD=${DB_PASSWORD}
DB_SSL=true

# Redis
REDIS_HOST=production-redis.educi.com
REDIS_PORT=6379
REDIS_PASSWORD=${REDIS_PASSWORD}

# Authentication
JWT_SECRET=${JWT_SECRET}
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Storage
STORAGE_PROVIDER=s3
S3_BUCKET=educi-production-uploads
S3_REGION=us-east-1

# Email
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=${SENDGRID_API_KEY}

# Logging
LOG_LEVEL=warn
LOG_FORMAT=json

# Monitoring
SENTRY_DSN=${SENTRY_DSN}
PROMETHEUS_ENABLED=true
```

---

## Docker Configuration

### Dockerfile

```dockerfile
# Dockerfile

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S educi -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=educi:nodejs /app/dist ./dist
COPY --from=builder --chown=educi:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=educi:nodejs /app/prisma ./prisma
COPY --from=builder --chown=educi:nodejs /app/package.json ./

# Switch to non-root user
USER educi

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["dumb-init", "node", "dist/index.js"]
```

### Docker Compose

```yaml
# docker-compose.yml

version: '3.8'

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/educi_lxp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./uploads:/app/uploads
    networks:
      - educi-network

  web:
    build:
      context: ./web
      dockerfile: Dockerfile
    ports:
      - '3001:3000'
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3000
    depends_on:
      - api
    networks:
      - educi-network

  mobile-api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3002:3000'
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/educi_lxp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - educi-network

  db:
    image: postgres:16-alpine
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=educi_lxp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - educi-network

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - educi-network

  minio:
    image: minio/minio
    ports:
      - '9000:9000'
      - '9001:9001'
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio_data:/data
    command: server /data --console-address ':9001'
    networks:
      - educi-network

  mailhog:
    image: mailhog/mailhog
    ports:
      - '1025:1025'
      - '8025:8025'
    networks:
      - educi-network

volumes:
  postgres_data:
  redis_data:
  minio_data:

networks:
  educi-network:
    driver: bridge
```

---

## Kubernetes Configuration

### Deployment Manifest

```yaml
# k8s/deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: educi-api
  namespace: educi
  labels:
    app: educi-api
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: educi-api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: educi-api
        version: v1
    spec:
      containers:
        - name: api
          image: educi/api:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: educi-secrets
                  key: database-url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: educi-secrets
                  key: redis-url
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: educi-secrets
                  key: jwt-secret
          resources:
            requests:
              memory: '256Mi'
              cpu: '250m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
          lifecycle:
            preStop:
              exec:
                command: ['/bin/sh', '-c', 'sleep 10']
      terminationGracePeriodSeconds: 30
```

### Service Manifest

```yaml
# k8s/service.yaml

apiVersion: v1
kind: Service
metadata:
  name: educi-api
  namespace: educi
  labels:
    app: educi-api
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
      name: http
  selector:
    app: educi-api
```

### Ingress Manifest

```yaml
# k8s/ingress.yaml

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: educi-api
  namespace: educi
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: 'true'
    nginx.ingress.kubernetes.io/proxy-body-size: '100m'
    nginx.ingress.kubernetes.io/rate-limit: '100'
    nginx.ingress.kubernetes.io/rate-limit-window: '1m'
spec:
  tls:
    - hosts:
        - api.educi.com
      secretName: educi-api-tls
  rules:
    - host: api.educi.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: educi-api
                port:
                  number: 80
```

---

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  test:
    runs-on: ubuntu-latest
    needs: lint
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: educi_lxp_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm test
      - run: npm run test:integration
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist/

  e2e:
    runs-on: ubuntu-latest
    needs: build
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: password
          POSTGRES_DB: educi_lxp_e2e
        ports:
          - 5432:5432
      redis:
        image: redis:7
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx prisma migrate deploy
      - run: npm run build
      - run: npm run test:e2e

  deploy-staging:
    runs-on: ubuntu-latest
    needs: e2e
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to EKS
        run: |
          kubectl set image deployment/educi-api \
            api=${{ secrets.ECR_REGISTRY }}/educi-api:${{ github.sha }} \
            --namespace=staging
          kubectl rollout status deployment/educi-api --namespace=staging

  deploy-production:
    runs-on: ubuntu-latest
    needs: e2e
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to EKS
        run: |
          kubectl set image deployment/educi-api \
            api=${{ secrets.ECR_REGISTRY }}/educi-api:${{ github.sha }} \
            --namespace=production
          kubectl rollout status deployment/educi-api --namespace=production
```

---

## Database Migrations

```typescript
// prisma/migrations/20240101_add_courses_table.ts

import { PrismaClient } from '@prisma/client';

export async function up(prisma: PrismaClient): Promise<void> {
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS courses (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      short_description VARCHAR(500),
      thumbnail VARCHAR(500),
      instructor_id UUID NOT NULL REFERENCES users(id),
      category_id UUID NOT NULL REFERENCES categories(id),
      level VARCHAR(50) NOT NULL,
      language VARCHAR(10) NOT NULL,
      price DECIMAL(10, 2) NOT NULL DEFAULT 0,
      currency VARCHAR(3) NOT NULL DEFAULT 'USD',
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      published_at TIMESTAMP,
      enrolled_count INTEGER NOT NULL DEFAULT 0,
      rating DECIMAL(3, 2) NOT NULL DEFAULT 0,
      review_count INTEGER NOT NULL DEFAULT 0,
      tags TEXT[] DEFAULT '{}',
      prerequisites UUID[] DEFAULT '{}',
      learning_objectives TEXT[] DEFAULT '{}',
      tenant_id UUID NOT NULL REFERENCES tenants(id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE INDEX idx_courses_slug ON courses(slug);
    CREATE INDEX idx_courses_instructor_id ON courses(instructor_id);
    CREATE INDEX idx_courses_category_id ON courses(category_id);
    CREATE INDEX idx_courses_status ON courses(status);
    CREATE INDEX idx_courses_tenant_id ON courses(tenant_id);
  `;
}

export async function down(prisma: PrismaClient): Promise<void> {
  await prisma.$executeRaw`DROP TABLE IF EXISTS courses`;
}
```

---

## Monitoring Setup

### Prometheus Configuration

```yaml
# monitoring/prometheus.yml

global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - 'alerts.yml'

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - 'alertmanager:9093'

scrape_configs:
  - job_name: 'educi-api'
    static_configs:
      - targets: ['api:3000']
    metrics_path: '/metrics'
    scrape_interval: 10s

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
```

### Alert Rules

```yaml
# monitoring/alerts.yml

groups:
  - name: educi-api
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~'5..'}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: High error rate detected
          description: Error rate is above 10% for 5 minutes

      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: High latency detected
          description: 95th percentile latency is above 2 seconds

      - alert: HighMemoryUsage
        expr: process_resident_memory_bytes / node_memory_Mem_total_bytes > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: High memory usage
          description: Memory usage is above 80%

      - alert: DatabaseConnectionPoolExhausted
        expr: pg_stat_activity_count > pg_settings_max_connections * 0.8
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Database connection pool exhausted
          description: Connection count is above 80% of max connections
```

### Grafana Dashboard

```json
{
  "dashboard": {
    "title": "EduCI LXP Dashboard",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{path}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          },
          {
            "expr": "histogram_quantile(0.50, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "50th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~'5..'}[5m]) / rate(http_requests_total[5m])",
            "legendFormat": "Error rate"
          }
        ]
      },
      {
        "title": "Active Users",
        "type": "stat",
        "targets": [
          {
            "expr": "educi_active_users_total",
            "legendFormat": "Active users"
          }
        ]
      }
    ]
  }
}
```

---

## Health Check Endpoints

```typescript
// src/routes/health.ts

import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';

const router = Router();

router.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    storage: await checkStorage(),
  };

  const isHealthy = Object.values(checks).every(
    (check) => check.status === 'healthy'
  );

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    version: process.env.APP_VERSION || 'unknown',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    checks,
  });
});

router.get('/ready', async (req, res) => {
  const isReady = await checkDatabase().then(
    (check) => check.status === 'healthy'
  );

  res.status(isReady ? 200 : 503).json({
    status: isReady ? 'ready' : 'not_ready',
  });
});

async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', latency: 0 };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}

async function checkRedis() {
  try {
    const start = Date.now();
    await redis.ping();
    const latency = Date.now() - start;
    return { status: 'healthy', latency };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}

async function checkStorage() {
  try {
    // Check storage connectivity
    return { status: 'healthy', latency: 0 };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}

export default router;
```

---

## Rollback Procedures

### Database Rollback

```bash
# Rollback last migration
npx prisma migrate reset

# Rollback to specific migration
npx prisma migrate deploy --to-migration <migration_name>
```

### Application Rollback

```bash
# Kubernetes rollback
kubectl rollout undo deployment/educi-api --namespace=production

# Check rollout status
kubectl rollout status deployment/educi-api --namespace=production
```

### Blue-Green Deployment

```yaml
# k8s/blue-green.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: educi-api-blue
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: educi-api
      version: blue
  template:
    metadata:
      labels:
        app: educi-api
        version: blue
    spec:
      containers:
        - name: api
          image: educi/api:v1.0.0
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: educi-api-green
  namespace: production
spec:
  replicas: 0
  selector:
    matchLabels:
      app: educi-api
      version: green
  template:
    metadata:
      labels:
        app: educi-api
        version: green
    spec:
      containers:
        - name: api
          image: educi/api:v1.1.0
```

---

## Security Considerations

### 1. Secret Management

```yaml
# k8s/secrets.yaml

apiVersion: v1
kind: Secret
metadata:
  name: educi-secrets
  namespace: production
type: Opaque
data:
  database-url: <base64_encoded_url>
  redis-url: <base64_encoded_url>
  jwt-secret: <base64_encoded_secret>
  sendgrid-api-key: <base64_encoded_key>
```

### 2. Network Policies

```yaml
# k8s/network-policy.yaml

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: educi-api-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: educi-api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
      ports:
        - protocol: TCP
          port: 3000
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: database
      ports:
        - protocol: TCP
          port: 5432
    - to:
        - namespaceSelector:
            matchLabels:
              name: cache
      ports:
        - protocol: TCP
          port: 6379
```

### 3. Pod Security

```yaml
# k8s/pod-security.yaml

apiVersion: v1
kind: Pod
metadata:
  name: educi-api
  namespace: production
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1001
    fsGroup: 1001
  containers:
    - name: api
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop:
            - ALL
```

---

## Best Practices

### 1. Use Infrastructure as Code

```bash
# Terraform for AWS infrastructure
terraform init
terraform plan
terraform apply
```

### 2. Implement Canary Deployments

```yaml
# Gradually increase traffic to new version
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: educi-api
spec:
  hosts:
    - educi-api
  http:
    - route:
        - destination:
            host: educi-api
            subset: stable
          weight: 90
        - destination:
            host: educi-api
            subset: canary
          weight: 10
```

### 3. Automate Rollbacks

```yaml
# Automatically rollback on failure
apiVersion: apps/v1
kind: Deployment
metadata:
  name: educi-api
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  progressDeadlineSeconds: 600
```

### 4. Monitor Everything

```typescript
// Custom metrics
const metrics = {
  httpRequests: new Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'path', 'status'],
  }),
  httpRequestDuration: new Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration',
    labelNames: ['method', 'path'],
  }),
  activeUsers: new Gauge({
    name: 'educi_active_users',
    help: 'Active users count',
  }),
};
```

### 5. Document Runbooks

```markdown
# Runbook: High Error Rate

## Symptoms
- Error rate above 10% for 5 minutes
- Users reporting errors

## Diagnosis
1. Check application logs
2. Check database connectivity
3. Check external service status

## Mitigation
1. Scale up instances
2. Check for recent deployments
3. Rollback if necessary

## Prevention
1. Improve error handling
2. Add circuit breakers
3. Implement retry logic
```

---

## References

- `Dockerfile` - Docker build configuration
- `docker-compose.yml` - Local development setup
- `k8s/` - Kubernetes manifests
- `.github/workflows/` - CI/CD pipelines
- `monitoring/` - Monitoring configuration
- `terraform/` - Infrastructure as Code
- `prisma/migrations/` - Database migrations

---

*Last Updated: Phase 2.7 - LXP Deployment Documentation*
