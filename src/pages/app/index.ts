import Page from '../../core/templates/page';
import HomePage from '../home';
import CartPage from '../cart';
import ProductListPage from '../product-list';
import Header from '../../core/components/header';
import { ErrorTypes, PageIds } from '../../types/types';
import ErrorPage from '../error';

export default class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  private initialPage: HomePage;

  private header: Header;

  static renderNewPage(idPage: string) {
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
      page = new ProductListPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  constructor() {
    this.initialPage = new HomePage('home-page');
    this.header = new Header('header', 'header');
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  public run(): void {
    console.log(this.initialPage);
    this.enableRouteChange();
    App.container.append(this.header.render());
    App.renderNewPage('home-page');
  }
}
