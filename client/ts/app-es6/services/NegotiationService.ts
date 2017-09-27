import { Negotiation, INegotiation } from './../models/index';

export class NegotiationService {
  importNegotiations(handler: IHandlerFunction): Promise<Negotiation[]> {
    return fetch('http://localhost:8080/negotiations/week')
      .then(res => handler(res))
      .then(res => res.json())
      .then((dataList: INegotiation[]) =>
        dataList.map(
          data => new Negotiation(new Date(), data.quantity, data.value)
        )
      )
      .catch(error => console.log(error));
  }
}

export interface IHandlerFunction {
  (res: Response): Response;
}
