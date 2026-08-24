# Phase 2.9 - Multi-Campus Management

## Overview

The Multi-Campus module manages campus groups, campus members, shared resources, resource bookings, cross-campus users, campus transfers, centralized administration, campus analytics, and inter-campus communication. It enables organizations to manage multiple educational campuses with shared resources and centralized governance.

```
┌─────────────────────────────────────────────────────────┐
│                MULTI-CAMPUS ARCHITECTURE                 │
├─────────────────────────────────────────────────────────┤
│  Campus Group → Member Campus → Shared Resources        │
│  Cross-Campus Users → Transfers → Analytics              │
│  Centralized Admin → Communication → Reporting           │
└─────────────────────────────────────────────────────────┘
```

## Architecture

### Types

**Repository Interfaces (10 in Module 3):**
- `GovCampusRepository` - Campus CRUD + findActive, findBySchoolId, findByRegionId
- `GovCampusGroupRepository` - Group CRUD + findByCampusId, findActive, findByType
- `GovCampusGroupMemberRepository` - Member CRUD + findByGroupId, findByUserId, findActive
- `GovSharedResourceRepository` - Resource CRUD + findByCampusId, findAvailable, findByType
- `GovSharedResourceBookingRepository` - Booking CRUD + findByResourceId, findByDateRange, approve, cancel
- `GovCrossCampusUserRepository` - User CRUD + findByUserId, findByCampusId, findActive
- `GovCampusTransferRepository` - Transfer CRUD + findByStudentId, findByStatus, approve, reject
- `GovCentralizedAdministrationRepository` - Admin CRUD + findByCampusId, findActive, findByType
- `GovCampusAnalyticsRepository` - Analytics CRUD + findByCampusId, findByDateRange, findLatest
- `GovInterCampusCommunicationRepository` - Communication CRUD + findBySenderCampusId, markAsRead

### Validators

**File: `gov-campus-network.ts` (907 lines)**

| Schema | Purpose |
|--------|---------|
| `campusCreateSchema` | Validates campus creation |
| `campusUpdateSchema` | Validates campus updates |
| `campusQuerySchema` | Validates campus queries |
| `campusGroupCreateSchema` | Validates group creation |
| `campusGroupUpdateSchema` | Validates group updates |
| `campusGroupQuerySchema` | Validates group queries |
| `campusGroupMemberCreateSchema` | Validates member creation |
| `campusGroupMemberUpdateSchema` | Validates member updates |
| `campusGroupMemberQuerySchema` | Validates member queries |
| `sharedResourceCreateSchema` | Validates resource creation |
| `sharedResourceUpdateSchema` | Validates resource updates |
| `sharedResourceQuerySchema` | Validates resource queries |
| `sharedResourceBookingCreateSchema` | Validates booking creation |
| `sharedResourceBookingUpdateSchema` | Validates booking updates |
| `sharedResourceBookingQuerySchema` | Validates booking queries |
| `crossCampusUserCreateSchema` | Validates cross-campus user creation |
| `crossCampusUserUpdateSchema` | Validates cross-campus user updates |
| `crossCampusUserQuerySchema` | Validates cross-campus user queries |
| `campusTransferCreateSchema` | Validates transfer creation |
| `campusTransferUpdateSchema` | Validates transfer updates |
| `campusTransferQuerySchema` | Validates transfer queries |
| `centralizedAdministrationCreateSchema` | Validates centralized admin creation |
| `centralizedAdministrationUpdateSchema` | Validates centralized admin updates |
| `centralizedAdministrationQuerySchema` | Validates centralized admin queries |
| `campusAnalyticsCreateSchema` | Validates analytics creation |
| `campusAnalyticsUpdateSchema` | Validates analytics updates |
| `campusAnalyticsQuerySchema` | Validates analytics queries |
| `interCampusCommunicationCreateSchema` | Validates communication creation |
| `interCampusCommunicationUpdateSchema` | Validates communication updates |
| `interCampusCommunicationQuerySchema` | Validates communication queries |

### Errors

- `CampusNotFoundError` - Campus not found
- `CampusGroupNotFoundError` - Campus group not found
- `SharedResourceNotFoundError` - Shared resource not found
- `BookingConflictError` - Booking time conflict
- `TransferRejectedError` - Campus transfer rejected
- `InsufficientCapacityError` - Campus at capacity
- `ResourceUnavailableError` - Resource not available

### Repository

All 10 repository interfaces follow standard CRUD with domain-specific methods.

### Services

| Service | File | Purpose |
|---------|------|---------|
| `GovCampusTransferService` | `gov-campus-transfer.service.ts` | Transfer management |
| `GovCampusSyncService` | `gov-campus-sync.service.ts` | Campus data sync |
| `GovCampusPerformanceService` | `gov-campus-performance.service.ts` | Performance tracking |
| `GovCampusResourceSharingService` | `gov-campus-resource-sharing.service.ts` | Resource sharing |
| `GovCampusCapacityService` | `gov-campus-capacity.service.ts` | Capacity management |
| `GovCampusCommunicationService` | `gov-campus-communication.service.ts` | Inter-campus comms |
| `GovCampusAnalyticsService` | `gov-campus-analytics.service.ts` | Analytics |
| `GovSharedResourceService` | `gov-shared-resource.service.ts` | Resource management |
| `GovSharedResourceBookingService` | `gov-shared-resource-booking.service.ts` | Booking management |
| `GovInterCampusCommunicationService` | `gov-inter-campus-communication.service.ts` | Communication |
| `GovCentralizedAdministrationService` | `gov-centralized-administration.service.ts` | Centralized admin |

### Hooks

