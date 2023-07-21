import LanguageDetect from 'languagedetect';

export class Card {
    private element: HTMLElement;
    private card: HTMLElement;
    private text: HTMLElement;
    private lang: HTMLElement;
    private symbols: HTMLElement;
    private removeBtn: HTMLElement;
    private list: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
        this.card;
        this.text;
        this.lang;
        this.symbols;
        this.removeBtn;
        this.list;
     

        this.init();
    }

    private init() : void {
        if (this.element) {
            this.card = this.element.querySelector('.js-card');
            this.text = this.element.querySelector('.js-card-text');
            this.lang = this.element.querySelector('.js-card-lang');
            this.symbols = this.element.querySelector('.js-card-symbols');
            this.removeBtn = this.element.querySelector('.js-card-remove');
            this.list = this.element.parentElement;
    
            this.createEvents();
            this.getInfo();
        }      
    }

    public createEvents(): void {
        this.removeBtn.addEventListener('click', e => this.removeCard());
    }

    private removeCard(): void {
        this.element.remove();
    }
 
    public getInfo(): void {
        const lngDetector = new LanguageDetect();
        const [ detectedLang ] = lngDetector.detect(this.text.textContent, 1);
        this.symbols.textContent = String(this.text.textContent.length);
        this.lang.textContent = detectedLang[0];
    }
}