"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationController = function () {
  function NegotiationController() {
    _classCallCheck(this, NegotiationController);

    var $ = document.querySelector.bind(document);

    this._inputDate = $("#date");
    this._inputQuantity = $("#quantity");
    this._inputValue = $("#value");

    this._negotiationList = new Bind(new NegotiationList(), new NegotiationsView($("#negotiationsView")), 'add', 'emptyList', 'order', 'invertOrder');

    this._message = new Bind(new Message(), new MessageView($("#messageView")), 'text');

    this._currentOrder = '';

    this._service = new NegotiationService();

    this._init();
  }

  _createClass(NegotiationController, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      this._service.listNegotiations().then(function (negotiation) {
        negotiations.forEach(function (negotiation) {
          return _this._negotiationList.add(negotiation);
        });
      }).catch(function (error) {
        return _this._message.text = error;
      });

      setInterval(function () {
        _this.importNegotiations();
      }, 2000);
    }
  }, {
    key: "add",
    value: function add(event) {
      var _this2 = this;

      event.preventDefault();

      var negotiation = this._createNegotiation();

      this._service.addNegotiation(negotiation).then(function (message) {
        _this2._negotiationList.add(negotiation);
        _this2._message.text = message;
        _this2._cleanForm();
      }).catch(function (error) {
        return _this2._message.text = error;
      });
    }
  }, {
    key: "order",
    value: function order(column) {
      if (this._currentOrder == column) {
        this._negotiationList.invertOrder();
      } else {
        this._negotiationList.order(function (a, b) {
          return a[column] - b[column];
        });
      }
      this._currentOrder = column;
    }
  }, {
    key: "importNegotiations",
    value: function importNegotiations() {
      var _this3 = this;

      this._service.import(this._negotiationList.negotiations).then(function (negotiations) {
        return negotiations.forEach(function (negotiation) {
          _this3._negotiationList.add(negotiation);
          _this3._message.text = 'Negotiations were imported.';
        });
      }).catch(function (error) {
        return _this3._message.text = error;
      });
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this4 = this;

      this._service.delete().then(function (message) {
        _this4._message.text = message;
        _this4._negotiationList.emptyList();
      }).catch(function (error) {
        return _this4._message.text = error;
      });
    }
  }, {
    key: "_createNegotiation",
    value: function _createNegotiation() {
      return new Negotiation(DateHelper.textToDate(this._inputDate.value), parseInt(this._inputQuantity.value), parseFloat(this._inputValue.value));
    }
  }, {
    key: "_cleanForm",
    value: function _cleanForm() {
      this._inputDate.value = "";
      this._inputQuantity.value = 1;
      this._inputValue.value = 0.0;
      this._inputDate.focus();
    }
  }]);

  return NegotiationController;
}();