var namesLength;
var pageWidth;
var pageHeight;

function workTheMagicNames() {
	for (var i = 0; i < namesLength; i++){
		var top = Math.random() * pageHeight;
		var left = Math.random() * pageWidth;
		var id = "#name" + i;
		$(id).animate({
			left: left,
			top: top
		}, 2999);
	}
}

function workTheMagicColor() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);
	var color = "rgb(" + r + ", " + g + ", " + b + ")";
	$("body").css({
		transition: "background 3s linear",
		"background-color": color
	});
	$("html").css({
		transition: "background 3s linear",
		"background-color": color
	});
}

function workTheMagicExplosion() {
	$(this).css("color", "red").addClass("fa-spin").animate({
		left: pageWidth / 2,
		top: -1000
	}, 2000).delay(2000).fadeOut(100);
}


$(document).ready(function() {
	pageWidth = $("#page").width();
	pageHeight = $(document).height();
	console.log(pageHeight);
	console.log(pageWidth);
	Parse.Cloud.run('getUsernames', { }, {
	  success: function(userNameList) {
  		userNameList.push(currentUser.get("username"));
		for (var i = 0; i < userNameList.length; i++){
			var top = Math.random() * pageHeight;
			var left = Math.random() * pageWidth;
			$("#wrapper").append('<p id ="name' + i + '" class="crazyNames" style="left: ' + left + 'px; top: ' + top + 'px">' + userNameList[i] + '</p>');
		}
		namesLength = userNameList.length;
		workTheMagicNames();
		workTheMagicColor()
		setInterval(workTheMagicNames, 3000);
		setInterval(workTheMagicColor, 7000);
		$("#page").delegate(".crazyNames", "click", workTheMagicExplosion);
	  },
	  error: function(error) { }
	});
});	