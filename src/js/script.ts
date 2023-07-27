import { TextForm } from './components/textForm';

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('copy', e => {
        e.preventDefault();
        e.clipboardData.setData('text/plain', "Do not copy this site's content!");
    });
    new TextForm(document.querySelector('.js-add-text-form'));
});