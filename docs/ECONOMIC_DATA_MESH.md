# ECONOMIC_DATA_MESH.md — Maillage de Données Économiques

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le Economic Data Mesh connecte les données financières internes avec les données économiques externes : taux de change, inflation, indicateurs régionaux, benchmarks sectoriels et données démographiques pour enrichir les analyses.

---

## 2. Schéma de base de données

```sql
-- Sources de données économiques
CREATE TABLE economic_data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_name VARCHAR(200) NOT NULL,
  source_type VARCHAR(50) CHECK (source_type IN (
    'CENTRAL_BANK', 'MINISTRY', 'INTERNATIONAL_ORG',
    'MARKET_DATA', 'CUSTOM', 'API'
  )),
  api_endpoint TEXT,
  refresh_frequency VARCHAR(30),
  last_synced_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Taux de change
CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES economic_data_sources(id),
  base_currency VARCHAR(3) NOT NULL,
  quote_currency VARCHAR(3) NOT NULL,
  rate DECIMAL(15,6) NOT NULL,
  effective_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_id, base_currency, quote_currency, effective_date)
);

-- Indicateurs économiques
CREATE TABLE economic_indicators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES economic_data_sources(id),
  indicator_code VARCHAR(50) NOT NULL,
  indicator_name VARCHAR(200) NOT NULL,
  region VARCHAR(100) NOT NULL,
  period VARCHAR(20) NOT NULL,
  value DECIMAL(15,4) NOT NULL,
  unit VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Benchmarks sectoriels éducation
CREATE TABLE education_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  benchmark_name VARCHAR(200) NOT NULL,
  country VARCHAR(100) NOT NULL,
  school_type VARCHAR(50),
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  period VARCHAR(20) NOT NULL,
  source VARCHAR(200),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Données agrégées par établissement
CREATE TABLE school_economic_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,2) NOT NULL,
  period VARCHAR(20) NOT NULL,
  benchmark_value DECIMAL(15,2),
  variance_from_benchmark DECIMAL(10,2),
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Synchronisation externe
CREATE TABLE data_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES economic_data_sources(id),
  sync_type VARCHAR(30) CHECK (sync_type IN ('FULL', 'INCREMENTAL')),
  records_synced INTEGER DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('RUNNING', 'COMPLETED', 'FAILED')),
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Index
CREATE INDEX idx_exchange_rates_currencies ON exchange_rates(base_currency, quote_currency);
CREATE INDEX idx_exchange_rates_date ON exchange_rates(effective_date);
CREATE INDEX idx_economic_indicators_code ON economic_indicators(indicator_code);
CREATE INDEX idx_economic_indicators_region ON economic_indicators(region);
CREATE INDEX idx_benchmarks_country ON education_benchmarks(country);
CREATE INDEX idx_school_metrics_school ON school_economic_metrics(school_id);
CREATE INDEX idx_school_metrics_name ON school_economic_metrics(metric_name);
```

---

## 3. RBAC

| Rôle | Voir indicateurs | Voir benchmarks | Voir metrics école | Sync données |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✓ (école) | ✗ |
| COMPTABLE | ✓ | ✗ | ✓ (école) | ✗ |
| DIRECTEUR | ✓ | ✓ | ✓ (école) | ✗ |

---

## 4. Service principal

```typescript
// services/economic-data/economic-data.service.ts
interface EconomicDataService {
  getExchangeRate(from: string, to: string, date?: string): Promise<number>;
  getIndicator(code: string, region: string, period: string): Promise<number>;
  getBenchmarks(country: string, schoolType: string): Promise<Benchmark[]>;
  getSchoolMetrics(schoolId: string, period: string): Promise<SchoolMetric[]>;
  syncExternalData(sourceId: string): Promise<SyncResult>;
}
```

---

## 5. API Endpoints

```
GET    /api/economic/exchange-rates              → Taux de change
GET    /api/economic/exchange-rates/:pair         → Taux pour une paire
GET    /api/economic/indicators                   → Indicateurs économiques
GET    /api/economic/indicators/:code             → Un indicateur spécifique
GET    /api/economic/benchmarks                   → Benchmarks sectoriels
GET    /api/economic/school-metrics/:schoolId     → Métriques d'un établissement
POST   /api/economic/sync                         → Déclencher synchronisation
GET    /api/economic/sync-logs                    → Historique des synchronisations
```

---

## 6. Règles métier

1. **Fréquence** : Taux de change mis à jour quotidiennement
2. **Qualité** : Validation des données avant insertion
3. **Traçabilité** : Chaque donnée est liée à sa source
4. **Comparaison** : Calcul automatique de la variance vs benchmark
5. **Alertes** : Notification si indicateur critique hors seuil

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
