/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js"
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calc: () => (/* binding */ calc),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// CALCULATING ---------------------------------------------------------------------------------------------------------------

function calc()  {
    const result = document.querySelector('.calculating__result span');

    let gender, height, weight, age, ratio;

    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (gender === 'female') {
            result.textContent = Math.round(
                (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio
            );
        } else { // Если пол — мужской
            result.textContent = Math.round( // Формула для мужчин
                (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio
            );
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // Получаем все нужные элементы

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ },

/***/ "./src/js/modules/cards.js"
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");
// CARDS ---------------------------------------------------------------------------------------------------------------



function cards() {

    class MenuCard {
        constructor(item_img, item_img_text, item_title, item_desc, item_price, parentSelector, ...classes) { // Вели переменные с которыми будем работать
            this.item_img = item_img;
            this.item_img_text = item_img_text;
            this.item_title = item_title;
            this.item_desc = item_desc;
            this.item_price = item_price;
            this.courseUSDtoUAH = 32
            this.changeToEUR()
            this.parent = document.querySelector(parentSelector)
            this.classes = classes
        }

        changeToEUR(){
            this.item_price = this.item_price * this.courseUSDtoUAH
        }

        render(){
            const element = document.createElement('div');

            if (this.classes.length === 0 ){
                this.element = 'menu__item'
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => {
                    element.classList.add(className)
                })
            }

            element.innerHTML =`                                                  
                <img src=${this.item_img} alt=${this.item_img_text}>   
                <h3 class="menu__item-subtitle">${this.item_title}</h3>
                <div class="menu__item-descr">${this.item_desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.item_price}</span> грн/день</div>
                </div>
            `;

            this.parent.appendChild(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach( ({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ },

/***/ "./src/js/modules/discount.js"
/*!************************************!*\
  !*** ./src/js/modules/discount.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// DISCOUNT DATE -------------------------------------------------------------------------------------------------------

function discount(id, deadline){


    function timeDifference(endtime){
        let days, hours, minutes, seconds;

        let t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0){
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t / (1000*60*60*24));
            hours = Math.floor((t / (1000*60*60*24) % 24))
            minutes = Math.floor((t / 1000 / 60) % 60)
            seconds = Math.floor((t / 1000) % 60)
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    function setTime(selector,endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        updateClock ()
        function updateClock (){
            const t = timeDifference(endtime);
            days.textContent = getZeroInTimer(t.days);
            hours.textContent = getZeroInTimer(t.hours);
            minutes.textContent = getZeroInTimer(t.minutes);
            seconds.textContent = getZeroInTimer(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }

        const timeInterval = setInterval(updateClock, 1000)
    }

    function getZeroInTimer(num){
        if (num >= 0 && num <= 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    setTime (id, deadline);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (discount);

/***/ },

/***/ "./src/js/modules/forms.js"
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");





function forms(formSelector, timer) {
// POST FORMS ---------------------------------------------------------------------------------------------------------------

    const forms = document.querySelectorAll(formSelector);

    const massage = {
        loading: 'src/icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так!'
    }

    forms.forEach(item => {
        bindPostData(item)
    })


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: data
        })

        return await res.json()
    }

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMassage = document.createElement('img')
            statusMassage.src = massage.loading
            statusMassage.style.cssText = `display: block; margin: 0 auto;`;
            form.insertAdjacentElement('afterend', statusMassage)

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()))


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(massage.success)
                    statusMassage.remove()
                }).catch(() => {
                showThanksModal(massage.failure)
            }).finally(() => {
                form.reset()
            })

        })
    }

