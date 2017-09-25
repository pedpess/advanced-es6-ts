export class Negotiation {
  constructor(private _date: Date,
    private _quantity: number,
    private _value: number) {
    Object.freeze(this);
  }

  get volume() {
    return this._quantity * this._value;
  }

  get date() {
    return new Date(this._date.getTime());
  }

  get quantity() {
    return this._quantity;
  }

  get value() {
    return this._value;
  }
}
