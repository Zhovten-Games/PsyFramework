import { BaseComponent } from './BaseComponent.js';
import { Translator } from '../../i18n/translations.js';
import { languageFontConfig } from '../../config/languageFontConfig.js';
import { LanguageFontManager } from '../services/LanguageFontManager.js';
import { MethodologyProvider } from '../../application/services/MethodologyProvider.js';
import { ScreeningCalculator } from '../../application/services/ScreeningCalculator.js';
import { LanguageCatalog } from '../../application/services/LanguageCatalog.js';
import { MethodologySnapshotBuilder } from '../../application/services/MethodologySnapshotBuilder.js';
import {
  getMethodologyConfigByLanguage,
  supportedLanguages
} from '../../config/methodologyRegistry.js';

const DEFAULT_LANGUAGE = 'en';

export class ScreeningApp extends BaseComponent {
  constructor(root) {
    super(root);
    this.translator = new Translator(DEFAULT_LANGUAGE);
    this.languageFontManager = new LanguageFontManager(languageFontConfig);
    this.methodologyProvider = new MethodologyProvider({
      configResolver: getMethodologyConfigByLanguage
    });
    this.screeningCalculator = new ScreeningCalculator();
    this.languageCatalog = new LanguageCatalog({
      languages: supportedLanguages
    });
    this.methodologySnapshotBuilder = null;
    this.state = {
      language: null,
      methodology: null,
      responses: {},
      results: null
    };
    this.languageFontManager.apply(DEFAULT_LANGUAGE);
  }

  mount() {
    const initialLanguage = this.state.language ?? DEFAULT_LANGUAGE;
    this.languageFontManager.apply(initialLanguage);
    this.render();
  }

  setLanguage(language) {
    const isSupported = this.languageCatalog.isSupported(language);
    const resolvedLanguage = isSupported ? language : DEFAULT_LANGUAGE;
    const methodology = isSupported
      ? this.methodologyProvider.getByLanguage(resolvedLanguage)
      : null;

    this.translator.setLocale(resolvedLanguage);
    this.state.language = isSupported ? resolvedLanguage : null;
    this.state.methodology = methodology;
    this.methodologySnapshotBuilder = methodology
      ? new MethodologySnapshotBuilder(methodology)
      : null;
    this.state.responses = {};
    this.state.results = null;
    this.languageFontManager.apply(resolvedLanguage);
    this.render();
  }

  updateResponse(questionId, value) {
    this.state.responses = {
      ...this.state.responses,
      [questionId]: value
    };
  }

  calculate() {
    const { methodology, responses } = this.state;
    if (!methodology) {
      return;
    }
    const locale = this.state.language ?? DEFAULT_LANGUAGE;
    const results = this.screeningCalculator.calculate(methodology, responses, {
      locale
    });
    this.state.results = results;
    this.render();
  }

  getMethodologySnapshot() {
    if (!this.methodologySnapshotBuilder) {
      return {
        categories: [],
        questions: [],
        categoryNameById: new Map(),
        guidanceByCategory: new Map(),
        labelNameById: new Map()
      };
    }
    const locale = this.state.language ?? DEFAULT_LANGUAGE;
    return this.methodologySnapshotBuilder.build(locale);
  }

  render() {
    this.clear();
    const snapshot = this.getMethodologySnapshot();
    const fragment = document.createDocumentFragment();
    const header = this.renderHeader();
    const mainPanel = this.renderMainPanel(snapshot);
    const footer = this.renderFooter();

    fragment.append(header, mainPanel, footer);
    this.root.append(fragment);
  }

  renderMainPanel(snapshot) {
    const container = document.createElement('div');
    container.className = 'screening-app';
    const sections = [
      this.renderIntroDescription(),
      this.renderLanguageSelector(),
      this.renderQuestionnaire(snapshot),
      this.renderSubmitRow(),
      this.renderResults(snapshot)
    ].filter(Boolean);
    container.append(...sections);
    return container;
  }

