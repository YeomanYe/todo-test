import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useTodosStore } from './todos'

describe('todos persistence', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('hydrates todos from localStorage and persists updates', () => {
    localStorage.setItem(
      'web-todo.todos',
      JSON.stringify([
        {
          id: 'seed-1',
          title: 'Seeded task',
          completed: false,
          createdAt: '2026-04-08T10:00:00.000Z',
          updatedAt: '2026-04-08T10:00:00.000Z',
        },
      ]),
    )

    const store = useTodosStore()

    expect(store.todos).toHaveLength(1)
    expect(store.todos[0]?.title).toBe('Seeded task')

    store.addTodo('Second task')

    const persisted = localStorage.getItem('web-todo.todos')
    expect(persisted).toContain('Second task')
  })

  test('falls back safely on malformed localStorage payloads', () => {
    localStorage.setItem('web-todo.todos', '{bad json')

    const store = useTodosStore()

    expect(store.todos).toEqual([])
  })
})
