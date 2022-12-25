import './index.css';
import Products from '../../Products';
import Component from '../../templates/component';

export default class ProductsTopBar extends Component {
  protected products: Products;

  constructor(tagName: string, className: string, products: Products) {
    super(tagName, className);
    this.products = products;
  }

  override render() {
    const html = `
      <select id=sort>
        <option value='Price-ASC'>Price ASC</option>
        <option value='Price-DESC'>Price DESC</option>
        <option value='Rating-ASC'>Rating ASC</option>
        <option value='Rating-DESC'>Rating DESC</option>
      </select>
      <input autofocus type='text' id='filter'>
    `;
    this.container.innerHTML = html;
    const optionsList = this.container.querySelectorAll('option');
    optionsList.forEach((option) => {
      if (option.value === this.products.opts.sort) {
        option.selected = true;
      }
    });
    const select = this.container.querySelector('#sort') as HTMLSelectElement;
    select.addEventListener('change', () => {
      this.products.updateOpts('sort', select.value);
    });
    const filterInput = this.container.querySelector('input') as HTMLInputElement;
    if(this.products.opts.search) {
      filterInput.value = this.products.opts.search as string;
    }
    filterInput?.addEventListener('input', (e: Event) => {
      const input = e.target as HTMLInputElement;
      this.products.updateOpts('search', input.value, ['dual-block','filter-block']);
    });

    return this.container;
  }
}
