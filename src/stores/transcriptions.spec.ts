// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { useTranscriptionsStore } from './transcriptions'
import { transcriptionMock, transcriptionIdMock } from './transcriptions.mocks'

describe('Transcriptions Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('should add a transcription', () => {
    const store = useTranscriptionsStore()

    store.addTranscription(transcriptionMock)

    expect(store.transcriptionsList).toEqual([transcriptionMock])
  })

  it('should delete a transcription', () => {
    const store = useTranscriptionsStore()
    store.addTranscription(transcriptionMock)

    store.deleteTranscription(transcriptionIdMock)

    expect(store.transcriptionsList).toEqual([])
  })

  it('should update a transcription', () => {
    const store = useTranscriptionsStore()
    store.addTranscription(transcriptionMock)

    const updatedTranscription = {
      ...transcriptionMock,
      text: 'Updated text'
    }

    store.updateTranscription(updatedTranscription)

    expect(store.transcriptionsList).toEqual([updatedTranscription])
  })
})
