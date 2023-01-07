import './index.css';

import Page from '../../core/templates/page';
import Cart from '../../core/Cart';
import CartItem from '../../core/components/cart-item';
import CartList from '../../core/components/cart-list';
import Summary from '../../core/components/summary';
import ModalWindow from '../../core/components/modal/index';

export default class CartPage extends Page {
  cart: Cart;

  constructor(idPage: string, cart: Cart) {
    super(idPage);
    this.cart = cart;
  }

  updateCurrentPage() {
    const elem = this.container.querySelector('.current-page') as Element;
    elem.textContent = `Page: ${this.cart.opts.page}`;
  }

  prevPageHandler() {
    this.cart.decPage();
  }

  nextPageHandler() {
    this.cart.incPage();
  }

  updateCartItems() {
    const cartItems = this.container.querySelector('.cart-items') as HTMLElement;
    cartItems.innerHTML = '';
    const pageNum = this.cart.opts.page;
    const amount = this.cart.opts.limit;
    const from = (+pageNum - 1) * amount;
    const to = pageNum * amount;
    this.cart.items.forEach((item, idx) => {
      if (idx >= from && idx < to) {
        cartItems.append(new CartItem('div', 'cart-item', this.cart, item, idx + 1).render());
      }
    });
  }

  limitInputHandler = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    if (+input.value < 1) {
      input.value = `${1}`;
    }
    this.cart.updateOpts('limit', +input.value);
    this.cart.checkEpmptyPage();
  };

  public override render() {
    const { page, limit } = this.cart.opts;
    const availablePage = Math.ceil(this.cart.items.length / limit);
    const html = `
      <div class='cart-wrap'>
        <div class='products-in-cart'>
          <div class='top-section'>
            <h3>Products in Cart</h3>
            <div>
              <label for='limit'>
                Limit
                <input id='limit' type='number' value='${limit}'>
              </label>
              <button class='prev-page'> < </button>
              <span class='current-page'>Page: ${page} / ${availablePage}</span>
              <button class='next-page'> > </button>
            </div>
          </div>
          <div class='cart-items-wrap'>
          </div>
        </div>
        <div class='summary-wrap'></div>
      </div>
    `;

    this.container.innerHTML = html;

    const cartItemsWrap = this.container.querySelector('.cart-items-wrap');
    const cartItems = new CartList('div', 'cart-items', this.cart).render();

    cartItemsWrap?.append(cartItems);

    const summaryWrap = this.container.querySelector('.summary-wrap');
    summaryWrap?.append(new Summary('div', 'summary', this.cart).render());

    const prevButton = this.container.querySelector('.prev-page');
    const nextButton = this.container.querySelector('.next-page');
    const limitInput = this.container.querySelector('#limit');

    prevButton?.addEventListener('click', () => this.prevPageHandler());
    nextButton?.addEventListener('click', () => this.nextPageHandler());
    limitInput?.addEventListener('input', (e) => this.limitInputHandler(e));

    const modalWindow = new ModalWindow('modal');
    this.container.append(modalWindow.render());
    // const modal = this.container.querySelector('#modal') as HTMLButtonElement;
    // const modalWrap = document.body.querySelector('.modal-wrap') as HTMLButtonElement;
    // modal.style.display = 'none';
    // modalWrap.style.display = 'none';

    if (this.cart.items.length === 0) {
      const wrapper = this.container.querySelector('.cart-wrap') as HTMLElement;
      wrapper.innerHTML = 'Oops - Cart is Empty((';
    }

    return this.container;
  }
}
