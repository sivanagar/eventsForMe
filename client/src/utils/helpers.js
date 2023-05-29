/*
IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. 
This API uses indexes to enable high-performance searches of this data.
 While Web Storage is useful for storing smaller amounts of data, it is less useful for storing larger amounts of structured data. 
 IndexedDB provides a solution. 
*/

export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  // helper function to update Globalstates or get global states when scope changes
  // i.e when a user redirects, or when they lose network conection briefly

  // indexDB is a client side database api, used like local storage to store data


  return new Promise((resolve, reject) => {
    // open our local data base of storage
    const dbVersion  = 1
    let request = window.indexedDB.open('EventsForMe', dbVersion);
    let db, tx, store;
    request.onupgradeneeded = function(e) {
      const db = request.result;
      // create the initial database entry
      db.createObjectStore('cart', { keyPath: '_id' });
      
      
      
    
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      db = request.result; // define the database we are using
      tx = db.transaction(storeName, 'readwrite'); // define what rights to the database we will use
      // i.e we will read/write to the storeName passed as an argument
      store = tx.objectStore(storeName); // create a copy of the already existing data base store

      db.onerror = function(e) {
        console.log('error', e);
      };

      switch (method) {
        case 'put': // if put, update the store, and return it
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._idCache);
          break;
        case 'clear-cart':
          //
          //let request = window.indexedDB.open('shop-shop', 1);
          break;
        default:
          console.log('No valid method');
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
