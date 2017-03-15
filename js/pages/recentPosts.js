///////////////////////////////////
// Get and append recent post
function appendRecentPost() {
	var query = new Parse.Query(HangoutData);
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
	    	$('#morePost').children('p').html('No more posts to show!');
	    }
	    $('#loadingDivs').hide();
	    //If there are no results it might by due to a unsuccessful setting of userData
	    // if (displayedPostCounter === 0) { //Maybe move these checks somewhere else?
			if (currentUser.get("Data") == null)
				createUserData();
			else if (currentUser.get("Data").get("universityDomain") == null) {
				getAndSetDomain();		    				
			} 
			else if (currentUser.get('modData') == null || currentUser.get('Data').get('userModData') == null) {
				createUserModeData();
			}
		// }
	  },
	  error: function(error) {
	    console.log("Error showing post: " + error.code + " " + error.message);
	  }
	});
}

function runMainFunction() {
	appendRecentPost();
}

$(document).ready(function(){

	renderHangoutCreator();

	///////////////////////////////////
	// Get more post
	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

});