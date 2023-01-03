/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define */
import './index.css';
import { Product } from '../../../types/types';

export class CartProduct {
  container = document.createElement('div');

  private id;

  private title;

  private description;

  private price;

  private discountPercentage;

  private rating;

  private stock;

  private brand;

  private images;

  private total;

  constructor(item: Product) {
    this.id = item.id;
    this.title = item.title;
    this.description = item.description;
    this.price = item.price;
    this.discountPercentage = item.discountPercentage;
    this.rating = item.rating;
    this.stock = item.stock;
    this.brand = item.brand;
    this.images = item.images;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.total = JSON.parse(localStorage.getItem(`id${item.id}-total`)!);
  }

  render() {
    this.container.className = 'cart-container';

    const posithion = document.createElement('div');
    posithion.className = 'cart-posithion';

    const productCartArr = localStorage.getItem('product-item');
    if (productCartArr !== null) {
      const inLocal: Product[] = JSON.parse(productCartArr);
      const indexNum = inLocal.findIndex((el) => el.id === this.id);
      posithion.innerText = `${indexNum + 1}`;
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'image-wrapper';
    const image = document.createElement('img');
    image.className = 'cart-image';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    image.src = this.images[0]!;
    image.alt = this.title;
    imageWrapper.append(image);

    const productInfoWrapper = document.createElement('div');
    productInfoWrapper.className = 'cart-productInfo';

    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'title-wrapper';

    const otherInfoWrapper = document.createElement('div');
    otherInfoWrapper.className = 'otherinfo-wrapper';

    const descriptionCart = document.createElement('div');
    descriptionCart.className = 'cart-description';
    descriptionCart.innerText = this.description;

    const ratingCart = document.createElement('div');
    ratingCart.className = 'cart-rating';
    ratingCart.innerText = `Rating: ${this.rating}`;

    const discountCart = document.createElement('div');
    discountCart.className = 'cart-discount';
    discountCart.innerText = `Discount: ${this.discountPercentage}%`;

    const brandCart = document.createElement('div');
    brandCart.className = 'cart-brand';
    brandCart.innerText = `${this.brand} ${this.title}`;

    titleWrapper.append(brandCart, descriptionCart);
    otherInfoWrapper.append(ratingCart, discountCart);
    productInfoWrapper.append(titleWrapper, otherInfoWrapper);

    const priceWrapper = document.createElement('div');
    priceWrapper.className = 'price-wrapper';

    const stockCart = document.createElement('div');
    stockCart.className = 'stock-cart';
    stockCart.innerText = `Stock: ${this.stock}`;

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'button-wrapper';

    const buttonSubtr = document.createElement('button');
    buttonSubtr.className = 'button-subtr';
    buttonSubtr.innerText = '-';

    const totalCart = document.createElement('div');
    totalCart.id = 'total-cart';
    totalCart.innerText = `${this.total}`;

    const buttonAdd = document.createElement('button');
    buttonAdd.className = 'button-price__plus';
    buttonAdd.innerText = '+';

    buttonAdd.addEventListener('click', () => {
      if (Number(totalCart.innerText) == this.stock) return false;
      this.total += 1;
      totalCart.innerText = this.total.toString();
      localStorage.setItem(`id${this.id}-total`, JSON.stringify(this.total));
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      priceCart.innerText = `${this.price * this.total}$`;
      stockCart.innerText = `Stock: ${this.stock + 1 - this.total}`;
    });

    buttonSubtr.addEventListener('click', () => {
      this.total -= 1;
      localStorage.setItem(`id${this.id}-total`, JSON.stringify(this.total));
      if (this.total < 1) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const inLocal = JSON.parse(localStorage.getItem('product-item')!);
        const indexNum = inLocal.findIndex((el: Product) => el.id === this.id);
        if (indexNum !== -1) {
          inLocal.splice(indexNum, 1);
          localStorage.setItem('product-item', JSON.stringify(inLocal));
          this.container.remove();
          localStorage.removeItem(`id${this.id}-total`);
        }
      }
      totalCart.innerText = this.total.toString();
      if (JSON.parse(localStorage.getItem('product-item')!).length === 0) {
        localStorage.removeItem('product-item');
        document.getElementById('current-page')!.remove();
        this.container.innerText = 'Cart is Empty';
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      priceCart.innerText = `${this.price * this.total}$`;
      stockCart.innerText = `Stock: ${this.stock + this.total}`;
    });

    buttonWrapper.append(buttonSubtr, totalCart, buttonAdd);

    const priceContainer = document.createElement('div');
    priceContainer.className = 'price-container';

    const priceCart = document.createElement('div');
    priceCart.className = 'price-cart';

    priceContainer.append(priceCart);
    if (this.total !== undefined) {
      priceCart.innerText = `${this.price * this.total}$`;
    } else {
      priceCart.innerText = `${this.price}$`;
    }

    // if (totalCart.textContent !== null) {
    //   let amountItems: string[] = [];
    //   amountItems = totalCart.textContent.split;
    //   const amountSum = amountItems.reduce((sum, e) => {
    //     return sum + e;
    //   });
    //   console.log(amountSum);
    // }

    priceWrapper.append(stockCart, buttonWrapper, priceContainer);

    this.container.append(posithion, imageWrapper, productInfoWrapper, priceWrapper);

    return this.container;
  }
}
