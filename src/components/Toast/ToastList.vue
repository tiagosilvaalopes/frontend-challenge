<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore/toast'
import Toast from './ToastComponent.vue'

const toastStore = useToastStore()
</script>

<template>
  <div class="toasts-wrapper" v-if="toastStore.toastList.length > 0">
    <template v-for="(toast, index) in toastStore.toastList" :key="index">
      <Toast :id="toast.id" :title="toast.title" :message="toast.message" :type="toast.type" />
    </template>
  </div>
</template>

<style scoped>
.toasts-wrapper {
  width: 400px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 1rem;
  top: 85px;

  @media screen and (width <= 400px) {
    max-width: 70%;
    right: 0;
    margin-right: 1rem;
  }
}
</style>