| Hook | Purpose |
|------|---------|
| `use-gov-campus-management` | Campus state management |
| `use-gov-campus-list` | Campus list operations |
| `use-gov-campus-actions` | Campus CRUD actions |
| `use-gov-campus-group-management` | Group state management |
| `use-gov-campus-group-list` | Group list operations |
| `use-gov-campus-group-actions` | Group CRUD actions |
| `use-gov-campus-group-member-management` | Member state management |
| `use-gov-campus-group-member-list` | Member list operations |
| `use-gov-campus-group-member-actions` | Member CRUD actions |
| `use-gov-campus-transfer-management` | Transfer state management |
| `use-gov-campus-transfer-list` | Transfer list operations |
| `use-gov-campus-transfer-actions` | Transfer CRUD actions |
| `use-gov-campus-transfer-approval` | Transfer approval workflow |
| `use-gov-campus-analytics-management` | Analytics state management |
| `use-gov-campus-analytics-list` | Analytics list operations |
| `use-gov-campus-analytics-actions` | Analytics CRUD actions |
| `use-gov-campus-communication` | Communication state |
| `use-gov-campus-capacity` | Capacity management |
| `use-gov-campus-performance` | Performance tracking |
| `use-gov-campus-resource-sharing` | Resource sharing state |
| `use-gov-campus-sync` | Campus sync operations |
| `use-gov-centralized-admin` | Centralized admin state |
| `use-gov-centralized-administration-management` | Admin state management |
| `use-gov-centralized-administration-list` | Admin list operations |
| `use-gov-centralized-administration-actions` | Admin CRUD actions |

### API Routes

| Endpoint | Methods |
|----------|---------|
| `/api/gov/campus` | GET, POST |
| `/api/gov/campus/[id]` | GET, PUT, DELETE |
| `/api/gov/campus-group` | GET, POST |
| `/api/gov/campus-group/[id]` | GET, PUT, DELETE |
| `/api/gov/campus-group-member` | GET, POST |
| `/api/gov/campus-group-member/[id]` | GET, PUT, DELETE |
| `/api/gov/shared-resource` | GET, POST |
| `/api/gov/shared-resource/[id]` | GET, PUT, DELETE |
| `/api/gov/shared-resource-booking` | GET, POST |
| `/api/gov/shared-resource-booking/[id]` | GET, PUT, DELETE |
| `/api/gov/campus-transfer` | GET, POST |
| `/api/gov/campus-transfer/[id]` | GET, PUT, DELETE |

### Mobile Screens

| Screen | Purpose |
|--------|---------|
| `GovCampusListScreen` | List campuses |
| `GovCampusDetailScreen` | Campus detail |
| `GovCampusDashboardScreen` | Campus dashboard |
| `GovCampusAnalyticsScreen` | Campus analytics |
| `GovCampusGroupListScreen` | List campus groups |
| `GovCampusTransferScreen` | Campus transfer |
| `GovSharedResourceListScreen` | Shared resources |
| `GovInterCampusCommScreen` | Inter-campus comms |

## Configuration

```typescript
const campusConfig = {
  maxCampusesPerGroup: 100,
  maxMembersPerGroup: 1000,
  bookingAdvanceDays: 90,
  transferApprovalRequired: true,
  resourceBookingMinimumHours: 1,
  resourceBookingMaximumDays: 30,
  communicationRetentionDays: 365,
  analyticsRefreshInterval: 900000, // 15 minutes
};
```

## RBAC

| Role | Permissions |
|------|-------------|
| `campus_admin` | Full campus management, transfer approval |
| `group_admin` | Group management, member oversight |
| `resource_manager` | Resource and booking management |
| `campus_user` | Campus access, booking creation |
| `transfer_coordinator` | Transfer processing, approval routing |
| `campus_viewer` | Read-only access |

## Multi-Tenancy

- Campus data scoped by `schoolId`
- Group membership isolation
- Resource availability per campus
- Transfer approval workflow isolation

## Offline Support

- Campus data cached offline
- Resource availability offline
- Transfer requests queued for sync
- Communication history available offline

## API Reference

### Campus
- `GET /api/gov/campus` - List campuses
- `POST /api/gov/campus` - Create campus
- `GET /api/gov/campus/[id]` - Get campus
- `PUT /api/gov/campus/[id]` - Update campus
- `DELETE /api/gov/campus/[id]` - Delete campus

### Campus Group
- `GET /api/gov/campus-group` - List groups
- `POST /api/gov/campus-group` - Create group
- `GET /api/gov/campus-group/[id]` - Get group
- `PUT /api/gov/campus-group/[id]` - Update group
- `DELETE /api/gov/campus-group/[id]` - Delete group

### Shared Resource
- `GET /api/gov/shared-resource` - List resources
- `POST /api/gov/shared-resource` - Create resource
- `GET /api/gov/shared-resource/[id]` - Get resource
- `PUT /api/gov/shared-resource/[id]` - Update resource
- `DELETE /api/gov/shared-resource/[id]` - Delete resource

### Shared Resource Booking
- `GET /api/gov/shared-resource-booking` - List bookings
- `POST /api/gov/shared-resource-booking` - Create booking
- `GET /api/gov/shared-resource-booking/[id]` - Get booking
- `PUT /api/gov/shared-resource-booking/[id]` - Update booking
- `DELETE /api/gov/shared-resource-booking/[id]` - Cancel booking

## Testing

- Unit tests for campus services
- Integration tests for API routes
- E2E tests for transfer workflows
- Resource booking conflict tests
- Cross-campus communication tests

## Security

- JWT authentication required
- Campus-level access control
- Resource booking authorization
- Transfer approval workflow security
- Audit logging for all operations
