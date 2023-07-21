export class Popup {
    private element: HTMLElement;
    private openPopupBtn: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
        this.openPopupBtn;

        this.init();
    }

    private init() : void {
        if (this.element) {
            this.openPopupBtn = document.querySelector('.js-open-popup');
            this.createEvents();
        }    
    }

    private createEvents(): void {
        this.element.addEventListener('click', ({ target }) => {
            if (target === this.element) {
                this.togglePopup();
            }
        });

        this.openPopupBtn?.addEventListener('click', () => this.togglePopup());
    }

    public togglePopup(): void {
        this.element.classList.toggle('is-active');
    }
}