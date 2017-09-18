import * as React from 'react'
import { render } from 'react-dom'
import { Store, command } from 'dux'

const increment = ({ count }) => ({ count: count + 1 })
const Increment = command(increment)

const incrementIfOdd = (state) => {
  if (state.count % 2 === 0) {
    return state
  }
  return { count: state.count + 1 }
}
const IncrementIfOdd = command(incrementIfOdd)

const incrementAsync = (state, delay) => dispatch => {
  setTimeout(() => dispatch(Increment()), delay)
}
const IncrementAsync = command(incrementAsync)

const Counter = ({ value = 0, dispatch }) => {
  return (
    <div>
      <p>
        Clicked: {value} times
      </p>
      <button onClick={() => dispatch(Increment())}>
        Increment
      </button>
      <button onClick={() => dispatch(IncrementIfOdd())}>
        IncrementIfOdd
      </button>
      <button onClick={() => dispatch(IncrementAsync(500))}>
        IncrementAsync
      </button>
    </div>
  );
};

const renderCounter = (store) => {
  const { count } = store.getState()
  render(
    <Counter value={count} dispatch={store.dispatch} />,
    document.getElementById('root')
  )
}

const store = new Store({ count: 0 })
store.subscribe((state, command) => {
  console.log('Dispatched', command.name, state)
  renderCounter(store)
})
renderCounter(store)
