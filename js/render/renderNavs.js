//Create header 
function renderHeader() {
	var header = $("<header/>", {
		"id": "header"
	}).prependTo("#page");
		var ul = $("<ul/>").appendTo(header);
			var headerLogoLi = $("<li/>", {
				"role": "presentation",
				"id": "header_logo"
			}).appendTo(ul);
				var homeLink = $("<a/>", {
					"href": "http://uhangouts.parseapp.com/html/home.html"
				}).appendTo(headerLogoLi);
					var logoDiv = $("<div/>", {
						"id": "hangouts",
						text: "uHangouts"
					}).appendTo(homeLink);
			var openNavLi = $("<li/>", {
				"role": "presentation",
				"class": "pill",
				"id": "openNavigation"
			}).appendTo(ul);
				var navLink = $("<a/>", {
					"href": "#navMenu",
					"id": "menuIcon"
				}).appendTo(openNavLi);
					var navIcon = $("<i/>", {
						"class": "fa fa-navicon fa-lg"
					}).appendTo(navLink);
			var notiLi = $("<li/>", {
				"role": "presentation",
				"class": "pill",
				"id": "notification",
				click: function() { renderNotifications(); }
			}).appendTo(ul);
				var notiLink = $("<a/>", {
					"href": "#notiMenu",
					"id": "bellIcon"
				}).appendTo(notiLi);
					var navIcon = $("<i/>", {
						"class": "fa fa-bell fa-fw"
					}).appendTo(notiLink);
				// var notiCount = $('<div/>', {
				// 	'id': 'notiCount',
				// 	text: '12'
				// }).appendTo(notiLi);
			var accountLink = $("<a/>", {
				"href": "../html/myAccount.html"
			}).appendTo(ul);
				var userHello = $("<li/>", {
					"id": "userHello",
					"role": "presentation",
					"class": "pill"
				}).appendTo(accountLink);
}

