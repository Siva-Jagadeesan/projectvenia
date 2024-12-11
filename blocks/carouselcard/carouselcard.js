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

function createSlideIndicator(row, sliderElement) {
  if (row.length > 0) {
    let slideIndicatorNum;
    if (isDesktop) slideIndicatorNum = Math.ceil(row.length / 5);
    if (isTablet) slideIndicatorNum = Math.ceil(row.length / 3);
    if (isMobile) slideIndicatorNum = Math.ceil(row.length / 2);
    const slideindicatorConatiner = document.createElement('div');
    slideindicatorConatiner.classList.add('Carousel-Slide-Controls');
    const slideindicatorWrapper = document.createElement('ul');
    slideindicatorWrapper.classList.add('carouselcard-slide-indicators');
    Array.from(row).forEach((element, index) => {
      for (let j = 0; j < slideIndicatorNum; j + 1) {
        if (j * (Math.ceil(row.length / slideIndicatorNum)) <= index) {
          element.setAttribute('data-slide-index', j);
        }
      }
    });

    for (let i = 0; i < slideIndicatorNum; i + 1) {
      const indicator = document.createElement('li');
      indicator.setAttribute('data-target-slide', i);
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
  rows.childNodes.forEach((element) => {
    if (element.nodeName === 'DIV') {
      element.classList.add('carouselcard-slides');
      element.firstElementChild.classList.add('carouselcard-slide-image');
      element.lastElementChild.classList.add('carouselcard-slide-content');
    }
  });

  const divElement = document.getElementsByClassName('carouselcard-slides');
  createSlideIndicator(divElement, rows);
  const sliderindicator = document.getElementsByClassName('carouselcard-slide-indicators')[0];
  sliderindicator.childNodes.forEach((li) => {
    li.addEventListener('click', (e) => {
      li.classList.remove('active');
      removeslideractiveElement(sliderindicator);
      e.target.classList.add('active');
      carouselIndicatornavigation(e.target.dataset.targetSlide, divElement);
    });
  });
}
