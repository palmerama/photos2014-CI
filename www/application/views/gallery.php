<!doctype html>

<html lang="en">
<head>
	<meta charset="utf-8">

	<title><?php echo SITE_TITLE; ?></title>
	<meta name="description" content="">
	<meta name="author" content="">

	<link rel="stylesheet" href="assets/css/reset.css?v<?php echo SCRIPT_VERSION; ?>">
	<link rel="stylesheet" href="assets/css/fonts.css?v<?php echo SCRIPT_VERSION; ?>">
	<link rel="stylesheet" href="assets/css/main.css?v<?php echo SCRIPT_VERSION; ?>">

	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<script>
		window.baseUrl = "<?php echo base_url(); ?>";
	</script>
</head>

<body>

	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js"></script>
	<script src="http://code.createjs.com/preloadjs-0.4.1.min.js"></script>
	<script src="http://code.createjs.com/easeljs-0.7.1.min.js"></script>
	<?php

	if(ENVIRONMENT == "production"):

	// Production JS here...
	$scripts = array();

	else:

	//--------------------------
	// Development JS here...
	$scripts = array(
		"dev/Main.js",
		"dev/AppManager.js",
		"dev/Gallery.js",
		"dev/Row.js"
	);

	endif;

	importJS($scripts, '?v='.SCRIPT_VERSION);

	?>
	<script>
		$(function(){
			var namespace = MAIN.namespace('MAIN.app');
			var app = new namespace.AppManager();
			app.init();
		});
	</script>

	<div id="wrapper">
		<div id="gallery"></div>
	</div>

	<div class="photo"></div>

</body>
</html>