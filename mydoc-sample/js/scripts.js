
$(document).ready(function(){

/* off-canvas sidebar toggle */
$('[data-toggle=offcanvas]').click(function() {
  	

    
    /*    if ($(window).width() <= 992) {
          
        } else {
          
        }*/
          if ($(window).width() >= 768) {
          	$('.left-side').toggleClass('visible-xs');
           $(".right-side").toggleClass("strech");
      	 }
});
});