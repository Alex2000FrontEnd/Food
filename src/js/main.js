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

const showModal = () => {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
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