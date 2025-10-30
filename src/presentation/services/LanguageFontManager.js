export class LanguageFontManager {
  constructor(config, documentRef = document) {
    this.config = config;
    this.document = documentRef;
    this.activeClass = null;
  }

  apply(language) {
    const body = this.document?.body;
    if (!body) {
      return;
    }

    if (this.activeClass) {
      body.classList.remove(this.activeClass);
      this.activeClass = null;
    }

    const nextClass = this.config.languages?.[language] ?? this.config.defaultClass ?? null;
    if (nextClass) {
      body.classList.add(nextClass);
      this.activeClass = nextClass;
    }
  }
}
