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
	var query = currentUser.get("Data").relation("joinedHangouts").query();
	//Separate post that are happening yesterday/today/future from the past
	var yesterday = new Date();
	yesterday = new Date(yesterday.getTime() - 86400000);
	query.greaterThan("end", yesterday);
	query.ascending("end");
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
	if (!oldMode) {
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
}


function appendOldHangouts() {
	//Get old hangouts 
	var query = currentUser.get("Data").relation("joinedHangouts").query();
	//Get post that are older than yesterday
	var yesterday = new Date();
	yesterday = new Date(yesterday.getTime() - 86400000);
	query.lessThan("end", yesterday);
	query.descending("end");
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
	    addImageLinkPopups();
	    displayedPostCounter += results.length;
	    if (results.length < searchFor) {
	    	$('#morePost').children('p').html('No more posts to show!');
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

	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

});