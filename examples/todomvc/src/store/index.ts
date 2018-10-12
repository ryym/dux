import { Store } from '../dux'
import { makeInitialState } from './state'

export { State } from './state'

export const makeStore = () => {
  return new Store(makeInitialState())
}

