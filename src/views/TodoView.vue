<script setup lang="ts">
import TodoComposer from '../components/TodoComposer.vue'
import TodoFilters from '../components/TodoFilters.vue'
import TodoList from '../components/TodoList.vue'
import TodoSummary from '../components/TodoSummary.vue'
import { useTodosStore } from '../stores/todos'

const store = useTodosStore()
</script>

<template>
  <main class="workspace">
    <section class="workspace__shell">
      <p class="workspace__eyebrow">Daily system</p>
      <header class="workspace__header">
        <div>
          <h1 class="workspace__title">Today&apos;s Ledger</h1>
          <p class="workspace__subtitle">
            A clean editorial board for capturing, sorting, and closing the loop.
          </p>
        </div>
      </header>

      <TodoComposer @submit="store.addTodo" />

      <TodoFilters :active-filter="store.filter" @select="store.setFilter" />

      <TodoList
        :todos="store.filteredTodos"
        @delete="store.deleteTodo"
        @edit="({ id, title }) => store.editTodo(id, title)"
        @toggle="store.toggleTodo"
      />

      <TodoSummary
        :completed-count="store.completedCount"
        :remaining-count="store.remainingCount"
        @clear-completed="store.clearCompleted"
      />
    </section>
  </main>
</template>
