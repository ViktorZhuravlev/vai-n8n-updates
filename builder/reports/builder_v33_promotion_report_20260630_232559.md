# VAi Builder v33 Promotion Gate Report

Created at: 2026-06-30T23:28:33.228Z

## Result

- Previous status CANDIDATE_QA_PASS: PASS
- Candidate static JSON check: PASS
- n8n import: PASS
- n8n execution: PASS
- Quality Gate actual output fields: PASS
- Production workflow touched: NO

## Candidate

- Source candidate: builder/candidates/Tury_v31_quality_gate_candidate_20260630_232313.json
- Promoted workflow: builder/promoted/Tury_v33_quality_gate_promoted_20260630_232559.json
- Test workflow id: vaiTuryV33PromotionQA

## Quality Gate node

- Node: VAi Quality Gate v31

## Actual output sample

```json
{
  "score": 1,
  "risk": "high",
  "priceConfidence": "suspicious",
  "status": "Отклонить",
  "rejectReason": "нет source_url; цена некорректная"
}
```

## Next step

v34 can add controlled promotion into a new non-production workflow slot or create final manual approval gate before replacing production workflow.