import Component from "../../templates/component";
import Cart from "../../Cart";
import CartItem from "../cart-item";

export default class CartList extends Component {
  protected cart: Cart;
  constructor(tagName: string, className: string, cart: Cart) {
    super(tagName, className);
    this.cart = cart;
  }

  override render() {
    const elems: HTMLElement[] = [];
    this.cart.items.forEach((item, idx) => {
      let elem = new CartItem('div', 'cart-item', this.cart, item, idx + 1).render();
      elems.push(elem);
    });
    const {page, limit} = this.cart.opts
    const from = (page - 1) * limit;
    const to = page * limit;
    const viewElems = elems.slice(from, to);
    this.container.append(...viewElems);
    return this.container;
  }

}