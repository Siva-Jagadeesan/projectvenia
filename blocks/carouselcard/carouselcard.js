const isDesktop = window.innerWidth > 900;
const isMobile = window.innerWidth < 899;
const isTablet = window.innerWidth > 800 && window.innerHeight > 1000;

function carouselIndicatornavigation(targetslide, domElements) {
  Array.from(domElements).forEach((element) => {
    if (element.getAttribute('data-slide-index') === targetslide) {
      element.classList.remove('hide');
      element.classList.add('show');
    } else {
      element.classList.remove('show');
      element.classList.add('hide');
    }
  });
}

function removeslideractiveElement(sliderindicator) {
  sliderindicator.childNodes.forEach((li) => {
    li.classList.remove('active');
  });
}

function createSlideIndicator(row, sliderElement, slideIndicatorCalcValue) {
  const slideIndicatorNum = Math.floor(row.length / slideIndicatorCalcValue);
  if (row.length > 0) {
    const slideindicatorConatiner = document.createElement('div');
    slideindicatorConatiner.classList.add('Carousel-Slide-Controls');
    const slideindicatorWrapper = document.createElement('ul');
    slideindicatorWrapper.classList.add('carouselcard-slide-indicators');
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < slideIndicatorNum; j++) {
      const indicator = document.createElement('li');
      indicator.setAttribute('data-target-slide', j);
      indicator.classList.add('carouselcard-slide-indicator');
      slideindicatorWrapper.append(indicator);
    }
    slideindicatorConatiner.append(slideindicatorWrapper);
    sliderElement.parentElement.append(slideindicatorConatiner);
  }
}
export default async function decorate(block) {
  const rows = block;
  block.setAttribute('id', 'carouselcard-custome');
  const divElement = document.getElementsByClassName('carouselcard-slides');
  let n = 0;
  if (isDesktop) n = 5;
  if (isTablet) n = 3;
  if (isMobile) n = 2;

  let DataSlideIndex = 0;
  let indexValue = 0;
  rows.childNodes.forEach((element) => {
    if (element.nodeName === 'DIV') {
      indexValue += 1;
      element.classList.add('carouselcard-slides');
      element.firstElementChild.classList.add('carouselcard-slide-image');
      element.lastElementChild.classList.add('carouselcard-slide-content');
      element.setAttribute('data-slide-index', DataSlideIndex);
      const calc = (Math.ceil(indexValue % n));
      if (calc === 0) {
        DataSlideIndex += 1;
      }
    }
  });

  createSlideIndicator(divElement, rows, n);
  const sliderindicator = document.getElementsByClassName('carouselcard-slide-indicators')[0];
  sliderindicator.childNodes.forEach((li) => {
    li.addEventListener('click', (e) => {
      removeslideractiveElement(sliderindicator);
      e.target.classList.add('active');
      carouselIndicatornavigation(e.target.dataset.targetSlide, divElement);
    });
  });
}
