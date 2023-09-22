import { openDB } from "idb";
export const POST_STORE = "posts";
const dbPromise = openDB("posts-store", 1, {
  upgrade: (db) => {
    if (!db.objectStoreNames.contains("posts")) {
      db.createObjectStore(POST_STORE, { keyPath: "id" });
    }
  },
});
export function writeData(st: string, data: any) {
  return dbPromise.then((db) => {
    const tx = db.transaction(st, "readwrite");
    const store = tx.objectStore(st);
    store.put(data);
    return tx.done;
  });
}
export function readAllData(st: string) {
  return dbPromise.then((db) => {
    const tx = db.transaction(st, "readonly");
    const store = tx.objectStore(st);
    return store.getAll();
  });
}

export function clearAllData(st: string) {
  return dbPromise.then((db) => {
    const tx = db.transaction(st, "readwrite");
    const store = tx.objectStore(st);
    store.clear();
    return tx.done;
  });
}

export function deleteItem(st: string, id: string) {
  return dbPromise.then((db) => {
    const tx = db.transaction(st, "readwrite");
    const store = tx.objectStore(st);
    store.delete(id);
    return tx.done;
  });
}
