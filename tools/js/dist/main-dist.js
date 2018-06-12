'use strict';

$(document).ready(function () {

	var addPostBtn = $('.header_button button');
	var modal = $('.modal');
	var closeModal = $('.modal .fa-times');
	var deleteBtn = $('article .delete_post');
	var deleteModalBlur = $('.delete_modal_blur');
	var deleteModal = $('.delete_modal');
	var closeModalBtn = $('.delete_modal .fa-times');
	var cancelDeleteModalBtn = $('.delete_modal .delete_modal-cancel');
	var confirmDeleteModalBtn = $('.delete_modal .delete_modal-confirm');
	var cancelToast = $('.cancel_toast');
	var confirmToast = $('.confirm_toast');

	var like = $('.like_rate_wrapper button:first-child');
	var rate = $('.like_rate_wrapper button:last-child');
	var selectLabel = $('.selected');

	var liked = false;
	var rated = false;

	TweenMax.set(modal, { y: '-100%' });
	TweenMax.set(deleteModalBlur, { autoAlpha: 0 });
	TweenMax.set(deleteModal, { autoAlpha: 0, y: -20 });
	TweenMax.set(cancelToast, { autoAlpha: 0, y: 30 });
	TweenMax.set(confirmToast, { autoAlpha: 0, y: 30 });

	var openModalTL = new TimelineMax({ paused: true });
	var deleteModalTL = new TimelineMax({ paused: true });

	deleteModalTL.to(deleteModalBlur, 0.3, {
		autoAlpha: 1,
		ease: Power1.easeInOut
	}).to(deleteModal, 0.4, {
		autoAlpha: 1,
		y: 0
	});

	openModalTL.to(modal, 0.3, {
		y: '0%',
		ease: Power1.easeInOut
	}).staggerFrom($('.modal > *'), 0.4, {
		y: -40
	}, 0.1);

	function openPostModal() {
		openModalTL.play();
	}

	function openDeleteModal() {
		deleteModalTL.play();
	}

	function closeDeleteModal() {
		deleteModalTL.reverse();
	}

	function closePostModal() {
		openModalTL.reverse();
	}

	function cancelDeleteModal() {
		deleteModalTL.reverse();
		TweenMax.to(cancelToast, 0.3, {
			y: 0,
			autoAlpha: 1,
			delay: 0.3
		});
		TweenMax.to(cancelToast, 0.4, {
			y: 30,
			autoAlpha: 0,
			delay: 3
		});
	}

	function confirmDeleteModal() {
		deleteModalTL.reverse();
		TweenMax.to(confirmToast, 0.3, {
			y: 0,
			autoAlpha: 1,
			delay: 0.3
		});
		TweenMax.to(confirmToast, 0.4, {
			y: 30,
			autoAlpha: 0,
			delay: 3
		});
	}

	function likePost() {
		liked = !liked;
		if (liked) {
			$(this).html('\n\t\t\t\t<i class="fa fa-heart"></i>\n\t\t\t\t<label>Liked</label>\n\t\t\t');
		} else {
			$(this).html('\n\t\t\t\t<i class="fa fa-heart-o"></i>\n\t\t\t\t<label>Like</label>\n\t\t\t');
		}
	};

	function ratePost() {
		rated = !rated;
		if (rated) {
			$(this).html('\n\t\t\t\t<i class="fa fa-star"></i>\n\t\t\t\t<label>Rated</label>\n\t\t\t');
		} else {
			$(this).html('\n\t\t\t\t<i class="fa fa-star-o"></i>\n\t\t\t\t<label>Rate</label>\n\t\t\t');
		}
	}

	function toggleDropdown() {
		$('.select_box .dropdown').toggleClass('open');
	}

	function changeSelectedText() {
		var $this = $(this).text();
		$('.selected label').text($this);
		toggleDropdown();
	}

	addPostBtn.on('click', openPostModal);
	closeModal.on('click', closePostModal);
	deleteBtn.on('click', openDeleteModal);
	closeModalBtn.on('click', closeDeleteModal);
	cancelDeleteModalBtn.on('click', cancelDeleteModal);
	confirmDeleteModalBtn.on('click', confirmDeleteModal);
	like.on('click', likePost);
	rate.on('click', ratePost);
	selectLabel.on('click', toggleDropdown);
	$('.dropdown label').on('click', changeSelectedText);
});