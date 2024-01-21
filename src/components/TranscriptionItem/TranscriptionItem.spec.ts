import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { voiceDataTestID, textDataTestID } from './TranscriptionItem.shared'

import TranscriptionItem from './TranscriptionItem.vue'
import { useTranscriptionsStore } from '@/stores/transcriptions'

describe('TranscriptionItem component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const props = {
    id: '1',
    voice: 'Voice 1',
    text: 'This is a transcription'
  }

  it('renders with a checkbox, an icon, voice, text and the delete button', () => {
    const wrapper = mount(TranscriptionItem, { props })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.exists()).toBeTruthy()

    const personIcon = wrapper.findAll('svg')[0]
    expect(personIcon.exists()).toBeTruthy()
    expect(personIcon.classes()).toContain('person-icon')

    const voice = wrapper.find(`[data-testid='${voiceDataTestID}']`)
    expect(voice.exists()).toBeTruthy()
    expect(voice.text()).toBe('Voice 1')

    const text = wrapper.find(`[data-testid='${textDataTestID}']`)
    expect(text.exists()).toBeTruthy()
    expect(text.text()).toBe('This is a transcription')

    const deleteButton = wrapper.find('button')
    expect(deleteButton.exists()).toBeTruthy()
    expect(deleteButton.classes()).toContain('transcription-list-item--delete-btn')
  })

  it('calls the deleteTranscription method when the delete button is clicked', async () => {
    const transcriptionsStore = useTranscriptionsStore()
    transcriptionsStore.addTranscription({ id: '1', voice: 'Voice 1', text: 'This is a transcription' })

    vi.spyOn(transcriptionsStore, 'deleteTranscription')

    const wrapper = mount(TranscriptionItem, { props })

    expect(transcriptionsStore.transcriptionsList).toHaveLength(1)

    const deleteButton = wrapper.find('button')
    await deleteButton.trigger('click')

    expect(transcriptionsStore.deleteTranscription).toHaveBeenCalledTimes(1)
    expect(transcriptionsStore.deleteTranscription).toHaveBeenCalledWith(props.id)
    expect(transcriptionsStore.transcriptionsList).toHaveLength(0)
  })
})
