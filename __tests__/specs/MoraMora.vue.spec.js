import { shallowMount } from '@vue/test-utils'

import Vue from 'vue'
import MoraMora from '@/components/MoraMora.vue'

describe('PieceWords component', () => {
  beforeAll(() => {
    jest.mock('firebase/app', () => {
      return {}
    })

    global.liff = {init: jest.fn()}
  })

  it('sohould render start game button.', () => {
    const wrapper = shallowMount(MoraMora)
    expect(wrapper.find('.come-Play-btn').is('button')).toBe(true)
  })

  it('sohould render game selection button while clicking start game button.', () => {
    const wrapper = shallowMount(MoraMora)
    wrapper.find('.come-Play-btn').trigger('click')
    expect(wrapper.vm.isShowGameItemButton).toBe(true)
  })

  afterAll(() => {
        jest.resetModules()
  })
})
