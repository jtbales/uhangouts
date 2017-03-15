var attempts = 0;
var currentUserModData;
function showAccountData() {
	var query = new Parse.Query(User);
	query.equalTo("objectId", currentUser.id);
	query.include("Data");
	query.include("modData");
	query.first({
		success: function(user) {
			currentUserModData = user.get("modData");
			renderUserAccountData(user, user.get("Data"), user.get("modData"));
			hideOverlay();
		},
		error: function(user, error) {
			if (attempts = 0) 
				showAccountData();
			else 
				basicErrorPopup("Darn Error", error.message);
		}
	});
}

function renderUserAccountData(user, userData, modData) {
	var photoDiv = $('<div/>', {
		'class': 'section'
	}).appendTo('#mainDiv');
		var dataNameDiv = $('<div/>', {
			'class': 'dataName'
		}).appendTo(photoDiv);
			var dataNameLabel = $('<label/>', {
				'for': 'imageInput',
				text: 'Photo'
			}).appendTo(dataNameDiv);
		var dataContent = $('<div/>', {
			'class': 'dataContent',
			'style': 'cursor: pointer;'
		}).appendTo(photoDiv);
			if (modData.get('userPhotoMini') == null) {
				var photoImg = $('<img/>', {
					'src': "../img/userIcon.png"
				}).appendTo(dataContent);
			}
			else {
				var photoImg = $('<img/>', {
					'src': modData.get('userPhotoMini').url()
				}).appendTo(dataContent);
			}
				var imgInput = $('<input/>', {
					'id': 'imageInput',
					'type': 'file',
					'accept': 'image/*'
				}).appendTo(dataContent).bind('change', function() { 
						checkImage('#imageInput', 'userPhoto', changeUserPhoto, loadingUserPhoto); 
						squareImage = true; 
					});
	var userNameDiv = $('<div/>', {
		'class': 'section'
	}).appendTo('#mainDiv');
		var dataNameDiv = $('<div/>', {
			'class': 'dataName'
		}).appendTo(userNameDiv);
			var dataNameLabel = $('<label/>', {
				'for': 'username',
				text: 'Username'
			}).appendTo(dataNameDiv);
		var dataContent = $('<div/>', {
			'class': 'dataContent'
		}).appendTo(userNameDiv);
			var content = $('<input/>', {
				'id': 'username',
				'val': user.get('username'),
				keydown: function(e) { changeUsername(e); }
			}).appendTo(dataContent);
	var universityDiv = $('<div/>', {
		'class': 'section'
	}).appendTo('#mainDiv');
		var dataNameDiv = $('<div/>', {
			'class': 'dataName'
		}).appendTo(universityDiv);
			var dataNameLabel = $('<label/>', {
				text: 'University'
			}).appendTo(dataNameDiv);
		var dataContent = $('<div/>', {
			'class': 'dataContent'
		}).appendTo(universityDiv);
			var content = $('<p/>', {
				text: userData.get('universityDomain')
			}).appendTo(dataContent);
	var emailDiv = $('<div/>', {
		'class': 'section'
	}).appendTo('#mainDiv');
		var dataNameDiv = $('<div/>', {
			'class': 'dataName'
		}).appendTo(emailDiv);
			var dataNameLabel = $('<label/>', {
				text: 'Email'
			}).appendTo(dataNameDiv);
		var dataContent = $('<div/>', {
			'class': 'dataContent'
		}).appendTo(emailDiv);
			var content = $('<p/>', {
				text: user.get('email')
			}).appendTo(dataContent);
	var joinDateDiv = $('<div/>', {
		'class': 'section'
	}).appendTo('#mainDiv');
		var dataNameDiv = $('<div/>', {
			'class': 'dataName'
		}).appendTo(joinDateDiv);
			var dataNameLabel = $('<label/>', {
				text: 'Join Date'
			}).appendTo(dataNameDiv);
		var dataContent = $('<div/>', {
			'class': 'dataContent'
		}).appendTo(joinDateDiv);
			var content = $('<p/>', {
				text: user.createdAt.toDateString()
			}).appendTo(dataContent);
	if (userData.get('suspended') === true) {
		var suspendedDiv = $('<div/>', {
			'class': 'section'
		}).appendTo('#mainDiv');
			var dataNameDiv = $('<div/>', {
				'class': 'dataName'
			}).appendTo(suspendedDiv);
				var dataNameLabel = $('<label/>', {
					text: 'Suspended'
				}).appendTo(dataNameDiv);
			var dataContent = $('<div/>', {
				'class': 'dataContent'
			}).appendTo(suspendedDiv);
				var content = $('<p/>', {
					text: userData.get('suspendedReason')
				}).appendTo(dataContent);		
	}
}

function changeUsername(e) {
	if (e.keyCode === 13 && e.shiftKey === false && e.target.value.trim() !== currentUser.attributes.username) {
		var query = new Parse.Query(User);
		query.equalTo("objectId", currentUser.id);
		query.include("modData");
		query.first({
			success: function(user) {
				var userModData = user.get("modData");
				userModData.set('username', e.target.value);
				userModData.save(null, {
					success: function(user) {
						basicSuccessPopup("Changed!", "Your new username is " + userModData.get("username"));
						$('#userHello').text("Hello " + userModData.get("username") + "!");
						currentUser.attributes.username = e.target.value;
					}, 
					error: function(user, error) {
						basicErrorPopup("Error", error.message);
					}
				});
			},
			error: function(user, error) {
				basicOopsPopup();
			}
		});
	}
}

function changeUserPhoto() {
	currentUserModData.set('userPhoto', photoToUpload);
	currentUserModData.set('userPhotoMini', photoToUploadMini);
	currentUserModData.save({
		success: function(changedModData) {
			$('.dataContent img').attr('src', changedModData.get("userPhotoMini").url());
			hideOverlay();
		}, 
		error: function(changedModData, error) {
			basicErrorPopup("Error", error.message);
			hideOverlay();
		}
	});
}

function loadingUserPhoto(loading) {
	loadingSpinner();
}












function runMainFunction() {
	showAccountData();
}

$(document).ready(function(){

	renderPageTitle("My Account");

});