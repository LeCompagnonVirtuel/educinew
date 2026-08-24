# EduOS Phase 3.4 — Déploiement

> Version : 3.4.0 | Kubernetes + Supabase + Vercel

---

## 1. Processus de déploiement

### Environnements

| Environnement | Usage | Branche |
|---------------|-------|---------|
| Development | Développement | feature/* |
| Staging | Tests d'intégration | develop |
| Production | Production | main |

### Pipeline CI/CD

```
Push → Lint → TypeCheck → Test → Build → Deploy → Health Check
         │                                        │
         └── Fail? → Block merge                   └── Fail? → Rollback
```

---

## 2. Configuration d'environnement

### Variables requises

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth
JWT_SECRET=
MFA_ISSUER=EduOS

# Blockchain
POLYGON_RPC_URL=
ETHEREUM_RPC_URL=
IPFS_GATEWAY_URL=

# AI Services
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Payment
MONEY_FUSION_API_KEY=
MONEY_FUSION_SECRET=

# Email/SMS
SENDGRID_API_KEY=
AFRICAS_TALKING_API_KEY=

# Monitoring
SENTRY_DSN=
LOG_LEVEL=INFO
```

### Feature Flags

```env
AI_TUTOR_ENABLED=true
BLOCKCHAIN_CREDENTIALS_ENABLED=true
DIGITAL_WALLET_ENABLED=true
MARKETPLACE_ENABLED=true
GOVERNANCE_MODULE_ENABLED=true
NATIONAL_REGISTRY_ENABLED=true
DATA_FABRIC_ENABLED=true
AUTOMATION_HUB_ENABLED=true
OFFLINE_MODE_ENABLED=false
MAINTENANCE_MODE=false
```

---

## 3. Infrastructure Kubernetes

### Ressources

| Ressource | Request | Limit |
|-----------|---------|-------|
| CPU | 500m | 2000m |
| Mémoire | 1Gi | 4Gi |
| Stockage | 10Gi | 100Gi |

### Auto-scaling

| Paramètre | Valeur |
|-----------|--------|
| Min replicas | 2 |
| Max replicas | 20 |
| Target CPU | 70% |
| Target Memory | 80% |

### Health Checks

| Endpoint | Usage |
|----------|-------|
| `/health` | Check santé global |
| `/ready` | Readiness probe |
| `/live` | Liveness probe |

---

## 4. Déploiement Web (Vercel)

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "regions": ["cdg1"],
  "functions": {
    "api/**": {
      "maxDuration": 30
    }
  }
}
```

---

## 5. Déploiement Mobile (EAS)

```json
// eas.json
{
  "build": {
    "production": {
      "distribution": "store",
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

## 6. Post-déploiement

### Checklist

- [ ] Health checks passent
- [ ] SSL/TLS valide
- [ ] DNS configuré
- [ ] CDN actif
- [ ] WAF actif
- [ ] Monitoring actif
- [ ] Alerts configurées
- [ ] Backup vérifié
- [ ] RLS vérifié

### Rollback

```bash
# Kubernetes
kubectl rollout undo deployment/eduos-api

# Vercel
vercel rollback

# Database
supabase db reset --linked
```

---

## 7. Monitoring post-déploiement

| Métrique | Seuil alerte |
|----------|--------------|
| Error rate | > 1% |
| Response time P95 | > 2s |
| CPU usage | > 80% |
| Memory usage | > 85% |
| Disk usage | > 90% |

---

## 8. Voir aussi

- [Documentation principale](../phase3-4-eduos.md)
- [Monitoring](../monitoring/eduos-monitoring.md)
- [Backup](../backup/eduos-backup.md)
