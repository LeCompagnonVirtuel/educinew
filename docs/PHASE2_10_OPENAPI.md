# Phase 2.10 - API Documentation

## Overview

The API Documentation module provides comprehensive OpenAPI/Swagger documentation, API versioning, API changelog, SDK generation, interactive API explorer, and developer documentation for the EduCI enterprise platform. It ensures all APIs are well-documented, versioned, and accessible through interactive tools.

```
┌─────────────────────────────────────────────────────────┐
│                 API DOCUMENTATION                        │
├─────────────────────────────────────────────────────────┤
│  OpenAPI Spec → Swagger UI → API Versioning              │
│  API Changelog → SDK Generation → Interactive Explorer   │
│  Developer Docs → Rate Limit Docs → Error Reference     │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (8):**
- `APIDocumentationRepository` - Documentation CRUD + findByVersion, findLatest
- `APIVersionRepository` - Version CRUD + findByName, findLatest
- `APIChangelogRepository` - Changelog CRUD + findByVersion, findByDate
- `APISchemaRepository` - Schema CRUD + findByEndpoint, findByMethod
- `APIExampleRepository` - Example CRUD + findByEndpoint, findByLanguage
- `APIRateLimitDocRepository` - Rate limit doc CRUD + findByTier, findActive
- `APIErrorReferenceRepository` - Error ref CRUD + findByCode, findByModule
- `APIDeveloperGuideRepository` - Guide CRUD + findByTopic, findPublished

**Entity Types (32):**
- `APIDocumentation`, `APIDocumentationCreate`, `APIDocumentationUpdate`, `APIDocumentationQuery`
- `APIVersion`, `APIVersionCreate`, `APIVersionUpdate`, `APIVersionQuery`
- `APIChangelog`, `APIChangelogCreate`, `APIChangelogUpdate`, `APIChangelogQuery`
- `APISchema`, `APISchemaCreate`, `APISchemaUpdate`, `APISchemaQuery`
- `APIExample`, `APIExampleCreate`, `APIExampleUpdate`, `APIExampleQuery`
- `APIRateLimitDoc`, `APIRateLimitDocCreate`, `APIRateLimitDocUpdate`, `APIRateLimitDocQuery`
- `APIErrorReference`, `APIErrorReferenceCreate`, `APIErrorReferenceUpdate`, `APIErrorReferenceQuery`
- `APIDeveloperGuide`, `APIDeveloperGuideCreate`, `APIDeveloperGuideUpdate`, `APIDeveloperGuideQuery`

### Validators

**File: `ep-open-production.ts` (1,050 lines)**

| Schema | Purpose |
|--------|---------|
| `apiDocumentationCreateSchema` | Validates doc creation (title, content, version) |
| `apiVersionCreateSchema` | Validates version creation (version, status) |
| `apiChangelogCreateSchema` | Validates changelog creation (version, changes) |
| `apiSchemaCreateSchema` | Validates schema creation (endpoint, schema) |
| `apiExampleCreateSchema` | Validates example creation (endpoint, request, response) |
| `apiRateLimitDocCreateSchema` | Validates rate limit doc creation |
| `apiErrorReferenceCreateSchema` | Validates error ref creation (code, description) |
| `apiDeveloperGuideCreateSchema` | Validates guide creation (title, content, topic) |

### Errors

| Error Code | Description |
|------------|-------------|
| `API_DOC_NOT_FOUND` | API documentation not found |
| `API_VERSION_CONFLICT` | API version already exists |
| `API_CHANGELOG_DUPLICATE` | Changelog entry duplicate |
| `API_SCHEMA_INVALID` | API schema invalid |
| `API_EXAMPLE_INVALID` | API example invalid |
| `API_RATE_LIMIT_DOC_NOT_FOUND` | Rate limit doc not found |
| `API_ERROR_REF_DUPLICATE` | Error reference duplicate |
| `API_GUIDE_NOT_FOUND` | Developer guide not found |

### Repository

```typescript
// 8 repository interfaces for API documentation
interface APIDocumentationRepository {
  create(data: APIDocumentationCreate): Promise<APIDocumentation>;
  findById(id: string): Promise<APIDocumentation | null>;
  findByVersion(version: string): Promise<APIDocumentation[]>;
  findLatest(): Promise<APIDocumentation | null>;
  update(id: string, data: APIDocumentationUpdate): Promise<APIDocumentation>;
  delete(id: string): Promise<void>;
  list(query: APIDocumentationQuery): Promise<APIDocumentation[]>;
  findByModule(module: string): Promise<APIDocumentation[]>;
}

