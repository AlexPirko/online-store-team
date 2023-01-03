import './index.css';

import { Product } from '../../../types/types';
import Component from '../../templates/component';

export default class ProductCard extends Component {
  private item: Product;

  constructor(tagName: string, className: string, item: Product) {
    super(tagName, className);
    this.item = item;
  }

  override render() {
    const { title, price, rating, images, id } = this.item;
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
    const img = this.container.querySelector('img');
    const button = this.container.querySelector('button');
    button?.addEventListener('click', () => console.log(title));
    img?.addEventListener('click', () => {
      const newHash = `product-details/${id}`;
      window.location.hash = newHash;
    });
    return this.container;
  }
}

// <p>${description.slice(0, 100) + '...'}</p>
