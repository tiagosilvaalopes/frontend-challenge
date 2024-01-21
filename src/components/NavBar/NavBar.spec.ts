import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'

import NavBar from './NavBar.vue'
import { useTranscriptionsStore } from '@/stores/transcriptions'

describe('NavBar component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders a title and two buttons', () => {
    const wrapper = mount(NavBar)

    const title = wrapper.find('h1')
    expect(title.text()).toBe('Transcriptions')

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
  })

  it('calls uploadTranscriptions when the upload button is clicked', async () => {
    const transcriptionsStore = useTranscriptionsStore()
    vi.spyOn(transcriptionsStore, 'uploadTranscriptions')

    const wrapper = mount(NavBar)

    const uploadButton = wrapper.findAll('button')[0]
    await uploadButton.trigger('click')

    expect(transcriptionsStore.uploadTranscriptions).toHaveBeenCalledTimes(1)
  })

  it('calls fetchTranscriptions when the fetch button is clicked', async () => {
    const transcriptionsStore = useTranscriptionsStore()
    vi.spyOn(transcriptionsStore, 'fetchTranscriptions')

    const wrapper = mount(NavBar)

    const fetchButton = wrapper.findAll('button')[1]
    await fetchButton.trigger('click')

    expect(transcriptionsStore.fetchTranscriptions).toHaveBeenCalledTimes(1)
  })
})
