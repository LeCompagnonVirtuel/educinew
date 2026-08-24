# EduOS Phase 3.4 — Monitoring

> Version : 3.4.0

---

## 1. Métriques

### Application

| Métrique | Description |
|----------|-------------|
| `http_requests_total` | Nombre total de requêtes |
| `http_request_duration_seconds` | Latence des requêtes |
| `http_errors_total` | Nombre d'erreurs |
| `active_users` | Utilisateurs actifs |
| `transactions_total` | Transactions wallet |
| `ai_requests_total` | Requêtes IA |
| `workflow_runs_total` | Exécutions workflows |

### Infrastructure

| Métrique | Description |
|----------|-------------|
| `cpu_usage_percent` | Utilisation CPU |
| `memory_usage_bytes` | Utilisation mémoire |
| `disk_usage_bytes` | Utilisation disque |
| `network_io_bytes` | Trafic réseau |
| `container_restarts` | Redémarrages containers |

### Business

| Métrique | Description |
|----------|-------------|
| `payments_total` | Paiements traités |
| `payments_failed` | Paiements échoués |
| `registrations_total` | Inscriptions |
| `logins_total` | Connexions |

---

## 2. Alertes

### Règles

| Algorithme | Sévérité | Condition |
|------------|----------|-----------|
| Error rate > 1% | Critique | 5 min |
| Response P95 > 2s | Haute | 5 min |
| CPU > 80% | Haute | 10 min |
| Memory > 85% | Haute | 10 min |
| Disk > 90% | Moyenne | 30 min |
| Cache hit < 80% | Basse | 1h |
| DB connections > 80% | Haute | 5 min |

### Canaux

| Canal | Usage |
|-------|-------|
| Email | Alertes non-critiques |
| SMS | Alertes critiques |
| Push | Alertes temps réel |
| Slack/Teams | Notifications équipe |
| PagerDuty | Escalade on-call |

---

## 3. Logging

### Niveaux

| Niveau | Usage |
|--------|-------|
| DEBUG | Développement uniquement |
| INFO | Événements normaux |
| WARN | Avertissements |
| ERROR | Erreurs |
| FAIL | Erreurs critiques |

### Format JSON

```json
{
  "timestamp": "2026-08-05T15:30:00Z",
  "level": "INFO",
  "message": "Payment processed",
  "service": "eduos-marketplace",
  "school_id": "uuid",
  "user_id": "uuid",
  "trace_id": "abc123",
  "duration_ms": 150
}
```

### Rétention

| Niveau | Rétention |
|--------|-----------|
| INFO+ | 90 jours |
| ERROR+ | 365 jours |
| Audit | 10 ans |

---

## 4. Tracing

| Paramètre | Valeur |
|-----------|--------|
| Enabled | true |
| Sample rate | 10% |
| Propagation | W3C TraceContext |
| Export | OpenTelemetry |

---

## 5. Dashboards

### Dashboard Global

- Vue d'ensemble santé plateforme
- Requêtes par minute
- Erreurs par minute
- Latence P50/P95/P99

### Dashboard Module

- Métriques par module
- Dépendances
- Health checks

### Dashboard Business

- Transactions
- Utilisateurs actifs
- Conversion rates

---

## 6. SLOs

| SLO | Target | Error Budget |
|-----|--------|--------------|
| Disponibilité | 99.9% | 0.1% |
| Latence P95 | < 500ms | 1% |
| Erreurs | < 0.1% | 0.1% |

---

## 7. Outils

| Outil | Usage |
|-------|-------|
| Prometheus | Métriques |
| Grafana | Dashboards |
| Sentry | Erreurs |
| OpenTelemetry | Tracing |
| Uptime Robot | Disponibilité |

---

## 8. Voir aussi

- [Performance](../performance/eduos-performance.md)
- [Sécurité](../security/eduos-security.md)
- [Documentation principale](../phase3-4-eduos.md)
