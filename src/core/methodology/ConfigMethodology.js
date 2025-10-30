import { BaseMethodology } from './BaseMethodology.js';

export class ConfigMethodology extends BaseMethodology {
  constructor(config) {
    super(config);
  }

  translateCategoryName(category, locale) {
    return category.names?.[locale] ?? category.names?.default ?? '';
  }

  translateLabelName(label, locale) {
    return label.names?.[locale] ?? label.names?.default ?? '';
  }

  translateQuestionText(question, locale) {
    return question.text?.[locale] ?? question.text?.default ?? '';
  }

  getCategoryGuidance(categoryId) {
    const category = this.findCategoryById(categoryId);
    return category?.guidance ?? null;
  }

  translateCategoryGuidance(categoryOrId, locale) {
    const category =
      typeof categoryOrId === 'string'
        ? this.findCategoryById(categoryOrId)
        : categoryOrId;
    if (!category?.guidance) {
      return null;
    }
    const translateEntries = (entries) => {
      if (!entries) {
        return [];
      }
      const localized = entries[locale];
      const fallback = entries.default;
      const selected = Array.isArray(localized)
        ? localized
        : Array.isArray(fallback)
        ? fallback
        : [];
      return [...selected];
    };
    return {
      triggers: translateEntries(category.guidance.triggers),
      fears: translateEntries(category.guidance.fears),
      irritants: translateEntries(category.guidance.irritants)
    };
  }
}
