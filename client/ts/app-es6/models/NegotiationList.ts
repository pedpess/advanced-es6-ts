import { Negotiation } from './Negotiation';
export class NegotiationList {
  private _negotiation: Negotiation[] = [];

  add(negotiation: Negotiation): void {
    this._negotiation.push(negotiation);
  }

  negotiations(): Negotiation[] {
    return ([] as Negotiation[]).concat(this._negotiation);
  }
}
