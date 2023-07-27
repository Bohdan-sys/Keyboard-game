import { WordBar } from "./components/wordBar";

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('copy', e => {
        e.preventDefault();
        e.clipboardData.setData('text/plain', "Do not copy this site's content!");
    });

    new WordBar(document.querySelector('.js-word-bar'), document.querySelector('.js-popup'));
});