import { Product } from '../types/types';
import ProductList from './components/product-list';
import FilterBlock from './components/filter-block';
import DualFilter from './components/dual-filter';
import sort from '../funcs/sort';

type ProductsOpts = {
  sort?: string;
  search?: string;
  [key: string]: string;
};

export default class Products {
  public items: Product[] | null;

  public initialItems: Product[] | null;

  public render: ((id: string) => void) | null;

  public opts: ProductsOpts;

  constructor() {
    this.initialItems = null;
    this.items = null;
    this.render = null;
    this.opts = {};
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

  // updateItems() {
  //   // this.items =[...this.initialItems as Product[]];
  //   // let items = [...this.items as Product[]];

  //   for(let key of Object.keys(this.opts)) {
  //     if(key === 'sort') {
  //       this.sort(this.opts[key])
  //     } else if(key === 'search') {
  //       this.search(this.opts[key])
  //     } else if (key ==='category') {
  //       console.log('UPDATE CATEGORY')
  //     }
  //   }
  // }

  updateItems() {
    let items: Product[] = [...(this.initialItems as Product[])];
    for (const key of Object.keys(this.opts)) {
      if (key === 'sort') {
        items = sort(this.opts[key] as string, items);
      } else if (key === 'search') {
        items = items.filter((item) => item.title.indexOf(this.opts[key] as string) !== -1) as Product[];
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
    const productList = new ProductList('div', 'product-list', this).render();
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

  sort(method?: string) {
    switch (method) {
      case 'Price-ASC':
        this.items?.sort((a, b) => a.price - b.price);
        // console.log(this.items?.map((item) => item.id));
        break;
      case 'Price-DESC':
        this.items?.sort((a, b) => b.price - a.price);
        // console.log(this.items?.map((item) => item.id));
        break;
      case 'Rating-ASC':
        this.items?.sort((a, b) => a.rating - b.rating);
        // console.log(this.items?.map((item) => item.id));
        break;
      case 'Rating-DESC':
        this.items?.sort((a, b) => b.rating - a.rating);
        // console.log(this.items?.map((item) => item.id));
        break;
      default:
        // if (this.initialItems) {
        //   this.items = [...this.initialItems];
        // }
        console.log('DEFAULT !!!');
    }
  }

  search(text?: string) {
    if (text) {
      const updateItems = this.initialItems?.filter((item) => item.title.indexOf(text) !== -1) as Product[];
      this.items = updateItems;
      this.sort(this.opts.sort);
    }
  }

  bindRender(renderFunc: (id: string) => void) {
    this.render = renderFunc;
  }
}
