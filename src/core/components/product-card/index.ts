import './index.css';

import { Product } from '../../../types/types';
import Component from '../../templates/component';
import Cart from '../../Cart';

export default class ProductCard extends Component {
  private item: Product;
  private cart: Cart;

  constructor(tagName: string, className: string, item: Product, cart: Cart) {
    super(tagName, className);
    this.item = item;
    this.cart = cart;
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
    const button = this.container.querySelector('button') as HTMLButtonElement;


    const isItemInCart = () => !!this.cart.items.find(item => item.id === id);

    const changeButtonView = (): void => {
      if(isItemInCart()) {
        button.classList.add('active');
        button.textContent = 'Added ✓';
      } else {
        button.classList.remove('active');
        button.textContent = 'Add';
      }
    }
    changeButtonView();
    
    const addProductHandler = () => {
      if(isItemInCart()) {
        this.cart.removeItem(id);
      } else {
        this.cart.addItem(this.item);
      }
      changeButtonView();
    }

    button?.addEventListener('click', addProductHandler);

    img?.addEventListener('click', () => {
      const newHash = `product-details/${id}`;
      window.location.hash = newHash;
    });
    return this.container;
  }
}

// <p>${description.slice(0, 100) + '...'}</p>
