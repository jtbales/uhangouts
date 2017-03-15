function renderCreateHangoutOpen() {
	var createHangoutOpen = $('<div/>', {
		'id': "createHangoutOpen",
		'style': 'background-color: #5A3584;',
		click: function(e) { createHangoutOpenF(); } 
	}).prependTo('#feedDiv');
		var title = $('<h2/>', {
			text: 'Create Hangout '
		}).appendTo(createHangoutOpen);
			var icon = $('<i/>', {
				'class': "fa fa-plus fa-fw"
			}).appendTo(title);
}

function renderCreateHangout() {
	var createHangoutDiv = $('<div/>', {
		'id': 'createHangoutDiv'
	}).prependTo('#feedDiv');
		var createHangoutTitle = $('<div/>', {
			'id': 'createHangoutTitle'
		}).appendTo(createHangoutDiv);
			var title = $('<h3/>', {
				text: "Create Hangout "
			}).appendTo(createHangoutTitle);
				var spanHide = $('<span/>', {
					'class': 'hideOnLoad'
				}).appendTo(title);
					var icon = $('<i/>', {
						'class': "fa fa-spinner fa-pulse fa-fw"
					}).appendTo(spanHide);
		var createHangoutTable = $('<table/>', {
			'id': 'createHangoutTable'
		}).appendTo(createHangoutDiv);
			var tbody = $('<tbody/>').appendTo(createHangoutTable);
				var activityTR = $('<tr/>').appendTo(tbody);
					var activityTH = $('<th/>').appendTo(activityTR);
						var activityLabel = $('<label/>', {
							'for': 'activity',
							text: "Activity "
						}).appendTo(activityTH);
							var spanLimit = $('<span/>').appendTo(activityLabel);
					var activityTD = $('<td/>', {
						'class': 'data'
					}).appendTo(activityTR);
						var activityInput = $('<input/>', {
							'id': 'activity',
							'name': 'activity', 
							'type': 'text',
							'class': 'input',
							keyup: function(e) { maxInputCounter(e, 50); }
						}).appendTo(activityTD);
				var detailsTR = $('<tr/>').appendTo(tbody);
					var detailsTH = $('<th/>').appendTo(detailsTR);
						var detailsLabel = $('<label/>', {
							'for': 'details',
							text: "Details "
						}).appendTo(detailsTH);
							var spanLimit = $('<span/>').appendTo(detailsLabel);
					var detailsTD = $('<td/>', {
						'class': 'data'
					}).appendTo(detailsTR);
						var detailsInput = $('<textarea/>', {
							'rows': 3,
							'id': 'details',
							'name': 'details', 
							'type': 'text',
							'class': 'input',
							keyup: function(e) { maxInputCounter(e, 300); }
						}).appendTo(detailsTD);
				var startTR = $('<tr/>').appendTo(tbody); //Start time of Hangout
					var startTH = $('<th/>').appendTo(startTR);
						var startLabel = $('<label/>', {
							'for': 'dateStart',
							text: "Start"
						}).appendTo(startTH);
					var startTD = $('<td/>', {
						'class': 'data'
					}).appendTo(startTR);
						var dateStart = $('<input/>', {
							'id': 'dateStart',
							'name': 'dateStart',
							'type': 'date',
							'class': 'input inlineData',
							change: function() { setEndByStart('#dateStart', '#timeStart', '#dateEnd', '#timeEnd'); }
						}).appendTo(startTD);
						var timeStart = $('<input/>', {
							'id': 'timeStart',
							'name': 'timeStart',
							'type': 'time',
							'class': 'input inlineData',
							change: function() { setEndByStart('#dateStart', '#timeStart', '#dateEnd', '#timeEnd'); }
						}).appendTo(startTD);
				var endTR = $('<tr/>').appendTo(tbody); //End time of Hangout
					var endTH = $('<th/>').appendTo(endTR);
						var endLabel = $('<label/>', {
							'for': 'dateEnd',
							text: 'End'
						}).appendTo(endTH);
					var endTD = $('<td/>', {
						'class': 'data'
					}).appendTo(endTR);
						var dateEnd = $('<input/>', {
							'id': 'dateEnd',
							'name': 'dateEnd',
							'type': 'date',
							'class': 'input inlineData'
						}).appendTo(endTD);
						var timeEnd = $('<input/>', {
							'id': 'timeEnd',
							'name': 'timeEnd',
							'type': 'time',
							'class': 'input inlineData'
						}).appendTo(endTD);
				var locationTR = $('<tr/>').appendTo(tbody);
					var locationTH = $('<th/>').appendTo(locationTR);
						var locationLabel = $('<label/>', {
							'for': 'location',
							text: "Where "
						}).appendTo(locationTH);
							var spanLimit = $('<span/>').appendTo(locationLabel);
					var locationTD = $('<td/>', {
						'class': 'data'
					}).appendTo(locationTR);
						var locationInput = $('<input/>', {
							'id': 'location',
							'name': 'location', 
							'type': 'text',
							'class': 'input',
							keyup: function(e) { maxInputCounter(e, 50); }
						}).appendTo(locationTD);
				var imageTR = $('<tr/>').appendTo(tbody);
					var imageTH = $('<th/>').appendTo(imageTR);
						var imageLabel = $('<label/>', {
							'for': 'image',
							text: "Image"
						}).appendTo(imageTH);
					var imageTD = $('<td/>', {
						'class': 'data'
					}).appendTo(imageTR);
						var imageInput = $('<input/>', {
							'id': 'image',
							'name': 'image',
							'type': 'file',
							'class': 'input',
							'accept': 'image/*'
						}).appendTo(imageTD);
		var createHangoutButtons = $('<div/>', {
			'class': 'createHangoutButtons'
		}).appendTo(createHangoutDiv);
			var createHangoutCancel = $('<button/>', {
				'id': 'createHangoutCancel',
				text: 'Cancel',
				click: function() { createHangoutCancelF(); }
			}).appendTo(createHangoutButtons);
			var createHangoutSubmit = $('<button/>', {
				'id': 'createHangoutSubmit',
				text: 'Create',
				//checkImage(selector, photoName, afterFunction, loadingFunction)
				click: function() { checkImage('input#image', 'hangoutPhoto', postHangout, postLoading); }
			}).appendTo(createHangoutButtons);
			/////////////////TODO: Fix spacing of buttons and  time inputs
}














function renderHangoutCreator() {
	renderCreateHangout();
	renderCreateHangoutOpen();
}

function renderAnnouncementCreator() {

}