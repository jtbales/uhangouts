// Requires postHangout.js********************

///////////////////////////////////
// Edit Hangout
var openedEdit = false;
var currentHangoutEdit;
var $currentHangoutEditDiv;
function editHangout(e, hangoutId) {
	checkForOpenEdits();
	var $postDiv = $('#postSpan').find('#' + hangoutId);
	$currentHangoutEditDiv = $postDiv;
	var query = new Parse.Query(Hangout);
	query.equalTo("objectId", hangoutId);
	query.first({
		  success: function(object) {
		    // Successfully retrieved the object.
		    openedEdit = true;
		    currentHangoutEdit = object;
		    $postDiv.children().hide();
			$postDiv.addClass('editMode');
			////////////////////////////////TODO: change from raw html to jquery
			$postDiv.append(
			    '<div id="createHangoutTitleEdit">' +
			      '<h3>Edit Hangout <span class="hideOnLoad"><i class="fa fa-spinner fa-pulse fa-fw"></i></span></h3>' +
			      '<div id="deleteHangout" class="topRightIcon"><i class="fa fa-trash-o fa-fw"></i></div>' +
			    '</div>' +
			    '<table id="createHangoutTableEdit">' +
	 		      '<tbody>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="activityEdit">Activity <span data="50"></span></label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<input id="activityEdit" name="activity" type="text" class="input">' +
			          '</td>' +
			        '</tr>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="descriptionEdit">Details <span data="300"></span></label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<textarea rows="3" id="descriptionEdit" name="description" class="input"></textarea>' +
			          '</td>' +
			        '</tr>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="dateEdit">Start</label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<input id="dateStartEdit" name="dateStart" type="date" class="input inlineData">' +
			            '<input id="timeStartEdit" name="timeStart" type="time" class="input inlineData">' +
			          '</td>' +
			        '</tr>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="dateEdit">End</label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<input id="dateEndEdit" name="dateEnd" type="date" class="input inlineData">' +
			            '<input id="timeEndEdit" name="timeEnd" type="time" class="input inlineData">' +
			          '</td>' +
			        '</tr>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="locationEdit">Where <span data="50"></span></label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<input id="locationEdit" name="location" type="text" class="input">' +
			          '</td>' +
			        '</tr>' +
			        '<tr class="createHangoutRow">' +
			          '<th class="label">' +
			            '<label for="imageEdit">Image</label>' +
			          '</th>' +
			          '<td class="data">' +
			            '<input id="imageEdit" name="image" type="file" class="input" accept="image/jpeg">' +
			          '</td>' +
			        '</tr>' +			   
			      '</tbody>' +
			    '</table>' +
			    '<div class="createHangoutButtons">' +
			      '<button id="createHangoutCancelEdit">Cancel</button>' +
			      '<button id="createHangoutSubmitEdit">Save</button>' +
			    '</div>'
			);
		    $postDiv.find('input#activityEdit').val(object.get('Activity'));
		    $postDiv.find('textarea#descriptionEdit').val(object.get('Details'));
		    $postDiv.find('input#dateStartEdit').val(object.get('start').toDateInputValue().slice(0,10)).change( function() { setEndByStart('#dateStartEdit', '#timeStartEdit', '#dateEndEdit', '#timeEndEdit') });
			$postDiv.find('input#timeStartEdit').val(object.get('start').toDateInputValue().slice(11,16)).change( function() { setEndByStart('#dateStartEdit', '#timeStartEdit', '#dateEndEdit', '#timeEndEdit') });
		    $postDiv.find('input#dateEndEdit').val(object.get('end').toDateInputValue().slice(0,10));
			$postDiv.find('input#timeEndEdit').val(object.get('end').toDateInputValue().slice(11,16));
		    $postDiv.find('input#locationEdit').val(object.get('Where')); 
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
	var $postDiv = $currentHangoutEditDiv;
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
	currentHangoutEdit.destroy({
	  success: function(hangout) {
        $currentHangoutEditDiv.fadeOut(1000); 
	  },
	  error: function(hangout, error) { 
	  	basicOopsPopup();
	  	console.log(error);
	  }
	});
}

function postLoadingEdit(loading) {
	if (loading) {
		$("#createHangoutTitleEdit .hideOnLoad").show(); //Loading Spinner
		$('#createHangoutSubmitEdit').attr("disabled", true);
		$('#createHangoutCancelEdit').attr("disabled", true);
		loadingSpinner();
	}
	else {
		$("#createHangoutTitleEdit .hideOnLoad").hide();
		$('#createHangoutSubmitEdit').attr("disabled", false);
		$('#createHangoutCancelEdit').attr("disabled", false);
		hideOverlay();
	}
}

function saveEdit() {
	postLoadingEdit(true);
	var dateStartVal = $('#dateStartEdit').val();
	var timeStartVal = $('#timeStartEdit').val();
	var dateEndVal = $('#dateEndEdit').val();
	var timeEndVal = $('#timeEndEdit').val();
	var dateStart = combineDateAndTime(dateStartVal, timeStartVal);
	var dateEnd = combineDateAndTime(dateEndVal, timeEndVal);

	hangout = currentHangoutEdit;
	if (photoToUpload != null) { hangout.set("hangoutPhoto", photoToUpload); }
	if (photoToUploadMini != null) { hangout.set("hangoutPhotoMini", photoToUploadMini); }
	hangout.set("Activity", $('#activityEdit').val());
	hangout.set("Details", $('#descriptionEdit').val());
	hangout.set("start", dateStart);
	hangout.set("end", dateEnd);
	hangout.set("Where", $('#locationEdit').val());
	hangout.save(null, {
	  success: function(savedHangout) {
	  	//Set post values to the new ones
		var query = new Parse.Query(Hangout);
		query.equalTo("objectId", savedHangout.id);
		query.include("Data");
		query.include("HostData");
		query.include("HostModData");
		query.first({
			success: function(queriedHangout) {
				renderHangout(queriedHangout, queriedHangout.get("Data"), false);
				$currentHangoutEditDiv.after(postDiv);
				$currentHangoutEditDiv.remove();
				addImageLinkPopups();
			},
			error: function(error) {
				console.log(error);
			}
		});
		photoToUpload = null;
		photoToUploadMini = null;
		postLoadingEdit(false);
	  },
	  error: function(savedHangout, error) {
	  	basicErrorPopup("Error Saving", error.message);
		postLoadingEdit(false);
	  }
	});
}

function maxInputCounter(e, max) { //Fix this up eventually to not have to traverse around the DOM
	var $tr = $("#feedDiv").find(e.target.closest("tr")); //Closest doens't work in IE
	var $input = $tr.find(e.target);
	var $span = $tr.find("span");
	var count = max - $input.val().length;
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

	// Edit post buttons
	// $('#feedDiv').delegate('.Edit', 'click', editHangout);
	$('#feedDiv').delegate('#createHangoutCancelEdit', 'click', cancelEdit);
	$('#feedDiv').delegate('#createHangoutSubmitEdit', 'click', function() { checkImage('#createHangoutTableEdit input#imageEdit', 'hangoutPhoto', saveEdit, postLoadingEdit); } );
	$('#feedDiv').delegate('#deleteHangout', 'click', deleteHangoutEdit);
	$(document).delegate('#verifyDeletionButton', 'click', verifyDeletion);

	// Max input event listeners
	$('#feedDiv').delegate('#activityEdit', 'keyup', function(e) { maxInputCounter(e, 50); });
	$('#feedDiv').delegate('#descriptionEdit', 'keyup', function(e) { maxInputCounter(e, 300); });
	$('#feedDiv').delegate('#locationEdit', 'keyup', function(e) { maxInputCounter(e, 50); });

});