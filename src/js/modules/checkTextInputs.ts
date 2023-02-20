export const checkTextInputs = (selector: string) => {
  const txtInputs = document.querySelectorAll(selector);

  txtInputs.forEach((input) => {
    input.addEventListener('keypress', (e) => {
      if ((<KeyboardEvent>e).key.match(/[^а-яё 0-9]/gi)) {
        e.preventDefault();
      }
    });
  });
};
