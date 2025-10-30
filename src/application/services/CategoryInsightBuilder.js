export class CategoryInsightBuilder {
  constructor(methodology) {
    this.methodology = methodology;
  }

  build(responses) {
    return this.methodology.categories.map((category) => {
      const questions = this.methodology.getQuestionsByCategory(category.id);

      const positive = questions.reduce((total, question) => {
        return total + (responses[question.id] ? 1 : 0);
      }, 0);

      return {
        categoryId: category.id,
        total: questions.length,
        positive
      };
    });
  }
}
