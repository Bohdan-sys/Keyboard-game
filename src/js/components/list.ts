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
            removeBtn: 'js-card-remove'
        };

        this.init();
    }

    private init() : void {
        if (this.element) {
            this.createList();
            this.element.addEventListener('click', this.createEvents.bind(this));
        }        
    }

    public createListItem(data: any): void {
        const [ detectedLang ] = this.lngDetector.detect(data.text, 1);
        const item = `
            <li class="list__item js-list-item">
                <div class="card js-card" data-uid="${data.id}">
                    <div class="card__info">
                        <span class="card__lang js-card-lang">
                            ${detectedLang ? detectedLang[0]: ''}
                        </span>
                        <span class="card__symbols js-card-symbols">
                            ${data.text.length}
                        </span>
                    </div>
                    <p class="card__text js-card-text">${data.text}</p>
                    <div class="card__actions">
                        <a href="#" class="button card__test">GO!</a>
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
        const { listItem, card, removeBtn } = this.classes;
        const target = e.target as HTMLElement;
        const listElement = target.closest(`.${listItem}`);
        const cardElement = target.closest(`.${card}`);
        if (target.classList.contains(removeBtn)) {
            deleteFromDb(cardElement.getAttribute('data-uid'));
            listElement.remove();
        }        
    }
}   