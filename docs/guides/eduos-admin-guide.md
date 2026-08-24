# EduOS Phase 3.4 — Guide Administrateur

> Version : 3.4.0

---

## 1. Administration système

### Dashboard Admin

L'admin dashboard fournit une vue d'ensemble :

- Utilisateurs actifs
- Transactions du jour
- Alertes système
- Performance
- Erreurs récentes

### Gestion des modules

1. Admin → Modules
2. Voir l'état de chaque module
3. Activer/désactiver un module
4. Configurer les paramètres

```
Modules disponibles:
✅ Core Runtime
✅ Workflow Automation
✅ Digital Identity Wallet
✅ Educational Wallet
✅ Marketplace & Commerce
✅ Governance & Policy
✅ National Registry
✅ Blockchain Education
✅ Ecosystem Integration
✅ AI Orchestrator
✅ Enterprise Data Fabric
✅ Enterprise Automation Hub
```

---

## 2. Gestion des utilisateurs

### Créer un utilisateur

1. Admin → Utilisateurs → Nouveau
2. Remplir les informations
3. Sélectionner le rôle
4. Envoyer l'invitation

### Rôles disponibles

| Rôle | Description |
|------|-------------|
| SUPER_ADMIN | Accès total plateforme |
| ADMIN | Gestion école |
| DIRECTEUR | Supervision académique |
| SECRETAIRE | Administration |
| COMPTABLE | Finance |
| ENSEIGNANT | Enseignement |
| SURVEILLANT | Discipline |
| PARENT | Parent d'élève |
| ELEVE | Élève |
| CHAUFFEUR | Transport |
| BIBLIOTHECAIRE | Bibliothèque |
| INFIRMIER | Santé |
| RH | Ressources humaines |

### Gérer les permissions

1. Admin → Rôles → Sélectionner un rôle
2. Modifier les permissions
3. Sauvegarder

---

## 3. Configuration

### École

1. Admin → Settings → École
2. Informations générales
3. Logo et branding
4. Fuseau horaire et devise
5. Langues supportées

### Paiements

1. Admin → Settings → Paiements
2. Configurer Money Fusion
3. Activer les méthodes de paiement
4. Configurer les limites

### Sécurité

1. Admin → Settings → Sécurité
2. Activer MFA obligatoire
3. Configurer la complexité des mots de passe
4. Gérer les IP whitelistées
5. Configurer les sessions

### Notifications

1. Admin → Settings → Notifications
2. Configurer les templates
3. Activer/désactiver les canaux
4. Paramétrer les heures silencieuses

---

## 4. Wallet Éducatif

### Gérer les transactions

1. Admin → Wallet → Transactions
2. Filtrer par date, type, utilisateur
3. Voir les détails
4. Approuver/rejeter les remboursements

### Configurer les limites

| Paramètre | Défaut |
|-----------|--------|
| Solde max | 10,000,000 XOF |
| Transaction min | 10 XOF |
| Transaction max | 5,000,000 XOF |
| Limite journalière | 2,000,000 XOF |
| Limite hebdomadaire | 10,000,000 XOF |

### Gérer la fraude

1. Admin → Wallet → Fraude
2. Consulter les alertes
3. Geler les comptes suspects
4. Investiguer les transactions

---

## 5. Marketplace

### Gérer les vendeurs

1. Admin → Marketplace → Vendeurs
2. Vérifier les documents
3. Approuver/rejeter
4. Gérer les commissions

### Gérer les produits

1. Admin → Marketplace → Produits
2. Modérer les annonces
3. Gérer les catégories
4. Configurer les taxes

---

## 6. Gouvernance

### Créer une politique

1. Admin → Governance → Politiques
2. Nouvelle politique
3. Rédiger le contenu
4. Soumettre pour approbation

### Organiser un vote

1. Admin → Governance → Votes
2. Créer un vote
3. Définir les options
4. Lancer la période de vote

### Gérer les litiges

1. Admin → Governance → Litiges
2. Consulter les cas
3. Assigner un médiateur
4. Suivre la résolution

---

## 7. Monitoring

### Logs

1. Admin → Monitoring → Logs
2. Filtrer par niveau (INFO, WARN, ERROR)
3. Rechercher par message
4. Exporter

### Métriques

1. Admin → Monitoring → Métriques
3. Performance API
4. Utilisation ressources
5. Erreurs

### Alertes

1. Admin → Monitoring → Alertes
2. Configurer les seuils
3. Définir les canaux (Email, SMS, Push)
4. Historique des alertes

---

## 8. Backup et Recovery

### Backup

- Automatique quotidien
- Rétention 90 jours
- Stockage cloud chiffré

### Recovery

1. Admin → Settings → Backup
2. Sélectionner un point de restauration
3. Confirmer la restauration
4. Vérifier l'intégrité

---

## 9. Support

### Canaux

| Canal | Disponibilité |
|-------|---------------|
| Email | support@educi.com |
| Chat | 24/7 |
| Téléphone | Lun-Ven 8h-18h |
| Documentation | docs.educi.com |

### Escalade

1. Niveau 1: Support standard
2. Niveau 2: Support technique
3. Niveau 3: Ingénierie

---

## 10. Voir aussi

- [Guide utilisateur](eduos-user-guide.md)
- [Guide développeur](eduos-developer-guide.md)
- [Sécurité](../security/eduos-security.md)
- [Monitoring](../monitoring/eduos-monitoring.md)
