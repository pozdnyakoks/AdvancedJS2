export const burger = (menu: string, burgerSelector: string) => {
  const menuEl = document.querySelector(menu) as HTMLUListElement;
  const burgerEl = document.querySelector(burgerSelector) as HTMLButtonElement;
  const MOBILE_BREAKPOINT = 992;
  menuEl.style.display = 'none';

  burgerEl.addEventListener('click', () => {
    if (
      menuEl.style.display === 'none' &&
      window.screen.availWidth <= MOBILE_BREAKPOINT
    ) {
      menuEl.style.display = 'block';
    } else {
      menuEl.style.display = 'none';
    }
  });

  window.addEventListener('resize', () => {
    if (window.screen.availWidth > MOBILE_BREAKPOINT) {
      menuEl.style.display = 'none';
    }
  });
};
