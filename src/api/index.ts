declare const Promise: any;

// this is aliased in webpack config based on server/client build
import { createAPI } from 'createApi'

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
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export const fetchWithListen = (child: string, cb: any): Promise<string> => {
  logRequests && console.log(`fetching & listener ${child}...`)
  return api.db.child(child).on('value', cb, (err: any) => {
    console.log(`fetchWithListen fail`, err)
  })
}

export const stopFetchWithListen = (child: string, cb: any): void => {
  logRequests && console.log(`stopping & listener ${child}...`)
  if (api && api.db && api.db.child(child)) {
    api.db.child(child).off('value', cb)
  }
}

export const write = (child: string, text: string | null): Promise<string> => {
  return api.db.child(child).set(text)
}
