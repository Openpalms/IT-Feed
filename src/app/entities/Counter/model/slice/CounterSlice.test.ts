import { counterReducer, counterActions } from './CounterSlice'
import { CounterSchema } from '../types/CounterSchema'

describe('counterSlice', () => {
  test('return decremented counter', () => {
    const state: CounterSchema = {
      value: 9,
    }
    expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 8 })
  })
})

describe('counterSlice', () => {
  test('return incremented counter', () => {
    const state: CounterSchema = {
      value: 9,
    }
    expect(counterReducer(state, counterActions.increment())).toEqual({ value: 10 })
  })
})
describe('counterSlice', () => {
  test('empty state', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 })
  })
})
