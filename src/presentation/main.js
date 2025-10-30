import { ScreeningApp } from './components/ScreeningApp.js';

function boot() {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Root element #app not found');
  }
  const app = new ScreeningApp(root);
  app.mount();
}

document.addEventListener('DOMContentLoaded', boot);
