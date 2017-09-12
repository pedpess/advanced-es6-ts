class NegotiationList {
  constructor() {
    this._negotiation = [];
  }

  add(negotiation) {
    this._negotiation.push(negotiation);
  }

  get negotiations() {
    return [].concat(this._negotiation);
  }
}
