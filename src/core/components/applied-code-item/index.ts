import './index.css';
import Component from '../../templates/component';
import Cart from '../../Cart';

export default class AppliedCode extends Component {
  cart: Cart;

  codename: string;

  constructor(tagName: string, codeName: string, cart: Cart) {
    super(tagName, 'applied-code-item');
    this.cart = cart;
    this.codename = codeName;
  }

  override render() {
    const html = `
    <p> Code: <span>'${this.codename}'</span></p>
    <div>
      <span>${this.cart.promocode[this.codename]} % </span> 
      <button class='code-remove-button'>Remove</button>
    </div>
    `;
    this.container.innerHTML = html;
    const removeButton = this.container.querySelector('.code-remove-button');
    removeButton?.addEventListener('click', () => this.cart.removePromoCode(this.codename));
    return this.container;
  }
}