  renderHeader() {
    const header = document.createElement('header');
    header.className = 'app-header';

    const brand = document.createElement('div');
    brand.className = 'app-header__brand';

    const logo = document.createElement('img');
    logo.className = 'app-header__logo';
    logo.src = './assets/images/logo-opt.webp';
    logo.alt = this.translator.t('app.logoAlt');

    const meta = document.createElement('div');
    meta.className = 'app-header__meta';

    const documentName = document.createElement('p');
    documentName.className = 'app-header__document';
    documentName.textContent = this.translator.t('app.documentName');

    const title = document.createElement('h1');
    title.className = 'app-header__title';
    title.textContent = this.translator.t('app.title');

    meta.append(documentName, title);
    brand.append(logo, meta);

    header.append(brand);

    const languageIndicator = document.createElement('span');
    languageIndicator.className = 'app-header__language';
    const languageLabel = this.state.language
      ? this.translator.t(`language.${this.state.language}`)
      : this.translator.t('app.languagePending');
    languageIndicator.textContent = `${this.translator.t('app.activeLanguage')}: ${languageLabel}`;
    header.append(languageIndicator);
    return header;
  }

  renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'app-footer';

    const brand = document.createElement('div');
    brand.className = 'app-footer__brand';

    const logo = document.createElement('img');
    logo.className = 'app-footer__logo';
    logo.src = './assets/images/logo-opt.webp';
    logo.alt = this.translator.t('app.logoAlt');

    const title = document.createElement('p');
    title.className = 'app-footer__title';
    title.innerHTML = this.translator.t('footer.title');

    brand.append(logo, title);

    const links = document.createElement('div');
    links.className = 'app-footer__links';

    const githubLink = document.createElement('a');
    githubLink.className = 'app-footer__link';
    githubLink.href = 'https://github.com/Zhovten-Games';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.textContent = this.translator.t('footer.github');

    const linkedinLink = document.createElement('a');
    linkedinLink.className = 'app-footer__link';
    linkedinLink.href = 'https://www.linkedin.com/company/zhovten-games/';
    linkedinLink.target = '_blank';
    linkedinLink.rel = 'noopener noreferrer';
    linkedinLink.textContent = this.translator.t('footer.linkedin');

