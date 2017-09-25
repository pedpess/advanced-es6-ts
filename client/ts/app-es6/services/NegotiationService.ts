import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegotiationDao} from '../dao/NegotiationDao';
import {Negotiation} from '../models/Negotiation';



export class NegotiationService {

  constructor() {

    this._httpService = new HttpService();
  }

  getNegotiations() {

    return Promise.all([
      this.getWeekNegotiations(),
      this.getWeekBeforeNegotiations(),
      this.getWeekBeforeMoreNegotiations()
    ]).then(periods => {

      let negotiations = periods
        .reduce((reducedArray, period) => reducedArray.concat(period), []);

      return negotiations;

    })
      .catch(error => {
        throw new Error(error);
      });
  }


  getWeekNegotiations() {



    return this._httpService
      .get('negotiations/week')
      .then(negotiations => {
        console.log(negotiations);
        return negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
      })
      .catch(error => {
        console.log(error);
        throw new Error('Loading negotiations for the week were not possible');
      });


  }

  getWeekBeforeNegotiations() {



    return this._httpService
      .get('negotiations/weekbefore')
      .then(negotiations => {
        console.log(negotiations);
        return negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
      })
      .catch(error => {
        console.log(error);
        throw new Error('Loading negotiations for the week before were not possible');
      });


  }

  getWeekBeforeMoreNegotiations() {



    return this._httpService
      .get('negotiations/weekbeforemore')
      .then(negotiations => {
        console.log(negotiations);
        return negotiations.map(object => new Negotiation(new Date(object.date), object.quantity, object.value));
      })
      .catch(error => {
        console.log(error);
        throw new Error('Loading negotiations for the week before more were not possible');
      });


  }

  addNegotiation(negotiation) {

    return ConnectionFactory
      .getConnection()
      .then(connection => new NegotiationDao(connection))
      .then(dao => dao.addNegotiation(negotiation))
      .then(() => 'Negotiation was added.')
      .catch(() => {
        console.log(error);
        throw new Error('Negotiation was not added');
      });
  }

  listNegotiations() {

    return ConnectionFactory
      .getConnection()
      .then(connection => new NegotiationDao(connection))
      .then(dao => dao.listAll())
      .catch(error => {
        console.log(error);
        throw new Error('Negotiation was not added');
      });

  }

  delete() {

    return ConnectionFactory
      .getConnection()
      .then(connection => new NegotiationDao(connection))
      .then(dao => dao.clearAll())
      .then(() => 'Negotiations were deleted.')
      .catch(error => {
        console.log(error);
        throw new Error('Negotiations were not deleted.');
      })
  }

  import(currentList) {

    return this
      .getNegotiations()
      .then(negotiations =>
        negotiations.filter(negotiation =>
          !this._negotiationList.negotiations.some(existingNegotiation =>
            JSON.stringify(negotiation) == JSON.stringify(existingNegotiation))))
      .catch(error => {
        console.log(error);
        throw new Error('Not possible to search for negotiations to be imported');
      })
  }
}

