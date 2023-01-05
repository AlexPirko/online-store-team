import { Product } from '../types/types';
import CartList from './components/cart-list';

export default class Cart {
  items: Product[];

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
    if(this.items.length !== 0) {
      const availablePage = Math.ceil(this.items.length / this.opts.limit);
      const currentPage = document.querySelector('.current-page') as HTMLElement;
      currentPage.textContent = `Page: ${this.opts.page} / ${availablePage}`;
      const cartItemsWrap = document.querySelector('.cart-items-wrap') as HTMLElement;
      cartItemsWrap.innerHTML = '';
      const cartItems = new CartList('div', 'cart-items', this).render();
      cartItemsWrap?.append(cartItems);
    }
  }

  getTotalPrice():number {
    return this.items.reduce((a,b)=> a + b.price * (b.cnt || 1), 0)
  }

  checkEmptyCart():void {
    if(this.items.length === 0) {
      const cartWrap = document.querySelector('.cart-wrap');
      if(cartWrap) {
        cartWrap.innerHTML = 'Oops - Cart is Empty((';
      }
    }
  }

  updateHeader() {
    const itemCount = document.querySelector('.item-count') as HTMLElement;
    const cartTotal =  document.querySelector('.header-total-price') as HTMLElement;
    
    cartTotal.textContent = `Cart Total: ${this.getTotalPrice()}$`;
    itemCount.textContent = `${this.items.length}`;
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
  // setPage() {
  //   const maxPageAmount = Math.ceil(this.items.length / this.itemsPerPage);
  //   console.log(maxPageAmount);
  // }

  initCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    } else {
      this.items = [];
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
    });
  }

  incItem(id: number): void {
    const index = this.items.findIndex((item) => item.id === id);
    const item = this.items[index] as Product;
    if (item.cnt && item.cnt < item.stock) {
      item.cnt += 1;
    }
    this.updateHeader();
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

  saveCart() {}
}
