import Component from '../../templates/component';
import './index.css';

export default class Summary extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }
  override render() {
    this.container.textContent = 'SUMMARY!!!!'
    return this.container;
  }
}