(function(){

	var namespace = MAIN.namespace('MAIN.app');


	if (namespace.HTML5Tools === undefined)
	{
		namespace.HTML5Tools = function()
		{
		}

		var p = namespace.HTML5Tools.prototype;


		p.init = function()
		{

		};

		p.preventScroll = function()
		{
			$(document).on('touchmove','.scrollable',function(e) {
				if ($(this).hasClass('scrollable')) {
					if($(this)[0].scrollHeight > $(window).height()) {
						e.stopPropagation();
					}
				}
			}).on('touchmove',function(e) {
				e.preventDefault();
			});
		}
	}

})();