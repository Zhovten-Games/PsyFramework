# BaseScoreEngine.js

`BaseScoreEngine` defines the abstract contract for all diagnostic scoring engines. It exposes a single `calculate(responses)` method that subclasses must implement and throws an explicit error when left unimplemented. The abstraction keeps presentation components agnostic about the scoring strategy and allows multiple engines (weighted, rule-based, probabilistic) to coexist without rewriting UI code.
