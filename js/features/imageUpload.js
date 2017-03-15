var smallImage; //bool
var photoToUpload;
var photoToUploadMini;
var squareImage = false;
function checkImage(selector, photoName, afterFunction, loadingFunction) {
	smallImage = false;
	loadingFunction(true);
	var fileUploadControl = $(selector)[0];
	if (fileUploadControl.files.length > 0) {
	    if ( !( window.File && window.FileReader && window.FileList && window.Blob ) ) {
		    basicErrorPopup("Sorry", 'The File APIs are not fully supported in this browser.');
		    loadingFunction(false);
		    return false;
	    }
	    var img = fileUploadControl.files[0];
	    if (img.size > 1000000)
	    	processfile(selector, photoName, afterFunction, loadingFunction, img);
	    else {
	    	smallImage = true;
	    	var name = photoName + ".jpg";
		  	photoToUpload = new Parse.File(name, img, "image/*");
		  	photoToUpload.save().then(function() {
				processfile(selector, photoName, afterFunction, loadingFunction, img);
			}, function(error) {
			    basicErrorPopup("Oops!", error.message);
			    loadingFunction(false);
			});	    	
	    }
	}
	else {
		afterFunction();
	}
}

function processfile(selector, photoName, afterFunction, loadingFunction, file) {
  	console.log("Beginning processing");
    if( !( /image/i ).test( file.type ) ) {
        basicErrorPopup("That won't do", "File "+ file.name +" is not an image.");
        return false;
    }
    // read the files
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (event) {
    	console.log("Reader onload");
		var blob = new Blob([event.target.result]); // create blob...
		window.URL = window.URL || window.webkitURL;
		var blobURL = window.URL.createObjectURL(blob); // and get it's URL
		// helper Image object
		var image = new Image();
		image.src = blobURL;
		image.onload = function() { // have to wait till it's loaded
			var resized64 = resizeMe(image); // send it to canvas
			uploadImageBase64(selector, photoName, afterFunction, loadingFunction, resized64);
		}
    };
}

// === RESIZE ====
function resizeMe(img) {
  	console.log("Beginning resizeMe");
	var canvas = document.createElement('canvas');
	var max_width, max_height;
	if (smallImage) {
		max_width = 240;
		max_height = 240;
	}
	else {
		max_width = 1024;
		max_height = 1024;
	}
	var width = img.width;
	var height = img.height;
	var newWidth, newHeight;
	var clipX, clipY, clipLength;
	// calculate the width and height, constraining the proportions
	if (squareImage && smallImage) {
		if (width > height) {
			clipX = (width - height) / 2;
			clipY = 0;
			clipLength = height;
		} 
		else {
			clipX = 0;
			clipY = (height - width) / 2;
			clipLength = width;
		}		
		//Adjust for maxes
		if (clipLength > max_height) { 
			newWidth = max_height;
			newHeight = max_height;
		} 
		else {
			newWidth = clipLength;
			newHeight = clipLength;
		}
	}
	else {
		if (width > height) {
			if (width > max_width) { 
				newHeight = Math.round(height *= max_width / width);
				newWidth = max_width;
			}
		} 
		else {
			if (height > max_height) { 
				newWidth = Math.round(width *= max_height / height);
				newHeight = max_height;
			}
		}
	}
	// resize the canvas and draw the image data into it
	if (squareImage) {
		canvas.width = newWidth;
		canvas.height = newHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, clipX, clipY, clipLength, clipLength, 0, 0, newWidth, newHeight);
	}
	else {
		canvas.width = newWidth;
		canvas.height = newHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, newWidth, newHeight);		
	}
	var dataURL = canvas.toDataURL("image/jpg");
	return dataURL.replace("data:image/jpg;base64,", "");
}

function uploadImageBase64(selector, photoName, afterFunction, loadingFunction, imgBase64) {
	if (smallImage) {
	  	var name = photoName + "Mini.jpg";
	  	photoToUploadMini = new Parse.File(name, { base64: imgBase64 });
	  	photoToUploadMini.save().then(function() {
			afterFunction();
		}, function(error) {
		    basicErrorPopup("Oops!", error.message);
		    loadingFunction(false);
		});	
	}
	else {
	  	var name = photoName + ".jpg";
	  	photoToUpload = new Parse.File(name, { base64: imgBase64 });
	  	photoToUpload.save().then(function(img) {
			smallImage = true;
			processfile(selector, photoName, afterFunction, loadingFunction, $(selector)[0].files[0]);
		}, function(error) {
		    basicErrorPopup("Oops!", error.message);
		    loadingFunction(false);
		});	
	}
}