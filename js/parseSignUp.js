$(document).ready(function(){

    // 1. Parse Keys
    Parse.initialize("AHtn058xr1AoahfbR9WFKXEcCbX9b0H01TJGTYV4",
        "1CC8AJwh32nY12kv4Gyv5VPLyqyvmNrZFAjUicDQ");

    var $username = $('#username');
    var $email = $('#UMHB_email');
    var $password = $('#password');
    var $confirmPassword = $("#confirm_password");
    var $createUser = $('#createUser'); 
    var $errorSpan = $('#errorSpan');
    var $successSpan = $('#successSpan');

    ///////////////////////////////////////
    // Make sure the email is longer than seven characters and matches the 'confirmPassword'
    // Make sure the email is a UMHB email

    function ValidateUsername() {
      var username = $username.val();
      return(username.match(/^[A-Za-z0-9_ ]{5,20}$/) !== null); //Includes only letters, numbers and spaces
    }

    function ValidateEmail() {
      var email = $email.val();
      return(email.match(/^\S+@{1}\S+\.edu$/) !== null); 
    }

    function isPasswordValid() {
      return $password.val().length > 7;
    }

    function arePasswordsMatching() {
      return $password.val() === $confirmPassword.val();
    }

    function canSubmit() {
      return isPasswordValid() && arePasswordsMatching() && ValidateEmail() && ValidateUsername();
    }

    function usernameEvent(){
        //Find out if password is valid  
        if(ValidateUsername()) {
          //Hide hint if valid
          $username.next().hide();
          //Remove warning class
          $username.removeClass("warning");
        } else {
          //else show hint
          $username.next().css("display", "block");
          //Add warning class
          $username.addClass("warning");
        }
    }

    function passwordEvent(){
        //Find out if password is valid  
        if(isPasswordValid()) {
          //Hide hint if valid
          $password.next().hide();
          //Remove warning class
          $password.removeClass("warning");
        } else {
          //else show hint
          $password.next().css("display", "block");
          //Add warning class
          $password.addClass("warning");
        }
    }

    function confirmPasswordEvent() {
      //Find out if password and confirmation match
      if(arePasswordsMatching()) {
        //Hide hint if match
        $confirmPassword.next().hide();
        //Remove warning class
        $confirmPassword.removeClass("warning");
      } else {
        //else show hint 
        $confirmPassword.next().css("display", "block");
        //Add warning class
        $confirmPassword.addClass("warning");
      }
    }

    function emailEvent(){
        //Find out if password is valid  
        if(ValidateEmail()) {
          //Hide hint if valid
          $email.next().hide();
          //Remove warning class
          $email.removeClass("warning");
        } else {
          //else show hint
          $email.next().css("display", "block");
          //Add warning class
          $email.addClass("warning");
        }
    }

    function enableSubmitEvent() {
      //Toggle Terms and Conditions notice
      if (canSubmit()) { $('#tac').show(); }
        else { $('#tac').hide(); }
      //Toggle SignUp button
      $createUser.prop("disabled", !canSubmit());
    }

    //When event happens on username input
    $username.focus(usernameEvent).keyup(usernameEvent).keyup(enableSubmitEvent);

    //When event happens on email input
    $email.focus(emailEvent).keyup(emailEvent).keyup(enableSubmitEvent);

    //When event happens on password input
    $password.focus(passwordEvent).keyup(emailEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

    //When event happens on confirmation input
    $confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);


    //////////////////////////////////////////////////
    //Create Account
    $createUser.click( function() {
        var user = new Parse.User();
        user.set('username', $username.val().trim());
        user.set('password', $password.val());
        user.set('email', $email.val().trim());

        function scrollToMessage() {
            $('html, body').animate({
                scrollTop: $("form").offset().top
            }, 200);
        }

        // 5. Sign them up!
        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            console.log("User signed up.");
            $errorSpan.hide();
            $successSpan.css("display", "block");
            scrollToMessage();
            $('#tac').hide(); // Hide Terms and Conditions notice
            $createUser.prop("disabled", true); //Hide submit button
            Parse.Cloud.run('createUserData', { }, {
              success: function() {
                console.log("User Data Created");
              },
              error: function(error) {
                console.log(error);
              }
            });
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            $successSpan.hide();
            $errorSpan.show().empty();
            $errorSpan.css("display", "block").text(error.message);
            console.log(error.message);
            scrollToMessage();
          }
        });
    });
});
