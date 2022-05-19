import Swiper, { Pagination } from 'swiper';
import 'animate.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import { elementScrollIntoView } from "seamless-scroll-polyfill";


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
burgerButton.addEventListener("click", () => burgerButton.classList.toggle("active"));

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
