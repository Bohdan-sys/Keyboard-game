export class Popup {
    protected targetElement: HTMLElement;
    private openPopupBtn: HTMLElement;

    constructor(element: HTMLElement) {
        this.targetElement = element;
        this.openPopupBtn;

        this.init();
    }

    protected init() : void {
        if (this.targetElement) {
            this.openPopupBtn = document.querySelector('.js-open-popup');
            this.createEvents();
        }    
    }

    protected createEvents(): void {
        this.targetElement.addEventListener('click', ({ target }) => {
            if (target === this.targetElement) {
                this.togglePopup();
            }
        });

        this.openPopupBtn?.addEventListener('click', () => this.togglePopup());
    }

    public togglePopup(): void {
        this.targetElement.classList.toggle('is-active');
        document.body.classList.toggle('is-popup-open');
    }
}