export const sliders = ({
  slides,
  dir,
  prev,
  next,
}: {
  slides: string;
  dir: string;
  prev?: string;
  next?: string;
}) => {
  let slideIndex = 1;
  let paused: number;

  const items = document.querySelectorAll(slides) as NodeListOf<HTMLDivElement>;

  const showSlides = (n: number) => {
    if (n > items.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach((item) => {
      item.classList.add('animated');
      item.style.display = 'none';
    });

    items[slideIndex - 1].style.display = 'block';
  };

  showSlides(slideIndex);

  const changeSlides = (n: number) => {
    showSlides((slideIndex += n));
  };

  if (prev && next) {
    const prevBtn = document.querySelector(prev) as HTMLButtonElement;
    const nextBtn = document.querySelector(next) as HTMLButtonElement;

    prevBtn.addEventListener('click', () => {
      changeSlides(-1);
      items[slideIndex - 1].classList.remove('slideInRight');
      items[slideIndex - 1].classList.add('slideInLeft');
    });

    nextBtn.addEventListener('click', () => {
      changeSlides(1);
      items[slideIndex - 1].classList.remove('slideInLeft');
      items[slideIndex - 1].classList.add('slideInRight');
    });
  }

  const activateAnimation = () => {
    if (dir === 'vertical') {
      paused = setInterval(() => {
        changeSlides(1);
        items[slideIndex - 1].classList.add('slideInDown');
      }, 2000);
    } else {
      paused = setInterval(() => {
        changeSlides(1);
        items[slideIndex - 1].classList.remove('slideInLeft');
        items[slideIndex - 1].classList.add('slideInRight');
      }, 2000);
    }
  };
  activateAnimation();
  (<HTMLElement>items[0].parentNode).addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  (<HTMLElement>items[0].parentNode).addEventListener('mouseleave', () => {
    clearInterval(paused);
    activateAnimation();
  });
};
