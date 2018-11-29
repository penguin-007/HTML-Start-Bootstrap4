$(function (){
	
	
	// вернет позицию элемента InViewport
	function positionInViewport ( element ) {
	   element.startPoint = element.offset().top;
	   element.endPoint = element.offset().top + element.height();

	   var viewport = {
		 top : $(window).scrollTop(),
		 bottom : $(window).scrollTop() + $(window).innerHeight()
	   }
	   var precent = 1 - ((viewport.bottom - element.startPoint) / $(window).innerHeight()) * -100;
		return precent;
	}


	// элемент, которому задаем высоту / высота навигации, если есть / процент / блок
	function setBlockHeight( element, navHeight, mod, block ){
	  var windowRealHeight = App.height;
	  if ( block ){
		windowRealHeight = $(block).height();
	  }
	  var windowHeight = windowRealHeight - navHeight;
	  if ( mod ){
		windowHeight *= mod;
	  }
	  $(element).height( windowHeight );
	  $(element).css("maxHeight", windowHeight );
	}


	// parallax
	function parallax(e, target, mod) {
	  $(target).addClass("no_delay");
	  // new position
	  var mod_x = (e.pageX * mod) / 100;
	  var mod_y = (e.pageY * mod) / 100;
	  $(target).css({
		'-webkit-transform' : 'translate3d(' + mod_y + 'px,' + mod_x +  'px, 0 )',
		'-moz-transform'    : 'translate3d(' + mod_y + 'px,' + mod_x +  'px, 0 )',
		'-ms-transform'     : 'translate3d(' + mod_y + 'px,' + mod_x +  'px, 0 )',
		'-o-transform'      : 'translate3d(' + mod_y + 'px,' + mod_x +  'px, 0 )',
		'transform'         : 'translate3d(' + mod_y + 'px,' + mod_x +  'px, 0 )',
	  });
	};


	// float_block
	function float_block(block, block_name, add_class, false_block, offset) {
		// param
		var this_b = $(block);
	  
		if (!this_b.length) return;
	  
		var block_t = $(this_b).offset().top;
		var block_h = this_b.outerHeight();
		// if need false block
		if (false_block) {
			var block_n = "float_block_" + block_name;
			var false_b = "<div class='" + block_n + "' style='height:" + block_h + "px;' ></div>";
			this_b.wrap(false_b);
		}
		// in load page
		var doc_r = $(window).scrollTop();
		if (doc_r + block_h > block_h) {
			this_b.addClass(add_class);
		}
		// in scroll
		var previous = window.scrollY;
		$(window).on('scroll', function () {
			var doc_r = $(window).scrollTop();
			if (doc_r + block_h + offset > block_h + block_t) {
				this_b.addClass(add_class);
			} else {
				this_b.removeClass(add_class);
			}
		  
			// if direction
			if (window.scrollY > previous){
			  this_b.removeClass('direction_up');
			  this_b.addClass('direction_down');
			} else {
			  this_b.addClass('direction_up');
			  this_b.removeClass('direction_down');
			}
			previous = window.scrollY;
		});
	}


	// scrollToBlock
	$("body").on("click", "[data-scroll_to_block]", function () {
		var element = $( $(this).data("scroll_to_block") );
		if (element.length > 0){
			var offset = $(this).data("scroll_to_block_offset") ? $(this).data("scroll_to_block_offset") : 0;
			var block_t = element.offset().top - offset;
			$('html, body').animate({scrollTop: block_t}, 600);
		} else {
			return;
		}
	});


	function scrollToBlock( element, offset ){
	  var block_t = $(element).offset().top - offset;
	  $('html, body').animate({scrollTop:block_t}, 600);
	};


	// tabs
	function simpleTabs(nav, content) {
		var nav = $(nav);
		var content = $(content);
		nav.children(":first-child").addClass("active");
		content.children(":first-child").addClass("active");
		nav.on("click", ">", function () {
			var _this = $(this);
			_this.addClass("active").siblings().removeClass("active");
			content.children().eq(_this.index()).addClass("active").siblings().removeClass("active");
		});
	}


	// scrollToTop
	$.fn.scrollToTop = function () {
		if ($(window).scrollTop() != "0") {
			$(this).addClass("show");
		}
		var scrollDiv = $(this);
		$(window).scroll(function () {
			if ($(window).scrollTop() == "0") {
				$(scrollDiv).removeClass("show");
			} else {
				$(scrollDiv).addClass("show");
			}
		});
		$(this).click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, "fast");
		});
	};
	// $("#goTop").scrollToTop();


	/* masked input */ 
	//var mask = "+7 (999) 999-99-99";
	//var placeholder = {'placeholder':'+7 (___) ___ __ __'};
	var mask = "+38(099) 999-99-99";
	var placeholder = {'placeholder':'+38(0__) ___-__-__'};
	var user_phone = $('.fn__user_phone_mask');

	user_phone.each(function(){
		$(this).mask(mask);
	});
	user_phone.attr(placeholder);


	$(".fn__filter_only_chars").on('keyup', function (e) {
		var val = $(this).val();
		if (val.match(/[0-9]?/g)) {
		    $(this).val(val.replace(/[0-9]?/g, ''));
		}
	    });

	$(".fn__filter_only_numbers").on('keyup', function (e) {
		var val = $(this).val();
		if (val.match(/[^0-9]/g)) {
			$(this).val(val.replace(/[^0-9]/g, ''));
		}
	});

	
  // actions
  $(window).on('resize', function() {
    
  }); 
  $(window).on('scroll', function() {
    
  });
  $(window).on('load', function () {
    
  });
  
	
	
	// if slick 
	if (typeof $(this).slick == 'function') {
		
		// slider
		var slider = $('.slider');
			
		slider.slick({
			infinite: true,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			pauseOnHover: false,
			pauseOnFocus: false,
			fade: true,
			adaptiveHeight: true,
			autoplaySpeed: 5000
		});
	}
	
	
	
	
	
});
	










	


