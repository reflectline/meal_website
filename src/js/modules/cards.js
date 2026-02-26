// CARDS ---------------------------------------------------------------------------------------------------------------
import {getResource} from "../services/services";


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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach( ({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })



}

export default cards;