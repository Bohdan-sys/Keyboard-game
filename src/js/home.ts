import { WordBar } from "./components/wordBar";

document.addEventListener('DOMContentLoaded', () => {
    new WordBar(document.querySelector('.js-word-bar'), document.querySelector('.js-popup'));
});