function renderNavMenu() {
	var navMenu = $('<nav/>', {
		'id': 'navMenu'
	}).prependTo('#page');
		var mainUl = $('<ul/>').appendTo(navMenu);
			var hangoutPagesLi = $('<li/>').appendTo(mainUl);
				var divider = $('<a/>', {
					"class": "Divider",
					text: " Hangout Pages"
				}).appendTo(hangoutPagesLi);
					var icon = $('<i/>', {
						"class": "fa fa-university fa-fw"
					}).prependTo(divider);
				var hangoutPagesSubUl = $('<ul/>').appendTo(hangoutPagesLi);
					var recentPostLi = $('<li/>').appendTo(hangoutPagesSubUl);
						var recentPostLink = $('<a/>', {
							"href": "../html/home.html",
							text: " Recent Posts"
						}).appendTo(recentPostLi);
							var icon = $('<i/>', {
								"class": "fa fa-clock-o fa-fw"
							}).prependTo(recentPostLink);
					var mostPopularLi = $('<li/>').appendTo(hangoutPagesSubUl);
						var mostPopularLink = $('<a/>', {
							"href": "../html/mostPopular.html",
							text: " Most Popular"
						}).appendTo(mostPopularLi);
							var icon = $('<i/>', {
								"class": "fa fa-users fa-fw"
							}).prependTo(mostPopularLink);
					var hangoutsCalendarLi = $('<li/>').appendTo(hangoutPagesSubUl);
						var hangoutsCalendarLink = $('<a/>', {
							"href": "../html/hangoutsCalendar.html",
							text: " Hangouts Calendar"
						}).appendTo(hangoutsCalendarLi);
							var icon = $('<i/>', {
								"class": "fa fa-calendar fa-fw"
							}).prependTo(hangoutsCalendarLink);
					var followingLi = $('<li/>').appendTo(hangoutPagesSubUl);
						var followingLink = $('<a/>', {
							"href": "../html/following.html",
							text: " Following"
						}).appendTo(followingLi);
							var icon = $('<i/>', {
								"class": "fa fa-user-plus fa-fw"
							}).prependTo(followingLink);
					var myHangoutsLi = $('<li/>').appendTo(hangoutPagesSubUl);
						var myHangoutsLink = $('<a/>', {
							"href": "../html/myHangouts.html",
							text: " My Hangouts"
						}).appendTo(myHangoutsLi);
							var icon = $('<i/>', {
								"class": "fa fa-user fa-fw"
							}).prependTo(myHangoutsLink);
					var joinedHangoutsLi = $('<li/>').appendTo(hangoutPagesSubUl);
						var joinedHangoutsLink = $('<a/>', {
							"href": "../html/joinedHangouts.html",
							text: " Joined Hangouts"
						}).appendTo(joinedHangoutsLi);
							var icon = $('<i/>', {
								"class": "fa fa-check-square fa-fw"
							}).prependTo(joinedHangoutsLink);
			var aboutLi = $('<li/>').appendTo(mainUl);
				var aboutLink = $('<a/>', {
					'href': "../html/about.html",
					text: " About"
				}).appendTo(aboutLi);
					var icon = $('<i/>', {
						'class': 'fa fa-info-circle fa-fw'
					}).prependTo(aboutLink);
			var contactLi = $('<li/>').appendTo(mainUl);
				var contactLink = $('<a/>', {
					'href': "../html/contact.html",
					text: " Contact"
				}).appendTo(contactLi);
					var icon = $('<i/>', {
						'class': 'fa fa-envelope-o fa-fw'
					}).prependTo(contactLink);
			var myAccountLi = $('<li/>').appendTo(mainUl);
				var myAccountLink = $('<a/>', {
					'href': "../html/myAccount.html",
					text: " My Account"
				}).appendTo(myAccountLi);
					var icon = $('<i/>', {
						'class': 'fa fa-user fa-fw'
					}).prependTo(myAccountLink);
			var settingsLi = $('<li/>').appendTo(mainUl);
				var settingsLink = $('<a/>', {
					'href': "../html/settings.html",
					text: " Settings"
				}).appendTo(settingsLi);
					var icon = $('<i/>', {
						'class': 'fa fa-gear fa-fw'
					}).prependTo(settingsLink);
			var moderatorToolsLi = $('<li/>').appendTo(mainUl);
				var divider = $('<a/>', {
					"class": "Divider",
					text: " Moderator Tools"
				}).appendTo(moderatorToolsLi);
					var icon = $('<i/>', {
						"class": "fa fa-wrench fa-fw"
					}).prependTo(divider);
				var moderatorToolsSubUl = $('<ul/>').appendTo(moderatorToolsLi);
					var reportedPostLi = $('<li/>').appendTo(moderatorToolsSubUl);
						var reportedPostLink = $('<a/>', {
							"href": "../html/reportedPost.html",
							text: " Reported Posts"
						}).appendTo(reportedPostLi);
							var icon = $('<i/>', {
								"class": "fa fa-thumbs-down fa-fw"
							}).prependTo(reportedPostLink);
					var reportedPostArchiveLi = $('<li/>').appendTo(moderatorToolsSubUl);
						var reportedPostArchiveLink = $('<a/>', {
							"href": "../html/reportedPostArchive.html",
							text: " Reported Posts Archive"
						}).appendTo(reportedPostArchiveLi);
							var icon = $('<i/>', {
								"class": "fa fa-archive fa-fw"
							}).prependTo(reportedPostArchiveLink);
					var suspendedUserPostLi = $('<li/>').appendTo(moderatorToolsSubUl);
						var suspendedUserPostnk = $('<a/>', {
							"href": "../html/suspendedUserPost.html",
							text: " Suspended User Posts"
						}).appendTo(suspendedUserPostLi);
							var iconSpan = $('<span/>', {
								'class': 'fa-stack fa-fw'
							}).prependTo(suspendedUserPostnk);
								var icon = $('<i/>', {
									"class": "fa fa-user fa-stack-1x"
								}).appendTo(iconSpan);
								var icon = $('<i/>', {
									"class": "fa fa-ban fa-stack-2x"
								}).appendTo(iconSpan);
					var announcementsLi = $('<li/>').appendTo(moderatorToolsSubUl);
						var announcementsLink = $('<a/>', {
							"href": "../html/announcements.html",
							text: " Announcements"
						}).appendTo(announcementsLi);
							var icon = $('<i/>', {
								"class": "fa fa-bullhorn fa-fw"
							}).prependTo(announcementsLink);
			var moreLi = $('<li/>').appendTo(mainUl);
				var divider = $('<a/>', {
					'class': 'Divider',
					text: 'More'
				}).appendTo(moreLi);
				var moreSubUl = $('<ul/>').appendTo(moreLi);
					var termsLi = $('<li/>').appendTo(moreSubUl);
						var termsLink = $('<a/>', {
							"href": "../html/terms.html",
							text: "Terms and Conditions"
						}).appendTo(termsLi);
					var justForFunLi = $('<li/>').appendTo(moreSubUl);
						var justForFunLink = $('<a/>', {
							"href": "../html/justForFun.html",
							text: " Just for Fun"
						}).appendTo(justForFunLi);	
			var signOutLi = $('<li/>',{
				'id': 'signOutButton'
			}).appendTo(mainUl);
				var signOutLink = $('<a/>', {
					'href': "#",
					text: " Sign Out"
				}).appendTo(signOutLi);
					var icon = $('<i/>', {
						'class': 'fa fa-sign-out fa-fw'
					}).prependTo(signOutLink);		
}

