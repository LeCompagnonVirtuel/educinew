# Phase 2.7 LXP Configuration Documentation

## Executive Summary

The EduCI LXP configuration system manages 75 configuration sections across database, caching, authentication, storage, feature flags, and tenant-specific settings. This documentation covers environment variables, configuration hierarchy, validation, and runtime configuration management.

---

## Configuration Architecture

### Configuration Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                   Configuration Hierarchy                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Environment Variables                 │    │
│  │  (Highest priority - overrides all other configs)        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Runtime Config                        │    │
│  │  (API calls, feature flags, dynamic settings)            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Tenant Config                         │    │
│  │  (Per-tenant overrides from database)                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    File Config                           │    │
│  │  (config.json, config.yaml, .env files)                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Default Config                        │    │
│  │  (Built-in defaults - lowest priority)                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Configuration Sections

### 1. Database Configuration (Section 1-5)

```typescript
// src/config/database.config.ts

interface DatabaseConfig {
  // Primary database
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  ssl: boolean;
  poolSize: number;
  connectionTimeout: number;
  queryTimeout: number;

  // Replica configuration
  replicas: DatabaseReplica[];

  // Logging
  logging: {
    enabled: boolean;
    level: 'debug' | 'info' | 'warn' | 'error';
    queries: boolean;
    slowQueryThreshold: number;
  };
}

interface DatabaseReplica {
  host: string;
  port: number;
  weight: number;
  isDefault: boolean;
}
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_HOST` | Database host | `localhost` | Yes |
| `DB_PORT` | Database port | `5432` | No |
| `DB_NAME` | Database name | `educi_lxp` | Yes |
| `DB_USER` | Database user | - | Yes |
| `DB_PASSWORD` | Database password | - | Yes |
| `DB_SSL` | Enable SSL | `false` | No |
| `DB_POOL_SIZE` | Connection pool size | `10` | No |
| `DB_CONNECTION_TIMEOUT` | Connection timeout (ms) | `5000` | No |
| `DB_QUERY_TIMEOUT` | Query timeout (ms) | `30000` | No |

### 2. Redis Configuration (Section 6-10)

```typescript
// src/config/redis.config.ts

interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  keyPrefix: string;
  maxRetries: number;
  retryDelay: number;
  enableReadyCheck: boolean;
  connectionPool: {
    min: number;
    max: number;
  };
  cluster: RedisClusterConfig | null;
}

interface RedisClusterConfig {
  nodes: RedisNode[];
  options: {
    maxRedirections: number;
    retryDelayOnFailover: number;
  };
}

interface RedisNode {
  host: string;
  port: number;
}
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REDIS_HOST` | Redis host | `localhost` | Yes |
| `REDIS_PORT` | Redis port | `6379` | No |
| `REDIS_PASSWORD` | Redis password | - | No |
| `REDIS_DB` | Redis database | `0` | No |
| `REDIS_KEY_PREFIX` | Key prefix | `educi:` | No |
| `REDIS_MAX_RETRIES` | Max retries | `3` | No |
| `REDIS_CLUSTER_ENABLED` | Enable cluster | `false` | No |

### 3. Authentication Configuration (Section 11-20)

```typescript
// src/config/auth.config.ts

interface AuthConfig {
  jwt: {
    secret: string;
    accessTokenExpiresIn: string;
    refreshTokenExpiresIn: string;
    issuer: string;
    audience: string;
  };
  bcrypt: {
    rounds: number;
  };
  session: {
    maxAge: number;
    updateAge: number;
    secure: boolean;
    httpOnly: boolean;
  };
  mfa: {
    enabled: boolean;
    issuer: string;
    window: number;
  };
  oauth: OAuthConfig;
  sso: SSOConfig;
}

interface OAuthConfig {
  google: OAuthProviderConfig;
  github: OAuthProviderConfig;
  microsoft: OAuthProviderConfig;
}

interface OAuthProviderConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

interface SSOConfig {
  enabled: boolean;
  provider: string;
  metadataUrl: string;
  certificate: string;
}
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry | `15m` | No |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` | No |
| `JWT_ISSUER` | JWT issuer | `educi-lxp` | No |
| `JWT_AUDIENCE` | JWT audience | `educi-api` | No |
| `BCRYPT_ROUNDS` | Bcrypt rounds | `12` | No |
| `SESSION_MAX_AGE` | Session max age (ms) | `86400000` | No |
| `SESSION_SECURE` | Secure cookies | `true` | No |
| `SESSION_HTTP_ONLY` | HTTP-only cookies | `true` | No |
| `MFA_ENABLED` | Enable MFA | `false` | No |
| `MFA_ISSUER` | MFA issuer | `EduCI LXP` | No |
| `OAUTH_GOOGLE_ENABLED` | Enable Google OAuth | `false` | No |
| `OAUTH_GOOGLE_CLIENT_ID` | Google client ID | - | Conditional |
| `OAUTH_GOOGLE_CLIENT_SECRET` | Google client secret | - | Conditional |

