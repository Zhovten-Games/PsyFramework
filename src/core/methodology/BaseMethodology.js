export class BaseMethodology {
  constructor(config) {
    if (!config) {
      throw new Error('Methodology config is required');
    }
    this.config = config;
  }

  get id() {
    return this.config.id;
  }

  get label() {
    return this.config.label;
  }

  get languages() {
    return this.config.languages;
  }

  get categories() {
    return this.config.categories;
  }

  get questions() {
    return this.config.questions;
  }

  get diagnosticLabels() {
    return this.config.labels;
  }

  findCategoryById(categoryId) {
    return this.categories.find((category) => category.id === categoryId);
  }

  findQuestionById(questionId) {
    return this.questions.find((question) => question.id === questionId);
  }

  getQuestionsByCategory(categoryId) {
    return this.questions.filter((question) => question.categoryId === categoryId);
  }
}
