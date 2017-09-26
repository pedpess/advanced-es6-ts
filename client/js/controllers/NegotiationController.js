System.register(["./../views/index", "../models/index", "../helpers/decorators/index"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var index_1, index_2, index_3, NegotiationController, WorkingDay;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }
        ],
        execute: function () {
            NegotiationController = class NegotiationController {
                constructor() {
                    this._negotiationList = new index_2.NegotiationList();
                    this._negotiationsView = new index_1.NegotiationsView('#negotiationsView');
                    this._messageView = new index_1.MessageView('#messageView');
                    this._negotiationsView.update(this._negotiationList);
                }
                add(event) {
                    event.preventDefault();
                    const negotiation = new index_2.Negotiation(new Date(this._inputDate.val().replace(/-/g, ',')), parseInt(this._inputQuantity.val()), parseFloat(this._inputValue.val()));
                    this._negotiationList.add(negotiation);
                    this._negotiationsView.update(this._negotiationList);
                    this._messageView.update('Negotiation was added.');
                }
                _isWorkingDay(date) {
                    return date.getDay() != WorkingDay.Saturday && date.getDay() != WorkingDay.Sunday;
                }
            };
            __decorate([
                index_3.domInject('#date')
            ], NegotiationController.prototype, "_inputDate", void 0);
            __decorate([
                index_3.domInject('#quantity')
            ], NegotiationController.prototype, "_inputQuantity", void 0);
            __decorate([
                index_3.domInject('#value')
            ], NegotiationController.prototype, "_inputValue", void 0);
            exports_1("NegotiationController", NegotiationController);
            (function (WorkingDay) {
                WorkingDay[WorkingDay["Sunday"] = 0] = "Sunday";
                WorkingDay[WorkingDay["Monday"] = 1] = "Monday";
                WorkingDay[WorkingDay["Tuesday"] = 2] = "Tuesday";
                WorkingDay[WorkingDay["Wednesday"] = 3] = "Wednesday";
                WorkingDay[WorkingDay["Thursday"] = 4] = "Thursday";
                WorkingDay[WorkingDay["Friday"] = 5] = "Friday";
                WorkingDay[WorkingDay["Saturday"] = 6] = "Saturday";
            })(WorkingDay || (WorkingDay = {}));
        }
    };
});
