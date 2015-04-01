(function(){

	var namespace = MAIN.namespace('MAIN.app');

	if (namespace.Gallery === undefined)
	{
		namespace.Gallery = function()
		{

		}

		var p = namespace.Gallery.prototype;


		p.init = function()
		{
			console.log("Gallery > initialised.");
			this.loadData();
		}

		p.loadData = function()
		{
			$.getJSON(window.baseUrl + "assets/json/photos.json", this.onDataLoaded.bind(this));
		}

		p.onDataLoaded = function(data)
		{
			this.photos = data;
			console.log("photos loaded:", this.photos);
			this.createPhotos();
		}

		p.createPhotos = function()
		{
			this.rows = [];
			this.currentPhoto = 0;
			var photosClone = jQuery.extend(true, [], this.photos.photos);

			// mix up photos
			this.tempPhotos = [];
			while (photosClone.length) this.tempPhotos.push( photosClone.splice(Math.random()*photosClone.length, 1)[0] );

			// set html template
			this.photoTemplate = $(".photo").detach()[0];

			var extraPhotos = window.innerWidth <= 500 ? 1 : 2;

			while (this.tempPhotos.length)
			{
				var howManyPhotos = 1 + Math.round(Math.random()*extraPhotos);
				if (this.currentPhoto + howManyPhotos >= this.photos.photos.length)
					howManyPhotos = this.photos.photos.length - this.currentPhoto;

				var row = new namespace.Row();
				row.init( this.tempPhotos.splice(0, howManyPhotos), this.photoTemplate );
				this.rows.push(row);

				this.currentPhoto += howManyPhotos;
			}

			console.log(this.currentPhoto, this.tempPhotos.length, this.photos.photos.length);
		}

		p.onResize = function()
		{
			for (var i in this.rows)
			{
				this.rows[i].onResize();
			}
		}
	}
})();