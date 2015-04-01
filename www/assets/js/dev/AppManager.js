(function(){

	var namespace = MAIN.namespace('MAIN.app');

	if (namespace.AppManager === undefined)
	{
		namespace.AppManager = function()
		{

		}

		var p = namespace.AppManager.prototype;

		p.init = function()
		{
			console.log("AppManager > initialised.");

			this.initGallery();
			this.initResize();
		}

		p.initGallery = function()
		{
			this.gallery = new namespace.Gallery();
			this.gallery.init();
		}

		p.initResize = function()
		{
			$(window).on("resize", this.onResize.bind(this));
			this.onResize(null);
		}


		// RESIZE
		p.onResize = function(e)
		{
			this.gallery.onResize();
		}
	}

})();