export const modals = () => {
  let btnPressed = false;

  const calcScroll = () => {
    const div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  };

  function bindModal({
    triggerSelector,
    modalSelector,
    closeSelector,
    destroy = false,
  }: {
    triggerSelector: string;
    modalSelector: string;
    closeSelector: string;
    destroy?: boolean;
  }) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector) as HTMLDivElement;
    const close = document.querySelector(closeSelector) as HTMLDivElement;
    const windows = document.querySelectorAll(
      '[data-modal]'
    ) as NodeListOf<HTMLDivElement>;
    const scroll = calcScroll();

    const closeWindows = () => {
      windows.forEach((window) => {
        window.style.display = 'none';
        document.body.style.marginRight = '0';
        window.classList.add('animated', 'fadeIn');
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (ev) => {
        if (ev.target) {
          ev.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          trigger.remove();
        }

        closeWindows();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
        close.focus();
      });
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });

    const closeModal = () => {
      closeWindows();
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };

    close.addEventListener('click', () => {
      closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  const showModalByTime = (selector: string, time: number) => {
    setTimeout(() => {
      let display;

      document.querySelectorAll('[data-modal]').forEach((modal) => {
        if (getComputedStyle(modal).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        (<HTMLElement>document.querySelector(selector)).style.display = 'block';
        document.body.style.overflow = 'hidden';
        const scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  };

  const openByScroll = (selector: string) => {
    window.addEventListener('scroll', () => {
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      if (
        !btnPressed &&
        window.scrollY + document.documentElement.clientHeight >= scrollHeight
      ) {
        (<HTMLElement>document.querySelector(selector)).click();
      }
    });
  };

  bindModal({
    triggerSelector: '.button-design',
    modalSelector: '.popup-design',
    closeSelector: '.popup-design .popup-close',
  });

  bindModal({
    triggerSelector: '.button-consultation',
    modalSelector: '.popup-consultation',
    closeSelector: '.popup-consultation .popup-close',
  });
  bindModal({
    triggerSelector: '.fixed-gift',
    modalSelector: '.popup-gift',
    closeSelector: '.popup-gift .popup-close',
    destroy: true,
  });
  openByScroll('.fixed-gift');

  showModalByTime('.popup-consultation', 60000);
};
