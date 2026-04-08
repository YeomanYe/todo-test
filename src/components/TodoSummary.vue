<script setup lang="ts">
defineProps<{
  completedCount: number
  remainingCount: number
}>()

const emit = defineEmits<{
  clearCompleted: []
}>()
</script>

<template>
  <footer class="summary">
    <p class="summary__copy">
      <strong>{{ remainingCount }}</strong> left · <span>{{ completedCount }}</span> finished
    </p>
    <button
      v-if="completedCount > 0"
      class="summary__button"
      type="button"
      @click="emit('clearCompleted')"
    >
      Clear completed
    </button>
  </footer>
</template>
