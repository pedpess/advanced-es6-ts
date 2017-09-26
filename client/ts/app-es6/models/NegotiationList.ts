import { Negotiation } from './Negotiation';
export class NegotiationList {

  private _negotiation: Array<Negotiation> = [];

  add(negotiation: Negotiation): void {
    this._negotiation.push(negotiation);
  }


  get negotiations(): Array<Negotiation> {
    return ([] as Array<Negotiation>).concat(this._negotiation);
  }

}
