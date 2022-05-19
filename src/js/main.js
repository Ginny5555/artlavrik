import Swiper, { Pagination } from 'swiper';
import 'animate.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { elementScrollIntoView } from "seamless-scroll-polyfill";


// TEAM SLIDER
new Swiper(".team__slider .swiper", {
    modules: [Pagination],
    slidesPerView: 'auto',
    spaceBetween: 9,
    breakpoints: {
        768: {
            spaceBetween: 20
        },
        1280: {
            spaceBetween: 30
        },
    },
    pagination: {
        el: '.team__slider .swiper-pagination',
    },
})

// SERVICES SLIDER
const servicesSliderBreakpoint = window.matchMedia('(min-width: 960px)');
let servicesSliderInstance;
const enableServicesSlider = () => {
    servicesSliderInstance = new Swiper(".services__wrapper .swiper", {
        modules: [Pagination],
        slidesPerView: 'auto',
        spaceBetween: 9,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        },
        pagination: {
            el: '.services__wrapper .swiper-pagination',
        },
    })
}

const servicesSlider = () => {
    if(servicesSliderBreakpoint.matches){
        if(servicesSliderInstance !== undefined) servicesSliderInstance.destroy(true, true);
        return;
    } else if(!servicesSliderBreakpoint.matches){
        return enableServicesSlider();
    }
}

servicesSliderBreakpoint.addListener(servicesSlider);
servicesSlider();

// MENU
const burgerButton = document.getElementById("burger-button");
const burgerMenu = document.getElementById("burger-menu");
const body = document.querySelector("body");

const setBurgerMenuHeight = () => {
    const mobileBreakpoint = window.matchMedia('(max-width: 767px)');
    if (mobileBreakpoint.matches && burgerMenu.classList.contains("active")) {
        const menuHeight = window.innerHeight - 48;
        burgerMenu.style.height = `${menuHeight}px`;
    } else {
        burgerMenu.style.height = "0";
    }
}

burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    body.classList.toggle("noscroll");
    setBurgerMenuHeight();
});

//MENU SCROLLER
const linkItems  = document.querySelectorAll(".burger-menu__item > a");
linkItems.forEach(item => {
    const className = item.getAttribute("data-scroll");
    item.addEventListener("click", e => {
        e.preventDefault();
        body.classList.remove("noscroll");
        burgerButton.classList.remove("active");
        burgerMenu.classList.remove("active");
        burgerMenu.style.height = "0";
        setTimeout(() => elementScrollIntoView(document.querySelector(`.${className}`), { behavior: "smooth" }), 300 );
    })
})

const headerLinks  = document.querySelectorAll("header .menu-item > a");
headerLinks.forEach(item => {
    const className = item.getAttribute("data-scroll");
    item.addEventListener("click", e => {
        e.preventDefault();
        setTimeout(() => elementScrollIntoView(document.querySelector(`.${className}`), { behavior: "smooth" }), 300 );
    })
})



// TABS
const tabs = document.querySelectorAll("[data-tab]");
const panes = document.querySelectorAll("[data-pane]");
const active = document.querySelector("[data-tab].active").getAttribute("data-tab");

panes.forEach(pane => {
    if(pane.getAttribute("data-pane") === active){
        pane.classList.add("active");
    }
})
tabs.forEach(el => {
    el.addEventListener("click", ({target}) => {
        const currentTab = target.getAttribute("data-tab");
        tabs.forEach(tab => tab.classList.remove("active"));
        panes.forEach(pane => {
            pane.getAttribute("data-pane") === currentTab ? pane.classList.add("active") : pane.classList.remove("active");
        })
        target.classList.add("active");
    })
})

// ANIMATIONS
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', entry.target.getAttribute("data-animation"));
        }
    });
});

document.querySelectorAll("[data-animation]").forEach(el => {
    observer.observe(el);
});

window.addEventListener('resize', function() {
    setBurgerMenuHeight();
});

//DYNAMIC YEAR IN FOOTER
document.querySelectorAll(".footer-rights span").forEach(item => item.innerHTML = new Date().getFullYear().toString());

