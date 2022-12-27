import './index.css';

import Products from '../../Products';
import Component from '../../templates/component';

export default class FilterBar extends Component {
  protected products: Products;

  constructor(tagName: string, className: string, products: Products) {
    super(tagName, className);
    this.products = products;
  }

  override render() {
    const html = `
      <div class='reset-copy'>
        <button class='reset-filters'>Reset Filters</button>
        <button class='copy-link'>Copy Link</button>
      </div>
    `;
    this.container.innerHTML = html;
    const resetButton = this.container.querySelector('.reset-filters');
    const copyButton = this.container.querySelector('.copy-link');
    resetButton?.addEventListener('click', () => this.products.resetOpts());
    copyButton?.addEventListener('click', () => {
      this.products.copiedURL = window.location.href;
      navigator.clipboard.writeText(window.location.href);
      copyButton.classList.add('active');
    });
    return this.container;
  }
}
