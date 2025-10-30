export class MethodologySnapshotBuilder {
  constructor(methodology) {
    this.methodology = methodology;
  }

  build(locale) {
    if (!this.methodology) {
      return {
        categories: [],
        questions: [],
        categoryNameById: new Map(),
        guidanceByCategory: new Map(),
        labelNameById: new Map()
      };
    }

    const categories = this.methodology.categories.map((category) => {
      const id = category.id;
      const name = this.methodology.translateCategoryName(category, locale);
      const guidance =
        typeof this.methodology.translateCategoryGuidance === 'function'
          ? this.methodology.translateCategoryGuidance(category, locale)
          : null;

      return { id, name, guidance };
    });

    const categoryNameById = new Map();
    const guidanceByCategory = new Map();
    for (const category of categories) {
      categoryNameById.set(category.id, category.name);
      if (category.guidance) {
        guidanceByCategory.set(category.id, category.guidance);
      }
    }

    const questions = this.methodology.questions.map((question) => {
      const categoryId = question.categoryId;
      return {
        id: question.id,
        categoryId,
        categoryName: categoryNameById.get(categoryId) ?? '',
        text: this.methodology.translateQuestionText(question, locale),
        type: question.type ?? 'support',
        impact: Boolean(question.impact)
      };
    });

    const labelNameById = new Map();
    for (const label of this.methodology.diagnosticLabels) {
      labelNameById.set(
        label.id,
        this.methodology.translateLabelName(label, locale)
      );
    }

    return {
      categories,
      questions,
      categoryNameById,
      guidanceByCategory,
      labelNameById
    };
  }
}
