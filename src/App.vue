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
  margin-top: 8px;
}

.tab {
  display: inline-block;
  min-width: 48px;
  height: 32px;
  line-height: 32px;
  color: #9d9797;
  padding: 6px 8px;
  background: #fff;
}

a {
  text-decoration: none;
}

a.router-link-active {
  border-bottom: solid 1px #b9b3b3;
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
      <router-link class="tab" to="/piecewords">HELLO WORD</router-link>
      <router-link class="tab" to="/moramora" >MORA MORA</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'app'
})

</script>
