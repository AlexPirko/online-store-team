import Page from '../../core/templates/page';

export default class CartPage extends Page {
  static override textObject = {
    MainTitle: 'Cart Page',
  };

  public override render() {
    const title = this.createHeaderTitle(CartPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
