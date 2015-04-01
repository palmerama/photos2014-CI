var RHYTHM = RHYTHM || {};
RHYTHM.Utils = RHYTHM.Utils || {};

RHYTHM.Utils.Tools = (function(){

	return {
		getParameterByName: function(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(window.location.search);

			if(results == null)
				return "";
			else
				return decodeURIComponent(results[1].replace(/\+/g, " "));
		},

		getCoords: function(e) {

			var x = e.clientX || e.pageX;
			var y = e.clientY || e.pageY;

			if(e.changedTouches) {
				x = (e.changedTouches[0].clientX || e.changedTouches[0].pageX);
				y = (e.changedTouches[0].clientY || e.changedTouches[0].pageY);
			}
			
			newX = x;
			newY = y;

			return {x:newX, y:newY, event:e};
		},

		mapRange: function(x, in_min, in_max, out_min, out_max)
        {
          return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        },

        getPercentageAtValueBetween: function(min, max, value)
        {
            return (value-min)/(max - min);
        },

		cloneArrayOfPoints: function(arrayIn) {
			var arrayOut = [];

			for(var i = 0; i < arrayIn.length; ++i) {
				arrayOut.push({
					x:arrayIn[i].x,
					y:arrayIn[i].y
				})
			}

			return arrayOut;
		},

		cloneArray: function(arrayIn) {
			var arrayOut = [];

			for(var i = 0; i < arrayIn.length; ++i) {
				arrayOut.push(arrayIn[i]);
			}

			return arrayOut;
		},

		randomHexColour: function() {
			return "#"+parseInt(Math.random()*0xffffff).toString(16);
		},

		getImageDataPixel: function(imageData, imageWidth, x,y) {

			x = x>>0;
			y = y>>0;

			var red = imageData.data[((imageWidth * y) + x) * 4];
			var green = imageData.data[((imageWidth * y) + x) * 4 + 1];
			var blue = imageData.data[((imageWidth * y) + x) * 4 + 2];
			var alpha = imageData.data[((imageWidth * y) + x) * 4 + 3];

			//console.log(x,y,red,alpha, imageData.data.length);


			return {r:red, g:green, b:blue, a:alpha};
		}
	}

})();