'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegotiationDao = function () {
  function NegotiationDao(connection) {
    _classCallCheck(this, NegotiationDao);

    this._connection = connection;
    this._store = 'negotiations';
  }

  _createClass(NegotiationDao, [{
    key: 'addNegotiation',
    value: function addNegotiation(negotiation) {
      var _this = this;

      return new Promise(function (resolve, reject) {

        var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negotiation);

        request.onsuccess = function (event) {
          resolve();
        };

        request.onerror = function (event) {
          console.log(event.target.error);
          reject('Negotiation was not addded');
        };
      });
    }
  }, {
    key: 'listAll',
    value: function listAll() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {

        var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

        var negotiations = [];

        cursor.onsuccess = function (event) {

          var currentData = event.target.result;

          if (currentData) {

            var data = currentData.value;

            negotiations.push(new Negotiation(data._date, data._quantity, data._value));

            currentData.continue();
          } else {

            resolve(negotiations);
          }
        };

        cursor.onerror = function (event) {
          console.log(event.target.error);
          reject('Cannot list negotiations');
        };
      });
    }
  }, {
    key: 'deleteAllNegotiations',
    value: function deleteAllNegotiations() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {

        var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

        request.onsuccess = function (event) {
          return resolve('Negotiations were removed.');
        };

        request.onerror = function (event) {
          console.log(event.target.error);
          reject('Negotiations were not removed.');
        };
      });
    }
  }]);

  return NegotiationDao;
}();
//# sourceMappingURL=NegotiationDao.js.map