### 4. Storage Configuration (Section 21-25)

```typescript
// src/config/storage.config.ts

interface StorageConfig {
  provider: 's3' | 'minio' | 'local' | 'azure' | 'gcs';
  s3: S3Config;
  minio: MinioConfig;
  local: LocalStorageConfig;
  azure: AzureConfig;
  gcs: GCSConfig;
  upload: UploadConfig;
}

interface S3Config {
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint?: string;
  forcePathStyle: boolean;
}

interface MinioConfig {
  endpoint: string;
  port: number;
  accessKey: string;
  secretKey: string;
  useSSL: boolean;
  bucket: string;
}

interface LocalStorageConfig {
  basePath: string;
  serveStatic: boolean;
}

interface AzureConfig {
  accountName: string;
  accountKey: string;
  containerName: string;
}

interface GCSConfig {
  projectId: string;
  keyFilename: string;
  bucket: string;
}

interface UploadConfig {
  maxFileSize: number;
  allowedMimeTypes: string[];
  maxFiles: number;
  tempDir: string;
}
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `STORAGE_PROVIDER` | Storage provider | `local` | No |
| `S3_REGION` | AWS region | `us-east-1` | Conditional |
| `S3_BUCKET` | S3 bucket name | - | Conditional |
| `S3_ACCESS_KEY_ID` | AWS access key | - | Conditional |
| `S3_SECRET_ACCESS_KEY` | AWS secret key | - | Conditional |
| `MINIO_ENDPOINT` | MinIO endpoint | `localhost` | Conditional |
| `MINIO_PORT` | MinIO port | `9000` | Conditional |
| `MINIO_ACCESS_KEY` | MinIO access key | - | Conditional |
| `MINIO_SECRET_KEY` | MinIO secret key | - | Conditional |
| `LOCAL_STORAGE_PATH` | Local storage path | `./uploads` | Conditional |
| `UPLOAD_MAX_FILE_SIZE` | Max file size (bytes) | `104857600` | No |
| `UPLOAD_ALLOWED_MIME_TYPES` | Allowed MIME types | `*` | No |

### 5. Email Configuration (Section 26-30)

```typescript
// src/config/email.config.ts

interface EmailConfig {
  provider: 'smtp' | 'sendgrid' | 'ses' | 'mailgun';
  from: {
    name: string;
    email: string;
  };
  smtp: SMTPConfig;
  sendgrid: SendGridConfig;
  ses: SESConfig;
  mailgun: MailgunConfig;
}

interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface SendGridConfig {
  apiKey: string;
  templateId: string;
}

interface SESConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

interface MailgunConfig {
  apiKey: string;
  domain: string;
}
```

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EMAIL_PROVIDER` | Email provider | `smtp` | No |
| `EMAIL_FROM_NAME` | Sender name | `EduCI LXP` | No |
| `EMAIL_FROM_ADDRESS` | Sender email | `noreply@educi.com` | Yes |
| `SMTP_HOST` | SMTP host | `smtp.gmail.com` | Conditional |
| `SMTP_PORT` | SMTP port | `587` | Conditional |
| `SMTP_SECURE` | Use TLS | `true` | Conditional |
| `SMTP_USER` | SMTP username | - | Conditional |
| `SMTP_PASS` | SMTP password | - | Conditional |
| `SENDGRID_API_KEY` | SendGrid API key | - | Conditional |
| `SES_REGION` | AWS SES region | `us-east-1` | Conditional |

### 6. Feature Flags (Section 31-45)

