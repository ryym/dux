import * as React from 'react';
import { connect } from '../dux-react'
import { Dispatch } from '../dux'
import { State } from '../store'
import { TodoCounts } from '../lib/todo-counts'
import TodoList from './TodoList'
import Header from './Header'
import Footer from './Footer'
import {
  getTodoCounts,
  AddTodo,
  ToggleCompletedAll,
} from '../store/todos'
import {
  ChangeFilter,
} from '../store/input'

type Props = {
  counts: TodoCounts,
  filter: string,
  dispatch: Dispatch<State>,
  toggleCompletedAll: () => void,
}

export function App({
  counts, filter, dispatch,
  toggleCompletedAll,
}: Props) {
  return (
    <div>
      <Header addTodo={title => dispatch(AddTodo(title))} />
      <section className="main">
        {counts.all > 0 && (
          <input
            className="toggle-all"
            type="checkbox"
            checked={counts.active === 0}
            onChange={toggleCompletedAll}
          />
        )}

        <TodoList />

        {counts.all > 0 && (
          <Footer
            completedCount={counts.completed}
            activeCount={counts.active}
            filter={filter}
            onClearCompleted={() => {}}
            onShow={filter => dispatch(ChangeFilter(filter))}
          />
        )}
      </section>
    </div>
  )
}

// export default App

export default connect(App, {
  mapProps: dispatch => (state: State) => {
    const toggleCompletedAll = (): void => {
      const counts = getTodoCounts(state)
      if (counts.all > 0) {
        const allCompleted = counts.active === 0
        dispatch(ToggleCompletedAll(!allCompleted))
      }
    }
    return {
      dispatch,
      toggleCompletedAll,
      counts: getTodoCounts(state),
      filter: state.filter,
    }
  }
})
