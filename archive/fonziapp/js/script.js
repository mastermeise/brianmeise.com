/* Author:

*/
var bm = {};

(function(window, undefined){
	var $ = jQuery,
		cache = {},
		data = {},
		animTime = 1000,
		nextImageDelay = 4000,
		nextImageTimer;
	
	bm.nextImage = function(){
		var photos = cache.photos,
			photo = photos.filter('.active'),
			next = photo.next();
		
		if(!photo.is(':animated')){
			next = ((next.length) ? next : photos.eq(0));
			photo.fadeOut(animTime);
			next.fadeIn(animTime, function(){
				photo.removeClass();
				next.addClass('active');
			});
			
			clearTimeout(nextImageTimer);
			nextImageTimer = setTimeout(function(){
				bm.nextImage();
			}, nextImageDelay);
		}
	};
	
	bm.loadImage = function(image){
		var nextImg = image.next();
		image.lazyload({
			callback : function(){
				image.removeClass('loading');
				if(nextImg.length){
					bm.loadImage(nextImg);
				}
			}
		});
	};
	
	bm.setFooter = function(){
		if($(window).height() > data.siteHeight){
			cache.footer.addClass('fixed');
		}
		else{
			cache.footer.removeClass();
		}
	};
	
	bm.cleanup = function(){
		var secondPhoto = cache.photos.eq(1);
		
		nextImageTimer = setTimeout(function(){
			bm.nextImage();
		}, nextImageDelay - animTime);

		secondPhoto.parent().bind('click.nextPhoto', function(){
			bm.nextImage();
		});
		
		$(window).bind({
			'load' : function(){
				bm.loadImage(secondPhoto);
			},
			'resize' : function(){
				bm.setFooter();
			}
		});
		
		bm.setFooter();
	};
	
	bm.init = function(){
		cache.photos = $('div.screenshots').find('img');
		cache.footer = $('footer');
		data.siteHeight = $('body').outerHeight();

		bm.cleanup();
	};
	
	bm.init();
}(window));






