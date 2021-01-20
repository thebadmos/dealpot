//Navbar Toggle
 function classToggle() {
    const navs = document.querySelectorAll('.navbarItems')

    navs.forEach(nav => nav.classList.toggle('navbarToggleShow2'));
}

document.querySelector('.navbarToggle2').addEventListener('click', classToggle);

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  function openModalBox(){
    var modal = $('.modal, .mask');
  $('.open-modal').on('click', function() {
   modal.fadeIn(300);
  });
  $('.close-modal, .mask').on('click', function() {
   modal.fadeOut(800);
  });
  }
  openModalBox();