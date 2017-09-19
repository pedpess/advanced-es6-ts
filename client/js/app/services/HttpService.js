class HttpService {

  get(url) {
    return new Promise((resolve, reject) => {

      let httpRequest = new XMLHttpRequest();

      httpRequest.open('GET', url);

      httpRequest.onreadystatechange = () => {

        if (httpRequest.readyState == 4) {

          if (httpRequest.status == 200) {
            resolve(JSON.parse(httpRequest.responseText));
          } else {
            reject(httpRequest.responseText);
          }
        }
      };

      httpRequest.send();
    })
  }

  post(url, data) {

    return new Promise((resolve, reject) => {

      let httpRequest = new XMLHttpRequest();

      httpRequest.open('POST', url, true);

      httpRequest.setRequestHeader("Content-type", "application/json");

      httpRequest.onreadystatechange = () => {

        if (httpRequest.readyState == 4) {

          if (httpRequest.status == 200) {

            resolve(JSON.parse(httpRequest.responseText));
          } else {
            reject(httpRequest.responseText);
          }
        }
      };

      httpRequest.send(JSON.stringify(data))
    })

  }

}
