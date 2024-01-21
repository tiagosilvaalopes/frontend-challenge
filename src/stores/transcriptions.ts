import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { type Transcription, API_URL } from './transcriptions.shared'

export const useTranscriptionsStore = defineStore('transcriptions', () => {
  const transcriptionsList = ref<Array<Transcription>>([])

  function fetchTranscriptions() {
    axios.get(API_URL).then((response) => {
      transcriptionsList.value = response.data
    })
  }

  function uploadTranscriptions() {
    axios.post(API_URL, transcriptionsList.value).then(() => {
      console.log('Transcriptions uploaded')
    })
  }

  function addTranscription(newTranscription: Transcription) {
    transcriptionsList.value.push(newTranscription)
  }

  function deleteTranscription(transcriptionId: string) {
    transcriptionsList.value = transcriptionsList.value.filter((transcription) => transcription.id !== transcriptionId)
  }

  function updateTranscription(updatedTranscription: Transcription) {
    const index = transcriptionsList.value.findIndex((transcription) => transcription.id === updatedTranscription.id)
    if (index !== -1) {
      transcriptionsList.value[index] = updatedTranscription
    }
  }

  return {
    transcriptionsList,
    addTranscription,
    deleteTranscription,
    fetchTranscriptions,
    uploadTranscriptions,
    updateTranscription
  }
})
