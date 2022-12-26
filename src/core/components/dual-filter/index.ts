import './index.css';
import Component from '../../templates/component';
import Products from '../../Products';

export default class DualFilter extends Component {
  protected products: Products;

  protected filterBy: string;

  constructor(tagName: string, className: string, filterBy: string, products: Products) {
    super(tagName, className);
    this.products = products;
    this.filterBy = filterBy;
  }

  getRange(fromSlider: HTMLInputElement, toSlider: HTMLInputElement): string {
    const from = fromSlider.value;
    const to = toSlider.value;
    return `${from}↕${to}`;
  }

  updateOpts(value: string) {
    this.products.updateOpts(this.filterBy, value, ['filter-block']);
  }

  override render() {
    const allNumbers = this.products.initialItems?.map((product) => product[this.filterBy]) as number[];
    const maxValue = Math.max(...allNumbers);
    const minValue = Math.min(...allNumbers);
    const availableNumbers = this.products.items?.map((product) => product[this.filterBy]) as number[];
    const maxAvailableValue = Math.max(...availableNumbers);
    const minAvailableValue = Math.min(...availableNumbers);
    let optsMin: null | number = null;
    let optsMax: null | number = null;
    if (this.products.opts[this.filterBy]) {
      [optsMin, optsMax] = this.products.opts[this.filterBy]?.split('↕').map((num) => +num) as [number, number];
    }
    const html = `
    <div class="range_container">
      <h3>${this.filterBy}</h3>
      <div class="control-wrap">
      <div class="form_control">
      <div class="form_control_container">
          <input 
            class="form_control_container__time__input" 
            type="number" 
            id="fromInput" 
            value="${minAvailableValue || optsMin || minValue}"
            min="${minValue}" 
            max="${maxValue}"/>
      </div>
      <div class="form_control_container">
          <input 
            class="form_control_container__time__input" 
            type="number" 
            id="toInput" 
            value="${maxAvailableValue || optsMax || maxValue}"
            min="${minValue}" 
            max="${maxValue}"/>
      </div>
      </div>
      <div class="sliders_control">
      <input id="fromSlider" type="range" value="${
        minAvailableValue || optsMin || minValue
      }" min="${minValue}" max="${maxValue}"/>
      <input id="toSlider" type="range" value="${
        maxAvailableValue || optsMax || maxValue
      }" min="${minValue}" max="${maxValue}"/>
      </div>
      </div>
    </div>
    `;
    this.container.innerHTML = html;

    function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): [number, number] {
      const from: number = parseInt(currentFrom.value, 10);
      const to: number = parseInt(currentTo.value, 10);
      return [from, to];
    }

    function fillSlider(
      from: HTMLInputElement,
      to: HTMLInputElement,
      sliderColor: string,
      rangeColor: string,
      controlSlider: HTMLInputElement
    ): void {
      const rangeDistance = +to.max - +to.min;
      const fromPosition = +from.value - +to.min;
      const toPosition = +to.value - +to.min;
      controlSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget: HTMLInputElement, target: HTMLInputElement) {
      // const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
      if (+currentTarget.value <= +currentTarget.min) {
        target.style.zIndex = `${2}`;
      } else {
        target.style.zIndex = `${0}`;
      }
    }

    function controlFromInput(
      fromSlider: HTMLInputElement,
      fromInput: HTMLInputElement,
      toInput: HTMLInputElement,
      controlSlider: HTMLInputElement
    ): void {
      const [from, to] = getParsed(fromInput, toInput);
      fillSlider(fromInput, toInput, '#C6C6C6', '#0075ff', controlSlider);
      if (from > to) {
        fromSlider.value = `${to}`;
        fromInput.value = `${to}`;
      } else {
        fromSlider.value = `${from}`;
      }
    }

    function controlToInput(
      toSlider: HTMLInputElement,
      fromInput: HTMLInputElement,
      toInput: HTMLInputElement,
      controlSlider: HTMLInputElement
    ): void {
      const [from, to] = getParsed(fromInput, toInput);
      fillSlider(fromInput, toInput, '#C6C6C6', '#0075ff', controlSlider);
      setToggleAccessible(toInput, toSlider);
      if (from <= to) {
        toSlider.value = `${to}`;
        toInput.value = `${to}`;
      } else {
        toInput.value = `${from}`;
      }
    }

    const controlFromSlider = (
      fromSlider: HTMLInputElement,
      toSlider: HTMLInputElement,
      fromInput: HTMLInputElement
    ): void => {
      const [from, to] = getParsed(fromSlider, toSlider);
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#0075ff', toSlider);
      if (from > to) {
        fromSlider.value = `${to}`;
        fromInput.value = `${to}`;
      } else {
        fromInput.value = `${from}`;
      }
      const value = this.getRange(fromSlider, toSlider);
      this.updateOpts(value);
    };

    const controlToSlider = (
      fromSlider: HTMLInputElement,
      toSlider: HTMLInputElement,
      toInput: HTMLInputElement
    ): void => {
      const [from, to] = getParsed(fromSlider, toSlider);
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#0075ff', toSlider);
      setToggleAccessible(toSlider, toSlider);
      if (from <= to) {
        toSlider.value = `${to}`;
        toInput.value = `${to}`;
      } else {
        toInput.value = `${from}`;
        toSlider.value = `${from}`;
      }
      const value = this.getRange(fromSlider, toSlider);
      this.updateOpts(value);
    };

    const fromSlider = this.container.querySelector('#fromSlider') as HTMLInputElement;
    const toSlider = this.container.querySelector('#toSlider') as HTMLInputElement;
    const fromInput = this.container.querySelector('#fromInput') as HTMLInputElement;
    const toInput = this.container.querySelector('#toInput') as HTMLInputElement;

    fillSlider(fromSlider, toSlider, '#C6C6C6', '#0075ff', toSlider);
    setToggleAccessible(toSlider, toSlider);

    fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
    fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
    toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

    return this.container;
  }
}
