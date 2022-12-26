import './index.css';
import { Product } from '../../../types/types';
import Products from '../../Products';
import Component from '../../templates/component';
import ProductCard from '../product-card';

export default class ProductList extends Component {
  protected products: Products;

  constructor(tagName: string, className: string, products: Products) {
    super(tagName, className);
    this.products = products;
  }

  public override render() {
    const products = this.products.items as Product[];
    products.forEach((item) => {
      const card = new ProductCard('div', 'product-card', item).render();
      this.container.append(card);
    });
    const viewValue = this.products.opts.view;
    if (viewValue) {
      this.container.classList.add(viewValue);
    } else {
      this.container.classList.add('grid');
    }
    return this.container;
  }
}