function renderNotiMenu() {
	var notiMenu = $('<nav/>', {
		'id': 'notiMenu'
	}).prependTo('#page');
		var mainUl = $('<ul/>').appendTo(notiMenu);
}

function renderSelectionMenu() {
	var selectionDiv = $('<div/>', {
		'id': 'selectionDiv'
	}).appendTo('#wrapper');
		var selectionMenuUl = $('<div/>', {
			'id': 'selectionMenu'
		}).appendTo(selectionDiv);
			var recentPostLi = $('<li/>').appendTo(selectionMenuUl);
				var recentPostLink = $('<a/>', {
					"href": "../html/home.html",
					text: " Recent Posts"
				}).appendTo(recentPostLi);
					var icon = $('<i/>', {
						"class": "fa fa-clock-o fa-fw"
					}).prependTo(recentPostLink);
				var mostPopularLi = $('<li/>').appendTo(selectionMenuUl);
					var mostPopularLink = $('<a/>', {
						"href": "../html/mostPopular.html",
						text: " Most Popular"
					}).appendTo(mostPopularLi);
						var icon = $('<i/>', {
							"class": "fa fa-users fa-fw"
						}).prependTo(mostPopularLink);
				var hangoutsCalendarLi = $('<li/>').appendTo(selectionMenuUl);
					var hangoutsCalendarLink = $('<a/>', {
						"href": "../html/hangoutsCalendar.html",
						text: " Hangouts Calendar"
					}).appendTo(hangoutsCalendarLi);
						var icon = $('<i/>', {
							"class": "fa fa-calendar fa-fw"
						}).prependTo(hangoutsCalendarLink);
				var followingLi = $('<li/>').appendTo(selectionMenuUl);
					var followingLink = $('<a/>', {
						"href": "../html/following.html",
						text: " Following"
					}).appendTo(followingLi);
						var icon = $('<i/>', {
							"class": "fa fa-user-plus fa-fw"
						}).prependTo(followingLink);
				var myHangoutsLi = $('<li/>').appendTo(selectionMenuUl);
					var myHangoutsLink = $('<a/>', {
						"href": "../html/myHangouts.html",
						text: " My Hangouts"
					}).appendTo(myHangoutsLi);
						var icon = $('<i/>', {
							"class": "fa fa-user fa-fw"
						}).prependTo(myHangoutsLink);
				var joinedHangoutsLi = $('<li/>').appendTo(selectionMenuUl);
					var joinedHangoutsLink = $('<a/>', {
						"href": "../html/joinedHangouts.html",
						text: " Joined Hangouts"
					}).appendTo(joinedHangoutsLi);
						var icon = $('<i/>', {
							"class": "fa fa-check-square fa-fw"
						}).prependTo(joinedHangoutsLink);
}

function renderPageTitle(titleName) {
	var title = $('<h1/>', {
		text: titleName
	}).prependTo('#feedDiv');
}

function renderAnnouncement(object) {
	var li = $("<li/>").appendTo($("#announcements"));
		var titleA = $("<div/>", {
			"class": "titleA",
			text: object.get("title")
		}).appendTo(li);	
		var detailsA = $("<div/>", {
			"class": "detailsA",
			text: object.get("details")
		}).appendTo(li);	
}

function getUrl(photo) { //Takes care of times when the photo is an object instead of file
	if (photo.url.toString().indexOf("http") > -1) {
		return photo.url;			
	}
	else {
		return photo.url();		
	} 	
}

					//string,   int,   int,    null int
