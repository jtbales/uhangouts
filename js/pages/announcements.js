////////////////////////////////////////////////////////////////////////////
// Note: much of this code was taken from the Hangout post features. 
///////////////////////////////////
// Render Announcement
function renderAnnouncementPost(object) {
return '<div class="postDiv" data="' + object.id + '">' +
       '<div class="postTitle">' +
         '<h3 class="title">' + object.get('title') + '</h3>' +
         '<div class="topRightIcon optionsCaret"><i class="fa fa-angle-down fa-fw"></i></div>' +
         '<div class="optionsBox">' +
         	'<ul>' + 
			  '<li class="Edit"><i class="fa fa-pencil fa-fw"></i> Edit Post</li>' +
			'</ul>' +
         '</div>' +
        '</div>' +
 	    '<div class="rowPair">' +
	      '<h5>Details</h5>' +
	      '<p class="details">' + object.get('details') + '</p>' +
	    '</div>' +
	    '<div class="rowPair">' +
	      '<h5>Announcer</h5>' +
	      '<p>' + object.get('announcer') + '</p>' +
	    '</div>' +
	  '</div>'
}


///////////////////////////////////
// Get and append recent post
function appendRecentPost() {
	var $postSpan = $('#postSpan');
	var query = new Parse.Query(Announcement);
	query.descending("createdAt");
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      var announcement = results[i];
	      $postSpan.append(renderAnnouncementPost(announcement));
	    }
	    $('#loadingDivs').hide();
	  },
	  error: function(error) {
	    basicErrorPopup("Error", error.message);
	  }
	});
}

function runMainFunction() {
	appendRecentPost();
}

///////////////////////////////////
// createAnnouncement
function createAnnouncementOpenF() {
	$('#createHangoutDiv').css("display", "block");
}
function createAnnouncementCancelF() {
	$('#createHangoutDiv').slideUp(300);
}


///////////////////////////////////
// postAnnouncement
function postAnnouncement() {
	var announcement = new Announcement();
	announcement.set("title", $('#title').val());
	announcement.set("details", $('#details').val());
	announcement.save(null, {
	  success: function(announcement) {
	  	// Set in puts to be blank
	    $('#title').val(('').html);
		$('#details').val(('').html);
		//Close createAnnouncementDiv
		$('#createHangoutDiv').hide();
		$('#postSpan').prepend(renderAnnouncementPost(announcement));
		$("#announcements").prepend(renderAnnouncement(announcement));
	  },
	  error: function(error) {
	    console.log('Failed to create new object' + error);
	    basicErrorPopup("Sorry", "You are not allow to post announcements. Nice try. Not really. More like a bad try.");
	  }
	});
}

///////////////////////////////////
// Edit Hangout
var openedEdit = false;
var currentPostEdit;
var $currentPostEditDiv;
function editHangout() {
	checkForOpenEdits();
	var $postDiv = $(this).closest('div').parent('div').parent('div');
	$currentPostEditDiv = $postDiv;
	var announcementId = $postDiv.attr('data');
	var query = new Parse.Query(Announcement);
	query.equalTo("objectId", announcementId);
	query.first({
		  success: function(object) {
		    // Successfully retrieved the object.
		    openedEdit = true;
		    currentPostEdit = object;
		    $postDiv.children().hide();
			$postDiv.addClass('editMode');
			$postDiv.append(
			    '<div id="createHangoutTitleEdit">' +
			      '<h3>Edit Hangout</h3>' +
			      '<div id="deleteHangout" class="topRightIcon"><i class="fa fa-trash-o fa-fw"></i></div>' +
			    '</div>' +
			    '<table id="createHangoutTableEdit">' +
	 		      '<tbody>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="titleEdit">Title <span data="50"></span></label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<input id="titleEdit" name="title" type="text" class="input">' +
			          '</td>' +
			        '</tr>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="detailsEdit">Details <span data="180"></span></label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<textarea rows="3" id="detailsEdit" name="details" class="input"></textarea>' +
			          '</td>' +
			        '</tr>' +
			      '</tbody>' +
			    '</table>' +
			    '<div class="createHangoutButtons">' +
			      '<button id="createHangoutCancelEdit">Cancel</button>' +
			      '<button id="createHangoutSubmitEdit">Save</button>' +
			    '</div>'
			);
		    $postDiv.find('input#titleEdit').val(object.get('title'));
		    $postDiv.find('textarea#detailsEdit').val(object.get('details'));
		  },
		  error: function(error) {
		    console.log("Error changing to edit mode: " + error.code + " " + error.message);
		  }
	});
}

