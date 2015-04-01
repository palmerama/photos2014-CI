/**
 * Created by jamiewhite on 17/03/2014.
 */
(function(){

	var namespace = MAIN.namespace('MAIN.app');

	if (namespace.CanvasUploader === undefined)
	{

		namespace.CanvasUploader = function()
		{

		}

		var p = namespace.CanvasUploader.prototype;
		p.uploader = null;
		p.initialied = false;

		p.init = function()
		{
			console.log(this + " initialising.");
			this.initUploader();

			window.CanvasUploader = this;
		}

		p.initUploader = function() {
			if(!this.initialised) {
				this.uploader = new plupload.Uploader({

					runtimes : 'html5, html4',
					browse_button :  document.getElementById('fake-upload'), // you can pass in id...
					container: document.getElementById('final-image-uploader'),

					url : window.baseUrl+'upload/html5',
					unique_names : true,
					multi_selection:false,

					multipart_params : {
						final : "true"
					},

					init : {

						BeforeUpload: function() {
							console.log("BeforeUpload !!!");
						},

						PostInit: function(r) {
							console.log(this + " initialised.");
						}.bind(this),

						FilesAdded: function() {
							console.log("file added.");
							this.uploader.start();
						}.bind(this),

						UploadProgress: function(up, file) {

						},

						Error: function(up, err) {
							console.log("Upload error.");
						},

						FileUploaded: function(up, file, info) {
							console.log("Final image uploaded to server.");

							try {
								var response = JSON.parse(info.response);
								$(this).trigger("IMAGE_UPLOADED", response.result);
							} catch(e) {
								console.log(info);
							}

						}.bind(this)
					}
				});

				this.uploader.init();
				this.initialised = true;
			}
		}

		p.uploadImageFromCanvas = function(canvas, quality, params)
		{
			// http://web.archive.org/web/20120830003356/http://www.bytestrom.eu/blog/2009/1120a_jpeg_encoder_for_javascript
			var ctx = canvas.getContext('2d');
			var encoder = new JPEGEncoder(quality);

			console.log(ctx);
			console.log(canvas.width, canvas.height);

			var imgData = encoder.encode(ctx.getImageData(0,0,canvas.width, canvas.height));


			if(window.FileReader && window.File) {

				var file = new o.File(null, imgData);
				file.name = "canvas.jpg"; // you need to give it a name here (required)
				console.log(this + " >> uploading final image...");

				this.uploader.settings.multipart_params.upload_params = encodeURI(JSON.stringify(params));
				//this.uploader.settings.multipart_params.mobile = $.browser.mobile;
				this.uploader.addFile(file);
			} else {
				//alert("ie upload");
				this.uploadIE(imgData, encodeURI(JSON.stringify(params)));
			}

		}

		p.uploadIE = function(imgData, params) {

			console.log("params", params);

			$("#ieUploader").remove();
			var ifrm = document.createElement("IFRAME");
			ifrm.setAttribute("id", "ieUploader");
			ifrm.setAttribute("src", window.baseUrl+"upload/html4?upload_params="+params);
			$("body").append($(ifrm));

			uploadingToIFrame = true;

			ifrm.onload = function() {

				if(!uploadingToIFrame) return;

				var data = imgData;
				var dataLen = data.length;
				var chunkSize = 10000;
				var idx = 0;

				function sendChunks() {

					if(idx+chunkSize > dataLen) {
						chunkSize = dataLen - idx;
					}
					var nextChunk = data.substr(idx, chunkSize);

					ifrm.contentWindow.addChunk(nextChunk);

					idx += chunkSize;
					if(idx >= dataLen) {
						uploadingToIFrame = false;
						ifrm.contentWindow.transferComplete();
					} else {
						sendChunks();
					}
				}

				sendChunks();
			};
		}

		p.uploadComplete = function(url) {
			$("#ieUploader").remove();
			$(this).trigger("IMAGE_UPLOADED", url);
		}

		p.toString = function() {
			return "CanvasUploader";
		};
	}

})();
