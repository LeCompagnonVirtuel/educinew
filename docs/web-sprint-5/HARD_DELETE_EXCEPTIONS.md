# Hard Delete Exceptions — EduCI

## Policy

Hard deletes are allowed ONLY when:
1. Data has no regulatory retention requirement
2. Data is ephemeral/temporary by nature
3. User explicitly requests permanent removal (GDPR compliance)
4. System cleanup of orphaned/test data

## Accepted Hard Delete Exceptions

| Module | Route | Table | Reason | Impact | Validated |
|--------|-------|-------|--------|--------|-----------|
| Adaptive | adaptive/*/[id] | ML model data | Ephemeral ML predictions, no business value after model retrain | None | Yes |
| Enterprise (scaffolded) | enterprise/*/[id] | Various | Skeleton routes with service-layer delegation — actual behavior depends on service | Low | Yes |
| Global-cloud (scaffolded) | global-cloud/*/[id] | Various | External integration skeletons | Low | Yes |
| Gov (scaffolded) | gov/*/[id] | Various | Government integration skeletons | Low | Yes |

## Previously Hard-Deleting (Now Fixed in Sprint 5)

| Entity | Previous Behavior | Current Behavior |
|--------|------------------|-----------------|
| Students | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |
| Teachers | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |
| Schools | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |
| Health records | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |
| Wellbeing | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |
| Bullying | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |
| Safeguarding | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |
| Incidents | `.delete().eq('id', id)` | `.update({ deleted_at: ... })` |

## Verification

Run `node scripts/audit-data-integrity.js` — CRITICAL count for "Hard delete on sensitive entity" should be 0.
