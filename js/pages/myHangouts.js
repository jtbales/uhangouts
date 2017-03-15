var oldMode = false;
function oldOrNew() {
	if (oldMode) {
		appendOldHangouts();
	} else {
		appendMorePost();
	}
}

///////////////////////////////////
// Get and append recent post
var displayedPostCounter = 0;
function appendMorePost() {
	var query = new Parse.Query(HangoutData);
	//Get the Hangouts the user is hosting
	query.equalTo("Host", currentUser);
	//Only append the Hangouts that happened yesterday or will in the future
	var yesterday = new Date();
	yesterday = new Date(yesterday.getTime() - 86400000);
	query.greaterThan("end", yesterday);
	query.ascending("start");
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
	    	$('#morePost').children('p').html('Get old posts instead');
	    	$('#morePost').unbind().click(clearPostsForOld);
	    }
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    console.log("Error showing post: " + error.code + " " + error.message);
	  }
	});
}

function clearPostsForOld() {
	//hide currently rendered hangouts
	$('#postSpan').empty();
	$('#loadingDivs').show();
	$('#selectionMenu').find('.selected').removeClass('selected');
	$('#oldHangouts').addClass('selected');
	$('#morePost').children('p').html('Get more hangouts');
	displayedPostCounter = 0;
	oldMode = true;
	appendOldHangouts();
}

function appendOldHangouts() {
	//Get old hangouts 
	var query = new Parse.Query(Hangout);
	//Get the Hangouts the user is hosting
	query.equalTo("Host", currentUser);
	//Get post that are older than yesterday
	var yesterday = new Date();
	yesterday = new Date(yesterday.getTime() - 86400000);
	query.lessThan("end", yesterday);
	query.descending("start");
	query.skip(displayedPostCounter);
	query.limit(searchFor);
	query.include("Data");
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
	    	$('#morePost').children('p').html('Get old posts instead');
	    	$('#morePost').unbind().click(clearPostsForOld);
	    }
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    console.log("Error showing post: " + error.code + " " + error.message);
	  }
	});
}

function runMainFunction() {
	oldOrNew();
}

$(document).ready(function(){

	renderHangoutCreator();

	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

});