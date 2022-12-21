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
    const pageButtons = document.createElement('div');

    Buttons.forEach(({ id, text }) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${id}`;
      buttonHTML.innerText = text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  override render() {
    this.renderPageButtons();
    return this.container;
  }
}
