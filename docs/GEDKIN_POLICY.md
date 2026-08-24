# GEDKIN Policy Intelligence Documentation

**Version:** 4.9.0  
**Status:** Active  
**Last Updated:** 2026-08-09

---

## Overview

Policy & Decision Intelligence (Module 6) manages education policies, simulations, decision recommendations, and impact analysis to support evidence-based policy making.

---

## Data Model

### GedkinPolicy

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `name` | string | Policy name (1-300 chars) |
| `description` | string | Policy description (max 5000) |
| `status` | enum | Policy lifecycle status |
| `category` | string | Policy category |
| `effectiveDate` | ISO 8601 | Effective date |
| `expiryDate` | ISO 8601 | Expiry date |
| `content` | string | Policy content |
| `createdAt` | ISO 8601 | Creation timestamp |
| `updatedAt` | ISO 8601 | Last update timestamp |

### GedkinPolicySimulation

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `policyId` | UUID | Parent policy |
| `parameters` | JSONB | Simulation parameters |
| `results` | JSONB | Simulation results |
| `confidence` | number | 0-1 confidence level |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinDecisionRecommendation

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `title` | string | Recommendation title (1-300 chars) |
| `description` | string | Recommendation description (max 5000) |
| `options` | string[] | Decision options |
| `analysisType` | enum | Analysis methodology |
| `confidence` | number | 0-1 confidence level |
| `evidence` | string[] | Supporting evidence |
| `risks` | string[] | Identified risks |
| `benefits` | string[] | Expected benefits |
| `createdAt` | ISO 8601 | Creation timestamp |

### GedkinImpactAnalysis

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `schoolId` | UUID | Tenant identifier |
| `policyId` | UUID | Parent policy |
| `dimension` | string | Impact dimension |
| `baselineValue` | number | Current value |
| `projectedValue` | number | Projected value |
| `impactScore` | number | Impact magnitude |
| `confidence` | number | 0-1 confidence level |
| `timeframe` | string | Impact timeframe |
| `createdAt` | ISO 8601 | Creation timestamp |

---

## Policy Statuses

| Status | Description |
|--------|-------------|
| `DRAFT` | Being drafted |
| `REVIEW` | Under review |
| `APPROVED` | Approved but not yet active |
| `ACTIVE` | Currently in effect |
| `EXPIRED` | Past expiry date |
| `RETIRED` | Permanently withdrawn |

---

## Analysis Types

| Type | Description |
|------|-------------|
| `COST_BENEFIT` | Economic analysis |
| `RISK` | Risk assessment |
| `IMPACT` | Impact evaluation |
| `COMPARISON` | Alternative comparison |
| `WHAT_IF` | Scenario exploration |

---

## Decision Framework

### Cost-Benefit Analysis

```
Net Benefit = Total Benefits - Total Costs
BCR = Total Benefits / Total Costs

BCR > 1.0 → Benefits exceed costs
BCR = 1.0 → Break-even
BCR < 1.0 → Costs exceed benefits
```

### Risk Assessment Matrix

| Likelihood × Impact | Low Impact | Medium Impact | High Impact |
|--------------------|-----------|---------------|-------------|
| High Likelihood | Medium Risk | High Risk | Critical Risk |
| Medium Likelihood | Low Risk | Medium Risk | High Risk |
| Low Likelihood | Low Risk | Low Risk | Medium Risk |

### Impact Dimensions

| Dimension | Description |
|-----------|-------------|
| `ACADEMIC` | Student learning outcomes |
| `FINANCIAL` | Budget and costs |
| `OPERATIONAL` | Daily operations |
| `HUMAN_RESOURCES` | Staff and teachers |
| `TECHNOLOGY` | Systems and tools |
| `COMPLIANCE` | Regulatory adherence |
| `REPUTATION` | Institutional image |

---

## Human-in-the-Loop

All policy recommendations require human approval:

1. **AI Generates** — Recommendation with evidence
2. **Confidence Check** — Threshold validation
3. **Human Review** — Administrator evaluates
4. **Approval/Rejection** — Decision with rationale
5. **Implementation** — Policy execution tracking

### Approval Thresholds

| Confidence | Approval Requirement |
|------------|---------------------|
| ≥ 0.95 | Optional human review |
| 0.80 - 0.94 | Recommended human review |
| < 0.80 | Mandatory human review |

---

## Configuration

```typescript
export const gedkinPolicyConfig = {
  enabled: true,
  maxPoliciesPerSchool: 100,
  simulationEnabled: true,
  impactAnalysisEnabled: true,
  whatIfAnalysisEnabled: true,
  costBenefitAnalysisEnabled: true,
  policyComparisonEnabled: true,
  recommendationEngineEnabled: true,
  humanApprovalRequired: true,
};
```

---

## Zod Validation Schemas

### Create Policy

```typescript
z.object({
  schoolId: z.string().uuid(),
  name: z.string().min(1).max(300),
  description: z.string().max(5000),
  status: z.nativeEnum(GedkinPolicyStatus),
  category: z.string().min(1),
  effectiveDate: z.string().datetime(),
  expiryDate: z.string().datetime(),
  content: z.string().min(1),
})
```

### Create Decision Recommendation

```typescript
z.object({
  schoolId: z.string().uuid(),
  title: z.string().min(1).max(300),
  description: z.string().max(5000),
  options: z.array(z.string()),
  analysisType: z.nativeEnum(GedkinAnalysisType),
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()),
  risks: z.array(z.string()),
  benefits: z.array(z.string()),
})
```

---

## Error Classes

| Error | Code | Status |
|-------|------|--------|
| `GedkinPolicyNotFoundError` | GEDKIN_POLICY_NOT_FOUND | 404 |
| `GedkinPolicyError` | GEDKIN_POLICY | 500 |
| `GedkinPolicyConflictError` | GEDKIN_POLICY_CONFLICT | 409 |
| `GedkinPolicySimulationError` | GEDKIN_POLICY_SIMULATION | 500 |
| `GedkinDecisionRecommendationError` | GEDKIN_DECISION_RECOMMENDATION | 500 |
| `GedkinImpactAnalysisError` | GEDKIN_IMPACT_ANALYSIS | 500 |

---

## Related Documentation

- [GEDKIN.md](GEDKIN.md)
- [GEDKIN_SIMULATION.md](GEDKIN_SIMULATION.md)
- [GEDKIN_OBSERVATORY.md](GEDKIN_OBSERVATORY.md)
