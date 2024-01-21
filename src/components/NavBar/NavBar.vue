<script setup lang="ts">
import FetchDataIcon from '@/assets/icons/IconFetchData.vue'
import UploadIcon from '@/assets/icons/IconUpload.vue'
import { useTranscriptionsStore } from '@/stores/transcriptions'

const transcriptionsStore = useTranscriptionsStore()
const { fetchTranscriptions, uploadTranscriptions } = transcriptionsStore
</script>

<template>
  <header class="navbar">
    <div class="wrapper">
      <h1 class="title">Transcriptions</h1>
      <div>
        <button class="btn" @click="uploadTranscriptions"><UploadIcon /></button>
        <button class="btn" @click="fetchTranscriptions"><FetchDataIcon /></button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  width: 100%;
  height: 70px;
  border-bottom: 2px solid #c0c5cf;
  background-color: white;
  margin-bottom: 20px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 700px;
  width: 700px;
  padding: 0 10px;
}

.title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  color: #414c5e;
}

.btn {
  margin-left: 20px;
}
</style>
