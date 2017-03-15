var hangoutId;
var $postDiv;

function suspendSelectionF(id, e) {
	$postDiv = $("#postSpan").find(e.target.closest(".postDiv"));
	hangoutId = id;
	$.magnificPopup.open({
	  items: {
	    src: '<div id="normalPopupDiv" class="white-popup">' +
	    		'<h3>Select the length of suspension.</h3>' +
	    		// '<div class="popupSelection">' +
		    		'<div class="mainSelector lengthChoice" data="0.033">One Day</div>' + 
	    			'<div class="discription" >Minor</div>' +
	    			'<div class="mainSelector lengthChoice" data="1">One Month</div>' + 
	    			'<div class="discription" >Harsh Language</div>' +
	    			'<div class="mainSelector lengthChoice" data="3">Three Months</div>' + 
	    			'<div class="discription" >Racial, harassment, or hateful.</div>' +
	    			'<div class="mainSelector lengthChoice" data="12">One Year</div>' + 
	    			'<div class="discription">Spam, lie, or sexual.</div>' +
	    			'<div class="mainSelector lengthChoice" data="9999">Eternity</div>' +
	    			'<div class="discription">Very serious law breaking.</div>' +
	    		// '</div>' +
	    	 '</div>', 
	    type: 'inline'
	  }
	});		
	$("#normalPopupDiv").delegate('.lengthChoice', 'click', verifySuspension);
}

function verifyUnsuspensionF(id, e) {
	$postDiv = $("#postSpan").find(e.target.closest(".postDiv"));
	hangoutId = id;
	swal({   
		title: "Unsuspend this user?",   
		text: "Be sure to examine this user\'s other post before proceeding.",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#5A3584",   
		confirmButtonText: "Unsuspend",   
		closeOnConfirm: false 
	}, function(){ 
		unsuspendUser();
	});
}

function unsuspendUser() {
	var query = new Parse.Query(SuspendedPost);
	query.equalTo("objectId", hangoutId);
	query.first({
		success: function(object) {
			object.set("suspended", false);
			object.save(null, {
				success: function(object) {
					var dateNow = new Date();
					if (dateNow < object.get("suspendedTill")) //Still suspended for other posts
						basicSuccessPopup("Undone!", "But he is still suspended until " + object.get("suspendedTill").toLocaleDateString() + " for other posts.");
					else 
						basicSuccessPopup("Saved!", "The poor fellow has been unsuspended.");
					$postDiv.fadeOut(1000); 	
				},
				error: function(object, error) {
					basicErrorPopup(error);					
				}
			});
		},
		error: function(object, error) {
			basicErrorPopup(error);	
		}
	});	
}

function searchArchiveHangoutF(objectIdLink) {
	var qStringObj = {
		hangoutId : objectIdLink
	}
	var qString = $.param(qStringObj);
	var newWindow = window.open("http://uhangouts.parseapp.com/html/reportedPostArchive.html?" + qString, "_blank");
	newWindow.focus();
}

function searchArchiveUserF(userId) {
	var qStringObj = {
		userId : userId
	}
	var qString = $.param(qStringObj);
	var newWindow = window.open("http://uhangouts.parseapp.com/html/reportedPostArchive.html?" + qString, "_blank");
	newWindow.focus();
}

function searchSuspendedUserF(userId) {
	var qStringObj = {
		userId : userId
	}
	var qString = $.param(qStringObj);
	var newWindow = window.open("http://uhangouts.parseapp.com/html/suspendedUserPost.html?" + qString, "_blank");
	newWindow.focus();
}

function verifyOkayF(id, e) {
	$postDiv = $("#postSpan").find(e.target.closest(".postDiv"));
	hangoutId = id;
	swal({   
		title: "Clear Post as Okay?",   
		text: "Be sure to examine snapshots of this post in the archive before proceeding.",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#5A3584",   
		confirmButtonText: "Clear",   
		closeOnConfirm: false 
	}, function(){ 
		clearPostAsOkay();
	});
}

function clearPostAsOkay() {
	var query = new Parse.Query(ReportedPost);
	query.equalTo("objectId", hangoutId);
	query.first({
		success: function(object) {
			object.set("suspended", false); 
			object.save(null, {
				success: function() {
					basicSuccessPopup("Cleared", "All related post have been cleared.");	
			        $postDiv.fadeOut(1000); 
				},
				error: function(ojbect, error) {
					basicErrorPopup("Error", error.message);				
				}
			});
		},
		error: function(object, error) {
			basicErrorPopup("Error", error.message);	
		}
	});
}

var length;
function verifySuspension() {
	closePopup();
	length = $(this).attr("Data");
	var s = "s"
	if (length == 1)
		var s = "";
	swal({   
		title: 'Suspend this user for ' + length + ' month' + s + '?',   
		text: "Be sure to check the archive for related snapshots of this post before preceding. " +
		"Provide a short but percise description of the Host\'s offense.",   
		type: "input",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "Suspend", 
		inputPlaceholder: "Reason",  
		closeOnConfirm: false 
	}, function(inputValue) { 
		if (inputValue === false) return false;
  		if (inputValue.trim() === "") {     
  			swal.showInputError("There\'s got to be a reason!");  
  			return false  
        }
		suspendUser(inputValue);
	});	
}

function suspendUser(suspendedReason) {
	var monthsSuspended = parseFloat(length);
	var query = new Parse.Query(ReportedPost);
	query.equalTo("objectId", hangoutId);
	query.first({
		success: function(object) {
			object.set("suspended", true);
			object.set("monthsSuspended", monthsSuspended);
			object.set("suspendedReason", suspendedReason);
			object.save(null, {
				success: function(saveObject) {
					basicSuccessPopup("Suspended", 'The user has been suspended until ' + saveObject.get("suspendedTill").toLocaleDateString() + 
					    		' for the following reason : "' + suspendedReason + '"');
			        $postDiv.fadeOut(1000); 
				},
				error: function(object, error) {
					basicErrorPopup("Error", error.message);			
				}
			});
		},
		error: function(object, error) {
			basicErrorPopup("Error", error.message);		
		}
	});
}
