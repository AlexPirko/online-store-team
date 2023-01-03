import './index.css';

import { Product } from '../../../types/types';
import Component from '../../templates/component';

export default class ProductCard extends Component {
  private item: Product;

  id: number | undefined;

  constructor(tagName: string, className: string, item: Product, id?: number) {
    super(tagName, className);
    this.item = item;
    this.id = id;
  }

  addProduct() {
    let productData: Product[] = [];
    if (window.localStorage.getItem('product-item')) {
      productData = JSON.parse(window.localStorage.getItem('product-item') as string);
      if (!productData.some((event) => event.id == this.id)) {
        productData.push(this.item);
        window.localStorage.setItem('product-item', JSON.stringify(productData));
      }
    } else {
      productData.push(this.item);
      window.localStorage.setItem('product-item', JSON.stringify(productData));
    }
  }

  override render() {
    const { title, price, rating, images } = this.item;
    const html = `
      <div class='img-wrap'>
        <img src='${images[0]}' alt='${title}'>
      </div>
      <div class='products-description'>
        <h3>${title.slice(0, 20)}</h3>
        <p>Rate: ${rating}</p>
        <div class='bottom-bar'>
            <button class='add-product-button'>Add</button>
            <p class='price'>${price} $</p>
        </div>
      </div>
    `;
    this.container.innerHTML = html;
    const button = this.container.querySelector('button');
    button?.addEventListener('click', () => this.addProduct());
    return this.container;
  }
}

// <p>${description.slice(0, 100) + '...'}</p>
