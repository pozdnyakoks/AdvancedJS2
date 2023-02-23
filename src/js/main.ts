import {
  modals,
  sliders,
  forms,
  mask,
  checkTextInputs,
  showMoreStyles,
  calc,
} from './modules';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  modals();
  sliders({
    slides: '.feedback-slider-item',
    dir: 'horizontal',
    prev: '.main-prev-btn',
    next: '.main-next-btn',
  });
  sliders({
    slides: '.main-slider-item',
    dir: 'vertical',
  });
  forms();
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message]"');
  showMoreStyles('.button-styles', '#styles .row');

  calc({
    size: '#size',
    material: '#material',
    options: '#options',
    promocode: '.promocode',
    result: '.calc-price',
  });
});
