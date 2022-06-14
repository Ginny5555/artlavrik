import Swiper, { Pagination, Grid} from 'swiper';
import 'animate.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
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
const header = document.querySelector("header");

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

//HEADER SHOW-HIDE
document.addEventListener("mousemove", (e) => {
    const breakpoint = window.matchMedia('(min-width: 1280px)');
    breakpoint.matches && e.clientY < 80 ? header.classList.add("hovered") : header.classList.remove("hovered");
});

let lastScrollTop = 0;

document.addEventListener("scroll", function(){
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 100){
        header.classList.remove("visible")
    } else {
        if(st !== 0){
            header.classList.add("visible")
        }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

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
        if (!className === "contacts") {
            setTimeout(() => elementScrollIntoView(document.querySelector(`.${className}`), { behavior: "smooth" }), 300 );
        } else {
            contactForm.classList.add('opened');
            body.classList.add("noscroll");
        }

    })
})

//CONTACT FORM
const  contactForm = document.getElementsByClassName('popup')[0];
const closeForm = contactForm.querySelector('[data-role="close"]');
closeForm.onclick = () => {
    contactForm.classList.remove('opened')
    body.classList.remove("noscroll");
}

contactForm.querySelector('input[type="file"]').addEventListener('change', () => {
    var file = event.target.files[0].name;
    event.currentTarget.nextSibling.nextSibling.innerHTML = file
})

//dropdown list
var checkList = document.getElementsByClassName('dropdown')[0];
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
    if (checkList.classList.contains('visible'))
        checkList.classList.remove('visible');
    else
        checkList.classList.add('visible');
}

//control list
checkList.addEventListener('change', function () {
    var chk = event.target

    if (chk.tagName === 'INPUT' && chk.type === 'checkbox') {
        if (chk.checked){
            chk.parentElement.parentElement.classList.add('active');
        } else {
            chk.parentElement.parentElement.classList.remove('active');
        }
    }
})

//submitting form
/*contactForm.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log( new FormData(contactForm.querySelector('form')))

    /!*let name = "sadfasdf";
    let email = "sadfasdf";
    let mess = "sadfasdf";
    let file = "sadfasdf";

    fetch("contact-form.php"+ "?" + "name=" + name + "&email=" + email + "&message=" + mess + "&file=" + file,
        {
            method: "GET",
            headers:{"content-type":"application/x-www-form-urlencoded"}
        })

        .then( response => {
            if (response.status !== 200) {

                return Promise.reject();
            }
            return response.text()
        })
        .then(function () {
            /!*e.target.parentElement.classList.add("hide");
            e.target.parentElement.nextSibling.nextSibling.classList.remove('hide');*!/
            console.log(event)
        })
        .catch(() => console.log('ошибка'));*!/
})*/

contactForm.querySelector('form').onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/contact-form.php', {
        method: 'POST',
        body: new FormData(contactForm.querySelector('form'))
    });

    let result = await response.json();

    alert(result.message);
};

// TABS
const tabs = document.querySelectorAll("[data-tab]");
const panes = document.querySelectorAll("[data-pane]");
const active = document.querySelector("[data-tab].active")?.getAttribute("data-tab");

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




//PRODUCT PAGE

// ABOUT SLIDER
const aboutSliderBreakpoint = window.matchMedia('(min-width: 768px)');
let aboutSliderInstance;
const enableAboutSlider = () => {
    aboutSliderInstance = new Swiper(".product-about__slider .swiper", {
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
            el: '.product-about__slider .swiper-pagination',
        },
    })
}

const aboutSlider = () => {
    if(aboutSliderBreakpoint.matches){
        if(aboutSliderInstance !== undefined) aboutSliderInstance.destroy(true, true);
        return;
    } else if(!aboutSliderBreakpoint.matches){
        return enableAboutSlider();
    }
}

aboutSliderBreakpoint.addListener(aboutSlider);
aboutSlider();

//RESEARCH SLIDER
const researchSliderBreakpoint = window.matchMedia('(min-width: 768px)');
let researchSliderInstance;
const enableResearchSlider = () => {
    researchSliderInstance = new Swiper(".product-research__slider .swiper", {
        modules: [Pagination, Grid],
        slidesPerView: 1,
        grid: {
            rows: 3,
        },
        spaceBetween: 16,
        pagination: {
            el: '.product-research__slider .swiper-pagination',
        },
    })
}

const researchSlider = () => {
    if(researchSliderBreakpoint.matches){
        if(researchSliderInstance !== undefined) researchSliderInstance.destroy(true, true);
        return;
    } else if(!researchSliderBreakpoint.matches){
        return enableResearchSlider();
    }
}

researchSliderBreakpoint.addListener(researchSlider);
researchSlider();

//TEAM SLIDER
const productTeamSlider = new Swiper(".product-team__slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        768: {
            slidesPerView: 'auto'
        },
        1280: {
            spaceBetween: 30
        },
    },
})

//DESIGN SLIDER
const designSlider = new Swiper(".product-design__slider .swiper", {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        768: {
            slidesPerView: 'auto'
        },
        1280: {
            slidesPerView: 'auto',
            spaceBetween: 30
        },
    },
    pagination: {
        el: '.product-design__slider .swiper-pagination',
    },
})