"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationList = function () {
  function NegotiationList() {
    _classCallCheck(this, NegotiationList);

    this._negotiation = [];
  }

  _createClass(NegotiationList, [{
    key: "add",
    value: function add(negotiation) {
      this._negotiation.push(negotiation);
    }
  }, {
    key: "order",
    value: function order(criteria) {
      this._negotiation.sort(criteria);
    }
  }, {
    key: "invertOrder",
    value: function invertOrder() {
      this._negotiation.reverse();
    }
  }, {
    key: "emptyList",
    value: function emptyList() {
      this._negotiation = [];
    }
  }, {
    key: "negotiations",
    get: function get() {
      return [].concat(this._negotiation);
    }
  }, {
    key: "totalVolume",
    get: function get() {
      return this._negotiation.reduce(function (total, n) {
        return total + n.volume;
      }, 0.0);
    }
  }]);

  return NegotiationList;
}();