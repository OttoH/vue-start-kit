<style lang="scss" scoped>

.word-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 6px 0;
}

.word-cell {
  flex: 0 1 auto;
  margin: 6px 6px;
}

.word-btn {
  border: solid 1px #c4c4c4;
  border-radius: 3px;
  background: #fff;
  padding: 6px 8px;
  text-align: center;
  font-size: 13px;
}

.add-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: no-repeat center url('../assets/plus.svg');
}

.add-text-input {
  height: 28px;
  border: 0px;
  border-bottom: solid 1px #c4c4c4;
  text-indent: 6px;
}

.directive {
  margin-top: 12px;
  text-align: center;
  color: #9d9797;
  font-size: 12px;
}

</style>

<template>

<div>
  <div class="directive" v-if="words.length > 0">long press on items to delete~</div>
  <div class="directive" v-else>loading...</div>
  <ul class="word-list" v-show="words.length > 0">
    <li class="word-cell" v-for="(word, idx) in words">
      <button class="word-btn" key="`w${idx}`" @click="sendText(word)" v-long-press="deleteWord">{{ word }}</button>
    </li>
    <li class="word-cell">
      <input class="add-text-input" ref="addTextInput" v-show="isShowAddText" v-model="addText" type="text" />
      <button class="word-btn add-btn" @click="toggleAddText"></button>
    </li>
  </ul>
  <div class="debug" v-if="isShowDebug()">
    <div v-for="val in liffCtx">
      <span>{{ val }}</span>
    </div>
    <p>{{ liffErrMsg}}</p>
  </div>
</div>

</template>

<script lang="ts">

import Vue from "vue"

import { firebaseSetting } from '../lib/consts'
import { fetch, write } from '../api'

export default Vue.extend({
  props: {
    msg: String
  },

  data () {
    return {
      userId: 'default',
      words: <string[]> [],
      isShowAddText: false,
      addText: '',
      liffCtx: {},
      liffErrMsg: ''
    }
  },

  mounted () {
    const fetchDefaultData = (): any =>
      fetch('default')
      .then((val: string) => {
        this.words = val.split(',')
      })

    liff.init((d: any) => {
      this.liffCtx = d.context || {}

      liff.getProfile().then((profile: liffProfile) => {
        this.userId = profile.userId
        // fetch firebase
        fetch(d.context.userId)
        .then((val: string) => {
          if (val) {
            this.words = val.split(',')
          } else {
            fetchDefaultData().then(() => {
              // inital new user words
              write(d.context.userId, this.words.join(','))
            })
          }
        })
      })
    }, (err: any) => {
      this.liffErrMsg = <string> err.message
      // fetch default firebase data
      fetchDefaultData()
    })
  },

  methods: {
    sendText: function (text: string): void {
      if (liff && liff.sendMessages) {
        liff.sendMessages([
          {
            type: 'text',
            text
          }
        ]).then(function (): any {
          console.log(`${text} sent`)
        }).catch(function (error: any): void {
          console.log('send error', error)
        })
      }
     },
    toggleAddText: function (): void {
      this.isShowAddText = !this.isShowAddText
      if (this.isShowAddText) {
        const addTextInput = <HTMLInputElement> this.$refs.addTextInput
        this.$nextTick(function () {
          addTextInput.focus()
        })
      } else {
        if (this.addText && this.addText !== '') {
          this.words = this.words.concat(this.addText.trim())
          this.addText = ''
          // write back to db
          write(this.userId, this.words.join(','))
        }
      }
    },
    deleteWord: function (e: any): void {
      const delWord = e.target.textContent
      this.words = this.words.filter((word) => {
        return word !== delWord
      })
      // write back to db
      write(this.userId, this.words.join(','))
    },
    isShowDebug: function (): boolean {
      return (
        process.env.NODE_ENV !== 'production' &&
        (this.liffCtx !== {} || Boolean(this.liffErrMsg))
      )
    }
  }
})

</script>
