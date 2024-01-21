<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTranscriptionsStore } from '@/stores/transcriptions'
import TranscriptionItem from '@/components/TranscriptionItem/TranscriptionItem.vue'
import AddRowIcon from '@/assets/icons/IconAddRow.vue'

const transcriptionsStore = useTranscriptionsStore()
const { transcriptionsList } = storeToRefs(transcriptionsStore)
// const { addTranscription } = transcriptionsStore

const transcriptions = computed(() => transcriptionsList.value)

const addTranscription = () => {
  transcriptions.value.push({
    id: `ID${Math.random().toString(36).slice(2)}`,
    voice: '',
    text: ''
  })
}
</script>

<template>
  <div class="container">
    <div class="transcription-list">
      <div class="no-transcription-text" v-if="transcriptions.length === 0">No transcriptions to show :(</div>
      <template v-else v-for="transcription in transcriptions" :key="transcription.id">
        <TranscriptionItem :id="transcription.id" :voice="transcription.voice" :text="transcription.text" />
      </template>
      <button class="transcription-list-add-btn" @click="addTranscription"><AddRowIcon /></button>
    </div>
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

.transcription-list-add-btn {
  margin-top: 30px;
}
</style>
