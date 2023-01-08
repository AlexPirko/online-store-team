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
      <div>
        <select id=sort>
          <option value='Price-ASC'>Price ASC</option>
          <option value='Price-DESC'>Price DESC</option>
          <option value='Rating-ASC'>Rating ASC</option>
          <option value='Rating-DESC'>Rating DESC</option>
        </select>
        <input id='filter' type='text' placeholder='Search product' autofocus >
      </div>
      <div class='products-amount'>Products: ${this.products.items?.length}</div>
      <div class='view-buttons'>
        <button id='grid' class='grid-view' data-view='grid'></button>
        <button id='list' class='line-view' data-view='list'></button>
      </div>
    `;
    this.container.innerHTML = html;

    const viewButtonsContainer = this.container.querySelector('.view-buttons') as Element;
    const viewButtons = viewButtonsContainer.querySelectorAll('button');

    const initActiveButton = () => {
      const viewValue = this.products.opts.view;
      if (viewValue) {
        this.container.querySelector(`#${viewValue}`)?.classList.add('active');
      } else {
        viewButtons[0]?.classList.add('active');
      }
    };
    initActiveButton();

    viewButtonsContainer?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches('button')) {
        viewButtons.forEach((button) => button.classList.remove('active'));
        target.classList.add('active');
        this.products.updateOpts('view', target.dataset.view as string);
      }
    });

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
    if (this.products.opts.search) {
      filterInput.value = this.products.opts.search as string;
    }
    filterInput?.addEventListener('input', (e: Event) => {
      const input = e.target as HTMLInputElement;
      this.products.updateOpts('search', input.value, ['dual-block', 'filter-block']);
    });

    return this.container;
  }
}
