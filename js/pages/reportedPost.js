///////////////////////////////////
// Get and append recent post
function appendRecentPost() {
	var query = new Parse.Query(ReportedPost);
	query.descending("createdAt");
	query.equalTo("archive", false);
	query.skip(displayedPostCounter);
	var searchFor = 30;
	query.limit(searchFor);
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      renderReportedHangout(object);
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
	appendRecentPost();
}

$(document).ready(function(){

	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

});