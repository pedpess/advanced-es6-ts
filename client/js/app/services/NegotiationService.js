'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationService = function () {
  function NegotiationService() {
    _classCallCheck(this, NegotiationService);

    this._httpService = new HttpService();
  }

  _createClass(NegotiationService, [{
    key: 'getNegotiations',
    value: function getNegotiations() {

      return Promise.all([this.getWeekNegotiations(), this.getWeekBeforeNegotiations(), this.getWeekBeforeMoreNegotiations()]).then(function (periods) {

        var negotiations = periods.reduce(function (reducedArray, period) {
          return reducedArray.concat(period);
        }, []);

        return negotiations;
      }).catch(function (error) {
        throw new Error(error);
      });
    }
  }, {
    key: 'getWeekNegotiations',
    value: function getWeekNegotiations() {

      return this._httpService.get('negotiations/week').then(function (negotiations) {
        console.log(negotiations);
        return negotiations.map(function (object) {
          return new Negotiation(new Date(object.date), object.quantity, object.value);
        });
      }).catch(function (error) {
        console.log(error);
        throw new Error('Loading negotiations for the week were not possible');
      });
    }
  }, {
    key: 'getWeekBeforeNegotiations',
    value: function getWeekBeforeNegotiations() {

      return this._httpService.get('negotiations/weekbefore').then(function (negotiations) {
        console.log(negotiations);
        return negotiations.map(function (object) {
          return new Negotiation(new Date(object.date), object.quantity, object.value);
        });
      }).catch(function (error) {
        console.log(error);
        throw new Error('Loading negotiations for the week before were not possible');
      });
    }
  }, {
    key: 'getWeekBeforeMoreNegotiations',
    value: function getWeekBeforeMoreNegotiations() {

      return this._httpService.get('negotiations/weekbeforemore').then(function (negotiations) {
        console.log(negotiations);
        return negotiations.map(function (object) {
          return new Negotiation(new Date(object.date), object.quantity, object.value);
        });
      }).catch(function (error) {
        console.log(error);
        throw new Error('Loading negotiations for the week before more were not possible');
      });
    }
  }, {
    key: 'addNegotiation',
    value: function addNegotiation(negotiation) {

      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegotiationDao(connection);
      }).then(function (dao) {
        return dao.addNegotiation(negotiation);
      }).then(function () {
        return 'Negotiation was added.';
      }).catch(function () {
        console.log(error);
        throw new Error('Negotiation was not added');
      });
    }
  }, {
    key: 'listNegotiations',
    value: function listNegotiations() {

      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegotiationDao(connection);
      }).then(function (dao) {
        return dao.listAll();
      }).catch(function (error) {
        console.log(error);
        throw new Error('Negotiation was not added');
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {

      return ConnectionFactory.getConnection().then(function (connection) {
        return new NegotiationDao(connection);
      }).then(function (dao) {
        return dao.clearAll();
      }).then(function () {
        return 'Negotiations were deleted.';
      }).catch(function (error) {
        console.log(error);
        throw new Error('Negotiations were not deleted.');
      });
    }
  }, {
    key: 'import',
    value: function _import(currentList) {
      var _this = this;

      return this.getNegotiations().then(function (negotiations) {
        return negotiations.filter(function (negotiation) {
          return !_this._negotiationList.negotiations.some(function (existingNegotiation) {
            return JSON.stringify(negotiation) == JSON.stringify(existingNegotiation);
          });
        });
      }).catch(function (error) {
        console.log(error);
        throw new Error('Not possible to search for negotiations to be imported');
      });
    }
  }]);

  return NegotiationService;
}();