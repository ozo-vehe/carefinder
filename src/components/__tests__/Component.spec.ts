import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Hero from '../HeroSection.vue'

describe('Hero', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = mount(Hero)
  })
  it('renders properly', () => {
    expect(wrapper.text()).toContain('Empower Your Health Journey with')
  })
})
