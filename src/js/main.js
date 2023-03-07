import Swiper, { Pagination, Grid } from 'swiper';
import 'animate.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import $ from "jquery";


//get viewport height
document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
});


// TEAM SLIDER
const teamSliderBreakpoint = window.matchMedia('(min-width: 1280px)');
let teamSliderInstance;
const enableTeamSlider = () => {
    teamSliderInstance = new Swiper(".team__slider .swiper", {
        modules: [Pagination],
        slidesPerView: 'auto',
        spaceBetween: 9,
        cssMode: true,
        breakpoints: {
            768: {
                spaceBetween: 20
            },
            // 1280: {
            //     spaceBetween: 30
            // },
        },
        pagination: {
            el: '.team__slider .swiper-pagination',
        },
    })
}

const teamSlider = () => {
    if(teamSliderBreakpoint.matches){
        if(teamSliderInstance !== undefined) teamSliderInstance.destroy(true, true);
        return;
    } else if(!teamSliderBreakpoint.matches && document.querySelector(".team__slider .swiper") !== null){
        return enableTeamSlider();
    }
}

teamSliderBreakpoint.addListener(teamSlider);
teamSlider();


// resources SLIDER
const resourcesSliderBreakpoint = window.matchMedia('(min-width: 767px)');
let resourcesSliderInstance;
const enableresourcesSlider = () => {
    resourcesSliderInstance = new Swiper(".resources__wrapper .swiper", {
        modules: [Pagination],
        slidesPerView: 'auto',
        spaceBetween: 9,
        cssMode: true,
        pagination: {
            el: '.resources__wrapper .swiper-pagination',
        },
    })
}

const resourcesSlider = () => {
    if(resourcesSliderBreakpoint.matches){
        if(resourcesSliderInstance !== undefined) resourcesSliderInstance.destroy(true, true);
        return;
    } else if(!resourcesSliderBreakpoint.matches && document.querySelector(".resources__wrapper .swiper") !== null){
        return enableresourcesSlider();
    }
}

resourcesSliderBreakpoint.addListener(resourcesSlider);
resourcesSlider();

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
// document.addEventListener("mousemove", (e) => {
//     const breakpoint = window.matchMedia('(min-width: 1280px)');
//     breakpoint.matches && e.clientY < 80 ? header.classList.add("hovered") : header.classList.remove("hovered");
// });

// let lastScrollTop = 0;

// document.addEventListener("scroll", function(){
//     let widthDevice = window.innerWidth > 600;
//     let offst = window.pageYOffset ;
    // let st =  document.documentElement.scrollTop;
//     // let st = window.pageYOffset || document.documentElement.scrollTop;
//     if (st > lastScrollTop && st > 100){
//         header.classList.remove("visible")
//     } else {
//         if(st !== 0){
//             header.classList.add("visible")

//         }
//         else{
//             if(offst == 0  ){
//                 header.classList.remove("visible")
//             }
//         }
//     }
//     lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
// }, false);


document.addEventListener("mousemove", (e) => {
    const breakpoint = window.matchMedia('(min-width: 1440px)');
    breakpoint.matches && e.clientY < 80 ? header.classList.add("hovered") : header.classList.remove("hovered");
});


//     if(/index/.test(window.location.href)){
// $('header').removeClass('visible');

// }

let lastScrollTop = 0;
document.addEventListener("scroll", function(){
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 100){
        header.classList.remove("visible");
    } else {
        if(st !== 0 ){
            header.classList.add("visible");
        }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


function hidedFunctions() {
    let r = window.location.pathname;
    console.log(r);
    let indx = window.pageYOffset == 0  && r == '/' ;
    let noIndx = r !== '/'|| document.documentElement.clientWidth <= 767;
    header.classList.remove("hided");
    //&& document.documentElement.clientWidth <= 767
    if(indx && document.documentElement.clientWidth >= 767 ){
        header.classList.add("hided");

    }
    else{
        if(noIndx || document.documentElement.scrollTop > 100){

            header.classList.remove("hided");

        }

        else{
            header.classList.add("hided");

     }

    }
}

window.addEventListener('scroll', hidedFunctions);
window.addEventListener('load', hidedFunctions);
window.addEventListener('offset', hidedFunctions);
window.addEventListener('resize', hidedFunctions);


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
        if (location.pathname !== "/"){
            localStorage.setItem("scrollTo", className);
            setTimeout(() => { location.href = "/" }, 300);
        } else {
            setTimeout(() => elementScrollIntoView(document.querySelector(`.${className}`), { behavior: "smooth" }), 300 );
        }
    })
})

