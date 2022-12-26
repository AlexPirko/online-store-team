import './index.css';

import Products from '../../Products';
import Component from '../../templates/component';

export default class FilterBar extends Component {
  protected products: Products;

  constructor(tagName: string, className: string, products: Products) {
    super(tagName, className);
    this.products = products;
  }
}
