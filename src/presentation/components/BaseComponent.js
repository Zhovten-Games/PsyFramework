export class BaseComponent {
  constructor(root) {
    this.root = root;
  }

  clear() {
    if (this.root) {
      this.root.innerHTML = '';
    }
  }
}