const headerLinks  = document.querySelectorAll("header .menu-item > a");
headerLinks.forEach(item => {
    const className = item.getAttribute("data-scroll");
    item.addEventListener("click", e => {
        switch (className) {
            case "contacts":
                e.preventDefault();
                contactForm.classList.add('opened');
                body.classList.add("noscroll");
                break;
            case "skip":
                break;
            default:
                e.preventDefault();
                if (location.pathname !== "/"){
                    localStorage.setItem("scrollTo", className);
                    location.href = "/"
                } else {
                    const menu = document.querySelector(`[data-scroll=${className}]`);
                    menu.classList.add("pressed");
                    setTimeout(() => menu.classList.remove("pressed"), 2000)
                    elementScrollIntoView(document.querySelector(`.${className}`), { behavior: "smooth" });
                }
        }
    })
})
const headerLink  = document.querySelectorAll("section .nav-menu__item > a");
headerLink.forEach(item => {
    const className = item.getAttribute("data-scroll");
    item.addEventListener("click", e => {
        switch (className) {
            case "contacts":
                e.preventDefault();
                contactForm.classList.add('opened');
                body.classList.add("noscroll");
                break;
            case "skip":
                break;
            default:
                e.preventDefault();
                if (location.pathname !== "/"){
                    localStorage.setItem("scrollTo", className);
                    location.href = "/"
                } else {
                    const menu = document.querySelector(`[data-scroll=${className}]`);
                    menu.classList.add("pressed");
                    setTimeout(() => menu.classList.remove("pressed"), 2000)
                    elementScrollIntoView(document.querySelector(`.${className}`), { behavior: "smooth" });
                }
        }
    })
})
const scrollTo = localStorage.getItem("scrollTo")
if(scrollTo){
    document.onreadystatechange = () => {
        if (document.readyState === "complete") {
            const menu = document.querySelector(`[data-scroll=${scrollTo}]`);
            menu.classList.add("pressed");
            setTimeout(() => menu.classList.remove("pressed"), 2000)
            elementScrollIntoView(document.querySelector(`.${scrollTo}`), { behavior: "smooth" });
            localStorage.removeItem("scrollTo");
        }
    };
}

const mainBannerLink = document.querySelector('a[data-role="portfolio"]');
if (mainBannerLink) {
    mainBannerLink.addEventListener("click", e => {
        e.preventDefault();
        setTimeout(() => elementScrollIntoView(document.querySelector('.products-in'), { behavior: "smooth" }), 300 );
    })
}

const contactUsBtn = document.querySelectorAll('[data-role="contact-btn"]');
Array.from(contactUsBtn).forEach(el => el.addEventListener("click", e => {
    e.preventDefault();
    contactForm.classList.add('opened');
    body.classList.add("noscroll");
}))


var checkList = document.getElementsByClassName('dropdown');
Array.from(checkList).forEach(el => el.addEventListener('change', function (e) {
    var chk = e.target

    if (chk.tagName === 'INPUT' && chk.type === 'checkbox') {
        if (chk.checked){
            chk.parentElement.parentElement.classList.add('active');
        } else {
            chk.parentElement.parentElement.classList.remove('active');
        }
    }
}))

$('.input-group *').on("change paste keyup", function() {
    $(this).parent().removeClass('error');

    if ($(this).val()) {
        $(this).next().addClass('filled');
    }
    else {
        $(this).next().removeClass('filled');
    }
})
window.auto_grow = function auto_grow(element) {
    element.style.height = "50px";
    element.style.height = (element.scrollHeight)+"px";
}
$('input[type="file"]').on('change', function () {
    $(this).next().html($(this)[0].files[0].name)
})

