/*-------------------------------------------------------------------------------------------------
If a retina @2x version of an image is available, append ?@2x to the image path

Example:

	<img id='main-logo' src='/images/wcc-logo-375-37-punchier.png?@2x'>
	
Note: Must use CSS width / height on the image
-------------------------------------------------------------------------------------------------*/

if (window.devicePixelRatio > 1) {

	$('img').each(function(i) {
			
	    var lowres = $(this).attr('src');
		
		if(lowres.indexOf('@2x') > 1) {
		
			var ext     = lowres.substr(lowres.lastIndexOf('.'));	
			var highres = lowres.replace(ext, '@2x.png');
			
			$(this).attr('src',highres);
	    }

	});
	    	   
}

