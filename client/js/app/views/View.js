class View {
    constructor(element) {
        this._element = element;
    }

    template() {
        throw new Error('Method template should be implemented');
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}