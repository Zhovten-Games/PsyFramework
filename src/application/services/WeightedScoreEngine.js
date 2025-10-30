import { BaseScoreEngine } from './BaseScoreEngine.js';

const CORE_WEIGHT = 1;
const SUPPORT_WEIGHT = 0.5;
const IMPACT_INCREMENT = 0.25;
const IMPACT_CAP = 1.5;
const DEFAULT_THRESHOLD = 2;
const DEFAULT_CORE_REQUIREMENT = 2;

const isFiniteNumber = (value) => Number.isFinite(value);

const resolveMinimumCoreYes = (criteria) => {
  if (!criteria) {
    return 0;
  }
  const coreIds = Array.isArray(criteria.core) ? criteria.core : [];
  const coreCount = coreIds.length;

  if (coreCount === 0) {
    return 0;
  }

  if (isFiniteNumber(criteria.minimumCoreYes)) {
    const normalized = Math.trunc(criteria.minimumCoreYes);
    return Math.min(Math.max(normalized, 0), coreCount);
  }

  return Math.min(DEFAULT_CORE_REQUIREMENT, coreCount);
};

export class WeightedScoreEngine extends BaseScoreEngine {
  constructor(methodology) {
    super();
    this.methodology = methodology;
  }

  calculate(responses) {
    const labels = [];

    for (const label of this.methodology.diagnosticLabels) {
      const { criteria = {}, names, id, code } = label;
      const { core = [], support = [] } = criteria;
      const minimumCoreYes = resolveMinimumCoreYes(criteria);
      let coreYes = 0;
      let supportYes = 0;
      let baseScore = 0;
      let impactCount = 0;

      for (const id of core) {
        const question = this.methodology.findQuestionById(id);
        if (!question) continue;
        if (responses[id]) {
          coreYes += 1;
          baseScore += CORE_WEIGHT;
          if (question.impact) {
            impactCount += 1;
          }
        }
      }

      for (const id of support) {
        const question = this.methodology.findQuestionById(id);
        if (!question) continue;
        if (responses[id]) {
          supportYes += 1;
          baseScore += SUPPORT_WEIGHT;
          if (question.impact) {
            impactCount += 1;
          }
        }
      }

      if (coreYes < minimumCoreYes) {
        continue;
      }

      let multiplier = 1 + impactCount * IMPACT_INCREMENT;
      multiplier = Math.min(multiplier, IMPACT_CAP);
      const score = baseScore * multiplier;

      if (score >= (label.threshold ?? DEFAULT_THRESHOLD)) {
        labels.push({
          id,
          code,
          names,
          score,
          coreYes,
          supportYes,
          impactCount
        });
      }
    }

    labels.sort((a, b) => b.score - a.score);
    return labels;
  }
}
