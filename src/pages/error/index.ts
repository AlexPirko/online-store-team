import Page from '../../core/templates/page';
import { ErrorTypes } from '../../types/types';

export default class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static override textObject: { [prop: string]: string } = {
    '404': '404 - The Page not found!(',
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  override render() {
    const title = this.createHeaderTitle(ErrorPage.textObject[this.errorType] as string);
    this.container.append(title);
    return this.container;
  }
}
