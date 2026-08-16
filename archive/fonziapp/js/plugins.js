
// usage: log('inside coolFunc', this, arguments);
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
      arguments.callee = arguments.callee.caller;
      console.log( Array.prototype.slice.call(arguments) );
  }
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});

/*
	lazy load dynamically loads image from title.
*/
(function($){
	$.fn.lazyload = function(options){
		var settings = {
			callback: function(){}
		};
		if(options) {
            $.extend(settings, options);
        }
		return this.each(function(){
			var self = this;
			if(!self.loaded){
				self.loaded = 1;

				if(self.title){
					$('<img />')
						.bind('load', function() {
							$(self).attr('title', '')
								.attr('src', this.src);
							settings.callback();
						})
						.attr('src', self.title);
				}
			}
		});
	}
}(jQuery));