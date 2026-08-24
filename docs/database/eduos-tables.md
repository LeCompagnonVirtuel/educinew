# EduOS Phase 3.4 — Tables de données

> Version : 3.4.0 | PostgreSQL via Supabase

---

## Principes

- Toutes les tables possèdent `school_id`, `created_at`, `updated_at`, `deleted_at`
- RLS obligatoire sur chaque table
- Index obligatoires sur les colonnes de jointure
- Contraintes FK obligatoires

---

## 1. Core Runtime

### `eduos_modules`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK, DEFAULT uuid() |
| school_id | UUID | FK → schools(id) |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| version | VARCHAR(20) | NOT NULL |
| description | TEXT | |
| status | ENUM | ACTIVE, INACTIVE, ERROR |
| config | JSONB | DEFAULT '{}' |
| dependencies | TEXT[] | DEFAULT '{}' |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() |
| deleted_at | TIMESTAMPTZ | NULL |

**Index:** `idx_eduos_modules_school_id`, `idx_eduos_modules_name`

### `eduos_plugins`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| module_id | UUID | FK → eduos_modules(id) |
| name | VARCHAR(100) | NOT NULL |
| version | VARCHAR(20) | NOT NULL |
| signature | TEXT | NOT NULL |
| sandbox_enabled | BOOLEAN | DEFAULT true |
| status | ENUM | INSTALLED, ENABLED, DISABLED, ERROR |
| config | JSONB | DEFAULT '{}' |

### `eduos_extensions`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| plugin_id | UUID | FK → eduos_plugins(id) |
| name | VARCHAR(100) | NOT NULL |
| signed | BOOLEAN | DEFAULT true |
| hot_reload | BOOLEAN | DEFAULT false |
| status | ENUM | ACTIVE, INACTIVE |

---

## 2. Workflow Automation

### `eduos_workflows`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| name | VARCHAR(200) | NOT NULL |
| description | TEXT | |
| steps | JSONB | NOT NULL |
| trigger_config | JSONB | |
| version | INTEGER | DEFAULT 1 |
| status | ENUM | DRAFT, ACTIVE, PAUSED, ARCHIVED |
| created_by | UUID | FK → auth.users(id) |
| max_timeout_seconds | INTEGER | DEFAULT 3600 |

### `eduos_pipelines`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| workflow_id | UUID | FK → eduos_workflows(id) |
| type | ENUM | DATA_SYNC, REPORT_GENERATION, ETL, ... |
| status | ENUM | PENDING, RUNNING, COMPLETED, FAILED |
| started_at | TIMESTAMPTZ | |
| completed_at | TIMESTAMPTZ | |
| error | JSONB | |

### `eduos_schedules`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| workflow_id | UUID | FK → eduos_workflows(id) |
| cron_expression | VARCHAR(100) | NOT NULL |
| timezone | VARCHAR(50) | DEFAULT 'Africa/Abidjan' |
| next_run_at | TIMESTAMPTZ | |
| last_run_at | TIMESTAMPTZ | |
| active | BOOLEAN | DEFAULT true |

---

## 3. Digital Identity Wallet

### `eduos_identity_wallets`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| owner_id | UUID | FK → auth.users(id) |
| wallet_type | ENUM | STUDENT, TEACHER, PARENT, STAFF |
| did | VARCHAR(500) | UNIQUE |
| biometric_enabled | BOOLEAN | DEFAULT false |
| locked | BOOLEAN | DEFAULT false |
| backup_count | INTEGER | DEFAULT 0 |

### `eduos_credentials`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| wallet_id | UUID | FK → eduos_identity_wallets(id) |
| type | ENUM | STUDENT_ID, DIPLOMA, TRANSCRIPT, ... |
| format | ENUM | VC_JWT, VC_JSON_LD, ISO_MDL |
| issued_at | TIMESTAMPTZ | NOT NULL |
| expires_at | TIMESTAMPTZ | |
| revoked | BOOLEAN | DEFAULT false |
| metadata | JSONB | |

---

## 4. Educational Wallet

### `eduos_edu_wallets`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| owner_id | UUID | FK → auth.users(id) |
| wallet_type | ENUM | STUDENT, PARENT, INSTITUTION, VENDOR |
| balance | BIGINT | DEFAULT 0 (en centimes) |
| currency | VARCHAR(3) | DEFAULT 'XOF' |
| frozen | BOOLEAN | DEFAULT false |
| signature_key | TEXT | Ed25519 public key |

