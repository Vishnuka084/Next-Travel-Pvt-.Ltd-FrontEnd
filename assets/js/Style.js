AOS.init({
    duration: 3000
});//init AOS

$(document).ready(() => {
    setTimeout(() => {
        $('#pre-loarder').css({display: "none"});
    }, 1000)

});

window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0)
})

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
menu.onclick = () => {
    menu.classList.toggle('bx-x');

    navlist.classList.toggle('active');
}

/*Swiper*/
let swiper = new Swiper(".main_container", {
    loop: true,
    spaceBetween: 24,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: -50,
        },
        450: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 50,
        },
    },
});