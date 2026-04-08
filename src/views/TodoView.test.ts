import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import TodoView from './TodoView.vue'

describe('TodoView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('supports creating, filtering, completing, editing, and deleting todos', async () => {
    const user = userEvent.setup()

    render(TodoView, {
      global: {
        plugins: [createPinia()],
      },
    })

    const input = screen.getByLabelText('New task')
    await user.type(input, 'Write release note')
    await user.keyboard('{Enter}')

    expect(screen.getByText('Write release note')).toBeTruthy()

    await user.click(screen.getByRole('checkbox', { name: 'Mark Write release note as done' }))
    await user.click(screen.getByRole('button', { name: 'Completed' }))
    expect(screen.getByText('Write release note')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Edit Write release note' }))
    const editor = screen.getByLabelText('Edit task')
    await user.clear(editor)
    await user.type(editor, 'Write final release note')
    await user.keyboard('{Enter}')

    expect(screen.getByText('Write final release note')).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Delete Write final release note' }))
    expect(screen.queryByText('Write final release note')).toBeNull()
  })
})
