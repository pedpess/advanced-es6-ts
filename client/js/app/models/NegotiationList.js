class NegotiationList {
  constructor(trap) {
    this._negotiation = [];
    this._trap = trap;

  }

  add(negotiation) {
    this._negotiation.push(negotiation);
    this._trap(this);
  }

  get negotiations() {
    return [].concat(this._negotiation);
  }

  emptyList() {
    this._negotiation = [];
  }
}
