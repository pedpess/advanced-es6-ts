import { MessageView, NegotiationsView } from './../views/index';
import { NegotiationList, Negotiation } from '../models/index';
import { domInject } from '../helpers/decorators/index';

export class NegotiationController {

  @domInject('#date')
  private _inputDate: JQuery;

  @domInject('#quantity')
  private _inputQuantity: JQuery;

  @domInject('#value')
  private _inputValue: JQuery;

  private _negotiationList = new NegotiationList();
  private _negotiationsView = new NegotiationsView('#negotiationsView');
  private _messageView = new MessageView('#messageView');

  constructor() {
    this._negotiationsView.update(this._negotiationList);
  }

  add(event: Event) {

    event.preventDefault();

    const negotiation = new Negotiation(
      new Date(this._inputDate.val().replace(/-/g, ',')),
      parseInt(this._inputQuantity.val()),
      parseFloat(this._inputValue.val())
    );

    this._negotiationList.add(negotiation);

    this._negotiationsView.update(this._negotiationList);
    this._messageView.update('Negotiation was added.');
  }

  private _isWorkingDay(date: Date) {
    return date.getDay() != WorkingDay.Saturday && date.getDay() != WorkingDay.Sunday;
  }

}

enum WorkingDay {

  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
