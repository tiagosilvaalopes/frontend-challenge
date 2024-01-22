<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore/toast'
import type { Toast } from './ToastComponent.shared'

const props = defineProps<Toast>()

const toastStore = useToastStore()

const dismissToast = () => {
  toastStore.clearToast(props.id)
}

setTimeout(() => {
  toastStore.clearToast(props.id)
}, 3000)
</script>

<template>
  <div class="toast">
    <div class="sidebar" :class="type"></div>
    <div class="content">
      <div class="header">
        <h3>{{ title }}</h3>
        <button @click="dismissToast">X</button>
      </div>
      <div class="text">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success {
  background-color: #009900;
}

.error {
  background-color: #990000;
}

.toast {
  width: 400px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #faf8f7;
  justify-content: center;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;

  @media screen and (width <= 400px) {
    max-width: 100%;
    right: 0;
  }
}

.toast:hover {
  opacity: 0.75;
}

.toast p {
  font-family: 'Open Sans', sans-serif;
  font-size: 0.825rem;
  color: #778195;
}

.toast .sidebar {
  width: 0.5rem;
  min-width: 0.5rem;
}

.toast .content,
.toast .header,
.toast .text {
  width: 100%;
  display: flex;
}

.toast .content {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  box-sizing: border-box;
}

.toast .header,
.toast .text {
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
}

.header {
  height: 25px;
  margin-bottom: 1rem;
}

.header h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #566074;
  margin-bottom: 10px;
}

.header button {
  margin-left: auto;
  text-decoration: none;
  border: none;
  cursor: pointer;
  background: none;
  font-size: 1rem;
}

.header button:hover {
  background: #e7e7e7;
}

.content {
  flex-grow: 1;
}
</style>
