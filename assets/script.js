//Navbar Toggle
 function classToggle() {
    const navs = document.querySelectorAll('.navbarItems')

    navs.forEach(nav => nav.classList.toggle('navbarToggleShow2'));
}

document.querySelector('.navbarToggle2').addEventListener('click', classToggle);

