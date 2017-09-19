class NegotiationController {
  constructor() {

    let $ = document.querySelector.bind(document);

    this._inputDate = $("#date");
    this._inputQuantity = $("#quantity");
    this._inputValue = $("#value");

    this._negotiationList = new Bind(
      new NegotiationList(),
      new NegotiationsView($("#negotiationsView")),
      'add', 'emptyList');

    this._message = new Bind(
      new Message(),
      new MessageView($("#messageView")),
      'text');

  }

  add(event) {
    event.preventDefault();
    this._negotiationList.add(this._createNegotiation());
    this._message.text = "Negotiation Added";
    this._cleanForm();
  }

  importNegotiations() {
    let service = new NegotiationService();

    service.getNegotiations()
      .then(negotiations => {
        negotiations
          .forEach(negotiation => this._negotiationList.add(negotiation));
        this._message.text = 'Negotiations were imported.';
      })
      .catch(error => this._message.text = error);
  }

  delete() {
    this._negotiationList.emptyList();
    this._message.text = "Negotiations were deleted";
  }

  _createNegotiation() {
    return new Negotiation(
      DateHelper.textToDate(this._inputDate.value),
      this._inputQuantity.value,
      this._inputValue.value
    );
  }

  _cleanForm() {
    this._inputDate.value = "";
    this._inputQuantity.value = 1;
    this._inputValue.value = 0.0;
    this._inputDate.focus();
  }
}
