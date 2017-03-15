var userNameList = [];


///////////////////////////////////
// Get and append recent post
function appendRecentPost() {
	var $postSpan = $('#postSpan');
	var query = new Parse.Query(HangoutData);
	query.containedIn("HostData", following);
	query.descending("createdAt");
	query.skip(displayedPostCounter);
	query.limit(searchFor);
	query.include("Hangout");
	query.include("HostData");
	query.include("HostModData");
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
			var hangout = results[i];
			renderHangout(hangout);
	    }
		renderMorePostDiv();
		addImageLinkPopups();
	    displayedPostCounter += results.length;
	    if (results.length < searchFor) {
	    	$('#morePost').children('p').html('No more post to show!');
	    }
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    console.log("Error showing post: " + error.code + " " + error.message);
	  }
	});
}

function runMainFunction() {
	appendRecentPost();
}

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
 
    cb(matches);
  };
};

function searchFollowSuccess(username) {
	hideOverlay();
	$(".searchInput").css("border-color", "green").fadeTo(0, .1);
	$(".searchInput").fadeTo(500, 1);
	$(".tt-input").attr("placeholder", username).focus().blur().val("");
	successOverlay("Following");
}

function searchFollowFailure() {
	hideOverlay();
	$(".searchInput").css("border-color", "red").fadeTo(0, .1);
	$(".searchInput").fadeTo(500, 1);
	errorOverlay("Not found");
}

function followHostByName(username) {
	loadingSpinner();
	var query = new Parse.Query(UserModData);
	query.equalTo("username", username);
	query.first({ // Search for the user by username
		success: function(userToFollow) {
			if (userToFollow != null) {
				var query = currentUser.get("Data").relation("following").query();
				query.equalTo("userModData", userToFollow);
				query.first({ //Check if already following the user
				  success: function(alreadyFollowedUser) {
				  	if (alreadyFollowedUser == null) {
			    		var query = new Parse.Query(UserData);
						query.equalTo("userModData", userToFollow);
						query.first({ //Get UserData if no already following
							success: function(hostData) {
								if (hostData != null && username !== "" && hostData.get("username") !== currentUser.attributes.username) {
									Parse.Cloud.run('followHost', { hostDataId: hostData.id }, { 
							        	success: function(isNowFollowing) {
							        		if (!isNowFollowing) 
												Parse.Cloud.run('followHost', { hostDataId: hostData.id },{});
											searchFollowSuccess(username);
							        	},
							        	error: function(error) {
							        		console.log("Failed to save user: ", error);
							        	}
							        });					
								}
								else {
									searchFollowFailure();
								}
							},
							error: function(error) {
								searchFollowFailure();
								console.log("Failed to query HostData: ", error)
							}
						});
				  	}
					else {
						searchFollowSuccess(username);
						console.log("Already following.");
					}
				  },
				  erorr: function(error) {
				  	searchFollowFailure();
				    console.log("Failed to fetch user: ", error);
				  }
				});
			}
			else {
				searchFollowFailure();
				console.log("User could not be found by that username");
			}
		},
		error: function(error) {
			searchFollowFailure();
			console.log("Failed to search for the user to follow: ", error);
		}
	})
				
} 

function checkEnter(e) {
	if (e.keyCode == 13) {
		var username = $(this).typeahead('val');
		followHostByName(username);
	}
	$(".searchInput").css("border-color", "#ccc");
}

function suggestionClick() {
	followHostByName($(this).context.outerText);
}

function getAllUsernames() {
	Parse.Cloud.run('getUsernames', { startPoint: userNameList.length }, {
	  success: function(userNames) {
	  	userNameList = userNameList.concat(userNames);
	  	if (userNames.length === 1000)
	  		getAllUsernames();
	  	else 
	  		setTypeahead();
	  },
	  error: function(error) { }
	});	
}

function setTypeahead() {
	$(".searchInput").typeahead({
		hint: true,
		highlight: true
	},{
		name: "userNameList",
		source: substringMatcher(userNameList)
	});
}

$(document).ready(function(){

	///////////////////////////////////
	// Get more post
	$('#morePost').click(appendRecentPost);
	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") appendRecentPost(); }, 3000);

	//Prepare typeahead with usernames
	getAllUsernames();

	$(".searchInput").keydown(checkEnter);
	$("#page").delegate(".tt-suggestion", "click", suggestionClick);

});