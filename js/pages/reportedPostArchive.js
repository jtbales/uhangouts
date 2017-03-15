function searchArchiveHangout(hangoutIdQString) {
	var query = new Parse.Query(ReportedPost);
	query.descending("createdAt");
	query.equalTo("objectIdLink", hangoutIdQString);
	query.equalTo("archive", true);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      renderReportedHangout(object);
	    }
	    renderMorePostDiv();
	    addImageLinkPopups();
    	$('#morePost').children('p').html('Examine other reported post.');
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    basicErrorPopup("Error", error.message);
	  }
	});	
}

function searchArchiveUser(userIdQString) {
	var query = new Parse.Query(ReportedPost);
	query.descending("createdAt");
	query.equalTo("MakerID", userIdQString);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      renderReportedHangout(object);
	    }
	    renderMorePostDiv();
	    addImageLinkPopups();
    	$('#morePost').children('p').html('Examine other reported post.');
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    basicErrorPopup("Error", error.message);
	  }
	});	
}

///////////////////////////////////
// Get and append recent post
function appendRecentPost() {
	var query = new Parse.Query(ReportedPost);
	query.descending("createdAt");
	query.equalTo("archive", true);
	query.skip(displayedPostCounter);
	var searchFor = 30;
	query.limit(searchFor);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      renderReportedHangout(object);
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
	    basicErrorPopup("Error", error.message);
	  }
	});
}

function runMainFunction() {
	if (GetQueryStringParams("hangoutId") != null) 
		searchArchiveHangout(GetQueryStringParams("hangoutId"));
	else if (GetQueryStringParams("userId") != null)
		searchArchiveUser(GetQueryStringParams("userId"));
	else 
		appendRecentPost();		
}

$(document).ready(function(){

	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

});