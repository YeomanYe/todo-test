<script setup lang="ts">
import TodoListItem from './TodoListItem.vue'
import type { TodoItem } from '../types/todo'

defineProps<{
  todos: TodoItem[]
}>()

const emit = defineEmits<{
  delete: [id: string]
  edit: [payload: { id: string; title: string }]
  toggle: [id: string]
}>()
</script>

<template>
  <ul v-if="todos.length" class="todo-list">
    <TodoListItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete="emit('delete', $event)"
      @edit="emit('edit', $event)"
      @toggle="emit('toggle', $event)"
    />
  </ul>
  <section v-else class="empty-state">
    <p class="empty-state__eyebrow">Quiet board</p>
    <h2 class="empty-state__title">Nothing queued yet.</h2>
    <p class="empty-state__copy">Add a task to start shaping today&apos;s ledger.</p>
  </section>
</template>
