(function(){
  var elementSwiper = '#lunbotu_12';
  var swiper = new Swiper(elementSwiper + ' .swiper-container', {
      autoplay: {
          delay: 3000, //3秒切换一次
          disableOnInteraction: false
      },
      navigation: {
          nextEl: elementSwiper + ' .swiper-button-next',
          prevEl: elementSwiper + ' .swiper-button-prev',
          disabledClass: 'my-button-disabled',
      },
      pagination: {
          el: elementSwiper + ' .swiper-pagination'
      }
  });
})()