# GOV_REGISTRY.md — National Registry

**Phase 4.1 — Government Integration**
**Version**: 1.0
**Status**: Production

---

## 1. Overview

The National Registry maintains a comprehensive database of all educational institutions, staff, and students across the country. This system serves as the single source of truth for government education data.

## 2. Core Features

### 2.1 Institution Registry
- **Unique Identification**: National school identification numbers
- **Registration Status**: Real-time registration status
- **Location Data**: Geographic coordinates and addresses
- **Category Classification**: Public, private, international schools

### 2.2 Staff Registry
- **Teacher Database**: All certified educators
- **Certification Tracking**: Professional qualifications
- **Employment History**: Career progression records
- **Disciplinary Records**: Professional conduct history

### 2.3 Student Registry
- **Enrollment Records**: Student enrollment history
- **Academic Progression**: Grade-level progression
- **Transfer Records**: Inter-school transfers
- **Graduation Records**: Completion certificates

## 3. Data Model

### 3.1 Registry Schema
```sql
CREATE TABLE national_registry (
  id UUID PRIMARY KEY,
  registry_type VARCHAR(50),
  entity_id UUID,
  unique_code VARCHAR(20) UNIQUE,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE registry_history (
  id UUID PRIMARY KEY,
  registry_id UUID REFERENCES national_registry(id),
  change_type VARCHAR(50),
  old_value JSONB,
  new_value JSONB,
  changed_by UUID REFERENCES users(id),
  changed_at TIMESTAMP DEFAULT NOW()
);
```

## 4. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/registry/institutions` | List institutions |
| POST | `/api/v1/registry/institutions` | Register institution |
| GET | `/api/v1/registry/staff` | List staff members |
| POST | `/api/v1/registry/staff` | Register staff member |
| GET | `/api/v1/registry/students` | List students |
| POST | `/api/v1/registry/students` | Register student |

## 5. Validation Rules

### 5.1 Institution Validation
- **Name**: Required, 2-200 characters
- **Type**: Must be valid institution type
- **Location**: Valid coordinates required
- **Capacity**: Positive integer
- **Registration**: Valid registration number

### 5.2 Staff Validation
- **Name**: Required, 2-100 characters
- **Certification**: Valid certification number
- **Qualification**: Required qualification level
- **Employment Status**: Active, inactive, suspended

## 6. Search Capabilities

- **Full-text Search**: Search across all fields
- **Geographic Search**: Radius-based search
- **Filter Options**: Type, status, location
- **Advanced Filters**: Custom query builder

## 7. Data Quality

### 7.1 Validation Rules
- **Mandatory Fields**: Core data validation
- **Format Validation**: Email, phone, ID formats
- **Uniqueness**: Duplicate detection
- **Consistency**: Cross-reference validation

### 7.2 Data Cleansing
- **Automated Cleanup**: Daily data quality checks
- **Manual Review**: Flagged records review
- **Deduplication**: Duplicate merging process
- **Standardization**: Data normalization

## 8. Reporting

- **Enrollment Reports**: Student enrollment statistics
- **Staff Reports**: Teacher certification status
- **Institution Reports**: School performance metrics
- **Custom Reports**: Ad-hoc report generation

## 9. Security

- **Access Control**: Role-based permissions
- **Data Encryption**: AES-256 at rest
- **Audit Logging**: All access logged
- **Backup**: Daily incremental, weekly full

## 10. Integration

- **Supabase**: Primary database
- **Ministry Platform**: Data synchronization
- **School Systems**: API integration
- **Mobile Apps**: REST API access

---

**Last Updated**: August 2026
**Owner**: Registry Management Team