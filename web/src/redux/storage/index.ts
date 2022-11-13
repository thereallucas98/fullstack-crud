import { AuthState } from './../auth/index'

const KEY = 'AUTH'

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export async function saveState(state: AuthState) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(KEY, serializedState)
  } catch (e) {
    // Ignore
  }
}
