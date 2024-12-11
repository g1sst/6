$(document).ready(function () {
    const slider = $('.slider');
    const slides = $('.slide');
    const slideCount = slides.length;
    let currentIndex = 0;
  
    // Рассчитываем количество видимых слайдов в зависимости от ширины экрана
    function getVisibleSlides() {
      return $(window).width() > 768 ? 3 : 1;
    }
  
    // Создание пейджера
    const pager = $('.pager');
    const totalPages = Math.ceil(slideCount / getVisibleSlides());
  
    for (let i = 0; i < totalPages; i++) {
      pager.append(`<span class="${i === 0 ? 'active' : ''}" data-page="${i}">${i + 1}</span>`);
    }
  
    // Обновление слайдера
    function updateSlider() {
      const visibleSlides = getVisibleSlides();
      const slideWidth = 100 / visibleSlides; // Процент ширины одного слайда
      const offset = -currentIndex * slideWidth;
  
      slider.css('transform', `translateX(${offset}%)`);
  
      // Обновляем активный элемент пейджера
      pager.find('span').removeClass('active');
      pager.find(`span[data-page="${Math.floor(currentIndex / visibleSlides)}"]`).addClass('active');
    }
  
    // Обработчик кликов на стрелки
    $('.arrow').click(function () {
      const visibleSlides = getVisibleSlides();
  
      if ($(this).hasClass('left')) {
        currentIndex = Math.max(currentIndex - visibleSlides, 0);
      } else if ($(this).hasClass('right')) {
        currentIndex = Math.min(currentIndex + visibleSlides, slideCount - visibleSlides);
      }
  
      updateSlider();
    });
  
    // Обработчик кликов на пейджер
    pager.on('click', 'span', function () {
      const pageIndex = $(this).data('page');
      const visibleSlides = getVisibleSlides();
  
      currentIndex = pageIndex * visibleSlides;
      updateSlider();
    });
  
    // Пересчет при изменении размера окна
    $(window).resize(updateSlider);
  
    // Инициализация
    updateSlider();
  });
  