interface APIVersionRepository {
  create(data: APIVersionCreate): Promise<APIVersion>;
  findById(id: string): Promise<APIVersion | null>;
  findByName(name: string): Promise<APIVersion | null>;
  findLatest(): Promise<APIVersion | null>;
  update(id: string, data: APIVersionUpdate): Promise<APIVersion>;
  list(query: APIVersionQuery): Promise<APIVersion[]>;
  findDeprecated(): Promise<APIVersion[]>;
}
```

### Services

| Service | Responsibilities |
|---------|-----------------|
| `APIDocumentationService` | Documentation management and generation |
| `APIVersionService` | API version lifecycle management |
| `APIChangelogService` | Changelog generation and management |
| `APISchemaService` | Schema documentation management |
| `APIExampleService` | Example code generation |
| `APIRateLimitDocService` | Rate limit documentation |
| `APIErrorReferenceService` | Error code documentation |
| `APIDeveloperGuideService` | Developer guide management |

### Hooks

| Hook | Purpose |
|------|---------|
| `useAPIDocumentation` | Documentation management |
| `useAPIVersions` | Version management |
| `useAPIChangelogs` | Changelog management |
| `useAPISchemas` | Schema management |
| `useAPIExamples` | Example management |
| `useAPIRateLimitDocs` | Rate limit docs |
| `useAPIErrorReferences` | Error reference management |
| `useAPIDeveloperGuides` | Developer guide management |

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enterprise/api-docs` | List documentation |
| POST | `/api/enterprise/api-docs` | Create documentation |
| GET | `/api/enterprise/api-docs/[id]` | Get documentation |
| PUT | `/api/enterprise/api-docs/[id]` | Update documentation |
| GET | `/api/enterprise/api-docs/openapi` | Get OpenAPI spec |
| GET | `/api/enterprise/api-docs/swagger` | Get Swagger UI |
| GET | `/api/enterprise/api-versions` | List versions |
| POST | `/api/enterprise/api-versions` | Create version |
| GET | `/api/enterprise/api-versions/[id]` | Get version |
| PUT | `/api/enterprise/api-versions/[id]` | Update version |
| GET | `/api/enterprise/api-changelogs` | List changelogs |
| POST | `/api/enterprise/api-changelogs` | Create changelog |
| GET | `/api/enterprise/api-changelogs/[id]` | Get changelog |
| GET | `/api/enterprise/api-schemas` | List schemas |
| POST | `/api/enterprise/api-schemas` | Create schema |
| GET | `/api/enterprise/api-schemas/[id]` | Get schema |
| GET | `/api/enterprise/api-examples` | List examples |
| POST | `/api/enterprise/api-examples` | Create example |
| GET | `/api/enterprise/api-examples/[id]` | Get example |
| GET | `/api/enterprise/api-rate-limit-docs` | List rate limit docs |
| POST | `/api/enterprise/api-rate-limit-docs` | Create rate limit doc |
| GET | `/api/enterprise/api-error-references` | List error references |
| POST | `/api/enterprise/api-error-references` | Create error reference |
| GET | `/api/enterprise/api-developer-guides` | List guides |
| POST | `/api/enterprise/api-developer-guides` | Create guide |
| GET | `/api/enterprise/api-developer-guides/[id]` | Get guide |
| PUT | `/api/enterprise/api-developer-guides/[id]` | Update guide |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `APIDocDashboardScreen` | Documentation overview |
| `APIExplorerScreen` | Interactive API explorer |
| `APIChangelogScreen` | Version changelog |
| `DeveloperGuideScreen` | Developer guides |
| `ErrorReferenceScreen` | Error code reference |