```typescript
// src/config/features.config.ts

interface FeatureFlags {
  // Core features
  enableRegistration: boolean;
  enableEmailVerification: boolean;
  enableSSO: boolean;
  enableMFA: boolean;

  // Learning features
  enableAI: boolean;
  enableRecommendations: boolean;
  enableLearningPaths: boolean;
  enableCertificates: boolean;
  enableBadges: boolean;

  // Content features
  enableVideoStreaming: boolean;
  enableLiveStreaming: boolean;
  enableInteractiveContent: boolean;
  enableContentVersioning: boolean;

  // Social features
  enableComments: boolean;
  enableDiscussions: boolean;
  enablePeerReview: boolean;
  enableMentoring: boolean;

  // Analytics features
  enableAnalytics: boolean;
  enableAdvancedReporting: boolean;
  enablePredictiveAnalytics: boolean;

  // Integration features
  enableWebhooks: boolean;
  enableAPIAccess: boolean;
  enableZapier: boolean;

  // Mobile features
  enableMobile: boolean;
  enableOfflineMode: boolean;
  enablePushNotifications: boolean;

  // Payment features
  enablePayments: boolean;
  enableSubscriptions: boolean;
  enableCoupons: boolean;
}
```

| Variable | Description | Default |
|----------|-------------|---------|
| `FEATURE_REGISTRATION` | Enable registration | `true` |
| `FEATURE_EMAIL_VERIFICATION` | Require email verification | `true` |
| `FEATURE_SSO` | Enable SSO | `false` |
| `FEATURE_MFA` | Enable MFA | `false` |
| `FEATURE_AI` | Enable AI features | `true` |
| `FEATURE_RECOMMENDATIONS` | Enable recommendations | `true` |
| `FEATURE_LEARNING_PATHS` | Enable learning paths | `true` |
| `FEATURE_CERTIFICATES` | Enable certificates | `true` |
| `FEATURE_BADGES` | Enable badges | `true` |
| `FEATURE_VIDEO_STREAMING` | Enable video streaming | `true` |
| `FEATURE_LIVE_STREAMING` | Enable live streaming | `false` |
| `FEATURE_INTERACTIVE_CONTENT` | Enable interactive content | `true` |
| `FEATURE_COMMENTS` | Enable comments | `true` |
| `FEATURE_DISCUSSIONS` | Enable discussions | `true` |
| `FEATURE_PEER_REVIEW` | Enable peer review | `false` |
| `FEATURE_ANALYTICS` | Enable analytics | `true` |
| `FEATURE_ADVANCED_REPORTING` | Enable advanced reporting | `true` |
| `FEATURE_PREDICTIVE_ANALYTICS` | Enable predictive analytics | `false` |
| `FEATURE_WEBHOOKS` | Enable webhooks | `true` |
| `FEATURE_API_ACCESS` | Enable API access | `true` |
| `FEATURE_MOBILE` | Enable mobile app | `true` |
| `FEATURE_OFFLINE_MODE` | Enable offline mode | `true` |
| `FEATURE_PUSH_NOTIFICATIONS` | Enable push notifications | `true` |
| `FEATURE_PAYMENTS` | Enable payments | `true` |
| `FEATURE_SUBSCRIPTIONS` | Enable subscriptions | `false` |
| `FEATURE_COUPONS` | Enable coupons | `true` |

### 7. Rate Limiting (Section 46-50)

```typescript
// src/config/ratelimit.config.ts

interface RateLimitConfig {
  global: RateLimitRule;
  auth: RateLimitRule;
  api: RateLimitRule;
  upload: RateLimitRule;
  custom: Record<string, RateLimitRule>;
}

interface RateLimitRule {
  windowMs: number;
  max: number;
  message: string;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}
```

| Variable | Description | Default |
|----------|-------------|---------|
| `RATE_LIMIT_GLOBAL_WINDOW` | Global window (ms) | `60000` |
| `RATE_LIMIT_GLOBAL_MAX` | Global max requests | `100` |
| `RATE_LIMIT_AUTH_WINDOW` | Auth window (ms) | `900000` |
| `RATE_LIMIT_AUTH_MAX` | Auth max attempts | `5` |
| `RATE_LIMIT_API_WINDOW` | API window (ms) | `60000` |
| `RATE_LIMIT_API_MAX` | API max requests | `1000` |

### 8. Logging (Section 51-55)

