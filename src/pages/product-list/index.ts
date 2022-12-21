import Page from '../../core/templates/page';

export default class ProductListPage extends Page {
  static override textObject = {
    MainTitle: 'Product List Page',
  };

  public override render() {
    const title = this.createHeaderTitle(ProductListPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
