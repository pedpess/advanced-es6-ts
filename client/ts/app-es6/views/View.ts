export abstract class View<T> {

    private _element: JQuery;

    constructor(selector: string) {
        this._element = $(selector);
    }

    abstract template(model: T): string;

    update(model: T) {
        return this._element.html(this.template(model));
    }
}
