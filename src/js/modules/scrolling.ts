export const scrolling = (upSelector: string) => {
  const upElem = document.querySelector(upSelector) as HTMLAnchorElement;
  const SCROLL_UP = 1650;
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > SCROLL_UP) {
      upElem.classList.add('animated', 'fadeIn');
      upElem.classList.remove('fadeOut');
    } else {
      upElem.classList.add('fadeOut');
      upElem.classList.remove('fadeIn');
    }
  });

  // scrolling with raf

  const links = document.querySelectorAll(
    '[href^="#"]'
  ) as NodeListOf<HTMLAnchorElement>;
  const speed = 0.3;

  links.forEach((link) => {
    link.addEventListener('click', (ev) => {
      ev.preventDefault();

      const widthTop = document.documentElement.scrollTop;
      const hash = link.hash;
      const toBlock = (<HTMLDivElement>(
        document.querySelector(hash)
      )).getBoundingClientRect().top;
      let start: null | number = null;

      const step = (time: number) => {
        if (!start) {
          start = time;
        }

        const progress = time - start;
        const scrollToY =
          toBlock < 0
            ? Math.max(widthTop - progress / speed, widthTop + toBlock)
            : Math.min(widthTop + progress / speed, widthTop + toBlock);

        document.documentElement.scrollTo(0, scrollToY);

        if (scrollToY != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      };

      requestAnimationFrame(step);
    });
  });

  //pure JS
  // const element = document.documentElement;
  // const body = document.body;

  // const calcScroll = () => {
  //   upElem.addEventListener('click', (ev) => {
  //     const scrollTop = Math.round(body.scrollTop || element.scrollTop);
  //     if (upElem.hash !== '') {
  //       ev.preventDefault();
  //       let hashElement = document.querySelector(upElem.hash) as HTMLElement;
  //       let hashElementTop = 0;

  //       while (hashElement.offsetParent) {
  //         hashElementTop += hashElement.offsetTop;
  //         hashElement = hashElement.offsetParent as HTMLElement;
  //       }

  //       hashElementTop = Math.round(hashElementTop);
  //       smoothScroll(scrollTop, hashElementTop, upElem.hash);
  //     }
  //   });
  // };

  // const smoothScroll = (from: number, to: number, hash: string) => {
  //   const timeInterval = 1;
  //   let prevScrollTop: null | number;
  //   const speed = to > from ? 30 : -30;

  //   const move = setInterval(() => {
  //     const scrollTop = Math.round(body.scrollTop || element.scrollTop);

  //     if (
  //       prevScrollTop === scrollTop ||
  //       (to > from && scrollTop >= to) ||
  //       (to < from && scrollTop <= to)
  //     ) {
  //       clearInterval(move);
  //       history.replaceState(
  //         history.state,
  //         document.title,
  //         location.href.replace(/#.*$/g, '') + hash
  //       );
  //     } else {
  //       body.scrollTop += speed as number;
  //       element.scrollTop += speed as number;
  //       prevScrollTop = scrollTop;
  //     }
  //   }, timeInterval);
  // };
  // calcScroll();
};
