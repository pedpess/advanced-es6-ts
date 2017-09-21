class HttpService {

  _handleErrors(res) {
    if (!res.ok) throw new Error('Not possible to load the data');
    return res;
  }

  get(url) {

    return fetch(url)
      .then(res => this._handleErrors(res))
      .then(res => res.json());
  }

  post(url, data) {

    return fetch(url, {
      header: {
        'Content-type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(res => this._handleErrors(res));

  }
}
