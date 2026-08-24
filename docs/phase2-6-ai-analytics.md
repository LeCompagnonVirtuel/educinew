# Phase 2.6: AI Analytics and Reporting

## Overview

Le module AI Analytics d'EduCI fournit des analyses avancées et des rapports sur l'utilisation de l'IA, la performance des modèles, l'engagement des utilisateurs, et l'impact pédagogique. Il supporte la génération de rapports automatisés et les tableaux de bord en temps réel.

### Capacités

- Tableaux de bord en temps réel
- Rapports automatisés personnalisables
- Métriques d'utilisation par rôle, école, matière
- Suivi des coûts et optimisation budgétaire
- Analyse de performance des modèles
- Détection d'anomalies
- Export en multiples formats
- Alertes et notifications

## Architecture

### Composants

```
┌─────────────────────────────────────────────┐
│            AI Analytics Service              │
├──────────┬──────────┬──────────┬────────────┤
│Dashboard │ Report   │Anomaly   │  Export    │
│ Engine   │Generator│Detector  │  Service   │
├──────────┴──────────┴──────────┴────────────┤
│              Data Pipeline                    │
├──────────┬──────────┬──────────┬────────────┤
│Ingestion │Processing│ Storage  │  Query     │
│ Layer    │ Engine   │ Layer    │  Engine    │
└──────────┴──────────┴──────────┴────────────┘
```

### Modèles de données

```typescript
interface AIAnalyticsDashboard {
  id: string;
  schoolId?: string;
  name: string;
  description: string;
  widgets: AIAnalyticsWidget[];
  refreshInterval: number;
  lastRefreshed: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface AIAnalyticsWidget {
  id: string;
  type: WidgetType;
  title: string;
  query: string;
  config: Record<string, unknown>;
  position: { x: number; y: number; width: number; height: number };
}

type WidgetType =
  | 'line_chart' | 'bar_chart' | 'pie_chart'
  | 'metric' | 'table' | 'heatmap'
  | 'gauge' | 'funnel' | 'geo_map';

interface AIReport {
  id: string;
  schoolId?: string;
  name: string;
  description: string;
  type: ReportType;
  schedule: ReportSchedule;
  queries: ReportQuery[];
  format: ReportFormat[];
  recipients: string[];
  lastGenerated?: string;
  nextGeneration?: string;
  enabled: boolean;
  createdAt: string;
}

type ReportType =
  | 'usage' | 'cost' | 'performance'
  | 'safety' | 'education' | 'custom';

interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  timezone: string;
}

interface ReportQuery {
  name: string;
  sql: string;
  parameters: Record<string, unknown>;
  visualization: WidgetType;
}

type ReportFormat = 'pdf' | 'excel' | 'csv' | 'html' | 'json';

interface AIAnalyticsMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  period: string;
}

interface AIAnalyticsInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  data: Record<string, unknown>;
  recommendation: string;
  generatedAt: string;
}

type InsightType =
  | 'usage_pattern' | 'cost_anomaly' | 'performance_drop'
  | 'engagement_drop' | 'safety_concern' | 'optimization';
```

## Configuration

### Métriques de base

```typescript
import { AI_ANALYTICS_CONFIG } from '@educi/config';

const baseMetrics = AI_ANALYTICS_CONFIG.metrics;
/*
{
  usage: {
    totalSessions: 15420,
    activeUsers: 892,
    averageSessionDuration: 12.5,
    messagesPerSession: 8.3,
    tokensPerSession: 1250,
  },
  cost: {
    totalCostXOF: 2450000,
    costPerUserXOF: 2746,
    costPerSessionXOF: 159,
    budgetUtilization: 0.49,
    projectedMonthlyCost: 3200000,
  },
  performance: {
    averageLatency: 1200,
    successRate: 0.98,
    errorRate: 0.02,
    modelDistribution: {
      "gpt-4o-mini": 0.6,
      "gpt-4o": 0.2,
      "claude-3-haiku": 0.15,
      "other": 0.05,
    },
  },
  education: {
    tutoringSessions: 8500,
    assessmentsCompleted: 3200,
    averageMastery: 0.72,
    completionRate: 0.85,
    improvementRate: 0.15,
  }
}
*/
```

