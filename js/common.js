$(document).ready(function(){
	//aos
	AOS.init({
		duration: 800,
	});
    
    // img to svg
	document.querySelectorAll('img.svg').forEach(function (img) {
		var imgID = img.id;
		var imgClass = img.className;
		var imgURL = img.src;

		fetch(imgURL).then(function (response) {
			return response.text();
		}).then(function (text) {

			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(text, "text/xml");

			// Get the SVG tag, ignore the rest
			var svg = xmlDoc.getElementsByTagName('svg')[0];

			// Add replaced image's ID to the new SVG
			if (typeof imgID !== 'undefined') {
				svg.setAttribute('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				svg.setAttribute('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			svg.removeAttribute('xmlns:a');

			// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
			if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
				svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
			}

			// Replace image with new SVG
			img.parentNode.replaceChild(svg, img);

		});
	});
	
    //topbtn
	$("#top-btn").on("click",function() {
		$("html,body").stop().animate({
			scrollTop: 0
		})
	});

	//tab
    var tabTitle = $(".side-nav ul li");
    var listBox = $(".content__wrap");

    $(window).on("scroll", function(){
        var scrollTop = $(document).scrollTop();

        listBox.each(function(index){
            var listBoxTop = $(this).offset().top;

			if (index === 0 && scrollTop < listBoxTop - 100) {
				tabTitle.removeClass("is-active");
				return false;
			}

            if(scrollTop >= listBoxTop - 100) {
                tabTitle.removeClass("is-active");
                tabTitle.eq(index).addClass("is-active");
            }
        })
    });

	//textarea
	$('#textBox').keyup(function (e) {
    	let content = $(this).val();

		// 글자수 제한
		if (content.length > 2000) {
			$(this).val(content.substring(0, 2000));
			content = $(this).val();

			alert('글자수는 2,000자까지 입력 가능합니다.');
		}

		$('.text-count').text(content.length.toLocaleString());
	});

	//비디오 재생
	const historyVideo = document.querySelector('.history__video video');
	const historyBtn = document.querySelector('.history__btn');

	historyBtn.addEventListener('click', () => {
		if (historyVideo.paused) {
			historyVideo.play();
			$(".history__video").addClass("is--active");
		} else {
			historyVideo.pause();
			$(".history__video").removeClass("is--active");
		}
	});

	// subject swiper
	var swiper = new Swiper('.title-swiper', {
		slidesPerView: "auto",
		freeMode: true,
		watchSlidesProgress: true,
	});

	var slideCount = document.querySelectorAll('.content-swiper .swiper-slide').length;
	var randomSlide = Math.floor(Math.random() * slideCount);

	var swiper2 = new Swiper('.content-swiper', {
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		initialSlide: randomSlide,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		loop:true,
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// },
		thumbs: {
			swiper: swiper,
		},
	});

})