class NegotiationService {

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
}
