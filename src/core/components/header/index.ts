import './index.css';
import Component from '../../templates/component';
import { PageIds } from '../../../types/types';

const Buttons = [
  {
    id: PageIds.HomePage,
    text: 'Home Page',
  },
  {
    id: PageIds.CartPage,
    text: 'Cart Page',
  },
  {
    id: PageIds.ProductListPage,
    text: 'Products Page',
  },
];

export default class Header extends Component {
  renderPageButtons() {
    const nav = document.createElement('nav');
    nav.classList.add('nav');

    Buttons.forEach(({ id, text }) => {
      const navLink = document.createElement('a');
      navLink.href = `#${id}`;
      navLink.innerText = text;
      navLink.classList.add('nav-link');
      nav.append(navLink);
    });
    this.container.append(nav);
  }

  override render() {
    this.renderPageButtons();
    return this.container;
  }
}
