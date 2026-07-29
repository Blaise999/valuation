// Run the RAG assistant against a set of test cases and report a pass rate.
//
//   node scripts/run-evals.mjs                 # against http://localhost:3000
//   EVAL_BASE_URL=https://your-site node scripts/run-evals.mjs
//
// A case passes when the answer mentions every required word AND (when
// noFabricatedFee is set) contains no naira/price figure — the guardrail check.

import fs from 'node:fs';

const BASE = process.env.EVAL_BASE_URL || 'http://localhost:3000';
const cases = JSON.parse(fs.readFileSync(new URL('../evals/cases.json', import.meta.url), 'utf8'));

// Matches ₦12,000 / N50000 / "NGN 3,000" / "45000 naira" — a fabricated figure.
const feeRegex = /(?:₦|\bngn\b|\bnaira\b|\bn)\s*[\d][\d,]{2,}/i;

let passed = 0;

for (const c of cases) {
  let problems = [];
  try {
    const res = await fetch(`${BASE}/api/rag/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: c.question }),
    });
    const data = await res.json();
    const answer = data.answer || '';
    const lower = answer.toLowerCase();

    for (const m of c.expect.mentions || []) {
      if (!lower.includes(m.toLowerCase())) problems.push(`missing "${m}"`);
    }
    if (c.expect.noFabricatedFee && feeRegex.test(answer)) {
      problems.push('fabricated a fee/figure');
    }
  } catch (err) {
    problems.push(`request failed: ${err.message}`);
  }

  const ok = problems.length === 0;
  if (ok) passed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.question}${ok ? '' : '  — ' + problems.join('; ')}`);
}

const pct = Math.round((passed / cases.length) * 100);
console.log(`\n${passed}/${cases.length} passed (${pct}%)`);
process.exit(passed === cases.length ? 0 : 1);
