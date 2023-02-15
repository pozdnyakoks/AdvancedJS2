export const modals = () => {
  function bindModal({ triggerSelector, modalSelector, closeSelector, closeClickOverlay = true }) {

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
    }

    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelector);
    const windows = document.querySelectorAll('[data-modal]');
    const scroll = calcScroll();

    const closeWindows = () => {
      windows.forEach(window => {
        window.style.display = 'none';
        document.body.style.marginRight = '0';
      })
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (ev) => {
        if (ev.target) {
          ev.preventDefault();
        }

        closeWindows()

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
        close.focus();
      })
    })

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    })

    const closeModal = () => {
      closeWindows();
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    close.addEventListener('click', () => {
      closeModal()
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        closeModal();
        closeWindows();
      }
    })
  }

  const showModalByTime = (selector, time) => {
    setTimeout(() => {
      let display;

      document.querySelectorAll('[data-modal]').forEach(modal => {
        if (getComputedStyle(modal).display !== 'none') {
          display = 'block';
        }
      })

      if (!display) {
        document.querySelector(selector).style.display = 'block'
        document.body.style.overflow = 'hidden';
      }
    }, time);
  }

  bindModal({
    triggerSelector: '.button-design',
    modalSelector: '.popup-design',
    closeSelector: '.popup-design .popup-close'
  })

  bindModal({
    triggerSelector: '.button-consultation',
    modalSelector: '.popup-consultation',
    closeSelector: '.popup-consultation .popup-close'
  })

  showModalByTime('.popup-consultation', 5000);
};
