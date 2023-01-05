import { Product } from '../types/types';
import ProductList from './components/product-list';
import FilterBlock from './components/filter-block';
import DualFilter from './components/dual-filter';
import sort from '../funcs/sort';
import search from '../funcs/search-products';
// import checkCopyURL from '../funcs/checkCopyURL';
import { PageIds, ProductsOpts } from '../types/types';
import Cart from './Cart';

export default class Products {
  items: Product[] | null;

  initialItems: Product[] | null;

  render: ((id: string) => void) | null;

  opts: ProductsOpts;

  copiedURL: string;

  cart: Cart | null;

  constructor() {
    this.initialItems = null;
    this.items = null;
    this.render = null;
    this.opts = {};
    this.copiedURL = '';
    this.cart = null;
  }

  initProducts(productsArr: Product[]) {
    this.initialItems = [...productsArr];
    this.items = [...productsArr];
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const opts: ProductsOpts = {};
    for (const [key, value] of params.entries()) {
      opts[key] = value;
    }
    this.opts = opts;
    this.updateItems();
  }

  addOpts(key: string, value: string) {
    if (value) {
      this.opts[key] = value;
    } else {
      if (key === 'search') {
        this.items = [...(this.initialItems as Product[])];
      }
      delete this.opts[key];
    }
    console.log(this.opts);
  }

  updateURL() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(this.opts);
    url.search = params.toString();
    window.history.pushState({}, '', url.href);
  }

  updateProductAmount() {
    const elem = document.querySelector('.products-amount') as HTMLElement;
    elem.textContent = `Products: ${this.items?.length}`;
  }

  updateItems() {
    let items: Product[] = [...(this.initialItems as Product[])];
    for (const key of Object.keys(this.opts)) {
      if (key === 'sort') {
        items = sort(this.opts[key] as string, items);
      } else if (key === 'search') {
        // items = items.filter((item) => item.title.indexOf(this.opts[key] as string) !== -1) as Product[];
        items = search(items, this.opts[key] as string);
      } else if (key === 'category' || key === 'brand') {
        const filterArr = this.opts[key]?.split('↕');
        items = items.filter((item) => filterArr?.some((str) => str === item[key]));
      } else if (key === 'price' || key === 'stock') {
        const [min, max] = this.opts[key]?.split('↕').map((num) => +num) as [number, number];
        items = items.filter((item: Product) => {
          const value = item[key] as number;
          return value >= min && value <= max;
        });
      } else if (key === 'view') {
        const viewValue = this.opts[key];
        const productList = document.querySelector('.product-list');
        if (viewValue === 'list') {
          productList?.classList.remove('grid');
          productList?.classList.add('list');
        } else if (viewValue === 'grid') {
          productList?.classList.remove('list');
          productList?.classList.add('grid');
        }
      }
    }
    this.items = items;
  }

  updateOpts(name: string, value: string, reRender?: string[]) {
    this.addOpts(name, value);
    this.updateItems();
    this.updateURL();
    this.checkCopiedURL();
    this.updateProductAmount();
    const productList = new ProductList('div', 'product-list', this, this.cart as Cart).render();
    const elem = document.querySelector('.products-wrap') as Element;
    elem.innerHTML = '';
    elem.appendChild(productList);
    reRender?.forEach((block) => {
      if (block === 'dual-block') {
        const dualfilterBlocsWrap = document.querySelector('.dualfilter-blocks-wrap') as Element;
        dualfilterBlocsWrap.innerHTML = '';
        const priceDualFilter = new DualFilter('div', 'dual-filter', 'price', this).render();
        const stockDualFilter = new DualFilter('div', 'dual-filter', 'stock', this).render();
        dualfilterBlocsWrap.append(priceDualFilter);
        dualfilterBlocsWrap.append(stockDualFilter);
      } else if (block === 'filter-block') {
        const filterBlocsWrap = document.querySelector('.filter-blocks-wrap') as Element;
        filterBlocsWrap.innerHTML = '';
        const categoryFilter = new FilterBlock('div', 'filter-block', 'category', this).render();
        const brandFilter = new FilterBlock('div', 'filter-block', 'brand', this).render();
        filterBlocsWrap.append(categoryFilter);
        filterBlocsWrap.append(brandFilter);
      }
    });
  }

  resetOpts() {
    this.opts = {};
    this.updateURL();
    this.items = [...(this.initialItems as Product[])];
    if (this.render) {
      this.render(PageIds.ProductListPage);
    }
  }

  checkCopiedURL() {
    const button = document.querySelector('.copy-link');
    const currentURL = window.location.href;
    if (currentURL === this.copiedURL) {
      return;
    } else {
      button?.classList.remove('active');
    }
  }

  bindCart(cart: Cart) {
    this.cart = cart;
  }

  bindRender(renderFunc: (id: string) => void) {
    this.render = renderFunc;
  }
}
