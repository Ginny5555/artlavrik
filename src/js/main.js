import Swiper, { Pagination } from 'swiper';
import nodeMarquee from 'node-marquee';
import 'animate.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//import { elementScrollIntoView } from "seamless-scroll-polyfill";


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
const servicesSliderOptions = {
    modules: [Pagination],
    enabled: false,
    init: false,
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
}
const servicesSliderInstance = new Swiper(".services__wrapper .swiper", servicesSliderOptions);

const servicesSlider = () => {
    const breakpoint = window.matchMedia('(min-width: 0px) and (max-width: 959px)');
    if(breakpoint.matches && !servicesSliderInstance?.enabled){
        servicesSliderInstance.enable();
        servicesSliderInstance.init();
    } else if(!breakpoint.matches && servicesSliderInstance?.enabled){
        servicesSliderInstance.disable();
    }
}

servicesSlider();

const initMarquee = () => {
    const breakpoint = window.matchMedia('(min-width: 0px) and (max-width: 959px)');
    if (breakpoint.matches){
        nodeMarquee({
            parent: '.mobile-runner__wrapper'
        });
    } else{
        nodeMarquee({
            parent: '.desktop-logos__item.horizontal .wrapper'
        });
    }
}
initMarquee();

// MENU
const burgerButton = document.getElementById("burger-button");
burgerButton.addEventListener("click", () => burgerButton.classList.toggle("active"));

// PRODUCTS

// const productsWrapperHeight = () => {
//     let height = 0;
//     const productsWrapper = document.querySelector(".products__wrapper");
//     const products = productsWrapper.children;
//
//     for (let i = 0; i < 2; i++){
//         height += products[i].clientHeight + 24
//     }
//     productsWrapper.style.maxHeight = `${height}px`;
// }
// productsWrapperHeight();

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


// ON WINDOW RESIZE
window.addEventListener('resize', function() {
    servicesSlider();
});
