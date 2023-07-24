import { getFromDb } from "../utils/db";

export class WordBar {
    private element: HTMLElement;
    private textWrapperElement: HTMLElement;
    private textElement: HTMLElement;
    private inputElement: HTMLInputElement;
    private storage: any;
    private data: any;
    private formattedArr: string[];
    
    constructor(element: HTMLElement) {
        this.element = element;
        this.textWrapperElement;
        this.textElement;
        this.inputElement;
        this.storage = JSON.parse(localStorage.getItem('selectedAricle')) || [];
        this.data;
        this.formattedArr;
      
        this.init();
    }

    private init() : void {
        if (this.element) {
            this.textWrapperElement = this.element.querySelector('.js-word-bar-text-wrapper');
            this.textElement = this.element.querySelector('.js-word-bar-text');
            this.inputElement = this.element.querySelector('.js-word-bar-input');

            this.getData().then(() => {
                this.createEvents();
                this.shuffleData();
            });
        }    
    }

    private async getData(): Promise<void>  {
        const { id } = this.storage;
        if (id) {
            this.data = await getFromDb(id);            
        }
    }

    private shuffleData(): void {
        const { randomize } = this.storage;
        if (this.data) {
            const { text } = this.data;
            const clearedText = text.replace(/\r?\n/g, '');
            if (randomize) {
                const randomArr = clearedText
                .split(' ')
                .sort(() => Math.random() - 0.5)
                .join(' ');
                this.textElement.innerText = randomArr;
            } else {
                this.textElement.innerText = clearedText;
            }
        }
    }

    private createEvents(): void {        
        this.inputElement?.addEventListener('input', () => this.checkWord(this.inputElement.value));
    }

    private checkWord(str: string): void {
        const { text } = this.data;
        this.textElement.innerHTML = text
            .split('')
            .map((element: string, index: number) => {
                if (index < str.length) {
                    if (element === str[index]) {
                        return `<span class="is-correct">${element}</span>`;
                    } else {
                        return `<span class="is-error">${element}</span>`;
                    }
                } else {
                    return element;
                }
            })
            .join('');
        this.calculateWordSize();
    }

    private calculateWordSize(): void {
        const character = [...this.element.querySelectorAll<HTMLElement>('.js-word-bar-text span')];
        const wordWidth = character.reduce((acc, cur) => acc + cur.offsetWidth, 0);
        this.textElement.style.left = `-${wordWidth}px`;
    }
}