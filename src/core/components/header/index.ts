import './index.css';
import Component from '../../templates/component';
import { PageIds } from '../../../types/types';
import makeElement from '../../../funcs/makeElement';

const Buttons = [
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

  renderTotalPrice() {
    const elem = makeElement('div', 'header-total-price');
    elem.textContent = 'Cart Total: 000$';
    this.container.append(elem);
  }

  renderCartLink() {
    const elem = makeElement('div', 'cart-link');
    const itemCount = makeElement('div', 'item-count');
    itemCount.textContent = '0';
    elem.append(itemCount);
    elem.onclick = () => window.location.hash = PageIds.CartPage;
    this.container.append(elem);
  }

  override render() {
    this.renderPageButtons();
    this.renderTotalPrice();
    this.renderCartLink();
    return this.container;
  }
}
