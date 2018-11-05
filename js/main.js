import Siema from 'siema';
import Accordion from './accordion';
import MobileMenu from './mobilemenu.js';
import './schedule';

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
});
document.addEventListener("DOMContentLoaded", function(){
  new Accordion({
    buttonSelector: '.price-item__row.js-accordion',
    panelSelector: '.style-preview',
    visibleDisplay: 'flex',
    });
  

});