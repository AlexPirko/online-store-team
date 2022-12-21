import Page from '../../core/templates/page';

export default class HomePage extends Page {
  static override textObject = {
    MainTitle: 'Home Page',
  };

  public override render() {
    const title = this.createHeaderTitle(HomePage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
