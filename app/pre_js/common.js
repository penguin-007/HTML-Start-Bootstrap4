$(function (){
  //= ./common_app.js
   
  // actions
  $(window).on('resize', function() {
    
  }); 
  $(window).on('scroll', function() {
    
  });
  $(window).on('load', function () {
    
  });
  
  // simpleModal
  simpleModal.init();
  
  // aos
  AOS.init({
    disable: 'mobile',
    offset: 200,
    duration: 600,
    delay: 100,
  });
  
  // if slick 
  if (typeof $(this).slick == 'function') {

    var slider = $('.slider');
    
    slider.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      fade: true,
      autoplaySpeed: 5000
    });
    
    $(".slider").click(function() {
        slider.slick("slickPrev");
    }), $(".slider").click(function() {
      slider.slick("slickNext");
    });
    
  }
  // END if slick


  $(".fn__filter_only_numbers").on('keyup', function (e) {
    var val = $(this).val();
    if (val.match(/[^0-9]/g)) {
        $(this).val(val.replace(/[^0-9]/g, ''));
    }
  });
  
  
});

