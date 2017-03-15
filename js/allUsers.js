	
	// Parse Keys
    Parse.initialize("AHtn058xr1AoahfbR9WFKXEcCbX9b0H01TJGTYV4",
        "1CC8AJwh32nY12kv4Gyv5VPLyqyvmNrZFAjUicDQ");

	//Global variables needed
	var Hangout = Parse.Object.extend("Hangout");
	var HangoutData = Parse.Object.extend("HangoutData");
	var User = Parse.Object.extend("User");
	var UserData = Parse.Object.extend("UserData");
	var UserModData = Parse.Object.extend("UserModData");
	var ReportedPost = Parse.Object.extend("ReportedPost");
	var SuspendedPost = Parse.Object.extend("SuspendedPost");
	var Announcement = Parse.Object.extend("Announcement");	
	var Notification = Parse.Object.extend("Notification");	
	var username;
	var currentUser = Parse.User.current();
	var searchFor = 100;
	var userSearchFor = 100;
	var joinedPost = [];
	var following = [];
	var displayedPostCounter = 0;
	var defaultUserIconPath = "../img/userIcon.png";
	var notiNewCount = 0;

function checkForUser() {
	if (Parse.User.current()) {
		var query = new Parse.Query(User);
		query.equalTo("objectId", Parse.User.current().id);
		query.include("Data");
		query.include("modData");
		query.first({
			success: function(user) {
				//Avoid null error
				currentUser = user;
				if (currentUser) {
					emailVerified = currentUser.attributes.emailVerified;
				} else {
					emailVerified = false;
				}
				if (currentUser && emailVerified) {
					    //Put current user's name into the header
						username = currentUser.attributes.username;
						var emailVerified = currentUser.attributes.emailVerified;
						$('#userHello').text("Hello " + username + "!");
						getRelations();
						getAnnouncements();
						checkNotifications();
				} else {
					console.log("User is not logged in or their email is not verified.")
				    window.location.href = "http://uhangouts.parseapp.com/index.html";
				}
			},
			error: function(error) {
				console.log('Error checking for current user. ', error); //Needs to sign in again
				window.location.href = "http://uhangouts.parseapp.com/index.html";
			}	
		});
	} else {
		window.location.href = "http://uhangouts.parseapp.com/index.html";
	}
}

// Sign Out
function signOut() {
	Parse.User.logOut();
	console.log("User logged out.");
	checkForUser();
}

//////////////////////////////////
//Account data fixers
function createUserData() {
    Parse.Cloud.run('createUserData', { }, {
      success: function() {
        getAndSetDomain();
      },
      error: function(error) {
      	basicErrorPopup("Error", "Something is wrong with your account :(  Please contact uHangouts with the following message:" +
      		"My account data failed to auto-create. Error: " + error.message );
      }
    });	  	
}

function getAndSetDomain() {
    Parse.Cloud.run('getAndSetDomain', { }, {
      success: function() {
        createUserModeData();
      },
      error: function(error) {
      	basicErrorPopup("Error", "Something is wrong with your account :(  Please contact uHangouts with the following message:" +
      		"My account university domain failed to auto-set. Error: " + error.message );
      }
    });	  
} 

function createUserModeData() {
    Parse.Cloud.run('createUserModeData', { }, {
      success: function() {
        checkForUser();
      },
      error: function(error) {
      	basicErrorPopup("Error", "Something is wrong with your account :(  Please contact uHangouts with the following message:" +
      		"My account modifiable data failed to auto-set. Error: " + error.message );
      }
    });	  
} 

///////////////////////////////////
//Universal functions

function closePopup() {
	$.magnificPopup.close();
}

function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function basicErrorPopup(title, message) {
	swal({   
		title: title,   
		text: message,   
		type: "error",   
		confirmButtonText: "Okay",
		allowOutsideClick: true 
	});
}

function basicSuccessPopup(title, message) {
	swal({   
		title: title,   
		text: message,   
		type: "success",   
		confirmButtonText: "Okay", 
		allowOutsideClick: true 
	});
}

function basicOopsPopup() {
	swal({   
		title: "Oops!",   
		text: "Something went wrong!",   
		type: "error",   
		confirmButtonText: "Okay", 
		allowOutsideClick: true 
	});
}

