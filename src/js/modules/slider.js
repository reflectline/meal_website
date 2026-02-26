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

export default slider;