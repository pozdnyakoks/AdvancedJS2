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
    const def = matrix.replace(/\D/g, '');
    let val = el.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    el.value = matrix.replace(/./g, (a) => {
      return /[_\d]/.test(a) && i < val.length
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
