import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { type Transcription, API_URL } from './transcriptions.shared'
import { useToastStore } from '@/stores/toastStore/toast'
import { getRandomID } from '@/helpers/generateRandomID'

export const useTranscriptionsStore = defineStore('transcriptions', () => {
  const toastStore = useToastStore()
  const transcriptionsList = ref<Array<Transcription>>([])

  function fetchTranscriptions() {
    axios
      .get(API_URL)
      .then((response) => {
        transcriptionsList.value = response.data

        toastStore.addToast({
          id: getRandomID(),
          title: 'Transcriptions fetched',
          type: 'success',
          message: 'All transcriptions have been fetched from the server'
        })
      })
      .catch(() => {
        toastStore.addToast({
          id: getRandomID(),
          title: 'Transcriptions fetch failed',
          type: 'error',
          message: 'Something went wrong'
        })
      })
  }

  function uploadTranscriptions() {
    axios
      .post(API_URL, transcriptionsList.value)
      .then(() => {
        toastStore.addToast({
          id: getRandomID(),
          title: 'Transcriptions uploaded',
          type: 'success',
          message: 'All transcriptions have been uploaded to the server'
        })
      })
      .catch(() => {
        toastStore.addToast({
          id: getRandomID(),
          title: 'Transcriptions upload failed',
          type: 'error',
          message: 'Something went wrong'
        })
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
