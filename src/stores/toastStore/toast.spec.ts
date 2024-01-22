// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useToastStore } from './toast'
import { toastMock } from './toast.mocks'

describe('Toast Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should add a toast', () => {
    const store = useToastStore()

    store.addToast(toastMock)

    expect(store.toastList).toEqual([toastMock])
  })

  it('should clear a toast', () => {
    const store = useToastStore()
    store.addToast(toastMock)

    store.clearToast(toastMock.id)

    expect(store.toastList).toEqual([])
  })
})
