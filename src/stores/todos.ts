import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { TodoFilter, TodoItem } from '../types/todo'

const STORAGE_KEY = 'web-todo.todos'

function safeReadTodos(): TodoItem[] {
  const payload = localStorage.getItem(STORAGE_KEY)
  if (!payload) {
    return []
  }

  try {
    const parsed = JSON.parse(payload) as TodoItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistTodos(todos: TodoItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function buildTodo(title: string): TodoItem {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  }
}

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<TodoItem[]>(safeReadTodos())
  const filter = ref<TodoFilter>('all')

  const filteredTodos = computed(() => {
    if (filter.value === 'active') {
      return todos.value.filter((todo) => !todo.completed)
    }

    if (filter.value === 'completed') {
      return todos.value.filter((todo) => todo.completed)
    }

    return todos.value
  })

  const remainingCount = computed(() => todos.value.filter((todo) => !todo.completed).length)
  const completedCount = computed(() => todos.value.length - remainingCount.value)

  function sync() {
    persistTodos(todos.value)
  }

  function addTodo(title: string) {
    const normalizedTitle = title.trim()
    if (!normalizedTitle) {
      return
    }

    todos.value.push(buildTodo(normalizedTitle))
    sync()
  }

  function toggleTodo(id: string) {
    const todo = todos.value.find((entry) => entry.id === id)
    if (!todo) {
      return
    }

    todo.completed = !todo.completed
    todo.updatedAt = new Date().toISOString()
    sync()
  }

  function editTodo(id: string, title: string) {
    const todo = todos.value.find((entry) => entry.id === id)
    const normalizedTitle = title.trim()

    if (!todo || !normalizedTitle) {
      return
    }

    todo.title = normalizedTitle
    todo.updatedAt = new Date().toISOString()
    sync()
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
    sync()
  }

  function clearCompleted() {
    todos.value = todos.value.filter((todo) => !todo.completed)
    sync()
  }

  function setFilter(nextFilter: TodoFilter) {
    filter.value = nextFilter
  }

  return {
    completedCount,
    filter,
    filteredTodos,
    remainingCount,
    todos,
    addTodo,
    clearCompleted,
    deleteTodo,
    editTodo,
    setFilter,
    toggleTodo,
  }
})
