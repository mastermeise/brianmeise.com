$( document ).ready(function() {

		var divs = $('#headerinner');

	$(window).on('scroll', function() {
	
	var speed1 = 0.8;
	var speed2 = 1.0;

		
		$('#header').css('backgroundPosition', ((window.scrollX * speed1) - 0 ) + "px " + ((window.scrollY * speed1) - 0 ) + "px"); 
	
		var st = $(this).scrollTop();
		divs.css({ 'opacity' : (1 - st/240) });
	
	    
	}); 
});