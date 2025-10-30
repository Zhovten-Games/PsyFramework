import { ConfigMethodology } from '../../core/methodology/ConfigMethodology.js';

export class MethodologyProvider {
  constructor({ configResolver } = {}) {
    if (typeof configResolver !== 'function') {
      throw new Error('MethodologyProvider requires a configResolver function');
    }
    this.configResolver = configResolver;
    this.cache = new Map();
  }

  getByLanguage(language) {
    if (!language) {
      return null;
    }

    if (this.cache.has(language)) {
      return this.cache.get(language);
    }

    const config = this.configResolver(language);
    if (!config) {
      return null;
    }

    const methodology = new ConfigMethodology(config);
    this.cache.set(language, methodology);
    return methodology;
  }

  clearCache() {
    this.cache.clear();
  }
}