//CONTACT FORM
const  contactForm = document.querySelector('[data-action="contact-us"]');
const closeForm = $('[data-action="contact-us"] [data-role="close"]');
closeForm.on('click', function () {
    contactForm.classList.remove('opened')
    body.classList.remove("noscroll");
    $('.contact-dialog').removeClass('hide');
    $('.contact-success').addClass('hide');
})

contactForm.querySelector('form').onsubmit = async (e) => {
    e.preventDefault();

    let name = $('[data-action="contact-us"] input[name="name"]');
    let email = $('[data-action="contact-us"] input[name="email"]');
    let required = true;
    if (!name.val()) {
        name.parent().addClass('error');
        required = false;
    }

    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email.val())) {
        email.parent().addClass('error');
        required = false;
    }

    if (required) {
        let response = await fetch('/contact-form.php', {
            method: 'POST',
            body: new FormData(contactForm.querySelector('form'))
        });
        if (response.ok) {
            resetForm(contactForm.querySelector('form'));
            location.href = "/success.html";
        } else {
            alert("Error, please try again")
        }
    }
};

//Join form
const joinForm = document.querySelector('[data-action="join-team"]');

if (joinForm) {
    $('[data-role="join-team"]').on('click', (e) => {
        e.preventDefault();
        joinForm.classList.add('opened');
        body.classList.add("noscroll");
    })
    const closeJoinForm = $('[data-action="join-team"] [data-role="close"]');
    closeJoinForm.on('click', function () {
        joinForm.classList.remove('opened')
        body.classList.remove("noscroll");
        $('.contact-dialog').removeClass('hide');
        $('.contact-success').addClass('hide');
    })



    joinForm.querySelector('form').onsubmit = async (e) => {
        e.preventDefault();

        let name = $('[data-action="join-team"] input[name="name"]');
        let email = $('[data-action="join-team"] input[name="email"]');
        let required = true;
        if (!name.val()) {
            name.parent().addClass('error');
            required = false;
        }

        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email.val())) {
            email.parent().addClass('error');
            required = false;
        }

        if (required) {
            let response = await fetch('/contact-form.php', {
                method: 'POST',
                body: new FormData(joinForm.querySelector('form'))
            });
            if (response.ok) {
                resetForm(joinForm.querySelector('form'));
                location.href = "/success.html";
            } else {
                alert("Error, please try again")
            }
        }
    };

}

function resetForm(form){
    form.reset();
    let formCheckList = form.querySelectorAll('.dropdown ul li');
    console.log(formCheckList)
    Array.from(formCheckList).forEach(el => el.classList.remove('active'))
}
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
        cssMode: true,
        spaceBetween: 9,
        breakpoints: {
            768: {
                spaceBetween: 20
            },
            1440: {
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
    } else if(!aboutSliderBreakpoint.matches && document.querySelector(".product-about__slider .swiper") !== null){
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
        cssMode: true,
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
    } else if(!researchSliderBreakpoint.matches && document.querySelector(".product-research__slider .swiper") !== null){
        return enableResearchSlider();
    }
}

researchSliderBreakpoint.addListener(researchSlider);
researchSlider();

//TEAM SLIDER
const productTeamSlider = new Swiper(".product-team__slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    cssMode: true,
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
    cssMode: true,
    breakpoints: {
        768: {
            slidesPerView: 'auto'
        },
        // 1280: {
        //     slidesPerView: 'auto',
        //     spaceBetween: 30
        // },
    },
    pagination: {
        el: '.product-design__slider .swiper-pagination',
    },
})

//PRODUCTS-IN  SLIDER

const productsInSliderBreakpoint = window.matchMedia('(min-width: 768px)');
let productsInSliderInstance;
const enableProductsInSlider = () => {
    productsInSliderInstance = new Swiper(".products-in .products-in__wrapper .swiper", {
        modules: [Pagination],
        slidesPerView: 1,
        cssMode: true,
        pagination: {
            el: '.products-in .products-in__wrapper .swiper .swiper-pagination',
        },
    })
}

