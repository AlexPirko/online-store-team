import './index.css';
import Component from "../../templates/component";
import Products from "../../Products";

export default class FilterBlock extends Component {
  protected products: Products;
  protected filterBy: string;

  constructor(tagName: string, className: string, filterBy: string, products: Products) {
    super(tagName, className);
    this.products = products;
    this.filterBy = filterBy
  }

  public override render() {
    const filterList = this.products.initialItems?.map(item => item[this.filterBy]);
    const uniqFilterItems = [...new Set(filterList)];

    const filterTitle = document.createElement('h3');
    filterTitle.textContent = this.filterBy;

    const filterForm = document.createElement('form');
    filterForm.classList.add('filter-form');

    uniqFilterItems.forEach(item => {
      const filterItem = document.createElement('div');
      filterItem.classList.add('filter-item');
      const isChecked = this.products.opts[this.filterBy]?.split('↕').some(str => str === item);

      const totalCount = this.products.initialItems?.filter(product => product[this.filterBy] === item).length;
      const availableCount = this.products.items?.filter(product => product[this.filterBy] === item).length;

      if(!availableCount) {
        filterItem.classList.add('hide');
      }

      const html = `
        <input type='checkbox' ${isChecked ? 'checked' : ''} id='${item}'>
        <label for='${item}'>${item}</label>
        <span>${availableCount} / ${totalCount}</span>
      `;
      filterItem.innerHTML = html;
      filterForm.append(filterItem);
    });

    filterForm.addEventListener('click', e => {
      const elem = e.target as Element;
      const form = e.currentTarget as Element;
      if (elem.matches('input')) {
        const checkedItems = [...form.querySelectorAll('input')].filter(i => i.checked).map(i => i.id);
        if (checkedItems.length === 0) {
          this.products.updateOpts(this.filterBy, '', ['dual-block','filter-block']);
        } else {
          const queryString = checkedItems.join('↕');
          this.products.updateOpts(this.filterBy, queryString, ['dual-block', 'filter-block']);
        }
      }
    });

    this.container.append(filterTitle);
    this.container.append(filterForm);
    return this.container;
  }
}
