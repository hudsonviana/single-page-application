import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Viewing Posts');
  }

  async getHtml() {
    console.log(this.params);
    console.log(this.params.id);
    console.log(this.params.dcode);

    return `
      <h1>Post View</h1>
      <p>Você está vendo o post.</p>
    `;
  }
}
