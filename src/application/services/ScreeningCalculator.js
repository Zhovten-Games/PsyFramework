import { WeightedScoreEngine } from './WeightedScoreEngine.js';
import { CategoryInsightBuilder } from './CategoryInsightBuilder.js';
import { ResultInsightBuilder } from './ResultInsightBuilder.js';
import { GuidanceInsightBuilder } from './GuidanceInsightBuilder.js';

export class ScreeningCalculator {
  constructor({
    scoreEngineFactory,
    categoryInsightBuilderFactory,
    resultInsightBuilderFactory,
    guidanceInsightBuilderFactory
  } = {}) {
    this.createScoreEngine =
      scoreEngineFactory ?? ((methodology) => new WeightedScoreEngine(methodology));
    this.createCategoryInsightBuilder =
      categoryInsightBuilderFactory ??
      ((methodology) => new CategoryInsightBuilder(methodology));
    this.createResultInsightBuilder =
      resultInsightBuilderFactory ?? (() => new ResultInsightBuilder());
    this.createGuidanceInsightBuilder =
      guidanceInsightBuilderFactory ??
      ((methodology) => new GuidanceInsightBuilder(methodology));
  }

  calculate(methodology, responses = {}, { locale } = {}) {
    if (!methodology) {
      return {
        labels: [],
        categories: [],
        insights: null,
        guidance: []
      };
    }

    const scoreEngine = this.createScoreEngine(methodology);
    const labels = scoreEngine.calculate(responses);

    const categoryInsightBuilder = this.createCategoryInsightBuilder(methodology);
    const categories = categoryInsightBuilder.build(responses);

    const resultInsightBuilder = this.createResultInsightBuilder(methodology);
    const insights = resultInsightBuilder.build(labels);

    const guidanceInsightBuilder = this.createGuidanceInsightBuilder(methodology);
    const guidance = guidanceInsightBuilder.build({
      categoryResults: categories,
      locale
    });

    return { labels, categories, insights, guidance };
  }
}
