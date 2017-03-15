///////////////////////////////////
// Join Hangout
function joinHangoutF(e, hangoutId) {
	// var $postDiv = $("#postSpan").find(e.target.closest(".postDiv"));
	if ($('.mfp-content').find('#' + hangoutId).length > 0)
		$postDiv = $('.mfp-content').find('#' + hangoutId);
	else
		$postDiv = $('#postSpan').find('#' + hangoutId);
	console.log($postDiv);
	var $joinButton = $postDiv.find(e.target);
	var $joinedCount = $postDiv.find('.joinedCount');
	var joinedCount = parseInt($joinedCount.text());

	//Change buttons before cloud function to make the apperance faster
	if ($joinButton.hasClass("joined")){
		$joinButton.removeClass('joined').text("Join");
		$joinedCount.html(joinedCount - 1);
		Parse.Cloud.run('joinHangout', { hangoutId: hangoutId }, {
		  success: function(joiningBoolean) {
		  	//Make corrections if needed
		  	if (joiningBoolean) {
				$joinButton.addClass('joined').text("Joined");
				$joinedCount.html(joinedCount);
			}
		  },
		  error: function(error) {
		    $joinButton.addClass('joined').text("Joined");
			$joinedCount.html(joinedCount);
			basicErrorPopup("Error", "Failed to join the Hangout. The user may have deleted the Hangout or there is a bad connection. Please Refresh and try again.");
		    //Disable buttons
		    $joinButton.attr("disabled", true);
		    $joinButton.prev().attr("disabled", true);
		    console.log('Error running cloud function joinHangout: ', error);
		  }
		});
	} else {
		$joinButton.addClass('joined').text("Joined");
		$joinedCount.html(joinedCount + 1);
		Parse.Cloud.run('joinHangout', { hangoutId: hangoutId }, {
		  success: function(joiningBoolean) {
		  	//Make corrections if needed
		  	if (!joiningBoolean) {
				$joinButton.removeClass('joined').text("Join");
				$joinedCount.html(joinedCount);
			} 
		  },
		  error: function(error) {
		    $joinButton.removeClass('joined').text("Join");
			$joinedCount.html(joinedCount);
			basicErrorPopup("Error", "Failed to join the Hangout. The user may have deleted the Hangout or there is a bad connection. Please Refresh and try again.");
		    //Disable buttons
		    $joinButton.attr("disabled", true);
		    $joinButton.prev().attr("disabled", true);
		    console.log('Error running cloud function joinHangout: ', error);
		  }
		});
	}
}

///////////////////////////////////
// Report Hangout
function reportHangoutF(e, objectId) {
	var $postDiv = $('#postSpan').find('#' + objectId);
	var $liSetlector = $postDiv.find(e.target);
	Parse.Cloud.run('reportHangout', { objectId: objectId }, {
		success: function(reportedBool) {
			if (reportedBool) {
				basicSuccessPopup("Reported", "You have reported this post. Once enough people have reported the post a moderator will check the post content and the Host may be temporarily suspended.");
				var reportHostLi = $("<li/>", {
					"class": "reportHangout",
					text: " Unreport Post",
					click: function(e) { reportHangoutF(e, objectId); }
				});
					icon = $("<i/>", {
						"class": "fa fa-undo fa-fw"
					}).prependTo(reportHostLi);
				$liSetlector.after(reportHostLi);
				$liSetlector.remove();
			} 
			else {
				successOverlay("Unreported");
				var reportHostLi = $("<li/>", {
					"class": "reportHangout",
					text: " Report Post",
					click: function(e) { reportHangoutF(e, objectId); }
				});
					icon = $("<i/>", {
						"class": "fa fa-thumbs-down fa-fw"
					}).prependTo(reportHostLi);
				$liSetlector.after(reportHostLi);
				$liSetlector.remove();
			}
		},
		error: function(error) {
			basicErrorPopup("Oops!", "The Hangout could not be reported at the moment.");
			console.log(error);
		}
	});		
}

///////////////////////////////////
// Show Joined User
									//skip amount is optional
