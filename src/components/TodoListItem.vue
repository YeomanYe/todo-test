<script setup lang="ts">
import { ref } from 'vue'
import type { TodoItem } from '../types/todo'

const props = defineProps<{
  todo: TodoItem
}>()

const emit = defineEmits<{
  delete: [id: string]
  edit: [payload: { id: string; title: string }]
  toggle: [id: string]
}>()

const isEditing = ref(false)
const draft = ref(props.todo.title)

function startEditing() {
  draft.value = props.todo.title
  isEditing.value = true
}

function saveEdit() {
  emit('edit', { id: props.todo.id, title: draft.value })
  isEditing.value = false
}
</script>

<template>
  <li class="todo-item" :class="{ 'todo-item--done': todo.completed }">
    <div class="todo-item__main">
      <input
        :aria-label="`Mark ${todo.title} as done`"
        class="todo-item__toggle"
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      />

      <div class="todo-item__content">
        <template v-if="isEditing">
          <label class="sr-only" :for="`edit-${todo.id}`">Edit task</label>
          <input
            :id="`edit-${todo.id}`"
            v-model="draft"
            class="todo-item__editor"
            type="text"
            aria-label="Edit task"
            @keyup.enter="saveEdit"
            @blur="saveEdit"
          />
        </template>
        <template v-else>
          <p class="todo-item__title">{{ todo.title }}</p>
          <p class="todo-item__meta">
            {{ todo.completed ? 'Completed' : 'In focus' }}
          </p>
        </template>
      </div>
    </div>

    <div class="todo-item__actions">
      <button class="todo-item__button" type="button" :aria-label="`Edit ${todo.title}`" @click="startEditing">
        Edit
      </button>
      <button
        class="todo-item__button todo-item__button--danger"
        type="button"
        :aria-label="`Delete ${todo.title}`"
        @click="emit('delete', todo.id)"
      >
        Delete
      </button>
    </div>
  </li>
</template>