function checkForOpenEdits() {
	//close other edits
	if ($('#feedDiv').find('#createHangoutTitleEdit') != null) {
		var $open = $('#feedDiv').find('#createHangoutTitleEdit').parent();
		$open.children().show();
		$open.find('#createHangoutTitleEdit').remove();
		$open.find('#createHangoutTableEdit').remove();
		$open.find('.createHangoutButtons').remove();
		$open.removeClass('editMode');
	}
}

function cancelEdit() {
	var $postDiv = $(this).closest('div').parent('div');
	$postDiv.children().show();
	$postDiv.find('#createHangoutTitleEdit').remove();
	$postDiv.find('#createHangoutTableEdit').remove();
	$postDiv.find('.createHangoutButtons').remove();
	openedEdit = false;
	$postDiv.removeClass('editMode');
	checkForOpenEdits();
}

function deleteHangoutEdit() {
	swal({   
		title: "Are you sure?",   
		text: "This post will be gone forever :(",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "Yes, delete it!",   
		closeOnConfirm: false 
	}, function(){ 
		verifyDeletion();
	});
}

function verifyDeletion() {
	swal.close();
	currentPostEdit.destroy({
	  success: function(myObject) {
	    // The object was deleted from the Parse Cloud.
        $currentPostEditDiv.fadeOut(1000, function(){ this.remove() }); 
        $("#announcements li").first()
        var index = $currentPostEditDiv.index();
		$announcementLI = $("#announcements li").eq(index);
		$announcementLI.fadeOut(1000, function(){ this.remove() }); 
	  },
	  error: function(error) { 
	  	basicOopsPopup();
	  }
	});
}

function saveEdit() {
	var $postDiv = $(this).closest('div').parent('div');
	announcement = currentPostEdit;
	announcement.set("title", $('#titleEdit').val());
	announcement.set("details", $('#detailsEdit').val());
	announcement.save(null, {
	  success: function(announcement) {
	  	$postDiv.find('.title').text(announcement.get('title'));
	  	$postDiv.find('.details').text(announcement.get('details'));
	  	//Restore from edit mode
	  	$postDiv.children().show();
		$postDiv.find('#createHangoutTitleEdit').remove();
		$postDiv.find('#createHangoutTableEdit').remove();
		$postDiv.find('.createHangoutButtons').remove();
		$postDiv.removeClass('editMode');
		//Edit billboard
		var index = $postDiv.index();
		$announcementLI = $("#announcements li").eq(index);
		$announcementLI.find(".titleA").text(announcement.get('title'));
		$announcementLI.find(".detailsA").text(announcement.get('details'));
	  },
	  error: function(error) {
	  	basicErrorPopup("Error", error.message);
	  }
	});
}

function maxInputCounter() {
	var $span = $(this).parent().parent().find("span");
	var max = parseInt($span.attr('data'));
	var count = max - $(this).val().length;
	//Give warning
	if (count <= 25) {
		$span.text(count);
	} else {
		$span.text("");
	}
	//Show red for overlengthed
	if (count < 0) {
		$span.addClass("red");
	} else {
		$span.removeClass("red");
	}
}


$(document).ready(function() {

	window.setTimeout(function(){ if ($('#loadingDivs').css("display") !== "none") runMainFunction(); }, 3000);

	///////////////////////////////////
	// createAnnouncement
	//Open the createAnnouncementDiv upon createAnnouncementOpen click
	$('#createHangoutOpen').click(createAnnouncementOpenF);
	$('#createHangoutCancel').click(createAnnouncementCancelF);

	///////////////////////////////////
	// postAnnouncement
	$('#createHangoutSubmit').click(postAnnouncement);

	// Max input event listeners, maxInputCounter function is in editHangout.js
	$('#feedDiv').delegate('#title', 'keyup', maxInputCounter);
	$('#feedDiv').delegate('#details', 'keyup', maxInputCounter);

	// Edit post buttons
	$('#feedDiv').delegate('.Edit', 'click', editHangout);
	$('#feedDiv').delegate('#createHangoutCancelEdit', 'click', cancelEdit);
	$('#feedDiv').delegate('#createHangoutSubmitEdit', 'click', saveEdit);
	$('#feedDiv').delegate('#deleteHangout', 'click', deleteHangoutEdit);

	// Max input event listeners
	$('#feedDiv').delegate('#titleEdit', 'keyup', maxInputCounter);
	$('#feedDiv').delegate('#detailsEdit', 'keyup', maxInputCounter);

});