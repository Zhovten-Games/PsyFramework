import { icd10Config } from './methodologies/icd10Config.js';
import { icd11Config } from './methodologies/icd11Config.js';
import { dsm5trConfig } from './methodologies/dsm5trConfig.js';

const methodologyConfigs = {
  ru: icd10Config,
  ja: icd10Config,
  en: icd11Config,
  uk: dsm5trConfig
};

export function getMethodologyConfigByLanguage(language) {
  return methodologyConfigs[language] ?? null;
}

export const supportedLanguages = Object.keys(methodologyConfigs);
