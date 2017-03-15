$(document).ready(function(){

    // Parse Keys
    Parse.initialize("AHtn058xr1AoahfbR9WFKXEcCbX9b0H01TJGTYV4",
        "1CC8AJwh32nY12kv4Gyv5VPLyqyvmNrZFAjUicDQ"); 

    var $errorSpan = $('#errorSpan');
    var $inputUsername = $('#inputUsername');
    var $inputPassword = $('#inputPassword');
    var $signInButton = $('#signInButton');
    var $errorSignOut = $('#errorSignOut');

    ///////////////////////////////////
    //Index page, direct user to proper page
    function checkForUser() {
        var currentUser = Parse.User.current();
        if (currentUser) {
            emailVerified = currentUser.attributes.emailVerified;
        } 
        else {
            emailVerified = false;
        }

        if (currentUser && emailVerified) {
            var query = new Parse.Query(Parse.User);
            query.equalTo("objectId", currentUser.id);
            query.first({
                success: function() {
                    window.location.href = "http://uhangouts.parseapp.com/html/home.html";
                },
                error: function() {
                    console.log("Needs to sign in again.");
                    Parse.User.logOut();
                }
            });
        } 
        else if (currentUser) {
            $errorSpan.text("You must verify your email first, check your spam. If you entered the wrong email on sign up then sign out and make another account.").css("display", "block");
            $errorSignOut.css("display", "block"); /////////////////////////// Delete User as well? 
        } else {}        
    }    
    checkForUser();
    
    function signOut() {
        Parse.User.logOut();
        console.log("User logged out.");
        window.location.href = "http://uhangouts.parseapp.com/html/signUp.html";
    }

    ///////////////////////////////////
    // Log user in when signIn button or enter key is pressed
    function signInUser() {
    	var username = $inputUsername.val();
    	var pwd = $inputPassword.val();

		Parse.User.logIn(username, pwd, {
		  success: function(user) {
            $errorSpan.hide();
            window.location.href = "http://uhangouts.parseapp.com/html/home.html";
		  },
		  error: function(user, error) {
            $errorSpan.css("display", "block").fadeTo(0, .2);
            $errorSpan.text("Invalid username or password").fadeTo(500, 1);
		  }
		});
    }

    function checkEnter(event) {
    	if(event.keyCode == 13) {
		    signInUser();
		} 
    }

    ///////////////////////////////////
    //Sign in form, submit when the button is clicked or enter is pressed
    $signInButton.click(signInUser);
    $inputPassword.keydown(checkEnter);
    $inputUsername.keydown(checkEnter);

    ///////////////////////////////////
    //Error sign out
    $errorSignOut.click(signOut);
    




});