```typescript
// src/config/logging.config.ts

interface LoggingConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'text';
  colorize: boolean;
  timestamp: boolean;
  transports: LogTransport[];
  requestLogging: RequestLoggingConfig;
  auditLogging: AuditLoggingConfig;
}

interface LogTransport {
  type: 'console' | 'file' | 'http' | 'cloudwatch';
  options: Record<string, unknown>;
}

interface RequestLoggingConfig {
  enabled: boolean;
  excludePaths: string[];
  includeBody: boolean;
  maxBodySize: number;
}

interface AuditLoggingConfig {
  enabled: boolean;
  events: string[];
}
```

| Variable | Description | Default |
|----------|-------------|---------|
| `LOG_LEVEL` | Log level | `info` |
| `LOG_FORMAT` | Log format | `json` |
| `LOG_COLORIZE` | Colorize logs | `false` |
| `LOG_TIMESTAMP` | Include timestamp | `true` |
| `LOG_REQUESTS` | Log requests | `true` |
| `LOG_AUDIT` | Audit logging | `true` |

### 9. Cache Configuration (Section 56-60)

```typescript
// src/config/cache.config.ts

interface CacheConfig {
  provider: 'redis' | 'memory' | 'memcached';
  ttl: number;
  prefix: string;
  strategies: CacheStrategy[];
}

interface CacheStrategy {
  name: string;
  ttl: number;
  invalidateOn: string[];
}
```

| Variable | Description | Default |
|----------|-------------|---------|
| `CACHE_PROVIDER` | Cache provider | `redis` |
| `CACHE_DEFAULT_TTL` | Default TTL (seconds) | `3600` |
| `CACHE_PREFIX` | Cache key prefix | `cache:` |

### 10. Queue Configuration (Section 61-65)

```typescript
// src/config/queue.config.ts

interface QueueConfig {
  provider: 'redis' | 'rabbitmq' | 'sqs';
  defaultQueue: string;
  concurrency: number;
  retryAttempts: number;
  retryDelay: number;
  queues: QueueDefinition[];
}

interface QueueDefinition {
  name: string;
  concurrency: number;
  retryAttempts: number;
  rateLimit: {
    max: number;
    duration: number;
  };
}
```

| Variable | Description | Default |
|----------|-------------|---------|
| `QUEUE_PROVIDER` | Queue provider | `redis` |
| `QUEUE_DEFAULT_CONCURRENCY` | Default concurrency | `5` |
| `QUEUE_RETRY_ATTEMPTS` | Retry attempts | `3` |
| `QUEUE_RETRY_DELAY` | Retry delay (ms) | `5000` |

### 11. Tenant Configuration (Section 66-75)

```typescript
// src/config/tenant.config.ts

interface TenantConfig {
  multiTenancy: boolean;
  defaultTenant: string;
  tenantResolver: 'subdomain' | 'header' | 'query';
  tenantHeader: string;
  isolation: 'shared' | 'dedicated';
  caching: {
    enabled: boolean;
    ttl: number;
  };
  limits: {
    maxTenants: number;
    maxUsersPerTenant: number;
    maxCoursesPerTenant: number;
  };
}

interface TenantLimits {
  maxUsers: number;
  maxCourses: number;
  maxStorageGB: number;
  maxAPIRequestsPerMinute: number;
  maxConcurrentUsers: number;
  maxEnrollmentsPerUser: number;
  maxLessonsPerCourse: number;
  maxModulesPerCourse: number;
}
```

| Variable | Description | Default |
|----------|-------------|---------|
| `MULTI_TENANCY_ENABLED` | Enable multi-tenancy | `true` |
| `DEFAULT_TENANT` | Default tenant ID | `default` |
| `TENANT_RESOLVER` | Tenant resolver | `subdomain` |
| `TENANT_HEADER` | Tenant header | `x-tenant-id` |
| `TENANT_ISOLATION` | Tenant isolation | `shared` |
| `TENANT_MAX_USERS` | Max users per tenant | `10000` |
| `TENANT_MAX_COURSES` | Max courses per tenant | `1000` |
| `TENANT_MAX_STORAGE` | Max storage (GB) | `100` |

---

## Configuration Validation

