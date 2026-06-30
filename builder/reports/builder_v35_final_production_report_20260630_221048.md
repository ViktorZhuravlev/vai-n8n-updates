# VAi Builder v35 Final Production Gate Report

Created at: 2026-06-30T22:14:08.627Z

## Result

- Previous RELEASE_CANDIDATE_READY: PASS
- GitHub production backup: PASS
- Pre-production import: PASS
- Pre-production execution: PASS
- Pre-production Quality Gate fields: PASS
- Final production ID import: PASS
- Final production ID execution: PASS
- Final production Quality Gate fields: PASS
- GitHub production workflow replacement: PASS

## Paths

- Production path: workflows/Tury_v29_0_REAL_QA_node_autonomy_loop.json
- Backup path: builder/backups/production_before_v35_20260630_221048.json
- Source release workflow: builder/releases/Tury_v34_release_candidate_20260630_215929.json
- Manifest: builder/releases/release_v35_manifest_20260630_221048.json

## Pre-production sample

```json
{
  "score": 1,
  "risk": "high",
  "priceConfidence": "suspicious",
  "checkedAt": "2026-06-30T22:11:00.523Z",
  "status": "Отклонить",
  "rejectReason": "нет source_url; цена некорректная"
}
```

## Final production sample

```json
{
  "score": 1,
  "risk": "high",
  "priceConfidence": "suspicious",
  "checkedAt": "2026-06-30T22:12:26.402Z",
  "status": "Отклонить",
  "rejectReason": "нет source_url; цена некорректная"
}
```

## Next step

Run normal v29 autopilot once and confirm GitHub publish / Sheets QA still pass.