//Navbar Toggle
 function classToggle() {
    const navs = document.querySelectorAll('.navbarItems')

    navs.forEach(nav => nav.classList.toggle('navbarToggleShow2'));
}

document.querySelector('.navbarToggle2').addEventListener('click', classToggle);

//Slideshow
var slideshows = document.querySelectorAll('[data-component="slideshow"]');
slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {

	var slides = document.querySelectorAll(`#${slideshow.id} [role="list"] .slide`);

	var index = 0, time = 5000;
	slides[index].classList.add('active');

	setInterval( () => {
		slides[index].classList.remove('active');
		
		index++;
		if (index === slides.length) index = 0;

		slides[index].classList.add('active');

	}, time);
} 