import { AddTextForm } from './addTextForm';
import { Card } from './card';

export class List {
    private element: HTMLElement;
    private data;
    private listItem: HTMLElement[];

    constructor(element: HTMLElement) {
        this.element = element;
        this.data = JSON.parse(localStorage.getItem('texter')) || [];
        this.listItem;
        this.init();
    }

    private init() : void {
        if (this.element) {
            this.createList();
            this.getCardInfo();
        }        
    }

    public createListItem(data: any): void {
        const item = `
            <li class="list__item js-list-item">
                <div class="card js-card" data-uid="${data.id}">
                    <div class="card__info">
                        <span class="card__lang js-card-lang">
                            en
                        </span>
                        <span class="card__symbols js-card-symbols">
                            3
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
        this.element.insertAdjacentHTML('beforeend', item)
    }

    private createList(): void {
        this.data?.forEach((element: any) => {
            this.createListItem(element);
        });
    }

    private getCardInfo(): void {
        this.listItem?.forEach(item => new Card(item));
    }
}   