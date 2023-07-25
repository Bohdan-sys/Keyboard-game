import { TextForm } from './components/textForm';
import { List } from './components/list';
import { Popup } from './components/popup';

document.addEventListener('DOMContentLoaded', () => {
    new TextForm(document.querySelector('.js-add-text-form'));
});