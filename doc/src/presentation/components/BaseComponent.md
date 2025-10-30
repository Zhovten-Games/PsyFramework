# BaseComponent.js

`BaseComponent` is the minimal superclass for UI widgets. It stores the DOM root reference and exposes a `clear()` helper that removes existing children before rerendering. `ScreeningApp` extends this class to guarantee consistent mount behaviour across future components.