const productsInSlider = () => {
    if(productsInSliderBreakpoint.matches){
        if(productsInSliderInstance !== undefined) productsInSliderInstance.destroy(true, true);
    } else if(!productsInSliderBreakpoint.matches && document.querySelector(".products-in .products-in__wrapper .swiper") !== null){
        return enableProductsInSlider();
    }
}

productsInSliderBreakpoint.addListener(productsInSlider);
productsInSlider();

//PRODUCTS SLIDER

const productsSliderBreakpoint = window.matchMedia('(min-width: 768px)');
let productsSliderInstance;
const enableProductsSlider = () => {
    productsSliderInstance = new Swiper(".products .products__wrapper .swiper", {
        modules: [Pagination],
        slidesPerView: 1,
        cssMode: true,
        pagination: {
            el: '.products .products__wrapper .swiper .swiper-pagination',
        },
    })
}

const productsSlider = () => {
    if(productsSliderBreakpoint.matches){
        if(productsSliderInstance !== undefined) productsSliderInstance.destroy(true, true);
    } else if(!productsSliderBreakpoint.matches && document.querySelector(".products .products__wrapper .swiper") !== null){
        return enableProductsSlider();
    }
}

productsSliderBreakpoint.addListener(productsSlider);
productsSlider();


//random data (gif)

let search = 'hello';
    let apiKey = 'OZJXtDVHcBI3VMuUwz79efr4IRzq3LFB';
    let limit = 100;
    let url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}&limit=${limit}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = function() {
        let data = xhr.response;
        let gifData = data.data;

        let rand = Math.floor( Math.random() * gifData.length);
        let randomGif = document.getElementById('randomgif');

        randomGif.src = data.data[rand].images?.original?.url;
        console.log(data);
    };

//random data (hello)
let arrHello = [
    'Hola',
    'Aloha',
    'Hi there',
    'Привіт',
    'Salut'
];
let randHello = Math.floor( Math.random() * arrHello.length);
let elem = document.getElementById('random-hello');
let delay = 100; // cкорость
let current = 0;

const emojiContainer = document.getElementById('emoji') // контейнер с емоджи

// emojiContainer.style.visibility = 'hidden' - можно скрывать тут, что б не использовать инлайн стили

setInterval(function(){
    let textGreet = arrHello[current];
    elem.innerHTML= '';
    current++;

    emojiContainer.style.visibility = 'hidden'; // скрываем на каждом новом приветствии

    if(current >= arrHello.length) current = 0;
    let print_text = function(textGreet, elem, delay) {
        if(textGreet.length > 0) {
            elem.innerHTML += textGreet[0];
            setTimeout(
                function() {
                    print_text(textGreet.slice(1), elem, delay);
                }, delay
            );
        }else{
            emojiContainer.style.visibility = 'visible'; // показываем если буквы для вывода закончились
        }
    }
    print_text(textGreet, elem, delay);


}, 3000);


//products animation

// $(document).resize(function()
// {$("#slide").show();
//  $( ".slided" ).hide();
//     if ($(window).width() <= '661') {
//         $("#slide").hide();
//         $( ".slided" ).show();
//     } else {
//         $("#slide").show();
//         $( ".slided" ).hide();
//     }


// });

$(".see-less").hide();
        $(".see-more").show();
$( "#slide" ).click(function () {
    if ( $( ".slided" ).first().is( ":hidden" )||$(window).width() <= '661') {
        $( ".slided" ).slideDown(600);
        $( ".slided-show" ).hide();
        $(".see-more").hide();
        $(".see-less").show();
        setInterval(function() {
           if ( $( ".slided-show"  ).first().is( ":hidden" ) ){

        $( ".slided-show" ).fadeIn(100);
      }

    }, 600);

    } else {
        $( ".slided-show" ).hide('fast');
        $( ".slided"  ).slideUp(600);
        $(".see-more").show();
        $(".see-less").hide();
    }
  });

///downloading CV

  $('.download').on('click', function(){
    var link = document.createElement('a');
    link.setAttribute('href', '/Stanislav_Lavrik_resume - 2023.pdf');
    link.setAttribute('download', 'Stanislav_Lavrik_resume - 2023.pdf');
    link.click();
    return false;
});