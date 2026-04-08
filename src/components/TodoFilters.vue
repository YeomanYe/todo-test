<script setup lang="ts">
import type { TodoFilter } from '../types/todo'

defineProps<{
  activeFilter: TodoFilter
}>()

const emit = defineEmits<{
  select: [filter: TodoFilter]
}>()

const filters: TodoFilter[] = ['all', 'active', 'completed']

function toLabel(filter: TodoFilter) {
  return filter.slice(0, 1).toUpperCase() + filter.slice(1)
}
</script>

<template>
  <div class="filters" aria-label="Task filters" role="group">
    <button
      v-for="filter in filters"
      :key="filter"
      class="filters__button"
      :class="{ 'filters__button--active': activeFilter === filter }"
      type="button"
      @click="emit('select', filter)"
    >
      {{ toLabel(filter) }}
    </button>
  </div>
</template>
