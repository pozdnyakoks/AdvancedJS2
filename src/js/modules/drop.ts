export const drop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  const preventDefaults = (ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  const highlight = (item: HTMLInputElement) => {
    const closest = item.closest('.file_upload') as HTMLDivElement;
    closest.style.border = '5px solid yellow';
    closest.style.backgroundColor = 'rgba(0,0,0,.7)';
  };
  const unHighlight = (item: HTMLInputElement) => {
    const closest = item.closest('.file_upload') as HTMLDivElement;
    closest.style.border = 'none';
    if (item.closest('.calc_form')) {
      closest.style.backgroundColor = '#fff';
    } else {
      closest.style.backgroundColor = '#ededed';
    }
  };

  ['dragenter', 'dragover'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => highlight(input), false);
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => unHighlight(input), false);
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener('drop', (ev) => {
      const target = ev.target as HTMLInputElement;
      let files: FileList = <FileList>target.files;
      const [fileName, fileExt] = files[0].name.split('.');
      const dots = fileName.length > 6 ? '...' : '.';
      const name = `${fileName.substring(0, 6)} ${dots} ${fileExt}`;

      (<HTMLElement>input.previousElementSibling).textContent = name;
      //непонятно
      files = (<DragEvent>ev).dataTransfer.files;
    });
  });
};
