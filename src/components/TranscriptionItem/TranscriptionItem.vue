<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTranscriptionsStore, type Transcription } from '@/stores/transcriptions'
import DeleteIcon from '@/assets/icons/IconDelete.vue'
import PersonIcon from '@/assets/icons/IconPerson.vue'

const props = defineProps<Transcription>()

const transcriptionsStore = useTranscriptionsStore()

const titleElement = ref<HTMLInputElement | null>(null)
const textElement = ref<HTMLInputElement | null>(null)

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
    <PersonIcon :class="['person-icon', { 'person-two': isVoicePersonTwo }]" />
    <div class="transcription-list-item-content-wrapper">
      <div
        ref="titleElement"
        class="transcription-list-item--title"
        contenteditable
        spellcheck="false"
        @blur="updateVoice"
        @keydown.enter="updateVoice"
      >
        {{ voice }}
      </div>

      <div
        ref="textElement"
        class="transcription-list-item--content"
        contenteditable
        spellcheck="false"
        @blur="updateText"
        @keydown.enter="updateText"
      >
        {{ text }}
      </div>
    </div>
    <button class="transcription-list-item--delete-btn" @click="transcriptionsStore.deleteTranscription(props.id)">
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
  cursor: pointer;
}

.transcription-list-item--title:focus {
  cursor: text;
}

.transcription-list-item--content {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  color: #778195;
  margin-bottom: 10px;
  cursor: pointer;
}

.transcription-list-item--content:focus {
  cursor: text;
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
