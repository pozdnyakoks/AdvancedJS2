export const accordion = (triggerSelector: string) => {
  const btns = document.querySelectorAll(triggerSelector);

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((btn) => {
        const sibling = btn.nextElementSibling as HTMLDivElement;
        btn.classList.remove('active-style');
        sibling.classList.remove('active-content');
        sibling.style.maxHeight = '0px';
      });
      const sibling = btn.nextElementSibling as HTMLDivElement;
      btn.classList.toggle('active-style');
      sibling.classList.toggle('active-content');
      sibling.style.maxHeight = `${sibling.scrollHeight + 80}px`;
    });
  });
};
