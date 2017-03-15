$(document).ready(function(){

    // 1. Parse Keys
    Parse.initialize("AHtn058xr1AoahfbR9WFKXEcCbX9b0H01TJGTYV4",
        "1CC8AJwh32nY12kv4Gyv5VPLyqyvmNrZFAjUicDQ");

    var $errorSpan = $('#errorSpan');
    var $successSpan = $('#successSpan');
    var $inputEmail = $('#UMHB_email');


    function checkEnter(event) {
    	if(event.keyCode == 13) {
    	event.preventDefault();

		    var email = $inputEmail.val();
		    console.log(email);
		    Parse.User.requestPasswordReset(email, {
			  success: function() {
	            $successSpan.css("display", "block").fadeTo(0, .2);
	            $successSpan.fadeTo(500, 1);
	            $errorSpan.hide();
			  },
			  error: function(error) {
			  	$successSpan.hide();
	            $errorSpan.show().empty();
	            $errorSpan.css("display", "block").fadeTo(0, .2);
	            $errorSpan.text(error.message).fadeTo(500, 1);	            
	            console.log(error.message);
			  }

			});
		} 
    }

    $inputEmail.keydown(checkEnter);

});