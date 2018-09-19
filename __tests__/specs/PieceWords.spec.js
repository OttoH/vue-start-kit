import { shallowMount } from '@vue/test-utils'

import Vue from 'vue'
import longPress from '@/plugins/longPress'
import PieceWords from '@/components/PieceWords.vue'

describe('PieceWords component', () => {
  beforeAll(() => {
    Vue.use(longPress, 1000)

    jest.mock('firebase/app', () => {
      return {}
    })

    global.liff = {init: jest.fn()}
  })

  it('sohould render correct ad item button.', () => {
    const wrapper = shallowMount(PieceWords)
    expect(wrapper.find('.add-btn').is('button')).toBe(true)
  })

  it('sohould render correct number of items.', () => {
    const wrapper = shallowMount(PieceWords)
    wrapper.setData({ words: ['t1', 't2'] })
    expect(wrapper.findAll('.word-cell').length).toBe(3)
  })

  it('sohould render text input while clicking add button.', () => {
    const wrapper = shallowMount(PieceWords)
    wrapper.find('.add-btn').trigger('click')
    expect(wrapper.vm.isShowAddText).toBe(true)
  })

  afterAll(() => {
        jest.resetModules()
  })
})