function bobbleElement(selector, times, degrees, count) { //6 times and 25 degrees are good numbers
	if (count < times || count == null) {
		if (count == null) count = 0;
		if (count % 2) rotate = 'rotate(-' + degrees.toString() + 'deg)';
		else rotate = 'rotate(' + degrees.toString() + 'deg)';
		if (count === times - 1) rotate = 'rotate(0deg)';
		$(selector).css({
			'transition': 'all 200ms linear',
			'-webkit-transform': rotate,
			'-moz-transform': rotate,
			'-o-transform': rotate,
			'-ms-transform': rotate,
			'transform': rotate
		}); 
		window.setTimeout( function() { bobbleElement(selector, times, degrees, count + 1) }, 200);
	}
	else 
		$(selector).css({
			'transition': 'none'
		});
}

function renderNotifications(notificationList) {
	$("#notiMenu ul").empty();
	var query = new Parse.Query(Notification);
	query.equalTo('userIdLink', currentUser.id);
	query.descending("createdAt");
	query.include("hangout");
	query.include("hangoutData");
	query.include("userData");
	query.include("userModData");
	query.include("suspendedPost");
	query.find({
		success: function(notificationList) {
			//Set width of content with photo
			var notiMenuWidth = $("#notiMenu").css("width");
			var pWidth = parseInt(notiMenuWidth.substring(0, notiMenuWidth.length - 2)) - 90;
			pWidthString = pWidth.toString() + "px";

			notificationList.forEach(function(notification){
				var type = notification.get('type');
			 	var hangout = notification.get("hangout");
			 	var hangoutData = notification.get("hangoutData");
			 	var userData = notification.get("userData");
			 	var userModData = notification.get("userModData");
			 	var suspendedPost = notification.get("suspendedPost");
				var notiLi = $('<li/>').appendTo($("#notiMenu ul"));
				if (notification.get("viewed") !== true) {
					notiLi.addClass("newNoti"); 
					notification.set("viewed", true);
					notification.save();
					$("#bellIcon").css("color", "#eee");
				}
				try	{
					if (type === "Hangout Edit") {
						var message = $('<p/>', {
							text: " hangout has been edited."
						}).appendTo(notiLi);
							var hangoutDataId = hangoutData.id;
							var hangoutLink = $('<a/>', {
								text: '"' + hangout.get("Activity") + '"',
								click: function() { showHangoutF(hangoutDataId); }
							}).prependTo(message);
					}
					else if (type === "Hangout Joined") {
						var messageText = "";
						var joinedCount = hangoutData.get("joinedCount");
						if (joinedCount <= 1) 
							messageText = " joined your hangout "
						else if (joinedCount === 2)
							messageText = " and 1 other have joined your hangout "
						else if (joinedCount > 2)
							messageText = " and " + joinedCount.toString() + " others have joined your hangout "
						var message = $('<p/>', {
							text: messageText
						}).appendTo(notiLi).css("max-width", pWidthString);
							var userDataId = userData.id;
							var userDataLink = $('<a/>', {
								text: userModData.get("username"),
								click: function() { showUser(userDataId); }
							}).prependTo(message);
							var userPhotoURL;
							if (userModData.get('userPhotoMini') != null)
								userPhotoURL = getUrl(userModData.get('userPhotoMini'));
							else 
								userPhotoURL = defaultUserIconPath;
							var userPhoto = $('<img/>', {
								'src': userPhotoURL
							}).prependTo(notiLi);
							var hangoutDataId = hangoutData.id;
							var hangoutLink = $('<a/>', {
								text: '"' + hangout.get("Activity") + '"',
								click: function() { showHangoutF(hangoutDataId); }
							}).appendTo(message);
					}
					else if (type === "Hangout Upcoming") {
						var today = new Date();
						var hoursTillStart = Math.round((hangout.get("start").getTime() - today.getTime()) / 36e5);
						var hoursTillEnd = Math.round((hangout.get("end").getTime() - today.getTime()) / 36e5);
						console.log(hangout.get("start"));
						console.log(today);	
						var messageText;	
						if (hoursTillStart > 0) 
							messageText = " starts in " + hoursTillStart + " hours.";
						else if (hoursTillEnd > 0)
							messageText = " is going on now.";
						else 
							messageText = " has ended.";
						var message = $('<p/>', {
							text: messageText
						}).appendTo(notiLi).css("max-width", pWidthString);
							var hangoutDataId = hangoutData.id;
							var hangoutLink = $('<a/>', {
								text: '"' + hangout.get("Activity") + '"',
								click: function() { showHangoutF(hangoutDataId); }
							}).prependTo(message);
					}
					else if (type === "Hangout Deleted") {
						var message = $('<p/>', {
							text: '"' + notification.get("nameOfDeleted") + "\" hangout has been deleted."
						}).appendTo(notiLi);
					}
					else if (type === "User Follower") {
						var message = $('<p/>', {
							text: " started following you."
						}).appendTo(notiLi).css("max-width", pWidthString);
							var userDataId = userData.id;
							var userDataLink = $('<a/>', {
								text: userModData.get("username"),
								click: function() { showUser(userDataId); }
							}).prependTo(message);
							var userPhotoURL;
							if (userModData.get('userPhotoMini') != null)
								userPhotoURL = getUrl(userModData.get('userPhotoMini'));
							else 
								userPhotoURL = defaultUserIconPath;
							var userPhoto = $('<img/>', {
								'src': userPhotoURL
							}).prependTo(notiLi);
					}
				}
				catch(error) {
					notiLi.remove();
					console.log(error);
					// notification.destroy(); ????? change a bit
				}
			});
		},
		error: function(error) {
			basicOopsPopup();
		}
	});
}

