import { AddTextForm } from './components/addTextForm';
import { List } from './components/list';
import { Popup } from './components/popup';

document.addEventListener('DOMContentLoaded', () => {
    // sayHello('Bohdan');
    // const popUp = new Popup(document.querySelector('.js-popup'));
    // document.querySelector('.js-open-popup').addEventListener('click', () => {
    //     popUp.togglePopup();
    // })
    new AddTextForm(document.querySelector('.js-add-text-form'));
});