function showJoinedF(e, hangoutDataId, skipAmount) { 
	if (skipAmount == null) skipAmount = 0;
    var query = new Parse.Query(HangoutData);
    query.equalTo("objectId", hangoutDataId);
    query.first({ 
    	success: function(hangoutData) {
    		var query = hangoutData.relation("joinedUsers").query();
    		query.include("userModData");
    		query.skip(skipAmount);
    		query.limit(userSearchFor);
		    query.find({
		    	success: function(joinedUsers) {
		    		var mainDiv, usersContainer;
		    		//Add Popup body
		    		if (skipAmount === 0) { 
		    			loadingSpinner();
		    			mainDiv = $('<div/>', {
			    			'id': 'joinedUsersDiv',
			    			'class': 'white-popup'
			    		});
			    			var title = $('<h3/>', {
			    				text: 'Currently Joined'
			    			}).appendTo(mainDiv);
				    		var popupHeight = (screen.height * 0.75).toString();
			    			usersContainer = $('<div/>', {
			    				'id': 'usersContainer',
			    				'style': 'max-height: ' + popupHeight + 'px;'
			    			}).appendTo(mainDiv);
		    		}
		    		else {
		    			usersContainer = $("#usersContainer");
		    		}
		    		//Append joined users
		    		for (var i = 0; i < joinedUsers.length; i++) { 
		    			var joinedDiv;
		    			try {
		    				joinedDiv = $('<div/>').appendTo(usersContainer);
			    				var imgSrc;
			    				if (joinedUsers[i].get("userModData") == null || joinedUsers[i].get("userModData").get("userPhotoMini") == null)
			    					imgSrc = defaultUserIconPath;
			    				else 
			    					imgSrc = getUrl(joinedUsers[i].get("userModData").get("userPhotoMini"));		    					
			    				var userPhoto = $('<img/>', {
			    					src: imgSrc
			    				}).appendTo(joinedDiv);
				    			var username = $('<p/>', {
				    				text: joinedUsers[i].get("userModData").get("username")
				    			}).appendTo(joinedDiv);
		    			}
		    			catch(error) {
		    				joinedDiv.remove();
		    				console.log(error);
		    			}
		    				
		    		}
		    		//If no one has joined
		    		if (joinedUsers.length === 0 && skipAmount === 0) {
		    			var joinedDiv = $('<div/>').appendTo(usersContainer);
			    			var message = $('<p/>', {
			    				text: 'You could be the first to join!'
			    			}).appendTo(joinedDiv);
			    	}
			    	//If there are probably more people joined than shown
			    	else if (joinedUsers.length === userSearchFor) {
			    		var newSkipAmount = skipAmount + userSearchFor;
			    		var moreJoined = $('<div/>', {
			    			'class': 'showMore',
			    			text: 'See More',
			    			click: function(e) { 
			    				showJoinedF(e, hangoutDataId, newSkipAmount);
			    				var $clicked = $('#joinedUsersDiv').find(e.target);
			    				$clicked.remove();
			    			}
			    		}).appendTo(usersContainer);
			    	}
			    	//Open popup
			    	if (skipAmount === 0) {
			    		hideOverlay();
			    		$.magnificPopup.open({
						  items: {
						  	tLoading: 'Loading...',
						    src: mainDiv, 
						    type: 'inline'
						  }
						});
			    	}
		    	},
		    	error: function(error) {
		    		console.log("Error retrieving joined users: ", error);
		    	}
		    });
    	},
    	error: function(error) {
    		console.log("Error retrieving post joined data: ", error);
    	}
    });
}

///////////////////////////////////
// Follow and Unfollow a Host
function followHostF(e, objectId) {
	var $postDiv = $('#postSpan').find('#' + objectId);
	var $liSetlector = $postDiv.find(e.target);
	Parse.User.current().fetch({
	  success: function(user) {
		var query = new Parse.Query(Hangout);
		query.equalTo("objectId", objectId);
		query.include("HostData");
		query.first({
			success: function(hangout) {
				loadingSpinner();
				var followHostLi = $("<li/>", {
					text: " Unfollow this Host",
					click: function(e) { unfollowHostF(e, objectId); }
				});
					icon = $("<i/>", {
						"class": "fa fa-user-times fa-fw"
					}).prependTo(followHostLi);
				$liSetlector.after(followHostLi);
				$liSetlector.remove();
				var hostDataId = hangout.get("HostData").id;
				Parse.Cloud.run('followHost', { hostDataId: hostDataId }, { 
					success: function(followingBool) {
						hideOverlay();
						successOverlay("Following");
						if (!followingBool) 
							Parse.Cloud.run('followHost', { hostDataId: hostDataId }, {});
		        	},
		        	error: function(error) {
		        		hideOverlay();
		        		basicOopsPopup();
		        		console.log("Failed to save user: ", error);
		        	}					
				});
			},
			error: function(error) {
				basicOopsPopup();
				console.log("Failed to query HostData: ", error);
			}
		});
	  },
	  erorr: function(error) {
	  	basicOopsPopup();
	    console.log("Failed to fetch user: ", error);
	  }
	});
}

function unfollowHostF(e, objectId) {
	var $postDiv = $('#postSpan').find('#' + objectId);
	var $liSetlector = $postDiv.find(e.target);
	Parse.User.current().fetch({
	  success: function(user) {
		var query = new Parse.Query(Hangout);
		query.equalTo("objectId", objectId);
		query.include("HostData");
		query.first({
			success: function(hangout) {
				loadingSpinner();
				var followHostLi = $("<li/>", {
					text: " Follow this Host",
					click: function(e) { followHostF(e, objectId); }
				});
					icon = $("<i/>", {
						"class": "fa fa-user-plus fa-fw"
					}).prependTo(followHostLi);		        		
				$liSetlector.after(followHostLi);
				$liSetlector.remove();
				var hostDataId = hangout.get("HostData").id;
				Parse.Cloud.run('followHost', { hostDataId: hostDataId }, { 
		        	success: function(followingBool) {
						hideOverlay();
						successOverlay("Unfollowed");
						if (followingBool) 
							Parse.Cloud.run('followHost', { hostDataId: hostDataId }, {});
		        	},
		        	error: function(error) {
		        		hideOverlay();
		        		basicOopsPopup();
		        		console.log("Failed to save user: ", error);
		        	}
		        });
			},
			error: function(error) {
				basicOopsPopup();
				console.log("Failed to query HostData: ", error)
			}
		});
	  },
	  erorr: function(error) {
	  	basicOopsPopup();
	    console.log("Failed to fetch user: ", error);
	  }
	});
}
