# Phase 2.10 - SDK & Open Platform

## Overview

The SDK & Open Platform module provides comprehensive developer tools, SDKs, API wrappers, plugin system, marketplace, and open platform capabilities for the EduCI ecosystem. It enables third-party developers to build integrations, extensions, and applications on top of the EduCI platform through well-documented APIs, SDKs, and development frameworks.

```
┌─────────────────────────────────────────────────────────┐
│                SDK & OPEN PLATFORM                       │
├─────────────────────────────────────────────────────────┤
│  SDK Generation → Plugin System → Marketplace            │
│  API Wrappers → Developer Portal → App Store             │
│  Webhook System → Integration Framework → SDK Testing    │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10):**
- `SDKPackageRepository` - SDK CRUD + findByName, findByLanguage
- `SDKVersionRepository` - Version CRUD + findByPackage, findLatest
- `PluginRepository` - Plugin CRUD + findByName, findByCategory
- `PluginVersionRepository` - Version CRUD + findByPlugin, findLatest
- `MarketplaceAppRepository` - App CRUD + findByName, findByCategory
- `AppStoreListingRepository` - Listing CRUD + findByName, findFeatured
- `WebhookSubscriptionRepository` - Subscription CRUD + findByEvent, findActive
- `DeveloperAccountRepository` - Account CRUD + findByEmail, findActive
- `APIKeyRepository` - Key CRUD + findByAccount, findActive
- `IntegrationConfigRepository` - Config CRUD + findByType, findActive

**Entity Types (40):**
- `SDKPackage`, `SDKPackageCreate`, `SDKPackageUpdate`, `SDKPackageQuery`
- `SDKVersion`, `SDKVersionCreate`, `SDKVersionUpdate`, `SDKVersionQuery`
- `Plugin`, `PluginCreate`, `PluginUpdate`, `PluginQuery`
- `PluginVersion`, `PluginVersionCreate`, `PluginVersionUpdate`, `PluginVersionQuery`
- `MarketplaceApp`, `MarketplaceAppCreate`, `MarketplaceAppUpdate`, `MarketplaceAppQuery`
- `AppStoreListing`, `AppStoreListingCreate`, `AppStoreListingUpdate`, `AppStoreListingQuery`
- `WebhookSubscription`, `WebhookSubscriptionCreate`, `WebhookSubscriptionUpdate`, `WebhookSubscriptionQuery`
- `DeveloperAccount`, `DeveloperAccountCreate`, `DeveloperAccountUpdate`, `DeveloperAccountQuery`
- `APIKey`, `APIKeyCreate`, `APIKeyUpdate`, `APIKeyQuery`
- `IntegrationConfig`, `IntegrationConfigCreate`, `IntegrationConfigUpdate`, `IntegrationConfigQuery`

### Validators

**File: `ep-open-production.ts` (1,050 lines)**

| Schema | Purpose |
|--------|---------|
| `sdkPackageCreateSchema` | Validates SDK creation (name, language, description) |
| `sdkVersionCreateSchema` | Validates version creation (version, changes) |
| `pluginCreateSchema` | Validates plugin creation (name, type, config) |
| `pluginVersionCreateSchema` | Validates version creation |
| `marketplaceAppCreateSchema` | Validates app creation (name, category, pricing) |
| `appStoreListingCreateSchema` | Validates listing creation (title, description, assets) |
| `webhookSubscriptionCreateSchema` | Validates subscription creation (events, url, secret) |
| `developerAccountCreateSchema` | Validates account creation (email, org) |
| `apiKeyCreateSchema` | Validates key creation (name, permissions, expiry) |
| `integrationConfigCreateSchema` | Validates config creation (type, credentials) |

### Errors

| Error Code | Description |
|------------|-------------|
| `SDK_PACKAGE_NOT_FOUND` | SDK package not found |
| `SDK_VERSION_CONFLICT` | SDK version already exists |
| `PLUGIN_NOT_FOUND` | Plugin not found |
| `PLUGIN_INSTALL_FAILED` | Plugin installation failed |
| `MARKETPLACE_APP_NOT_FOUND` | Marketplace app not found |
| `APP_LISTING_INVALID` | App listing validation failed |
| `WEBHOOK_DELIVERY_FAILED` | Webhook delivery failed |
| `DEVELOPER_ACCOUNT_EXISTS` | Developer account already exists |
| `API_KEY_INVALID` | API key invalid or expired |
| `INTEGRATION_CONFIG_INVALID` | Integration config invalid |

### Repository

```typescript
// 10 repository interfaces for SDK and platform
interface SDKPackageRepository {
  create(data: SDKPackageCreate): Promise<SDKPackage>;
  findById(id: string): Promise<SDKPackage | null>;
  findByName(name: string): Promise<SDKPackage | null>;
  findByLanguage(language: string): Promise<SDKPackage[]>;
  update(id: string, data: SDKPackageUpdate): Promise<SDKPackage>;
  delete(id: string): Promise<void>;
  list(query: SDKPackageQuery): Promise<SDKPackage[]>;
  findPopular(): Promise<SDKPackage[]>;
}

