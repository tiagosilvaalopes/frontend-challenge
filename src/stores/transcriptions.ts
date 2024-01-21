import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export type Transcription = {
  id: string
  voice: string
  text: string
}

// The given API was not returning a valid JSON, so I used this one instead
// const API_URL = 'https://run.mocky.io/v3/ebac0b77-a220-46d3-963c-ae8881c7e4c3'
const API_URL = 'https://run.mocky.io/v3/636dde49-4435-494a-b27f-6cc10acdfbf6'

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

  function editTranscription(updatedTranscription: Transcription) {
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
    editTranscription
  }
})