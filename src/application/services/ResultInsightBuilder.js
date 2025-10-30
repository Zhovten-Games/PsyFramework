export class ResultInsightBuilder {
  constructor({ comorbidityThreshold = 0.5 } = {}) {
    this.comorbidityThreshold = Math.max(0, comorbidityThreshold);
  }

  build(labels = []) {
    if (!Array.isArray(labels) || labels.length === 0) {
      return {
        leadingLabelId: null,
        leadingScore: null,
        comorbidity: false,
        comparisonLabelIds: []
      };
    }

    const sortedLabels = [...labels].sort((a, b) => {
      const scoreA = Number.isFinite(a?.score) ? a.score : 0;
      const scoreB = Number.isFinite(b?.score) ? b.score : 0;
      return scoreB - scoreA;
    });

    const [leading, second] = sortedLabels;
    const leadingScore = Number.isFinite(leading?.score) ? leading.score : null;
    const secondScore = Number.isFinite(second?.score) ? second.score : null;

    let comorbidity = false;
    if (leadingScore !== null && secondScore !== null) {
      const difference = Math.abs(leadingScore - secondScore);
      comorbidity = difference <= this.comorbidityThreshold;
    }

    return {
      leadingLabelId: leading?.id ?? null,
      leadingScore,
      comorbidity,
      comparisonLabelIds: sortedLabels.slice(0, 2).map((label) => label.id)
    };
  }
}
