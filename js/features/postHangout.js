///////////////////////////////////
// createHangout
//Convert current time to time zone adjusted JSON data
Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON();
};

function setEndByStart(dateStartEl, timeStartEl, dateEndEl, timeEndEl) {
	var dateStartVal = $(dateStartEl).val();
	var timeStartVal = $(timeStartEl).val();
	var dateStart = combineDateAndTime(dateStartVal, timeStartVal);
	var dateEnd = new Date(dateStart.getTime() + 3600000);
	$(dateEndEl).val(dateEnd.toDateInputValue().slice(0,10));
	$(timeEndEl).val(dateEnd.toDateInputValue().slice(11,16));
}

function combineDateAndTime(dateInput, timeInput) {
	var year = dateInput.substring(0, 4);
	var month = dateInput.substring(5, 7);
	//Adjust month to 0-11 
	month = (parseInt(month) - 1).toString();
	var day = dateInput.substring(8, 10);
	var hour = timeInput.substring(0, 2);
	var minute = timeInput.substring(3, 5);
	return new Date(year, month, day, hour, minute);	
}

function createHangoutOpenF() {
	if ($('#dateStart').val() == "") {
		$('#dateStart').val(new Date().toDateInputValue().slice(0,10));
		$('#timeStart').val(new Date().toDateInputValue().slice(11,16));
		setEndByStart('#dateStart', '#timeStart', '#dateEnd', '#timeEnd');		
	}
	$('#createHangoutDiv').css("display", "block");
}

function createHangoutCancelF() {
	$('#createHangoutDiv').slideUp(300);
}

///////////////////////////////////
// postHangout
function postLoading(loading) { 
	if (loading) {
		$("#createHangoutTitle .hideOnLoad").show(); //Loading Spinner
		$('#createHangoutSubmit').attr("disabled", true);
		$('#createHangoutCancel').attr("disabled", true);
		loadingSpinner();
	}
	else {
		$("#createHangoutTitle .hideOnLoad").hide();
		$('#createHangoutSubmit').attr("disabled", false);
		$('#createHangoutCancel').attr("disabled", false);
		hideOverlay();
	}
}

function postHangout() {
	postLoading(true);
	var hangout = new Hangout();
	var dateStartVal = $('#dateStart').val();
	var timeStartVal = $('#timeStart').val();
	var dateEndVal = $('#dateEnd').val();
	var timeEndVal = $('#timeEnd').val();
	var dateStart = combineDateAndTime(dateStartVal, timeStartVal);
	var dateEnd = combineDateAndTime(dateEndVal, timeEndVal);

	if (photoToUpload != null) { hangout.set("hangoutPhoto", photoToUpload); }
	if (photoToUploadMini != null) { hangout.set("hangoutPhotoMini", photoToUploadMini); }
	hangout.set("Activity", $('#activity').val());
	hangout.set("Details", $('#details').val());
	hangout.set("start", dateStart);
	hangout.set("end", dateEnd);
	hangout.set("Where", $('#location').val());
	hangout.set("Host", currentUser);
	hangout.save(null, {
	  success: function(hangout) {
	  	// Set in puts to be blank
	    $('#activity').val(('').html);
		$('#details').val(('').html);
		$('#dateStart').val(('').html);
		$('#timeStart').val(('').html);
		$('#dateEnd').val(('').html);
		$('#timeEnd').val(('').html);
		$('#location').val(('').html);
		$("input#image").val(('').html);
		//Close createHangoutDiv
		$('#createHangoutDiv').hide();
		var query = new Parse.Query(Hangout);
		query.equalTo("objectId", hangout.id);
		query.include("Data");
		query.include("HostData");
		query.include("HostModData");
		query.first({
			success: function(hangout) {
				renderHangout(hangout, false);
				postDiv.prependTo("#postSpan");
				addImageLinkPopups();
			},
			error: function(error) {
				console.log(error);
			}
		});
		photoToUpload = null;
		photoToUploadMini = null;
		postLoading(false);
	  },
	  error: function(hangout, error) {
	  	console.log(error);
		basicErrorPopup("Oops!", error.message);
	    postLoading(false);
	  }
	});
}
