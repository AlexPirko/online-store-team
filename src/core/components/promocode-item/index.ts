import './index.css';
import Component from '../../templates/component';
import Cart from '../../Cart';

export default class PromocodeItem extends Component {
  cart: Cart;

  codename: string;

  constructor(tagName: string, codeName: string, cart: Cart) {
    super(tagName, 'promo-item');
    this.cart = cart;
    this.codename = codeName;
  }

  override render() {
    const html = `
      <p>${this.codename} - ${this.cart.promocode[this.codename]}%</p>
      <button class='promo-add-button'>Add</button>
    `;
    this.container.innerHTML = html;
    const button = this.container.querySelector('.promo-add-button') as HTMLButtonElement;

    button.addEventListener('click', () => {
      this.cart.setPromoCode(this.codename);
      button.classList.add('hide');
    });
    return this.container;
  }
}
