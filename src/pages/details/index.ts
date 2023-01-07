import './index.css';
import Products from '../../core/Products';
import { Product } from '../../types/types';
import Page from '../../core/templates/page';
import loadImage from '../../funcs/loadImg';
import RatingStar from '../../core/components/rating-star';
import Cart from '../../core/Cart';

export default class ProductDetails extends Page {
  private id: number;

  private products: Products;

  private cart: Cart;

  constructor(idPage: string, id: number, products: Products, cart: Cart) {
    super(idPage);
    this.id = id;
    this.products = products;
    this.cart = cart;
  }

  checkId(): boolean {
    const products = this.products.initialItems as Product[];
    return products.some(({ id }) => id === this.id);
  }

  override render() {
    if (!this.checkId()) {
      this.container.innerHTML = 'The Product does not exist!(';
    } else {
      const product = this.products.items?.find((item) => item.id === this.id) as Product;
      const { price, title, category, brand, images, description, discountPercentage, rating, stock } = product;

      const isItemInCart = (id: number): boolean => !!this.cart.items.find((item) => item.id === id);

      const html = `
        <div class='container'>
          <h2 class='product-details-title'>${title}</h2>
          <ul class='breadcrumbs'>
            <li>STORE</li>
            <li>>></li>
            <li>${category}</li>
            <li>>></li>
            <li>${brand}</li>
            <li>>></li>
            <li>${title}</li>
          </ul>
          <div class='product-details'>
            <div class='product-images'>
              <div class='thumbnails-bar'></div>
              <div class='big-image-wrap'>
                <img class='big-image' src='${images[0]}'>
              </div>
            </div>
            <div class='product-info'>
              <div class='detail-block'>
                <h3 class='detail-title'>Description</h3>
                <p class='detail-description'>${description}</p>
                <p class='detail-info'>Brand: <span>${brand}</span></p>
                <p class='detail-info'>Category: <span>${category}</span></p>
                <p class='detail-info'>Discount Percentage: <span>${discountPercentage}%</span></p>
                <p class='detail-info'>Rating: <span>${rating}</span></p>
                <div class='rating-star-wrap'></div>
                <p class='detail-info'>Stock: <span>${stock}</span></p>
                <div class='bottom-wrap'>
                  <div class='detail-buttons'>
                    <button class='add-button'>Add to Cart</button>
                    <button class='buy-now'>Buy Now</button>
                  </div>
                  <div class='detail-price'>${price}$</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      this.container.innerHTML = html;

      const ratingStar = this.container.querySelector('.rating-star-wrap');
      const thumbnails = this.container.querySelector('.thumbnails-bar');
      const bigImg = this.container.querySelector('.big-image') as HTMLImageElement;

      const addButton = this.container.querySelector('.add-button') as HTMLButtonElement;
      const buyNowButton = this.container.querySelector('.buy-now');

      ratingStar?.append(new RatingStar(rating).render());

      images.forEach(async (path, idx) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('thumbnail');
        if (idx === 0) {
          wrapper.classList.add('active');
        }
        // let image = new Image();
        // image.src = path;
        const image = (await loadImage(path)) as HTMLImageElement;
        image.addEventListener('click', () => {
          bigImg.src = path;
          const thumbs = this.container.querySelectorAll('.thumbnail');
          thumbs.forEach((item) => item.classList.remove('active'));
          wrapper.classList.add('active');
        });
        wrapper.append(image);
        thumbnails?.append(wrapper);
      });

      const changeButtonView = (): void => {
        if (isItemInCart(this.id)) {
          addButton.classList.add('active');
          addButton.textContent = 'Added ✓';
        } else {
          addButton.classList.remove('active');
          addButton.textContent = 'Add';
        }
      };

      changeButtonView();

      const addToCartHandler = () => {
        if (isItemInCart(this.id)) {
          this.cart.removeItem(this.id);
        } else {
          this.cart.addItem(product);
        }
        changeButtonView();
      };

      const buyNowHandler = () => {
        console.warn('Buy now handler!!!');
      };

      addButton.addEventListener('click', addToCartHandler);
      buyNowButton?.addEventListener('click', buyNowHandler);
    }
    return this.container;
  }
}
