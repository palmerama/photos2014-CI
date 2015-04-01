(function(){

	var namespace = MAIN.namespace('MAIN.app');

	if (namespace.AdminManager === undefined)
	{
		namespace.AdminManager = function()
		{

		}

		var p = namespace.AdminManager.prototype;

		p.init = function()
		{
			console.log("AdminManager > initialised.");
			this.initResize();

			this.bar = $('.bar');
			this.percent = $('.percent');
			this.status = $('#status');

			$('#upload_form').ajaxForm(this);
		}

		p.beforeSend = function()
		{
			this.status.empty();
			var percentVal = '0%';
			this.bar.width(percentVal)
			this.percent.html(percentVal);
		}

		p.uploadProgress = function(event, position, total, percentComplete)
		{
			var percentVal = percentComplete + '%';
			this.bar.width(percentVal)
			this.percent.html(percentVal);
		}

		p.complete = function(xhr)
		{
			this.status.html(xhr.responseText);
		}

		p.initResize = function()
		{
			$(window).on("resize", this.onResize.bind(this));
			this.onResize(null);
		}

		p.onResize = function(e)
		{
			//
		}
	}

})();