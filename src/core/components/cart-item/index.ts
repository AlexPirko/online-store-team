import './index.css';
import { Product } from '../../../types/types';
import Cart from '../../Cart';
import Component from '../../templates/component';

export default class CartItem extends Component {
  cart: Cart;

  item: Product;

  number: number;

  constructor(tagName: string, className: string, cart: Cart, item: Product, number: number) {
    super(tagName, className);
    this.cart = cart;
    this.item = item;
    this.number = number;
  }

  incItemHandler = () => {
    this.cart.incItem(this.item.id);
    this.updateCartItem();
  };

  decItemHandler = () => {
    this.cart.decItem(this.item.id);
    this.updateCartItem();
    if (this.item.cnt === 0) {
      this.container.remove();
      // this.cart.updateItemNumbers();
    }
  };

  updateCartItem = () => {
    const cartItemAmount = this.container.querySelector('.cart-item-value') as Element;
    const cartItemTotal = this.container.querySelector('.cart-item-total') as Element;
    cartItemAmount.textContent = String(this.item.cnt);
    cartItemTotal.textContent = `${(this.item.cnt || 1) * this.item.price}$`;
  };

  override render() {
    const html = `
      <div>
        <span class='cart-item-number'>${this.number}</span>
        <div class='cart-img-wrap'>
          <img src='${this.item.images[0]}'>
        </div>
        <div class='cart-item-info'>
          <h4>${this.item.title}</h4>
          <p>Rating: ${this.item.rating}</p>
          <p>Brand: ${this.item.brand} / Category: ${this.item.category}</p>
          <p>${this.item.description.slice(0, 40)}...</p>
        </div>
      </div>
      <div class='controls'>
        <div class='cart-item-stock'>Stock: ${this.item.stock}</div>
        <div>
          <button class='cart-item-dec'>-</button>
          <span class='cart-item-value'>${this.item.cnt || 1}</span>
          <button class='cart-item-inc'>+</button>
        </div>
        <div class='cart-item-total'>${(this.item.cnt || 1) * this.item.price}$</div>
      </div>
    `;
    this.container.innerHTML = html;

    const incButton = this.container.querySelector('.cart-item-inc');
    const decButton = this.container.querySelector('.cart-item-dec');

    incButton?.addEventListener('click', this.incItemHandler);
    decButton?.addEventListener('click', this.decItemHandler);

    return this.container;
  }
}
