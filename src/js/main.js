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