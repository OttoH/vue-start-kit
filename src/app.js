import Vue from 'vue'

import App from './App.vue'
import { createRouter } from './router'
import longPress from './plugins/longPress'

Vue.use(longPress, 1000)

// export a factory function for creating fresh app, router and store
// instances
export function createApp () {
  const router = createRouter()

  const app = new Vue({
    router,
    // the root instance simply renders the App component.
    render: h => h(App)
  })
  return { app, router }
}