### Dashboards prédéfinis

```typescript
const dashboards = AI_ANALYTICS_CONFIG.dashboards;
/*
[
  {
    id: "overview",
    name: "Vue d'ensemble",
    widgets: [
      { type: "metric", title: "Utilisateurs actifs", query: "active_users" },
      { type: "line_chart", title: "Sessions par jour", query: "daily_sessions" },
      { type: "pie_chart", title: "Coûts par modèle", query: "cost_by_model" },
      { type: "gauge", title: "Taux de réussite", query: "success_rate" },
    ],
  },
  {
    id: "education",
    name: "Éducation",
    widgets: [
      { type: "bar_chart", title: "Progression par matière", query: "subject_progress" },
      { type: "heatmap", title: "Engagement par heure", query: "engagement_heatmap" },
      { type: "table", title: "Top difficultés", query: "top_difficulties" },
    ],
  },
  {
    id: "costs",
    name: "Coûts",
    widgets: [
      { type: "line_chart", title: "Évolution des coûts", query: "cost_trend" },
      { type: "bar_chart", title: "Coûts par école", query: "cost_by_school" },
      { type: "metric", title: "Budget restant", query: "remaining_budget" },
    ],
  }
]
*/
```

### Rapports automatisés

```typescript
const reports = AI_ANALYTICS_CONFIG.reports;
/*
[
  {
    id: "daily_usage",
    name: "Rapport quotidien d'utilisation",
    type: "usage",
    schedule: { frequency: "daily", time: "06:00" },
    format: ["pdf", "html"],
    recipients: ["admin@educi.ci"],
  },
  {
    id: "weekly_costs",
    name: "Rapport hebdomadaire des coûts",
    type: "cost",
    schedule: { frequency: "weekly", dayOfWeek: 1, time: "08:00" },
    format: ["pdf", "excel"],
    recipients: ["finance@educi.ci"],
  },
  {
    id: "monthly_education",
    name: "Rapport mensuel éducation",
    type: "education",
    schedule: { frequency: "monthly", dayOfMonth: 1, time: "07:00" },
    format: ["pdf"],
    recipients: ["pedagogy@educi.ci"],
  }
]
*/
```

### Détection d'anomalies

```typescript
const anomalyConfig = AI_ANALYTICS_CONFIG.anomalyDetection;
/*
{
  enabled: true,
  methods: [
    { metric: "usage", threshold: 2, window: "24h" },
    { metric: "cost", threshold: 3, window: "7d" },
    { metric: "error_rate", threshold: 2, window: "1h" },
    { metric: "latency", threshold: 2.5, window: "1h" },
  ],
  alertChannels: ["email", "slack"],
  cooldown: 3600000,
}
*/
```

## API Reference

### Endpoints

| Méthode | Endpoint | Description | Rôle requis |
|---------|----------|-------------|-------------|
| GET | `/api/ai/analytics/dashboard` | Dashboard principal | ADMIN, SUPER_ADMIN |
| GET | `/api/ai/analytics/dashboard/:id` | Dashboard spécifique | ADMIN |
| GET | `/api/ai/analytics/metrics` | Métriques globales | ADMIN, SUPER_ADMIN |
| GET | `/api/ai/analytics/metrics/:name` | Métrique spécifique | ADMIN |
| GET | `/api/ai/analytics/reports` | Lister les rapports | ADMIN |
| GET | `/api/ai/analytics/reports/:id` | Détails d'un rapport | ADMIN |
| POST | `/api/ai/analytics/reports` | Créer un rapport | ADMIN, SUPER_ADMIN |
| POST | `/api/ai/analytics/reports/:id/generate` | Générer un rapport | ADMIN |
| GET | `/api/ai/analytics/insights` | Insights IA | ADMIN, SUPER_ADMIN |
| GET | `/api/ai/analytics/usage` | Détails d'utilisation | ADMIN |
| GET | `/api/ai/analytics/costs` | Détails des coûts | ADMIN |
| GET | `/api/ai/analytics/performance` | Performance modèles | ADMIN |
| GET | `/api/ai/analytics/education` | Analytics éducation | ENSEIGNANT, ADMIN |
| POST | `/api/ai/analytics/export` | Exporter des données | ADMIN |
| GET | `/api/ai/analytics/anomalies` | Anomalies détectées | ADMIN |