### `eduos_transactions`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| wallet_id | UUID | FK → eduos_edu_wallets(id) |
| type | ENUM | CREDIT, DEBIT, TRANSFER |
| amount | BIGINT | NOT NULL |
| currency | VARCHAR(3) | DEFAULT 'XOF' |
| category | VARCHAR(50) | TUITION, SCHOLARSHIP, ... |
| description | TEXT | |
| reference_id | UUID | |
| signature | TEXT | Ed25519 signature |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## 5. Marketplace & Commerce

### `eduos_products`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| vendor_id | UUID | FK → eduos_vendors(id) |
| name | VARCHAR(200) | NOT NULL |
| description | TEXT | |
| category | ENUM | TEXTBOOKS, STATIONERY, ... |
| price | BIGINT | NOT NULL |
| currency | VARCHAR(3) | DEFAULT 'XOF' |
| sku | VARCHAR(50) | UNIQUE |
| stock | INTEGER | DEFAULT 0 |
| images | TEXT[] | |
| status | ENUM | DRAFT, ACTIVE, INACTIVE |

### `eduos_orders`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| buyer_id | UUID | FK → auth.users(id) |
| items | JSONB | NOT NULL |
| total | BIGINT | NOT NULL |
| status | ENUM | PENDING, CONFIRMED, SHIPPED, DELIVERED |
| payment_method | VARCHAR(50) | |
| created_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## 6. Governance & Policy

### `eduos_policies`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| title | VARCHAR(300) | NOT NULL |
| content | TEXT | NOT NULL |
| status | ENUM | DRAFT, UNDER_REVIEW, APPROVED, ACTIVE |
| version | INTEGER | DEFAULT 1 |
| review_cycle_days | INTEGER | DEFAULT 365 |
| next_review_at | TIMESTAMPTZ | |

### `eduos_committees`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| name | VARCHAR(200) | NOT NULL |
| type | ENUM | ACADEMIC, DISCIPLINARY, FINANCIAL, ... |
| members | UUID[] | |
| quorum_percent | DECIMAL | DEFAULT 0.5 |

---

## 7. National Registry

### `eduos_registry_records`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| national_id | VARCHAR(50) | UNIQUE |
| school_id | UUID | FK → schools(id) |
| record_type | ENUM | STUDENT, TEACHER, INSTITUTION, ... |
| status | ENUM | ACTIVE, INACTIVE, SUSPENDED |
| data | JSONB | NOT NULL |
| version | INTEGER | DEFAULT 1 |
| encrypted | BOOLEAN | DEFAULT true |

---

## 8. Blockchain Education

### `eduos_smart_contracts`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| school_id | UUID | FK → schools(id) |
| type | ENUM | CREDENTIAL_ISSUANCE, TRANSCRIPT, ... |
| network | ENUM | ETHEREUM, POLYGON, SOLANA |
| address | VARCHAR(100) | NOT NULL |
| deployed_at | TIMESTAMPTZ | |
| audited | BOOLEAN | DEFAULT false |

### `eduos_chain_credentials`

| Colonne | Type | Contrainte |
|---------|------|------------|
| id | UUID | PK |
| contract_id | UUID | FK → eduos_smart_contracts(id) |
| credential_id | UUID | FK → eduos_credentials(id) |
| tx_hash | VARCHAR(100) | NOT NULL |
| block_number | BIGINT | |
| minted_at | TIMESTAMPTZ | DEFAULT NOW() |

---

## 9. Relations principales

```
schools ──┬── eduos_modules ──── eduos_plugins ──── eduos_extensions
          ├── eduos_workflows ──── eduos_pipelines
          ├── eduos_identity_wallets ──── eduos_credentials
          ├── eduos_edu_wallets ──── eduos_transactions
          ├── eduos_products ──── eduos_orders
          ├── eduos_policies
          ├── eduos_registry_records
          ├── eduos_smart_contracts ──── eduos_chain_credentials
          ├── eduos_connectors
          ├── eduos_ai_agents
          ├── eduos_data_products
          └── eduos_automations
```

---

## 10. Index recommandés

```sql
-- Multi-tenant
CREATE INDEX idx_*_school_id ON eduos_*(school_id);

-- Recherche
CREATE INDEX idx_products_category ON eduos_products(category, status);
CREATE INDEX idx_transactions_wallet ON eduos_transactions(wallet_id, created_at DESC);
CREATE INDEX idx_credentials_wallet ON eduos_credentials(wallet_id, type);
CREATE INDEX idx_registry_national ON eduos_registry_records(national_id);
CREATE INDEX idx_workflows_status ON eduos_workflows(school_id, status);

-- Full-text search
CREATE INDEX idx_products_search ON eduos_products USING gin(to_tsvector('french', name || ' ' || description));
```
