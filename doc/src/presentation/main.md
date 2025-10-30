# main.js

`main.js` boots the screening experience once the DOM is ready. It locates the `#app` container, ensures it exists, instantiates `ScreeningApp`, and calls `mount()` to render the language selector and questionnaire. The file contains no business logic, keeping startup concerns isolated from presentation components.
