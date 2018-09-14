declare const Promise: any;

// this is aliased in webpack config based on server/client build
import { createAPI } from 'createApi'
import { firebaseSetting } from '../lib/consts'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  version: '/jarvis',
  config: {
    databaseURL: 'https://jarvis-1d720.firebaseio.com'
  }
})

export const fetch = (child: string): Promise<string> => {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve: any, reject: any) => {
      api.db.child(child).once('value', (snapshot: any) => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        // if (val) {
        //   val.__lastUpdated = Date.now()
        // }
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export const write = (text: string): void => {
  if (text) {
    api.db.set({
      [firebaseSetting.masgs]: text
    })
  }
}
