
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

export default modal
export {closeModal}
export {openModal}