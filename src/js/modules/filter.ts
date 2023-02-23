export const filter = () => {
  const menu = document.querySelector('.portfolio-menu') as HTMLUListElement;
  const items = menu.querySelectorAll('li');
  const btnAll = menu.querySelector('.all') as HTMLLIElement;
  const btnLovers = menu.querySelector('.lovers') as HTMLLIElement;
  const btnChef = menu.querySelector('.chef') as HTMLLIElement;
  const btnGirl = menu.querySelector('.girl') as HTMLLIElement;
  const btnGuy = menu.querySelector('.guy') as HTMLLIElement;
  const btnGrandmother = menu.querySelector('.grandmother') as HTMLLIElement;
  const btnGranddad = menu.querySelector('.granddad') as HTMLLIElement;
  const wrapper = document.querySelector(
    '.portfolio-wrapper'
  ) as HTMLDivElement;
  const markAll = wrapper.querySelectorAll(
    '.all'
  ) as NodeListOf<HTMLDivElement>;
  const markGirl = wrapper.querySelectorAll(
    '.girl'
  ) as NodeListOf<HTMLDivElement>;
  const markLovers = wrapper.querySelectorAll(
    '.lovers'
  ) as NodeListOf<HTMLDivElement>;
  const markChef = wrapper.querySelectorAll(
    '.chef'
  ) as NodeListOf<HTMLDivElement>;
  const markGuy = wrapper.querySelectorAll(
    '.guy'
  ) as NodeListOf<HTMLDivElement>;
  const no = document.querySelector('.portfolio-no') as HTMLParagraphElement;

  const typeFilter = (markType?: NodeListOf<HTMLDivElement>) => {
    markAll.forEach((mark) => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');
    });

    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    if (markType) {
      markType.forEach((mark) => {
        mark.style.display = 'block';
        mark.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  };

  const btnsArray = [
    btnAll,
    btnLovers,
    btnChef,
    btnGirl,
    btnGuy,
    btnGrandmother,
    btnGranddad,
  ];
  const marks = [markAll, markLovers, markChef, markGirl, markGuy];
  btnsArray.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      typeFilter(marks[index]);
    });
  });

  menu.addEventListener('click', (ev: Event) => {
    const target = ev.target;
    if (target && (<HTMLElement>target).tagName === 'LI') {
      items.forEach((item) => {
        item.classList.remove('active');
        (<HTMLElement>target).classList.add('active');
      });
    }
  });
};
