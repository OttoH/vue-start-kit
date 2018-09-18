<style lang="scss" scoped>

.button-container {
  width: 98%;
  margin: 12px auto 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.come-Play-btn {
  border: solid 1px #c4c4c4;
  color: #9d9797;
  padding: 4px 12px;
  border-radius: 3px;
  height: 26px;
  background: #fff;
}

.btn {
  flex: 1 1 auto;
  height: 160px;
  border: 0;
  padding: 0;
  border-radius: 3px;
}

.scissors-btn {
  background: no-repeat center url('../assets/scissors.jpg');
  background-size: contain;
}

.stone-btn {
  background: no-repeat center url('../assets/stone.jpg');
  background-size: contain;
}

.cloth-btn {
  background: no-repeat center url('../assets/cloth.jpg');
  background-size: contain;
}

.on {
 border: solid 1px #c4c4c4;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>

<template>

<div class="hello">
    <transition name="fade" mode="out-in">
      <div class="directive" :key="directive">{{ directive }} - {{  }}</div>
    </transition>
    <div class="directive" v-if="!isShowGameItemButton">
      <button class="come-Play-btn" @click="playOne()">來猜拳!!</button>
    </div>
    <transition name="fade" mode="out-in">
      <div class="button-container" v-if="isShowGameItemButton">
        <button v-bind:class="['btn', 'scissors-btn', morraResult === 'scissors' && 'on']" @click="morraBtnHandler('scissors')" />
        <button v-bind:class="['btn', 'stone-btn', morraResult === 'stone' && 'on']"  @click="morraBtnHandler('stone')" />
        <button v-bind:class="['btn', 'cloth-btn', morraResult === 'cloth' && 'on']" @click="morraBtnHandler('cloth')" />
      </div>
    </transition>
    <div class="debug" v-if="isShowDebug()">
      <div v-for="val, idx in liffCtx">
        <span>{{ idx }} - {{ val }}</span>
      </div>
      <p>{{ liffErrMsg}}</p>
    </div>
</div>

</template>

<script lang="ts">

import Vue from 'vue'
import { fetchWithListen, stopFetchWithListen, write } from '../api'

declare interface StickerMap {
  scissors: string
  stone: string
  cloth: string
  [key: string]: string
}

export default Vue.extend({

  data () {
    return {
      userId: 'default',
      dbRef: '',
      morraResult: 'NA',
      directive: 'mora mora - press 來猜拳!!!',
      liffCtx: {},
      liffErrMsg: '',
      isShowGameItemButton: false
    }
  },

  mounted () {
    const stickerMap: StickerMap = {
      scissors: '￼￼✌️',
      stone: '✊',
      cloth: '🖐'
    }

    const updateListener = (snapshot: any) => {
      if (!snapshot) { return }

      let otherUserResult
      snapshot.forEach((child: any) => {
        // the other acts
        if (
          child.key !== this.userId &&
          child.val() !== 'NA'
        ) {
          otherUserResult = child.key
        }
      })

      if (this.morraResult !== 'NA' && otherUserResult) {
        if (!liff || !liff.sendMessages) {
          // test game when not in app
          // reset all state
          this.morraResult = 'NA'
          this.directive = 'morra sent!'

          const tid = setTimeout(() => {
            this.directive = 'mora mora - press 來猜拳!!!'
            this.isShowGameItemButton = false

            clearTimeout(tid)
          }, 2600)

          return
        }

        // the other user choose, send result!
        liff.sendMessages([
          {
            type: 'text',
            text: stickerMap[this.morraResult]
          }
        ]).then((): void => {
          // reset all state
          this.morraResult = 'NA'
          this.directive = 'morra sent!'

          const tid = setTimeout(() => {
            this.directive = 'mora mora - press 來猜拳!!!'
            this.isShowGameItemButton = false

            clearTimeout(tid)
          }, 2600)
        }).catch((error: any) => {
          console.log('error while sending msg', error)
        })
      }
    }

    liff.init((d: any) => {
      this.liffCtx = d.context || {}
      this.dbRef = `${d.context.utouId}-morra`

      liff.getProfile()
      .then((profile: liffProfile) => {
        this.userId = `${profile.userId}`

        // register listener on firebase
        fetchWithListen(this.dbRef, updateListener)
      })
    }, (err: any) => {
      this.liffErrMsg = err.message as string

      // test game when not in app
      this.userId = `${Math.floor(Math.random() * 10) % 2}`
      this.dbRef = 'testUTOU-morra'
      fetchWithListen(this.dbRef, updateListener)
    })
  },

  destroyed () {
    stopFetchWithListen(this.dbRef, null)
  },

  methods: {
    morraBtnHandler: function (name: string, event: any): void {
      // initial state do not act
      if (
        this.userId === 'default' ||
        this.morraResult !== 'NA'
      ) {
        return
      }

      // update local state
      this.morraResult = name

      // update game result
      write(`${this.dbRef}/${this.userId}`, name)
      .then((): void => {
        this.directive = 'waiting for the other one.'
      }).catch((e: any) => {
        console.log(e)
      })
    },
    isShowDebug: function (): boolean {
      return (
        process.env.NODE_ENV !== 'production' &&
        (this.liffCtx !== {} || Boolean(this.liffErrMsg))
      )
    },
    playOne: function (): void {
      // reset db state
      write(`${this.dbRef}/${this.userId}`, 'NA')

      if (liff && liff.sendMessages) {
        // the other user choose, send result!
        liff.sendMessages([
          {
            type: 'text',
            text: '猜拳!'
          }
        ])
      }

      this.isShowGameItemButton = true
    }
  }
})

</script>
