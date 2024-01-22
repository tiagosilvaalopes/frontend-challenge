<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTranscriptionsStore } from '@/stores/transcriptionStore/transcriptions'
import TranscriptionItem from '@/components/TranscriptionItem/TranscriptionItem.vue'
import AddRowIcon from '@/assets/icons/IconAddRow.vue'
import ToastList from '@/components/Toast/ToastList.vue'
import { getRandomID } from '@/helpers/generateRandomID'

const transcriptionsStore = useTranscriptionsStore()
const { transcriptionsList } = storeToRefs(transcriptionsStore)

const addTranscription = () => {
  transcriptionsStore.addTranscription({
    id: getRandomID(),
    voice: 'Click to edit me!',
    text: 'Click to edit me!'
  })
}
</script>

<template>
  <div class="container">
    <div class="transcription-list">
      <p class="no-transcription-text" v-if="transcriptionsList.length === 0">No transcriptions to show :(</p>
      <template v-else v-for="transcription in transcriptionsList" :key="transcription.id">
        <TranscriptionItem :id="transcription.id" :voice="transcription.voice" :text="transcription.text" />
      </template>

      <button class="transcription-list__add-btn" @click="addTranscription"><AddRowIcon /></button>
    </div>

    <ToastList />
  </div>
</template>

<style scoped>
.container {
  padding: 0 10px;
}

.transcription-list {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px auto;
  max-width: 700px;
}

.no-transcription-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  color: #414c5e;
  text-align: center;
}

.transcription-list__add-btn {
  margin-top: 30px;

  @media screen and (width <= 400px) {
    position: absolute;
    transform: scale(1.5);
    bottom: 20px;
    right: 20px;
    position: fixed;
  }
}
</style>
