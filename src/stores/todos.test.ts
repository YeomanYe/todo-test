import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useTodosStore } from './todos'

describe('todos store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('adds, toggles, edits, deletes, filters, and clears todos', () => {
    const store = useTodosStore()

    store.addTodo('  Draft launch copy  ')
    store.addTodo('Review analytics')

    expect(store.todos).toHaveLength(2)
    expect(store.todos[0]?.title).toBe('Draft launch copy')
    expect(store.remainingCount).toBe(2)

    const firstId = store.todos[0]!.id
    const secondId = store.todos[1]!.id

    store.toggleTodo(firstId)
    expect(store.todos[0]?.completed).toBe(true)
    expect(store.remainingCount).toBe(1)

    store.setFilter('active')
    expect(store.filteredTodos.map((todo) => todo.id)).toEqual([secondId])

    store.editTodo(secondId, 'Review weekly analytics')
    expect(store.todos[1]?.title).toBe('Review weekly analytics')

    store.clearCompleted()
    expect(store.todos).toHaveLength(1)

    store.deleteTodo(secondId)
    expect(store.todos).toHaveLength(0)
  })

  test('rejects empty todo titles', () => {
    const store = useTodosStore()

    store.addTodo('   ')

    expect(store.todos).toHaveLength(0)
  })
})
