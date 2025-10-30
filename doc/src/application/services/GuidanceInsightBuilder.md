# GuidanceInsightBuilder.js

`GuidanceInsightBuilder` derives presentation-ready guidance cards from the methodology configuration. Given category result summaries and a locale, it resolves each category from the methodology, translates the structured guidance entries, normalises empty lists to arrays, and filters out sections without positive responses. Returning `{ categoryId, categoryName, guidance }` objects keeps the presentation layer free from domain traversal while still leaning on the same methodology contract as the rest of the application layer.
