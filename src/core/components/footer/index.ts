import './index.css';
import Component from '../../templates/component';

export default class Footer extends Component {
  override render(): HTMLElement {
    const html = `
      <div class='link-block'>
        <a href='https://github.com/batar-btr' class='git-link'>batar-btr</a>
        <a href='https://github.com/AlexPirko' class='git-link'>AlexPirko</a>
      </div>
      <span>2023</span>
      <a href='https://rs.school/js/' class='rs-link'></a>
    `;
    this.container.innerHTML = html;
    return this.container;
  }
}
