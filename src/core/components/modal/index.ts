import './index.css';
import CheckModalInput from '../../templates/checkModalInput';
import Page from '../../templates/page';
import Cart from '../../Cart';

export default class ModalWindow extends Page {
  cart: Cart;

  constructor(idPage: string, cart: Cart) {
    super(idPage);
    this.cart = cart;
  }

  override render() {
    const modalBlock = document.createElement('div');
    modalBlock.className = 'modal-block';

    const modalTitle = document.createElement('h2');
    modalTitle.className = 'modal-title';
    modalTitle.innerText = 'Personal details';

    const infoInputBlock = document.createElement('div');
    infoInputBlock.className = 'input-block';

    const nameBlock = document.createElement('div');
    nameBlock.className = 'name-block';
    const inputName = document.createElement('input');
    inputName.className = 'modul-input input-name';
    inputName.placeholder = 'Your Name';
    inputName.type = 'text';
    nameBlock.append(inputName);

    inputName.addEventListener('input', () => {
      CheckModalInput.checkTextField(inputName, 2, 3);
      if (nameBlock.hasChildNodes() && nameBlock.childNodes[1] !== undefined) {
        nameBlock.removeChild(nameBlock.childNodes[1]);
      }
    });

    const phoneBlock = document.createElement('div');
    phoneBlock.className = 'phone-block';
    const inputPhone = document.createElement('input');
    inputPhone.className = 'modul-input input-phone';
    inputPhone.placeholder = 'Phone number';
    inputPhone.type = 'tel';
    phoneBlock.append(inputPhone);

    inputPhone.addEventListener('input', () => {
      CheckModalInput.checkPhoneField(inputPhone);
      if (phoneBlock.hasChildNodes() && phoneBlock.childNodes[1] !== undefined) {
        phoneBlock.removeChild(phoneBlock.childNodes[1]);
      }
    });

    const addressBlock = document.createElement('div');
    addressBlock.className = 'address-block';
    const inputAddress = document.createElement('input');
    inputAddress.className = 'modul-input input-address';
    inputAddress.placeholder = 'Delivery Address';
    inputAddress.type = 'text';
    addressBlock.append(inputAddress);

    inputAddress.addEventListener('input', () => {
      CheckModalInput.checkTextField(inputAddress, 3, 5);
      if (addressBlock.hasChildNodes() && addressBlock.childNodes[1] !== undefined) {
        addressBlock.removeChild(addressBlock.childNodes[1]);
      }
    });

    const emailBlock = document.createElement('div');
    emailBlock.className = 'email-block';

    const email = document.createElement('input');
    email.className = 'modul-input input-email';
    email.placeholder = 'Your E-mail';
    email.type = 'email';
    emailBlock.append(email);

    email.addEventListener('input', () => {
      CheckModalInput.checkEmailField(email);
      if (emailBlock.hasChildNodes() && emailBlock.childNodes[1] !== undefined) {
        emailBlock.removeChild(emailBlock.childNodes[1]);
      }
    });

    infoInputBlock.append(nameBlock, phoneBlock, addressBlock, emailBlock);

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardTitle.innerText = 'Credit card details';

    const cardWrap = document.createElement('div');
    cardWrap.className = 'card-wrap';

    const cardBlock = document.createElement('div');
    cardBlock.className = 'card-block';

    const numberBlock = document.createElement('div');
    numberBlock.className = 'number-block';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'image-wrapper';

    const imgCard = document.createElement('img');
    imgCard.className = 'card-img';
    imgCard.src = '../../../assets/image/card.jpg';
    imgCard.alt = 'image card';

    const numberWrap = document.createElement('div');
    numberWrap.className = 'number-wrapper';

    const inputNumber = document.createElement('input');
    inputNumber.className = 'modul-input input-number';
    inputNumber.placeholder = 'Card Number';
    inputNumber.type = 'text';

    inputNumber.addEventListener('input', () => {
      CheckModalInput.checkCardField(inputNumber);
      if (numberWrap.hasChildNodes() && numberWrap.childNodes[1] !== undefined) {
        numberWrap.removeChild(numberWrap.childNodes[1]);
      }
    });

    imgWrap.append(imgCard);
    numberWrap.append(inputNumber);
    numberBlock.append(imgWrap, numberWrap);

    const infoCardBlock = document.createElement('div');
    infoCardBlock.className = 'info-card';

    const dateBlock = document.createElement('div');
    dateBlock.className = 'date-block';

    const dateInfo = document.createElement('div');
    dateInfo.className = 'date-info';
    dateInfo.innerText = 'DATE:';

    const dateWrap = document.createElement('div');
    dateWrap.className = 'date-wrapper';

    const inputDate = document.createElement('input');
    inputDate.className = 'modul-input input-date';
    inputDate.placeholder = 'MM/YY';
    inputDate.type = 'text';

    inputDate.addEventListener('input', () => {
      CheckModalInput.checkDateField(inputDate);
      if (dateWrap.hasChildNodes() && dateWrap.childNodes[1] !== undefined) {
        dateWrap.removeChild(dateWrap.childNodes[1]);
      }
    });
    dateWrap.append(inputDate);
    dateBlock.append(dateInfo, dateWrap);

    const cvvBlock = document.createElement('div');
    cvvBlock.className = 'cvv-block';

    const cvvInfo = document.createElement('div');
    cvvInfo.className = 'cvv-info';
    cvvInfo.innerText = 'CVV:';

    const cvvWrap = document.createElement('div');
    cvvWrap.className = 'cvv-wrapper';

    const inputCvv = document.createElement('input');
    inputCvv.className = 'modul-input input-cvv';
    inputCvv.placeholder = 'CVV';
    inputCvv.type = 'number';

    inputCvv.addEventListener('input', () => {
      CheckModalInput.checkCvvField(inputCvv);
      if (cvvWrap?.hasChildNodes() && cvvWrap.childNodes[1] !== undefined) {
        cvvWrap.removeChild(cvvWrap.childNodes[1]);
      }
    });

    cvvWrap.append(inputCvv);
    cvvBlock.append(cvvInfo, cvvWrap);

    infoCardBlock.append(dateBlock, cvvBlock);
    cardBlock.append(numberBlock, infoCardBlock);

    cardWrap.append(cardTitle, cardBlock);
    const button = document.createElement('button');
    button.className = 'confirm-button';
    button.innerText = 'Confirm';

    const buttonClose = document.createElement('button');
    buttonClose.className = 'close-button';
    buttonClose.innerText = ' ';

    buttonClose.addEventListener('click', () => {
      this.cart.toggleModal();
    });

    button.addEventListener('click', () => {
      const cardInputs = document.querySelectorAll('.modul-input');
      for (let i = 0; i < cardInputs.length; i++) {
        const elem = <HTMLInputElement>cardInputs[i];
        const elemParent = elem.parentElement;
        if (cardInputs[i] !== undefined) {
          if (cardInputs[i]?.classList.contains('input-name') && elemParent) {
            this.addErrorMessage(elemParent, elem, CheckModalInput.checkTextField(elem, 2, 3));
          } else if (cardInputs[i]?.classList.contains('input-phone') && elemParent) {
            this.addErrorMessage(elemParent, elem, CheckModalInput.checkPhoneField(elem));
          } else if (cardInputs[i]?.classList.contains('input-address') && elemParent) {
            this.addErrorMessage(elemParent, elem, CheckModalInput.checkTextField(elem, 3, 5));
          } else if (cardInputs[i]?.classList.contains('input-email') && elemParent) {
            this.addErrorMessage(elemParent, elem, CheckModalInput.checkEmailField(elem));
          } else if (cardInputs[i]?.classList.contains('input-number') && elemParent) {
            this.addErrorMessage(elemParent, elem, CheckModalInput.checkCardField(elem));
          } else if (cardInputs[i]?.classList.contains('input-date') && elemParent) {
            this.addErrorMessage(elemParent, elem, CheckModalInput.checkDateField(elem));
          } else if (cardInputs[i]?.classList.contains('input-cvv') && elemParent) {
            this.addErrorMessage(elemParent, elem, CheckModalInput.checkCvvField(elem));
          }
        }
      }
      const listError = document.querySelectorAll('.modal-error');
      if (listError.length === 0) {
        setTimeout(() => {
          modalBlock.innerHTML = `Thanks for your order!`;
          modalBlock.classList.add('greetings');
        }, 700);
        setTimeout(() => {
          this.cart.clearCart();
          this.cart.toggleModal();
        }, 3700);
      }
    });

    modalBlock.append(modalTitle, infoInputBlock, cardWrap, button, buttonClose);

    this.container.append(modalBlock);
    return this.container;
  }

  addErrorMessage(elemParent: Element, item: HTMLInputElement, func: boolean) {
    elemParent.innerHTML = '';
    elemParent.append(item);
    if (!func) {
      const errorMess = document.createElement('div');
      errorMess.className = 'modal-error';
      errorMess.innerText = 'Error! Please enter correct data';
      elemParent.append(errorMess);
    }
  }
}
