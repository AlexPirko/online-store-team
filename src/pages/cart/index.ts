import { Product } from '../../types/types';
import { CartProduct } from '../../core/components/cart-product';
import Page from '../../core/templates/page';

export default class CartPage extends Page {
  static override textObject = {
    MainTitle: 'Cart Page',
  };

  cartProducts: Product[];

  constructor(idPage: string) {
    super(idPage);
    this.cartProducts = this.getProducts();
  }

  getProducts(): Product[] {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return JSON.parse(localStorage.getItem('product-item')!);
  }

  totalInCart() {
    this.cartProducts.forEach(function (el) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (!JSON.parse(localStorage.getItem(`id${el.id}-total`)!)) {
        localStorage.setItem(`id${el.id}-total`, JSON.stringify(1));
      }
    });
  }

  // totalValueInCart() {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   if (JSON.parse(localStorage.getItem('product-item')!).length > 0) {
  //     const productCartArr = localStorage.getItem('product-item');
  //     if (productCartArr !== null) {
  //       const inLocal: Product[] = JSON.parse(productCartArr);
  //       const indexNum = inLocal.findIndex((el) => el.id);
  //       const totalItemsArray = localStorage.getItem(`id${indexNum}-total`);

  //       // const totalValueArray: number[] = [];
  //       // totalItemsArray.forEach((el: Element) => {
  //       //   return totalValueArray.push(Number(el.textContent));
  //       // });
  //       // const totalValue = totalValueArray.reduce((acc: number, el: number) => {
  //       //   return acc + el;
  //       // });
  //       // const totalSum = document.createElement('div');
  //       // totalSum.textContent = `Total: ${totalValue}`;
  //       console.log(totalItemsArray);
  //     }
  //   }
  // }

  public override render(): HTMLElement {
    const cartMain = document.createElement('div') as HTMLElement;
    cartMain.className = 'cart-main';
    const cartWrapper = document.createElement('div') as HTMLElement;
    cartWrapper.className = 'cart-wrapper';
    const summaryWrapper = document.createElement('div') as HTMLElement;
    summaryWrapper.className = 'summary-wrapper';

    if (this.cartProducts === undefined || this.cartProducts === null) {
      this.container.innerText = 'Cart is Empty';
      return this.container;
    } else {
      this.cartProducts.forEach((item) => {
        const cartProduct = new CartProduct(item);
        cartWrapper.append(cartProduct.render());
      });
    }

    this.totalInCart();
    // this.totalValueInCart();

    const summaryTitle = document.createElement('h2');
    summaryTitle.className = 'summary-title';
    summaryTitle.innerText = `Summary`;
    summaryWrapper.append(summaryTitle);

    cartMain.append(cartWrapper, summaryWrapper);
    return cartMain;
  }
}
