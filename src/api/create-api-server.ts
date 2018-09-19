
import firebase from 'firebase/app'
import 'firebase/database'

interface firebaseApiParams {
  config: { databaseURL: string };
  version: string
}

declare const process: any

interface api {
  db?: any;
  onServer?: boolean;
  cachedItems?: any;
  cachedIds?: any;

}

export function createAPI (firebaseApiParams: firebaseApiParams): api  {
  let api: api = {}
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api.db = process.__API__
  } else {
    firebase.initializeApp(firebaseApiParams.config)
    api.db = process.__API__ = firebase.database().ref(firebaseApiParams.version)

    api.onServer = true

    // fetched item cache
    api.cachedItems = require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })
  }
  return api
}
