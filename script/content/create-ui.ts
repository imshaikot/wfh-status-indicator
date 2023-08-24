export class CreateUI {
    private container: HTMLDivElement;
    private parent: HTMLElement | undefined;

    constructor() {
        this.container = document.createElement('div');
    }

    private attachStyle() {
        if (this.container) {
            this.container.style.background = 'red';
        }
    }

    setParent(query: string) {
        const el = document.querySelector(query) as HTMLElement;
        if (el) {
            this.parent = el;
        }
    }

    public append() {
        if (this.parent && this.container) {
            this.parent.appendChild(this.container);
        }
    }
}
