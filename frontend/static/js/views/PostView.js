import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Viewing Posts');
  }

  async getHtml() {
    return `
      <h1>Post View</h1>
      <p>Você está vendo o post.</p>
      <p>
        ID: ${this.params.id}<br />
        DCode: ${this.params.dcode}
      </p>
      <p>
        <a href="/posts" data-link>View All Posts</a>
      </p>
    `;
  }
}
