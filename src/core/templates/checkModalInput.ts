export default class CheckModalInput {
  static checkTextField(checked: HTMLInputElement, wordAmount: number, letterAmount: number) {
    if (checked.classList.contains('valid-form')) checked.classList.remove('valid-form');
    const letterArray = checked.value.split(' ');
    if (letterArray.length < wordAmount) {
      checked.classList.add('invalid-form');
      return false;
    }

    for (let i = 0; i < letterArray.length; i++) {
      if (letterArray[i] !== undefined) {
        if (Number(letterArray[i]?.length) < letterAmount) {
          checked.classList.add('invalid-form');
          return false;
        }
      }
    }
    checked.classList.remove('invalid-form');
    checked.classList.add('valid-form');
    return true;
  }

  static checkPhoneField(checked: HTMLInputElement) {
    if (checked.classList.contains('valid-form')) checked.classList.remove('valid-form');
    if (checked.value.length < 10 || checked.value[0] !== '+') {
      checked.classList.add('invalid-form');
      return false;
    }
    for (let i = 1; i < checked.value.length; i++) {
      if (typeof Number(checked.value[i]) !== 'number') {
        return false;
      }
    }
    checked.classList.remove('invalid-form');
    checked.classList.add('valid-form');
    return true;
  }

  static checkEmailField(checked: HTMLInputElement) {
    if (checked.classList.contains('valid-form')) checked.classList.remove('valid-form');
    const expression =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = expression.test(String(checked.value).toLowerCase());
    if (valid) {
      checked.classList.remove('invalid-form');
      checked.classList.add('valid-form');
      return true;
    } else {
      checked.classList.add('invalid-form');
      return false;
    }
  }

  static checkCardField(checked: HTMLInputElement) {
    if (checked.classList.contains('valid-form')) checked.classList.remove('valid-form');
    const img = <HTMLImageElement>document.querySelectorAll('.card-img')[0];
    if (checked.value[0] !== undefined) {
      if (Number(checked.value[0]) === 3) img.src = '../../../assets/image/american-express.png';
      else if (Number(checked.value[0]) === 4) img.src = '../../../assets/image/visa.png';
      else if (Number(checked.value[0]) === 5) img.src = '../../../assets/image/mastercard.png';
      else img.src = '../../../assets/image/card.jpg';
    }

    let cardNumber = checked.value.replace(/[^\d]/g, '').substring(0, 16);
    cardNumber = cardNumber !== '' ? (cardNumber.match(/.{1,4}/g) as RegExpMatchArray).join(' ') : '';
    checked.value = cardNumber;
    if (checked.value.length >= 19) {
      checked.classList.remove('invalid-form');
      checked.classList.add('valid-form');
      return true;
    } else {
      checked.classList.add('invalid-form');
      return false;
    }
  }

  static checkDateField(checked: HTMLInputElement) {
    if (checked.classList.contains('valid-form')) checked.classList.remove('valid-form');
    let cardDate = checked.value.replace(/[^\d]/g, '').substring(0, 4);
    cardDate = cardDate !== '' ? (cardDate.match(/.{1,2}/g) as RegExpMatchArray).join('/') : '';
    checked.value = cardDate;
    if (+checked.value.slice(0, 2) > 12) {
      checked.classList.add('invalid-form');
      return false;
    }
    if (+checked.value.slice(-2) < 23) {
      checked.classList.add('invalid-form');
      return false;
    }
    if (checked.value.length >= 5) {
      checked.classList.remove('invalid-form');
      checked.classList.add('valid-form');
      return true;
    } else {
      checked.classList.add('invalid-form');
      return false;
    }
  }

  static checkCvvField(checked: HTMLInputElement) {
    if (checked.classList.contains('valid-form')) checked.classList.remove('valid-form');
    if (checked.value.length > 3) {
      checked.value = checked.value.slice(0, checked.value.length - 1);
    }
    if (checked.value.length >= 3) {
      checked.classList.remove('invalid-form');
      checked.classList.add('valid-form');
      return true;
    } else {
      checked.classList.add('invalid-form');
      return false;
    }
  }
}