interface PluginRepository {
  create(data: PluginCreate): Promise<Plugin>;
  findById(id: string): Promise<Plugin | null>;
  findByName(name: string): Promise<Plugin | null>;
  findByCategory(category: string): Promise<Plugin[]>;
  update(id: string, data: PluginUpdate): Promise<Plugin>;
  delete(id: string): Promise<void>;
  list(query: PluginQuery): Promise<Plugin[]>;
  findInstalled(): Promise<Plugin[]>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `SDKPackageService` | SDK package management and generation |
| `SDKVersionService` | SDK version management |
| `PluginService` | Plugin lifecycle management |
| `PluginVersionService` | Plugin version management |
| `MarketplaceAppService` | Marketplace app management |
| `AppStoreListingService` | App store listing management |
| `WebhookSubscriptionService` | Webhook subscription and delivery |
| `DeveloperAccountService` | Developer account management |
| `APIKeyService` | API key management |
| `IntegrationConfigService` | Integration configuration |

### Hooks

| Hook | Purpose |
|------|---------|
| `useSDKPackages` | SDK package management |
| `useSDKVersions` | SDK version management |
| `usePlugins` | Plugin management |
| `usePluginVersions` | Plugin version management |
| `useMarketplaceApps` | Marketplace app management |
| `useAppStoreListings` | App store listing management |
| `useWebhookSubscriptions` | Webhook subscription management |
| `useDeveloperAccounts` | Developer account management |
| `useAPIKeys` | API key management |
| `useIntegrationConfigs` | Integration config management |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/sdk/packages` | List SDK packages |
| POST | `/api/enterprise/sdk/packages` | Create SDK package |
| GET | `/api/enterprise/sdk/packages/[id]` | Get SDK package |
| PUT | `/api/enterprise/sdk/packages/[id]` | Update SDK package |
| GET | `/api/enterprise/sdk/packages/[id]/versions` | List versions |
| POST | `/api/enterprise/sdk/packages/[id]/versions` | Create version |
| GET | `/api/enterprise/sdk/plugins` | List plugins |
| POST | `/api/enterprise/sdk/plugins` | Create plugin |
| GET | `/api/enterprise/sdk/plugins/[id]` | Get plugin |
| PUT | `/api/enterprise/sdk/plugins/[id]` | Update plugin |
| GET | `/api/enterprise/sdk/plugins/[id]/versions` | List versions |
| POST | `/api/enterprise/sdk/plugins/[id]/versions` | Create version |
| GET | `/api/enterprise/sdk/marketplace` | List marketplace apps |
| POST | `/api/enterprise/sdk/marketplace` | Create marketplace app |
| GET | `/api/enterprise/sdk/marketplace/[id]` | Get marketplace app |
| PUT | `/api/enterprise/sdk/marketplace/[id]` | Update marketplace app |
| GET | `/api/enterprise/sdk/app-store` | List app store listings |
| POST | `/api/enterprise/sdk/app-store` | Create listing |
| GET | `/api/enterprise/sdk/app-store/[id]` | Get listing |
| PUT | `/api/enterprise/sdk/app-store/[id]` | Update listing |
| GET | `/api/enterprise/sdk/webhooks` | List webhook subscriptions |
| POST | `/api/enterprise/sdk/webhooks` | Create subscription |
| GET | `/api/enterprise/sdk/webhooks/[id]` | Get subscription |
| PUT | `/api/enterprise/sdk/webhooks/[id]` | Update subscription |
| DELETE | `/api/enterprise/sdk/webhooks/[id]` | Delete subscription |
| GET | `/api/enterprise/sdk/developers` | List developer accounts |
| POST | `/api/enterprise/sdk/developers` | Create account |
| GET | `/api/enterprise/sdk/developers/[id]` | Get account |
| GET | `/api/enterprise/sdk/api-keys` | List API keys |
| POST | `/api/enterprise/sdk/api-keys` | Create API key |
| GET | `/api/enterprise/sdk/api-keys/[id]` | Get API key |
| DELETE | `/api/enterprise/sdk/api-keys/[id]` | Revoke API key |
| GET | `/api/enterprise/sdk/integrations` | List integrations |
| POST | `/api/enterprise/sdk/integrations` | Create integration |
| GET | `/api/enterprise/sdk/integrations/[id]` | Get integration |
| PUT | `/api/enterprise/sdk/integrations/[id]` | Update integration |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `SDKDashboardScreen` | SDK overview |
| `PluginMarketScreen` | Plugin marketplace |
| `AppStoreScreen` | App store listings |
| `WebhookScreen` | Webhook management |
| `DeveloperPortalScreen` | Developer portal |
| `APIKeyScreen` | API key management |

## Configuration

```typescript
export const SDK_CONFIG = {
  limits: {
    maxSDKPackages: 100,
    maxVersionsPerPackage: 50,
    maxPlugins: 500,
    maxMarketplaceApps: 1000,
    maxWebhookSubscriptions: 1000,
    maxDeveloperAccounts: 10000,
    maxAPIKeysPerAccount: 10,
  },
  sdk: {
    supportedLanguages: ['typescript', 'javascript', 'python', 'java', 'go', 'ruby'],
    autoGenerateDocs: true,
    versioningStrategy: 'semver',
  },
  plugins: {
    maxPluginSize: 10485760,
    sandboxEnabled: true,
    autoUpdateEnabled: false,
    reviewRequired: true,
  },
  marketplace: {
    commissionRate: 0.3,
    minPayoutAmount: 100,
    reviewTimeoutDays: 7,
    featuredRotationDays: 7,
  },
  webhooks: {
    maxRetries: 3,
    timeoutMs: 30000,
    retryDelayMs: 60000,
    signatureAlgorithm: 'sha256',
  },
  apiKeys: {
    maxAge: 365,
    rotationReminderDays: 30,
    rateLimitPerKey: 1000,
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `platform_admin` | Full SDK and platform management |
| `sdk_admin` | SDK and plugin management |
| `marketplace_admin` | Marketplace and app store management |
| `developer` | Account and API key management |
| `platform_viewer` | Read-only platform data |

## Multi-Tenancy

- SDK packages shared across tenants
- Plugins scoped per tenant installation
- Marketplace apps available per tenant plan
- Webhook subscriptions per tenant
- Developer accounts per tenant org
- API keys per tenant user

## Offline Support

- SDK documentation cached locally
- Plugin manifests cached
- Marketplace listings cached
- Webhook logs cached for offline viewing
- Developer docs available offline

## API Reference

### SDK Packages
- GET /api/enterprise/sdk/packages
- POST /api/enterprise/sdk/packages
- GET /api/enterprise/sdk/packages/[id]
- PUT /api/enterprise/sdk/packages/[id]

### SDK Versions
- GET /api/enterprise/sdk/packages/[id]/versions
- POST /api/enterprise/sdk/packages/[id]/versions

### Plugins
- GET /api/enterprise/sdk/plugins
- POST /api/enterprise/sdk/plugins
- GET /api/enterprise/sdk/plugins/[id]
- PUT /api/enterprise/sdk/plugins/[id]

### Plugin Versions
- GET /api/enterprise/sdk/plugins/[id]/versions
- POST /api/enterprise/sdk/plugins/[id]/versions

### Marketplace
- GET /api/enterprise/sdk/marketplace
- POST /api/enterprise/sdk/marketplace
- GET /api/enterprise/sdk/marketplace/[id]
- PUT /api/enterprise/sdk/marketplace/[id]

### App Store
- GET /api/enterprise/sdk/app-store
- POST /api/enterprise/sdk/app-store
- GET /api/enterprise/sdk/app-store/[id]
- PUT /api/enterprise/sdk/app-store/[id]

### Webhooks
- GET /api/enterprise/sdk/webhooks
- POST /api/enterprise/sdk/webhooks
- GET /api/enterprise/sdk/webhooks/[id]
- PUT /api/enterprise/sdk/webhooks/[id]
- DELETE /api/enterprise/sdk/webhooks/[id]

### Developers
- GET /api/enterprise/sdk/developers
- POST /api/enterprise/sdk/developers
- GET /api/enterprise/sdk/developers/[id]

### API Keys
- GET /api/enterprise/sdk/api-keys
- POST /api/enterprise/sdk/api-keys
- GET /api/enterprise/sdk/api-keys/[id]
- DELETE /api/enterprise/sdk/api-keys/[id]

### Integrations
- GET /api/enterprise/sdk/integrations
- POST /api/enterprise/sdk/integrations
- GET /api/enterprise/sdk/integrations/[id]
- PUT /api/enterprise/sdk/integrations/[id]

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All services and validators |
| Integration Tests | SDK generation and plugin install |
| E2E Tests | Full developer workflows |
| Webhook Tests | Delivery and retry scenarios |
| Marketplace Tests | App listing and purchase flows |

## Security

- API keys rate limited and scoped
- Webhook signatures verified
- Plugin sandboxing enforced
- SDK packages signed
- Developer accounts verified
- App store listings reviewed
- All platform operations audited
