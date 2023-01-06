import './index.css';
import Component from '../../templates/component';
import Cart from '../../Cart';
// import makeElement from '../../../funcs/makeElement';
import AppliedCode from '../applied-code-item';
import PromocodeItem from '../promocode-item';

export default class Summary extends Component {
  cart: Cart;

  constructor(tagName: string, className: string, cart: Cart) {
    super(tagName, className);
    this.cart = cart;
  }

  checkCodeExist(value: string): boolean {
    return Object.keys(this.cart.promocode).some(key => key === value);
  }

  promoInputHandler = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    const findPromo = this.container.querySelector('.find-promo') as HTMLElement;
    findPromo.innerHTML = '';
    if (this.checkCodeExist(value)) {
      // const elem = makeElement('div', 'promo-item');
      // const button = makeElement('button', 'promo-add-button');
      // button.textContent = 'Add'
      // elem.textContent = `Code: ${value} - ${this.cart.promocode[value]}%`;
      // elem.append(button);

      // button.addEventListener('click', () => {
      //   this.cart.setPromoCode(value);
      //   button.classList.add('hide');
      // });

      const elem = new PromocodeItem('div', value, this.cart).render();

      if (this.cart.appliedCodes.indexOf(value) !== -1) {
        const button = elem.querySelector('button') as HTMLElement;
        button.classList.add('hide');
      }

      findPromo?.append(elem);
    }
  }

  override render() {
    const html = `
      <h3 class='summary-title'>Summary</h3>
      <p class='summary-products'>Products: ${this.cart.getTotalCount()}<p>
      <p class='summary-total'>Total: ${this.cart.getTotalPrice()}$<p>
      <p class='summary-discount'>Total: ${this.cart.getDiscountPrice()}$<p>
      <div class='applied-codes-wrap'>
        <h3>Applied codes</h3>
        <div class='applied-items'></div>
      </div>
      <div class='promo-wrap'>
      <input id='promocode' type='text' placeholder='enter promo code'>
      </div>
      <p class='test-code'>Promo for test: '<span>js</span>', '<span>rs22</span>', '<span>css</span>'</p>
      <div class='find-promo'></div>
    `;
    this.container.innerHTML = html;


    if (this.cart.appliedCodes.length === 0) {
      const appliedCodes = this.container.querySelector('.applied-codes-wrap');
      appliedCodes?.classList.add('hide');
      const summaryDiscount = this.container.querySelector('.summary-discount');
      summaryDiscount?.classList.add('hide');
    } else {
      const totalPrice = this.container.querySelector('.summary-total');
      totalPrice?.classList.add('disable');
      const appliedItems = this.container.querySelector('.applied-items');
      this.cart.appliedCodes.forEach(item => {
        const elem = new AppliedCode('div', item, this.cart).render();
        appliedItems?.append(elem);
      });
    }

    const input = this.container.querySelector('#promocode');

    input?.addEventListener('input', this.promoInputHandler);

    return this.container;
  }
}