function showHangoutF(hangoutDataId) {
	var query = new Parse.Query(HangoutData);
	query.equalTo("objectId", hangoutDataId);
	query.include("Hangout");
	query.include("HostData");
	query.include("HostModData");
	query.first({
		success: function(hangoutData) {
			if (hangoutData == null) 
				basicOopsPopup();
			else {
				renderHangout(hangoutData, false);
				$.magnificPopup.open({
				  items: {
				    src: postDiv, 
				    type: 'inline'
				  }
				});	
				addImageLinkPopups();
			}
		},
		error: function() {

		}
	});	
}

function showUser(userDataId) {
	var query = new Parse.Query(UserData);
	query.equalTo("objectId", userDataId);
	query.include("userModData");
    query.first({
    	success: function(userData) {
			loadingSpinner();
			var mainDiv = $('<div/>', {
    			'id': 'joinedUsersDiv',
    			'class': 'white-popup'
    		});
    		//Append user
			var userDiv;
			try {
				userDiv = $('<div/>').appendTo(mainDiv);
    				var imgSrc;
    				if (userData.get("userModData") == null || userData.get("userModData").get("userPhotoMini") == null)
    					imgSrc = defaultUserIconPath;
    				else 
    					imgSrc = getUrl(userData.get("userModData").get("userPhotoMini"));		    					
    				var userPhoto = $('<img/>', {
    					src: imgSrc
    				}).appendTo(userDiv);
	    			var username = $('<p/>', {
	    				text: userData.get("userModData").get("username")
	    			}).appendTo(userDiv);
			}
			catch(error) {
				console.log(error);
				userDiv.remove();
				basicOopsPopup();
			}
	    	//Open popup
    		hideOverlay();
    		$.magnificPopup.open({
			  items: {
			  	tLoading: 'Loading...',
			    src: mainDiv, 
			    type: 'inline'
			  }
			});
    	},
    	error: function(error) {
    		console.log("Error retrieving joined users: ", error);
    	}
    });
} 

////////////////////Not finished modifying
									//skip amount is optional
