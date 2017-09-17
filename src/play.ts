import { effect, Effect, command, Command } from './command'
import Store, { Subscriber } from './store'
import using from './using'

interface State {
  count: number;
  // text: string;
}

const add = (state: State, n: number): State => {
  state.count += n
  return state
}
const Add = command(add)

const increment = (state: State) => {
  state.count += 1
  return state
}
const Increment = command(increment)

// XXX: こういうの無いと、`effect<State>(dispatch..)`と書く必要がある
type Effector<P> = (s: State, p: P) => Effect<State>

const addDelay: Effector<{
  time: number,
  count?: number
}> = (state, { time, count = 10 }) => effect(dispatch => {
  setTimeout(() => {
    dispatch(Add(count))
  }, time)
})
const AddDelay = command(addDelay)

// やはりちょっと見づらい。
const addDelay2 = using(setTimeout)(delay => (
  state: State,
  { time, count = 10 }: { time: number, count?: number }
) => effect(dispatch => {
  delay(() => dispatch(Add(count)), time)
}))
// using を使わなくても、例えばDI済みのクラスメソッドを
// command 化する方法もある。

// addDelay2 は無名関数になってしまう。。
const AddDelay2 = command(addDelay2, 'addDelay2')

const store = new Store<State>({ count: 0 })

store.subscribe((s: State, c: Command<State, any>) => {
  console.log('COMMAND', s, c.name)
})

// store.dispatch(Add(3))
// store.dispatch(AddDelay({ time: 1000, count: 50 }))
// store.dispatch(Increment())
// store.dispatch(AddDelay2({ time: 100, count: 20 }))

const mockDelay = (f: Function, n:number) => {
  console.log('waited', n, 'seconds')
  return f()
}

var ef = addDelay2({ count: 1 }, { time: 1000, count: 100 })
ef.process(store.dispatch, store.getState)
console.log('hello')

var ef = addDelay2.using(mockDelay)({ count: 1 }, { time: 1000, count: 30 })
ef.process(store.dispatch, store.getState)

console.log('hello')
