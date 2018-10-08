$(function(){
	var $openMenuButton = $('#openMenu');
	var $closeMenuButton = $('#closeMenu');
	var $openRegionButton = $('#openRegionButton');
	var $closeRegionButton = $('#closeRegionButton');
	var $regionConfirmButton = $('#regionConfirmButton');
	var $regionChooseButton = $('.regionChooseButton');
	var $regionCloseButton = $('#closeRegionButton');
	var $scrollTopButton = $('#scrollToTop');
	var $fader = $('.shadow');
	var $nav = $('#jsMenu');
	var $pageRegion = $('#pageRegion');
	var $pageMain = $('.pageMain');
	var $pageModal = $('#pageModal');
	var $regionInput = $('.region-item .input-hidden');
	var $headElem = $('#head');
	var $stickyElem = $('.sticky-note');
	var deviceHeight = $(window).height();
	var	prevScrollPos;
	var firstVisit = localStorage.getItem('firstVisit') ? false : true;
	var currentRegion;

	if (firstVisit) {
		localStorage.setItem('firstVisit', false);
		initFirstVisit();
	}

	function initFirstVisit() {
		$pageMain.hide();
		$pageRegion.show();
		$fader.show();
		$closeRegionButton.hide();
		$pageModal.addClass('show-modal');
		$('body').addClass('oh');
	}

	function openRegion() {
		$pageMain.hide();
		$pageRegion.show();
	}

	function closeRegion(regionName) {
		$pageRegion.hide();
		$pageMain.show();
		closeNav();

		if(regionName) {
			showSticky();
		}
	}

	function chooseRegion() {
		$nav.removeClass('open-state');

		$regionInput.on('change', function(){
			currentRegion = $(this).next('label').find('.region-title').text();

			if (!firstVisit) {
				return false;
			}
			firstVisit = false;
			$regionCloseButton.show();
			closeRegion(currentRegion);
		});
	}

	function scrollToTop() {
		$('html,body').animate({scrollTop: 0}, 500);
	}

	function openNav() {
		$fader.show();
		$nav.addClass('open-state');
		$('body').addClass('oh');
	}

	function closeNav() {
		$fader.hide()
		$nav.removeClass('open-state');
		$('body').removeClass('oh');
	}

	function closeModal() {
		$fader.hide();
		$pageModal.removeClass('show-modal');
		$('body').removeClass('oh');
	}

	function showSticky() {
		$('.sticky-note').addClass('show');
		setTimeout(function(){
			$('.sticky-note').removeClass('show');
		}, 2000)
	}

	$(window).scroll(function() {
  		var currentScrollPos = window.pageYOffset;

  		if (currentScrollPos > deviceHeight) {
  			$scrollTopButton.addClass('show');
  		} else {
  			$scrollTopButton.removeClass('show');
  		}
 		
  		if (prevScrollPos > currentScrollPos) {
    		$headElem.removeClass('hidden');
  		} else {
    		$headElem.addClass('hidden');
  		}
  		prevScrollPos = currentScrollPos;
	});

	$scrollTopButton.on('click', scrollToTop);
	$openMenuButton.on('click', openNav);
	$closeMenuButton.on('click', closeNav);
	$regionChooseButton.on('click', function(){
		closeModal();
		openRegion();
		chooseRegion();
	});
	$regionConfirmButton.on('click', function(){
		closeModal();
		closeRegion(currentRegion);
		$pageMain.show();
		firstVisit = false;
		$regionCloseButton.show();
	});
	$regionCloseButton.on('click', closeRegion);
});
