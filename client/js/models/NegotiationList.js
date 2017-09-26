System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NegotiationList;
    return {
        setters: [],
        execute: function () {
            NegotiationList = class NegotiationList {
                constructor() {
                    this._negotiation = [];
                }
                add(negotiation) {
                    this._negotiation.push(negotiation);
                }
                get negotiations() {
                    return [].concat(this._negotiation);
                }
            };
            exports_1("NegotiationList", NegotiationList);
        }
    };
});