### Exemples de requêtes

#### Obtenir le dashboard

```typescript
const dashboard = await fetch('/api/ai/analytics/dashboard', {
  headers: { 'Authorization': `Bearer ${token}` },
});

const result = await dashboard.json();
// {
//   id: "overview",
//   name: "Vue d'ensemble",
//   widgets: [
//     { title: "Utilisateurs actifs", value: 892, trend: "+5%" },
//     { title: "Sessions aujourd'hui", value: 245, trend: "+12%" },
//     { title: "Coûts du mois", value: "2,450,000 XOF", trend: "-3%" },
//   ],
//   lastRefreshed: "2025-01-15T10:30:00Z"
// }
```

#### Générer un rapport

```typescript
const report = await fetch('/api/ai/analytics/reports/monthly_education/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    schoolId: 'school-123',
    format: 'pdf',
  }),
});

const result = await report.json();
// {
//   reportId: "report-456",
//   status: "generating",
//   estimatedTime: 30,
//   downloadUrl: null
// }
```

#### Exporter des données

```typescript
const exportResult = await fetch('/api/ai/analytics/export', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    type: 'usage',
    format: 'csv',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    filters: {
      schoolId: 'school-123',
      role: 'eleve',
    },
  }),
});
```

## Usage Examples

### Exemple 1 : Dashboard personnalisé

```typescript
class CustomDashboard {
  private widgets: Widget[];

  async render(): Promise<DashboardData> {
    const widgetData = await Promise.all(
      this.widgets.map(widget => this.fetchWidgetData(widget))
    );

    return {
      widgets: widgetData,
      lastRefreshed: new Date(),
      refreshInterval: this.refreshInterval,
    };
  }

  private async fetchWidgetData(widget: Widget): Promise<WidgetData> {
    const query = this.buildQuery(widget.query, widget.config);
    const data = await analyticsService.query(query);

    return {
      id: widget.id,
      type: widget.type,
      title: widget.title,
      data,
      trend: this.calculateTrend(data),
    };
  }
}
```

### Exemple 2 : Détection d'anomalies

```typescript
class AnomalyDetector {
  async detect(metricName: string): Promise<Anomaly[]> {
    // Récupérer les données historiques
    const historical = await this.getHistoricalData(metricName, '7d');

    // Calculer la moyenne et l'écart-type
    const stats = this.calculateStats(historical);

    // Récupérer la valeur actuelle
    const current = await this.getCurrentValue(metricName);

    // Détecter les anomalies
    const anomalies: Anomaly[] = [];

    if (Math.abs(current - stats.mean) > stats.stdDev * this.threshold) {
      anomalies.push({
        metric: metricName,
        current,
        expected: stats.mean,
        deviation: (current - stats.mean) / stats.stdDev,
        severity: this.calculateSeverity(current, stats),
        timestamp: new Date(),
      });
    }

    // Notifier si nécessaire
    if (anomalies.length > 0) {
      await this.notify(anomalies);
    }

    return anomalies;
  }
}
```

### Exemple 3 : Rapport automatisé

