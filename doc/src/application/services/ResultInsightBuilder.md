# ResultInsightBuilder.js

`ResultInsightBuilder` analyses calculated diagnostic labels to surface high-level result insights. It identifies the leading label, keeps its score handy for display, and determines whether a comorbidity warning should appear when the top two labels have close scores. The builder is intentionally decoupled from DOM concerns so presentation components can remain declarative.
