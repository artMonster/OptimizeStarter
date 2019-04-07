$(window).on('load', function() {
	var t = 150;
	window.setTimeout(function() {
		$('html').addClass('load');
	}, t);
});

$(document).ready(function() {
	$('iframe.youtube').each(function() {
		var w = +$(this).width();
		var h = w/1.5 - 30;
		$(this).closest('.video-wrap').css('height', h);
	});
});

$(document).on('click', '.popup-modal-dismiss', function (e) {
	e.preventDefault();
	$.magnificPopup.close();
});

$(document).on('click', '[data-href]', function (e) {
	e.preventDefault();
	var target = $(this).data('href');
	var goto = $(target);
	$('html, body').animate({
		scrollTop: goto.offset().top + 5
	}, 800);
});