// SHOW THANKS MODAL ---------------------------------------------------------------------------------------------------------------

    function showThanksModal(massage){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', timer)

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML =`
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${massage}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove()
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal')
        }, 4000)

    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ },

/***/ "./src/js/modules/modal.js"
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });

// SHOW MODAL WINDOW AFTER PRESS BUTTON --------------------------------------------------------------------------------
function closeModal(modalSelector){
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show')
    document.body.style.overflow = '';
}

function openModal(modalSelector, timer){
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide')
    document.body.style.overflow = 'hidden';

    console.log(timer)
    if (timer){
        clearInterval(timer)
    }
}

function modal(triggerSelector, modalSelector, timer){
    const linkBtn = document.querySelectorAll(triggerSelector);
    const modalWindow = document.querySelector(modalSelector);

    linkBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, timer));
    })

    modalWindow.addEventListener('click',(e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') === ''){
            closeModal(modalSelector)
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector)
        }
    });

// SHOW MODAL WINDOW AFTER 3 SEC + SHOW MODAL WINDOW IF SCROLL DOWN ----------------------------------------------------

    function showModalIfScrollDown (){
        if (window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, timer);
            window.removeEventListener('scroll', showModalIfScrollDown);
        }
    }
    window.addEventListener('scroll', showModalIfScrollDown);



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ },

/***/ "./src/js/modules/slider.js"
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// SLIDER ---------------------------------------------------------------------------------------------------------------

function slider({slide, container, leftArrow, rightArrow, totalCounter, currentCounter, wrapper, field}) {

    let slideIndex = 1;
    let offset = 0;

    const sliders = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const arrowLeft = document.querySelector(leftArrow);
    const arrowRight = document.querySelector(rightArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);

    const slidersWrapper = document.querySelector(wrapper);
    const width = window.getComputedStyle(slidersWrapper).width;
    const slidersField = document.querySelector(field);





    if (sliders.length < 10){
        total.textContent = `0${sliders.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = sliders.length
        current.textContent = slideIndex
    }

    function updateCounter() {
        if (sliders.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    }

    function updateDots(){
        dots.forEach(dot => {dot.style.opacity = '0.5'})
        dots[slideIndex - 1].style.opacity = '1'
    }

    // Устанавливаем стили для контейнера со слайдами (slidersField)
    slidersField.style.width = 100 * sliders.length + '%'
    slidersField.style.display = 'flex'
    slidersField.style.transition = '0.5s all'

    slidersWrapper.style.overflow = 'hidden'

    sliders.forEach(item => {
        item.style.width = width;
    })

    function deleteNotDigits (str){
        return +str.replace(/\D/g, '')

    }

    // Обработка клика на левую стрелку (назад)
    arrowLeft.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (sliders.length - 1)
        } else  {
            offset -= deleteNotDigits(width)
        }

        slidersField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = sliders.length
        } else {
            slideIndex--
        }
        updateCounter()
        updateDots()
    })

    // Обработка клика на правую стрелку (вперёд)
    arrowRight.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (sliders.length - 1)) {
            offset = 0
        } else  {
            offset += deleteNotDigits(width)
        }

        slidersField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === sliders.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }
        updateCounter()
        updateDots()
    })


    // Добавление точек-индикаторов под слайдером-----------------------------------------------------------------
    slider.style.position = 'relative'
    const indicators = document.createElement('ol');
    const dots = []
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `
    slider.append(indicators);

    for (let i = 0; i < sliders.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `
        indicators.append(dot);
        if ( i === 0) {
            dot.style.opacity = '1';
        }
        dots.push(dot);
    }


    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = +slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1)

            slidersField.style.transform = `translateX(-${offset}px)`;

            updateCounter();
            updateDots();
        })
    })


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ },

/***/ "./src/js/modules/tabs.js"
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// TABS ----------------------------------------------------------------------------------------------------------------

function tabs(tabsParentlSelector, tabsSelector, tabsContentSelector, activeClass) {
    const   tabsParent = document.querySelector(tabsParentlSelector),
            tabs = document.querySelectorAll(tabsSelector),
            tabsContent = document.querySelectorAll(tabsContentSelector)

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass)
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            })

        }
    })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ },

/***/ "./src/js/services/services.js"
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {          // Асинхронная функция для отправки POST-запроса по указанному URL с переданными данными
    const res = await fetch(url, {              // Выполняем запрос с помощью fetch и ожидаем ответ от сервера
        method: 'POST',                                        // Метод запроса: POST (отправка данных)
        headers: {'Content-type': 'application/json'},         // Заголовок, указывающий, что тело запроса — JSON
        body: data                                             // Тело запроса — строка JSON
    })

    return await res.json()                                    // Ждём и возвращаем ответ в формате JSON
}

async function getResource(url) {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch: ${url}, status: ${res.status}`);
    }

    return await res.json()
}





/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_discount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/discount */ "./src/js/modules/discount.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");













document.addEventListener('DOMContentLoaded', function() {
    const timer =  setTimeout (() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', timer), 400000)                     // Таймер на появление модалки спустя 2 сек захода на сайт

    ;(0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_discount__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2026-09-31');
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', timer);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', timer);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');

    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        slide: '.offer__slide',
        container: '.offer__slider',
        leftArrow: '.offer__slider-prev',
        rightArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',

        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'

    });
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map