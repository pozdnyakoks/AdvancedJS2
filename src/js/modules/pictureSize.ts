export const pictureSize = (imgSelector: string) => {
  const blocks = document.querySelectorAll(
    imgSelector
  ) as NodeListOf<HTMLDivElement>;

  const showImg = (block: HTMLDivElement) => {
    const img = block.querySelector('img') as HTMLImageElement;
    img.src = img.src.slice(0, -4) + '-1.png';
    block.querySelectorAll('p:not(.sizes-hit').forEach((p) => {
      (<HTMLParagraphElement>p).style.display = 'none';
    });
  };

  const hideImg = (block: HTMLDivElement) => {
    const img = block.querySelector('img') as HTMLImageElement;
    img.src = img.src.slice(0, -6) + '.png';
    block.querySelectorAll('p:not(.sizes-hit').forEach((p) => {
      (<HTMLParagraphElement>p).style.display = 'block';
    });
  };

  blocks.forEach((block) => {
    block.addEventListener('mouseover', () => {
      showImg(block);
    });
    block.addEventListener('mouseout', () => {
      hideImg(block);
    });
  });
};
