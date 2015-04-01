(function(){

	var namespace = MAIN.namespace('MAIN.app');
	var utils = MAIN.namespace('MAIN.utils');

	if (namespace.GoogleGeocode === undefined)
	{
		namespace.GoogleGeocode = function()
		{

		}

		var p = namespace.GoogleGeocode.prototype;

		p.init = function()
		{
			console.log("GoogleGeocode init");
			this.geocoder = new google.maps.Geocoder();
			this.onResultBound = this.onResult.bind(this);
		};

		p.getLatLong = function(postcode) {
			//https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
			this.geocoder.geocode( { 'address': postcode}, this.onResultBound);
		}

		p.onResult = function(result) {
			$(this).trigger("RESULT", result);
		}
	}

})();