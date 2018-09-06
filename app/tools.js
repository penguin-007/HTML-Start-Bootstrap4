var headerheight = $("header").height();


$(window).on("scroll", function () {
	if ($(this).scrollTop() >= headerheight) {
		$("body").addClass("fixed-nav");
		$("header").stop().animate({
			paddingTop: 5,
			paddingBottom: 5
		}, 400);
	}
	if ($(this).scrollTop() < headerheight) {
		$("header").stop().animate({
			paddingTop: 20,
			paddingBottom: 20
		}, 400);
	}
});


//
if ( $(".classname").length ){
	
}


// form input_file
$(".input_file").change( function(){
  var file_name = $(this).find("input").val();
  var file_name = file_name.match(/[^\/\\]+$/);
  $(".input_file span").text(file_name);
});
     