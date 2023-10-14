import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Dashboard');
  }

  async getHtml() {
    return `
      <h1>Bem vindo, Dom!</h1>
      <p>Aplicação de página única (SPA)</p>
      <p>
        <a href="/posts" class="nav__link" data-link>Posts recentes</a>
      </p>
    `;
  }
}
