function searchSuspendedHangout(hangoutIdQString) { //Not used often
	var query = new Parse.Query(SuspendedPost);
	query.descending("createdAt");
	query.equalTo("objectIdLink", hangoutIdQString);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      renderSuspendedHangout(object);
	    }
	    addImageLinkPopups();
    	$('#morePost').children('p').html('Examine other reported post.');
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    basicErrorPopup(error);
	  }
	});	
}

function searchSuspendedUser(userIdQString) {
	var query = new Parse.Query(SuspendedPost);
	query.descending("createdAt");
	query.equalTo("MakerID", userIdQString);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      renderSuspendedHangout(object);
	    }
	    addImageLinkPopups();
    	$('#morePost').children('p').html('Examine other reported post.');
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    basicErrorPopup(error);
	  }
	});	
}

///////////////////////////////////
// Get and append recent post
function appendRecentPost() {
	var query = new Parse.Query(SuspendedPost);
	query.descending("createdAt");
	query.skip(displayedPostCounter);
	var searchFor = 30;
	query.limit(searchFor);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      renderSuspendedHangout(object);
	    }
	    addImageLinkPopups();
	    displayedPostCounter += results.length;
	    if (results.length < searchFor) {
	    	$('#morePost').children('p').html('No more post to show!');
	    }
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    basicErrorPopup(error);
	  }
	});
}

function runMainFunction() {
	if (GetQueryStringParams("hangoutId") != null) 
		searchSuspendedHangout(GetQueryStringParams("hangoutId"));
	else if (GetQueryStringParams("userId") != null)
		searchSuspendedUser(GetQueryStringParams("userId"));
	else 
		appendRecentPost();		
}

$(document).ready(function(){

	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

});