import { MessageView } from './../views/MessageView';
import { NegotiationsView } from './../views/NegotiationsView';

import { NegotiationList } from '../models/NegotiationList';
import { Negotiation } from '../models/Negotiation';

export class NegotiationController {

  private _inputDate: JQuery;
  private _inputQuantity: JQuery;
  private _inputValue: JQuery;
  private _negotiationList = new NegotiationList();
  private _negotiationsView = new NegotiationsView('#negotiationsView');
  private _messageView = new MessageView('#messageView');

  constructor() {


    this._inputDate = $('#date');
    this._inputQuantity = $('#quantity');
    this._inputValue = $('#value');
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

}
