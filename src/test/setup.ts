import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'

function createStorage() {
  const state = new Map<string, string>()

  return {
    clear() {
      state.clear()
    },
    getItem(key: string) {
      return state.has(key) ? state.get(key)! : null
    },
    key(index: number) {
      return Array.from(state.keys())[index] ?? null
    },
    removeItem(key: string) {
      state.delete(key)
    },
    setItem(key: string, value: string) {
      state.set(key, String(value))
    },
    get length() {
      return state.size
    },
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: createStorage(),
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})
