export abstract class View<T> {

    private _element: Element;

    constructor(selector: string) {
        this._element = document.querySelector(selector);
    }

    abstract template(model: T): string;

    update(model: T) {
        return this._element.innerHTML = this.template(model);
    }
}