function basicMessagePopup(message) {

}

//Function protoypes for pages without a definition
function runMainFunction() {}
function loadingSpinner() {}
function hideOverlay() {}
function successOverlay() {}
function errorOverlay() {}

//Get relations before starting main functions
function getRelations() {
	var relation = currentUser.get("Data").relation("following");
	relation.query().find({
		success: function(list) {
			following = list;
			var relation = currentUser.get("Data").relation("joinedHangouts");
			relation.query().find({
			  success: function(list) {
			    joinedPost = list;
			    runMainFunction();
			  },
			  error: function(error) {
			  	console.log("Error getting 'joined' relations: ", error);
			  }
			});			
		},
		error: function(error) {
		  	console.log("Error getting 'following' relations: ", error);			
		}
	});
}

function getAnnouncements() {
	var query = new Parse.Query(Announcement);
	query.descending("createdAt");
	query.find({
	  success: function(results) {
	  	$("#announcements").empty();
	    for (var i = 0; i < results.length; i++) { 
	      var announcement = results[i];
	      renderAnnouncement(announcement); 
	    }
	  },
	  error: function(error) { }
	});
}

function checkNotifications() {
	var query = new Parse.Query(Notification);
	query.equalTo('userIdLink', currentUser.id);
	query.find({
		success: function(notificationList) {
			notificationList.forEach(function(notification){
				if (!notification.get('viewed')) notiNewCount++;
			});
			if (notiNewCount > 0) {
				$('#bellIcon').css("color", "#ffca38");
				window.setTimeout(function(){ bobbleElement('#notification', 6, 25); }, 3000); 
			}
			// renderNotifications(notificationList);
		},
		error: function(error) {
			console.log("Failed to get notifications.", error);
		}
	});
}

function checkFollowingList(userDataId) {
	var followingHost = false;
	for (i = 0; i < following.length; i++) {
		if (following[i].id === userDataId) {
			followingHost = true;
			break;
		}
	}
	return followingHost;
}

var img;
function preloadBigImage() { //Not being used because of venobox
	var imgElement = $(this);
	var bigImageUrl = imgElement.attr("data");
	if (imgElement.attr("href") === bigImageUrl)
		return 0;
	else {
		img = new Image();
		img.src = bigImageUrl;
		img.onload = function() {
			imgElement.attr("href", bigImageUrl);
			var popupImage = $(document).find(".mfp-wrap .mfp-img");
			var smallHeight = popupImage[0].clientHeight;
			popupImage.attr("src", bigImageUrl).css("height", smallHeight);
			if (img.width > $("#page").width()) {
				var ratio = img.width / img.height;
				var height = $("#page").width() / ratio;
				popupImage.animate({ height: height }, 750);			
			}
			else {
				popupImage.animate({ height: img.height }, 750);
			}
			// var maxHeight = parseInt(popupImage.css("max-height").replace(/\D+/, ""));
			// imgElement.find("img").attr("src", bigImageUrl);  
		}
	}
}

function addImageLinkPopups() {
	// $('.image-popup-no-margins').magnificPopup({
	// 	type: 'image',
	// 	closeOnContentClick: true,
	// 	closeBtnInside: false,
	// 	fixedContentPos: true,
	// 	mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
	// 	image: {
	// 		verticalFit: true
	// 	},
	// 	zoom: {
	// 		enabled: true,
	// 		duration: 300 // don't foget to change the duration also in CSS
	// 	}
	// });
	// $('.image-popup-no-margins').click(preloadBigImage);

	/* default settings */
    $('.hangoutPhoto').venobox(); 


    /* custom settings */
    // $('.image-popup-no-margins').venobox({
        // framewidth: '400px',        // default: ''
        // frameheight: '700px',       // default: ''
        // border: '10px',             // default: '0'
        // bgcolor: '#5dff5e',         // default: '#fff'
        // titleattr: 'data-title',    // default: 'title'
        // numeratio: true,            // default: false
        // infinigall: true            // default: false
    // });
}


$(document).ready(function(){

	//Call this function on load
	checkForUser(); 

    //Universal close Popup function
	$(document).delegate('#closePopup', 'click', closePopup);

	//Sweet aleart
	swal.setDefaults({ 
		confirmButtonColor: '#5A3584' 
	});

});