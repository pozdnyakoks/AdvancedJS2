import { getResource } from '../services/requests';

export const showMoreStyles = (trigger: string, wrapper: string) => {
  const btn = document.querySelector(trigger);
  const container = document.querySelector(wrapper) as HTMLDivElement;

  (<HTMLButtonElement>btn).addEventListener('click', function () {
    getResource('./src/assets/db.json')
      .then((res) => createCards(res.styles))
      .catch(() => {
        const errorMessage = document.createElement('p');
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        errorMessage.textContent =
          'Извините, что-то пошло не так, повторите попытку позже';
        container.appendChild(errorMessage);
      });
    this.remove();
  });

  const createCards = (response: []) => {
    response.forEach(
      ({ src, title, link }: { src: string; title: string; link: string }) => {
        const card = document.createElement('div');
        card.classList.add(
          'animated',
          'fadeInUp',
          'col-sm-3',
          'col-sm-offset-0',
          'col-xs-10',
          'col-xs-offset-1'
        );
        card.innerHTML = `
          	<div class="styles-block">
					    <img src='./src/${src}' alt="style">
					    <h4>${title}</h4>
					    <a href=${link}>Подробнее</a>
				    </div>
        `;

        container.appendChild(card);
      }
    );
  };
};
