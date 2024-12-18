// stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('ishome', {
  state: () => ({
    ishome: true
  }),
  actions: {
    changeIsHome(check: boolean) {
      this.ishome = check
    }
  }
})
