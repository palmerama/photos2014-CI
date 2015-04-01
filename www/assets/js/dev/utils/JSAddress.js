/*
(Note: Requires JQuery.)

Setup JSAddress:

jsAddress = new MAIN.namespace('MAIN.app.utils').JSAddress();
$(jsAddress.listener).bind("URL_UPDATE", this.onURLUpdate.bind(this));
jsAddress.listen();


p.onURLUpdate = function(e, data) {
	
	console.log("url: " + data.path + " / length: " + data.path.length);

	this.currentPath = data.path;
	this.nav.selectByName("rooms");

	if(data.path.length > 0) {

		if(data.path[0] === "feedback") {
			this.zoomImage.hide(true);
			this.nav.selectByName("feedback");
			this.pageManager.switchPage("feedback", data.path);

		} else if((data.path.length < 3 && (data.path[1] === "about" || data.path[1] === "objects")) || data.path.length === 1) {
			this.zoomImage.hide(true);
			this.pageManager.switchPage("room", data.path);

		} else if(data.path.length < 4) {
			this.pageManager.switchPage("object", data.path, this.zoomImage);

		} else {
			this.zoomImage.showImage(RHYTHM.Utils.replaceSomethingWithIn("%", "\/", data.path[3]), this.prevLocation);

		}

	} else {
		this.pageManager.switchPage("menu", null);
	}

	this.updateBackButtonState(true);
	this.prevLocation = location;
	$(window).resize(null);
};




To trigger an update, call something like:

location = "#/whatever/you/want";
*/

(function(){

    var namespace = MAIN.namespace('MAIN.utils');


    if (namespace.JSAddress === undefined) 
	{
        namespace.JSAddress = function()
		{

		}

		var p = namespace.JSAddress.prototype;

		p.init = function() {
			this.listener = this;
			this.currentPath = '';
			this.urlChangedBound = this.urlChanged.bind(this);
		}


		p.urlChanged = function() 
		{
			//console.log('JSAddress: URL CHANGED: ' + location.hash);
			var idx = location.hash.indexOf("#/");
			idx = (idx == -1 ? location.hash.indexOf("#") : idx);

			if(location.hash.indexOf("#") == -1) this.gotoRoot();

			var pathString = String(location.hash.substr(idx+1,location.hash.length)).toLowerCase();
			if(pathString == "/") pathString = ""; // force index.
			var path = pathString.split("/");
			var i = 0;

			// if (this.currentPath === pathString) {
			// 	return; // return if url is the same
			// }

			for(i; i < path.length; ++i) {
				if(path[i].length === 0) {
					path.splice(i,1);
				}
			}

			this.currentPath = pathString;
			this.currentPathArray = path;
			this.callback({path:path});
		}

		p.gotoRoot = function() {
			location = "#/";
		}

		p.listen = function(callback)
		{
			this.callback = callback;
			$(window).hashchange(this.urlChangedBound);
			this.urlChanged();
		}

		p.back = function(levelsUp)
		{
			levelsUp = levelsUp || 1;

			// move up prev path
			//console.log(this.currentPathArray);

			if(this.currentPathArray.length >= levelsUp) {
				this.currentPathArray.splice(this.currentPathArray.length-levelsUp, levelsUp);
				location = "#/"+this.currentPathArray.join("/");
			} else {
				//this.gotoRoot();
			}
		}

	}

})();