<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [title: string]
}>()

const title = ref('')

function handleSubmit() {
  emit('submit', title.value)
  title.value = ''
}
</script>

<template>
  <form class="composer" @submit.prevent="handleSubmit">
    <label class="composer__label" for="new-task">New task</label>
    <input
      id="new-task"
      v-model="title"
      class="composer__input"
      type="text"
      placeholder="Capture the next task..."
      autocomplete="off"
    />
  </form>
</template>
