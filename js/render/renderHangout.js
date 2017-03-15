///////////////////////////////////
// Render Hangout
function timeSlicer(date) {
	//Cut seconds off
	var timeWhole = date.toLocaleTimeString();
	var time;
	if (timeWhole[1] === ':'){
		time = timeWhole.slice(0, 4) + timeWhole.slice(7, 10);
	} else {
		time = timeWhole.slice(0, 5) + timeWhole.slice(8, 11);
	}	
	return time;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Beginning of Hangout DOM creation
var postDiv;
function renderPostDiv(defaultAppend) {
	postDiv = $("<div/>", { 
		"class": "postDiv",
		"id": hangout.id
	});
	if (defaultAppend !== false) 
		postDiv.appendTo("#postSpan");
}

var postTitle;
function renderPostTitle() {
	postTitle = $("<div/>", {
		"class": "postTitle"
	}).appendTo(postDiv);
		
		var profileImgSrc;
		if (hostModData != null) {
			if (hostModData.get("userPhotoMini") == null) 
				profileImgSrc = defaultUserIconPath;
			else 
				profileImgSrc = getUrl(hostModData.get("userPhotoMini"));
		}
		else { //For reported/suspended post page
			if (hangout.get("userPhotoMini") == null) 
				profileImgSrc = defaultUserIconPath;
			else 
				profileImgSrc = getUrl(hangout.get("userPhotoMini"));
		}

		var profileImg = $("<img/>", {
			src: profileImgSrc
		}).appendTo(postTitle);

		var postTitleSplit = $("<div/>", {
			"class": "postTitleSplit"
		}).appendTo(postTitle);

			var activityHeading = $("<h3/>", {
				"class": "activity",
				text: hangout.get('Activity')
			}).appendTo(postTitleSplit);

		if (hostModData != null) {
			var makerHeading = $("<h4/>", {
				text: hostModData.get('username')
			}).appendTo(postTitleSplit);
		}
		else { //For reported/suspended post page
			var makerHeading = $("<h4/>", {
				text: hangout.get('Maker')
			}).appendTo(postTitleSplit);
		}
			

		var optionsCaret = $("<div/>", {
			"class": "topRightIcon optionsCaret"
		}).appendTo(postTitle);
				var icon = $("<i/>", {
					"class": "fa fa-angle-down fa-fw"
				}).appendTo(optionsCaret);
}

function renderOptionsBox_Normal() {
	var id = hangout.id;
		var optionsBox = $("<div/>", {
			"class": "optionsBox"
		}).appendTo(postTitle);	
		var ul = $("<ul/>").appendTo(optionsBox);
			if (hangoutData.get('MakerID') !== currentUser.id) {
				//Follow or Unfollow Host
				if (checkFollowingList(hostData.id)) {
					var followHostLi = $("<li/>", {
						text: " Unfollow this Host",
						click: function(e) { unfollowHostF(e, id); }
					}).appendTo(ul);
						icon = $("<i/>", {
							"class": "fa fa-user-times fa-fw"
						}).prependTo(followHostLi);
				}	
				else {
					var followHostLi = $("<li/>", {
						text: " Follow this Host",
						click: function(e) { followHostF(e, id); }
					}).appendTo(ul);
						icon = $("<i/>", {
							"class": "fa fa-user-plus fa-fw"
						}).prependTo(followHostLi);
				}

				//Report Host
				var reported = false;
				var Report_Array = hangoutData.get("Report_Array");
				for (i = 0; i < Report_Array.length; i++) {
					if (Report_Array[i] === currentUser.id) {
						reported = true;
						break;
					}
				}
				if (reported) {
					var reportHostLi = $("<li/>", {
						"class": "reportHangout",
						text: " Unreport Post",
						click: function(e) { reportHangoutF(e, id); }
					}).appendTo(ul);
						icon = $("<i/>", {
							"class": "fa fa-undo fa-fw"
						}).prependTo(reportHostLi);
				}	
				else {
					var reportHostLi = $("<li/>", {
						"class": "reportHangout",
						text: " Report Post",
						click: function(e) { reportHangoutF(e, id); }
					}).appendTo(ul);
						icon = $("<i/>", {
							"class": "fa fa-thumbs-down fa-fw"
						}).prependTo(reportHostLi);
				}	
			} 
			else { 
				var EditPostLi = $("<li/>", {
					text: " Edit Post",
					click: function(e) { editHangout(e, id); }
				}).appendTo(ul);
					icon = $("<i/>", {
						"class": "fa fa-pencil fa-fw"
					}).prependTo(EditPostLi);			
			}
			var extra1 = $("<li/>", {
				text: "Cool Future Thing"
			}).appendTo(ul);
			var extra2 = $("<li/>", {
				text: "I don\'t know!"
			}).appendTo(ul);
}

function renderOptionsBox_Reported() {
	var id = hangout.id;
	var objectIdLink = hangout.get("objectIdLink");
	var MakerID = hangout.get("MakerID");
		var optionsBox = $("<div/>", {
			"class": "optionsBox"
		}).appendTo(postTitle);	
		var ul = $("<ul/>").appendTo(optionsBox);

			var suspendSelectionLi = $("<li/>", {
				text: " Suspend User",
				click: function(e) { suspendSelectionF(id, e); }
			}).appendTo(ul);
				icon = $("<i/>", {
					"class": "fa fa-ban fa-fw"
				}).prependTo(suspendSelectionLi);

			var searchArchiveHangoutLi = $("<li/>", {
				text: " Hangout\'s Archive",
				click: function(e) { searchArchiveHangoutF(objectIdLink); }
			}).appendTo(ul);
				icon = $("<i/>", {
					"class": "fa fa-archive fa-fw"
				}).prependTo(searchArchiveHangoutLi);

			var searchArchiveUserLi = $("<li/>", {
				text: " User\'s Archive",
				click: function(e) { searchArchiveUserF(MakerID); }
			}).appendTo(ul);
				icon = $("<i/>", {
					"class": "fa fa-user fa-fw"
				}).prependTo(searchArchiveUserLi);

			var verifyOkayLi = $("<li/>", {
				text: " Clear Post as Okay",
				click: function(e) { verifyOkayF(id, e); }
			}).appendTo(ul);
				icon = $("<i/>", {
					"class": "fa fa-check fa-fw"
				}).prependTo(verifyOkayLi);
}

function renderOptionsBox_Suspended() {
	var id = hangout.id;
	var objectIdLink = hangout.get("objectIdLink");
	var MakerID = hangout.get("MakerID");
		var optionsBox = $("<div/>", {
			"class": "optionsBox"
		}).appendTo(postTitle);	
		var ul = $("<ul/>").appendTo(optionsBox);

			var verifyUnsuspensionLi = $("<li/>", {
				text: " Unsuspend User",
				click: function(e) { verifyUnsuspensionF(id, e); }
			}).appendTo(ul);
				icon = $("<i/>", {
					"class": "fa fa-undo fa-fw"
				}).prependTo(verifyUnsuspensionLi);

			var searchSuspendedUserLi = $("<li/>", {
				text: " Search User",
				click: function(e) { searchSuspendedUserF(MakerID); }
			}).appendTo(ul);
				icon = $("<i/>", {
					"class": "fa fa-user fa-fw"
				}).prependTo(searchSuspendedUserLi);
}

function renderHangoutInfoDiv_Normal() {
	var hangoutPhoto = hangout.get("hangoutPhoto"); 
	var hangoutPhotoMini = hangout.get("hangoutPhotoMini"); 
	if (hangoutPhoto != null && hangoutPhotoMini != null) {
		var hangoutInfoDiv = $("<div/>", {
			"class": "hangoutInfoDiv infoDivWithPicture"
		}).appendTo(postDiv);
	}
	else {
		var hangoutInfoDiv = $("<div/>", {
			"class": "hangoutInfoDiv infoDivWithoutPicture"
		}).appendTo(postDiv);
	}		
			//Details
			var detailsDiv = $("<div/>", {
				"class": "rowPair"
			}).appendTo(hangoutInfoDiv);
				var detailsHeader = $("<h5/>", {
					text: "Details"
				}).appendTo(detailsDiv);
				var detailsPara = $("<p/>", {
					"class": "details",
					text: hangout.get('Details')
				}).appendTo(detailsDiv);

			//Time
			if (hangout.get('start') != null && hangout.get('end') != null) {
				var timeStart = timeSlicer(hangout.get('start'));
				var timeEnd = timeSlicer(hangout.get('end'));
				if (hangout.get('start').getDate() === hangout.get('end').getDate() && hangout.get('start').getMonth() === hangout.get('end').getMonth()) {
					//Starts and ends on the same day
				    var timeDiv = $("<div/>", {
				    	"class": "rowPair"
				    }).appendTo(hangoutInfoDiv);
						var timeHeader = $("<h5/>", {
							text: "Time"
						}).appendTo(timeDiv);
						var timePara = $("<p/>", {
							"class": "time",
							text: hangout.get('start').toDateString() + ' ' + timeStart + ' to ' + timeEnd
						}).appendTo(timeDiv);			    	
				} 
				else {
				    //Start time
				    var startDiv = $("<div/>", {
				    	"class": "rowPair"
				    }).appendTo(hangoutInfoDiv);
						var startHeader = $("<h5/>", {
							text: "Start"
						}).appendTo(startDiv);
						var startPara = $("<p/>", {
							"class": "start",
							text: hangout.get('start').toDateString() + ' ' + timeStart
						}).appendTo(startDiv);	

					//End time
				    var endDiv = $("<div/>", {
				    	"class": "rowPair"
				    }).appendTo(hangoutInfoDiv);
						var endHeader = $("<h5/>", {
							text: "End"
						}).appendTo(endDiv);
						var endPara = $("<p/>", {
							"class": "end",
							text: hangout.get('end').toDateString() + ' ' + timeEnd
						}).appendTo(endDiv);	
				}
			}	

			//Where
			var whereDiv = $("<div/>", {
				"class": "rowPair"
			}).appendTo(hangoutInfoDiv);
				var whereHeader = $("<h5/>", {
					text: "Where"
				}).appendTo(whereDiv);
				var wherePara = $("<p/>", {
					"class": "where",
					text: hangout.get('Where')
				}).appendTo(whereDiv);
}

function renderHangoutPhoto() {
	var hangoutPhoto = hangout.get("hangoutPhoto"); 
	var hangoutPhotoMini = hangout.get("hangoutPhotoMini"); 
	if (hangoutPhoto != null && hangoutPhotoMini != null) {
		urlMini = getUrl(hangoutPhotoMini);
		urlNormal = getUrl(hangoutPhoto);			
		var hangoutPicDiv = $("<div/>", {
			"class": "hangoutPicDiv"
		}).appendTo(postDiv);
			var a = $("<a/>", {
				"class": "hangoutPhoto",
				"href": urlNormal  //urlMini
			}).appendTo(hangoutPicDiv).attr("data", urlNormal);
				var img = $("<img/>", {
					src: urlMini
				}).appendTo(a);	
	}	
}

function renderPostButtonsDiv() {
	var id = hangout.id;
	var hangoutDataId = hangoutData.id;
	var postButtonsDiv = $("<div/>", {
		"class": "postButtons"
	}).appendTo(postDiv);
		var showJoinedPara = $("<p/>", {
			"class": "showJoined",
			text: " Joined",
			click: function(e) { showJoinedF(e, hangoutDataId); }
		}).appendTo(postButtonsDiv);
			var joinedCount = hangoutData.get('joinedCount');
			if (joinedCount == null) 
				joinedCount = 0;
			var joinedCountSpan = $("<span/>", {
				"class": "joinedCount",
				text: joinedCount
			}).prependTo(showJoinedPara);
		//Check for Joined relation
		var joined = false;
		for (i = 0; i < joinedPost.length; i++) {
			if (joinedPost[i].id === hangoutData.id) {
				joined = true;
				break;
			}
		}
		if (joined) {
			var joinButton = $("<button/>", {
				"class": "joinButton joined",
				text: "Joined",
				click: function(e) { joinHangoutF(e, id); }
			}).appendTo(postButtonsDiv);
		}
		else {
			var joinButton = $("<button/>", {
				"class": "joinButton",
				text: "Join",
				click: function(e) { joinHangoutF(e, id); }
			}).appendTo(postButtonsDiv);
		}
}
//End of hangout DOM creations
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function renderMorePostDiv() {
	if ($('#morePost').length < 1) {
		var morePostDiv = $('<div/>', {
			'id': 'morePost',
			click: function() { runMainFunction(); }
		}).appendTo('#feedDiv');
			var p = $('<p/>', {
				text: 'Get more hangouts'
			}).appendTo(morePostDiv);
	}
}


var hangout, hangoutData, hostData, hostModData;
function renderHangout(hangoutVar, defaultAppend) {
	try {
		hostData = hangoutVar.get("HostData");
		hostModData = hangoutVar.get("HostModData");
		if (hangoutVar.has("Hangout")) { //If HangoutData
			hangoutData = hangoutVar; 
			hangout = hangoutVar.get("Hangout");
		}
		else if (hangoutVar.has("Data")) { //If Hangout
			hangout = hangoutVar;
			hangoutData = hangoutVar.get("Data");
		}
		else { // If the vital info is missing, usually when a pointer object is restricted
			postDiv = "";
			return 0;
		}
		if (hangout.createdAt == null) //Error message
			hangout.set('Details', 'This Hangout needs to be re-saved. Something wrong occurred during the save process. Please email uHangouts about this error.');		
		// if (hostModData == null || hostData == null) {
		// 	postDiv = "";
		// 	return 0;
		// } 
		else if (hostModData.get('username') == null) //Error message
			hostModData.set('username', 'Error, re-save the Hangout.');
	}
	catch(error){
		console.log(error);
		postDiv = "";
		return 0;
	}	

	try {
		renderPostDiv(defaultAppend);
			renderPostTitle();
				renderOptionsBox_Normal();
			renderHangoutInfoDiv_Normal();
			renderHangoutPhoto();
			renderPostButtonsDiv();
	}
	catch(error) {
		console.log(error);
		// postDiv.remove();
	}	
}

function renderReportedHangout(hangoutVar) {
	hangout = hangoutVar;
	renderPostDiv();
		renderPostTitle();
			renderOptionsBox_Reported();
		renderHangoutInfoDiv_Normal();
		renderHangoutPhoto();
}

function renderSuspendedHangout(hangoutVar) {
	hangout = hangoutVar;
	renderPostDiv();
		renderPostTitle();
			renderOptionsBox_Suspended();
		renderHangoutInfoDiv_Normal();
		renderHangoutPhoto();
}

function setOptionsBoxPosition() {
	var pageWidth = $("#page").width();
	if (optionsIsOpen){
		var position = $optionsCaret.position();
		$optionsBox.css("top", position.top + 25);
		if (pageWidth > 740) {
			$optionsBox.css("left", position.left - 175).css("right", "auto").css("display", "block").css("width", 200);
		}
		else if (pageWidth < 400) {
			$optionsBox.css("left", "auto").css("right", "0").css("display", "block").css("width", pageWidth);
		}
		else {
			$optionsBox.css("left", "auto").css("right", 30).css("display", "block").css("width", 300);
		}		
	}
}

var $optionsCaret;
var $postDiv;
var $optionsBox;
var optionsIsOpen = false;
function toggleOptionsBox() {
	$optionsCaret = $(this);
	if (!optionsIsOpen) {
		$postDiv = $(this).closest('div').parent('div').parent('div');
		$optionsBox = $postDiv.find("div.optionsBox");
		optionsIsOpen = true;	
		setOptionsBoxPosition();
		$optionsBox.blur(function() {
			$optionsBox.hide();
		});	
	}
	else {
		$optionsBox.hide();
		optionsIsOpen = false;
	}
}

function clickAway(event) {
	if (optionsIsOpen && !$(event.target).closest(".optionsCaret").length) {
        $optionsBox.fadeOut(400);
        optionsIsOpen = false;
    }
}	    


$(document).ready(function() {

	///////////////////////////////////
	// Toggle optionsBox
	$('#feedDiv').delegate('.optionsCaret', 'click', toggleOptionsBox);
	// Close optionsBox
	$('html').click(clickAway);
	//Fix position
	$(window).resize(setOptionsBoxPosition);
});



