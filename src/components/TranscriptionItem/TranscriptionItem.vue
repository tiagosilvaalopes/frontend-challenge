<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTranscriptionsStore, type Transcription } from '@/stores/transcriptions'
import DeleteIcon from '@/assets/icons/IconDelete.vue'
import PersonIcon from '@/assets/icons/IconPerson.vue'

const transcriptionsStore = useTranscriptionsStore()
const { deleteTranscription } = transcriptionsStore

const props = defineProps<Transcription>()

const isTitleBeingEdited = ref(false)
const isTextBeingEdited = ref(false)

const isVoicePersonTwo = computed(() => props.voice === 'Voice 2')
</script>

<template>
  <div class="transcription-list-item">
    <input type="checkbox" class="checkbox" />
    <PersonIcon :class="['person-icon', { 'person-two': isVoicePersonTwo }]" />
    <div class="transcription-list-item-content-wrapper">
      <div v-if="!isTitleBeingEdited" class="transcription-list-item--title">{{ voice }}</div>
      <div v-if="!isTextBeingEdited" class="transcription-list-item--content">{{ text }}</div>
    </div>
    <button class="transcription-list-item--delete-btn" @click="deleteTranscription(props.id)"><DeleteIcon /></button>
  </div>
</template>

<style scoped>
.transcription-list-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  background-color: white;
  padding: 20px;
  border: 2px solid #f8f9fa;
}

input[type='checkbox'] {
  accent-color: #859eff;
  outline: 1px auto #859eff;
  height: 16px;
  min-width: 16px;
  cursor: pointer;
}

.person-icon {
  width: 26px;
  height: 26px;
  min-width: 26px;
  margin-top: -4px;
}

.person-two:deep(rect) {
  fill: #859eff;
}

.transcription-list-item:not(:last-child) {
  border-bottom: none;
}

.transcription-list-item--title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #566074;
  margin-bottom: 10px;
}

.transcription-list-item--content {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #778195;
  margin-bottom: 10px;
}

.transcription-list-item--delete-btn {
  margin-left: auto;
  margin-top: -2px;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  transition: 0.2s all ease-in;
}

.transcription-list-item:hover .transcription-list-item--delete-btn,
.transcription-list-item--delete-btn:focus {
  pointer-events: auto;
  opacity: 100%;
}
</style>
