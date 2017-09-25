import { Negotiation } from './Negotiation';
export class NegotiationList {

  private _negotiation: Array<Negotiation> = [];

  constructor() {
    this._negotiation = [];

  }

  add(negotiation: Negotiation): void {
    this._negotiation.push(negotiation);
  }

  order(criteria) {
    this._negotiation.sort(criteria);
  }

  invertOrder() {
    this._negotiation.reverse();
  }

  get negotiations(): Array<Negotiation> {
    return [].concat(this._negotiation);
  }

  emptyList() {
    this._negotiation = [];
  }

  get totalVolume() {
    return this._negotiation.reduce((total, n) => total + n.volume, 0.0);
  }
}
