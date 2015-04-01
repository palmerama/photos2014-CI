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

	<?php echo $error;?>

	<form id="upload_form" action="upload/do_upload" method="post" enctype="multipart/form-data">
		<input type="file" id="myfile" name="myfile"><br>
		<input type="submit" value="Upload File to Server">
	</form>

	<div class="progress">
		<div class="bar"></div >
		<div class="percent">0%</div >
	</div>
	<div id="status">status</div>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js"></script>

	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.13.2/TweenMax.min.js"></script>
	<?php

	if(ENVIRONMENT == "production"):

	// Production JS here...
	$scripts = array();

	else:

	//--------------------------
	// Development JS here...
	$scripts = array(
		"dev/Main.js",
		"dev/admin/AdminManager.js"
	);

	endif;

	importJS($scripts, '?v='.SCRIPT_VERSION);

	?>
	<script>
		$(document).ready(function(){
			var namespace = MAIN.namespace('MAIN.app');
			var app = new namespace.AdminManager();
			app.init();
		});
	</script>

</body>
</html>