import './index.css';
import Products from '../../core/Products';
import Page from '../../core/templates/page';
import ProductsTopBar from '../../core/components/products-topbar';
import ProductList from '../../core/components/product-list';
import FilterBar from '../../core/components/filter-bar';
import FilterBlock from '../../core/components/filter-block';
import DualFilter from '../../core/components/dual-filter';
import makeElement from '../../funcs/makeElement';
import Cart from '../../core/Cart';

export default class ProductListPage extends Page {
  static override textObject = {
    MainTitle: 'Product List Page',
  };

  protected products: Products;
  protected cart: Cart;

  constructor(idPage: string, products: Products, cart: Cart) {
    super(idPage);
    this.products = products;
    this.cart = cart;
  }

  public override render() {
    const filterBar = new FilterBar('div', 'filter-bar', this.products).render();

    const filterBlocksWrap = makeElement('div', 'filter-blocks-wrap');
    const dualFilterBlocksWrap = makeElement('div', 'dualfilter-blocks-wrap');

    const categoryFilter = new FilterBlock('div', 'filter-block', 'category', this.products).render();
    const brandFilter = new FilterBlock('div', 'filter-block', 'brand', this.products).render();
    const priceDualFilter = new DualFilter('div', 'dual-filter', 'price', this.products).render();
    const stockDualFilter = new DualFilter('div', 'dual-filter', 'stock', this.products).render();

    filterBlocksWrap.append(categoryFilter);
    filterBlocksWrap.append(brandFilter);
    dualFilterBlocksWrap.append(priceDualFilter);
    dualFilterBlocksWrap.append(stockDualFilter);

    filterBar.append(filterBlocksWrap);
    filterBar.append(dualFilterBlocksWrap);

    const productSection = document.createElement('div');
    productSection.classList.add('product-section');
    const productsWrap = document.createElement('div');
    productsWrap.classList.add('products-wrap');
    const productList = new ProductList('div', 'product-list', this.products, this.cart).render();
    productsWrap.append(productList);
    const topBar = new ProductsTopBar('div', 'products-list-topbar', this.products).render();
    productSection.append(topBar);
    productSection.append(productsWrap);
    this.container.append(filterBar);
    this.container.append(productSection);
    this.container.classList.add('product-list-wrapper');
    return this.container;
  }
}
