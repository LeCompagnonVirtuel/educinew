# EduOS Phase 3.4 — Documentation Principale

> Version : 3.4.0 | Dernière mise à jour : 2026-08-05

---

## 1. Vue d'ensemble

EduOS est la plateforme d'exploitation éducative enterprise d'EduCI, un ERP scolaire SaaS multi-tenant. Phase 3.4 introduit 12 modules fondamentaux qui constituent le socle opérationnel complet.

### Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **Core Runtime** | Kernel, scheduler, gestionnaire mémoire/processus, fichiers, réseau |
| 2 | **Workflow Automation** | Moteur d'automatisation, pipelines, schedules, triggers, webhooks |
| 3 | **Digital Identity Wallet** | Portefeuille d'identité numérique, SSO, MFA, biométrie |
| 4 | **Educational Wallet** | Portefeuille éducatif, transactions, récompenses, tokens |
| 5 | **Marketplace & Commerce** | Place de marché scolaire, produits, commandes, paiements |
| 6 | **Governance & Policy** | Gouvernance, politiques, comités, votes, litiges |
| 7 | **National Registry** | Registre national, vérification, import/export, qualité |
| 8 | **Blockchain Education** | Blockchain éducative, smart contracts, identifiants décentralisés |
| 9 | **Ecosystem Integration** | Intégrations tierces, connecteurs, synchronisation |
| 10 | **AI Orchestrator** | Orchestrateur IA, agents, raisonnement, RAG, multi-agent |
| 11 | **Enterprise Data Fabric** | Maillage de données, data mesh, ETL, streaming, qualité |
| 12 | **Enterprise Automation Hub** | Hub d'automatisation, low-code/no-code, batch, notifications |

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    EduOS Platform v3.4                   │
├─────────────────────────────────────────────────────────┤
│  Core Runtime  │  Workflow  │  Digital Identity Wallet  │
├─────────────────────────────────────────────────────────┤
│  Educational   │ Marketplace│  Governance & Policy       │
│  Wallet        │ & Commerce │                            │
├─────────────────────────────────────────────────────────┤
│  National      │ Blockchain │  Ecosystem Integration    │
│  Registry      │ Education  │                            │
├─────────────────────────────────────────────────────────┤
│  AI            │ Enterprise │  Enterprise Automation    │
│  Orchestrator  │ Data Fabric│  Hub                      │
└─────────────────────────────────────────────────────────┘
         │              │                │
    ┌────▼────┐    ┌────▼────┐     ┌────▼────┐
    │Supabase │    │  Cloud  │     │ External│
    │  BDD    │    │ Services│     │   APIs  │
    └─────────┘    └─────────┘     └─────────┘
```

### Principes architecturaux

- **Page → Hook → Service → Repository → Supabase**
- Aucune logique métier dans les pages
- Aucun accès Supabase direct dans les composants UI
- Multi-tenant obligatoire (school_id sur chaque requête)
- RLS ne remplace jamais la validation côté serveur

---

## 3. Tables de données principales

| Module | Tables clés |
|--------|-------------|
| Core Runtime | `eduos_modules`, `eduos_plugins`, `eduos_extensions`, `eduos_service_mesh` |
| Workflow | `eduos_workflows`, `eduos_pipelines`, `eduos_schedules`, `eduos_triggers` |
| Identity Wallet | `eduos_wallets`, `eduos_credentials`, `eduos_mfa_settings` |
| Educational Wallet | `eduos_edu_wallets`, `eduos_transactions`, `eduos_rewards`, `eduos_tokens` |
| Marketplace | `eduos_products`, `eduos_orders`, `eduos_vendors`, `eduos_reviews` |
| Governance | `eduos_policies`, `eduos_committees`, `eduos_votes`, `eduos_disputes` |
| National Registry | `eduos_registry_records`, `eduos_verifications`, `eduos_data_quality` |
| Blockchain | `eduos_smart_contracts`, `eduos_credentials_on_chain`, `eduos_ledger` |
| Integration | `eduos_connectors`, `eduos_sync_jobs`, `eduos_webhooks` |
| AI Orchestrator | `eduos_ai_agents`, `eduos_ai_sessions`, `eduos_knowledge_graph` |
| Data Fabric | `eduos_data_products`, `eduos_data_catalog`, `eduos_etl_pipelines` |
| Automation Hub | `eduos_automations`, `eduos_automation_runs`, `eduos_notifications` |

---

## 4. Considérations de sécurité

| Domaine | Mesure |
|---------|--------|
| Authentification | Supabase Auth + JWT + MFA (TOTP, SMS, Email, Push, Hardware Key) |
| Autorisation | RBAC multi-rôle avec 13 rôles定义 |
| Chiffrement | AES-256-GCM au repos, TLS en transit |
| Biométrie | Fingerprint, Facial, Iris, Voice (confiance min 0.92) |
| Blockchain | Clés HSM, multi-sig (seuil 2/5), rotation 90j |
| Audit | Traçabilité immutable, rétention 10-20 ans |
| Rate Limiting | 100 req/min par défaut, 200 burst max |
| OWASP | CSP, Helmet, CSRF, XSS, SQL Injection protégés |

---

## 5. Configuration globale

```typescript
GLOBAL_SETTINGS: {
  DEFAULT_CURRENCY: 'XOF',
  DEFAULT_TIMEZONE: 'Africa/Abidjan',
  DEFAULT_LANGUAGE: 'fr',
  SUPPORTED_LANGUAGES: ['fr', 'en', 'ar', 'es'],
  SESSION_TIMEOUT_MINUTES: 30,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION_MINUTES: 30,
  PASSWORD_MIN_LENGTH: 8,
}
```

---

## 6. Déploiement

| Paramètre | Valeur |
|-----------|--------|
| Environment | production |
| Région | west-africa |
| Min replicas | 2 |
| Max replicas | 20 |
| CPU | 500m - 2000m |
| Mémoire | 1Gi - 4Gi |
| Stockage | 10Gi - 100Gi |
| TLS | Activé |
| WAF | Activé |
| CDN | Activé |
| DDoS Protection | Activé |

---

## 7. Voir aussi

- [API Documentation](api/eduos-api.md)
- [Architecture Detail](architecture/eduos-architecture.md)
- [Tables de données](database/eduos-tables.md)
- [Sécurité](security/eduos-security.md)
- [Changelog Phase 3.4](changelog/phase3-4-changelog.md)
