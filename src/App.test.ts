import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { describe, expect, test } from 'vitest'
import App from './App.vue'

describe('App', () => {
  test('renders todo workspace', async () => {
    render(App, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(screen.getByRole('heading', { name: "Today's Ledger" })).toBeTruthy()
  })
})