```typescript
class AutomatedReportGenerator {
  async generate(reportConfig: AIReport): Promise<ReportResult> {
    // Exécuter les requêtes
    const results = await Promise.all(
      reportConfig.queries.map(query =>
        analyticsService.execute(query.sql, query.parameters)
      )
    );

    // Générer les visualisations
    const visualizations = await this.generateVisualizations(
      reportConfig.queries,
      results
    );

    // Créer le rapport
    const report = await this.createReport({
      config: reportConfig,
      data: results,
      visualizations,
      generatedAt: new Date(),
    });

    // Envoyer aux destinataires
    await this.sendReport(report, reportConfig.recipients, reportConfig.format);

    return report;
  }
}
```

## Best Practices

### Métriques

1. **Pertinence** : Ne mesurer que l'essentiel
2. **Contextualiser** : Toujours comparer à une période précédente
3. **Agréger** : Respecter la vie privée en agrégeant les données
4. **Automatiser** : Générer les rapports automatiquement
5. **Agir** : Utiliser les insights pour améliorer

### Dashboard

```typescript
// Bon : Dashboard épuré et pertinent
const dashboard = {
  widgets: [
    { type: 'metric', title: 'Utilisateurs actifs' },
    { type: 'line_chart', title: 'Tendance utilisation' },
    { type: 'pie_chart', title: 'Répartition coûts' },
  ],
  refreshInterval: 300000, // 5 minutes
};

// Mauvais : Dashboard surchargé
const overloadedDashboard = {
  widgets: Array(50).fill({ type: 'metric' }),
};
```

### Performance requêtes

```typescript
// Bon : Requêtes optimisées
const query = `
  SELECT DATE(created_at) as date, COUNT(*) as count
  FROM ai_sessions
  WHERE created_at >= $1 AND created_at < $2
  GROUP BY DATE(created_at)
  ORDER BY date
`;

// Bon : Cache des résultats
const cached = await cache.get(`analytics:${hash(query)}`);
if (cached) return cached;

// Mauvais : Requête non optimisée
const badQuery = `SELECT * FROM ai_sessions`;
```

## Security Considerations

- Accès restreint aux données sensibles
- Anonymisation des données personnelles
- Chiffrement des exports
- Audit des accès aux analytics
- Conformité RGPD
- Isolation des données par école
- Pas de détail individuel dans les rapports partagés

## Monitoring and Alerting

| Métrique | Type | Description |
|----------|------|-------------|
| `analytics_queries_total` | Counter | Requêtes exécutées |
| `analytics_query_duration_ms` | Histogram | Durée des requêtes |
| `analytics_reports_generated` | Counter | Rapports générés |
| `analytics_anomalies_detected` | Counter | Anomalies détectées |
| `analytics_dashboard_views` | Counter | Vues des dashboards |
| `analytics_export_size_bytes` | Gauge | Taille des exports |

### Alertes

```typescript
const analyticsAlerts = [
  {
    name: 'Requête lente',
    condition: 'analytics_query_duration_ms > 5000',
    severity: 'medium',
    action: 'optimize_query',
  },
  {
    name: 'Anomalie coût détectée',
    condition: 'analytics_anomalies_detected > 0',
    severity: 'high',
    action: 'notify_admin',
  },
];
```

## Troubleshooting

| Erreur | Code | Cause | Solution |
|--------|------|-------|----------|
| `AiAnalyticsQueryError` | 500 | Erreur de requête | Vérifier la syntaxe |
| `AiAnalyticsTimeoutError` | 408 | Timeout requête | Optimiser la requête |
| `AiReportGenerationError` | 500 | Erreur de génération | Réessayer |
| `AiExportError` | 500 | Erreur d'export | Vérifier les données |
| `AiDashboardError` | 500 | Erreur de dashboard | Vérifier les widgets |
| `AiInsightError` | 500 | Erreur d'insight | Réessayer |

## Changelog

### Version 2.6.0

- Tableaux de bord en temps réel
- Rapports automatisés personnalisables
- Métriques d'utilisation complètes
- Suivi des coûts et optimisation
- Détection d'anomalies
- Export en multiples formats
- Insights IA
- Alertes et notifications
