class NegotiationService {
  getWeekNegotiations(callback) {
    let httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', 'negotiations/week');

    httpRequest.onreadystatechange = () => {

      if (httpRequest.readyState == 4) {

        if (httpRequest.status == 200) {
          callback(null, JSON.parse(httpRequest.responseText)
            .map(object => new NegotiationController(new Date(object.date), object.quantity, object.value)));

        } else {
          console.log(httpRequest.responseText);
          callback('Loading negotiations were not possible', null);
        }
      }
    };

    httpRequest.send();
  }
}
