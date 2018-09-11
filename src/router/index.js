import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloWorldView = () => import('../components/Helloworld.vue')
const OtherWorldView = () => import('../components/OtherWorld.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/helloworld', component: HelloWorldView },
      { path: '/otherworld', component: OtherWorldView },
      { path: '/', redirect: '/helloworld' }
    ]
  })
}
