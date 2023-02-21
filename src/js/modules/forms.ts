import { postData } from '../services/requests';

export const forms = () => {
  const forms = document.querySelectorAll('form');
  const inputs = document.querySelectorAll('input');
  const textareas = document.querySelectorAll('textarea');
  const uploads = document.querySelectorAll('[name="upload"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро с вами свяжемся',
    failure: 'Что-то пошло не так',
    spinner: './src/assets/img/spinner.gif',
    ok: './src/assets/img/ok.png',
    fail: './src/assets/img/fail.png',
  };

  const path = {
    designer: './src/assets/server.php',
    question: './src/assets/question.php',
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = '';
    });

    textareas.forEach((textarea) => {
      textarea.value = '';
    });

    uploads.forEach((upload) => {
      (<HTMLElement>upload.previousElementSibling).textContent =
        'Файл не выбран';
    });
  };

  uploads.forEach((upload) => {
    upload.addEventListener('input', (ev) => {
      const target = ev.target as HTMLInputElement;

      const file = (<FileList>target.files)[0];
      const [fileName, fileExt] = file.name.split('.');
      const dots = fileName.length > 6 ? '...' : '.';
      const name = `${fileName.substring(0, 6)} ${dots} ${fileExt}`;

      (<HTMLElement>upload.previousElementSibling).textContent = name;
    });
  });

  forms.forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      (<HTMLElement>form.parentNode).appendChild(statusMessage);
      form.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        form.style.display = 'none';
      }, 400);

      const statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);

      const textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(form);
      const api =
        form.closest('.popup-design') || form.classList.contains('calc_form')
          ? path.designer
          : path.question;

      postData(api, formData)
        .then(() => {
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            form.style.display = 'block';
            form.classList.remove('fadeOutUp');
            form.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};
