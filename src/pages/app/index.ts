import Page from '../../core/templates/page';
import HomePage from '../home';
import CartPage from '../cart';
import ProductListPage from '../product-list';
import Header from '../../core/components/header';
import { ErrorTypes, PageIds } from '../../types/types';
import ErrorPage from '../error';
import Products from '../../core/Products';
import ProductDetails from '../details';

export default class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  private products: Products;

  // private initialPage: HomePage;

  private header: Header;

  constructor() {
    this.products = new Products();
    // this.initialPage = new HomePage('home-page');
    this.header = new Header('header', 'header');
  }

  renderNewPage = (idPage: string) => {
    console.log('Render NEW');
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.HomePage) {
      page = new HomePage(idPage);
    } else if (idPage === PageIds.CartPage) {
      page = new CartPage(idPage);
    } else if (idPage === PageIds.ProductListPage) {
      page = new ProductListPage(idPage, this.products);
    } else if (idPage.match(new RegExp(PageIds.ProductDetails))) {
      const productId = +(idPage.split('/')[1] as string);
      page = new ProductDetails(PageIds.ProductDetails, productId, this.products);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page instanceof ProductListPage) {
      this.products.updateURL();
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  };

  private async loadData() {
    const endPoint = `https://dummyjson.com/products?limit=100`;
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        this.products.initProducts(data.products);
        this.products.bindRender(this.renderNewPage);
        const hash = window.location.hash.slice(1);
        if (hash === '') {
          this.renderNewPage('home-page');
          console.log('HASH = ""');
        } else {
          this.renderNewPage(hash);
          console.log(hash);
        }
      });
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const url = new URL(window.location.href);
      url.search = '';
      window.history.pushState({}, '', url.href);
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
      console.log('HASHCHANGE');
    });
  }

  public run(): void {
    this.loadData();
    this.enableRouteChange();
    App.container.append(this.header.render());
  }
}
