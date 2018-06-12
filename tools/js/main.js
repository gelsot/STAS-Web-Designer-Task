$(document).ready(function(){
	
	const addPostBtn = $('.header_button button');
	const modal = $('.modal');
	const closeModal = $('.modal .fa-times');
	const deleteBtn = $('article .delete_post');
	const deleteModalBlur = $('.delete_modal_blur');
	const deleteModal = $('.delete_modal');
	const closeModalBtn = $('.delete_modal .fa-times');
	const cancelDeleteModalBtn = $('.delete_modal .delete_modal-cancel');
	const confirmDeleteModalBtn = $('.delete_modal .delete_modal-confirm');
	const cancelToast = $('.cancel_toast');
	const confirmToast = $('.confirm_toast');

	const like = $('.like_rate_wrapper button:first-child');
	const rate = $('.like_rate_wrapper button:last-child');
	const selectLabel = $('.selected');

	let liked = false;
	let rated = false;

	TweenMax.set(modal, {y: '-100%'});
	TweenMax.set(deleteModalBlur, {autoAlpha: 0});
	TweenMax.set(deleteModal, {autoAlpha: 0, y: -20});
	TweenMax.set(cancelToast, {autoAlpha: 0, y: 30});
	TweenMax.set(confirmToast, {autoAlpha: 0, y: 30});

	const openModalTL = new TimelineMax({paused: true});
	const deleteModalTL = new TimelineMax({paused: true});

	deleteModalTL
		.to(deleteModalBlur, 0.3, {
			autoAlpha: 1,
			ease: Power1.easeInOut
		})
		.to(deleteModal, 0.4, {
			autoAlpha: 1,
			y: 0
		})

	openModalTL
		.to(modal, 0.3, {
			y: '0%',
			ease: Power1.easeInOut
		})
		.staggerFrom($('.modal > *'), 0.4, {
			y: -40
		}, 0.1)


	function openPostModal(){
		openModalTL.play();
	}

	function openDeleteModal(){
		deleteModalTL.play();
	}

	function closeDeleteModal(){
		deleteModalTL.reverse();
	}

	function closePostModal(){
		openModalTL.reverse();
	}

	function cancelDeleteModal(){
		deleteModalTL.reverse();
		TweenMax.to(cancelToast, 0.3, {
			y: 0,
			autoAlpha: 1,
			delay: 0.3
		})
		TweenMax.to(cancelToast, 0.4, {
			y: 30,
			autoAlpha: 0,
			delay: 3
		})
	}

	function confirmDeleteModal(){
		deleteModalTL.reverse();
		TweenMax.to(confirmToast, 0.3, {
			y: 0,
			autoAlpha: 1,
			delay: 0.3
		})
		TweenMax.to(confirmToast, 0.4, {
			y: 30,
			autoAlpha: 0,
			delay: 3
		})
	}

	function likePost() {
		liked = !liked;
		if(liked) {
			$(this).html(`
				<i class="fa fa-heart"></i>
				<label>Liked</label>
			`);
		} else {
			$(this).html(`
				<i class="fa fa-heart-o"></i>
				<label>Like</label>
			`);
		}
		
	};

	function ratePost() {
		rated = !rated
		if(rated) {
			$(this).html(`
				<i class="fa fa-star"></i>
				<label>Rated</label>
			`)
		} else {
			$(this).html(`
				<i class="fa fa-star-o"></i>
				<label>Rate</label>
			`)
		}
		
	}

	function toggleDropdown() {
		$('.select_box .dropdown').toggleClass('open');
	}

	function changeSelectedText() {
		let $this = $(this).text();
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
	$('.dropdown label').on('click', changeSelectedText)
});