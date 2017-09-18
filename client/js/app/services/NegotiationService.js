class NegotiationService {

  getWeekNegotiations() {

    return new Promise((resolve, reject) => {
      let httpRequest = new XMLHttpRequest();

      httpRequest.open('GET', 'negotiations/week');

      httpRequest.onreadystatechange = () => {

        if (httpRequest.readyState == 4) {

          if (httpRequest.status == 200) {
            resolve(JSON.parse(httpRequest.responseText)
              .map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));

          } else {
            reject('Loading negotiations for the week were not possible', null);
          }
        }
      };

      httpRequest.send();

    })
  }

  getWeekBeforeNegotiations() {

    return new Promise((resolve, reject) => {
      let httpRequest = new XMLHttpRequest();

      httpRequest.open('GET', 'negotiations/weekbefore');

      httpRequest.onreadystatechange = () => {

        if (httpRequest.readyState == 4) {

          if (httpRequest.status == 200) {
            resolve(JSON.parse(httpRequest.responseText)
              .map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));

          } else {
            reject('Loading negotiations week before were not possible', null);
          }
        }
      };

      httpRequest.send();

    })
  }

  getWeekBeforeMoreNegotiations() {

    return new Promise((resolve, reject) => {
      let httpRequest = new XMLHttpRequest();

      httpRequest.open('GET', 'negotiations/weekbeforemore');

      httpRequest.onreadystatechange = () => {

        if (httpRequest.readyState == 4) {

          if (httpRequest.status == 200) {
            resolve(JSON.parse(httpRequest.responseText)
              .map(object => new Negotiation(new Date(object.date), object.quantity, object.value)));

          } else {
            reject('Loading negotiations week before more were not possible', null);
          }
        }
      };

      httpRequest.send();

    })
  }
}