function showFollowingF(e, hangoutDataId, skipAmount) { 
	getRelations();
	if (skipAmount == null) skipAmount = 0;
    var query = new Parse.Query(HangoutData);
    query.equalTo("objectId", hangoutDataId);
    query.first({ 
    	success: function(hangoutData) {
    		var query = hangoutData.relation("joinedUsers").query();
    		query.include("userModData");
    		query.skip(skipAmount);
    		query.limit(userSearchFor);
		    query.find({
		    	success: function(joinedUsers) {
		    		var mainDiv, usersContainer;
		    		//Add Popup body
		    		if (skipAmount === 0) { 
		    			loadingSpinner();
		    			mainDiv = $('<div/>', {
			    			'id': 'joinedUsersDiv',
			    			'class': 'white-popup'
			    		});
			    			var title = $('<h3/>', {
			    				text: 'Currently Joined'
			    			}).appendTo(mainDiv);
				    		var popupHeight = (screen.height * 0.75).toString();
			    			usersContainer = $('<div/>', {
			    				'id': 'usersContainer',
			    				'style': 'max-height: ' + popupHeight + 'px;'
			    			}).appendTo(mainDiv);
		    		}
		    		else {
		    			usersContainer = $("#usersContainer");
		    		}
		    		//Append joined users
		    		for (var i = 0; i < joinedUsers.length; i++) { 
		    			var joinedDiv;
		    			try {
		    				joinedDiv = $('<div/>').appendTo(usersContainer);
			    				var imgSrc;
			    				if (joinedUsers[i].get("userModData") == null || joinedUsers[i].get("userModData").get("userPhotoMini") == null)
			    					imgSrc = defaultUserIconPath;
			    				else 
			    					imgSrc = getUrl(joinedUsers[i].get("userModData").get("userPhotoMini"));		    					
			    				var userPhoto = $('<img/>', {
			    					src: imgSrc
			    				}).appendTo(joinedDiv);
				    			var username = $('<p/>', {
				    				text: joinedUsers[i].get("userModData").get("username")
				    			}).appendTo(joinedDiv);
		    			}
		    			catch(error) {
		    				joinedDiv.remove();
		    				console.log(error);
		    			}
		    				
		    		}
		    		//If no one has joined
		    		if (joinedUsers.length === 0 && skipAmount === 0) {
		    			var joinedDiv = $('<div/>').appendTo(usersContainer);
			    			var message = $('<p/>', {
			    				text: 'You could be the first to join!'
			    			}).appendTo(joinedDiv);
			    	}
			    	//If there are probably more people joined than shown
			    	else if (joinedUsers.length === userSearchFor) {
			    		var newSkipAmount = skipAmount + userSearchFor;
			    		var moreJoined = $('<div/>', {
			    			'class': 'showMore',
			    			text: 'See More',
			    			click: function(e) { 
			    				showJoinedF(e, hangoutDataId, newSkipAmount);
			    				var $clicked = $('#joinedUsersDiv').find(e.target);
			    				$clicked.remove();
			    			}
			    		}).appendTo(usersContainer);
			    	}
			    	//Open popup
			    	if (skipAmount === 0) {
			    		hideOverlay();
			    		$.magnificPopup.open({
						  items: {
						  	tLoading: 'Loading...',
						    src: mainDiv, 
						    type: 'inline'
						  }
						});
			    	}
		    	},
		    	error: function(error) {
		    		console.log("Error retrieving joined users: ", error);
		    	}
		    });
    	},
    	error: function(error) {
    		console.log("Error retrieving post joined data: ", error);
    	}
    });
}


$(document).ready(function() {
	renderHeader();
	renderNavMenu();
	renderNotiMenu();
	renderSelectionMenu();

	///////////////////////////////////
	// Sign Out
	$('#signOutButton').click(signOut);

    $("#header").sticky({topSpacing:0});

	///////////////////////////////////
	// Navigation
    $("#navMenu").mmenu({
       "slidingSubmenus": false,
       "extensions": [
          // "effect-zoom-panels",
          "iconbar",
          "pageshadow",
          "theme-dark"
       ],
       "offCanvas": {
          "position": "right",
          "zposition": "front"
       },
       // "autoHeight": true,
       // "counters": true,
       "navbar": {
          "title": "uHangouts"
       },
       "navbars": [
          {
             "position": "top",
             "content": ["title", "close"]
          },
          {
             "position": "bottom",
             "content": [
                "<a class='fa fa-envelope-o' href='#/'></a>",
                "<a class='fa fa-twitter' href='#/'></a>",
                "<a class='fa fa-facebook' href='#/'></a>"
             ]
          }
       ]
    });

    var navAPI = $('#navMenu').data("mmenu");

	$("#openNavigation").click(function() {
		navAPI.open();
	});

	///////////////////////////////////
	// Notifications
	var notiPosition = "right";
	if ($("#page").width() <= 500)
		notiPosition = "bottom";

    $("#notiMenu").mmenu({
       "extensions": [
          "border-full",
          "effect-slide-panels-0",
          "theme-light"
       ],
       "offCanvas": {
          "position": notiPosition,
          "zposition": "front"
       },
       "counters": true,
       "navbar": {
          "title": "Notifications"
       },
       "navbars": [
          {
             "position": "top",
             "content": [
                "prev",
                "title",
                "close"
             ]
          }
       ]
    });

	var notiAPI = $('#notiMenu').data("mmenu");

	$("#notification").click(function() {
		notiAPI.open();
	});

});
