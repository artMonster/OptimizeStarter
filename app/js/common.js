$(window).on('load', function() {
	var t = 150;
	window.setTimeout(function() {
		$('html').addClass('load');
	}, t);
});

$(document).ready(function() {

	$('.popup-terms').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		midClick: true,
		mainClass: 'mfp-zoom',
	});



    var myPlayer;
    jQuery(function(){

        myPlayer = jQuery("#P1").YTPlayer();
        $('#hypercomments_widget').css('height',$('.YTPOverlay').height());

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