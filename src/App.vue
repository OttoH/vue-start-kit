<style lang="scss">
@import '~normalize.css';
@import './style/base.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.tab-bar {
  display: block;
  border-bottom: solid 1px #b9b3b3;
  margin-top: 16px;
}

.tab {
  display: inline-block;
  min-width: 64px;
  height: 32px;
  line-height: 32px;
  margin-right: 12px;
  color: #9d9797;
  padding: 6px 8px;
  border-radius: 6px 6px 0 0 ;
}

a {
  text-decoration: none;
}

a.router-link-active {
  border-top: solid 1px #b9b3b3;
  border-left: solid 1px #b9b3b3;
  border-right: solid 1px #b9b3b3;
}

.debug {
  border-top: solid 1px rgba(185, 179, 179, 0.3);
  color: #b9b3b3;
  font-size: 10px;
  text-align: left;
  margin: 12px 0 0 6px;
}

</style>

<template>
  <div id="app">
    <div class="tab-bar">
      <router-link class="tab" to="/piecewords">Piece of Words</router-link>
      <router-link class="tab" to="/memostickers" >Memo Stickers</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <div class="debug" v-if="isShowDebug">
      <p>
        {{ liffCtx.viewType }}
        {{ liffctx.userId }}
        {{ liffCtx.roomId }}
        {{ liffCtx.groupId }}
      </p>
      <p>{{ liffErrMsg }}</p>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'app',

  data () {
    return {
      liffCtx: {},
      liffErrMsg: ''
    }
  },

  mounted: function () {
    liff.init((d: any) => {
      this.liffCtx = d.context
    }, (err: any) => {
      console.log(err.message)
      this.liffErrMsg = <string> err.message
    })
  },

  methods: {
    isShowDebug: function (): boolean {
      return (this.liffCtx !== {}) || Boolean(this.liffErrMsg)
    }
  }
})

</script>
