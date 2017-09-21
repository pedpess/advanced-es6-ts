import {Negotiation} from '../models/Negotiation';

export class NegotiationDao {

  constructor(connection) {
    this._connection = connection;
    this._store = 'negotiations';
  }

  addNegotiation(negotiation) {

    return new Promise((resolve, reject) => {

      let request = this
        ._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negotiation);

      request.onsuccess = event => {
        resolve();
      };

      request.onerror = event => {
        console.log(event.target.error);
        reject('Negotiation was not addded');
      }
    })
  }

  listAll() {

    return new Promise((resolve, reject) => {

      let cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor();

      let negotiations = [];

      cursor.onsuccess = event => {

        let currentData = event.target.result;

        if (currentData) {

          let data = currentData.value;

          negotiations.push(new Negotiation(data._date, data._quantity, data._value));

          currentData.continue();
        } else {

          resolve(negotiations);
        }
      };

      cursor.onerror = event => {
        console.log(event.target.error);
        reject('Cannot list negotiations');
      };


    })
  }

  deleteAllNegotiations() {

    return new Promise((resolve, reject) => {

      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear();

      request.onsuccess = event => resolve('Negotiations were removed.');

      request.onerror = event => {
        console.log(event.target.error);
        reject('Negotiations were not removed.');
      }
    })
  }
}
