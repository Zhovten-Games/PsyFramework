export class GuidanceInsightBuilder {
  constructor(methodology) {
    this.methodology = methodology;
  }

  build({ categoryResults = [], locale } = {}) {
    if (!this.methodology) {
      return [];
    }

    const translateGuidance =
      typeof this.methodology.translateCategoryGuidance === 'function'
        ? (category, lang) => this.methodology.translateCategoryGuidance(category, lang)
        : () => null;

    const translateCategoryName =
      typeof this.methodology.translateCategoryName === 'function'
        ? (category, lang) => this.methodology.translateCategoryName(category, lang)
        : (category) => category?.name ?? '';

    const results = [];
    for (const categoryResult of categoryResults) {
      if (!categoryResult || categoryResult.positive <= 0) {
        continue;
      }

      const category = this.methodology.findCategoryById(categoryResult.categoryId);
      if (!category) {
        continue;
      }

      const guidance = translateGuidance(category, locale);
      if (!guidance) {
        continue;
      }

      const normalizedGuidance = {
        triggers: Array.isArray(guidance.triggers) ? [...guidance.triggers] : [],
        fears: Array.isArray(guidance.fears) ? [...guidance.fears] : [],
        irritants: Array.isArray(guidance.irritants) ? [...guidance.irritants] : []
      };

      const hasContent =
        normalizedGuidance.triggers.length > 0 ||
        normalizedGuidance.fears.length > 0 ||
        normalizedGuidance.irritants.length > 0;

      if (!hasContent) {
        continue;
      }

      results.push({
        categoryId: category.id,
        categoryName: translateCategoryName(category, locale),
        guidance: normalizedGuidance
      });
    }

    return results;
  }
}
