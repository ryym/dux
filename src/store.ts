import { Command, Handler0, Handler1 } from './command'

export type Dispatch<S> = (command: Command<S, any>) => void

export class StateHolder<S> {
  private state: S;

  getState = () => this.state

  replaceState = (state: S) => {
    this.state = state
  }
}

export interface StoreOptions<S> {
  state?: StateHolder<S>
}

export type Subscriber<S> = <P>(
  state: S,
  command: Command<S, P>,
  meta: NotifMetaData
) => void

export type NotifMetaData = {
  isEffect: boolean;
}

export default class Store<S> {
  private state: StateHolder<S>
  private subscribers: Array<Subscriber<S>>

  constructor(initialState: S, opts: StoreOptions<S> = {}) {
    this.state = opts.state || new StateHolder<S>()
    this.state.replaceState(initialState)
    this.subscribers = []
  }

  getState = () => this.state.getState()

  dispatch = (command: Command<S, any>): void => {
    const { handler, payload } = command
    const currentState = this.state.getState()
    let result

    if (handler.length <= 1) {
      result = (<Handler0<S>>handler)(currentState)
    } else {
      result = (<Handler1<S, any>>handler)(currentState, payload)
    }

    if (typeof result === 'function') {
      result(this.dispatch, this.state.getState)
      this.notify(currentState, command, { isEffect: true })
    }
    else {
      this.state.replaceState(result)
      this.notify(result, command, { isEffect: false })
    }
  }

  subscribe(subscriber: Subscriber<S>) {
    this.subscribers.push(subscriber)
    const unsubscribe = () => {
      const idx = this.subscribers.indexOf(subscriber)
      if (idx >= 0) {
        this.subscribers.splice(idx, 1)
      }
    }
    return unsubscribe
  }

  private notify(
    state: S,
    command: Command<S, any>,
    meta: NotifMetaData
  ) {
    this.subscribers.forEach(sb => {
      sb(state, command, meta)
    })
  }
}
