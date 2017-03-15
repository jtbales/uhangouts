///////////////////////////////////
// Get and append recent post
function appendPopularPost() {
	var $postSpan = $('#postSpan');
	var query = new Parse.Query(HangoutData);
	var yesterday = new Date();
	yesterday = new Date(yesterday.getTime() - 86400000);
	query.greaterThan("end", yesterday);
	query.descending("Joined_Count");
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
	appendPopularPost();
}

$(document).ready(function(){

	renderHangoutCreator();

	///////////////////////////////////
	// Get more post
	$('#morePost').click(appendPopularPost);
	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

});