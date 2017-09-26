System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negotiation;
    return {
        setters: [],
        execute: function () {
            Negotiation = class Negotiation {
                constructor(date, quantity, value) {
                    this.date = date;
                    this.quantity = quantity;
                    this.value = value;
                    Object.freeze(this);
                }
                get volume() {
                    return this.quantity * this.value;
                }
            };
            exports_1("Negotiation", Negotiation);
        }
    };
});
