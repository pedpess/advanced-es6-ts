System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var View;
    return {
        setters: [],
        execute: function () {
            View = class View {
                constructor(selector, scalp = false) {
                    this._element = $(selector);
                    this._scalp = scalp;
                }
                update(model) {
                    let template = this.template(model);
                    if (this._scalp) {
                        template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
                    }
                    return this._element.html(template);
                }
            };
            exports_1("View", View);
        }
    };
});
