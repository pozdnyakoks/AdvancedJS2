export const mask = (selector: string) => {
  const setCursorPosition = (pos: number, elem: HTMLInputElement) => {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if ((<any>elem).createTextRange) {
      const range = (<any>elem).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  const createMask = (event: Event) => {
    const el = event.target as HTMLInputElement;
    const matrix = '+7 (___) ___ __ __';
    let i = 0;
    const regNotANumber = /\D/g;
    const def = matrix.replace(regNotANumber, '');
    let val = el.value.replace(regNotANumber, '');

    if (def.length >= val.length) {
      val = def;
    }

    const regAny = /./g;
    el.value = matrix.replace(regAny, (a) => {
      const regSym = /[_\d]/;
      return regSym.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ''
        : a;
    });

    if (event.type === 'blur') {
      if (el.value.length === 2) {
        el.value = '';
      }
    } else {
      setCursorPosition(el.value.length, el);
    }
  };

  const inputs = document.querySelectorAll(selector);

  inputs.forEach((input) => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};
