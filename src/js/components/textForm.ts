import { addToDb } from '../utils/db';
import { List } from './list';
import { Popup } from './popup';

export class TextForm {
    private element: HTMLElement;
    private input: HTMLTextAreaElement;
    private popUp: Popup;
    private list: List;

    constructor(element: HTMLElement) {
        this.element = element;
        this.input;
        this.popUp;
        this.list;

        this.init();
    }

    private init() : void {
        if (this.element) {
            this.input = this.element.querySelector('textarea');
            this.popUp = new Popup(document.querySelector('.js-popup'));
            this.list = new List(document.querySelector('.js-list'));
            this.createEvents();
        }    
    }

    private createEvents(): void {
        this.element.addEventListener('submit', e => {
            e.preventDefault();
            this.submitForm();
        });
    }

    public submitForm(): void {
        if (this.input.value) {
            const newData = {
                "id": Date.now(),
                "text": `${this.input.value.replace(/<[^>]*>|[^a-zA-Z0-9,;\-.!?<> ]/g, '')}`
            }
  
            addToDb(newData);
            this.popUp?.togglePopup();
            this.list?.createListItem(newData);
            this.input.value = '';
        }
    }
}