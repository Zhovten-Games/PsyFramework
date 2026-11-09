import { describe, it } from 'node:test';
import assert from 'assert';

import { WeightedScoreEngine } from '../src/application/services/WeightedScoreEngine.js';
import { ConfigMethodology } from '../src/core/methodology/ConfigMethodology.js';
import { icd10Config } from '../src/config/methodologies/icd10Config.js';
import { icd11Config } from '../src/config/methodologies/icd11Config.js';
import { dsm5trConfig } from '../src/config/methodologies/dsm5trConfig.js';

const testConfig = {
  id: 'spec',
  label: 'Spec Harness',
  languages: ['en'],
  categories: [
    { id: 'a', names: { default: 'Category A' } },
    { id: 'b', names: { default: 'Category B' } }
  ],
  questions: [
    { id: 'q1', categoryId: 'a', type: 'core', text: { default: 'Core one?' } },
    { id: 'q2', categoryId: 'a', type: 'core', text: { default: 'Core two?' }, impact: true },
    { id: 'q3', categoryId: 'b', type: 'support', text: { default: 'Support?' }, impact: true }
  ],
  labels: [
    {
      id: 'label-core',
      code: 'LC',
      names: { default: 'Label Core' },
      criteria: { core: ['q1', 'q2'], support: ['q3'] }
    }
  ]
};

describe('WeightedScoreEngine', () => {
  it('requires at least two core confirmations to trigger a label', () => {
    const methodology = new ConfigMethodology(testConfig);
    const engine = new WeightedScoreEngine(methodology);
    const results = engine.calculate({ q1: true });
    assert.strictEqual(results.length, 0);
  });

  it('applies support weights and impact multipliers with caps', () => {
    const methodology = new ConfigMethodology(testConfig);
    const engine = new WeightedScoreEngine(methodology);
    const results = engine.calculate({ q1: true, q2: true, q3: true });
    assert.strictEqual(results.length, 1);
    const [label] = results;
    assert.strictEqual(label.coreYes, 2);
    assert.strictEqual(label.supportYes, 1);
    assert.strictEqual(label.impactCount, 2);
    const baseScore = 2 * 1 + 1 * 0.5;
    const expectedMultiplier = Math.min(1 + 2 * 0.25, 1.5);
    assert.strictEqual(label.score, baseScore * expectedMultiplier);
  });

  const configs = [
    ['ICD-10', icd10Config],
    ['ICD-11', icd11Config],
    ['DSM-5-TR', dsm5trConfig]
  ];

  for (const [name, config] of configs) {
    it(`activates every ${name} diagnostic label when criteria are satisfied`, function () {
      const methodology = new ConfigMethodology(config);
      const engine = new WeightedScoreEngine(methodology);

      for (const label of methodology.diagnosticLabels) {
        const responses = {};
        for (const id of label.criteria?.core ?? []) {
          responses[id] = true;
        }
        for (const id of label.criteria?.support ?? []) {
          responses[id] = true;
        }

        const results = engine.calculate(responses);
        const match = results.find((entry) => entry.id === label.id);
        assert.ok(match, `Expected label ${label.id} to be triggered in ${name}`);
        assert.strictEqual(match.coreYes, (label.criteria?.core ?? []).length);
        assert.strictEqual(match.supportYes, (label.criteria?.support ?? []).length);
      }
    });
  }
});
