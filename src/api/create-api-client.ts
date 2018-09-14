/// <reference path="../../types/create-api.d.ts" />

import firebase from 'firebase/app'
import 'firebase/database'

export const createAPI = (firebaseApiParams: firebaseApiParams): api => {
  let api: api = {}
  firebase.initializeApp(firebaseApiParams.config)
  api.db = firebase.database().ref(firebaseApiParams.version)
  return api
}
