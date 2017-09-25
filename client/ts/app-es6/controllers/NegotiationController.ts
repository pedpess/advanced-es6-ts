import {NegotiationList} from '../models/NegotiationList';
import {Message} from '../models/Message';
import {NegotiationsView} from '../views/NegotiationsView';
import {MessageView} from '../views/MessageView';
import {NegotiationService} from '../services/NegotiationService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negotiation} from '../models/Negotiation';

export class NegotiationController {

  private _inputDate: HTMLInputElement;
  private _inputQuantity: HTMLInputElement;
  private _inputValue: HTMLInputElement;
  private _negotiationList;
  private _message;
  private _currentOrder;
  private _service;


  constructor() {

    //let $ = <HTMLInputElement>document.querySelector.bind(document);

    this._inputDate = <HTMLInputElement>document.querySelector('#date');
    this._inputQuantity = <HTMLInputElement>document.querySelector('#quantity');
    this._inputValue = <HTMLInputElement>document.querySelector('#value');


    this._negotiationList = new Bind(
      new NegotiationList(),
      new NegotiationsView($("#negotiationsView")),
      'add', 'emptyList', 'order', 'invertOrder');

    this._message = new Bind(
      new Message(),
      new MessageView($("#messageView")),
      'text');

    this._currentOrder = '';

    this._service = new NegotiationService();

    this._init();


  }

  _init() {

    this._service
      .listNegotiations()
      .then(negotiation => {
        negotiations.forEach(negotiation =>
          this._negotiationList.add(negotiation))
      })
      .catch(error => this._message.text = error);

    setInterval(() => {
      this.importNegotiations();
    }, 2000);
  }

  add(event: Event) {

    event.preventDefault();

    let negotiation = this._createNegotiation();

    this._service
      .addNegotiation(negotiation)
      .then(message => {
        this._negotiationList.add(negotiation);
        this._message.text = message;
        this._cleanForm();
      })
      .catch(error => this._message.text = error);
  }

  order(column) {
    if (this._currentOrder == column) {
      this._negotiationList.invertOrder();
    } else {
      this._negotiationList.order((a, b) => a[column] - b[column]);
    }
    this._currentOrder = column;
  }

  importNegotiations() {

    this._service
      .import(this._negotiationList.negotiations)
      .then(negotiations => negotiations.forEach(negotiation => {
        this._negotiationList.add(negotiation);
        this._message.text = 'Negotiations were imported.';
      }))
      .catch(error => this._message.text = error);

  }

  delete() {

    this._service
      .delete()
      .then(message => {
        this._message.text = message;
        this._negotiationList.emptyList();
      })
      .catch(error => this._message.text = error);

  }

  _createNegotiation() {
    return new Negotiation(
      DateHelper.textToDate(this._inputDate.value),
      parseInt(this._inputQuantity.value),
      parseFloat(this._inputValue.value)
    );
  }

  _cleanForm() {
    this._inputDate.value = "";
    this._inputQuantity.value = 1;
    this._inputValue.value = 0.0;
    this._inputDate.focus();
  }
}
