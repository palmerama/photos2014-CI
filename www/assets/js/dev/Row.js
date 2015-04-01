(function(){

	var namespace = MAIN.namespace('MAIN.app');

	if (namespace.Row === undefined)
	{
		namespace.Row = function()
		{

		}

		var p = namespace.Row.prototype;


		p.init = function(data, template)
		{
			console.log("Row > initialised.", data);

			this.data = data;
			this.photos = [];
			this.htmlTemplate = template;

			this.createHTML();
			this.populate();
		}

		p.createHTML = function()
		{
			for (var i=0; i<this.data.length; ++i)
			{
				var html = $(this.htmlTemplate).clone()[0];
				$("#gallery").append($(html));
				this.photos.push( { $html: $(html) } );
			}
		}

		p.populate = function()
		{
			this.loadImages();
		}

		p.loadImages = function()
		{
			var url;
			this.imagesLoaded = 0;

			for (var i=0; i<this.photos.length; ++i)
			{
				url = window.baseUrl +'assets/img/photos/' + this.data[i].file;

				// set css
				this.photos[i].$html.css("backgroundImage", 'url("'+ url + '")');

				// load img
				this.photos[i].img = new Image();
				this.photos[i].img.src = url;
				this.photos[i].img.onload = this.onImageLoaded.bind(this);
			}
		}

		p.onImageLoaded = function()
		{
			++this.imagesLoaded;
			if (this.imagesLoaded == this.photos.length) this.onResize();
		}

		p.setSizes = function()
		{
			this.setWidths();
			this.setHeights();
		}

		p.setWidths = function()
		{
			this.fullWidth = 0;

			for (var i=0; i<this.photos.length; ++i)
			{
				// set aspect
				if (this.photos[i].img.height > this.photos[i].img.width) this.photos[i].aspect = "portrait";
				else this.photos[i].aspect = "landscape";

				this.fullWidth += this.photos[i].img.width;
			}

			for (var i=0; i<this.photos.length; ++i)
			{
				// set width
				var perc = this.photos[i].img.width/this.fullWidth;
				var pixels = (window.innerWidth * perc) - 2;
				this.photos[i].$html.css("width", pixels + "px");

				// fade in
				TweenMax.to(this.photos[i].$html, .3, {alpha:1, ease:Circ.easeIn});
			}
		}

		p.setHeights = function()
		{
			var averageHeight = 0;
			for (var i=0; i<this.photos.length; ++i)
			{
				var ratio = this.photos[i].$html.width() / this.photos[i].img.width;
				averageHeight += this.photos[i].img.height * ratio;
			}
			averageHeight /= this.photos.length;
			averageHeight -= 2;

			// set heights
			for (var i=0; i<this.photos.length; ++i)
			{
				this.photos[i].$html.css("height", averageHeight + "px");
			}
		}

		p.onResize = function()
		{
			this.setSizes();
		}
	}
})();