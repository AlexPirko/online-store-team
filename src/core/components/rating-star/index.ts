import './index.css';
import Component from '../../templates/component';

export default class RatingStar extends Component {
  private rating: number;

  constructor(rating: number) {
    super('div', 'rating-star');
    this.rating = rating;
  }

  override render() {
    const ratingPercentage = (this.rating / 5) * 100;
    this.container.style.backgroundImage = `linear-gradient(to right, #fec524 0%, #fec524 ${ratingPercentage}%, white ${ratingPercentage}%, white 100%)`;
    return this.container;
  }
}
