import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Toast } from '@/components/Toast/ToastComponent.shared'

export const useToastStore = defineStore('toast', () => {
  const toastList = ref<Array<Toast>>([])

  function addToast(newToast: Toast) {
    toastList.value.push(newToast)
  }

  function clearToast(toastID: string) {
    toastList.value = toastList.value.filter((toast) => toast.id !== toastID)
  }

  return {
    toastList,
    addToast,
    clearToast
  }
})
