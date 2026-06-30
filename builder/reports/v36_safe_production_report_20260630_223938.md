# VAi v36 Safe Production Report

Created at: 2026-06-30T22:42:56.069Z

## Result

- Current production schema guard: PASS
- Source release schema guard: PASS
- Production outer format preserved: PASS
- Adapted production schema guard: PASS
- n8n import: PASS
- n8n execution: PASS
- Quality Gate runtime fields: PASS
- GitHub production replacement: PASS

## Paths

- Production path: workflows/Tury_v29_0_REAL_QA_node_autonomy_loop.json
- Backup path: builder/backups/production_before_v36_safe_20260630_223938.json
- Safe candidate path: builder/safe_production/Tury_v36_safe_production_candidate_20260630_223938.json
- Source release path: builder/releases/Tury_v34_release_candidate_20260630_215929.json
- Manifest path: builder/releases/v36_safe_production_manifest_20260630_223938.json

## Runtime Quality Gate sample

```json
{
  "score": 1,
  "risk": "high",
  "priceConfidence": "suspicious",
  "checkedAt": "2026-06-30T22:39:49.771Z",
  "status": "Отклонить",
  "rejectReason": "нет source_url; цена некорректная"
}
```

## Next

Final normal v29 autopilot verification must pass.