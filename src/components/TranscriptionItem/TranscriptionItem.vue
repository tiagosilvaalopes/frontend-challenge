<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTranscriptionsStore } from '@/stores/transcriptionStore/transcriptions'
import { type Transcription } from '@/stores/transcriptionStore/transcriptions.shared'
import { voiceDataTestID, textDataTestID } from './TranscriptionItem.shared'
import DeleteIcon from '@/assets/icons/IconDelete.vue'
import PersonIcon from '@/assets/icons/IconPerson.vue'

const props = defineProps<Transcription>()

const transcriptionsStore = useTranscriptionsStore()

const titleElement = ref<HTMLDivElement | null>(null)
const textElement = ref<HTMLDivElement | null>(null)

const voice = ref(props.voice)
const text = ref(props.text)

const updateVoice = (event: Event) => {
  ;(event.target as HTMLInputElement).blur()
  voice.value = titleElement.value?.innerText.trim() ?? ''
}

const updateText = (event: Event) => {
  ;(event.target as HTMLInputElement).blur()
  text.value = textElement.value?.innerText.trim() ?? ''
}

const isVoicePersonTwo = computed(() => voice.value === 'Voice 2')

watch(voice, () => {
  console.log(`Voice with ID: ${props.id} has been updated to ${voice.value}`)
  transcriptionsStore.updateTranscription({
    id: props.id,
    voice: voice.value,
    text: text.value
  })
})

watch(text, () => {
  console.log(`Text with ID: ${props.id} has been updated to ${text.value}`)
  transcriptionsStore.updateTranscription({
    id: props.id,
    voice: voice.value,
    text: text.value
  })
})
</script>

<template>
  <div class="transcription-list-item">
    <input type="checkbox" />
    <PersonIcon :class="['person-icon', { 'person-icon--purple': isVoicePersonTwo }]" />
    <div>
      <div
        ref="titleElement"
        class="transcription-list-item__title"
        contenteditable
        spellcheck="false"
        :data-testid="voiceDataTestID"
        @blur="updateVoice"
        @keydown.enter="updateVoice"
      >
        {{ voice }}
      </div>

      <div
        ref="textElement"
        class="transcription-list-item__content"
        contenteditable
        spellcheck="false"
        :data-testid="textDataTestID"
        @blur="updateText"
        @keydown.enter="updateText"
      >
        {{ text }}
      </div>
    </div>
    <button class="transcription-list-item__delete-btn" @click="transcriptionsStore.deleteTranscription(props.id)">
      <DeleteIcon />
    </button>
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
  width: 16px;
  min-width: 16px;
  cursor: pointer;
}

.person-icon {
  width: 26px;
  height: 26px;
  min-width: 26px;
  margin-top: -4px;
}

.person-icon--purple:deep(rect) {
  fill: #859eff;
}

.transcription-list-item:not(:last-child) {
  border-bottom: none;
}

.transcription-list-item__title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #566074;
  margin-bottom: 10px;
  cursor: pointer;
}

.transcription-list-item__title:focus {
  cursor: text;
}

.transcription-list-item__content {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #778195;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 2px 0;
}

.transcription-list-item__content:focus {
  cursor: text;
}

.transcription-list-item__delete-btn {
  margin-left: auto;
  margin-top: -2px;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  transition: 0.2s all ease-in;

  @media screen and (width <= 400px) {
    opacity: 100%;
    pointer-events: auto;
  }
}

.transcription-list-item:hover .transcription-list-item__delete-btn,
.transcription-list-item__delete-btn:focus {
  pointer-events: auto;
  opacity: 100%;
}
</style>
