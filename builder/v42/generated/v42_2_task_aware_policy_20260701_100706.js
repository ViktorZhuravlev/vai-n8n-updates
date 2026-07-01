// v42_spec_version: v41.1
// v42_task: improve tour agent: stricter real price, dates, nights and old links checks

// VAi Task-Aware Policy v42.2
// Generated from v41 task-aware spec.
// This node post-processes QA fields and makes risky options harder to recommend.

const checkedAt = new Date().toISOString();

function valueOfAny(obj, keys) {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && String(obj[key]).trim() !== '') {
      return obj[key];
    }
  }
  return '';
}

function textOf(obj) {
  try {
    return JSON.stringify(obj).toLowerCase();
  } catch (e) {
    return '';
  }
}

function parsePrice(value) {
  const raw = String(value ?? '').replace(/\s+/g, '');
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return 0;
  const n = Number(digits);
  if (!Number.isFinite(n)) return 0;
  return n;
}

function hasUsefulSourceUrl(url) {
  const u = String(url || '').trim().toLowerCase();
  if (!u) return false;
  if (!/^https?:\/\//.test(u)) return false;
  if (/google\.|yandex\.|bing\.|search|\/search|query=|text=|utm_only/i.test(u)) return false;
  return true;
}

function addReason(list, reason) {
  if (!list.includes(reason)) list.push(reason);
}

function asNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

for (const item of items) {
  const j = item.json || {};
  const allText = textOf(j);

  const sourceUrl = String(valueOfAny(j, ['source_url', 'Source URL', 'url', 'link', 'Link']) || '').trim();
  const priceRaw = valueOfAny(j, ['price', 'Price', 'tour_price']);
  const price = parsePrice(priceRaw);

  let score = asNumber(valueOfAny(j, ['score', 'Score']), 0);
  let risk = String(valueOfAny(j, ['risk_level', 'Risk Level']) || '').toLowerCase();
  let confidence = String(valueOfAny(j, ['price_confidence', 'Price Confidence']) || '').toLowerCase();

  const reasons = [];

  if (!hasUsefulSourceUrl(sourceUrl)) {
    addReason(reasons, 'v42: missing_or_weak_source_url');
    confidence = 'suspicious';
    risk = 'high';
    score = Math.min(score || 1, 2);
  }

  if (!price || price <= 0) {
    addReason(reasons, 'v42: missing_or_invalid_price');
    confidence = 'suspicious';
    risk = 'high';
    score = Math.min(score || 1, 2);
  }

  if (price > 0 && price < 45000) {
    addReason(reasons, 'v42: unrealistic_low_price');
    confidence = 'suspicious';
    risk = 'high';
    score = Math.min(score || 1, 3);
  }

  if (/old link|stale|archive|cached|expired|not found|404|redirect/i.test(allText)) {
    addReason(reasons, 'v42: stale_or_expired_link_signal');
    confidence = 'suspicious';
    risk = risk === 'high' ? 'high' : 'medium';
    score = Math.min(score || 1, 5);
  }

  if (/ant.?farm|too large|overloaded|crowded|noisy|huge resort|mass hotel|many families/i.test(allText)) {
    addReason(reasons, 'v42: ant_farm_or_noisy_signal');
    risk = risk === 'high' ? 'high' : 'medium';
    score = Math.min(score || 1, 6);
  }

  const requestedNights = parsePrice(valueOfAny(j, ['requested_nights', 'Requested Nights']));
  const actualNights = parsePrice(valueOfAny(j, ['nights', 'Nights']));

  if (requestedNights > 0 && actualNights > 0 && requestedNights !== actualNights) {
    addReason(reasons, 'v42: nights_mismatch');
    risk = 'high';
    score = Math.min(score || 1, 4);
  }

  if (!confidence || confidence === 'confirmed') {
    if (!hasUsefulSourceUrl(sourceUrl) || !price || price <= 0) {
      confidence = 'suspicious';
    }
  }

  const existingReason = String(valueOfAny(j, ['reject_reason', 'Reject Reason']) || '').trim();
  const mergedReason = [existingReason, ...reasons].filter(Boolean).join('; ');

  j.v42_policy_applied = true;
  j.v42_policy_checked_at = checkedAt;
  j.v42_policy_reasons = reasons;
  j.v42_task_aware = true;

  j.score = score;
  j.Score = score;

  j.risk_level = risk || 'medium';
  j['Risk Level'] = j.risk_level;

  j.price_confidence = confidence || 'needs_check';
  j['Price Confidence'] = j.price_confidence;

  j.source_url = sourceUrl;
  j['Source URL'] = sourceUrl;

  j.reject_reason = mergedReason;
  j['Reject Reason'] = mergedReason;

  if (reasons.length > 0 && (risk === 'high' || score <= 3)) {
    j.status = 'reject';
    j['Status'] = 'reject';
  }

  j.checked_at = checkedAt;
  j['Checked At'] = checkedAt;

  item.json = j;
}

return items;
