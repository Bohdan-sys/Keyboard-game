import { getFromDb } from "../utils/db";
import { Popup } from "./popup";

export class WordBar extends Popup {
    private element: HTMLElement;
    private textElement: HTMLElement;
    private inputElement: HTMLInputElement;
    private storage: any;
    private data: any;
    private formattedText: string;
    private timer: any;
    private timeDelta: number;

    constructor(element: HTMLElement, targetElement: HTMLElement) {
        super(targetElement)
        this.element = element;
        this.textElement;
        this.inputElement;
        this.storage = JSON.parse(localStorage.getItem('selectedAricle')) || [];
        this.data;
        this.formattedText;
        this.timer;
        this.timeDelta;
      
        this.init();
    }

    protected init() : void {
        if (this.element) {
            this.textElement = this.element.querySelector('.js-word-bar-text');
            this.inputElement = this.element.querySelector('.js-word-bar-input');

            this.getData().then(() => {
                this.shuffleData();
                this.createEvents();
            });
        }    
    }

    private async getData(): Promise<void>  {
        if (this.storage) {
            this.data = await getFromDb(this.storage.id);            
        }
    }

    private shuffleData(): void {
        if (this.data) {
            this.formattedText = this.data.text.replace(/\r?\n/g, '');
            if (this.storage.randomize) {
                this.textElement.classList.add('is-random');
                this.textElement.innerText = this.formattedText = this.formattedText
                    .split(' ')
                    .sort(() => Math.random() - 0.5)
                    .join(' ');
            } else {
                this.textElement.innerText = this.formattedText;
            }
        }
    }

    protected createEvents(): void {   
        this.inputElement?.addEventListener('input', () => this.checkWord(this.inputElement.value));
    }

    private removeEvents(): void {
        this.inputElement?.removeEventListener('input', () => this.checkWord(this.inputElement.value));
    }

    private checkWord(str: string): void {
        const regex = Date.now();
        this.textElement.innerHTML = [...this.formattedText]
        .map((element: string, index: number) => {
            if (index < str.length) {                    
                return `<span class="${element === str[index] ? 'is-correct' : 'is-error'}">${element}</span>`;
            } else {   
                return element.replace(/^\s*$/, `${regex}`);
            }
        })
        .join('')
        .split(`${regex}`)
        .map((el: string ) => str ? `<span>${el}</span>` : el)
        .join(' '); 

        if (this.storage.randomize) {
            this.randomMode();
        }

        this.checkGameStatus();
        this.calculateWordSize();
    }

    private calculateWordSize(): void {
        const character = this.element.querySelector('.js-word-bar-text > span') as HTMLElement;  
        this.textElement.style.left = `-${character ? character.offsetWidth : 0}px`;  
    }

    private calculateErrors(): string {
        const character = [...this.element.querySelectorAll<HTMLElement>('.js-word-bar-text .is-error')];
        return character.length.toString();
    }

    private calculateMatches(): string {
        const character = [...this.element.querySelectorAll<HTMLElement>('.js-word-bar-text .is-correct')];
        return character.length.toString();
    }

    private calculateWordsCount(): string {
        return this.formattedText.split(' ').length.toString();
    }

    private createTimer(): void {
        if (this.timer) {
            const dif = (Date.now() - this.timer) / 1000;
            this.timeDelta = Math.round(((this.inputElement.value.length * 60 / dif) * 1000) / 1000);
        } else {
            this.timer = Date.now();
        }
    }

    private checkGameStatus(): void {
        if (this.inputElement.value.length >= this.formattedText.length) {
            this.inputElement.disabled = true;
            this.removeEvents();
            this.createInfo();
            this.togglePopup();     
        } else {
            this.createTimer();
        }
    }

    private randomMode(): void {
        const character = [...this.element.querySelectorAll<HTMLElement>('.js-word-bar-text span *')];   
        character.forEach((element, index) => {
            if (element.textContent.trim() === '') {
                for (let i = 0; i <= index; i++) {
                    character[i].classList.add('is-complete');
                }
            }
        });
    }

    private createInfo(): void {
        const content = this.targetElement.firstElementChild;
        const item = `
            ${this.storage.randomize ?' <p>Game mode : randomize</p>' : ''}
            <p>Errors count : ${this.calculateErrors()} symbols</p>
            <p>Matches count : ${this.calculateMatches()} symbols</p>
            <p>Symbols per minute : ${this.calculateMatches()} symbols</p>
            <p>Words count : ${this.calculateWordsCount()}</p>
            <p>Symbols per minute : ${this.timeDelta}</p>
            `
        content?.insertAdjacentHTML('beforeend', item);
    }
}