```typescript
// src/config/validator.ts

import { z } from 'zod';

const databaseConfigSchema = z.object({
  host: z.string().min(1),
  port: z.number().int().min(1).max(65535),
  name: z.string().min(1),
  user: z.string().min(1),
  password: z.string().min(8),
  ssl: z.boolean(),
  poolSize: z.number().int().min(1).max(100),
});

const authConfigSchema = z.object({
  jwt: z.object({
    secret: z.string().min(32),
    accessTokenExpiresIn: z.string(),
    refreshTokenExpiresIn: z.string(),
  }),
  bcrypt: z.object({
    rounds: z.number().int().min(10).max(20),
  }),
});

export function validateConfig(config: unknown): AppConfig {
  const result = configSchema.safeParse(config);

  if (!result.success) {
    const errors = result.error.errors.map(
      (e) => `${e.path.join('.')}: ${e.message}`
    );
    throw new Error(
      `Configuration validation failed:\n${errors.join('\n')}`
    );
  }

  return result.data;
}
```

---

## Runtime Configuration

```typescript
// src/config/runtime.ts

class RuntimeConfig {
  private config: Map<string, unknown> = new Map();
  private listeners: Map<string, Set<Function>> = new Map();

  set<T>(key: string, value: T): void {
    const oldValue = this.config.get(key);
    this.config.set(key, value);

    // Notify listeners
    const keyListeners = this.listeners.get(key);
    if (keyListeners) {
      keyListeners.forEach((listener) => listener(value, oldValue));
    }
  }

  get<T>(key: string, defaultValue?: T): T {
    const value = this.config.get(key);
    return (value as T) ?? (defaultValue as T);
  }

  onChange(key: string, callback: (newValue: unknown, oldValue: unknown) => void): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(key)?.delete(callback);
    };
  }

  getAll(): Record<string, unknown> {
    return Object.fromEntries(this.config);
  }
}

export const runtimeConfig = new RuntimeConfig();
```

---

## Environment Files

### .env.example

```bash
# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
WEB_URL=http://localhost:3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=educi_lxp
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_SSL=false
DB_POOL_SIZE=10

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Authentication
JWT_SECRET=your_jwt_secret_here_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# Storage
STORAGE_PROVIDER=local
LOCAL_STORAGE_PATH=./uploads

# Email
EMAIL_PROVIDER=smtp
EMAIL_FROM_NAME=EduCI LXP
EMAIL_FROM_ADDRESS=noreply@educi.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Feature Flags
FEATURE_REGISTRATION=true
FEATURE_EMAIL_VERIFICATION=true
FEATURE_AI=true
FEATURE_ANALYTICS=true
FEATURE_PAYMENTS=true

# Rate Limiting
RATE_LIMIT_GLOBAL_WINDOW=60000
RATE_LIMIT_GLOBAL_MAX=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

---

## Best Practices

### 1. Never Commit Secrets

```yaml
# .gitignore
.env
.env.local
.env.*.local
```

### 2. Use Environment-Specific Configs

```bash
# config/
#   default.ts
#   development.ts
#   staging.ts
#   production.ts
```

### 3. Validate Configuration on Startup

```typescript
// src/config/index.ts

import { validateConfig } from './validator';

const rawConfig = {
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    // ...
  },
};

export const config = validateConfig(rawConfig);
```

### 4. Use Type-Safe Access

```typescript
// Bad
const dbHost = process.env.DB_HOST;

// Good
import { config } from './config';
const dbHost = config.database.host;
```

### 5. Document Configuration Options

```typescript
interface DatabaseConfig {
  /** Database host address */
  host: string;

  /** Database port (1-65535) */
  port: number;

  /** Connection pool size (1-100) */
  poolSize: number;
}
```

---

## Security Considerations

### 1. Encrypt Sensitive Values

```typescript
// Use environment variables for secrets
process.env.JWT_SECRET; // Never hardcode

// Use secret management for production
// AWS Secrets Manager, HashiCorp Vault, etc.
```

### 2. Rotate Secrets Regularly

```typescript
// Implement secret rotation
async function rotateSecrets(): Promise<void> {
  const newSecret = await secretManager.rotate('jwt-secret');
  config.set('auth.jwt.secret', newSecret);
}
```

### 3. Audit Configuration Changes

```typescript
// Log configuration changes
runtimeConfig.onChange('auth.jwt.secret', (newVal, oldVal) => {
  auditLogger.log({
    event: 'config_changed',
    key: 'auth.jwt.secret',
    oldValue: '***',
    newValue: '***',
    timestamp: new Date(),
  });
});
```

---

## References

- `src/config/` - Configuration files
- `src/config/validator.ts` - Configuration validation
- `.env.example` - Environment variable template
- `src/utils/logger.ts` - Logging configuration

---

*Last Updated: Phase 2.7 - LXP Configuration Documentation*
