export abstract class View<T> {

    private _element: JQuery;
    private _scalp: boolean;

    constructor(selector: string, scalp: boolean = false) {
        this._element = $(selector);
        this._scalp = scalp;
    }

    abstract template(model: T): string;

    update(model: T) {
        let template = this.template(model);

        if (this._scalp) {
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        }
        return this._element.html(template);
    }
}
