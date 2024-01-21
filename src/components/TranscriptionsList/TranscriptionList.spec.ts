import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'

import TranscriptionsList from './TranscriptionsList.vue'
import { useTranscriptionsStore } from '@/stores/transcriptions'

describe('TranscriptionItem component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders with a paragraph and an add button when there are no transcriptions in the store', () => {
    const wrapper = mount(TranscriptionsList)

    const paragraph = wrapper.find('p')
    expect(paragraph.exists()).toBeTruthy()
    expect(paragraph.text()).toContain('No transcriptions to show')

    const addButton = wrapper.find('button')
    expect(addButton.exists()).toBeTruthy()
    expect(addButton.classes()).toContain('transcription-list-add-btn')
  })

  it('adds a new transcription when the add button is clicked', async () => {
    const transcriptionsStore = useTranscriptionsStore()
    vi.spyOn(transcriptionsStore, 'addTranscription')

    const wrapper = mount(TranscriptionsList)

    const paragraphBeforeAddingTranscription = wrapper.find('p')
    expect(paragraphBeforeAddingTranscription.exists()).toBeTruthy()

    expect(transcriptionsStore.transcriptionsList).toHaveLength(0)

    const addButton = wrapper.find('button')
    await addButton.trigger('click')

    expect(wrapper.findAll('.transcription-list-item')).toHaveLength(1)
    expect(transcriptionsStore.addTranscription).toHaveBeenCalledTimes(1)
    expect(transcriptionsStore.transcriptionsList).toHaveLength(1)

    const paragraphAfterAddingTranscription = wrapper.find('p')
    expect(paragraphAfterAddingTranscription.exists()).toBeFalsy()
  })

  it('renders a list of transcriptions when there are already transcriptions in the store', () => {
    const transcriptionsStore = useTranscriptionsStore()
    transcriptionsStore.addTranscription({ id: '1', voice: 'Voice 1', text: 'Some text' })
    transcriptionsStore.addTranscription({ id: '2', voice: 'Voice 2', text: 'Another text' })

    const wrapper = mount(TranscriptionsList)

    expect(wrapper.findAll('.transcription-list-item')).toHaveLength(2)
    expect(transcriptionsStore.transcriptionsList).toHaveLength(2)
  })
})
