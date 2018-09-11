<style lang="scss">

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

</style>

<template>
  <div id="app">
    <router-link to="/" exact>
      <img alt="Vue logo" src="./assets/logo.png">
    </router-link>
    <div>
      <router-link to="/helloworld">hellow vue</router-link>
      <router-link to="/otherworld">other</router-link>
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
