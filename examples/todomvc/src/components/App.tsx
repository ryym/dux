import * as React from 'react';
import { connect } from '../dux-react'
import { Dispatch } from '../dux'
import { State } from '../store'
import { TodoCounts } from '../lib/todo-counts'
import TodoTextInput from './TodoTextInput';

type Props = {
  counts: TodoCounts,
  filter: string,
  dispatch: Dispatch<State>,
  // addTodo: (title: string) => void
}

// App, TodoList を connect する
// TodoList を dump にすると
// たくさんコールバックを渡さないといけないので。

export function App({ counts, filter, dispatch }: Props) {
  // toggleCompletedAll
  // deleteCompleted
  // changeFilter (handleShow)

  return (
    null

    // <div>
    //   <Header />
    //   <section class="main">
    //     {counts.all > 0 && (
    //       <input
    //         className="toggle-all"
    //         type="checkbox"
    //         checked={counts.active === 0}
    //         onChange={toggleCompletedAll}
    //       />
    //     )}
    //     <TodoList />
    //     {counts.all > 0 && (
    //       <Footer
    //         completedCount={counts.completed}
    //         activeCount={counts.active}
    //         filter={filter}
    //         onClearCompleted={deleteCompleted}
    //         onShow={this.handleShow}
    //       />
    //     )}
    //     <Footer />
    //   </section>
    // </div>
  )
}

export default App
// export default connect(App, {
//   mapProps: dispatch => (state: State) => ({
//     dispatch,
//     counts: getTodoCounts(state),
//     filter: getCurrentFilter(state),
//   })
// })
