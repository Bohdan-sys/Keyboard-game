import LanguageDetect from 'languagedetect';
import { deleteFromDb, getFromDb } from '../utils/db';

export class List {
    private element: HTMLElement;
    private data: any[];
    private lngDetector: LanguageDetect;
    private classes: any;

    constructor(element: HTMLElement) {
        this.element = element;
        this.data = [];
        this.lngDetector = new LanguageDetect();
        this.classes = {
            listItem: 'js-list-item',
            card: 'js-card',
            startBtn: 'js-card-start',
            removeBtn: 'js-card-remove',
            randomCheckbox: 'js-random'
        };

        this.init();
    }

    private init() : void {
        if (this.element) {
            this.createList().then(() => {
                this.clearStorage();
                this.element.addEventListener('click', this.createEvents.bind(this));
            });
        }        
    }

    public createListItem(data: any): void {
        const [ detectedLang ] = this.lngDetector.detect(data.text, 1);
        const item = `
            <li class="list__item js-list-item">
                <div class="card js-card" data-uid="${data.id}">
                    <div class="card__info">
                        ${detectedLang ? `<span class="card__lang"> Lang: ${detectedLang[0]}</span>`: '' }
                        <span class="card__symbols">
                            Symbols count: ${data.text.length}
                        </span>
                    </div>
                    <p class="card__text">${data.text}</p>
                    <div class="card__actions">
                        <button class="button card__test js-card-start">GO!</button>
                        <button class="button card__remove js-card-remove">REMOVE!</button>
                    </div>
                </div>
            </li>
        `;
        this.element.insertAdjacentHTML('beforeend', item);
    }

    private async createList(): Promise<void> {
        this.element.innerHTML = '';
        this.data = await getFromDb();
        this.data?.forEach((element: any) => this.createListItem(element));
    }

    private createEvents(e: Event): void {
        const { listItem, card, removeBtn, startBtn } = this.classes;
        const target = e.target as HTMLElement;
        const listElement = target.closest(`.${listItem}`);
        const cardElement = target.closest(`.${card}`);
        const cardElementId = cardElement?.getAttribute('data-uid');

        if (target.classList.contains(removeBtn) && cardElementId) {
            deleteFromDb(cardElementId);
            listElement.remove();
            this.clearStorage();
        } 
        
        if (target.classList.contains(startBtn) && cardElementId) {
            this.setStorage(cardElementId);
            window.location.href = 'home.html';
        }       
    }

    private setStorage(id: string): void {
        const { randomCheckbox } = this.classes;
        const checkbox = document.querySelector(`.${randomCheckbox}`) as HTMLInputElement;    
        localStorage.setItem('selectedAricle', JSON.stringify({id, randomize: checkbox.checked}));
    }

    private clearStorage(): void {
        localStorage.removeItem('selectedAricle');
    }
}   