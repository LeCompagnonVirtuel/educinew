# Phase 2.9 - School Networks

## Overview

The School Networks module manages school networks, network members, school chains, franchises, religious school groups, private school groups, NGO school groups, international school groups, network agreements, and network reports. It provides comprehensive management for various types of educational institution groupings.

```
┌─────────────────────────────────────────────────────────┐
│                SCHOOL NETWORK TYPES                      │
├─────────────────────────────────────────────────────────┤
│  Network → Members → Agreements → Reports                │
│  Chain → Franchise → Religious → Private → NGO           │
│  International → Partnerships → Benchmarking             │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10 in Module 4):**
- `GovSchoolNetworkRepository` - Network CRUD + findActive, findByType, findByName
- `GovNetworkMemberRepository` - Member CRUD + findByNetworkId, findBySchoolId, findActive
- `GovSchoolChainRepository` - Chain CRUD + findActive, findByName, findByOwnerId
- `GovSchoolFranchiseRepository` - Franchise CRUD + findByChainId, findByStatus, approve
- `GovReligiousSchoolGroupRepository` - Religious group CRUD + findByReligion, findActive, findByName
- `GovPrivateSchoolGroupRepository` - Private group CRUD + findByOwnerId, findActive, findByName
- `GovNgoSchoolGroupRepository` - NGO group CRUD + findByNgoId, findActive, findByName
- `GovInternationalSchoolGroupRepository` - International group CRUD + findByCountryId, findActive, findByName
- `GovNetworkAgreementRepository` - Agreement CRUD + findByNetworkId, findByStatus, approve, findExpired
- `GovNetworkReportRepository` - Report CRUD + findByNetworkId, findByDateRange, findByType

### Validators

**File: `gov-campus-network.ts` (907 lines)**

| Schema | Purpose |
|--------|---------|
| `schoolNetworkCreateSchema` | Validates network creation |
| `schoolNetworkUpdateSchema` | Validates network updates |
| `schoolNetworkQuerySchema` | Validates network queries |
| `networkMemberCreateSchema` | Validates member creation |
| `networkMemberUpdateSchema` | Validates member updates |
| `networkMemberQuerySchema` | Validates member queries |
| `schoolChainCreateSchema` | Validates chain creation |
| `schoolChainUpdateSchema` | Validates chain updates |
| `schoolChainQuerySchema` | Validates chain queries |
| `schoolFranchiseCreateSchema` | Validates franchise creation |
| `schoolFranchiseUpdateSchema` | Validates franchise updates |
| `schoolFranchiseQuerySchema` | Validates franchise queries |
| `religiousSchoolGroupCreateSchema` | Validates religious group creation |
| `religiousSchoolGroupUpdateSchema` | Validates religious group updates |
| `religiousSchoolGroupQuerySchema` | Validates religious group queries |
| `privateSchoolGroupCreateSchema` | Validates private group creation |
| `privateSchoolGroupUpdateSchema` | Validates private group updates |
| `privateSchoolGroupQuerySchema` | Validates private group queries |
| `ngoSchoolGroupCreateSchema` | Validates NGO group creation |
| `ngoSchoolGroupUpdateSchema` | Validates NGO group updates |
| `ngoSchoolGroupQuerySchema` | Validates NGO group queries |
| `internationalSchoolGroupCreateSchema` | Validates international group creation |
| `internationalSchoolGroupUpdateSchema` | Validates international group updates |
| `internationalSchoolGroupQuerySchema` | Validates international group queries |
| `networkAgreementCreateSchema` | Validates agreement creation |
| `networkAgreementUpdateSchema` | Validates agreement updates |
| `networkAgreementQuerySchema` | Validates agreement queries |
| `networkReportCreateSchema` | Validates report creation |
| `networkReportUpdateSchema` | Validates report updates |
| `networkReportQuerySchema` | Validates report queries |

### Errors

- `NetworkNotFoundError` - Network not found
- `MemberNotFoundError` - Network member not found
- `ChainNotFoundError` - School chain not found
- `FranchiseNotFoundError` - Franchise not found
- `AgreementNotFoundError` - Network agreement not found
- `AgreementExpiredError` - Agreement has expired
- `DuplicateMemberError` - School already in network
- `InvalidNetworkTypeError` - Invalid network type

### Repository

All 10 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovSchoolNetworkService` | `gov-school-network.service.ts` | Network management |
| `GovNetworkMemberService` | `gov-network-member.service.ts` | Member management |
| `GovNetworkMemberManagementService` | `gov-network-member-management.service.ts` | Member lifecycle |
| `GovNetworkAgreementService` | `gov-network-agreement.service.ts` | Agreement management |
| `GovNetworkAnalyticsService` | `gov-network-analytics.service.ts` | Network analytics |
| `GovNetworkReportService` | `gov-network-report.service.ts` | Report generation |
| `GovNetworkReportingService` | `gov-network-reporting.service.ts` | Reporting engine |
| `GovSchoolChainService` | `gov-school-chain.service.ts` | Chain management |
| `GovSchoolFranchiseService` | `gov-school-franchise.service.ts` | Franchise management |
| `GovReligiousSchoolGroupService` | `gov-religious-school-group.service.ts` | Religious group management |
| `GovPrivateSchoolGroupService` | `gov-private-school-group.service.ts` | Private group management |
| `GovNgoSchoolGroupService` | `gov-ngo-school-group.service.ts` | NGO group management |
| `GovInternationalSchoolGroupService` | `gov-international-school-group.service.ts` | International group management |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-school-network-management` | Network state management |
| `use-gov-school-network-list` | Network list operations |
| `use-gov-school-network-actions` | Network CRUD actions |
| `use-gov-network-member-management` | Member state management |
| `use-gov-network-member-list` | Member list operations |
| `use-gov-network-member-actions` | Member CRUD actions |
| `use-gov-school-chain-management` | Chain state management |
| `use-gov-school-chain-list` | Chain list operations |
| `use-gov-school-chain-actions` | Chain CRUD actions |
| `use-gov-school-franchise-management` | Franchise state management |
| `use-gov-school-franchise-list` | Franchise list operations |
| `use-gov-school-franchise-actions` | Franchise CRUD actions |
| `use-gov-religious-school-group-management` | Religious group state |
| `use-gov-religious-school-group-list` | Religious group list |
| `use-gov-religious-school-group-actions` | Religious group CRUD |
| `use-gov-private-school-group-management` | Private group state |
| `use-gov-private-school-group-list` | Private group list |
| `use-gov-private-school-group-actions` | Private group CRUD |
| `use-gov-ngo-school-group-management` | NGO group state |
| `use-gov-ngo-school-group-list` | NGO group list |
| `use-gov-ngo-school-group-actions` | NGO group CRUD |
| `use-gov-international-school-group-management` | International group state |
| `use-gov-international-school-group-list` | International group list |
| `use-gov-international-school-group-actions` | International group CRUD |
| `use-gov-network-agreement-management` | Agreement state |
| `use-gov-network-report-management` | Report state |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/school-network` | GET, POST |
| `/api/gov/school-network/[id]` | GET, PUT, DELETE |
| `/api/gov/network-member` | GET, POST |
| `/api/gov/network-member/[id]` | GET, PUT, DELETE |
| `/api/gov/network-agreement` | GET, POST |
| `/api/gov/network-agreement/[id]` | GET, PUT, DELETE |
| `/api/gov/network-report` | GET, POST |
| `/api/gov/network-report/[id]` | GET, PUT, DELETE |
| `/api/gov/school-chain` | GET, POST |
| `/api/gov/school-chain/[id]` | GET, PUT, DELETE |
| `/api/gov/school-franchise` | GET, POST |
| `/api/gov/school-franchise/[id]` | GET, PUT, DELETE |
| `/api/gov/religious-school-group` | GET, POST |
| `/api/gov/religious-school-group/[id]` | GET, PUT, DELETE |
| `/api/gov/private-school-group` | GET, POST |
| `/api/gov/private-school-group/[id]` | GET, PUT, DELETE |
| `/api/gov/ngo-school-group` | GET, POST |
| `/api/gov/ngo-school-group/[id]` | GET, PUT, DELETE |
| `/api/gov/international-school-group` | GET, POST |
| `/api/gov/international-school-group/[id]` | GET, PUT, DELETE |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovNetworkListScreen` | List networks |
| `GovNetworkDetailScreen` | Network detail |
| `GovNetworkDashboardScreen` | Network dashboard |
| `GovNetworkReportScreen` | Network reports |
| `GovChainListScreen` | List chains |
| `GovFranchiseListScreen` | List franchises |

## Configuration

```typescript
const networkConfig = {
  maxNetworks: 1000,
  maxMembersPerNetwork: 500,
  agreementRenewalDays: 30,
  reportGenerationTimeout: 180000,
  supportedNetworkTypes: [
    'network', 'consortium', 'chain', 'franchise',
    'alliance', 'religious', 'private', 'ngo', 'international'
  ],
  franchiseApprovalRequired: true,
  memberVerificationRequired: true,
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `network_admin` | Full network management, member approval |
| `chain_owner` | Chain management, franchise approval |
| `franchise_manager` | Franchise operations, member management |
| `group_leader` | Group management, report generation |
| `network_member` | Basic network access, booking |
| `network_viewer` | Read-only access |

## Multi-Tenancy

- Network data scoped by `schoolId`
- Member isolation within networks
- Franchise chain isolation
- Agreement lifecycle per network

## Offline Support

- Network data cached offline
- Member list available offline
- Agreement status offline
- Report generation queued

## API Reference

### School Network
- `GET /api/gov/school-network` - List networks
- `POST /api/gov/school-network` - Create network
- `GET /api/gov/school-network/[id]` - Get network
- `PUT /api/gov/school-network/[id]` - Update network
- `DELETE /api/gov/school-network/[id]` - Delete network

### Network Member
- `GET /api/gov/network-member` - List members
- `POST /api/gov/network-member` - Add member
- `GET /api/gov/network-member/[id]` - Get member
- `PUT /api/gov/network-member/[id]` - Update member
- `DELETE /api/gov/network-member/[id]` - Remove member

### Network Agreement
- `GET /api/gov/network-agreement` - List agreements
- `POST /api/gov/network-agreement` - Create agreement
- `GET /api/gov/network-agreement/[id]` - Get agreement
- `PUT /api/gov/network-agreement/[id]` - Update agreement
- `DELETE /api/gov/network-agreement/[id]` - Delete agreement

## Testing

- Unit tests for network services
- Integration tests for API routes
- E2E tests for member workflows
- Agreement lifecycle tests
- Franchise approval tests

## Security

- JWT authentication required
- Network-level access control
- Member verification security
- Agreement integrity checks
- Audit logging for all operations
