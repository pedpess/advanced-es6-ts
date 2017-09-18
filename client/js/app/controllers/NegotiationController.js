class NegotiationController {
  constructor() {
    let $ = document.querySelector.bind(document);

    this._inputDate = $("#date");
    this._inputQuantity = $("#quantity");
    this._inputValue = $("#value");

    let self = this;
    this._negotiationList = new Proxy(new NegotiationList(), {
      get(target, prop, receiver) {
        if (
          ["add", "emptyList"].includes(prop) &&
          typeof target[prop] == typeof Function
        ) {
          return function() {
            console.log(`intercepting ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            self._negotiationsView.update(target);
          };
        }

        return Reflect.get(target, prop, receiver);
      }
    });

    // this._negotiationList = new NegotiationList(model =>
    //   this._negotiationsView.update(model)
    // );

    this._negotiationsView = new NegotiationsView($("#negotiationsView"));
    this._negotiationsView.update(this._negotiationList);
    this._message = new Message();
    this._messageView = new MessageView($("#messageView"));

    this._messageView.update(this._message);
  }

  add(event) {
    event.preventDefault();
    this._negotiationList.add(this._createNegotiation());
    this._negotiationsView.update(this._negotiationList);

    this._message.text = "Negotiation Added";
    this._messageView.update(this._message);

    this._cleanForm();
  }

  delete() {
    this._negotiationList.emptyList();
    this._negotiationsView.update(this._negotiationList);

    this._message.text = "Negotiations were deleted";
    this._messageView.update(this._message);
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