## Configuration

```typescript
export const API_DOCS_CONFIG = {
  limits: {
    maxDocumentationPages: 500,
    maxVersions: 50,
    maxChangelogs: 500,
    maxSchemas: 5000,
    maxExamples: 10000,
    maxGuides: 200,
  },
  openapi: {
    version: '3.1.0',
    title: 'EduCI Enterprise API',
    description: 'EduCI Enterprise Platform API Documentation',
    contactEmail: 'api@educi.com',
    license: 'MIT',
  },
  versioning: {
    strategy: 'semver',
    deprecationNoticeDays: 90,
    maxSupportedVersions: 3,
  },
  docs: {
    autoGenerateFromCode: true,
    validationEnabled: true,
    interactiveExplorer: true,
    codeExampleLanguages: ['typescript', 'javascript', 'python', 'curl'],
  },
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `docs_admin` | Full documentation management |
| `docs_editor` | Create and edit documentation |
| `docs_viewer` | Read-only documentation access |
| `platform_admin` | Cross-version documentation |

## Multi-Tenancy

- API documentation shared across tenants
- Version-specific docs per tenant API tier
- Rate limit docs per tenant plan
- Error references shared globally
- Developer guides per tenant integration

## Offline Support

- Documentation cached locally
- OpenAPI spec cached for offline generation
- Changelogs cached for offline viewing
- Examples cached for offline reference
- Developer guides available offline

## API Reference

### Documentation
- GET /api/enterprise/api-docs
- POST /api/enterprise/api-docs
- GET /api/enterprise/api-docs/[id]
- PUT /api/enterprise/api-docs/[id]
- GET /api/enterprise/api-docs/openapi
- GET /api/enterprise/api-docs/swagger

### Versions
- GET /api/enterprise/api-versions
- POST /api/enterprise/api-versions
- GET /api/enterprise/api-versions/[id]
- PUT /api/enterprise/api-versions/[id]

### Changelogs
- GET /api/enterprise/api-changelogs
- POST /api/enterprise/api-changelogs
- GET /api/enterprise/api-changelogs/[id]

### Schemas
- GET /api/enterprise/api-schemas
- POST /api/enterprise/api-schemas
- GET /api/enterprise/api-schemas/[id]

### Examples
- GET /api/enterprise/api-examples
- POST /api/enterprise/api-examples
- GET /api/enterprise/api-examples/[id]

### Rate Limit Docs
- GET /api/enterprise/api-rate-limit-docs
- POST /api/enterprise/api-rate-limit-docs
- GET /api/enterprise/api-rate-limit-docs/[id]

### Error References
- GET /api/enterprise/api-error-references
- POST /api/enterprise/api-error-references
- GET /api/enterprise/api-error-references/[id]

### Developer Guides
- GET /api/enterprise/api-developer-guides
- POST /api/enterprise/api-developer-guides
- GET /api/enterprise/api-developer-guides/[id]
- PUT /api/enterprise/api-developer-guides/[id]

## Testing

| Test Category | Coverage |
|---------------|----------|
| Unit Tests | All services and validators |
| Integration Tests | Documentation generation |
| E2E Tests | Full documentation workflows |
| Schema Tests | OpenAPI spec validation |
| Example Tests | Code example correctness |

## Security

- Documentation access controlled by role
- API keys required for interactive explorer
- Schema changes audited
- Version deprecation enforced
- Rate limit docs reflect actual limits
- Error references sanitized
