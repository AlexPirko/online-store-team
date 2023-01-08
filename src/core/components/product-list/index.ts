import './index.css';
import { Product } from '../../../types/types';
import Products from '../../Products';
import Component from '../../templates/component';
import ProductCard from '../product-card';
import Cart from '../../Cart';

export default class ProductList extends Component {
  protected products: Products;

  protected cart: Cart;

  constructor(tagName: string, className: string, products: Products, cart: Cart) {
    super(tagName, className);
    this.products = products;
    this.cart = cart;
  }

  public override render() {
    const products = this.products.items as Product[];
    if (products.length === 0) {
      this.container.innerHTML = 'Oops - No products!!!)';
      this.container.className = '';
      this.container.classList.add('no-products');
    } else {
      products.forEach((item) => {
        const card = new ProductCard('div', 'product-card', item, this.cart).render();
        this.container.append(card);
      });
    }
    const viewValue = this.products.opts.view;
    if (viewValue) {
      this.container.classList.add(viewValue);
    } else {
      this.container.classList.add('grid');
    }
    return this.container;
  }
}
