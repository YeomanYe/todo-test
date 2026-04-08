import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { describe, expect, test } from 'vitest'
import App from './App.vue'

describe('App', () => {
  test('renders todo workspace through the router', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: '<h1>Today&apos;s Ledger</h1>' } }],
    })

    render(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await router.isReady()

    expect(screen.getByRole('heading', { name: "Today's Ledger" })).toBeTruthy()
  })
})
