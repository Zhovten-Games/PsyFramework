export class LanguageCatalog {
  constructor({ languages } = {}) {
    this.languages = Array.isArray(languages) ? [...languages] : [];
  }

  list() {
    return [...this.languages];
  }

  isSupported(language) {
    if (!language) {
      return false;
    }
    return this.languages.includes(language);
  }
}
