import './index.css';

import { Product } from '../../../types/types';
import Component from '../../templates/component';
import Cart from '../../Cart';

export default class ProductCard extends Component {

  static cacheImages: {
    [key: string]: HTMLImageElement;
  } = {};

  private item: Product;

  private cart: Cart;

  constructor(tagName: string, className: string, item: Product, cart: Cart) {
    super(tagName, className);
    this.item = item;
    this.cart = cart;
  }

  override render() {
    const isItemInCart = (id: number): boolean => !!this.cart.items.find((item) => item.id === id);

    const { title, price, rating, images, id } = this.item;
    const html = `
      <div class='img-wrap'>
      </div>
      <div class='products-description'>
        <h3>${title.slice(0, 20)}</h3>
        <p>Rate: ${rating}</p>
        <div class='bottom-bar'>
            <button class='add-product-button'>Add</button>
            <p class='price'>${price} $</p>
        </div>
      </div>
    `;
    this.container.innerHTML = html;
    const imgWrap = this.container.querySelector('.img-wrap') as HTMLElement;
    let image: HTMLImageElement;
    const imgUrl = images[0] as string;
    if(ProductCard.cacheImages[imgUrl]) {
      image = ProductCard.cacheImages[imgUrl] as HTMLImageElement;
    } else {
      image = new Image();
      image.src = imgUrl;
      ProductCard.cacheImages[imgUrl] = image;
    }

    imgWrap.append(image);

    const button = this.container.querySelector('button') as HTMLButtonElement;
    const titleElem = this.container.querySelector('h3') as HTMLElement;

    const changeButtonView = (): void => {
      if (isItemInCart(id)) {
        button.classList.add('active');
        button.textContent = 'Added ✓';
      } else {
        button.classList.remove('active');
        button.textContent = 'Add';
      }
    };

    changeButtonView();

    const addProductHandler = () => {
      if (isItemInCart(id)) {
        this.cart.removeItem(id);
      } else {
        this.cart.addItem(this.item);
      }
      changeButtonView();
    };

    button?.addEventListener('click', addProductHandler);

    image.addEventListener('click', () => {
      const newHash = `product-details/${id}`;
      window.location.hash = newHash;
    });

    titleElem.addEventListener('click', () => {
      const newHash = `product-details/${id}`;
      window.location.hash = newHash;
    });

    return this.container;
  }
}
