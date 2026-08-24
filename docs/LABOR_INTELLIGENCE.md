# LABOR_INTELLIGENCE - Données Marché du Travail

Phase 4.4 - Module Labor Intelligence

---

## 1. Objectif

Collecte, analyse et diffusion d'intelligence sur le marché du travail africain : tendances, salaires, compétences demandées, prévisions.

## 2. Modèle de Données

```sql
CREATE TABLE labor_market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  region TEXT NOT NULL,
  industry TEXT NOT NULL,
  job_title TEXT NOT NULL,
  salary_min DECIMAL(12,2),
  salary_max DECIMAL(12,2),
  salary_median DECIMAL(12,2),
  demand_level TEXT CHECK (demand_level IN ('LOW','MEDIUM','HIGH','VERY_HIGH')),
  supply_level TEXT CHECK (supply_level IN ('LOW','MEDIUM','HIGH','VERY_HIGH')),
  trend TEXT CHECK (trend IN ('DECLINING','STABLE','GROWING','BOOMING')),
  growth_rate DECIMAL(5,2),
  top_skills JSONB DEFAULT '[]',
  data_source TEXT,
  period DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE labor_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  industry TEXT NOT NULL,
  job_title TEXT NOT NULL,
  forecast_period DATE NOT NULL,
  predicted_demand TEXT,
  predicted_salary_min DECIMAL(12,2),
  predicted_salary_max DECIMAL(12,2),
  confidence_score DECIMAL(3,2),
  factors JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE labor_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id),
  title TEXT NOT NULL,
  report_type TEXT CHECK (report_type IN ('MARKET_OVERVIEW','SKILLS_GAP','SALARY_SURVEY','INDUSTRY_TRENDS','GRADUATE_OUTCOMES')),
  data JSONB NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);
```

## 3. API Endpoints

### GET /api/labor/market-data
```json
{
  "data": [
    {
      "id": "uuid",
      "region": "Dakar",
      "industry": "Technologie",
      "job_title": "Développeur Full Stack",
      "salary_min": 500000,
      "salary_max": 1200000,
      "salary_median": 750000,
      "demand_level": "VERY_HIGH",
      "supply_level": "MEDIUM",
      "trend": "BOOMING",
      "growth_rate": 25.5,
      "top_skills": ["React", "Node.js", "TypeScript", "PostgreSQL"],
      "period": "2024-Q4"
    }
  ],
  "filters": {
    "region": "Dakar",
    "industry": "Technologie",
    "period": "2024-Q4"
  }
}
```

### GET /api/labor/forecasts
```json
{
  "forecasts": [
    {
      "industry": "Fintech",
      "job_title": "Data Engineer",
      "forecast_period": "2025-Q2",
      "predicted_demand": "VERY_HIGH",
      "predicted_salary_min": 800000,
      "predicted_salary_max": 1500000,
      "confidence_score": 0.85,
      "factors": {
        "digital_transformation": "+30%",
        "new_regulations": "Favorable",
        "investment_flow": "Croissant"
      }
    }
  ]
}
```

### GET /api/labor/reports/:type
```json
{
  "report": {
    "title": "Marché IT Sénégal - Q4 2024",
    "report_type": "MARKET_OVERVIEW",
    "data": {
      "total_jobs": 1250,
      "avg_salary": 850000,
      "top_industries": ["Fintech", "E-commerce", "EdTech"],
      "skills_demand": {
        "React": 85,
        "Python": 72,
        "Java": 65
      },
      "hiring_trends": {
        "remote_work": "35%",
        "contract": "45%",
        "permanent": "20%"
      }
    },
    "generated_at": "2024-10-15T14:30:00Z"
  }
}
```

### POST /api/labor/analyze
```json
{
  "query": "Quelles compétences seront les plus demandées en 2025 en Afrique de l'Ouest?",
  "filters": {
    "region": "West Africa",
    "industry": "Technology",
    "period": "2025"
  }
}
```

## 4. RBAC

| Rôle | Market Data | Forecasts | Reports | Analyze |
|------|-------------|-----------|---------|---------|
| SUPER_ADMIN | ✅ | ✅ | ✅ | ✅ |
| ADMIN | ✅ | ✅ | ✅ | ✅ |
| ENSEIGNANT | R | R | R | ❌ |
| ELEVE | R (public) | R (public) | R (public) | ❌ |

## 5. Data Sources

```typescript
const DataSources = {
  INTERNAL: {
    graduate_outcomes: ' workforce_placements',
    enrollment_trends: 'enrollments'
  },
  EXTERNAL: {
    job_boards: ['Indeed', 'LinkedIn', 'Glassdoor'],
    government: ['ILO', 'National Statistics'],
    surveys: ['Salary Surveys', 'Industry Reports']
  },
  AI_ANALYSIS: {
    trend_detection: 'DeepSeek',
    prediction: 'Gemini',
    anomaly_detection: 'Custom ML'
  }
};
```

## 6. Visualization

```typescript
const Charts = {
  salary_distribution: 'BoxPlot',
  demand_trends: 'LineChart',
  skills_demand: 'BarChart',
  industry_growth: 'AreaChart',
  geographic_heatmap: 'HeatMap',
  skill_gap_analysis: 'RadarChart'
};
```

## 7. Export Formats

- PDF (Rapport formaté)
- Excel (Données brutes)
- CSV (Import externe)
- JSON (API intégration)

## 8. Index

```sql
CREATE INDEX idx_labor_data_region ON labor_market_data(region);
CREATE INDEX idx_labor_data_industry ON labor_market_data(industry);
CREATE INDEX idx_labor_data_period ON labor_market_data(period);
CREATE INDEX idx_labor_forecasts_period ON labor_forecasts(forecast_period);
CREATE INDEX idx_labor_reports_type ON labor_reports(report_type);
```
