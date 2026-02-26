

import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, timer) {
// POST FORMS ---------------------------------------------------------------------------------------------------------------

    const forms = document.querySelectorAll(formSelector);

    const massage = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так!'
    }

    forms.forEach(item => {
        bindPostData(item)
    })


    const postData = async (data) => {
         return Promise.resolve(data);
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


            postData(json)
                .then(data => {
                    console.log(`Your contacts: ${data}`);
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
        openModal('.modal', timer)

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
            closeModal('.modal')
        }, 4000)

    }

}

export default forms