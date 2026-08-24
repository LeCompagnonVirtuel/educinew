# INVESTMENTS.md — Module Investissements

> Phase 4.5 GEFI²P — Gestion Financière Intégrée et Intelligente

---

## 1. Vue d'ensemble

Le module gère les placements financiers et investissements de l'établissement : dépôts à terme, obligations, fonds d'investissement, immobilisations et suivi de la performance.

---

## 2. Schéma de base de données

```sql
-- Investissements
CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES schools(id),
  investment_name VARCHAR(300) NOT NULL,
  investment_type VARCHAR(50) CHECK (investment_type IN (
    'FIXED_DEPOSIT', 'BOND', 'MONEY_MARKET', 'MUTUAL_FUND',
    'REAL_ESTATE', 'EQUIPMENT', 'OTHER'
  )),
  institution VARCHAR(200) NOT NULL,
  principal_amount DECIMAL(15,2) NOT NULL,
  current_value DECIMAL(15,2),
  interest_rate DECIMAL(5,2),
  currency VARCHAR(3) DEFAULT 'XOF',
  purchase_date DATE NOT NULL,
  maturity_date DATE,
  status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN (
    'ACTIVE', 'MATURED', 'REDEEMED', 'LIQUIDATED'
  )),
  bank_account_id UUID REFERENCES institution_bank_accounts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Revenus d'investissement
CREATE TABLE investment_income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id UUID NOT NULL REFERENCES investments(id),
  income_type VARCHAR(30) CHECK (income_type IN (
    'INTEREST', 'DIVIDEND', 'CAPITAL_GAIN', 'RENTAL', 'OTHER'
  )),
  amount DECIMAL(15,2) NOT NULL,
  income_date DATE NOT NULL,
  received BOOLEAN DEFAULT FALSE,
  received_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions d'investissement
CREATE TABLE investment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id UUID NOT NULL REFERENCES investments(id),
  transaction_type VARCHAR(30) CHECK (transaction_type IN (
    'PURCHASE', 'ADDITIONAL_PURCHASE', 'REDEMPTION', 'INTEREST_PAYMENT', 'MATURITY'
  )),
  amount DECIMAL(15,2) NOT NULL,
  transaction_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_investments_school ON investments(school_id);
CREATE INDEX idx_investments_type ON investments(investment_type);
CREATE INDEX idx_investments_status ON investments(status);
CREATE INDEX idx_invest_income_invest ON investment_income(investment_id);
CREATE INDEX idx_invest_tx_invest ON investment_transactions(investment_id);
```

---

## 3. RBAC

| Rôle | Consulter | Créer | Liquidation | Voir revenus |
|------|:-:|:-:|:-:|:-:|
| SUPER_ADMIN | ✓ | ✓ | ✓ | ✓ |
| ADMIN | ✓ | ✓ | ✗ | ✓ |
| COMPTABLE | ✓ | ✗ | ✗ | ✓ |
| DIRECTEUR | ✓ (lecture) | ✗ | ✗ | ✓ |

---

## 4. API Endpoints

```
GET    /api/investments                        → Lister les investissements
POST   /api/investments                        → Créer un investissement
GET    /api/investments/:id                    → Détail d'un investissement
PATCH  /api/investments/:id                    → Modifier (statut, valeur)
GET    /api/investments/:id/income             → Revenus générés
POST   /api/investments/:id/income             → Enregistrer un revenu
GET    /api/investments/:id/transactions       → Historique des transactions
GET    /api/investments/performance            → Tableau de bord performance
```

---

## 5. Règles métier

1. **Valorisation** : Mise à jour mensuelle de la valeur actuelle
2. **Maturité** : Alerte 30 jours avant échéance
3. **Performance** : Calcul du rendement annualisé
4. **Diversification** : Alerte si > 40% du portefeuille dans un seul type
5. **Autorisation** : Investissements > 5M XOF nécessitent validation ADMIN

---

*Version 1.0 — Phase 4.5 GEFI²P — EduCI ERP*
