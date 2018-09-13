<style lang="scss" scoped>

h3 {
  margin: 40px 0 0;
}

</style>

<template>

<div class="hello">
    <h1>{{ msg }}</h1>
    <p>Other World</p>
    <h3>playground</h3>
    <button @click='appendMsg("1", $event)'>click me</button>
    <div>{{ playground }}</div>
</div>

</template>

<script lang="ts">

import Vue from "vue"

export default Vue.extend({
  // type inference enabled
  props: {
    msg: String
  },

  data () {
    return {
      playground: '',
      url: ''
    }
  },

  methods: {
    appendMsg: function (attach: string, event: any): void {
      this.playground += `-click${attach}`
    }
  }
})

</script>
