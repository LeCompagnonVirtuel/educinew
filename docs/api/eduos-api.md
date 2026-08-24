# EduOS Phase 3.4 — Documentation API

> Version : 3.4.0 | Base URL : `/api/v3/eduos`

---

## Authentification

Toutes les requêtes API nécessitent un JWT Bearer Token.

```
Authorization: Bearer <jwt_token>
```

Les endpoints admin nécessitent en plus une vérification RBAC.

---

## 1. Core Runtime

### Modules

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/modules` | Lister tous les modules |
| GET | `/modules/:id` | Détail d'un module |
| POST | `/modules` | Créer un module |
| PUT | `/modules/:id` | Mettre à jour un module |
| DELETE | `/modules/:id` | Supprimer un module |

```json
// POST /api/v3/eduos/modules
{
  "name": "custom-grading",
  "version": "1.0.0",
  "description": "Custom grading module",
  "dependencies": ["core-runtime"],
  "config": { "enabled": true }
}
```

### Plugins

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/plugins` | Lister les plugins |
| POST | `/plugins/install` | Installer un plugin |
| PUT | `/plugins/:id/enable` | Activer un plugin |
| DELETE | `/plugins/:id` | Désinstaller un plugin |

### Service Mesh

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/mesh/services` | Services enregistrés |
| GET | `/mesh/health` | État de santé du mesh |
| POST | `/mesh/register` | Enregistrer un service |

---

## 2. Workflow Automation

### Workflows

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/workflows` | Lister les workflows |
| POST | `/workflows` | Créer un workflow |
| POST | `/workflows/:id/execute` | Exécuter un workflow |
| POST | `/workflows/:id/cancel` | Annuler une exécution |

```json
// POST /api/v3/eduos/workflows
{
  "name": "student-onboarding",
  "steps": [
    { "type": "DATABASE", "action": "create_student_record" },
    { "type": "NOTIFICATION", "action": "send_welcome_email" },
    { "type": "TRANSFORM", "action": "generate_credentials" }
  ],
  "trigger": { "type": "EVENT", "event": "student.enrolled" }
}
```

### Pipelines

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/pipelines` | Lister les pipelines |
| POST | `/pipelines/:id/run` | Lancer un pipeline |
| GET | `/pipelines/:id/status` | Statut d'exécution |

### Schedules

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/schedules` | Lister les schedules |
| POST | `/schedules` | Créer un schedule |
| PUT | `/schedules/:id` | Modifier un schedule |

---

## 3. Digital Identity Wallet

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/wallets` | Créer un portefeuille |
| GET | `/wallets/:id` | Obtenir un portefeuille |
| POST | `/wallets/:id/credentials` | Ajouter une credential |
| POST | `/wallets/:id/verify` | Vérifier une credential |
| POST | `/wallets/:id/biometric` | Auth biométrique |

```json
// POST /api/v3/eduos/wallets
{
  "type": "STUDENT",
  "owner_id": "uuid-student",
  "credentials": [],
  "biometric_enabled": true
}
```

---

## 4. Educational Wallet

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/edu-wallets/:id` | Solde du portefeuille |
| POST | `/edu-wallets/:id/credit` | Créditer |
| POST | `/edu-wallets/:id/debit` | Débiter |
| GET | `/edu-wallets/:id/transactions` | Historique |
| POST | `/edu-wallets/:id/transfer` | Transférer |

```json
// POST /api/v3/eduos/edu-wallets/:id/debit
{
  "amount": 5000,
  "currency": "XOF",
  "type": "TUITION",
  "description": "Frais de scolarité trimestre 1"
}
```

---

## 5. Marketplace & Commerce

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/products` | Catalogue produits |
| POST | `/products` | Créer un produit |
| POST | `/orders` | Passer une commande |
| GET | `/orders/:id` | Détail commande |
| PUT | `/orders/:id/status` | Mettre à jour le statut |

---

## 6. Governance & Policy

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/policies` | Lister les politiques |
| POST | `/policies` | Créer une politique |
| POST | `/policies/:id/approve` | Approuver |
| POST | `/votes` | Voter |
| POST | `/disputes` | Déposer un litige |

---

## 7. National Registry

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/registry/records` | Rechercher des enregistrements |
| POST | `/registry/verify` | Vérifier un enregistrement |
| POST | `/registry/import` | Importer des données |
| GET | `/registry/export` | Exporter des données |

---

## 8. Blockchain Education

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/blockchain/credentials` | Émettre une credential |
| POST | `/blockchain/verify` | Vérifier une credential |
| GET | `/blockchain/ledger/:id` | Consulter le ledger |
| POST | `/blockchain/contracts` | Déployer un smart contract |

---

## 9. Ecosystem Integration

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/connectors` | Lister les connecteurs |
| POST | `/connectors` | Créer un connecteur |
| POST | `/connectors/:id/sync` | Synchroniser |
| GET | `/connectors/:id/health` | Santé du connecteur |
| POST | `/webhooks` | Créer un webhook |

---

## 10. AI Orchestrator

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/ai/agents` | Lister les agents IA |
| POST | `/ai/agents` | Créer un agent |
| POST | `/ai/sessions` | Démarrer une session |
| POST | `/ai/query` | Interroger l'IA |

```json
// POST /api/v3/eduos/ai/query
{
  "agent_id": "tutor-001",
  "query": "Explique le théorème de Pythagore",
  "context": { "student_level": "6ème" },
  "model": "GPT4"
}
```

---

## 11. Enterprise Data Fabric

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/data/products` | Lister les data products |
| GET | `/data/catalog` | Catalogue de données |
| GET | `/data/lineage/:id` | Lignée des données |
| POST | `/data/etl/run` | Lancer un pipeline ETL |

---

## 12. Enterprise Automation Hub

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/automations` | Lister les automatisations |
| POST | `/automations` | Créer une automatisation |
| POST | `/automations/:id/run` | Exécuter |
| GET | `/automations/:id/runs` | Historique d'exécution |
| POST | `/notifications/send` | Envoyer une notification |

---

## Codes de réponse

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé |
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Non autorisé |
| 404 | Non trouvé |
| 409 | Conflit |
| 429 | Trop de requêtes |
| 500 | Erreur serveur |

---

## Rate Limiting

| Limite | Valeur |
|--------|--------|
| Défaut | 100 req/min |
| Burst | 200 req/min |
| API Key | 200 req/min |
| Webhook | 50 req/min |
