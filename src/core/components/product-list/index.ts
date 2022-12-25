import { Product } from "../../../types/types";
import Component from "../../templates/component";
import ProductCard from "../product-card";

export default class ProductList extends Component {
  protected products: Product[];
  constructor(tagName: string, className: string, products: Product[]) {
    super(tagName, className);
    this.products = products;
  }
  public override render() {
    this.products.forEach((item) => {
      const card = new ProductCard('div', 'product-card', item).render();
      this.container.append(card);
    })
    return this.container;
  }
}