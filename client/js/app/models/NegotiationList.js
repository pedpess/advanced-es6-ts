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

  emptyList() {
    this._negotiation = [];
  }

  get totalVolume() {
    return this._negotiation.reduce((total, n) => total + n.volume, 0.0);
  }
}
