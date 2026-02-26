'use strict';


import calc from "./modules/calc";
import cards from './modules/cards';
import discount from './modules/discount';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import {openModal} from './modules/modal';


document.addEventListener('DOMContentLoaded', function() {
    const timer =  setTimeout (() => openModal('.modal', timer), 400000)                     // Таймер на появление модалки спустя 2 сек захода на сайт

    calc();
    cards();
    discount('.timer', '2026-09-31');
    forms('form', timer);
    modal('[data-modal]', '.modal', timer);
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');

    slider({
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
