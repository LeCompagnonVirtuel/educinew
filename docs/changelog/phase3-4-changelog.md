# EduOS Phase 3.4 — Changelog

> Version : 3.4.0 | Date : 2026-08-05

---

## Nouveautés

### Core Runtime
- Plateforme d'exploitation éducative complète
- Système de modules avec hot reload
- Plugin sandbox isolé
- Service mesh avec health check
- Circuit breaker et retry

### Workflow Automation
- Moteur d'automatisation avec 10 types de steps
- Pipelines data sync, ETL, notifications
- Scheduling cron avec timezone
- Webhooks avec signature HMAC
- Templates de workflows

### Digital Identity Wallet
- Portefeuille d'identité numérique (Student, Teacher, Parent, Staff)
- Credentials vérifiables (VC JWT, VC JSON-LD, ISO MDL)
- Auth biométrique (Fingerprint, Facial, Iris, Voice)
- SSO (SAML2, OIDC, WS-Federation)
- MFA (TOTP, SMS, Email, Push, Hardware Key)
- Zero-knowledge proof
- DID (ION, KEY, WEB, peer)

### Educational Wallet
- Portefeuille éducatif multi-devises (XOF, XAF, EUR, USD)
- Transactions crédit/débit/transfer
- Système de récompenses
- Tokens utility/governance
- Coupons et abonnements
- Fraude detection
- Parent controls

### Marketplace & Commerce
- Place de marché scolaire multi-vendeurs
- Produits avec variants et images
- Panier et checkout multi-étapes
- Paiements (Mobile Money, Card, Bank Transfer)
- Système de review et notation
- Gestion d'inventaire

### Governance & Policy
- Modèles de gouvernance
- Comités avec quorum
- Système de vote
- Politiques versionnées
- Litiges et médiation
- Ombudsman
- Commentaires publics

### National Registry
- Registre national éducatif
- Vérification (QR, Blockchain, API)
- Import/Export multi-format
- Qualité des données
- Historique et versions

### Blockchain Education
- Smart contracts sur Polygon/Ethereum/Solana
- Credentials on-chain
- IPFS pour stockage décentralisé
- NFT éducatifs
- DID décentralisé

### Ecosystem Integration
- Connecteurs REST, SOAP, GraphQL, gRPC
- Intégrations Google (Classroom, Calendar, Drive)
- Intégrations Microsoft (Teams, Office 365)
- LMS (Moodle, Canvas, Blackboard)
- Paiements (Money Fusion, Mobile Money)
- SMS/Email gateways

### AI Orchestrator
- 8 types d'agents IA
- Raisonnement multi-type (déductif, inductif, abductif)
- RAG avec reranking
- Multi-agent collaboration
- Guardrails (safety, toxicity, privacy)
- Knowledge graph

### Enterprise Data Fabric
- Data mesh avec domaines autonomes
- Catalogue de données
- Lignée de données
- ETL et streaming
- Qualité des données automatique
- Gouvernance DCAM

### Enterprise Automation Hub
- Builder visual/code/template
- Low-code/no-code
- Batch processing
- Notifications multi-canal
- Version control intégré
- Collaboration temps réel

---

## Breaking Changes

| Changement | Impact | Migration |
|------------|--------|-----------|
| API v3 uniquement | APIs v1/v2 dépréciées | Migrer vers `/api/v3/` |
| Schema BDD | Tables eduos_* ajoutées | Exécuter les migrations |
| Auth MFA obligatoire | Tous les admin | Configurer MFA |
| Plugin signing | Plugins non signés rejetés | Signer les plugins |

---

## Migration

### 1. Database

```bash
# Exécuter les migrations
supabase db push

# Vérifier
supabase db diff
```

### 2. API

```bash
# Mettre à jour les endpoints
# Ancien: /api/v2/students
# Nouveau: /api/v3/eduos/registry/records
```

### 3. Configuration

```bash
# Ajouter les nouvelles variables d'environnement
cp .env.example .env.local
# Remplir les nouvelles clés
```

### 4. Plugins

```bash
# Signer les plugins existants
eduos-cli plugin sign --plugin-id <id>
```

---

## Dépréciations

| Élément | Fin de vie | Alternative |
|---------|------------|-------------|
| API v1 | 2026-12-01 | API v3 |
| API v2 | 2026-12-01 | API v3 |
| Plugin unsigned | 2026-09-01 | Plugin signing |
| Password-only auth | 2026-09-01 | MFA obligatoire |

---

## Corrections

- Correction du timeout des webhooks
- Fix sur la validation des credentials expirées
- Correction du calcul des transactions en double
- Fix sur la synchronisation offline
- Correction des notifications push sur Android

---

## Voir aussi

- [Documentation principale](../phase3-4-eduos.md)
- [Guide de migration](../guides/eduos-developer-guide.md)