    links.append(githubLink, linkedinLink);
    footer.append(brand, links);
    return footer;
  }

  renderLanguageSelector() {
    const wrapper = document.createElement('div');
    wrapper.className = 'selector-row';

    const label = document.createElement('label');
    label.textContent = this.translator.t('selector.languageLabel');
    label.setAttribute('for', 'language-select');

    const select = document.createElement('select');
    select.id = 'language-select';
    select.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = this.translator.t('selector.placeholder');
    placeholder.disabled = true;
    placeholder.selected = !this.state.language;
    select.append(placeholder);

    for (const languageCode of this.languageCatalog.list()) {
      const optionNode = document.createElement('option');
      optionNode.value = languageCode;
      optionNode.textContent = this.translator.t(`language.${languageCode}`);
      if (this.state.language === languageCode) {
        optionNode.selected = true;
      }
      select.append(optionNode);
    }

    select.addEventListener('change', (event) => {
      this.setLanguage(event.target.value);
    });

    wrapper.append(label, select);
    return wrapper;
  }

  renderIntroDescription() {
    const description = document.createElement('p');
    description.className = 'screening-app__intro';
    description.textContent = this.translator.t('app.description');
    return description;
  }

  renderQuestionnaire(snapshot) {
    const block = document.createElement('div');
    block.className = 'questionnaire';
    if (!this.state.methodology) {
      return block;
    }

    for (const question of snapshot.questions) {
      block.append(this.renderQuestionCard(question));
    }
    return block;
  }

  renderQuestionCard(question) {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.dataset.type = question.type;
    card.dataset.questionId = question.id;
    if (question.impact) {
      card.dataset.impact = 'true';
      card.classList.add('question-card--impact');
    }

    if (question.type === 'core') {
      card.classList.add('question-card--core');
    } else if (question.type === 'support') {
      card.classList.add('question-card--support');
    }

    const title = document.createElement('h3');
    title.textContent = question.categoryName;

    const meta = document.createElement('div');
    meta.className = 'question-meta';
    const badges = [];

    if (question.type === 'core') {
      const badge = document.createElement('span');
      badge.className = 'question-badge question-badge--core';
      badge.textContent = this.translator.t('question.badge.core');
      badges.push(badge);
    } else if (question.type === 'support') {
      const badge = document.createElement('span');
      badge.className = 'question-badge question-badge--support';
      badge.textContent = this.translator.t('question.badge.support');
      badges.push(badge);
    }

    if (question.impact) {
      const badge = document.createElement('span');
      badge.className = 'question-badge question-badge--impact';
      badge.textContent = this.translator.t('question.badge.impact');
      badges.push(badge);
    }

    const text = document.createElement('p');
    text.textContent = question.text;

    const actions = document.createElement('div');
    actions.className = 'question-actions';

    const yesButton = this.createAnswerButton(question.id, true, 'buttons.yes');
    const noButton = this.createAnswerButton(question.id, false, 'buttons.no');
    const clearButton = this.createAnswerButton(question.id, undefined, 'buttons.clear');

    if (badges.length > 0) {
      meta.append(...badges);
    }

    actions.append(yesButton, noButton, clearButton);
    card.append(title);
    if (badges.length > 0) {
      card.append(meta);
    }
    card.append(text, actions);
    return card;
  }

  createAnswerButton(questionId, value, translationKey) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = this.translator.t(translationKey);

    const current = this.state.responses[questionId];
    const state = value === undefined ? 'unknown' : value ? 'yes' : 'no';
    if (
      (value === undefined && current === undefined) ||
      (value === true && current === true) ||
      (value === false && current === false)
    ) {
      button.dataset.state = state;
    } else {
      button.dataset.state = 'neutral';
    }

    button.addEventListener('click', () => {
      if (value === undefined) {
        const { [questionId]: _removed, ...rest } = this.state.responses;
        this.state.responses = rest;
      } else {
        this.updateResponse(questionId, value);
      }
      this.render();
    });

    return button;
  }

  renderSubmitRow() {
    const row = document.createElement('div');
    row.className = 'submit-row';
    if (!this.state.methodology) {
      row.classList.add('submit-row--hidden');
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = this.translator.t('buttons.calculate');
    button.addEventListener('click', () => this.calculate());
    button.disabled = !this.state.methodology;
    row.append(button);
    return row;
  }

  renderResults(snapshot) {
    const container = document.createElement('div');
    container.className = 'results';
    const results = this.state.results;
    if (!this.state.methodology) {
      return container;
    }

    if (!results) {
      const placeholder = document.createElement('p');
      placeholder.textContent = this.translator.t('results.empty');
      container.append(placeholder);
      return container;
    }

    const categoryTable = this.renderCategoryTable(results.categories, snapshot);
    const labelCards = this.renderLabelCards(results.labels, snapshot);
    container.append(categoryTable, labelCards);

    const guidanceSection = this.renderCategoryGuidance(results.guidance);
    if (guidanceSection) {
      container.append(guidanceSection);
    }
    return container;
  }

  renderCategoryTable(categoryResults, snapshot) {
    const section = document.createElement('section');
    section.className = 'results-section';
    const title = document.createElement('h2');
    title.textContent = this.translator.t('results.categories.title');
    section.append(title);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    const headers = [
      this.translator.t('results.categories.category'),
      this.translator.t('results.categories.positive'),
      this.translator.t('results.categories.total')
    ];
    for (const headerTitle of headers) {
      const th = document.createElement('th');
      th.textContent = headerTitle;
      headRow.append(th);
    }
    thead.append(headRow);
    table.append(thead);

    const tbody = document.createElement('tbody');
    for (const entry of categoryResults) {
      const row = document.createElement('tr');
      const categoryCell = document.createElement('td');
      categoryCell.textContent = snapshot.categoryNameById.get(entry.categoryId) ?? '';
      const positiveCell = document.createElement('td');
      positiveCell.textContent = String(entry.positive);
      const totalCell = document.createElement('td');
      totalCell.textContent = String(entry.total);
      row.append(categoryCell, positiveCell, totalCell);
      tbody.append(row);
    }
    table.append(tbody);
    section.append(table);
    return section;
  }

  renderLabelCards(labels, snapshot) {
    const section = document.createElement('section');
    section.className = 'results-section';
    const title = document.createElement('h2');
    title.textContent = this.translator.t('results.labels.title');
    section.append(title);

    if (labels.length === 0) {
      const info = document.createElement('p');
      info.textContent = this.translator.t('results.leadingLabel');
      section.append(info);
      return section;
    }

    const insights = this.state.results?.insights ?? null;
    const leadingLabelFromInsight = insights?.leadingLabelId
      ? labels.find((label) => label.id === insights.leadingLabelId)
      : null;
    const leadingLabel = leadingLabelFromInsight ?? labels[0];

    if (leadingLabel) {
      const highlightLeading = document.createElement('p');
      const fallbackScore = Number.isFinite(leadingLabel.score) ? leadingLabel.score : 0;
      const displayScore = Number.isFinite(insights?.leadingScore)
        ? insights.leadingScore
        : fallbackScore;
      highlightLeading.textContent = `${this.translator.t('results.labels.leading')}: ${this.getLabelName(leadingLabel, snapshot)} (${displayScore.toFixed(2)})`;
      section.append(highlightLeading);
    }

    if (insights?.comorbidity) {
      const comorbidity = document.createElement('p');
      comorbidity.textContent = `${this.translator.t('results.labels.comorbidity')}: ${this.translator.t('results.comorbidityHint')}`;
      section.append(comorbidity);
    }

    for (const label of labels) {
      const card = document.createElement('div');
      card.className = 'label-card';
      const cardTitle = document.createElement('h3');
      cardTitle.textContent = this.getLabelName(label, snapshot);
      const codeLine = document.createElement('p');
      codeLine.textContent = `${this.translator.t('results.labels.score')}: ${label.score.toFixed(2)} (${label.code})`;
      const detailLine = document.createElement('p');
      detailLine.textContent = `${this.translator.t('results.labels.detail.coreYes')}: ${label.coreYes}, ${this.translator.t('results.labels.detail.supportYes')}: ${label.supportYes}, ${this.translator.t('results.labels.detail.impact')}: ${label.impactCount}`;
      card.append(cardTitle, codeLine, detailLine);
      section.append(card);
    }
    return section;
  }

  renderCategoryGuidance(guidanceEntries) {
    if (!Array.isArray(guidanceEntries) || guidanceEntries.length === 0) {
      return null;
    }

    const section = document.createElement('section');
    section.className = 'results-section results-section--guidance';
    const title = document.createElement('h2');
    title.textContent = this.translator.t('results.guidance.title');
    section.append(title);

    const grid = document.createElement('div');
    grid.className = 'guidance-grid';

    for (const entry of guidanceEntries) {
      const card = document.createElement('article');
      card.className = 'guidance-card';
      const cardTitle = document.createElement('h3');
      cardTitle.textContent = entry.categoryName ?? '';
      card.append(cardTitle);

      const groups = [
        this.renderGuidanceGroup('results.guidance.triggers', entry.guidance.triggers),
        this.renderGuidanceGroup('results.guidance.fears', entry.guidance.fears),
        this.renderGuidanceGroup('results.guidance.irritants', entry.guidance.irritants)
      ].filter(Boolean);

      for (const group of groups) {
        card.append(group);
      }

      grid.append(card);
    }

    section.append(grid);
    return section;
  }

  renderGuidanceGroup(titleKey, items) {
    if (!items || items.length === 0) {
      return null;
    }
    const group = document.createElement('div');
    group.className = 'guidance-card__group';

    const label = document.createElement('p');
    label.className = 'guidance-card__group-title';
    label.textContent = this.translator.t(titleKey);
    group.append(label);

    const list = document.createElement('ul');
    list.className = 'guidance-card__list';
    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = item;
      list.append(li);
    }
    group.append(list);
    return group;
  }

  getLabelName(label, snapshot) {
    if (!label) {
      return '';
    }
    const localized = snapshot.labelNameById.get(label.id);
    if (localized) {
      return localized;
    }
    const locale = this.state.language ?? DEFAULT_LANGUAGE;
    if (label.names) {
      return label.names[locale] ?? label.names.default ?? '';
    }
    return '';
  }
}
