'use strict';

// TABS
const tabsContent = document.querySelectorAll('.tabcontent'),
      menuWrapper = document.querySelector('.tabheader__items'),
      menuItems = menuWrapper.querySelectorAll('.tabheader__item');

const showTab = (i = 0) => {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    menuItems[i].classList.add('tabheader__item_active');
};

const closeTab = () => {
    tabsContent.forEach(content => {
        content.classList.remove('show');
        content.classList.add('hide', 'fade');
    });
    menuItems.forEach(menu => menu.classList.remove('tabheader__item_active'));
};

closeTab();
showTab();

menuWrapper.addEventListener('click', (e) => {
    const t = e.target;

    if (t && t.matches('.tabheader__item')) {
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i] == t) {
                closeTab();
                showTab(i);
                break;
            }
        }
    }
});

// TIMER
const endtime = '2024-10-01';

const getTimerRemaining = (endtime) => {
    let days, hours, minutes, seconds;
          
    const time = new Date(endtime) - new Date();

    if (time > 0) {
        days = Math.floor(time / (1000 * 60 * 60) / 24);
        hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((time / (1000 * 60)) % 60);
        seconds = Math.floor((time / 1000) % 60);
    } else {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    }

    return {
        't': time,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

const getZero = (num) => {
    if (num >= 10) {
        return num;
    } else {
        return `0${num}`;
    }
};

const setTime = (wrapperSelector, endtime) => {
    const wrapper = document.querySelector(wrapperSelector),
          days = wrapper.querySelector('#days'),
          hours = wrapper.querySelector('#hours'),
          minutes = wrapper.querySelector('#minutes'),
          seconds = wrapper.querySelector('#seconds');
    let timerId = setInterval(updateClock, 1000);

    function updateClock() {
        const t = getTimerRemaining(endtime);

        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);

        if (t.t <= 0) clearInterval(timerId);
    }

    updateClock();
};

setTime('.timer', endtime);

// MODAL
const modal = document.querySelector('[data-modal="request"]'),
      triggersModal = document.querySelectorAll('[data-trigger="request"]');
let timerModal;

const showModal = () => {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    if (timerModal) clearInterval(timerModal);
    window.removeEventListener('scroll', calcScrollModal);
};

const hideModal = () => {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
};

triggersModal.forEach(trigger => {
    trigger.addEventListener('click', () => {
        showModal();
    });
});

modal.addEventListener('click', (e) => {
    const t = e.target;

    if (t && t.hasAttribute('data-close') || t == modal) {
        hideModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
        hideModal();
    } 
});

// timerModal = setTimeout(showModal, 10000);

window.addEventListener('scroll', calcScrollModal);

function calcScrollModal() {
    const doc = document.documentElement;

    if (doc.scrollHeight <= doc.scrollTop + doc.clientHeight + 5) {
        showModal();
    }
}

// CARDS
class MenuCard {
    constructor({parentSelector, elClasses, imgSrc, imgAlt, title, descr, price}) {
        this.parent = document.querySelector(parentSelector);
        this.elClasses = elClasses;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.usd = 41.37;
        this.calcCurr();
    }
    calcCurr() {
        if (typeof this.price == 'number') {
            this.price = (this.price * this.usd).toFixed();
        } else {
            this.price = '---';
        }
    }
    render() {
        this.parent.innerHTML += `
            <div class=${this.elClasses}>
                <img src=${this.imgSrc} alt=${this.imgAlt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `;
    }
}

new MenuCard({
    parentSelector: '.menu__field .container',
    elClasses: 'menu__item',
    imgSrc: 'img/tabs/vegy.jpg',
    imgAlt: 'vegy',
    title: 'Меню "Фитнес"',
    descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    price: 7
}).render();

new MenuCard({
    parentSelector: '.menu__field .container',
    elClasses: 'menu__item',
    imgSrc: 'img/tabs/elite.jpg',
    imgAlt: 'elite',
    title: 'Меню “Премиум”',
    descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    price: 10
}).render();

new MenuCard({
    parentSelector: '.menu__field .container',
    elClasses: 'menu__item',
    imgSrc: 'img/tabs/post.jpg',
    imgAlt: 'post',
    title: 'Меню "Постное"',
    descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    price: 2
}).render();