import { type Transcription } from './transcriptions.shared'

export const transcriptionIdMock = '1'

export const transcriptionsListMock: Array<Transcription> = [
  {
    id: '1',
    voice: 'Voice 1',
    text: 'Some text'
  },
  {
    id: '2',
    voice: 'Voice 2',
    text: 'Another text'
  },
  {
    id: '3',
    voice: 'Voice 1',
    text: 'Yet another text'
  }
]

export const transcriptionMock: Transcription = {
  id: '1',
  voice: 'Voice 1',
  text: 'Some text'
}
