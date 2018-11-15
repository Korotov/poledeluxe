import Siema from 'siema';
import Accordion from './js/accordion';
import MobileMenu from './js/mobilemenu';
import './js/schedule';
import './scss/styles.scss';


document.addEventListener("DOMContentLoaded", function(){
  new MobileMenu().activate();

  if (document.querySelector('.js-carousel')){
  new Siema({
    selector: '.js-carousel',
    duration: 200,
    easing: 'ease-out',
    perPage: {
      300: 1, // 1 items for viewport wider than 300px
      600: 2, // 2 items for viewport wider than 600px
      980: 3 // 3 items for viewport wider than 980px
  },
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    onInit: () => {},
    onChange: () => {},
  });
};
new Accordion({
  buttonSelector: '.price-item__row.js-accordion',
  panelSelector: '.style-preview',
  visibleDisplay: 'flex',
  });
});
