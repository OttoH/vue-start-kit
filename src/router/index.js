import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const PieceWordsView = () => import('../components/PieceWords.vue')
const MoraMoraView = () => import('../components/MoraMora.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/piecewords', component: PieceWordsView, props: { msg: 'passing props to HelloWorld'} },
      { path: '/moramora', component: MoraMoraView },
      { path: '/', redirect: '/piecewords' }
    ]
  })
}
