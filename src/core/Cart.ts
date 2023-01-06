import { Product } from '../types/types';
import AppliedCode from './components/applied-code-item';
import CartList from './components/cart-list';

export default class Cart {
  items: Product[];

  promocode: {
    [key: string]: number;
  }

  appliedCodes: string[];

  opts: {
    page: number;
    limit: number;
    [key: string]: number;
  };


  constructor() {
    this.items = [];
    this.opts = {
      page: 1,
      limit: 3,
    };
    this.appliedCodes = [];
    this.promocode = {
      'rs22': 20,
      'css': 10,
      'js': 15,
    }
  }

  getTotalDiscount():number {
    return this.appliedCodes.reduce((a,b)=>a + (this.promocode[b] || 0),0)
  }

  getDiscountPrice():number {
    const price = this.getTotalPrice();
    const discount = this.getTotalDiscount();
    return Math.round(price - ((price/100)*discount));
  }

  removePromoCode(name: string): void {
    this.appliedCodes = this.appliedCodes.filter(item => item !== name);
    console.log('Remove');
    this.updateSummary();
  }

  setPromoCode(name: string): void {
    if (this.appliedCodes.indexOf(name) === -1) {
      this.appliedCodes.push(name);
    }

    this.updateSummary();

    const appliedElem = document.querySelector('.applied-codes-wrap');
    appliedElem?.classList.remove('hide');
  }

  updateSummary(): void {
    if(!this.items.length) return;
    const products = document.querySelector('.summary-products') as HTMLElement;
    const totalPrice = document.querySelector('.summary-total') as HTMLElement;
    const discountPrice = document.querySelector('.summary-discount') as HTMLElement;

    products.textContent = `Products: ${this.getTotalCount()}`;
    totalPrice.textContent = `Total: ${this.getTotalPrice()}$`;
    discountPrice.textContent = `Total: ${this.getDiscountPrice()}$`

    const appliedItems = document.querySelector('.applied-items') as HTMLElement;
    appliedItems.innerHTML = '';
    this.appliedCodes.forEach(item => {
      const elem = new AppliedCode('div', item, this).render();
      appliedItems?.append(elem);
    })


    if (this.appliedCodes.length === 0) {
      const appliedElem = document.querySelector('.applied-codes-wrap');
      appliedElem?.classList.add('hide');
      totalPrice?.classList.remove('disable');
      discountPrice?.classList.add('hide');
    } else {
      totalPrice?.classList.add('disable');
      discountPrice?.classList.remove('hide');
    }

    const addButton = document.querySelector('.promo-add-button');
    addButton?.classList.remove('hide');
    console.log(this.getDiscountPrice());
  }

  updateOpts(key: string, value: number) {
    this.opts[key] = value;
    this.updateURL();
    this.updateCartItems();
  }

  updateURL() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams({ page: `${this.opts.page}`, limit: `${this.opts.limit}` });
    url.search = params.toString();
    window.history.pushState({}, '', url.href);
  }

  updateCartItems() {
    if (this.items.length !== 0) {
      const availablePage = Math.ceil(this.items.length / this.opts.limit);
      const currentPage = document.querySelector('.current-page') as HTMLElement;
      currentPage.textContent = `Page: ${this.opts.page} / ${availablePage}`;
      const cartItemsWrap = document.querySelector('.cart-items-wrap') as HTMLElement;
      cartItemsWrap.innerHTML = '';
      const cartItems = new CartList('div', 'cart-items', this).render();
      cartItemsWrap?.append(cartItems);
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((a, b) => a + b.price * (b.cnt || 1), 0);
  }

  getTotalCount(): number {
    return this.items.reduce((a, b) => a + (b.cnt || 1), 0);
  }

  checkEmptyCart(): void {
    if (this.items.length === 0) {
      const cartWrap = document.querySelector('.cart-wrap');
      if (cartWrap) {
        cartWrap.innerHTML = 'Oops - Cart is Empty((';
      }
    }
  }


  updateHeader(): void {
    const itemCount = document.querySelector('.item-count') as HTMLElement;
    const cartTotal = document.querySelector('.header-total-price') as HTMLElement;

    cartTotal.textContent = `Cart Total: ${this.getTotalPrice()}$`;
    itemCount.textContent = `${this.getTotalCount()}`;
  }

  incPage() {
    const amount = this.items.length;
    const limit = this.opts.limit;
    const maxPageAmount = Math.ceil(amount / limit);
    if (this.opts.page < maxPageAmount) {
      this.updateOpts('page', this.opts.page + 1);
    }
  }

  decPage() {
    if (this.opts.page > 1) {
      this.updateOpts('page', this.opts.page - 1);
    }
  }

  initCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    } else {
      this.items = [];
    }

    const promocodes = localStorage.getItem('promocodes');
    if (promocodes) {
      this.appliedCodes = JSON.parse(promocodes);
    } else {
      this.appliedCodes = [];
    }

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const pageDefault = '1';
    const limitDefault = '3';

    const opts = {
      page: +(params.get('page') || pageDefault),
      limit: +(params.get('limit') || limitDefault),
    };
    this.opts = opts;

    this.updateHeader();

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('cart', JSON.stringify(this.items));
      localStorage.setItem('promocodes', JSON.stringify(this.appliedCodes));
    });
  }

  incItem(id: number): void {
    const index = this.items.findIndex((item) => item.id === id);
    const item = this.items[index] as Product;
    if (item.cnt && item.cnt < item.stock) {
      item.cnt += 1;
    }
    this.updateHeader();
    this.updateSummary();
  }

  decItem(id: number): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    const item = this.items[index] as Product;
    if (item.cnt) {
      item.cnt -= 1;
    }
    if (item.cnt === 0) {
      this.removeItem(id);
      this.updateCartItems();
      this.checkEpmptyPage();
    }
    this.updateHeader();
    this.updateSummary();
  }

  checkEpmptyPage() {
    const { page, limit } = this.opts;
    const availablePage = Math.ceil(this.items.length / limit);
    if (page > availablePage) {
      const newPageValue = availablePage;
      this.updateOpts('page', newPageValue || 1);
    }
  }

  updateItemNumbers = () => {
    const numbersElems = document.querySelectorAll('.cart-item-number');
    console.log(numbersElems);
    numbersElems.forEach((item, idx) => (item.textContent = `${idx + 1}`));
  };

  addItem(item: Product) {
    item.cnt = 1;
    this.items.push(item);
    console.log(this.items);
    this.updateHeader();
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    console.log(this.items);
    this.updateHeader();
    this.checkEmptyCart();
  }

  saveCart() { }
}
