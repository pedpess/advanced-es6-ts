var ConnectionFactory = (function() {

  var stores = ['negotiations'];
  var dbVersion = 1;
  var dbName = 'negotiationsframe';

  var connection = null;

  class ConnectionFactory {

    constructor() {
      throw new Error('Cannot create an instance of ConnectionFactory');
    }

    static getConnection() {

      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, dbVersion);

        openRequest.onupgradeneeded = event => {

          ConnectionFactory._createStores(event.target.result);
        }

        openRequest.onsuccess = event => {

          if (!connection) connection = event.target.result;
          resolve(connection);

        }

        openRequest.onerror = event => {

          console.log(event.target.error);

          reject(event.target.error.name);
        }
      })

    }

    static _createStores(connection) {

      stores.forEach(store => {

        if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
        connection.createObjectStore(store, { autoIncrement: true });

      });
    }

  }
})();
