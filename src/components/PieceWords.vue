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
  <div class="directive">long press on items to delete~</div>
  <ul class="word-list">
    <li class="word-cell" v-for="(word, idx) in words">
      <button class="word-btn" key="`w${idx}`" @click="sendText(word)" v-long-press="deleteWord">{{ word }}</button>
    </li>
    <li class="word-cell">
      <input class="add-text-input" ref="addTextInput" v-show="isShowAddText" v-model="addText" type="text" />
      <button class="word-btn add-btn" @click="toggleAddText"></button>
    </li>
  </ul>
</div>

</template>

<script lang="ts">

import Vue from "vue"
// import { sendLiffMsg } from '../lib/liff-starter.js'

export default Vue.extend({
  props: {
    msg: String
  },

  data () {
    return {
      words: [
        'hello',
        'how\'s it goinig on today',
        'suit up!!',
        '幹嘛啦',
        '我想想',
        '在幹嘛',
        '好煩',
        '等等喔',
        '少來'
      ],
      isShowAddText: false,
      addText: ''
    }
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
        }
      }
    },
    deleteWord: function (e: any): void {
      const delWord = e.target.textContent
      this.words = this.words.filter((word) => {
        return word !== delWord
      })
    }
  }
})

</script>
